Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _atom = require('atom');

var _underscore = require('underscore');

var _underscore2 = _interopRequireDefault(_underscore);

var _commandContext = require('./command-context');

var _commandContext2 = _interopRequireDefault(_commandContext);

'use babel';

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
    _underscore2['default'].each(this.observers, function (observer) {
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
    key: 'addObserver',
    value: function addObserver(observer) {
      this.observers.push(observer);
      observer.observe(this);
    }

    // Public: disposes dependencies
    //
    // This should be called when you no longer need to use this class
  }, {
    key: 'destroy',
    value: function destroy() {
      this.stop();
      this.runner.destroy();
      _underscore2['default'].each(this.observers, function (observer) {
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
    key: 'execute',
    value: function execute() {
      var argType = arguments.length <= 0 || arguments[0] === undefined ? 'Selection Based' : arguments[0];
      var input = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];
      var options = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];

      if (atom.config.get('script.stopOnRerun')) this.stop();
      this.emitter.emit('start');

      var codeContext = this.codeContextBuilder.buildCodeContext(atom.workspace.getActiveTextEditor(), argType);

      // In the future we could handle a runner without the language being part
      // of the grammar map, using the options runner
      if (!codeContext || !codeContext.lang) return;

      var executionOptions = !options ? this.scriptOptions : options;
      var commandContext = _commandContext2['default'].build(this, executionOptions, codeContext);

      if (!commandContext) return;

      if (commandContext.workingDirectory) {
        executionOptions.workingDirectory = commandContext.workingDirectory;
      }

      this.emitter.emit('did-context-create', {
        lang: codeContext.lang,
        filename: codeContext.filename,
        lineNumber: codeContext.lineNumber
      });

      this.runner.scriptOptions = executionOptions;
      this.runner.run(commandContext.command, commandContext.args, codeContext, input);
      this.emitter.emit('started', commandContext);
    }

    // Public: stops execution of the current fork
  }, {
    key: 'stop',
    value: function stop() {
      this.emitter.emit('stop');
      this.runner.stop();
      this.emitter.emit('stopped');
    }

    // Public: Dispatched when the execution is starting
  }, {
    key: 'onStart',
    value: function onStart(callback) {
      return this.emitter.on('start', callback);
    }

    // Public: Dispatched when the execution is started
  }, {
    key: 'onStarted',
    value: function onStarted(callback) {
      return this.emitter.on('started', callback);
    }

    // Public: Dispatched when the execution is stopping
  }, {
    key: 'onStop',
    value: function onStop(callback) {
      return this.emitter.on('stop', callback);
    }

    // Public: Dispatched when the execution is stopped
  }, {
    key: 'onStopped',
    value: function onStopped(callback) {
      return this.emitter.on('stopped', callback);
    }

    // Public: Dispatched when the language is not specified
  }, {
    key: 'onDidNotSpecifyLanguage',
    value: function onDidNotSpecifyLanguage(callback) {
      return this.codeContextBuilder.onDidNotSpecifyLanguage(callback);
    }

    // Public: Dispatched when the language is not supported
    // lang  - {String} with the language name
  }, {
    key: 'onDidNotSupportLanguage',
    value: function onDidNotSupportLanguage(callback) {
      return this.codeContextBuilder.onDidNotSupportLanguage(callback);
    }

    // Public: Dispatched when the mode is not supported
    // lang  - {String} with the language name
    // argType  - {String} with the run mode specified
  }, {
    key: 'onDidNotSupportMode',
    value: function onDidNotSupportMode(callback) {
      return this.emitter.on('did-not-support-mode', callback);
    }

    // Public: Dispatched when building run arguments resulted in an error
    // error - {Error}
  }, {
    key: 'onDidNotBuildArgs',
    value: function onDidNotBuildArgs(callback) {
      return this.emitter.on('did-not-build-args', callback);
    }

    // Public: Dispatched when the {CodeContext} is successfully created
    // lang  - {String} with the language name
    // filename  - {String} with the filename
    // lineNumber  - {Number} with the line number (may be null)
  }, {
    key: 'onDidContextCreate',
    value: function onDidContextCreate(callback) {
      return this.emitter.on('did-context-create', callback);
    }

    // Public: Dispatched when the process you run writes something to stdout
    // message - {String} with the output
  }, {
    key: 'onDidWriteToStdout',
    value: function onDidWriteToStdout(callback) {
      return this.runner.onDidWriteToStdout(callback);
    }

    // Public: Dispatched when the process you run writes something to stderr
    // message - {String} with the output
  }, {
    key: 'onDidWriteToStderr',
    value: function onDidWriteToStderr(callback) {
      return this.runner.onDidWriteToStderr(callback);
    }

    // Public: Dispatched when the process you run exits
    // returnCode  - {Number} with the process' exit code
    // executionTime  - {Number} with the process' exit code
  }, {
    key: 'onDidExit',
    value: function onDidExit(callback) {
      return this.runner.onDidExit(callback);
    }

    // Public: Dispatched when the code you run did not manage to run
    // command - {String} with the run command
  }, {
    key: 'onDidNotRun',
    value: function onDidNotRun(callback) {
      return this.runner.onDidNotRun(callback);
    }
  }, {
    key: 'modeNotSupported',
    value: function modeNotSupported(argType, lang) {
      this.emitter.emit('did-not-support-mode', { argType: argType, lang: lang });
    }
  }, {
    key: 'didNotBuildArgs',
    value: function didNotBuildArgs(error) {
      this.emitter.emit('did-not-build-args', { error: error });
    }
  }]);

  return Runtime;
})();

