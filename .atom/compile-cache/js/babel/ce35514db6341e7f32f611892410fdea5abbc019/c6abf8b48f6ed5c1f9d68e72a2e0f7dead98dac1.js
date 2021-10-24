Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _atom = require("atom");

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

"use babel";

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
    key: "run",
    value: function run(command, extraArgs, codeContext) {
      var inputString = arguments.length <= 3 || arguments[3] === undefined ? null : arguments[3];

      this.startTime = new Date();

      var args = this.args(codeContext, extraArgs);
      var options = this.options();
      var stdout = this.stdoutFunc;
      var stderr = this.stderrFunc;
      var exit = this.onExit;

      this.bufferedProcess = new _atom.BufferedProcess({
        command: command,
        args: args,
        options: options,
        stdout: stdout,
        stderr: stderr,
        exit: exit
      });

      if (inputString) {
        this.bufferedProcess.process.stdin.write(inputString);
        this.bufferedProcess.process.stdin.end();
      }

      this.bufferedProcess.onWillThrowError(this.createOnErrorFunc(command));
    }
  }, {
    key: "stdoutFunc",
    value: function stdoutFunc(output) {
      this.emitter.emit("did-write-to-stdout", { message: output });
    }
  }, {
    key: "onDidWriteToStdout",
    value: function onDidWriteToStdout(callback) {
      return this.emitter.on("did-write-to-stdout", callback);
    }
  }, {
    key: "stderrFunc",
    value: function stderrFunc(output) {
      this.emitter.emit("did-write-to-stderr", { message: output });
    }
  }, {
    key: "onDidWriteToStderr",
    value: function onDidWriteToStderr(callback) {
      return this.emitter.on("did-write-to-stderr", callback);
    }
  }, {
    key: "destroy",
    value: function destroy() {
      this.emitter.dispose();
    }
  }, {
    key: "getCwd",
    value: function getCwd() {
      var cwd = this.scriptOptions.workingDirectory;

      if (!cwd) {
        switch (atom.config.get("script.cwdBehavior")) {
          case "First project directory":
            {
              var paths = atom.project.getPaths();
              if (paths && paths.length > 0) {
                try {
                  cwd = _fs2["default"].statSync(paths[0]).isDirectory() ? paths[0] : _path2["default"].join(paths[0], "..");
                } catch (error) {
                  /* Don't throw */
                }
              }
              break;
            }
          case "Project directory of the script":
            {
              cwd = this.getProjectPath();
              break;
            }
          case "Directory of the script":
            {
              var pane = atom.workspace.getActivePaneItem();
              cwd = pane && pane.buffer && pane.buffer.file && pane.buffer.file.getParent && pane.buffer.file.getParent() && pane.buffer.file.getParent().getPath && pane.buffer.file.getParent().getPath() || "";
              break;
            }
        }
      }
      return cwd;
    }
  }, {
    key: "stop",
    value: function stop() {
      if (this.bufferedProcess) {
        this.bufferedProcess.kill();
        this.bufferedProcess = null;
      }
    }
  }, {
    key: "onExit",
    value: function onExit(returnCode) {
      this.bufferedProcess = null;
      var executionTime = undefined;

      if (atom.config.get("script.enableExecTime") === true && this.startTime) {
        executionTime = (new Date().getTime() - this.startTime.getTime()) / 1000;
      }

      this.emitter.emit("did-exit", { executionTime: executionTime, returnCode: returnCode });
    }
  }, {
    key: "onDidExit",
    value: function onDidExit(callback) {
      return this.emitter.on("did-exit", callback);
    }
  }, {
    key: "createOnErrorFunc",
    value: function createOnErrorFunc(command) {
      var _this = this;

      return function (nodeError) {
        _this.bufferedProcess = null;
        _this.emitter.emit("did-not-run", { command: command });
        nodeError.handle();
      };
    }
  }, {
    key: "onDidNotRun",
    value: function onDidNotRun(callback) {
      return this.emitter.on("did-not-run", callback);
    }
  }, {
    key: "options",
    value: function options() {
      return {
        cwd: this.getCwd(),
        env: this.scriptOptions.mergedEnv(process.env)
      };
    }
  }, {
    key: "fillVarsInArg",
    value: function fillVarsInArg(arg, codeContext, projectPath) {
      if (codeContext.filepath) {
        arg = arg.replace(/{FILE_ACTIVE}/g, codeContext.filepath);
        arg = arg.replace(/{FILE_ACTIVE_PATH}/g, _path2["default"].join(codeContext.filepath, ".."));
      }
      if (codeContext.filename) {
        arg = arg.replace(/{FILE_ACTIVE_NAME}/g, codeContext.filename);
        arg = arg.replace(/{FILE_ACTIVE_NAME_BASE}/g, _path2["default"].basename(codeContext.filename, _path2["default"].extname(codeContext.filename)));
      }
      if (projectPath) {
        arg = arg.replace(/{PROJECT_PATH}/g, projectPath);
      }

      return arg;
    }
  }, {
    key: "args",
    value: function args(codeContext, extraArgs) {
      var _this2 = this;

      // extraArgs = default command args from:
      // - the grammars/<grammar>.js file

      // cmdArgs = customed command args from:
      // - a user's profil
      // - the 'Configure Run Options' panel
      var cmdArgs = this.scriptOptions.cmdArgs;

      // Let's overdrive the default args with the customed ones
      var args = cmdArgs.length ? cmdArgs : extraArgs;

      // Do not forget to concat the script args after the command args
      var scriptArgs = this.scriptOptions.scriptArgs;

      args = args.concat(scriptArgs);

      var projectPath = this.getProjectPath || "";
      args = args.map(function (arg) {
        if (typeof arg !== "string") {
          // TODO why this happens? // https://github.com/atom-community/atom-script/issues/2082
          arg = "";
        }
        return _this2.fillVarsInArg(arg, codeContext, projectPath);
      });

      if (!this.scriptOptions.cmd) {
        args = codeContext.shebangCommandArgs().concat(args);
      }
      return args;
    }
  }, {
    key: "getProjectPath",
    value: function getProjectPath() {
      var filePath = atom.workspace.getActiveTextEditor().getPath();
      var projectPaths = atom.project.getPaths();
      for (var projectPath of projectPaths) {
        if (filePath.indexOf(projectPath) > -1) {
          if (_fs2["default"].statSync(projectPath).isDirectory()) {
            return projectPath;
          }
          return _path2["default"].join(projectPath, "..");
        }
      }
      return null;
    }
  }]);

  return Runner;
})();

