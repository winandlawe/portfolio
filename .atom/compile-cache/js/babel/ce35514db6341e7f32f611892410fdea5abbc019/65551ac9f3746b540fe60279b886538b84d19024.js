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

// Public: GrammarUtils.D - a module which assist the creation of D temporary files
'use babel';exports['default'] = {
  tempFilesDir: _path2['default'].join(_os2['default'].tmpdir(), 'atom_script_tempfiles'),

  // Public: Create a temporary file with the provided D code
  //
  // * `code`    A {String} containing some D code
  //
  // Returns the {String} filepath of the new file
  createTempFileWithCode: function createTempFileWithCode(code) {
    try {
      if (!_fs2['default'].existsSync(this.tempFilesDir)) {
        _fs2['default'].mkdirSync(this.tempFilesDir);
      }

      var tempFilePath = this.tempFilesDir + _path2['default'].sep + 'm' + (0, _uuid.v1)().split('-').join('_') + '.d';

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZpbGU6Ly8vQzovVXNlcnMvY2tuanUvLmF0b20vcGFja2FnZXMvc2NyaXB0L2xpYi9ncmFtbWFyLXV0aWxzL2QuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7a0JBR2UsSUFBSTs7OztrQkFDSixJQUFJOzs7O29CQUNGLE1BQU07Ozs7b0JBQ00sTUFBTTs7O0FBTm5DLFdBQVcsQ0FBQyxxQkFTRztBQUNiLGNBQVksRUFBRSxrQkFBSyxJQUFJLENBQUMsZ0JBQUcsTUFBTSxFQUFFLEVBQUUsdUJBQXVCLENBQUM7Ozs7Ozs7QUFPN0Qsd0JBQXNCLEVBQUEsZ0NBQUMsSUFBSSxFQUFFO0FBQzNCLFFBQUk7QUFDRixVQUFJLENBQUMsZ0JBQUcsVUFBVSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsRUFBRTtBQUFFLHdCQUFHLFNBQVMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7T0FBRTs7QUFFM0UsVUFBTSxZQUFZLEdBQU0sSUFBSSxDQUFDLFlBQVksR0FBRyxrQkFBSyxHQUFHLFNBQUksZUFBUSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQUksQ0FBQzs7QUFFMUYsVUFBTSxJQUFJLEdBQUcsZ0JBQUcsUUFBUSxDQUFDLFlBQVksRUFBRSxHQUFHLENBQUMsQ0FBQztBQUM1QyxzQkFBRyxTQUFTLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0FBQ3pCLHNCQUFHLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQzs7QUFFbkIsYUFBTyxZQUFZLENBQUM7S0FDckIsQ0FBQyxPQUFPLEtBQUssRUFBRTtBQUNkLFlBQU0sSUFBSSxLQUFLLDJDQUF5QyxLQUFLLE9BQUksQ0FBQztLQUNuRTtHQUNGO0NBQ0YiLCJmaWxlIjoiZmlsZTovLy9DOi9Vc2Vycy9ja25qdS8uYXRvbS9wYWNrYWdlcy9zY3JpcHQvbGliL2dyYW1tYXItdXRpbHMvZC5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2UgYmFiZWwnO1xuXG4vLyBSZXF1aXJlIHNvbWUgbGlicyB1c2VkIGZvciBjcmVhdGluZyB0ZW1wb3JhcnkgZmlsZXNcbmltcG9ydCBvcyBmcm9tICdvcyc7XG5pbXBvcnQgZnMgZnJvbSAnZnMnO1xuaW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XG5pbXBvcnQgeyB2MSBhcyB1dWlkdjEgfSBmcm9tICd1dWlkJztcblxuLy8gUHVibGljOiBHcmFtbWFyVXRpbHMuRCAtIGEgbW9kdWxlIHdoaWNoIGFzc2lzdCB0aGUgY3JlYXRpb24gb2YgRCB0ZW1wb3JhcnkgZmlsZXNcbmV4cG9ydCBkZWZhdWx0IHtcbiAgdGVtcEZpbGVzRGlyOiBwYXRoLmpvaW4ob3MudG1wZGlyKCksICdhdG9tX3NjcmlwdF90ZW1wZmlsZXMnKSxcblxuICAvLyBQdWJsaWM6IENyZWF0ZSBhIHRlbXBvcmFyeSBmaWxlIHdpdGggdGhlIHByb3ZpZGVkIEQgY29kZVxuICAvL1xuICAvLyAqIGBjb2RlYCAgICBBIHtTdHJpbmd9IGNvbnRhaW5pbmcgc29tZSBEIGNvZGVcbiAgLy9cbiAgLy8gUmV0dXJucyB0aGUge1N0cmluZ30gZmlsZXBhdGggb2YgdGhlIG5ldyBmaWxlXG4gIGNyZWF0ZVRlbXBGaWxlV2l0aENvZGUoY29kZSkge1xuICAgIHRyeSB7XG4gICAgICBpZiAoIWZzLmV4aXN0c1N5bmModGhpcy50ZW1wRmlsZXNEaXIpKSB7IGZzLm1rZGlyU3luYyh0aGlzLnRlbXBGaWxlc0Rpcik7IH1cblxuICAgICAgY29uc3QgdGVtcEZpbGVQYXRoID0gYCR7dGhpcy50ZW1wRmlsZXNEaXIgKyBwYXRoLnNlcH1tJHt1dWlkdjEoKS5zcGxpdCgnLScpLmpvaW4oJ18nKX0uZGA7XG5cbiAgICAgIGNvbnN0IGZpbGUgPSBmcy5vcGVuU3luYyh0ZW1wRmlsZVBhdGgsICd3Jyk7XG4gICAgICBmcy53cml0ZVN5bmMoZmlsZSwgY29kZSk7XG4gICAgICBmcy5jbG9zZVN5bmMoZmlsZSk7XG5cbiAgICAgIHJldHVybiB0ZW1wRmlsZVBhdGg7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgRXJyb3Igd2hpbGUgY3JlYXRpbmcgdGVtcG9yYXJ5IGZpbGUgKCR7ZXJyb3J9KWApO1xuICAgIH1cbiAgfSxcbn07XG4iXX0=