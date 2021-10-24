var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { var callNext = step.bind(null, 'next'); var callThrow = step.bind(null, 'throw'); function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(callNext, callThrow); } } callNext(); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _atom = require('atom');

var _delegate = require('./delegate');

var _delegate2 = _interopRequireDefault(_delegate);

var _dock = require('./dock');

var _dock2 = _interopRequireDefault(_dock);

var Panel = (function () {
  function Panel() {
    var _this = this;

    _classCallCheck(this, Panel);

    this.panel = null;
    this.element = document.createElement('div');
    this.delegate = new _delegate2['default']();
    this.messages = [];
    this.deactivating = false;
    this.subscriptions = new _atom.CompositeDisposable();
    this.showPanelStateMessages = false;

    this.subscriptions.add(this.delegate);
    this.subscriptions.add(atom.config.observe('linter-ui-default.hidePanelWhenEmpty', function (hidePanelWhenEmpty) {
      _this.hidePanelWhenEmpty = hidePanelWhenEmpty;
      _this.refresh();
    }));
    this.subscriptions.add(atom.workspace.onDidDestroyPane(function (_ref) {
      var destroyedPane = _ref.pane;

      var isPaneItemDestroyed = destroyedPane.getItems().includes(_this.panel);
      if (isPaneItemDestroyed && !_this.deactivating) {
        _this.panel = null;
        atom.config.set('linter-ui-default.showPanel', false);
      }
    }));
    this.subscriptions.add(atom.workspace.onDidDestroyPaneItem(function (_ref2) {
      var paneItem = _ref2.item;

      if (paneItem instanceof _dock2['default'] && !_this.deactivating) {
        _this.panel = null;
        atom.config.set('linter-ui-default.showPanel', false);
      }
    }));
    this.subscriptions.add(atom.config.observe('linter-ui-default.showPanel', function (showPanel) {
      _this.showPanelConfig = showPanel;
      _this.refresh();
    }));
    this.subscriptions.add(atom.workspace.getCenter().observeActivePaneItem(function () {
      _this.showPanelStateMessages = !!_this.delegate.filteredMessages.length;
      _this.refresh();
    }));
    this.activationTimer = window.requestIdleCallback(function () {
      var firstTime = true;
      var dock = atom.workspace.getBottomDock();
      _this.subscriptions.add(dock.onDidChangeActivePaneItem(function (paneItem) {
        if (!_this.panel || _this.getPanelLocation() !== 'bottom') {
          return;
        }
        if (firstTime) {
          firstTime = false;
          return;
        }
        var isFocusIn = paneItem === _this.panel;
        var externallyToggled = isFocusIn !== _this.showPanelConfig;
        if (externallyToggled) {
          atom.config.set('linter-ui-default.showPanel', !_this.showPanelConfig);
        }
      }));
      _this.subscriptions.add(dock.onDidChangeVisible(function (visible) {
        if (!_this.panel || _this.getPanelLocation() !== 'bottom') {
          return;
        }
        if (!visible) {
          // ^ When it's time to tell config to hide
          if (_this.showPanelConfig && _this.hidePanelWhenEmpty && !_this.showPanelStateMessages) {
            // Ignore because we just don't have any messages to show, everything else is fine
            return;
          }
        }
        if (dock.getActivePaneItem() !== _this.panel) {
          // Ignore since the visibility of this panel is not changing
          return;
        }
        var externallyToggled = visible !== _this.showPanelConfig;
        if (externallyToggled) {
          atom.config.set('linter-ui-default.showPanel', !_this.showPanelConfig);
        }
      }));

      _this.activate();
    });
  }

  _createClass(Panel, [{
    key: 'getPanelLocation',
    value: function getPanelLocation() {
      if (!this.panel) {
        return null;
      }
      var paneContainer = atom.workspace.paneContainerForItem(this.panel);
      return paneContainer && paneContainer.location || null;
    }
  }, {
    key: 'activate',
    value: _asyncToGenerator(function* () {
      if (this.panel) {
        return;
      }
      this.panel = new _dock2['default'](this.delegate);
      yield atom.workspace.open(this.panel, {
        activatePane: false,
        activateItem: false,
        searchAllPanes: true
      });
      this.update();
      this.refresh();
    })
  }, {
    key: 'update',
    value: function update() {
      var newMessages = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];

      if (newMessages) {
        this.messages = newMessages;
      }
      this.delegate.update(this.messages);
      this.showPanelStateMessages = !!this.delegate.filteredMessages.length;
      this.refresh();
    }
  }, {
    key: 'refresh',
    value: _asyncToGenerator(function* () {
      var panel = this.panel;
      if (panel === null) {
        if (this.showPanelConfig) {
          yield this.activate();
        }
        return;
      }
      var paneContainer = atom.workspace.paneContainerForItem(panel);
      if (!paneContainer || paneContainer.location !== 'bottom') {
        return;
      }
      var isActivePanel = paneContainer.getActivePaneItem() === panel;
      var visibilityAllowed1 = this.showPanelConfig;
      var visibilityAllowed2 = this.hidePanelWhenEmpty ? this.showPanelStateMessages : true;
      if (visibilityAllowed1 && visibilityAllowed2) {
        if (!isActivePanel) {
          paneContainer.paneForItem(panel).activateItem(panel);
        }
        paneContainer.show();
        panel.doPanelResize();
      } else if (isActivePanel) {
        paneContainer.hide();
      }
    })
  }, {
    key: 'dispose',
    value: function dispose() {
      this.deactivating = true;
      if (this.panel) {
        this.panel.dispose();
      }
      this.subscriptions.dispose();
      window.cancelIdleCallback(this.activationTimer);
    }
  }]);

  return Panel;
})();

