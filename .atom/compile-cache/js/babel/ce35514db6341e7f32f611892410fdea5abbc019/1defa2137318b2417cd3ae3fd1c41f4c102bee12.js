var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _helpers = require('./helpers');

var Intentions = (function () {
  function Intentions() {
    _classCallCheck(this, Intentions);

    this.messages = [];
    this.grammarScopes = ['*'];
  }

  _createClass(Intentions, [{
    key: 'getIntentions',
    value: function getIntentions(_ref) {
      var textEditor = _ref.textEditor;
      var bufferPosition = _ref.bufferPosition;

      var intentions = [];
      var messages = (0, _helpers.filterMessages)(this.messages, textEditor.getPath());

      var _loop = function (message) {
        var hasFixes = message.solutions && message.solutions.length;
        if (!hasFixes) {
          return 'continue';
        }
        var range = (0, _helpers.$range)(message);
        var inRange = range && range.containsPoint(bufferPosition);
        if (!inRange) {
          return 'continue';
        }

        var solutions = [];
        if (message.version === 2 && message.solutions && message.solutions.length) {
          solutions = message.solutions;
        }
        var linterName = message.linterName || 'Linter';

        intentions = intentions.concat(solutions.map(function (solution) {
          return {
            priority: solution.priority ? solution.priority + 200 : 200,
            icon: 'tools',
            title: solution.title || 'Fix ' + linterName + ' issue',
            selected: function selected() {
              (0, _helpers.applySolution)(textEditor, solution);
            }
          };
        }));
      };

      for (var message of messages) {
        var _ret = _loop(message);

        if (_ret === 'continue') continue;
      }
      return intentions;
    }
  }, {
    key: 'update',
    value: function update(messages) {
      this.messages = messages;
    }
  }]);

  return Intentions;
})();

