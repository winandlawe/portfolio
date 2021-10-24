Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x2, _x3, _x4) { var _again = true; _function: while (_again) { var object = _x2, property = _x3, receiver = _x4; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x2 = parent; _x3 = property; _x4 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/* eslint-disable func-names */

var _atomSpacePenViews = require('atom-space-pen-views');

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
      var icon = (0, _atomSpacePenViews.$$)(function () {
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
      var title = 'Add ' + argType + ' support for ' + lang;
      var body = '##### Platform: `' + process.platform + '`\n---\n';
      var encodedURI = encodeURI('https://github.com/rgbkrk/atom-script/issues/new?title=' + title + '&body=' + body);
      // NOTE: Replace "#" after regular encoding so we don't double escape it.
      encodedURI = encodedURI.replace(/#/g, '%23');

      var err = (0, _atomSpacePenViews.$$)(function () {
        var _this = this;

        this.p({ 'class': 'block' }, argType + ' runner not available for ' + lang + '.');
        this.p({ 'class': 'block' }, function () {
          _this.text('If it should exist, add an ');
          _this.a({ href: encodedURI }, 'issue on GitHub');
          _this.text(', or send your own pull request.');
        });
      });
      this.handleError(err);
    }
  }, {
    key: 'showUnableToRunError',
    value: function showUnableToRunError(command) {
      this.add((0, _atomSpacePenViews.$$)(function () {
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
      var err = (0, _atomSpacePenViews.$$)(function () {
        this.p('You must select a language in the lower right, or save the file with an appropriate extension.');
      });
      this.handleError(err);
    }
  }, {
    key: 'showLanguageNotSupported',
    value: function showLanguageNotSupported(lang) {
      var err = (0, _atomSpacePenViews.$$)(function () {
        var _this2 = this;

        this.p({ 'class': 'block' }, 'Command not configured for ' + lang + '!');
        this.p({ 'class': 'block' }, function () {
          _this2.text('Add an ');
          _this2.a({ href: 'https://github.com/rgbkrk/atom-script/issues/new?title=Add%20support%20for%20' + lang }, 'issue on GitHub');
          _this2.text(' or send your own Pull Request.');
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

      this.add((0, _atomSpacePenViews.$$)(function () {
        var _this3 = this;

        this.pre({ 'class': 'line ' + css }, function () {
          return _this3.raw(line);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZpbGU6Ly8vQzovVXNlcnMvY2tuanUvLmF0b20vcGFja2FnZXMvc2NyaXB0L2xpYi9zY3JpcHQtdmlldy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O2lDQUdtQixzQkFBc0I7O2dDQUNSLG9CQUFvQjs7MEJBQ3ZDLFlBQVk7Ozs7MEJBQ0gsY0FBYzs7Ozt5QkFDZixZQUFZOzs7OzBCQUVYLGVBQWU7Ozs7eUJBQ2hCLGNBQWM7Ozs7O0FBVnBDLFdBQVcsQ0FBQztJQWFTLFVBQVU7WUFBVixVQUFVOztBQUNsQixXQURRLFVBQVUsR0FDZjswQkFESyxVQUFVOztBQUUzQixRQUFNLFVBQVUsR0FBRyw2QkFBZ0IsQ0FBQztBQUNwQywrQkFIaUIsVUFBVSw2Q0FHckIsRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLFNBQVMsRUFBRSxFQUFFOztBQUVyRSxRQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQztBQUMxQixRQUFJLENBQUMsVUFBVSxHQUFHLDZCQUFnQixDQUFDO0FBQ25DLFFBQUksQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDOztBQUU3QixRQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQzNDLFFBQUksQ0FBQyw2QkFBNkIsR0FBRyxJQUFJLENBQUMsNkJBQTZCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ25GLFFBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLENBQUM7QUFDN0IsUUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7O0FBRXhCLDJCQUFVLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7R0FDN0I7O2VBZmtCLFVBQVU7O1dBaUJiLDRCQUFHO0FBQ2pCLFVBQU0sSUFBSSxHQUFHLDJCQUFHLFlBQVk7QUFDMUIsWUFBSSxDQUFDLEdBQUcsQ0FBQztB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Q0FBQyxPQUFPLEVBQUU7QUFDaEIsWUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsNEJBQVUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7T0FDL0M7S0FDRjs7O1NBdE1rQixVQUFVOzs7cUJBQVYsVUFBVSIsImZpbGUiOiJmaWxlOi8vL0M6L1VzZXJzL2Nrbmp1Ly5hdG9tL3BhY2thZ2VzL3NjcmlwdC9saWIvc2NyaXB0LXZpZXcuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIGJhYmVsJztcblxuLyogZXNsaW50LWRpc2FibGUgZnVuYy1uYW1lcyAqL1xuaW1wb3J0IHsgJCQgfSBmcm9tICdhdG9tLXNwYWNlLXBlbi12aWV3cyc7XG5pbXBvcnQgeyBNZXNzYWdlUGFuZWxWaWV3IH0gZnJvbSAnYXRvbS1tZXNzYWdlLXBhbmVsJztcbmltcG9ydCBfIGZyb20gJ3VuZGVyc2NvcmUnO1xuaW1wb3J0IEFuc2lGaWx0ZXIgZnJvbSAnYW5zaS10by1odG1sJztcbmltcG9ydCBzdHJpcEFuc2kgZnJvbSAnc3RyaXAtYW5zaSc7XG5cbmltcG9ydCBIZWFkZXJWaWV3IGZyb20gJy4vaGVhZGVyLXZpZXcnO1xuaW1wb3J0IGxpbmtQYXRocyBmcm9tICcuL2xpbmstcGF0aHMnO1xuXG4vLyBSdW5zIGEgcG9ydGlvbiBvZiBhIHNjcmlwdCB0aHJvdWdoIGFuIGludGVycHJldGVyIGFuZCBkaXNwbGF5cyBpdCBsaW5lIGJ5IGxpbmVcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNjcmlwdFZpZXcgZXh0ZW5kcyBNZXNzYWdlUGFuZWxWaWV3IHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgY29uc3QgaGVhZGVyVmlldyA9IG5ldyBIZWFkZXJWaWV3KCk7XG4gICAgc3VwZXIoeyB0aXRsZTogaGVhZGVyVmlldywgcmF3VGl0bGU6IHRydWUsIGNsb3NlTWV0aG9kOiAnZGVzdHJveScgfSk7XG5cbiAgICB0aGlzLnNjcm9sbFRpbWVvdXQgPSBudWxsO1xuICAgIHRoaXMuYW5zaUZpbHRlciA9IG5ldyBBbnNpRmlsdGVyKCk7XG4gICAgdGhpcy5oZWFkZXJWaWV3ID0gaGVhZGVyVmlldztcblxuICAgIHRoaXMuc2hvd0luVGFiID0gdGhpcy5zaG93SW5UYWIuYmluZCh0aGlzKTtcbiAgICB0aGlzLnNldEhlYWRlckFuZFNob3dFeGVjdXRpb25UaW1lID0gdGhpcy5zZXRIZWFkZXJBbmRTaG93RXhlY3V0aW9uVGltZS5iaW5kKHRoaXMpO1xuICAgIHRoaXMuYWRkQ2xhc3MoJ3NjcmlwdC12aWV3Jyk7XG4gICAgdGhpcy5hZGRTaG93SW5UYWJJY29uKCk7XG5cbiAgICBsaW5rUGF0aHMubGlzdGVuKHRoaXMuYm9keSk7XG4gIH1cblxuICBhZGRTaG93SW5UYWJJY29uKCkge1xuICAgIGNvbnN0IGljb24gPSAkJChmdW5jdGlvbiAoKSB7XG4gICAgICB0aGlzLmRpdih7XG4gICAgICAgIGNsYXNzOiAnaGVhZGluZy1zaG93LWluLXRhYiBpbmxpbmUtYmxvY2sgaWNvbi1maWxlLXRleHQnLFxuICAgICAgICBzdHlsZTogJ2N1cnNvcjogcG9pbnRlcjsnLFxuICAgICAgICBvdXRsZXQ6ICdidG5TaG93SW5UYWInLFxuICAgICAgICB0aXRsZTogJ1Nob3cgb3V0cHV0IGluIG5ldyB0YWInLFxuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBpY29uLmNsaWNrKHRoaXMuc2hvd0luVGFiKTtcbiAgICBpY29uLmluc2VydEJlZm9yZSh0aGlzLmJ0bkF1dG9TY3JvbGwpO1xuICB9XG5cbiAgc2hvd0luVGFiKCkge1xuICAgIC8vIGNvbmNhdCBvdXRwdXRcbiAgICBsZXQgb3V0cHV0ID0gJyc7XG4gICAgZm9yIChjb25zdCBtZXNzYWdlIG9mIHRoaXMubWVzc2FnZXMpIHsgb3V0cHV0ICs9IG1lc3NhZ2UudGV4dCgpOyB9XG5cbiAgICAvLyByZXByZXNlbnQgY29tbWFuZCBjb250ZXh0XG4gICAgbGV0IGNvbnRleHQgPSAnJztcbiAgICBpZiAodGhpcy5jb21tYW5kQ29udGV4dCkge1xuICAgICAgY29udGV4dCA9IGBbQ29tbWFuZDogJHt0aGlzLmNvbW1hbmRDb250ZXh0LmdldFJlcHJlc2VudGF0aW9uKCl9XVxcbmA7XG4gICAgfVxuXG4gICAgLy8gb3BlbiBuZXcgdGFiIGFuZCBzZXQgY29udGVudCB0byBvdXRwdXRcbiAgICBhdG9tLndvcmtzcGFjZS5vcGVuKCkudGhlbihlZGl0b3IgPT4gZWRpdG9yLnNldFRleHQoc3RyaXBBbnNpKGNvbnRleHQgKyBvdXRwdXQpKSk7XG4gIH1cblxuICBzZXRIZWFkZXJBbmRTaG93RXhlY3V0aW9uVGltZShyZXR1cm5Db2RlLCBleGVjdXRpb25UaW1lKSB7XG4gICAgaWYgKGV4ZWN1dGlvblRpbWUpIHtcbiAgICAgIHRoaXMuZGlzcGxheSgnc3Rkb3V0JywgYFtGaW5pc2hlZCBpbiAke2V4ZWN1dGlvblRpbWUudG9TdHJpbmcoKX1zXWApO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmRpc3BsYXkoJ3N0ZG91dCcpO1xuICAgIH1cblxuICAgIGlmIChyZXR1cm5Db2RlID09PSAwKSB7XG4gICAgICB0aGlzLnNldEhlYWRlclN0YXR1cygnc3RvcCcpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnNldEhlYWRlclN0YXR1cygnZXJyJyk7XG4gICAgfVxuICB9XG5cbiAgcmVzZXRWaWV3KHRpdGxlID0gJ0xvYWRpbmcuLi4nKSB7XG4gICAgLy8gRGlzcGxheSB3aW5kb3cgYW5kIGxvYWQgbWVzc2FnZVxuXG4gICAgdGhpcy5hdHRhY2goKTtcblxuICAgIHRoaXMuc2V0SGVhZGVyVGl0bGUodGl0bGUpO1xuICAgIHRoaXMuc2V0SGVhZGVyU3RhdHVzKCdzdGFydCcpO1xuXG4gICAgLy8gR2V0IHNjcmlwdCB2aWV3IHJlYWR5XG4gICAgdGhpcy5jbGVhcigpO1xuICB9XG5cbiAgcmVtb3ZlUGFuZWwoKSB7XG4gICAgdGhpcy5zdG9wKCk7XG4gICAgdGhpcy5kZXRhY2goKTtcbiAgICAvLyB0aGUgJ2Nsb3NlJyBtZXRob2QgZnJvbSBNZXNzYWdlUGFuZWxWaWV3IGFjdHVhbGx5IGRlc3Ryb3lzIHRoZSBwYW5lbFxuICAgIE9iamVjdC5nZXRQcm90b3R5cGVPZihTY3JpcHRWaWV3LnByb3RvdHlwZSkuY2xvc2UuYXBwbHkodGhpcyk7XG4gIH1cblxuICAvLyBUaGlzIGlzIHRyaWdnZXJlZCB3aGVuIGhpdHRpbmcgdGhlICdjbG9zZScgYnV0dG9uIG9uIHRoZSBwYW5lbFxuICAvLyBXZSBhcmUgbm90IGFjdHVhbGx5IGNsb3NpbmcgdGhlIHBhbmVsIGhlcmUgc2luY2Ugd2Ugd2FudCB0byB0cmlnZ2VyXG4gIC8vICdzY3JpcHQ6Y2xvc2Utdmlldycgd2hpY2ggd2lsbCBldmVudHVhbGx5IHJlbW92ZSB0aGUgcGFuZWwgdmlhICdyZW1vdmVQYW5lbCdcbiAgY2xvc2UoKSB7XG4gICAgY29uc3Qgd29ya3NwYWNlVmlldyA9IGF0b20udmlld3MuZ2V0VmlldyhhdG9tLndvcmtzcGFjZSk7XG4gICAgYXRvbS5jb21tYW5kcy5kaXNwYXRjaCh3b3Jrc3BhY2VWaWV3LCAnc2NyaXB0OmNsb3NlLXZpZXcnKTtcbiAgfVxuXG4gIHN0b3AoKSB7XG4gICAgdGhpcy5kaXNwbGF5KCdzdGRvdXQnLCAnXkMnKTtcbiAgICB0aGlzLnNldEhlYWRlclN0YXR1cygna2lsbCcpO1xuICB9XG5cbiAgY3JlYXRlR2l0SHViSXNzdWVMaW5rKGFyZ1R5cGUsIGxhbmcpIHtcbiAgICBjb25zdCB0aXRsZSA9IGBBZGQgJHthcmdUeXBlfSBzdXBwb3J0IGZvciAke2xhbmd9YDtcbiAgICBjb25zdCBib2R5ID0gYCMjIyMjIFBsYXRmb3JtOiBcXGAke3Byb2Nlc3MucGxhdGZvcm19XFxgXFxuLS0tXFxuYDtcbiAgICBsZXQgZW5jb2RlZFVSSSA9IGVuY29kZVVSSShgaHR0cHM6Ly9naXRodWIuY29tL3JnYmtyay9hdG9tLXNjcmlwdC9pc3N1ZXMvbmV3P3RpdGxlPSR7dGl0bGV9JmJvZHk9JHtib2R5fWApO1xuICAgIC8vIE5PVEU6IFJlcGxhY2UgXCIjXCIgYWZ0ZXIgcmVndWxhciBlbmNvZGluZyBzbyB3ZSBkb24ndCBkb3VibGUgZXNjYXBlIGl0LlxuICAgIGVuY29kZWRVUkkgPSBlbmNvZGVkVVJJLnJlcGxhY2UoLyMvZywgJyUyMycpO1xuXG4gICAgY29uc3QgZXJyID0gJCQoZnVuY3Rpb24gKCkge1xuICAgICAgdGhpcy5wKHsgY2xhc3M6ICdibG9jaycgfSwgYCR7YXJnVHlwZX0gcnVubmVyIG5vdCBhdmFpbGFibGUgZm9yICR7bGFuZ30uYCk7XG4gICAgICB0aGlzLnAoeyBjbGFzczogJ2Jsb2NrJyB9LCAoKSA9PiB7XG4gICAgICAgIHRoaXMudGV4dCgnSWYgaXQgc2hvdWxkIGV4aXN0LCBhZGQgYW4gJyk7XG4gICAgICAgIHRoaXMuYSh7IGhyZWY6IGVuY29kZWRVUkkgfSwgJ2lzc3VlIG9uIEdpdEh1YicpO1xuICAgICAgICB0aGlzLnRleHQoJywgb3Igc2VuZCB5b3VyIG93biBwdWxsIHJlcXVlc3QuJyk7XG4gICAgICB9LFxuICAgICAgKTtcbiAgICB9KTtcbiAgICB0aGlzLmhhbmRsZUVycm9yKGVycik7XG4gIH1cblxuICBzaG93VW5hYmxlVG9SdW5FcnJvcihjb21tYW5kKSB7XG4gICAgdGhpcy5hZGQoJCQoZnVuY3Rpb24gKCkge1xuICAgICAgdGhpcy5oMSgnVW5hYmxlIHRvIHJ1bicpO1xuICAgICAgdGhpcy5wcmUoXy5lc2NhcGUoY29tbWFuZCkpO1xuICAgICAgdGhpcy5oMignRGlkIHlvdSBzdGFydCBBdG9tIGZyb20gdGhlIGNvbW1hbmQgbGluZT8nKTtcbiAgICAgIHRoaXMucHJlKCcgIGF0b20gLicpO1xuICAgICAgdGhpcy5oMignSXMgaXQgaW4geW91ciBQQVRIPycpO1xuICAgICAgdGhpcy5wcmUoYFBBVEg6ICR7Xy5lc2NhcGUocHJvY2Vzcy5lbnYuUEFUSCl9YCk7XG4gICAgfSksXG4gICAgKTtcbiAgfVxuXG4gIHNob3dOb0xhbmd1YWdlU3BlY2lmaWVkKCkge1xuICAgIGNvbnN0IGVyciA9ICQkKGZ1bmN0aW9uICgpIHtcbiAgICAgIHRoaXMucCgnWW91IG11c3Qgc2VsZWN0IGEgbGFuZ3VhZ2UgaW4gdGhlIGxvd2VyIHJpZ2h0LCBvciBzYXZlIHRoZSBmaWxlIHdpdGggYW4gYXBwcm9wcmlhdGUgZXh0ZW5zaW9uLicsXG4gICAgKTtcbiAgICB9KTtcbiAgICB0aGlzLmhhbmRsZUVycm9yKGVycik7XG4gIH1cblxuICBzaG93TGFuZ3VhZ2VOb3RTdXBwb3J0ZWQobGFuZykge1xuICAgIGNvbnN0IGVyciA9ICQkKGZ1bmN0aW9uICgpIHtcbiAgICAgIHRoaXMucCh7IGNsYXNzOiAnYmxvY2snIH0sIGBDb21tYW5kIG5vdCBjb25maWd1cmVkIGZvciAke2xhbmd9IWApO1xuICAgICAgdGhpcy5wKHsgY2xhc3M6ICdibG9jaycgfSwgKCkgPT4ge1xuICAgICAgICB0aGlzLnRleHQoJ0FkZCBhbiAnKTtcbiAgICAgICAgdGhpcy5hKHsgaHJlZjogYGh0dHBzOi8vZ2l0aHViLmNvbS9yZ2JrcmsvYXRvbS1zY3JpcHQvaXNzdWVzL25ldz90aXRsZT1BZGQlMjBzdXBwb3J0JTIwZm9yJTIwJHtsYW5nfWAgfSwgJ2lzc3VlIG9uIEdpdEh1YicpO1xuICAgICAgICB0aGlzLnRleHQoJyBvciBzZW5kIHlvdXIgb3duIFB1bGwgUmVxdWVzdC4nKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICAgIHRoaXMuaGFuZGxlRXJyb3IoZXJyKTtcbiAgfVxuXG4gIGhhbmRsZUVycm9yKGVycikge1xuICAgIC8vIERpc3BsYXkgZXJyb3IgYW5kIGtpbGwgcHJvY2Vzc1xuICAgIHRoaXMuc2V0SGVhZGVyVGl0bGUoJ0Vycm9yJyk7XG4gICAgdGhpcy5zZXRIZWFkZXJTdGF0dXMoJ2VycicpO1xuICAgIHRoaXMuYWRkKGVycik7XG4gICAgdGhpcy5zdG9wKCk7XG4gIH1cblxuICBzZXRIZWFkZXJTdGF0dXMoc3RhdHVzKSB7XG4gICAgdGhpcy5oZWFkZXJWaWV3LnNldFN0YXR1cyhzdGF0dXMpO1xuICB9XG5cbiAgc2V0SGVhZGVyVGl0bGUodGl0bGUpIHtcbiAgICB0aGlzLmhlYWRlclZpZXcudGl0bGUudGV4dCh0aXRsZSk7XG4gIH1cblxuICBkaXNwbGF5KGNzcywgbGluZSkge1xuICAgIGlmIChhdG9tLmNvbmZpZy5nZXQoJ3NjcmlwdC5lc2NhcGVDb25zb2xlT3V0cHV0JykpIHtcbiAgICAgIGxpbmUgPSBfLmVzY2FwZShsaW5lKTtcbiAgICB9XG5cbiAgICBsaW5lID0gdGhpcy5hbnNpRmlsdGVyLnRvSHRtbChsaW5lKTtcbiAgICBsaW5lID0gbGlua1BhdGhzKGxpbmUpO1xuXG4gICAgY29uc3QgeyBjbGllbnRIZWlnaHQsIHNjcm9sbFRvcCwgc2Nyb2xsSGVpZ2h0IH0gPSB0aGlzLmJvZHlbMF07XG4gICAgLy8gaW5kaWNhdGVzIHRoYXQgdGhlIHBhbmVsIGlzIHNjcm9sbGVkIHRvIHRoZSBib3R0b20sIHRodXMgd2Uga25vdyB0aGF0XG4gICAgLy8gd2UgYXJlIG5vdCBpbnRlcmZlcmluZyB3aXRoIHRoZSB1c2VyJ3MgbWFudWFsIHNjcm9sbGluZ1xuICAgIGNvbnN0IGF0RW5kID0gc2Nyb2xsVG9wID49IChzY3JvbGxIZWlnaHQgLSBjbGllbnRIZWlnaHQpO1xuXG4gICAgdGhpcy5hZGQoJCQoZnVuY3Rpb24gKCkge1xuICAgICAgdGhpcy5wcmUoeyBjbGFzczogYGxpbmUgJHtjc3N9YCB9LCAoKSA9PiB0aGlzLnJhdyhsaW5lKSk7XG4gICAgfSkpO1xuXG4gICAgaWYgKGF0b20uY29uZmlnLmdldCgnc2NyaXB0LnNjcm9sbFdpdGhPdXRwdXQnKSAmJiBhdEVuZCkge1xuICAgICAgLy8gU2Nyb2xsIGRvd24gaW4gYSBwb2xsaW5nIGxvb3AgJ2NhdXNlXG4gICAgICAvLyB3ZSBkb24ndCBrbm93IHdoZW4gdGhlIHJlZmxvdyB3aWxsIGZpbmlzaC5cbiAgICAgIC8vIFNlZTogaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL3EvNTAxNzkyMy80MDc4NDVcbiAgICAgIHRoaXMuY2hlY2tTY3JvbGxBZ2Fpbig1KSgpO1xuICAgIH1cbiAgfVxuICBjaGVja1Njcm9sbEFnYWluKHRpbWVzKSB7XG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIHRoaXMuYm9keS5zY3JvbGxUb0JvdHRvbSgpO1xuXG4gICAgICBjbGVhclRpbWVvdXQodGhpcy5zY3JvbGxUaW1lb3V0KTtcbiAgICAgIGlmICh0aW1lcyA+IDEpIHtcbiAgICAgICAgdGhpcy5zY3JvbGxUaW1lb3V0ID0gc2V0VGltZW91dCh0aGlzLmNoZWNrU2Nyb2xsQWdhaW4odGltZXMgLSAxKSwgNTApO1xuICAgICAgfVxuICAgIH07XG4gIH1cblxuICBjb3B5UmVzdWx0cygpIHtcbiAgICBpZiAodGhpcy5yZXN1bHRzKSB7XG4gICAgICBhdG9tLmNsaXBib2FyZC53cml0ZShzdHJpcEFuc2kodGhpcy5yZXN1bHRzKSk7XG4gICAgfVxuICB9XG59XG4iXX0=