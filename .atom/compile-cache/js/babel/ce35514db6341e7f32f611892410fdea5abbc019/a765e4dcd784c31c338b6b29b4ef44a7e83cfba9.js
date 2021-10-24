Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _url = require('url');

var _url2 = _interopRequireDefault(_url);

var _atom = require('atom');

var _electron = require('electron');

var _json5 = require('json5');

var _json52 = _interopRequireDefault(_json5);

var _stripAnsi = require('strip-ansi');

var _stripAnsi2 = _interopRequireDefault(_stripAnsi);

'use babel';

var packagePath = atom.packages.resolvePackagePath('atom-live-server');
var liveServer = _path2['default'].join(packagePath, '/node_modules/live-server/live-server.js');

var serverProcess = undefined;
var disposeMenu = undefined;
var noBrowser = undefined;
var console = global.console;

function addStartMenu() {
  disposeMenu = atom.menu.add([{
    label: 'Packages',
    submenu: [{
      label: 'atom-live-server',
      submenu: [{
        label: 'Start server',
        command: 'atom-live-server:startServer'
      }]
    }]
  }]);
}

function usingDefaultConsole() {
  return console == global.console;
}

function safeStatus(status) {
  if (!usingDefaultConsole()) console.setStatus(status);
}

exports['default'] = {
  subscriptions: null,

  activate: function activate(state) {
    var _this = this;

    this.subscriptions = new _atom.CompositeDisposable();

    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'atom-live-server:start-3000': function atomLiveServerStart3000() {
        return _this.startServer(3000);
      },
      'atom-live-server:start-4000': function atomLiveServerStart4000() {
        return _this.startServer(4000);
      },
      'atom-live-server:start-5000': function atomLiveServerStart5000() {
        return _this.startServer(5000);
      },
      'atom-live-server:start-8000': function atomLiveServerStart8000() {
        return _this.startServer(8000);
      },
      'atom-live-server:start-9000': function atomLiveServerStart9000() {
        return _this.startServer(9000);
      },
      'atom-live-server:startServer': function atomLiveServerStartServer() {
        return _this.startServer();
      },
      'atom-live-server:stopServer': function atomLiveServerStopServer() {
        return _this.stopServer();
      }
    }));

    addStartMenu();
  },

  deactivate: function deactivate() {
    this.stopServer();
    console.dispose();
    this.subscriptions.dispose();
  },

  consumeConsole: function consumeConsole(createConsole) {
    var mod = this;
    console = createConsole({
      id: 'atom-live-server',
      name: 'Live Server',
      start: function start() {
        mod.startServer();
      },
      stop: function stop() {
        mod.stopServer();
      }
    });
    return new _atom.Disposable(function () {
      console = null;
    });
  },

  startServer: function startServer() {
    var _this2 = this;

    var port = arguments.length <= 0 || arguments[0] === undefined ? 3000 : arguments[0];

    if (serverProcess) {
      return;
    }

    safeStatus('starting');

    var targetPath = atom.project.getPaths()[0];

    if (!targetPath) {
      atom.notifications.addWarning('[Live Server] You haven\'t opened a Project, you must open one.');
      return;
    }

    noBrowser = false;
    var args = [];
    var stdout = function stdout(output) {
      var strippedOutput = (0, _stripAnsi2['default'])(output);

      if (strippedOutput.indexOf('Serving ') === 0) {
        var serverUrl = strippedOutput.split(' at ')[1];
        var _port = _url2['default'].parse(serverUrl).port;
        var disposeStartMenu = disposeMenu;
        disposeMenu = atom.menu.add([{
          label: 'Packages',
          submenu: [{
            label: 'atom-live-server',
            submenu: [{
              label: strippedOutput.replace('Serving ', 'Stop ').replace(/\r?\n|\r/g, ''),
              command: 'atom-live-server:stopServer'
            }]
          }]
        }]);

        disposeStartMenu.dispose();
        safeStatus('running');

        if (noBrowser) {
          atom.notifications.addSuccess('[Live Server] Live server started at ' + serverUrl + '.');
        }
      }

      if (usingDefaultConsole()) {
        console.log('[Live Server] ' + strippedOutput);
      } else {
        console.append({ text: '[Live Server] ' + output, level: 'log', format: 'ansi' });
      }
    };

    var exit = function exit(code) {
      console.info('[Live Server] Exited with code ' + code);
      _this2.stopServer();
    };

    _fs2['default'].open(_path2['default'].join(targetPath, '.atom-live-server.json'), 'r', function (err, fd) {
      if (!err) {
        (function () {
          var userConfig = _json52['default'].parse(_fs2['default'].readFileSync(fd, 'utf8'));

          Object.keys(userConfig).forEach(function (key) {
            if (key === 'no-browser') {
              if (userConfig[key] === true) {
                args.push('--' + key);
                noBrowser = true;
              }
            } else if (key === 'root') {
              args.unshift('' + userConfig[key]);
            } else {
              args.push('--' + key + '=' + userConfig[key]);
            }
          });
        })();
      }

      if (!args.length) {
        args.push('--port=' + port);
      }

      serverProcess = new _atom.BufferedNodeProcess({
        command: liveServer,
        args: args,
        stdout: stdout,
        exit: exit,
        options: {
          cwd: targetPath
        }
      });

      console.info('[Live Server] live-server ' + args.join(' '));
    });
  },

  stopServer: function stopServer() {
    try {
      serverProcess.kill();
    } catch (e) {
      console.error(e);
    }

    serverProcess = null;
    var disposeStopMenu = disposeMenu;
    addStartMenu();
    disposeStopMenu && disposeStopMenu.dispose();
    atom.notifications.addSuccess('[Live Server] Live server is stopped.');
    console.info('[Live Server] Live server is stopped.');
    safeStatus('stopped');
  }
};
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZpbGU6Ly8vQzovVXNlcnMvY2tuanUvLmF0b20vcGFja2FnZXMvYXRvbS1saXZlLXNlcnZlci9saWIvYXRvbS1saXZlLXNlcnZlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7b0JBRWlCLE1BQU07Ozs7a0JBQ1IsSUFBSTs7OzttQkFDSCxLQUFLOzs7O29CQUNnRCxNQUFNOzt3QkFDcEQsVUFBVTs7cUJBQ2YsT0FBTzs7Ozt5QkFDSCxZQUFZOzs7O0FBUmxDLFdBQVcsQ0FBQzs7QUFVWixJQUFNLFdBQVcsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLGtCQUFrQixDQUFDLGtCQUFrQixDQUFDLENBQUM7QUFDekUsSUFBTSxVQUFVLEdBQUcsa0JBQUssSUFBSSxDQUFDLFdBQVcsRUFBRSwwQ0FBMEMsQ0FBQyxDQUFDOztBQUV0RixJQUFJLGFBQWEsWUFBQSxDQUFDO0FBQ2xCLElBQUksV0FBVyxZQUFBLENBQUM7QUFDaEIsSUFBSSxTQUFTLFlBQUEsQ0FBQztBQUNkLElBQUksT0FBTyxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUM7O0FBRTdCLFNBQVMsWUFBWSxHQUFHO0FBQ3RCLGFBQVcsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FDekIsQ0FBQztBQUNDLFNBQUssRUFBRSxVQUFVO0FBQ2pCLFdBQU8sRUFBRyxDQUFDO0FBQ1QsV0FBSyxFQUFFLGtCQUFrQjtBQUN6QixhQUFPLEVBQUcsQ0FBQztBQUNULGFBQUssRUFBRSxjQUFjO0FBQ3JCLGVBQU8sZ0NBQWdDO09BQ3hDLENBQUM7S0FDSCxDQUFDO0dBQ0gsQ0FBQyxDQUNILENBQUM7Q0FDSDs7QUFFRCxTQUFTLG1CQUFtQixHQUFHO0FBQzdCLFNBQU8sT0FBTyxJQUFJLE1BQU0sQ0FBQyxPQUFPLENBQUM7Q0FDbEM7O0FBRUQsU0FBUyxVQUFVLENBQUMsTUFBTSxFQUFFO0FBQzFCLE1BQUcsQ0FBQyxtQkFBbUIsRUFBRSxFQUFFLE9BQU8sQ0FBQyxTQUFTLENBQUMsTUFB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QUFDckIsUUFBTSxlQUFlLEdBQUcsV0FBVyxDQUFDO0FBQ3BDLGdCQUFZLEVBQUUsQ0FBQztBQUNmLG1CQUFlLElBQUksZUFBZSxDQUFDLE9BQU8sRUFBRSxDQUFDO0FBQzdDLFFBQUksQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDLHVDQUF1QyxDQUFDLENBQUM7QUFDdkUsV0FBTyxDQUFDLElBQUksQ0FBQyx1Q0FBdUMsQ0FBQyxDQUFBO0FBQ3JELGNBQVUsQ0FBQyxTQUFTLENBQUMsQ0FBQztHQUN2QjtDQUNGIiwiZmlsZSI6ImZpbGU6Ly8vQzovVXNlcnMvY2tuanUvLmF0b20vcGFja2FnZXMvYXRvbS1saXZlLXNlcnZlci9saWIvYXRvbS1saXZlLXNlcnZlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2UgYmFiZWwnO1xuXG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJztcbmltcG9ydCBmcyBmcm9tICdmcyc7XG5pbXBvcnQgdXJsIGZyb20gJ3VybCc7XG5pbXBvcnQgeyBCdWZmZXJlZE5vZGVQcm9jZXNzLCBDb21wb3NpdGVEaXNwb3NhYmxlLCBEaXNwb3NhYmxlIH0gZnJvbSAnYXRvbSc7XG5pbXBvcnQgeyByZW1vdGUgfSBmcm9tICdlbGVjdHJvbic7XG5pbXBvcnQgSlNPTjUgZnJvbSAnanNvbjUnO1xuaW1wb3J0IHN0cmlwQW5zaSBmcm9tICdzdHJpcC1hbnNpJztcblxuY29uc3QgcGFja2FnZVBhdGggPSBhdG9tLnBhY2thZ2VzLnJlc29sdmVQYWNrYWdlUGF0aCgnYXRvbS1saXZlLXNlcnZlcicpO1xuY29uc3QgbGl2ZVNlcnZlciA9IHBhdGguam9pbihwYWNrYWdlUGF0aCwgJy9ub2RlX21vZHVsZXMvbGl2ZS1zZXJ2ZXIvbGl2ZS1zZXJ2ZXIuanMnKTtcblxubGV0IHNlcnZlclByb2Nlc3M7XG5sZXQgZGlzcG9zZU1lbnU7XG5sZXQgbm9Ccm93c2VyO1xubGV0IGNvbnNvbGUgPSBnbG9iYWwuY29uc29sZTtcblxuZnVuY3Rpb24gYWRkU3RhcnRNZW51KCkge1xuICBkaXNwb3NlTWVudSA9IGF0b20ubWVudS5hZGQoXG4gICAgW3tcbiAgICAgIGxhYmVsOiAnUGFja2FnZXMnLFxuICAgICAgc3VibWVudSA6IFt7XG4gICAgICAgIGxhYmVsOiAnYXRvbS1saXZlLXNlcnZlcicsXG4gICAgICAgIHN1Ym1lbnUgOiBbe1xuICAgICAgICAgIGxhYmVsOiAnU3RhcnQgc2VydmVyJyxcbiAgICAgICAgICBjb21tYW5kOiBgYXRvbS1saXZlLXNlcnZlcjpzdGFydFNlcnZlcmBcbiAgICAgICAgfV1cbiAgICAgIH1dXG4gICAgfV1cbiAgKTtcbn1cblxuZnVuY3Rpb24gdXNpbmdEZWZhdWx0Q29uc29sZSgpIHtcbiAgcmV0dXJuIGNvbnNvbGUgPT0gZ2xvYmFsLmNvbnNvbGU7XG59XG5cbmZ1bmN0aW9uIHNhZmVTdGF0dXMoc3RhdHVzKSB7XG4gIGlmKCF1c2luZ0RlZmF1bHRDb25zb2xlKCkpIGNvbnNvbGUuc2V0U3RhdHVzKHN0YXR1cyk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgc3Vic2NyaXB0aW9uczogbnVsbCxcblxuICBhY3RpdmF0ZShzdGF0ZSkge1xuICAgIHRoaXMuc3Vic2NyaXB0aW9ucyA9IG5ldyBDb21wb3NpdGVEaXNwb3NhYmxlKCk7XG5cbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMuYWRkKGF0b20uY29tbWFuZHMuYWRkKCdhdG9tLXdvcmtzcGFjZScsIHtcbiAgICAgICdhdG9tLWxpdmUtc2VydmVyOnN0YXJ0LTMwMDAnOiAoKSA9PiB0aGlzLnN0YXJ0U2VydmVyKDMwMDApLFxuICAgICAgJ2F0b20tbGl2ZS1zZXJ2ZXI6c3RhcnQtNDAwMCc6ICgpID0+IHRoaXMuc3RhcnRTZXJ2ZXIoNDAwMCksXG4gICAgICAnYXRvbS1saXZlLXNlcnZlcjpzdGFydC01MDAwJzogKCkgPT4gdGhpcy5zdGFydFNlcnZlcig1MDAwKSxcbiAgICAgICdhdG9tLWxpdmUtc2VydmVyOnN0YXJ0LTgwMDAnOiAoKSA9PiB0aGlzLnN0YXJ0U2VydmVyKDgwMDApLFxuICAgICAgJ2F0b20tbGl2ZS1zZXJ2ZXI6c3RhcnQtOTAwMCc6ICgpID0+IHRoaXMuc3RhcnRTZXJ2ZXIoOTAwMCksXG4gICAgICAnYXRvbS1saXZlLXNlcnZlcjpzdGFydFNlcnZlcic6ICgpID0+IHRoaXMuc3RhcnRTZXJ2ZXIoKSxcbiAgICAgICdhdG9tLWxpdmUtc2VydmVyOnN0b3BTZXJ2ZXInOiAoKSA9PiB0aGlzLnN0b3BTZXJ2ZXIoKVxuICAgIH0pKTtcblxuICAgIGFkZFN0YXJ0TWVudSgpO1xuICB9LFxuXG4gIGRlYWN0aXZhdGUoKSB7XG4gICAgdGhpcy5zdG9wU2VydmVyKCk7XG4gICAgY29uc29sZS5kaXNwb3NlKCk7XG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLmRpc3Bvc2UoKTtcbiAgfSxcblxuICBjb25zdW1lQ29uc29sZShjcmVhdGVDb25zb2xlKSB7XG4gICAgbGV0IG1vZCA9IHRoaXM7XG4gICAgY29uc29sZSA9IGNyZWF0ZUNvbnNvbGUoe1xuICAgICAgaWQ6ICdhdG9tLWxpdmUtc2VydmVyJyxcbiAgICAgIG5hbWU6ICdMaXZlIFNlcnZlcicsXG4gICAgICBzdGFydCgpIHsgbW9kLnN0YXJ0U2VydmVyKCk7IH0sXG4gICAgICBzdG9wKCkgeyBtb2Quc3RvcFNlcnZlcigpOyB9XG4gICAgfSk7XG4gICAgcmV0dXJuIG5ldyBEaXNwb3NhYmxlKCgpID0+IHsgY29uc29sZSA9IG51bGw7IH0pO1xuICB9LFxuXG4gIHN0YXJ0U2VydmVyKHBvcnQgPSAzMDAwKSB7XG4gICAgaWYgKHNlcnZlclByb2Nlc3MpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBzYWZlU3RhdHVzKCdzdGFydGluZycpO1xuXG4gICAgY29uc3QgdGFyZ2V0UGF0aCA9IGF0b20ucHJvamVjdC5nZXRQYXRocygpWzBdO1xuXG4gICAgaWYgKCF0YXJnZXRQYXRoKSB7XG4gICAgICBhdG9tLm5vdGlmaWNhdGlvbnMuYWRkV2FybmluZygnW0xpdmUgU2VydmVyXSBZb3UgaGF2ZW5cXCd0IG9wZW5lZCBhIFByb2plY3QsIHlvdSBtdXN0IG9wZW4gb25lLicpXG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgbm9Ccm93c2VyID0gZmFsc2U7XG4gICAgY29uc3QgYXJncyA9IFtdO1xuICAgIGNvbnN0IHN0ZG91dCA9IG91dHB1dCA9PiB7XG4gICAgICBjb25zdCBzdHJpcHBlZE91dHB1dCA9IHN0cmlwQW5zaShvdXRwdXQpO1xuXG4gICAgICBpZiAoc3RyaXBwZWRPdXRwdXQuaW5kZXhPZignU2VydmluZyAnKSA9PT0gMCkge1xuICAgICAgICBjb25zdCBzZXJ2ZXJVcmwgPSBzdHJpcHBlZE91dHB1dC5zcGxpdCgnIGF0ICcpWzFdO1xuICAgICAgICBjb25zdCBwb3J0ID0gdXJsLnBhcnNlKHNlcnZlclVybCkucG9ydDtcbiAgICAgICAgY29uc3QgZGlzcG9zZVN0YXJ0TWVudSA9IGRpc3Bvc2VNZW51O1xuICAgICAgICBkaXNwb3NlTWVudSA9IGF0b20ubWVudS5hZGQoXG4gICAgICAgICAgW3tcbiAgICAgICAgICAgIGxhYmVsOiAnUGFja2FnZXMnLFxuICAgICAgICAgICAgc3VibWVudSA6IFt7XG4gICAgICAgICAgICAgIGxhYmVsOiAnYXRvbS1saXZlLXNlcnZlcicsXG4gICAgICAgICAgICAgIHN1Ym1lbnUgOiBbe1xuICAgICAgICAgICAgICAgIGxhYmVsOiBzdHJpcHBlZE91dHB1dC5yZXBsYWNlKCdTZXJ2aW5nICcsICdTdG9wICcpLnJlcGxhY2UoL1xccj9cXG58XFxyL2csICcnKSxcbiAgICAgICAgICAgICAgICBjb21tYW5kOiBgYXRvbS1saXZlLXNlcnZlcjpzdG9wU2VydmVyYFxuICAgICAgICAgICAgICB9XVxuICAgICAgICAgICAgfV1cbiAgICAgICAgICB9XVxuICAgICAgICApO1xuXG4gICAgICAgIGRpc3Bvc2VTdGFydE1lbnUuZGlzcG9zZSgpO1xuICAgICAgICBzYWZlU3RhdHVzKCdydW5uaW5nJyk7XG5cbiAgICAgICAgaWYgKG5vQnJvd3Nlcikge1xuICAgICAgICAgIGF0b20ubm90aWZpY2F0aW9ucy5hZGRTdWNjZXNzKGBbTGl2ZSBTZXJ2ZXJdIExpdmUgc2VydmVyIHN0YXJ0ZWQgYXQgJHtzZXJ2ZXJVcmx9LmApO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmICh1c2luZ0RlZmF1bHRDb25zb2xlKCkpIHtcbiAgICAgICAgY29uc29sZS5sb2coYFtMaXZlIFNlcnZlcl0gJHtzdHJpcHBlZE91dHB1dH1gKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnNvbGUuYXBwZW5kKHt0ZXh0OiBgW0xpdmUgU2VydmVyXSAke291dHB1dH1gLCBsZXZlbDogJ2xvZycsIGZvcm1hdDogJ2Fuc2knfSk7XG4gICAgICB9XG5cbiAgICB9O1xuXG4gICAgY29uc3QgZXhpdCA9IGNvZGUgPT4ge1xuICAgICAgY29uc29sZS5pbmZvKGBbTGl2ZSBTZXJ2ZXJdIEV4aXRlZCB3aXRoIGNvZGUgJHtjb2RlfWApO1xuICAgICAgdGhpcy5zdG9wU2VydmVyKCk7XG4gICAgfVxuXG4gICAgZnMub3BlbihwYXRoLmpvaW4odGFyZ2V0UGF0aCwgJy5hdG9tLWxpdmUtc2VydmVyLmpzb24nKSwgJ3InLCAoZXJyLCBmZCkgPT4ge1xuICAgICAgaWYgKCFlcnIpIHtcbiAgICAgICAgY29uc3QgdXNlckNvbmZpZyA9IEpTT041LnBhcnNlKGZzLnJlYWRGaWxlU3luYyhmZCwgJ3V0ZjgnKSk7XG5cbiAgICAgICAgT2JqZWN0LmtleXModXNlckNvbmZpZykuZm9yRWFjaChrZXkgPT4ge1xuICAgICAgICAgIGlmIChrZXkgPT09ICduby1icm93c2VyJykge1xuICAgICAgICAgICAgaWYgKHVzZXJDb25maWdba2V5XSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICBhcmdzLnB1c2goYC0tJHtrZXl9YCk7XG4gICAgICAgICAgICAgIG5vQnJvd3NlciA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGVsc2UgaWYgKGtleSA9PT0gJ3Jvb3QnKSB7XG4gICAgICAgICAgICAgIGFyZ3MudW5zaGlmdChgJHt1c2VyQ29uZmlnW2tleV19YClcbiAgICAgICAgICAgIH1cbiAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgYXJncy5wdXNoKGAtLSR7a2V5fT0ke3VzZXJDb25maWdba2V5XX1gKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICBpZiAoIWFyZ3MubGVuZ3RoKSB7XG4gICAgICAgIGFyZ3MucHVzaChgLS1wb3J0PSR7cG9ydH1gKTtcbiAgICAgIH1cblxuICAgICAgc2VydmVyUHJvY2VzcyA9IG5ldyBCdWZmZXJlZE5vZGVQcm9jZXNzKHtcbiAgICAgICAgY29tbWFuZDogbGl2ZVNlcnZlcixcbiAgICAgICAgYXJncyxcbiAgICAgICAgc3Rkb3V0LFxuICAgICAgICBleGl0LFxuICAgICAgICBvcHRpb25zOiB7XG4gICAgICAgICAgY3dkOiB0YXJnZXRQYXRoXG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICBjb25zb2xlLmluZm8oYFtMaXZlIFNlcnZlcl0gbGl2ZS1zZXJ2ZXIgJHthcmdzLmpvaW4oJyAnKX1gKTtcbiAgICB9KTtcbiAgfSxcblxuICBzdG9wU2VydmVyKCkge1xuICAgIHRyeSB7XG4gICAgICBzZXJ2ZXJQcm9jZXNzLmtpbGwoKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBjb25zb2xlLmVycm9yKGUpO1xuICAgIH1cblxuICAgIHNlcnZlclByb2Nlc3MgPSBudWxsO1xuICAgIGNvbnN0IGRpc3Bvc2VTdG9wTWVudSA9IGRpc3Bvc2VNZW51O1xuICAgIGFkZFN0YXJ0TWVudSgpO1xuICAgIGRpc3Bvc2VTdG9wTWVudSAmJiBkaXNwb3NlU3RvcE1lbnUuZGlzcG9zZSgpO1xuICAgIGF0b20ubm90aWZpY2F0aW9ucy5hZGRTdWNjZXNzKCdbTGl2ZSBTZXJ2ZXJdIExpdmUgc2VydmVyIGlzIHN0b3BwZWQuJyk7XG4gICAgY29uc29sZS5pbmZvKCdbTGl2ZSBTZXJ2ZXJdIExpdmUgc2VydmVyIGlzIHN0b3BwZWQuJylcbiAgICBzYWZlU3RhdHVzKCdzdG9wcGVkJyk7XG4gIH1cbn07XG4iXX0=