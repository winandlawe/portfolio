Object.defineProperty(exports, "__esModule", {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// Java script preparation functions

var _os = require("os");

var _os2 = _interopRequireDefault(_os);

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

"use babel";

var GrammarUtilsJava = {
  // Public: Get atom temp file directory
  //
  // Returns {String} containing atom temp file directory
  tempFilesDir: _path2["default"].join(_os2["default"].tmpdir()),

  // Public: Get class name of file in context
  //
  // * `filePath`  {String} containing file path
  //
  // Returns {String} containing class name of file
  getClassName: function getClassName(context) {
    return context.filename.replace(/\.java$/, "");
  },

  // Public: Get project path of context
  //
  // * `context`  {Object} containing current context
  //
  // Returns {String} containing the matching project path
  getProjectPath: function getProjectPath(context) {
    var projectPaths = atom.project.getPaths();
    return projectPaths.find(function (projectPath) {
      return context.filepath.includes(projectPath);
    });
  },

  // Public: Get package of file in context
  //
  // * `context`  {Object} containing current context
  //
  // Returns {String} containing class of contextual file
  getClassPackage: function getClassPackage(context) {
    var projectPath = module.exports.getProjectPath(context);
    var projectRemoved = context.filepath.replace(projectPath + "/", "");
    var filenameRemoved = projectRemoved.replace("/" + context.filename, "");

    // File is in root of src directory - no package
    if (filenameRemoved === projectRemoved) {
      return "";
    }

    return filenameRemoved + ".";
  }
};
exports["default"] = GrammarUtilsJava;
module.exports = exports["default"];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZpbGU6Ly8vQzovVXNlcnMvY2tuanUvLmF0b20vcGFja2FnZXMvc2NyaXB0L2xpYi9ncmFtbWFyLXV0aWxzL2phdmEuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7a0JBR2UsSUFBSTs7OztvQkFDRixNQUFNOzs7O0FBSnZCLFdBQVcsQ0FBQTs7QUFNWCxJQUFNLGdCQUFnQixHQUFHOzs7O0FBSXZCLGNBQVksRUFBRSxrQkFBSyxJQUFJLENBQUMsZ0JBQUcsTUFBTSxFQUFFLENBQUM7Ozs7Ozs7QUFPcEMsY0FBWSxFQUFBLHNCQUFDLE9BQU8sRUFBRTtBQUNwQixXQUFPLE9BQU8sQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSxFQUFFLENBQUMsQ0FBQTtHQUMvQzs7Ozs7OztBQU9ELGdCQUFjLEVBQUEsd0JBQUMsT0FBTyxFQUFFO0FBQ3RCLFFBQU0sWUFBWSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLENBQUE7QUFDNUMsV0FBTyxZQUFZLENBQUMsSUFBSSxDQUFDLFVBQUMsV0FBVzthQUFLLE9BQU8sQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQztLQUFBLENBQUMsQ0FBQTtHQUNsRjs7Ozs7OztBQU9ELGlCQUFlLEVBQUEseUJBQUMsT0FBTyxFQUFFO0FBQ3ZCLFFBQU0sV0FBVyxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxDQUFBO0FBQzFELFFBQU0sY0FBYyxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFJLFdBQVcsUUFBSyxFQUFFLENBQUMsQ0FBQTtBQUN0RSxRQUFNLGVBQWUsR0FBRyxjQUFjLENBQUMsT0FBTyxPQUFLLE9BQU8sQ0FBQyxRQUFRLEVBQUksRUFBRSxDQUFDLENBQUE7OztBQUcxRSxRQUFJLGVBQWUsS0FBSyxjQUFjLEVBQUU7QUFDdEMsYUFBTyxFQUFFLENBQUE7S0FDVjs7QUFFRCxXQUFVLGVBQWUsT0FBRztHQUM3QjtDQUNGLENBQUE7cUJBQ2MsZ0JBQWdCIiwiZmlsZSI6ImZpbGU6Ly8vQzovVXNlcnMvY2tuanUvLmF0b20vcGFja2FnZXMvc2NyaXB0L2xpYi9ncmFtbWFyLXV0aWxzL2phdmEuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBiYWJlbFwiXG5cbi8vIEphdmEgc2NyaXB0IHByZXBhcmF0aW9uIGZ1bmN0aW9uc1xuaW1wb3J0IG9zIGZyb20gXCJvc1wiXG5pbXBvcnQgcGF0aCBmcm9tIFwicGF0aFwiXG5cbmNvbnN0IEdyYW1tYXJVdGlsc0phdmEgPSB7XG4gIC8vIFB1YmxpYzogR2V0IGF0b20gdGVtcCBmaWxlIGRpcmVjdG9yeVxuICAvL1xuICAvLyBSZXR1cm5zIHtTdHJpbmd9IGNvbnRhaW5pbmcgYXRvbSB0ZW1wIGZpbGUgZGlyZWN0b3J5XG4gIHRlbXBGaWxlc0RpcjogcGF0aC5qb2luKG9zLnRtcGRpcigpKSxcblxuICAvLyBQdWJsaWM6IEdldCBjbGFzcyBuYW1lIG9mIGZpbGUgaW4gY29udGV4dFxuICAvL1xuICAvLyAqIGBmaWxlUGF0aGAgIHtTdHJpbmd9IGNvbnRhaW5pbmcgZmlsZSBwYXRoXG4gIC8vXG4gIC8vIFJldHVybnMge1N0cmluZ30gY29udGFpbmluZyBjbGFzcyBuYW1lIG9mIGZpbGVcbiAgZ2V0Q2xhc3NOYW1lKGNvbnRleHQpIHtcbiAgICByZXR1cm4gY29udGV4dC5maWxlbmFtZS5yZXBsYWNlKC9cXC5qYXZhJC8sIFwiXCIpXG4gIH0sXG5cbiAgLy8gUHVibGljOiBHZXQgcHJvamVjdCBwYXRoIG9mIGNvbnRleHRcbiAgLy9cbiAgLy8gKiBgY29udGV4dGAgIHtPYmplY3R9IGNvbnRhaW5pbmcgY3VycmVudCBjb250ZXh0XG4gIC8vXG4gIC8vIFJldHVybnMge1N0cmluZ30gY29udGFpbmluZyB0aGUgbWF0Y2hpbmcgcHJvamVjdCBwYXRoXG4gIGdldFByb2plY3RQYXRoKGNvbnRleHQpIHtcbiAgICBjb25zdCBwcm9qZWN0UGF0aHMgPSBhdG9tLnByb2plY3QuZ2V0UGF0aHMoKVxuICAgIHJldHVybiBwcm9qZWN0UGF0aHMuZmluZCgocHJvamVjdFBhdGgpID0+IGNvbnRleHQuZmlsZXBhdGguaW5jbHVkZXMocHJvamVjdFBhdGgpKVxuICB9LFxuXG4gIC8vIFB1YmxpYzogR2V0IHBhY2thZ2Ugb2YgZmlsZSBpbiBjb250ZXh0XG4gIC8vXG4gIC8vICogYGNvbnRleHRgICB7T2JqZWN0fSBjb250YWluaW5nIGN1cnJlbnQgY29udGV4dFxuICAvL1xuICAvLyBSZXR1cm5zIHtTdHJpbmd9IGNvbnRhaW5pbmcgY2xhc3Mgb2YgY29udGV4dHVhbCBmaWxlXG4gIGdldENsYXNzUGFja2FnZShjb250ZXh0KSB7XG4gICAgY29uc3QgcHJvamVjdFBhdGggPSBtb2R1bGUuZXhwb3J0cy5nZXRQcm9qZWN0UGF0aChjb250ZXh0KVxuICAgIGNvbnN0IHByb2plY3RSZW1vdmVkID0gY29udGV4dC5maWxlcGF0aC5yZXBsYWNlKGAke3Byb2plY3RQYXRofS9gLCBcIlwiKVxuICAgIGNvbnN0IGZpbGVuYW1lUmVtb3ZlZCA9IHByb2plY3RSZW1vdmVkLnJlcGxhY2UoYC8ke2NvbnRleHQuZmlsZW5hbWV9YCwgXCJcIilcblxuICAgIC8vIEZpbGUgaXMgaW4gcm9vdCBvZiBzcmMgZGlyZWN0b3J5IC0gbm8gcGFja2FnZVxuICAgIGlmIChmaWxlbmFtZVJlbW92ZWQgPT09IHByb2plY3RSZW1vdmVkKSB7XG4gICAgICByZXR1cm4gXCJcIlxuICAgIH1cblxuICAgIHJldHVybiBgJHtmaWxlbmFtZVJlbW92ZWR9LmBcbiAgfSxcbn1cbmV4cG9ydCBkZWZhdWx0IEdyYW1tYXJVdGlsc0phdmFcbiJdfQ==