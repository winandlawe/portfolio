Object.defineProperty(exports, "__esModule", {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _grammarUtils = require("../grammar-utils");

var _grammarUtils2 = _interopRequireDefault(_grammarUtils);

"use babel";

var Perl = {
  "Selection Based": {
    command: "perl",
    args: function args(context) {
      var code = context.getCode();
      var tmpFile = _grammarUtils2["default"].createTempFileWithCode(code);
      return [tmpFile];
    }
  },

  "File Based": {
    command: "perl",
    args: function args(_ref) {
      var filepath = _ref.filepath;

      return [filepath];
    }
  }
};

var Raku = {
  "Selection Based": {
    command: "raku",
    args: function args(context) {
      return ["-e", context.getCode()];
    }
  },

  "File Based": {
    command: "raku",
    args: function args(_ref2) {
      var filepath = _ref2.filepath;

      return [filepath];
    }
  }
};

var Perl6 = Raku;

var PerlGrammars = {
  Perl: Perl,
  Raku: Raku,
  "Perl 6": Perl6
};
exports["default"] = PerlGrammars;
module.exports = exports["default"];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZpbGU6Ly8vQzovVXNlcnMvY2tuanUvLmF0b20vcGFja2FnZXMvc2NyaXB0L2xpYi9ncmFtbWFycy9wZXJsLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs0QkFFeUIsa0JBQWtCOzs7O0FBRjNDLFdBQVcsQ0FBQTs7QUFJWCxJQUFNLElBQUksR0FBRztBQUNYLG1CQUFpQixFQUFFO0FBQ2pCLFdBQU8sRUFBRSxNQUFNO0FBQ2YsUUFBSSxFQUFBLGNBQUMsT0FBTyxFQUFFO0FBQ1osVUFBTSxJQUFJLEdBQUcsT0FBTyxDQUFDLE9BQU8sRUFBRSxDQUFBO0FBQzlCLFVBQU0sT0FBTyxHQUFHLDBCQUFhLHNCQUFzQixDQUFDLElBQUksQ0FBQyxDQUFBO0FBQ3pELGFBQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQTtLQUNqQjtHQUNGOztBQUVELGNBQVksRUFBRTtBQUNaLFdBQU8sRUFBRSxNQUFNO0FBQ2YsUUFBSSxFQUFBLGNBQUMsSUFBWSxFQUFFO1VBQVosUUFBUSxHQUFWLElBQVksQ0FBVixRQUFROztBQUNiLGFBQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQTtLQUNsQjtHQUNGO0NBQ0YsQ0FBQTs7QUFFRCxJQUFNLElBQUksR0FBRztBQUNYLG1CQUFpQixFQUFFO0FBQ2pCLFdBQU8sRUFBRSxNQUFNO0FBQ2YsUUFBSSxFQUFBLGNBQUMsT0FBTyxFQUFFO0FBQ1osYUFBTyxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQTtLQUNqQztHQUNGOztBQUVELGNBQVksRUFBRTtBQUNaLFdBQU8sRUFBRSxNQUFNO0FBQ2YsUUFBSSxFQUFBLGNBQUMsS0FBWSxFQUFFO1VBQVosUUFBUSxHQUFWLEtBQVksQ0FBVixRQUFROztBQUNiLGFBQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQTtLQUNsQjtHQUNGO0NBQ0YsQ0FBQTs7QUFFRCxJQUFNLEtBQUssR0FBRyxJQUFJLENBQUE7O0FBRWxCLElBQU0sWUFBWSxHQUFHO0FBQ25CLE1BQUksRUFBSixJQUFJO0FBQ0osTUFBSSxFQUFKLElBQUk7QUFDSixVQUFRLEVBQUUsS0FBSztDQUNoQixDQUFBO3FCQUNjLFlBQVkiLCJmaWxlIjoiZmlsZTovLy9DOi9Vc2Vycy9ja25qdS8uYXRvbS9wYWNrYWdlcy9zY3JpcHQvbGliL2dyYW1tYXJzL3BlcmwuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBiYWJlbFwiXG5cbmltcG9ydCBHcmFtbWFyVXRpbHMgZnJvbSBcIi4uL2dyYW1tYXItdXRpbHNcIlxuXG5jb25zdCBQZXJsID0ge1xuICBcIlNlbGVjdGlvbiBCYXNlZFwiOiB7XG4gICAgY29tbWFuZDogXCJwZXJsXCIsXG4gICAgYXJncyhjb250ZXh0KSB7XG4gICAgICBjb25zdCBjb2RlID0gY29udGV4dC5nZXRDb2RlKClcbiAgICAgIGNvbnN0IHRtcEZpbGUgPSBHcmFtbWFyVXRpbHMuY3JlYXRlVGVtcEZpbGVXaXRoQ29kZShjb2RlKVxuICAgICAgcmV0dXJuIFt0bXBGaWxlXVxuICAgIH0sXG4gIH0sXG5cbiAgXCJGaWxlIEJhc2VkXCI6IHtcbiAgICBjb21tYW5kOiBcInBlcmxcIixcbiAgICBhcmdzKHsgZmlsZXBhdGggfSkge1xuICAgICAgcmV0dXJuIFtmaWxlcGF0aF1cbiAgICB9LFxuICB9LFxufVxuXG5jb25zdCBSYWt1ID0ge1xuICBcIlNlbGVjdGlvbiBCYXNlZFwiOiB7XG4gICAgY29tbWFuZDogXCJyYWt1XCIsXG4gICAgYXJncyhjb250ZXh0KSB7XG4gICAgICByZXR1cm4gW1wiLWVcIiwgY29udGV4dC5nZXRDb2RlKCldXG4gICAgfSxcbiAgfSxcblxuICBcIkZpbGUgQmFzZWRcIjoge1xuICAgIGNvbW1hbmQ6IFwicmFrdVwiLFxuICAgIGFyZ3MoeyBmaWxlcGF0aCB9KSB7XG4gICAgICByZXR1cm4gW2ZpbGVwYXRoXVxuICAgIH0sXG4gIH0sXG59XG5cbmNvbnN0IFBlcmw2ID0gUmFrdVxuXG5jb25zdCBQZXJsR3JhbW1hcnMgPSB7XG4gIFBlcmwsXG4gIFJha3UsXG4gIFwiUGVybCA2XCI6IFBlcmw2LFxufVxuZXhwb3J0IGRlZmF1bHQgUGVybEdyYW1tYXJzXG4iXX0=