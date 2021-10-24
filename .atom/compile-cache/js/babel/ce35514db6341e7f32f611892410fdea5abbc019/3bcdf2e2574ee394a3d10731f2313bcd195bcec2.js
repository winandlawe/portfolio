Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _atom = require("atom");

var _atomSpacePenViewsPlus = require("atom-space-pen-views-plus");

var _scriptInputView = require("./script-input-view");

var _scriptInputView2 = _interopRequireDefault(_scriptInputView);

"use babel";

var ScriptProfileRunView = (function (_SelectListView) {
  _inherits(ScriptProfileRunView, _SelectListView);

  function ScriptProfileRunView() {
    _classCallCheck(this, ScriptProfileRunView);

    _get(Object.getPrototypeOf(ScriptProfileRunView.prototype), "constructor", this).apply(this, arguments);
  }

  _createClass(ScriptProfileRunView, [{
    key: "initialize",
    value: function initialize(profiles) {
      var _this = this;

      this.profiles = profiles;
      _get(Object.getPrototypeOf(ScriptProfileRunView.prototype), "initialize", this).apply(this, arguments);

      this.emitter = new _atom.Emitter();

      this.subscriptions = new _atom.CompositeDisposable();
      this.subscriptions.add(atom.commands.add("atom-workspace", {
        "core:cancel": function coreCancel() {
          return _this.hide();
        },
        "core:close": function coreClose() {
          return _this.hide();
        },
        "script:run-with-profile": function scriptRunWithProfile() {
          return _this.panel.isVisible() ? _this.hide() : _this.show();
        }
      }));

      this.setItems(this.profiles);
      this.initializeView();
    }
  }, {
    key: "initializeView",
    value: function initializeView() {
      var _this3 = this;

      this.addClass("overlay from-top script-profile-run-view");
      // @panel.hide()

      this.buttons = (0, _atomSpacePenViewsPlus.$$)(function () {
        var _this2 = this;

        this.div({ "class": "block buttons" }, function () {
          var css = "btn inline-block-tight";
          _this2.button({ "class": "btn cancel" }, function () {
            return _this2.span({ "class": "icon icon-x" }, "Cancel");
          });
          _this2.button({ "class": "btn rename" }, function () {
            return _this2.span({ "class": "icon icon-pencil" }, "Rename");
          });
          _this2.button({ "class": "btn delete" }, function () {
            return _this2.span({ "class": "icon icon-trashcan" }, "Delete");
          });
          _this2.button({ "class": "btn run" }, function () {
            return _this2.span({ "class": "icon icon-playback-play" }, "Run");
          });
        });
      });

      // event handlers
      this.buttons.find(".btn.cancel").on("click", function () {
        return _this3.hide();
      });
      this.buttons.find(".btn.rename").on("click", function () {
        return _this3.rename();
      });
      this.buttons.find(".btn.delete").on("click", function () {
        return _this3["delete"]();
      });
      this.buttons.find(".btn.run").on("click", function () {
        return _this3.run();
      });

      // fix focus traversal (from run button to filter editor)
      this.buttons.find(".btn.run").on("keydown", function (e) {
        if (e.keyCode === 9) {
          e.stopPropagation();
          e.preventDefault();
          _this3.focusFilterEditor();
        }
      });

      // hide panel on ecsape
      this.on("keydown", function (e) {
        if (e.keyCode === 27) {
          _this3.hide();
        }
        if (e.keyCode === 13) {
          _this3.run();
        }
      });

      // append buttons container
      this.append(this.buttons);

      var selector = ".rename, .delete, .run";
      if (this.profiles.length) {
        this.buttons.find(selector).show();
      } else {
        this.buttons.find(selector).hide();
      }

      this.panel = atom.workspace.addModalPanel({ item: this });
      this.panel.hide();
    }
  }, {
    key: "onProfileDelete",
    value: function onProfileDelete(callback) {
      return this.emitter.on("on-profile-delete", callback);
    }
  }, {
    key: "onProfileChange",
    value: function onProfileChange(callback) {
      return this.emitter.on("on-profile-change", callback);
    }
  }, {
    key: "onProfileRun",
    value: function onProfileRun(callback) {
      return this.emitter.on("on-profile-run", callback);
    }
  }, {
    key: "rename",
    value: function rename() {
      var _this4 = this;

      var profile = this.getSelectedItem();
      if (!profile) {
        return;
      }

      var inputView = new _scriptInputView2["default"]({ caption: "Enter new profile name:", "default": profile.name });
      inputView.onCancel(function () {
        return _this4.show();
      });
      inputView.onConfirm(function (newProfileName) {
        if (!newProfileName) {
          return;
        }
        _this4.emitter.emit("on-profile-change", { profile: profile, key: "name", value: newProfileName });
      });

      inputView.show();
    }
  }, {
    key: "delete",
    value: function _delete() {
      var _this5 = this;

      var profile = this.getSelectedItem();
      if (!profile) {
        return;
      }

      atom.confirm({
        message: "Delete profile",
        detailedMessage: "Are you sure you want to delete \"" + profile.name + "\" profile?",
        buttons: {
          No: function No() {
            return _this5.focusFilterEditor();
          },
          Yes: function Yes() {
            return _this5.emitter.emit("on-profile-delete", profile);
          }
        }
      });
    }
  }, {
    key: "getFilterKey",
    value: function getFilterKey() {
      return "name";
    }
  }, {
    key: "getEmptyMessage",
    value: function getEmptyMessage() {
      return "No profiles found";
    }
  }, {
    key: "viewForItem",
    value: function viewForItem(item) {
      return (0, _atomSpacePenViewsPlus.$$)(function () {
        var _this6 = this;

        this.li({ "class": "two-lines profile" }, function () {
          _this6.div({ "class": "primary-line name" }, function () {
            return _this6.text(item.name);
          });
          _this6.div({ "class": "secondary-line description" }, function () {
            return _this6.text(item.description);
          });
        });
      });
    }
  }, {
    key: "cancel",
    value: function cancel() {}
  }, {
    key: "confirmed",
    value: function confirmed() {}
  }, {
    key: "show",
    value: function show() {
      this.panel.show();
      this.focusFilterEditor();
    }
  }, {
    key: "hide",
    value: function hide() {
      this.panel.hide();
      atom.workspace.getActivePane().activate();
    }

    // Updates profiles
  }, {
    key: "setProfiles",
    value: function setProfiles(profiles) {
      this.profiles = profiles;
      this.setItems(this.profiles);

      // toggle profile controls
      var selector = ".rename, .delete, .run";
      if (this.profiles.length) {
        this.buttons.find(selector).show();
      } else {
        this.buttons.find(selector).hide();
      }

      this.populateList();
      this.focusFilterEditor();
    }
  }, {
    key: "close",
    value: function close() {}
  }, {
    key: "destroy",
    value: function destroy() {
      if (this.subscriptions) {
        this.subscriptions.dispose();
      }
    }
  }, {
    key: "run",
    value: function run() {
      var profile = this.getSelectedItem();
      if (!profile) {
        return;
      }

      this.emitter.emit("on-profile-run", profile);
      this.hide();
    }
  }]);

  return ScriptProfileRunView;
})(_atomSpacePenViewsPlus.SelectListView);

