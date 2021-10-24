Object.defineProperty(exports, "__esModule", {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _underscore = require("underscore");

var _underscore2 = _interopRequireDefault(_underscore);

// Public: GrammarUtils.Lisp - a module which exposes the ability to evaluate
// code
"use babel";

var GrammarUtilsLisp = {
  // Public: Split a string of code into an array of executable statements
  //
  // Returns an {Array} of executable statements.
  splitStatements: function splitStatements(code) {
    var _this = this;

    var iterator = function iterator(statements, currentCharacter) {
      if (!_this.parenDepth) {
        _this.parenDepth = 0;
      }
      if (currentCharacter === "(") {
        _this.parenDepth += 1;
        _this.inStatement = true;
      } else if (currentCharacter === ")") {
        _this.parenDepth -= 1;
      }

      if (!_this.statement) {
        _this.statement = "";
      }
      _this.statement += currentCharacter;

      if (_this.parenDepth === 0 && _this.inStatement) {
        _this.inStatement = false;
        statements.push(_this.statement.trim());
        _this.statement = "";
      }

      return statements;
    };

    var statements = _underscore2["default"].reduce(code.trim(), iterator, [], {});

    return statements;
  }
};
exports["default"] = GrammarUtilsLisp;
module.exports = exports["default"];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZpbGU6Ly8vQzovVXNlcnMvY2tuanUvLmF0b20vcGFja2FnZXMvc2NyaXB0L2xpYi9ncmFtbWFyLXV0aWxzL2xpc3AuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OzBCQUVjLFlBQVk7Ozs7OztBQUYxQixXQUFXLENBQUE7O0FBTVgsSUFBTSxnQkFBZ0IsR0FBRzs7OztBQUl2QixpQkFBZSxFQUFBLHlCQUFDLElBQUksRUFBRTs7O0FBQ3BCLFFBQU0sUUFBUSxHQUFHLFNBQVgsUUFBUSxDQUFJLFVBQVUsRUFBRSxnQkFBZ0IsRUFBSztBQUNqRCxVQUFJLENBQUMsTUFBSyxVQUFVLEVBQUU7QUFDcEIsY0FBSyxVQUFVLEdBQUcsQ0FBQyxDQUFBO09BQ3BCO0FBQ0QsVUFBSSxnQkFBZ0IsS0FBSyxHQUFHLEVBQUU7QUFDNUIsY0FBSyxVQUFVLElBQUksQ0FBQyxDQUFBO0FBQ3BCLGNBQUssV0FBVyxHQUFHLElBQUksQ0FBQTtPQUN4QixNQUFNLElBQUksZ0JBQWdCLEtBQUssR0FBRyxFQUFFO0FBQ25DLGNBQUssVUFBVSxJQUFJLENBQUMsQ0FBQTtPQUNyQjs7QUFFRCxVQUFJLENBQUMsTUFBSyxTQUFTLEVBQUU7QUFDbkIsY0FBSyxTQUFTLEdBQUcsRUFBRSxDQUFBO09BQ3BCO0FBQ0QsWUFBSyxTQUFTLElBQUksZ0JBQWdCLENBQUE7O0FBRWxDLFVBQUksTUFBSyxVQUFVLEtBQUssQ0FBQyxJQUFJLE1BQUssV0FBVyxFQUFFO0FBQzdDLGNBQUssV0FBVyxHQUFHLEtBQUssQ0FBQTtBQUN4QixrQkFBVSxDQUFDLElBQUksQ0FBQyxNQUFLLFNBQVMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFBO0FBQ3RDLGNBQUssU0FBUyxHQUFHLEVBQUUsQ0FBQTtPQUNwQjs7QUFFRCxhQUFPLFVBQVUsQ0FBQTtLQUNsQixDQUFBOztBQUVELFFBQU0sVUFBVSxHQUFHLHdCQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLEVBQUUsUUFBUSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQTs7QUFFMUQsV0FBTyxVQUFVLENBQUE7R0FDbEI7Q0FDRixDQUFBO3FCQUNjLGdCQUFnQiIsImZpbGUiOiJmaWxlOi8vL0M6L1VzZXJzL2Nrbmp1Ly5hdG9tL3BhY2thZ2VzL3NjcmlwdC9saWIvZ3JhbW1hci11dGlscy9saXNwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2UgYmFiZWxcIlxuXG5pbXBvcnQgXyBmcm9tIFwidW5kZXJzY29yZVwiXG5cbi8vIFB1YmxpYzogR3JhbW1hclV0aWxzLkxpc3AgLSBhIG1vZHVsZSB3aGljaCBleHBvc2VzIHRoZSBhYmlsaXR5IHRvIGV2YWx1YXRlXG4vLyBjb2RlXG5jb25zdCBHcmFtbWFyVXRpbHNMaXNwID0ge1xuICAvLyBQdWJsaWM6IFNwbGl0IGEgc3RyaW5nIG9mIGNvZGUgaW50byBhbiBhcnJheSBvZiBleGVjdXRhYmxlIHN0YXRlbWVudHNcbiAgLy9cbiAgLy8gUmV0dXJucyBhbiB7QXJyYXl9IG9mIGV4ZWN1dGFibGUgc3RhdGVtZW50cy5cbiAgc3BsaXRTdGF0ZW1lbnRzKGNvZGUpIHtcbiAgICBjb25zdCBpdGVyYXRvciA9IChzdGF0ZW1lbnRzLCBjdXJyZW50Q2hhcmFjdGVyKSA9PiB7XG4gICAgICBpZiAoIXRoaXMucGFyZW5EZXB0aCkge1xuICAgICAgICB0aGlzLnBhcmVuRGVwdGggPSAwXG4gICAgICB9XG4gICAgICBpZiAoY3VycmVudENoYXJhY3RlciA9PT0gXCIoXCIpIHtcbiAgICAgICAgdGhpcy5wYXJlbkRlcHRoICs9IDFcbiAgICAgICAgdGhpcy5pblN0YXRlbWVudCA9IHRydWVcbiAgICAgIH0gZWxzZSBpZiAoY3VycmVudENoYXJhY3RlciA9PT0gXCIpXCIpIHtcbiAgICAgICAgdGhpcy5wYXJlbkRlcHRoIC09IDFcbiAgICAgIH1cblxuICAgICAgaWYgKCF0aGlzLnN0YXRlbWVudCkge1xuICAgICAgICB0aGlzLnN0YXRlbWVudCA9IFwiXCJcbiAgICAgIH1cbiAgICAgIHRoaXMuc3RhdGVtZW50ICs9IGN1cnJlbnRDaGFyYWN0ZXJcblxuICAgICAgaWYgKHRoaXMucGFyZW5EZXB0aCA9PT0gMCAmJiB0aGlzLmluU3RhdGVtZW50KSB7XG4gICAgICAgIHRoaXMuaW5TdGF0ZW1lbnQgPSBmYWxzZVxuICAgICAgICBzdGF0ZW1lbnRzLnB1c2godGhpcy5zdGF0ZW1lbnQudHJpbSgpKVxuICAgICAgICB0aGlzLnN0YXRlbWVudCA9IFwiXCJcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHN0YXRlbWVudHNcbiAgICB9XG5cbiAgICBjb25zdCBzdGF0ZW1lbnRzID0gXy5yZWR1Y2UoY29kZS50cmltKCksIGl0ZXJhdG9yLCBbXSwge30pXG5cbiAgICByZXR1cm4gc3RhdGVtZW50c1xuICB9LFxufVxuZXhwb3J0IGRlZmF1bHQgR3JhbW1hclV0aWxzTGlzcFxuIl19