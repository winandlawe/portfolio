Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

exports.quoteArguments = _quoteArguments;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _grammars = require("./grammars");

var _grammars2 = _interopRequireDefault(_grammars);

"use babel";

var CommandContext = (function () {
  function CommandContext() {
    _classCallCheck(this, CommandContext);

    this.command = null;
    this.workingDirectory = null;
    this.args = [];
    this.options = {};
  }

  _createClass(CommandContext, [{
    key: "quoteArguments",
    // eslint-disable-next-line class-methods-use-this

    /** @deprecated Use {quoteArguments} function */
    /* eslint-disable-next-line class-methods-use-this */
    value: function quoteArguments(args) {
      return _quoteArguments(args);
    }
  }, {
    key: "getRepresentation",
    value: function getRepresentation() {
      if (!this.command || !this.args.length) {
        return "";
      }

      // command arguments
      var commandArgs = this.options.cmdArgs ? _quoteArguments(this.options.cmdArgs).join(" ") : "";

      // script arguments
      var args = this.args.length ? _quoteArguments(this.args).join(" ") : "";
      var scriptArgs = this.options.scriptArgs ? _quoteArguments(this.options.scriptArgs).join(" ") : "";

      return this.command.trim() + (commandArgs ? " " + commandArgs : "") + (args ? " " + args : "") + (scriptArgs ? " " + scriptArgs : "");
    }
  }], [{
    key: "build",
    value: function build(runtime, runOptions, codeContext) {
      var commandContext = new CommandContext();
      commandContext.options = runOptions;
      var buildArgsArray = undefined;

      try {
        if (!runOptions.cmd) {
          // Precondition: lang? and lang of grammarMap
          commandContext.command = codeContext.shebangCommand() || _grammars2["default"][codeContext.lang][codeContext.argType].command;
        } else {
          commandContext.command = runOptions.cmd;
        }

        buildArgsArray = _grammars2["default"][codeContext.lang][codeContext.argType].args;
      } catch (error) {
        runtime.modeNotSupported(codeContext.argType, codeContext.lang);
        return false;
      }

      try {
        commandContext.args = buildArgsArray(codeContext);
      } catch (errorSendByArgs) {
        runtime.didNotBuildArgs(errorSendByArgs);
        return false;
      }

      if (!runOptions.workingDirectory) {
        // Precondition: lang? and lang of grammarMap
        commandContext.workingDirectory = _grammars2["default"][codeContext.lang][codeContext.argType].workingDirectory || "";
      } else {
        commandContext.workingDirectory = runOptions.workingDirectory;
      }

      // Return setup information
      return commandContext;
    }
  }]);

  return CommandContext;
})();

exports["default"] = CommandContext;

