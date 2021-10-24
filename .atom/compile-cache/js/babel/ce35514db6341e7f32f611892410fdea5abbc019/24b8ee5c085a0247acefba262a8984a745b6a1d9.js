Object.defineProperty(exports, "__esModule", {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _grammarUtils = require("../grammar-utils");

var _grammarUtils2 = _interopRequireDefault(_grammarUtils);

// https://github.com/atom-community/atom-script/issues/214#issuecomment-418766763
"use babel";

var encodingSet = false;
function setEncoding() {
  if (!encodingSet) {
    process.env.PYTHONIOENCODING = "utf-8";
    encodingSet = true;
  }
}

var Python = {
  "Selection Based": {
    command: "python",
    args: function args(context) {
      setEncoding();
      var code = context.getCode();
      var tmpFile = _grammarUtils2["default"].createTempFileWithCode(code);
      return ["-u", tmpFile];
    }
  },

  "File Based": {
    command: "python",
    args: function args(_ref) {
      var filepath = _ref.filepath;

      setEncoding();
      return ["-u", filepath];
    }
  }
};

exports.Python = Python;
var MagicPython = Python;

exports.MagicPython = MagicPython;
var Sage = {
  "Selection Based": {
    command: "sage",
    args: function args(context) {
      setEncoding();
      var code = context.getCode();
      var tmpFile = _grammarUtils2["default"].createTempFileWithCode(code);
      return [tmpFile];
    }
  },

  "File Based": {
    command: "sage",
    args: function args(_ref2) {
      var filepath = _ref2.filepath;

      setEncoding();
      return [filepath];
    }
  }
};
exports.Sage = Sage;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZpbGU6Ly8vQzovVXNlcnMvY2tuanUvLmF0b20vcGFja2FnZXMvc2NyaXB0L2xpYi9ncmFtbWFycy9weXRob24uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OzRCQUV5QixrQkFBa0I7Ozs7O0FBRjNDLFdBQVcsQ0FBQTs7QUFLWCxJQUFJLFdBQVcsR0FBRyxLQUFLLENBQUE7QUFDdkIsU0FBUyxXQUFXLEdBQUc7QUFDckIsTUFBSSxDQUFDLFdBQVcsRUFBRTtBQUNoQixXQUFPLENBQUMsR0FBRyxDQUFDLGdCQUFnQixHQUFHLE9BQU8sQ0FBQTtBQUN0QyxlQUFXLEdBQUcsSUFBSSxDQUFBO0dBQ25CO0NBQ0Y7O0FBRU0sSUFBTSxNQUFNLEdBQUc7QUFDcEIsbUJBQWlCLEVBQUU7QUFDakIsV0FBTyxFQUFFLFFBQVE7QUFDakIsUUFBSSxFQUFBLGNBQUMsT0FBTyxFQUFFO0FBQ1osaUJBQVcsRUFBRSxDQUFBO0FBQ2IsVUFBTSxJQUFJLEdBQUcsT0FBTyxDQUFDLE9BQU8sRUFBRSxDQUFBO0FBQzlCLFVBQU0sT0FBTyxHQUFHLDBCQUFhLHNCQUFzQixDQUFDLElBQUksQ0FBQyxDQUFBO0FBQ3pELGFBQU8sQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUE7S0FDdkI7R0FDRjs7QUFFRCxjQUFZLEVBQUU7QUFDWixXQUFPLEVBQUUsUUFBUTtBQUNqQixRQUFJLEVBQUEsY0FBQyxJQUFZLEVBQUU7VUFBWixRQUFRLEdBQVYsSUFBWSxDQUFWLFFBQVE7O0FBQ2IsaUJBQVcsRUFBRSxDQUFBO0FBQ2IsYUFBTyxDQUFDLElBQUksRUFBRSxRQUFRLENBQUMsQ0FBQTtLQUN4QjtHQUNGO0NBQ0YsQ0FBQTs7O0FBRU0sSUFBTSxXQUFXLEdBQUcsTUFBTSxDQUFBOzs7QUFFMUIsSUFBTSxJQUFJLEdBQUc7QUFDbEIsbUJBQWlCLEVBQUU7QUFDakIsV0FBTyxFQUFFLE1BQU07QUFDZixRQUFJLEVBQUEsY0FBQyxPQUFPLEVBQUU7QUFDWixpQkFBVyxFQUFFLENBQUE7QUFDYixVQUFNLElBQUksR0FBRyxPQUFPLENBQUMsT0FBTyxFQUFFLENBQUE7QUFDOUIsVUFBTSxPQUFPLEdBQUcsMEJBQWEsc0JBQXNCLENBQUMsSUFBSSxDQUFDLENBQUE7QUFDekQsYUFBTyxDQUFDLE9BQU8sQ0FBQyxDQUFBO0tBQ2pCO0dBQ0Y7O0FBRUQsY0FBWSxFQUFFO0FBQ1osV0FBTyxFQUFFLE1BQU07QUFDZixRQUFJLEVBQUEsY0FBQyxLQUFZLEVBQUU7VUFBWixRQUFRLEdBQVYsS0FBWSxDQUFWLFFBQVE7O0FBQ2IsaUJBQVcsRUFBRSxDQUFBO0FBQ2IsYUFBTyxDQUFDLFFBQVEsQ0FBQyxDQUFBO0tBQ2xCO0dBQ0Y7Q0FDRixDQUFBIiwiZmlsZSI6ImZpbGU6Ly8vQzovVXNlcnMvY2tuanUvLmF0b20vcGFja2FnZXMvc2NyaXB0L2xpYi9ncmFtbWFycy9weXRob24uanMiLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBiYWJlbFwiXG5cbmltcG9ydCBHcmFtbWFyVXRpbHMgZnJvbSBcIi4uL2dyYW1tYXItdXRpbHNcIlxuXG4vLyBodHRwczovL2dpdGh1Yi5jb20vYXRvbS1jb21tdW5pdHkvYXRvbS1zY3JpcHQvaXNzdWVzLzIxNCNpc3N1ZWNvbW1lbnQtNDE4NzY2NzYzXG5sZXQgZW5jb2RpbmdTZXQgPSBmYWxzZVxuZnVuY3Rpb24gc2V0RW5jb2RpbmcoKSB7XG4gIGlmICghZW5jb2RpbmdTZXQpIHtcbiAgICBwcm9jZXNzLmVudi5QWVRIT05JT0VOQ09ESU5HID0gXCJ1dGYtOFwiXG4gICAgZW5jb2RpbmdTZXQgPSB0cnVlXG4gIH1cbn1cblxuZXhwb3J0IGNvbnN0IFB5dGhvbiA9IHtcbiAgXCJTZWxlY3Rpb24gQmFzZWRcIjoge1xuICAgIGNvbW1hbmQ6IFwicHl0aG9uXCIsXG4gICAgYXJncyhjb250ZXh0KSB7XG4gICAgICBzZXRFbmNvZGluZygpXG4gICAgICBjb25zdCBjb2RlID0gY29udGV4dC5nZXRDb2RlKClcbiAgICAgIGNvbnN0IHRtcEZpbGUgPSBHcmFtbWFyVXRpbHMuY3JlYXRlVGVtcEZpbGVXaXRoQ29kZShjb2RlKVxuICAgICAgcmV0dXJuIFtcIi11XCIsIHRtcEZpbGVdXG4gICAgfSxcbiAgfSxcblxuICBcIkZpbGUgQmFzZWRcIjoge1xuICAgIGNvbW1hbmQ6IFwicHl0aG9uXCIsXG4gICAgYXJncyh7IGZpbGVwYXRoIH0pIHtcbiAgICAgIHNldEVuY29kaW5nKClcbiAgICAgIHJldHVybiBbXCItdVwiLCBmaWxlcGF0aF1cbiAgICB9LFxuICB9LFxufVxuXG5leHBvcnQgY29uc3QgTWFnaWNQeXRob24gPSBQeXRob25cblxuZXhwb3J0IGNvbnN0IFNhZ2UgPSB7XG4gIFwiU2VsZWN0aW9uIEJhc2VkXCI6IHtcbiAgICBjb21tYW5kOiBcInNhZ2VcIixcbiAgICBhcmdzKGNvbnRleHQpIHtcbiAgICAgIHNldEVuY29kaW5nKClcbiAgICAgIGNvbnN0IGNvZGUgPSBjb250ZXh0LmdldENvZGUoKVxuICAgICAgY29uc3QgdG1wRmlsZSA9IEdyYW1tYXJVdGlscy5jcmVhdGVUZW1wRmlsZVdpdGhDb2RlKGNvZGUpXG4gICAgICByZXR1cm4gW3RtcEZpbGVdXG4gICAgfSxcbiAgfSxcblxuICBcIkZpbGUgQmFzZWRcIjoge1xuICAgIGNvbW1hbmQ6IFwic2FnZVwiLFxuICAgIGFyZ3MoeyBmaWxlcGF0aCB9KSB7XG4gICAgICBzZXRFbmNvZGluZygpXG4gICAgICByZXR1cm4gW2ZpbGVwYXRoXVxuICAgIH0sXG4gIH0sXG59XG4iXX0=