module.exports = Intentions;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZpbGU6Ly8vQzovVXNlcnMvY2tuanUvLmF0b20vcGFja2FnZXMvbGludGVyLXVpLWRlZmF1bHQvbGliL2ludGVudGlvbnMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozt1QkFFc0QsV0FBVzs7SUFHM0QsVUFBVTtBQUlILFdBSlAsVUFBVSxHQUlBOzBCQUpWLFVBQVU7O0FBS1osUUFBSSxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUE7QUFDbEIsUUFBSSxDQUFDLGFBQWEsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFBO0dBQzNCOztlQVBHLFVBQVU7O1dBUUQsdUJBQUMsSUFBc0MsRUFBaUI7VUFBckQsVUFBVSxHQUFaLElBQXNDLENBQXBDLFVBQVU7VUFBRSxjQUFjLEdBQTVCLElBQXNDLENBQXhCLGNBQWM7O0FBQ3hDLFVBQUksVUFBVSxHQUFHLEVBQUUsQ0FBQTtBQUNuQixVQUFNLFFBQVEsR0FBRyw2QkFBZSxJQUFJLENBQUMsUUFBUSxFQUFFLFVBQVUsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFBOzs0QkFFekQsT0FBTztBQUNoQixZQUFNLFFBQVEsR0FBRyxPQUFPLENBQUMsU0FBUyxJQUFJLE9BQU8sQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFBO0FBQzlELFlBQUksQ0FBQyxRQUFRLEVBQUU7QUFDYiw0QkFBUTtTQUNUO0FBQ0QsWUFBTSxLQUFLLEdBQUcscUJBQU8sT0FBTyxDQUFDLENBQUE7QUFDN0IsWUFBTSxPQUFPLEdBQUcsS0FBSyxJQUFJLEtBQUssQ0FBQyxhQUFhLENBQUMsY0FBYyxDQUFDLENBQUE7QUFDNUQsWUFBSSxDQUFDLE9BQU8sRUFBRTtBQUNaLDRCQUFRO1NBQ1Q7O0FBRUQsWUFBSSxTQUF3QixHQUFHLEVBQUUsQ0FBQTtBQUNqQyxZQUFJLE9BQU8sQ0FBQyxPQUFPLEtBQUssQ0FBQyxJQUFJLE9BQU8sQ0FBQyxTQUFTLElBQUksT0FBTyxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUU7QUFDMUUsbUJBQVMsR0FBRyxPQUFPLENBQUMsU0FBUyxDQUFBO1NBQzlCO0FBQ0QsWUFBTSxVQUFVLEdBQUcsT0FBTyxDQUFDLFVBQVUsSUFBSSxRQUFRLENBQUE7O0FBRWpELGtCQUFVLEdBQUcsVUFBVSxDQUFDLE1BQU0sQ0FDNUIsU0FBUyxDQUFDLEdBQUcsQ0FBQyxVQUFBLFFBQVE7aUJBQUs7QUFDekIsb0JBQVEsRUFBRSxRQUFRLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQyxRQUFRLEdBQUcsR0FBRyxHQUFHLEdBQUc7QUFDM0QsZ0JBQUksRUFBRSxPQUFPO0FBQ2IsaUJBQUssRUFBRSxRQUFRLENBQUMsS0FBSyxhQUFXLFVBQVUsV0FBUTtBQUNsRCxvQkFBUSxFQUFBLG9CQUFHO0FBQ1QsMENBQWMsVUFBVSxFQUFFLFFBQVEsQ0FBQyxDQUFBO2FBQ3BDO1dBQ0Y7U0FBQyxDQUFDLENBQ0osQ0FBQTs7O0FBMUJILFdBQUssSUFBTSxPQUFPLElBQUksUUFBUSxFQUFFO3lCQUFyQixPQUFPOztpQ0FRZCxTQUFRO09BbUJYO0FBQ0QsYUFBTyxVQUFVLENBQUE7S0FDbEI7OztXQUNLLGdCQUFDLFFBQThCLEVBQUU7QUFDckMsVUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUE7S0FDekI7OztTQTVDRyxVQUFVOzs7QUErQ2hCLE1BQU0sQ0FBQyxPQUFPLEdBQUcsVUFBVSxDQUFBIiwiZmlsZSI6ImZpbGU6Ly8vQzovVXNlcnMvY2tuanUvLmF0b20vcGFja2FnZXMvbGludGVyLXVpLWRlZmF1bHQvbGliL2ludGVudGlvbnMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBAZmxvdyAqL1xuXG5pbXBvcnQgeyAkcmFuZ2UsIGFwcGx5U29sdXRpb24sIGZpbHRlck1lc3NhZ2VzIH0gZnJvbSAnLi9oZWxwZXJzJ1xuaW1wb3J0IHR5cGUgeyBMaW50ZXJNZXNzYWdlIH0gZnJvbSAnLi90eXBlcydcblxuY2xhc3MgSW50ZW50aW9ucyB7XG4gIG1lc3NhZ2VzOiBBcnJheTxMaW50ZXJNZXNzYWdlPlxuICBncmFtbWFyU2NvcGVzOiBBcnJheTxzdHJpbmc+XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5tZXNzYWdlcyA9IFtdXG4gICAgdGhpcy5ncmFtbWFyU2NvcGVzID0gWycqJ11cbiAgfVxuICBnZXRJbnRlbnRpb25zKHsgdGV4dEVkaXRvciwgYnVmZmVyUG9zaXRpb24gfTogT2JqZWN0KTogQXJyYXk8T2JqZWN0PiB7XG4gICAgbGV0IGludGVudGlvbnMgPSBbXVxuICAgIGNvbnN0IG1lc3NhZ2VzID0gZmlsdGVyTWVzc2FnZXModGhpcy5tZXNzYWdlcywgdGV4dEVkaXRvci5nZXRQYXRoKCkpXG5cbiAgICBmb3IgKGNvbnN0IG1lc3NhZ2Ugb2YgbWVzc2FnZXMpIHtcbiAgICAgIGNvbnN0IGhhc0ZpeGVzID0gbWVzc2FnZS5zb2x1dGlvbnMgJiYgbWVzc2FnZS5zb2x1dGlvbnMubGVuZ3RoXG4gICAgICBpZiAoIWhhc0ZpeGVzKSB7XG4gICAgICAgIGNvbnRpbnVlXG4gICAgICB9XG4gICAgICBjb25zdCByYW5nZSA9ICRyYW5nZShtZXNzYWdlKVxuICAgICAgY29uc3QgaW5SYW5nZSA9IHJhbmdlICYmIHJhbmdlLmNvbnRhaW5zUG9pbnQoYnVmZmVyUG9zaXRpb24pXG4gICAgICBpZiAoIWluUmFuZ2UpIHtcbiAgICAgICAgY29udGludWVcbiAgICAgIH1cblxuICAgICAgbGV0IHNvbHV0aW9uczogQXJyYXk8T2JqZWN0PiA9IFtdXG4gICAgICBpZiAobWVzc2FnZS52ZXJzaW9uID09PSAyICYmIG1lc3NhZ2Uuc29sdXRpb25zICYmIG1lc3NhZ2Uuc29sdXRpb25zLmxlbmd0aCkge1xuICAgICAgICBzb2x1dGlvbnMgPSBtZXNzYWdlLnNvbHV0aW9uc1xuICAgICAgfVxuICAgICAgY29uc3QgbGludGVyTmFtZSA9IG1lc3NhZ2UubGludGVyTmFtZSB8fCAnTGludGVyJ1xuXG4gICAgICBpbnRlbnRpb25zID0gaW50ZW50aW9ucy5jb25jYXQoXG4gICAgICAgIHNvbHV0aW9ucy5tYXAoc29sdXRpb24gPT4gKHtcbiAgICAgICAgICBwcmlvcml0eTogc29sdXRpb24ucHJpb3JpdHkgPyBzb2x1dGlvbi5wcmlvcml0eSArIDIwMCA6IDIwMCxcbiAgICAgICAgICBpY29uOiAndG9vbHMnLFxuICAgICAgICAgIHRpdGxlOiBzb2x1dGlvbi50aXRsZSB8fCBgRml4ICR7bGludGVyTmFtZX0gaXNzdWVgLFxuICAgICAgICAgIHNlbGVjdGVkKCkge1xuICAgICAgICAgICAgYXBwbHlTb2x1dGlvbih0ZXh0RWRpdG9yLCBzb2x1dGlvbilcbiAgICAgICAgICB9LFxuICAgICAgICB9KSksXG4gICAgICApXG4gICAgfVxuICAgIHJldHVybiBpbnRlbnRpb25zXG4gIH1cbiAgdXBkYXRlKG1lc3NhZ2VzOiBBcnJheTxMaW50ZXJNZXNzYWdlPikge1xuICAgIHRoaXMubWVzc2FnZXMgPSBtZXNzYWdlc1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gSW50ZW50aW9uc1xuIl19