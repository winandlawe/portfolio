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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZpbGU6Ly8vQzovVXNlcnMvY2tuanUvLmF0b20vcGFja2FnZXMvc2NyaXB0L2xpYi9ydW5uZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztvQkFFeUMsTUFBTTs7a0JBQ2hDLElBQUk7Ozs7b0JBQ0YsTUFBTTs7OztBQUp2QixXQUFXLENBQUM7O0lBTVMsTUFBTTs7Ozs7O0FBS2QsV0FMUSxNQUFNLENBS2IsYUFBYSxFQUFFOzBCQUxSLE1BQU07O0FBTXZCLFFBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDO0FBQzVCLFFBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDN0MsUUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUM3QyxRQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ3JDLFFBQUksQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQzNELFFBQUksQ0FBQyxhQUFhLEdBQUcsYUFBYSxDQUFDO0FBQ25DLFFBQUksQ0FBQyxPQUFPLEdBQUcsbUJBQWEsQ0FBQztHQUM5Qjs7ZUFia0IsTUFBTTs7V0FldEIsYUFBQyxPQUFPLEVBQUUsU0FBUyxFQUFFLFdBQVcsRUFBc0I7VUFBcEIsV0FBVyx5REFBRyxJQUFJOztBQUNyRCxVQUFJLENBQUMsU0FBUyxHQUFHLElBQUksSUFBSSxFQUFFLENBQUM7O0FBRTVCLFVBQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLFNBQVMsQ0FBQyxDQUFDO0FBQy9DLFVBQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztBQUMvQixVQUFNLE1BQU0sR0FBRyxJQUFJ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dEMsY0FBSSxnQkFBRyxRQUFRLENBQUMsV0FBVyxDQUFDLENBQUMsV0FBVyxFQUFFLEVBQUU7QUFDMUMsbUJBQU8sV0FBVyxDQUFDO1dBQ3BCO0FBQ0QsaUJBQU8sa0JBQUssSUFBSSxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsQ0FBQztTQUNyQztPQUNGO0FBQ0QsYUFBTyxJQUFJLENBQUM7S0FDYjs7O1NBcExrQixNQUFNOzs7cUJBQU4sTUFBTSIsImZpbGUiOiJmaWxlOi8vL0M6L1VzZXJzL2Nrbmp1Ly5hdG9tL3BhY2thZ2VzL3NjcmlwdC9saWIvcnVubmVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBiYWJlbCc7XG5cbmltcG9ydCB7IEVtaXR0ZXIsIEJ1ZmZlcmVkUHJvY2VzcyB9IGZyb20gJ2F0b20nO1xuaW1wb3J0IGZzIGZyb20gJ2ZzJztcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSdW5uZXIge1xuICAvLyBQdWJsaWM6IENyZWF0ZXMgYSBSdW5uZXIgaW5zdGFuY2VcbiAgLy9cbiAgLy8gKiBgc2NyaXB0T3B0aW9uc2AgYSB7U2NyaXB0T3B0aW9uc30gb2JqZWN0IGluc3RhbmNlXG4gIC8vICogYGVtaXR0ZXJgIEF0b20ncyB7RW1pdHRlcn0gaW5zdGFuY2UuIFlvdSBwcm9iYWJseSBkb24ndCBuZWVkIHRvIG92ZXJ3cml0ZSBpdFxuICBjb25zdHJ1Y3RvcihzY3JpcHRPcHRpb25zKSB7XG4gICAgdGhpcy5idWZmZXJlZFByb2Nlc3MgPSBudWxsO1xuICAgIHRoaXMuc3Rkb3V0RnVuYyA9IHRoaXMuc3Rkb3V0RnVuYy5iaW5kKHRoaXMpO1xuICAgIHRoaXMuc3RkZXJyRnVuYyA9IHRoaXMuc3RkZXJyRnVuYy5iaW5kKHRoaXMpO1xuICAgIHRoaXMub25FeGl0ID0gdGhpcy5vbkV4aXQuYmluZCh0aGlzKTtcbiAgICB0aGlzLmNyZWF0ZU9uRXJyb3JGdW5jID0gdGhpcy5jcmVhdGVPbkVycm9yRnVuYy5iaW5kKHRoaXMpO1xuICAgIHRoaXMuc2NyaXB0T3B0aW9ucyA9IHNjcmlwdE9wdGlvbnM7XG4gICAgdGhpcy5lbWl0dGVyID0gbmV3IEVtaXR0ZXIoKTtcbiAgfVxuXG4gIHJ1bihjb21tYW5kLCBleHRyYUFyZ3MsIGNvZGVDb250ZXh0LCBpbnB1dFN0cmluZyA9IG51bGwpIHtcbiAgICB0aGlzLnN0YXJ0VGltZSA9IG5ldyBEYXRlKCk7XG5cbiAgICBjb25zdCBhcmdzID0gdGhpcy5hcmdzKGNvZGVDb250ZXh0LCBleHRyYUFyZ3MpO1xuICAgIGNvbnN0IG9wdGlvbnMgPSB0aGlzLm9wdGlvbnMoKTtcbiAgICBjb25zdCBzdGRvdXQgPSB0aGlzLnN0ZG91dEZ1bmM7XG4gICAgY29uc3Qgc3RkZXJyID0gdGhpcy5zdGRlcnJGdW5jO1xuICAgIGNvbnN0IGV4aXQgPSB0aGlzLm9uRXhpdDtcblxuICAgIHRoaXMuYnVmZmVyZWRQcm9jZXNzID0gbmV3IEJ1ZmZlcmVkUHJvY2Vzcyh7XG4gICAgICBjb21tYW5kLCBhcmdzLCBvcHRpb25zLCBzdGRvdXQsIHN0ZGVyciwgZXhpdCxcbiAgICB9KTtcblxuICAgIGlmIChpbnB1dFN0cmluZykge1xuICAgICAgdGhpcy5idWZmZXJlZFByb2Nlc3MucHJvY2Vzcy5zdGRpbi53cml0ZShpbnB1dFN0cmluZyk7XG4gICAgICB0aGlzLmJ1ZmZlcmVkUHJvY2Vzcy5wcm9jZXNzLnN0ZGluLmVuZCgpO1xuICAgIH1cblxuICAgIHRoaXMuYnVmZmVyZWRQcm9jZXNzLm9uV2lsbFRocm93RXJyb3IodGhpcy5jcmVhdGVPbkVycm9yRnVuYyhjb21tYW5kKSk7XG4gIH1cblxuICBzdGRvdXRGdW5jKG91dHB1dCkge1xuICAgIHRoaXMuZW1pdHRlci5lbWl0KCdkaWQtd3JpdGUtdG8tc3Rkb3V0JywgeyBtZXNzYWdlOiBvdXRwdXQgfSk7XG4gIH1cblxuICBvbkRpZFdyaXRlVG9TdGRvdXQoY2FsbGJhY2spIHtcbiAgICByZXR1cm4gdGhpcy5lbWl0dGVyLm9uKCdkaWQtd3JpdGUtdG8tc3Rkb3V0JywgY2FsbGJhY2spO1xuICB9XG5cbiAgc3RkZXJyRnVuYyhvdXRwdXQpIHtcbiAgICB0aGlzLmVtaXR0ZXIuZW1pdCgnZGlkLXdyaXRlLXRvLXN0ZGVycicsIHsgbWVzc2FnZTogb3V0cHV0IH0pO1xuICB9XG5cbiAgb25EaWRXcml0ZVRvU3RkZXJyKGNhbGxiYWNrKSB7XG4gICAgcmV0dXJuIHRoaXMuZW1pdHRlci5vbignZGlkLXdyaXRlLXRvLXN0ZGVycicsIGNhbGxiYWNrKTtcbiAgfVxuXG4gIGRlc3Ryb3koKSB7XG4gICAgdGhpcy5lbWl0dGVyLmRpc3Bvc2UoKTtcbiAgfVxuXG4gIGdldEN3ZCgpIHtcbiAgICBsZXQgY3dkID0gdGhpcy5zY3JpcHRPcHRpb25zLndvcmtpbmdEaXJlY3Rvcnk7XG5cbiAgICBpZiAoIWN3ZCkge1xuICAgICAgc3dpdGNoIChhdG9tLmNvbmZpZy5nZXQoJ3NjcmlwdC5jd2RCZWhhdmlvcicpKSB7XG4gICAgICAgIGNhc2UgJ0ZpcnN0IHByb2plY3QgZGlyZWN0b3J5Jzoge1xuICAgICAgICAgIGNvbnN0IHBhdGhzID0gYXRvbS5wcm9qZWN0LmdldFBhdGhzKCk7XG4gICAgICAgICAgaWYgKHBhdGhzICYmIHBhdGhzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgIGN3ZCA9IGZzLnN0YXRTeW5jKHBhdGhzWzBdKS5pc0RpcmVjdG9yeSgpID8gcGF0aHNbMF0gOiBwYXRoLmpvaW4ocGF0aHNbMF0sICcuLicpO1xuICAgICAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHsgLyogRG9uJ3QgdGhyb3cgKi8gfVxuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBjYXNlICdQcm9qZWN0IGRpcmVjdG9yeSBvZiB0aGUgc2NyaXB0Jzoge1xuICAgICAgICAgIGN3ZCA9IHRoaXMuZ2V0UHJvamVjdFBhdGgoKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBjYXNlICdEaXJlY3Rvcnkgb2YgdGhlIHNjcmlwdCc6IHtcbiAgICAgICAgICBjb25zdCBwYW5lID0gYXRvbS53b3Jrc3BhY2UuZ2V0QWN0aXZlUGFuZUl0ZW0oKTtcbiAgICAgICAgICBjd2QgPSAocGFuZSAmJiBwYW5lLmJ1ZmZlciAmJiBwYW5lLmJ1ZmZlci5maWxlICYmIHBhbmUuYnVmZmVyLmZpbGUuZ2V0UGFyZW50XG4gICAgICAgICAgICAgICAgICYmIHBhbmUuYnVmZmVyLmZpbGUuZ2V0UGFyZW50KCkgJiYgcGFuZS5idWZmZXIuZmlsZS5nZXRQYXJlbnQoKS5nZXRQYXRoXG4gICAgICAgICAgICAgICAgICYmIHBhbmUuYnVmZmVyLmZpbGUuZ2V0UGFyZW50KCkuZ2V0UGF0aCgpKSB8fCAnJztcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gY3dkO1xuICB9XG5cbiAgc3RvcCgpIHtcbiAgICBpZiAodGhpcy5idWZmZXJlZFByb2Nlc3MpIHtcbiAgICAgIHRoaXMuYnVmZmVyZWRQcm9jZXNzLmtpbGwoKTtcbiAgICAgIHRoaXMuYnVmZmVyZWRQcm9jZXNzID0gbnVsbDtcbiAgICB9XG4gIH1cblxuICBvbkV4aXQocmV0dXJuQ29kZSkge1xuICAgIHRoaXMuYnVmZmVyZWRQcm9jZXNzID0gbnVsbDtcbiAgICBsZXQgZXhlY3V0aW9uVGltZTtcblxuICAgIGlmICgoYXRvbS5jb25maWcuZ2V0KCdzY3JpcHQuZW5hYmxlRXhlY1RpbWUnKSA9PT0gdHJ1ZSkgJiYgdGhpcy5zdGFydFRpbWUpIHtcbiAgICAgIGV4ZWN1dGlvblRpbWUgPSAobmV3IERhdGUoKS5nZXRUaW1lKCkgLSB0aGlzLnN0YXJ0VGltZS5nZXRUaW1lKCkpIC8gMTAwMDtcbiAgICB9XG5cbiAgICB0aGlzLmVtaXR0ZXIuZW1pdCgnZGlkLWV4aXQnLCB7IGV4ZWN1dGlvblRpbWUsIHJldHVybkNvZGUgfSk7XG4gIH1cblxuICBvbkRpZEV4aXQoY2FsbGJhY2spIHtcbiAgICByZXR1cm4gdGhpcy5lbWl0dGVyLm9uKCdkaWQtZXhpdCcsIGNhbGxiYWNrKTtcbiAgfVxuXG4gIGNyZWF0ZU9uRXJyb3JGdW5jKGNvbW1hbmQpIHtcbiAgICByZXR1cm4gKG5vZGVFcnJvcikgPT4ge1xuICAgICAgdGhpcy5idWZmZXJlZFByb2Nlc3MgPSBudWxsO1xuICAgICAgdGhpcy5lbWl0dGVyLmVtaXQoJ2RpZC1ub3QtcnVuJywgeyBjb21tYW5kIH0pO1xuICAgICAgbm9kZUVycm9yLmhhbmRsZSgpO1xuICAgIH07XG4gIH1cblxuICBvbkRpZE5vdFJ1bihjYWxsYmFjaykge1xuICAgIHJldHVybiB0aGlzLmVtaXR0ZXIub24oJ2RpZC1ub3QtcnVuJywgY2FsbGJhY2spO1xuICB9XG5cbiAgb3B0aW9ucygpIHtcbiAgICByZXR1cm4ge1xuICAgICAgY3dkOiB0aGlzLmdldEN3ZCgpLFxuICAgICAgZW52OiB0aGlzLnNjcmlwdE9wdGlvbnMubWVyZ2VkRW52KHByb2Nlc3MuZW52KSxcbiAgICB9O1xuICB9XG5cbiAgZmlsbFZhcnNJbkFyZyhhcmcsIGNvZGVDb250ZXh0LCBwcm9qZWN0UGF0aCkge1xuICAgIGlmIChjb2RlQ29udGV4dC5maWxlcGF0aCkge1xuICAgICAgYXJnID0gYXJnLnJlcGxhY2UoL3tGSUxFX0FDVElWRX0vZywgY29kZUNvbnRleHQuZmlsZXBhdGgpO1xuICAgICAgYXJnID0gYXJnLnJlcGxhY2UoL3tGSUxFX0FDVElWRV9QQVRIfS9nLCBwYXRoLmpvaW4oY29kZUNvbnRleHQuZmlsZXBhdGgsICcuLicpKTtcbiAgICB9XG4gICAgaWYgKGNvZGVDb250ZXh0LmZpbGVuYW1lKSB7XG4gICAgICBhcmcgPSBhcmcucmVwbGFjZSgve0ZJTEVfQUNUSVZFX05BTUV9L2csIGNvZGVDb250ZXh0LmZpbGVuYW1lKTtcbiAgICAgIGFyZyA9IGFyZy5yZXBsYWNlKC97RklMRV9BQ1RJVkVfTkFNRV9CQVNFfS9nLCBwYXRoLmJhc2VuYW1lKGNvZGVDb250ZXh0LmZpbGVuYW1lLCBwYXRoLmV4dG5hbWUoY29kZUNvbnRleHQuZmlsZW5hbWUpKSk7XG4gICAgfVxuICAgIGlmIChwcm9qZWN0UGF0aCkge1xuICAgICAgYXJnID0gYXJnLnJlcGxhY2UoL3tQUk9KRUNUX1BBVEh9L2csIHByb2plY3RQYXRoKTtcbiAgICB9XG5cbiAgICByZXR1cm4gYXJnO1xuICB9XG5cbiAgYXJncyhjb2RlQ29udGV4dCwgZXh0cmFBcmdzKSB7XG4gICAgLy8gZXh0cmFBcmdzID0gZGVmYXVsdCBjb21tYW5kIGFyZ3MgZnJvbTpcbiAgICAvLyAtIHRoZSBncmFtbWFycy88Z3JhbW1hcj4uY29mZmVlIGZpbGVcblxuICAgIC8vIGNtZEFyZ3MgPSBjdXN0b21lZCBjb21tYW5kIGFyZ3MgZnJvbTpcbiAgICAvLyAtIGEgdXNlcidzIHByb2ZpbFxuICAgIC8vIC0gdGhlICdDb25maWd1cmUgUnVuIE9wdGlvbnMnIHBhbmVsXG4gICAgY29uc3QgeyBjbWRBcmdzIH0gPSB0aGlzLnNjcmlwdE9wdGlvbnM7XG5cbiAgICAvLyBMZXQncyBvdmVyZHJpdmUgdGhlIGRlZmF1bHQgYXJncyB3aXRoIHRoZSBjdXN0b21lZCBvbmVzXG4gICAgbGV0IGFyZ3MgPSAoY21kQXJncy5sZW5ndGgpID8gY21kQXJncyA6IGV4dHJhQXJncztcblxuICAgIC8vIERvIG5vdCBmb3JnZXQgdG8gY29uY2F0IHRoZSBzY3JpcHQgYXJncyBhZnRlciB0aGUgY29tbWFuZCBhcmdzXG4gICAgY29uc3QgeyBzY3JpcHRBcmdzIH0gPSB0aGlzLnNjcmlwdE9wdGlvbnM7XG4gICAgYXJncyA9IGFyZ3MuY29uY2F0KHNjcmlwdEFyZ3MpO1xuXG4gICAgY29uc3QgcHJvamVjdFBhdGggPSB0aGlzLmdldFByb2plY3RQYXRoIHx8ICcnO1xuICAgIGFyZ3MgPSAoYXJncy5tYXAoKGFyZykgPT4gdGhpcy5maWxsVmFyc0luQXJnKGFyZywgY29kZUNvbnRleHQsIHByb2plY3RQYXRoKSkpO1xuXG4gICAgaWYgKCF0aGlzLnNjcmlwdE9wdGlvbnMuY21kKSB7XG4gICAgICBhcmdzID0gY29kZUNvbnRleHQuc2hlYmFuZ0NvbW1hbmRBcmdzKCkuY29uY2F0KGFyZ3MpO1xuICAgIH1cbiAgICByZXR1cm4gYXJncztcbiAgfVxuXG4gIGdldFByb2plY3RQYXRoKCkge1xuICAgIGNvbnN0IGZpbGVQYXRoID0gYXRvbS53b3Jrc3BhY2UuZ2V0QWN0aXZlVGV4dEVkaXRvcigpLmdldFBhdGgoKTtcbiAgICBjb25zdCBwcm9qZWN0UGF0aHMgPSBhdG9tLnByb2plY3QuZ2V0UGF0aHMoKTtcbiAgICBmb3IgKGNvbnN0IHByb2plY3RQYXRoIG9mIHByb2plY3RQYXRocykge1xuICAgICAgaWYgKGZpbGVQYXRoLmluZGV4T2YocHJvamVjdFBhdGgpID4gLTEpIHtcbiAgICAgICAgaWYgKGZzLnN0YXRTeW5jKHByb2plY3RQYXRoKS5pc0RpcmVjdG9yeSgpKSB7XG4gICAgICAgICAgcmV0dXJuIHByb2plY3RQYXRoO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBwYXRoLmpvaW4ocHJvamVjdFBhdGgsICcuLicpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxufVxuIl19