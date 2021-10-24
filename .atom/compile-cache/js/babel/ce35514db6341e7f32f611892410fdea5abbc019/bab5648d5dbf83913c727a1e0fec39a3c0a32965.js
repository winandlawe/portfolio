Object.defineProperty(exports, "__esModule", {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _grammarUtils = require("../grammar-utils");

var _grammarUtils2 = _interopRequireDefault(_grammarUtils);

"use babel";

var Lua = {
  "Selection Based": {
    command: "lua",
    args: function args(context) {
      var code = context.getCode();
      var tmpFile = _grammarUtils2["default"].createTempFileWithCode(code);
      return [tmpFile];
    }
  },

  "File Based": {
    command: "lua",
    args: function args(_ref) {
      var filepath = _ref.filepath;

      return [filepath];
    }
  }
};

var WOW = Lua;

var MoonScript = {
  "Selection Based": {
    command: "moon",
    args: function args(context) {
      return ["-e", context.getCode()];
    }
  },

  "File Based": {
    command: "moon",
    args: function args(_ref2) {
      var filepath = _ref2.filepath;

      return [filepath];
    }
  }
};

var LuaGrammars = {
  Lua: Lua,
  "Lua (WoW)": WOW,
  MoonScript: MoonScript
};
exports["default"] = LuaGrammars;
module.exports = exports["default"];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZpbGU6Ly8vQzovVXNlcnMvY2tuanUvLmF0b20vcGFja2FnZXMvc2NyaXB0L2xpYi9ncmFtbWFycy9sdWEuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OzRCQUV5QixrQkFBa0I7Ozs7QUFGM0MsV0FBVyxDQUFBOztBQUlYLElBQU0sR0FBRyxHQUFHO0FBQ1YsbUJBQWlCLEVBQUU7QUFDakIsV0FBTyxFQUFFLEtBQUs7QUFDZCxRQUFJLEVBQUEsY0FBQyxPQUFPLEVBQUU7QUFDWixVQUFNLElBQUksR0FBRyxPQUFPLENBQUMsT0FBTyxFQUFFLENBQUE7QUFDOUIsVUFBTSxPQUFPLEdBQUcsMEJBQWEsc0JBQXNCLENBQUMsSUFBSSxDQUFDLENBQUE7QUFDekQsYUFBTyxDQUFDLE9BQU8sQ0FBQyxDQUFBO0tBQ2pCO0dBQ0Y7O0FBRUQsY0FBWSxFQUFFO0FBQ1osV0FBTyxFQUFFLEtBQUs7QUFDZCxRQUFJLEVBQUEsY0FBQyxJQUFZLEVBQUU7VUFBWixRQUFRLEdBQVYsSUFBWSxDQUFWLFFBQVE7O0FBQ2IsYUFBTyxDQUFDLFFBQVEsQ0FBQyxDQUFBO0tBQ2xCO0dBQ0Y7Q0FDRixDQUFBOztBQUVELElBQU0sR0FBRyxHQUFHLEdBQUcsQ0FBQTs7QUFFZixJQUFNLFVBQVUsR0FBRztBQUNqQixtQkFBaUIsRUFBRTtBQUNqQixXQUFPLEVBQUUsTUFBTTtBQUNmLFFBQUksRUFBQSxjQUFDLE9BQU8sRUFBRTtBQUNaLGFBQU8sQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUE7S0FDakM7R0FDRjs7QUFFRCxjQUFZLEVBQUU7QUFDWixXQUFPLEVBQUUsTUFBTTtBQUNmLFFBQUksRUFBQSxjQUFDLEtBQVksRUFBRTtVQUFaLFFBQVEsR0FBVixLQUFZLENBQVYsUUFBUTs7QUFDYixhQUFPLENBQUMsUUFBUSxDQUFDLENBQUE7S0FDbEI7R0FDRjtDQUNGLENBQUE7O0FBRUQsSUFBTSxXQUFXLEdBQUc7QUFDbEIsS0FBRyxFQUFILEdBQUc7QUFDSCxhQUFXLEVBQUUsR0FBRztBQUNoQixZQUFVLEVBQVYsVUFBVTtDQUNYLENBQUE7cUJBQ2MsV0FBVyIsImZpbGUiOiJmaWxlOi8vL0M6L1VzZXJzL2Nrbmp1Ly5hdG9tL3BhY2thZ2VzL3NjcmlwdC9saWIvZ3JhbW1hcnMvbHVhLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2UgYmFiZWxcIlxuXG5pbXBvcnQgR3JhbW1hclV0aWxzIGZyb20gXCIuLi9ncmFtbWFyLXV0aWxzXCJcblxuY29uc3QgTHVhID0ge1xuICBcIlNlbGVjdGlvbiBCYXNlZFwiOiB7XG4gICAgY29tbWFuZDogXCJsdWFcIixcbiAgICBhcmdzKGNvbnRleHQpIHtcbiAgICAgIGNvbnN0IGNvZGUgPSBjb250ZXh0LmdldENvZGUoKVxuICAgICAgY29uc3QgdG1wRmlsZSA9IEdyYW1tYXJVdGlscy5jcmVhdGVUZW1wRmlsZVdpdGhDb2RlKGNvZGUpXG4gICAgICByZXR1cm4gW3RtcEZpbGVdXG4gICAgfSxcbiAgfSxcblxuICBcIkZpbGUgQmFzZWRcIjoge1xuICAgIGNvbW1hbmQ6IFwibHVhXCIsXG4gICAgYXJncyh7IGZpbGVwYXRoIH0pIHtcbiAgICAgIHJldHVybiBbZmlsZXBhdGhdXG4gICAgfSxcbiAgfSxcbn1cblxuY29uc3QgV09XID0gTHVhXG5cbmNvbnN0IE1vb25TY3JpcHQgPSB7XG4gIFwiU2VsZWN0aW9uIEJhc2VkXCI6IHtcbiAgICBjb21tYW5kOiBcIm1vb25cIixcbiAgICBhcmdzKGNvbnRleHQpIHtcbiAgICAgIHJldHVybiBbXCItZVwiLCBjb250ZXh0LmdldENvZGUoKV1cbiAgICB9LFxuICB9LFxuXG4gIFwiRmlsZSBCYXNlZFwiOiB7XG4gICAgY29tbWFuZDogXCJtb29uXCIsXG4gICAgYXJncyh7IGZpbGVwYXRoIH0pIHtcbiAgICAgIHJldHVybiBbZmlsZXBhdGhdXG4gICAgfSxcbiAgfSxcbn1cblxuY29uc3QgTHVhR3JhbW1hcnMgPSB7XG4gIEx1YSxcbiAgXCJMdWEgKFdvVylcIjogV09XLFxuICBNb29uU2NyaXB0LFxufVxuZXhwb3J0IGRlZmF1bHQgTHVhR3JhbW1hcnNcbiJdfQ==