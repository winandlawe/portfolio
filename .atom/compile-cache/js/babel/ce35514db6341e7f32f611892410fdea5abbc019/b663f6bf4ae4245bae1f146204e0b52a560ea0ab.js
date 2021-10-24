Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _atom = require('atom');

var _provider = require('./provider');

var _provider2 = _interopRequireDefault(_provider);

'use babel';

var VueAutocomplete = (function () {
  function VueAutocomplete() {
    _classCallCheck(this, VueAutocomplete);

    this.provider = null;
    this.subscriptions = null;
  }

  _createClass(VueAutocomplete, [{
    key: 'activate',
    value: function activate() {
      this.subscriptions = new _atom.CompositeDisposable();
    }
  }, {
    key: 'deactivate',
    value: function deactivate() {
      if (this.subscriptions) {
        this.subscriptions.dispose();
      }
      this.provider = null;
      this.subscriptions = null;
    }
  }, {
    key: 'provide',
    value: function provide() {
      return this.getProvider();
    }
  }, {
    key: 'getProvider',
    value: function getProvider() {
      if (this.provider) {
        return this.provider;
      }
      this.provider = new _provider2['default']();
      // this.provider.loadCompletions()
      this.subscriptions.add(this.provider);

      return this.provider;
    }
  }]);

  return VueAutocomplete;
})();

exports['default'] = new VueAutocomplete();
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZpbGU6Ly8vQzovVXNlcnMvY2tuanUvLmF0b20vcGFja2FnZXMvdnVlLWF1dG9jb21wbGV0ZS9saWIvbWFpbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O29CQUVvQyxNQUFNOzt3QkFDckIsWUFBWTs7OztBQUhqQyxXQUFXLENBQUE7O0lBS0wsZUFBZTtBQUNQLFdBRFIsZUFBZSxHQUNKOzBCQURYLGVBQWU7O0FBRWpCLFFBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFBO0FBQ3BCLFFBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFBO0dBQzFCOztlQUpHLGVBQWU7O1dBTVYsb0JBQUc7QUFDVixVQUFJLENBQUMsYUFBYSxHQUFHLCtCQUF5QixDQUFBO0tBQy9DOzs7V0FFVSxzQkFBRztBQUNaLFVBQUksSUFBSSxDQUFDLGFBQWEsRUFBRTtBQUN0QixZQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sRUFBRSxDQUFBO09BQzdCO0FBQ0QsVUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUE7QUFDcEIsVUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUE7S0FDMUI7OztXQUVPLG1CQUFHO0FBQ1QsYUFBTyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUE7S0FDMUI7OztXQUVXLHVCQUFHO0FBQ2IsVUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFO0FBQ2pCLGVBQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQTtPQUNyQjtBQUNELFVBQUksQ0FBQyxRQUFRLEdBQUcsMkJBQWMsQ0FBQTs7QUFFOUIsVUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFBOztBQUVyQyxhQUFPLElBQUksQ0FBQyxRQUFRLENBQUE7S0FDckI7OztTQS9CRyxlQUFlOzs7cUJBa0NOLElBQUksZUFBZSxFQUFFIiwiZmlsZSI6ImZpbGU6Ly8vQzovVXNlcnMvY2tuanUvLmF0b20vcGFja2FnZXMvdnVlLWF1dG9jb21wbGV0ZS9saWIvbWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2UgYmFiZWwnXG5cbmltcG9ydCB7IENvbXBvc2l0ZURpc3Bvc2FibGUgfSBmcm9tICdhdG9tJ1xuaW1wb3J0IFByb3ZpZGVyIGZyb20gJy4vcHJvdmlkZXInXG5cbmNsYXNzIFZ1ZUF1dG9jb21wbGV0ZSB7XG4gIGNvbnN0cnVjdG9yICgpIHtcbiAgICB0aGlzLnByb3ZpZGVyID0gbnVsbFxuICAgIHRoaXMuc3Vic2NyaXB0aW9ucyA9IG51bGxcbiAgfVxuXG4gIGFjdGl2YXRlICgpIHtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMgPSBuZXcgQ29tcG9zaXRlRGlzcG9zYWJsZSgpXG4gIH1cblxuICBkZWFjdGl2YXRlICgpIHtcbiAgICBpZiAodGhpcy5zdWJzY3JpcHRpb25zKSB7XG4gICAgICB0aGlzLnN1YnNjcmlwdGlvbnMuZGlzcG9zZSgpXG4gICAgfVxuICAgIHRoaXMucHJvdmlkZXIgPSBudWxsXG4gICAgdGhpcy5zdWJzY3JpcHRpb25zID0gbnVsbFxuICB9XG5cbiAgcHJvdmlkZSAoKSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0UHJvdmlkZXIoKVxuICB9XG5cbiAgZ2V0UHJvdmlkZXIgKCkge1xuICAgIGlmICh0aGlzLnByb3ZpZGVyKSB7XG4gICAgICByZXR1cm4gdGhpcy5wcm92aWRlclxuICAgIH1cbiAgICB0aGlzLnByb3ZpZGVyID0gbmV3IFByb3ZpZGVyKClcbiAgICAvLyB0aGlzLnByb3ZpZGVyLmxvYWRDb21wbGV0aW9ucygpXG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLmFkZCh0aGlzLnByb3ZpZGVyKVxuXG4gICAgcmV0dXJuIHRoaXMucHJvdmlkZXJcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBuZXcgVnVlQXV0b2NvbXBsZXRlKClcbiJdfQ==