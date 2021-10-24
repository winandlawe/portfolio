"use babel";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var linkPaths = undefined;
var regex = /((?:\w:)?\/?(?:[\w.-]+\/)*[\w.-]+):(\d+)(?::(\d+))?/g;
// ((?:\w:)?/?            # Prefix of the path either '/' or 'C:/' (optional)
// (?:[\w.-]+/)*[\w.-]+)  # The path of the file some/file/path.ext
// :(\d+)                 # Line number prefixed with a colon
// (?::(\d+))?            # Column number prefixed with a colon (optional)

var template = '<a class="-linked-path" data-path="$1" data-line="$2" data-column="$3">$&</a>';

exports["default"] = linkPaths = function (lines) {
  return lines.replace(regex, template);
};

linkPaths.listen = function (parentView) {
  return parentView.on("click", ".-linked-path", function () {
    var el = this;
    var _el$dataset = el.dataset;
    var path = _el$dataset.path;
    var line = _el$dataset.line;
    var column = _el$dataset.column;

    line = Number(line) - 1;
    // column number is optional
    column = column ? Number(column) - 1 : 0;

    atom.workspace.open(path, {
      initialLine: line,
      initialColumn: column
    });
  });
};
module.exports = exports["default"];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZpbGU6Ly8vQzovVXNlcnMvY2tuanUvLmF0b20vcGFja2FnZXMvc2NyaXB0L2xpYi9saW5rLXBhdGhzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLFdBQVcsQ0FBQTs7Ozs7QUFFWCxJQUFJLFNBQVMsWUFBQSxDQUFBO0FBQ2IsSUFBTSxLQUFLLEdBQUcsc0RBQXNELENBQUE7Ozs7OztBQU1wRSxJQUFNLFFBQVEsR0FBRywrRUFBK0UsQ0FBQTs7cUJBRWpGLFNBQVMsR0FBRyxVQUFDLEtBQUs7U0FBSyxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxRQUFRLENBQUM7Q0FBQTs7QUFFcEUsU0FBUyxDQUFDLE1BQU0sR0FBRyxVQUFDLFVBQVU7U0FDNUIsVUFBVSxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsZUFBZSxFQUFFLFlBQVk7QUFDbEQsUUFBTSxFQUFFLEdBQUcsSUFBSSxDQUFBO3NCQUNjLEVBQUUsQ0FBQyxPQUFPO1FBQWpDLElBQUksZUFBSixJQUFJO1FBQUUsSUFBSSxlQUFKLElBQUk7UUFBRSxNQUFNLGVBQU4sTUFBTTs7QUFDeEIsUUFBSSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUE7O0FBRXZCLFVBQU0sR0FBRyxNQUFNLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUE7O0FBRXhDLFFBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRTtBQUN4QixpQkFBVyxFQUFFLElBQUk7QUFDakIsbUJBQWEsRUFBRSxNQUFNO0tBQ3RCLENBQUMsQ0FBQTtHQUNILENBQUM7Q0FBQSxDQUFBIiwiZmlsZSI6ImZpbGU6Ly8vQzovVXNlcnMvY2tuanUvLmF0b20vcGFja2FnZXMvc2NyaXB0L2xpYi9saW5rLXBhdGhzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2UgYmFiZWxcIlxuXG5sZXQgbGlua1BhdGhzXG5jb25zdCByZWdleCA9IC8oKD86XFx3Oik/XFwvPyg/OltcXHcuLV0rXFwvKSpbXFx3Li1dKyk6KFxcZCspKD86OihcXGQrKSk/L2dcbi8vICgoPzpcXHc6KT8vPyAgICAgICAgICAgICMgUHJlZml4IG9mIHRoZSBwYXRoIGVpdGhlciAnLycgb3IgJ0M6LycgKG9wdGlvbmFsKVxuLy8gKD86W1xcdy4tXSsvKSpbXFx3Li1dKykgICMgVGhlIHBhdGggb2YgdGhlIGZpbGUgc29tZS9maWxlL3BhdGguZXh0XG4vLyA6KFxcZCspICAgICAgICAgICAgICAgICAjIExpbmUgbnVtYmVyIHByZWZpeGVkIHdpdGggYSBjb2xvblxuLy8gKD86OihcXGQrKSk/ICAgICAgICAgICAgIyBDb2x1bW4gbnVtYmVyIHByZWZpeGVkIHdpdGggYSBjb2xvbiAob3B0aW9uYWwpXG5cbmNvbnN0IHRlbXBsYXRlID0gJzxhIGNsYXNzPVwiLWxpbmtlZC1wYXRoXCIgZGF0YS1wYXRoPVwiJDFcIiBkYXRhLWxpbmU9XCIkMlwiIGRhdGEtY29sdW1uPVwiJDNcIj4kJjwvYT4nXG5cbmV4cG9ydCBkZWZhdWx0IGxpbmtQYXRocyA9IChsaW5lcykgPT4gbGluZXMucmVwbGFjZShyZWdleCwgdGVtcGxhdGUpXG5cbmxpbmtQYXRocy5saXN0ZW4gPSAocGFyZW50VmlldykgPT5cbiAgcGFyZW50Vmlldy5vbihcImNsaWNrXCIsIFwiLi1saW5rZWQtcGF0aFwiLCBmdW5jdGlvbiAoKSB7XG4gICAgY29uc3QgZWwgPSB0aGlzXG4gICAgbGV0IHsgcGF0aCwgbGluZSwgY29sdW1uIH0gPSBlbC5kYXRhc2V0XG4gICAgbGluZSA9IE51bWJlcihsaW5lKSAtIDFcbiAgICAvLyBjb2x1bW4gbnVtYmVyIGlzIG9wdGlvbmFsXG4gICAgY29sdW1uID0gY29sdW1uID8gTnVtYmVyKGNvbHVtbikgLSAxIDogMFxuXG4gICAgYXRvbS53b3Jrc3BhY2Uub3BlbihwYXRoLCB7XG4gICAgICBpbml0aWFsTGluZTogbGluZSxcbiAgICAgIGluaXRpYWxDb2x1bW46IGNvbHVtbixcbiAgICB9KVxuICB9KVxuIl19