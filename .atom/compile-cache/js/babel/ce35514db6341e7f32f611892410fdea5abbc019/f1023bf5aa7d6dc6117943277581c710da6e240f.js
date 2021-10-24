Object.defineProperty(exports, "__esModule", {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _os = require("os");

var _os2 = _interopRequireDefault(_os);

// Public: GrammarUtils.OperatingSystem - a module which exposes different
// platform related helper functions.
"use babel";

var GrammarUtilsOperatingSystem = {
  isDarwin: function isDarwin() {
    return this.platform() === "darwin";
  },

  isWindows: function isWindows() {
    return this.platform() === "win32";
  },

  isLinux: function isLinux() {
    return this.platform() === "linux";
  },

  platform: function platform() {
    return _os2["default"].platform();
  },

  architecture: function architecture() {
    return _os2["default"].arch();
  },

  release: function release() {
    return _os2["default"].release();
  }
};
exports["default"] = GrammarUtilsOperatingSystem;
module.exports = exports["default"];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZpbGU6Ly8vQzovVXNlcnMvY2tuanUvLmF0b20vcGFja2FnZXMvc2NyaXB0L2xpYi9ncmFtbWFyLXV0aWxzL29wZXJhdGluZy1zeXN0ZW0uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O2tCQUVlLElBQUk7Ozs7OztBQUZuQixXQUFXLENBQUE7O0FBTVgsSUFBTSwyQkFBMkIsR0FBRztBQUNsQyxVQUFRLEVBQUEsb0JBQUc7QUFDVCxXQUFPLElBQUksQ0FBQyxRQUFRLEVBQUUsS0FBSyxRQUFRLENBQUE7R0FDcEM7O0FBRUQsV0FBUyxFQUFBLHFCQUFHO0FBQ1YsV0FBTyxJQUFJLENBQUMsUUFBUSxFQUFFLEtBQUssT0FBTyxDQUFBO0dBQ25DOztBQUVELFNBQU8sRUFBQSxtQkFBRztBQUNSLFdBQU8sSUFBSSxDQUFDLFFBQVEsRUFBRSxLQUFLLE9BQU8sQ0FBQTtHQUNuQzs7QUFFRCxVQUFRLEVBQUEsb0JBQUc7QUFDVCxXQUFPLGdCQUFHLFFBQVEsRUFBRSxDQUFBO0dBQ3JCOztBQUVELGNBQVksRUFBQSx3QkFBRztBQUNiLFdBQU8sZ0JBQUcsSUFBSSxFQUFFLENBQUE7R0FDakI7O0FBRUQsU0FBTyxFQUFBLG1CQUFHO0FBQ1IsV0FBTyxnQkFBRyxPQUFPLEVBQUUsQ0FBQTtHQUNwQjtDQUNGLENBQUE7cUJBQ2MsMkJBQTJCIiwiZmlsZSI6ImZpbGU6Ly8vQzovVXNlcnMvY2tuanUvLmF0b20vcGFja2FnZXMvc2NyaXB0L2xpYi9ncmFtbWFyLXV0aWxzL29wZXJhdGluZy1zeXN0ZW0uanMiLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBiYWJlbFwiXG5cbmltcG9ydCBvcyBmcm9tIFwib3NcIlxuXG4vLyBQdWJsaWM6IEdyYW1tYXJVdGlscy5PcGVyYXRpbmdTeXN0ZW0gLSBhIG1vZHVsZSB3aGljaCBleHBvc2VzIGRpZmZlcmVudFxuLy8gcGxhdGZvcm0gcmVsYXRlZCBoZWxwZXIgZnVuY3Rpb25zLlxuY29uc3QgR3JhbW1hclV0aWxzT3BlcmF0aW5nU3lzdGVtID0ge1xuICBpc0RhcndpbigpIHtcbiAgICByZXR1cm4gdGhpcy5wbGF0Zm9ybSgpID09PSBcImRhcndpblwiXG4gIH0sXG5cbiAgaXNXaW5kb3dzKCkge1xuICAgIHJldHVybiB0aGlzLnBsYXRmb3JtKCkgPT09IFwid2luMzJcIlxuICB9LFxuXG4gIGlzTGludXgoKSB7XG4gICAgcmV0dXJuIHRoaXMucGxhdGZvcm0oKSA9PT0gXCJsaW51eFwiXG4gIH0sXG5cbiAgcGxhdGZvcm0oKSB7XG4gICAgcmV0dXJuIG9zLnBsYXRmb3JtKClcbiAgfSxcblxuICBhcmNoaXRlY3R1cmUoKSB7XG4gICAgcmV0dXJuIG9zLmFyY2goKVxuICB9LFxuXG4gIHJlbGVhc2UoKSB7XG4gICAgcmV0dXJuIG9zLnJlbGVhc2UoKVxuICB9LFxufVxuZXhwb3J0IGRlZmF1bHQgR3JhbW1hclV0aWxzT3BlcmF0aW5nU3lzdGVtXG4iXX0=