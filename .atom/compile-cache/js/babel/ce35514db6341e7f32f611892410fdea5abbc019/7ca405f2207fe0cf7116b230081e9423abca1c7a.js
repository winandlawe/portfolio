Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

exports.getShebang = _getShebang;
exports.getLang = _getLang;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _atom = require("atom");

var _codeContext = require("./code-context");

var _codeContext2 = _interopRequireDefault(_codeContext);

var _grammars = require("./grammars");

var _grammars2 = _interopRequireDefault(_grammars);

"use babel";

var CodeContextBuilder = (function () {
  function CodeContextBuilder() {
    var emitter = arguments.length <= 0 || arguments[0] === undefined ? new _atom.Emitter() : arguments[0];

    _classCallCheck(this, CodeContextBuilder);

    this.emitter = emitter;
  }

  _createClass(CodeContextBuilder, [{
    key: "destroy",
    value: function destroy() {
      this.emitter.dispose();
    }

    // Public: Builds code context for specified argType
    //
    // editor - Atom's {TextEditor} instance
    // argType - {String} with one of the following values:
    //
    // * "Selection Based" (default)
    // * "Line Number Based",
    // * "File Based"
    //
    // returns a {CodeContext} object
  }, {
    key: "buildCodeContext",
    value: function buildCodeContext(editor) {
      var argType = arguments.length <= 1 || arguments[1] === undefined ? "Selection Based" : arguments[1];

      if (!editor) {
        return null;
      }

      var codeContext = this.initCodeContext(editor);

      codeContext.argType = argType;

      if (argType === "Line Number Based") {
        editor.save();
      } else if (codeContext.selection.isEmpty() && codeContext.filepath) {
        codeContext.argType = "File Based";
        if (editor && editor.isModified()) {
          editor.save();
        }
      }

      // Selection and Line Number Based runs both benefit from knowing the current line
      // number
      if (argType !== "File Based") {
        var cursor = editor.getLastCursor();
        codeContext.lineNumber = cursor.getScreenRow() + 1;
      }

      return codeContext;
    }
  }, {
    key: "initCodeContext",
    value: function initCodeContext(editor) {
      var filename = editor.getTitle();
      var filepath = editor.getPath();
      var selection = editor.getLastSelection();
      var ignoreSelection = atom.config.get("script.ignoreSelection");

      // If the selection was empty or if ignore selection is on, then "select" ALL
      // of the text
      // This allows us to run on new files
      var textSource = undefined;
      if (selection.isEmpty() || ignoreSelection) {
        textSource = editor;
      } else {
        textSource = selection;
      }

      var codeContext = new _codeContext2["default"](filename, filepath, textSource);
      codeContext.selection = selection;
      codeContext.shebang = _getShebang(editor);

      var lang = _getLang(editor);

      if (this.validateLang(lang)) {
        codeContext.lang = lang;
      }

      return codeContext;
    }
    // eslint-disable-next-line class-methods-use-this

    /** @deprecated Use {getShebang} function */ }, {
    key: "getShebang",
    value: function getShebang(arg) {
      return _getShebang(arg);
    }
    // eslint-disable-next-line class-methods-use-this

    /** @deprecated Use {getLang} function */ }, {
    key: "getLang",
    value: function getLang(arg) {
      return _getLang(arg);
    }
  }, {
    key: "validateLang",
    value: function validateLang(lang) {
      var valid = true;

      // Determine if no language is selected.
      if (lang === "Null Grammar" || lang === "Plain Text") {
        this.emitter.emit("did-not-specify-language");
        valid = false;

        // Provide them a dialog to submit an issue on GH, prepopulated with their
        // language of choice.
      } else if (!(lang in _grammars2["default"])) {
          this.emitter.emit("did-not-support-language", { lang: lang });
          valid = false;
        }

      return valid;
    }
  }, {
    key: "onDidNotSpecifyLanguage",
    value: function onDidNotSpecifyLanguage(callback) {
      return this.emitter.on("did-not-specify-language", callback);
    }
  }, {
    key: "onDidNotSupportLanguage",
    value: function onDidNotSupportLanguage(callback) {
      return this.emitter.on("did-not-support-language", callback);
    }
  }]);

  return CodeContextBuilder;
})();

exports["default"] = CodeContextBuilder;

