Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _atom = require('atom');

var _atomSpacePenViewsPlus = require('atom-space-pen-views-plus');

var _underscore = require('underscore');

var _underscore2 = _interopRequireDefault(_underscore);

var _scriptInputView = require('./script-input-view');

var _scriptInputView2 = _interopRequireDefault(_scriptInputView);

'use babel';

var ScriptOptionsView = (function (_View) {
  _inherits(ScriptOptionsView, _View);

  function ScriptOptionsView() {
    _classCallCheck(this, ScriptOptionsView);

    _get(Object.getPrototypeOf(ScriptOptionsView.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(ScriptOptionsView, [{
    key: 'initialize',
    value: function initialize(runOptions) {
      var _this = this;

      this.runOptions = runOptions;
      this.emitter = new _atom.Emitter();

      this.subscriptions = new _atom.CompositeDisposable();
      this.subscriptions.add(atom.commands.add('atom-workspace', {
        'core:cancel': function coreCancel() {
          return _this.hide();
        },
        'core:close': function coreClose() {
          return _this.hide();
        },
        'script:close-options': function scriptCloseOptions() {
          return _this.hide();
        },
        'script:run-options': function scriptRunOptions() {
          return _this.panel.isVisible() ? _this.hide() : _this.show();
        },
        'script:save-options': function scriptSaveOptions() {
          return _this.saveOptions();
        }
      }));

      // handling focus traversal and run on enter
      this.find('atom-text-editor').on('keydown', function (e) {
        if (e.keyCode !== 9 && e.keyCode !== 13) return true;

        switch (e.keyCode) {
          case 9:
            {
              e.preventDefault();
              e.stopPropagation();
              var row = _this.find(e.target).parents('tr:first').nextAll('tr:first');
              if (row.length) {
                return row.find('atom-text-editor').focus();
              }
              return _this.buttonCancel.focus();
            }
          case 13:
            return _this.run();
        }
        return null;
      });

      this.panel = atom.workspace.addModalPanel({ item: this });
      this.panel.hide();
    }
  }, {
    key: 'getOptions',
    value: function getOptions() {
      return {
        workingDirectory: this.inputCwd.get(0).getModel().getText(),
        cmd: this.inputCommand.get(0).getModel().getText(),
        cmdArgs: this.constructor.splitArgs(this.inputCommandArgs.get(0).getModel().getText()),
        env: this.inputEnv.get(0).getModel().getText(),
        scriptArgs: this.constructor.splitArgs(this.inputScriptArgs.get(0).getModel().getText())
      };
    }
  }, {
    key: 'saveOptions',
    value: function saveOptions() {
      var options = this.getOptions();
      for (var option in options) {
        var value = options[option];
        this.runOptions[option] = value;
      }
    }
  }, {
    key: 'onProfileSave',
    value: function onProfileSave(callback) {
      return this.emitter.on('on-profile-save', callback);
    }

    // Saves specified options as new profile
  }, {
    key: 'saveProfile',
    value: function saveProfile() {
      var _this2 = this;

      this.hide();

      var options = this.getOptions();

      var inputView = new _scriptInputView2['default']({ caption: 'Enter profile name:' });
      inputView.onCancel(function () {
        return _this2.show();
      });
      inputView.onConfirm(function (profileName) {
        if (!profileName) return;
        _underscore2['default'].forEach(_this2.find('atom-text-editor'), function (editor) {
          editor.getModel().setText('');
        });

        // clean up the options
        _this2.saveOptions();

        // add to global profiles list
        _this2.emitter.emit('on-profile-save', { name: profileName, options: options });
      });

      inputView.show();
    }
  }, {
    key: 'close',
    value: function close() {
      this.hide();
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      if (this.subscriptions) this.subscriptions.dispose();
    }
  }, {
    key: 'show',
    value: function show() {
      this.panel.show();
      this.inputCwd.focus();
    }
  }, {
    key: 'hide',
    value: function hide() {
      this.panel.hide();
      atom.workspace.getActivePane().activate();
    }
  }, {
    key: 'run',
    value: function run() {
      this.saveOptions();
      this.hide();
      atom.commands.dispatch(this.getWorkspaceView(), 'script:run');
    }
  }, {
    key: 'getWorkspaceView',
    value: function getWorkspaceView() {
      return atom.views.getView(atom.workspace);
    }
  }], [{
    key: 'content',
    value: function content() {
      var _this3 = this;

      this.div({ 'class': 'options-view' }, function () {
        _this3.h4({ 'class': 'modal-header' }, 'Configure Run Options');
        _this3.div({ 'class': 'modal-body' }, function () {
          _this3.table(function () {
            _this3.tr(function () {
              _this3.td({ 'class': 'first' }, function () {
                return _this3.label('Current Working Directory:');
              });
              _this3.td({ 'class': 'second' }, function () {
                return _this3.tag('atom-text-editor', { mini: '', 'class': 'editor mini', outlet: 'inputCwd' });
              });
            });
            _this3.tr(function () {
              _this3.td(function () {
                return _this3.label('Command');
              });
              _this3.td(function () {
                return _this3.tag('atom-text-editor', { mini: '', 'class': 'editor mini', outlet: 'inputCommand' });
              });
            });
            _this3.tr(function () {
              _this3.td(function () {
                return _this3.label('Command Arguments:');
              });
              _this3.td(function () {
                return _this3.tag('atom-text-editor', { mini: '', 'class': 'editor mini', outlet: 'inputCommandArgs' });
              });
            });
            _this3.tr(function () {
              _this3.td(function () {
                return _this3.label('Program Arguments:');
              });
              _this3.td(function () {
                return _this3.tag('atom-text-editor', { mini: '', 'class': 'editor mini', outlet: 'inputScriptArgs' });
              });
            });
            _this3.tr(function () {
              _this3.td(function () {
                return _this3.label('Environment Variables:');
              });
              _this3.td(function () {
                return _this3.tag('atom-text-editor', { mini: '', 'class': 'editor mini', outlet: 'inputEnv' });
              });
            });
          });
        });
        _this3.div({ 'class': 'modal-footer' }, function () {
          var css = 'btn inline-block-tight';
          _this3.button({ 'class': 'btn ' + css + ' cancel', outlet: 'buttonCancel', click: 'close' }, function () {
            return _this3.span({ 'class': 'icon icon-x' }, 'Cancel');
          });
          _this3.span({ 'class': 'pull-right' }, function () {
            _this3.button({ 'class': 'btn ' + css + ' save-profile', outlet: 'buttonSaveProfile', click: 'saveProfile' }, function () {
              return _this3.span({ 'class': 'icon icon-file-text' }, 'Save as profile');
            });
            _this3.button({ 'class': 'btn ' + css + ' run', outlet: 'buttonRun', click: 'run' }, function () {
              return _this3.span({ 'class': 'icon icon-playback-play' }, 'Run');
            });
          });
        });
      });
    }
  }, {
    key: 'splitArgs',
    value: function splitArgs(argText) {
      var text = argText.trim();
      var argSubstringRegex = /([^'"\s]+)|((["'])(.*?)\3)/g;
      var args = [];
      var lastMatchEndPosition = -1;
      var match = argSubstringRegex.exec(text);
      while (match !== null) {
        var matchWithoutQuotes = match[1] || match[4];
        // Combine current result with last match, if last match ended where this
        // one begins.
        if (lastMatchEndPosition === match.index) {
          args[args.length - 1] += matchWithoutQuotes;
        } else {
          args.push(matchWithoutQuotes);
        }

        lastMatchEndPosition = argSubstringRegex.lastIndex;
        match = argSubstringRegex.exec(text);
      }
      return args;
    }
  }]);

  return ScriptOptionsView;
})(_atomSpacePenViewsPlus.View);

exports['default'] = ScriptOptionsView;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZpbGU6Ly8vQzovVXNlcnMvY2tuanUvLmF0b20vcGFja2FnZXMvc2NyaXB0L2xpYi9zY3JpcHQtb3B0aW9ucy12aWV3LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O29CQUU2QyxNQUFNOztxQ0FDOUIsMkJBQTJCOzswQkFDbEMsWUFBWTs7OzsrQkFDRSxxQkFBcUI7Ozs7QUFMakQsV0FBVyxDQUFDOztJQU9TLGlCQUFpQjtZQUFqQixpQkFBaUI7O1dBQWpCLGlCQUFpQjswQkFBakIsaUJBQWlCOzsrQkFBakIsaUJBQWlCOzs7ZUFBakIsaUJBQWlCOztXQXVDMUIsb0JBQUMsVUFBVSxFQUFFOzs7QUFDckIsVUFBSSxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUM7QUFDN0IsVUFBSSxDQUFDLE9BQU8sR0FBRyxtQkFBYSxDQUFDOztBQUU3QixVQUFJLENBQUMsYUFBYSxHQUFHLCtCQUF5QixDQUFDO0FBQy9DLFVBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLGdCQUFnQixFQUFFO0FBQ3pELHFCQUFhLEVBQUU7aUJBQU0sTUFBSyxJQUFJLEVBQUU7U0FBQTtBQUNoQyxvQkFBWSxFQUFFO2lCQUFNLE1BQUssSUFBSSxFQUFFO1NBQUE7QUFDL0IsOEJBQXNCLEVBQUU7aUJBQU0sTUFBSyxJQUFJLEVBQUU7U0FBQTtBQUN6Qyw0QkFBb0IsRUFBRTtpQkFBTyxNQUFLLEtBQUssQ0FBQyxTQUFTLEVBQUUsR0FBRyxNQUFLLElBQUksRUFBRSxHQUFHLE1BQUssSUFBSSxFQUFFO1NBQUM7QUFDaEYsNkJBQXFCLEVBQUU7aUJBQU0sTUFBSyxXQUFXLEVBQUU7U0FBQTtPQUNoRCxDQUFDLENBQUMsQ0FBQzs7O0FBR0osVUFBSSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxTQUFTLEVBQUUsVUFBQyxDQUFDLEVBQUs7QUFDakQsWUFBSSxDQUFDLENBQUMs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SSxDQUFDLGtCQUFrQixDQUFDLENBQUM7U0FDL0I7O0FBRUQsNEJBQW9CLEdBQUcsaUJBQWlCLENBQUMsU0FBUyxDQUFDO0FBQ25ELGFBQUssR0FBRyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7T0FDdEM7QUFDRCxhQUFPLElBQUksQ0FBQztLQUNiOzs7U0EvRmtCLGlCQUFpQjs7O3FCQUFqQixpQkFBaUIiLCJmaWxlIjoiZmlsZTovLy9DOi9Vc2Vycy9ja25qdS8uYXRvbS9wYWNrYWdlcy9zY3JpcHQvbGliL3NjcmlwdC1vcHRpb25zLXZpZXcuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIGJhYmVsJztcblxuaW1wb3J0IHsgQ29tcG9zaXRlRGlzcG9zYWJsZSwgRW1pdHRlciB9IGZyb20gJ2F0b20nO1xuaW1wb3J0IHsgVmlldyB9IGZyb20gJ2F0b20tc3BhY2UtcGVuLXZpZXdzLXBsdXMnO1xuaW1wb3J0IF8gZnJvbSAndW5kZXJzY29yZSc7XG5pbXBvcnQgU2NyaXB0SW5wdXRWaWV3IGZyb20gJy4vc2NyaXB0LWlucHV0LXZpZXcnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTY3JpcHRPcHRpb25zVmlldyBleHRlbmRzIFZpZXcge1xuICBzdGF0aWMgY29udGVudCgpIHtcbiAgICB0aGlzLmRpdih7IGNsYXNzOiAnb3B0aW9ucy12aWV3JyB9LCAoKSA9PiB7XG4gICAgICB0aGlzLmg0KHsgY2xhc3M6ICdtb2RhbC1oZWFkZXInIH0sICdDb25maWd1cmUgUnVuIE9wdGlvbnMnKTtcbiAgICAgIHRoaXMuZGl2KHsgY2xhc3M6ICdtb2RhbC1ib2R5JyB9LCAoKSA9PiB7XG4gICAgICAgIHRoaXMudGFibGUoKCkgPT4ge1xuICAgICAgICAgIHRoaXMudHIoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy50ZCh7IGNsYXNzOiAnZmlyc3QnIH0sICgpID0+IHRoaXMubGFiZWwoJ0N1cnJlbnQgV29ya2luZyBEaXJlY3Rvcnk6JykpO1xuICAgICAgICAgICAgdGhpcy50ZCh7IGNsYXNzOiAnc2Vjb25kJyB9LCAoKSA9PiB0aGlzLnRhZygnYXRvbS10ZXh0LWVkaXRvcicsIHsgbWluaTogJycsIGNsYXNzOiAnZWRpdG9yIG1pbmknLCBvdXRsZXQ6ICdpbnB1dEN3ZCcgfSkpO1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIHRoaXMudHIoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy50ZCgoKSA9PiB0aGlzLmxhYmVsKCdDb21tYW5kJykpO1xuICAgICAgICAgICAgdGhpcy50ZCgoKSA9PiB0aGlzLnRhZygnYXRvbS10ZXh0LWVkaXRvcicsIHsgbWluaTogJycsIGNsYXNzOiAnZWRpdG9yIG1pbmknLCBvdXRsZXQ6ICdpbnB1dENvbW1hbmQnIH0pKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgICB0aGlzLnRyKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMudGQoKCkgPT4gdGhpcy5sYWJlbCgnQ29tbWFuZCBBcmd1bWVudHM6JykpO1xuICAgICAgICAgICAgdGhpcy50ZCgoKSA9PiB0aGlzLnRhZygnYXRvbS10ZXh0LWVkaXRvcicsIHsgbWluaTogJycsIGNsYXNzOiAnZWRpdG9yIG1pbmknLCBvdXRsZXQ6ICdpbnB1dENvbW1hbmRBcmdzJyB9KSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgdGhpcy50cigoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnRkKCgpID0+IHRoaXMubGFiZWwoJ1Byb2dyYW0gQXJndW1lbnRzOicpKTtcbiAgICAgICAgICAgIHRoaXMudGQoKCkgPT4gdGhpcy50YWcoJ2F0b20tdGV4dC1lZGl0b3InLCB7IG1pbmk6ICcnLCBjbGFzczogJ2VkaXRvciBtaW5pJywgb3V0bGV0OiAnaW5wdXRTY3JpcHRBcmdzJyB9KSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgdGhpcy50cigoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnRkKCgpID0+IHRoaXMubGFiZWwoJ0Vudmlyb25tZW50IFZhcmlhYmxlczonKSk7XG4gICAgICAgICAgICB0aGlzLnRkKCgpID0+IHRoaXMudGFnKCdhdG9tLXRleHQtZWRpdG9yJywgeyBtaW5pOiAnJywgY2xhc3M6ICdlZGl0b3IgbWluaScsIG91dGxldDogJ2lucHV0RW52JyB9KSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgICB0aGlzLmRpdih7IGNsYXNzOiAnbW9kYWwtZm9vdGVyJyB9LCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IGNzcyA9ICdidG4gaW5saW5lLWJsb2NrLXRpZ2h0JztcbiAgICAgICAgdGhpcy5idXR0b24oeyBjbGFzczogYGJ0biAke2Nzc30gY2FuY2VsYCwgb3V0bGV0OiAnYnV0dG9uQ2FuY2VsJywgY2xpY2s6ICdjbG9zZScgfSwgKCkgPT4gdGhpcy5zcGFuKHsgY2xhc3M6ICdpY29uIGljb24teCcgfSwgJ0NhbmNlbCcpKTtcbiAgICAgICAgdGhpcy5zcGFuKHsgY2xhc3M6ICdwdWxsLXJpZ2h0JyB9LCAoKSA9PiB7XG4gICAgICAgICAgdGhpcy5idXR0b24oeyBjbGFzczogYGJ0biAke2Nzc30gc2F2ZS1wcm9maWxlYCwgb3V0bGV0OiAnYnV0dG9uU2F2ZVByb2ZpbGUnLCBjbGljazogJ3NhdmVQcm9maWxlJyB9LCAoKSA9PiB0aGlzLnNwYW4oeyBjbGFzczogJ2ljb24gaWNvbi1maWxlLXRleHQnIH0sICdTYXZlIGFzIHByb2ZpbGUnKSk7XG4gICAgICAgICAgdGhpcy5idXR0b24oeyBjbGFzczogYGJ0biAke2Nzc30gcnVuYCwgb3V0bGV0OiAnYnV0dG9uUnVuJywgY2xpY2s6ICdydW4nIH0sICgpID0+IHRoaXMuc3Bhbih7IGNsYXNzOiAnaWNvbiBpY29uLXBsYXliYWNrLXBsYXknIH0sICdSdW4nKSk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBpbml0aWFsaXplKHJ1bk9wdGlvbnMpIHtcbiAgICB0aGlzLnJ1bk9wdGlvbnMgPSBydW5PcHRpb25zO1xuICAgIHRoaXMuZW1pdHRlciA9IG5ldyBFbWl0dGVyKCk7XG5cbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMgPSBuZXcgQ29tcG9zaXRlRGlzcG9zYWJsZSgpO1xuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5hZGQoYXRvbS5jb21tYW5kcy5hZGQoJ2F0b20td29ya3NwYWNlJywge1xuICAgICAgJ2NvcmU6Y2FuY2VsJzogKCkgPT4gdGhpcy5oaWRlKCksXG4gICAgICAnY29yZTpjbG9zZSc6ICgpID0+IHRoaXMuaGlkZSgpLFxuICAgICAgJ3NjcmlwdDpjbG9zZS1vcHRpb25zJzogKCkgPT4gdGhpcy5oaWRlKCksXG4gICAgICAnc2NyaXB0OnJ1bi1vcHRpb25zJzogKCkgPT4gKHRoaXMucGFuZWwuaXNWaXNpYmxlKCkgPyB0aGlzLmhpZGUoKSA6IHRoaXMuc2hvdygpKSxcbiAgICAgICdzY3JpcHQ6c2F2ZS1vcHRpb25zJzogKCkgPT4gdGhpcy5zYXZlT3B0aW9ucygpLFxuICAgIH0pKTtcblxuICAgIC8vIGhhbmRsaW5nIGZvY3VzIHRyYXZlcnNhbCBhbmQgcnVuIG9uIGVudGVyXG4gICAgdGhpcy5maW5kKCdhdG9tLXRleHQtZWRpdG9yJykub24oJ2tleWRvd24nLCAoZSkgPT4ge1xuICAgICAgaWYgKGUua2V5Q29kZSAhPT0gOSAmJiBlLmtleUNvZGUgIT09IDEzKSByZXR1cm4gdHJ1ZTtcblxuICAgICAgc3dpdGNoIChlLmtleUNvZGUpIHtcbiAgICAgICAgY2FzZSA5OiB7XG4gICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgY29uc3Qgcm93ID0gdGhpcy5maW5kKGUudGFyZ2V0KS5wYXJlbnRzKCd0cjpmaXJzdCcpLm5leHRBbGwoJ3RyOmZpcnN0Jyk7XG4gICAgICAgICAgaWYgKHJvdy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHJldHVybiByb3cuZmluZCgnYXRvbS10ZXh0LWVkaXRvcicpLmZvY3VzKCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiB0aGlzLmJ1dHRvbkNhbmNlbC5mb2N1cygpO1xuICAgICAgICB9XG4gICAgICAgIGNhc2UgMTM6IHJldHVybiB0aGlzLnJ1bigpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfSk7XG5cbiAgICB0aGlzLnBhbmVsID0gYXRvbS53b3Jrc3BhY2UuYWRkTW9kYWxQYW5lbCh7IGl0ZW06IHRoaXMgfSk7XG4gICAgdGhpcy5wYW5lbC5oaWRlKCk7XG4gIH1cblxuICBzdGF0aWMgc3BsaXRBcmdzKGFyZ1RleHQpIHtcbiAgICBjb25zdCB0ZXh0ID0gYXJnVGV4dC50cmltKCk7XG4gICAgY29uc3QgYXJnU3Vic3RyaW5nUmVnZXggPSAvKFteJ1wiXFxzXSspfCgoW1wiJ10pKC4qPylcXDMpL2c7XG4gICAgY29uc3QgYXJncyA9IFtdO1xuICAgIGxldCBsYXN0TWF0Y2hFbmRQb3NpdGlvbiA9IC0xO1xuICAgIGxldCBtYXRjaCA9IGFyZ1N1YnN0cmluZ1JlZ2V4LmV4ZWModGV4dCk7XG4gICAgd2hpbGUgKG1hdGNoICE9PSBudWxsKSB7XG4gICAgICBjb25zdCBtYXRjaFdpdGhvdXRRdW90ZXMgPSBtYXRjaFsxXSB8fCBtYXRjaFs0XTtcbiAgICAgIC8vIENvbWJpbmUgY3VycmVudCByZXN1bHQgd2l0aCBsYXN0IG1hdGNoLCBpZiBsYXN0IG1hdGNoIGVuZGVkIHdoZXJlIHRoaXNcbiAgICAgIC8vIG9uZSBiZWdpbnMuXG4gICAgICBpZiAobGFzdE1hdGNoRW5kUG9zaXRpb24gPT09IG1hdGNoLmluZGV4KSB7XG4gICAgICAgIGFyZ3NbYXJncy5sZW5ndGggLSAxXSArPSBtYXRjaFdpdGhvdXRRdW90ZXM7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBhcmdzLnB1c2gobWF0Y2hXaXRob3V0UXVvdGVzKTtcbiAgICAgIH1cblxuICAgICAgbGFzdE1hdGNoRW5kUG9zaXRpb24gPSBhcmdTdWJzdHJpbmdSZWdleC5sYXN0SW5kZXg7XG4gICAgICBtYXRjaCA9IGFyZ1N1YnN0cmluZ1JlZ2V4LmV4ZWModGV4dCk7XG4gICAgfVxuICAgIHJldHVybiBhcmdzO1xuICB9XG5cbiAgZ2V0T3B0aW9ucygpIHtcbiAgICByZXR1cm4ge1xuICAgICAgd29ya2luZ0RpcmVjdG9yeTogdGhpcy5pbnB1dEN3ZC5nZXQoMCkuZ2V0TW9kZWwoKS5nZXRUZXh0KCksXG4gICAgICBjbWQ6IHRoaXMuaW5wdXRDb21tYW5kLmdldCgwKS5nZXRNb2RlbCgpLmdldFRleHQoKSxcbiAgICAgIGNtZEFyZ3M6IHRoaXMuY29uc3RydWN0b3Iuc3BsaXRBcmdzKFxuICAgICAgICB0aGlzLmlucHV0Q29tbWFuZEFyZ3MuZ2V0KDApLmdldE1vZGVsKCkuZ2V0VGV4dCgpLFxuICAgICAgKSxcbiAgICAgIGVudjogdGhpcy5pbnB1dEVudi5nZXQoMCkuZ2V0TW9kZWwoKS5nZXRUZXh0KCksXG4gICAgICBzY3JpcHRBcmdzOiB0aGlzLmNvbnN0cnVjdG9yLnNwbGl0QXJncyhcbiAgICAgICAgdGhpcy5pbnB1dFNjcmlwdEFyZ3MuZ2V0KDApLmdldE1vZGVsKCkuZ2V0VGV4dCgpLFxuICAgICAgKSxcbiAgICB9O1xuICB9XG5cbiAgc2F2ZU9wdGlvbnMoKSB7XG4gICAgY29uc3Qgb3B0aW9ucyA9IHRoaXMuZ2V0T3B0aW9ucygpO1xuICAgIGZvciAoY29uc3Qgb3B0aW9uIGluIG9wdGlvbnMpIHtcbiAgICAgIGNvbnN0IHZhbHVlID0gb3B0aW9uc1tvcHRpb25dO1xuICAgICAgdGhpcy5ydW5PcHRpb25zW29wdGlvbl0gPSB2YWx1ZTtcbiAgICB9XG4gIH1cblxuICBvblByb2ZpbGVTYXZlKGNhbGxiYWNrKSB7XG4gICAgcmV0dXJuIHRoaXMuZW1pdHRlci5vbignb24tcHJvZmlsZS1zYXZlJywgY2FsbGJhY2spO1xuICB9XG5cbiAgLy8gU2F2ZXMgc3BlY2lmaWVkIG9wdGlvbnMgYXMgbmV3IHByb2ZpbGVcbiAgc2F2ZVByb2ZpbGUoKSB7XG4gICAgdGhpcy5oaWRlKCk7XG5cbiAgICBjb25zdCBvcHRpb25zID0gdGhpcy5nZXRPcHRpb25zKCk7XG5cbiAgICBjb25zdCBpbnB1dFZpZXcgPSBuZXcgU2NyaXB0SW5wdXRWaWV3KHsgY2FwdGlvbjogJ0VudGVyIHByb2ZpbGUgbmFtZTonIH0pO1xuICAgIGlucHV0Vmlldy5vbkNhbmNlbCgoKSA9PiB0aGlzLnNob3coKSk7XG4gICAgaW5wdXRWaWV3Lm9uQ29uZmlybSgocHJvZmlsZU5hbWUpID0+IHtcbiAgICAgIGlmICghcHJvZmlsZU5hbWUpIHJldHVybjtcbiAgICAgIF8uZm9yRWFjaCh0aGlzLmZpbmQoJ2F0b20tdGV4dC1lZGl0b3InKSwgKGVkaXRvcikgPT4ge1xuICAgICAgICBlZGl0b3IuZ2V0TW9kZWwoKS5zZXRUZXh0KCcnKTtcbiAgICAgIH0pO1xuXG4gICAgICAvLyBjbGVhbiB1cCB0aGUgb3B0aW9uc1xuICAgICAgdGhpcy5zYXZlT3B0aW9ucygpO1xuXG4gICAgICAvLyBhZGQgdG8gZ2xvYmFsIHByb2ZpbGVzIGxpc3RcbiAgICAgIHRoaXMuZW1pdHRlci5lbWl0KCdvbi1wcm9maWxlLXNhdmUnLCB7IG5hbWU6IHByb2ZpbGVOYW1lLCBvcHRpb25zIH0pO1xuICAgIH0pO1xuXG4gICAgaW5wdXRWaWV3LnNob3coKTtcbiAgfVxuXG4gIGNsb3NlKCkge1xuICAgIHRoaXMuaGlkZSgpO1xuICB9XG5cbiAgZGVzdHJveSgpIHtcbiAgICBpZiAodGhpcy5zdWJzY3JpcHRpb25zKSB0aGlzLnN1YnNjcmlwdGlvbnMuZGlzcG9zZSgpO1xuICB9XG5cbiAgc2hvdygpIHtcbiAgICB0aGlzLnBhbmVsLnNob3coKTtcbiAgICB0aGlzLmlucHV0Q3dkLmZvY3VzKCk7XG4gIH1cblxuICBoaWRlKCkge1xuICAgIHRoaXMucGFuZWwuaGlkZSgpO1xuICAgIGF0b20ud29ya3NwYWNlLmdldEFjdGl2ZVBhbmUoKS5hY3RpdmF0ZSgpO1xuICB9XG5cbiAgcnVuKCkge1xuICAgIHRoaXMuc2F2ZU9wdGlvbnMoKTtcbiAgICB0aGlzLmhpZGUoKTtcbiAgICBhdG9tLmNvbW1hbmRzLmRpc3BhdGNoKHRoaXMuZ2V0V29ya3NwYWNlVmlldygpLCAnc2NyaXB0OnJ1bicpO1xuICB9XG5cbiAgZ2V0V29ya3NwYWNlVmlldygpIHtcbiAgICByZXR1cm4gYXRvbS52aWV3cy5nZXRWaWV3KGF0b20ud29ya3NwYWNlKTtcbiAgfVxufVxuIl19