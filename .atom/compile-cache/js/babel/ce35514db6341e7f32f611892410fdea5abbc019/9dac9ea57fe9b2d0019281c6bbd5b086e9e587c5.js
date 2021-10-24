Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _atom = require("atom");

var _underscore = require("underscore");

var _underscore2 = _interopRequireDefault(_underscore);

var _commandContext = require("./command-context");

var _commandContext2 = _interopRequireDefault(_commandContext);

"use babel";

var Runtime = (function () {
  // Public: Initializes a new {Runtime} instance
  //
  // This class is responsible for properly configuring {Runner}

  function Runtime(runner, codeContextBuilder) {
    var _this = this;

    var observers = arguments.length <= 2 || arguments[2] === undefined ? [] : arguments[2];

    _classCallCheck(this, Runtime);

    this.runner = runner;
    this.codeContextBuilder = codeContextBuilder;
    this.observers = observers;
    this.emitter = new _atom.Emitter();
    this.scriptOptions = this.runner.scriptOptions;
    _underscore2["default"].each(this.observers, function (observer) {
      return observer.observe(_this);
    });
  }

  // Public: Adds a new observer and asks it to listen for {Runner} events
  //
  // An observer should have two methods:
  // * `observe(runtime)` - in which you can subscribe to {Runtime} events
  // (see {ViewRuntimeObserver} for what you are expected to handle)
  // * `destroy` - where you can do your cleanup

  _createClass(Runtime, [{
    key: "addObserver",
    value: function addObserver(observer) {
      this.observers.push(observer);
      observer.observe(this);
    }

    // Public: disposes dependencies
    //
    // This should be called when you no longer need to use this class
  }, {
    key: "destroy",
    value: function destroy() {
      this.stop();
      this.runner.destroy();
      _underscore2["default"].each(this.observers, function (observer) {
        return observer.destroy();
      });
      this.emitter.dispose();
      this.codeContextBuilder.destroy();
    }

    // Public: Executes code
    //
    // argType (Optional) - {String} One of the three:
    // * "Selection Based" (default)
    // * "Line Number Based"
    // * "File Based"
    // input (Optional) - {String} that'll be provided to the `stdin` of the new process
  }, {
    key: "execute",
    value: function execute() {
      var argType = arguments.length <= 0 || arguments[0] === undefined ? "Selection Based" : arguments[0];
      var input = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];
      var options = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];

      if (atom.config.get("script.stopOnRerun")) {
        this.stop();
      }
      this.emitter.emit("start");

      var codeContext = this.codeContextBuilder.buildCodeContext(atom.workspace.getActiveTextEditor(), argType);

      // In the future we could handle a runner without the language being part
      // of the grammar map, using the options runner
      if (!codeContext || !codeContext.lang) {
        return;
      }

      var executionOptions = !options ? this.scriptOptions : options;
      var commandContext = _commandContext2["default"].build(this, executionOptions, codeContext);

      if (!commandContext) {
        return;
      }

      if (commandContext.workingDirectory) {
        executionOptions.workingDirectory = commandContext.workingDirectory;
      }

      this.emitter.emit("did-context-create", {
        lang: codeContext.lang,
        filename: codeContext.filename,
        lineNumber: codeContext.lineNumber
      });

      this.runner.scriptOptions = executionOptions;
      this.runner.run(commandContext.command, commandContext.args, codeContext, input);
      this.emitter.emit("started", commandContext);
    }

    // Public: stops execution of the current fork
  }, {
    key: "stop",
    value: function stop() {
      this.emitter.emit("stop");
      this.runner.stop();
      this.emitter.emit("stopped");
    }

    // Public: Dispatched when the execution is starting
  }, {
    key: "onStart",
    value: function onStart(callback) {
      return this.emitter.on("start", callback);
    }

    // Public: Dispatched when the execution is started
  }, {
    key: "onStarted",
    value: function onStarted(callback) {
      return this.emitter.on("started", callback);
    }

    // Public: Dispatched when the execution is stopping
  }, {
    key: "onStop",
    value: function onStop(callback) {
      return this.emitter.on("stop", callback);
    }

    // Public: Dispatched when the execution is stopped
  }, {
    key: "onStopped",
    value: function onStopped(callback) {
      return this.emitter.on("stopped", callback);
    }

    // Public: Dispatched when the language is not specified
  }, {
    key: "onDidNotSpecifyLanguage",
    value: function onDidNotSpecifyLanguage(callback) {
      return this.codeContextBuilder.onDidNotSpecifyLanguage(callback);
    }

    // Public: Dispatched when the language is not supported
    // lang  - {String} with the language name
  }, {
    key: "onDidNotSupportLanguage",
    value: function onDidNotSupportLanguage(callback) {
      return this.codeContextBuilder.onDidNotSupportLanguage(callback);
    }

    // Public: Dispatched when the mode is not supported
    // lang  - {String} with the language name
    // argType  - {String} with the run mode specified
  }, {
    key: "onDidNotSupportMode",
    value: function onDidNotSupportMode(callback) {
      return this.emitter.on("did-not-support-mode", callback);
    }

    // Public: Dispatched when building run arguments resulted in an error
    // error - {Error}
  }, {
    key: "onDidNotBuildArgs",
    value: function onDidNotBuildArgs(callback) {
      return this.emitter.on("did-not-build-args", callback);
    }

    // Public: Dispatched when the {CodeContext} is successfully created
    // lang  - {String} with the language name
    // filename  - {String} with the filename
    // lineNumber  - {Number} with the line number (may be null)
  }, {
    key: "onDidContextCreate",
    value: function onDidContextCreate(callback) {
      return this.emitter.on("did-context-create", callback);
    }

    // Public: Dispatched when the process you run writes something to stdout
    // message - {String} with the output
  }, {
    key: "onDidWriteToStdout",
    value: function onDidWriteToStdout(callback) {
      return this.runner.onDidWriteToStdout(callback);
    }

    // Public: Dispatched when the process you run writes something to stderr
    // message - {String} with the output
  }, {
    key: "onDidWriteToStderr",
    value: function onDidWriteToStderr(callback) {
      return this.runner.onDidWriteToStderr(callback);
    }

    // Public: Dispatched when the process you run exits
    // returnCode  - {Number} with the process' exit code
    // executionTime  - {Number} with the process' exit code
  }, {
    key: "onDidExit",
    value: function onDidExit(callback) {
      return this.runner.onDidExit(callback);
    }

    // Public: Dispatched when the code you run did not manage to run
    // command - {String} with the run command
  }, {
    key: "onDidNotRun",
    value: function onDidNotRun(callback) {
      return this.runner.onDidNotRun(callback);
    }
  }, {
    key: "modeNotSupported",
    value: function modeNotSupported(argType, lang) {
      this.emitter.emit("did-not-support-mode", { argType: argType, lang: lang });
    }
  }, {
    key: "didNotBuildArgs",
    value: function didNotBuildArgs(error) {
      this.emitter.emit("did-not-build-args", { error: error });
    }
  }]);

  return Runtime;
})();

