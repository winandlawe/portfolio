Object.defineProperty(exports, "__esModule", {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } }

var _path = require("path");

var path = _interopRequireWildcard(_path);

var _grammarUtils = require("../grammar-utils");

var _grammarUtils2 = _interopRequireDefault(_grammarUtils);

"use babel";

var command = _grammarUtils2["default"].command;

var bin = path.join(__dirname, "../..", "node_modules", ".bin");
var coffee = path.join(bin, "coffee");
var babel = path.join(__dirname, "../..", "node_modules", ".bin", _grammarUtils2["default"].OperatingSystem.isWindows() ? "babel-node.cmd" : "babel-node");
var babelConfig = path.join(__dirname, "babel.config.js");

var rimraf = path.join(__dirname, "../..", "node_modules", ".bin", _grammarUtils2["default"].OperatingSystem.isWindows() ? "rimraf.cmd" : "rimraf");

function coffeeArgs(_ref) {
  var filepath = _ref.filepath;

  var filePathOutput = filepath;
  var extension = filepath.substring(filepath.indexOf(".") + 1);
  filePathOutput = filePathOutput.replace(extension, "js");
  var cmd = "'" + coffee + "' --compile '" + filepath + "' && " + babel + " " + filePathOutput + " --config-file " + babelConfig + "' && " + rimraf + " " + filePathOutput;
  return _grammarUtils2["default"].formatArgs(cmd);
}

var CoffeeScript = {
  "Selection Based": {
    command: command,
    args: function args(context) {
      var editor = atom.workspace.getActiveTextEditor();
      var scopeName = editor ? editor.getGrammar().scopeName : null;
      var isLiterate = scopeName !== null && scopeName.includes("lit");
      var lit = isLiterate ? "lit" : "";
      var code = context.getCode();
      var filepath = _grammarUtils2["default"].createTempFileWithCode(code, "." + lit + "coffee");
      return coffeeArgs({ filepath: filepath, isLiterate: isLiterate });
    }
  },
  "File Based": { command: command, args: coffeeArgs }
};

var CoffeeScriptLiterate = CoffeeScript;

var IcedCoffeeScript = {
  "Selection Based": {
    command: "iced",
    args: function args(context) {
      return ["-e", context.getCode()];
    }
  },

  "File Based": {
    command: "iced",
    args: function args(_ref2) {
      var filepath = _ref2.filepath;

      return [filepath];
    }
  }
};

