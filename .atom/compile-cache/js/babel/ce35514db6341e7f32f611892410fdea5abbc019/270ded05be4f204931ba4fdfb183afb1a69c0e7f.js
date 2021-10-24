"use babel";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var AppleScript = {
  "Selection Based": {
    command: "osascript",
    args: function args(context) {
      return ["-e", context.getCode()];
    }
  },

  "File Based": {
    command: "osascript",
    args: function args(_ref) {
      var filepath = _ref.filepath;

      return [filepath];
    }
  }
};

exports.AppleScript = AppleScript;
var Swift = {
  "File Based": {
    command: "swift",
    args: function args(_ref2) {
      var filepath = _ref2.filepath;

      return [filepath];
    }
  }
};
exports.Swift = Swift;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZpbGU6Ly8vQzovVXNlcnMvY2tuanUvLmF0b20vcGFja2FnZXMvc2NyaXB0L2xpYi9ncmFtbWFycy9hcHBsZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxXQUFXLENBQUE7Ozs7O0FBRUosSUFBTSxXQUFXLEdBQUc7QUFDekIsbUJBQWlCLEVBQUU7QUFDakIsV0FBTyxFQUFFLFdBQVc7QUFDcEIsUUFBSSxFQUFBLGNBQUMsT0FBTyxFQUFFO0FBQ1osYUFBTyxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQTtLQUNqQztHQUNGOztBQUVELGNBQVksRUFBRTtBQUNaLFdBQU8sRUFBRSxXQUFXO0FBQ3BCLFFBQUksRUFBQSxjQUFDLElBQVksRUFBRTtVQUFaLFFBQVEsR0FBVixJQUFZLENBQVYsUUFBUTs7QUFDYixhQUFPLENBQUMsUUFBUSxDQUFDLENBQUE7S0FDbEI7R0FDRjtDQUNGLENBQUE7OztBQUVNLElBQU0sS0FBSyxHQUFHO0FBQ25CLGNBQVksRUFBRTtBQUNaLFdBQU8sRUFBRSxPQUFPO0FBQ2hCLFFBQUksRUFBQSxjQUFDLEtBQVksRUFBRTtVQUFaLFFBQVEsR0FBVixLQUFZLENBQVYsUUFBUTs7QUFDYixhQUFPLENBQUMsUUFBUSxDQUFDLENBQUE7S0FDbEI7R0FDRjtDQUNGLENBQUEiLCJmaWxlIjoiZmlsZTovLy9DOi9Vc2Vycy9ja25qdS8uYXRvbS9wYWNrYWdlcy9zY3JpcHQvbGliL2dyYW1tYXJzL2FwcGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2UgYmFiZWxcIlxuXG5leHBvcnQgY29uc3QgQXBwbGVTY3JpcHQgPSB7XG4gIFwiU2VsZWN0aW9uIEJhc2VkXCI6IHtcbiAgICBjb21tYW5kOiBcIm9zYXNjcmlwdFwiLFxuICAgIGFyZ3MoY29udGV4dCkge1xuICAgICAgcmV0dXJuIFtcIi1lXCIsIGNvbnRleHQuZ2V0Q29kZSgpXVxuICAgIH0sXG4gIH0sXG5cbiAgXCJGaWxlIEJhc2VkXCI6IHtcbiAgICBjb21tYW5kOiBcIm9zYXNjcmlwdFwiLFxuICAgIGFyZ3MoeyBmaWxlcGF0aCB9KSB7XG4gICAgICByZXR1cm4gW2ZpbGVwYXRoXVxuICAgIH0sXG4gIH0sXG59XG5cbmV4cG9ydCBjb25zdCBTd2lmdCA9IHtcbiAgXCJGaWxlIEJhc2VkXCI6IHtcbiAgICBjb21tYW5kOiBcInN3aWZ0XCIsXG4gICAgYXJncyh7IGZpbGVwYXRoIH0pIHtcbiAgICAgIHJldHVybiBbZmlsZXBhdGhdXG4gICAgfSxcbiAgfSxcbn1cbiJdfQ==