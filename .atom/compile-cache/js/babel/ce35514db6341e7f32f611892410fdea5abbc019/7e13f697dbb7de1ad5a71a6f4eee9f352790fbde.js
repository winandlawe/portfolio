Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

// Java script preparation functions

var _os = require('os');

var _os2 = _interopRequireDefault(_os);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

'use babel';exports['default'] = {
  // Public: Get atom temp file directory
  //
  // Returns {String} containing atom temp file directory
  tempFilesDir: _path2['default'].join(_os2['default'].tmpdir()),

  // Public: Get class name of file in context
  //
  // * `filePath`  {String} containing file path
  //
  // Returns {String} containing class name of file
  getClassName: function getClassName(context) {
    return context.filename.replace(/\.java$/, '');
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
    var projectRemoved = context.filepath.replace(projectPath + '/', '');
    var filenameRemoved = projectRemoved.replace('/' + context.filename, '');

    // File is in root of src directory - no package
    if (filenameRemoved === projectRemoved) {
      return '';
    }

    return filenameRemoved + '.';
  }
};
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZpbGU6Ly8vQzovVXNlcnMvY2tuanUvLmF0b20vcGFja2FnZXMvc2NyaXB0L2xpYi9ncmFtbWFyLXV0aWxzL2phdmEuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7a0JBR2UsSUFBSTs7OztvQkFDRixNQUFNOzs7O0FBSnZCLFdBQVcsQ0FBQyxxQkFNRzs7OztBQUliLGNBQVksRUFBRSxrQkFBSyxJQUFJLENBQUMsZ0JBQUcsTUFBTSxFQUFFLENBQUM7Ozs7Ozs7QUFPcEMsY0FBWSxFQUFBLHNCQUFDLE9BQU8sRUFBRTtBQUNwQixXQUFPLE9BQU8sQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSxFQUFFLENBQUMsQ0FBQztHQUNoRDs7Ozs7OztBQU9ELGdCQUFjLEVBQUEsd0JBQUMsT0FBTyxFQUFFO0FBQ3RCLFFBQU0sWUFBWSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLENBQUM7QUFDN0MsV0FBTyxZQUFZLENBQUMsSUFBSSxDQUFDLFVBQUMsV0FBVzthQUFLLE9BQU8sQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQztLQUFBLENBQUMsQ0FBQztHQUNuRjs7Ozs7OztBQU9ELGlCQUFlLEVBQUEseUJBQUMsT0FBTyxFQUFFO0FBQ3ZCLFFBQU0sV0FBVyxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQzNELFFBQU0sY0FBYyxHQUFJLE9BQU8sQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFJLFdBQVcsUUFBSyxFQUFFLENBQUMsQUFBQyxDQUFDO0FBQ3pFLFFBQU0sZUFBZSxHQUFHLGNBQWMsQ0FBQyxPQUFPLE9BQUssT0FBTyxDQUFDLFFBQVEsRUFBSSxFQUFFLENBQUMsQ0FBQzs7O0FBRzNFLFFBQUksZUFBZSxLQUFLLGNBQWMsRUFBRTtBQUN0QyxhQUFPLEVBQUUsQ0FBQztLQUNYOztBQUVELFdBQVUsZUFBZSxPQUFJO0dBQzlCO0NBQ0YiLCJmaWxlIjoiZmlsZTovLy9DOi9Vc2Vycy9ja25qdS8uYXRvbS9wYWNrYWdlcy9zY3JpcHQvbGliL2dyYW1tYXItdXRpbHMvamF2YS5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2UgYmFiZWwnO1xuXG4vLyBKYXZhIHNjcmlwdCBwcmVwYXJhdGlvbiBmdW5jdGlvbnNcbmltcG9ydCBvcyBmcm9tICdvcyc7XG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJztcblxuZXhwb3J0IGRlZmF1bHQge1xuICAvLyBQdWJsaWM6IEdldCBhdG9tIHRlbXAgZmlsZSBkaXJlY3RvcnlcbiAgLy9cbiAgLy8gUmV0dXJucyB7U3RyaW5nfSBjb250YWluaW5nIGF0b20gdGVtcCBmaWxlIGRpcmVjdG9yeVxuICB0ZW1wRmlsZXNEaXI6IHBhdGguam9pbihvcy50bXBkaXIoKSksXG5cbiAgLy8gUHVibGljOiBHZXQgY2xhc3MgbmFtZSBvZiBmaWxlIGluIGNvbnRleHRcbiAgLy9cbiAgLy8gKiBgZmlsZVBhdGhgICB7U3RyaW5nfSBjb250YWluaW5nIGZpbGUgcGF0aFxuICAvL1xuICAvLyBSZXR1cm5zIHtTdHJpbmd9IGNvbnRhaW5pbmcgY2xhc3MgbmFtZSBvZiBmaWxlXG4gIGdldENsYXNzTmFtZShjb250ZXh0KSB7XG4gICAgcmV0dXJuIGNvbnRleHQuZmlsZW5hbWUucmVwbGFjZSgvXFwuamF2YSQvLCAnJyk7XG4gIH0sXG5cbiAgLy8gUHVibGljOiBHZXQgcHJvamVjdCBwYXRoIG9mIGNvbnRleHRcbiAgLy9cbiAgLy8gKiBgY29udGV4dGAgIHtPYmplY3R9IGNvbnRhaW5pbmcgY3VycmVudCBjb250ZXh0XG4gIC8vXG4gIC8vIFJldHVybnMge1N0cmluZ30gY29udGFpbmluZyB0aGUgbWF0Y2hpbmcgcHJvamVjdCBwYXRoXG4gIGdldFByb2plY3RQYXRoKGNvbnRleHQpIHtcbiAgICBjb25zdCBwcm9qZWN0UGF0aHMgPSBhdG9tLnByb2plY3QuZ2V0UGF0aHMoKTtcbiAgICByZXR1cm4gcHJvamVjdFBhdGhzLmZpbmQoKHByb2plY3RQYXRoKSA9PiBjb250ZXh0LmZpbGVwYXRoLmluY2x1ZGVzKHByb2plY3RQYXRoKSk7XG4gIH0sXG5cbiAgLy8gUHVibGljOiBHZXQgcGFja2FnZSBvZiBmaWxlIGluIGNvbnRleHRcbiAgLy9cbiAgLy8gKiBgY29udGV4dGAgIHtPYmplY3R9IGNvbnRhaW5pbmcgY3VycmVudCBjb250ZXh0XG4gIC8vXG4gIC8vIFJldHVybnMge1N0cmluZ30gY29udGFpbmluZyBjbGFzcyBvZiBjb250ZXh0dWFsIGZpbGVcbiAgZ2V0Q2xhc3NQYWNrYWdlKGNvbnRleHQpIHtcbiAgICBjb25zdCBwcm9qZWN0UGF0aCA9IG1vZHVsZS5leHBvcnRzLmdldFByb2plY3RQYXRoKGNvbnRleHQpO1xuICAgIGNvbnN0IHByb2plY3RSZW1vdmVkID0gKGNvbnRleHQuZmlsZXBhdGgucmVwbGFjZShgJHtwcm9qZWN0UGF0aH0vYCwgJycpKTtcbiAgICBjb25zdCBmaWxlbmFtZVJlbW92ZWQgPSBwcm9qZWN0UmVtb3ZlZC5yZXBsYWNlKGAvJHtjb250ZXh0LmZpbGVuYW1lfWAsICcnKTtcblxuICAgIC8vIEZpbGUgaXMgaW4gcm9vdCBvZiBzcmMgZGlyZWN0b3J5IC0gbm8gcGFja2FnZVxuICAgIGlmIChmaWxlbmFtZVJlbW92ZWQgPT09IHByb2plY3RSZW1vdmVkKSB7XG4gICAgICByZXR1cm4gJyc7XG4gICAgfVxuXG4gICAgcmV0dXJuIGAke2ZpbGVuYW1lUmVtb3ZlZH0uYDtcbiAgfSxcbn07XG4iXX0=