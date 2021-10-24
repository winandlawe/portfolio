Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _atom = require('atom');

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

'use babel';

var Runner = (function () {

  // Public: Creates a Runner instance
  //
  // * `scriptOptions` a {ScriptOptions} object instance
  // * `emitter` Atom's {Emitter} instance. You probably don't need to overwrite it

  function Runner(scriptOptions) {
    _classCallCheck(this, Runner);

    this.bufferedProcess = null;
    this.stdoutFunc = this.stdoutFunc.bind(this);
    this.stderrFunc = this.stderrFunc.bind(this);
    this.onExit = this.onExit.bind(this);
    this.createOnErrorFunc = this.createOnErrorFunc.bind(this);
    this.scriptOptions = scriptOptions;
    this.emitter = new _atom.Emitter();
  }

  _createClass(Runner, [{
    key: 'run',
    value: function run(command, extraArgs, codeContext) {
      var inputString = arguments.length <= 3 || arguments[3] === undefined ? null : arguments[3];

      this.startTime = new Date();

      var args = this.args(codeContext, extraArgs);
      var options = this.options();
      var stdout = this.stdoutFunc;
      var stderr = this.stderrFunc;
      var exit = this.onExit;

      this.bufferedProcess = new _atom.BufferedProcess({
        command: command, args: args, options: options, stdout: stdout, stderr: stderr, exit: exit
      });

      if (inputString) {
        this.bufferedProcess.process.stdin.write(inputString);
        this.bufferedProcess.process.stdin.end();
      }

      this.bufferedProcess.onWillThrowError(this.createOnErrorFunc(command));
    }
  }, {
    key: 'stdoutFunc',
    value: function stdoutFunc(output) {
      this.emitter.emit('did-write-to-stdout', { message: output });
    }
  }, {
    key: 'onDidWriteToStdout',
    value: function onDidWriteToStdout(callback) {
      return this.emitter.on('did-write-to-stdout', callback);
    }
  }, {
    key: 'stderrFunc',
    value: function stderrFunc(output) {
      this.emitter.emit('did-write-to-stderr', { message: output });
    }
  }, {
    key: 'onDidWriteToStderr',
    value: function onDidWriteToStderr(callback) {
      return this.emitter.on('did-write-to-stderr', callback);
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      this.emitter.dispose();
    }
  }, {
    key: 'getCwd',
    value: function getCwd() {
      var cwd = this.scriptOptions.workingDirectory;

      if (!cwd) {
        switch (atom.config.get('script.cwdBehavior')) {
          case 'First project directory':
            {
              var paths = atom.project.getPaths();
              if (paths && paths.length > 0) {
                try {
                  cwd = _fs2['default'].statSync(paths[0]).isDirectory() ? paths[0] : _path2['default'].join(paths[0], '..');
                } catch (error) {/* Don't throw */}
              }
              break;
            }
          case 'Project directory of the script':
            {
              cwd = this.getProjectPath();
              break;
            }
          case 'Directory of the script':
            {
              var pane = atom.workspace.getActivePaneItem();
              cwd = pane && pane.buffer && pane.buffer.file && pane.buffer.file.getParent && pane.buffer.file.getParent() && pane.buffer.file.getParent().getPath && pane.buffer.file.getParent().getPath() || '';
              break;
            }
        }
      }
      return cwd;
    }
  }, {
    key: 'stop',
    value: function stop() {
      if (this.bufferedProcess) {
        this.bufferedProcess.kill();
        this.bufferedProcess = null;
      }
    }
  }, {
    key: 'onExit',
    value: function onExit(returnCode) {
      this.bufferedProcess = null;
      var executionTime = undefined;

      if (atom.config.get('script.enableExecTime') === true && this.startTime) {
        executionTime = (new Date().getTime() - this.startTime.getTime()) / 1000;
      }

      this.emitter.emit('did-exit', { executionTime: executionTime, returnCode: returnCode });
    }
  }, {
    key: 'onDidExit',
    value: function onDidExit(callback) {
      return this.emitter.on('did-exit', callback);
    }
  }, {
    key: 'createOnErrorFunc',
    value: function createOnErrorFunc(command) {
      var _this = this;

      return function (nodeError) {
        _this.bufferedProcess = null;
        _this.emitter.emit('did-not-run', { command: command });
        nodeError.handle();
      };
    }
  }, {
    key: 'onDidNotRun',
    value: function onDidNotRun(callback) {
      return this.emitter.on('did-not-run', callback);
    }
  }, {
    key: 'options',
    value: function options() {
      return {
        cwd: this.getCwd(),
        env: this.scriptOptions.mergedEnv(process.env)
      };
    }
  }, {
    key: 'fillVarsInArg',
    value: function fillVarsInArg(arg, codeContext, projectPath) {
      if (codeContext.filepath) {
        arg = arg.replace(/{FILE_ACTIVE}/g, codeContext.filepath);
        arg = arg.replace(/{FILE_ACTIVE_PATH}/g, _path2['default'].join(codeContext.filepath, '..'));
      }
      if (codeContext.filename) {
        arg = arg.replace(/{FILE_ACTIVE_NAME}/g, codeContext.filename);
        arg = arg.replace(/{FILE_ACTIVE_NAME_BASE}/g, _path2['default'].basename(codeContext.filename, _path2['default'].extname(codeContext.filename)));
      }
      if (projectPath) {
        arg = arg.replace(/{PROJECT_PATH}/g, projectPath);
      }

      return arg;
    }
  }, {
    key: 'args',
    value: function args(codeContext, extraArgs) {
      var _this2 = this;

      // extraArgs = default command args from:
      // - the grammars/<grammar>.coffee file

      // cmdArgs = customed command args from:
      // - a user's profil
      // - the 'Configure Run Options' panel
      var cmdArgs = this.scriptOptions.cmdArgs;

      // Let's overdrive the default args with the customed ones
      var args = cmdArgs.length ? cmdArgs : extraArgs;

      // Do not forget to concat the script args after the command args
      var scriptArgs = this.scriptOptions.scriptArgs;
      args = args.concat(scriptArgs);

      var projectPath = this.getProjectPath || '';
      args = args.map(function (arg) {
        return _this2.fillVarsInArg(arg, codeContext, projectPath);
      });

      if (!this.scriptOptions.cmd) {
        args = codeContext.shebangCommandArgs().concat(args);
      }
      return args;
    }
  }, {
    key: 'getProjectPath',
    value: function getProjectPath() {
      var filePath = atom.workspace.getActiveTextEditor().getPath();
      var projectPaths = atom.project.getPaths();
      for (var projectPath of projectPaths) {
        if (filePath.indexOf(projectPath) > -1) {
          if (_fs2['default'].statSync(projectPath).isDirectory()) {
            return projectPath;
          }
          return _path2['default'].join(projectPath, '..');
        }
      }
      return null;
    }
  }]);

  return Runner;
})();

