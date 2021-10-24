"use babel";

// Public: GrammarUtils.PHP - a module which assist the creation of PHP temporary files
Object.defineProperty(exports, "__esModule", {
  value: true
});
var GrammarUtilsPhp = {
  // Public: Create a temporary file with the provided PHP code
  //
  // * `code`    A {String} containing some PHP code without <?php header
  //
  // Returns the {String} filepath of the new file
  createTempFileWithCode: function createTempFileWithCode(code) {
    if (!/^\s*<\?php/.test(code)) {
      code = "<?php " + code;
    }
    return module.parent.exports.createTempFileWithCode(code);
  }
};
exports["default"] = GrammarUtilsPhp;
module.exports = exports["default"];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZpbGU6Ly8vQzovVXNlcnMvY2tuanUvLmF0b20vcGFja2FnZXMvc2NyaXB0L2xpYi9ncmFtbWFyLXV0aWxzL3BocC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxXQUFXLENBQUE7Ozs7OztBQUdYLElBQU0sZUFBZSxHQUFHOzs7Ozs7QUFNdEIsd0JBQXNCLEVBQUEsZ0NBQUMsSUFBSSxFQUFFO0FBQzNCLFFBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFO0FBQzVCLFVBQUksY0FBWSxJQUFJLEFBQUUsQ0FBQTtLQUN2QjtBQUNELFdBQU8sTUFBTSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsc0JBQXNCLENBQUMsSUFBSSxDQUFDLENBQUE7R0FDMUQ7Q0FDRixDQUFBO3FCQUNjLGVBQWUiLCJmaWxlIjoiZmlsZTovLy9DOi9Vc2Vycy9ja25qdS8uYXRvbS9wYWNrYWdlcy9zY3JpcHQvbGliL2dyYW1tYXItdXRpbHMvcGhwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2UgYmFiZWxcIlxuXG4vLyBQdWJsaWM6IEdyYW1tYXJVdGlscy5QSFAgLSBhIG1vZHVsZSB3aGljaCBhc3Npc3QgdGhlIGNyZWF0aW9uIG9mIFBIUCB0ZW1wb3JhcnkgZmlsZXNcbmNvbnN0IEdyYW1tYXJVdGlsc1BocCA9IHtcbiAgLy8gUHVibGljOiBDcmVhdGUgYSB0ZW1wb3JhcnkgZmlsZSB3aXRoIHRoZSBwcm92aWRlZCBQSFAgY29kZVxuICAvL1xuICAvLyAqIGBjb2RlYCAgICBBIHtTdHJpbmd9IGNvbnRhaW5pbmcgc29tZSBQSFAgY29kZSB3aXRob3V0IDw/cGhwIGhlYWRlclxuICAvL1xuICAvLyBSZXR1cm5zIHRoZSB7U3RyaW5nfSBmaWxlcGF0aCBvZiB0aGUgbmV3IGZpbGVcbiAgY3JlYXRlVGVtcEZpbGVXaXRoQ29kZShjb2RlKSB7XG4gICAgaWYgKCEvXlxccyo8XFw/cGhwLy50ZXN0KGNvZGUpKSB7XG4gICAgICBjb2RlID0gYDw/cGhwICR7Y29kZX1gXG4gICAgfVxuICAgIHJldHVybiBtb2R1bGUucGFyZW50LmV4cG9ydHMuY3JlYXRlVGVtcEZpbGVXaXRoQ29kZShjb2RlKVxuICB9LFxufVxuZXhwb3J0IGRlZmF1bHQgR3JhbW1hclV0aWxzUGhwXG4iXX0=