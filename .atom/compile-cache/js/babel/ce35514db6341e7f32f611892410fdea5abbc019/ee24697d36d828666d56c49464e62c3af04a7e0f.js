Object.defineProperty(exports, "__esModule", {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _grammarUtils = require("../grammar-utils");

var _grammarUtils2 = _interopRequireDefault(_grammarUtils);

"use babel";
var command = _grammarUtils2["default"].command;

function JavaArgs(filepath, context) {
  var sourcePath = _grammarUtils2["default"].Java.getProjectPath(context);
  var className = _grammarUtils2["default"].Java.getClassName(context);
  var classPackages = _grammarUtils2["default"].Java.getClassPackage(context);
  var tempFolder = _grammarUtils2["default"].createTempFolder("jar-");
  var cmd = "javac -encoding UTF-8 -J-Dfile.encoding=UTF-8 -Xlint -sourcepath '" + sourcePath + "' -d '" + tempFolder + "' '" + filepath + "' && java -Dfile.encoding=UTF-8 -cp '" + tempFolder + "' " + classPackages + className;
  return _grammarUtils2["default"].formatArgs(cmd);
}

var Java = {
  "Selection Based": {
    command: command,
    args: function args(context) {
      var code = context.getCode();
      var tmpFile = _grammarUtils2["default"].createTempFileWithCode(code, ".java");
      return JavaArgs(tmpFile, context);
    }
  },
  "File Based": {
    command: command,
    args: function args(context) {
      return JavaArgs(context.filepath, context);
    }
  }
};

exports.Java = Java;
function KotlinArgs(filepath, jar) {
  var jarNew = (jar !== null ? jar : _path2["default"].basename(filepath)).replace(/\.kt$/, ".jar");
  var cmd = "kotlinc '" + filepath + "' -include-runtime -o " + jarNew + " && java -jar " + jarNew;
  return _grammarUtils2["default"].formatArgs(cmd);
}

var Kotlin = {
  "Selection Based": {
    command: command,
    args: function args(context) {
      var code = context.getCode();
      var tmpFile = _grammarUtils2["default"].createTempFileWithCode(code, ".kt");
      return KotlinArgs(tmpFile, null);
    }
  },
  "File Based": {
    command: command,
    args: function args(_ref) {
      var filepath = _ref.filepath;
      var filename = _ref.filename;

      return KotlinArgs(filepath, _path2["default"].join(_grammarUtils2["default"].createTempFolder("kt-"), filename));
    }
  }
};

exports.Kotlin = Kotlin;
var Processing = {
  "File Based": {
    command: "processing-java",
    args: function args(_ref2) {
      var filepath = _ref2.filepath;

      return ["--sketch=" + _path2["default"].dirname(filepath), "--run"];
    }
  }
};
exports.Processing = Processing;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZpbGU6Ly8vQzovVXNlcnMvY2tuanUvLmF0b20vcGFja2FnZXMvc2NyaXB0L2xpYi9ncmFtbWFycy9qYXZhLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztvQkFDaUIsTUFBTTs7Ozs0QkFDRSxrQkFBa0I7Ozs7QUFGM0MsV0FBVyxDQUFBO0lBR0gsT0FBTyw2QkFBUCxPQUFPOztBQUVmLFNBQVMsUUFBUSxDQUFDLFFBQVEsRUFBRSxPQUFPLEVBQUU7QUFDbkMsTUFBTSxVQUFVLEdBQUcsMEJBQWEsSUFBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsQ0FBQTtBQUM1RCxNQUFNLFNBQVMsR0FBRywwQkFBYSxJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxDQUFBO0FBQ3pELE1BQU0sYUFBYSxHQUFHLDBCQUFhLElBQUksQ0FBQyxlQUFlLENBQUMsT0FBTyxDQUFDLENBQUE7QUFDaEUsTUFBTSxVQUFVLEdBQUcsMEJBQWEsZ0JBQWdCLENBQUMsTUFBTSxDQUFDLENBQUE7QUFDeEQsTUFBTSxHQUFHLDBFQUF3RSxVQUFVLGNBQVMsVUFBVSxXQUFNLFFBQVEsNkNBQXdDLFVBQVUsVUFBSyxhQUFhLEdBQUcsU0FBUyxBQUFFLENBQUE7QUFDOU0sU0FBTywwQkFBYSxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUE7Q0FDcEM7O0FBRU0sSUFBTSxJQUFJLEdBQUc7QUFDbEIsbUJBQWlCLEVBQUU7QUFDakIsV0FBTyxFQUFQLE9BQU87QUFDUCxRQUFJLEVBQUEsY0FBQyxPQUFPLEVBQUU7QUFDWixVQUFNLElBQUksR0FBRyxPQUFPLENBQUMsT0FBTyxFQUFFLENBQUE7QUFDOUIsVUFBTSxPQUFPLEdBQUcsMEJBQWEsc0JBQXNCLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFBO0FBQ2xFLGFBQU8sUUFBUSxDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBQTtLQUNsQztHQUNGO0FBQ0QsY0FBWSxFQUFFO0FBQ1osV0FBTyxFQUFQLE9BQU87QUFDUCxRQUFJLEVBQUEsY0FBQyxPQUFPLEVBQUU7QUFDWixhQUFPLFFBQVEsQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLE9BQU8sQ0FBQyxDQUFBO0tBQzNDO0dBQ0Y7Q0FDRixDQUFBOzs7QUFFRCxTQUFTLFVBQVUsQ0FBQyxRQUFRLEVBQUUsR0FBRyxFQUFFO0FBQ2pDLE1BQU0sTUFBTSxHQUFHLENBQUMsR0FBRyxLQUFLLElBQUksR0FBRyxHQUFHLEdBQUcsa0JBQUssUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFBLENBQUUsT0FBTyxDQUFDLE9BQU8sRUFBRSxNQUFNLENBQUMsQ0FBQTtBQUN0RixNQUFNLEdBQUcsaUJBQWUsUUFBUSw4QkFBeUIsTUFBTSxzQkFBaUIsTUFBTSxBQUFFLENBQUE7QUFDeEYsU0FBTywwQkFBYSxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUE7Q0FDcEM7O0FBRU0sSUFBTSxNQUFNLEdBQUc7QUFDcEIsbUJBQWlCLEVBQUU7QUFDakIsV0FBTyxFQUFQLE9BQU87QUFDUCxRQUFJLEVBQUEsY0FBQyxPQUFPLEVBQUU7QUFDWixVQUFNLElBQUksR0FBRyxPQUFPLENBQUMsT0FBTyxFQUFFLENBQUE7QUFDOUIsVUFBTSxPQUFPLEdBQUcsMEJBQWEsc0JBQXNCLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFBO0FBQ2hFLGFBQU8sVUFBVSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQTtLQUNqQztHQUNGO0FBQ0QsY0FBWSxFQUFFO0FBQ1osV0FBTyxFQUFQLE9BQU87QUFDUCxRQUFJLEVBQUEsY0FBQyxJQUFzQixFQUFFO1VBQXRCLFFBQVEsR0FBVixJQUFzQixDQUFwQixRQUFRO1VBQUUsUUFBUSxHQUFwQixJQUFzQixDQUFWLFFBQVE7O0FBQ3ZCLGFBQU8sVUFBVSxDQUFDLFFBQVEsRUFBRSxrQkFBSyxJQUFJLENBQUMsMEJBQWEsZ0JBQWdCLENBQUMsS0FBSyxDQUFDLEVBQUUsUUFBUSxDQUFDLENBQUMsQ0FBQTtLQUN2RjtHQUNGO0NBQ0YsQ0FBQTs7O0FBRU0sSUFBTSxVQUFVLEdBQUc7QUFDeEIsY0FBWSxFQUFFO0FBQ1osV0FBTyxFQUFFLGlCQUFpQjtBQUMxQixRQUFJLEVBQUEsY0FBQyxLQUFZLEVBQUU7VUFBWixRQUFRLEdBQVYsS0FBWSxDQUFWLFFBQVE7O0FBQ2IsYUFBTyxlQUFhLGtCQUFLLE9BQU8sQ0FBQyxRQUFRLENBQUMsRUFBSSxPQUFPLENBQUMsQ0FBQTtLQUN2RDtHQUNGO0NBQ0YsQ0FBQSIsImZpbGUiOiJmaWxlOi8vL0M6L1VzZXJzL2Nrbmp1Ly5hdG9tL3BhY2thZ2VzL3NjcmlwdC9saWIvZ3JhbW1hcnMvamF2YS5qcyIsInNvdXJjZXNDb250ZW50IjpbIlwidXNlIGJhYmVsXCJcbmltcG9ydCBwYXRoIGZyb20gXCJwYXRoXCJcbmltcG9ydCBHcmFtbWFyVXRpbHMgZnJvbSBcIi4uL2dyYW1tYXItdXRpbHNcIlxuY29uc3QgeyBjb21tYW5kIH0gPSBHcmFtbWFyVXRpbHNcblxuZnVuY3Rpb24gSmF2YUFyZ3MoZmlsZXBhdGgsIGNvbnRleHQpIHtcbiAgY29uc3Qgc291cmNlUGF0aCA9IEdyYW1tYXJVdGlscy5KYXZhLmdldFByb2plY3RQYXRoKGNvbnRleHQpXG4gIGNvbnN0IGNsYXNzTmFtZSA9IEdyYW1tYXJVdGlscy5KYXZhLmdldENsYXNzTmFtZShjb250ZXh0KVxuICBjb25zdCBjbGFzc1BhY2thZ2VzID0gR3JhbW1hclV0aWxzLkphdmEuZ2V0Q2xhc3NQYWNrYWdlKGNvbnRleHQpXG4gIGNvbnN0IHRlbXBGb2xkZXIgPSBHcmFtbWFyVXRpbHMuY3JlYXRlVGVtcEZvbGRlcihcImphci1cIilcbiAgY29uc3QgY21kID0gYGphdmFjIC1lbmNvZGluZyBVVEYtOCAtSi1EZmlsZS5lbmNvZGluZz1VVEYtOCAtWGxpbnQgLXNvdXJjZXBhdGggJyR7c291cmNlUGF0aH0nIC1kICcke3RlbXBGb2xkZXJ9JyAnJHtmaWxlcGF0aH0nICYmIGphdmEgLURmaWxlLmVuY29kaW5nPVVURi04IC1jcCAnJHt0ZW1wRm9sZGVyfScgJHtjbGFzc1BhY2thZ2VzfSR7Y2xhc3NOYW1lfWBcbiAgcmV0dXJuIEdyYW1tYXJVdGlscy5mb3JtYXRBcmdzKGNtZClcbn1cblxuZXhwb3J0IGNvbnN0IEphdmEgPSB7XG4gIFwiU2VsZWN0aW9uIEJhc2VkXCI6IHtcbiAgICBjb21tYW5kLFxuICAgIGFyZ3MoY29udGV4dCkge1xuICAgICAgY29uc3QgY29kZSA9IGNvbnRleHQuZ2V0Q29kZSgpXG4gICAgICBjb25zdCB0bXBGaWxlID0gR3JhbW1hclV0aWxzLmNyZWF0ZVRlbXBGaWxlV2l0aENvZGUoY29kZSwgXCIuamF2YVwiKVxuICAgICAgcmV0dXJuIEphdmFBcmdzKHRtcEZpbGUsIGNvbnRleHQpXG4gICAgfSxcbiAgfSxcbiAgXCJGaWxlIEJhc2VkXCI6IHtcbiAgICBjb21tYW5kLFxuICAgIGFyZ3MoY29udGV4dCkge1xuICAgICAgcmV0dXJuIEphdmFBcmdzKGNvbnRleHQuZmlsZXBhdGgsIGNvbnRleHQpXG4gICAgfSxcbiAgfSxcbn1cblxuZnVuY3Rpb24gS290bGluQXJncyhmaWxlcGF0aCwgamFyKSB7XG4gIGNvbnN0IGphck5ldyA9IChqYXIgIT09IG51bGwgPyBqYXIgOiBwYXRoLmJhc2VuYW1lKGZpbGVwYXRoKSkucmVwbGFjZSgvXFwua3QkLywgXCIuamFyXCIpXG4gIGNvbnN0IGNtZCA9IGBrb3RsaW5jICcke2ZpbGVwYXRofScgLWluY2x1ZGUtcnVudGltZSAtbyAke2phck5ld30gJiYgamF2YSAtamFyICR7amFyTmV3fWBcbiAgcmV0dXJuIEdyYW1tYXJVdGlscy5mb3JtYXRBcmdzKGNtZClcbn1cblxuZXhwb3J0IGNvbnN0IEtvdGxpbiA9IHtcbiAgXCJTZWxlY3Rpb24gQmFzZWRcIjoge1xuICAgIGNvbW1hbmQsXG4gICAgYXJncyhjb250ZXh0KSB7XG4gICAgICBjb25zdCBjb2RlID0gY29udGV4dC5nZXRDb2RlKClcbiAgICAgIGNvbnN0IHRtcEZpbGUgPSBHcmFtbWFyVXRpbHMuY3JlYXRlVGVtcEZpbGVXaXRoQ29kZShjb2RlLCBcIi5rdFwiKVxuICAgICAgcmV0dXJuIEtvdGxpbkFyZ3ModG1wRmlsZSwgbnVsbClcbiAgICB9LFxuICB9LFxuICBcIkZpbGUgQmFzZWRcIjoge1xuICAgIGNvbW1hbmQsXG4gICAgYXJncyh7IGZpbGVwYXRoLCBmaWxlbmFtZSB9KSB7XG4gICAgICByZXR1cm4gS290bGluQXJncyhmaWxlcGF0aCwgcGF0aC5qb2luKEdyYW1tYXJVdGlscy5jcmVhdGVUZW1wRm9sZGVyKFwia3QtXCIpLCBmaWxlbmFtZSkpXG4gICAgfSxcbiAgfSxcbn1cblxuZXhwb3J0IGNvbnN0IFByb2Nlc3NpbmcgPSB7XG4gIFwiRmlsZSBCYXNlZFwiOiB7XG4gICAgY29tbWFuZDogXCJwcm9jZXNzaW5nLWphdmFcIixcbiAgICBhcmdzKHsgZmlsZXBhdGggfSkge1xuICAgICAgcmV0dXJuIFtgLS1za2V0Y2g9JHtwYXRoLmRpcm5hbWUoZmlsZXBhdGgpfWAsIFwiLS1ydW5cIl1cbiAgICB9LFxuICB9LFxufVxuIl19