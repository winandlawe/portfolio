Object.defineProperty(exports, "__esModule", {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */

var _grammarUtils = require("../grammar-utils");

var _grammarUtils2 = _interopRequireDefault(_grammarUtils);

"use babel";var command = _grammarUtils2["default"].command;

// const windows = GrammarUtils.OperatingSystem.isWindows()

var MLGrammars = {
  BuckleScript: {
    "Selection Based": {
      command: "bsc",
      args: function args(context) {
        var code = context.getCode();
        var tmpFile = _grammarUtils2["default"].createTempFileWithCode(code);
        return ["-c", tmpFile];
      }
    },

    "File Based": {
      command: "bsc",
      args: function args(_ref) {
        var filepath = _ref.filepath;

        return ["-c", filepath];
      }
    }
  },

  OCaml: {
    "File Based": {
      command: "ocaml",
      args: function args(_ref2) {
        var filepath = _ref2.filepath;

        return [filepath];
      }
    }
  },

  Reason: {
    "File Based": {
      command: command,
      args: function args(_ref3) {
        var filename = _ref3.filename;

        var file = filename.replace(/\.re$/, ".native");
        return _grammarUtils2["default"].formatArgs("rebuild '" + file + "' && '" + file + "'");
      }
    }
  },

  "Standard ML": {
    "File Based": {
      command: "sml",
      args: function args(_ref4) {
        var filename = _ref4.filename;

        return [filename];
      }
    },

    "Selection Based": {
      command: "sml",
      args: function args(context) {
        var code = context.getCode();
        var tmpFile = _grammarUtils2["default"].createTempFileWithCode(code, ".sml");
        return [tmpFile];
      }
    }
  }
};
exports["default"] = MLGrammars;
module.exports = exports["default"];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZpbGU6Ly8vQzovVXNlcnMvY2tuanUvLmF0b20vcGFja2FnZXMvc2NyaXB0L2xpYi9ncmFtbWFycy9tbC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7NEJBT3lCLGtCQUFrQjs7OztBQVAzQyxXQUFXLENBQUEsSUFRSCxPQUFPLDZCQUFQLE9BQU87Ozs7QUFJZixJQUFNLFVBQVUsR0FBRztBQUNqQixjQUFZLEVBQUU7QUFDWixxQkFBaUIsRUFBRTtBQUNqQixhQUFPLEVBQUUsS0FBSztBQUNkLFVBQUksRUFBQSxjQUFDLE9BQU8sRUFBRTtBQUNaLFlBQU0sSUFBSSxHQUFHLE9BQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQTtBQUM5QixZQUFNLE9BQU8sR0FBRywwQkFBYSxzQkFBc0IsQ0FBQyxJQUFJLENBQUMsQ0FBQTtBQUN6RCxlQUFPLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFBO09BQ3ZCO0tBQ0Y7O0FBRUQsZ0JBQVksRUFBRTtBQUNaLGFBQU8sRUFBRSxLQUFLO0FBQ2QsVUFBSSxFQUFBLGNBQUMsSUFBWSxFQUFFO1lBQVosUUFBUSxHQUFWLElBQVksQ0FBVixRQUFROztBQUNiLGVBQU8sQ0FBQyxJQUFJLEVBQUUsUUFBUSxDQUFDLENBQUE7T0FDeEI7S0FDRjtHQUNGOztBQUVELE9BQUssRUFBRTtBQUNMLGdCQUFZLEVBQUU7QUFDWixhQUFPLEVBQUUsT0FBTztBQUNoQixVQUFJLEVBQUEsY0FBQyxLQUFZLEVBQUU7WUFBWixRQUFRLEdBQVYsS0FBWSxDQUFWLFFBQVE7O0FBQ2IsZUFBTyxDQUFDLFFBQVEsQ0FBQyxDQUFBO09BQ2xCO0tBQ0Y7R0FDRjs7QUFFRCxRQUFNLEVBQUU7QUFDTixnQkFBWSxFQUFFO0FBQ1osYUFBTyxFQUFQLE9BQU87QUFDUCxVQUFJLEVBQUEsY0FBQyxLQUFZLEVBQUU7WUFBWixRQUFRLEdBQVYsS0FBWSxDQUFWLFFBQVE7O0FBQ2IsWUFBTSxJQUFJLEdBQUcsUUFBUSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsU0FBUyxDQUFDLENBQUE7QUFDakQsZUFBTywwQkFBYSxVQUFVLGVBQWEsSUFBSSxjQUFTLElBQUksT0FBSSxDQUFBO09BQ2pFO0tBQ0Y7R0FDRjs7QUFFRCxlQUFhLEVBQUU7QUFDYixnQkFBWSxFQUFFO0FBQ1osYUFBTyxFQUFFLEtBQUs7QUFDZCxVQUFJLEVBQUEsY0FBQyxLQUFZLEVBQUU7WUFBWixRQUFRLEdBQVYsS0FBWSxDQUFWLFFBQVE7O0FBQ2IsZUFBTyxDQUFDLFFBQVEsQ0FBQyxDQUFBO09BQ2xCO0tBQ0Y7O0FBRUQscUJBQWlCLEVBQUU7QUFDakIsYUFBTyxFQUFFLEtBQUs7QUFDZCxVQUFJLEVBQUEsY0FBQyxPQUFPLEVBQUU7QUFDWixZQUFNLElBQUksR0FBRyxPQUFPLENBQUMsT0FBTyxFQUFFLENBQUE7QUFDOUIsWUFBTSxPQUFPLEdBQUcsMEJBQWEsc0JBQXNCLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFBO0FBQ2pFLGVBQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQTtPQUNqQjtLQUNGO0dBQ0Y7Q0FDRixDQUFBO3FCQUNjLFVBQVUiLCJmaWxlIjoiZmlsZTovLy9DOi9Vc2Vycy9ja25qdS8uYXRvbS9wYWNrYWdlcy9zY3JpcHQvbGliL2dyYW1tYXJzL21sLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2UgYmFiZWxcIlxuXG4vKlxuICogZGVjYWZmZWluYXRlIHN1Z2dlc3Rpb25zOlxuICogRFMxMDI6IFJlbW92ZSB1bm5lY2Vzc2FyeSBjb2RlIGNyZWF0ZWQgYmVjYXVzZSBvZiBpbXBsaWNpdCByZXR1cm5zXG4gKiBGdWxsIGRvY3M6IGh0dHBzOi8vZ2l0aHViLmNvbS9kZWNhZmZlaW5hdGUvZGVjYWZmZWluYXRlL2Jsb2IvbWFzdGVyL2RvY3Mvc3VnZ2VzdGlvbnMubWRcbiAqL1xuaW1wb3J0IEdyYW1tYXJVdGlscyBmcm9tIFwiLi4vZ3JhbW1hci11dGlsc1wiXG5jb25zdCB7IGNvbW1hbmQgfSA9IEdyYW1tYXJVdGlsc1xuXG4vLyBjb25zdCB3aW5kb3dzID0gR3JhbW1hclV0aWxzLk9wZXJhdGluZ1N5c3RlbS5pc1dpbmRvd3MoKVxuXG5jb25zdCBNTEdyYW1tYXJzID0ge1xuICBCdWNrbGVTY3JpcHQ6IHtcbiAgICBcIlNlbGVjdGlvbiBCYXNlZFwiOiB7XG4gICAgICBjb21tYW5kOiBcImJzY1wiLFxuICAgICAgYXJncyhjb250ZXh0KSB7XG4gICAgICAgIGNvbnN0IGNvZGUgPSBjb250ZXh0LmdldENvZGUoKVxuICAgICAgICBjb25zdCB0bXBGaWxlID0gR3JhbW1hclV0aWxzLmNyZWF0ZVRlbXBGaWxlV2l0aENvZGUoY29kZSlcbiAgICAgICAgcmV0dXJuIFtcIi1jXCIsIHRtcEZpbGVdXG4gICAgICB9LFxuICAgIH0sXG5cbiAgICBcIkZpbGUgQmFzZWRcIjoge1xuICAgICAgY29tbWFuZDogXCJic2NcIixcbiAgICAgIGFyZ3MoeyBmaWxlcGF0aCB9KSB7XG4gICAgICAgIHJldHVybiBbXCItY1wiLCBmaWxlcGF0aF1cbiAgICAgIH0sXG4gICAgfSxcbiAgfSxcblxuICBPQ2FtbDoge1xuICAgIFwiRmlsZSBCYXNlZFwiOiB7XG4gICAgICBjb21tYW5kOiBcIm9jYW1sXCIsXG4gICAgICBhcmdzKHsgZmlsZXBhdGggfSkge1xuICAgICAgICByZXR1cm4gW2ZpbGVwYXRoXVxuICAgICAgfSxcbiAgICB9LFxuICB9LFxuXG4gIFJlYXNvbjoge1xuICAgIFwiRmlsZSBCYXNlZFwiOiB7XG4gICAgICBjb21tYW5kLFxuICAgICAgYXJncyh7IGZpbGVuYW1lIH0pIHtcbiAgICAgICAgY29uc3QgZmlsZSA9IGZpbGVuYW1lLnJlcGxhY2UoL1xcLnJlJC8sIFwiLm5hdGl2ZVwiKVxuICAgICAgICByZXR1cm4gR3JhbW1hclV0aWxzLmZvcm1hdEFyZ3MoYHJlYnVpbGQgJyR7ZmlsZX0nICYmICcke2ZpbGV9J2ApXG4gICAgICB9LFxuICAgIH0sXG4gIH0sXG5cbiAgXCJTdGFuZGFyZCBNTFwiOiB7XG4gICAgXCJGaWxlIEJhc2VkXCI6IHtcbiAgICAgIGNvbW1hbmQ6IFwic21sXCIsXG4gICAgICBhcmdzKHsgZmlsZW5hbWUgfSkge1xuICAgICAgICByZXR1cm4gW2ZpbGVuYW1lXVxuICAgICAgfSxcbiAgICB9LFxuXG4gICAgXCJTZWxlY3Rpb24gQmFzZWRcIjoge1xuICAgICAgY29tbWFuZDogXCJzbWxcIixcbiAgICAgIGFyZ3MoY29udGV4dCkge1xuICAgICAgICBjb25zdCBjb2RlID0gY29udGV4dC5nZXRDb2RlKClcbiAgICAgICAgY29uc3QgdG1wRmlsZSA9IEdyYW1tYXJVdGlscy5jcmVhdGVUZW1wRmlsZVdpdGhDb2RlKGNvZGUsIFwiLnNtbFwiKVxuICAgICAgICByZXR1cm4gW3RtcEZpbGVdXG4gICAgICB9LFxuICAgIH0sXG4gIH0sXG59XG5leHBvcnQgZGVmYXVsdCBNTEdyYW1tYXJzXG4iXX0=