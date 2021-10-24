Object.defineProperty(exports, "__esModule", {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _grammarUtils = require("../grammar-utils");

var _grammarUtils2 = _interopRequireDefault(_grammarUtils);

"use babel";

var command = _grammarUtils2["default"].command;

var FortranFixedForm = {
  "File Based": {
    command: command,
    args: function args(_ref) {
      var filepath = _ref.filepath;

      var tempOutFile = _grammarUtils2["default"].createTempPath("f-", ".out");
      var cmd = "gfortran '" + filepath + "' -ffixed-form -o " + tempOutFile + " && " + tempOutFile;
      return _grammarUtils2["default"].formatArgs(cmd);
    }
  }
};
var FortranFreeForm = {
  "File Based": {
    command: command,
    args: function args(_ref2) {
      var filepath = _ref2.filepath;

      var tempOutFile = _grammarUtils2["default"].createTempPath("f90-", ".out");
      var cmd = "gfortran '" + filepath + "' -ffree-form -o " + tempOutFile + " && " + tempOutFile;
      return _grammarUtils2["default"].formatArgs(cmd);
    }
  }
};
var FortranModern = FortranFreeForm;
var FortranPunchcard = FortranFixedForm;

var Fortran = {
  Fortran: FortranModern,
  "Fortran - Fixed Form": FortranFixedForm,
  "Fortran - Free Form": FortranFreeForm,
  "Fortran - Modern": FortranModern,
  "Fortran - Punchcard": FortranPunchcard
};
exports["default"] = Fortran;
module.exports = exports["default"];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZpbGU6Ly8vQzovVXNlcnMvY2tuanUvLmF0b20vcGFja2FnZXMvc2NyaXB0L2xpYi9ncmFtbWFycy9mb3J0cmFuLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs0QkFFeUIsa0JBQWtCOzs7O0FBRjNDLFdBQVcsQ0FBQTs7SUFHSCxPQUFPLDZCQUFQLE9BQU87O0FBRWYsSUFBTSxnQkFBZ0IsR0FBRztBQUN2QixjQUFZLEVBQUU7QUFDWixXQUFPLEVBQVAsT0FBTztBQUNQLFFBQUksRUFBQSxjQUFDLElBQVksRUFBRTtVQUFaLFFBQVEsR0FBVixJQUFZLENBQVYsUUFBUTs7QUFDYixVQUFNLFdBQVcsR0FBRywwQkFBYSxjQUFjLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFBO0FBQzdELFVBQU0sR0FBRyxrQkFBZ0IsUUFBUSwwQkFBcUIsV0FBVyxZQUFPLFdBQVcsQUFBRSxDQUFBO0FBQ3JGLGFBQU8sMEJBQWEsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFBO0tBQ3BDO0dBQ0Y7Q0FDRixDQUFBO0FBQ0QsSUFBTSxlQUFlLEdBQUc7QUFDdEIsY0FBWSxFQUFFO0FBQ1osV0FBTyxFQUFQLE9BQU87QUFDUCxRQUFJLEVBQUEsY0FBQyxLQUFZLEVBQUU7VUFBWixRQUFRLEdBQVYsS0FBWSxDQUFWLFFBQVE7O0FBQ2IsVUFBTSxXQUFXLEdBQUcsMEJBQWEsY0FBYyxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQTtBQUMvRCxVQUFNLEdBQUcsa0JBQWdCLFFBQVEseUJBQW9CLFdBQVcsWUFBTyxXQUFXLEFBQUUsQ0FBQTtBQUNwRixhQUFPLDBCQUFhLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQTtLQUNwQztHQUNGO0NBQ0YsQ0FBQTtBQUNELElBQU0sYUFBYSxHQUFHLGVBQWUsQ0FBQTtBQUNyQyxJQUFNLGdCQUFnQixHQUFHLGdCQUFnQixDQUFBOztBQUV6QyxJQUFNLE9BQU8sR0FBRztBQUNkLFNBQU8sRUFBRSxhQUFhO0FBQ3RCLHdCQUFzQixFQUFFLGdCQUFnQjtBQUN4Qyx1QkFBcUIsRUFBRSxlQUFlO0FBQ3RDLG9CQUFrQixFQUFFLGFBQWE7QUFDakMsdUJBQXFCLEVBQUUsZ0JBQWdCO0NBQ3hDLENBQUE7cUJBQ2MsT0FBTyIsImZpbGUiOiJmaWxlOi8vL0M6L1VzZXJzL2Nrbmp1Ly5hdG9tL3BhY2thZ2VzL3NjcmlwdC9saWIvZ3JhbW1hcnMvZm9ydHJhbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIlwidXNlIGJhYmVsXCJcblxuaW1wb3J0IEdyYW1tYXJVdGlscyBmcm9tIFwiLi4vZ3JhbW1hci11dGlsc1wiXG5jb25zdCB7IGNvbW1hbmQgfSA9IEdyYW1tYXJVdGlsc1xuXG5jb25zdCBGb3J0cmFuRml4ZWRGb3JtID0ge1xuICBcIkZpbGUgQmFzZWRcIjoge1xuICAgIGNvbW1hbmQsXG4gICAgYXJncyh7IGZpbGVwYXRoIH0pIHtcbiAgICAgIGNvbnN0IHRlbXBPdXRGaWxlID0gR3JhbW1hclV0aWxzLmNyZWF0ZVRlbXBQYXRoKFwiZi1cIiwgXCIub3V0XCIpXG4gICAgICBjb25zdCBjbWQgPSBgZ2ZvcnRyYW4gJyR7ZmlsZXBhdGh9JyAtZmZpeGVkLWZvcm0gLW8gJHt0ZW1wT3V0RmlsZX0gJiYgJHt0ZW1wT3V0RmlsZX1gXG4gICAgICByZXR1cm4gR3JhbW1hclV0aWxzLmZvcm1hdEFyZ3MoY21kKVxuICAgIH0sXG4gIH0sXG59XG5jb25zdCBGb3J0cmFuRnJlZUZvcm0gPSB7XG4gIFwiRmlsZSBCYXNlZFwiOiB7XG4gICAgY29tbWFuZCxcbiAgICBhcmdzKHsgZmlsZXBhdGggfSkge1xuICAgICAgY29uc3QgdGVtcE91dEZpbGUgPSBHcmFtbWFyVXRpbHMuY3JlYXRlVGVtcFBhdGgoXCJmOTAtXCIsIFwiLm91dFwiKVxuICAgICAgY29uc3QgY21kID0gYGdmb3J0cmFuICcke2ZpbGVwYXRofScgLWZmcmVlLWZvcm0gLW8gJHt0ZW1wT3V0RmlsZX0gJiYgJHt0ZW1wT3V0RmlsZX1gXG4gICAgICByZXR1cm4gR3JhbW1hclV0aWxzLmZvcm1hdEFyZ3MoY21kKVxuICAgIH0sXG4gIH0sXG59XG5jb25zdCBGb3J0cmFuTW9kZXJuID0gRm9ydHJhbkZyZWVGb3JtXG5jb25zdCBGb3J0cmFuUHVuY2hjYXJkID0gRm9ydHJhbkZpeGVkRm9ybVxuXG5jb25zdCBGb3J0cmFuID0ge1xuICBGb3J0cmFuOiBGb3J0cmFuTW9kZXJuLFxuICBcIkZvcnRyYW4gLSBGaXhlZCBGb3JtXCI6IEZvcnRyYW5GaXhlZEZvcm0sXG4gIFwiRm9ydHJhbiAtIEZyZWUgRm9ybVwiOiBGb3J0cmFuRnJlZUZvcm0sXG4gIFwiRm9ydHJhbiAtIE1vZGVyblwiOiBGb3J0cmFuTW9kZXJuLFxuICBcIkZvcnRyYW4gLSBQdW5jaGNhcmRcIjogRm9ydHJhblB1bmNoY2FyZCxcbn1cbmV4cG9ydCBkZWZhdWx0IEZvcnRyYW5cbiJdfQ==