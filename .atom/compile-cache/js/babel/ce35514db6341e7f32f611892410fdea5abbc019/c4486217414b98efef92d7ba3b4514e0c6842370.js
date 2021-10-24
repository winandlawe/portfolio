Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/* eslint-disable func-names */

var _atom = require('atom');

var _atomSpacePenViewsPlus = require('atom-space-pen-views-plus');

var _scriptInputView = require('./script-input-view');

var _scriptInputView2 = _interopRequireDefault(_scriptInputView);

'use babel';
var ScriptProfileRunView = (function (_SelectListView) {
  _inherits(ScriptProfileRunView, _SelectListView);

  function ScriptProfileRunView() {
    _classCallCheck(this, ScriptProfileRunView);

    _get(Object.getPrototypeOf(ScriptProfileRunView.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(ScriptProfileRunView, [{
    key: 'initialize',
    value: function initialize(profiles) {
      var _this = this;

      this.profiles = profiles;
      _get(Object.getPrototypeOf(ScriptProfileRunView.prototype), 'initialize', this).apply(this, arguments);

      this.emitter = new _atom.Emitter();

      this.subscriptions = new _atom.CompositeDisposable();
      this.subscriptions.add(atom.commands.add('atom-workspace', {
        'core:cancel': function coreCancel() {
          return _this.hide();
        },
        'core:close': function coreClose() {
          return _this.hide();
        },
        'script:run-with-profile': function scriptRunWithProfile() {
          return _this.panel.isVisible() ? _this.hide() : _this.show();
        }
      }));

      this.setItems(this.profiles);
      this.initializeView();
    }
  }, {
    key: 'initializeView',
    value: function initializeView() {
      var _this3 = this;

      this.addClass('overlay from-top script-profile-run-view');
      // @panel.hide()

      this.buttons = (0, _atomSpacePenViewsPlus.$$)(function () {
        var _this2 = this;

        this.div({ 'class': 'block buttons' }, function () {
          /* eslint-disable no-unused-vars */
          var css = 'btn inline-block-tight';
          /* eslint-enable no-unused-vars */
          _this2.button({ 'class': 'btn cancel' }, function () {
            return _this2.span({ 'class': 'icon icon-x' }, 'Cancel');
          });
          _this2.button({ 'class': 'btn rename' }, function () {
            return _this2.span({ 'class': 'icon icon-pencil' }, 'Rename');
          });
          _this2.button({ 'class': 'btn delete' }, function () {
            return _this2.span({ 'class': 'icon icon-trashcan' }, 'Delete');
          });
          _this2.button({ 'class': 'btn run' }, function () {
            return _this2.span({ 'class': 'icon icon-playback-play' }, 'Run');
          });
        });
      });

      // event handlers
      this.buttons.find('.btn.cancel').on('click', function () {
        return _this3.hide();
      });
      this.buttons.find('.btn.rename').on('click', function () {
        return _this3.rename();
      });
      this.buttons.find('.btn.delete').on('click', function () {
        return _this3['delete']();
      });
      this.buttons.find('.btn.run').on('click', function () {
        return _this3.run();
      });

      // fix focus traversal (from run button to filter editor)
      this.buttons.find('.btn.run').on('keydown', function (e) {
        if (e.keyCode === 9) {
          e.stopPropagation();
          e.preventDefault();
          _this3.focusFilterEditor();
        }
      });

      // hide panel on ecsape
      this.on('keydown', function (e) {
        if (e.keyCode === 27) {
          _this3.hide();
        }
        if (e.keyCode === 13) {
          _this3.run();
        }
      });

      // append buttons container
      this.append(this.buttons);

      var selector = '.rename, .delete, .run';
      if (this.profiles.length) {
        this.buttons.find(selector).show();
      } else {
        this.buttons.find(selector).hide();
      }

      this.panel = atom.workspace.addModalPanel({ item: this });
      this.panel.hide();
    }
  }, {
    key: 'onProfileDelete',
    value: function onProfileDelete(callback) {
      return this.emitter.on('on-profile-delete', callback);
    }
  }, {
    key: 'onProfileChange',
    value: function onProfileChange(callback) {
      return this.emitter.on('on-profile-change', callback);
    }
  }, {
    key: 'onProfileRun',
    value: function onProfileRun(callback) {
      return this.emitter.on('on-profile-run', callback);
    }
  }, {
    key: 'rename',
    value: function rename() {
      var _this4 = this;

      var profile = this.getSelectedItem();
      if (!profile) {
        return;
      }

      var inputView = new _scriptInputView2['default']({ caption: 'Enter new profile name:', 'default': profile.name });
      inputView.onCancel(function () {
        return _this4.show();
      });
      inputView.onConfirm(function (newProfileName) {
        if (!newProfileName) {
          return;
        }
        _this4.emitter.emit('on-profile-change', { profile: profile, key: 'name', value: newProfileName });
      });

      inputView.show();
    }
  }, {
    key: 'delete',
    value: function _delete() {
      var _this5 = this;

      var profile = this.getSelectedItem();
      if (!profile) {
        return;
      }

      atom.confirm({
        message: 'Delete profile',
        detailedMessage: 'Are you sure you want to delete "' + profile.name + '" profile?',
        buttons: {
          No: function No() {
            return _this5.focusFilterEditor();
          },
          Yes: function Yes() {
            return _this5.emitter.emit('on-profile-delete', profile);
          }
        }
      });
    }
  }, {
    key: 'getFilterKey',
    value: function getFilterKey() {
      return 'name';
    }
  }, {
    key: 'getEmptyMessage',
    value: function getEmptyMessage() {
      return 'No profiles found';
    }
  }, {
    key: 'viewForItem',
    value: function viewForItem(item) {
      return (0, _atomSpacePenViewsPlus.$$)(function () {
        var _this6 = this;

        this.li({ 'class': 'two-lines profile' }, function () {
          _this6.div({ 'class': 'primary-line name' }, function () {
            return _this6.text(item.name);
          });
          _this6.div({ 'class': 'secondary-line description' }, function () {
            return _this6.text(item.description);
          });
        });
      });
    }
  }, {
    key: 'cancel',
    value: function cancel() {}
  }, {
    key: 'confirmed',
    value: function confirmed() {}
  }, {
    key: 'show',
    value: function show() {
      this.panel.show();
      this.focusFilterEditor();
    }
  }, {
    key: 'hide',
    value: function hide() {
      this.panel.hide();
      atom.workspace.getActivePane().activate();
    }

    // Updates profiles
  }, {
    key: 'setProfiles',
    value: function setProfiles(profiles) {
      this.profiles = profiles;
      this.setItems(this.profiles);

      // toggle profile controls
      var selector = '.rename, .delete, .run';
      if (this.profiles.length) {
        this.buttons.find(selector).show();
      } else {
        this.buttons.find(selector).hide();
      }

      this.populateList();
      this.focusFilterEditor();
    }
  }, {
    key: 'close',
    value: function close() {}
  }, {
    key: 'destroy',
    value: function destroy() {
      if (this.subscriptions) this.subscriptions.dispose();
    }
  }, {
    key: 'run',
    value: function run() {
      var profile = this.getSelectedItem();
      if (!profile) {
        return;
      }

      this.emitter.emit('on-profile-run', profile);
      this.hide();
    }
  }]);

  return ScriptProfileRunView;
})(_atomSpacePenViewsPlus.SelectListView);

exports['default'] = ScriptProfileRunView;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZpbGU6Ly8vQzovVXNlcnMvY2tuanUvLmF0b20vcGFja2FnZXMvc2NyaXB0L2xpYi9zY3JpcHQtcHJvZmlsZS1ydW4tdmlldy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O29CQUc2QyxNQUFNOztxQ0FDaEIsMkJBQTJCOzsrQkFDbEMscUJBQXFCOzs7O0FBTGpELFdBQVcsQ0FBQztJQU9TLG9CQUFvQjtZQUFwQixvQkFBb0I7O1dBQXBCLG9CQUFvQjswQkFBcEIsb0JBQW9COzsrQkFBcEIsb0JBQW9COzs7ZUFBcEIsb0JBQW9COztXQUM3QixvQkFBQyxRQUFRLEVBQUU7OztBQUNuQixVQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztBQUN6QixpQ0FIaUIsb0JBQW9CLDZDQUdqQixTQUFTLEVBQUU7O0FBRS9CLFVBQUksQ0FBQyxPQUFPLEdBQUcsbUJBQWEsQ0FBQzs7QUFFN0IsVUFBSSxDQUFDLGFBQWEsR0FBRywrQkFBeUIsQ0FBQztBQUMvQyxVQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsRUFBRTtBQUN6RCxxQkFBYSxFQUFFO2lCQUFNLE1BQUssSUFBSSxFQUFFO1NBQUE7QUFDaEMsb0JBQVksRUFBRTtpQkFBTSxNQUFLLElBQUksRUFBRTtTQUFBO0FBQy9CLGlDQUF5QixFQUFFO2lCQUFPLE1BQUssS0FBSyxDQUFDLFNBQVMsRUFBRSxHQUFHLE1BQUssSUFBSSxFQUFFLEdBQUcsTUFBSyxJQUFJLEVBQUU7U0FBQztPQUN0RixDQUFDLENBQUMsQ0FBQzs7QUFFSixVQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUM3QixVQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7S0FDdkI7OztXQUVhLDBCQUFHOzs7QUFDZixVQUFJLENBQUMsUUFBUSxDQUFDLDBDQUEwQyxDQUFDLENBQUM7OztBQUcxRCxVQUFJLENBQUMsT0FBTyxHQUFHLCtCQUFHLFlBQVk7OztBQUM1QixZQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsU0FBTyxlQUFlLEVBQUUsRUFBRSxZQUFNOztBQUV6QyxjQUFNLEdBQUcsR0FBRyx3QkFBd0IsQ0FBQzs7QUFFckMsaUJBQUssTUFBTSxDQUFDLEVBQUUsU0FBTyxZQUFZLEVBQUUsRUFBRTttQkFBTSxPQUFLLElBQUksQ0FBQyxFQUFFLFNBQU8sYUFBYSxFQUFFLEVBQUUsUUFBUSxDQUFDO1dBQUEsQ0FBQyxDQUFDO0FBQzFGLGlCQUFLLE1BQU0sQ0FBQyxFQUFFLFNBQU8sWUFBWSxFQUFFLEVBQUU7bUJBQU0sT0FBSyxJQUFJLENBQUMsRUFBRSxTQUFPLGtCQUFrQixFQUFFLEVBQUUsUUFBUSxDQUFDO1dBQUEsQ0FBQyxDQUFDO0FBQy9GLGlCQUFLLE1BQU0sQ0FBQyxFQUFFLFNBQU8sWUFBWSxFQUFFLEVBQUU7bUJBQU0sT0FBSyxJQUFJLENBQUMsRUFBRSxTQUFPLG9CQUFvQixFQUFFLEVBQUUsUUFBUSxDQUFDO1dBQUEsQ0FBQyxDQUFDO0FBQ2pHLGlCQUFLLE1BQU0sQ0FBQyxFQUFFLFNBQU8sU0FBUyxFQUFFLEVBQUU7bUJBQU0sT0FBSyxJQUFJLENBQUMsRUFBRSxTQUFPLHlCQUF5QixFQUFFLEVBQUUsS0FBSyxDQUFDO1dBQUEsQ0FBQyxDQUFDO1NBQ2pHLENBQUMsQ0FBQztPQUNKLENBQUMsQ0FBQzs7O0FBR0gsVUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRTtlQUFNLE9BQUssSUFBSSxFQUFFO09BQUEsQ0FBQyxDQUFDO0FBQ2hFLFVBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUU7ZUFBTSxPQUFLLE1BQU0sRUFBRTtPQUFBLENBQUMsQ0FBQztBQUNsRSxVQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFO2VBQU0sZ0JBQVcsRUFBRTtPQUFBLENBQUMsQ0FBQztBQUNsRSxVQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFO2VBQU0sT0FBSyxHQUFHLEVBQUU7T0FBQSxDQUFDLENBQUM7OztBQUc1RCxVQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxFQUFFLENBQUMsU0FBUyxFQUFFLFVBQUMsQ0FBQyxFQUFLO0FBQ2pELFlBQUksQ0FBQyxDQUFDLE9BQU8sS0FBSyxDQUFDLEVBQUU7QUFDbkIsV0FBQyxDQUFDLGVBQWUsRUFBRSxDQUFDO0FBQ3BCLFdBQUMsQ0FBQyxjQUFjLEVBQUUsQ0FBQztBQUNuQixpQkFBSyxpQkFBaUIsRUFBRSxDQUFDO1NBQzFCO09BQ0YsQ0FBQyxDQUFDOzs7QUFHSCxVQUFJLENBQUMsRUFBRSxDQUFDLFNBQVMsRUFBRSxVQUFDLENBQUMsRUFBSztBQUN4QixZQUFJLENBQUMsQ0FBQyxPQUFPLEtBQUssRUFBRSxFQUFFO0FBQUUsaUJBQUssSUFBSSxFQUFFLENBQUM7U0FBRTtBQUN0QyxZQUFJLENBQUMsQ0FBQyxPQUFPLEtBQUssRUFBRSxFQUFFO0FBQUUsaUJBQUssR0FBRyxFQUFFLENBQUM7U0FBRTtPQUN0QyxDQUFDLENBQUM7OztBQUdILFVBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDOztBQUUxQixVQUFNLFFBQVEsR0FBRyx3QkFBd0IsQ0FBQztBQUMxQyxVQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFO0FBQ3hCLFlBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO09BQ3BDLE1BQU07QUFDTCxZQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztPQUNwQzs7QUFFRCxVQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsYUFBYSxDQUFDLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7QUFDMUQsVUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQztLQUNuQjs7O1dBRWMseUJBQUMsUUFBUSxFQUFFO0FBQ3hCLGFBQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsbUJBQW1CLEVBQUUsUUFBUSxDQUFDLENBQUM7S0FDdkQ7OztXQUVjLHlCQUFDLFFBQVEsRUFBRTtBQUN4QixhQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLG1CQUFtQixFQUFFLFFBQVEsQ0FBQyxDQUFDO0tBQ3ZEOzs7V0FFVyxzQkFBQyxRQUFRLEVBQUU7QUFDckIsYUFBTyxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxnQkFBZ0IsRUFBRSxRQUFRLENBQUMsQ0FBQztLQUNwRDs7O1dBRUssa0JBQUc7OztBQUNQLFVBQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztBQUN2QyxVQUFJLENBQUMsT0FBTyxFQUFFO0FBQUUsZUFBTztPQUFFOztBQUV6QixVQUFNLFNBQVMsR0FBRyxpQ0FBb0IsRUFBRSxPQUFPLEVBQUUseUJBQXlCLEVBQUUsV0FBUyxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztBQUNyRyxlQUFTLENBQUMsUUFBUSxDQUFDO2VBQU0sT0FBSyxJQUFJLEVBQUU7T0FBQSxDQUFDLENBQUM7QUFDdEMsZUFBUyxDQUFDLFNBQVMsQ0FBQyxVQUFDLGNBQWMsRUFBSztBQUN0QyxZQUFJLENBQUMsY0FBYyxFQUFFO0FBQUUsaUJBQU87U0FBRTtBQUNoQyxlQUFLLE9BQU8sQ0FBQyxJQUFJLENBQUMsbUJBQW1CLEVBQUUsRUFBRSxPQUFPLEVBQVAsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLGNBQWMsRUFBRSxDQUFDLENBQUM7T0FDekYsQ0FBQyxDQUFDOztBQUVILGVBQVMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztLQUNsQjs7O1dBRUssbUJBQUc7OztBQUNQLFVBQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztBQUN2QyxVQUFJLENBQUMsT0FBTyxFQUFFO0FBQUUsZUFBTztPQUFFOztBQUV6QixVQUFJLENBQUMsT0FBTyxDQUFDO0FBQ1gsZUFBTyxFQUFFLGdCQUFnQjtBQUN6Qix1QkFBZSx3Q0FBc0MsT0FBTyxDQUFDLElBQUksZUFBWTtBQUM3RSxlQUFPLEVBQUU7QUFDUCxZQUFFLEVBQUU7bUJBQU0sT0FBSyxpQkFBaUIsRUFBRTtXQUFBO0FBQ2xDLGFBQUcsRUFBRTttQkFBTSxPQUFLLE9BQU8sQ0FBQyxJQUFJLENBQUMsbUJBQW1CLEVBQUUsT0FBTyxDQUFDO1dBQUE7U0FDM0Q7T0FDRixDQUFDLENBQUM7S0FDSjs7O1dBRVcsd0JBQUc7QUFDYixhQUFPLE1BQU0sQ0FBQztLQUNmOzs7V0FFYywyQkFBRztBQUNoQixhQUFPLG1CQUFtQixDQUFDO0tBQzVCOzs7V0FFVSxxQkFBQyxJQUFJLEVBQUU7QUFDaEIsYUFBTywrQkFBRyxZQUFZOzs7QUFDcEIsWUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLFNBQU8sbUJBQW1CLEVBQUUsRUFBRSxZQUFNO0FBQzVDLGlCQUFLLEdBQUcsQ0FBQyxFQUFFLFNBQU8sbUJBQW1CLEVBQUUsRUFBRTttQkFBTSxPQUFLLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO1dBQUEsQ0FBQyxDQUFDO0FBQ3JFLGlCQUFLLEdBQUcsQ0FBQyxFQUFFLFNBQU8sNEJBQTRCLEVBQUUsRUFBRTttQkFBTSxPQUFLLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDO1dBQUEsQ0FBQyxDQUFDO1NBQ3RGLENBQUMsQ0FBQztPQUNKLENBQUMsQ0FBQztLQUNKOzs7V0FFSyxrQkFBRyxFQUFFOzs7V0FFRixxQkFBRyxFQUFFOzs7V0FFVixnQkFBRztBQUNMLFVBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUM7QUFDbEIsVUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7S0FDMUI7OztXQUVHLGdCQUFHO0FBQ0wsVUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQztBQUNsQixVQUFJLENBQUMsU0FBUyxDQUFDLGFBQWEsRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDO0tBQzNDOzs7OztXQUdVLHFCQUFDLFFBQVEsRUFBRTtBQUNwQixVQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztBQUN6QixVQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQzs7O0FBRzdCLFVBQU0sUUFBUSxHQUFHLHdCQUF3QixDQUFDO0FBQzFDLFVBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUU7QUFDeEIsWUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7T0FDcEMsTUFBTTtBQUNMLFlBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO09BQ3BDOztBQUVELFVBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztBQUNwQixVQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztLQUMxQjs7O1dBRUksaUJBQUcsRUFBRTs7O1dBRUgsbUJBQUc7QUFDUixVQUFJLElBQUksQ0FBQyxhQUFhLEVBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLEVBQUUsQ0FBQztLQUN0RDs7O1dBRUUsZUFBRztBQUNKLFVBQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztBQUN2QyxVQUFJLENBQUMsT0FBTyxFQUFFO0FBQUUsZUFBTztPQUFFOztBQUV6QixVQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxPQUFPLENBQUMsQ0FBQztBQUM3QyxVQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7S0FDYjs7O1NBektrQixvQkFBb0I7OztxQkFBcEIsb0JBQW9CIiwiZmlsZSI6ImZpbGU6Ly8vQzovVXNlcnMvY2tuanUvLmF0b20vcGFja2FnZXMvc2NyaXB0L2xpYi9zY3JpcHQtcHJvZmlsZS1ydW4tdmlldy5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2UgYmFiZWwnO1xuXG4vKiBlc2xpbnQtZGlzYWJsZSBmdW5jLW5hbWVzICovXG5pbXBvcnQgeyBDb21wb3NpdGVEaXNwb3NhYmxlLCBFbWl0dGVyIH0gZnJvbSAnYXRvbSc7XG5pbXBvcnQgeyAkJCwgU2VsZWN0TGlzdFZpZXcgfSBmcm9tICdhdG9tLXNwYWNlLXBlbi12aWV3cy1wbHVzJztcbmltcG9ydCBTY3JpcHRJbnB1dFZpZXcgZnJvbSAnLi9zY3JpcHQtaW5wdXQtdmlldyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNjcmlwdFByb2ZpbGVSdW5WaWV3IGV4dGVuZHMgU2VsZWN0TGlzdFZpZXcge1xuICBpbml0aWFsaXplKHByb2ZpbGVzKSB7XG4gICAgdGhpcy5wcm9maWxlcyA9IHByb2ZpbGVzO1xuICAgIHN1cGVyLmluaXRpYWxpemUoLi4uYXJndW1lbnRzKTtcblxuICAgIHRoaXMuZW1pdHRlciA9IG5ldyBFbWl0dGVyKCk7XG5cbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMgPSBuZXcgQ29tcG9zaXRlRGlzcG9zYWJsZSgpO1xuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5hZGQoYXRvbS5jb21tYW5kcy5hZGQoJ2F0b20td29ya3NwYWNlJywge1xuICAgICAgJ2NvcmU6Y2FuY2VsJzogKCkgPT4gdGhpcy5oaWRlKCksXG4gICAgICAnY29yZTpjbG9zZSc6ICgpID0+IHRoaXMuaGlkZSgpLFxuICAgICAgJ3NjcmlwdDpydW4td2l0aC1wcm9maWxlJzogKCkgPT4gKHRoaXMucGFuZWwuaXNWaXNpYmxlKCkgPyB0aGlzLmhpZGUoKSA6IHRoaXMuc2hvdygpKSxcbiAgICB9KSk7XG5cbiAgICB0aGlzLnNldEl0ZW1zKHRoaXMucHJvZmlsZXMpO1xuICAgIHRoaXMuaW5pdGlhbGl6ZVZpZXcoKTtcbiAgfVxuXG4gIGluaXRpYWxpemVWaWV3KCkge1xuICAgIHRoaXMuYWRkQ2xhc3MoJ292ZXJsYXkgZnJvbS10b3Agc2NyaXB0LXByb2ZpbGUtcnVuLXZpZXcnKTtcbiAgICAvLyBAcGFuZWwuaGlkZSgpXG5cbiAgICB0aGlzLmJ1dHRvbnMgPSAkJChmdW5jdGlvbiAoKSB7XG4gICAgICB0aGlzLmRpdih7IGNsYXNzOiAnYmxvY2sgYnV0dG9ucycgfSwgKCkgPT4ge1xuICAgICAgICAvKiBlc2xpbnQtZGlzYWJsZSBuby11bnVzZWQtdmFycyAqL1xuICAgICAgICBjb25zdCBjc3MgPSAnYnRuIGlubGluZS1ibG9jay10aWdodCc7XG4gICAgICAgIC8qIGVzbGludC1lbmFibGUgbm8tdW51c2VkLXZhcnMgKi9cbiAgICAgICAgdGhpcy5idXR0b24oeyBjbGFzczogJ2J0biBjYW5jZWwnIH0sICgpID0+IHRoaXMuc3Bhbih7IGNsYXNzOiAnaWNvbiBpY29uLXgnIH0sICdDYW5jZWwnKSk7XG4gICAgICAgIHRoaXMuYnV0dG9uKHsgY2xhc3M6ICdidG4gcmVuYW1lJyB9LCAoKSA9PiB0aGlzLnNwYW4oeyBjbGFzczogJ2ljb24gaWNvbi1wZW5jaWwnIH0sICdSZW5hbWUnKSk7XG4gICAgICAgIHRoaXMuYnV0dG9uKHsgY2xhc3M6ICdidG4gZGVsZXRlJyB9LCAoKSA9PiB0aGlzLnNwYW4oeyBjbGFzczogJ2ljb24gaWNvbi10cmFzaGNhbicgfSwgJ0RlbGV0ZScpKTtcbiAgICAgICAgdGhpcy5idXR0b24oeyBjbGFzczogJ2J0biBydW4nIH0sICgpID0+IHRoaXMuc3Bhbih7IGNsYXNzOiAnaWNvbiBpY29uLXBsYXliYWNrLXBsYXknIH0sICdSdW4nKSk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIC8vIGV2ZW50IGhhbmRsZXJzXG4gICAgdGhpcy5idXR0b25zLmZpbmQoJy5idG4uY2FuY2VsJykub24oJ2NsaWNrJywgKCkgPT4gdGhpcy5oaWRlKCkpO1xuICAgIHRoaXMuYnV0dG9ucy5maW5kKCcuYnRuLnJlbmFtZScpLm9uKCdjbGljaycsICgpID0+IHRoaXMucmVuYW1lKCkpO1xuICAgIHRoaXMuYnV0dG9ucy5maW5kKCcuYnRuLmRlbGV0ZScpLm9uKCdjbGljaycsICgpID0+IHRoaXMuZGVsZXRlKCkpO1xuICAgIHRoaXMuYnV0dG9ucy5maW5kKCcuYnRuLnJ1bicpLm9uKCdjbGljaycsICgpID0+IHRoaXMucnVuKCkpO1xuXG4gICAgLy8gZml4IGZvY3VzIHRyYXZlcnNhbCAoZnJvbSBydW4gYnV0dG9uIHRvIGZpbHRlciBlZGl0b3IpXG4gICAgdGhpcy5idXR0b25zLmZpbmQoJy5idG4ucnVuJykub24oJ2tleWRvd24nLCAoZSkgPT4ge1xuICAgICAgaWYgKGUua2V5Q29kZSA9PT0gOSkge1xuICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIHRoaXMuZm9jdXNGaWx0ZXJFZGl0b3IoKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIC8vIGhpZGUgcGFuZWwgb24gZWNzYXBlXG4gICAgdGhpcy5vbigna2V5ZG93bicsIChlKSA9PiB7XG4gICAgICBpZiAoZS5rZXlDb2RlID09PSAyNykgeyB0aGlzLmhpZGUoKTsgfVxuICAgICAgaWYgKGUua2V5Q29kZSA9PT0gMTMpIHsgdGhpcy5ydW4oKTsgfVxuICAgIH0pO1xuXG4gICAgLy8gYXBwZW5kIGJ1dHRvbnMgY29udGFpbmVyXG4gICAgdGhpcy5hcHBlbmQodGhpcy5idXR0b25zKTtcblxuICAgIGNvbnN0IHNlbGVjdG9yID0gJy5yZW5hbWUsIC5kZWxldGUsIC5ydW4nO1xuICAgIGlmICh0aGlzLnByb2ZpbGVzLmxlbmd0aCkge1xuICAgICAgdGhpcy5idXR0b25zLmZpbmQoc2VsZWN0b3IpLnNob3coKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5idXR0b25zLmZpbmQoc2VsZWN0b3IpLmhpZGUoKTtcbiAgICB9XG5cbiAgICB0aGlzLnBhbmVsID0gYXRvbS53b3Jrc3BhY2UuYWRkTW9kYWxQYW5lbCh7IGl0ZW06IHRoaXMgfSk7XG4gICAgdGhpcy5wYW5lbC5oaWRlKCk7XG4gIH1cblxuICBvblByb2ZpbGVEZWxldGUoY2FsbGJhY2spIHtcbiAgICByZXR1cm4gdGhpcy5lbWl0dGVyLm9uKCdvbi1wcm9maWxlLWRlbGV0ZScsIGNhbGxiYWNrKTtcbiAgfVxuXG4gIG9uUHJvZmlsZUNoYW5nZShjYWxsYmFjaykge1xuICAgIHJldHVybiB0aGlzLmVtaXR0ZXIub24oJ29uLXByb2ZpbGUtY2hhbmdlJywgY2FsbGJhY2spO1xuICB9XG5cbiAgb25Qcm9maWxlUnVuKGNhbGxiYWNrKSB7XG4gICAgcmV0dXJuIHRoaXMuZW1pdHRlci5vbignb24tcHJvZmlsZS1ydW4nLCBjYWxsYmFjayk7XG4gIH1cblxuICByZW5hbWUoKSB7XG4gICAgY29uc3QgcHJvZmlsZSA9IHRoaXMuZ2V0U2VsZWN0ZWRJdGVtKCk7XG4gICAgaWYgKCFwcm9maWxlKSB7IHJldHVybjsgfVxuXG4gICAgY29uc3QgaW5wdXRWaWV3ID0gbmV3IFNjcmlwdElucHV0Vmlldyh7IGNhcHRpb246ICdFbnRlciBuZXcgcHJvZmlsZSBuYW1lOicsIGRlZmF1bHQ6IHByb2ZpbGUubmFtZSB9KTtcbiAgICBpbnB1dFZpZXcub25DYW5jZWwoKCkgPT4gdGhpcy5zaG93KCkpO1xuICAgIGlucHV0Vmlldy5vbkNvbmZpcm0oKG5ld1Byb2ZpbGVOYW1lKSA9PiB7XG4gICAgICBpZiAoIW5ld1Byb2ZpbGVOYW1lKSB7IHJldHVybjsgfVxuICAgICAgdGhpcy5lbWl0dGVyLmVtaXQoJ29uLXByb2ZpbGUtY2hhbmdlJywgeyBwcm9maWxlLCBrZXk6ICduYW1lJywgdmFsdWU6IG5ld1Byb2ZpbGVOYW1lIH0pO1xuICAgIH0pO1xuXG4gICAgaW5wdXRWaWV3LnNob3coKTtcbiAgfVxuXG4gIGRlbGV0ZSgpIHtcbiAgICBjb25zdCBwcm9maWxlID0gdGhpcy5nZXRTZWxlY3RlZEl0ZW0oKTtcbiAgICBpZiAoIXByb2ZpbGUpIHsgcmV0dXJuOyB9XG5cbiAgICBhdG9tLmNvbmZpcm0oe1xuICAgICAgbWVzc2FnZTogJ0RlbGV0ZSBwcm9maWxlJyxcbiAgICAgIGRldGFpbGVkTWVzc2FnZTogYEFyZSB5b3Ugc3VyZSB5b3Ugd2FudCB0byBkZWxldGUgXCIke3Byb2ZpbGUubmFtZX1cIiBwcm9maWxlP2AsXG4gICAgICBidXR0b25zOiB7XG4gICAgICAgIE5vOiAoKSA9PiB0aGlzLmZvY3VzRmlsdGVyRWRpdG9yKCksXG4gICAgICAgIFllczogKCkgPT4gdGhpcy5lbWl0dGVyLmVtaXQoJ29uLXByb2ZpbGUtZGVsZXRlJywgcHJvZmlsZSksXG4gICAgICB9LFxuICAgIH0pO1xuICB9XG5cbiAgZ2V0RmlsdGVyS2V5KCkge1xuICAgIHJldHVybiAnbmFtZSc7XG4gIH1cblxuICBnZXRFbXB0eU1lc3NhZ2UoKSB7XG4gICAgcmV0dXJuICdObyBwcm9maWxlcyBmb3VuZCc7XG4gIH1cblxuICB2aWV3Rm9ySXRlbShpdGVtKSB7XG4gICAgcmV0dXJuICQkKGZ1bmN0aW9uICgpIHtcbiAgICAgIHRoaXMubGkoeyBjbGFzczogJ3R3by1saW5lcyBwcm9maWxlJyB9LCAoKSA9PiB7XG4gICAgICAgIHRoaXMuZGl2KHsgY2xhc3M6ICdwcmltYXJ5LWxpbmUgbmFtZScgfSwgKCkgPT4gdGhpcy50ZXh0KGl0ZW0ubmFtZSkpO1xuICAgICAgICB0aGlzLmRpdih7IGNsYXNzOiAnc2Vjb25kYXJ5LWxpbmUgZGVzY3JpcHRpb24nIH0sICgpID0+IHRoaXMudGV4dChpdGVtLmRlc2NyaXB0aW9uKSk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIGNhbmNlbCgpIHt9XG5cbiAgY29uZmlybWVkKCkge31cblxuICBzaG93KCkge1xuICAgIHRoaXMucGFuZWwuc2hvdygpO1xuICAgIHRoaXMuZm9jdXNGaWx0ZXJFZGl0b3IoKTtcbiAgfVxuXG4gIGhpZGUoKSB7XG4gICAgdGhpcy5wYW5lbC5oaWRlKCk7XG4gICAgYXRvbS53b3Jrc3BhY2UuZ2V0QWN0aXZlUGFuZSgpLmFjdGl2YXRlKCk7XG4gIH1cblxuICAvLyBVcGRhdGVzIHByb2ZpbGVzXG4gIHNldFByb2ZpbGVzKHByb2ZpbGVzKSB7XG4gICAgdGhpcy5wcm9maWxlcyA9IHByb2ZpbGVzO1xuICAgIHRoaXMuc2V0SXRlbXModGhpcy5wcm9maWxlcyk7XG5cbiAgICAvLyB0b2dnbGUgcHJvZmlsZSBjb250cm9sc1xuICAgIGNvbnN0IHNlbGVjdG9yID0gJy5yZW5hbWUsIC5kZWxldGUsIC5ydW4nO1xuICAgIGlmICh0aGlzLnByb2ZpbGVzLmxlbmd0aCkge1xuICAgICAgdGhpcy5idXR0b25zLmZpbmQoc2VsZWN0b3IpLnNob3coKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5idXR0b25zLmZpbmQoc2VsZWN0b3IpLmhpZGUoKTtcbiAgICB9XG5cbiAgICB0aGlzLnBvcHVsYXRlTGlzdCgpO1xuICAgIHRoaXMuZm9jdXNGaWx0ZXJFZGl0b3IoKTtcbiAgfVxuXG4gIGNsb3NlKCkge31cblxuICBkZXN0cm95KCkge1xuICAgIGlmICh0aGlzLnN1YnNjcmlwdGlvbnMpIHRoaXMuc3Vic2NyaXB0aW9ucy5kaXNwb3NlKCk7XG4gIH1cblxuICBydW4oKSB7XG4gICAgY29uc3QgcHJvZmlsZSA9IHRoaXMuZ2V0U2VsZWN0ZWRJdGVtKCk7XG4gICAgaWYgKCFwcm9maWxlKSB7IHJldHVybjsgfVxuXG4gICAgdGhpcy5lbWl0dGVyLmVtaXQoJ29uLXByb2ZpbGUtcnVuJywgcHJvZmlsZSk7XG4gICAgdGhpcy5oaWRlKCk7XG4gIH1cbn1cbiJdfQ==