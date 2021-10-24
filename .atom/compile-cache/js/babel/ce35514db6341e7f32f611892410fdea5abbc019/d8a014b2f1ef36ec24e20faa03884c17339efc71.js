var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _lodash = require('lodash');

var _disposableEvent = require('disposable-event');

var _disposableEvent2 = _interopRequireDefault(_disposableEvent);

var _atom = require('atom');

// $FlowIgnore: Cursor is a type

var _tooltip = require('../tooltip');

var _tooltip2 = _interopRequireDefault(_tooltip);

var _helpers = require('../helpers');

var _helpers2 = require('./helpers');

var Editor = (function () {
  function Editor(textEditor) {
    var _this = this;

    _classCallCheck(this, Editor);

    this.tooltip = null;
    this.emitter = new _atom.Emitter();
    this.markers = new Map();
    this.messages = new Map();
    this.textEditor = textEditor;
    this.subscriptions = new _atom.CompositeDisposable();
    this.ignoreTooltipInvocation = false;
    this.currentLineMarker = null;
    this.lastRange = null;
    this.lastEmpty = null;
    this.lastCursorPositions = new WeakMap();

    this.subscriptions.add(this.emitter);
    this.subscriptions.add(atom.config.observe('linter-ui-default.showTooltip', function (showTooltip) {
      _this.showTooltip = showTooltip;
      if (!_this.showTooltip && _this.tooltip) {
        _this.removeTooltip();
      }
    }));
    this.subscriptions.add(atom.config.observe('linter-ui-default.showProviderName', function (showProviderName) {
      _this.showProviderName = showProviderName;
    }));
    this.subscriptions.add(atom.config.observe('linter-ui-default.showDecorations', function (showDecorations) {
      var notInitial = typeof _this.showDecorations !== 'undefined';
      _this.showDecorations = showDecorations;
      if (notInitial) {
        _this.updateGutter();
      }
    }));
    this.subscriptions.add(atom.config.observe('linter-ui-default.gutterPosition', function (gutterPosition) {
      var notInitial = typeof _this.gutterPosition !== 'undefined';
      _this.gutterPosition = gutterPosition;
      if (notInitial) {
        _this.updateGutter();
      }
    }));
    this.subscriptions.add(textEditor.onDidDestroy(function () {
      _this.dispose();
    }));

    var tooltipSubscription = undefined;
    this.subscriptions.add(atom.config.observe('linter-ui-default.tooltipFollows', function (tooltipFollows) {
      _this.tooltipFollows = tooltipFollows;
      if (tooltipSubscription) {
        tooltipSubscription.dispose();
      }
      tooltipSubscription = new _atom.CompositeDisposable();
      if (tooltipFollows === 'Mouse' || tooltipFollows === 'Both') {
        tooltipSubscription.add(_this.listenForMouseMovement());
      }
      if (tooltipFollows === 'Keyboard' || tooltipFollows === 'Both') {
        tooltipSubscription.add(_this.listenForKeyboardMovement());
      }
      _this.removeTooltip();
    }));
    this.subscriptions.add(new _atom.Disposable(function () {
      tooltipSubscription.dispose();
    }));

    this.subscriptions.add(textEditor.onDidChangeCursorPosition(function (_ref) {
      var cursor = _ref.cursor;
      var newBufferPosition = _ref.newBufferPosition;

      var lastBufferPosition = _this.lastCursorPositions.get(cursor);
      if (!lastBufferPosition || !lastBufferPosition.isEqual(newBufferPosition)) {
        _this.lastCursorPositions.set(cursor, newBufferPosition);
        _this.ignoreTooltipInvocation = false;
      }
      if (_this.tooltipFollows === 'Mouse') {
        _this.removeTooltip();
      }
    }));
    this.subscriptions.add(textEditor.getBuffer().onDidChangeText(function () {
      var cursors = textEditor.getCursors();
      cursors.forEach(function (cursor) {
        _this.lastCursorPositions.set(cursor, cursor.getBufferPosition());
      });
      if (_this.tooltipFollows !== 'Mouse') {
        _this.ignoreTooltipInvocation = true;
        _this.removeTooltip();
      }
    }));
    this.updateGutter();
    this.listenForCurrentLine();
  }

  _createClass(Editor, [{
    key: 'listenForCurrentLine',
    value: function listenForCurrentLine() {
      var _this2 = this;

      this.subscriptions.add(this.textEditor.observeCursors(function (cursor) {
        var handlePositionChange = function handlePositionChange(_ref2) {
          var start = _ref2.start;
          var end = _ref2.end;

          var gutter = _this2.gutter;
          if (!gutter || _this2.subscriptions.disposed) return;
          // We need that Range.fromObject hack below because when we focus index 0 on multi-line selection
          // end.column is the column of the last line but making a range out of two and then accesing
          // the end seems to fix it (black magic?)
          var currentRange = _atom.Range.fromObject([start, end]);
          var linesRange = _atom.Range.fromObject([[start.row, 0], [end.row, Infinity]]);
          var currentEmpty = currentRange.isEmpty();

          // NOTE: Atom does not paint gutter if multi-line and last line has zero index
          if (start.row !== end.row && currentRange.end.column === 0) {
            linesRange.end.row--;
          }
          if (_this2.lastRange && _this2.lastRange.isEqual(linesRange) && currentEmpty === _this2.lastEmpty) return;
          if (_this2.currentLineMarker) {
            _this2.currentLineMarker.destroy();
            _this2.currentLineMarker = null;
          }
          _this2.lastRange = linesRange;
          _this2.lastEmpty = currentEmpty;

          _this2.currentLineMarker = _this2.textEditor.markScreenRange(linesRange, {
            invalidate: 'never'
          });
          var item = document.createElement('span');
          item.className = 'line-number cursor-line linter-cursor-line ' + (currentEmpty ? 'cursor-line-no-selection' : '');
          gutter.decorateMarker(_this2.currentLineMarker, {
            item: item,
            'class': 'linter-row'
          });
        };

        var cursorMarker = cursor.getMarker();
        var subscriptions = new _atom.CompositeDisposable();
        subscriptions.add(cursorMarker.onDidChange(function (_ref3) {
          var newHeadScreenPosition = _ref3.newHeadScreenPosition;
          var newTailScreenPosition = _ref3.newTailScreenPosition;

          handlePositionChange({
            start: newHeadScreenPosition,
            end: newTailScreenPosition
          });
        }));
        subscriptions.add(cursor.onDidDestroy(function () {
          _this2.subscriptions.remove(subscriptions);
          subscriptions.dispose();
        }));
        subscriptions.add(new _atom.Disposable(function () {
          if (this.currentLineMarker) {
            this.currentLineMarker.destroy();
            this.currentLineMarker = null;
          }
        }));
        _this2.subscriptions.add(subscriptions);
        handlePositionChange(cursorMarker.getScreenRange());
      }));
    }
  }, {
    key: 'listenForMouseMovement',
    value: function listenForMouseMovement() {
      var _this3 = this;

      var editorElement = atom.views.getView(this.textEditor);

      return (0, _disposableEvent2['default'])(editorElement, 'mousemove', (0, _lodash.debounce)(function (event) {
        if (!editorElement.component || _this3.subscriptions.disposed || !(0, _helpers2.hasParent)(event.target, 'div.scroll-view')) {
          return;
        }
        var tooltip = _this3.tooltip;
        if (tooltip && (0, _helpers2.mouseEventNearPosition)({
          event: event,
          editor: _this3.textEditor,
          editorElement: editorElement,
          tooltipElement: tooltip.element,
          screenPosition: tooltip.marker.getStartScreenPosition()
        })) {
          return;
        }

        _this3.cursorPosition = (0, _helpers2.getBufferPositionFromMouseEvent)(event, _this3.textEditor, editorElement);
        _this3.ignoreTooltipInvocation = false;
        if (_this3.textEditor.largeFileMode) {
          // NOTE: Ignore if file is too large
          _this3.cursorPosition = null;
        }
        if (_this3.cursorPosition) {
          _this3.updateTooltip(_this3.cursorPosition);
        } else {
          _this3.removeTooltip();
        }
      }, 300, true));
    }
  }, {
    key: 'listenForKeyboardMovement',
    value: function listenForKeyboardMovement() {
      var _this4 = this;

      return this.textEditor.onDidChangeCursorPosition((0, _lodash.debounce)(function (_ref4) {
        var newBufferPosition = _ref4.newBufferPosition;

        _this4.cursorPosition = newBufferPosition;
        _this4.updateTooltip(newBufferPosition);
      }, 16));
    }
  }, {
    key: 'updateGutter',
    value: function updateGutter() {
      var _this5 = this;

      this.removeGutter();
      if (!this.showDecorations) {
        this.gutter = null;
        return;
      }
      var priority = this.gutterPosition === 'Left' ? -100 : 100;
      this.gutter = this.textEditor.addGutter({
        name: 'linter-ui-default',
        priority: priority
      });
      this.markers.forEach(function (markers, key) {
        var message = _this5.messages.get(key);
        if (message) {
          for (var marker of markers) {
            _this5.decorateMarker(message, marker, 'gutter');
          }
        }
      });
    }
  }, {
    key: 'removeGutter',
    value: function removeGutter() {
      if (this.gutter) {
        try {
          this.gutter.destroy();
        } catch (_) {
          /* This throws when the text editor is disposed */
        }
      }
    }
  }, {
    key: 'updateTooltip',
    value: function updateTooltip(position) {
      var _this6 = this;

      if (!position || this.tooltip && this.tooltip.isValid(position, this.messages)) {
        return;
      }
      this.removeTooltip();
      if (!this.showTooltip) {
        return;
      }
      if (this.ignoreTooltipInvocation) {
        return;
      }

      var messages = (0, _helpers.filterMessagesByRangeOrPoint)(this.messages, this.textEditor.getPath(), position);
      if (!messages.length) {
        return;
      }

      this.tooltip = new _tooltip2['default'](messages, position, this.textEditor);

      // save markers of the tooltip (for destorying them in this.apply)
      messages.forEach(function (message) {
        // $FlowIgnore: this.tooltip is not null
        _this6.saveMarker(message.key, _this6.tooltip.marker);
      });

      // $FlowIgnore: this.tooltip is not null
      this.tooltip.onDidDestroy(function () {
        _this6.tooltip = null;
      });
    }
  }, {
    key: 'removeTooltip',
    value: function removeTooltip() {
      if (this.tooltip) {
        this.tooltip.marker.destroy();
      }
    }
  }, {
    key: 'apply',
    value: function apply(added, removed) {
      var _this7 = this;

      var textBuffer = this.textEditor.getBuffer();

      for (var i = 0, _length = removed.length; i < _length; i++) {
        var message = removed[i];
        this.destroyMarker(message.key);
      }

      var _loop = function (i, _length2) {
        var message = added[i];
        var markerRange = (0, _helpers.$range)(message);
        if (!markerRange) {
          // Only for backward compatibility
          return 'continue';
        }
        var marker = textBuffer.markRange(markerRange, {
          invalidate: 'never'
        });
        _this7.decorateMarker(message, marker);
        marker.onDidChange(function (_ref5) {
          var oldHeadPosition = _ref5.oldHeadPosition;
          var newHeadPosition = _ref5.newHeadPosition;
          var isValid = _ref5.isValid;

          if (!isValid || newHeadPosition.row === 0 && oldHeadPosition.row !== 0) {
            return;
          }
          if (message.version === 2) {
            message.location.position = marker.previousEventState.range;
          }
        });
      };

      for (var i = 0, _length2 = added.length; i < _length2; i++) {
        var _ret = _loop(i, _length2);

        if (_ret === 'continue') continue;
      }

      this.updateTooltip(this.cursorPosition);
    }
  }, {
    key: 'decorateMarker',
    value: function decorateMarker(message, marker) {
      var paint = arguments.length <= 2 || arguments[2] === undefined ? 'both' : arguments[2];

      this.saveMarker(message.key, marker);
      this.messages.set(message.key, message);

      if (paint === 'both' || paint === 'editor') {
        this.textEditor.decorateMarker(marker, {
          type: 'text',
          'class': 'linter-highlight linter-' + message.severity
        });
      }

      var gutter = this.gutter;
      if (gutter && (paint === 'both' || paint === 'gutter')) {
        var element = document.createElement('span');
        element.className = 'linter-gutter linter-gutter-' + message.severity + ' icon icon-' + (message.icon || 'primitive-dot');
        gutter.decorateMarker(marker, {
          'class': 'linter-row',
          item: element
        });
      }
    }

    // add marker to the message => marker map
  }, {
    key: 'saveMarker',
    value: function saveMarker(key, marker) {
      var allMarkers = this.markers.get(key) || [];
      allMarkers.push(marker);
      this.markers.set(key, allMarkers);
    }

    // destroy markers of a key
  }, {
    key: 'destroyMarker',
    value: function destroyMarker(key) {
      var markers = this.markers.get(key);
      if (markers) {
        markers.forEach(function (marker) {
          if (marker) {
            marker.destroy();
          }
        });
      }
      this.markers['delete'](key);
      this.messages['delete'](key);
    }
  }, {
    key: 'onDidDestroy',
    value: function onDidDestroy(callback) {
      return this.emitter.on('did-destroy', callback);
    }
  }, {
    key: 'dispose',
    value: function dispose() {
      this.emitter.emit('did-destroy');
      this.subscriptions.dispose();
      this.removeGutter();
      this.removeTooltip();
    }
  }]);

  return Editor;
})();

