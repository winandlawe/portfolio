'use babel';

/* eslint-disable no-multi-str, prefer-const, func-names */
Object.defineProperty(exports, '__esModule', {
  value: true
});
var linkPaths = undefined;
var regex = new RegExp('((?:\\w:)?/?(?:[-\\w.]+/)*[-\\w.]+):(\\d+)(?::(\\d+))?', 'g');
// ((?:\w:)?/?            # Prefix of the path either '/' or 'C:/' (optional)
// (?:[-\w.]+/)*[-\w.]+)  # The path of the file some/file/path.ext
// :(\d+)                 # Line number prefixed with a colon
// (?::(\d+))?            # Column number prefixed with a colon (optional)

var template = '<a class="-linked-path" data-path="$1" data-line="$2" data-column="$3">$&</a>';

exports['default'] = linkPaths = function (lines) {
  return lines.replace(regex, template);
};

linkPaths.listen = function (parentView) {
  return parentView.on('click', '.-linked-path', function () {
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
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZpbGU6Ly8vQzovVXNlcnMvY2tuanUvLmF0b20vcGFja2FnZXMvc2NyaXB0L2xpYi9saW5rLXBhdGhzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLFdBQVcsQ0FBQzs7Ozs7O0FBR1osSUFBSSxTQUFTLFlBQUEsQ0FBQztBQUNkLElBQU0sS0FBSyxHQUFHLElBQUksTUFBTSxDQUFDLHdEQUF3RCxFQUFFLEdBQUcsQ0FBQyxDQUFDOzs7Ozs7QUFNeEYsSUFBTSxRQUFRLEdBQUcsK0VBQStFLENBQUM7O3FCQUVsRixTQUFTLEdBQUcsVUFBQyxLQUFLO1NBQUssS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsUUFBUSxDQUFDO0NBQUE7O0FBRXBFLFNBQVMsQ0FBQyxNQUFNLEdBQUcsVUFBQyxVQUFVO1NBQUssVUFBVSxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsZUFBZSxFQUFFLFlBQVk7QUFDckYsUUFBTSxFQUFFLEdBQUcsSUFBSSxDQUFDO3NCQUNhLEVBQUUsQ0FBQyxPQUFPO1FBQWpDLElBQUksZUFBSixJQUFJO1FBQUUsSUFBSSxlQUFKLElBQUk7UUFBRSxNQUFNLGVBQU4sTUFBTTs7QUFDeEIsUUFBSSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7O0FBRXhCLFVBQU0sR0FBRyxNQUFNLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7O0FBRXpDLFFBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRTtBQUN4QixpQkFBVyxFQUFFLElBQUk7QUFDakIsbUJBQWEsRUFBRSxNQUFNO0tBQ3RCLENBQUMsQ0FBQztHQUNKLENBQUM7Q0FBQSxDQUFDIiwiZmlsZSI6ImZpbGU6Ly8vQzovVXNlcnMvY2tuanUvLmF0b20vcGFja2FnZXMvc2NyaXB0L2xpYi9saW5rLXBhdGhzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBiYWJlbCc7XG5cbi8qIGVzbGludC1kaXNhYmxlIG5vLW11bHRpLXN0ciwgcHJlZmVyLWNvbnN0LCBmdW5jLW5hbWVzICovXG5sZXQgbGlua1BhdGhzO1xuY29uc3QgcmVnZXggPSBuZXcgUmVnRXhwKCcoKD86XFxcXHc6KT8vPyg/OlstXFxcXHcuXSsvKSpbLVxcXFx3Ll0rKTooXFxcXGQrKSg/OjooXFxcXGQrKSk/JywgJ2cnKTtcbi8vICgoPzpcXHc6KT8vPyAgICAgICAgICAgICMgUHJlZml4IG9mIHRoZSBwYXRoIGVpdGhlciAnLycgb3IgJ0M6LycgKG9wdGlvbmFsKVxuLy8gKD86Wy1cXHcuXSsvKSpbLVxcdy5dKykgICMgVGhlIHBhdGggb2YgdGhlIGZpbGUgc29tZS9maWxlL3BhdGguZXh0XG4vLyA6KFxcZCspICAgICAgICAgICAgICAgICAjIExpbmUgbnVtYmVyIHByZWZpeGVkIHdpdGggYSBjb2xvblxuLy8gKD86OihcXGQrKSk/ICAgICAgICAgICAgIyBDb2x1bW4gbnVtYmVyIHByZWZpeGVkIHdpdGggYSBjb2xvbiAob3B0aW9uYWwpXG5cbmNvbnN0IHRlbXBsYXRlID0gJzxhIGNsYXNzPVwiLWxpbmtlZC1wYXRoXCIgZGF0YS1wYXRoPVwiJDFcIiBkYXRhLWxpbmU9XCIkMlwiIGRhdGEtY29sdW1uPVwiJDNcIj4kJjwvYT4nO1xuXG5leHBvcnQgZGVmYXVsdCBsaW5rUGF0aHMgPSAobGluZXMpID0+IGxpbmVzLnJlcGxhY2UocmVnZXgsIHRlbXBsYXRlKTtcblxubGlua1BhdGhzLmxpc3RlbiA9IChwYXJlbnRWaWV3KSA9PiBwYXJlbnRWaWV3Lm9uKCdjbGljaycsICcuLWxpbmtlZC1wYXRoJywgZnVuY3Rpb24gKCkge1xuICBjb25zdCBlbCA9IHRoaXM7XG4gIGxldCB7IHBhdGgsIGxpbmUsIGNvbHVtbiB9ID0gZWwuZGF0YXNldDtcbiAgbGluZSA9IE51bWJlcihsaW5lKSAtIDE7XG4gIC8vIGNvbHVtbiBudW1iZXIgaXMgb3B0aW9uYWxcbiAgY29sdW1uID0gY29sdW1uID8gTnVtYmVyKGNvbHVtbikgLSAxIDogMDtcblxuICBhdG9tLndvcmtzcGFjZS5vcGVuKHBhdGgsIHtcbiAgICBpbml0aWFsTGluZTogbGluZSxcbiAgICBpbml0aWFsQ29sdW1uOiBjb2x1bW4sXG4gIH0pO1xufSk7XG4iXX0=