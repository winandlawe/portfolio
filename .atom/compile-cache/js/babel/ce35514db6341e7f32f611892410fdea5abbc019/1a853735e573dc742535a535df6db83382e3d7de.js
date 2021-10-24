Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _atom = require('atom');

var _fuzzaldrin = require('fuzzaldrin');

// import API from './modules/api'

var _modulesComponent = require('./modules/component');

var _modulesComponent2 = _interopRequireDefault(_modulesComponent);

'use babel';

var Provider = (function (_Disposable) {
  _inherits(Provider, _Disposable);

  function Provider() {
    _classCallCheck(this, Provider);

    _get(Object.getPrototypeOf(Provider.prototype), 'constructor', this).call(this);
    this.selector = '.text.html, .source.js, .source.ts';
    this.completions = {};
  }

  _createClass(Provider, [{
    key: 'getSuggestions',
    value: function getSuggestions(request) {
      var _this = this;

      var prefix = request.prefix;
      var bufferPosition = request.bufferPosition;
      var editor = request.editor;

      var scopes = request.scopeDescriptor.getScopesArray();
      var line = editor.getTextInRange([[bufferPosition.row, 0], bufferPosition]);

      return new Promise(function (resolve) {
        var suggestions = [];

        // console.log(scopes)
        if (_modulesComponent2['default'].isAttributeValue(scopes)) {
          // console.log('COMPONENT.isAttributeValue')
          // suggestions = COMPONENT.getAttributeValueCompletions(line)
        } else if (_modulesComponent2['default'].isTag(scopes, line)) {
            suggestions = _modulesComponent2['default'].getTagNameCompletions();
          } else if (_modulesComponent2['default'].isAttribute(prefix, scopes)) {
            suggestions = _modulesComponent2['default'].getAttributeNameCompletions(editor, bufferPosition);
          } else {
            // suggestions = API.getCompletions(line)
            // console.log('other')
          }

        resolve(_this.cenas(prefix, suggestions));
      });
    }
  }, {
    key: 'cenas',
    value: function cenas(prefix, suggestions) {
      return (0, _fuzzaldrin.filter)(suggestions, prefix, {
        key: 'displayText'
      });
    }
  }, {
    key: 'onDidInsertSuggestion',
    value: function onDidInsertSuggestion(_ref) {
      var editor = _ref.editor;
      var suggestion = _ref.suggestion;

      // console.log(suggestion)
      if (suggestion.rightLabelHTML === 'vue.js') {
        setTimeout(function () {
          atom.commands.dispatch(atom.views.getView(editor), 'autocomplete-plus:activate', { activatedManually: false });
        }, 1);
      }
    }

    // loadCompletions () {
    //   this.completions = {}
    //   fs.readFile(path.resolve(__dirname, '..', 'completion.json'), (error, content) => {
    //     if (error) {
    //       this.completions = JSON.parse(content)
    //     }
    //   })
    // }
  }]);

  return Provider;
})(_atom.Disposable);

