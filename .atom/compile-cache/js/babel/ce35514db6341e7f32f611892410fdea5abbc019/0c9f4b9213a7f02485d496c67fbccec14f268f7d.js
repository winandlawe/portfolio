Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; })();

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _underscore = require("underscore");

var _underscore2 = _interopRequireDefault(_underscore);

"use babel";

var ScriptOptions = (function () {
  function ScriptOptions() {
    _classCallCheck(this, ScriptOptions);

    this.name = "";
    this.description = "";
    this.lang = "";
    this.workingDirectory = null;
    this.cmd = null;
    this.cmdArgs = [];
    this.env = null;
    this.scriptArgs = [];
  }

  _createClass(ScriptOptions, [{
    key: "toObject",
    value: function toObject() {
      return {
        name: this.name,
        description: this.description,
        lang: this.lang,
        workingDirectory: this.workingDirectory,
        cmd: this.cmd,
        cmdArgs: this.cmdArgs,
        env: this.env,
        scriptArgs: this.scriptArgs
      };
    }

    // Public: Serializes the user specified environment vars as an {object}
    // TODO: Support shells that allow a number as the first character in a variable?
    //
    // Returns an {Object} representation of the user specified environment.
  }, {
    key: "getEnv",
    value: function getEnv() {
      if (!this.env) {
        return {};
      }

      var mapping = {};

      for (var pair of this.env.trim().split(";")) {
        var _pair$split = pair.split("=", 2);

        var _pair$split2 = _slicedToArray(_pair$split, 2);

        var key = _pair$split2[0];
        var value = _pair$split2[1];

        mapping[key] = ("" + value).replace(/"((?:[^"\\]|\\"|\\[^"])+)"/, "$1");
        mapping[key] = mapping[key].replace(/'((?:[^'\\]|\\'|\\[^'])+)'/, "$1");
      }

      return mapping;
    }

    // Public: Merges two environment objects
    //
    // otherEnv - The {Object} to extend the parsed environment by
    //
    // Returns the merged environment {Object}.
  }, {
    key: "mergedEnv",
    value: function mergedEnv(otherEnv) {
      var otherCopy = _underscore2["default"].extend({}, otherEnv);
      var mergedEnv = _underscore2["default"].extend(otherCopy, this.getEnv());

      for (var key in mergedEnv) {
        var value = mergedEnv[key];
        mergedEnv[key] = ("" + value).replace(/"((?:[^"\\]|\\"|\\[^"])+)"/, "$1");
        mergedEnv[key] = mergedEnv[key].replace(/'((?:[^'\\]|\\'|\\[^'])+)'/, "$1");
      }

      return mergedEnv;
    }
  }], [{
    key: "createFromOptions",
    value: function createFromOptions(name, options) {
      var so = new ScriptOptions();
      so.name = name;
      for (var key in options) {
        var value = options[key];
        so[key] = value;
      }
      return so;
    }
  }]);

  return ScriptOptions;
})();

