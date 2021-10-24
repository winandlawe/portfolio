Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _grammarsIndex = require("./grammars/index");

var _grammarsIndex2 = _interopRequireDefault(_grammarsIndex);

var _grammarsApple = require("./grammars/apple");

var apple = _interopRequireWildcard(_grammarsApple);

var _grammarsC = require("./grammars/c");

var _grammarsC2 = _interopRequireDefault(_grammarsC);

var _grammarsCoffeescript = require("./grammars/coffeescript");

var _grammarsCoffeescript2 = _interopRequireDefault(_grammarsCoffeescript);

var _grammarsDatabase = require("./grammars/database");

var _grammarsDatabase2 = _interopRequireDefault(_grammarsDatabase);

var _grammarsDoc = require("./grammars/doc");

var _grammarsDoc2 = _interopRequireDefault(_grammarsDoc);

var _grammarsFortran = require("./grammars/fortran");

var _grammarsFortran2 = _interopRequireDefault(_grammarsFortran);

var _grammarsHaskell = require("./grammars/haskell");

var _grammarsHaskell2 = _interopRequireDefault(_grammarsHaskell);

var _grammarsJava = require("./grammars/java");

var java = _interopRequireWildcard(_grammarsJava);

var _grammarsJavascript = require("./grammars/javascript");

var _grammarsJavascript2 = _interopRequireDefault(_grammarsJavascript);

var _grammarsLisp = require("./grammars/lisp");

var _grammarsLisp2 = _interopRequireDefault(_grammarsLisp);

var _grammarsLua = require("./grammars/lua");

var _grammarsLua2 = _interopRequireDefault(_grammarsLua);

var _grammarsMl = require("./grammars/ml");

var _grammarsMl2 = _interopRequireDefault(_grammarsMl);

var _grammarsPerl = require("./grammars/perl");

var _grammarsPerl2 = _interopRequireDefault(_grammarsPerl);

var _grammarsPhp = require("./grammars/php");

var _grammarsPhp2 = _interopRequireDefault(_grammarsPhp);

var _grammarsPython = require("./grammars/python");

var python = _interopRequireWildcard(_grammarsPython);

var _grammarsRuby = require("./grammars/ruby");

var _grammarsRuby2 = _interopRequireDefault(_grammarsRuby);

var _grammarsShell = require("./grammars/shell");

var _grammarsShell2 = _interopRequireDefault(_grammarsShell);

var _grammarsWindows = require("./grammars/windows");

var _grammarsWindows2 = _interopRequireDefault(_grammarsWindows);

"use babel";

