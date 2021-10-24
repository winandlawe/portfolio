Object.defineProperty(exports, "__esModule", {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _grammarUtils = require("../grammar-utils");

var _grammarUtils2 = _interopRequireDefault(_grammarUtils);

"use babel";

var PerlGrammars = {
  "Behat Feature": {
    "File Based": {
      command: "behat",
      args: function args(_ref) {
        var filepath = _ref.filepath;

        return [filepath];
      }
    },

    "Line Number Based": {
      command: "behat",
      args: function args(context) {
        return [context.fileColonLine()];
      }
    }
  },

  PHP: {
    "Selection Based": {
      command: "php",
      args: function args(context) {
        var code = context.getCode();
        var tmpFile = _grammarUtils2["default"].PHP.createTempFileWithCode(code);
        return [tmpFile];
      }
    },

    "File Based": {
      command: "php",
      args: function args(_ref2) {
        var filepath = _ref2.filepath;

        return [filepath];
      }
    }
  }
};
exports["default"] = PerlGrammars;
module.exports = exports["default"];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZpbGU6Ly8vQzovVXNlcnMvY2tuanUvLmF0b20vcGFja2FnZXMvc2NyaXB0L2xpYi9ncmFtbWFycy9waHAuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OzRCQUV5QixrQkFBa0I7Ozs7QUFGM0MsV0FBVyxDQUFBOztBQUlYLElBQU0sWUFBWSxHQUFHO0FBQ25CLGlCQUFlLEVBQUU7QUFDZixnQkFBWSxFQUFFO0FBQ1osYUFBTyxFQUFFLE9BQU87QUFDaEIsVUFBSSxFQUFBLGNBQUMsSUFBWSxFQUFFO1lBQVosUUFBUSxHQUFWLElBQVksQ0FBVixRQUFROztBQUNiLGVBQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQTtPQUNsQjtLQUNGOztBQUVELHVCQUFtQixFQUFFO0FBQ25CLGFBQU8sRUFBRSxPQUFPO0FBQ2hCLFVBQUksRUFBQSxjQUFDLE9BQU8sRUFBRTtBQUNaLGVBQU8sQ0FBQyxPQUFPLENBQUMsYUFBYSxFQUFFLENBQUMsQ0FBQTtPQUNqQztLQUNGO0dBQ0Y7O0FBRUQsS0FBRyxFQUFFO0FBQ0gscUJBQWlCLEVBQUU7QUFDakIsYUFBTyxFQUFFLEtBQUs7QUFDZCxVQUFJLEVBQUEsY0FBQyxPQUFPLEVBQUU7QUFDWixZQUFNLElBQUksR0FBRyxPQUFPLENBQUMsT0FBTyxFQUFFLENBQUE7QUFDOUIsWUFBTSxPQUFPLEdBQUcsMEJBQWEsR0FBRyxDQUFDLHNCQUFzQixDQUFDLElBQUksQ0FBQyxDQUFBO0FBQzdELGVBQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQTtPQUNqQjtLQUNGOztBQUVELGdCQUFZLEVBQUU7QUFDWixhQUFPLEVBQUUsS0FBSztBQUNkLFVBQUksRUFBQSxjQUFDLEtBQVksRUFBRTtZQUFaLFFBQVEsR0FBVixLQUFZLENBQVYsUUFBUTs7QUFDYixlQUFPLENBQUMsUUFBUSxDQUFDLENBQUE7T0FDbEI7S0FDRjtHQUNGO0NBQ0YsQ0FBQTtxQkFDYyxZQUFZIiwiZmlsZSI6ImZpbGU6Ly8vQzovVXNlcnMvY2tuanUvLmF0b20vcGFja2FnZXMvc2NyaXB0L2xpYi9ncmFtbWFycy9waHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBiYWJlbFwiXG5cbmltcG9ydCBHcmFtbWFyVXRpbHMgZnJvbSBcIi4uL2dyYW1tYXItdXRpbHNcIlxuXG5jb25zdCBQZXJsR3JhbW1hcnMgPSB7XG4gIFwiQmVoYXQgRmVhdHVyZVwiOiB7XG4gICAgXCJGaWxlIEJhc2VkXCI6IHtcbiAgICAgIGNvbW1hbmQ6IFwiYmVoYXRcIixcbiAgICAgIGFyZ3MoeyBmaWxlcGF0aCB9KSB7XG4gICAgICAgIHJldHVybiBbZmlsZXBhdGhdXG4gICAgICB9LFxuICAgIH0sXG5cbiAgICBcIkxpbmUgTnVtYmVyIEJhc2VkXCI6IHtcbiAgICAgIGNvbW1hbmQ6IFwiYmVoYXRcIixcbiAgICAgIGFyZ3MoY29udGV4dCkge1xuICAgICAgICByZXR1cm4gW2NvbnRleHQuZmlsZUNvbG9uTGluZSgpXVxuICAgICAgfSxcbiAgICB9LFxuICB9LFxuXG4gIFBIUDoge1xuICAgIFwiU2VsZWN0aW9uIEJhc2VkXCI6IHtcbiAgICAgIGNvbW1hbmQ6IFwicGhwXCIsXG4gICAgICBhcmdzKGNvbnRleHQpIHtcbiAgICAgICAgY29uc3QgY29kZSA9IGNvbnRleHQuZ2V0Q29kZSgpXG4gICAgICAgIGNvbnN0IHRtcEZpbGUgPSBHcmFtbWFyVXRpbHMuUEhQLmNyZWF0ZVRlbXBGaWxlV2l0aENvZGUoY29kZSlcbiAgICAgICAgcmV0dXJuIFt0bXBGaWxlXVxuICAgICAgfSxcbiAgICB9LFxuXG4gICAgXCJGaWxlIEJhc2VkXCI6IHtcbiAgICAgIGNvbW1hbmQ6IFwicGhwXCIsXG4gICAgICBhcmdzKHsgZmlsZXBhdGggfSkge1xuICAgICAgICByZXR1cm4gW2ZpbGVwYXRoXVxuICAgICAgfSxcbiAgICB9LFxuICB9LFxufVxuZXhwb3J0IGRlZmF1bHQgUGVybEdyYW1tYXJzXG4iXX0=