exports["default"] = ScriptOptions;
module.exports = exports["default"];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZpbGU6Ly8vQzovVXNlcnMvY2tuanUvLmF0b20vcGFja2FnZXMvc2NyaXB0L2xpYi9zY3JpcHQtb3B0aW9ucy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7MEJBRWMsWUFBWTs7OztBQUYxQixXQUFXLENBQUE7O0lBSVUsYUFBYTtBQUNyQixXQURRLGFBQWEsR0FDbEI7MEJBREssYUFBYTs7QUFFOUIsUUFBSSxDQUFDLElBQUksR0FBRyxFQUFFLENBQUE7QUFDZCxRQUFJLENBQUMsV0FBVyxHQUFHLEVBQUUsQ0FBQTtBQUNyQixRQUFJLENBQUMsSUFBSSxHQUFHLEVBQUUsQ0FBQTtBQUNkLFFBQUksQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLENBQUE7QUFDNUIsUUFBSSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUE7QUFDZixRQUFJLENBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQTtBQUNqQixRQUFJLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQTtBQUNmLFFBQUksQ0FBQyxVQUFVLEdBQUcsRUFBRSxDQUFBO0dBQ3JCOztlQVZrQixhQUFhOztXQXNCeEIsb0JBQUc7QUFDVCxhQUFPO0FBQ0wsWUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJO0FBQ2YsbUJBQVcsRUFBRSxJQUFJLENBQUMsV0FBVztBQUM3QixZQUFJLEVBQUUsSUFBSSxDQUFDLElBQUk7QUFDZix3QkFBZ0IsRUFBRSxJQUFJLENBQUMsZ0JBQWdCO0FBQ3ZDLFdBQUcsRUFBRSxJQUFJLENBQUMsR0FBRztBQUNiLGVBQU8sRUFBRSxJQUFJLENBQUMsT0FBTztBQUNyQixXQUFHLEVBQUUsSUFBSSxDQUFDLEdBQUc7QUFDYixrQkFBVSxFQUFFLElBQUksQ0FBQyxVQUFVO09BQzVCLENBQUE7S0FDRjs7Ozs7Ozs7V0FNSyxrQkFBRztBQUNQLFVBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFO0FBQ2IsZUFBTyxFQUFFLENBQUE7T0FDVjs7QUFFRCxVQUFNLE9BQU8sR0FBRyxFQUFFLENBQUE7O0FBRWxCLFdBQUssSUFBTSxJQUFJLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUU7MEJBQ3hCLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQzs7OztZQUFoQyxHQUFHO1lBQUUsS0FBSzs7QUFDakIsZUFBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLE1BQUcsS0FBSyxFQUFHLE9BQU8sQ0FBQyw0QkFBNEIsRUFBRSxJQUFJLENBQUMsQ0FBQTtBQUNyRSxlQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyw0QkFBNEIsRUFBRSxJQUFJLENBQUMsQ0FBQTtPQUN4RTs7QUFFRCxhQUFPLE9BQU8sQ0FBQTtLQUNmOzs7Ozs7Ozs7V0FPUSxtQkFBQyxRQUFRLEVBQUU7QUFDbEIsVUFBTSxTQUFTLEdBQUcsd0JBQUUsTUFBTSxDQUFDLEVBQUUsRUFBRSxRQUFRLENBQUMsQ0FBQTtBQUN4QyxVQUFNLFNBQVMsR0FBRyx3QkFBRSxNQUFNLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFBOztBQUVwRCxXQUFLLElBQU0sR0FBRyxJQUFJLFNBQVMsRUFBRTtBQUMzQixZQUFNLEtBQUssR0FBRyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUE7QUFDNUIsaUJBQVMsQ0FBQyxHQUFHLENBQUMsR0FBRyxNQUFHLEtBQUssRUFBRyxPQUFPLENBQUMsNEJBQTRCLEVBQUUsSUFBSSxDQUFDLENBQUE7QUFDdkUsaUJBQVMsQ0FBQyxHQUFHLENBQUMsR0FBRyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLDRCQUE0QixFQUFFLElBQUksQ0FBQyxDQUFBO09BQzVFOztBQUVELGFBQU8sU0FBUyxDQUFBO0tBQ2pCOzs7V0EzRHVCLDJCQUFDLElBQUksRUFBRSxPQUFPLEVBQUU7QUFDdEMsVUFBTSxFQUFFLEdBQUcsSUFBSSxhQUFhLEVBQUUsQ0FBQTtBQUM5QixRQUFFLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQTtBQUNkLFdBQUssSUFBTSxHQUFHLElBQUksT0FBTyxFQUFFO0FBQ3pCLFlBQU0sS0FBSyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQTtBQUMxQixVQUFFLENBQUMsR0FBRyxDQUFDLEdBQUcsS0FBSyxDQUFBO09BQ2hCO0FBQ0QsYUFBTyxFQUFFLENBQUE7S0FDVjs7O1NBcEJrQixhQUFhOzs7cUJBQWIsYUFBYSIsImZpbGUiOiJmaWxlOi8vL0M6L1VzZXJzL2Nrbmp1Ly5hdG9tL3BhY2thZ2VzL3NjcmlwdC9saWIvc2NyaXB0LW9wdGlvbnMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBiYWJlbFwiXG5cbmltcG9ydCBfIGZyb20gXCJ1bmRlcnNjb3JlXCJcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2NyaXB0T3B0aW9ucyB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMubmFtZSA9IFwiXCJcbiAgICB0aGlzLmRlc2NyaXB0aW9uID0gXCJcIlxuICAgIHRoaXMubGFuZyA9IFwiXCJcbiAgICB0aGlzLndvcmtpbmdEaXJlY3RvcnkgPSBudWxsXG4gICAgdGhpcy5jbWQgPSBudWxsXG4gICAgdGhpcy5jbWRBcmdzID0gW11cbiAgICB0aGlzLmVudiA9IG51bGxcbiAgICB0aGlzLnNjcmlwdEFyZ3MgPSBbXVxuICB9XG5cbiAgc3RhdGljIGNyZWF0ZUZyb21PcHRpb25zKG5hbWUsIG9wdGlvbnMpIHtcbiAgICBjb25zdCBzbyA9IG5ldyBTY3JpcHRPcHRpb25zKClcbiAgICBzby5uYW1lID0gbmFtZVxuICAgIGZvciAoY29uc3Qga2V5IGluIG9wdGlvbnMpIHtcbiAgICAgIGNvbnN0IHZhbHVlID0gb3B0aW9uc1trZXldXG4gICAgICBzb1trZXldID0gdmFsdWVcbiAgICB9XG4gICAgcmV0dXJuIHNvXG4gIH1cblxuICB0b09iamVjdCgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgbmFtZTogdGhpcy5uYW1lLFxuICAgICAgZGVzY3JpcHRpb246IHRoaXMuZGVzY3JpcHRpb24sXG4gICAgICBsYW5nOiB0aGlzLmxhbmcsXG4gICAgICB3b3JraW5nRGlyZWN0b3J5OiB0aGlzLndvcmtpbmdEaXJlY3RvcnksXG4gICAgICBjbWQ6IHRoaXMuY21kLFxuICAgICAgY21kQXJnczogdGhpcy5jbWRBcmdzLFxuICAgICAgZW52OiB0aGlzLmVudixcbiAgICAgIHNjcmlwdEFyZ3M6IHRoaXMuc2NyaXB0QXJncyxcbiAgICB9XG4gIH1cblxuICAvLyBQdWJsaWM6IFNlcmlhbGl6ZXMgdGhlIHVzZXIgc3BlY2lmaWVkIGVudmlyb25tZW50IHZhcnMgYXMgYW4ge29iamVjdH1cbiAgLy8gVE9ETzogU3VwcG9ydCBzaGVsbHMgdGhhdCBhbGxvdyBhIG51bWJlciBhcyB0aGUgZmlyc3QgY2hhcmFjdGVyIGluIGEgdmFyaWFibGU/XG4gIC8vXG4gIC8vIFJldHVybnMgYW4ge09iamVjdH0gcmVwcmVzZW50YXRpb24gb2YgdGhlIHVzZXIgc3BlY2lmaWVkIGVudmlyb25tZW50LlxuICBnZXRFbnYoKSB7XG4gICAgaWYgKCF0aGlzLmVudikge1xuICAgICAgcmV0dXJuIHt9XG4gICAgfVxuXG4gICAgY29uc3QgbWFwcGluZyA9IHt9XG5cbiAgICBmb3IgKGNvbnN0IHBhaXIgb2YgdGhpcy5lbnYudHJpbSgpLnNwbGl0KFwiO1wiKSkge1xuICAgICAgY29uc3QgW2tleSwgdmFsdWVdID0gcGFpci5zcGxpdChcIj1cIiwgMilcbiAgICAgIG1hcHBpbmdba2V5XSA9IGAke3ZhbHVlfWAucmVwbGFjZSgvXCIoKD86W15cIlxcXFxdfFxcXFxcInxcXFxcW15cIl0pKylcIi8sIFwiJDFcIilcbiAgICAgIG1hcHBpbmdba2V5XSA9IG1hcHBpbmdba2V5XS5yZXBsYWNlKC8nKCg/OlteJ1xcXFxdfFxcXFwnfFxcXFxbXiddKSspJy8sIFwiJDFcIilcbiAgICB9XG5cbiAgICByZXR1cm4gbWFwcGluZ1xuICB9XG5cbiAgLy8gUHVibGljOiBNZXJnZXMgdHdvIGVudmlyb25tZW50IG9iamVjdHNcbiAgLy9cbiAgLy8gb3RoZXJFbnYgLSBUaGUge09iamVjdH0gdG8gZXh0ZW5kIHRoZSBwYXJzZWQgZW52aXJvbm1lbnQgYnlcbiAgLy9cbiAgLy8gUmV0dXJucyB0aGUgbWVyZ2VkIGVudmlyb25tZW50IHtPYmplY3R9LlxuICBtZXJnZWRFbnYob3RoZXJFbnYpIHtcbiAgICBjb25zdCBvdGhlckNvcHkgPSBfLmV4dGVuZCh7fSwgb3RoZXJFbnYpXG4gICAgY29uc3QgbWVyZ2VkRW52ID0gXy5leHRlbmQob3RoZXJDb3B5LCB0aGlzLmdldEVudigpKVxuXG4gICAgZm9yIChjb25zdCBrZXkgaW4gbWVyZ2VkRW52KSB7XG4gICAgICBjb25zdCB2YWx1ZSA9IG1lcmdlZEVudltrZXldXG4gICAgICBtZXJnZWRFbnZba2V5XSA9IGAke3ZhbHVlfWAucmVwbGFjZSgvXCIoKD86W15cIlxcXFxdfFxcXFxcInxcXFxcW15cIl0pKylcIi8sIFwiJDFcIilcbiAgICAgIG1lcmdlZEVudltrZXldID0gbWVyZ2VkRW52W2tleV0ucmVwbGFjZSgvJygoPzpbXidcXFxcXXxcXFxcJ3xcXFxcW14nXSkrKScvLCBcIiQxXCIpXG4gICAgfVxuXG4gICAgcmV0dXJuIG1lcmdlZEVudlxuICB9XG59XG4iXX0=