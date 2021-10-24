Object.defineProperty(exports, "__esModule", {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _grammarUtils = require("../grammar-utils");

var _grammarUtils2 = _interopRequireDefault(_grammarUtils);

//if GrammarUtils.OperatingSystem.isWindows()

"use babel";

var AutoHotKey = {
  "Selection Based": {
    command: "AutoHotKey",
    args: function args(context) {
      var code = context.getCode();
      var tmpFile = _grammarUtils2["default"].createTempFileWithCode(code);
      return [tmpFile];
    }
  },

  "File Based": {
    command: "AutoHotKey",
    args: function args(_ref) {
      var filepath = _ref.filepath;

      return [filepath];
    }
  }
};

var Batch = {
  "File Based": {
    command: "cmd.exe",
    args: function args(_ref2) {
      var filepath = _ref2.filepath;

      return ["/q", "/c", filepath];
    }
  }
};

var BatchFile = Batch;

var PowerShell = {
  "Selection Based": {
    command: "powershell",
    args: function args(context) {
      return [context.getCode()];
    }
  },

  "File Based": {
    command: "powershell",
    args: function args(_ref3) {
      var filepath = _ref3.filepath;

      return [filepath.replace(/ /g, "` ")];
    }
  }
};

var VBScript = {
  "Selection Based": {
    command: "cscript",
    args: function args(context) {
      var code = context.getCode();
      var tmpFile = _grammarUtils2["default"].createTempFileWithCode(code, ".vbs");
      return ["//NOLOGO", tmpFile];
    }
  },

  "File Based": {
    command: "cscript",
    args: function args(_ref4) {
      var filepath = _ref4.filepath;

      return ["//NOLOGO", filepath];
    }
  }
};

var WindowsGrammars = {
  AutoHotKey: AutoHotKey,
  Batch: Batch,
  "Batch File": BatchFile,
  PowerShell: PowerShell,
  VBScript: VBScript
};
exports["default"] = WindowsGrammars;
module.exports = exports["default"];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZpbGU6Ly8vQzovVXNlcnMvY2tuanUvLmF0b20vcGFja2FnZXMvc2NyaXB0L2xpYi9ncmFtbWFycy93aW5kb3dzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs0QkFFeUIsa0JBQWtCOzs7Ozs7QUFGM0MsV0FBVyxDQUFBOztBQU1YLElBQU0sVUFBVSxHQUFHO0FBQ2pCLG1CQUFpQixFQUFFO0FBQ2pCLFdBQU8sRUFBRSxZQUFZO0FBQ3JCLFFBQUksRUFBQSxjQUFDLE9BQU8sRUFBRTtBQUNaLFVBQU0sSUFBSSxHQUFHLE9BQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQTtBQUM5QixVQUFNLE9BQU8sR0FBRywwQkFBYSxzQkFBc0IsQ0FBQyxJQUFJLENBQUMsQ0FBQTtBQUN6RCxhQUFPLENBQUMsT0FBTyxDQUFDLENBQUE7S0FDakI7R0FDRjs7QUFFRCxjQUFZLEVBQUU7QUFDWixXQUFPLEVBQUUsWUFBWTtBQUNyQixRQUFJLEVBQUEsY0FBQyxJQUFZLEVBQUU7VUFBWixRQUFRLEdBQVYsSUFBWSxDQUFWLFFBQVE7O0FBQ2IsYUFBTyxDQUFDLFFBQVEsQ0FBQyxDQUFBO0tBQ2xCO0dBQ0Y7Q0FDRixDQUFBOztBQUVELElBQU0sS0FBSyxHQUFHO0FBQ1osY0FBWSxFQUFFO0FBQ1osV0FBTyxFQUFFLFNBQVM7QUFDbEIsUUFBSSxFQUFBLGNBQUMsS0FBWSxFQUFFO1VBQVosUUFBUSxHQUFWLEtBQVksQ0FBVixRQUFROztBQUNiLGFBQU8sQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLFFBQVEsQ0FBQyxDQUFBO0tBQzlCO0dBQ0Y7Q0FDRixDQUFBOztBQUVELElBQU0sU0FBUyxHQUFHLEtBQUssQ0FBQTs7QUFFdkIsSUFBTSxVQUFVLEdBQUc7QUFDakIsbUJBQWlCLEVBQUU7QUFDakIsV0FBTyxFQUFFLFlBQVk7QUFDckIsUUFBSSxFQUFBLGNBQUMsT0FBTyxFQUFFO0FBQ1osYUFBTyxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFBO0tBQzNCO0dBQ0Y7O0FBRUQsY0FBWSxFQUFFO0FBQ1osV0FBTyxFQUFFLFlBQVk7QUFDckIsUUFBSSxFQUFBLGNBQUMsS0FBWSxFQUFFO1VBQVosUUFBUSxHQUFWLEtBQVksQ0FBVixRQUFROztBQUNiLGFBQU8sQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFBO0tBQ3RDO0dBQ0Y7Q0FDRixDQUFBOztBQUVELElBQU0sUUFBUSxHQUFHO0FBQ2YsbUJBQWlCLEVBQUU7QUFDakIsV0FBTyxFQUFFLFNBQVM7QUFDbEIsUUFBSSxFQUFBLGNBQUMsT0FBTyxFQUFFO0FBQ1osVUFBTSxJQUFJLEdBQUcsT0FBTyxDQUFDLE9BQU8sRUFBRSxDQUFBO0FBQzlCLFVBQU0sT0FBTyxHQUFHLDBCQUFhLHNCQUFzQixDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQTtBQUNqRSxhQUFPLENBQUMsVUFBVSxFQUFFLE9BQU8sQ0FBQyxDQUFBO0tBQzdCO0dBQ0Y7O0FBRUQsY0FBWSxFQUFFO0FBQ1osV0FBTyxFQUFFLFNBQVM7QUFDbEIsUUFBSSxFQUFBLGNBQUMsS0FBWSxFQUFFO1VBQVosUUFBUSxHQUFWLEtBQVksQ0FBVixRQUFROztBQUNiLGFBQU8sQ0FBQyxVQUFVLEVBQUUsUUFBUSxDQUFDLENBQUE7S0FDOUI7R0FDRjtDQUNGLENBQUE7O0FBRUQsSUFBTSxlQUFlLEdBQUc7QUFDdEIsWUFBVSxFQUFWLFVBQVU7QUFDVixPQUFLLEVBQUwsS0FBSztBQUNMLGNBQVksRUFBRSxTQUFTO0FBQ3ZCLFlBQVUsRUFBVixVQUFVO0FBQ1YsVUFBUSxFQUFSLFFBQVE7Q0FDVCxDQUFBO3FCQUNjLGVBQWUiLCJmaWxlIjoiZmlsZTovLy9DOi9Vc2Vycy9ja25qdS8uYXRvbS9wYWNrYWdlcy9zY3JpcHQvbGliL2dyYW1tYXJzL3dpbmRvd3MuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBiYWJlbFwiXG5cbmltcG9ydCBHcmFtbWFyVXRpbHMgZnJvbSBcIi4uL2dyYW1tYXItdXRpbHNcIlxuXG4vL2lmIEdyYW1tYXJVdGlscy5PcGVyYXRpbmdTeXN0ZW0uaXNXaW5kb3dzKClcblxuY29uc3QgQXV0b0hvdEtleSA9IHtcbiAgXCJTZWxlY3Rpb24gQmFzZWRcIjoge1xuICAgIGNvbW1hbmQ6IFwiQXV0b0hvdEtleVwiLFxuICAgIGFyZ3MoY29udGV4dCkge1xuICAgICAgY29uc3QgY29kZSA9IGNvbnRleHQuZ2V0Q29kZSgpXG4gICAgICBjb25zdCB0bXBGaWxlID0gR3JhbW1hclV0aWxzLmNyZWF0ZVRlbXBGaWxlV2l0aENvZGUoY29kZSlcbiAgICAgIHJldHVybiBbdG1wRmlsZV1cbiAgICB9LFxuICB9LFxuXG4gIFwiRmlsZSBCYXNlZFwiOiB7XG4gICAgY29tbWFuZDogXCJBdXRvSG90S2V5XCIsXG4gICAgYXJncyh7IGZpbGVwYXRoIH0pIHtcbiAgICAgIHJldHVybiBbZmlsZXBhdGhdXG4gICAgfSxcbiAgfSxcbn1cblxuY29uc3QgQmF0Y2ggPSB7XG4gIFwiRmlsZSBCYXNlZFwiOiB7XG4gICAgY29tbWFuZDogXCJjbWQuZXhlXCIsXG4gICAgYXJncyh7IGZpbGVwYXRoIH0pIHtcbiAgICAgIHJldHVybiBbXCIvcVwiLCBcIi9jXCIsIGZpbGVwYXRoXVxuICAgIH0sXG4gIH0sXG59XG5cbmNvbnN0IEJhdGNoRmlsZSA9IEJhdGNoXG5cbmNvbnN0IFBvd2VyU2hlbGwgPSB7XG4gIFwiU2VsZWN0aW9uIEJhc2VkXCI6IHtcbiAgICBjb21tYW5kOiBcInBvd2Vyc2hlbGxcIixcbiAgICBhcmdzKGNvbnRleHQpIHtcbiAgICAgIHJldHVybiBbY29udGV4dC5nZXRDb2RlKCldXG4gICAgfSxcbiAgfSxcblxuICBcIkZpbGUgQmFzZWRcIjoge1xuICAgIGNvbW1hbmQ6IFwicG93ZXJzaGVsbFwiLFxuICAgIGFyZ3MoeyBmaWxlcGF0aCB9KSB7XG4gICAgICByZXR1cm4gW2ZpbGVwYXRoLnJlcGxhY2UoLyAvZywgXCJgIFwiKV1cbiAgICB9LFxuICB9LFxufVxuXG5jb25zdCBWQlNjcmlwdCA9IHtcbiAgXCJTZWxlY3Rpb24gQmFzZWRcIjoge1xuICAgIGNvbW1hbmQ6IFwiY3NjcmlwdFwiLFxuICAgIGFyZ3MoY29udGV4dCkge1xuICAgICAgY29uc3QgY29kZSA9IGNvbnRleHQuZ2V0Q29kZSgpXG4gICAgICBjb25zdCB0bXBGaWxlID0gR3JhbW1hclV0aWxzLmNyZWF0ZVRlbXBGaWxlV2l0aENvZGUoY29kZSwgXCIudmJzXCIpXG4gICAgICByZXR1cm4gW1wiLy9OT0xPR09cIiwgdG1wRmlsZV1cbiAgICB9LFxuICB9LFxuXG4gIFwiRmlsZSBCYXNlZFwiOiB7XG4gICAgY29tbWFuZDogXCJjc2NyaXB0XCIsXG4gICAgYXJncyh7IGZpbGVwYXRoIH0pIHtcbiAgICAgIHJldHVybiBbXCIvL05PTE9HT1wiLCBmaWxlcGF0aF1cbiAgICB9LFxuICB9LFxufVxuXG5jb25zdCBXaW5kb3dzR3JhbW1hcnMgPSB7XG4gIEF1dG9Ib3RLZXksXG4gIEJhdGNoLFxuICBcIkJhdGNoIEZpbGVcIjogQmF0Y2hGaWxlLFxuICBQb3dlclNoZWxsLFxuICBWQlNjcmlwdCxcbn1cbmV4cG9ydCBkZWZhdWx0IFdpbmRvd3NHcmFtbWFyc1xuIl19