exports["default"] = Runner;
module.exports = exports["default"];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZpbGU6Ly8vQzovVXNlcnMvY2tuanUvLmF0b20vcGFja2FnZXMvc2NyaXB0L2xpYi9ydW5uZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztvQkFFeUMsTUFBTTs7a0JBQ2hDLElBQUk7Ozs7b0JBQ0YsTUFBTTs7OztBQUp2QixXQUFXLENBQUE7O0lBTVUsTUFBTTs7Ozs7O0FBS2QsV0FMUSxNQUFNLENBS2IsYUFBYSxFQUFFOzBCQUxSLE1BQU07O0FBTXZCLFFBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFBO0FBQzNCLFFBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUE7QUFDNUMsUUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQTtBQUM1QyxRQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFBO0FBQ3BDLFFBQUksQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFBO0FBQzFELFFBQUksQ0FBQyxhQUFhLEdBQUcsYUFBYSxDQUFBO0FBQ2xDLFFBQUksQ0FBQyxPQUFPLEdBQUcsbUJBQWEsQ0FBQTtHQUM3Qjs7ZUFia0IsTUFBTTs7V0FldEIsYUFBQyxPQUFPLEVBQUUsU0FBUyxFQUFFLFdBQVcsRUFBc0I7VUFBcEIsV0FBVyx5REFBRyxJQUFJOztBQUNyRCxVQUFJLENBQUMsU0FBUyxHQUFHLElBQUksSUFBSSxFQUFFLENBQUE7O0FBRTNCLFVBQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLFNBQVMsQ0FBQyxDQUFBO0FBQzlDLFVBQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQTtBQUM5QixVQUFNLE1BQU0sR0FBRyxJQUFJ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RUFBRTtBQUN0QyxZQUFJLFFBQVEsQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUU7QUFDdEMsY0FBSSxnQkFBRyxRQUFRLENBQUMsV0FBVyxDQUFDLENBQUMsV0FBVyxFQUFFLEVBQUU7QUFDMUMsbUJBQU8sV0FBVyxDQUFBO1dBQ25CO0FBQ0QsaUJBQU8sa0JBQUssSUFBSSxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsQ0FBQTtTQUNwQztPQUNGO0FBQ0QsYUFBTyxJQUFJLENBQUE7S0FDWjs7O1NBMU1rQixNQUFNOzs7cUJBQU4sTUFBTSIsImZpbGUiOiJmaWxlOi8vL0M6L1VzZXJzL2Nrbmp1Ly5hdG9tL3BhY2thZ2VzL3NjcmlwdC9saWIvcnVubmVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2UgYmFiZWxcIlxuXG5pbXBvcnQgeyBFbWl0dGVyLCBCdWZmZXJlZFByb2Nlc3MgfSBmcm9tIFwiYXRvbVwiXG5pbXBvcnQgZnMgZnJvbSBcImZzXCJcbmltcG9ydCBwYXRoIGZyb20gXCJwYXRoXCJcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUnVubmVyIHtcbiAgLy8gUHVibGljOiBDcmVhdGVzIGEgUnVubmVyIGluc3RhbmNlXG4gIC8vXG4gIC8vICogYHNjcmlwdE9wdGlvbnNgIGEge1NjcmlwdE9wdGlvbnN9IG9iamVjdCBpbnN0YW5jZVxuICAvLyAqIGBlbWl0dGVyYCBBdG9tJ3Mge0VtaXR0ZXJ9IGluc3RhbmNlLiBZb3UgcHJvYmFibHkgZG9uJ3QgbmVlZCB0byBvdmVyd3JpdGUgaXRcbiAgY29uc3RydWN0b3Ioc2NyaXB0T3B0aW9ucykge1xuICAgIHRoaXMuYnVmZmVyZWRQcm9jZXNzID0gbnVsbFxuICAgIHRoaXMuc3Rkb3V0RnVuYyA9IHRoaXMuc3Rkb3V0RnVuYy5iaW5kKHRoaXMpXG4gICAgdGhpcy5zdGRlcnJGdW5jID0gdGhpcy5zdGRlcnJGdW5jLmJpbmQodGhpcylcbiAgICB0aGlzLm9uRXhpdCA9IHRoaXMub25FeGl0LmJpbmQodGhpcylcbiAgICB0aGlzLmNyZWF0ZU9uRXJyb3JGdW5jID0gdGhpcy5jcmVhdGVPbkVycm9yRnVuYy5iaW5kKHRoaXMpXG4gICAgdGhpcy5zY3JpcHRPcHRpb25zID0gc2NyaXB0T3B0aW9uc1xuICAgIHRoaXMuZW1pdHRlciA9IG5ldyBFbWl0dGVyKClcbiAgfVxuXG4gIHJ1bihjb21tYW5kLCBleHRyYUFyZ3MsIGNvZGVDb250ZXh0LCBpbnB1dFN0cmluZyA9IG51bGwpIHtcbiAgICB0aGlzLnN0YXJ0VGltZSA9IG5ldyBEYXRlKClcblxuICAgIGNvbnN0IGFyZ3MgPSB0aGlzLmFyZ3MoY29kZUNvbnRleHQsIGV4dHJhQXJncylcbiAgICBjb25zdCBvcHRpb25zID0gdGhpcy5vcHRpb25zKClcbiAgICBjb25zdCBzdGRvdXQgPSB0aGlzLnN0ZG91dEZ1bmNcbiAgICBjb25zdCBzdGRlcnIgPSB0aGlzLnN0ZGVyckZ1bmNcbiAgICBjb25zdCBleGl0ID0gdGhpcy5vbkV4aXRcblxuICAgIHRoaXMuYnVmZmVyZWRQcm9jZXNzID0gbmV3IEJ1ZmZlcmVkUHJvY2Vzcyh7XG4gICAgICBjb21tYW5kLFxuICAgICAgYXJncyxcbiAgICAgIG9wdGlvbnMsXG4gICAgICBzdGRvdXQsXG4gICAgICBzdGRlcnIsXG4gICAgICBleGl0LFxuICAgIH0pXG5cbiAgICBpZiAoaW5wdXRTdHJpbmcpIHtcbiAgICAgIHRoaXMuYnVmZmVyZWRQcm9jZXNzLnByb2Nlc3Muc3RkaW4ud3JpdGUoaW5wdXRTdHJpbmcpXG4gICAgICB0aGlzLmJ1ZmZlcmVkUHJvY2Vzcy5wcm9jZXNzLnN0ZGluLmVuZCgpXG4gICAgfVxuXG4gICAgdGhpcy5idWZmZXJlZFByb2Nlc3Mub25XaWxsVGhyb3dFcnJvcih0aGlzLmNyZWF0ZU9uRXJyb3JGdW5jKGNvbW1hbmQpKVxuICB9XG5cbiAgc3Rkb3V0RnVuYyhvdXRwdXQpIHtcbiAgICB0aGlzLmVtaXR0ZXIuZW1pdChcImRpZC13cml0ZS10by1zdGRvdXRcIiwgeyBtZXNzYWdlOiBvdXRwdXQgfSlcbiAgfVxuXG4gIG9uRGlkV3JpdGVUb1N0ZG91dChjYWxsYmFjaykge1xuICAgIHJldHVybiB0aGlzLmVtaXR0ZXIub24oXCJkaWQtd3JpdGUtdG8tc3Rkb3V0XCIsIGNhbGxiYWNrKVxuICB9XG5cbiAgc3RkZXJyRnVuYyhvdXRwdXQpIHtcbiAgICB0aGlzLmVtaXR0ZXIuZW1pdChcImRpZC13cml0ZS10by1zdGRlcnJcIiwgeyBtZXNzYWdlOiBvdXRwdXQgfSlcbiAgfVxuXG4gIG9uRGlkV3JpdGVUb1N0ZGVycihjYWxsYmFjaykge1xuICAgIHJldHVybiB0aGlzLmVtaXR0ZXIub24oXCJkaWQtd3JpdGUtdG8tc3RkZXJyXCIsIGNhbGxiYWNrKVxuICB9XG5cbiAgZGVzdHJveSgpIHtcbiAgICB0aGlzLmVtaXR0ZXIuZGlzcG9zZSgpXG4gIH1cblxuICBnZXRDd2QoKSB7XG4gICAgbGV0IGN3ZCA9IHRoaXMuc2NyaXB0T3B0aW9ucy53b3JraW5nRGlyZWN0b3J5XG5cbiAgICBpZiAoIWN3ZCkge1xuICAgICAgc3dpdGNoIChhdG9tLmNvbmZpZy5nZXQoXCJzY3JpcHQuY3dkQmVoYXZpb3JcIikpIHtcbiAgICAgICAgY2FzZSBcIkZpcnN0IHByb2plY3QgZGlyZWN0b3J5XCI6IHtcbiAgICAgICAgICBjb25zdCBwYXRocyA9IGF0b20ucHJvamVjdC5nZXRQYXRocygpXG4gICAgICAgICAgaWYgKHBhdGhzICYmIHBhdGhzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgIGN3ZCA9IGZzLnN0YXRTeW5jKHBhdGhzWzBdKS5pc0RpcmVjdG9yeSgpID8gcGF0aHNbMF0gOiBwYXRoLmpvaW4ocGF0aHNbMF0sIFwiLi5cIilcbiAgICAgICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICAgIC8qIERvbid0IHRocm93ICovXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrXG4gICAgICAgIH1cbiAgICAgICAgY2FzZSBcIlByb2plY3QgZGlyZWN0b3J5IG9mIHRoZSBzY3JpcHRcIjoge1xuICAgICAgICAgIGN3ZCA9IHRoaXMuZ2V0UHJvamVjdFBhdGgoKVxuICAgICAgICAgIGJyZWFrXG4gICAgICAgIH1cbiAgICAgICAgY2FzZSBcIkRpcmVjdG9yeSBvZiB0aGUgc2NyaXB0XCI6IHtcbiAgICAgICAgICBjb25zdCBwYW5lID0gYXRvbS53b3Jrc3BhY2UuZ2V0QWN0aXZlUGFuZUl0ZW0oKVxuICAgICAgICAgIGN3ZCA9XG4gICAgICAgICAgICAocGFuZSAmJlxuICAgICAgICAgICAgICBwYW5lLmJ1ZmZlciAmJlxuICAgICAgICAgICAgICBwYW5lLmJ1ZmZlci5maWxlICYmXG4gICAgICAgICAgICAgIHBhbmUuYnVmZmVyLmZpbGUuZ2V0UGFyZW50ICYmXG4gICAgICAgICAgICAgIHBhbmUuYnVmZmVyLmZpbGUuZ2V0UGFyZW50KCkgJiZcbiAgICAgICAgICAgICAgcGFuZS5idWZmZXIuZmlsZS5nZXRQYXJlbnQoKS5nZXRQYXRoICYmXG4gICAgICAgICAgICAgIHBhbmUuYnVmZmVyLmZpbGUuZ2V0UGFyZW50KCkuZ2V0UGF0aCgpKSB8fFxuICAgICAgICAgICAgXCJcIlxuICAgICAgICAgIGJyZWFrXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGN3ZFxuICB9XG5cbiAgc3RvcCgpIHtcbiAgICBpZiAodGhpcy5idWZmZXJlZFByb2Nlc3MpIHtcbiAgICAgIHRoaXMuYnVmZmVyZWRQcm9jZXNzLmtpbGwoKVxuICAgICAgdGhpcy5idWZmZXJlZFByb2Nlc3MgPSBudWxsXG4gICAgfVxuICB9XG5cbiAgb25FeGl0KHJldHVybkNvZGUpIHtcbiAgICB0aGlzLmJ1ZmZlcmVkUHJvY2VzcyA9IG51bGxcbiAgICBsZXQgZXhlY3V0aW9uVGltZVxuXG4gICAgaWYgKGF0b20uY29uZmlnLmdldChcInNjcmlwdC5lbmFibGVFeGVjVGltZVwiKSA9PT0gdHJ1ZSAmJiB0aGlzLnN0YXJ0VGltZSkge1xuICAgICAgZXhlY3V0aW9uVGltZSA9IChuZXcgRGF0ZSgpLmdldFRpbWUoKSAtIHRoaXMuc3RhcnRUaW1lLmdldFRpbWUoKSkgLyAxMDAwXG4gICAgfVxuXG4gICAgdGhpcy5lbWl0dGVyLmVtaXQoXCJkaWQtZXhpdFwiLCB7IGV4ZWN1dGlvblRpbWUsIHJldHVybkNvZGUgfSlcbiAgfVxuXG4gIG9uRGlkRXhpdChjYWxsYmFjaykge1xuICAgIHJldHVybiB0aGlzLmVtaXR0ZXIub24oXCJkaWQtZXhpdFwiLCBjYWxsYmFjaylcbiAgfVxuXG4gIGNyZWF0ZU9uRXJyb3JGdW5jKGNvbW1hbmQpIHtcbiAgICByZXR1cm4gKG5vZGVFcnJvcikgPT4ge1xuICAgICAgdGhpcy5idWZmZXJlZFByb2Nlc3MgPSBudWxsXG4gICAgICB0aGlzLmVtaXR0ZXIuZW1pdChcImRpZC1ub3QtcnVuXCIsIHsgY29tbWFuZCB9KVxuICAgICAgbm9kZUVycm9yLmhhbmRsZSgpXG4gICAgfVxuICB9XG5cbiAgb25EaWROb3RSdW4oY2FsbGJhY2spIHtcbiAgICByZXR1cm4gdGhpcy5lbWl0dGVyLm9uKFwiZGlkLW5vdC1ydW5cIiwgY2FsbGJhY2spXG4gIH1cblxuICBvcHRpb25zKCkge1xuICAgIHJldHVybiB7XG4gICAgICBjd2Q6IHRoaXMuZ2V0Q3dkKCksXG4gICAgICBlbnY6IHRoaXMuc2NyaXB0T3B0aW9ucy5tZXJnZWRFbnYocHJvY2Vzcy5lbnYpLFxuICAgIH1cbiAgfVxuXG4gIGZpbGxWYXJzSW5BcmcoYXJnLCBjb2RlQ29udGV4dCwgcHJvamVjdFBhdGgpIHtcbiAgICBpZiAoY29kZUNvbnRleHQuZmlsZXBhdGgpIHtcbiAgICAgIGFyZyA9IGFyZy5yZXBsYWNlKC97RklMRV9BQ1RJVkV9L2csIGNvZGVDb250ZXh0LmZpbGVwYXRoKVxuICAgICAgYXJnID0gYXJnLnJlcGxhY2UoL3tGSUxFX0FDVElWRV9QQVRIfS9nLCBwYXRoLmpvaW4oY29kZUNvbnRleHQuZmlsZXBhdGgsIFwiLi5cIikpXG4gICAgfVxuICAgIGlmIChjb2RlQ29udGV4dC5maWxlbmFtZSkge1xuICAgICAgYXJnID0gYXJnLnJlcGxhY2UoL3tGSUxFX0FDVElWRV9OQU1FfS9nLCBjb2RlQ29udGV4dC5maWxlbmFtZSlcbiAgICAgIGFyZyA9IGFyZy5yZXBsYWNlKFxuICAgICAgICAve0ZJTEVfQUNUSVZFX05BTUVfQkFTRX0vZyxcbiAgICAgICAgcGF0aC5iYXNlbmFtZShjb2RlQ29udGV4dC5maWxlbmFtZSwgcGF0aC5leHRuYW1lKGNvZGVDb250ZXh0LmZpbGVuYW1lKSlcbiAgICAgIClcbiAgICB9XG4gICAgaWYgKHByb2plY3RQYXRoKSB7XG4gICAgICBhcmcgPSBhcmcucmVwbGFjZSgve1BST0pFQ1RfUEFUSH0vZywgcHJvamVjdFBhdGgpXG4gICAgfVxuXG4gICAgcmV0dXJuIGFyZ1xuICB9XG5cbiAgYXJncyhjb2RlQ29udGV4dCwgZXh0cmFBcmdzKSB7XG4gICAgLy8gZXh0cmFBcmdzID0gZGVmYXVsdCBjb21tYW5kIGFyZ3MgZnJvbTpcbiAgICAvLyAtIHRoZSBncmFtbWFycy88Z3JhbW1hcj4uanMgZmlsZVxuXG4gICAgLy8gY21kQXJncyA9IGN1c3RvbWVkIGNvbW1hbmQgYXJncyBmcm9tOlxuICAgIC8vIC0gYSB1c2VyJ3MgcHJvZmlsXG4gICAgLy8gLSB0aGUgJ0NvbmZpZ3VyZSBSdW4gT3B0aW9ucycgcGFuZWxcbiAgICBjb25zdCB7IGNtZEFyZ3MgfSA9IHRoaXMuc2NyaXB0T3B0aW9uc1xuXG4gICAgLy8gTGV0J3Mgb3ZlcmRyaXZlIHRoZSBkZWZhdWx0IGFyZ3Mgd2l0aCB0aGUgY3VzdG9tZWQgb25lc1xuICAgIGxldCBhcmdzID0gY21kQXJncy5sZW5ndGggPyBjbWRBcmdzIDogZXh0cmFBcmdzXG5cbiAgICAvLyBEbyBub3QgZm9yZ2V0IHRvIGNvbmNhdCB0aGUgc2NyaXB0IGFyZ3MgYWZ0ZXIgdGhlIGNvbW1hbmQgYXJnc1xuICAgIGNvbnN0IHsgc2NyaXB0QXJncyB9ID0gdGhpcy5zY3JpcHRPcHRpb25zXG4gICAgYXJncyA9IGFyZ3MuY29uY2F0KHNjcmlwdEFyZ3MpXG5cbiAgICBjb25zdCBwcm9qZWN0UGF0aCA9IHRoaXMuZ2V0UHJvamVjdFBhdGggfHwgXCJcIlxuICAgIGFyZ3MgPSBhcmdzLm1hcCgoYXJnKSA9PiB7XG4gICAgICBpZiAodHlwZW9mIGFyZyAhPT0gXCJzdHJpbmdcIikge1xuICAgICAgICAvLyBUT0RPIHdoeSB0aGlzIGhhcHBlbnM/IC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9hdG9tLWNvbW11bml0eS9hdG9tLXNjcmlwdC9pc3N1ZXMvMjA4MlxuICAgICAgICBhcmcgPSBcIlwiXG4gICAgICB9XG4gICAgICByZXR1cm4gdGhpcy5maWxsVmFyc0luQXJnKGFyZywgY29kZUNvbnRleHQsIHByb2plY3RQYXRoKVxuICAgIH0pXG5cbiAgICBpZiAoIXRoaXMuc2NyaXB0T3B0aW9ucy5jbWQpIHtcbiAgICAgIGFyZ3MgPSBjb2RlQ29udGV4dC5zaGViYW5nQ29tbWFuZEFyZ3MoKS5jb25jYXQoYXJncylcbiAgICB9XG4gICAgcmV0dXJuIGFyZ3NcbiAgfVxuXG4gIGdldFByb2plY3RQYXRoKCkge1xuICAgIGNvbnN0IGZpbGVQYXRoID0gYXRvbS53b3Jrc3BhY2UuZ2V0QWN0aXZlVGV4dEVkaXRvcigpLmdldFBhdGgoKVxuICAgIGNvbnN0IHByb2plY3RQYXRocyA9IGF0b20ucHJvamVjdC5nZXRQYXRocygpXG4gICAgZm9yIChjb25zdCBwcm9qZWN0UGF0aCBvZiBwcm9qZWN0UGF0aHMpIHtcbiAgICAgIGlmIChmaWxlUGF0aC5pbmRleE9mKHByb2plY3RQYXRoKSA+IC0xKSB7XG4gICAgICAgIGlmIChmcy5zdGF0U3luYyhwcm9qZWN0UGF0aCkuaXNEaXJlY3RvcnkoKSkge1xuICAgICAgICAgIHJldHVybiBwcm9qZWN0UGF0aFxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBwYXRoLmpvaW4ocHJvamVjdFBhdGgsIFwiLi5cIilcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG51bGxcbiAgfVxufVxuIl19