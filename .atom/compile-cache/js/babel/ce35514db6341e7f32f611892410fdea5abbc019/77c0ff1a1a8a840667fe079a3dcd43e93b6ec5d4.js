Object.defineProperty(exports, "__esModule", {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// Require some libs used for creating temporary files

var _os = require("os");

var _os2 = _interopRequireDefault(_os);

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _uuid = require("uuid");

// Public: GrammarUtils.D - a module which assist the creation of D temporary files
"use babel";var GrammarUtilsD = {
  tempFilesDir: _path2["default"].join(_os2["default"].tmpdir(), "atom_script_tempfiles"),

  // Public: Create a temporary file with the provided D code
  //
  // * `code`    A {String} containing some D code
  //
  // Returns the {String} filepath of the new file
  createTempFileWithCode: function createTempFileWithCode(code) {
    try {
      if (!_fs2["default"].existsSync(this.tempFilesDir)) {
        _fs2["default"].mkdirSync(this.tempFilesDir);
      }

      var tempFilePath = this.tempFilesDir + _path2["default"].sep + "m" + (0, _uuid.v1)().split("-").join("_") + ".d";

      var file = _fs2["default"].openSync(tempFilePath, "w");
      _fs2["default"].writeSync(file, code);
      _fs2["default"].closeSync(file);

      return tempFilePath;
    } catch (error) {
      throw new Error("Error while creating temporary file (" + error + ")");
    }
  }
};
exports["default"] = GrammarUtilsD;
module.exports = exports["default"];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZpbGU6Ly8vQzovVXNlcnMvY2tuanUvLmF0b20vcGFja2FnZXMvc2NyaXB0L2xpYi9ncmFtbWFyLXV0aWxzL2QuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7a0JBR2UsSUFBSTs7OztrQkFDSixJQUFJOzs7O29CQUNGLE1BQU07Ozs7b0JBQ00sTUFBTTs7O0FBTm5DLFdBQVcsQ0FBQSxBQVNYLElBQU0sYUFBYSxHQUFHO0FBQ3BCLGNBQVksRUFBRSxrQkFBSyxJQUFJLENBQUMsZ0JBQUcsTUFBTSxFQUFFLEVBQUUsdUJBQXVCLENBQUM7Ozs7Ozs7QUFPN0Qsd0JBQXNCLEVBQUEsZ0NBQUMsSUFBSSxFQUFFO0FBQzNCLFFBQUk7QUFDRixVQUFJLENBQUMsZ0JBQUcsVUFBVSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsRUFBRTtBQUNyQyx3QkFBRyxTQUFTLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFBO09BQ2hDOztBQUVELFVBQU0sWUFBWSxHQUFNLElBQUksQ0FBQyxZQUFZLEdBQUcsa0JBQUssR0FBRyxTQUFJLGVBQVEsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFJLENBQUE7O0FBRXpGLFVBQU0sSUFBSSxHQUFHLGdCQUFHLFFBQVEsQ0FBQyxZQUFZLEVBQUUsR0FBRyxDQUFDLENBQUE7QUFDM0Msc0JBQUcsU0FBUyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQTtBQUN4QixzQkFBRyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUE7O0FBRWxCLGFBQU8sWUFBWSxDQUFBO0tBQ3BCLENBQUMsT0FBTyxLQUFLLEVBQUU7QUFDZCxZQUFNLElBQUksS0FBSywyQ0FBeUMsS0FBSyxPQUFJLENBQUE7S0FDbEU7R0FDRjtDQUNGLENBQUE7cUJBQ2MsYUFBYSIsImZpbGUiOiJmaWxlOi8vL0M6L1VzZXJzL2Nrbmp1Ly5hdG9tL3BhY2thZ2VzL3NjcmlwdC9saWIvZ3JhbW1hci11dGlscy9kLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2UgYmFiZWxcIlxuXG4vLyBSZXF1aXJlIHNvbWUgbGlicyB1c2VkIGZvciBjcmVhdGluZyB0ZW1wb3JhcnkgZmlsZXNcbmltcG9ydCBvcyBmcm9tIFwib3NcIlxuaW1wb3J0IGZzIGZyb20gXCJmc1wiXG5pbXBvcnQgcGF0aCBmcm9tIFwicGF0aFwiXG5pbXBvcnQgeyB2MSBhcyB1dWlkdjEgfSBmcm9tIFwidXVpZFwiXG5cbi8vIFB1YmxpYzogR3JhbW1hclV0aWxzLkQgLSBhIG1vZHVsZSB3aGljaCBhc3Npc3QgdGhlIGNyZWF0aW9uIG9mIEQgdGVtcG9yYXJ5IGZpbGVzXG5jb25zdCBHcmFtbWFyVXRpbHNEID0ge1xuICB0ZW1wRmlsZXNEaXI6IHBhdGguam9pbihvcy50bXBkaXIoKSwgXCJhdG9tX3NjcmlwdF90ZW1wZmlsZXNcIiksXG5cbiAgLy8gUHVibGljOiBDcmVhdGUgYSB0ZW1wb3JhcnkgZmlsZSB3aXRoIHRoZSBwcm92aWRlZCBEIGNvZGVcbiAgLy9cbiAgLy8gKiBgY29kZWAgICAgQSB7U3RyaW5nfSBjb250YWluaW5nIHNvbWUgRCBjb2RlXG4gIC8vXG4gIC8vIFJldHVybnMgdGhlIHtTdHJpbmd9IGZpbGVwYXRoIG9mIHRoZSBuZXcgZmlsZVxuICBjcmVhdGVUZW1wRmlsZVdpdGhDb2RlKGNvZGUpIHtcbiAgICB0cnkge1xuICAgICAgaWYgKCFmcy5leGlzdHNTeW5jKHRoaXMudGVtcEZpbGVzRGlyKSkge1xuICAgICAgICBmcy5ta2RpclN5bmModGhpcy50ZW1wRmlsZXNEaXIpXG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHRlbXBGaWxlUGF0aCA9IGAke3RoaXMudGVtcEZpbGVzRGlyICsgcGF0aC5zZXB9bSR7dXVpZHYxKCkuc3BsaXQoXCItXCIpLmpvaW4oXCJfXCIpfS5kYFxuXG4gICAgICBjb25zdCBmaWxlID0gZnMub3BlblN5bmModGVtcEZpbGVQYXRoLCBcIndcIilcbiAgICAgIGZzLndyaXRlU3luYyhmaWxlLCBjb2RlKVxuICAgICAgZnMuY2xvc2VTeW5jKGZpbGUpXG5cbiAgICAgIHJldHVybiB0ZW1wRmlsZVBhdGhcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBFcnJvciB3aGlsZSBjcmVhdGluZyB0ZW1wb3JhcnkgZmlsZSAoJHtlcnJvcn0pYClcbiAgICB9XG4gIH0sXG59XG5leHBvcnQgZGVmYXVsdCBHcmFtbWFyVXRpbHNEXG4iXX0=