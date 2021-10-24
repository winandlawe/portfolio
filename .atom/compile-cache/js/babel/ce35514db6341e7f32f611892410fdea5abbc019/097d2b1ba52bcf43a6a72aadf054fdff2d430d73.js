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

var _underscore = require("underscore");

var _underscore2 = _interopRequireDefault(_underscore);

var _scriptInputView = require("./script-input-view");

var _scriptInputView2 = _interopRequireDefault(_scriptInputView);

"use babel";

var ScriptOptionsView = (function (_View) {
  _inherits(ScriptOptionsView, _View);

  function ScriptOptionsView() {
    _classCallCheck(this, ScriptOptionsView);

    _get(Object.getPrototypeOf(ScriptOptionsView.prototype), "constructor", this).apply(this, arguments);
  }

  _createClass(ScriptOptionsView, [{
    key: "initialize",
    value: function initialize(runOptions) {
      var _this = this;

      this.runOptions = runOptions;
      this.emitter = new _atom.Emitter();

      this.subscriptions = new _atom.CompositeDisposable();
      this.subscriptions.add(atom.commands.add("atom-workspace", {
        "core:cancel": function coreCancel() {
          return _this.hide();
        },
        "core:close": function coreClose() {
          return _this.hide();
        },
        "script:close-options": function scriptCloseOptions() {
          return _this.hide();
        },
        "script:run-options": function scriptRunOptions() {
          return _this.panel.isVisible() ? _this.hide() : _this.show();
        },
        "script:save-options": function scriptSaveOptions() {
          return _this.saveOptions();
        }
      }));

      // handling focus traversal and run on enter
      this.find("atom-text-editor").on("keydown", function (e) {
        if (e.keyCode !== 9 && e.keyCode !== 13) {
          return true;
        }

        switch (e.keyCode) {
          case 9:
            {
              e.preventDefault();
              e.stopPropagation();
              var row = _this.find(e.target).parents("tr:first").nextAll("tr:first");
              if (row.length) {
                return row.find("atom-text-editor").focus();
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
    key: "getOptions",
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
    key: "saveOptions",
    value: function saveOptions() {
      var options = this.getOptions();
      for (var option in options) {
        var value = options[option];
        this.runOptions[option] = value;
      }
    }
  }, {
    key: "onProfileSave",
    value: function onProfileSave(callback) {
      return this.emitter.on("on-profile-save", callback);
    }

    // Saves specified options as new profile
  }, {
    key: "saveProfile",
    value: function saveProfile() {
      var _this2 = this;

      this.hide();

      var options = this.getOptions();

      var inputView = new _scriptInputView2["default"]({ caption: "Enter profile name:" });
      inputView.onCancel(function () {
        return _this2.show();
      });
      inputView.onConfirm(function (profileName) {
        if (!profileName) {
          return;
        }
        _underscore2["default"].forEach(_this2.find("atom-text-editor"), function (editor) {
          editor.getModel().setText("");
        });

        // clean up the options
        _this2.saveOptions();

        // add to global profiles list
        _this2.emitter.emit("on-profile-save", { name: profileName, options: options });
      });

      inputView.show();
    }
  }, {
    key: "close",
    value: function close() {
      this.hide();
    }
  }, {
    key: "destroy",
    value: function destroy() {
      if (this.subscriptions) {
        this.subscriptions.dispose();
      }
    }
  }, {
    key: "show",
    value: function show() {
      this.panel.show();
      this.inputCwd.focus();
    }
  }, {
    key: "hide",
    value: function hide() {
      this.panel.hide();
      atom.workspace.getActivePane().activate();
    }
  }, {
    key: "run",
    value: function run() {
      this.saveOptions();
      this.hide();
      atom.commands.dispatch(this.getWorkspaceView(), "script:run");
    }
  }, {
    key: "getWorkspaceView",
    value: function getWorkspaceView() {
      return atom.views.getView(atom.workspace);
    }
  }], [{
    key: "content",
    value: function content() {
      var _this3 = this;

      this.div({ "class": "options-view" }, function () {
        _this3.h4({ "class": "modal-header" }, "Configure Run Options");
        _this3.div({ "class": "modal-body" }, function () {
          _this3.table(function () {
            _this3.tr(function () {
              _this3.td({ "class": "first" }, function () {
                return _this3.label("Current Working Directory:");
              });
              _this3.td({ "class": "second" }, function () {
                return _this3.tag("atom-text-editor", { mini: "", "class": "editor mini", outlet: "inputCwd" });
              });
            });
            _this3.tr(function () {
              _this3.td(function () {
                return _this3.label("Command");
              });
              _this3.td(function () {
                return _this3.tag("atom-text-editor", { mini: "", "class": "editor mini", outlet: "inputCommand" });
              });
            });
            _this3.tr(function () {
              _this3.td(function () {
                return _this3.label("Command Arguments:");
              });
              _this3.td(function () {
                return _this3.tag("atom-text-editor", { mini: "", "class": "editor mini", outlet: "inputCommandArgs" });
              });
            });
            _this3.tr(function () {
              _this3.td(function () {
                return _this3.label("Program Arguments:");
              });
              _this3.td(function () {
                return _this3.tag("atom-text-editor", { mini: "", "class": "editor mini", outlet: "inputScriptArgs" });
              });
            });
            _this3.tr(function () {
              _this3.td(function () {
                return _this3.label("Environment Variables:");
              });
              _this3.td(function () {
                return _this3.tag("atom-text-editor", { mini: "", "class": "editor mini", outlet: "inputEnv" });
              });
            });
          });
        });
        _this3.div({ "class": "modal-footer" }, function () {
          var css = "btn inline-block-tight";
          _this3.button({ "class": "btn " + css + " cancel", outlet: "buttonCancel", click: "close" }, function () {
            return _this3.span({ "class": "icon icon-x" }, "Cancel");
          });
          _this3.span({ "class": "pull-right" }, function () {
            _this3.button({ "class": "btn " + css + " save-profile", outlet: "buttonSaveProfile", click: "saveProfile" }, function () {
              return _this3.span({ "class": "icon icon-file-text" }, "Save as profile");
            });
            _this3.button({ "class": "btn " + css + " run", outlet: "buttonRun", click: "run" }, function () {
              return _this3.span({ "class": "icon icon-playback-play" }, "Run");
            });
          });
        });
      });
    }
  }, {
    key: "splitArgs",
    value: function splitArgs(argText) {
      var text = argText.trim();
      var argSubstringRegex = /([^\s"']+)|((["'])(.*?)\3)/g;
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

exports["default"] = ScriptOptionsView;
module.exports = exports["default"];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZpbGU6Ly8vQzovVXNlcnMvY2tuanUvLmF0b20vcGFja2FnZXMvc2NyaXB0L2xpYi9zY3JpcHQtb3B0aW9ucy12aWV3LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O29CQUU2QyxNQUFNOztxQ0FDOUIsMkJBQTJCOzswQkFDbEMsWUFBWTs7OzsrQkFDRSxxQkFBcUI7Ozs7QUFMakQsV0FBVyxDQUFBOztJQU9VLGlCQUFpQjtZQUFqQixpQkFBaUI7O1dBQWpCLGlCQUFpQjswQkFBakIsaUJBQWlCOzsrQkFBakIsaUJBQWlCOzs7ZUFBakIsaUJBQWlCOztXQStDMUIsb0JBQUMsVUFBVSxFQUFFOzs7QUFDckIsVUFBSSxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUE7QUFDNUIsVUFBSSxDQUFDLE9BQU8sR0FBRyxtQkFBYSxDQUFBOztBQUU1QixVQUFJLENBQUMsYUFBYSxHQUFHLCtCQUF5QixDQUFBO0FBQzlDLFVBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUNwQixJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsRUFBRTtBQUNsQyxxQkFBYSxFQUFFO2lCQUFNLE1BQUssSUFBSSxFQUFFO1NBQUE7QUFDaEMsb0JBQVksRUFBRTtpQkFBTSxNQUFLLElBQUksRUFBRTtTQUFBO0FBQy9CLDhCQUFzQixFQUFFO2lCQUFNLE1BQUssSUFBSSxFQUFFO1NBQUE7QUFDekMsNEJBQW9CLEVBQUU7aUJBQU8sTUFBSyxLQUFLLENBQUMsU0FBUyxFQUFFLEdBQUcsTUFBSyxJQUFJLEVBQUUsR0FBRyxNQUFLLElBQUksRUFBRTtTQUFDO0FBQ2hGLDZCQUFxQixFQUFFO2lCQUFNLE1BQUssV0FBVyxFQUFFO1NBQUE7T0FDaEQsQ0FBQyxDQUNILENBQUE7OztBQUdELFVBQUksQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxFQUFFLENBQUMsU0FBUyxFQUFFLFVBQUMsQ0FBQyxFQUFLO0FBQ2pELFlBQUksQ0FBQyxDQUFD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LENBQUE7U0FDNUMsTUFBTTtBQUNMLGNBQUksQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQTtTQUM5Qjs7QUFFRCw0QkFBb0IsR0FBRyxpQkFBaUIsQ0FBQyxTQUFTLENBQUE7QUFDbEQsYUFBSyxHQUFHLGlCQUFpQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQTtPQUNyQztBQUNELGFBQU8sSUFBSSxDQUFBO0tBQ1o7OztTQTVHa0IsaUJBQWlCOzs7cUJBQWpCLGlCQUFpQiIsImZpbGUiOiJmaWxlOi8vL0M6L1VzZXJzL2Nrbmp1Ly5hdG9tL3BhY2thZ2VzL3NjcmlwdC9saWIvc2NyaXB0LW9wdGlvbnMtdmlldy5qcyIsInNvdXJjZXNDb250ZW50IjpbIlwidXNlIGJhYmVsXCJcblxuaW1wb3J0IHsgQ29tcG9zaXRlRGlzcG9zYWJsZSwgRW1pdHRlciB9IGZyb20gXCJhdG9tXCJcbmltcG9ydCB7IFZpZXcgfSBmcm9tIFwiYXRvbS1zcGFjZS1wZW4tdmlld3MtcGx1c1wiXG5pbXBvcnQgXyBmcm9tIFwidW5kZXJzY29yZVwiXG5pbXBvcnQgU2NyaXB0SW5wdXRWaWV3IGZyb20gXCIuL3NjcmlwdC1pbnB1dC12aWV3XCJcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2NyaXB0T3B0aW9uc1ZpZXcgZXh0ZW5kcyBWaWV3IHtcbiAgc3RhdGljIGNvbnRlbnQoKSB7XG4gICAgdGhpcy5kaXYoeyBjbGFzczogXCJvcHRpb25zLXZpZXdcIiB9LCAoKSA9PiB7XG4gICAgICB0aGlzLmg0KHsgY2xhc3M6IFwibW9kYWwtaGVhZGVyXCIgfSwgXCJDb25maWd1cmUgUnVuIE9wdGlvbnNcIilcbiAgICAgIHRoaXMuZGl2KHsgY2xhc3M6IFwibW9kYWwtYm9keVwiIH0sICgpID0+IHtcbiAgICAgICAgdGhpcy50YWJsZSgoKSA9PiB7XG4gICAgICAgICAgdGhpcy50cigoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnRkKHsgY2xhc3M6IFwiZmlyc3RcIiB9LCAoKSA9PiB0aGlzLmxhYmVsKFwiQ3VycmVudCBXb3JraW5nIERpcmVjdG9yeTpcIikpXG4gICAgICAgICAgICB0aGlzLnRkKHsgY2xhc3M6IFwic2Vjb25kXCIgfSwgKCkgPT5cbiAgICAgICAgICAgICAgdGhpcy50YWcoXCJhdG9tLXRleHQtZWRpdG9yXCIsIHsgbWluaTogXCJcIiwgY2xhc3M6IFwiZWRpdG9yIG1pbmlcIiwgb3V0bGV0OiBcImlucHV0Q3dkXCIgfSlcbiAgICAgICAgICAgIClcbiAgICAgICAgICB9KVxuICAgICAgICAgIHRoaXMudHIoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy50ZCgoKSA9PiB0aGlzLmxhYmVsKFwiQ29tbWFuZFwiKSlcbiAgICAgICAgICAgIHRoaXMudGQoKCkgPT4gdGhpcy50YWcoXCJhdG9tLXRleHQtZWRpdG9yXCIsIHsgbWluaTogXCJcIiwgY2xhc3M6IFwiZWRpdG9yIG1pbmlcIiwgb3V0bGV0OiBcImlucHV0Q29tbWFuZFwiIH0pKVxuICAgICAgICAgIH0pXG4gICAgICAgICAgdGhpcy50cigoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnRkKCgpID0+IHRoaXMubGFiZWwoXCJDb21tYW5kIEFyZ3VtZW50czpcIikpXG4gICAgICAgICAgICB0aGlzLnRkKCgpID0+IHRoaXMudGFnKFwiYXRvbS10ZXh0LWVkaXRvclwiLCB7IG1pbmk6IFwiXCIsIGNsYXNzOiBcImVkaXRvciBtaW5pXCIsIG91dGxldDogXCJpbnB1dENvbW1hbmRBcmdzXCIgfSkpXG4gICAgICAgICAgfSlcbiAgICAgICAgICB0aGlzLnRyKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMudGQoKCkgPT4gdGhpcy5sYWJlbChcIlByb2dyYW0gQXJndW1lbnRzOlwiKSlcbiAgICAgICAgICAgIHRoaXMudGQoKCkgPT4gdGhpcy50YWcoXCJhdG9tLXRleHQtZWRpdG9yXCIsIHsgbWluaTogXCJcIiwgY2xhc3M6IFwiZWRpdG9yIG1pbmlcIiwgb3V0bGV0OiBcImlucHV0U2NyaXB0QXJnc1wiIH0pKVxuICAgICAgICAgIH0pXG4gICAgICAgICAgdGhpcy50cigoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnRkKCgpID0+IHRoaXMubGFiZWwoXCJFbnZpcm9ubWVudCBWYXJpYWJsZXM6XCIpKVxuICAgICAgICAgICAgdGhpcy50ZCgoKSA9PiB0aGlzLnRhZyhcImF0b20tdGV4dC1lZGl0b3JcIiwgeyBtaW5pOiBcIlwiLCBjbGFzczogXCJlZGl0b3IgbWluaVwiLCBvdXRsZXQ6IFwiaW5wdXRFbnZcIiB9KSlcbiAgICAgICAgICB9KVxuICAgICAgICB9KVxuICAgICAgfSlcbiAgICAgIHRoaXMuZGl2KHsgY2xhc3M6IFwibW9kYWwtZm9vdGVyXCIgfSwgKCkgPT4ge1xuICAgICAgICBjb25zdCBjc3MgPSBcImJ0biBpbmxpbmUtYmxvY2stdGlnaHRcIlxuICAgICAgICB0aGlzLmJ1dHRvbih7IGNsYXNzOiBgYnRuICR7Y3NzfSBjYW5jZWxgLCBvdXRsZXQ6IFwiYnV0dG9uQ2FuY2VsXCIsIGNsaWNrOiBcImNsb3NlXCIgfSwgKCkgPT5cbiAgICAgICAgICB0aGlzLnNwYW4oeyBjbGFzczogXCJpY29uIGljb24teFwiIH0sIFwiQ2FuY2VsXCIpXG4gICAgICAgIClcbiAgICAgICAgdGhpcy5zcGFuKHsgY2xhc3M6IFwicHVsbC1yaWdodFwiIH0sICgpID0+IHtcbiAgICAgICAgICB0aGlzLmJ1dHRvbih7IGNsYXNzOiBgYnRuICR7Y3NzfSBzYXZlLXByb2ZpbGVgLCBvdXRsZXQ6IFwiYnV0dG9uU2F2ZVByb2ZpbGVcIiwgY2xpY2s6IFwic2F2ZVByb2ZpbGVcIiB9LCAoKSA9PlxuICAgICAgICAgICAgdGhpcy5zcGFuKHsgY2xhc3M6IFwiaWNvbiBpY29uLWZpbGUtdGV4dFwiIH0sIFwiU2F2ZSBhcyBwcm9maWxlXCIpXG4gICAgICAgICAgKVxuICAgICAgICAgIHRoaXMuYnV0dG9uKHsgY2xhc3M6IGBidG4gJHtjc3N9IHJ1bmAsIG91dGxldDogXCJidXR0b25SdW5cIiwgY2xpY2s6IFwicnVuXCIgfSwgKCkgPT5cbiAgICAgICAgICAgIHRoaXMuc3Bhbih7IGNsYXNzOiBcImljb24gaWNvbi1wbGF5YmFjay1wbGF5XCIgfSwgXCJSdW5cIilcbiAgICAgICAgICApXG4gICAgICAgIH0pXG4gICAgICB9KVxuICAgIH0pXG4gIH1cblxuICBpbml0aWFsaXplKHJ1bk9wdGlvbnMpIHtcbiAgICB0aGlzLnJ1bk9wdGlvbnMgPSBydW5PcHRpb25zXG4gICAgdGhpcy5lbWl0dGVyID0gbmV3IEVtaXR0ZXIoKVxuXG4gICAgdGhpcy5zdWJzY3JpcHRpb25zID0gbmV3IENvbXBvc2l0ZURpc3Bvc2FibGUoKVxuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5hZGQoXG4gICAgICBhdG9tLmNvbW1hbmRzLmFkZChcImF0b20td29ya3NwYWNlXCIsIHtcbiAgICAgICAgXCJjb3JlOmNhbmNlbFwiOiAoKSA9PiB0aGlzLmhpZGUoKSxcbiAgICAgICAgXCJjb3JlOmNsb3NlXCI6ICgpID0+IHRoaXMuaGlkZSgpLFxuICAgICAgICBcInNjcmlwdDpjbG9zZS1vcHRpb25zXCI6ICgpID0+IHRoaXMuaGlkZSgpLFxuICAgICAgICBcInNjcmlwdDpydW4tb3B0aW9uc1wiOiAoKSA9PiAodGhpcy5wYW5lbC5pc1Zpc2libGUoKSA/IHRoaXMuaGlkZSgpIDogdGhpcy5zaG93KCkpLFxuICAgICAgICBcInNjcmlwdDpzYXZlLW9wdGlvbnNcIjogKCkgPT4gdGhpcy5zYXZlT3B0aW9ucygpLFxuICAgICAgfSlcbiAgICApXG5cbiAgICAvLyBoYW5kbGluZyBmb2N1cyB0cmF2ZXJzYWwgYW5kIHJ1biBvbiBlbnRlclxuICAgIHRoaXMuZmluZChcImF0b20tdGV4dC1lZGl0b3JcIikub24oXCJrZXlkb3duXCIsIChlKSA9PiB7XG4gICAgICBpZiAoZS5rZXlDb2RlICE9PSA5ICYmIGUua2V5Q29kZSAhPT0gMTMpIHtcbiAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgIH1cblxuICAgICAgc3dpdGNoIChlLmtleUNvZGUpIHtcbiAgICAgICAgY2FzZSA5OiB7XG4gICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKVxuICAgICAgICAgIGNvbnN0IHJvdyA9IHRoaXMuZmluZChlLnRhcmdldCkucGFyZW50cyhcInRyOmZpcnN0XCIpLm5leHRBbGwoXCJ0cjpmaXJzdFwiKVxuICAgICAgICAgIGlmIChyb3cubGVuZ3RoKSB7XG4gICAgICAgICAgICByZXR1cm4gcm93LmZpbmQoXCJhdG9tLXRleHQtZWRpdG9yXCIpLmZvY3VzKClcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHRoaXMuYnV0dG9uQ2FuY2VsLmZvY3VzKClcbiAgICAgICAgfVxuICAgICAgICBjYXNlIDEzOlxuICAgICAgICAgIHJldHVybiB0aGlzLnJ1bigpXG4gICAgICB9XG4gICAgICByZXR1cm4gbnVsbFxuICAgIH0pXG5cbiAgICB0aGlzLnBhbmVsID0gYXRvbS53b3Jrc3BhY2UuYWRkTW9kYWxQYW5lbCh7IGl0ZW06IHRoaXMgfSlcbiAgICB0aGlzLnBhbmVsLmhpZGUoKVxuICB9XG5cbiAgc3RhdGljIHNwbGl0QXJncyhhcmdUZXh0KSB7XG4gICAgY29uc3QgdGV4dCA9IGFyZ1RleHQudHJpbSgpXG4gICAgY29uc3QgYXJnU3Vic3RyaW5nUmVnZXggPSAvKFteXFxzXCInXSspfCgoW1wiJ10pKC4qPylcXDMpL2dcbiAgICBjb25zdCBhcmdzID0gW11cbiAgICBsZXQgbGFzdE1hdGNoRW5kUG9zaXRpb24gPSAtMVxuICAgIGxldCBtYXRjaCA9IGFyZ1N1YnN0cmluZ1JlZ2V4LmV4ZWModGV4dClcbiAgICB3aGlsZSAobWF0Y2ggIT09IG51bGwpIHtcbiAgICAgIGNvbnN0IG1hdGNoV2l0aG91dFF1b3RlcyA9IG1hdGNoWzFdIHx8IG1hdGNoWzRdXG4gICAgICAvLyBDb21iaW5lIGN1cnJlbnQgcmVzdWx0IHdpdGggbGFzdCBtYXRjaCwgaWYgbGFzdCBtYXRjaCBlbmRlZCB3aGVyZSB0aGlzXG4gICAgICAvLyBvbmUgYmVnaW5zLlxuICAgICAgaWYgKGxhc3RNYXRjaEVuZFBvc2l0aW9uID09PSBtYXRjaC5pbmRleCkge1xuICAgICAgICBhcmdzW2FyZ3MubGVuZ3RoIC0gMV0gKz0gbWF0Y2hXaXRob3V0UXVvdGVzXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBhcmdzLnB1c2gobWF0Y2hXaXRob3V0UXVvdGVzKVxuICAgICAgfVxuXG4gICAgICBsYXN0TWF0Y2hFbmRQb3NpdGlvbiA9IGFyZ1N1YnN0cmluZ1JlZ2V4Lmxhc3RJbmRleFxuICAgICAgbWF0Y2ggPSBhcmdTdWJzdHJpbmdSZWdleC5leGVjKHRleHQpXG4gICAgfVxuICAgIHJldHVybiBhcmdzXG4gIH1cblxuICBnZXRPcHRpb25zKCkge1xuICAgIHJldHVybiB7XG4gICAgICB3b3JraW5nRGlyZWN0b3J5OiB0aGlzLmlucHV0Q3dkLmdldCgwKS5nZXRNb2RlbCgpLmdldFRleHQoKSxcbiAgICAgIGNtZDogdGhpcy5pbnB1dENvbW1hbmQuZ2V0KDApLmdldE1vZGVsKCkuZ2V0VGV4dCgpLFxuICAgICAgY21kQXJnczogdGhpcy5jb25zdHJ1Y3Rvci5zcGxpdEFyZ3ModGhpcy5pbnB1dENvbW1hbmRBcmdzLmdldCgwKS5nZXRNb2RlbCgpLmdldFRleHQoKSksXG4gICAgICBlbnY6IHRoaXMuaW5wdXRFbnYuZ2V0KDApLmdldE1vZGVsKCkuZ2V0VGV4dCgpLFxuICAgICAgc2NyaXB0QXJnczogdGhpcy5jb25zdHJ1Y3Rvci5zcGxpdEFyZ3ModGhpcy5pbnB1dFNjcmlwdEFyZ3MuZ2V0KDApLmdldE1vZGVsKCkuZ2V0VGV4dCgpKSxcbiAgICB9XG4gIH1cblxuICBzYXZlT3B0aW9ucygpIHtcbiAgICBjb25zdCBvcHRpb25zID0gdGhpcy5nZXRPcHRpb25zKClcbiAgICBmb3IgKGNvbnN0IG9wdGlvbiBpbiBvcHRpb25zKSB7XG4gICAgICBjb25zdCB2YWx1ZSA9IG9wdGlvbnNbb3B0aW9uXVxuICAgICAgdGhpcy5ydW5PcHRpb25zW29wdGlvbl0gPSB2YWx1ZVxuICAgIH1cbiAgfVxuXG4gIG9uUHJvZmlsZVNhdmUoY2FsbGJhY2spIHtcbiAgICByZXR1cm4gdGhpcy5lbWl0dGVyLm9uKFwib24tcHJvZmlsZS1zYXZlXCIsIGNhbGxiYWNrKVxuICB9XG5cbiAgLy8gU2F2ZXMgc3BlY2lmaWVkIG9wdGlvbnMgYXMgbmV3IHByb2ZpbGVcbiAgc2F2ZVByb2ZpbGUoKSB7XG4gICAgdGhpcy5oaWRlKClcblxuICAgIGNvbnN0IG9wdGlvbnMgPSB0aGlzLmdldE9wdGlvbnMoKVxuXG4gICAgY29uc3QgaW5wdXRWaWV3ID0gbmV3IFNjcmlwdElucHV0Vmlldyh7IGNhcHRpb246IFwiRW50ZXIgcHJvZmlsZSBuYW1lOlwiIH0pXG4gICAgaW5wdXRWaWV3Lm9uQ2FuY2VsKCgpID0+IHRoaXMuc2hvdygpKVxuICAgIGlucHV0Vmlldy5vbkNvbmZpcm0oKHByb2ZpbGVOYW1lKSA9PiB7XG4gICAgICBpZiAoIXByb2ZpbGVOYW1lKSB7XG4gICAgICAgIHJldHVyblxuICAgICAgfVxuICAgICAgXy5mb3JFYWNoKHRoaXMuZmluZChcImF0b20tdGV4dC1lZGl0b3JcIiksIChlZGl0b3IpID0+IHtcbiAgICAgICAgZWRpdG9yLmdldE1vZGVsKCkuc2V0VGV4dChcIlwiKVxuICAgICAgfSlcblxuICAgICAgLy8gY2xlYW4gdXAgdGhlIG9wdGlvbnNcbiAgICAgIHRoaXMuc2F2ZU9wdGlvbnMoKVxuXG4gICAgICAvLyBhZGQgdG8gZ2xvYmFsIHByb2ZpbGVzIGxpc3RcbiAgICAgIHRoaXMuZW1pdHRlci5lbWl0KFwib24tcHJvZmlsZS1zYXZlXCIsIHsgbmFtZTogcHJvZmlsZU5hbWUsIG9wdGlvbnMgfSlcbiAgICB9KVxuXG4gICAgaW5wdXRWaWV3LnNob3coKVxuICB9XG5cbiAgY2xvc2UoKSB7XG4gICAgdGhpcy5oaWRlKClcbiAgfVxuXG4gIGRlc3Ryb3koKSB7XG4gICAgaWYgKHRoaXMuc3Vic2NyaXB0aW9ucykge1xuICAgICAgdGhpcy5zdWJzY3JpcHRpb25zLmRpc3Bvc2UoKVxuICAgIH1cbiAgfVxuXG4gIHNob3coKSB7XG4gICAgdGhpcy5wYW5lbC5zaG93KClcbiAgICB0aGlzLmlucHV0Q3dkLmZvY3VzKClcbiAgfVxuXG4gIGhpZGUoKSB7XG4gICAgdGhpcy5wYW5lbC5oaWRlKClcbiAgICBhdG9tLndvcmtzcGFjZS5nZXRBY3RpdmVQYW5lKCkuYWN0aXZhdGUoKVxuICB9XG5cbiAgcnVuKCkge1xuICAgIHRoaXMuc2F2ZU9wdGlvbnMoKVxuICAgIHRoaXMuaGlkZSgpXG4gICAgYXRvbS5jb21tYW5kcy5kaXNwYXRjaCh0aGlzLmdldFdvcmtzcGFjZVZpZXcoKSwgXCJzY3JpcHQ6cnVuXCIpXG4gIH1cblxuICBnZXRXb3Jrc3BhY2VWaWV3KCkge1xuICAgIHJldHVybiBhdG9tLnZpZXdzLmdldFZpZXcoYXRvbS53b3Jrc3BhY2UpXG4gIH1cbn1cbiJdfQ==