module.exports = Panel;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZpbGU6Ly8vQzovVXNlcnMvY2tuanUvLmF0b20vcGFja2FnZXMvbGludGVyLXVpLWRlZmF1bHQvbGliL3BhbmVsL2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O29CQUVvQyxNQUFNOzt3QkFDckIsWUFBWTs7OztvQkFDWCxRQUFROzs7O0lBR3hCLEtBQUs7QUFXRSxXQVhQLEtBQUssR0FXSzs7OzBCQVhWLEtBQUs7O0FBWVAsUUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUE7QUFDakIsUUFBSSxDQUFDLE9BQU8sR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFBO0FBQzVDLFFBQUksQ0FBQyxRQUFRLEdBQUcsMkJBQWMsQ0FBQTtBQUM5QixRQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQTtBQUNsQixRQUFJLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQTtBQUN6QixRQUFJLENBQUMsYUFBYSxHQUFHLCtCQUF5QixDQUFBO0FBQzlDLFFBQUksQ0FBQyxzQkFBc0IsR0FBRyxLQUFLLENBQUE7O0FBRW5DLFFBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQTtBQUNyQyxRQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FDcEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsc0NBQXNDLEVBQUUsVUFBQSxrQkFBa0IsRUFBSTtBQUNoRixZQUFLLGtCQUFrQixHQUFHLGtCQUFrQixDQUFBO0FBQzVDLFlBQUssT0FBTyxFQUFFLENBQUE7S0FDZixDQUFDLENBQ0gsQ0FBQTtBQUNELFFBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUNwQixJQUFJLENBQUMsU0FBUyxDQUFDLGdCQUFnQixDQUFDLFVBQUMsSUFBdUIsRUFBSztVQUFwQixhQUFhLEdBQXJCLElBQXVCLENBQXJCLElBQUk7O0FBQ3JDLFVBQU0sbUJBQW1CLEdBQUcsYUFBYSxDQUFDLFFBQVEsRUFB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Q3hCLFVBQUksSUFBSSxDQUFDLEtBQUssRUFBRTtBQUNkLFlBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLENBQUE7T0FDckI7QUFDRCxVQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sRUFBRSxDQUFBO0FBQzVCLFlBQU0sQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUE7S0FDaEQ7OztTQWpLRyxLQUFLOzs7QUFvS1gsTUFBTSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUEiLCJmaWxlIjoiZmlsZTovLy9DOi9Vc2Vycy9ja25qdS8uYXRvbS9wYWNrYWdlcy9saW50ZXItdWktZGVmYXVsdC9saWIvcGFuZWwvaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBAZmxvdyAqL1xuXG5pbXBvcnQgeyBDb21wb3NpdGVEaXNwb3NhYmxlIH0gZnJvbSAnYXRvbSdcbmltcG9ydCBEZWxlZ2F0ZSBmcm9tICcuL2RlbGVnYXRlJ1xuaW1wb3J0IFBhbmVsRG9jayBmcm9tICcuL2RvY2snXG5pbXBvcnQgdHlwZSB7IExpbnRlck1lc3NhZ2UgfSBmcm9tICcuLi90eXBlcydcblxuY2xhc3MgUGFuZWwge1xuICBwYW5lbDogUGFuZWxEb2NrIHwgbnVsbFxuICBlbGVtZW50OiBIVE1MRWxlbWVudFxuICBkZWxlZ2F0ZTogRGVsZWdhdGVcbiAgbWVzc2FnZXM6IEFycmF5PExpbnRlck1lc3NhZ2U+XG4gIGRlYWN0aXZhdGluZzogYm9vbGVhblxuICBzdWJzY3JpcHRpb25zOiBDb21wb3NpdGVEaXNwb3NhYmxlXG4gIHNob3dQYW5lbENvbmZpZzogYm9vbGVhblxuICBoaWRlUGFuZWxXaGVuRW1wdHk6IGJvb2xlYW5cbiAgc2hvd1BhbmVsU3RhdGVNZXNzYWdlczogYm9vbGVhblxuICBhY3RpdmF0aW9uVGltZXI6IG51bWJlclxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLnBhbmVsID0gbnVsbFxuICAgIHRoaXMuZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgdGhpcy5kZWxlZ2F0ZSA9IG5ldyBEZWxlZ2F0ZSgpXG4gICAgdGhpcy5tZXNzYWdlcyA9IFtdXG4gICAgdGhpcy5kZWFjdGl2YXRpbmcgPSBmYWxzZVxuICAgIHRoaXMuc3Vic2NyaXB0aW9ucyA9IG5ldyBDb21wb3NpdGVEaXNwb3NhYmxlKClcbiAgICB0aGlzLnNob3dQYW5lbFN0YXRlTWVzc2FnZXMgPSBmYWxzZVxuXG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLmFkZCh0aGlzLmRlbGVnYXRlKVxuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5hZGQoXG4gICAgICBhdG9tLmNvbmZpZy5vYnNlcnZlKCdsaW50ZXItdWktZGVmYXVsdC5oaWRlUGFuZWxXaGVuRW1wdHknLCBoaWRlUGFuZWxXaGVuRW1wdHkgPT4ge1xuICAgICAgICB0aGlzLmhpZGVQYW5lbFdoZW5FbXB0eSA9IGhpZGVQYW5lbFdoZW5FbXB0eVxuICAgICAgICB0aGlzLnJlZnJlc2goKVxuICAgICAgfSksXG4gICAgKVxuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5hZGQoXG4gICAgICBhdG9tLndvcmtzcGFjZS5vbkRpZERlc3Ryb3lQYW5lKCh7IHBhbmU6IGRlc3Ryb3llZFBhbmUgfSkgPT4ge1xuICAgICAgICBjb25zdCBpc1BhbmVJdGVtRGVzdHJveWVkID0gZGVzdHJveWVkUGFuZS5nZXRJdGVtcygpLmluY2x1ZGVzKHRoaXMucGFuZWwpXG4gICAgICAgIGlmIChpc1BhbmVJdGVtRGVzdHJveWVkICYmICF0aGlzLmRlYWN0aXZhdGluZykge1xuICAgICAgICAgIHRoaXMucGFuZWwgPSBudWxsXG4gICAgICAgICAgYXRvbS5jb25maWcuc2V0KCdsaW50ZXItdWktZGVmYXVsdC5zaG93UGFuZWwnLCBmYWxzZSlcbiAgICAgICAgfVxuICAgICAgfSksXG4gICAgKVxuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5hZGQoXG4gICAgICBhdG9tLndvcmtzcGFjZS5vbkRpZERlc3Ryb3lQYW5lSXRlbSgoeyBpdGVtOiBwYW5lSXRlbSB9KSA9PiB7XG4gICAgICAgIGlmIChwYW5lSXRlbSBpbnN0YW5jZW9mIFBhbmVsRG9jayAmJiAhdGhpcy5kZWFjdGl2YXRpbmcpIHtcbiAgICAgICAgICB0aGlzLnBhbmVsID0gbnVsbFxuICAgICAgICAgIGF0b20uY29uZmlnLnNldCgnbGludGVyLXVpLWRlZmF1bHQuc2hvd1BhbmVsJywgZmFsc2UpXG4gICAgICAgIH1cbiAgICAgIH0pLFxuICAgIClcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMuYWRkKFxuICAgICAgYXRvbS5jb25maWcub2JzZXJ2ZSgnbGludGVyLXVpLWRlZmF1bHQuc2hvd1BhbmVsJywgc2hvd1BhbmVsID0+IHtcbiAgICAgICAgdGhpcy5zaG93UGFuZWxDb25maWcgPSBzaG93UGFuZWxcbiAgICAgICAgdGhpcy5yZWZyZXNoKClcbiAgICAgIH0pLFxuICAgIClcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMuYWRkKFxuICAgICAgYXRvbS53b3Jrc3BhY2UuZ2V0Q2VudGVyKCkub2JzZXJ2ZUFjdGl2ZVBhbmVJdGVtKCgpID0+IHtcbiAgICAgICAgdGhpcy5zaG93UGFuZWxTdGF0ZU1lc3NhZ2VzID0gISF0aGlzLmRlbGVnYXRlLmZpbHRlcmVkTWVzc2FnZXMubGVuZ3RoXG4gICAgICAgIHRoaXMucmVmcmVzaCgpXG4gICAgICB9KSxcbiAgICApXG4gICAgdGhpcy5hY3RpdmF0aW9uVGltZXIgPSB3aW5kb3cucmVxdWVzdElkbGVDYWxsYmFjaygoKSA9PiB7XG4gICAgICBsZXQgZmlyc3RUaW1lID0gdHJ1ZVxuICAgICAgY29uc3QgZG9jayA9IGF0b20ud29ya3NwYWNlLmdldEJvdHRvbURvY2soKVxuICAgICAgdGhpcy5zdWJzY3JpcHRpb25zLmFkZChcbiAgICAgICAgZG9jay5vbkRpZENoYW5nZUFjdGl2ZVBhbmVJdGVtKHBhbmVJdGVtID0+IHtcbiAgICAgICAgICBpZiAoIXRoaXMucGFuZWwgfHwgdGhpcy5nZXRQYW5lbExvY2F0aW9uKCkgIT09ICdib3R0b20nKSB7XG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKGZpcnN0VGltZSkge1xuICAgICAgICAgICAgZmlyc3RUaW1lID0gZmFsc2VcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgIH1cbiAgICAgICAgICBjb25zdCBpc0ZvY3VzSW4gPSBwYW5lSXRlbSA9PT0gdGhpcy5wYW5lbFxuICAgICAgICAgIGNvbnN0IGV4dGVybmFsbHlUb2dnbGVkID0gaXNGb2N1c0luICE9PSB0aGlzLnNob3dQYW5lbENvbmZpZ1xuICAgICAgICAgIGlmIChleHRlcm5hbGx5VG9nZ2xlZCkge1xuICAgICAgICAgICAgYXRvbS5jb25maWcuc2V0KCdsaW50ZXItdWktZGVmYXVsdC5zaG93UGFuZWwnLCAhdGhpcy5zaG93UGFuZWxDb25maWcpXG4gICAgICAgICAgfVxuICAgICAgICB9KSxcbiAgICAgIClcbiAgICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5hZGQoXG4gICAgICAgIGRvY2sub25EaWRDaGFuZ2VWaXNpYmxlKHZpc2libGUgPT4ge1xuICAgICAgICAgIGlmICghdGhpcy5wYW5lbCB8fCB0aGlzLmdldFBhbmVsTG9jYXRpb24oKSAhPT0gJ2JvdHRvbScpIHtcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoIXZpc2libGUpIHtcbiAgICAgICAgICAgIC8vIF4gV2hlbiBpdCdzIHRpbWUgdG8gdGVsbCBjb25maWcgdG8gaGlkZVxuICAgICAgICAgICAgaWYgKHRoaXMuc2hvd1BhbmVsQ29uZmlnICYmIHRoaXMuaGlkZVBhbmVsV2hlbkVtcHR5ICYmICF0aGlzLnNob3dQYW5lbFN0YXRlTWVzc2FnZXMpIHtcbiAgICAgICAgICAgICAgLy8gSWdub3JlIGJlY2F1c2Ugd2UganVzdCBkb24ndCBoYXZlIGFueSBtZXNzYWdlcyB0byBzaG93LCBldmVyeXRoaW5nIGVsc2UgaXMgZmluZVxuICAgICAgICAgICAgICByZXR1cm5cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKGRvY2suZ2V0QWN0aXZlUGFuZUl0ZW0oKSAhPT0gdGhpcy5wYW5lbCkge1xuICAgICAgICAgICAgLy8gSWdub3JlIHNpbmNlIHRoZSB2aXNpYmlsaXR5IG9mIHRoaXMgcGFuZWwgaXMgbm90IGNoYW5naW5nXG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgICB9XG4gICAgICAgICAgY29uc3QgZXh0ZXJuYWxseVRvZ2dsZWQgPSB2aXNpYmxlICE9PSB0aGlzLnNob3dQYW5lbENvbmZpZ1xuICAgICAgICAgIGlmIChleHRlcm5hbGx5VG9nZ2xlZCkge1xuICAgICAgICAgICAgYXRvbS5jb25maWcuc2V0KCdsaW50ZXItdWktZGVmYXVsdC5zaG93UGFuZWwnLCAhdGhpcy5zaG93UGFuZWxDb25maWcpXG4gICAgICAgICAgfVxuICAgICAgICB9KSxcbiAgICAgIClcblxuICAgICAgdGhpcy5hY3RpdmF0ZSgpXG4gICAgfSlcbiAgfVxuICBnZXRQYW5lbExvY2F0aW9uKCkge1xuICAgIGlmICghdGhpcy5wYW5lbCkge1xuICAgICAgcmV0dXJuIG51bGxcbiAgICB9XG4gICAgY29uc3QgcGFuZUNvbnRhaW5lciA9IGF0b20ud29ya3NwYWNlLnBhbmVDb250YWluZXJGb3JJdGVtKHRoaXMucGFuZWwpXG4gICAgcmV0dXJuIChwYW5lQ29udGFpbmVyICYmIHBhbmVDb250YWluZXIubG9jYXRpb24pIHx8IG51bGxcbiAgfVxuICBhc3luYyBhY3RpdmF0ZSgpIHtcbiAgICBpZiAodGhpcy5wYW5lbCkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuICAgIHRoaXMucGFuZWwgPSBuZXcgUGFuZWxEb2NrKHRoaXMuZGVsZWdhdGUpXG4gICAgYXdhaXQgYXRvbS53b3Jrc3BhY2Uub3Blbih0aGlzLnBhbmVsLCB7XG4gICAgICBhY3RpdmF0ZVBhbmU6IGZhbHNlLFxuICAgICAgYWN0aXZhdGVJdGVtOiBmYWxzZSxcbiAgICAgIHNlYXJjaEFsbFBhbmVzOiB0cnVlLFxuICAgIH0pXG4gICAgdGhpcy51cGRhdGUoKVxuICAgIHRoaXMucmVmcmVzaCgpXG4gIH1cbiAgdXBkYXRlKG5ld01lc3NhZ2VzOiA/QXJyYXk8TGludGVyTWVzc2FnZT4gPSBudWxsKTogdm9pZCB7XG4gICAgaWYgKG5ld01lc3NhZ2VzKSB7XG4gICAgICB0aGlzLm1lc3NhZ2VzID0gbmV3TWVzc2FnZXNcbiAgICB9XG4gICAgdGhpcy5kZWxlZ2F0ZS51cGRhdGUodGhpcy5tZXNzYWdlcylcbiAgICB0aGlzLnNob3dQYW5lbFN0YXRlTWVzc2FnZXMgPSAhIXRoaXMuZGVsZWdhdGUuZmlsdGVyZWRNZXNzYWdlcy5sZW5ndGhcbiAgICB0aGlzLnJlZnJlc2goKVxuICB9XG4gIGFzeW5jIHJlZnJlc2goKSB7XG4gICAgY29uc3QgcGFuZWwgPSB0aGlzLnBhbmVsXG4gICAgaWYgKHBhbmVsID09PSBudWxsKSB7XG4gICAgICBpZiAodGhpcy5zaG93UGFuZWxDb25maWcpIHtcbiAgICAgICAgYXdhaXQgdGhpcy5hY3RpdmF0ZSgpXG4gICAgICB9XG4gICAgICByZXR1cm5cbiAgICB9XG4gICAgY29uc3QgcGFuZUNvbnRhaW5lciA9IGF0b20ud29ya3NwYWNlLnBhbmVDb250YWluZXJGb3JJdGVtKHBhbmVsKVxuICAgIGlmICghcGFuZUNvbnRhaW5lciB8fCBwYW5lQ29udGFpbmVyLmxvY2F0aW9uICE9PSAnYm90dG9tJykge1xuICAgICAgcmV0dXJuXG4gICAgfVxuICAgIGNvbnN0IGlzQWN0aXZlUGFuZWwgPSBwYW5lQ29udGFpbmVyLmdldEFjdGl2ZVBhbmVJdGVtKCkgPT09IHBhbmVsXG4gICAgY29uc3QgdmlzaWJpbGl0eUFsbG93ZWQxID0gdGhpcy5zaG93UGFuZWxDb25maWdcbiAgICBjb25zdCB2aXNpYmlsaXR5QWxsb3dlZDIgPSB0aGlzLmhpZGVQYW5lbFdoZW5FbXB0eSA/IHRoaXMuc2hvd1BhbmVsU3RhdGVNZXNzYWdlcyA6IHRydWVcbiAgICBpZiAodmlzaWJpbGl0eUFsbG93ZWQxICYmIHZpc2liaWxpdHlBbGxvd2VkMikge1xuICAgICAgaWYgKCFpc0FjdGl2ZVBhbmVsKSB7XG4gICAgICAgIHBhbmVDb250YWluZXIucGFuZUZvckl0ZW0ocGFuZWwpLmFjdGl2YXRlSXRlbShwYW5lbClcbiAgICAgIH1cbiAgICAgIHBhbmVDb250YWluZXIuc2hvdygpXG4gICAgICBwYW5lbC5kb1BhbmVsUmVzaXplKClcbiAgICB9IGVsc2UgaWYgKGlzQWN0aXZlUGFuZWwpIHtcbiAgICAgIHBhbmVDb250YWluZXIuaGlkZSgpXG4gICAgfVxuICB9XG4gIGRpc3Bvc2UoKSB7XG4gICAgdGhpcy5kZWFjdGl2YXRpbmcgPSB0cnVlXG4gICAgaWYgKHRoaXMucGFuZWwpIHtcbiAgICAgIHRoaXMucGFuZWwuZGlzcG9zZSgpXG4gICAgfVxuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5kaXNwb3NlKClcbiAgICB3aW5kb3cuY2FuY2VsSWRsZUNhbGxiYWNrKHRoaXMuYWN0aXZhdGlvblRpbWVyKVxuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gUGFuZWxcbiJdfQ==