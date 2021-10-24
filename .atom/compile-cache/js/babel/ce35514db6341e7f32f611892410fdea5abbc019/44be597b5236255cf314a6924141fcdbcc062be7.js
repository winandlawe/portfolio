"use babel";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var RubyGrammars = {
  RSpec: {
    "Selection Based": {
      command: "ruby",
      args: function args(context) {
        return ["-e", context.getCode()];
      }
    },

    "File Based": {
      command: "rspec",
      args: function args(_ref) {
        var filepath = _ref.filepath;

        return ["--tty", "--color", filepath];
      }
    },

    "Line Number Based": {
      command: "rspec",
      args: function args(context) {
        return ["--tty", "--color", context.fileColonLine()];
      }
    }
  },

  Ruby: {
    "Selection Based": {
      command: "ruby",
      args: function args(context) {
        return ["-e", context.getCode()];
      }
    },

    "File Based": {
      command: "ruby",
      args: function args(_ref2) {
        var filepath = _ref2.filepath;

        return [filepath];
      }
    }
  },

  "Ruby on Rails": {
    "Selection Based": {
      command: "rails",
      args: function args(context) {
        return ["runner", context.getCode()];
      }
    },

    "File Based": {
      command: "rails",
      args: function args(_ref3) {
        var filepath = _ref3.filepath;

        return ["runner", filepath];
      }
    }
  }
};
exports["default"] = RubyGrammars;
module.exports = exports["default"];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZpbGU6Ly8vQzovVXNlcnMvY2tuanUvLmF0b20vcGFja2FnZXMvc2NyaXB0L2xpYi9ncmFtbWFycy9ydWJ5LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLFdBQVcsQ0FBQTs7Ozs7QUFFWCxJQUFNLFlBQVksR0FBRztBQUNuQixPQUFLLEVBQUU7QUFDTCxxQkFBaUIsRUFBRTtBQUNqQixhQUFPLEVBQUUsTUFBTTtBQUNmLFVBQUksRUFBQSxjQUFDLE9BQU8sRUFBRTtBQUNaLGVBQU8sQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUE7T0FDakM7S0FDRjs7QUFFRCxnQkFBWSxFQUFFO0FBQ1osYUFBTyxFQUFFLE9BQU87QUFDaEIsVUFBSSxFQUFBLGNBQUMsSUFBWSxFQUFFO1lBQVosUUFBUSxHQUFWLElBQVksQ0FBVixRQUFROztBQUNiLGVBQU8sQ0FBQyxPQUFPLEVBQUUsU0FBUyxFQUFFLFFBQVEsQ0FBQyxDQUFBO09BQ3RDO0tBQ0Y7O0FBRUQsdUJBQW1CLEVBQUU7QUFDbkIsYUFBTyxFQUFFLE9BQU87QUFDaEIsVUFBSSxFQUFBLGNBQUMsT0FBTyxFQUFFO0FBQ1osZUFBTyxDQUFDLE9BQU8sRUFBRSxTQUFTLEVBQUUsT0FBTyxDQUFDLGFBQWEsRUFBRSxDQUFDLENBQUE7T0FDckQ7S0FDRjtHQUNGOztBQUVELE1BQUksRUFBRTtBQUNKLHFCQUFpQixFQUFFO0FBQ2pCLGFBQU8sRUFBRSxNQUFNO0FBQ2YsVUFBSSxFQUFBLGNBQUMsT0FBTyxFQUFFO0FBQ1osZUFBTyxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQTtPQUNqQztLQUNGOztBQUVELGdCQUFZLEVBQUU7QUFDWixhQUFPLEVBQUUsTUFBTTtBQUNmLFVBQUksRUFBQSxjQUFDLEtBQVksRUFBRTtZQUFaLFFBQVEsR0FBVixLQUFZLENBQVYsUUFBUTs7QUFDYixlQUFPLENBQUMsUUFBUSxDQUFDLENBQUE7T0FDbEI7S0FDRjtHQUNGOztBQUVELGlCQUFlLEVBQUU7QUFDZixxQkFBaUIsRUFBRTtBQUNqQixhQUFPLEVBQUUsT0FBTztBQUNoQixVQUFJLEVBQUEsY0FBQyxPQUFPLEVBQUU7QUFDWixlQUFPLENBQUMsUUFBUSxFQUFFLE9BQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFBO09BQ3JDO0tBQ0Y7O0FBRUQsZ0JBQVksRUFBRTtBQUNaLGFBQU8sRUFBRSxPQUFPO0FBQ2hCLFVBQUksRUFBQSxjQUFDLEtBQVksRUFBRTtZQUFaLFFBQVEsR0FBVixLQUFZLENBQVYsUUFBUTs7QUFDYixlQUFPLENBQUMsUUFBUSxFQUFFLFFBQVEsQ0FBQyxDQUFBO09BQzVCO0tBQ0Y7R0FDRjtDQUNGLENBQUE7cUJBQ2MsWUFBWSIsImZpbGUiOiJmaWxlOi8vL0M6L1VzZXJzL2Nrbmp1Ly5hdG9tL3BhY2thZ2VzL3NjcmlwdC9saWIvZ3JhbW1hcnMvcnVieS5qcyIsInNvdXJjZXNDb250ZW50IjpbIlwidXNlIGJhYmVsXCJcblxuY29uc3QgUnVieUdyYW1tYXJzID0ge1xuICBSU3BlYzoge1xuICAgIFwiU2VsZWN0aW9uIEJhc2VkXCI6IHtcbiAgICAgIGNvbW1hbmQ6IFwicnVieVwiLFxuICAgICAgYXJncyhjb250ZXh0KSB7XG4gICAgICAgIHJldHVybiBbXCItZVwiLCBjb250ZXh0LmdldENvZGUoKV1cbiAgICAgIH0sXG4gICAgfSxcblxuICAgIFwiRmlsZSBCYXNlZFwiOiB7XG4gICAgICBjb21tYW5kOiBcInJzcGVjXCIsXG4gICAgICBhcmdzKHsgZmlsZXBhdGggfSkge1xuICAgICAgICByZXR1cm4gW1wiLS10dHlcIiwgXCItLWNvbG9yXCIsIGZpbGVwYXRoXVxuICAgICAgfSxcbiAgICB9LFxuXG4gICAgXCJMaW5lIE51bWJlciBCYXNlZFwiOiB7XG4gICAgICBjb21tYW5kOiBcInJzcGVjXCIsXG4gICAgICBhcmdzKGNvbnRleHQpIHtcbiAgICAgICAgcmV0dXJuIFtcIi0tdHR5XCIsIFwiLS1jb2xvclwiLCBjb250ZXh0LmZpbGVDb2xvbkxpbmUoKV1cbiAgICAgIH0sXG4gICAgfSxcbiAgfSxcblxuICBSdWJ5OiB7XG4gICAgXCJTZWxlY3Rpb24gQmFzZWRcIjoge1xuICAgICAgY29tbWFuZDogXCJydWJ5XCIsXG4gICAgICBhcmdzKGNvbnRleHQpIHtcbiAgICAgICAgcmV0dXJuIFtcIi1lXCIsIGNvbnRleHQuZ2V0Q29kZSgpXVxuICAgICAgfSxcbiAgICB9LFxuXG4gICAgXCJGaWxlIEJhc2VkXCI6IHtcbiAgICAgIGNvbW1hbmQ6IFwicnVieVwiLFxuICAgICAgYXJncyh7IGZpbGVwYXRoIH0pIHtcbiAgICAgICAgcmV0dXJuIFtmaWxlcGF0aF1cbiAgICAgIH0sXG4gICAgfSxcbiAgfSxcblxuICBcIlJ1Ynkgb24gUmFpbHNcIjoge1xuICAgIFwiU2VsZWN0aW9uIEJhc2VkXCI6IHtcbiAgICAgIGNvbW1hbmQ6IFwicmFpbHNcIixcbiAgICAgIGFyZ3MoY29udGV4dCkge1xuICAgICAgICByZXR1cm4gW1wicnVubmVyXCIsIGNvbnRleHQuZ2V0Q29kZSgpXVxuICAgICAgfSxcbiAgICB9LFxuXG4gICAgXCJGaWxlIEJhc2VkXCI6IHtcbiAgICAgIGNvbW1hbmQ6IFwicmFpbHNcIixcbiAgICAgIGFyZ3MoeyBmaWxlcGF0aCB9KSB7XG4gICAgICAgIHJldHVybiBbXCJydW5uZXJcIiwgZmlsZXBhdGhdXG4gICAgICB9LFxuICAgIH0sXG4gIH0sXG59XG5leHBvcnQgZGVmYXVsdCBSdWJ5R3JhbW1hcnNcbiJdfQ==