function _getShebang(editor) {
  if (process.platform === "win32") {
    return null;
  }
  var text = editor.getText();
  var lines = text.split("\n");
  var firstLine = lines[0];
  if (!firstLine.match(/^#!/)) {
    return null;
  }

  return firstLine.replace(/^#!\s*/, "");
}

function _getLang(editor) {
  return editor.getGrammar().name;
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZpbGU6Ly8vQzovVXNlcnMvY2tuanUvLmF0b20vcGFja2FnZXMvc2NyaXB0L2xpYi9jb2RlLWNvbnRleHQtYnVpbGRlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O29CQUV3QixNQUFNOzsyQkFFTixnQkFBZ0I7Ozs7d0JBQ2pCLFlBQVk7Ozs7QUFMbkMsV0FBVyxDQUFBOztJQU9VLGtCQUFrQjtBQUMxQixXQURRLGtCQUFrQixHQUNBO1FBQXpCLE9BQU8seURBQUcsbUJBQWE7OzBCQURoQixrQkFBa0I7O0FBRW5DLFFBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFBO0dBQ3ZCOztlQUhrQixrQkFBa0I7O1dBSzlCLG1CQUFHO0FBQ1IsVUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQTtLQUN2Qjs7Ozs7Ozs7Ozs7Ozs7V0FZZSwwQkFBQyxNQUFNLEVBQStCO1VBQTdCLE9BQU8seURBQUcsaUJBQWlCOztBQUNsRCxVQUFJLENBQUMsTUFBTSxFQUFFO0FBQ1gsZUFBTyxJQUFJLENBQUE7T0FDWjs7QUFFRCxVQUFNLFdBQVcsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLE1BQU0sQ0FBQyxDQUFBOztBQUVoRCxpQkFBVyxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUE7O0FBRTdCLFVBQUksT0FBTyxLQUFLLG1CQUFtQixFQUFFO0FBQ25DLGNBQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQTtPQUNkLE1BQU0sSUFBSSxXQUFXLENBQUMsU0FBUyxDQUFDLE9BQU8sRUFBRSxJQUFJLFdBQVcsQ0FBQyxRQUFRLEVBQUU7QUFDbEUsbUJBQVcsQ0FBQyxPQUFPLEdBQUcsWUFBWSxDQUFBO0FBQ2xDLFlBQUksTUFBTSxJQUFJLE1BQU0sQ0FBQyxVQUFVLEVBQUUsRUFBRTtBQUNqQyxnQkFBTSxDQUFDLElBQUksRUFBRSxDQUFBO1NBQ2Q7T0FDRjs7OztBQUlELFVBQUksT0FBTyxLQUFLLFlBQVksRUFBRTtBQUM1QixZQUFNLE1BQU0s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QzFCLE1BQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxFQUFFO0FBQzNCLFdBQU8sSUFBSSxDQUFBO0dBQ1o7O0FBRUQsU0FBTyxTQUFTLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxFQUFFLENBQUMsQ0FBQTtDQUN2Qzs7QUFFTSxTQUFTLFFBQU8sQ0FBQyxNQUFNLEVBQUU7QUFDOUIsU0FBTyxNQUFNLENBQUMsVUFBVSxFQUFFLENBQUMsSUFBSSxDQUFBO0NBQ2hDIiwiZmlsZSI6ImZpbGU6Ly8vQzovVXNlcnMvY2tuanUvLmF0b20vcGFja2FnZXMvc2NyaXB0L2xpYi9jb2RlLWNvbnRleHQtYnVpbGRlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIlwidXNlIGJhYmVsXCJcblxuaW1wb3J0IHsgRW1pdHRlciB9IGZyb20gXCJhdG9tXCJcblxuaW1wb3J0IENvZGVDb250ZXh0IGZyb20gXCIuL2NvZGUtY29udGV4dFwiXG5pbXBvcnQgZ3JhbW1hck1hcCBmcm9tIFwiLi9ncmFtbWFyc1wiXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvZGVDb250ZXh0QnVpbGRlciB7XG4gIGNvbnN0cnVjdG9yKGVtaXR0ZXIgPSBuZXcgRW1pdHRlcigpKSB7XG4gICAgdGhpcy5lbWl0dGVyID0gZW1pdHRlclxuICB9XG5cbiAgZGVzdHJveSgpIHtcbiAgICB0aGlzLmVtaXR0ZXIuZGlzcG9zZSgpXG4gIH1cblxuICAvLyBQdWJsaWM6IEJ1aWxkcyBjb2RlIGNvbnRleHQgZm9yIHNwZWNpZmllZCBhcmdUeXBlXG4gIC8vXG4gIC8vIGVkaXRvciAtIEF0b20ncyB7VGV4dEVkaXRvcn0gaW5zdGFuY2VcbiAgLy8gYXJnVHlwZSAtIHtTdHJpbmd9IHdpdGggb25lIG9mIHRoZSBmb2xsb3dpbmcgdmFsdWVzOlxuICAvL1xuICAvLyAqIFwiU2VsZWN0aW9uIEJhc2VkXCIgKGRlZmF1bHQpXG4gIC8vICogXCJMaW5lIE51bWJlciBCYXNlZFwiLFxuICAvLyAqIFwiRmlsZSBCYXNlZFwiXG4gIC8vXG4gIC8vIHJldHVybnMgYSB7Q29kZUNvbnRleHR9IG9iamVjdFxuICBidWlsZENvZGVDb250ZXh0KGVkaXRvciwgYXJnVHlwZSA9IFwiU2VsZWN0aW9uIEJhc2VkXCIpIHtcbiAgICBpZiAoIWVkaXRvcikge1xuICAgICAgcmV0dXJuIG51bGxcbiAgICB9XG5cbiAgICBjb25zdCBjb2RlQ29udGV4dCA9IHRoaXMuaW5pdENvZGVDb250ZXh0KGVkaXRvcilcblxuICAgIGNvZGVDb250ZXh0LmFyZ1R5cGUgPSBhcmdUeXBlXG5cbiAgICBpZiAoYXJnVHlwZSA9PT0gXCJMaW5lIE51bWJlciBCYXNlZFwiKSB7XG4gICAgICBlZGl0b3Iuc2F2ZSgpXG4gICAgfSBlbHNlIGlmIChjb2RlQ29udGV4dC5zZWxlY3Rpb24uaXNFbXB0eSgpICYmIGNvZGVDb250ZXh0LmZpbGVwYXRoKSB7XG4gICAgICBjb2RlQ29udGV4dC5hcmdUeXBlID0gXCJGaWxlIEJhc2VkXCJcbiAgICAgIGlmIChlZGl0b3IgJiYgZWRpdG9yLmlzTW9kaWZpZWQoKSkge1xuICAgICAgICBlZGl0b3Iuc2F2ZSgpXG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gU2VsZWN0aW9uIGFuZCBMaW5lIE51bWJlciBCYXNlZCBydW5zIGJvdGggYmVuZWZpdCBmcm9tIGtub3dpbmcgdGhlIGN1cnJlbnQgbGluZVxuICAgIC8vIG51bWJlclxuICAgIGlmIChhcmdUeXBlICE9PSBcIkZpbGUgQmFzZWRcIikge1xuICAgICAgY29uc3QgY3Vyc29yID0gZWRpdG9yLmdldExhc3RDdXJzb3IoKVxuICAgICAgY29kZUNvbnRleHQubGluZU51bWJlciA9IGN1cnNvci5nZXRTY3JlZW5Sb3coKSArIDFcbiAgICB9XG5cbiAgICByZXR1cm4gY29kZUNvbnRleHRcbiAgfVxuXG4gIGluaXRDb2RlQ29udGV4dChlZGl0b3IpIHtcbiAgICBjb25zdCBmaWxlbmFtZSA9IGVkaXRvci5nZXRUaXRsZSgpXG4gICAgY29uc3QgZmlsZXBhdGggPSBlZGl0b3IuZ2V0UGF0aCgpXG4gICAgY29uc3Qgc2VsZWN0aW9uID0gZWRpdG9yLmdldExhc3RTZWxlY3Rpb24oKVxuICAgIGNvbnN0IGlnbm9yZVNlbGVjdGlvbiA9IGF0b20uY29uZmlnLmdldChcInNjcmlwdC5pZ25vcmVTZWxlY3Rpb25cIilcblxuICAgIC8vIElmIHRoZSBzZWxlY3Rpb24gd2FzIGVtcHR5IG9yIGlmIGlnbm9yZSBzZWxlY3Rpb24gaXMgb24sIHRoZW4gXCJzZWxlY3RcIiBBTExcbiAgICAvLyBvZiB0aGUgdGV4dFxuICAgIC8vIFRoaXMgYWxsb3dzIHVzIHRvIHJ1biBvbiBuZXcgZmlsZXNcbiAgICBsZXQgdGV4dFNvdXJjZVxuICAgIGlmIChzZWxlY3Rpb24uaXNFbXB0eSgpIHx8IGlnbm9yZVNlbGVjdGlvbikge1xuICAgICAgdGV4dFNvdXJjZSA9IGVkaXRvclxuICAgIH0gZWxzZSB7XG4gICAgICB0ZXh0U291cmNlID0gc2VsZWN0aW9uXG4gICAgfVxuXG4gICAgY29uc3QgY29kZUNvbnRleHQgPSBuZXcgQ29kZUNvbnRleHQoZmlsZW5hbWUsIGZpbGVwYXRoLCB0ZXh0U291cmNlKVxuICAgIGNvZGVDb250ZXh0LnNlbGVjdGlvbiA9IHNlbGVjdGlvblxuICAgIGNvZGVDb250ZXh0LnNoZWJhbmcgPSBnZXRTaGViYW5nKGVkaXRvcilcblxuICAgIGNvbnN0IGxhbmcgPSBnZXRMYW5nKGVkaXRvcilcblxuICAgIGlmICh0aGlzLnZhbGlkYXRlTGFuZyhsYW5nKSkge1xuICAgICAgY29kZUNvbnRleHQubGFuZyA9IGxhbmdcbiAgICB9XG5cbiAgICByZXR1cm4gY29kZUNvbnRleHRcbiAgfSAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgY2xhc3MtbWV0aG9kcy11c2UtdGhpc1xuXG4gIC8qKiBAZGVwcmVjYXRlZCBVc2Uge2dldFNoZWJhbmd9IGZ1bmN0aW9uICovIGdldFNoZWJhbmcoYXJnKSB7XG4gICAgcmV0dXJuIGdldFNoZWJhbmcoYXJnKVxuICB9IC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBjbGFzcy1tZXRob2RzLXVzZS10aGlzXG5cbiAgLyoqIEBkZXByZWNhdGVkIFVzZSB7Z2V0TGFuZ30gZnVuY3Rpb24gKi8gZ2V0TGFuZyhhcmcpIHtcbiAgICByZXR1cm4gZ2V0TGFuZyhhcmcpXG4gIH1cblxuICB2YWxpZGF0ZUxhbmcobGFuZykge1xuICAgIGxldCB2YWxpZCA9IHRydWVcblxuICAgIC8vIERldGVybWluZSBpZiBubyBsYW5ndWFnZSBpcyBzZWxlY3RlZC5cbiAgICBpZiAobGFuZyA9PT0gXCJOdWxsIEdyYW1tYXJcIiB8fCBsYW5nID09PSBcIlBsYWluIFRleHRcIikge1xuICAgICAgdGhpcy5lbWl0dGVyLmVtaXQoXCJkaWQtbm90LXNwZWNpZnktbGFuZ3VhZ2VcIilcbiAgICAgIHZhbGlkID0gZmFsc2VcblxuICAgICAgLy8gUHJvdmlkZSB0aGVtIGEgZGlhbG9nIHRvIHN1Ym1pdCBhbiBpc3N1ZSBvbiBHSCwgcHJlcG9wdWxhdGVkIHdpdGggdGhlaXJcbiAgICAgIC8vIGxhbmd1YWdlIG9mIGNob2ljZS5cbiAgICB9IGVsc2UgaWYgKCEobGFuZyBpbiBncmFtbWFyTWFwKSkge1xuICAgICAgdGhpcy5lbWl0dGVyLmVtaXQoXCJkaWQtbm90LXN1cHBvcnQtbGFuZ3VhZ2VcIiwgeyBsYW5nIH0pXG4gICAgICB2YWxpZCA9IGZhbHNlXG4gICAgfVxuXG4gICAgcmV0dXJuIHZhbGlkXG4gIH1cblxuICBvbkRpZE5vdFNwZWNpZnlMYW5ndWFnZShjYWxsYmFjaykge1xuICAgIHJldHVybiB0aGlzLmVtaXR0ZXIub24oXCJkaWQtbm90LXNwZWNpZnktbGFuZ3VhZ2VcIiwgY2FsbGJhY2spXG4gIH1cblxuICBvbkRpZE5vdFN1cHBvcnRMYW5ndWFnZShjYWxsYmFjaykge1xuICAgIHJldHVybiB0aGlzLmVtaXR0ZXIub24oXCJkaWQtbm90LXN1cHBvcnQtbGFuZ3VhZ2VcIiwgY2FsbGJhY2spXG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFNoZWJhbmcoZWRpdG9yKSB7XG4gIGlmIChwcm9jZXNzLnBsYXRmb3JtID09PSBcIndpbjMyXCIpIHtcbiAgICByZXR1cm4gbnVsbFxuICB9XG4gIGNvbnN0IHRleHQgPSBlZGl0b3IuZ2V0VGV4dCgpXG4gIGNvbnN0IGxpbmVzID0gdGV4dC5zcGxpdChcIlxcblwiKVxuICBjb25zdCBmaXJzdExpbmUgPSBsaW5lc1swXVxuICBpZiAoIWZpcnN0TGluZS5tYXRjaCgvXiMhLykpIHtcbiAgICByZXR1cm4gbnVsbFxuICB9XG5cbiAgcmV0dXJuIGZpcnN0TGluZS5yZXBsYWNlKC9eIyFcXHMqLywgXCJcIilcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldExhbmcoZWRpdG9yKSB7XG4gIHJldHVybiBlZGl0b3IuZ2V0R3JhbW1hcigpLm5hbWVcbn1cbiJdfQ==