Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x2, _x3, _x4) { var _again = true; _function: while (_again) { var object = _x2, property = _x3, receiver = _x4; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x2 = parent; _x3 = property; _x4 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/* eslint-disable func-names */

var _atomSpacePenViewsPlus = require('atom-space-pen-views-plus');

var _atomMessagePanel = require('atom-message-panel');

var _underscore = require('underscore');

var _underscore2 = _interopRequireDefault(_underscore);

var _ansiToHtml = require('ansi-to-html');

var _ansiToHtml2 = _interopRequireDefault(_ansiToHtml);

var _stripAnsi = require('strip-ansi');

var _stripAnsi2 = _interopRequireDefault(_stripAnsi);

var _headerView = require('./header-view');

var _headerView2 = _interopRequireDefault(_headerView);

var _linkPaths = require('./link-paths');

var _linkPaths2 = _interopRequireDefault(_linkPaths);

// Runs a portion of a script through an interpreter and displays it line by line
'use babel';
var ScriptView = (function (_MessagePanelView) {
  _inherits(ScriptView, _MessagePanelView);

  function ScriptView() {
    _classCallCheck(this, ScriptView);

    var headerView = new _headerView2['default']();
    _get(Object.getPrototypeOf(ScriptView.prototype), 'constructor', this).call(this, { title: headerView, rawTitle: true, closeMethod: 'destroy' });

    this.scrollTimeout = null;
    this.ansiFilter = new _ansiToHtml2['default']();
    this.headerView = headerView;

    this.showInTab = this.showInTab.bind(this);
    this.setHeaderAndShowExecutionTime = this.setHeaderAndShowExecutionTime.bind(this);
    this.addClass('script-view');
    this.addShowInTabIcon();

    _linkPaths2['default'].listen(this.body);
  }

  _createClass(ScriptView, [{
    key: 'addShowInTabIcon',
    value: function addShowInTabIcon() {
      var icon = (0, _atomSpacePenViewsPlus.$$)(function () {
        this.div({
          'class': 'heading-show-in-tab inline-block icon-file-text',
          style: 'cursor: pointer;',
          outlet: 'btnShowInTab',
          title: 'Show output in new tab'
        });
      });

      icon.click(this.showInTab);
      icon.insertBefore(this.btnAutoScroll);
    }
  }, {
    key: 'showInTab',
    value: function showInTab() {
      // concat output
      var output = '';
      for (var message of this.messages) {
        output += message.text();
      }

      // represent command context
      var context = '';
      if (this.commandContext) {
        context = '[Command: ' + this.commandContext.getRepresentation() + ']\n';
      }

      // open new tab and set content to output
      atom.workspace.open().then(function (editor) {
        return editor.setText((0, _stripAnsi2['default'])(context + output));
      });
    }
  }, {
    key: 'setHeaderAndShowExecutionTime',
    value: function setHeaderAndShowExecutionTime(returnCode, executionTime) {
      if (executionTime) {
        this.display('stdout', '[Finished in ' + executionTime.toString() + 's]');
      } else {
        this.display('stdout');
      }

      if (returnCode === 0) {
        this.setHeaderStatus('stop');
      } else {
        this.setHeaderStatus('err');
      }
    }
  }, {
    key: 'resetView',
    value: function resetView() {
      var title = arguments.length <= 0 || arguments[0] === undefined ? 'Loading...' : arguments[0];

      // Display window and load message

      this.attach();

      this.setHeaderTitle(title);
      this.setHeaderStatus('start');

      // Get script view ready
      this.clear();
    }
  }, {
    key: 'removePanel',
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
    key: 'close',
    value: function close() {
      var workspaceView = atom.views.getView(atom.workspace);
      atom.commands.dispatch(workspaceView, 'script:close-view');
    }
  }, {
    key: 'stop',
    value: function stop() {
      this.display('stdout', '^C');
      this.setHeaderStatus('kill');
    }
  }, {
    key: 'createGitHubIssueLink',
    value: function createGitHubIssueLink(argType, lang) {
      // const title = `Add ${argType} support for ${lang}`;
      // const body = `##### Platform: \`${process.platform}\`\n---\n`;
      // let encodedURI = encodeURI(`https://github.com/atom-ide-community/atom-script/issues/new?title=${title}&body=${body}`);
      // // NOTE: Replace "#" after regular encoding so we don't double escape it.
      // encodedURI = encodedURI.replace(/#/g, '%23');

      var err = (0, _atomSpacePenViewsPlus.$$)(function () {
        this.p({ 'class': 'block' }, argType + ' runner not available for ' + lang + '.');
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
    key: 'showUnableToRunError',
    value: function showUnableToRunError(command) {
      this.add((0, _atomSpacePenViewsPlus.$$)(function () {
        this.h1('Unable to run');
        this.pre(_underscore2['default'].escape(command));
        this.h2('Did you start Atom from the command line?');
        this.pre('  atom .');
        this.h2('Is it in your PATH?');
        this.pre('PATH: ' + _underscore2['default'].escape(process.env.PATH));
      }));
    }
  }, {
    key: 'showNoLanguageSpecified',
    value: function showNoLanguageSpecified() {
      var err = (0, _atomSpacePenViewsPlus.$$)(function () {
        this.p('You must select a language in the lower right, or save the file with an appropriate extension.');
      });
      this.handleError(err);
    }
  }, {
    key: 'showLanguageNotSupported',
    value: function showLanguageNotSupported(lang) {
      var err = (0, _atomSpacePenViewsPlus.$$)(function () {
        var _this = this;

        this.p({ 'class': 'block' }, 'Command not configured for ' + lang + '!');
        this.p({ 'class': 'block' }, function () {
          _this.text('Add an ');
          _this.a({ href: 'https://github.com/atom-ide-community/atom-script/issues/new?title=Add%20support%20for%20' + lang }, 'issue on GitHub');
          _this.text(' or send your own Pull Request.');
        });
      });
      this.handleError(err);
    }
  }, {
    key: 'handleError',
    value: function handleError(err) {
      // Display error and kill process
      this.setHeaderTitle('Error');
      this.setHeaderStatus('err');
      this.add(err);
      this.stop();
    }
  }, {
    key: 'setHeaderStatus',
    value: function setHeaderStatus(status) {
      this.headerView.setStatus(status);
    }
  }, {
    key: 'setHeaderTitle',
    value: function setHeaderTitle(title) {
      this.headerView.title.text(title);
    }
  }, {
    key: 'display',
    value: function display(css, line) {
      if (atom.config.get('script.escapeConsoleOutput')) {
        line = _underscore2['default'].escape(line);
      }

      line = this.ansiFilter.toHtml(line);
      line = (0, _linkPaths2['default'])(line);

      var _body$0 = this.body[0];
      var clientHeight = _body$0.clientHeight;
      var scrollTop = _body$0.scrollTop;
      var scrollHeight = _body$0.scrollHeight;

      // indicates that the panel is scrolled to the bottom, thus we know that
      // we are not interfering with the user's manual scrolling
      var atEnd = scrollTop >= scrollHeight - clientHeight;

      this.add((0, _atomSpacePenViewsPlus.$$)(function () {
        var _this2 = this;

        this.pre({ 'class': 'line ' + css }, function () {
          return _this2.raw(line);
        });
      }));

      if (atom.config.get('script.scrollWithOutput') && atEnd) {
        // Scroll down in a polling loop 'cause
        // we don't know when the reflow will finish.
        // See: http://stackoverflow.com/q/5017923/407845
        this.checkScrollAgain(5)();
      }
    }
  }, {
    key: 'checkScrollAgain',
    value: function checkScrollAgain(times) {
      var _this3 = this;

      return function () {
        _this3.body.scrollToBottom();

        clearTimeout(_this3.scrollTimeout);
        if (times > 1) {
          _this3.scrollTimeout = setTimeout(_this3.checkScrollAgain(times - 1), 50);
        }
      };
    }
  }, {
    key: 'copyResults',
    value: function copyResults() {
      if (this.results) {
        atom.clipboard.write((0, _stripAnsi2['default'])(this.results));
      }
    }
  }]);

  return ScriptView;
})(_atomMessagePanel.MessagePanelView);

exports['default'] = ScriptView;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZpbGU6Ly8vQzovVXNlcnMvY2tuanUvLmF0b20vcGFja2FnZXMvc2NyaXB0L2xpYi9zY3JpcHQtdmlldy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O3FDQUdtQiwyQkFBMkI7O2dDQUNiLG9CQUFvQjs7MEJBQ3ZDLFlBQVk7Ozs7MEJBQ0gsY0FBYzs7Ozt5QkFDZixZQUFZOzs7OzBCQUVYLGVBQWU7Ozs7eUJBQ2hCLGNBQWM7Ozs7O0FBVnBDLFdBQVcsQ0FBQztJQWFTLFVBQVU7WUFBVixVQUFVOztBQUNsQixXQURRLFVBQVUsR0FDZjswQkFESyxVQUFVOztBQUUzQixRQUFNLFVBQVUsR0FBRyw2QkFBZ0IsQ0FBQztBQUNwQywrQkFIaUIsVUFBVSw2Q0FHckIsRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLFNBQVMsRUFBRSxFQUFFOztBQUVyRSxRQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQztBQUMxQixRQUFJLENBQUMsVUFBVSxHQUFHLDZCQUFnQixDQUFDO0FBQ25DLFFBQUksQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDOztBQUU3QixRQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQzNDLFFBQUksQ0FBQyw2QkFBNkIsR0FBRyxJQUFJLENBQUMsNkJBQTZCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ25GLFFBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLENBQUM7QUFDN0IsUUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7O0FBRXhCLDJCQUFVLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7R0FDN0I7O2VBZmtCLFVBQVU7O1dBaUJiLDRCQUFHO0FBQ2pCLFVBQU0sSUFBSSxHQUFHLCtCQUFHLFlBQVk7QUFDMUIsWUFBSSxDQUFDLEdBQUcsQ0FBQztB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LE9BQUssR0FBRyxDQUFDLElBQUksQ0FBQztTQUFBLENBQUMsQ0FBQztPQUMxRCxDQUFDLENBQUMsQ0FBQzs7QUFFSixVQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLHlCQUF5QixDQUFDLElBQUksS0FBSyxFQUFFOzs7O0FBSXZELFlBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO09BQzVCO0tBQ0Y7OztXQUVlLDBCQUFDLEtBQUssRUFBRTs7O0FBQ3RCLGFBQU8sWUFBTTtBQUNYLGVBQUssSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDOztBQUUzQixvQkFBWSxDQUFDLE9BQUssYUFBYSxDQUFDLENBQUM7QUFDakMsWUFBSSxLQUFLLEdBQUcsQ0FBQyxFQUFFO0FBQ2IsaUJBQUssYUFBYSxHQUFHLFVBQVUsQ0FBQyxPQUFLLGdCQUFnQixDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztTQUN2RTtPQUNGLENBQUM7S0FDSDs7O1dBRVUsdUJBQUc7QUFDWixVQUFJLElBQUksQ0FBQyxPQUFPLEVBQUU7QUFDaEIsWUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsNEJBQVUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7T0FDL0M7S0FDRjs7O1NBck1rQixVQUFVOzs7cUJBQVYsVUFBVSIsImZpbGUiOiJmaWxlOi8vL0M6L1VzZXJzL2Nrbmp1Ly5hdG9tL3BhY2thZ2VzL3NjcmlwdC9saWIvc2NyaXB0LXZpZXcuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIGJhYmVsJztcblxuLyogZXNsaW50LWRpc2FibGUgZnVuYy1uYW1lcyAqL1xuaW1wb3J0IHsgJCQgfSBmcm9tICdhdG9tLXNwYWNlLXBlbi12aWV3cy1wbHVzJztcbmltcG9ydCB7IE1lc3NhZ2VQYW5lbFZpZXcgfSBmcm9tICdhdG9tLW1lc3NhZ2UtcGFuZWwnO1xuaW1wb3J0IF8gZnJvbSAndW5kZXJzY29yZSc7XG5pbXBvcnQgQW5zaUZpbHRlciBmcm9tICdhbnNpLXRvLWh0bWwnO1xuaW1wb3J0IHN0cmlwQW5zaSBmcm9tICdzdHJpcC1hbnNpJztcblxuaW1wb3J0IEhlYWRlclZpZXcgZnJvbSAnLi9oZWFkZXItdmlldyc7XG5pbXBvcnQgbGlua1BhdGhzIGZyb20gJy4vbGluay1wYXRocyc7XG5cbi8vIFJ1bnMgYSBwb3J0aW9uIG9mIGEgc2NyaXB0IHRocm91Z2ggYW4gaW50ZXJwcmV0ZXIgYW5kIGRpc3BsYXlzIGl0IGxpbmUgYnkgbGluZVxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2NyaXB0VmlldyBleHRlbmRzIE1lc3NhZ2VQYW5lbFZpZXcge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBjb25zdCBoZWFkZXJWaWV3ID0gbmV3IEhlYWRlclZpZXcoKTtcbiAgICBzdXBlcih7IHRpdGxlOiBoZWFkZXJWaWV3LCByYXdUaXRsZTogdHJ1ZSwgY2xvc2VNZXRob2Q6ICdkZXN0cm95JyB9KTtcblxuICAgIHRoaXMuc2Nyb2xsVGltZW91dCA9IG51bGw7XG4gICAgdGhpcy5hbnNpRmlsdGVyID0gbmV3IEFuc2lGaWx0ZXIoKTtcbiAgICB0aGlzLmhlYWRlclZpZXcgPSBoZWFkZXJWaWV3O1xuXG4gICAgdGhpcy5zaG93SW5UYWIgPSB0aGlzLnNob3dJblRhYi5iaW5kKHRoaXMpO1xuICAgIHRoaXMuc2V0SGVhZGVyQW5kU2hvd0V4ZWN1dGlvblRpbWUgPSB0aGlzLnNldEhlYWRlckFuZFNob3dFeGVjdXRpb25UaW1lLmJpbmQodGhpcyk7XG4gICAgdGhpcy5hZGRDbGFzcygnc2NyaXB0LXZpZXcnKTtcbiAgICB0aGlzLmFkZFNob3dJblRhYkljb24oKTtcblxuICAgIGxpbmtQYXRocy5saXN0ZW4odGhpcy5ib2R5KTtcbiAgfVxuXG4gIGFkZFNob3dJblRhYkljb24oKSB7XG4gICAgY29uc3QgaWNvbiA9ICQkKGZ1bmN0aW9uICgpIHtcbiAgICAgIHRoaXMuZGl2KHtcbiAgICAgICAgY2xhc3M6ICdoZWFkaW5nLXNob3ctaW4tdGFiIGlubGluZS1ibG9jayBpY29uLWZpbGUtdGV4dCcsXG4gICAgICAgIHN0eWxlOiAnY3Vyc29yOiBwb2ludGVyOycsXG4gICAgICAgIG91dGxldDogJ2J0blNob3dJblRhYicsXG4gICAgICAgIHRpdGxlOiAnU2hvdyBvdXRwdXQgaW4gbmV3IHRhYicsXG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIGljb24uY2xpY2sodGhpcy5zaG93SW5UYWIpO1xuICAgIGljb24uaW5zZXJ0QmVmb3JlKHRoaXMuYnRuQXV0b1Njcm9sbCk7XG4gIH1cblxuICBzaG93SW5UYWIoKSB7XG4gICAgLy8gY29uY2F0IG91dHB1dFxuICAgIGxldCBvdXRwdXQgPSAnJztcbiAgICBmb3IgKGNvbnN0IG1lc3NhZ2Ugb2YgdGhpcy5tZXNzYWdlcykgeyBvdXRwdXQgKz0gbWVzc2FnZS50ZXh0KCk7IH1cblxuICAgIC8vIHJlcHJlc2VudCBjb21tYW5kIGNvbnRleHRcbiAgICBsZXQgY29udGV4dCA9ICcnO1xuICAgIGlmICh0aGlzLmNvbW1hbmRDb250ZXh0KSB7XG4gICAgICBjb250ZXh0ID0gYFtDb21tYW5kOiAke3RoaXMuY29tbWFuZENvbnRleHQuZ2V0UmVwcmVzZW50YXRpb24oKX1dXFxuYDtcbiAgICB9XG5cbiAgICAvLyBvcGVuIG5ldyB0YWIgYW5kIHNldCBjb250ZW50IHRvIG91dHB1dFxuICAgIGF0b20ud29ya3NwYWNlLm9wZW4oKS50aGVuKChlZGl0b3IpID0+IGVkaXRvci5zZXRUZXh0KHN0cmlwQW5zaShjb250ZXh0ICsgb3V0cHV0KSkpO1xuICB9XG5cbiAgc2V0SGVhZGVyQW5kU2hvd0V4ZWN1dGlvblRpbWUocmV0dXJuQ29kZSwgZXhlY3V0aW9uVGltZSkge1xuICAgIGlmIChleGVjdXRpb25UaW1lKSB7XG4gICAgICB0aGlzLmRpc3BsYXkoJ3N0ZG91dCcsIGBbRmluaXNoZWQgaW4gJHtleGVjdXRpb25UaW1lLnRvU3RyaW5nKCl9c11gKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5kaXNwbGF5KCdzdGRvdXQnKTtcbiAgICB9XG5cbiAgICBpZiAocmV0dXJuQ29kZSA9PT0gMCkge1xuICAgICAgdGhpcy5zZXRIZWFkZXJTdGF0dXMoJ3N0b3AnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zZXRIZWFkZXJTdGF0dXMoJ2VycicpO1xuICAgIH1cbiAgfVxuXG4gIHJlc2V0Vmlldyh0aXRsZSA9ICdMb2FkaW5nLi4uJykge1xuICAgIC8vIERpc3BsYXkgd2luZG93IGFuZCBsb2FkIG1lc3NhZ2VcblxuICAgIHRoaXMuYXR0YWNoKCk7XG5cbiAgICB0aGlzLnNldEhlYWRlclRpdGxlKHRpdGxlKTtcbiAgICB0aGlzLnNldEhlYWRlclN0YXR1cygnc3RhcnQnKTtcblxuICAgIC8vIEdldCBzY3JpcHQgdmlldyByZWFkeVxuICAgIHRoaXMuY2xlYXIoKTtcbiAgfVxuXG4gIHJlbW92ZVBhbmVsKCkge1xuICAgIHRoaXMuc3RvcCgpO1xuICAgIHRoaXMuZGV0YWNoKCk7XG4gICAgLy8gdGhlICdjbG9zZScgbWV0aG9kIGZyb20gTWVzc2FnZVBhbmVsVmlldyBhY3R1YWxseSBkZXN0cm95cyB0aGUgcGFuZWxcbiAgICBPYmplY3QuZ2V0UHJvdG90eXBlT2YoU2NyaXB0Vmlldy5wcm90b3R5cGUpLmNsb3NlLmFwcGx5KHRoaXMpO1xuICB9XG5cbiAgLy8gVGhpcyBpcyB0cmlnZ2VyZWQgd2hlbiBoaXR0aW5nIHRoZSAnY2xvc2UnIGJ1dHRvbiBvbiB0aGUgcGFuZWxcbiAgLy8gV2UgYXJlIG5vdCBhY3R1YWxseSBjbG9zaW5nIHRoZSBwYW5lbCBoZXJlIHNpbmNlIHdlIHdhbnQgdG8gdHJpZ2dlclxuICAvLyAnc2NyaXB0OmNsb3NlLXZpZXcnIHdoaWNoIHdpbGwgZXZlbnR1YWxseSByZW1vdmUgdGhlIHBhbmVsIHZpYSAncmVtb3ZlUGFuZWwnXG4gIGNsb3NlKCkge1xuICAgIGNvbnN0IHdvcmtzcGFjZVZpZXcgPSBhdG9tLnZpZXdzLmdldFZpZXcoYXRvbS53b3Jrc3BhY2UpO1xuICAgIGF0b20uY29tbWFuZHMuZGlzcGF0Y2god29ya3NwYWNlVmlldywgJ3NjcmlwdDpjbG9zZS12aWV3Jyk7XG4gIH1cblxuICBzdG9wKCkge1xuICAgIHRoaXMuZGlzcGxheSgnc3Rkb3V0JywgJ15DJyk7XG4gICAgdGhpcy5zZXRIZWFkZXJTdGF0dXMoJ2tpbGwnKTtcbiAgfVxuXG4gIGNyZWF0ZUdpdEh1Yklzc3VlTGluayhhcmdUeXBlLCBsYW5nKSB7XG4gICAgLy8gY29uc3QgdGl0bGUgPSBgQWRkICR7YXJnVHlwZX0gc3VwcG9ydCBmb3IgJHtsYW5nfWA7XG4gICAgLy8gY29uc3QgYm9keSA9IGAjIyMjIyBQbGF0Zm9ybTogXFxgJHtwcm9jZXNzLnBsYXRmb3JtfVxcYFxcbi0tLVxcbmA7XG4gICAgLy8gbGV0IGVuY29kZWRVUkkgPSBlbmNvZGVVUkkoYGh0dHBzOi8vZ2l0aHViLmNvbS9hdG9tLWlkZS1jb21tdW5pdHkvYXRvbS1zY3JpcHQvaXNzdWVzL25ldz90aXRsZT0ke3RpdGxlfSZib2R5PSR7Ym9keX1gKTtcbiAgICAvLyAvLyBOT1RFOiBSZXBsYWNlIFwiI1wiIGFmdGVyIHJlZ3VsYXIgZW5jb2Rpbmcgc28gd2UgZG9uJ3QgZG91YmxlIGVzY2FwZSBpdC5cbiAgICAvLyBlbmNvZGVkVVJJID0gZW5jb2RlZFVSSS5yZXBsYWNlKC8jL2csICclMjMnKTtcblxuICAgIGNvbnN0IGVyciA9ICQkKGZ1bmN0aW9uICgpIHtcbiAgICAgIHRoaXMucCh7IGNsYXNzOiAnYmxvY2snIH0sIGAke2FyZ1R5cGV9IHJ1bm5lciBub3QgYXZhaWxhYmxlIGZvciAke2xhbmd9LmApO1xuICAgICAgLy8gdGhpcy5wKHsgY2xhc3M6ICdibG9jaycgfSwgKCkgPT4ge1xuICAgICAgLy8gICB0aGlzLnRleHQoJ0lmIGl0IHNob3VsZCBleGlzdCwgYWRkIGFuICcpO1xuICAgICAgLy8gICB0aGlzLmEoeyBocmVmOiBlbmNvZGVkVVJJIH0sICdpc3N1ZSBvbiBHaXRIdWInKTtcbiAgICAgIC8vICAgdGhpcy50ZXh0KCcsIG9yIHNlbmQgeW91ciBvd24gcHVsbCByZXF1ZXN0LicpO1xuICAgICAgLy8gfSxcbiAgICAgIC8vICk7XG4gICAgfSk7XG4gICAgdGhpcy5oYW5kbGVFcnJvcihlcnIpO1xuICB9XG5cbiAgc2hvd1VuYWJsZVRvUnVuRXJyb3IoY29tbWFuZCkge1xuICAgIHRoaXMuYWRkKCQkKGZ1bmN0aW9uICgpIHtcbiAgICAgIHRoaXMuaDEoJ1VuYWJsZSB0byBydW4nKTtcbiAgICAgIHRoaXMucHJlKF8uZXNjYXBlKGNvbW1hbmQpKTtcbiAgICAgIHRoaXMuaDIoJ0RpZCB5b3Ugc3RhcnQgQXRvbSBmcm9tIHRoZSBjb21tYW5kIGxpbmU/Jyk7XG4gICAgICB0aGlzLnByZSgnICBhdG9tIC4nKTtcbiAgICAgIHRoaXMuaDIoJ0lzIGl0IGluIHlvdXIgUEFUSD8nKTtcbiAgICAgIHRoaXMucHJlKGBQQVRIOiAke18uZXNjYXBlKHByb2Nlc3MuZW52LlBBVEgpfWApO1xuICAgIH0pKTtcbiAgfVxuXG4gIHNob3dOb0xhbmd1YWdlU3BlY2lmaWVkKCkge1xuICAgIGNvbnN0IGVyciA9ICQkKGZ1bmN0aW9uICgpIHtcbiAgICAgIHRoaXMucCgnWW91IG11c3Qgc2VsZWN0IGEgbGFuZ3VhZ2UgaW4gdGhlIGxvd2VyIHJpZ2h0LCBvciBzYXZlIHRoZSBmaWxlIHdpdGggYW4gYXBwcm9wcmlhdGUgZXh0ZW5zaW9uLicpO1xuICAgIH0pO1xuICAgIHRoaXMuaGFuZGxlRXJyb3IoZXJyKTtcbiAgfVxuXG4gIHNob3dMYW5ndWFnZU5vdFN1cHBvcnRlZChsYW5nKSB7XG4gICAgY29uc3QgZXJyID0gJCQoZnVuY3Rpb24gKCkge1xuICAgICAgdGhpcy5wKHsgY2xhc3M6ICdibG9jaycgfSwgYENvbW1hbmQgbm90IGNvbmZpZ3VyZWQgZm9yICR7bGFuZ30hYCk7XG4gICAgICB0aGlzLnAoeyBjbGFzczogJ2Jsb2NrJyB9LCAoKSA9PiB7XG4gICAgICAgIHRoaXMudGV4dCgnQWRkIGFuICcpO1xuICAgICAgICB0aGlzLmEoeyBocmVmOiBgaHR0cHM6Ly9naXRodWIuY29tL2F0b20taWRlLWNvbW11bml0eS9hdG9tLXNjcmlwdC9pc3N1ZXMvbmV3P3RpdGxlPUFkZCUyMHN1cHBvcnQlMjBmb3IlMjAke2xhbmd9YCB9LCAnaXNzdWUgb24gR2l0SHViJyk7XG4gICAgICAgIHRoaXMudGV4dCgnIG9yIHNlbmQgeW91ciBvd24gUHVsbCBSZXF1ZXN0LicpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gICAgdGhpcy5oYW5kbGVFcnJvcihlcnIpO1xuICB9XG5cbiAgaGFuZGxlRXJyb3IoZXJyKSB7XG4gICAgLy8gRGlzcGxheSBlcnJvciBhbmQga2lsbCBwcm9jZXNzXG4gICAgdGhpcy5zZXRIZWFkZXJUaXRsZSgnRXJyb3InKTtcbiAgICB0aGlzLnNldEhlYWRlclN0YXR1cygnZXJyJyk7XG4gICAgdGhpcy5hZGQoZXJyKTtcbiAgICB0aGlzLnN0b3AoKTtcbiAgfVxuXG4gIHNldEhlYWRlclN0YXR1cyhzdGF0dXMpIHtcbiAgICB0aGlzLmhlYWRlclZpZXcuc2V0U3RhdHVzKHN0YXR1cyk7XG4gIH1cblxuICBzZXRIZWFkZXJUaXRsZSh0aXRsZSkge1xuICAgIHRoaXMuaGVhZGVyVmlldy50aXRsZS50ZXh0KHRpdGxlKTtcbiAgfVxuXG4gIGRpc3BsYXkoY3NzLCBsaW5lKSB7XG4gICAgaWYgKGF0b20uY29uZmlnLmdldCgnc2NyaXB0LmVzY2FwZUNvbnNvbGVPdXRwdXQnKSkge1xuICAgICAgbGluZSA9IF8uZXNjYXBlKGxpbmUpO1xuICAgIH1cblxuICAgIGxpbmUgPSB0aGlzLmFuc2lGaWx0ZXIudG9IdG1sKGxpbmUpO1xuICAgIGxpbmUgPSBsaW5rUGF0aHMobGluZSk7XG5cbiAgICBjb25zdCB7IGNsaWVudEhlaWdodCwgc2Nyb2xsVG9wLCBzY3JvbGxIZWlnaHQgfSA9IHRoaXMuYm9keVswXTtcbiAgICAvLyBpbmRpY2F0ZXMgdGhhdCB0aGUgcGFuZWwgaXMgc2Nyb2xsZWQgdG8gdGhlIGJvdHRvbSwgdGh1cyB3ZSBrbm93IHRoYXRcbiAgICAvLyB3ZSBhcmUgbm90IGludGVyZmVyaW5nIHdpdGggdGhlIHVzZXIncyBtYW51YWwgc2Nyb2xsaW5nXG4gICAgY29uc3QgYXRFbmQgPSBzY3JvbGxUb3AgPj0gKHNjcm9sbEhlaWdodCAtIGNsaWVudEhlaWdodCk7XG5cbiAgICB0aGlzLmFkZCgkJChmdW5jdGlvbiAoKSB7XG4gICAgICB0aGlzLnByZSh7IGNsYXNzOiBgbGluZSAke2Nzc31gIH0sICgpID0+IHRoaXMucmF3KGxpbmUpKTtcbiAgICB9KSk7XG5cbiAgICBpZiAoYXRvbS5jb25maWcuZ2V0KCdzY3JpcHQuc2Nyb2xsV2l0aE91dHB1dCcpICYmIGF0RW5kKSB7XG4gICAgICAvLyBTY3JvbGwgZG93biBpbiBhIHBvbGxpbmcgbG9vcCAnY2F1c2VcbiAgICAgIC8vIHdlIGRvbid0IGtub3cgd2hlbiB0aGUgcmVmbG93IHdpbGwgZmluaXNoLlxuICAgICAgLy8gU2VlOiBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vcS81MDE3OTIzLzQwNzg0NVxuICAgICAgdGhpcy5jaGVja1Njcm9sbEFnYWluKDUpKCk7XG4gICAgfVxuICB9XG5cbiAgY2hlY2tTY3JvbGxBZ2Fpbih0aW1lcykge1xuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICB0aGlzLmJvZHkuc2Nyb2xsVG9Cb3R0b20oKTtcblxuICAgICAgY2xlYXJUaW1lb3V0KHRoaXMuc2Nyb2xsVGltZW91dCk7XG4gICAgICBpZiAodGltZXMgPiAxKSB7XG4gICAgICAgIHRoaXMuc2Nyb2xsVGltZW91dCA9IHNldFRpbWVvdXQodGhpcy5jaGVja1Njcm9sbEFnYWluKHRpbWVzIC0gMSksIDUwKTtcbiAgICAgIH1cbiAgICB9O1xuICB9XG5cbiAgY29weVJlc3VsdHMoKSB7XG4gICAgaWYgKHRoaXMucmVzdWx0cykge1xuICAgICAgYXRvbS5jbGlwYm9hcmQud3JpdGUoc3RyaXBBbnNpKHRoaXMucmVzdWx0cykpO1xuICAgIH1cbiAgfVxufVxuIl19