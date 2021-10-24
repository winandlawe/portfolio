"use babel";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CodeContext = (function () {
  // Public: Initializes a new {CodeContext} object for the given file/line
  //
  // @filename   - The {String} filename of the file to execute.
  // @filepath   - The {String} path of the file to execute.
  // @textSource - The {String} text to under "Selection Based". (default: null)
  //
  // Returns a newly created {CodeContext} object.

  function CodeContext(filename, filepath) {
    var textSource = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];

    _classCallCheck(this, CodeContext);

    this.lineNumber = null;
    this.shebang = null;
    this.filename = filename;
    this.filepath = filepath;
    this.textSource = textSource;
  }

  // Public: Creates a {String} representation of the file and line number
  //
  // fullPath - Whether to expand the file path. (default: true)
  //
  // Returns the "file colon line" {String}.

  _createClass(CodeContext, [{
    key: "fileColonLine",
    value: function fileColonLine() {
      var fullPath = arguments.length <= 0 || arguments[0] === undefined ? true : arguments[0];

      var fileColonLine = undefined;
      if (fullPath) {
        fileColonLine = this.filepath;
      } else {
        fileColonLine = this.filename;
      }

      if (!this.lineNumber) {
        return fileColonLine;
      }
      return fileColonLine + ":" + this.lineNumber;
    }

    // Public: Retrieves the text from whatever source was given on initialization
    //
    // prependNewlines - Whether to prepend @lineNumber newlines (default: true)
    //
    // Returns the code selection {String}
  }, {
    key: "getCode",
    value: function getCode() {
      var prependNewlines = arguments.length <= 0 || arguments[0] === undefined ? true : arguments[0];

      var code = this.textSource ? this.textSource.getText() : null;
      if (!prependNewlines || !this.lineNumber) {
        return code;
      }

      var newlineCount = Number(this.lineNumber);
      var newlines = Array(newlineCount).join("\n");
      return "" + newlines + code;
    }

    // Public: Retrieves the command name from @shebang
    //
    // Returns the {String} name of the command or {undefined} if not applicable.
  }, {
    key: "shebangCommand",
    value: function shebangCommand() {
      var sections = this.shebangSections();
      if (!sections) {
        return null;
      }

      return sections[0];
    }

    // Public: Retrieves the command arguments (such as flags or arguments to
    // /usr/bin/env) from @shebang
    //
    // Returns the {String} name of the command or {undefined} if not applicable.
  }, {
    key: "shebangCommandArgs",
    value: function shebangCommandArgs() {
      var sections = this.shebangSections();
      if (!sections) {
        return [];
      }

      return sections.slice(1, sections.length);
    }

    // Public: Splits the shebang string by spaces to extra the command and
    // arguments
    //
    // Returns the {String} name of the command or {undefined} if not applicable.
  }, {
    key: "shebangSections",
    value: function shebangSections() {
      return this.shebang ? this.shebang.split(" ") : null;
    }
  }]);

  return CodeContext;
})();

