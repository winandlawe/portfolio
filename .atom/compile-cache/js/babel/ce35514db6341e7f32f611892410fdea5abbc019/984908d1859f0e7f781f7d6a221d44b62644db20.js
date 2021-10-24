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

// Public: GrammarUtils - utilities for determining how to run code
'use babel';exports['default'] = {
  tempFilesDir: _path2['default'].join(_os2['default'].tmpdir(), 'atom_script_tempfiles'),

  // Public: Create a temporary file with the provided code
  //
  // * `code`    A {String} containing some code
  //
  // Returns the {String} filepath of the new file
  createTempFileWithCode: function createTempFileWithCode(code) {
    var extension = arguments.length <= 1 || arguments[1] === undefined ? '' : arguments[1];

    try {
      if (!_fs2['default'].existsSync(this.tempFilesDir)) {
        _fs2['default'].mkdirSync(this.tempFilesDir);
      }

      var tempFilePath = this.tempFilesDir + _path2['default'].sep + (0, _uuid.v1)() + extension;

      var file = _fs2['default'].openSync(tempFilePath, 'w');
      _fs2['default'].writeSync(file, code);
      _fs2['default'].closeSync(file);

      return tempFilePath;
    } catch (error) {
      throw new Error('Error while creating temporary file (' + error + ')');
    }
  },

  // Public: Delete all temporary files and the directory created by
  // {GrammarUtils::createTempFileWithCode}
  deleteTempFiles: function deleteTempFiles() {
    var _this = this;

    try {
      if (_fs2['default'].existsSync(this.tempFilesDir)) {
        var files = _fs2['default'].readdirSync(this.tempFilesDir);
        if (files.length) {
          files.forEach(function (file) {
            return _fs2['default'].unlinkSync(_this.tempFilesDir + _path2['default'].sep + file);
          });
        }
        return _fs2['default'].rmdirSync(this.tempFilesDir);
      }
      return null;
    } catch (error) {
      throw new Error('Error while deleting temporary files (' + error + ')');
    }
  },

  // Public: Returns cmd or bash, depending on the current OS
  command: _os2['default'].platform() === 'win32' ? 'cmd' : 'bash',

  // Public: Format args for cmd or bash, depending on the current OS
  formatArgs: function formatArgs(command) {
    if (_os2['default'].platform() === 'win32') {
      return ['/c ' + command.replace(/['"]/g, '')];
    }
    return ['-c', command];
  },

  /* eslint-disable global-require */
  // Public: Get the Java helper object
  //
  // Returns an {Object} which assists in preparing java + javac statements
  Java: require('./grammar-utils/java'),

  // Public: Get the Lisp helper object
  //
  // Returns an {Object} which assists in splitting Lisp statements.
  Lisp: require('./grammar-utils/lisp'),

  // Public: Get the MATLAB helper object
  //
  // Returns an {Object} which assists in splitting MATLAB statements.
  MATLAB: require('./grammar-utils/matlab'),

  // Public: Get the OperatingSystem helper object
  //
  // Returns an {Object} which assists in writing OS dependent code.
  OperatingSystem: require('./grammar-utils/operating-system'),

  // Public: Get the R helper object
  //
  // Returns an {Object} which assists in creating temp files containing R code
  R: require('./grammar-utils/R'),

  // Public: Get the Perl helper object
  //
  // Returns an {Object} which assists in creating temp files containing Perl code
  Perl: require('./grammar-utils/perl'),

  // Public: Get the PHP helper object
  //
  // Returns an {Object} which assists in creating temp files containing PHP code
  PHP: require('./grammar-utils/php'),

  // Public: Get the Nim helper object
  //
  // Returns an {Object} which assists in selecting the right project file for Nim code
  Nim: require('./grammar-utils/nim'),

  // Public: Get the D helper object
  //
  // Returns an {Object} which assists in creating temp files containing D code
  D: require('./grammar-utils/d')
};
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZpbGU6Ly8vQzovVXNlcnMvY2tuanUvLmF0b20vcGFja2FnZXMvc2NyaXB0L2xpYi9ncmFtbWFyLXV0aWxzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O2tCQUdlLElBQUk7Ozs7a0JBQ0osSUFBSTs7OztvQkFDRixNQUFNOzs7O29CQUNNLE1BQU07OztBQU5uQyxXQUFXLENBQUMscUJBU0c7QUFDYixjQUFZLEVBQUUsa0JBQUssSUFBSSxDQUFDLGdCQUFHLE1BQU0sRUFBRSxFQUFFLHVCQUF1QixDQUFDOzs7Ozs7O0FBTzdELHdCQUFzQixFQUFBLGdDQUFDLElBQUksRUFBa0I7UUFBaEIsU0FBUyx5REFBRyxFQUFFOztBQUN6QyxRQUFJO0FBQ0YsVUFBSSxDQUFDLGdCQUFHLFVBQVUsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLEVBQUU7QUFDckMsd0JBQUcsU0FBUyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztPQUNqQzs7QUFFRCxVQUFNLFlBQVksR0FBRyxJQUFJLENBQUMsWUFBWSxHQUFHLGtCQUFLLEdBQUcsR0FBRyxlQUFRLEdBQUcsU0FBUyxDQUFDOztBQUV6RSxVQUFNLElBQUksR0FBRyxnQkFBRyxRQUFRLENBQUMsWUFBWSxFQUFFLEdBQUcsQ0FBQyxDQUFDO0FBQzVDLHNCQUFHLFNBQVMsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7QUFDekIsc0JBQUcsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDOztBQUVuQixhQUFPLFlBQVksQ0FBQztLQUNyQixDQUFDLE9BQU8sS0FBSyxFQUFFO0FBQ2QsWUFBTSxJQUFJLEtBQUssMkNBQXlDLEtBQUssT0FBSSxDQUFDO0tBQ25FO0dBQ0Y7Ozs7QUFJRCxpQkFBZSxFQUFBLDJCQUFHOzs7QUFDaEIsUUFBSTtBQUNGLFVBQUksZ0JBQUcsVUFBVSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsRUFBRTtBQUNwQyxZQUFNLEtBQUssR0FBRyxnQkFBRyxXQUFXLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO0FBQ2hELFlBQUksS0FBSyxDQUFDLE1BQU0sRUFBRTtBQUNoQixlQUFLLENBQUMsT0FBTyxDQUFDLFVBQUMsSUFBSTttQkFBSyxnQkFBRyxVQUFVLENBQUMsTUFBSyxZQUFZLEdBQUcsa0JBQUssR0FBRyxHQUFHLElBQUksQ0FBQztXQUFBLENBQUMsQ0FBQztTQUM3RTtBQUNELGVBQU8sZ0JBQUcsU0FBUyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztPQUN4QztBQUNELGFBQU8sSUFBSSxDQUFDO0tBQ2IsQ0FBQyxPQUFPLEtBQUssRUFBRTtBQUNkLFlBQU0sSUFBSSxLQUFLLDRDQUEwQyxLQUFLLE9BQUksQ0FBQztLQUNwRTtHQUNGOzs7QUFHRCxTQUFPLEVBQUUsZ0JBQUcsUUFBUSxFQUFFLEtBQUssT0FBTyxHQUFHLEtBQUssR0FBRyxNQUFNOzs7QUFHbkQsWUFBVSxFQUFBLG9CQUFDLE9BQU8sRUFBRTtBQUNsQixRQUFJLGdCQUFHLFFBQVEsRUFBRSxLQUFLLE9BQU8sRUFBRTtBQUM3QixhQUFPLFNBQU8sT0FBTyxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUFDLENBQUcsQ0FBQztLQUMvQztBQUNELFdBQU8sQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUM7R0FDeEI7Ozs7OztBQU1ELE1BQUksRUFBRSxPQUFPLENBQUMsc0JBQXNCLENBQUM7Ozs7O0FBS3JDLE1BQUksRUFBRSxPQUFPLENBQUMsc0JBQXNCLENBQUM7Ozs7O0FBS3JDLFFBQU0sRUFBRSxPQUFPLENBQUMsd0JBQXdCLENBQUM7Ozs7O0FBS3pDLGlCQUFlLEVBQUUsT0FBTyxDQUFDLGtDQUFrQyxDQUFDOzs7OztBQUs1RCxHQUFDLEVBQUUsT0FBTyxDQUFDLG1CQUFtQixDQUFDOzs7OztBQUsvQixNQUFJLEVBQUUsT0FBTyxDQUFDLHNCQUFzQixDQUFDOzs7OztBQUtyQyxLQUFHLEVBQUUsT0FBTyxDQUFDLHFCQUFxQixDQUFDOzs7OztBQUtuQyxLQUFHLEVBQUUsT0FBTyxDQUFDLHFCQUFxQixDQUFDOzs7OztBQUtuQyxHQUFDLEVBQUUsT0FBTyxDQUFDLG1CQUFtQixDQUFDO0NBQ2hDIiwiZmlsZSI6ImZpbGU6Ly8vQzovVXNlcnMvY2tuanUvLmF0b20vcGFja2FnZXMvc2NyaXB0L2xpYi9ncmFtbWFyLXV0aWxzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBiYWJlbCc7XG5cbi8vIFJlcXVpcmUgc29tZSBsaWJzIHVzZWQgZm9yIGNyZWF0aW5nIHRlbXBvcmFyeSBmaWxlc1xuaW1wb3J0IG9zIGZyb20gJ29zJztcbmltcG9ydCBmcyBmcm9tICdmcyc7XG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJztcbmltcG9ydCB7IHYxIGFzIHV1aWR2MSB9IGZyb20gJ3V1aWQnO1xuXG4vLyBQdWJsaWM6IEdyYW1tYXJVdGlscyAtIHV0aWxpdGllcyBmb3IgZGV0ZXJtaW5pbmcgaG93IHRvIHJ1biBjb2RlXG5leHBvcnQgZGVmYXVsdCB7XG4gIHRlbXBGaWxlc0RpcjogcGF0aC5qb2luKG9zLnRtcGRpcigpLCAnYXRvbV9zY3JpcHRfdGVtcGZpbGVzJyksXG5cbiAgLy8gUHVibGljOiBDcmVhdGUgYSB0ZW1wb3JhcnkgZmlsZSB3aXRoIHRoZSBwcm92aWRlZCBjb2RlXG4gIC8vXG4gIC8vICogYGNvZGVgICAgIEEge1N0cmluZ30gY29udGFpbmluZyBzb21lIGNvZGVcbiAgLy9cbiAgLy8gUmV0dXJucyB0aGUge1N0cmluZ30gZmlsZXBhdGggb2YgdGhlIG5ldyBmaWxlXG4gIGNyZWF0ZVRlbXBGaWxlV2l0aENvZGUoY29kZSwgZXh0ZW5zaW9uID0gJycpIHtcbiAgICB0cnkge1xuICAgICAgaWYgKCFmcy5leGlzdHNTeW5jKHRoaXMudGVtcEZpbGVzRGlyKSkge1xuICAgICAgICBmcy5ta2RpclN5bmModGhpcy50ZW1wRmlsZXNEaXIpO1xuICAgICAgfVxuXG4gICAgICBjb25zdCB0ZW1wRmlsZVBhdGggPSB0aGlzLnRlbXBGaWxlc0RpciArIHBhdGguc2VwICsgdXVpZHYxKCkgKyBleHRlbnNpb247XG5cbiAgICAgIGNvbnN0IGZpbGUgPSBmcy5vcGVuU3luYyh0ZW1wRmlsZVBhdGgsICd3Jyk7XG4gICAgICBmcy53cml0ZVN5bmMoZmlsZSwgY29kZSk7XG4gICAgICBmcy5jbG9zZVN5bmMoZmlsZSk7XG5cbiAgICAgIHJldHVybiB0ZW1wRmlsZVBhdGg7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgRXJyb3Igd2hpbGUgY3JlYXRpbmcgdGVtcG9yYXJ5IGZpbGUgKCR7ZXJyb3J9KWApO1xuICAgIH1cbiAgfSxcblxuICAvLyBQdWJsaWM6IERlbGV0ZSBhbGwgdGVtcG9yYXJ5IGZpbGVzIGFuZCB0aGUgZGlyZWN0b3J5IGNyZWF0ZWQgYnlcbiAgLy8ge0dyYW1tYXJVdGlsczo6Y3JlYXRlVGVtcEZpbGVXaXRoQ29kZX1cbiAgZGVsZXRlVGVtcEZpbGVzKCkge1xuICAgIHRyeSB7XG4gICAgICBpZiAoZnMuZXhpc3RzU3luYyh0aGlzLnRlbXBGaWxlc0RpcikpIHtcbiAgICAgICAgY29uc3QgZmlsZXMgPSBmcy5yZWFkZGlyU3luYyh0aGlzLnRlbXBGaWxlc0Rpcik7XG4gICAgICAgIGlmIChmaWxlcy5sZW5ndGgpIHtcbiAgICAgICAgICBmaWxlcy5mb3JFYWNoKChmaWxlKSA9PiBmcy51bmxpbmtTeW5jKHRoaXMudGVtcEZpbGVzRGlyICsgcGF0aC5zZXAgKyBmaWxlKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZzLnJtZGlyU3luYyh0aGlzLnRlbXBGaWxlc0Rpcik7XG4gICAgICB9XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBFcnJvciB3aGlsZSBkZWxldGluZyB0ZW1wb3JhcnkgZmlsZXMgKCR7ZXJyb3J9KWApO1xuICAgIH1cbiAgfSxcblxuICAvLyBQdWJsaWM6IFJldHVybnMgY21kIG9yIGJhc2gsIGRlcGVuZGluZyBvbiB0aGUgY3VycmVudCBPU1xuICBjb21tYW5kOiBvcy5wbGF0Zm9ybSgpID09PSAnd2luMzInID8gJ2NtZCcgOiAnYmFzaCcsXG5cbiAgLy8gUHVibGljOiBGb3JtYXQgYXJncyBmb3IgY21kIG9yIGJhc2gsIGRlcGVuZGluZyBvbiB0aGUgY3VycmVudCBPU1xuICBmb3JtYXRBcmdzKGNvbW1hbmQpIHtcbiAgICBpZiAob3MucGxhdGZvcm0oKSA9PT0gJ3dpbjMyJykge1xuICAgICAgcmV0dXJuIFtgL2MgJHtjb21tYW5kLnJlcGxhY2UoL1snXCJdL2csICcnKX1gXTtcbiAgICB9XG4gICAgcmV0dXJuIFsnLWMnLCBjb21tYW5kXTtcbiAgfSxcblxuICAvKiBlc2xpbnQtZGlzYWJsZSBnbG9iYWwtcmVxdWlyZSAqL1xuICAvLyBQdWJsaWM6IEdldCB0aGUgSmF2YSBoZWxwZXIgb2JqZWN0XG4gIC8vXG4gIC8vIFJldHVybnMgYW4ge09iamVjdH0gd2hpY2ggYXNzaXN0cyBpbiBwcmVwYXJpbmcgamF2YSArIGphdmFjIHN0YXRlbWVudHNcbiAgSmF2YTogcmVxdWlyZSgnLi9ncmFtbWFyLXV0aWxzL2phdmEnKSxcblxuICAvLyBQdWJsaWM6IEdldCB0aGUgTGlzcCBoZWxwZXIgb2JqZWN0XG4gIC8vXG4gIC8vIFJldHVybnMgYW4ge09iamVjdH0gd2hpY2ggYXNzaXN0cyBpbiBzcGxpdHRpbmcgTGlzcCBzdGF0ZW1lbnRzLlxuICBMaXNwOiByZXF1aXJlKCcuL2dyYW1tYXItdXRpbHMvbGlzcCcpLFxuXG4gIC8vIFB1YmxpYzogR2V0IHRoZSBNQVRMQUIgaGVscGVyIG9iamVjdFxuICAvL1xuICAvLyBSZXR1cm5zIGFuIHtPYmplY3R9IHdoaWNoIGFzc2lzdHMgaW4gc3BsaXR0aW5nIE1BVExBQiBzdGF0ZW1lbnRzLlxuICBNQVRMQUI6IHJlcXVpcmUoJy4vZ3JhbW1hci11dGlscy9tYXRsYWInKSxcblxuICAvLyBQdWJsaWM6IEdldCB0aGUgT3BlcmF0aW5nU3lzdGVtIGhlbHBlciBvYmplY3RcbiAgLy9cbiAgLy8gUmV0dXJucyBhbiB7T2JqZWN0fSB3aGljaCBhc3Npc3RzIGluIHdyaXRpbmcgT1MgZGVwZW5kZW50IGNvZGUuXG4gIE9wZXJhdGluZ1N5c3RlbTogcmVxdWlyZSgnLi9ncmFtbWFyLXV0aWxzL29wZXJhdGluZy1zeXN0ZW0nKSxcblxuICAvLyBQdWJsaWM6IEdldCB0aGUgUiBoZWxwZXIgb2JqZWN0XG4gIC8vXG4gIC8vIFJldHVybnMgYW4ge09iamVjdH0gd2hpY2ggYXNzaXN0cyBpbiBjcmVhdGluZyB0ZW1wIGZpbGVzIGNvbnRhaW5pbmcgUiBjb2RlXG4gIFI6IHJlcXVpcmUoJy4vZ3JhbW1hci11dGlscy9SJyksXG5cbiAgLy8gUHVibGljOiBHZXQgdGhlIFBlcmwgaGVscGVyIG9iamVjdFxuICAvL1xuICAvLyBSZXR1cm5zIGFuIHtPYmplY3R9IHdoaWNoIGFzc2lzdHMgaW4gY3JlYXRpbmcgdGVtcCBmaWxlcyBjb250YWluaW5nIFBlcmwgY29kZVxuICBQZXJsOiByZXF1aXJlKCcuL2dyYW1tYXItdXRpbHMvcGVybCcpLFxuXG4gIC8vIFB1YmxpYzogR2V0IHRoZSBQSFAgaGVscGVyIG9iamVjdFxuICAvL1xuICAvLyBSZXR1cm5zIGFuIHtPYmplY3R9IHdoaWNoIGFzc2lzdHMgaW4gY3JlYXRpbmcgdGVtcCBmaWxlcyBjb250YWluaW5nIFBIUCBjb2RlXG4gIFBIUDogcmVxdWlyZSgnLi9ncmFtbWFyLXV0aWxzL3BocCcpLFxuXG4gIC8vIFB1YmxpYzogR2V0IHRoZSBOaW0gaGVscGVyIG9iamVjdFxuICAvL1xuICAvLyBSZXR1cm5zIGFuIHtPYmplY3R9IHdoaWNoIGFzc2lzdHMgaW4gc2VsZWN0aW5nIHRoZSByaWdodCBwcm9qZWN0IGZpbGUgZm9yIE5pbSBjb2RlXG4gIE5pbTogcmVxdWlyZSgnLi9ncmFtbWFyLXV0aWxzL25pbScpLFxuXG4gIC8vIFB1YmxpYzogR2V0IHRoZSBEIGhlbHBlciBvYmplY3RcbiAgLy9cbiAgLy8gUmV0dXJucyBhbiB7T2JqZWN0fSB3aGljaCBhc3Npc3RzIGluIGNyZWF0aW5nIHRlbXAgZmlsZXMgY29udGFpbmluZyBEIGNvZGVcbiAgRDogcmVxdWlyZSgnLi9ncmFtbWFyLXV0aWxzL2QnKSxcbn07XG4iXX0=