var Grammars = _extends({}, _grammarsIndex2["default"], apple, _grammarsC2["default"], _grammarsCoffeescript2["default"], _grammarsDatabase2["default"], _grammarsDoc2["default"], _grammarsFortran2["default"], _grammarsHaskell2["default"], java, _grammarsJavascript2["default"], _grammarsLisp2["default"], _grammarsLua2["default"], _grammarsMl2["default"], _grammarsPerl2["default"], _grammarsPhp2["default"], python, _grammarsRuby2["default"], _grammarsShell2["default"], _grammarsWindows2["default"]);
exports["default"] = Grammars;
module.exports = exports["default"];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZpbGU6Ly8vQzovVXNlcnMvY2tuanUvLmF0b20vcGFja2FnZXMvc2NyaXB0L2xpYi9ncmFtbWFycy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OzZCQUV1QixrQkFBa0I7Ozs7NkJBRWxCLGtCQUFrQjs7SUFBN0IsS0FBSzs7eUJBQ0gsY0FBYzs7OztvQ0FDSCx5QkFBeUI7Ozs7Z0NBQzdCLHFCQUFxQjs7OzsyQkFDMUIsZ0JBQWdCOzs7OytCQUNaLG9CQUFvQjs7OzsrQkFDcEIsb0JBQW9COzs7OzRCQUNsQixpQkFBaUI7O0lBQTNCLElBQUk7O2tDQUNELHVCQUF1Qjs7Ozs0QkFDckIsaUJBQWlCOzs7OzJCQUNsQixnQkFBZ0I7Ozs7MEJBQ2pCLGVBQWU7Ozs7NEJBQ2IsaUJBQWlCOzs7OzJCQUNsQixnQkFBZ0I7Ozs7OEJBQ1IsbUJBQW1COztJQUEvQixNQUFNOzs0QkFDRCxpQkFBaUI7Ozs7NkJBQ2hCLGtCQUFrQjs7OzsrQkFDaEIsb0JBQW9COzs7O0FBckJ4QyxXQUFXLENBQUE7O0FBdUJYLElBQU0sUUFBUSw0Q0FHVCxLQUFLLGtMQU9MLElBQUksc0tBT0osTUFBTSxzRkFJVixDQUFBO3FCQUNjLFFBQVEiLCJmaWxlIjoiZmlsZTovLy9DOi9Vc2Vycy9ja25qdS8uYXRvbS9wYWNrYWdlcy9zY3JpcHQvbGliL2dyYW1tYXJzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2UgYmFiZWxcIlxuXG5pbXBvcnQgZ3JhbW1hck1hcCBmcm9tIFwiLi9ncmFtbWFycy9pbmRleFwiXG5cbmltcG9ydCAqIGFzIGFwcGxlIGZyb20gXCIuL2dyYW1tYXJzL2FwcGxlXCJcbmltcG9ydCBjIGZyb20gXCIuL2dyYW1tYXJzL2NcIlxuaW1wb3J0IGNvZmZlZXNjcmlwdCBmcm9tIFwiLi9ncmFtbWFycy9jb2ZmZWVzY3JpcHRcIlxuaW1wb3J0IGRhdGFiYXNlIGZyb20gXCIuL2dyYW1tYXJzL2RhdGFiYXNlXCJcbmltcG9ydCBkb2MgZnJvbSBcIi4vZ3JhbW1hcnMvZG9jXCJcbmltcG9ydCBmb3J0cmFuIGZyb20gXCIuL2dyYW1tYXJzL2ZvcnRyYW5cIlxuaW1wb3J0IGhhc2tlbGwgZnJvbSBcIi4vZ3JhbW1hcnMvaGFza2VsbFwiXG5pbXBvcnQgKiBhcyBqYXZhIGZyb20gXCIuL2dyYW1tYXJzL2phdmFcIlxuaW1wb3J0IGpzIGZyb20gXCIuL2dyYW1tYXJzL2phdmFzY3JpcHRcIlxuaW1wb3J0IGxpc3AgZnJvbSBcIi4vZ3JhbW1hcnMvbGlzcFwiXG5pbXBvcnQgbHVhIGZyb20gXCIuL2dyYW1tYXJzL2x1YVwiXG5pbXBvcnQgbWwgZnJvbSBcIi4vZ3JhbW1hcnMvbWxcIlxuaW1wb3J0IHBlcmwgZnJvbSBcIi4vZ3JhbW1hcnMvcGVybFwiXG5pbXBvcnQgcGhwIGZyb20gXCIuL2dyYW1tYXJzL3BocFwiXG5pbXBvcnQgKiBhcyBweXRob24gZnJvbSBcIi4vZ3JhbW1hcnMvcHl0aG9uXCJcbmltcG9ydCBydWJ5IGZyb20gXCIuL2dyYW1tYXJzL3J1YnlcIlxuaW1wb3J0IHNoZWxsIGZyb20gXCIuL2dyYW1tYXJzL3NoZWxsXCJcbmltcG9ydCB3aW5kb3dzIGZyb20gXCIuL2dyYW1tYXJzL3dpbmRvd3NcIlxuXG5jb25zdCBHcmFtbWFycyA9IHtcbiAgLi4uZ3JhbW1hck1hcCxcblxuICAuLi5hcHBsZSxcbiAgLi4uYyxcbiAgLi4uY29mZmVlc2NyaXB0LFxuICAuLi5kYXRhYmFzZSxcbiAgLi4uZG9jLFxuICAuLi5mb3J0cmFuLFxuICAuLi5oYXNrZWxsLFxuICAuLi5qYXZhLFxuICAuLi5qcyxcbiAgLi4ubGlzcCxcbiAgLi4ubHVhLFxuICAuLi5tbCxcbiAgLi4ucGVybCxcbiAgLi4ucGhwLFxuICAuLi5weXRob24sXG4gIC4uLnJ1YnksXG4gIC4uLnNoZWxsLFxuICAuLi53aW5kb3dzLFxufVxuZXhwb3J0IGRlZmF1bHQgR3JhbW1hcnNcbiJdfQ==