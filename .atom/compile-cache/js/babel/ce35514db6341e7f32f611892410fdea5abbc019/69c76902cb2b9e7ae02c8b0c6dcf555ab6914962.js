Object.defineProperty(exports, "__esModule", {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _grammarUtils = require("../grammar-utils");

var _grammarUtils2 = _interopRequireDefault(_grammarUtils);

"use babel";

var Bats = {
  "Selection Based": {
    command: "bats",
    args: function args(context) {
      var code = context.getCode();
      var tmpFile = _grammarUtils2["default"].createTempFileWithCode(code);
      return [tmpFile];
    }
  },

  "File Based": {
    command: "bats",
    args: function args(_ref) {
      var filepath = _ref.filepath;

      return [filepath];
    }
  }
};

var Bash = {
  "Selection Based": {
    command: process.env.SHELL,
    args: function args(context) {
      return ["-c", context.getCode()];
    }
  },

  "File Based": {
    command: process.env.SHELL,
    args: function args(_ref2) {
      var filepath = _ref2.filepath;

      return [filepath];
    }
  }
};

var Shell = Bash;

var Fish = {
  "Selection Based": {
    command: "fish",
    args: function args(context) {
      return ["-c", context.getCode()];
    }
  },

  "File Based": {
    command: "fish",
    args: function args(_ref3) {
      var filepath = _ref3.filepath;

      return [filepath];
    }
  }
};

var Tcl = {
  "Selection Based": {
    command: "tclsh",
    args: function args(context) {
      var code = context.getCode();
      var tmpFile = _grammarUtils2["default"].createTempFileWithCode(code);
      return [tmpFile];
    }
  },

  "File Based": {
    command: "tclsh",
    args: function args(_ref4) {
      var filepath = _ref4.filepath;

      return [filepath];
    }
  }
};

var ShellGrammars = {
  "Bash Automated Test System (Bats)": Bats,
  Bash: Bash,
  Tcl: Tcl,
  "Shell Script": Shell,
  "Shell Script (Fish)": Fish
};
exports["default"] = ShellGrammars;
module.exports = exports["default"];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZpbGU6Ly8vQzovVXNlcnMvY2tuanUvLmF0b20vcGFja2FnZXMvc2NyaXB0L2xpYi9ncmFtbWFycy9zaGVsbC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7NEJBRXlCLGtCQUFrQjs7OztBQUYzQyxXQUFXLENBQUE7O0FBSVgsSUFBTSxJQUFJLEdBQUc7QUFDWCxtQkFBaUIsRUFBRTtBQUNqQixXQUFPLEVBQUUsTUFBTTtBQUNmLFFBQUksRUFBQSxjQUFDLE9BQU8sRUFBRTtBQUNaLFVBQU0sSUFBSSxHQUFHLE9BQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQTtBQUM5QixVQUFNLE9BQU8sR0FBRywwQkFBYSxzQkFBc0IsQ0FBQyxJQUFJLENBQUMsQ0FBQTtBQUN6RCxhQUFPLENBQUMsT0FBTyxDQUFDLENBQUE7S0FDakI7R0FDRjs7QUFFRCxjQUFZLEVBQUU7QUFDWixXQUFPLEVBQUUsTUFBTTtBQUNmLFFBQUksRUFBQSxjQUFDLElBQVksRUFBRTtVQUFaLFFBQVEsR0FBVixJQUFZLENBQVYsUUFBUTs7QUFDYixhQUFPLENBQUMsUUFBUSxDQUFDLENBQUE7S0FDbEI7R0FDRjtDQUNGLENBQUE7O0FBRUQsSUFBTSxJQUFJLEdBQUc7QUFDWCxtQkFBaUIsRUFBRTtBQUNqQixXQUFPLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLO0FBQzFCLFFBQUksRUFBQSxjQUFDLE9BQU8sRUFBRTtBQUNaLGFBQU8sQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUE7S0FDakM7R0FDRjs7QUFFRCxjQUFZLEVBQUU7QUFDWixXQUFPLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLO0FBQzFCLFFBQUksRUFBQSxjQUFDLEtBQVksRUFBRTtVQUFaLFFBQVEsR0FBVixLQUFZLENBQVYsUUFBUTs7QUFDYixhQUFPLENBQUMsUUFBUSxDQUFDLENBQUE7S0FDbEI7R0FDRjtDQUNGLENBQUE7O0FBRUQsSUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFBOztBQUVsQixJQUFNLElBQUksR0FBRztBQUNYLG1CQUFpQixFQUFFO0FBQ2pCLFdBQU8sRUFBRSxNQUFNO0FBQ2YsUUFBSSxFQUFBLGNBQUMsT0FBTyxFQUFFO0FBQ1osYUFBTyxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQTtLQUNqQztHQUNGOztBQUVELGNBQVksRUFBRTtBQUNaLFdBQU8sRUFBRSxNQUFNO0FBQ2YsUUFBSSxFQUFBLGNBQUMsS0FBWSxFQUFFO1VBQVosUUFBUSxHQUFWLEtBQVksQ0FBVixRQUFROztBQUNiLGFBQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQTtLQUNsQjtHQUNGO0NBQ0YsQ0FBQTs7QUFFRCxJQUFNLEdBQUcsR0FBRztBQUNWLG1CQUFpQixFQUFFO0FBQ2pCLFdBQU8sRUFBRSxPQUFPO0FBQ2hCLFFBQUksRUFBQSxjQUFDLE9BQU8sRUFBRTtBQUNaLFVBQU0sSUFBSSxHQUFHLE9BQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQTtBQUM5QixVQUFNLE9BQU8sR0FBRywwQkFBYSxzQkFBc0IsQ0FBQyxJQUFJLENBQUMsQ0FBQTtBQUN6RCxhQUFPLENBQUMsT0FBTyxDQUFDLENBQUE7S0FDakI7R0FDRjs7QUFFRCxjQUFZLEVBQUU7QUFDWixXQUFPLEVBQUUsT0FBTztBQUNoQixRQUFJLEVBQUEsY0FBQyxLQUFZLEVBQUU7VUFBWixRQUFRLEdBQVYsS0FBWSxDQUFWLFFBQVE7O0FBQ2IsYUFBTyxDQUFDLFFBQVEsQ0FBQyxDQUFBO0tBQ2xCO0dBQ0Y7Q0FDRixDQUFBOztBQUVELElBQU0sYUFBYSxHQUFHO0FBQ3BCLHFDQUFtQyxFQUFFLElBQUk7QUFDekMsTUFBSSxFQUFKLElBQUk7QUFDSixLQUFHLEVBQUgsR0FBRztBQUNILGdCQUFjLEVBQUUsS0FBSztBQUNyQix1QkFBcUIsRUFBRSxJQUFJO0NBQzVCLENBQUE7cUJBQ2MsYUFBYSIsImZpbGUiOiJmaWxlOi8vL0M6L1VzZXJzL2Nrbmp1Ly5hdG9tL3BhY2thZ2VzL3NjcmlwdC9saWIvZ3JhbW1hcnMvc2hlbGwuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBiYWJlbFwiXG5cbmltcG9ydCBHcmFtbWFyVXRpbHMgZnJvbSBcIi4uL2dyYW1tYXItdXRpbHNcIlxuXG5jb25zdCBCYXRzID0ge1xuICBcIlNlbGVjdGlvbiBCYXNlZFwiOiB7XG4gICAgY29tbWFuZDogXCJiYXRzXCIsXG4gICAgYXJncyhjb250ZXh0KSB7XG4gICAgICBjb25zdCBjb2RlID0gY29udGV4dC5nZXRDb2RlKClcbiAgICAgIGNvbnN0IHRtcEZpbGUgPSBHcmFtbWFyVXRpbHMuY3JlYXRlVGVtcEZpbGVXaXRoQ29kZShjb2RlKVxuICAgICAgcmV0dXJuIFt0bXBGaWxlXVxuICAgIH0sXG4gIH0sXG5cbiAgXCJGaWxlIEJhc2VkXCI6IHtcbiAgICBjb21tYW5kOiBcImJhdHNcIixcbiAgICBhcmdzKHsgZmlsZXBhdGggfSkge1xuICAgICAgcmV0dXJuIFtmaWxlcGF0aF1cbiAgICB9LFxuICB9LFxufVxuXG5jb25zdCBCYXNoID0ge1xuICBcIlNlbGVjdGlvbiBCYXNlZFwiOiB7XG4gICAgY29tbWFuZDogcHJvY2Vzcy5lbnYuU0hFTEwsXG4gICAgYXJncyhjb250ZXh0KSB7XG4gICAgICByZXR1cm4gW1wiLWNcIiwgY29udGV4dC5nZXRDb2RlKCldXG4gICAgfSxcbiAgfSxcblxuICBcIkZpbGUgQmFzZWRcIjoge1xuICAgIGNvbW1hbmQ6IHByb2Nlc3MuZW52LlNIRUxMLFxuICAgIGFyZ3MoeyBmaWxlcGF0aCB9KSB7XG4gICAgICByZXR1cm4gW2ZpbGVwYXRoXVxuICAgIH0sXG4gIH0sXG59XG5cbmNvbnN0IFNoZWxsID0gQmFzaFxuXG5jb25zdCBGaXNoID0ge1xuICBcIlNlbGVjdGlvbiBCYXNlZFwiOiB7XG4gICAgY29tbWFuZDogXCJmaXNoXCIsXG4gICAgYXJncyhjb250ZXh0KSB7XG4gICAgICByZXR1cm4gW1wiLWNcIiwgY29udGV4dC5nZXRDb2RlKCldXG4gICAgfSxcbiAgfSxcblxuICBcIkZpbGUgQmFzZWRcIjoge1xuICAgIGNvbW1hbmQ6IFwiZmlzaFwiLFxuICAgIGFyZ3MoeyBmaWxlcGF0aCB9KSB7XG4gICAgICByZXR1cm4gW2ZpbGVwYXRoXVxuICAgIH0sXG4gIH0sXG59XG5cbmNvbnN0IFRjbCA9IHtcbiAgXCJTZWxlY3Rpb24gQmFzZWRcIjoge1xuICAgIGNvbW1hbmQ6IFwidGNsc2hcIixcbiAgICBhcmdzKGNvbnRleHQpIHtcbiAgICAgIGNvbnN0IGNvZGUgPSBjb250ZXh0LmdldENvZGUoKVxuICAgICAgY29uc3QgdG1wRmlsZSA9IEdyYW1tYXJVdGlscy5jcmVhdGVUZW1wRmlsZVdpdGhDb2RlKGNvZGUpXG4gICAgICByZXR1cm4gW3RtcEZpbGVdXG4gICAgfSxcbiAgfSxcblxuICBcIkZpbGUgQmFzZWRcIjoge1xuICAgIGNvbW1hbmQ6IFwidGNsc2hcIixcbiAgICBhcmdzKHsgZmlsZXBhdGggfSkge1xuICAgICAgcmV0dXJuIFtmaWxlcGF0aF1cbiAgICB9LFxuICB9LFxufVxuXG5jb25zdCBTaGVsbEdyYW1tYXJzID0ge1xuICBcIkJhc2ggQXV0b21hdGVkIFRlc3QgU3lzdGVtIChCYXRzKVwiOiBCYXRzLFxuICBCYXNoLFxuICBUY2wsXG4gIFwiU2hlbGwgU2NyaXB0XCI6IFNoZWxsLFxuICBcIlNoZWxsIFNjcmlwdCAoRmlzaClcIjogRmlzaCxcbn1cbmV4cG9ydCBkZWZhdWx0IFNoZWxsR3JhbW1hcnNcbiJdfQ==