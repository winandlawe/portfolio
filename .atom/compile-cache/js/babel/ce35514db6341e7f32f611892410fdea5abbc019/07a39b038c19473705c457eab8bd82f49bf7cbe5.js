Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _os = require('os');

var _os2 = _interopRequireDefault(_os);

// Public: GrammarUtils.OperatingSystem - a module which exposes different
// platform related helper functions.
'use babel';

exports['default'] = {
  isDarwin: function isDarwin() {
    return this.platform() === 'darwin';
  },

  isWindows: function isWindows() {
    return this.platform() === 'win32';
  },

  isLinux: function isLinux() {
    return this.platform() === 'linux';
  },

  platform: function platform() {
    return _os2['default'].platform();
  },

  architecture: function architecture() {
    return _os2['default'].arch();
  },

  release: function release() {
    return _os2['default'].release();
  }
};
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZpbGU6Ly8vQzovVXNlcnMvY2tuanUvLmF0b20vcGFja2FnZXMvc2NyaXB0L2xpYi9ncmFtbWFyLXV0aWxzL29wZXJhdGluZy1zeXN0ZW0uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O2tCQUVlLElBQUk7Ozs7OztBQUZuQixXQUFXLENBQUM7O3FCQU1HO0FBQ2IsVUFBUSxFQUFBLG9CQUFHO0FBQ1QsV0FBTyxJQUFJLENBQUMsUUFBUSxFQUFFLEtBQUssUUFBUSxDQUFDO0dBQ3JDOztBQUVELFdBQVMsRUFBQSxxQkFBRztBQUNWLFdBQU8sSUFBSSxDQUFDLFFBQVEsRUFBRSxLQUFLLE9BQU8sQ0FBQztHQUNwQzs7QUFFRCxTQUFPLEVBQUEsbUJBQUc7QUFDUixXQUFPLElBQUksQ0FBQyxRQUFRLEVBQUUsS0FBSyxPQUFPLENBQUM7R0FDcEM7O0FBRUQsVUFBUSxFQUFBLG9CQUFHO0FBQ1QsV0FBTyxnQkFBRyxRQUFRLEVBQUUsQ0FBQztHQUN0Qjs7QUFFRCxjQUFZLEVBQUEsd0JBQUc7QUFDYixXQUFPLGdCQUFHLElBQUksRUFBRSxDQUFDO0dBQ2xCOztBQUVELFNBQU8sRUFBQSxtQkFBRztBQUNSLFdBQU8sZ0JBQUcsT0FBTyxFQUFFLENBQUM7R0FDckI7Q0FDRiIsImZpbGUiOiJmaWxlOi8vL0M6L1VzZXJzL2Nrbmp1Ly5hdG9tL3BhY2thZ2VzL3NjcmlwdC9saWIvZ3JhbW1hci11dGlscy9vcGVyYXRpbmctc3lzdGVtLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBiYWJlbCc7XG5cbmltcG9ydCBvcyBmcm9tICdvcyc7XG5cbi8vIFB1YmxpYzogR3JhbW1hclV0aWxzLk9wZXJhdGluZ1N5c3RlbSAtIGEgbW9kdWxlIHdoaWNoIGV4cG9zZXMgZGlmZmVyZW50XG4vLyBwbGF0Zm9ybSByZWxhdGVkIGhlbHBlciBmdW5jdGlvbnMuXG5leHBvcnQgZGVmYXVsdCB7XG4gIGlzRGFyd2luKCkge1xuICAgIHJldHVybiB0aGlzLnBsYXRmb3JtKCkgPT09ICdkYXJ3aW4nO1xuICB9LFxuXG4gIGlzV2luZG93cygpIHtcbiAgICByZXR1cm4gdGhpcy5wbGF0Zm9ybSgpID09PSAnd2luMzInO1xuICB9LFxuXG4gIGlzTGludXgoKSB7XG4gICAgcmV0dXJuIHRoaXMucGxhdGZvcm0oKSA9PT0gJ2xpbnV4JztcbiAgfSxcblxuICBwbGF0Zm9ybSgpIHtcbiAgICByZXR1cm4gb3MucGxhdGZvcm0oKTtcbiAgfSxcblxuICBhcmNoaXRlY3R1cmUoKSB7XG4gICAgcmV0dXJuIG9zLmFyY2goKTtcbiAgfSxcblxuICByZWxlYXNlKCkge1xuICAgIHJldHVybiBvcy5yZWxlYXNlKCk7XG4gIH0sXG59O1xuIl19