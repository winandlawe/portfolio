Object.defineProperty(exports, "__esModule", {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _grammarUtils = require("../grammar-utils");

var _grammarUtils2 = _interopRequireDefault(_grammarUtils);

"use babel";

var babel = _path2["default"].join(__dirname, "../..", "node_modules", ".bin", _grammarUtils2["default"].OperatingSystem.isWindows() ? "babel-node.cmd" : "babel-node");
var babelConfig = _path2["default"].join(__dirname, "babel.config.js");

var JavaScript = {
  "Selection Based": {
    command: babel,
    args: function args(context) {
      var code = context.getCode();
      var filepath = _grammarUtils2["default"].createTempFileWithCode(code, ".js");
      return [filepath, "--config-file", babelConfig];
    }
  },
  "File Based": {
    command: babel,
    args: function args(_ref) {
      var filepath = _ref.filepath;
      return [filepath, "--config-file", babelConfig];
    }
  }
};
var Babel = JavaScript;
var JSX = JavaScript;

var TypeScript = {
  "Selection Based": {
    command: "ts-node",
    args: function args(context) {
      return ["-e", context.getCode()];
    }
  },
  "File Based": {
    command: "ts-node",
    args: function args(_ref2) {
      var filepath = _ref2.filepath;
      return [filepath];
    }
  }
};

var Dart = {
  "Selection Based": {
    command: "dart",
    args: function args(context) {
      var code = context.getCode();
      var tmpFile = _grammarUtils2["default"].createTempFileWithCode(code, ".dart");
      return [tmpFile];
    }
  },
  "File Based": {
    command: "dart",
    args: function args(_ref3) {
      var filepath = _ref3.filepath;
      return [filepath];
    }
  }
};

var JXA = {
  "Selection Based": {
    command: "osascript",
    args: function args(context) {
      return ["-l", "JavaScript", "-e", context.getCode()];
    }
  },
  "File Based": {
    command: "osascript",
    args: function args(_ref4) {
      var filepath = _ref4.filepath;
      return ["-l", "JavaScript", filepath];
    }
  }
};

var JavaScriptGrammars = {
  JavaScript: JavaScript,
  "Babel ES6 JavaScript": Babel,
  "JavaScript with JSX": JSX,
  Dart: Dart,
  "JavaScript for Automation (JXA)": JXA,
  TypeScript: TypeScript
};
exports["default"] = JavaScriptGrammars;
module.exports = exports["default"];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZpbGU6Ly8vQzovVXNlcnMvY2tuanUvLmF0b20vcGFja2FnZXMvc2NyaXB0L2xpYi9ncmFtbWFycy9qYXZhc2NyaXB0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztvQkFFaUIsTUFBTTs7Ozs0QkFDRSxrQkFBa0I7Ozs7QUFIM0MsV0FBVyxDQUFBOztBQUtYLElBQU0sS0FBSyxHQUFHLGtCQUFLLElBQUksQ0FDckIsU0FBUyxFQUNULE9BQU8sRUFDUCxjQUFjLEVBQ2QsTUFBTSxFQUNOLDBCQUFhLGVBQWUsQ0FBQyxTQUFTLEVBQUUsR0FBRyxnQkFBZ0IsR0FBRyxZQUFZLENBQzNFLENBQUE7QUFDRCxJQUFNLFdBQVcsR0FBRyxrQkFBSyxJQUFJLENBQUMsU0FBUyxFQUFFLGlCQUFpQixDQUFDLENBQUE7O0FBRTNELElBQU0sVUFBVSxHQUFHO0FBQ2pCLG1CQUFpQixFQUFFO0FBQ2pCLFdBQU8sRUFBRSxLQUFLO0FBQ2QsUUFBSSxFQUFFLGNBQUMsT0FBTyxFQUFLO0FBQ2pCLFVBQU0sSUFBSSxHQUFHLE9BQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQTtBQUM5QixVQUFNLFFBQVEsR0FBRywwQkFBYSxzQkFBc0IsQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUE7QUFDakUsYUFBTyxDQUFDLFFBQVEsRUFBRSxlQUFlLEVBQUUsV0FBVyxDQUFDLENBQUE7S0FDaEQ7R0FDRjtBQUNELGNBQVksRUFBRTtBQUNaLFdBQU8sRUFBRSxLQUFLO0FBQ2QsUUFBSSxFQUFFLGNBQUMsSUFBWTtVQUFWLFFBQVEsR0FBVixJQUFZLENBQVYsUUFBUTthQUFPLENBQUMsUUFBUSxFQUFFLGVBQWUsRUFBRSxXQUFXLENBQUM7S0FBQTtHQUNqRTtDQUNGLENBQUE7QUFDRCxJQUFNLEtBQUssR0FBRyxVQUFVLENBQUE7QUFDeEIsSUFBTSxHQUFHLEdBQUcsVUFBVSxDQUFBOztBQUV0QixJQUFNLFVBQVUsR0FBRztBQUNqQixtQkFBaUIsRUFBRTtBQUNqQixXQUFPLEVBQUUsU0FBUztBQUNsQixRQUFJLEVBQUUsY0FBQyxPQUFPO2FBQUssQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLE9BQU8sRUFBRSxDQUFDO0tBQUE7R0FDN0M7QUFDRCxjQUFZLEVBQUU7QUFDWixXQUFPLEVBQUUsU0FBUztBQUNsQixRQUFJLEVBQUUsY0FBQyxLQUFZO1VBQVYsUUFBUSxHQUFWLEtBQVksQ0FBVixRQUFRO2FBQU8sQ0FBQyxRQUFRLENBQUM7S0FBQTtHQUNuQztDQUNGLENBQUE7O0FBRUQsSUFBTSxJQUFJLEdBQUc7QUFDWCxtQkFBaUIsRUFBRTtBQUNqQixXQUFPLEVBQUUsTUFBTTtBQUNmLFFBQUksRUFBRSxjQUFDLE9BQU8sRUFBSztBQUNqQixVQUFNLElBQUksR0FBRyxPQUFPLENBQUMsT0FBTyxFQUFFLENBQUE7QUFDOUIsVUFBTSxPQUFPLEdBQUcsMEJBQWEsc0JBQXNCLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFBO0FBQ2xFLGFBQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQTtLQUNqQjtHQUNGO0FBQ0QsY0FBWSxFQUFFO0FBQ1osV0FBTyxFQUFFLE1BQU07QUFDZixRQUFJLEVBQUUsY0FBQyxLQUFZO1VBQVYsUUFBUSxHQUFWLEtBQVksQ0FBVixRQUFRO2FBQU8sQ0FBQyxRQUFRLENBQUM7S0FBQTtHQUNuQztDQUNGLENBQUE7O0FBRUQsSUFBTSxHQUFHLEdBQUc7QUFDVixtQkFBaUIsRUFBRTtBQUNqQixXQUFPLEVBQUUsV0FBVztBQUNwQixRQUFJLEVBQUUsY0FBQyxPQUFPO2FBQUssQ0FBQyxJQUFJLEVBQUUsWUFBWSxFQUFFLElBQUksRUFBRSxPQUFPLENBQUMsT0FBTyxFQUFFLENBQUM7S0FBQTtHQUNqRTtBQUNELGNBQVksRUFBRTtBQUNaLFdBQU8sRUFBRSxXQUFXO0FBQ3BCLFFBQUksRUFBRSxjQUFDLEtBQVk7VUFBVixRQUFRLEdBQVYsS0FBWSxDQUFWLFFBQVE7YUFBTyxDQUFDLElBQUksRUFBRSxZQUFZLEVBQUUsUUFBUSxDQUFDO0tBQUE7R0FDdkQ7Q0FDRixDQUFBOztBQUVELElBQU0sa0JBQWtCLEdBQUc7QUFDekIsWUFBVSxFQUFWLFVBQVU7QUFDVix3QkFBc0IsRUFBRSxLQUFLO0FBQzdCLHVCQUFxQixFQUFFLEdBQUc7QUFDMUIsTUFBSSxFQUFKLElBQUk7QUFDSixtQ0FBaUMsRUFBRSxHQUFHO0FBQ3RDLFlBQVUsRUFBVixVQUFVO0NBQ1gsQ0FBQTtxQkFDYyxrQkFBa0IiLCJmaWxlIjoiZmlsZTovLy9DOi9Vc2Vycy9ja25qdS8uYXRvbS9wYWNrYWdlcy9zY3JpcHQvbGliL2dyYW1tYXJzL2phdmFzY3JpcHQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBiYWJlbFwiXG5cbmltcG9ydCBwYXRoIGZyb20gXCJwYXRoXCJcbmltcG9ydCBHcmFtbWFyVXRpbHMgZnJvbSBcIi4uL2dyYW1tYXItdXRpbHNcIlxuXG5jb25zdCBiYWJlbCA9IHBhdGguam9pbihcbiAgX19kaXJuYW1lLFxuICBcIi4uLy4uXCIsXG4gIFwibm9kZV9tb2R1bGVzXCIsXG4gIFwiLmJpblwiLFxuICBHcmFtbWFyVXRpbHMuT3BlcmF0aW5nU3lzdGVtLmlzV2luZG93cygpID8gXCJiYWJlbC1ub2RlLmNtZFwiIDogXCJiYWJlbC1ub2RlXCJcbilcbmNvbnN0IGJhYmVsQ29uZmlnID0gcGF0aC5qb2luKF9fZGlybmFtZSwgXCJiYWJlbC5jb25maWcuanNcIilcblxuY29uc3QgSmF2YVNjcmlwdCA9IHtcbiAgXCJTZWxlY3Rpb24gQmFzZWRcIjoge1xuICAgIGNvbW1hbmQ6IGJhYmVsLFxuICAgIGFyZ3M6IChjb250ZXh0KSA9PiB7XG4gICAgICBjb25zdCBjb2RlID0gY29udGV4dC5nZXRDb2RlKClcbiAgICAgIGNvbnN0IGZpbGVwYXRoID0gR3JhbW1hclV0aWxzLmNyZWF0ZVRlbXBGaWxlV2l0aENvZGUoY29kZSwgXCIuanNcIilcbiAgICAgIHJldHVybiBbZmlsZXBhdGgsIFwiLS1jb25maWctZmlsZVwiLCBiYWJlbENvbmZpZ11cbiAgICB9LFxuICB9LFxuICBcIkZpbGUgQmFzZWRcIjoge1xuICAgIGNvbW1hbmQ6IGJhYmVsLFxuICAgIGFyZ3M6ICh7IGZpbGVwYXRoIH0pID0+IFtmaWxlcGF0aCwgXCItLWNvbmZpZy1maWxlXCIsIGJhYmVsQ29uZmlnXSxcbiAgfSxcbn1cbmNvbnN0IEJhYmVsID0gSmF2YVNjcmlwdFxuY29uc3QgSlNYID0gSmF2YVNjcmlwdFxuXG5jb25zdCBUeXBlU2NyaXB0ID0ge1xuICBcIlNlbGVjdGlvbiBCYXNlZFwiOiB7XG4gICAgY29tbWFuZDogXCJ0cy1ub2RlXCIsXG4gICAgYXJnczogKGNvbnRleHQpID0+IFtcIi1lXCIsIGNvbnRleHQuZ2V0Q29kZSgpXSxcbiAgfSxcbiAgXCJGaWxlIEJhc2VkXCI6IHtcbiAgICBjb21tYW5kOiBcInRzLW5vZGVcIixcbiAgICBhcmdzOiAoeyBmaWxlcGF0aCB9KSA9PiBbZmlsZXBhdGhdLFxuICB9LFxufVxuXG5jb25zdCBEYXJ0ID0ge1xuICBcIlNlbGVjdGlvbiBCYXNlZFwiOiB7XG4gICAgY29tbWFuZDogXCJkYXJ0XCIsXG4gICAgYXJnczogKGNvbnRleHQpID0+IHtcbiAgICAgIGNvbnN0IGNvZGUgPSBjb250ZXh0LmdldENvZGUoKVxuICAgICAgY29uc3QgdG1wRmlsZSA9IEdyYW1tYXJVdGlscy5jcmVhdGVUZW1wRmlsZVdpdGhDb2RlKGNvZGUsIFwiLmRhcnRcIilcbiAgICAgIHJldHVybiBbdG1wRmlsZV1cbiAgICB9LFxuICB9LFxuICBcIkZpbGUgQmFzZWRcIjoge1xuICAgIGNvbW1hbmQ6IFwiZGFydFwiLFxuICAgIGFyZ3M6ICh7IGZpbGVwYXRoIH0pID0+IFtmaWxlcGF0aF0sXG4gIH0sXG59XG5cbmNvbnN0IEpYQSA9IHtcbiAgXCJTZWxlY3Rpb24gQmFzZWRcIjoge1xuICAgIGNvbW1hbmQ6IFwib3Nhc2NyaXB0XCIsXG4gICAgYXJnczogKGNvbnRleHQpID0+IFtcIi1sXCIsIFwiSmF2YVNjcmlwdFwiLCBcIi1lXCIsIGNvbnRleHQuZ2V0Q29kZSgpXSxcbiAgfSxcbiAgXCJGaWxlIEJhc2VkXCI6IHtcbiAgICBjb21tYW5kOiBcIm9zYXNjcmlwdFwiLFxuICAgIGFyZ3M6ICh7IGZpbGVwYXRoIH0pID0+IFtcIi1sXCIsIFwiSmF2YVNjcmlwdFwiLCBmaWxlcGF0aF0sXG4gIH0sXG59XG5cbmNvbnN0IEphdmFTY3JpcHRHcmFtbWFycyA9IHtcbiAgSmF2YVNjcmlwdCxcbiAgXCJCYWJlbCBFUzYgSmF2YVNjcmlwdFwiOiBCYWJlbCxcbiAgXCJKYXZhU2NyaXB0IHdpdGggSlNYXCI6IEpTWCxcbiAgRGFydCxcbiAgXCJKYXZhU2NyaXB0IGZvciBBdXRvbWF0aW9uIChKWEEpXCI6IEpYQSxcbiAgVHlwZVNjcmlwdCxcbn1cbmV4cG9ydCBkZWZhdWx0IEphdmFTY3JpcHRHcmFtbWFyc1xuIl19