exports["default"] = CodeContext;
module.exports = exports["default"];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZpbGU6Ly8vQzovVXNlcnMvY2tuanUvLmF0b20vcGFja2FnZXMvc2NyaXB0L2xpYi9jb2RlLWNvbnRleHQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsV0FBVyxDQUFBOzs7Ozs7Ozs7O0lBRVUsV0FBVzs7Ozs7Ozs7O0FBUW5CLFdBUlEsV0FBVyxDQVFsQixRQUFRLEVBQUUsUUFBUSxFQUFxQjtRQUFuQixVQUFVLHlEQUFHLElBQUk7OzBCQVI5QixXQUFXOztBQVM1QixRQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQTtBQUN0QixRQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQTtBQUNuQixRQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQTtBQUN4QixRQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQTtBQUN4QixRQUFJLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQTtHQUM3Qjs7Ozs7Ozs7ZUFka0IsV0FBVzs7V0FxQmpCLHlCQUFrQjtVQUFqQixRQUFRLHlEQUFHLElBQUk7O0FBQzNCLFVBQUksYUFBYSxZQUFBLENBQUE7QUFDakIsVUFBSSxRQUFRLEVBQUU7QUFDWixxQkFBYSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUE7T0FDOUIsTUFBTTtBQUNMLHFCQUFhLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQTtPQUM5Qjs7QUFFRCxVQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRTtBQUNwQixlQUFPLGFBQWEsQ0FBQTtPQUNyQjtBQUNELGFBQVUsYUFBYSxTQUFJLElBQUksQ0FBQyxVQUFVLENBQUU7S0FDN0M7Ozs7Ozs7OztXQU9NLG1CQUF5QjtVQUF4QixlQUFlLHlEQUFHLElBQUk7O0FBQzVCLFVBQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLEVBQUUsR0FBRyxJQUFJLENBQUE7QUFDL0QsVUFBSSxDQUFDLGVBQWUsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUU7QUFDeEMsZUFBTyxJQUFJLENBQUE7T0FDWjs7QUFFRCxVQUFNLFlBQVksR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFBO0FBQzVDLFVBQU0sUUFBUSxHQUFHLEtBQUssQ0FBQyxZQUFZLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUE7QUFDL0Msa0JBQVUsUUFBUSxHQUFHLElBQUksQ0FBRTtLQUM1Qjs7Ozs7OztXQUthLDBCQUFHO0FBQ2YsVUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFBO0FBQ3ZDLFVBQUksQ0FBQyxRQUFRLEVBQUU7QUFDYixlQUFPLElBQUksQ0FBQTtPQUNaOztBQUVELGFBQU8sUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFBO0tBQ25COzs7Ozs7OztXQU1pQiw4QkFBRztBQUNuQixVQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUE7QUFDdkMsVUFBSSxDQUFDLFFBQVEsRUFBRTtBQUNiLGVBQU8sRUFBRSxDQUFBO09BQ1Y7O0FBRUQsYUFBTyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUE7S0FDMUM7Ozs7Ozs7O1dBTWMsMkJBQUc7QUFDaEIsYUFBTyxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQTtLQUNyRDs7O1NBbEZrQixXQUFXOzs7cUJBQVgsV0FBVyIsImZpbGUiOiJmaWxlOi8vL0M6L1VzZXJzL2Nrbmp1Ly5hdG9tL3BhY2thZ2VzL3NjcmlwdC9saWIvY29kZS1jb250ZXh0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2UgYmFiZWxcIlxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb2RlQ29udGV4dCB7XG4gIC8vIFB1YmxpYzogSW5pdGlhbGl6ZXMgYSBuZXcge0NvZGVDb250ZXh0fSBvYmplY3QgZm9yIHRoZSBnaXZlbiBmaWxlL2xpbmVcbiAgLy9cbiAgLy8gQGZpbGVuYW1lICAgLSBUaGUge1N0cmluZ30gZmlsZW5hbWUgb2YgdGhlIGZpbGUgdG8gZXhlY3V0ZS5cbiAgLy8gQGZpbGVwYXRoICAgLSBUaGUge1N0cmluZ30gcGF0aCBvZiB0aGUgZmlsZSB0byBleGVjdXRlLlxuICAvLyBAdGV4dFNvdXJjZSAtIFRoZSB7U3RyaW5nfSB0ZXh0IHRvIHVuZGVyIFwiU2VsZWN0aW9uIEJhc2VkXCIuIChkZWZhdWx0OiBudWxsKVxuICAvL1xuICAvLyBSZXR1cm5zIGEgbmV3bHkgY3JlYXRlZCB7Q29kZUNvbnRleHR9IG9iamVjdC5cbiAgY29uc3RydWN0b3IoZmlsZW5hbWUsIGZpbGVwYXRoLCB0ZXh0U291cmNlID0gbnVsbCkge1xuICAgIHRoaXMubGluZU51bWJlciA9IG51bGxcbiAgICB0aGlzLnNoZWJhbmcgPSBudWxsXG4gICAgdGhpcy5maWxlbmFtZSA9IGZpbGVuYW1lXG4gICAgdGhpcy5maWxlcGF0aCA9IGZpbGVwYXRoXG4gICAgdGhpcy50ZXh0U291cmNlID0gdGV4dFNvdXJjZVxuICB9XG5cbiAgLy8gUHVibGljOiBDcmVhdGVzIGEge1N0cmluZ30gcmVwcmVzZW50YXRpb24gb2YgdGhlIGZpbGUgYW5kIGxpbmUgbnVtYmVyXG4gIC8vXG4gIC8vIGZ1bGxQYXRoIC0gV2hldGhlciB0byBleHBhbmQgdGhlIGZpbGUgcGF0aC4gKGRlZmF1bHQ6IHRydWUpXG4gIC8vXG4gIC8vIFJldHVybnMgdGhlIFwiZmlsZSBjb2xvbiBsaW5lXCIge1N0cmluZ30uXG4gIGZpbGVDb2xvbkxpbmUoZnVsbFBhdGggPSB0cnVlKSB7XG4gICAgbGV0IGZpbGVDb2xvbkxpbmVcbiAgICBpZiAoZnVsbFBhdGgpIHtcbiAgICAgIGZpbGVDb2xvbkxpbmUgPSB0aGlzLmZpbGVwYXRoXG4gICAgfSBlbHNlIHtcbiAgICAgIGZpbGVDb2xvbkxpbmUgPSB0aGlzLmZpbGVuYW1lXG4gICAgfVxuXG4gICAgaWYgKCF0aGlzLmxpbmVOdW1iZXIpIHtcbiAgICAgIHJldHVybiBmaWxlQ29sb25MaW5lXG4gICAgfVxuICAgIHJldHVybiBgJHtmaWxlQ29sb25MaW5lfToke3RoaXMubGluZU51bWJlcn1gXG4gIH1cblxuICAvLyBQdWJsaWM6IFJldHJpZXZlcyB0aGUgdGV4dCBmcm9tIHdoYXRldmVyIHNvdXJjZSB3YXMgZ2l2ZW4gb24gaW5pdGlhbGl6YXRpb25cbiAgLy9cbiAgLy8gcHJlcGVuZE5ld2xpbmVzIC0gV2hldGhlciB0byBwcmVwZW5kIEBsaW5lTnVtYmVyIG5ld2xpbmVzIChkZWZhdWx0OiB0cnVlKVxuICAvL1xuICAvLyBSZXR1cm5zIHRoZSBjb2RlIHNlbGVjdGlvbiB7U3RyaW5nfVxuICBnZXRDb2RlKHByZXBlbmROZXdsaW5lcyA9IHRydWUpIHtcbiAgICBjb25zdCBjb2RlID0gdGhpcy50ZXh0U291cmNlID8gdGhpcy50ZXh0U291cmNlLmdldFRleHQoKSA6IG51bGxcbiAgICBpZiAoIXByZXBlbmROZXdsaW5lcyB8fCAhdGhpcy5saW5lTnVtYmVyKSB7XG4gICAgICByZXR1cm4gY29kZVxuICAgIH1cblxuICAgIGNvbnN0IG5ld2xpbmVDb3VudCA9IE51bWJlcih0aGlzLmxpbmVOdW1iZXIpXG4gICAgY29uc3QgbmV3bGluZXMgPSBBcnJheShuZXdsaW5lQ291bnQpLmpvaW4oXCJcXG5cIilcbiAgICByZXR1cm4gYCR7bmV3bGluZXN9JHtjb2RlfWBcbiAgfVxuXG4gIC8vIFB1YmxpYzogUmV0cmlldmVzIHRoZSBjb21tYW5kIG5hbWUgZnJvbSBAc2hlYmFuZ1xuICAvL1xuICAvLyBSZXR1cm5zIHRoZSB7U3RyaW5nfSBuYW1lIG9mIHRoZSBjb21tYW5kIG9yIHt1bmRlZmluZWR9IGlmIG5vdCBhcHBsaWNhYmxlLlxuICBzaGViYW5nQ29tbWFuZCgpIHtcbiAgICBjb25zdCBzZWN0aW9ucyA9IHRoaXMuc2hlYmFuZ1NlY3Rpb25zKClcbiAgICBpZiAoIXNlY3Rpb25zKSB7XG4gICAgICByZXR1cm4gbnVsbFxuICAgIH1cblxuICAgIHJldHVybiBzZWN0aW9uc1swXVxuICB9XG5cbiAgLy8gUHVibGljOiBSZXRyaWV2ZXMgdGhlIGNvbW1hbmQgYXJndW1lbnRzIChzdWNoIGFzIGZsYWdzIG9yIGFyZ3VtZW50cyB0b1xuICAvLyAvdXNyL2Jpbi9lbnYpIGZyb20gQHNoZWJhbmdcbiAgLy9cbiAgLy8gUmV0dXJucyB0aGUge1N0cmluZ30gbmFtZSBvZiB0aGUgY29tbWFuZCBvciB7dW5kZWZpbmVkfSBpZiBub3QgYXBwbGljYWJsZS5cbiAgc2hlYmFuZ0NvbW1hbmRBcmdzKCkge1xuICAgIGNvbnN0IHNlY3Rpb25zID0gdGhpcy5zaGViYW5nU2VjdGlvbnMoKVxuICAgIGlmICghc2VjdGlvbnMpIHtcbiAgICAgIHJldHVybiBbXVxuICAgIH1cblxuICAgIHJldHVybiBzZWN0aW9ucy5zbGljZSgxLCBzZWN0aW9ucy5sZW5ndGgpXG4gIH1cblxuICAvLyBQdWJsaWM6IFNwbGl0cyB0aGUgc2hlYmFuZyBzdHJpbmcgYnkgc3BhY2VzIHRvIGV4dHJhIHRoZSBjb21tYW5kIGFuZFxuICAvLyBhcmd1bWVudHNcbiAgLy9cbiAgLy8gUmV0dXJucyB0aGUge1N0cmluZ30gbmFtZSBvZiB0aGUgY29tbWFuZCBvciB7dW5kZWZpbmVkfSBpZiBub3QgYXBwbGljYWJsZS5cbiAgc2hlYmFuZ1NlY3Rpb25zKCkge1xuICAgIHJldHVybiB0aGlzLnNoZWJhbmcgPyB0aGlzLnNoZWJhbmcuc3BsaXQoXCIgXCIpIDogbnVsbFxuICB9XG59XG4iXX0=