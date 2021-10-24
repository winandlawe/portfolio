Object.defineProperty(exports, "__esModule", {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

// Public: GrammarUtils.Nim - a module which selects the right file to run for Nim projects
"use babel";

var GrammarUtilsNim = {
  // Public: Find the right file to run
  //
  // * `file`    A {String} containing the current editor file
  //
  // Returns the {String} filepath of file to run

  projectDir: function projectDir(editorfile) {
    return _path2["default"].dirname(editorfile);
  },

  findNimProjectFile: function findNimProjectFile(editorfile) {
    if (_path2["default"].extname(editorfile) === ".nims") {
      // if we have an .nims file
      var tfile = editorfile.slice(0, -1);

      if (_fs2["default"].existsSync(tfile)) {
        // it has a corresponding .nim file. so thats a config file.
        // we run the .nim file instead.
        return _path2["default"].basename(tfile);
      }
      // it has no corresponding .nim file, it is a standalone script
      return _path2["default"].basename(editorfile);
    }

    // check if we are running on a file with config
    if (_fs2["default"].existsSync(editorfile + "s") || _fs2["default"].existsSync(editorfile + ".cfg") || _fs2["default"].existsSync(editorfile + "cfg")) {
      return _path2["default"].basename(editorfile);
    }

    // assume we want to run a project
    // searching for the first file which has
    // a config file with the same name and
    // run this instead of the one in the editor
    // tab
    var filepath = _path2["default"].dirname(editorfile);
    var files = _fs2["default"].readdirSync(filepath);
    files.sort();
    for (var file of files) {
      var _name = filepath + "/" + file;
      if (_fs2["default"].statSync(_name).isFile()) {
        if (_path2["default"].extname(_name) === ".nims" || _path2["default"].extname(_name) === ".nimcgf" || _path2["default"].extname(_name) === ".cfg") {
          var tfile = _name.slice(0, -1);
          if (_fs2["default"].existsSync(tfile)) {
            return _path2["default"].basename(tfile);
          }
        }
      }
    }

    // just run what we got
    return _path2["default"].basename(editorfile);
  }
};
exports["default"] = GrammarUtilsNim;
module.exports = exports["default"];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZpbGU6Ly8vQzovVXNlcnMvY2tuanUvLmF0b20vcGFja2FnZXMvc2NyaXB0L2xpYi9ncmFtbWFyLXV0aWxzL25pbS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7a0JBRWUsSUFBSTs7OztvQkFDRixNQUFNOzs7OztBQUh2QixXQUFXLENBQUE7O0FBTVgsSUFBTSxlQUFlLEdBQUc7Ozs7Ozs7QUFPdEIsWUFBVSxFQUFBLG9CQUFDLFVBQVUsRUFBRTtBQUNyQixXQUFPLGtCQUFLLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQTtHQUNoQzs7QUFFRCxvQkFBa0IsRUFBQSw0QkFBQyxVQUFVLEVBQUU7QUFDN0IsUUFBSSxrQkFBSyxPQUFPLENBQUMsVUFBVSxDQUFDLEtBQUssT0FBTyxFQUFFOztBQUV4QyxVQUFNLEtBQUssR0FBRyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFBOztBQUVyQyxVQUFJLGdCQUFHLFVBQVUsQ0FBQyxLQUFLLENBQUMsRUFBRTs7O0FBR3hCLGVBQU8sa0JBQUssUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFBO09BQzVCOztBQUVELGFBQU8sa0JBQUssUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFBO0tBQ2pDOzs7QUFHRCxRQUFJLGdCQUFHLFVBQVUsQ0FBSSxVQUFVLE9BQUksSUFBSSxnQkFBRyxVQUFVLENBQUksVUFBVSxVQUFPLElBQUksZ0JBQUcsVUFBVSxDQUFJLFVBQVUsU0FBTSxFQUFFO0FBQzlHLGFBQU8sa0JBQUssUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFBO0tBQ2pDOzs7Ozs7O0FBT0QsUUFBTSxRQUFRLEdBQUcsa0JBQUssT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFBO0FBQ3pDLFFBQU0sS0FBSyxHQUFHLGdCQUFHLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQTtBQUN0QyxTQUFLLENBQUMsSUFBSSxFQUFFLENBQUE7QUFDWixTQUFLLElBQU0sSUFBSSxJQUFJLEtBQUssRUFBRTtBQUN4QixVQUFNLEtBQUksR0FBTSxRQUFRLFNBQUksSUFBSSxBQUFFLENBQUE7QUFDbEMsVUFBSSxnQkFBRyxRQUFRLENBQUMsS0FBSSxDQUFDLENBQUMsTUFBTSxFQUFFLEVBQUU7QUFDOUIsWUFBSSxrQkFBSyxPQUFPLENBQUMsS0FBSSxDQUFDLEtBQUssT0FBTyxJQUFJLGtCQUFLLE9BQU8sQ0FBQyxLQUFJLENBQUMsS0FBSyxTQUFTLElBQUksa0JBQUssT0FBTyxDQUFDLEtBQUksQ0FBQyxLQUFLLE1BQU0sRUFBRTtBQUN2RyxjQUFNLEtBQUssR0FBRyxLQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFBO0FBQy9CLGNBQUksZ0JBQUcsVUFBVSxDQUFDLEtBQUssQ0FBQyxFQUFFO0FBQ3hCLG1CQUFPLGtCQUFLLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQTtXQUM1QjtTQUNGO09BQ0Y7S0FDRjs7O0FBR0QsV0FBTyxrQkFBSyxRQUFRLENBQUMsVUFBVSxDQUFDLENBQUE7R0FDakM7Q0FDRixDQUFBO3FCQUNjLGVBQWUiLCJmaWxlIjoiZmlsZTovLy9DOi9Vc2Vycy9ja25qdS8uYXRvbS9wYWNrYWdlcy9zY3JpcHQvbGliL2dyYW1tYXItdXRpbHMvbmltLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2UgYmFiZWxcIlxuXG5pbXBvcnQgZnMgZnJvbSBcImZzXCJcbmltcG9ydCBwYXRoIGZyb20gXCJwYXRoXCJcblxuLy8gUHVibGljOiBHcmFtbWFyVXRpbHMuTmltIC0gYSBtb2R1bGUgd2hpY2ggc2VsZWN0cyB0aGUgcmlnaHQgZmlsZSB0byBydW4gZm9yIE5pbSBwcm9qZWN0c1xuY29uc3QgR3JhbW1hclV0aWxzTmltID0ge1xuICAvLyBQdWJsaWM6IEZpbmQgdGhlIHJpZ2h0IGZpbGUgdG8gcnVuXG4gIC8vXG4gIC8vICogYGZpbGVgICAgIEEge1N0cmluZ30gY29udGFpbmluZyB0aGUgY3VycmVudCBlZGl0b3IgZmlsZVxuICAvL1xuICAvLyBSZXR1cm5zIHRoZSB7U3RyaW5nfSBmaWxlcGF0aCBvZiBmaWxlIHRvIHJ1blxuXG4gIHByb2plY3REaXIoZWRpdG9yZmlsZSkge1xuICAgIHJldHVybiBwYXRoLmRpcm5hbWUoZWRpdG9yZmlsZSlcbiAgfSxcblxuICBmaW5kTmltUHJvamVjdEZpbGUoZWRpdG9yZmlsZSkge1xuICAgIGlmIChwYXRoLmV4dG5hbWUoZWRpdG9yZmlsZSkgPT09IFwiLm5pbXNcIikge1xuICAgICAgLy8gaWYgd2UgaGF2ZSBhbiAubmltcyBmaWxlXG4gICAgICBjb25zdCB0ZmlsZSA9IGVkaXRvcmZpbGUuc2xpY2UoMCwgLTEpXG5cbiAgICAgIGlmIChmcy5leGlzdHNTeW5jKHRmaWxlKSkge1xuICAgICAgICAvLyBpdCBoYXMgYSBjb3JyZXNwb25kaW5nIC5uaW0gZmlsZS4gc28gdGhhdHMgYSBjb25maWcgZmlsZS5cbiAgICAgICAgLy8gd2UgcnVuIHRoZSAubmltIGZpbGUgaW5zdGVhZC5cbiAgICAgICAgcmV0dXJuIHBhdGguYmFzZW5hbWUodGZpbGUpXG4gICAgICB9XG4gICAgICAvLyBpdCBoYXMgbm8gY29ycmVzcG9uZGluZyAubmltIGZpbGUsIGl0IGlzIGEgc3RhbmRhbG9uZSBzY3JpcHRcbiAgICAgIHJldHVybiBwYXRoLmJhc2VuYW1lKGVkaXRvcmZpbGUpXG4gICAgfVxuXG4gICAgLy8gY2hlY2sgaWYgd2UgYXJlIHJ1bm5pbmcgb24gYSBmaWxlIHdpdGggY29uZmlnXG4gICAgaWYgKGZzLmV4aXN0c1N5bmMoYCR7ZWRpdG9yZmlsZX1zYCkgfHwgZnMuZXhpc3RzU3luYyhgJHtlZGl0b3JmaWxlfS5jZmdgKSB8fCBmcy5leGlzdHNTeW5jKGAke2VkaXRvcmZpbGV9Y2ZnYCkpIHtcbiAgICAgIHJldHVybiBwYXRoLmJhc2VuYW1lKGVkaXRvcmZpbGUpXG4gICAgfVxuXG4gICAgLy8gYXNzdW1lIHdlIHdhbnQgdG8gcnVuIGEgcHJvamVjdFxuICAgIC8vIHNlYXJjaGluZyBmb3IgdGhlIGZpcnN0IGZpbGUgd2hpY2ggaGFzXG4gICAgLy8gYSBjb25maWcgZmlsZSB3aXRoIHRoZSBzYW1lIG5hbWUgYW5kXG4gICAgLy8gcnVuIHRoaXMgaW5zdGVhZCBvZiB0aGUgb25lIGluIHRoZSBlZGl0b3JcbiAgICAvLyB0YWJcbiAgICBjb25zdCBmaWxlcGF0aCA9IHBhdGguZGlybmFtZShlZGl0b3JmaWxlKVxuICAgIGNvbnN0IGZpbGVzID0gZnMucmVhZGRpclN5bmMoZmlsZXBhdGgpXG4gICAgZmlsZXMuc29ydCgpXG4gICAgZm9yIChjb25zdCBmaWxlIG9mIGZpbGVzKSB7XG4gICAgICBjb25zdCBuYW1lID0gYCR7ZmlsZXBhdGh9LyR7ZmlsZX1gXG4gICAgICBpZiAoZnMuc3RhdFN5bmMobmFtZSkuaXNGaWxlKCkpIHtcbiAgICAgICAgaWYgKHBhdGguZXh0bmFtZShuYW1lKSA9PT0gXCIubmltc1wiIHx8IHBhdGguZXh0bmFtZShuYW1lKSA9PT0gXCIubmltY2dmXCIgfHwgcGF0aC5leHRuYW1lKG5hbWUpID09PSBcIi5jZmdcIikge1xuICAgICAgICAgIGNvbnN0IHRmaWxlID0gbmFtZS5zbGljZSgwLCAtMSlcbiAgICAgICAgICBpZiAoZnMuZXhpc3RzU3luYyh0ZmlsZSkpIHtcbiAgICAgICAgICAgIHJldHVybiBwYXRoLmJhc2VuYW1lKHRmaWxlKVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIC8vIGp1c3QgcnVuIHdoYXQgd2UgZ290XG4gICAgcmV0dXJuIHBhdGguYmFzZW5hbWUoZWRpdG9yZmlsZSlcbiAgfSxcbn1cbmV4cG9ydCBkZWZhdWx0IEdyYW1tYXJVdGlsc05pbVxuIl19