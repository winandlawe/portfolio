Object.defineProperty(exports, "__esModule", {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _grammarUtils = require("../grammar-utils");

var _grammarUtils2 = _interopRequireDefault(_grammarUtils);

"use babel";

var OperatingSystem = _grammarUtils2["default"].OperatingSystem;
var command = _grammarUtils2["default"].command;

var os = OperatingSystem.platform();
var windows = OperatingSystem.isWindows();

var options = "-Wall -include stdio.h";

// TODO add windows support
function CArgs(_ref) {
  var filepath = _ref.filepath;

  var tempOutFile = _grammarUtils2["default"].createTempPath("c-", ".out");
  var cmdArgs = "";
  switch (os) {
    case "darwin":
      cmdArgs = "xcrun clang " + options + " -fcolor-diagnostics '" + filepath + "' -o " + tempOutFile + " && " + tempOutFile;
      break;
    case "linux":
      cmdArgs = "cc " + options + " '" + filepath + "' -o " + tempOutFile + " && " + tempOutFile;
      break;
    default:
      {
        atom.notifications.addError("Not support on " + os);
      }
  }
  return ["-c", cmdArgs];
}

var C = {
  "File Based": {
    command: "bash",
    args: function args(opts) {
      return CArgs(opts);
    }
  },

  "Selection Based": {
    command: "bash",
    args: function args(context) {
      var code = context.getCode();
      var tmpFile = _grammarUtils2["default"].createTempFileWithCode(code, ".c");
      return CArgs({ filepath: tmpFile });
    }
  }
};

var Cs = {
  "Selection Based": {
    command: command,
    args: function args(context) {
      var code = context.getCode();
      var tmpFile = _grammarUtils2["default"].createTempFileWithCode(code, ".cs");
      var exe = tmpFile.replace(/\.cs$/, ".exe");
      if (windows) {
        return ["/c csc /out:" + exe + " " + tmpFile + " && " + exe];
      } else {
        return ["-c", "csc /out:" + exe + " " + tmpFile + " && mono " + exe];
      }
    }
  },
  "File Based": {
    command: command,
    args: function args(_ref2) {
      var filepath = _ref2.filepath;
      var filename = _ref2.filename;

      var exe = filename.replace(/\.cs$/, ".exe");
      if (windows) {
        return ["/c csc " + filepath + " && " + exe];
      } else {
        return ["-c", "csc '" + filepath + "' && mono " + exe];
      }
    }
  }
};
var CSScriptFile = {
  "Selection Based": {
    command: "scriptcs",
    args: function args(context) {
      var code = context.getCode();
      var tmpFile = _grammarUtils2["default"].createTempFileWithCode(code, ".csx");
      return ["-script", tmpFile];
    }
  },
  "File Based": {
    command: "scriptcs",
    args: function args(_ref3) {
      var filepath = _ref3.filepath;

      return ["-script", filepath];
    }
  }
};

var Cpp = {
  "Selection Based": {
    command: "bash",
    args: function args(context) {
      var code = context.getCode();
      var tmpFile = _grammarUtils2["default"].createTempFileWithCode(code, ".cpp");
      var tempOutFile = _grammarUtils2["default"].createTempPath("cpp-", ".out");
      var cmdArgs = "";
      switch (os) {
        case "darwin":
          cmdArgs = "xcrun clang++ -std=c++14 " + options + " -fcolor-diagnostics -include iostream " + tmpFile + " -o " + tempOutFile + " && " + tempOutFile;
          break;
        case "linux":
          cmdArgs = "g++ " + options + " -std=c++14 -include iostream " + tmpFile + " -o " + tempOutFile + " && " + tempOutFile;
          break;
        default:
          {
            atom.notifications.addError("Not support on " + os);
          }
      }
      return ["-c", cmdArgs];
    }
  },

  "File Based": {
    command: command,
    args: function args(_ref4) {
      var filepath = _ref4.filepath;

      var tempOutFile = _grammarUtils2["default"].createTempPath("cpp-", ".out");
      var cmdArgs = "";
      switch (os) {
        case "darwin":
          cmdArgs = "xcrun clang++ -std=c++14 " + options + " -fcolor-diagnostics -include iostream '" + filepath + "' -o " + tempOutFile + " && " + tempOutFile;
          break;
        case "linux":
          cmdArgs = "g++ -std=c++14 " + options + " -include iostream '" + filepath + "' -o " + tempOutFile + " && " + tempOutFile;
          break;
        case "win32":
          if (_grammarUtils2["default"].OperatingSystem.release().split(".").slice(-1 >= "14399")) {
            var _path$posix;

            filepath = (_path$posix = _path2["default"].posix).join.apply(_path$posix, [filepath.split(_path2["default"].win32.sep)[0].toLowerCase()].concat(_toConsumableArray(filepath.split(_path2["default"].win32.sep).slice(1)))).replace(":", "");
            cmdArgs = "g++ -std=c++14 " + options + " -include iostream /mnt/" + filepath + " -o " + tempOutFile + " && " + tempOutFile;
          }
          break;
        default:
          {
            atom.notifications.addError("Not support on " + os);
          }
      }
      return _grammarUtils2["default"].formatArgs(cmdArgs);
    }
  }
};
var Cpp14 = Cpp;

var ObjectiveC = {
  "File Based": {
    command: "bash",
    args: function args(_ref5) {
      var filepath = _ref5.filepath;

      var tempOutFile = _grammarUtils2["default"].createTempPath("objc-", ".out");
      return ["-c", "xcrun clang " + options + " -fcolor-diagnostics -framework Cocoa '" + filepath + "' -o " + tempOutFile + " && " + tempOutFile];
    }
  }
};

var ObjectiveCpp = {
  "File Based": {
    command: "bash",
    args: function args(_ref6) {
      var filepath = _ref6.filepath;

      var tempOutFile = _grammarUtils2["default"].createTempPath("objcpp-", ".out");
      return ["-c", "xcrun clang++ -Wc++11-extensions " + options + " -fcolor-diagnostics -include iostream -framework Cocoa '" + filepath + "' -o " + tempOutFile + " && " + tempOutFile];
    }
  }
};

var CGrammars = {
  C: C,
  "C++": Cpp,
  "C++14": Cpp14,
  "C#": Cs,
  "C# Script File": CSScriptFile,
  "Objective-C": ObjectiveC,
  "Objective-C++": ObjectiveCpp
};
exports["default"] = CGrammars;
module.exports = exports["default"];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZpbGU6Ly8vQzovVXNlcnMvY2tuanUvLmF0b20vcGFja2FnZXMvc2NyaXB0L2xpYi9ncmFtbWFycy9jLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O29CQUVpQixNQUFNOzs7OzRCQUNFLGtCQUFrQjs7OztBQUgzQyxXQUFXLENBQUE7O0lBSUgsZUFBZSw2QkFBZixlQUFlO0lBQUUsT0FBTyw2QkFBUCxPQUFPOztBQUVoQyxJQUFNLEVBQUUsR0FBRyxlQUFlLENBQUMsUUFBUSxFQUFFLENBQUE7QUFDckMsSUFBTSxPQUFPLEdBQUcsZUFBZSxDQUFDLFNBQVMsRUFBRSxDQUFBOztBQUUzQyxJQUFNLE9BQU8sR0FBRyx3QkFBd0IsQ0FBQTs7O0FBR3hDLFNBQVMsS0FBSyxDQUFDLElBQVksRUFBRTtNQUFaLFFBQVEsR0FBVixJQUFZLENBQVYsUUFBUTs7QUFDdkIsTUFBTSxXQUFXLEdBQUcsMEJBQWEsY0FBYyxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQTtBQUM3RCxNQUFJLE9BQU8sR0FBRyxFQUFFLENBQUE7QUFDaEIsVUFBUSxFQUFFO0FBQ1IsU0FBSyxRQUFRO0FBQ1gsYUFBTyxvQkFBa0IsT0FBTyw4QkFBeUIsUUFBUSxhQUFRLFdBQVcsWUFBTyxXQUFXLEFBQUUsQ0FBQTtBQUN4RyxZQUFLO0FBQUEsQUFDUCxTQUFLLE9BQU87QUFDVixhQUFPLFdBQVMsT0FBTyxVQUFLLFFBQVEsYUFBUSxXQUFXLFlBQU8sV0FBVyxBQUFFLENBQUE7QUFDM0UsWUFBSztBQUFBLEFBQ1A7QUFBUztBQUNQLFlBQUksQ0FBQyxhQUFhLENBQUMsUUFBUSxxQkFBbUIsRUFBRSxDQUFHLENBQUE7T0FDcEQ7QUFBQSxHQUNGO0FBQ0QsU0FBTyxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQTtDQUN2Qjs7QUFFRCxJQUFNLENBQUMsR0FBRztBQUNSLGNBQVksRUFBRTtBQUNaLFdBQU8sRUFBRSxNQUFNO0FBQ2YsUUFBSSxFQUFBLGNBQUMsSUFB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QUMsQ0FBQTtBQUNsRSxhQUFPLENBQ0wsSUFBSSx3Q0FDZ0MsT0FBTyxpRUFBNEQsUUFBUSxhQUFRLFdBQVcsWUFBTyxXQUFXLENBQ3JKLENBQUE7S0FDRjtHQUNGO0NBQ0YsQ0FBQTs7QUFFRCxJQUFNLFNBQVMsR0FBRztBQUNoQixHQUFDLEVBQUQsQ0FBQztBQUNELE9BQUssRUFBRSxHQUFHO0FBQ1YsU0FBTyxFQUFFLEtBQUs7QUFDZCxNQUFJLEVBQUUsRUFBRTtBQUNSLGtCQUFnQixFQUFFLFlBQVk7QUFDOUIsZUFBYSxFQUFFLFVBQVU7QUFDekIsaUJBQWUsRUFBRSxZQUFZO0NBQzlCLENBQUE7cUJBQ2MsU0FBUyIsImZpbGUiOiJmaWxlOi8vL0M6L1VzZXJzL2Nrbmp1Ly5hdG9tL3BhY2thZ2VzL3NjcmlwdC9saWIvZ3JhbW1hcnMvYy5qcyIsInNvdXJjZXNDb250ZW50IjpbIlwidXNlIGJhYmVsXCJcblxuaW1wb3J0IHBhdGggZnJvbSBcInBhdGhcIlxuaW1wb3J0IEdyYW1tYXJVdGlscyBmcm9tIFwiLi4vZ3JhbW1hci11dGlsc1wiXG5jb25zdCB7IE9wZXJhdGluZ1N5c3RlbSwgY29tbWFuZCB9ID0gR3JhbW1hclV0aWxzXG5cbmNvbnN0IG9zID0gT3BlcmF0aW5nU3lzdGVtLnBsYXRmb3JtKClcbmNvbnN0IHdpbmRvd3MgPSBPcGVyYXRpbmdTeXN0ZW0uaXNXaW5kb3dzKClcblxuY29uc3Qgb3B0aW9ucyA9IFwiLVdhbGwgLWluY2x1ZGUgc3RkaW8uaFwiXG5cbi8vIFRPRE8gYWRkIHdpbmRvd3Mgc3VwcG9ydFxuZnVuY3Rpb24gQ0FyZ3MoeyBmaWxlcGF0aCB9KSB7XG4gIGNvbnN0IHRlbXBPdXRGaWxlID0gR3JhbW1hclV0aWxzLmNyZWF0ZVRlbXBQYXRoKFwiYy1cIiwgXCIub3V0XCIpXG4gIGxldCBjbWRBcmdzID0gXCJcIlxuICBzd2l0Y2ggKG9zKSB7XG4gICAgY2FzZSBcImRhcndpblwiOlxuICAgICAgY21kQXJncyA9IGB4Y3J1biBjbGFuZyAke29wdGlvbnN9IC1mY29sb3ItZGlhZ25vc3RpY3MgJyR7ZmlsZXBhdGh9JyAtbyAke3RlbXBPdXRGaWxlfSAmJiAke3RlbXBPdXRGaWxlfWBcbiAgICAgIGJyZWFrXG4gICAgY2FzZSBcImxpbnV4XCI6XG4gICAgICBjbWRBcmdzID0gYGNjICR7b3B0aW9uc30gJyR7ZmlsZXBhdGh9JyAtbyAke3RlbXBPdXRGaWxlfSAmJiAke3RlbXBPdXRGaWxlfWBcbiAgICAgIGJyZWFrXG4gICAgZGVmYXVsdDoge1xuICAgICAgYXRvbS5ub3RpZmljYXRpb25zLmFkZEVycm9yKGBOb3Qgc3VwcG9ydCBvbiAke29zfWApXG4gICAgfVxuICB9XG4gIHJldHVybiBbXCItY1wiLCBjbWRBcmdzXVxufVxuXG5jb25zdCBDID0ge1xuICBcIkZpbGUgQmFzZWRcIjoge1xuICAgIGNvbW1hbmQ6IFwiYmFzaFwiLFxuICAgIGFyZ3Mob3B0cykge1xuICAgICAgcmV0dXJuIENBcmdzKG9wdHMpXG4gICAgfSxcbiAgfSxcblxuICBcIlNlbGVjdGlvbiBCYXNlZFwiOiB7XG4gICAgY29tbWFuZDogXCJiYXNoXCIsXG4gICAgYXJncyhjb250ZXh0KSB7XG4gICAgICBjb25zdCBjb2RlID0gY29udGV4dC5nZXRDb2RlKClcbiAgICAgIGNvbnN0IHRtcEZpbGUgPSBHcmFtbWFyVXRpbHMuY3JlYXRlVGVtcEZpbGVXaXRoQ29kZShjb2RlLCBcIi5jXCIpXG4gICAgICByZXR1cm4gQ0FyZ3MoeyBmaWxlcGF0aDogdG1wRmlsZSB9KVxuICAgIH0sXG4gIH0sXG59XG5cbmNvbnN0IENzID0ge1xuICBcIlNlbGVjdGlvbiBCYXNlZFwiOiB7XG4gICAgY29tbWFuZCxcbiAgICBhcmdzKGNvbnRleHQpIHtcbiAgICAgIGNvbnN0IGNvZGUgPSBjb250ZXh0LmdldENvZGUoKVxuICAgICAgY29uc3QgdG1wRmlsZSA9IEdyYW1tYXJVdGlscy5jcmVhdGVUZW1wRmlsZVdpdGhDb2RlKGNvZGUsIFwiLmNzXCIpXG4gICAgICBjb25zdCBleGUgPSB0bXBGaWxlLnJlcGxhY2UoL1xcLmNzJC8sIFwiLmV4ZVwiKVxuICAgICAgaWYgKHdpbmRvd3MpIHtcbiAgICAgICAgcmV0dXJuIFtgL2MgY3NjIC9vdXQ6JHtleGV9ICR7dG1wRmlsZX0gJiYgJHtleGV9YF1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBbXCItY1wiLCBgY3NjIC9vdXQ6JHtleGV9ICR7dG1wRmlsZX0gJiYgbW9ubyAke2V4ZX1gXVxuICAgICAgfVxuICAgIH0sXG4gIH0sXG4gIFwiRmlsZSBCYXNlZFwiOiB7XG4gICAgY29tbWFuZCxcbiAgICBhcmdzKHsgZmlsZXBhdGgsIGZpbGVuYW1lIH0pIHtcbiAgICAgIGNvbnN0IGV4ZSA9IGZpbGVuYW1lLnJlcGxhY2UoL1xcLmNzJC8sIFwiLmV4ZVwiKVxuICAgICAgaWYgKHdpbmRvd3MpIHtcbiAgICAgICAgcmV0dXJuIFtgL2MgY3NjICR7ZmlsZXBhdGh9ICYmICR7ZXhlfWBdXG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gW1wiLWNcIiwgYGNzYyAnJHtmaWxlcGF0aH0nICYmIG1vbm8gJHtleGV9YF1cbiAgICAgIH1cbiAgICB9LFxuICB9LFxufVxuY29uc3QgQ1NTY3JpcHRGaWxlID0ge1xuICBcIlNlbGVjdGlvbiBCYXNlZFwiOiB7XG4gICAgY29tbWFuZDogXCJzY3JpcHRjc1wiLFxuICAgIGFyZ3MoY29udGV4dCkge1xuICAgICAgY29uc3QgY29kZSA9IGNvbnRleHQuZ2V0Q29kZSgpXG4gICAgICBjb25zdCB0bXBGaWxlID0gR3JhbW1hclV0aWxzLmNyZWF0ZVRlbXBGaWxlV2l0aENvZGUoY29kZSwgXCIuY3N4XCIpXG4gICAgICByZXR1cm4gW1wiLXNjcmlwdFwiLCB0bXBGaWxlXVxuICAgIH0sXG4gIH0sXG4gIFwiRmlsZSBCYXNlZFwiOiB7XG4gICAgY29tbWFuZDogXCJzY3JpcHRjc1wiLFxuICAgIGFyZ3MoeyBmaWxlcGF0aCB9KSB7XG4gICAgICByZXR1cm4gW1wiLXNjcmlwdFwiLCBmaWxlcGF0aF1cbiAgICB9LFxuICB9LFxufVxuXG5jb25zdCBDcHAgPSB7XG4gIFwiU2VsZWN0aW9uIEJhc2VkXCI6IHtcbiAgICBjb21tYW5kOiBcImJhc2hcIixcbiAgICBhcmdzKGNvbnRleHQpIHtcbiAgICAgIGNvbnN0IGNvZGUgPSBjb250ZXh0LmdldENvZGUoKVxuICAgICAgY29uc3QgdG1wRmlsZSA9IEdyYW1tYXJVdGlscy5jcmVhdGVUZW1wRmlsZVdpdGhDb2RlKGNvZGUsIFwiLmNwcFwiKVxuICAgICAgY29uc3QgdGVtcE91dEZpbGUgPSBHcmFtbWFyVXRpbHMuY3JlYXRlVGVtcFBhdGgoXCJjcHAtXCIsIFwiLm91dFwiKVxuICAgICAgbGV0IGNtZEFyZ3MgPSBcIlwiXG4gICAgICBzd2l0Y2ggKG9zKSB7XG4gICAgICAgIGNhc2UgXCJkYXJ3aW5cIjpcbiAgICAgICAgICBjbWRBcmdzID0gYHhjcnVuIGNsYW5nKysgLXN0ZD1jKysxNCAke29wdGlvbnN9IC1mY29sb3ItZGlhZ25vc3RpY3MgLWluY2x1ZGUgaW9zdHJlYW0gJHt0bXBGaWxlfSAtbyAke3RlbXBPdXRGaWxlfSAmJiAke3RlbXBPdXRGaWxlfWBcbiAgICAgICAgICBicmVha1xuICAgICAgICBjYXNlIFwibGludXhcIjpcbiAgICAgICAgICBjbWRBcmdzID0gYGcrKyAke29wdGlvbnN9IC1zdGQ9YysrMTQgLWluY2x1ZGUgaW9zdHJlYW0gJHt0bXBGaWxlfSAtbyAke3RlbXBPdXRGaWxlfSAmJiAke3RlbXBPdXRGaWxlfWBcbiAgICAgICAgICBicmVha1xuICAgICAgICBkZWZhdWx0OiB7XG4gICAgICAgICAgYXRvbS5ub3RpZmljYXRpb25zLmFkZEVycm9yKGBOb3Qgc3VwcG9ydCBvbiAke29zfWApXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBbXCItY1wiLCBjbWRBcmdzXVxuICAgIH0sXG4gIH0sXG5cbiAgXCJGaWxlIEJhc2VkXCI6IHtcbiAgICBjb21tYW5kLFxuICAgIGFyZ3MoeyBmaWxlcGF0aCB9KSB7XG4gICAgICBjb25zdCB0ZW1wT3V0RmlsZSA9IEdyYW1tYXJVdGlscy5jcmVhdGVUZW1wUGF0aChcImNwcC1cIiwgXCIub3V0XCIpXG4gICAgICBsZXQgY21kQXJncyA9IFwiXCJcbiAgICAgIHN3aXRjaCAob3MpIHtcbiAgICAgICAgY2FzZSBcImRhcndpblwiOlxuICAgICAgICAgIGNtZEFyZ3MgPSBgeGNydW4gY2xhbmcrKyAtc3RkPWMrKzE0ICR7b3B0aW9uc30gLWZjb2xvci1kaWFnbm9zdGljcyAtaW5jbHVkZSBpb3N0cmVhbSAnJHtmaWxlcGF0aH0nIC1vICR7dGVtcE91dEZpbGV9ICYmICR7dGVtcE91dEZpbGV9YFxuICAgICAgICAgIGJyZWFrXG4gICAgICAgIGNhc2UgXCJsaW51eFwiOlxuICAgICAgICAgIGNtZEFyZ3MgPSBgZysrIC1zdGQ9YysrMTQgJHtvcHRpb25zfSAtaW5jbHVkZSBpb3N0cmVhbSAnJHtmaWxlcGF0aH0nIC1vICR7dGVtcE91dEZpbGV9ICYmICR7dGVtcE91dEZpbGV9YFxuICAgICAgICAgIGJyZWFrXG4gICAgICAgIGNhc2UgXCJ3aW4zMlwiOlxuICAgICAgICAgIGlmIChcbiAgICAgICAgICAgIEdyYW1tYXJVdGlscy5PcGVyYXRpbmdTeXN0ZW0ucmVsZWFzZSgpXG4gICAgICAgICAgICAgIC5zcGxpdChcIi5cIilcbiAgICAgICAgICAgICAgLnNsaWNlKC0xID49IFwiMTQzOTlcIilcbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIGZpbGVwYXRoID0gcGF0aC5wb3NpeFxuICAgICAgICAgICAgICAuam9pbiguLi5bZmlsZXBhdGguc3BsaXQocGF0aC53aW4zMi5zZXApWzBdLnRvTG93ZXJDYXNlKCksIC4uLmZpbGVwYXRoLnNwbGl0KHBhdGgud2luMzIuc2VwKS5zbGljZSgxKV0pXG4gICAgICAgICAgICAgIC5yZXBsYWNlKFwiOlwiLCBcIlwiKVxuICAgICAgICAgICAgY21kQXJncyA9IGBnKysgLXN0ZD1jKysxNCAke29wdGlvbnN9IC1pbmNsdWRlIGlvc3RyZWFtIC9tbnQvJHtmaWxlcGF0aH0gLW8gJHt0ZW1wT3V0RmlsZX0gJiYgJHt0ZW1wT3V0RmlsZX1gXG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrXG4gICAgICAgIGRlZmF1bHQ6IHtcbiAgICAgICAgICBhdG9tLm5vdGlmaWNhdGlvbnMuYWRkRXJyb3IoYE5vdCBzdXBwb3J0IG9uICR7b3N9YClcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIEdyYW1tYXJVdGlscy5mb3JtYXRBcmdzKGNtZEFyZ3MpXG4gICAgfSxcbiAgfSxcbn1cbmNvbnN0IENwcDE0ID0gQ3BwXG5cbmNvbnN0IE9iamVjdGl2ZUMgPSB7XG4gIFwiRmlsZSBCYXNlZFwiOiB7XG4gICAgY29tbWFuZDogXCJiYXNoXCIsXG4gICAgYXJncyh7IGZpbGVwYXRoIH0pIHtcbiAgICAgIGNvbnN0IHRlbXBPdXRGaWxlID0gR3JhbW1hclV0aWxzLmNyZWF0ZVRlbXBQYXRoKFwib2JqYy1cIiwgXCIub3V0XCIpXG4gICAgICByZXR1cm4gW1xuICAgICAgICBcIi1jXCIsXG4gICAgICAgIGB4Y3J1biBjbGFuZyAke29wdGlvbnN9IC1mY29sb3ItZGlhZ25vc3RpY3MgLWZyYW1ld29yayBDb2NvYSAnJHtmaWxlcGF0aH0nIC1vICR7dGVtcE91dEZpbGV9ICYmICR7dGVtcE91dEZpbGV9YCxcbiAgICAgIF1cbiAgICB9LFxuICB9LFxufVxuXG5jb25zdCBPYmplY3RpdmVDcHAgPSB7XG4gIFwiRmlsZSBCYXNlZFwiOiB7XG4gICAgY29tbWFuZDogXCJiYXNoXCIsXG4gICAgYXJncyh7IGZpbGVwYXRoIH0pIHtcbiAgICAgIGNvbnN0IHRlbXBPdXRGaWxlID0gR3JhbW1hclV0aWxzLmNyZWF0ZVRlbXBQYXRoKFwib2JqY3BwLVwiLCBcIi5vdXRcIilcbiAgICAgIHJldHVybiBbXG4gICAgICAgIFwiLWNcIixcbiAgICAgICAgYHhjcnVuIGNsYW5nKysgLVdjKysxMS1leHRlbnNpb25zICR7b3B0aW9uc30gLWZjb2xvci1kaWFnbm9zdGljcyAtaW5jbHVkZSBpb3N0cmVhbSAtZnJhbWV3b3JrIENvY29hICcke2ZpbGVwYXRofScgLW8gJHt0ZW1wT3V0RmlsZX0gJiYgJHt0ZW1wT3V0RmlsZX1gLFxuICAgICAgXVxuICAgIH0sXG4gIH0sXG59XG5cbmNvbnN0IENHcmFtbWFycyA9IHtcbiAgQyxcbiAgXCJDKytcIjogQ3BwLFxuICBcIkMrKzE0XCI6IENwcDE0LFxuICBcIkMjXCI6IENzLFxuICBcIkMjIFNjcmlwdCBGaWxlXCI6IENTU2NyaXB0RmlsZSxcbiAgXCJPYmplY3RpdmUtQ1wiOiBPYmplY3RpdmVDLFxuICBcIk9iamVjdGl2ZS1DKytcIjogT2JqZWN0aXZlQ3BwLFxufVxuZXhwb3J0IGRlZmF1bHQgQ0dyYW1tYXJzXG4iXX0=