exports["default"] = Runtime;
module.exports = exports["default"];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZpbGU6Ly8vQzovVXNlcnMvY2tuanUvLmF0b20vcGFja2FnZXMvc2NyaXB0L2xpYi9ydW50aW1lLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7b0JBRXdCLE1BQU07OzBCQUVoQixZQUFZOzs7OzhCQUVDLG1CQUFtQjs7OztBQU45QyxXQUFXLENBQUE7O0lBUVUsT0FBTzs7Ozs7QUFJZixXQUpRLE9BQU8sQ0FJZCxNQUFNLEVBQUUsa0JBQWtCLEVBQWtCOzs7UUFBaEIsU0FBUyx5REFBRyxFQUFFOzswQkFKbkMsT0FBTzs7QUFLeEIsUUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUE7QUFDcEIsUUFBSSxDQUFDLGtCQUFrQixHQUFHLGtCQUFrQixDQUFBO0FBQzVDLFFBQUksQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFBO0FBQzFCLFFBQUksQ0FBQyxPQUFPLEdBQUcsbUJBQWEsQ0FBQTtBQUM1QixRQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFBO0FBQzlDLDRCQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLFVBQUMsUUFBUTthQUFLLFFBQVEsQ0FBQyxPQUFPLE9BQU07S0FBQSxDQUFDLENBQUE7R0FDN0Q7Ozs7Ozs7OztlQVhrQixPQUFPOztXQW1CZixxQkFBQyxRQUFRLEVBQUU7QUFDcEIsVUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUE7QUFDN0IsY0FBUSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQTtLQUN2Qjs7Ozs7OztXQUtNLG1CQUFHO0FBQ1IsVUFBSSxDQUFDLElBQUksRUFBRSxDQUFBO0FBQ1gsVUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsQ0FBQTtBQUNyQiw4QkFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxVQUFDLFFBQVE7ZUFBSyxRQUFRLENBQUMsT0FBTyxFQUFFO09BQUEsQ0FBQyxDQUFBO0FB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QkFBQyxLQUFLLEVBQUU7QUFDckIsVUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsb0JBQW9CLEVBQUUsRUFBRSxLQUFLLEVBQUwsS0FBSyxFQUFFLENBQUMsQ0FBQTtLQUNuRDs7O1NBeEtrQixPQUFPOzs7cUJBQVAsT0FBTyIsImZpbGUiOiJmaWxlOi8vL0M6L1VzZXJzL2Nrbmp1Ly5hdG9tL3BhY2thZ2VzL3NjcmlwdC9saWIvcnVudGltZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIlwidXNlIGJhYmVsXCJcblxuaW1wb3J0IHsgRW1pdHRlciB9IGZyb20gXCJhdG9tXCJcblxuaW1wb3J0IF8gZnJvbSBcInVuZGVyc2NvcmVcIlxuXG5pbXBvcnQgQ29tbWFuZENvbnRleHQgZnJvbSBcIi4vY29tbWFuZC1jb250ZXh0XCJcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUnVudGltZSB7XG4gIC8vIFB1YmxpYzogSW5pdGlhbGl6ZXMgYSBuZXcge1J1bnRpbWV9IGluc3RhbmNlXG4gIC8vXG4gIC8vIFRoaXMgY2xhc3MgaXMgcmVzcG9uc2libGUgZm9yIHByb3Blcmx5IGNvbmZpZ3VyaW5nIHtSdW5uZXJ9XG4gIGNvbnN0cnVjdG9yKHJ1bm5lciwgY29kZUNvbnRleHRCdWlsZGVyLCBvYnNlcnZlcnMgPSBbXSkge1xuICAgIHRoaXMucnVubmVyID0gcnVubmVyXG4gICAgdGhpcy5jb2RlQ29udGV4dEJ1aWxkZXIgPSBjb2RlQ29udGV4dEJ1aWxkZXJcbiAgICB0aGlzLm9ic2VydmVycyA9IG9ic2VydmVyc1xuICAgIHRoaXMuZW1pdHRlciA9IG5ldyBFbWl0dGVyKClcbiAgICB0aGlzLnNjcmlwdE9wdGlvbnMgPSB0aGlzLnJ1bm5lci5zY3JpcHRPcHRpb25zXG4gICAgXy5lYWNoKHRoaXMub2JzZXJ2ZXJzLCAob2JzZXJ2ZXIpID0+IG9ic2VydmVyLm9ic2VydmUodGhpcykpXG4gIH1cblxuICAvLyBQdWJsaWM6IEFkZHMgYSBuZXcgb2JzZXJ2ZXIgYW5kIGFza3MgaXQgdG8gbGlzdGVuIGZvciB7UnVubmVyfSBldmVudHNcbiAgLy9cbiAgLy8gQW4gb2JzZXJ2ZXIgc2hvdWxkIGhhdmUgdHdvIG1ldGhvZHM6XG4gIC8vICogYG9ic2VydmUocnVudGltZSlgIC0gaW4gd2hpY2ggeW91IGNhbiBzdWJzY3JpYmUgdG8ge1J1bnRpbWV9IGV2ZW50c1xuICAvLyAoc2VlIHtWaWV3UnVudGltZU9ic2VydmVyfSBmb3Igd2hhdCB5b3UgYXJlIGV4cGVjdGVkIHRvIGhhbmRsZSlcbiAgLy8gKiBgZGVzdHJveWAgLSB3aGVyZSB5b3UgY2FuIGRvIHlvdXIgY2xlYW51cFxuICBhZGRPYnNlcnZlcihvYnNlcnZlcikge1xuICAgIHRoaXMub2JzZXJ2ZXJzLnB1c2gob2JzZXJ2ZXIpXG4gICAgb2JzZXJ2ZXIub2JzZXJ2ZSh0aGlzKVxuICB9XG5cbiAgLy8gUHVibGljOiBkaXNwb3NlcyBkZXBlbmRlbmNpZXNcbiAgLy9cbiAgLy8gVGhpcyBzaG91bGQgYmUgY2FsbGVkIHdoZW4geW91IG5vIGxvbmdlciBuZWVkIHRvIHVzZSB0aGlzIGNsYXNzXG4gIGRlc3Ryb3koKSB7XG4gICAgdGhpcy5zdG9wKClcbiAgICB0aGlzLnJ1bm5lci5kZXN0cm95KClcbiAgICBfLmVhY2godGhpcy5vYnNlcnZlcnMsIChvYnNlcnZlcikgPT4gb2JzZXJ2ZXIuZGVzdHJveSgpKVxuICAgIHRoaXMuZW1pdHRlci5kaXNwb3NlKClcbiAgICB0aGlzLmNvZGVDb250ZXh0QnVpbGRlci5kZXN0cm95KClcbiAgfVxuXG4gIC8vIFB1YmxpYzogRXhlY3V0ZXMgY29kZVxuICAvL1xuICAvLyBhcmdUeXBlIChPcHRpb25hbCkgLSB7U3RyaW5nfSBPbmUgb2YgdGhlIHRocmVlOlxuICAvLyAqIFwiU2VsZWN0aW9uIEJhc2VkXCIgKGRlZmF1bHQpXG4gIC8vICogXCJMaW5lIE51bWJlciBCYXNlZFwiXG4gIC8vICogXCJGaWxlIEJhc2VkXCJcbiAgLy8gaW5wdXQgKE9wdGlvbmFsKSAtIHtTdHJpbmd9IHRoYXQnbGwgYmUgcHJvdmlkZWQgdG8gdGhlIGBzdGRpbmAgb2YgdGhlIG5ldyBwcm9jZXNzXG4gIGV4ZWN1dGUoYXJnVHlwZSA9IFwiU2VsZWN0aW9uIEJhc2VkXCIsIGlucHV0ID0gbnVsbCwgb3B0aW9ucyA9IG51bGwpIHtcbiAgICBpZiAoYXRvbS5jb25maWcuZ2V0KFwic2NyaXB0LnN0b3BPblJlcnVuXCIpKSB7XG4gICAgICB0aGlzLnN0b3AoKVxuICAgIH1cbiAgICB0aGlzLmVtaXR0ZXIuZW1pdChcInN0YXJ0XCIpXG5cbiAgICBjb25zdCBjb2RlQ29udGV4dCA9IHRoaXMuY29kZUNvbnRleHRCdWlsZGVyLmJ1aWxkQ29kZUNvbnRleHQoYXRvbS53b3Jrc3BhY2UuZ2V0QWN0aXZlVGV4dEVkaXRvcigpLCBhcmdUeXBlKVxuXG4gICAgLy8gSW4gdGhlIGZ1dHVyZSB3ZSBjb3VsZCBoYW5kbGUgYSBydW5uZXIgd2l0aG91dCB0aGUgbGFuZ3VhZ2UgYmVpbmcgcGFydFxuICAgIC8vIG9mIHRoZSBncmFtbWFyIG1hcCwgdXNpbmcgdGhlIG9wdGlvbnMgcnVubmVyXG4gICAgaWYgKCFjb2RlQ29udGV4dCB8fCAhY29kZUNvbnRleHQubGFuZykge1xuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgY29uc3QgZXhlY3V0aW9uT3B0aW9ucyA9ICFvcHRpb25zID8gdGhpcy5zY3JpcHRPcHRpb25zIDogb3B0aW9uc1xuICAgIGNvbnN0IGNvbW1hbmRDb250ZXh0ID0gQ29tbWFuZENvbnRleHQuYnVpbGQodGhpcywgZXhlY3V0aW9uT3B0aW9ucywgY29kZUNvbnRleHQpXG5cbiAgICBpZiAoIWNvbW1hbmRDb250ZXh0KSB7XG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICBpZiAoY29tbWFuZENvbnRleHQud29ya2luZ0RpcmVjdG9yeSkge1xuICAgICAgZXhlY3V0aW9uT3B0aW9ucy53b3JraW5nRGlyZWN0b3J5ID0gY29tbWFuZENvbnRleHQud29ya2luZ0RpcmVjdG9yeVxuICAgIH1cblxuICAgIHRoaXMuZW1pdHRlci5lbWl0KFwiZGlkLWNvbnRleHQtY3JlYXRlXCIsIHtcbiAgICAgIGxhbmc6IGNvZGVDb250ZXh0LmxhbmcsXG4gICAgICBmaWxlbmFtZTogY29kZUNvbnRleHQuZmlsZW5hbWUsXG4gICAgICBsaW5lTnVtYmVyOiBjb2RlQ29udGV4dC5saW5lTnVtYmVyLFxuICAgIH0pXG5cbiAgICB0aGlzLnJ1bm5lci5zY3JpcHRPcHRpb25zID0gZXhlY3V0aW9uT3B0aW9uc1xuICAgIHRoaXMucnVubmVyLnJ1bihjb21tYW5kQ29udGV4dC5jb21tYW5kLCBjb21tYW5kQ29udGV4dC5hcmdzLCBjb2RlQ29udGV4dCwgaW5wdXQpXG4gICAgdGhpcy5lbWl0dGVyLmVtaXQoXCJzdGFydGVkXCIsIGNvbW1hbmRDb250ZXh0KVxuICB9XG5cbiAgLy8gUHVibGljOiBzdG9wcyBleGVjdXRpb24gb2YgdGhlIGN1cnJlbnQgZm9ya1xuICBzdG9wKCkge1xuICAgIHRoaXMuZW1pdHRlci5lbWl0KFwic3RvcFwiKVxuICAgIHRoaXMucnVubmVyLnN0b3AoKVxuICAgIHRoaXMuZW1pdHRlci5lbWl0KFwic3RvcHBlZFwiKVxuICB9XG5cbiAgLy8gUHVibGljOiBEaXNwYXRjaGVkIHdoZW4gdGhlIGV4ZWN1dGlvbiBpcyBzdGFydGluZ1xuICBvblN0YXJ0KGNhbGxiYWNrKSB7XG4gICAgcmV0dXJuIHRoaXMuZW1pdHRlci5vbihcInN0YXJ0XCIsIGNhbGxiYWNrKVxuICB9XG5cbiAgLy8gUHVibGljOiBEaXNwYXRjaGVkIHdoZW4gdGhlIGV4ZWN1dGlvbiBpcyBzdGFydGVkXG4gIG9uU3RhcnRlZChjYWxsYmFjaykge1xuICAgIHJldHVybiB0aGlzLmVtaXR0ZXIub24oXCJzdGFydGVkXCIsIGNhbGxiYWNrKVxuICB9XG5cbiAgLy8gUHVibGljOiBEaXNwYXRjaGVkIHdoZW4gdGhlIGV4ZWN1dGlvbiBpcyBzdG9wcGluZ1xuICBvblN0b3AoY2FsbGJhY2spIHtcbiAgICByZXR1cm4gdGhpcy5lbWl0dGVyLm9uKFwic3RvcFwiLCBjYWxsYmFjaylcbiAgfVxuXG4gIC8vIFB1YmxpYzogRGlzcGF0Y2hlZCB3aGVuIHRoZSBleGVjdXRpb24gaXMgc3RvcHBlZFxuICBvblN0b3BwZWQoY2FsbGJhY2spIHtcbiAgICByZXR1cm4gdGhpcy5lbWl0dGVyLm9uKFwic3RvcHBlZFwiLCBjYWxsYmFjaylcbiAgfVxuXG4gIC8vIFB1YmxpYzogRGlzcGF0Y2hlZCB3aGVuIHRoZSBsYW5ndWFnZSBpcyBub3Qgc3BlY2lmaWVkXG4gIG9uRGlkTm90U3BlY2lmeUxhbmd1YWdlKGNhbGxiYWNrKSB7XG4gICAgcmV0dXJuIHRoaXMuY29kZUNvbnRleHRCdWlsZGVyLm9uRGlkTm90U3BlY2lmeUxhbmd1YWdlKGNhbGxiYWNrKVxuICB9XG5cbiAgLy8gUHVibGljOiBEaXNwYXRjaGVkIHdoZW4gdGhlIGxhbmd1YWdlIGlzIG5vdCBzdXBwb3J0ZWRcbiAgLy8gbGFuZyAgLSB7U3RyaW5nfSB3aXRoIHRoZSBsYW5ndWFnZSBuYW1lXG4gIG9uRGlkTm90U3VwcG9ydExhbmd1YWdlKGNhbGxiYWNrKSB7XG4gICAgcmV0dXJuIHRoaXMuY29kZUNvbnRleHRCdWlsZGVyLm9uRGlkTm90U3VwcG9ydExhbmd1YWdlKGNhbGxiYWNrKVxuICB9XG5cbiAgLy8gUHVibGljOiBEaXNwYXRjaGVkIHdoZW4gdGhlIG1vZGUgaXMgbm90IHN1cHBvcnRlZFxuICAvLyBsYW5nICAtIHtTdHJpbmd9IHdpdGggdGhlIGxhbmd1YWdlIG5hbWVcbiAgLy8gYXJnVHlwZSAgLSB7U3RyaW5nfSB3aXRoIHRoZSBydW4gbW9kZSBzcGVjaWZpZWRcbiAgb25EaWROb3RTdXBwb3J0TW9kZShjYWxsYmFjaykge1xuICAgIHJldHVybiB0aGlzLmVtaXR0ZXIub24oXCJkaWQtbm90LXN1cHBvcnQtbW9kZVwiLCBjYWxsYmFjaylcbiAgfVxuXG4gIC8vIFB1YmxpYzogRGlzcGF0Y2hlZCB3aGVuIGJ1aWxkaW5nIHJ1biBhcmd1bWVudHMgcmVzdWx0ZWQgaW4gYW4gZXJyb3JcbiAgLy8gZXJyb3IgLSB7RXJyb3J9XG4gIG9uRGlkTm90QnVpbGRBcmdzKGNhbGxiYWNrKSB7XG4gICAgcmV0dXJuIHRoaXMuZW1pdHRlci5vbihcImRpZC1ub3QtYnVpbGQtYXJnc1wiLCBjYWxsYmFjaylcbiAgfVxuXG4gIC8vIFB1YmxpYzogRGlzcGF0Y2hlZCB3aGVuIHRoZSB7Q29kZUNvbnRleHR9IGlzIHN1Y2Nlc3NmdWxseSBjcmVhdGVkXG4gIC8vIGxhbmcgIC0ge1N0cmluZ30gd2l0aCB0aGUgbGFuZ3VhZ2UgbmFtZVxuICAvLyBmaWxlbmFtZSAgLSB7U3RyaW5nfSB3aXRoIHRoZSBmaWxlbmFtZVxuICAvLyBsaW5lTnVtYmVyICAtIHtOdW1iZXJ9IHdpdGggdGhlIGxpbmUgbnVtYmVyIChtYXkgYmUgbnVsbClcbiAgb25EaWRDb250ZXh0Q3JlYXRlKGNhbGxiYWNrKSB7XG4gICAgcmV0dXJuIHRoaXMuZW1pdHRlci5vbihcImRpZC1jb250ZXh0LWNyZWF0ZVwiLCBjYWxsYmFjaylcbiAgfVxuXG4gIC8vIFB1YmxpYzogRGlzcGF0Y2hlZCB3aGVuIHRoZSBwcm9jZXNzIHlvdSBydW4gd3JpdGVzIHNvbWV0aGluZyB0byBzdGRvdXRcbiAgLy8gbWVzc2FnZSAtIHtTdHJpbmd9IHdpdGggdGhlIG91dHB1dFxuICBvbkRpZFdyaXRlVG9TdGRvdXQoY2FsbGJhY2spIHtcbiAgICByZXR1cm4gdGhpcy5ydW5uZXIub25EaWRXcml0ZVRvU3Rkb3V0KGNhbGxiYWNrKVxuICB9XG5cbiAgLy8gUHVibGljOiBEaXNwYXRjaGVkIHdoZW4gdGhlIHByb2Nlc3MgeW91IHJ1biB3cml0ZXMgc29tZXRoaW5nIHRvIHN0ZGVyclxuICAvLyBtZXNzYWdlIC0ge1N0cmluZ30gd2l0aCB0aGUgb3V0cHV0XG4gIG9uRGlkV3JpdGVUb1N0ZGVycihjYWxsYmFjaykge1xuICAgIHJldHVybiB0aGlzLnJ1bm5lci5vbkRpZFdyaXRlVG9TdGRlcnIoY2FsbGJhY2spXG4gIH1cblxuICAvLyBQdWJsaWM6IERpc3BhdGNoZWQgd2hlbiB0aGUgcHJvY2VzcyB5b3UgcnVuIGV4aXRzXG4gIC8vIHJldHVybkNvZGUgIC0ge051bWJlcn0gd2l0aCB0aGUgcHJvY2VzcycgZXhpdCBjb2RlXG4gIC8vIGV4ZWN1dGlvblRpbWUgIC0ge051bWJlcn0gd2l0aCB0aGUgcHJvY2VzcycgZXhpdCBjb2RlXG4gIG9uRGlkRXhpdChjYWxsYmFjaykge1xuICAgIHJldHVybiB0aGlzLnJ1bm5lci5vbkRpZEV4aXQoY2FsbGJhY2spXG4gIH1cblxuICAvLyBQdWJsaWM6IERpc3BhdGNoZWQgd2hlbiB0aGUgY29kZSB5b3UgcnVuIGRpZCBub3QgbWFuYWdlIHRvIHJ1blxuICAvLyBjb21tYW5kIC0ge1N0cmluZ30gd2l0aCB0aGUgcnVuIGNvbW1hbmRcbiAgb25EaWROb3RSdW4oY2FsbGJhY2spIHtcbiAgICByZXR1cm4gdGhpcy5ydW5uZXIub25EaWROb3RSdW4oY2FsbGJhY2spXG4gIH1cblxuICBtb2RlTm90U3VwcG9ydGVkKGFyZ1R5cGUsIGxhbmcpIHtcbiAgICB0aGlzLmVtaXR0ZXIuZW1pdChcImRpZC1ub3Qtc3VwcG9ydC1tb2RlXCIsIHsgYXJnVHlwZSwgbGFuZyB9KVxuICB9XG5cbiAgZGlkTm90QnVpbGRBcmdzKGVycm9yKSB7XG4gICAgdGhpcy5lbWl0dGVyLmVtaXQoXCJkaWQtbm90LWJ1aWxkLWFyZ3NcIiwgeyBlcnJvciB9KVxuICB9XG59XG4iXX0=