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

// Public: GrammarUtils.MATLAB - a module which assist the creation of MATLAB temporary files
"use babel";var GrammarUtilsMatlab = {
  tempFilesDir: _path2["default"].join(_os2["default"].tmpdir(), "atom_script_tempfiles"),

  // Public: Create a temporary file with the provided MATLAB code
  //
  // * `code`    A {String} containing some MATLAB code
  //
  // Returns the {String} filepath of the new file
  createTempFileWithCode: function createTempFileWithCode(code) {
    try {
      if (!_fs2["default"].existsSync(this.tempFilesDir)) {
        _fs2["default"].mkdirSync(this.tempFilesDir);
      }

      var tempFilePath = this.tempFilesDir + _path2["default"].sep + "m" + (0, _uuid.v1)().split("-").join("_") + ".m";

      var file = _fs2["default"].openSync(tempFilePath, "w");
      _fs2["default"].writeSync(file, code);
      _fs2["default"].closeSync(file);

      return tempFilePath;
    } catch (error) {
      throw new Error("Error while creating temporary file (" + error + ")");
    }
  }
};
exports["default"] = GrammarUtilsMatlab;
module.exports = exports["default"];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZpbGU6Ly8vQzovVXNlcnMvY2tuanUvLmF0b20vcGFja2FnZXMvc2NyaXB0L2xpYi9ncmFtbWFyLXV0aWxzL21hdGxhYi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztrQkFHZSxJQUFJOzs7O2tCQUNKLElBQUk7Ozs7b0JBQ0YsTUFBTTs7OztvQkFDTSxNQUFNOzs7QUFObkMsV0FBVyxDQUFBLEFBU1gsSUFBTSxrQkFBa0IsR0FBRztBQUN6QixjQUFZLEVBQUUsa0JBQUssSUFBSSxDQUFDLGdCQUFHLE1BQU0sRUFBRSxFQUFFLHVCQUF1QixDQUFDOzs7Ozs7O0FBTzdELHdCQUFzQixFQUFBLGdDQUFDLElBQUksRUFBRTtBQUMzQixRQUFJO0FBQ0YsVUFBSSxDQUFDLGdCQUFHLFVBQVUsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLEVBQUU7QUFDckMsd0JBQUcsU0FBUyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQTtPQUNoQzs7QUFFRCxVQUFNLFlBQVksR0FBTSxJQUFJLENBQUMsWUFBWSxHQUFHLGtCQUFLLEdBQUcsU0FBSSxlQUFRLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBSSxDQUFBOztBQUV6RixVQUFNLElBQUksR0FBRyxnQkFBRyxRQUFRLENBQUMsWUFBWSxFQUFFLEdBQUcsQ0FBQyxDQUFBO0FBQzNDLHNCQUFHLFNBQVMsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUE7QUFDeEIsc0JBQUcsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFBOztBQUVsQixhQUFPLFlBQVksQ0FBQTtLQUNwQixDQUFDLE9BQU8sS0FBSyxFQUFFO0FBQ2QsWUFBTSxJQUFJLEtBQUssMkNBQXlDLEtBQUssT0FBSSxDQUFBO0tBQ2xFO0dBQ0Y7Q0FDRixDQUFBO3FCQUNjLGtCQUFrQiIsImZpbGUiOiJmaWxlOi8vL0M6L1VzZXJzL2Nrbmp1Ly5hdG9tL3BhY2thZ2VzL3NjcmlwdC9saWIvZ3JhbW1hci11dGlscy9tYXRsYWIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBiYWJlbFwiXG5cbi8vIFJlcXVpcmUgc29tZSBsaWJzIHVzZWQgZm9yIGNyZWF0aW5nIHRlbXBvcmFyeSBmaWxlc1xuaW1wb3J0IG9zIGZyb20gXCJvc1wiXG5pbXBvcnQgZnMgZnJvbSBcImZzXCJcbmltcG9ydCBwYXRoIGZyb20gXCJwYXRoXCJcbmltcG9ydCB7IHYxIGFzIHV1aWR2MSB9IGZyb20gXCJ1dWlkXCJcblxuLy8gUHVibGljOiBHcmFtbWFyVXRpbHMuTUFUTEFCIC0gYSBtb2R1bGUgd2hpY2ggYXNzaXN0IHRoZSBjcmVhdGlvbiBvZiBNQVRMQUIgdGVtcG9yYXJ5IGZpbGVzXG5jb25zdCBHcmFtbWFyVXRpbHNNYXRsYWIgPSB7XG4gIHRlbXBGaWxlc0RpcjogcGF0aC5qb2luKG9zLnRtcGRpcigpLCBcImF0b21fc2NyaXB0X3RlbXBmaWxlc1wiKSxcblxuICAvLyBQdWJsaWM6IENyZWF0ZSBhIHRlbXBvcmFyeSBmaWxlIHdpdGggdGhlIHByb3ZpZGVkIE1BVExBQiBjb2RlXG4gIC8vXG4gIC8vICogYGNvZGVgICAgIEEge1N0cmluZ30gY29udGFpbmluZyBzb21lIE1BVExBQiBjb2RlXG4gIC8vXG4gIC8vIFJldHVybnMgdGhlIHtTdHJpbmd9IGZpbGVwYXRoIG9mIHRoZSBuZXcgZmlsZVxuICBjcmVhdGVUZW1wRmlsZVdpdGhDb2RlKGNvZGUpIHtcbiAgICB0cnkge1xuICAgICAgaWYgKCFmcy5leGlzdHNTeW5jKHRoaXMudGVtcEZpbGVzRGlyKSkge1xuICAgICAgICBmcy5ta2RpclN5bmModGhpcy50ZW1wRmlsZXNEaXIpXG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHRlbXBGaWxlUGF0aCA9IGAke3RoaXMudGVtcEZpbGVzRGlyICsgcGF0aC5zZXB9bSR7dXVpZHYxKCkuc3BsaXQoXCItXCIpLmpvaW4oXCJfXCIpfS5tYFxuXG4gICAgICBjb25zdCBmaWxlID0gZnMub3BlblN5bmModGVtcEZpbGVQYXRoLCBcIndcIilcbiAgICAgIGZzLndyaXRlU3luYyhmaWxlLCBjb2RlKVxuICAgICAgZnMuY2xvc2VTeW5jKGZpbGUpXG5cbiAgICAgIHJldHVybiB0ZW1wRmlsZVBhdGhcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBFcnJvciB3aGlsZSBjcmVhdGluZyB0ZW1wb3JhcnkgZmlsZSAoJHtlcnJvcn0pYClcbiAgICB9XG4gIH0sXG59XG5leHBvcnQgZGVmYXVsdCBHcmFtbWFyVXRpbHNNYXRsYWJcbiJdfQ==