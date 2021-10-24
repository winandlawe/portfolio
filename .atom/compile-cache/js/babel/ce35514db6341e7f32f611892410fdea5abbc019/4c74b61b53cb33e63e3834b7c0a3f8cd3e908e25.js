Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x2, _x3, _x4) { var _again = true; _function: while (_again) { var object = _x2, property = _x3, receiver = _x4; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x2 = parent; _x3 = property; _x4 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _atomSpacePenViewsPlus = require("atom-space-pen-views-plus");

var _atomMessagePanel = require("atom-message-panel");

var _underscore = require("underscore");

var _underscore2 = _interopRequireDefault(_underscore);

var _ansiToHtml = require("ansi-to-html");

var _ansiToHtml2 = _interopRequireDefault(_ansiToHtml);

var _stripAnsi = require("strip-ansi");

var _stripAnsi2 = _interopRequireDefault(_stripAnsi);

var _headerView = require("./header-view");

var _headerView2 = _interopRequireDefault(_headerView);

var _linkPaths = require("./link-paths");

var _linkPaths2 = _interopRequireDefault(_linkPaths);

// Runs a portion of a script through an interpreter and displays it line by line
"use babel";

var ScriptView = (function (_MessagePanelView) {
  _inherits(ScriptView, _MessagePanelView);

  function ScriptView() {
    var _this = this;

    _classCallCheck(this, ScriptView);

    var headerView = new _headerView2["default"]();
    _get(Object.getPrototypeOf(ScriptView.prototype), "constructor", this).call(this, { title: headerView, rawTitle: true, closeMethod: "destroy" });

    this.scrollTimeout = null;
    this.ansiFilter = new _ansiToHtml2["default"]();
    this.headerView = headerView;
    // Use 'bottom' as the default position, because that was
    // the behaviour before the position became configurable:
    this.position = "bottom";
    atom.config.observe("script.position", function (newVal) {
      _this.position = newVal;
    });

    this.showInTab = this.showInTab.bind(this);
    this.setHeaderAndShowExecutionTime = this.setHeaderAndShowExecutionTime.bind(this);
    this.addClass("script-view");
    this.addShowInTabIcon();

    _linkPaths2["default"].listen(this.body);
  }

  _createClass(ScriptView, [{
    key: "addShowInTabIcon",
    value: function addShowInTabIcon() {
      var icon = (0, _atomSpacePenViewsPlus.$$)(function () {
        this.div({
          "class": "heading-show-in-tab inline-block icon-file-text",
          style: "cursor: pointer;",
          outlet: "btnShowInTab",
          title: "Show output in new tab"
        });
      });

      icon.click(this.showInTab);
      icon.insertBefore(this.btnAutoScroll);
    }
  }, {
    key: "showInTab",
    value: function showInTab() {
      // concat output
      var output = "";
      for (var message of this.messages) {
        output += message.text();
      }

      // represent command context
      var context = "";
      if (this.commandContext) {
        context = "[Command: " + this.commandContext.getRepresentation() + "]\n";
      }

      // open new tab and set content to output
      atom.workspace.open().then(function (editor) {
        return editor.setText((0, _stripAnsi2["default"])(context + output));
      });
    }
  }, {
    key: "setHeaderAndShowExecutionTime",
    value: function setHeaderAndShowExecutionTime(returnCode, executionTime) {
      if (executionTime) {
        this.display("stdout", "[Finished in " + executionTime.toString() + "s]");
      } else {
        this.display("stdout");
      }

      if (returnCode === 0) {
        this.setHeaderStatus("stop");
      } else {
        this.setHeaderStatus("err");
      }
    }
  }, {
    key: "resetView",
    value: function resetView() {
      var title = arguments.length <= 0 || arguments[0] === undefined ? "Loading..." : arguments[0];

      // Display window and load message

      this.attach();

      this.setHeaderTitle(title);
      this.setHeaderStatus("start");

      // Get script view ready
      this.clear();
    }
  }, {
    key: "removePanel",
    value: function removePanel() {
      this.stop();
      this.detach();
      // the 'close' method from MessagePanelView actually destroys the panel
      Object.getPrototypeOf(ScriptView.prototype).close.apply(this);
    }

    // This is triggered when hitting the 'close' button on the panel
    // We are not actually closing the panel here since we want to trigger
    // 'script:close-view' which will eventually remove the panel via 'removePanel'
  }, {
    key: "close",
    value: function close() {
      var workspaceView = atom.views.getView(atom.workspace);
      atom.commands.dispatch(workspaceView, "script:close-view");
    }
  }, {
    key: "stop",
    value: function stop() {
      this.display("stdout", "^C");
      this.setHeaderStatus("kill");
    }
  }, {
    key: "createGitHubIssueLink",
    value: function createGitHubIssueLink(argType, lang) {
      // const title = `Add ${argType} support for ${lang}`;
      // const body = `##### Platform: \`${process.platform}\`\n---\n`;
      // let encodedURI = encodeURI(`https://github.com/atom-ide-community/atom-script/issues/new?title=${title}&body=${body}`);
      // // NOTE: Replace "#" after regular encoding so we don't double escape it.
      // encodedURI = encodedURI.replace(/#/g, '%23');

      var err = (0, _atomSpacePenViewsPlus.$$)(function () {
        this.p({ "class": "block" }, argType + " runner not available for " + lang + ".");
        // this.p({ class: 'block' }, () => {
        //   this.text('If it should exist, add an ');
        //   this.a({ href: encodedURI }, 'issue on GitHub');
        //   this.text(', or send your own pull request.');
        // },
        // );
      });
      this.handleError(err);
    }
  }, {
    key: "showUnableToRunError",
    value: function showUnableToRunError(command) {
      this.add((0, _atomSpacePenViewsPlus.$$)(function () {
        this.h1("Unable to run");
        this.pre(_underscore2["default"].escape(command));
        this.h2("Did you start Atom from the command line?");
        this.pre("  atom .");
        this.h2("Is it in your PATH?");
        this.pre("PATH: " + _underscore2["default"].escape(process.env.PATH));
      }));
    }
  }, {
    key: "showNoLanguageSpecified",
    value: function showNoLanguageSpecified() {
      var err = (0, _atomSpacePenViewsPlus.$$)(function () {
        this.p("You must select a language in the lower right, or save the file with an appropriate extension.");
      });
      this.handleError(err);
    }
  }, {
    key: "showLanguageNotSupported",
    value: function showLanguageNotSupported(lang) {
      var err = (0, _atomSpacePenViewsPlus.$$)(function () {
        var _this2 = this;

        this.p({ "class": "block" }, "Command not configured for " + lang + "!");
        this.p({ "class": "block" }, function () {
          _this2.text("Add an ");
          _this2.a({ href: "https://github.com/atom-ide-community/atom-script/issues/new?title=Add%20support%20for%20" + lang }, "issue on GitHub");
          _this2.text(" or send your own Pull Request.");
        });
      });
      this.handleError(err);
    }
  }, {
    key: "handleError",
    value: function handleError(err) {
      // Display error and kill process
      this.setHeaderTitle("Error");
      this.setHeaderStatus("err");
      this.add(err);
      this.stop();
    }
  }, {
    key: "setHeaderStatus",
    value: function setHeaderStatus(status) {
      this.headerView.setStatus(status);
    }
  }, {
    key: "setHeaderTitle",
    value: function setHeaderTitle(title) {
      this.headerView.title.text(title);
    }
  }, {
    key: "display",
    value: function display(css, line) {
      if (atom.config.get("script.escapeConsoleOutput")) {
        line = _underscore2["default"].escape(line);
      }

      try {
        line = this.ansiFilter.toHtml(line);
      } catch (e) {
        // TODO why this happens https://github.com/atom-community/atom-script/issues/2358
        console.error(e);
      }

      line = (0, _linkPaths2["default"])(line);

      var _body$0 = this.body[0];
      var clientHeight = _body$0.clientHeight;
      var scrollTop = _body$0.scrollTop;
      var scrollHeight = _body$0.scrollHeight;

      // indicates that the panel is scrolled to the bottom, thus we know that
      // we are not interfering with the user's manual scrolling
      var atEnd = scrollTop >= scrollHeight - clientHeight;

      this.add((0, _atomSpacePenViewsPlus.$$)(function () {
        var _this3 = this;

        this.pre({ "class": "line " + css }, function () {
          return _this3.raw(line);
        });
      }));

      if (atom.config.get("script.scrollWithOutput") && atEnd) {
        // Scroll down in a polling loop 'cause
        // we don't know when the reflow will finish.
        // See: http://stackoverflow.com/q/5017923/407845
        this.checkScrollAgain(5)();
      }
    }
  }, {
    key: "checkScrollAgain",
    value: function checkScrollAgain(times) {
      var _this4 = this;

      return function () {
        _this4.body.scrollToBottom();

        clearTimeout(_this4.scrollTimeout);
        if (times > 1) {
          _this4.scrollTimeout = setTimeout(_this4.checkScrollAgain(times - 1), 50);
        }
      };
    }
  }, {
    key: "copyResults",
    value: function copyResults() {
      if (this.results) {
        atom.clipboard.write((0, _stripAnsi2["default"])(this.results));
      }
    }
  }]);

  return ScriptView;
})(_atomMessagePanel.MessagePanelView);

exports["default"] = ScriptView;
module.exports = exports["default"];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZpbGU6Ly8vQzovVXNlcnMvY2tuanUvLmF0b20vcGFja2FnZXMvc2NyaXB0L2xpYi9zY3JpcHQtdmlldy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztxQ0FFbUIsMkJBQTJCOztnQ0FDYixvQkFBb0I7OzBCQUN2QyxZQUFZOzs7OzBCQUNILGNBQWM7Ozs7eUJBQ2YsWUFBWTs7OzswQkFFWCxlQUFlOzs7O3lCQUNoQixjQUFjOzs7OztBQVRwQyxXQUFXLENBQUE7O0lBWVUsVUFBVTtZQUFWLFVBQVU7O0FBQ2xCLFdBRFEsVUFBVSxHQUNmOzs7MEJBREssVUFBVTs7QUFFM0IsUUFBTSxVQUFVLEdBQUcsNkJBQWdCLENBQUE7QUFDbkMsK0JBSGlCLFVBQVUsNkNBR3JCLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxTQUFTLEVBQUUsRUFBQzs7QUFFcEUsUUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUE7QUFDekIsUUFBSSxDQUFDLFVBQVUsR0FBRyw2QkFBZ0IsQ0FBQTtBQUNsQyxRQUFJLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQTs7O0FBRzVCLFFBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFBO0FBQ3hCLFFBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLGlCQUFpQixFQUFFLFVBQUMsTUFBTSxFQUFLO0FBQ2pELFlBQUssUUFBUSxHQUFHLE1BQU0sQ0FBQTtLQUN2QixDQUFDLENBQUE7O0FBRUYsUUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQTtBQUMxQyxRQUFJLENBQUMsNkJBQTZCLEdBQUcsSUFBSSxDQUFDLDZCQUE2QixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQTtBQUNsRixRQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxDQUFBO0FBQzVCLFFBQUksQ0FBQyxnQkFBZ0Is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Q0FBQyxDQUFDO1VBQXRELFlBQVksV0FBWixZQUFZO1VBQUUsU0FBUyxXQUFULFNBQVM7VUFBRSxZQUFZLFdBQVosWUFBWTs7OztBQUc3QyxVQUFNLEtBQUssR0FBRyxTQUFTLElBQUksWUFBWSxHQUFHLFlBQVksQ0FBQTs7QUFFdEQsVUFBSSxDQUFDLEdBQUcsQ0FDTiwrQkFBRyxZQUFZOzs7QUFDYixZQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsbUJBQWUsR0FBRyxBQUFFLEVBQUUsRUFBRTtpQkFBTSxPQUFLLEdBQUcsQ0FBQyxJQUFJLENBQUM7U0FBQSxDQUFDLENBQUE7T0FDekQsQ0FBQyxDQUNILENBQUE7O0FBRUQsVUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyx5QkFBeUIsQ0FBQyxJQUFJLEtBQUssRUFBRTs7OztBQUl2RCxZQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQTtPQUMzQjtLQUNGOzs7V0FFZSwwQkFBQyxLQUFLLEVBQUU7OztBQUN0QixhQUFPLFlBQU07QUFDWCxlQUFLLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQTs7QUFFMUIsb0JBQVksQ0FBQyxPQUFLLGFBQWEsQ0FBQyxDQUFBO0FBQ2hDLFlBQUksS0FBSyxHQUFHLENBQUMsRUFBRTtBQUNiLGlCQUFLLGFBQWEsR0FBRyxVQUFVLENBQUMsT0FBSyxnQkFBZ0IsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUE7U0FDdEU7T0FDRixDQUFBO0tBQ0Y7OztXQUVVLHVCQUFHO0FBQ1osVUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFO0FBQ2hCLFlBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLDRCQUFVLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFBO09BQzlDO0tBQ0Y7OztTQTFOa0IsVUFBVTs7O3FCQUFWLFVBQVUiLCJmaWxlIjoiZmlsZTovLy9DOi9Vc2Vycy9ja25qdS8uYXRvbS9wYWNrYWdlcy9zY3JpcHQvbGliL3NjcmlwdC12aWV3LmpzIiwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2UgYmFiZWxcIlxuXG5pbXBvcnQgeyAkJCB9IGZyb20gXCJhdG9tLXNwYWNlLXBlbi12aWV3cy1wbHVzXCJcbmltcG9ydCB7IE1lc3NhZ2VQYW5lbFZpZXcgfSBmcm9tIFwiYXRvbS1tZXNzYWdlLXBhbmVsXCJcbmltcG9ydCBfIGZyb20gXCJ1bmRlcnNjb3JlXCJcbmltcG9ydCBBbnNpRmlsdGVyIGZyb20gXCJhbnNpLXRvLWh0bWxcIlxuaW1wb3J0IHN0cmlwQW5zaSBmcm9tIFwic3RyaXAtYW5zaVwiXG5cbmltcG9ydCBIZWFkZXJWaWV3IGZyb20gXCIuL2hlYWRlci12aWV3XCJcbmltcG9ydCBsaW5rUGF0aHMgZnJvbSBcIi4vbGluay1wYXRoc1wiXG5cbi8vIFJ1bnMgYSBwb3J0aW9uIG9mIGEgc2NyaXB0IHRocm91Z2ggYW4gaW50ZXJwcmV0ZXIgYW5kIGRpc3BsYXlzIGl0IGxpbmUgYnkgbGluZVxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2NyaXB0VmlldyBleHRlbmRzIE1lc3NhZ2VQYW5lbFZpZXcge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBjb25zdCBoZWFkZXJWaWV3ID0gbmV3IEhlYWRlclZpZXcoKVxuICAgIHN1cGVyKHsgdGl0bGU6IGhlYWRlclZpZXcsIHJhd1RpdGxlOiB0cnVlLCBjbG9zZU1ldGhvZDogXCJkZXN0cm95XCIgfSlcblxuICAgIHRoaXMuc2Nyb2xsVGltZW91dCA9IG51bGxcbiAgICB0aGlzLmFuc2lGaWx0ZXIgPSBuZXcgQW5zaUZpbHRlcigpXG4gICAgdGhpcy5oZWFkZXJWaWV3ID0gaGVhZGVyVmlld1xuICAgIC8vIFVzZSAnYm90dG9tJyBhcyB0aGUgZGVmYXVsdCBwb3NpdGlvbiwgYmVjYXVzZSB0aGF0IHdhc1xuICAgIC8vIHRoZSBiZWhhdmlvdXIgYmVmb3JlIHRoZSBwb3NpdGlvbiBiZWNhbWUgY29uZmlndXJhYmxlOlxuICAgIHRoaXMucG9zaXRpb24gPSBcImJvdHRvbVwiXG4gICAgYXRvbS5jb25maWcub2JzZXJ2ZShcInNjcmlwdC5wb3NpdGlvblwiLCAobmV3VmFsKSA9PiB7XG4gICAgICB0aGlzLnBvc2l0aW9uID0gbmV3VmFsXG4gICAgfSlcblxuICAgIHRoaXMuc2hvd0luVGFiID0gdGhpcy5zaG93SW5UYWIuYmluZCh0aGlzKVxuICAgIHRoaXMuc2V0SGVhZGVyQW5kU2hvd0V4ZWN1dGlvblRpbWUgPSB0aGlzLnNldEhlYWRlckFuZFNob3dFeGVjdXRpb25UaW1lLmJpbmQodGhpcylcbiAgICB0aGlzLmFkZENsYXNzKFwic2NyaXB0LXZpZXdcIilcbiAgICB0aGlzLmFkZFNob3dJblRhYkljb24oKVxuXG4gICAgbGlua1BhdGhzLmxpc3Rlbih0aGlzLmJvZHkpXG4gIH1cblxuICBhZGRTaG93SW5UYWJJY29uKCkge1xuICAgIGNvbnN0IGljb24gPSAkJChmdW5jdGlvbiAoKSB7XG4gICAgICB0aGlzLmRpdih7XG4gICAgICAgIGNsYXNzOiBcImhlYWRpbmctc2hvdy1pbi10YWIgaW5saW5lLWJsb2NrIGljb24tZmlsZS10ZXh0XCIsXG4gICAgICAgIHN0eWxlOiBcImN1cnNvcjogcG9pbnRlcjtcIixcbiAgICAgICAgb3V0bGV0OiBcImJ0blNob3dJblRhYlwiLFxuICAgICAgICB0aXRsZTogXCJTaG93IG91dHB1dCBpbiBuZXcgdGFiXCIsXG4gICAgICB9KVxuICAgIH0pXG5cbiAgICBpY29uLmNsaWNrKHRoaXMuc2hvd0luVGFiKVxuICAgIGljb24uaW5zZXJ0QmVmb3JlKHRoaXMuYnRuQXV0b1Njcm9sbClcbiAgfVxuXG4gIHNob3dJblRhYigpIHtcbiAgICAvLyBjb25jYXQgb3V0cHV0XG4gICAgbGV0IG91dHB1dCA9IFwiXCJcbiAgICBmb3IgKGNvbnN0IG1lc3NhZ2Ugb2YgdGhpcy5tZXNzYWdlcykge1xuICAgICAgb3V0cHV0ICs9IG1lc3NhZ2UudGV4dCgpXG4gICAgfVxuXG4gICAgLy8gcmVwcmVzZW50IGNvbW1hbmQgY29udGV4dFxuICAgIGxldCBjb250ZXh0ID0gXCJcIlxuICAgIGlmICh0aGlzLmNvbW1hbmRDb250ZXh0KSB7XG4gICAgICBjb250ZXh0ID0gYFtDb21tYW5kOiAke3RoaXMuY29tbWFuZENvbnRleHQuZ2V0UmVwcmVzZW50YXRpb24oKX1dXFxuYFxuICAgIH1cblxuICAgIC8vIG9wZW4gbmV3IHRhYiBhbmQgc2V0IGNvbnRlbnQgdG8gb3V0cHV0XG4gICAgYXRvbS53b3Jrc3BhY2Uub3BlbigpLnRoZW4oKGVkaXRvcikgPT4gZWRpdG9yLnNldFRleHQoc3RyaXBBbnNpKGNvbnRleHQgKyBvdXRwdXQpKSlcbiAgfVxuXG4gIHNldEhlYWRlckFuZFNob3dFeGVjdXRpb25UaW1lKHJldHVybkNvZGUsIGV4ZWN1dGlvblRpbWUpIHtcbiAgICBpZiAoZXhlY3V0aW9uVGltZSkge1xuICAgICAgdGhpcy5kaXNwbGF5KFwic3Rkb3V0XCIsIGBbRmluaXNoZWQgaW4gJHtleGVjdXRpb25UaW1lLnRvU3RyaW5nKCl9c11gKVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmRpc3BsYXkoXCJzdGRvdXRcIilcbiAgICB9XG5cbiAgICBpZiAocmV0dXJuQ29kZSA9PT0gMCkge1xuICAgICAgdGhpcy5zZXRIZWFkZXJTdGF0dXMoXCJzdG9wXCIpXG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc2V0SGVhZGVyU3RhdHVzKFwiZXJyXCIpXG4gICAgfVxuICB9XG5cbiAgcmVzZXRWaWV3KHRpdGxlID0gXCJMb2FkaW5nLi4uXCIpIHtcbiAgICAvLyBEaXNwbGF5IHdpbmRvdyBhbmQgbG9hZCBtZXNzYWdlXG5cbiAgICB0aGlzLmF0dGFjaCgpXG5cbiAgICB0aGlzLnNldEhlYWRlclRpdGxlKHRpdGxlKVxuICAgIHRoaXMuc2V0SGVhZGVyU3RhdHVzKFwic3RhcnRcIilcblxuICAgIC8vIEdldCBzY3JpcHQgdmlldyByZWFkeVxuICAgIHRoaXMuY2xlYXIoKVxuICB9XG5cbiAgcmVtb3ZlUGFuZWwoKSB7XG4gICAgdGhpcy5zdG9wKClcbiAgICB0aGlzLmRldGFjaCgpXG4gICAgLy8gdGhlICdjbG9zZScgbWV0aG9kIGZyb20gTWVzc2FnZVBhbmVsVmlldyBhY3R1YWxseSBkZXN0cm95cyB0aGUgcGFuZWxcbiAgICBPYmplY3QuZ2V0UHJvdG90eXBlT2YoU2NyaXB0Vmlldy5wcm90b3R5cGUpLmNsb3NlLmFwcGx5KHRoaXMpXG4gIH1cblxuICAvLyBUaGlzIGlzIHRyaWdnZXJlZCB3aGVuIGhpdHRpbmcgdGhlICdjbG9zZScgYnV0dG9uIG9uIHRoZSBwYW5lbFxuICAvLyBXZSBhcmUgbm90IGFjdHVhbGx5IGNsb3NpbmcgdGhlIHBhbmVsIGhlcmUgc2luY2Ugd2Ugd2FudCB0byB0cmlnZ2VyXG4gIC8vICdzY3JpcHQ6Y2xvc2Utdmlldycgd2hpY2ggd2lsbCBldmVudHVhbGx5IHJlbW92ZSB0aGUgcGFuZWwgdmlhICdyZW1vdmVQYW5lbCdcbiAgY2xvc2UoKSB7XG4gICAgY29uc3Qgd29ya3NwYWNlVmlldyA9IGF0b20udmlld3MuZ2V0VmlldyhhdG9tLndvcmtzcGFjZSlcbiAgICBhdG9tLmNvbW1hbmRzLmRpc3BhdGNoKHdvcmtzcGFjZVZpZXcsIFwic2NyaXB0OmNsb3NlLXZpZXdcIilcbiAgfVxuXG4gIHN0b3AoKSB7XG4gICAgdGhpcy5kaXNwbGF5KFwic3Rkb3V0XCIsIFwiXkNcIilcbiAgICB0aGlzLnNldEhlYWRlclN0YXR1cyhcImtpbGxcIilcbiAgfVxuXG4gIGNyZWF0ZUdpdEh1Yklzc3VlTGluayhhcmdUeXBlLCBsYW5nKSB7XG4gICAgLy8gY29uc3QgdGl0bGUgPSBgQWRkICR7YXJnVHlwZX0gc3VwcG9ydCBmb3IgJHtsYW5nfWA7XG4gICAgLy8gY29uc3QgYm9keSA9IGAjIyMjIyBQbGF0Zm9ybTogXFxgJHtwcm9jZXNzLnBsYXRmb3JtfVxcYFxcbi0tLVxcbmA7XG4gICAgLy8gbGV0IGVuY29kZWRVUkkgPSBlbmNvZGVVUkkoYGh0dHBzOi8vZ2l0aHViLmNvbS9hdG9tLWlkZS1jb21tdW5pdHkvYXRvbS1zY3JpcHQvaXNzdWVzL25ldz90aXRsZT0ke3RpdGxlfSZib2R5PSR7Ym9keX1gKTtcbiAgICAvLyAvLyBOT1RFOiBSZXBsYWNlIFwiI1wiIGFmdGVyIHJlZ3VsYXIgZW5jb2Rpbmcgc28gd2UgZG9uJ3QgZG91YmxlIGVzY2FwZSBpdC5cbiAgICAvLyBlbmNvZGVkVVJJID0gZW5jb2RlZFVSSS5yZXBsYWNlKC8jL2csICclMjMnKTtcblxuICAgIGNvbnN0IGVyciA9ICQkKGZ1bmN0aW9uICgpIHtcbiAgICAgIHRoaXMucCh7IGNsYXNzOiBcImJsb2NrXCIgfSwgYCR7YXJnVHlwZX0gcnVubmVyIG5vdCBhdmFpbGFibGUgZm9yICR7bGFuZ30uYClcbiAgICAgIC8vIHRoaXMucCh7IGNsYXNzOiAnYmxvY2snIH0sICgpID0+IHtcbiAgICAgIC8vICAgdGhpcy50ZXh0KCdJZiBpdCBzaG91bGQgZXhpc3QsIGFkZCBhbiAnKTtcbiAgICAgIC8vICAgdGhpcy5hKHsgaHJlZjogZW5jb2RlZFVSSSB9LCAnaXNzdWUgb24gR2l0SHViJyk7XG4gICAgICAvLyAgIHRoaXMudGV4dCgnLCBvciBzZW5kIHlvdXIgb3duIHB1bGwgcmVxdWVzdC4nKTtcbiAgICAgIC8vIH0sXG4gICAgICAvLyApO1xuICAgIH0pXG4gICAgdGhpcy5oYW5kbGVFcnJvcihlcnIpXG4gIH1cblxuICBzaG93VW5hYmxlVG9SdW5FcnJvcihjb21tYW5kKSB7XG4gICAgdGhpcy5hZGQoXG4gICAgICAkJChmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuaDEoXCJVbmFibGUgdG8gcnVuXCIpXG4gICAgICAgIHRoaXMucHJlKF8uZXNjYXBlKGNvbW1hbmQpKVxuICAgICAgICB0aGlzLmgyKFwiRGlkIHlvdSBzdGFydCBBdG9tIGZyb20gdGhlIGNvbW1hbmQgbGluZT9cIilcbiAgICAgICAgdGhpcy5wcmUoXCIgIGF0b20gLlwiKVxuICAgICAgICB0aGlzLmgyKFwiSXMgaXQgaW4geW91ciBQQVRIP1wiKVxuICAgICAgICB0aGlzLnByZShgUEFUSDogJHtfLmVzY2FwZShwcm9jZXNzLmVudi5QQVRIKX1gKVxuICAgICAgfSlcbiAgICApXG4gIH1cblxuICBzaG93Tm9MYW5ndWFnZVNwZWNpZmllZCgpIHtcbiAgICBjb25zdCBlcnIgPSAkJChmdW5jdGlvbiAoKSB7XG4gICAgICB0aGlzLnAoXCJZb3UgbXVzdCBzZWxlY3QgYSBsYW5ndWFnZSBpbiB0aGUgbG93ZXIgcmlnaHQsIG9yIHNhdmUgdGhlIGZpbGUgd2l0aCBhbiBhcHByb3ByaWF0ZSBleHRlbnNpb24uXCIpXG4gICAgfSlcbiAgICB0aGlzLmhhbmRsZUVycm9yKGVycilcbiAgfVxuXG4gIHNob3dMYW5ndWFnZU5vdFN1cHBvcnRlZChsYW5nKSB7XG4gICAgY29uc3QgZXJyID0gJCQoZnVuY3Rpb24gKCkge1xuICAgICAgdGhpcy5wKHsgY2xhc3M6IFwiYmxvY2tcIiB9LCBgQ29tbWFuZCBub3QgY29uZmlndXJlZCBmb3IgJHtsYW5nfSFgKVxuICAgICAgdGhpcy5wKHsgY2xhc3M6IFwiYmxvY2tcIiB9LCAoKSA9PiB7XG4gICAgICAgIHRoaXMudGV4dChcIkFkZCBhbiBcIilcbiAgICAgICAgdGhpcy5hKFxuICAgICAgICAgIHsgaHJlZjogYGh0dHBzOi8vZ2l0aHViLmNvbS9hdG9tLWlkZS1jb21tdW5pdHkvYXRvbS1zY3JpcHQvaXNzdWVzL25ldz90aXRsZT1BZGQlMjBzdXBwb3J0JTIwZm9yJTIwJHtsYW5nfWAgfSxcbiAgICAgICAgICBcImlzc3VlIG9uIEdpdEh1YlwiXG4gICAgICAgIClcbiAgICAgICAgdGhpcy50ZXh0KFwiIG9yIHNlbmQgeW91ciBvd24gUHVsbCBSZXF1ZXN0LlwiKVxuICAgICAgfSlcbiAgICB9KVxuICAgIHRoaXMuaGFuZGxlRXJyb3IoZXJyKVxuICB9XG5cbiAgaGFuZGxlRXJyb3IoZXJyKSB7XG4gICAgLy8gRGlzcGxheSBlcnJvciBhbmQga2lsbCBwcm9jZXNzXG4gICAgdGhpcy5zZXRIZWFkZXJUaXRsZShcIkVycm9yXCIpXG4gICAgdGhpcy5zZXRIZWFkZXJTdGF0dXMoXCJlcnJcIilcbiAgICB0aGlzLmFkZChlcnIpXG4gICAgdGhpcy5zdG9wKClcbiAgfVxuXG4gIHNldEhlYWRlclN0YXR1cyhzdGF0dXMpIHtcbiAgICB0aGlzLmhlYWRlclZpZXcuc2V0U3RhdHVzKHN0YXR1cylcbiAgfVxuXG4gIHNldEhlYWRlclRpdGxlKHRpdGxlKSB7XG4gICAgdGhpcy5oZWFkZXJWaWV3LnRpdGxlLnRleHQodGl0bGUpXG4gIH1cblxuICBkaXNwbGF5KGNzcywgbGluZSkge1xuICAgIGlmIChhdG9tLmNvbmZpZy5nZXQoXCJzY3JpcHQuZXNjYXBlQ29uc29sZU91dHB1dFwiKSkge1xuICAgICAgbGluZSA9IF8uZXNjYXBlKGxpbmUpXG4gICAgfVxuXG4gICAgdHJ5IHtcbiAgICAgIGxpbmUgPSB0aGlzLmFuc2lGaWx0ZXIudG9IdG1sKGxpbmUpXG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgLy8gVE9ETyB3aHkgdGhpcyBoYXBwZW5zIGh0dHBzOi8vZ2l0aHViLmNvbS9hdG9tLWNvbW11bml0eS9hdG9tLXNjcmlwdC9pc3N1ZXMvMjM1OFxuICAgICAgY29uc29sZS5lcnJvcihlKVxuICAgIH1cblxuICAgIGxpbmUgPSBsaW5rUGF0aHMobGluZSlcblxuICAgIGNvbnN0IHsgY2xpZW50SGVpZ2h0LCBzY3JvbGxUb3AsIHNjcm9sbEhlaWdodCB9ID0gdGhpcy5ib2R5WzBdXG4gICAgLy8gaW5kaWNhdGVzIHRoYXQgdGhlIHBhbmVsIGlzIHNjcm9sbGVkIHRvIHRoZSBib3R0b20sIHRodXMgd2Uga25vdyB0aGF0XG4gICAgLy8gd2UgYXJlIG5vdCBpbnRlcmZlcmluZyB3aXRoIHRoZSB1c2VyJ3MgbWFudWFsIHNjcm9sbGluZ1xuICAgIGNvbnN0IGF0RW5kID0gc2Nyb2xsVG9wID49IHNjcm9sbEhlaWdodCAtIGNsaWVudEhlaWdodFxuXG4gICAgdGhpcy5hZGQoXG4gICAgICAkJChmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMucHJlKHsgY2xhc3M6IGBsaW5lICR7Y3NzfWAgfSwgKCkgPT4gdGhpcy5yYXcobGluZSkpXG4gICAgICB9KVxuICAgIClcblxuICAgIGlmIChhdG9tLmNvbmZpZy5nZXQoXCJzY3JpcHQuc2Nyb2xsV2l0aE91dHB1dFwiKSAmJiBhdEVuZCkge1xuICAgICAgLy8gU2Nyb2xsIGRvd24gaW4gYSBwb2xsaW5nIGxvb3AgJ2NhdXNlXG4gICAgICAvLyB3ZSBkb24ndCBrbm93IHdoZW4gdGhlIHJlZmxvdyB3aWxsIGZpbmlzaC5cbiAgICAgIC8vIFNlZTogaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL3EvNTAxNzkyMy80MDc4NDVcbiAgICAgIHRoaXMuY2hlY2tTY3JvbGxBZ2Fpbig1KSgpXG4gICAgfVxuICB9XG5cbiAgY2hlY2tTY3JvbGxBZ2Fpbih0aW1lcykge1xuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICB0aGlzLmJvZHkuc2Nyb2xsVG9Cb3R0b20oKVxuXG4gICAgICBjbGVhclRpbWVvdXQodGhpcy5zY3JvbGxUaW1lb3V0KVxuICAgICAgaWYgKHRpbWVzID4gMSkge1xuICAgICAgICB0aGlzLnNjcm9sbFRpbWVvdXQgPSBzZXRUaW1lb3V0KHRoaXMuY2hlY2tTY3JvbGxBZ2Fpbih0aW1lcyAtIDEpLCA1MClcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBjb3B5UmVzdWx0cygpIHtcbiAgICBpZiAodGhpcy5yZXN1bHRzKSB7XG4gICAgICBhdG9tLmNsaXBib2FyZC53cml0ZShzdHJpcEFuc2kodGhpcy5yZXN1bHRzKSlcbiAgICB9XG4gIH1cbn1cbiJdfQ==