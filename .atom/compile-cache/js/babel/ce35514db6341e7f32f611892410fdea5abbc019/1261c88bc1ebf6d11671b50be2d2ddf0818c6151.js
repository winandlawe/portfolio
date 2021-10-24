Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

// Require some libs used for creating temporary files

var _os = require('os');

var _os2 = _interopRequireDefault(_os);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _uuid = require('uuid');

// Public: GrammarUtils.MATLAB - a module which assist the creation of MATLAB temporary files
'use babel';exports['default'] = {
  tempFilesDir: _path2['default'].join(_os2['default'].tmpdir(), 'atom_script_tempfiles'),

  // Public: Create a temporary file with the provided MATLAB code
  //
  // * `code`    A {String} containing some MATLAB code
  //
  // Returns the {String} filepath of the new file
  createTempFileWithCode: function createTempFileWithCode(code) {
    try {
      if (!_fs2['default'].existsSync(this.tempFilesDir)) {
        _fs2['default'].mkdirSync(this.tempFilesDir);
      }

      var tempFilePath = this.tempFilesDir + _path2['default'].sep + 'm' + (0, _uuid.v1)().split('-').join('_') + '.m';

      var file = _fs2['default'].openSync(tempFilePath, 'w');
      _fs2['default'].writeSync(file, code);
      _fs2['default'].closeSync(file);

      return tempFilePath;
    } catch (error) {
      throw new Error('Error while creating temporary file (' + error + ')');
    }
  }
};
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZpbGU6Ly8vQzovVXNlcnMvY2tuanUvLmF0b20vcGFja2FnZXMvc2NyaXB0L2xpYi9ncmFtbWFyLXV0aWxzL21hdGxhYi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztrQkFHZSxJQUFJOzs7O2tCQUNKLElBQUk7Ozs7b0JBQ0YsTUFBTTs7OztvQkFDTSxNQUFNOzs7QUFObkMsV0FBVyxDQUFDLHFCQVNHO0FBQ2IsY0FBWSxFQUFFLGtCQUFLLElBQUksQ0FBQyxnQkFBRyxNQUFNLEVBQUUsRUFBRSx1QkFBdUIsQ0FBQzs7Ozs7OztBQU83RCx3QkFBc0IsRUFBQSxnQ0FBQyxJQUFJLEVBQUU7QUFDM0IsUUFBSTtBQUNGLFVBQUksQ0FBQyxnQkFBRyxVQUFVLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxFQUFFO0FBQUUsd0JBQUcsU0FBUyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztPQUFFOztBQUUzRSxVQUFNLFlBQVksR0FBTSxJQUFJLENBQUMsWUFBWSxHQUFHLGtCQUFLLEdBQUcsU0FBSSxlQUFRLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBSSxDQUFDOztBQUUxRixVQUFNLElBQUksR0FBRyxnQkFBRyxRQUFRLENBQUMsWUFBWSxFQUFFLEdBQUcsQ0FBQyxDQUFDO0FBQzVDLHNCQUFHLFNBQVMsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7QUFDekIsc0JBQUcsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDOztBQUVuQixhQUFPLFlBQVksQ0FBQztLQUNyQixDQUFDLE9BQU8sS0FBSyxFQUFFO0FBQ2QsWUFBTSxJQUFJLEtBQUssMkNBQXlDLEtBQUssT0FBSSxDQUFDO0tBQ25FO0dBQ0Y7Q0FDRiIsImZpbGUiOiJmaWxlOi8vL0M6L1VzZXJzL2Nrbmp1Ly5hdG9tL3BhY2thZ2VzL3NjcmlwdC9saWIvZ3JhbW1hci11dGlscy9tYXRsYWIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIGJhYmVsJztcblxuLy8gUmVxdWlyZSBzb21lIGxpYnMgdXNlZCBmb3IgY3JlYXRpbmcgdGVtcG9yYXJ5IGZpbGVzXG5pbXBvcnQgb3MgZnJvbSAnb3MnO1xuaW1wb3J0IGZzIGZyb20gJ2ZzJztcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnO1xuaW1wb3J0IHsgdjEgYXMgdXVpZHYxIH0gZnJvbSAndXVpZCc7XG5cbi8vIFB1YmxpYzogR3JhbW1hclV0aWxzLk1BVExBQiAtIGEgbW9kdWxlIHdoaWNoIGFzc2lzdCB0aGUgY3JlYXRpb24gb2YgTUFUTEFCIHRlbXBvcmFyeSBmaWxlc1xuZXhwb3J0IGRlZmF1bHQge1xuICB0ZW1wRmlsZXNEaXI6IHBhdGguam9pbihvcy50bXBkaXIoKSwgJ2F0b21fc2NyaXB0X3RlbXBmaWxlcycpLFxuXG4gIC8vIFB1YmxpYzogQ3JlYXRlIGEgdGVtcG9yYXJ5IGZpbGUgd2l0aCB0aGUgcHJvdmlkZWQgTUFUTEFCIGNvZGVcbiAgLy9cbiAgLy8gKiBgY29kZWAgICAgQSB7U3RyaW5nfSBjb250YWluaW5nIHNvbWUgTUFUTEFCIGNvZGVcbiAgLy9cbiAgLy8gUmV0dXJucyB0aGUge1N0cmluZ30gZmlsZXBhdGggb2YgdGhlIG5ldyBmaWxlXG4gIGNyZWF0ZVRlbXBGaWxlV2l0aENvZGUoY29kZSkge1xuICAgIHRyeSB7XG4gICAgICBpZiAoIWZzLmV4aXN0c1N5bmModGhpcy50ZW1wRmlsZXNEaXIpKSB7IGZzLm1rZGlyU3luYyh0aGlzLnRlbXBGaWxlc0Rpcik7IH1cblxuICAgICAgY29uc3QgdGVtcEZpbGVQYXRoID0gYCR7dGhpcy50ZW1wRmlsZXNEaXIgKyBwYXRoLnNlcH1tJHt1dWlkdjEoKS5zcGxpdCgnLScpLmpvaW4oJ18nKX0ubWA7XG5cbiAgICAgIGNvbnN0IGZpbGUgPSBmcy5vcGVuU3luYyh0ZW1wRmlsZVBhdGgsICd3Jyk7XG4gICAgICBmcy53cml0ZVN5bmMoZmlsZSwgY29kZSk7XG4gICAgICBmcy5jbG9zZVN5bmMoZmlsZSk7XG5cbiAgICAgIHJldHVybiB0ZW1wRmlsZVBhdGg7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgRXJyb3Igd2hpbGUgY3JlYXRpbmcgdGVtcG9yYXJ5IGZpbGUgKCR7ZXJyb3J9KWApO1xuICAgIH1cbiAgfSxcbn07XG4iXX0=