exports["default"] = ScriptProfileRunView;
module.exports = exports["default"];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZpbGU6Ly8vQzovVXNlcnMvY2tuanUvLmF0b20vcGFja2FnZXMvc2NyaXB0L2xpYi9zY3JpcHQtcHJvZmlsZS1ydW4tdmlldy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztvQkFFNkMsTUFBTTs7cUNBQ2hCLDJCQUEyQjs7K0JBQ2xDLHFCQUFxQjs7OztBQUpqRCxXQUFXLENBQUE7O0lBTVUsb0JBQW9CO1lBQXBCLG9CQUFvQjs7V0FBcEIsb0JBQW9COzBCQUFwQixvQkFBb0I7OytCQUFwQixvQkFBb0I7OztlQUFwQixvQkFBb0I7O1dBQzdCLG9CQUFDLFFBQVEsRUFBRTs7O0FBQ25CLFVBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFBO0FBQ3hCLGlDQUhpQixvQkFBb0IsNkNBR2pCLFNBQVMsRUFBQzs7QUFFOUIsVUFBSSxDQUFDLE9BQU8sR0FBRyxtQkFBYSxDQUFBOztBQUU1QixVQUFJLENBQUMsYUFBYSxHQUFHLCtCQUF5QixDQUFBO0FBQzlDLFVBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUNwQixJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsRUFBRTtBQUNsQyxxQkFBYSxFQUFFO2lCQUFNLE1BQUssSUFBSSxFQUFFO1NBQUE7QUFDaEMsb0JBQVksRUFBRTtpQkFBTSxNQUFLLElBQUksRUFBRTtTQUFBO0FBQy9CLGlDQUF5QixFQUFFO2lCQUFPLE1BQUssS0FBSyxDQUFDLFNBQVMsRUFBRSxHQUFHLE1BQUssSUFBSSxFQUFFLEdBQUcsTUFBSyxJQUFJLEVBQUU7U0FBQztPQUN0RixDQUFDLENBQ0gsQ0FBQTs7QUFFRCxVQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQTtBQUM1QixVQUFJLENBQUMsY0FBYyxFQUFFLENBQUE7S0FDdEI7OztXQUVhLDBCQUFHOzs7QUFDZixVQUFJLENBQUMsUUFBUSxDQUFDLDBDQUEwQyxDQUFDLENBQUE7OztBQUd6RCxVQUFJLENB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ZXJzL2Nrbmp1Ly5hdG9tL3BhY2thZ2VzL3NjcmlwdC9saWIvc2NyaXB0LXByb2ZpbGUtcnVuLXZpZXcuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBiYWJlbFwiXG5cbmltcG9ydCB7IENvbXBvc2l0ZURpc3Bvc2FibGUsIEVtaXR0ZXIgfSBmcm9tIFwiYXRvbVwiXG5pbXBvcnQgeyAkJCwgU2VsZWN0TGlzdFZpZXcgfSBmcm9tIFwiYXRvbS1zcGFjZS1wZW4tdmlld3MtcGx1c1wiXG5pbXBvcnQgU2NyaXB0SW5wdXRWaWV3IGZyb20gXCIuL3NjcmlwdC1pbnB1dC12aWV3XCJcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2NyaXB0UHJvZmlsZVJ1blZpZXcgZXh0ZW5kcyBTZWxlY3RMaXN0VmlldyB7XG4gIGluaXRpYWxpemUocHJvZmlsZXMpIHtcbiAgICB0aGlzLnByb2ZpbGVzID0gcHJvZmlsZXNcbiAgICBzdXBlci5pbml0aWFsaXplKC4uLmFyZ3VtZW50cylcblxuICAgIHRoaXMuZW1pdHRlciA9IG5ldyBFbWl0dGVyKClcblxuICAgIHRoaXMuc3Vic2NyaXB0aW9ucyA9IG5ldyBDb21wb3NpdGVEaXNwb3NhYmxlKClcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMuYWRkKFxuICAgICAgYXRvbS5jb21tYW5kcy5hZGQoXCJhdG9tLXdvcmtzcGFjZVwiLCB7XG4gICAgICAgIFwiY29yZTpjYW5jZWxcIjogKCkgPT4gdGhpcy5oaWRlKCksXG4gICAgICAgIFwiY29yZTpjbG9zZVwiOiAoKSA9PiB0aGlzLmhpZGUoKSxcbiAgICAgICAgXCJzY3JpcHQ6cnVuLXdpdGgtcHJvZmlsZVwiOiAoKSA9PiAodGhpcy5wYW5lbC5pc1Zpc2libGUoKSA/IHRoaXMuaGlkZSgpIDogdGhpcy5zaG93KCkpLFxuICAgICAgfSlcbiAgICApXG5cbiAgICB0aGlzLnNldEl0ZW1zKHRoaXMucHJvZmlsZXMpXG4gICAgdGhpcy5pbml0aWFsaXplVmlldygpXG4gIH1cblxuICBpbml0aWFsaXplVmlldygpIHtcbiAgICB0aGlzLmFkZENsYXNzKFwib3ZlcmxheSBmcm9tLXRvcCBzY3JpcHQtcHJvZmlsZS1ydW4tdmlld1wiKVxuICAgIC8vIEBwYW5lbC5oaWRlKClcblxuICAgIHRoaXMuYnV0dG9ucyA9ICQkKGZ1bmN0aW9uICgpIHtcbiAgICAgIHRoaXMuZGl2KHsgY2xhc3M6IFwiYmxvY2sgYnV0dG9uc1wiIH0sICgpID0+IHtcbiAgICAgICAgY29uc3QgY3NzID0gXCJidG4gaW5saW5lLWJsb2NrLXRpZ2h0XCJcbiAgICAgICAgdGhpcy5idXR0b24oeyBjbGFzczogXCJidG4gY2FuY2VsXCIgfSwgKCkgPT4gdGhpcy5zcGFuKHsgY2xhc3M6IFwiaWNvbiBpY29uLXhcIiB9LCBcIkNhbmNlbFwiKSlcbiAgICAgICAgdGhpcy5idXR0b24oeyBjbGFzczogXCJidG4gcmVuYW1lXCIgfSwgKCkgPT4gdGhpcy5zcGFuKHsgY2xhc3M6IFwiaWNvbiBpY29uLXBlbmNpbFwiIH0sIFwiUmVuYW1lXCIpKVxuICAgICAgICB0aGlzLmJ1dHRvbih7IGNsYXNzOiBcImJ0biBkZWxldGVcIiB9LCAoKSA9PiB0aGlzLnNwYW4oeyBjbGFzczogXCJpY29uIGljb24tdHJhc2hjYW5cIiB9LCBcIkRlbGV0ZVwiKSlcbiAgICAgICAgdGhpcy5idXR0b24oeyBjbGFzczogXCJidG4gcnVuXCIgfSwgKCkgPT4gdGhpcy5zcGFuKHsgY2xhc3M6IFwiaWNvbiBpY29uLXBsYXliYWNrLXBsYXlcIiB9LCBcIlJ1blwiKSlcbiAgICAgIH0pXG4gICAgfSlcblxuICAgIC8vIGV2ZW50IGhhbmRsZXJzXG4gICAgdGhpcy5idXR0b25zLmZpbmQoXCIuYnRuLmNhbmNlbFwiKS5vbihcImNsaWNrXCIsICgpID0+IHRoaXMuaGlkZSgpKVxuICAgIHRoaXMuYnV0dG9ucy5maW5kKFwiLmJ0bi5yZW5hbWVcIikub24oXCJjbGlja1wiLCAoKSA9PiB0aGlzLnJlbmFtZSgpKVxuICAgIHRoaXMuYnV0dG9ucy5maW5kKFwiLmJ0bi5kZWxldGVcIikub24oXCJjbGlja1wiLCAoKSA9PiB0aGlzLmRlbGV0ZSgpKVxuICAgIHRoaXMuYnV0dG9ucy5maW5kKFwiLmJ0bi5ydW5cIikub24oXCJjbGlja1wiLCAoKSA9PiB0aGlzLnJ1bigpKVxuXG4gICAgLy8gZml4IGZvY3VzIHRyYXZlcnNhbCAoZnJvbSBydW4gYnV0dG9uIHRvIGZpbHRlciBlZGl0b3IpXG4gICAgdGhpcy5idXR0b25zLmZpbmQoXCIuYnRuLnJ1blwiKS5vbihcImtleWRvd25cIiwgKGUpID0+IHtcbiAgICAgIGlmIChlLmtleUNvZGUgPT09IDkpIHtcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKVxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KClcbiAgICAgICAgdGhpcy5mb2N1c0ZpbHRlckVkaXRvcigpXG4gICAgICB9XG4gICAgfSlcblxuICAgIC8vIGhpZGUgcGFuZWwgb24gZWNzYXBlXG4gICAgdGhpcy5vbihcImtleWRvd25cIiwgKGUpID0+IHtcbiAgICAgIGlmIChlLmtleUNvZGUgPT09IDI3KSB7XG4gICAgICAgIHRoaXMuaGlkZSgpXG4gICAgICB9XG4gICAgICBpZiAoZS5rZXlDb2RlID09PSAxMykge1xuICAgICAgICB0aGlzLnJ1bigpXG4gICAgICB9XG4gICAgfSlcblxuICAgIC8vIGFwcGVuZCBidXR0b25zIGNvbnRhaW5lclxuICAgIHRoaXMuYXBwZW5kKHRoaXMuYnV0dG9ucylcblxuICAgIGNvbnN0IHNlbGVjdG9yID0gXCIucmVuYW1lLCAuZGVsZXRlLCAucnVuXCJcbiAgICBpZiAodGhpcy5wcm9maWxlcy5sZW5ndGgpIHtcbiAgICAgIHRoaXMuYnV0dG9ucy5maW5kKHNlbGVjdG9yKS5zaG93KClcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5idXR0b25zLmZpbmQoc2VsZWN0b3IpLmhpZGUoKVxuICAgIH1cblxuICAgIHRoaXMucGFuZWwgPSBhdG9tLndvcmtzcGFjZS5hZGRNb2RhbFBhbmVsKHsgaXRlbTogdGhpcyB9KVxuICAgIHRoaXMucGFuZWwuaGlkZSgpXG4gIH1cblxuICBvblByb2ZpbGVEZWxldGUoY2FsbGJhY2spIHtcbiAgICByZXR1cm4gdGhpcy5lbWl0dGVyLm9uKFwib24tcHJvZmlsZS1kZWxldGVcIiwgY2FsbGJhY2spXG4gIH1cblxuICBvblByb2ZpbGVDaGFuZ2UoY2FsbGJhY2spIHtcbiAgICByZXR1cm4gdGhpcy5lbWl0dGVyLm9uKFwib24tcHJvZmlsZS1jaGFuZ2VcIiwgY2FsbGJhY2spXG4gIH1cblxuICBvblByb2ZpbGVSdW4oY2FsbGJhY2spIHtcbiAgICByZXR1cm4gdGhpcy5lbWl0dGVyLm9uKFwib24tcHJvZmlsZS1ydW5cIiwgY2FsbGJhY2spXG4gIH1cblxuICByZW5hbWUoKSB7XG4gICAgY29uc3QgcHJvZmlsZSA9IHRoaXMuZ2V0U2VsZWN0ZWRJdGVtKClcbiAgICBpZiAoIXByb2ZpbGUpIHtcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIGNvbnN0IGlucHV0VmlldyA9IG5ldyBTY3JpcHRJbnB1dFZpZXcoeyBjYXB0aW9uOiBcIkVudGVyIG5ldyBwcm9maWxlIG5hbWU6XCIsIGRlZmF1bHQ6IHByb2ZpbGUubmFtZSB9KVxuICAgIGlucHV0Vmlldy5vbkNhbmNlbCgoKSA9PiB0aGlzLnNob3coKSlcbiAgICBpbnB1dFZpZXcub25Db25maXJtKChuZXdQcm9maWxlTmFtZSkgPT4ge1xuICAgICAgaWYgKCFuZXdQcm9maWxlTmFtZSkge1xuICAgICAgICByZXR1cm5cbiAgICAgIH1cbiAgICAgIHRoaXMuZW1pdHRlci5lbWl0KFwib24tcHJvZmlsZS1jaGFuZ2VcIiwgeyBwcm9maWxlLCBrZXk6IFwibmFtZVwiLCB2YWx1ZTogbmV3UHJvZmlsZU5hbWUgfSlcbiAgICB9KVxuXG4gICAgaW5wdXRWaWV3LnNob3coKVxuICB9XG5cbiAgZGVsZXRlKCkge1xuICAgIGNvbnN0IHByb2ZpbGUgPSB0aGlzLmdldFNlbGVjdGVkSXRlbSgpXG4gICAgaWYgKCFwcm9maWxlKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICBhdG9tLmNvbmZpcm0oe1xuICAgICAgbWVzc2FnZTogXCJEZWxldGUgcHJvZmlsZVwiLFxuICAgICAgZGV0YWlsZWRNZXNzYWdlOiBgQXJlIHlvdSBzdXJlIHlvdSB3YW50IHRvIGRlbGV0ZSBcIiR7cHJvZmlsZS5uYW1lfVwiIHByb2ZpbGU/YCxcbiAgICAgIGJ1dHRvbnM6IHtcbiAgICAgICAgTm86ICgpID0+IHRoaXMuZm9jdXNGaWx0ZXJFZGl0b3IoKSxcbiAgICAgICAgWWVzOiAoKSA9PiB0aGlzLmVtaXR0ZXIuZW1pdChcIm9uLXByb2ZpbGUtZGVsZXRlXCIsIHByb2ZpbGUpLFxuICAgICAgfSxcbiAgICB9KVxuICB9XG5cbiAgZ2V0RmlsdGVyS2V5KCkge1xuICAgIHJldHVybiBcIm5hbWVcIlxuICB9XG5cbiAgZ2V0RW1wdHlNZXNzYWdlKCkge1xuICAgIHJldHVybiBcIk5vIHByb2ZpbGVzIGZvdW5kXCJcbiAgfVxuXG4gIHZpZXdGb3JJdGVtKGl0ZW0pIHtcbiAgICByZXR1cm4gJCQoZnVuY3Rpb24gKCkge1xuICAgICAgdGhpcy5saSh7IGNsYXNzOiBcInR3by1saW5lcyBwcm9maWxlXCIgfSwgKCkgPT4ge1xuICAgICAgICB0aGlzLmRpdih7IGNsYXNzOiBcInByaW1hcnktbGluZSBuYW1lXCIgfSwgKCkgPT4gdGhpcy50ZXh0KGl0ZW0ubmFtZSkpXG4gICAgICAgIHRoaXMuZGl2KHsgY2xhc3M6IFwic2Vjb25kYXJ5LWxpbmUgZGVzY3JpcHRpb25cIiB9LCAoKSA9PiB0aGlzLnRleHQoaXRlbS5kZXNjcmlwdGlvbikpXG4gICAgICB9KVxuICAgIH0pXG4gIH1cblxuICBjYW5jZWwoKSB7fVxuXG4gIGNvbmZpcm1lZCgpIHt9XG5cbiAgc2hvdygpIHtcbiAgICB0aGlzLnBhbmVsLnNob3coKVxuICAgIHRoaXMuZm9jdXNGaWx0ZXJFZGl0b3IoKVxuICB9XG5cbiAgaGlkZSgpIHtcbiAgICB0aGlzLnBhbmVsLmhpZGUoKVxuICAgIGF0b20ud29ya3NwYWNlLmdldEFjdGl2ZVBhbmUoKS5hY3RpdmF0ZSgpXG4gIH1cblxuICAvLyBVcGRhdGVzIHByb2ZpbGVzXG4gIHNldFByb2ZpbGVzKHByb2ZpbGVzKSB7XG4gICAgdGhpcy5wcm9maWxlcyA9IHByb2ZpbGVzXG4gICAgdGhpcy5zZXRJdGVtcyh0aGlzLnByb2ZpbGVzKVxuXG4gICAgLy8gdG9nZ2xlIHByb2ZpbGUgY29udHJvbHNcbiAgICBjb25zdCBzZWxlY3RvciA9IFwiLnJlbmFtZSwgLmRlbGV0ZSwgLnJ1blwiXG4gICAgaWYgKHRoaXMucHJvZmlsZXMubGVuZ3RoKSB7XG4gICAgICB0aGlzLmJ1dHRvbnMuZmluZChzZWxlY3Rvcikuc2hvdygpXG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuYnV0dG9ucy5maW5kKHNlbGVjdG9yKS5oaWRlKClcbiAgICB9XG5cbiAgICB0aGlzLnBvcHVsYXRlTGlzdCgpXG4gICAgdGhpcy5mb2N1c0ZpbHRlckVkaXRvcigpXG4gIH1cblxuICBjbG9zZSgpIHt9XG5cbiAgZGVzdHJveSgpIHtcbiAgICBpZiAodGhpcy5zdWJzY3JpcHRpb25zKSB7XG4gICAgICB0aGlzLnN1YnNjcmlwdGlvbnMuZGlzcG9zZSgpXG4gICAgfVxuICB9XG5cbiAgcnVuKCkge1xuICAgIGNvbnN0IHByb2ZpbGUgPSB0aGlzLmdldFNlbGVjdGVkSXRlbSgpXG4gICAgaWYgKCFwcm9maWxlKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICB0aGlzLmVtaXR0ZXIuZW1pdChcIm9uLXByb2ZpbGUtcnVuXCIsIHByb2ZpbGUpXG4gICAgdGhpcy5oaWRlKClcbiAgfVxufVxuIl19