exports['default'] = Runner;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZpbGU6Ly8vQzovVXNlcnMvY2tuanUvLmF0b20vcGFja2FnZXMvc2NyaXB0L2xpYi9ydW5uZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztvQkFFeUMsTUFBTTs7a0JBQ2hDLElBQUk7Ozs7b0JBQ0YsTUFBTTs7OztBQUp2QixXQUFXLENBQUM7O0lBTVMsTUFBTTs7Ozs7OztBQU1kLFdBTlEsTUFBTSxDQU1iLGFBQWEsRUFBRTswQkFOUixNQUFNOztBQU92QixRQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQztBQUM1QixRQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQzdDLFFBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDN0MsUUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUNyQyxRQUFJLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUMzRCxRQUFJLENBQUMsYUFBYSxHQUFHLGFBQWEsQ0FBQztBQUNuQyxRQUFJLENBQUMsT0FBTyxHQUFHLG1CQUFhLENBQUM7R0FDOUI7O2VBZGtCLE1BQU07O1dBZ0J0QixhQUFDLE9BQU8sRUFBRSxTQUFTLEVBQUUsV0FBVyxFQUFzQjtVQUFwQixXQUFXLHlEQUFHLElBQUk7O0FBQ3JELFVBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQzs7QUFFNUIsVUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsU0FBUyxDQUFDLENBQUM7QUFDL0MsVUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO0FBQy9CLFVBQU0sTUFBTSxHQUFHLElB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RyxDQUFDLENBQUMsRUFBRTtBQUN0QyxjQUFJLGdCQUFHLFFBQVEsQ0FBQyxXQUFXLENBQUMsQ0FBQyxXQUFXLEVBQUUsRUFBRTtBQUMxQyxtQkFBTyxXQUFXLENBQUM7V0FDcEI7QUFDRCxpQkFBTyxrQkFBSyxJQUFJLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxDQUFDO1NBQ3JDO09BQ0Y7QUFDRCxhQUFPLElBQUksQ0FBQztLQUNiOzs7U0FyTGtCLE1BQU07OztxQkFBTixNQUFNIiwiZmlsZSI6ImZpbGU6Ly8vQzovVXNlcnMvY2tuanUvLmF0b20vcGFja2FnZXMvc2NyaXB0L2xpYi9ydW5uZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIGJhYmVsJztcblxuaW1wb3J0IHsgRW1pdHRlciwgQnVmZmVyZWRQcm9jZXNzIH0gZnJvbSAnYXRvbSc7XG5pbXBvcnQgZnMgZnJvbSAnZnMnO1xuaW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJ1bm5lciB7XG5cbiAgLy8gUHVibGljOiBDcmVhdGVzIGEgUnVubmVyIGluc3RhbmNlXG4gIC8vXG4gIC8vICogYHNjcmlwdE9wdGlvbnNgIGEge1NjcmlwdE9wdGlvbnN9IG9iamVjdCBpbnN0YW5jZVxuICAvLyAqIGBlbWl0dGVyYCBBdG9tJ3Mge0VtaXR0ZXJ9IGluc3RhbmNlLiBZb3UgcHJvYmFibHkgZG9uJ3QgbmVlZCB0byBvdmVyd3JpdGUgaXRcbiAgY29uc3RydWN0b3Ioc2NyaXB0T3B0aW9ucykge1xuICAgIHRoaXMuYnVmZmVyZWRQcm9jZXNzID0gbnVsbDtcbiAgICB0aGlzLnN0ZG91dEZ1bmMgPSB0aGlzLnN0ZG91dEZ1bmMuYmluZCh0aGlzKTtcbiAgICB0aGlzLnN0ZGVyckZ1bmMgPSB0aGlzLnN0ZGVyckZ1bmMuYmluZCh0aGlzKTtcbiAgICB0aGlzLm9uRXhpdCA9IHRoaXMub25FeGl0LmJpbmQodGhpcyk7XG4gICAgdGhpcy5jcmVhdGVPbkVycm9yRnVuYyA9IHRoaXMuY3JlYXRlT25FcnJvckZ1bmMuYmluZCh0aGlzKTtcbiAgICB0aGlzLnNjcmlwdE9wdGlvbnMgPSBzY3JpcHRPcHRpb25zO1xuICAgIHRoaXMuZW1pdHRlciA9IG5ldyBFbWl0dGVyKCk7XG4gIH1cblxuICBydW4oY29tbWFuZCwgZXh0cmFBcmdzLCBjb2RlQ29udGV4dCwgaW5wdXRTdHJpbmcgPSBudWxsKSB7XG4gICAgdGhpcy5zdGFydFRpbWUgPSBuZXcgRGF0ZSgpO1xuXG4gICAgY29uc3QgYXJncyA9IHRoaXMuYXJncyhjb2RlQ29udGV4dCwgZXh0cmFBcmdzKTtcbiAgICBjb25zdCBvcHRpb25zID0gdGhpcy5vcHRpb25zKCk7XG4gICAgY29uc3Qgc3Rkb3V0ID0gdGhpcy5zdGRvdXRGdW5jO1xuICAgIGNvbnN0IHN0ZGVyciA9IHRoaXMuc3RkZXJyRnVuYztcbiAgICBjb25zdCBleGl0ID0gdGhpcy5vbkV4aXQ7XG5cbiAgICB0aGlzLmJ1ZmZlcmVkUHJvY2VzcyA9IG5ldyBCdWZmZXJlZFByb2Nlc3Moe1xuICAgICAgY29tbWFuZCwgYXJncywgb3B0aW9ucywgc3Rkb3V0LCBzdGRlcnIsIGV4aXQsXG4gICAgfSk7XG5cbiAgICBpZiAoaW5wdXRTdHJpbmcpIHtcbiAgICAgIHRoaXMuYnVmZmVyZWRQcm9jZXNzLnByb2Nlc3Muc3RkaW4ud3JpdGUoaW5wdXRTdHJpbmcpO1xuICAgICAgdGhpcy5idWZmZXJlZFByb2Nlc3MucHJvY2Vzcy5zdGRpbi5lbmQoKTtcbiAgICB9XG5cbiAgICB0aGlzLmJ1ZmZlcmVkUHJvY2Vzcy5vbldpbGxUaHJvd0Vycm9yKHRoaXMuY3JlYXRlT25FcnJvckZ1bmMoY29tbWFuZCkpO1xuICB9XG5cbiAgc3Rkb3V0RnVuYyhvdXRwdXQpIHtcbiAgICB0aGlzLmVtaXR0ZXIuZW1pdCgnZGlkLXdyaXRlLXRvLXN0ZG91dCcsIHsgbWVzc2FnZTogb3V0cHV0IH0pO1xuICB9XG5cbiAgb25EaWRXcml0ZVRvU3Rkb3V0KGNhbGxiYWNrKSB7XG4gICAgcmV0dXJuIHRoaXMuZW1pdHRlci5vbignZGlkLXdyaXRlLXRvLXN0ZG91dCcsIGNhbGxiYWNrKTtcbiAgfVxuXG4gIHN0ZGVyckZ1bmMob3V0cHV0KSB7XG4gICAgdGhpcy5lbWl0dGVyLmVtaXQoJ2RpZC13cml0ZS10by1zdGRlcnInLCB7IG1lc3NhZ2U6IG91dHB1dCB9KTtcbiAgfVxuXG4gIG9uRGlkV3JpdGVUb1N0ZGVycihjYWxsYmFjaykge1xuICAgIHJldHVybiB0aGlzLmVtaXR0ZXIub24oJ2RpZC13cml0ZS10by1zdGRlcnInLCBjYWxsYmFjayk7XG4gIH1cblxuICBkZXN0cm95KCkge1xuICAgIHRoaXMuZW1pdHRlci5kaXNwb3NlKCk7XG4gIH1cblxuICBnZXRDd2QoKSB7XG4gICAgbGV0IGN3ZCA9IHRoaXMuc2NyaXB0T3B0aW9ucy53b3JraW5nRGlyZWN0b3J5O1xuXG4gICAgaWYgKCFjd2QpIHtcbiAgICAgIHN3aXRjaCAoYXRvbS5jb25maWcuZ2V0KCdzY3JpcHQuY3dkQmVoYXZpb3InKSkge1xuICAgICAgICBjYXNlICdGaXJzdCBwcm9qZWN0IGRpcmVjdG9yeSc6IHtcbiAgICAgICAgICBjb25zdCBwYXRocyA9IGF0b20ucHJvamVjdC5nZXRQYXRocygpO1xuICAgICAgICAgIGlmIChwYXRocyAmJiBwYXRocy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICBjd2QgPSBmcy5zdGF0U3luYyhwYXRoc1swXSkuaXNEaXJlY3RvcnkoKSA/IHBhdGhzWzBdIDogcGF0aC5qb2luKHBhdGhzWzBdLCAnLi4nKTtcbiAgICAgICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7IC8qIERvbid0IHRocm93ICovIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSAnUHJvamVjdCBkaXJlY3Rvcnkgb2YgdGhlIHNjcmlwdCc6IHtcbiAgICAgICAgICBjd2QgPSB0aGlzLmdldFByb2plY3RQYXRoKCk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSAnRGlyZWN0b3J5IG9mIHRoZSBzY3JpcHQnOiB7XG4gICAgICAgICAgY29uc3QgcGFuZSA9IGF0b20ud29ya3NwYWNlLmdldEFjdGl2ZVBhbmVJdGVtKCk7XG4gICAgICAgICAgY3dkID0gKHBhbmUgJiYgcGFuZS5idWZmZXIgJiYgcGFuZS5idWZmZXIuZmlsZSAmJiBwYW5lLmJ1ZmZlci5maWxlLmdldFBhcmVudCAmJlxuICAgICAgICAgICAgICAgICBwYW5lLmJ1ZmZlci5maWxlLmdldFBhcmVudCgpICYmIHBhbmUuYnVmZmVyLmZpbGUuZ2V0UGFyZW50KCkuZ2V0UGF0aCAmJlxuICAgICAgICAgICAgICAgICBwYW5lLmJ1ZmZlci5maWxlLmdldFBhcmVudCgpLmdldFBhdGgoKSkgfHwgJyc7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGN3ZDtcbiAgfVxuXG4gIHN0b3AoKSB7XG4gICAgaWYgKHRoaXMuYnVmZmVyZWRQcm9jZXNzKSB7XG4gICAgICB0aGlzLmJ1ZmZlcmVkUHJvY2Vzcy5raWxsKCk7XG4gICAgICB0aGlzLmJ1ZmZlcmVkUHJvY2VzcyA9IG51bGw7XG4gICAgfVxuICB9XG5cbiAgb25FeGl0KHJldHVybkNvZGUpIHtcbiAgICB0aGlzLmJ1ZmZlcmVkUHJvY2VzcyA9IG51bGw7XG4gICAgbGV0IGV4ZWN1dGlvblRpbWU7XG5cbiAgICBpZiAoKGF0b20uY29uZmlnLmdldCgnc2NyaXB0LmVuYWJsZUV4ZWNUaW1lJykgPT09IHRydWUpICYmIHRoaXMuc3RhcnRUaW1lKSB7XG4gICAgICBleGVjdXRpb25UaW1lID0gKG5ldyBEYXRlKCkuZ2V0VGltZSgpIC0gdGhpcy5zdGFydFRpbWUuZ2V0VGltZSgpKSAvIDEwMDA7XG4gICAgfVxuXG4gICAgdGhpcy5lbWl0dGVyLmVtaXQoJ2RpZC1leGl0JywgeyBleGVjdXRpb25UaW1lLCByZXR1cm5Db2RlIH0pO1xuICB9XG5cbiAgb25EaWRFeGl0KGNhbGxiYWNrKSB7XG4gICAgcmV0dXJuIHRoaXMuZW1pdHRlci5vbignZGlkLWV4aXQnLCBjYWxsYmFjayk7XG4gIH1cblxuICBjcmVhdGVPbkVycm9yRnVuYyhjb21tYW5kKSB7XG4gICAgcmV0dXJuIChub2RlRXJyb3IpID0+IHtcbiAgICAgIHRoaXMuYnVmZmVyZWRQcm9jZXNzID0gbnVsbDtcbiAgICAgIHRoaXMuZW1pdHRlci5lbWl0KCdkaWQtbm90LXJ1bicsIHsgY29tbWFuZCB9KTtcbiAgICAgIG5vZGVFcnJvci5oYW5kbGUoKTtcbiAgICB9O1xuICB9XG5cbiAgb25EaWROb3RSdW4oY2FsbGJhY2spIHtcbiAgICByZXR1cm4gdGhpcy5lbWl0dGVyLm9uKCdkaWQtbm90LXJ1bicsIGNhbGxiYWNrKTtcbiAgfVxuXG4gIG9wdGlvbnMoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGN3ZDogdGhpcy5nZXRDd2QoKSxcbiAgICAgIGVudjogdGhpcy5zY3JpcHRPcHRpb25zLm1lcmdlZEVudihwcm9jZXNzLmVudiksXG4gICAgfTtcbiAgfVxuXG4gIGZpbGxWYXJzSW5BcmcoYXJnLCBjb2RlQ29udGV4dCwgcHJvamVjdFBhdGgpIHtcbiAgICBpZiAoY29kZUNvbnRleHQuZmlsZXBhdGgpIHtcbiAgICAgIGFyZyA9IGFyZy5yZXBsYWNlKC97RklMRV9BQ1RJVkV9L2csIGNvZGVDb250ZXh0LmZpbGVwYXRoKTtcbiAgICAgIGFyZyA9IGFyZy5yZXBsYWNlKC97RklMRV9BQ1RJVkVfUEFUSH0vZywgcGF0aC5qb2luKGNvZGVDb250ZXh0LmZpbGVwYXRoLCAnLi4nKSk7XG4gICAgfVxuICAgIGlmIChjb2RlQ29udGV4dC5maWxlbmFtZSkge1xuICAgICAgYXJnID0gYXJnLnJlcGxhY2UoL3tGSUxFX0FDVElWRV9OQU1FfS9nLCBjb2RlQ29udGV4dC5maWxlbmFtZSk7XG4gICAgICBhcmcgPSBhcmcucmVwbGFjZSgve0ZJTEVfQUNUSVZFX05BTUVfQkFTRX0vZywgcGF0aC5iYXNlbmFtZShjb2RlQ29udGV4dC5maWxlbmFtZSwgcGF0aC5leHRuYW1lKGNvZGVDb250ZXh0LmZpbGVuYW1lKSkpO1xuICAgIH1cbiAgICBpZiAocHJvamVjdFBhdGgpIHtcbiAgICAgIGFyZyA9IGFyZy5yZXBsYWNlKC97UFJPSkVDVF9QQVRIfS9nLCBwcm9qZWN0UGF0aCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGFyZztcbiAgfVxuXG4gIGFyZ3MoY29kZUNvbnRleHQsIGV4dHJhQXJncykge1xuICAgIC8vIGV4dHJhQXJncyA9IGRlZmF1bHQgY29tbWFuZCBhcmdzIGZyb206XG4gICAgLy8gLSB0aGUgZ3JhbW1hcnMvPGdyYW1tYXI+LmNvZmZlZSBmaWxlXG5cbiAgICAvLyBjbWRBcmdzID0gY3VzdG9tZWQgY29tbWFuZCBhcmdzIGZyb206XG4gICAgLy8gLSBhIHVzZXIncyBwcm9maWxcbiAgICAvLyAtIHRoZSAnQ29uZmlndXJlIFJ1biBPcHRpb25zJyBwYW5lbFxuICAgIGNvbnN0IGNtZEFyZ3MgPSB0aGlzLnNjcmlwdE9wdGlvbnMuY21kQXJncztcblxuICAgIC8vIExldCdzIG92ZXJkcml2ZSB0aGUgZGVmYXVsdCBhcmdzIHdpdGggdGhlIGN1c3RvbWVkIG9uZXNcbiAgICBsZXQgYXJncyA9IChjbWRBcmdzLmxlbmd0aCkgPyBjbWRBcmdzIDogZXh0cmFBcmdzO1xuXG4gICAgLy8gRG8gbm90IGZvcmdldCB0byBjb25jYXQgdGhlIHNjcmlwdCBhcmdzIGFmdGVyIHRoZSBjb21tYW5kIGFyZ3NcbiAgICBjb25zdCBzY3JpcHRBcmdzID0gdGhpcy5zY3JpcHRPcHRpb25zLnNjcmlwdEFyZ3M7XG4gICAgYXJncyA9IGFyZ3MuY29uY2F0KHNjcmlwdEFyZ3MpO1xuXG4gICAgY29uc3QgcHJvamVjdFBhdGggPSB0aGlzLmdldFByb2plY3RQYXRoIHx8ICcnO1xuICAgIGFyZ3MgPSAoYXJncy5tYXAoYXJnID0+IHRoaXMuZmlsbFZhcnNJbkFyZyhhcmcsIGNvZGVDb250ZXh0LCBwcm9qZWN0UGF0aCkpKTtcblxuICAgIGlmICghdGhpcy5zY3JpcHRPcHRpb25zLmNtZCkge1xuICAgICAgYXJncyA9IGNvZGVDb250ZXh0LnNoZWJhbmdDb21tYW5kQXJncygpLmNvbmNhdChhcmdzKTtcbiAgICB9XG4gICAgcmV0dXJuIGFyZ3M7XG4gIH1cblxuICBnZXRQcm9qZWN0UGF0aCgpIHtcbiAgICBjb25zdCBmaWxlUGF0aCA9IGF0b20ud29ya3NwYWNlLmdldEFjdGl2ZVRleHRFZGl0b3IoKS5nZXRQYXRoKCk7XG4gICAgY29uc3QgcHJvamVjdFBhdGhzID0gYXRvbS5wcm9qZWN0LmdldFBhdGhzKCk7XG4gICAgZm9yIChjb25zdCBwcm9qZWN0UGF0aCBvZiBwcm9qZWN0UGF0aHMpIHtcbiAgICAgIGlmIChmaWxlUGF0aC5pbmRleE9mKHByb2plY3RQYXRoKSA+IC0xKSB7XG4gICAgICAgIGlmIChmcy5zdGF0U3luYyhwcm9qZWN0UGF0aCkuaXNEaXJlY3RvcnkoKSkge1xuICAgICAgICAgIHJldHVybiBwcm9qZWN0UGF0aDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcGF0aC5qb2luKHByb2plY3RQYXRoLCAnLi4nKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbn1cbiJdfQ==