module.exports = Editor;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZpbGU6Ly8vQzovVXNlcnMvY2tuanUvLmF0b20vcGFja2FnZXMvbGludGVyLXVpLWRlZmF1bHQvbGliL2VkaXRvci9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7c0JBRXlCLFFBQVE7OytCQUNMLGtCQUFrQjs7OztvQkFDa0IsTUFBTTs7Ozt1QkFJbEQsWUFBWTs7Ozt1QkFDcUIsWUFBWTs7d0JBQ2tCLFdBQVc7O0lBR3hGLE1BQU07QUFvQkMsV0FwQlAsTUFBTSxDQW9CRSxVQUFzQixFQUFFOzs7MEJBcEJoQyxNQUFNOztBQXFCUixRQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQTtBQUNuQixRQUFJLENBQUMsT0FBTyxHQUFHLG1CQUFhLENBQUE7QUFDNUIsUUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLEdBQUcsRUFBRSxDQUFBO0FBQ3hCLFFBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxHQUFHLEVBQUUsQ0FBQTtBQUN6QixRQUFJLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQTtBQUM1QixRQUFJLENBQUMsYUFBYSxHQUFHLCtCQUF5QixDQUFBO0FBQzlDLFFBQUksQ0FBQyx1QkFBdUIsR0FBRyxLQUFLLENBQUE7QUFDcEMsUUFBSSxDQUFDLGlCQUFpQixHQUFHLElBQUksQ0FBQTtBQUM3QixRQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQTtBQUNyQixRQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQTtBQUNyQixRQUFJLENBQUMsbUJBQW1CLEdBQUcsSUFBSSxPQUFPLEVBQUUsQ0FBQTs7QUFFeEMsUUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFBO0FBQ3BDLFFBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUNwQixJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQywrQkFBK0IsRUFBRSxVQUFBLFdBQVcsRUFBSTtBQUNsRSxZQUFLLFdBQVcsR0FBRyxXQUFXLENBQUE7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dWktZGVmYXVsdC9saWIvZWRpdG9yL2luZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogQGZsb3cgKi9cblxuaW1wb3J0IHsgZGVib3VuY2UgfSBmcm9tICdsb2Rhc2gnXG5pbXBvcnQgZGlzcG9zYWJsZUV2ZW50IGZyb20gJ2Rpc3Bvc2FibGUtZXZlbnQnXG5pbXBvcnQgeyBDb21wb3NpdGVEaXNwb3NhYmxlLCBEaXNwb3NhYmxlLCBFbWl0dGVyLCBSYW5nZSB9IGZyb20gJ2F0b20nXG4vLyAkRmxvd0lnbm9yZTogQ3Vyc29yIGlzIGEgdHlwZVxuaW1wb3J0IHR5cGUgeyBUZXh0RWRpdG9yLCBCdWZmZXJNYXJrZXIsIFRleHRFZGl0b3JHdXR0ZXIsIFBvaW50LCBDdXJzb3IgfSBmcm9tICdhdG9tJ1xuXG5pbXBvcnQgVG9vbHRpcCBmcm9tICcuLi90b29sdGlwJ1xuaW1wb3J0IHsgJHJhbmdlLCBmaWx0ZXJNZXNzYWdlc0J5UmFuZ2VPclBvaW50IH0gZnJvbSAnLi4vaGVscGVycydcbmltcG9ydCB7IGhhc1BhcmVudCwgbW91c2VFdmVudE5lYXJQb3NpdGlvbiwgZ2V0QnVmZmVyUG9zaXRpb25Gcm9tTW91c2VFdmVudCB9IGZyb20gJy4vaGVscGVycydcbmltcG9ydCB0eXBlIHsgTGludGVyTWVzc2FnZSB9IGZyb20gJy4uL3R5cGVzJ1xuXG5jbGFzcyBFZGl0b3Ige1xuICBndXR0ZXI6ID9UZXh0RWRpdG9yR3V0dGVyXG4gIHRvb2x0aXA6ID9Ub29sdGlwXG4gIGVtaXR0ZXI6IEVtaXR0ZXJcbiAgbWFya2VyczogTWFwPHN0cmluZywgQXJyYXk8QnVmZmVyTWFya2VyPj5cbiAgbWVzc2FnZXM6IE1hcDxzdHJpbmcsIExpbnRlck1lc3NhZ2U+XG4gIHRleHRFZGl0b3I6IFRleHRFZGl0b3JcbiAgc2hvd1Rvb2x0aXA6IGJvb2xlYW5cbiAgc3Vic2NyaXB0aW9uczogQ29tcG9zaXRlRGlzcG9zYWJsZVxuICBjdXJzb3JQb3NpdGlvbjogP1BvaW50XG4gIGd1dHRlclBvc2l0aW9uOiBib29sZWFuXG4gIHRvb2x0aXBGb2xsb3dzOiBzdHJpbmdcbiAgc2hvd0RlY29yYXRpb25zOiBib29sZWFuXG4gIHNob3dQcm92aWRlck5hbWU6IGJvb2xlYW5cbiAgaWdub3JlVG9vbHRpcEludm9jYXRpb246IGJvb2xlYW5cbiAgY3VycmVudExpbmVNYXJrZXI6ID9CdWZmZXJNYXJrZXJcbiAgbGFzdFJhbmdlOiA/UmFuZ2VcbiAgbGFzdEVtcHR5OiA/UmFuZ2VcbiAgbGFzdEN1cnNvclBvc2l0aW9uczogV2Vha01hcDxDdXJzb3IsIFBvaW50PlxuXG4gIGNvbnN0cnVjdG9yKHRleHRFZGl0b3I6IFRleHRFZGl0b3IpIHtcbiAgICB0aGlzLnRvb2x0aXAgPSBudWxsXG4gICAgdGhpcy5lbWl0dGVyID0gbmV3IEVtaXR0ZXIoKVxuICAgIHRoaXMubWFya2VycyA9IG5ldyBNYXAoKVxuICAgIHRoaXMubWVzc2FnZXMgPSBuZXcgTWFwKClcbiAgICB0aGlzLnRleHRFZGl0b3IgPSB0ZXh0RWRpdG9yXG4gICAgdGhpcy5zdWJzY3JpcHRpb25zID0gbmV3IENvbXBvc2l0ZURpc3Bvc2FibGUoKVxuICAgIHRoaXMuaWdub3JlVG9vbHRpcEludm9jYXRpb24gPSBmYWxzZVxuICAgIHRoaXMuY3VycmVudExpbmVNYXJrZXIgPSBudWxsXG4gICAgdGhpcy5sYXN0UmFuZ2UgPSBudWxsXG4gICAgdGhpcy5sYXN0RW1wdHkgPSBudWxsXG4gICAgdGhpcy5sYXN0Q3Vyc29yUG9zaXRpb25zID0gbmV3IFdlYWtNYXAoKVxuXG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLmFkZCh0aGlzLmVtaXR0ZXIpXG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLmFkZChcbiAgICAgIGF0b20uY29uZmlnLm9ic2VydmUoJ2xpbnRlci11aS1kZWZhdWx0LnNob3dUb29sdGlwJywgc2hvd1Rvb2x0aXAgPT4ge1xuICAgICAgICB0aGlzLnNob3dUb29sdGlwID0gc2hvd1Rvb2x0aXBcbiAgICAgICAgaWYgKCF0aGlzLnNob3dUb29sdGlwICYmIHRoaXMudG9vbHRpcCkge1xuICAgICAgICAgIHRoaXMucmVtb3ZlVG9vbHRpcCgpXG4gICAgICAgIH1cbiAgICAgIH0pLFxuICAgIClcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMuYWRkKFxuICAgICAgYXRvbS5jb25maWcub2JzZXJ2ZSgnbGludGVyLXVpLWRlZmF1bHQuc2hvd1Byb3ZpZGVyTmFtZScsIHNob3dQcm92aWRlck5hbWUgPT4ge1xuICAgICAgICB0aGlzLnNob3dQcm92aWRlck5hbWUgPSBzaG93UHJvdmlkZXJOYW1lXG4gICAgICB9KSxcbiAgICApXG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLmFkZChcbiAgICAgIGF0b20uY29uZmlnLm9ic2VydmUoJ2xpbnRlci11aS1kZWZhdWx0LnNob3dEZWNvcmF0aW9ucycsIHNob3dEZWNvcmF0aW9ucyA9PiB7XG4gICAgICAgIGNvbnN0IG5vdEluaXRpYWwgPSB0eXBlb2YgdGhpcy5zaG93RGVjb3JhdGlvbnMgIT09ICd1bmRlZmluZWQnXG4gICAgICAgIHRoaXMuc2hvd0RlY29yYXRpb25zID0gc2hvd0RlY29yYXRpb25zXG4gICAgICAgIGlmIChub3RJbml0aWFsKSB7XG4gICAgICAgICAgdGhpcy51cGRhdGVHdXR0ZXIoKVxuICAgICAgICB9XG4gICAgICB9KSxcbiAgICApXG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLmFkZChcbiAgICAgIGF0b20uY29uZmlnLm9ic2VydmUoJ2xpbnRlci11aS1kZWZhdWx0Lmd1dHRlclBvc2l0aW9uJywgZ3V0dGVyUG9zaXRpb24gPT4ge1xuICAgICAgICBjb25zdCBub3RJbml0aWFsID0gdHlwZW9mIHRoaXMuZ3V0dGVyUG9zaXRpb24gIT09ICd1bmRlZmluZWQnXG4gICAgICAgIHRoaXMuZ3V0dGVyUG9zaXRpb24gPSBndXR0ZXJQb3NpdGlvblxuICAgICAgICBpZiAobm90SW5pdGlhbCkge1xuICAgICAgICAgIHRoaXMudXBkYXRlR3V0dGVyKClcbiAgICAgICAgfVxuICAgICAgfSksXG4gICAgKVxuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5hZGQoXG4gICAgICB0ZXh0RWRpdG9yLm9uRGlkRGVzdHJveSgoKSA9PiB7XG4gICAgICAgIHRoaXMuZGlzcG9zZSgpXG4gICAgICB9KSxcbiAgICApXG5cbiAgICBsZXQgdG9vbHRpcFN1YnNjcmlwdGlvblxuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5hZGQoXG4gICAgICBhdG9tLmNvbmZpZy5vYnNlcnZlKCdsaW50ZXItdWktZGVmYXVsdC50b29sdGlwRm9sbG93cycsIHRvb2x0aXBGb2xsb3dzID0+IHtcbiAgICAgICAgdGhpcy50b29sdGlwRm9sbG93cyA9IHRvb2x0aXBGb2xsb3dzXG4gICAgICAgIGlmICh0b29sdGlwU3Vic2NyaXB0aW9uKSB7XG4gICAgICAgICAgdG9vbHRpcFN1YnNjcmlwdGlvbi5kaXNwb3NlKClcbiAgICAgICAgfVxuICAgICAgICB0b29sdGlwU3Vic2NyaXB0aW9uID0gbmV3IENvbXBvc2l0ZURpc3Bvc2FibGUoKVxuICAgICAgICBpZiAodG9vbHRpcEZvbGxvd3MgPT09ICdNb3VzZScgfHwgdG9vbHRpcEZvbGxvd3MgPT09ICdCb3RoJykge1xuICAgICAgICAgIHRvb2x0aXBTdWJzY3JpcHRpb24uYWRkKHRoaXMubGlzdGVuRm9yTW91c2VNb3ZlbWVudCgpKVxuICAgICAgICB9XG4gICAgICAgIGlmICh0b29sdGlwRm9sbG93cyA9PT0gJ0tleWJvYXJkJyB8fCB0b29sdGlwRm9sbG93cyA9PT0gJ0JvdGgnKSB7XG4gICAgICAgICAgdG9vbHRpcFN1YnNjcmlwdGlvbi5hZGQodGhpcy5saXN0ZW5Gb3JLZXlib2FyZE1vdmVtZW50KCkpXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5yZW1vdmVUb29sdGlwKClcbiAgICAgIH0pLFxuICAgIClcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMuYWRkKFxuICAgICAgbmV3IERpc3Bvc2FibGUoZnVuY3Rpb24oKSB7XG4gICAgICAgIHRvb2x0aXBTdWJzY3JpcHRpb24uZGlzcG9zZSgpXG4gICAgICB9KSxcbiAgICApXG5cbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMuYWRkKFxuICAgICAgdGV4dEVkaXRvci5vbkRpZENoYW5nZUN1cnNvclBvc2l0aW9uKCh7IGN1cnNvciwgbmV3QnVmZmVyUG9zaXRpb24gfSkgPT4ge1xuICAgICAgICBjb25zdCBsYXN0QnVmZmVyUG9zaXRpb24gPSB0aGlzLmxhc3RDdXJzb3JQb3NpdGlvbnMuZ2V0KGN1cnNvcilcbiAgICAgICAgaWYgKCFsYXN0QnVmZmVyUG9zaXRpb24gfHwgIWxhc3RCdWZmZXJQb3NpdGlvbi5pc0VxdWFsKG5ld0J1ZmZlclBvc2l0aW9uKSkge1xuICAgICAgICAgIHRoaXMubGFzdEN1cnNvclBvc2l0aW9ucy5zZXQoY3Vyc29yLCBuZXdCdWZmZXJQb3NpdGlvbilcbiAgICAgICAgICB0aGlzLmlnbm9yZVRvb2x0aXBJbnZvY2F0aW9uID0gZmFsc2VcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy50b29sdGlwRm9sbG93cyA9PT0gJ01vdXNlJykge1xuICAgICAgICAgIHRoaXMucmVtb3ZlVG9vbHRpcCgpXG4gICAgICAgIH1cbiAgICAgIH0pLFxuICAgIClcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMuYWRkKFxuICAgICAgdGV4dEVkaXRvci5nZXRCdWZmZXIoKS5vbkRpZENoYW5nZVRleHQoKCkgPT4ge1xuICAgICAgICBjb25zdCBjdXJzb3JzID0gdGV4dEVkaXRvci5nZXRDdXJzb3JzKClcbiAgICAgICAgY3Vyc29ycy5mb3JFYWNoKGN1cnNvciA9PiB7XG4gICAgICAgICAgdGhpcy5sYXN0Q3Vyc29yUG9zaXRpb25zLnNldChjdXJzb3IsIGN1cnNvci5nZXRCdWZmZXJQb3NpdGlvbigpKVxuICAgICAgICB9KVxuICAgICAgICBpZiAodGhpcy50b29sdGlwRm9sbG93cyAhPT0gJ01vdXNlJykge1xuICAgICAgICAgIHRoaXMuaWdub3JlVG9vbHRpcEludm9jYXRpb24gPSB0cnVlXG4gICAgICAgICAgdGhpcy5yZW1vdmVUb29sdGlwKClcbiAgICAgICAgfVxuICAgICAgfSksXG4gICAgKVxuICAgIHRoaXMudXBkYXRlR3V0dGVyKClcbiAgICB0aGlzLmxpc3RlbkZvckN1cnJlbnRMaW5lKClcbiAgfVxuICBsaXN0ZW5Gb3JDdXJyZW50TGluZSgpIHtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMuYWRkKFxuICAgICAgdGhpcy50ZXh0RWRpdG9yLm9ic2VydmVDdXJzb3JzKGN1cnNvciA9PiB7XG4gICAgICAgIGNvbnN0IGhhbmRsZVBvc2l0aW9uQ2hhbmdlID0gKHsgc3RhcnQsIGVuZCB9KSA9PiB7XG4gICAgICAgICAgY29uc3QgZ3V0dGVyID0gdGhpcy5ndXR0ZXJcbiAgICAgICAgICBpZiAoIWd1dHRlciB8fCB0aGlzLnN1YnNjcmlwdGlvbnMuZGlzcG9zZWQpIHJldHVyblxuICAgICAgICAgIC8vIFdlIG5lZWQgdGhhdCBSYW5nZS5mcm9tT2JqZWN0IGhhY2sgYmVsb3cgYmVjYXVzZSB3aGVuIHdlIGZvY3VzIGluZGV4IDAgb24gbXVsdGktbGluZSBzZWxlY3Rpb25cbiAgICAgICAgICAvLyBlbmQuY29sdW1uIGlzIHRoZSBjb2x1bW4gb2YgdGhlIGxhc3QgbGluZSBidXQgbWFraW5nIGEgcmFuZ2Ugb3V0IG9mIHR3byBhbmQgdGhlbiBhY2Nlc2luZ1xuICAgICAgICAgIC8vIHRoZSBlbmQgc2VlbXMgdG8gZml4IGl0IChibGFjayBtYWdpYz8pXG4gICAgICAgICAgY29uc3QgY3VycmVudFJhbmdlID0gUmFuZ2UuZnJvbU9iamVjdChbc3RhcnQsIGVuZF0pXG4gICAgICAgICAgY29uc3QgbGluZXNSYW5nZSA9IFJhbmdlLmZyb21PYmplY3QoW1tzdGFydC5yb3csIDBdLCBbZW5kLnJvdywgSW5maW5pdHldXSlcbiAgICAgICAgICBjb25zdCBjdXJyZW50RW1wdHkgPSBjdXJyZW50UmFuZ2UuaXNFbXB0eSgpXG5cbiAgICAgICAgICAvLyBOT1RFOiBBdG9tIGRvZXMgbm90IHBhaW50IGd1dHRlciBpZiBtdWx0aS1saW5lIGFuZCBsYXN0IGxpbmUgaGFzIHplcm8gaW5kZXhcbiAgICAgICAgICBpZiAoc3RhcnQucm93ICE9PSBlbmQucm93ICYmIGN1cnJlbnRSYW5nZS5lbmQuY29sdW1uID09PSAwKSB7XG4gICAgICAgICAgICBsaW5lc1JhbmdlLmVuZC5yb3ctLVxuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAodGhpcy5sYXN0UmFuZ2UgJiYgdGhpcy5sYXN0UmFuZ2UuaXNFcXVhbChsaW5lc1JhbmdlKSAmJiBjdXJyZW50RW1wdHkgPT09IHRoaXMubGFzdEVtcHR5KSByZXR1cm5cbiAgICAgICAgICBpZiAodGhpcy5jdXJyZW50TGluZU1hcmtlcikge1xuICAgICAgICAgICAgdGhpcy5jdXJyZW50TGluZU1hcmtlci5kZXN0cm95KClcbiAgICAgICAgICAgIHRoaXMuY3VycmVudExpbmVNYXJrZXIgPSBudWxsXG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMubGFzdFJhbmdlID0gbGluZXNSYW5nZVxuICAgICAgICAgIHRoaXMubGFzdEVtcHR5ID0gY3VycmVudEVtcHR5XG5cbiAgICAgICAgICB0aGlzLmN1cnJlbnRMaW5lTWFya2VyID0gdGhpcy50ZXh0RWRpdG9yLm1hcmtTY3JlZW5SYW5nZShsaW5lc1JhbmdlLCB7XG4gICAgICAgICAgICBpbnZhbGlkYXRlOiAnbmV2ZXInLFxuICAgICAgICAgIH0pXG4gICAgICAgICAgY29uc3QgaXRlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKVxuICAgICAgICAgIGl0ZW0uY2xhc3NOYW1lID0gYGxpbmUtbnVtYmVyIGN1cnNvci1saW5lIGxpbnRlci1jdXJzb3ItbGluZSAke2N1cnJlbnRFbXB0eSA/ICdjdXJzb3ItbGluZS1uby1zZWxlY3Rpb24nIDogJyd9YFxuICAgICAgICAgIGd1dHRlci5kZWNvcmF0ZU1hcmtlcih0aGlzLmN1cnJlbnRMaW5lTWFya2VyLCB7XG4gICAgICAgICAgICBpdGVtLFxuICAgICAgICAgICAgY2xhc3M6ICdsaW50ZXItcm93JyxcbiAgICAgICAgICB9KVxuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgY3Vyc29yTWFya2VyID0gY3Vyc29yLmdldE1hcmtlcigpXG4gICAgICAgIGNvbnN0IHN1YnNjcmlwdGlvbnMgPSBuZXcgQ29tcG9zaXRlRGlzcG9zYWJsZSgpXG4gICAgICAgIHN1YnNjcmlwdGlvbnMuYWRkKFxuICAgICAgICAgIGN1cnNvck1hcmtlci5vbkRpZENoYW5nZSgoeyBuZXdIZWFkU2NyZWVuUG9zaXRpb24sIG5ld1RhaWxTY3JlZW5Qb3NpdGlvbiB9KSA9PiB7XG4gICAgICAgICAgICBoYW5kbGVQb3NpdGlvbkNoYW5nZSh7XG4gICAgICAgICAgICAgIHN0YXJ0OiBuZXdIZWFkU2NyZWVuUG9zaXRpb24sXG4gICAgICAgICAgICAgIGVuZDogbmV3VGFpbFNjcmVlblBvc2l0aW9uLFxuICAgICAgICAgICAgfSlcbiAgICAgICAgICB9KSxcbiAgICAgICAgKVxuICAgICAgICBzdWJzY3JpcHRpb25zLmFkZChcbiAgICAgICAgICBjdXJzb3Iub25EaWREZXN0cm95KCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5yZW1vdmUoc3Vic2NyaXB0aW9ucylcbiAgICAgICAgICAgIHN1YnNjcmlwdGlvbnMuZGlzcG9zZSgpXG4gICAgICAgICAgfSksXG4gICAgICAgIClcbiAgICAgICAgc3Vic2NyaXB0aW9ucy5hZGQoXG4gICAgICAgICAgbmV3IERpc3Bvc2FibGUoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5jdXJyZW50TGluZU1hcmtlcikge1xuICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRMaW5lTWFya2VyLmRlc3Ryb3koKVxuICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRMaW5lTWFya2VyID0gbnVsbFxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pLFxuICAgICAgICApXG4gICAgICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5hZGQoc3Vic2NyaXB0aW9ucylcbiAgICAgICAgaGFuZGxlUG9zaXRpb25DaGFuZ2UoY3Vyc29yTWFya2VyLmdldFNjcmVlblJhbmdlKCkpXG4gICAgICB9KSxcbiAgICApXG4gIH1cbiAgbGlzdGVuRm9yTW91c2VNb3ZlbWVudCgpIHtcbiAgICBjb25zdCBlZGl0b3JFbGVtZW50ID0gYXRvbS52aWV3cy5nZXRWaWV3KHRoaXMudGV4dEVkaXRvcilcblxuICAgIHJldHVybiBkaXNwb3NhYmxlRXZlbnQoXG4gICAgICBlZGl0b3JFbGVtZW50LFxuICAgICAgJ21vdXNlbW92ZScsXG4gICAgICBkZWJvdW5jZShcbiAgICAgICAgZXZlbnQgPT4ge1xuICAgICAgICAgIGlmICghZWRpdG9yRWxlbWVudC5jb21wb25lbnQgfHwgdGhpcy5zdWJzY3JpcHRpb25zLmRpc3Bvc2VkIHx8ICFoYXNQYXJlbnQoZXZlbnQudGFyZ2V0LCAnZGl2LnNjcm9sbC12aWV3JykpIHtcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgIH1cbiAgICAgICAgICBjb25zdCB0b29sdGlwID0gdGhpcy50b29sdGlwXG4gICAgICAgICAgaWYgKFxuICAgICAgICAgICAgdG9vbHRpcCAmJlxuICAgICAgICAgICAgbW91c2VFdmVudE5lYXJQb3NpdGlvbih7XG4gICAgICAgICAgICAgIGV2ZW50LFxuICAgICAgICAgICAgICBlZGl0b3I6IHRoaXMudGV4dEVkaXRvcixcbiAgICAgICAgICAgICAgZWRpdG9yRWxlbWVudCxcbiAgICAgICAgICAgICAgdG9vbHRpcEVsZW1lbnQ6IHRvb2x0aXAuZWxlbWVudCxcbiAgICAgICAgICAgICAgc2NyZWVuUG9zaXRpb246IHRvb2x0aXAubWFya2VyLmdldFN0YXJ0U2NyZWVuUG9zaXRpb24oKSxcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgKSB7XG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgICB9XG5cbiAgICAgICAgICB0aGlzLmN1cnNvclBvc2l0aW9uID0gZ2V0QnVmZmVyUG9zaXRpb25Gcm9tTW91c2VFdmVudChldmVudCwgdGhpcy50ZXh0RWRpdG9yLCBlZGl0b3JFbGVtZW50KVxuICAgICAgICAgIHRoaXMuaWdub3JlVG9vbHRpcEludm9jYXRpb24gPSBmYWxzZVxuICAgICAgICAgIGlmICh0aGlzLnRleHRFZGl0b3IubGFyZ2VGaWxlTW9kZSkge1xuICAgICAgICAgICAgLy8gTk9URTogSWdub3JlIGlmIGZpbGUgaXMgdG9vIGxhcmdlXG4gICAgICAgICAgICB0aGlzLmN1cnNvclBvc2l0aW9uID0gbnVsbFxuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAodGhpcy5jdXJzb3JQb3NpdGlvbikge1xuICAgICAgICAgICAgdGhpcy51cGRhdGVUb29sdGlwKHRoaXMuY3Vyc29yUG9zaXRpb24pXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlVG9vbHRpcCgpXG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICAzMDAsXG4gICAgICAgIHRydWUsXG4gICAgICApLFxuICAgIClcbiAgfVxuICBsaXN0ZW5Gb3JLZXlib2FyZE1vdmVtZW50KCkge1xuICAgIHJldHVybiB0aGlzLnRleHRFZGl0b3Iub25EaWRDaGFuZ2VDdXJzb3JQb3NpdGlvbihcbiAgICAgIGRlYm91bmNlKCh7IG5ld0J1ZmZlclBvc2l0aW9uIH0pID0+IHtcbiAgICAgICAgdGhpcy5jdXJzb3JQb3NpdGlvbiA9IG5ld0J1ZmZlclBvc2l0aW9uXG4gICAgICAgIHRoaXMudXBkYXRlVG9vbHRpcChuZXdCdWZmZXJQb3NpdGlvbilcbiAgICAgIH0sIDE2KSxcbiAgICApXG4gIH1cbiAgdXBkYXRlR3V0dGVyKCkge1xuICAgIHRoaXMucmVtb3ZlR3V0dGVyKClcbiAgICBpZiAoIXRoaXMuc2hvd0RlY29yYXRpb25zKSB7XG4gICAgICB0aGlzLmd1dHRlciA9IG51bGxcbiAgICAgIHJldHVyblxuICAgIH1cbiAgICBjb25zdCBwcmlvcml0eSA9IHRoaXMuZ3V0dGVyUG9zaXRpb24gPT09ICdMZWZ0JyA/IC0xMDAgOiAxMDBcbiAgICB0aGlzLmd1dHRlciA9IHRoaXMudGV4dEVkaXRvci5hZGRHdXR0ZXIoe1xuICAgICAgbmFtZTogJ2xpbnRlci11aS1kZWZhdWx0JyxcbiAgICAgIHByaW9yaXR5LFxuICAgIH0pXG4gICAgdGhpcy5tYXJrZXJzLmZvckVhY2goKG1hcmtlcnM6IEFycmF5PEJ1ZmZlck1hcmtlcj4sIGtleTogc3RyaW5nKSA9PiB7XG4gICAgICBjb25zdCBtZXNzYWdlID0gdGhpcy5tZXNzYWdlcy5nZXQoa2V5KVxuICAgICAgaWYgKG1lc3NhZ2UpIHtcbiAgICAgICAgZm9yIChjb25zdCBtYXJrZXIgb2YgbWFya2Vycykge1xuICAgICAgICAgIHRoaXMuZGVjb3JhdGVNYXJrZXIobWVzc2FnZSwgbWFya2VyLCAnZ3V0dGVyJylcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pXG4gIH1cbiAgcmVtb3ZlR3V0dGVyKCkge1xuICAgIGlmICh0aGlzLmd1dHRlcikge1xuICAgICAgdHJ5IHtcbiAgICAgICAgdGhpcy5ndXR0ZXIuZGVzdHJveSgpXG4gICAgICB9IGNhdGNoIChfKSB7XG4gICAgICAgIC8qIFRoaXMgdGhyb3dzIHdoZW4gdGhlIHRleHQgZWRpdG9yIGlzIGRpc3Bvc2VkICovXG4gICAgICB9XG4gICAgfVxuICB9XG4gIHVwZGF0ZVRvb2x0aXAocG9zaXRpb246ID9Qb2ludCkge1xuICAgIGlmICghcG9zaXRpb24gfHwgKHRoaXMudG9vbHRpcCAmJiB0aGlzLnRvb2x0aXAuaXNWYWxpZChwb3NpdGlvbiwgdGhpcy5tZXNzYWdlcykpKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG4gICAgdGhpcy5yZW1vdmVUb29sdGlwKClcbiAgICBpZiAoIXRoaXMuc2hvd1Rvb2x0aXApIHtcbiAgICAgIHJldHVyblxuICAgIH1cbiAgICBpZiAodGhpcy5pZ25vcmVUb29sdGlwSW52b2NhdGlvbikge1xuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgY29uc3QgbWVzc2FnZXMgPSBmaWx0ZXJNZXNzYWdlc0J5UmFuZ2VPclBvaW50KHRoaXMubWVzc2FnZXMsIHRoaXMudGV4dEVkaXRvci5nZXRQYXRoKCksIHBvc2l0aW9uKVxuICAgIGlmICghbWVzc2FnZXMubGVuZ3RoKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICB0aGlzLnRvb2x0aXAgPSBuZXcgVG9vbHRpcChtZXNzYWdlcywgcG9zaXRpb24sIHRoaXMudGV4dEVkaXRvcilcblxuICAgIC8vIHNhdmUgbWFya2VycyBvZiB0aGUgdG9vbHRpcCAoZm9yIGRlc3RvcnlpbmcgdGhlbSBpbiB0aGlzLmFwcGx5KVxuICAgIG1lc3NhZ2VzLmZvckVhY2gobWVzc2FnZSA9PiB7XG4gICAgICAvLyAkRmxvd0lnbm9yZTogdGhpcy50b29sdGlwIGlzIG5vdCBudWxsXG4gICAgICB0aGlzLnNhdmVNYXJrZXIobWVzc2FnZS5rZXksIHRoaXMudG9vbHRpcC5tYXJrZXIpXG4gICAgfSlcblxuICAgIC8vICRGbG93SWdub3JlOiB0aGlzLnRvb2x0aXAgaXMgbm90IG51bGxcbiAgICB0aGlzLnRvb2x0aXAub25EaWREZXN0cm95KCgpID0+IHtcbiAgICAgIHRoaXMudG9vbHRpcCA9IG51bGxcbiAgICB9KVxuICB9XG4gIHJlbW92ZVRvb2x0aXAoKSB7XG4gICAgaWYgKHRoaXMudG9vbHRpcCkge1xuICAgICAgdGhpcy50b29sdGlwLm1hcmtlci5kZXN0cm95KClcbiAgICB9XG4gIH1cbiAgYXBwbHkoYWRkZWQ6IEFycmF5PExpbnRlck1lc3NhZ2U+LCByZW1vdmVkOiBBcnJheTxMaW50ZXJNZXNzYWdlPikge1xuICAgIGNvbnN0IHRleHRCdWZmZXIgPSB0aGlzLnRleHRFZGl0b3IuZ2V0QnVmZmVyKClcblxuICAgIGZvciAobGV0IGkgPSAwLCBsZW5ndGggPSByZW1vdmVkLmxlbmd0aDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICBjb25zdCBtZXNzYWdlID0gcmVtb3ZlZFtpXVxuICAgICAgdGhpcy5kZXN0cm95TWFya2VyKG1lc3NhZ2Uua2V5KVxuICAgIH1cblxuICAgIGZvciAobGV0IGkgPSAwLCBsZW5ndGggPSBhZGRlZC5sZW5ndGg7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgY29uc3QgbWVzc2FnZSA9IGFkZGVkW2ldXG4gICAgICBjb25zdCBtYXJrZXJSYW5nZSA9ICRyYW5nZShtZXNzYWdlKVxuICAgICAgaWYgKCFtYXJrZXJSYW5nZSkge1xuICAgICAgICAvLyBPbmx5IGZvciBiYWNrd2FyZCBjb21wYXRpYmlsaXR5XG4gICAgICAgIGNvbnRpbnVlXG4gICAgICB9XG4gICAgICBjb25zdCBtYXJrZXIgPSB0ZXh0QnVmZmVyLm1hcmtSYW5nZShtYXJrZXJSYW5nZSwge1xuICAgICAgICBpbnZhbGlkYXRlOiAnbmV2ZXInLFxuICAgICAgfSlcbiAgICAgIHRoaXMuZGVjb3JhdGVNYXJrZXIobWVzc2FnZSwgbWFya2VyKVxuICAgICAgbWFya2VyLm9uRGlkQ2hhbmdlKCh7IG9sZEhlYWRQb3NpdGlvbiwgbmV3SGVhZFBvc2l0aW9uLCBpc1ZhbGlkIH0pID0+IHtcbiAgICAgICAgaWYgKCFpc1ZhbGlkIHx8IChuZXdIZWFkUG9zaXRpb24ucm93ID09PSAwICYmIG9sZEhlYWRQb3NpdGlvbi5yb3cgIT09IDApKSB7XG4gICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cbiAgICAgICAgaWYgKG1lc3NhZ2UudmVyc2lvbiA9PT0gMikge1xuICAgICAgICAgIG1lc3NhZ2UubG9jYXRpb24ucG9zaXRpb24gPSBtYXJrZXIucHJldmlvdXNFdmVudFN0YXRlLnJhbmdlXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfVxuXG4gICAgdGhpcy51cGRhdGVUb29sdGlwKHRoaXMuY3Vyc29yUG9zaXRpb24pXG4gIH1cbiAgZGVjb3JhdGVNYXJrZXIobWVzc2FnZTogTGludGVyTWVzc2FnZSwgbWFya2VyOiBCdWZmZXJNYXJrZXIsIHBhaW50OiAnZ3V0dGVyJyB8ICdlZGl0b3InIHwgJ2JvdGgnID0gJ2JvdGgnKSB7XG4gICAgdGhpcy5zYXZlTWFya2VyKG1lc3NhZ2Uua2V5LCBtYXJrZXIpXG4gICAgdGhpcy5tZXNzYWdlcy5zZXQobWVzc2FnZS5rZXksIG1lc3NhZ2UpXG5cbiAgICBpZiAocGFpbnQgPT09ICdib3RoJyB8fCBwYWludCA9PT0gJ2VkaXRvcicpIHtcbiAgICAgIHRoaXMudGV4dEVkaXRvci5kZWNvcmF0ZU1hcmtlcihtYXJrZXIsIHtcbiAgICAgICAgdHlwZTogJ3RleHQnLFxuICAgICAgICBjbGFzczogYGxpbnRlci1oaWdobGlnaHQgbGludGVyLSR7bWVzc2FnZS5zZXZlcml0eX1gLFxuICAgICAgfSlcbiAgICB9XG5cbiAgICBjb25zdCBndXR0ZXIgPSB0aGlzLmd1dHRlclxuICAgIGlmIChndXR0ZXIgJiYgKHBhaW50ID09PSAnYm90aCcgfHwgcGFpbnQgPT09ICdndXR0ZXInKSkge1xuICAgICAgY29uc3QgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKVxuICAgICAgZWxlbWVudC5jbGFzc05hbWUgPSBgbGludGVyLWd1dHRlciBsaW50ZXItZ3V0dGVyLSR7bWVzc2FnZS5zZXZlcml0eX0gaWNvbiBpY29uLSR7bWVzc2FnZS5pY29uIHx8ICdwcmltaXRpdmUtZG90J31gXG4gICAgICBndXR0ZXIuZGVjb3JhdGVNYXJrZXIobWFya2VyLCB7XG4gICAgICAgIGNsYXNzOiAnbGludGVyLXJvdycsXG4gICAgICAgIGl0ZW06IGVsZW1lbnQsXG4gICAgICB9KVxuICAgIH1cbiAgfVxuXG4gIC8vIGFkZCBtYXJrZXIgdG8gdGhlIG1lc3NhZ2UgPT4gbWFya2VyIG1hcFxuICBzYXZlTWFya2VyKGtleTogc3RyaW5nLCBtYXJrZXI6IEJ1ZmZlck1hcmtlcikge1xuICAgIGNvbnN0IGFsbE1hcmtlcnMgPSB0aGlzLm1hcmtlcnMuZ2V0KGtleSkgfHwgW11cbiAgICBhbGxNYXJrZXJzLnB1c2gobWFya2VyKVxuICAgIHRoaXMubWFya2Vycy5zZXQoa2V5LCBhbGxNYXJrZXJzKVxuICB9XG5cbiAgLy8gZGVzdHJveSBtYXJrZXJzIG9mIGEga2V5XG4gIGRlc3Ryb3lNYXJrZXIoa2V5OiBzdHJpbmcpIHtcbiAgICBjb25zdCBtYXJrZXJzID0gdGhpcy5tYXJrZXJzLmdldChrZXkpXG4gICAgaWYgKG1hcmtlcnMpIHtcbiAgICAgIG1hcmtlcnMuZm9yRWFjaChtYXJrZXIgPT4ge1xuICAgICAgICBpZiAobWFya2VyKSB7XG4gICAgICAgICAgbWFya2VyLmRlc3Ryb3koKVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH1cbiAgICB0aGlzLm1hcmtlcnMuZGVsZXRlKGtleSlcbiAgICB0aGlzLm1lc3NhZ2VzLmRlbGV0ZShrZXkpXG4gIH1cblxuICBvbkRpZERlc3Ryb3koY2FsbGJhY2s6IEZ1bmN0aW9uKTogRGlzcG9zYWJsZSB7XG4gICAgcmV0dXJuIHRoaXMuZW1pdHRlci5vbignZGlkLWRlc3Ryb3knLCBjYWxsYmFjaylcbiAgfVxuICBkaXNwb3NlKCkge1xuICAgIHRoaXMuZW1pdHRlci5lbWl0KCdkaWQtZGVzdHJveScpXG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLmRpc3Bvc2UoKVxuICAgIHRoaXMucmVtb3ZlR3V0dGVyKClcbiAgICB0aGlzLnJlbW92ZVRvb2x0aXAoKVxuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gRWRpdG9yXG4iXX0=