exports['default'] = Runtime;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZpbGU6Ly8vQzovVXNlcnMvY2tuanUvLmF0b20vcGFja2FnZXMvc2NyaXB0L2xpYi9ydW50aW1lLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7b0JBRXdCLE1BQU07OzBCQUVoQixZQUFZOzs7OzhCQUVDLG1CQUFtQjs7OztBQU45QyxXQUFXLENBQUM7O0lBUVMsT0FBTzs7Ozs7QUFJZixXQUpRLE9BQU8sQ0FJZCxNQUFNLEVBQUUsa0JBQWtCLEVBQWtCOzs7UUFBaEIsU0FBUyx5REFBRyxFQUFFOzswQkFKbkMsT0FBTzs7QUFLeEIsUUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7QUFDckIsUUFBSSxDQUFDLGtCQUFrQixHQUFHLGtCQUFrQixDQUFDO0FBQzdDLFFBQUksQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO0FBQzNCLFFBQUksQ0FBQyxPQUFPLEdBQUcsbUJBQWEsQ0FBQztBQUM3QixRQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDO0FBQy9DLDRCQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLFVBQUMsUUFBUTthQUFLLFFBQVEsQ0FBQyxPQUFPLE9BQU07S0FBQSxDQUFDLENBQUM7R0FDOUQ7Ozs7Ozs7OztlQVhrQixPQUFPOztXQW1CZixxQkFBQyxRQUFRLEVBQUU7QUFDcEIsVUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7QUFDOUIsY0FBUSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUN4Qjs7Ozs7OztXQUtNLG1CQUFHO0FBQ1IsVUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO0FBQ1osVUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsQ0FBQztBQUN0Qiw4QkFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxVQUFDLFFBQVE7ZUFBSyxRQUFRLENBQUMsT0FBTyxFQUFFO09BQUEsQ0FBQyxDQUFDO0FB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QyxPQUFPLENBQUMsSUFBSSxDQUFDLG9CQUFvQixFQUFFLEVBQUUsS0FBSyxFQUFMLEtBQUssRUFBRSxDQUFDLENBQUM7S0FDcEQ7OztTQXBLa0IsT0FBTzs7O3FCQUFQLE9BQU8iLCJmaWxlIjoiZmlsZTovLy9DOi9Vc2Vycy9ja25qdS8uYXRvbS9wYWNrYWdlcy9zY3JpcHQvbGliL3J1bnRpbWUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIGJhYmVsJztcblxuaW1wb3J0IHsgRW1pdHRlciB9IGZyb20gJ2F0b20nO1xuXG5pbXBvcnQgXyBmcm9tICd1bmRlcnNjb3JlJztcblxuaW1wb3J0IENvbW1hbmRDb250ZXh0IGZyb20gJy4vY29tbWFuZC1jb250ZXh0JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUnVudGltZSB7XG4gIC8vIFB1YmxpYzogSW5pdGlhbGl6ZXMgYSBuZXcge1J1bnRpbWV9IGluc3RhbmNlXG4gIC8vXG4gIC8vIFRoaXMgY2xhc3MgaXMgcmVzcG9uc2libGUgZm9yIHByb3Blcmx5IGNvbmZpZ3VyaW5nIHtSdW5uZXJ9XG4gIGNvbnN0cnVjdG9yKHJ1bm5lciwgY29kZUNvbnRleHRCdWlsZGVyLCBvYnNlcnZlcnMgPSBbXSkge1xuICAgIHRoaXMucnVubmVyID0gcnVubmVyO1xuICAgIHRoaXMuY29kZUNvbnRleHRCdWlsZGVyID0gY29kZUNvbnRleHRCdWlsZGVyO1xuICAgIHRoaXMub2JzZXJ2ZXJzID0gb2JzZXJ2ZXJzO1xuICAgIHRoaXMuZW1pdHRlciA9IG5ldyBFbWl0dGVyKCk7XG4gICAgdGhpcy5zY3JpcHRPcHRpb25zID0gdGhpcy5ydW5uZXIuc2NyaXB0T3B0aW9ucztcbiAgICBfLmVhY2godGhpcy5vYnNlcnZlcnMsIChvYnNlcnZlcikgPT4gb2JzZXJ2ZXIub2JzZXJ2ZSh0aGlzKSk7XG4gIH1cblxuICAvLyBQdWJsaWM6IEFkZHMgYSBuZXcgb2JzZXJ2ZXIgYW5kIGFza3MgaXQgdG8gbGlzdGVuIGZvciB7UnVubmVyfSBldmVudHNcbiAgLy9cbiAgLy8gQW4gb2JzZXJ2ZXIgc2hvdWxkIGhhdmUgdHdvIG1ldGhvZHM6XG4gIC8vICogYG9ic2VydmUocnVudGltZSlgIC0gaW4gd2hpY2ggeW91IGNhbiBzdWJzY3JpYmUgdG8ge1J1bnRpbWV9IGV2ZW50c1xuICAvLyAoc2VlIHtWaWV3UnVudGltZU9ic2VydmVyfSBmb3Igd2hhdCB5b3UgYXJlIGV4cGVjdGVkIHRvIGhhbmRsZSlcbiAgLy8gKiBgZGVzdHJveWAgLSB3aGVyZSB5b3UgY2FuIGRvIHlvdXIgY2xlYW51cFxuICBhZGRPYnNlcnZlcihvYnNlcnZlcikge1xuICAgIHRoaXMub2JzZXJ2ZXJzLnB1c2gob2JzZXJ2ZXIpO1xuICAgIG9ic2VydmVyLm9ic2VydmUodGhpcyk7XG4gIH1cblxuICAvLyBQdWJsaWM6IGRpc3Bvc2VzIGRlcGVuZGVuY2llc1xuICAvL1xuICAvLyBUaGlzIHNob3VsZCBiZSBjYWxsZWQgd2hlbiB5b3Ugbm8gbG9uZ2VyIG5lZWQgdG8gdXNlIHRoaXMgY2xhc3NcbiAgZGVzdHJveSgpIHtcbiAgICB0aGlzLnN0b3AoKTtcbiAgICB0aGlzLnJ1bm5lci5kZXN0cm95KCk7XG4gICAgXy5lYWNoKHRoaXMub2JzZXJ2ZXJzLCAob2JzZXJ2ZXIpID0+IG9ic2VydmVyLmRlc3Ryb3koKSk7XG4gICAgdGhpcy5lbWl0dGVyLmRpc3Bvc2UoKTtcbiAgICB0aGlzLmNvZGVDb250ZXh0QnVpbGRlci5kZXN0cm95KCk7XG4gIH1cblxuICAvLyBQdWJsaWM6IEV4ZWN1dGVzIGNvZGVcbiAgLy9cbiAgLy8gYXJnVHlwZSAoT3B0aW9uYWwpIC0ge1N0cmluZ30gT25lIG9mIHRoZSB0aHJlZTpcbiAgLy8gKiBcIlNlbGVjdGlvbiBCYXNlZFwiIChkZWZhdWx0KVxuICAvLyAqIFwiTGluZSBOdW1iZXIgQmFzZWRcIlxuICAvLyAqIFwiRmlsZSBCYXNlZFwiXG4gIC8vIGlucHV0IChPcHRpb25hbCkgLSB7U3RyaW5nfSB0aGF0J2xsIGJlIHByb3ZpZGVkIHRvIHRoZSBgc3RkaW5gIG9mIHRoZSBuZXcgcHJvY2Vzc1xuICBleGVjdXRlKGFyZ1R5cGUgPSAnU2VsZWN0aW9uIEJhc2VkJywgaW5wdXQgPSBudWxsLCBvcHRpb25zID0gbnVsbCkge1xuICAgIGlmIChhdG9tLmNvbmZpZy5nZXQoJ3NjcmlwdC5zdG9wT25SZXJ1bicpKSB0aGlzLnN0b3AoKTtcbiAgICB0aGlzLmVtaXR0ZXIuZW1pdCgnc3RhcnQnKTtcblxuICAgIGNvbnN0IGNvZGVDb250ZXh0ID0gdGhpcy5jb2RlQ29udGV4dEJ1aWxkZXIuYnVpbGRDb2RlQ29udGV4dChcbiAgICAgIGF0b20ud29ya3NwYWNlLmdldEFjdGl2ZVRleHRFZGl0b3IoKSwgYXJnVHlwZSxcbiAgICApO1xuXG4gICAgLy8gSW4gdGhlIGZ1dHVyZSB3ZSBjb3VsZCBoYW5kbGUgYSBydW5uZXIgd2l0aG91dCB0aGUgbGFuZ3VhZ2UgYmVpbmcgcGFydFxuICAgIC8vIG9mIHRoZSBncmFtbWFyIG1hcCwgdXNpbmcgdGhlIG9wdGlvbnMgcnVubmVyXG4gICAgaWYgKCFjb2RlQ29udGV4dCB8fCAhY29kZUNvbnRleHQubGFuZykgcmV0dXJuO1xuXG4gICAgY29uc3QgZXhlY3V0aW9uT3B0aW9ucyA9ICFvcHRpb25zID8gdGhpcy5zY3JpcHRPcHRpb25zIDogb3B0aW9ucztcbiAgICBjb25zdCBjb21tYW5kQ29udGV4dCA9IENvbW1hbmRDb250ZXh0LmJ1aWxkKHRoaXMsIGV4ZWN1dGlvbk9wdGlvbnMsIGNvZGVDb250ZXh0KTtcblxuICAgIGlmICghY29tbWFuZENvbnRleHQpIHJldHVybjtcblxuICAgIGlmIChjb21tYW5kQ29udGV4dC53b3JraW5nRGlyZWN0b3J5KSB7XG4gICAgICBleGVjdXRpb25PcHRpb25zLndvcmtpbmdEaXJlY3RvcnkgPSBjb21tYW5kQ29udGV4dC53b3JraW5nRGlyZWN0b3J5O1xuICAgIH1cblxuICAgIHRoaXMuZW1pdHRlci5lbWl0KCdkaWQtY29udGV4dC1jcmVhdGUnLCB7XG4gICAgICBsYW5nOiBjb2RlQ29udGV4dC5sYW5nLFxuICAgICAgZmlsZW5hbWU6IGNvZGVDb250ZXh0LmZpbGVuYW1lLFxuICAgICAgbGluZU51bWJlcjogY29kZUNvbnRleHQubGluZU51bWJlcixcbiAgICB9KTtcblxuICAgIHRoaXMucnVubmVyLnNjcmlwdE9wdGlvbnMgPSBleGVjdXRpb25PcHRpb25zO1xuICAgIHRoaXMucnVubmVyLnJ1bihjb21tYW5kQ29udGV4dC5jb21tYW5kLCBjb21tYW5kQ29udGV4dC5hcmdzLCBjb2RlQ29udGV4dCwgaW5wdXQpO1xuICAgIHRoaXMuZW1pdHRlci5lbWl0KCdzdGFydGVkJywgY29tbWFuZENvbnRleHQpO1xuICB9XG5cbiAgLy8gUHVibGljOiBzdG9wcyBleGVjdXRpb24gb2YgdGhlIGN1cnJlbnQgZm9ya1xuICBzdG9wKCkge1xuICAgIHRoaXMuZW1pdHRlci5lbWl0KCdzdG9wJyk7XG4gICAgdGhpcy5ydW5uZXIuc3RvcCgpO1xuICAgIHRoaXMuZW1pdHRlci5lbWl0KCdzdG9wcGVkJyk7XG4gIH1cblxuICAvLyBQdWJsaWM6IERpc3BhdGNoZWQgd2hlbiB0aGUgZXhlY3V0aW9uIGlzIHN0YXJ0aW5nXG4gIG9uU3RhcnQoY2FsbGJhY2spIHtcbiAgICByZXR1cm4gdGhpcy5lbWl0dGVyLm9uKCdzdGFydCcsIGNhbGxiYWNrKTtcbiAgfVxuXG4gIC8vIFB1YmxpYzogRGlzcGF0Y2hlZCB3aGVuIHRoZSBleGVjdXRpb24gaXMgc3RhcnRlZFxuICBvblN0YXJ0ZWQoY2FsbGJhY2spIHtcbiAgICByZXR1cm4gdGhpcy5lbWl0dGVyLm9uKCdzdGFydGVkJywgY2FsbGJhY2spO1xuICB9XG5cbiAgLy8gUHVibGljOiBEaXNwYXRjaGVkIHdoZW4gdGhlIGV4ZWN1dGlvbiBpcyBzdG9wcGluZ1xuICBvblN0b3AoY2FsbGJhY2spIHtcbiAgICByZXR1cm4gdGhpcy5lbWl0dGVyLm9uKCdzdG9wJywgY2FsbGJhY2spO1xuICB9XG5cbiAgLy8gUHVibGljOiBEaXNwYXRjaGVkIHdoZW4gdGhlIGV4ZWN1dGlvbiBpcyBzdG9wcGVkXG4gIG9uU3RvcHBlZChjYWxsYmFjaykge1xuICAgIHJldHVybiB0aGlzLmVtaXR0ZXIub24oJ3N0b3BwZWQnLCBjYWxsYmFjayk7XG4gIH1cblxuICAvLyBQdWJsaWM6IERpc3BhdGNoZWQgd2hlbiB0aGUgbGFuZ3VhZ2UgaXMgbm90IHNwZWNpZmllZFxuICBvbkRpZE5vdFNwZWNpZnlMYW5ndWFnZShjYWxsYmFjaykge1xuICAgIHJldHVybiB0aGlzLmNvZGVDb250ZXh0QnVpbGRlci5vbkRpZE5vdFNwZWNpZnlMYW5ndWFnZShjYWxsYmFjayk7XG4gIH1cblxuICAvLyBQdWJsaWM6IERpc3BhdGNoZWQgd2hlbiB0aGUgbGFuZ3VhZ2UgaXMgbm90IHN1cHBvcnRlZFxuICAvLyBsYW5nICAtIHtTdHJpbmd9IHdpdGggdGhlIGxhbmd1YWdlIG5hbWVcbiAgb25EaWROb3RTdXBwb3J0TGFuZ3VhZ2UoY2FsbGJhY2spIHtcbiAgICByZXR1cm4gdGhpcy5jb2RlQ29udGV4dEJ1aWxkZXIub25EaWROb3RTdXBwb3J0TGFuZ3VhZ2UoY2FsbGJhY2spO1xuICB9XG5cbiAgLy8gUHVibGljOiBEaXNwYXRjaGVkIHdoZW4gdGhlIG1vZGUgaXMgbm90IHN1cHBvcnRlZFxuICAvLyBsYW5nICAtIHtTdHJpbmd9IHdpdGggdGhlIGxhbmd1YWdlIG5hbWVcbiAgLy8gYXJnVHlwZSAgLSB7U3RyaW5nfSB3aXRoIHRoZSBydW4gbW9kZSBzcGVjaWZpZWRcbiAgb25EaWROb3RTdXBwb3J0TW9kZShjYWxsYmFjaykge1xuICAgIHJldHVybiB0aGlzLmVtaXR0ZXIub24oJ2RpZC1ub3Qtc3VwcG9ydC1tb2RlJywgY2FsbGJhY2spO1xuICB9XG5cbiAgLy8gUHVibGljOiBEaXNwYXRjaGVkIHdoZW4gYnVpbGRpbmcgcnVuIGFyZ3VtZW50cyByZXN1bHRlZCBpbiBhbiBlcnJvclxuICAvLyBlcnJvciAtIHtFcnJvcn1cbiAgb25EaWROb3RCdWlsZEFyZ3MoY2FsbGJhY2spIHtcbiAgICByZXR1cm4gdGhpcy5lbWl0dGVyLm9uKCdkaWQtbm90LWJ1aWxkLWFyZ3MnLCBjYWxsYmFjayk7XG4gIH1cblxuICAvLyBQdWJsaWM6IERpc3BhdGNoZWQgd2hlbiB0aGUge0NvZGVDb250ZXh0fSBpcyBzdWNjZXNzZnVsbHkgY3JlYXRlZFxuICAvLyBsYW5nICAtIHtTdHJpbmd9IHdpdGggdGhlIGxhbmd1YWdlIG5hbWVcbiAgLy8gZmlsZW5hbWUgIC0ge1N0cmluZ30gd2l0aCB0aGUgZmlsZW5hbWVcbiAgLy8gbGluZU51bWJlciAgLSB7TnVtYmVyfSB3aXRoIHRoZSBsaW5lIG51bWJlciAobWF5IGJlIG51bGwpXG4gIG9uRGlkQ29udGV4dENyZWF0ZShjYWxsYmFjaykge1xuICAgIHJldHVybiB0aGlzLmVtaXR0ZXIub24oJ2RpZC1jb250ZXh0LWNyZWF0ZScsIGNhbGxiYWNrKTtcbiAgfVxuXG4gIC8vIFB1YmxpYzogRGlzcGF0Y2hlZCB3aGVuIHRoZSBwcm9jZXNzIHlvdSBydW4gd3JpdGVzIHNvbWV0aGluZyB0byBzdGRvdXRcbiAgLy8gbWVzc2FnZSAtIHtTdHJpbmd9IHdpdGggdGhlIG91dHB1dFxuICBvbkRpZFdyaXRlVG9TdGRvdXQoY2FsbGJhY2spIHtcbiAgICByZXR1cm4gdGhpcy5ydW5uZXIub25EaWRXcml0ZVRvU3Rkb3V0KGNhbGxiYWNrKTtcbiAgfVxuXG4gIC8vIFB1YmxpYzogRGlzcGF0Y2hlZCB3aGVuIHRoZSBwcm9jZXNzIHlvdSBydW4gd3JpdGVzIHNvbWV0aGluZyB0byBzdGRlcnJcbiAgLy8gbWVzc2FnZSAtIHtTdHJpbmd9IHdpdGggdGhlIG91dHB1dFxuICBvbkRpZFdyaXRlVG9TdGRlcnIoY2FsbGJhY2spIHtcbiAgICByZXR1cm4gdGhpcy5ydW5uZXIub25EaWRXcml0ZVRvU3RkZXJyKGNhbGxiYWNrKTtcbiAgfVxuXG4gIC8vIFB1YmxpYzogRGlzcGF0Y2hlZCB3aGVuIHRoZSBwcm9jZXNzIHlvdSBydW4gZXhpdHNcbiAgLy8gcmV0dXJuQ29kZSAgLSB7TnVtYmVyfSB3aXRoIHRoZSBwcm9jZXNzJyBleGl0IGNvZGVcbiAgLy8gZXhlY3V0aW9uVGltZSAgLSB7TnVtYmVyfSB3aXRoIHRoZSBwcm9jZXNzJyBleGl0IGNvZGVcbiAgb25EaWRFeGl0KGNhbGxiYWNrKSB7XG4gICAgcmV0dXJuIHRoaXMucnVubmVyLm9uRGlkRXhpdChjYWxsYmFjayk7XG4gIH1cblxuICAvLyBQdWJsaWM6IERpc3BhdGNoZWQgd2hlbiB0aGUgY29kZSB5b3UgcnVuIGRpZCBub3QgbWFuYWdlIHRvIHJ1blxuICAvLyBjb21tYW5kIC0ge1N0cmluZ30gd2l0aCB0aGUgcnVuIGNvbW1hbmRcbiAgb25EaWROb3RSdW4oY2FsbGJhY2spIHtcbiAgICByZXR1cm4gdGhpcy5ydW5uZXIub25EaWROb3RSdW4oY2FsbGJhY2spO1xuICB9XG5cbiAgbW9kZU5vdFN1cHBvcnRlZChhcmdUeXBlLCBsYW5nKSB7XG4gICAgdGhpcy5lbWl0dGVyLmVtaXQoJ2RpZC1ub3Qtc3VwcG9ydC1tb2RlJywgeyBhcmdUeXBlLCBsYW5nIH0pO1xuICB9XG5cbiAgZGlkTm90QnVpbGRBcmdzKGVycm9yKSB7XG4gICAgdGhpcy5lbWl0dGVyLmVtaXQoJ2RpZC1ub3QtYnVpbGQtYXJncycsIHsgZXJyb3IgfSk7XG4gIH1cbn1cbiJdfQ==