exports['default'] = Provider;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZpbGU6Ly8vQzovVXNlcnMvY2tuanUvLmF0b20vcGFja2FnZXMvdnVlLWF1dG9jb21wbGV0ZS9saWIvcHJvdmlkZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7b0JBRTJCLE1BQU07OzBCQUNWLFlBQVk7Ozs7Z0NBRWIscUJBQXFCOzs7O0FBTDNDLFdBQVcsQ0FBQTs7SUFPVSxRQUFRO1lBQVIsUUFBUTs7QUFDZixXQURPLFFBQVEsR0FDWjswQkFESSxRQUFROztBQUV6QiwrQkFGaUIsUUFBUSw2Q0FFbEI7QUFDUCxRQUFJLENBQUMsUUFBUSxHQUFHLG9DQUFvQyxDQUFBO0FBQ3BELFFBQUksQ0FBQyxXQUFXLEdBQUcsRUFBRSxDQUFBO0dBQ3RCOztlQUxrQixRQUFROztXQU9aLHdCQUFDLE9BQU8sRUFBRTs7O1VBQ2YsTUFBTSxHQUE2QixPQUFPLENBQTFDLE1BQU07VUFBRSxjQUFjLEdBQWEsT0FBTyxDQUFsQyxjQUFjO1VBQUUsTUFBTSxHQUFLLE9BQU8sQ0FBbEIsTUFBTTs7QUFDdEMsVUFBTSxNQUFNLEdBQUcsT0FBTyxDQUFDLGVBQWUsQ0FBQyxjQUFjLEVBQUUsQ0FBQTtBQUN2RCxVQUFNLElBQUksR0FBRyxNQUFNLENBQUMsY0FBYyxDQUFDLENBQUUsQ0FBQyxjQUFjLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxFQUFFLGNBQWMsQ0FBRSxDQUFDLENBQUE7O0FBRS9FLGFBQU8sSUFBSSxPQUFPLENBQUMsVUFBQyxPQUFPLEVBQUs7QUFDOUIsWUFBSSxXQUFXLEdBQUcsRUFBRSxDQUFBOzs7QUFHcEIsWUFBSSw4QkFBVSxnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsRUFBRTs7O1NBR3ZDLE1BQU0sSUFBSSw4QkFBVSxLQUFLLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxFQUFFO0FBQ3hDLHVCQUFXLEdBQUcsOEJBQVUscUJBQXFCLEVBQUUsQ0FBQTtXQUNoRCxNQUFNLElBQUksOEJBQVUsV0FBVyxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsRUFBRTtBQUNoRCx1QkFBVyxHQUFHLDhCQUFVLDJCQUEyQixDQUFDLE1BQU0sRUFBRSxjQUFjLENBQUMsQ0FBQTtXQUM1RSxNQUFNOzs7V0FHTjs7QUFFRCxlQUFPLENBQUMsTUFBSyxLQUFLLENBQUMsTUFBTSxFQUFFLFdBQVcsQ0FBQyxDQUFDLENBQUE7T0FDekMsQ0FBQyxDQUFBO0tBQ0g7OztXQUVLLGVBQUMsTUFBTSxFQUFFLFdBQVcsRUFBRTtBQUMxQixhQUFPLHdCQUFPLFdBQVcsRUFBRSxNQUFNLEVBQUU7QUFDakMsV0FBRyxFQUFFLGFBQWE7T0FDbkIsQ0FBQyxDQUFBO0tBQ0g7OztXQUVxQiwrQkFBQyxJQUFzQixFQUFFO1VBQXRCLE1BQU0sR0FBUixJQUFzQixDQUFwQixNQUFNO1VBQUUsVUFBVSxHQUFwQixJQUFzQixDQUFaLFVBQVU7OztBQUV6QyxVQUFJLFVBQVUsQ0FBQyxjQUFjLEtBQUssUUFBUSxFQUFFO0FBQzFDLGtCQUFVLENBQUMsWUFBWTtBQUNyQixjQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsRUFBRSw0QkFBNEIsRUFBRSxFQUFFLGlCQUFpQixFQUFFLEtBQUssRUFBRSxDQUFDLENBQUE7U0FDL0csRUFBRSxDQUFDLENBQUMsQ0FBQTtPQUNOO0tBQ0Y7Ozs7Ozs7Ozs7OztTQTdDa0IsUUFBUTs7O3FCQUFSLFFBQVEiLCJmaWxlIjoiZmlsZTovLy9DOi9Vc2Vycy9ja25qdS8uYXRvbS9wYWNrYWdlcy92dWUtYXV0b2NvbXBsZXRlL2xpYi9wcm92aWRlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2UgYmFiZWwnXG5cbmltcG9ydCB7IERpc3Bvc2FibGUgfSBmcm9tICdhdG9tJ1xuaW1wb3J0IHsgZmlsdGVyIH0gZnJvbSAnZnV6emFsZHJpbidcbi8vIGltcG9ydCBBUEkgZnJvbSAnLi9tb2R1bGVzL2FwaSdcbmltcG9ydCBDT01QT05FTlQgZnJvbSAnLi9tb2R1bGVzL2NvbXBvbmVudCdcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUHJvdmlkZXIgZXh0ZW5kcyBEaXNwb3NhYmxlIHtcbiAgY29uc3RydWN0b3IgKCkge1xuICAgIHN1cGVyKClcbiAgICB0aGlzLnNlbGVjdG9yID0gJy50ZXh0Lmh0bWwsIC5zb3VyY2UuanMsIC5zb3VyY2UudHMnXG4gICAgdGhpcy5jb21wbGV0aW9ucyA9IHt9XG4gIH1cblxuICBnZXRTdWdnZXN0aW9ucyAocmVxdWVzdCkge1xuICAgIGNvbnN0IHsgcHJlZml4LCBidWZmZXJQb3NpdGlvbiwgZWRpdG9yIH0gPSByZXF1ZXN0XG4gICAgY29uc3Qgc2NvcGVzID0gcmVxdWVzdC5zY29wZURlc2NyaXB0b3IuZ2V0U2NvcGVzQXJyYXkoKVxuICAgIGNvbnN0IGxpbmUgPSBlZGl0b3IuZ2V0VGV4dEluUmFuZ2UoWyBbYnVmZmVyUG9zaXRpb24ucm93LCAwXSwgYnVmZmVyUG9zaXRpb24gXSlcblxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgICAgbGV0IHN1Z2dlc3Rpb25zID0gW11cblxuICAgICAgLy8gY29uc29sZS5sb2coc2NvcGVzKVxuICAgICAgaWYgKENPTVBPTkVOVC5pc0F0dHJpYnV0ZVZhbHVlKHNjb3BlcykpIHtcbiAgICAgICAgLy8gY29uc29sZS5sb2coJ0NPTVBPTkVOVC5pc0F0dHJpYnV0ZVZhbHVlJylcbiAgICAgICAgLy8gc3VnZ2VzdGlvbnMgPSBDT01QT05FTlQuZ2V0QXR0cmlidXRlVmFsdWVDb21wbGV0aW9ucyhsaW5lKVxuICAgICAgfSBlbHNlIGlmIChDT01QT05FTlQuaXNUYWcoc2NvcGVzLCBsaW5lKSkge1xuICAgICAgICBzdWdnZXN0aW9ucyA9IENPTVBPTkVOVC5nZXRUYWdOYW1lQ29tcGxldGlvbnMoKVxuICAgICAgfSBlbHNlIGlmIChDT01QT05FTlQuaXNBdHRyaWJ1dGUocHJlZml4LCBzY29wZXMpKSB7XG4gICAgICAgIHN1Z2dlc3Rpb25zID0gQ09NUE9ORU5ULmdldEF0dHJpYnV0ZU5hbWVDb21wbGV0aW9ucyhlZGl0b3IsIGJ1ZmZlclBvc2l0aW9uKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gc3VnZ2VzdGlvbnMgPSBBUEkuZ2V0Q29tcGxldGlvbnMobGluZSlcbiAgICAgICAgLy8gY29uc29sZS5sb2coJ290aGVyJylcbiAgICAgIH1cblxuICAgICAgcmVzb2x2ZSh0aGlzLmNlbmFzKHByZWZpeCwgc3VnZ2VzdGlvbnMpKVxuICAgIH0pXG4gIH1cblxuICBjZW5hcyAocHJlZml4LCBzdWdnZXN0aW9ucykge1xuICAgIHJldHVybiBmaWx0ZXIoc3VnZ2VzdGlvbnMsIHByZWZpeCwge1xuICAgICAga2V5OiAnZGlzcGxheVRleHQnXG4gICAgfSlcbiAgfVxuXG4gIG9uRGlkSW5zZXJ0U3VnZ2VzdGlvbiAoeyBlZGl0b3IsIHN1Z2dlc3Rpb24gfSkge1xuICAgIC8vIGNvbnNvbGUubG9nKHN1Z2dlc3Rpb24pXG4gICAgaWYgKHN1Z2dlc3Rpb24ucmlnaHRMYWJlbEhUTUwgPT09ICd2dWUuanMnKSB7XG4gICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgYXRvbS5jb21tYW5kcy5kaXNwYXRjaChhdG9tLnZpZXdzLmdldFZpZXcoZWRpdG9yKSwgJ2F1dG9jb21wbGV0ZS1wbHVzOmFjdGl2YXRlJywgeyBhY3RpdmF0ZWRNYW51YWxseTogZmFsc2UgfSlcbiAgICAgIH0sIDEpXG4gICAgfVxuICB9XG5cbiAgLy8gbG9hZENvbXBsZXRpb25zICgpIHtcbiAgLy8gICB0aGlzLmNvbXBsZXRpb25zID0ge31cbiAgLy8gICBmcy5yZWFkRmlsZShwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnLi4nLCAnY29tcGxldGlvbi5qc29uJyksIChlcnJvciwgY29udGVudCkgPT4ge1xuICAvLyAgICAgaWYgKGVycm9yKSB7XG4gIC8vICAgICAgIHRoaXMuY29tcGxldGlvbnMgPSBKU09OLnBhcnNlKGNvbnRlbnQpXG4gIC8vICAgICB9XG4gIC8vICAgfSlcbiAgLy8gfVxufVxuIl19