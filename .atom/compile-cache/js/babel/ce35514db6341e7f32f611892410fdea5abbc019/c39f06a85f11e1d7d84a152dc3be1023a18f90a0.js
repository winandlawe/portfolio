Object.defineProperty(exports, "__esModule", {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _underscore = require("underscore");

var _underscore2 = _interopRequireDefault(_underscore);

var _grammarUtils = require("../grammar-utils");

var _grammarUtils2 = _interopRequireDefault(_grammarUtils);

"use babel";

var LispGrammars = {
  "Common Lisp": {
    "File Based": {
      command: "clisp",
      args: function args(_ref) {
        var filepath = _ref.filepath;

        return [filepath];
      }
    }
  },

  Lisp: {
    "Selection Based": {
      command: "sbcl",
      args: function args(context) {
        var statements = _underscore2["default"].flatten(_underscore2["default"].map(_grammarUtils2["default"].Lisp.splitStatements(context.getCode()), function (statement) {
          return ["--eval", statement];
        }));
        return _underscore2["default"].union(["--noinform", "--disable-debugger", "--non-interactive", "--quit"], statements);
      }
    },

    "File Based": {
      command: "sbcl",
      args: function args(_ref2) {
        var filepath = _ref2.filepath;

        return ["--noinform", "--script", filepath];
      }
    }
  },

  newLISP: {
    "Selection Based": {
      command: "newlisp",
      args: function args(context) {
        return ["-e", context.getCode()];
      }
    },
    "File Based": {
      command: "newlisp",
      args: function args(_ref3) {
        var filepath = _ref3.filepath;

        return [filepath];
      }
    }
  },

  Scheme: {
    "Selection Based": {
      command: "guile",
      args: function args(context) {
        return ["-c", context.getCode()];
      }
    },
    "File Based": {
      command: "guile",
      args: function args(_ref4) {
        var filepath = _ref4.filepath;

        return [filepath];
      }
    }
  }
};
exports["default"] = LispGrammars;
module.exports = exports["default"];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZpbGU6Ly8vQzovVXNlcnMvY2tuanUvLmF0b20vcGFja2FnZXMvc2NyaXB0L2xpYi9ncmFtbWFycy9saXNwLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OzswQkFFYyxZQUFZOzs7OzRCQUNELGtCQUFrQjs7OztBQUgzQyxXQUFXLENBQUE7O0FBS1gsSUFBTSxZQUFZLEdBQUc7QUFDbkIsZUFBYSxFQUFFO0FBQ2IsZ0JBQVksRUFBRTtBQUNaLGFBQU8sRUFBRSxPQUFPO0FBQ2hCLFVBQUksRUFBQSxjQUFDLElBQVksRUFBRTtZQUFaLFFBQVEsR0FBVixJQUFZLENBQVYsUUFBUTs7QUFDYixlQUFPLENBQUMsUUFBUSxDQUFDLENBQUE7T0FDbEI7S0FDRjtHQUNGOztBQUVELE1BQUksRUFBRTtBQUNKLHFCQUFpQixFQUFFO0FBQ2pCLGFBQU8sRUFBRSxNQUFNO0FBQ2YsVUFBSSxFQUFBLGNBQUMsT0FBTyxFQUFFO0FBQ1osWUFBTSxVQUFVLEdBQUcsd0JBQUUsT0FBTyxDQUMxQix3QkFBRSxHQUFHLENBQUMsMEJBQWEsSUFBSSxDQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLENBQUMsRUFBRSxVQUFDLFNBQVM7aUJBQUssQ0FBQyxRQUFRLEVBQUUsU0FBUyxDQUFDO1NBQUEsQ0FBQyxDQUNsRyxDQUFBO0FBQ0QsZUFBTyx3QkFBRSxLQUFLLENBQUMsQ0FBQyxZQUFZLEVBQUUsb0JBQW9CLEVBQUUsbUJBQW1CLEVBQUUsUUFBUSxDQUFDLEVBQUUsVUFBVSxDQUFDLENBQUE7T0FDaEc7S0FDRjs7QUFFRCxnQkFBWSxFQUFFO0FBQ1osYUFBTyxFQUFFLE1BQU07QUFDZixVQUFJLEVBQUEsY0FBQyxLQUFZLEVBQUU7WUFBWixRQUFRLEdBQVYsS0FBWSxDQUFWLFFBQVE7O0FBQ2IsZUFBTyxDQUFDLFlBQVksRUFBRSxVQUFVLEVBQUUsUUFBUSxDQUFDLENBQUE7T0FDNUM7S0FDRjtHQUNGOztBQUVELFNBQU8sRUFBRTtBQUNQLHFCQUFpQixFQUFFO0FBQ2pCLGFBQU8sRUFBRSxTQUFTO0FBQ2xCLFVBQUksRUFBQSxjQUFDLE9BQU8sRUFBRTtBQUNaLGVBQU8sQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUE7T0FDakM7S0FDRjtBQUNELGdCQUFZLEVBQUU7QUFDWixhQUFPLEVBQUUsU0FBUztBQUNsQixVQUFJLEVBQUEsY0FBQyxLQUFZLEVBQUU7WUFBWixRQUFRLEdBQVYsS0FBWSxDQUFWLFFBQVE7O0FBQ2IsZUFBTyxDQUFDLFFBQVEsQ0FBQyxDQUFBO09BQ2xCO0tBQ0Y7R0FDRjs7QUFFRCxRQUFNLEVBQUU7QUFDTixxQkFBaUIsRUFBRTtBQUNqQixhQUFPLEVBQUUsT0FBTztBQUNoQixVQUFJLEVBQUEsY0FBQyxPQUFPLEVBQUU7QUFDWixlQUFPLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFBO09BQ2pDO0tBQ0Y7QUFDRCxnQkFBWSxFQUFFO0FBQ1osYUFBTyxFQUFFLE9BQU87QUFDaEIsVUFBSSxFQUFBLGNBQUMsS0FBWSxFQUFFO1lBQVosUUFBUSxHQUFWLEtBQVksQ0FBVixRQUFROztBQUNiLGVBQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQTtPQUNsQjtLQUNGO0dBQ0Y7Q0FDRixDQUFBO3FCQUNjLFlBQVkiLCJmaWxlIjoiZmlsZTovLy9DOi9Vc2Vycy9ja25qdS8uYXRvbS9wYWNrYWdlcy9zY3JpcHQvbGliL2dyYW1tYXJzL2xpc3AuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBiYWJlbFwiXG5cbmltcG9ydCBfIGZyb20gXCJ1bmRlcnNjb3JlXCJcbmltcG9ydCBHcmFtbWFyVXRpbHMgZnJvbSBcIi4uL2dyYW1tYXItdXRpbHNcIlxuXG5jb25zdCBMaXNwR3JhbW1hcnMgPSB7XG4gIFwiQ29tbW9uIExpc3BcIjoge1xuICAgIFwiRmlsZSBCYXNlZFwiOiB7XG4gICAgICBjb21tYW5kOiBcImNsaXNwXCIsXG4gICAgICBhcmdzKHsgZmlsZXBhdGggfSkge1xuICAgICAgICByZXR1cm4gW2ZpbGVwYXRoXVxuICAgICAgfSxcbiAgICB9LFxuICB9LFxuXG4gIExpc3A6IHtcbiAgICBcIlNlbGVjdGlvbiBCYXNlZFwiOiB7XG4gICAgICBjb21tYW5kOiBcInNiY2xcIixcbiAgICAgIGFyZ3MoY29udGV4dCkge1xuICAgICAgICBjb25zdCBzdGF0ZW1lbnRzID0gXy5mbGF0dGVuKFxuICAgICAgICAgIF8ubWFwKEdyYW1tYXJVdGlscy5MaXNwLnNwbGl0U3RhdGVtZW50cyhjb250ZXh0LmdldENvZGUoKSksIChzdGF0ZW1lbnQpID0+IFtcIi0tZXZhbFwiLCBzdGF0ZW1lbnRdKVxuICAgICAgICApXG4gICAgICAgIHJldHVybiBfLnVuaW9uKFtcIi0tbm9pbmZvcm1cIiwgXCItLWRpc2FibGUtZGVidWdnZXJcIiwgXCItLW5vbi1pbnRlcmFjdGl2ZVwiLCBcIi0tcXVpdFwiXSwgc3RhdGVtZW50cylcbiAgICAgIH0sXG4gICAgfSxcblxuICAgIFwiRmlsZSBCYXNlZFwiOiB7XG4gICAgICBjb21tYW5kOiBcInNiY2xcIixcbiAgICAgIGFyZ3MoeyBmaWxlcGF0aCB9KSB7XG4gICAgICAgIHJldHVybiBbXCItLW5vaW5mb3JtXCIsIFwiLS1zY3JpcHRcIiwgZmlsZXBhdGhdXG4gICAgICB9LFxuICAgIH0sXG4gIH0sXG5cbiAgbmV3TElTUDoge1xuICAgIFwiU2VsZWN0aW9uIEJhc2VkXCI6IHtcbiAgICAgIGNvbW1hbmQ6IFwibmV3bGlzcFwiLFxuICAgICAgYXJncyhjb250ZXh0KSB7XG4gICAgICAgIHJldHVybiBbXCItZVwiLCBjb250ZXh0LmdldENvZGUoKV1cbiAgICAgIH0sXG4gICAgfSxcbiAgICBcIkZpbGUgQmFzZWRcIjoge1xuICAgICAgY29tbWFuZDogXCJuZXdsaXNwXCIsXG4gICAgICBhcmdzKHsgZmlsZXBhdGggfSkge1xuICAgICAgICByZXR1cm4gW2ZpbGVwYXRoXVxuICAgICAgfSxcbiAgICB9LFxuICB9LFxuXG4gIFNjaGVtZToge1xuICAgIFwiU2VsZWN0aW9uIEJhc2VkXCI6IHtcbiAgICAgIGNvbW1hbmQ6IFwiZ3VpbGVcIixcbiAgICAgIGFyZ3MoY29udGV4dCkge1xuICAgICAgICByZXR1cm4gW1wiLWNcIiwgY29udGV4dC5nZXRDb2RlKCldXG4gICAgICB9LFxuICAgIH0sXG4gICAgXCJGaWxlIEJhc2VkXCI6IHtcbiAgICAgIGNvbW1hbmQ6IFwiZ3VpbGVcIixcbiAgICAgIGFyZ3MoeyBmaWxlcGF0aCB9KSB7XG4gICAgICAgIHJldHVybiBbZmlsZXBhdGhdXG4gICAgICB9LFxuICAgIH0sXG4gIH0sXG59XG5leHBvcnQgZGVmYXVsdCBMaXNwR3JhbW1hcnNcbiJdfQ==