function _quoteArguments(args) {
  return args.map(function (arg) {
    return arg.trim().indexOf(" ") === -1 ? arg.trim() : "'" + arg + "'";
  });
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZpbGU6Ly8vQzovVXNlcnMvY2tuanUvLmF0b20vcGFja2FnZXMvc2NyaXB0L2xpYi9jb21tYW5kLWNvbnRleHQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O3dCQUV1QixZQUFZOzs7O0FBRm5DLFdBQVcsQ0FBQTs7SUFJVSxjQUFjO0FBQ3RCLFdBRFEsY0FBYyxHQUNuQjswQkFESyxjQUFjOztBQUUvQixRQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQTtBQUNuQixRQUFJLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFBO0FBQzVCLFFBQUksQ0FBQyxJQUFJLEdBQUcsRUFBRSxDQUFBO0FBQ2QsUUFBSSxDQUFDLE9BQU8sR0FBRyxFQUFFLENBQUE7R0FDbEI7O2VBTmtCLGNBQWM7Ozs7OztXQWdEbkIsd0JBQUMsSUFBSSxFQUFFO0FBQ25CLGFBQU8sZUFBYyxDQUFDLElBQUksQ0FBQyxDQUFBO0tBQzVCOzs7V0FFZ0IsNkJBQUc7QUFDbEIsVUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRTtBQUN0QyxlQUFPLEVBQUUsQ0FBQTtPQUNWOzs7QUFHRCxVQUFNLFdBQVcsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sR0FBRyxlQUFjLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFBOzs7QUFHOUYsVUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsZUFBYyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFBO0FBQ3hFLFVBQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxHQUFHLGVBQWMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUE7O0FBRW5HLGFBQ0UsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsSUFDbEIsV0FBVyxTQUFPLFdBQVcsR0FBSyxFQUFFLENBQUEsQUFBQyxJQUNyQyxJQUFJLFNBQU8sSUFBSSxHQUFLLEVBQUUsQ0FBQSxBQUFDLElBQ3ZCLFVBQVUsU0FBTyxVQUFVLEdBQUssRUFBRSxDQUFBLEFBQUMsQ0FDckM7S0FDRjs7O1dBOURXLGVBQUMsT0FBTyxFQUFFLFVBQVUsRUFBRSxXQUFXLEVBQUU7QUFDN0MsVUFBTSxjQUFjLEdBQUcsSUFBSSxjQUFjLEVBQUUsQ0FBQTtBQUMzQyxvQkFBYyxDQUFDLE9BQU8sR0FBRyxVQUFVLENBQUE7QUFDbkMsVUFBSSxjQUFjLFlBQUEsQ0FBQTs7QUFFbEIsVUFBSTtBQUNGLFlBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxFQUFFOztBQUVuQix3QkFBYyxDQUFDLE9BQU8sR0FDcEIsV0FBVyxDQUFDLGNBQWMsRUFBRSxJQUFJLHNCQUFXLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUMsT0FBTyxDQUFBO1NBQzVGLE1BQU07QUFDTCx3QkFBYyxDQUFDLE9BQU8sR0FBRyxVQUFVLENBQUMsR0FBRyxDQUFBO1NBQ3hDOztBQUVELHNCQUFjLEdBQUcsc0JBQVcsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUE7T0FDeEUsQ0FBQyxPQUFPLEtBQUssRUFBRTtBQUNkLGVBQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxXQUFXLENBQUMsT0FBTyxFQUFFLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQTtBQUMvRCxlQUFPLEtBQUssQ0FBQTtPQUNiOztBQUVELFVBQUk7QUFDRixzQkFBYyxDQUFDLElBQUksR0FBRyxjQUFjLENBQUMsV0FBVyxDQUFDLENBQUE7T0FDbEQsQ0FBQyxPQUFPLGVBQWUsRUFBRTtBQUN4QixlQUFPLENBQUMsZUFBZSxDQUFDLGVBQWUsQ0FBQyxDQUFBO0FBQ3hDLGVBQU8sS0FBSyxDQUFBO09BQ2I7O0FBRUQsVUFBSSxDQUFDLFVBQVUsQ0FBQyxnQkFBZ0IsRUFBRTs7QUFFaEMsc0JBQWMsQ0FBQyxnQkFBZ0IsR0FBRyxzQkFBVyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDLGdCQUFnQixJQUFJLEVBQUUsQ0FBQTtPQUMzRyxNQUFNO0FBQ0wsc0JBQWMsQ0FBQyxnQkFBZ0IsR0FBRyxVQUFVLENBQUMsZ0JBQWdCLENBQUE7T0FDOUQ7OztBQUdELGFBQU8sY0FBYyxDQUFBO0tBQ3RCOzs7U0E1Q2tCLGNBQWM7OztxQkFBZCxjQUFjOztBQXlFNUIsU0FBUyxlQUFjLENBQUMsSUFBSSxFQUFFO0FBQ25DLFNBQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxVQUFDLEdBQUc7V0FBTSxHQUFHLENBQUMsSUFBSSxFQUFFLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxJQUFJLEVBQUUsU0FBTyxHQUFHLE1BQUc7R0FBQyxDQUFDLENBQUE7Q0FDckYiLCJmaWxlIjoiZmlsZTovLy9DOi9Vc2Vycy9ja25qdS8uYXRvbS9wYWNrYWdlcy9zY3JpcHQvbGliL2NvbW1hbmQtY29udGV4dC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlwidXNlIGJhYmVsXCJcblxuaW1wb3J0IGdyYW1tYXJNYXAgZnJvbSBcIi4vZ3JhbW1hcnNcIlxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb21tYW5kQ29udGV4dCB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuY29tbWFuZCA9IG51bGxcbiAgICB0aGlzLndvcmtpbmdEaXJlY3RvcnkgPSBudWxsXG4gICAgdGhpcy5hcmdzID0gW11cbiAgICB0aGlzLm9wdGlvbnMgPSB7fVxuICB9XG5cbiAgc3RhdGljIGJ1aWxkKHJ1bnRpbWUsIHJ1bk9wdGlvbnMsIGNvZGVDb250ZXh0KSB7XG4gICAgY29uc3QgY29tbWFuZENvbnRleHQgPSBuZXcgQ29tbWFuZENvbnRleHQoKVxuICAgIGNvbW1hbmRDb250ZXh0Lm9wdGlvbnMgPSBydW5PcHRpb25zXG4gICAgbGV0IGJ1aWxkQXJnc0FycmF5XG5cbiAgICB0cnkge1xuICAgICAgaWYgKCFydW5PcHRpb25zLmNtZCkge1xuICAgICAgICAvLyBQcmVjb25kaXRpb246IGxhbmc/IGFuZCBsYW5nIG9mIGdyYW1tYXJNYXBcbiAgICAgICAgY29tbWFuZENvbnRleHQuY29tbWFuZCA9XG4gICAgICAgICAgY29kZUNvbnRleHQuc2hlYmFuZ0NvbW1hbmQoKSB8fCBncmFtbWFyTWFwW2NvZGVDb250ZXh0LmxhbmddW2NvZGVDb250ZXh0LmFyZ1R5cGVdLmNvbW1hbmRcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbW1hbmRDb250ZXh0LmNvbW1hbmQgPSBydW5PcHRpb25zLmNtZFxuICAgICAgfVxuXG4gICAgICBidWlsZEFyZ3NBcnJheSA9IGdyYW1tYXJNYXBbY29kZUNvbnRleHQubGFuZ11bY29kZUNvbnRleHQuYXJnVHlwZV0uYXJnc1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBydW50aW1lLm1vZGVOb3RTdXBwb3J0ZWQoY29kZUNvbnRleHQuYXJnVHlwZSwgY29kZUNvbnRleHQubGFuZylcbiAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cblxuICAgIHRyeSB7XG4gICAgICBjb21tYW5kQ29udGV4dC5hcmdzID0gYnVpbGRBcmdzQXJyYXkoY29kZUNvbnRleHQpXG4gICAgfSBjYXRjaCAoZXJyb3JTZW5kQnlBcmdzKSB7XG4gICAgICBydW50aW1lLmRpZE5vdEJ1aWxkQXJncyhlcnJvclNlbmRCeUFyZ3MpXG4gICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG5cbiAgICBpZiAoIXJ1bk9wdGlvbnMud29ya2luZ0RpcmVjdG9yeSkge1xuICAgICAgLy8gUHJlY29uZGl0aW9uOiBsYW5nPyBhbmQgbGFuZyBvZiBncmFtbWFyTWFwXG4gICAgICBjb21tYW5kQ29udGV4dC53b3JraW5nRGlyZWN0b3J5ID0gZ3JhbW1hck1hcFtjb2RlQ29udGV4dC5sYW5nXVtjb2RlQ29udGV4dC5hcmdUeXBlXS53b3JraW5nRGlyZWN0b3J5IHx8IFwiXCJcbiAgICB9IGVsc2Uge1xuICAgICAgY29tbWFuZENvbnRleHQud29ya2luZ0RpcmVjdG9yeSA9IHJ1bk9wdGlvbnMud29ya2luZ0RpcmVjdG9yeVxuICAgIH1cblxuICAgIC8vIFJldHVybiBzZXR1cCBpbmZvcm1hdGlvblxuICAgIHJldHVybiBjb21tYW5kQ29udGV4dFxuICB9IC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBjbGFzcy1tZXRob2RzLXVzZS10aGlzXG5cbiAgLyoqIEBkZXByZWNhdGVkIFVzZSB7cXVvdGVBcmd1bWVudHN9IGZ1bmN0aW9uICovXG4gIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBjbGFzcy1tZXRob2RzLXVzZS10aGlzICovXG4gIHF1b3RlQXJndW1lbnRzKGFyZ3MpIHtcbiAgICByZXR1cm4gcXVvdGVBcmd1bWVudHMoYXJncylcbiAgfVxuXG4gIGdldFJlcHJlc2VudGF0aW9uKCkge1xuICAgIGlmICghdGhpcy5jb21tYW5kIHx8ICF0aGlzLmFyZ3MubGVuZ3RoKSB7XG4gICAgICByZXR1cm4gXCJcIlxuICAgIH1cblxuICAgIC8vIGNvbW1hbmQgYXJndW1lbnRzXG4gICAgY29uc3QgY29tbWFuZEFyZ3MgPSB0aGlzLm9wdGlvbnMuY21kQXJncyA/IHF1b3RlQXJndW1lbnRzKHRoaXMub3B0aW9ucy5jbWRBcmdzKS5qb2luKFwiIFwiKSA6IFwiXCJcblxuICAgIC8vIHNjcmlwdCBhcmd1bWVudHNcbiAgICBjb25zdCBhcmdzID0gdGhpcy5hcmdzLmxlbmd0aCA/IHF1b3RlQXJndW1lbnRzKHRoaXMuYXJncykuam9pbihcIiBcIikgOiBcIlwiXG4gICAgY29uc3Qgc2NyaXB0QXJncyA9IHRoaXMub3B0aW9ucy5zY3JpcHRBcmdzID8gcXVvdGVBcmd1bWVudHModGhpcy5vcHRpb25zLnNjcmlwdEFyZ3MpLmpvaW4oXCIgXCIpIDogXCJcIlxuXG4gICAgcmV0dXJuIChcbiAgICAgIHRoaXMuY29tbWFuZC50cmltKCkgK1xuICAgICAgKGNvbW1hbmRBcmdzID8gYCAke2NvbW1hbmRBcmdzfWAgOiBcIlwiKSArXG4gICAgICAoYXJncyA/IGAgJHthcmdzfWAgOiBcIlwiKSArXG4gICAgICAoc2NyaXB0QXJncyA/IGAgJHtzY3JpcHRBcmdzfWAgOiBcIlwiKVxuICAgIClcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gcXVvdGVBcmd1bWVudHMoYXJncykge1xuICByZXR1cm4gYXJncy5tYXAoKGFyZykgPT4gKGFyZy50cmltKCkuaW5kZXhPZihcIiBcIikgPT09IC0xID8gYXJnLnRyaW0oKSA6IGAnJHthcmd9J2ApKVxufVxuIl19