var CoffeeScriptGrammars = {
  CoffeeScript: CoffeeScript,
  "CoffeeScript (Literate)": CoffeeScriptLiterate,
  IcedCoffeeScript: IcedCoffeeScript,
  "Iced CoffeeScript": IcedCoffeeScript
};
exports["default"] = CoffeeScriptGrammars;
module.exports = exports["default"];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZpbGU6Ly8vQzovVXNlcnMvY2tuanUvLmF0b20vcGFja2FnZXMvc2NyaXB0L2xpYi9ncmFtbWFycy9jb2ZmZWVzY3JpcHQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7b0JBRXNCLE1BQU07O0lBQWhCLElBQUk7OzRCQUNTLGtCQUFrQjs7OztBQUgzQyxXQUFXLENBQUE7O0lBSUgsT0FBTyw2QkFBUCxPQUFPOztBQUVmLElBQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxDQUFDLENBQUE7QUFDakUsSUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsUUFBUSxDQUFDLENBQUE7QUFDdkMsSUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FDckIsU0FBUyxFQUNULE9BQU8sRUFDUCxjQUFjLEVBQ2QsTUFBTSxFQUNOLDBCQUFhLGVBQWUsQ0FBQyxTQUFTLEVBQUUsR0FBRyxnQkFBZ0IsR0FBRyxZQUFZLENBQzNFLENBQUE7QUFDRCxJQUFNLFdBQVcsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxpQkFBaUIsQ0FBQyxDQUFBOztBQUUzRCxJQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUN0QixTQUFTLEVBQ1QsT0FBTyxFQUNQLGNBQWMsRUFDZCxNQUFNLEVBQ04sMEJBQWEsZUFBZSxDQUFDLFNBQVMsRUFBRSxHQUFHLFlBQVksR0FBRyxRQUFRLENBQ25FLENBQUE7O0FBRUQsU0FBUyxVQUFVLENBQUMsSUFBWSxFQUFFO01BQVosUUFBUSxHQUFWLElBQVksQ0FBVixRQUFROztBQUM1QixNQUFJLGNBQWMsR0FBRyxRQUFRLENBQUE7QUFDN0IsTUFBTSxTQUFTLEdBQUcsUUFBUSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFBO0FBQy9ELGdCQUFjLEdBQUcsY0FBYyxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLENBQUE7QUFDeEQsTUFBTSxHQUFHLFNBQU8sTUFBTSxxQkFBZ0IsUUFBUSxhQUFRLEtBQUssU0FBSSxjQUFjLHVCQUFrQixXQUFXLGFBQVEsTUFBTSxTQUFJLGNBQWMsQUFBRSxDQUFBO0FBQzVJLFNBQU8sMEJBQWEsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFBO0NBQ3BDOztBQUVELElBQU0sWUFBWSxHQUFHO0FBQ25CLG1CQUFpQixFQUFFO0FBQ2pCLFdBQU8sRUFBUCxPQUFPO0FBQ1AsUUFBSSxFQUFBLGNBQUMsT0FBTyxFQUFFO0FBQ1osVUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxtQkFBbUIsRUFBRSxDQUFBO0FBQ25ELFVBQU0sU0FBUyxHQUFHLE1BQU0sR0FBRyxNQUFNLENBQUMsVUFBVSxFQUFFLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQTtBQUMvRCxVQUFNLFVBQVUsR0FBRyxTQUFTLEtBQUssSUFBSSxJQUFJLFNBQVMsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUE7QUFDbEUsVUFBTSxHQUFHLEdBQUcsVUFBVSxHQUFHLEtBQUssR0FBRyxFQUFFLENBQUE7QUFDbkMsVUFBTSxJQUFJLEdBQUcsT0FBTyxDQUFDLE9BQU8sRUFBRSxDQUFBO0FBQzlCLFVBQU0sUUFBUSxHQUFHLDBCQUFhLHNCQUFzQixDQUFDLElBQUksUUFBTSxHQUFHLFlBQVMsQ0FBQTtBQUMzRSxhQUFPLFVBQVUsQ0FBQyxFQUFFLFFBQVEsRUFBUixRQUFRLEVBQUUsVUFBVSxFQUFWLFVBQVUsRUFBRSxDQUFDLENBQUE7S0FDNUM7R0FDRjtBQUNELGNBQVksRUFBRSxFQUFFLE9BQU8sRUFBUCxPQUFPLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRTtDQUM1QyxDQUFBOztBQUVELElBQU0sb0JBQW9CLEdBQUcsWUFBWSxDQUFBOztBQUV6QyxJQUFNLGdCQUFnQixHQUFHO0FBQ3ZCLG1CQUFpQixFQUFFO0FBQ2pCLFdBQU8sRUFBRSxNQUFNO0FBQ2YsUUFBSSxFQUFBLGNBQUMsT0FBTyxFQUFFO0FBQ1osYUFBTyxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQTtLQUNqQztHQUNGOztBQUVELGNBQVksRUFBRTtBQUNaLFdBQU8sRUFBRSxNQUFNO0FBQ2YsUUFBSSxFQUFBLGNBQUMsS0FBWSxFQUFFO1VBQVosUUFBUSxHQUFWLEtBQVksQ0FBVixRQUFROztBQUNiLGFBQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQTtLQUNsQjtHQUNGO0NBQ0YsQ0FBQTs7QUFFRCxJQUFNLG9CQUFvQixHQUFHO0FBQzNCLGNBQVksRUFBWixZQUFZO0FBQ1osMkJBQXlCLEVBQUUsb0JBQW9CO0FBQy9DLGtCQUFnQixFQUFoQixnQkFBZ0I7QUFDaEIscUJBQW1CLEVBQUUsZ0JBQWdCO0NBQ3RDLENBQUE7cUJBQ2Msb0JBQW9CIiwiZmlsZSI6ImZpbGU6Ly8vQzovVXNlcnMvY2tuanUvLmF0b20vcGFja2FnZXMvc2NyaXB0L2xpYi9ncmFtbWFycy9jb2ZmZWVzY3JpcHQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBiYWJlbFwiXG5cbmltcG9ydCAqIGFzIHBhdGggZnJvbSBcInBhdGhcIlxuaW1wb3J0IEdyYW1tYXJVdGlscyBmcm9tIFwiLi4vZ3JhbW1hci11dGlsc1wiXG5jb25zdCB7IGNvbW1hbmQgfSA9IEdyYW1tYXJVdGlsc1xuXG5jb25zdCBiaW4gPSBwYXRoLmpvaW4oX19kaXJuYW1lLCBcIi4uLy4uXCIsIFwibm9kZV9tb2R1bGVzXCIsIFwiLmJpblwiKVxuY29uc3QgY29mZmVlID0gcGF0aC5qb2luKGJpbiwgXCJjb2ZmZWVcIilcbmNvbnN0IGJhYmVsID0gcGF0aC5qb2luKFxuICBfX2Rpcm5hbWUsXG4gIFwiLi4vLi5cIixcbiAgXCJub2RlX21vZHVsZXNcIixcbiAgXCIuYmluXCIsXG4gIEdyYW1tYXJVdGlscy5PcGVyYXRpbmdTeXN0ZW0uaXNXaW5kb3dzKCkgPyBcImJhYmVsLW5vZGUuY21kXCIgOiBcImJhYmVsLW5vZGVcIlxuKVxuY29uc3QgYmFiZWxDb25maWcgPSBwYXRoLmpvaW4oX19kaXJuYW1lLCBcImJhYmVsLmNvbmZpZy5qc1wiKVxuXG5jb25zdCByaW1yYWYgPSBwYXRoLmpvaW4oXG4gIF9fZGlybmFtZSxcbiAgXCIuLi8uLlwiLFxuICBcIm5vZGVfbW9kdWxlc1wiLFxuICBcIi5iaW5cIixcbiAgR3JhbW1hclV0aWxzLk9wZXJhdGluZ1N5c3RlbS5pc1dpbmRvd3MoKSA/IFwicmltcmFmLmNtZFwiIDogXCJyaW1yYWZcIlxuKVxuXG5mdW5jdGlvbiBjb2ZmZWVBcmdzKHsgZmlsZXBhdGggfSkge1xuICBsZXQgZmlsZVBhdGhPdXRwdXQgPSBmaWxlcGF0aFxuICBjb25zdCBleHRlbnNpb24gPSBmaWxlcGF0aC5zdWJzdHJpbmcoZmlsZXBhdGguaW5kZXhPZihcIi5cIikgKyAxKVxuICBmaWxlUGF0aE91dHB1dCA9IGZpbGVQYXRoT3V0cHV0LnJlcGxhY2UoZXh0ZW5zaW9uLCBcImpzXCIpXG4gIGNvbnN0IGNtZCA9IGAnJHtjb2ZmZWV9JyAtLWNvbXBpbGUgJyR7ZmlsZXBhdGh9JyAmJiAke2JhYmVsfSAke2ZpbGVQYXRoT3V0cHV0fSAtLWNvbmZpZy1maWxlICR7YmFiZWxDb25maWd9JyAmJiAke3JpbXJhZn0gJHtmaWxlUGF0aE91dHB1dH1gXG4gIHJldHVybiBHcmFtbWFyVXRpbHMuZm9ybWF0QXJncyhjbWQpXG59XG5cbmNvbnN0IENvZmZlZVNjcmlwdCA9IHtcbiAgXCJTZWxlY3Rpb24gQmFzZWRcIjoge1xuICAgIGNvbW1hbmQsXG4gICAgYXJncyhjb250ZXh0KSB7XG4gICAgICBjb25zdCBlZGl0b3IgPSBhdG9tLndvcmtzcGFjZS5nZXRBY3RpdmVUZXh0RWRpdG9yKClcbiAgICAgIGNvbnN0IHNjb3BlTmFtZSA9IGVkaXRvciA/IGVkaXRvci5nZXRHcmFtbWFyKCkuc2NvcGVOYW1lIDogbnVsbFxuICAgICAgY29uc3QgaXNMaXRlcmF0ZSA9IHNjb3BlTmFtZSAhPT0gbnVsbCAmJiBzY29wZU5hbWUuaW5jbHVkZXMoXCJsaXRcIilcbiAgICAgIGNvbnN0IGxpdCA9IGlzTGl0ZXJhdGUgPyBcImxpdFwiIDogXCJcIlxuICAgICAgY29uc3QgY29kZSA9IGNvbnRleHQuZ2V0Q29kZSgpXG4gICAgICBjb25zdCBmaWxlcGF0aCA9IEdyYW1tYXJVdGlscy5jcmVhdGVUZW1wRmlsZVdpdGhDb2RlKGNvZGUsIGAuJHtsaXR9Y29mZmVlYClcbiAgICAgIHJldHVybiBjb2ZmZWVBcmdzKHsgZmlsZXBhdGgsIGlzTGl0ZXJhdGUgfSlcbiAgICB9LFxuICB9LFxuICBcIkZpbGUgQmFzZWRcIjogeyBjb21tYW5kLCBhcmdzOiBjb2ZmZWVBcmdzIH0sXG59XG5cbmNvbnN0IENvZmZlZVNjcmlwdExpdGVyYXRlID0gQ29mZmVlU2NyaXB0XG5cbmNvbnN0IEljZWRDb2ZmZWVTY3JpcHQgPSB7XG4gIFwiU2VsZWN0aW9uIEJhc2VkXCI6IHtcbiAgICBjb21tYW5kOiBcImljZWRcIixcbiAgICBhcmdzKGNvbnRleHQpIHtcbiAgICAgIHJldHVybiBbXCItZVwiLCBjb250ZXh0LmdldENvZGUoKV1cbiAgICB9LFxuICB9LFxuXG4gIFwiRmlsZSBCYXNlZFwiOiB7XG4gICAgY29tbWFuZDogXCJpY2VkXCIsXG4gICAgYXJncyh7IGZpbGVwYXRoIH0pIHtcbiAgICAgIHJldHVybiBbZmlsZXBhdGhdXG4gICAgfSxcbiAgfSxcbn1cblxuY29uc3QgQ29mZmVlU2NyaXB0R3JhbW1hcnMgPSB7XG4gIENvZmZlZVNjcmlwdCxcbiAgXCJDb2ZmZWVTY3JpcHQgKExpdGVyYXRlKVwiOiBDb2ZmZWVTY3JpcHRMaXRlcmF0ZSxcbiAgSWNlZENvZmZlZVNjcmlwdCxcbiAgXCJJY2VkIENvZmZlZVNjcmlwdFwiOiBJY2VkQ29mZmVlU2NyaXB0LFxufVxuZXhwb3J0IGRlZmF1bHQgQ29mZmVlU2NyaXB0R3JhbW1hcnNcbiJdfQ==