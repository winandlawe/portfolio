Object.defineProperty(exports, "__esModule", {
  value: true
});

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// Require some libs used for creating temporary files

var _os = require("os");

var _os2 = _interopRequireDefault(_os);

var _fs = require("fs");

var fs = _interopRequireWildcard(_fs);

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _temp = require("temp");

var temp = _interopRequireWildcard(_temp);

var _rimraf = require("rimraf");

var rimraf = _interopRequireWildcard(_rimraf);

// Public: GrammarUtils - utilities for determining how to run code
"use babel";var GrammarUtils = {
  tempFilesDir: _path2["default"].join(_os2["default"].tmpdir(), "atom_script_tempfiles"),

  ensureTempDir: function ensureTempDir() {
    if (!fs.existsSync(this.tempFilesDir)) {
      fs.mkdirSync(this.tempFilesDir);
    }
  },

  // Public: Create a temporary path
  //
  // Returns the {String} filepath of the new file
  createTempPath: function createTempPath() {
    var prefix = arguments.length <= 0 || arguments[0] === undefined ? "" : arguments[0];
    var extension = arguments.length <= 1 || arguments[1] === undefined ? "" : arguments[1];

    this.ensureTempDir();
    return temp.path({ dir: this.tempFilesDir, prefix: prefix, suffix: extension });
  },

  // Public: Create a temporary directory
  //
  // Returns the {String} filepath of the new folder
  createTempFolder: function createTempFolder() {
    var prefix = arguments.length <= 0 || arguments[0] === undefined ? "" : arguments[0];

    this.ensureTempDir();
    return temp.mkdirSync({ dir: this.tempFilesDir, prefix: prefix });
  },

  // Public: Create a temporary file with the provided code
  //
  // * `code`    A {String} containing some code
  //
  // Returns the {String} filepath of the new file
  createTempFileWithCode: function createTempFileWithCode(code) {
    var extension = arguments.length <= 1 || arguments[1] === undefined ? "" : arguments[1];

    try {
      this.ensureTempDir();
      var tempFile = temp.openSync({ dir: this.tempFilesDir, suffix: extension });
      fs.writeSync(tempFile.fd, code);
      fs.closeSync(tempFile.fd);
      return tempFile.path;
    } catch (error) {
      throw new Error("Error while creating temporary file (" + error + ")");
    }
  },

  // Public: Delete all temporary files and the directory created by
  // {GrammarUtils::createTempFileWithCode}
  deleteTempFiles: function deleteTempFiles() {
    try {
      rimraf.sync(this.tempFilesDir);
    } catch (error) {
      console.error("Error while deleting temporary files (" + error + ")");
    }
  },

  // Public: Returns cmd or bash, depending on the current OS
  command: _os2["default"].platform() === "win32" ? "cmd" : "bash",

  // Public: Format args for cmd or bash, depending on the current OS
  formatArgs: function formatArgs(command) {
    if (_os2["default"].platform() === "win32") {
      return ["/c " + command.replace(/["']/g, "")];
    }
    return ["-c", command];
  },

  /** Get workingDirectory */
  workingDirectory: function workingDirectory() {
    var textEditor = atom.workspace.getActiveTextEditor();
    if (textEditor !== undefined) {
      return textEditor.getDirectoryPath();
    }
    return process.cwd();
  },

  // Public: Get the Java helper object
  //
  // Returns an {Object} which assists in preparing java + javac statements
  Java: require("./grammar-utils/java"),

  // Public: Get the Lisp helper object
  //
  // Returns an {Object} which assists in splitting Lisp statements.
  Lisp: require("./grammar-utils/lisp"),

  // Public: Get the MATLAB helper object
  //
  // Returns an {Object} which assists in splitting MATLAB statements.
  MATLAB: require("./grammar-utils/matlab"),

  // Public: Get the OperatingSystem helper object
  //
  // Returns an {Object} which assists in writing OS dependent code.
  OperatingSystem: require("./grammar-utils/operating-system"),

  // Public: Get the R helper object
  //
  // Returns an {Object} which assists in creating temp files containing R code
  R: require("./grammar-utils/R"),

  // Public: Get the Perl helper object
  //
  // Returns an {Object} which assists in creating temp files containing Perl code
  Perl: require("./grammar-utils/perl"),

  // Public: Get the PHP helper object
  //
  // Returns an {Object} which assists in creating temp files containing PHP code
  PHP: require("./grammar-utils/php"),

  // Public: Get the Nim helper object
  //
  // Returns an {Object} which assists in selecting the right project file for Nim code
  Nim: require("./grammar-utils/nim"),

  // Public: Get the D helper object
  //
  // Returns an {Object} which assists in creating temp files containing D code
  D: require("./grammar-utils/d")
};
exports["default"] = GrammarUtils;
module.exports = exports["default"];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZpbGU6Ly8vQzovVXNlcnMvY2tuanUvLmF0b20vcGFja2FnZXMvc2NyaXB0L2xpYi9ncmFtbWFyLXV0aWxzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7a0JBR2UsSUFBSTs7OztrQkFDQyxJQUFJOztJQUFaLEVBQUU7O29CQUNHLE1BQU07Ozs7b0JBQ0QsTUFBTTs7SUFBaEIsSUFBSTs7c0JBQ1EsUUFBUTs7SUFBcEIsTUFBTTs7O0FBUGxCLFdBQVcsQ0FBQSxBQVVYLElBQU0sWUFBWSxHQUFHO0FBQ25CLGNBQVksRUFBRSxrQkFBSyxJQUFJLENBQUMsZ0JBQUcsTUFBTSxFQUFFLEVBQUUsdUJBQXVCLENBQUM7O0FBRTdELGVBQWEsRUFBQSx5QkFBRztBQUNkLFFBQUksQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsRUFBRTtBQUNyQyxRQUFFLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQTtLQUNoQztHQUNGOzs7OztBQUtELGdCQUFjLEVBQUEsMEJBQThCO1FBQTdCLE1BQU0seURBQUcsRUFBRTtRQUFFLFNBQVMseURBQUcsRUFBRTs7QUFDeEMsUUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFBO0FBQ3BCLFdBQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUMsWUFBWSxFQUFFLE1BQU0sRUFBTixNQUFNLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxDQUFDLENBQUE7R0FDeEU7Ozs7O0FBS0Qsa0JBQWdCLEVBQUEsNEJBQWM7UUFBYixNQUFNLHlEQUFHLEVBQUU7O0FBQzFCLFFBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQTtBQUNwQixXQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLFlBQVksRUFBRSxNQUFNLEVBQU4sTUFBTSxFQUFFLENBQUMsQ0FBQTtHQUMxRDs7Ozs7OztBQU9ELHdCQUFzQixFQUFBLGdDQUFDLElBQUksRUFBa0I7UUFBaEIsU0FBUyx5REFBRyxFQUFFOztBQUN6QyxRQUFJO0FBQ0YsVUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFBO0FBQ3BCLFVBQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLFlBQVksRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLENBQUMsQ0FBQTtBQUM3RSxRQUFFLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLENBQUE7QUFDL0IsUUFBRSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUE7QUFDekIsYUFBTyxRQUFRLENBQUMsSUFBSSxDQUFBO0tBQ3JCLENBQUMsT0FBTyxLQUFLLEVBQUU7QUFDZCxZQUFNLElBQUksS0FBSywyQ0FBeUMsS0FBSyxPQUFJLENBQUE7S0FDbEU7R0FDRjs7OztBQUlELGlCQUFlLEVBQUEsMkJBQUc7QUFDaEIsUUFBSTtBQUNGLFlBQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFBO0tBQy9CLENBQUMsT0FBTyxLQUFLLEVBQUU7QUFDZCxhQUFPLENBQUMsS0FBSyw0Q0FBMEMsS0FBSyxPQUFJLENBQUE7S0FDakU7R0FDRjs7O0FBR0QsU0FBTyxFQUFFLGdCQUFHLFFBQVEsRUFBRSxLQUFLLE9BQU8sR0FBRyxLQUFLLEdBQUcsTUFBTTs7O0FBR25ELFlBQVUsRUFBQSxvQkFBQyxPQUFPLEVBQUU7QUFDbEIsUUFBSSxnQkFBRyxRQUFRLEVBQUUsS0FBSyxPQUFPLEVBQUU7QUFDN0IsYUFBTyxTQUFPLE9BQU8sQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FBQyxDQUFHLENBQUE7S0FDOUM7QUFDRCxXQUFPLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFBO0dBQ3ZCOzs7QUFHRCxrQkFBZ0IsRUFBQSw0QkFBRztBQUNqQixRQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLG1CQUFtQixFQUFFLENBQUE7QUFDdkQsUUFBSSxVQUFVLEtBQUssU0FBUyxFQUFFO0FBQzVCLGFBQU8sVUFBVSxDQUFDLGdCQUFnQixFQUFFLENBQUE7S0FDckM7QUFDRCxXQUFPLE9BQU8sQ0FBQyxHQUFHLEVBQUUsQ0FBQTtHQUNyQjs7Ozs7QUFLRCxNQUFJLEVBQUUsT0FBTyxDQUFDLHNCQUFzQixDQUFDOzs7OztBQUtyQyxNQUFJLEVBQUUsT0FBTyxDQUFDLHNCQUFzQixDQUFDOzs7OztBQUtyQyxRQUFNLEVBQUUsT0FBTyxDQUFDLHdCQUF3QixDQUFDOzs7OztBQUt6QyxpQkFBZSxFQUFFLE9BQU8sQ0FBQyxrQ0FBa0MsQ0FBQzs7Ozs7QUFLNUQsR0FBQyxFQUFFLE9BQU8sQ0FBQyxtQkFBbUIsQ0FBQzs7Ozs7QUFLL0IsTUFBSSxFQUFFLE9BQU8sQ0FBQyxzQkFBc0IsQ0FBQzs7Ozs7QUFLckMsS0FBRyxFQUFFLE9BQU8sQ0FBQyxxQkFBcUIsQ0FBQzs7Ozs7QUFLbkMsS0FBRyxFQUFFLE9BQU8sQ0FBQyxxQkFBcUIsQ0FBQzs7Ozs7QUFLbkMsR0FBQyxFQUFFLE9BQU8sQ0FBQyxtQkFBbUIsQ0FBQztDQUNoQyxDQUFBO3FCQUNjLFlBQVkiLCJmaWxlIjoiZmlsZTovLy9DOi9Vc2Vycy9ja25qdS8uYXRvbS9wYWNrYWdlcy9zY3JpcHQvbGliL2dyYW1tYXItdXRpbHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBiYWJlbFwiXG5cbi8vIFJlcXVpcmUgc29tZSBsaWJzIHVzZWQgZm9yIGNyZWF0aW5nIHRlbXBvcmFyeSBmaWxlc1xuaW1wb3J0IG9zIGZyb20gXCJvc1wiXG5pbXBvcnQgKiBhcyBmcyBmcm9tIFwiZnNcIlxuaW1wb3J0IHBhdGggZnJvbSBcInBhdGhcIlxuaW1wb3J0ICogYXMgdGVtcCBmcm9tIFwidGVtcFwiXG5pbXBvcnQgKiBhcyByaW1yYWYgZnJvbSBcInJpbXJhZlwiXG5cbi8vIFB1YmxpYzogR3JhbW1hclV0aWxzIC0gdXRpbGl0aWVzIGZvciBkZXRlcm1pbmluZyBob3cgdG8gcnVuIGNvZGVcbmNvbnN0IEdyYW1tYXJVdGlscyA9IHtcbiAgdGVtcEZpbGVzRGlyOiBwYXRoLmpvaW4ob3MudG1wZGlyKCksIFwiYXRvbV9zY3JpcHRfdGVtcGZpbGVzXCIpLFxuXG4gIGVuc3VyZVRlbXBEaXIoKSB7XG4gICAgaWYgKCFmcy5leGlzdHNTeW5jKHRoaXMudGVtcEZpbGVzRGlyKSkge1xuICAgICAgZnMubWtkaXJTeW5jKHRoaXMudGVtcEZpbGVzRGlyKVxuICAgIH1cbiAgfSxcblxuICAvLyBQdWJsaWM6IENyZWF0ZSBhIHRlbXBvcmFyeSBwYXRoXG4gIC8vXG4gIC8vIFJldHVybnMgdGhlIHtTdHJpbmd9IGZpbGVwYXRoIG9mIHRoZSBuZXcgZmlsZVxuICBjcmVhdGVUZW1wUGF0aChwcmVmaXggPSBcIlwiLCBleHRlbnNpb24gPSBcIlwiKSB7XG4gICAgdGhpcy5lbnN1cmVUZW1wRGlyKClcbiAgICByZXR1cm4gdGVtcC5wYXRoKHsgZGlyOiB0aGlzLnRlbXBGaWxlc0RpciwgcHJlZml4LCBzdWZmaXg6IGV4dGVuc2lvbiB9KVxuICB9LFxuXG4gIC8vIFB1YmxpYzogQ3JlYXRlIGEgdGVtcG9yYXJ5IGRpcmVjdG9yeVxuICAvL1xuICAvLyBSZXR1cm5zIHRoZSB7U3RyaW5nfSBmaWxlcGF0aCBvZiB0aGUgbmV3IGZvbGRlclxuICBjcmVhdGVUZW1wRm9sZGVyKHByZWZpeCA9IFwiXCIpIHtcbiAgICB0aGlzLmVuc3VyZVRlbXBEaXIoKVxuICAgIHJldHVybiB0ZW1wLm1rZGlyU3luYyh7IGRpcjogdGhpcy50ZW1wRmlsZXNEaXIsIHByZWZpeCB9KVxuICB9LFxuXG4gIC8vIFB1YmxpYzogQ3JlYXRlIGEgdGVtcG9yYXJ5IGZpbGUgd2l0aCB0aGUgcHJvdmlkZWQgY29kZVxuICAvL1xuICAvLyAqIGBjb2RlYCAgICBBIHtTdHJpbmd9IGNvbnRhaW5pbmcgc29tZSBjb2RlXG4gIC8vXG4gIC8vIFJldHVybnMgdGhlIHtTdHJpbmd9IGZpbGVwYXRoIG9mIHRoZSBuZXcgZmlsZVxuICBjcmVhdGVUZW1wRmlsZVdpdGhDb2RlKGNvZGUsIGV4dGVuc2lvbiA9IFwiXCIpIHtcbiAgICB0cnkge1xuICAgICAgdGhpcy5lbnN1cmVUZW1wRGlyKClcbiAgICAgIGNvbnN0IHRlbXBGaWxlID0gdGVtcC5vcGVuU3luYyh7IGRpcjogdGhpcy50ZW1wRmlsZXNEaXIsIHN1ZmZpeDogZXh0ZW5zaW9uIH0pXG4gICAgICBmcy53cml0ZVN5bmModGVtcEZpbGUuZmQsIGNvZGUpXG4gICAgICBmcy5jbG9zZVN5bmModGVtcEZpbGUuZmQpXG4gICAgICByZXR1cm4gdGVtcEZpbGUucGF0aFxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYEVycm9yIHdoaWxlIGNyZWF0aW5nIHRlbXBvcmFyeSBmaWxlICgke2Vycm9yfSlgKVxuICAgIH1cbiAgfSxcblxuICAvLyBQdWJsaWM6IERlbGV0ZSBhbGwgdGVtcG9yYXJ5IGZpbGVzIGFuZCB0aGUgZGlyZWN0b3J5IGNyZWF0ZWQgYnlcbiAgLy8ge0dyYW1tYXJVdGlsczo6Y3JlYXRlVGVtcEZpbGVXaXRoQ29kZX1cbiAgZGVsZXRlVGVtcEZpbGVzKCkge1xuICAgIHRyeSB7XG4gICAgICByaW1yYWYuc3luYyh0aGlzLnRlbXBGaWxlc0RpcilcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY29uc29sZS5lcnJvcihgRXJyb3Igd2hpbGUgZGVsZXRpbmcgdGVtcG9yYXJ5IGZpbGVzICgke2Vycm9yfSlgKVxuICAgIH1cbiAgfSxcblxuICAvLyBQdWJsaWM6IFJldHVybnMgY21kIG9yIGJhc2gsIGRlcGVuZGluZyBvbiB0aGUgY3VycmVudCBPU1xuICBjb21tYW5kOiBvcy5wbGF0Zm9ybSgpID09PSBcIndpbjMyXCIgPyBcImNtZFwiIDogXCJiYXNoXCIsXG5cbiAgLy8gUHVibGljOiBGb3JtYXQgYXJncyBmb3IgY21kIG9yIGJhc2gsIGRlcGVuZGluZyBvbiB0aGUgY3VycmVudCBPU1xuICBmb3JtYXRBcmdzKGNvbW1hbmQpIHtcbiAgICBpZiAob3MucGxhdGZvcm0oKSA9PT0gXCJ3aW4zMlwiKSB7XG4gICAgICByZXR1cm4gW2AvYyAke2NvbW1hbmQucmVwbGFjZSgvW1wiJ10vZywgXCJcIil9YF1cbiAgICB9XG4gICAgcmV0dXJuIFtcIi1jXCIsIGNvbW1hbmRdXG4gIH0sXG5cbiAgLyoqIEdldCB3b3JraW5nRGlyZWN0b3J5ICovXG4gIHdvcmtpbmdEaXJlY3RvcnkoKSB7XG4gICAgY29uc3QgdGV4dEVkaXRvciA9IGF0b20ud29ya3NwYWNlLmdldEFjdGl2ZVRleHRFZGl0b3IoKVxuICAgIGlmICh0ZXh0RWRpdG9yICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybiB0ZXh0RWRpdG9yLmdldERpcmVjdG9yeVBhdGgoKVxuICAgIH1cbiAgICByZXR1cm4gcHJvY2Vzcy5jd2QoKVxuICB9LFxuXG4gIC8vIFB1YmxpYzogR2V0IHRoZSBKYXZhIGhlbHBlciBvYmplY3RcbiAgLy9cbiAgLy8gUmV0dXJucyBhbiB7T2JqZWN0fSB3aGljaCBhc3Npc3RzIGluIHByZXBhcmluZyBqYXZhICsgamF2YWMgc3RhdGVtZW50c1xuICBKYXZhOiByZXF1aXJlKFwiLi9ncmFtbWFyLXV0aWxzL2phdmFcIiksXG5cbiAgLy8gUHVibGljOiBHZXQgdGhlIExpc3AgaGVscGVyIG9iamVjdFxuICAvL1xuICAvLyBSZXR1cm5zIGFuIHtPYmplY3R9IHdoaWNoIGFzc2lzdHMgaW4gc3BsaXR0aW5nIExpc3Agc3RhdGVtZW50cy5cbiAgTGlzcDogcmVxdWlyZShcIi4vZ3JhbW1hci11dGlscy9saXNwXCIpLFxuXG4gIC8vIFB1YmxpYzogR2V0IHRoZSBNQVRMQUIgaGVscGVyIG9iamVjdFxuICAvL1xuICAvLyBSZXR1cm5zIGFuIHtPYmplY3R9IHdoaWNoIGFzc2lzdHMgaW4gc3BsaXR0aW5nIE1BVExBQiBzdGF0ZW1lbnRzLlxuICBNQVRMQUI6IHJlcXVpcmUoXCIuL2dyYW1tYXItdXRpbHMvbWF0bGFiXCIpLFxuXG4gIC8vIFB1YmxpYzogR2V0IHRoZSBPcGVyYXRpbmdTeXN0ZW0gaGVscGVyIG9iamVjdFxuICAvL1xuICAvLyBSZXR1cm5zIGFuIHtPYmplY3R9IHdoaWNoIGFzc2lzdHMgaW4gd3JpdGluZyBPUyBkZXBlbmRlbnQgY29kZS5cbiAgT3BlcmF0aW5nU3lzdGVtOiByZXF1aXJlKFwiLi9ncmFtbWFyLXV0aWxzL29wZXJhdGluZy1zeXN0ZW1cIiksXG5cbiAgLy8gUHVibGljOiBHZXQgdGhlIFIgaGVscGVyIG9iamVjdFxuICAvL1xuICAvLyBSZXR1cm5zIGFuIHtPYmplY3R9IHdoaWNoIGFzc2lzdHMgaW4gY3JlYXRpbmcgdGVtcCBmaWxlcyBjb250YWluaW5nIFIgY29kZVxuICBSOiByZXF1aXJlKFwiLi9ncmFtbWFyLXV0aWxzL1JcIiksXG5cbiAgLy8gUHVibGljOiBHZXQgdGhlIFBlcmwgaGVscGVyIG9iamVjdFxuICAvL1xuICAvLyBSZXR1cm5zIGFuIHtPYmplY3R9IHdoaWNoIGFzc2lzdHMgaW4gY3JlYXRpbmcgdGVtcCBmaWxlcyBjb250YWluaW5nIFBlcmwgY29kZVxuICBQZXJsOiByZXF1aXJlKFwiLi9ncmFtbWFyLXV0aWxzL3BlcmxcIiksXG5cbiAgLy8gUHVibGljOiBHZXQgdGhlIFBIUCBoZWxwZXIgb2JqZWN0XG4gIC8vXG4gIC8vIFJldHVybnMgYW4ge09iamVjdH0gd2hpY2ggYXNzaXN0cyBpbiBjcmVhdGluZyB0ZW1wIGZpbGVzIGNvbnRhaW5pbmcgUEhQIGNvZGVcbiAgUEhQOiByZXF1aXJlKFwiLi9ncmFtbWFyLXV0aWxzL3BocFwiKSxcblxuICAvLyBQdWJsaWM6IEdldCB0aGUgTmltIGhlbHBlciBvYmplY3RcbiAgLy9cbiAgLy8gUmV0dXJucyBhbiB7T2JqZWN0fSB3aGljaCBhc3Npc3RzIGluIHNlbGVjdGluZyB0aGUgcmlnaHQgcHJvamVjdCBmaWxlIGZvciBOaW0gY29kZVxuICBOaW06IHJlcXVpcmUoXCIuL2dyYW1tYXItdXRpbHMvbmltXCIpLFxuXG4gIC8vIFB1YmxpYzogR2V0IHRoZSBEIGhlbHBlciBvYmplY3RcbiAgLy9cbiAgLy8gUmV0dXJucyBhbiB7T2JqZWN0fSB3aGljaCBhc3Npc3RzIGluIGNyZWF0aW5nIHRlbXAgZmlsZXMgY29udGFpbmluZyBEIGNvZGVcbiAgRDogcmVxdWlyZShcIi4vZ3JhbW1hci11dGlscy9kXCIpLFxufVxuZXhwb3J0IGRlZmF1bHQgR3JhbW1hclV0aWxzXG4iXX0=