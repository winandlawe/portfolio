Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _atom = require('atom');

var _atomSpacePenViewsPlus = require('atom-space-pen-views-plus');

'use babel';

var ScriptInputView = (function (_View) {
  _inherits(ScriptInputView, _View);

  function ScriptInputView() {
    _classCallCheck(this, ScriptInputView);

    _get(Object.getPrototypeOf(ScriptInputView.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(ScriptInputView, [{
    key: 'initialize',
    value: function initialize(options) {
      var _this = this;

      this.options = options;
      this.emitter = new _atom.Emitter();

      this.panel = atom.workspace.addModalPanel({ item: this });
      this.panel.hide();

      this.editor = this.find('atom-text-editor').get(0).getModel();

      // set default text
      if (this.options['default']) {
        this.editor.setText(this.options['default']);
        this.editor.selectAll();
      }

      // caption text
      if (this.options.caption) {
        this.find('.caption').text(this.options.caption);
      }

      this.find('atom-text-editor').on('keydown', function (e) {
        if (e.keyCode === 27) {
          e.stopPropagation();
          _this.emitter.emit('on-cancel');
          _this.hide();
        }
      });

      this.subscriptions = new _atom.CompositeDisposable();
      this.subscriptions.add(atom.commands.add('atom-workspace', {
        'core:confirm': function coreConfirm() {
          _this.emitter.emit('on-confirm', _this.editor.getText().trim());
          _this.hide();
        }
      }));
    }
  }, {
    key: 'onConfirm',
    value: function onConfirm(callback) {
      return this.emitter.on('on-confirm', callback);
    }
  }, {
    key: 'onCancel',
    value: function onCancel(callback) {
      return this.emitter.on('on-cancel', callback);
    }
  }, {
    key: 'focus',
    value: function focus() {
      this.find('atom-text-editor').focus();
    }
  }, {
    key: 'show',
    value: function show() {
      this.panel.show();
      this.focus();
    }
  }, {
    key: 'hide',
    value: function hide() {
      this.panel.hide();
      this.destroy();
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      if (this.subscriptions) this.subscriptions.dispose();
      this.panel.destroy();
    }
  }], [{
    key: 'content',
    value: function content() {
      var _this2 = this;

      this.div({ 'class': 'script-input-view' }, function () {
        _this2.div({ 'class': 'caption' }, '');
        _this2.tag('atom-text-editor', { mini: '', 'class': 'editor mini' });
      });
    }
  }]);

  return ScriptInputView;
})(_atomSpacePenViewsPlus.View);

exports['default'] = ScriptInputView;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZpbGU6Ly8vQzovVXNlcnMvY2tuanUvLmF0b20vcGFja2FnZXMvc2NyaXB0L2xpYi9zY3JpcHQtaW5wdXQtdmlldy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7b0JBRTZDLE1BQU07O3FDQUM5QiwyQkFBMkI7O0FBSGhELFdBQVcsQ0FBQzs7SUFLUyxlQUFlO1lBQWYsZUFBZTs7V0FBZixlQUFlOzBCQUFmLGVBQWU7OytCQUFmLGVBQWU7OztlQUFmLGVBQWU7O1dBUXhCLG9CQUFDLE9BQU8sRUFBRTs7O0FBQ2xCLFVBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO0FBQ3ZCLFVBQUksQ0FBQyxPQUFPLEdBQUcsbUJBQWEsQ0FBQzs7QUFFN0IsVUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLGFBQWEsQ0FBQyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO0FBQzFELFVBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUM7O0FBRWxCLFVBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQzs7O0FBRzlELFVBQUksSUFBSSxDQUFDLE9BQU8sV0FBUSxFQUFFO0FBQ3hCLFlBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxPQUFPLFdBQVEsQ0FBQyxDQUFDO0FBQzFDLFlBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxFQUFFLENBQUM7T0FDekI7OztBQUdELFVBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUU7QUFDeEIsWUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztPQUNsRDs7QUFFRCxVQUFJLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUMsRUFBRSxDQUFDLFNBQVMsRUFBRSxVQUFDLENBQUMsRUFBSztBQUNqRCxZQUFJLENBQUMsQ0FBQyxPQUFPLEtBQUssRUFBRSxFQUFFO0FBQ3BCLFdBQUMsQ0FBQyxlQUFlLEVBQUUsQ0FBQztBQUNwQixnQkFBSyxPQUFPLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0FBQy9CLGdCQUFLLElBQUksRUFBRSxDQUFDO1NBQ2I7T0FDRixDQUFDLENBQUM7O0FBRUgsVUFBSSxDQUFDLGFBQWEsR0FBRywrQkFBeUIsQ0FBQztBQUMvQyxVQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsRUFBRTtBQUN6RCxzQkFBYyxFQUFFLHVCQUFNO0FBQ3BCLGdCQUFLLE9BQU8sQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLE1BQUssTUFBTSxDQUFDLE9BQU8sRUFBRSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7QUFDOUQsZ0JBQUssSUFBSSxFQUFFLENBQUM7U0FDYjtPQUNGLENBQUMsQ0FBQyxDQUFDO0tBQ0w7OztXQUVRLG1CQUFDLFFBQVEsRUFBRTtBQUNsQixhQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxRQUFRLENBQUMsQ0FBQztLQUNoRDs7O1dBRU8sa0JBQUMsUUFBUSxFQUFFO0FBQ2pCLGFBQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsV0FBVyxFQUFFLFFBQVEsQ0FBQyxDQUFDO0tBQy9DOzs7V0FFSSxpQkFBRztBQUNOLFVBQUksQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztLQUN2Qzs7O1dBRUcsZ0JBQUc7QUFDTCxVQUFJLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDO0FBQ2xCLFVBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztLQUNkOzs7V0FFRyxnQkFBRztBQUNMLFVBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUM7QUFDbEIsVUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO0tBQ2hCOzs7V0FFTSxtQkFBRztBQUNSLFVBQUksSUFBSSxDQUFDLGFBQWEsRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sRUFBRSxDQUFDO0FBQ3JELFVBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLENBQUM7S0FDdEI7OztXQXJFYSxtQkFBRzs7O0FBQ2YsVUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLFNBQU8sbUJBQW1CLEVBQUUsRUFBRSxZQUFNO0FBQzdDLGVBQUssR0FBRyxDQUFDLEVBQUUsU0FBTyxTQUFTLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztBQUNuQyxlQUFLLEdBQUcsQ0FBQyxrQkFBa0IsRUFBRSxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUUsU0FBTyxhQUFhLEVBQUUsQ0FBQyxDQUFDO09BQ2xFLENBQUMsQ0FBQztLQUNKOzs7U0FOa0IsZUFBZTs7O3FCQUFmLGVBQWUiLCJmaWxlIjoiZmlsZTovLy9DOi9Vc2Vycy9ja25qdS8uYXRvbS9wYWNrYWdlcy9zY3JpcHQvbGliL3NjcmlwdC1pbnB1dC12aWV3LmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBiYWJlbCc7XG5cbmltcG9ydCB7IEVtaXR0ZXIsIENvbXBvc2l0ZURpc3Bvc2FibGUgfSBmcm9tICdhdG9tJztcbmltcG9ydCB7IFZpZXcgfSBmcm9tICdhdG9tLXNwYWNlLXBlbi12aWV3cy1wbHVzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2NyaXB0SW5wdXRWaWV3IGV4dGVuZHMgVmlldyB7XG4gIHN0YXRpYyBjb250ZW50KCkge1xuICAgIHRoaXMuZGl2KHsgY2xhc3M6ICdzY3JpcHQtaW5wdXQtdmlldycgfSwgKCkgPT4ge1xuICAgICAgdGhpcy5kaXYoeyBjbGFzczogJ2NhcHRpb24nIH0sICcnKTtcbiAgICAgIHRoaXMudGFnKCdhdG9tLXRleHQtZWRpdG9yJywgeyBtaW5pOiAnJywgY2xhc3M6ICdlZGl0b3IgbWluaScgfSk7XG4gICAgfSk7XG4gIH1cblxuICBpbml0aWFsaXplKG9wdGlvbnMpIHtcbiAgICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zO1xuICAgIHRoaXMuZW1pdHRlciA9IG5ldyBFbWl0dGVyKCk7XG5cbiAgICB0aGlzLnBhbmVsID0gYXRvbS53b3Jrc3BhY2UuYWRkTW9kYWxQYW5lbCh7IGl0ZW06IHRoaXMgfSk7XG4gICAgdGhpcy5wYW5lbC5oaWRlKCk7XG5cbiAgICB0aGlzLmVkaXRvciA9IHRoaXMuZmluZCgnYXRvbS10ZXh0LWVkaXRvcicpLmdldCgwKS5nZXRNb2RlbCgpO1xuXG4gICAgLy8gc2V0IGRlZmF1bHQgdGV4dFxuICAgIGlmICh0aGlzLm9wdGlvbnMuZGVmYXVsdCkge1xuICAgICAgdGhpcy5lZGl0b3Iuc2V0VGV4dCh0aGlzLm9wdGlvbnMuZGVmYXVsdCk7XG4gICAgICB0aGlzLmVkaXRvci5zZWxlY3RBbGwoKTtcbiAgICB9XG5cbiAgICAvLyBjYXB0aW9uIHRleHRcbiAgICBpZiAodGhpcy5vcHRpb25zLmNhcHRpb24pIHtcbiAgICAgIHRoaXMuZmluZCgnLmNhcHRpb24nKS50ZXh0KHRoaXMub3B0aW9ucy5jYXB0aW9uKTtcbiAgICB9XG5cbiAgICB0aGlzLmZpbmQoJ2F0b20tdGV4dC1lZGl0b3InKS5vbigna2V5ZG93bicsIChlKSA9PiB7XG4gICAgICBpZiAoZS5rZXlDb2RlID09PSAyNykge1xuICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICB0aGlzLmVtaXR0ZXIuZW1pdCgnb24tY2FuY2VsJyk7XG4gICAgICAgIHRoaXMuaGlkZSgpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgdGhpcy5zdWJzY3JpcHRpb25zID0gbmV3IENvbXBvc2l0ZURpc3Bvc2FibGUoKTtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMuYWRkKGF0b20uY29tbWFuZHMuYWRkKCdhdG9tLXdvcmtzcGFjZScsIHtcbiAgICAgICdjb3JlOmNvbmZpcm0nOiAoKSA9PiB7XG4gICAgICAgIHRoaXMuZW1pdHRlci5lbWl0KCdvbi1jb25maXJtJywgdGhpcy5lZGl0b3IuZ2V0VGV4dCgpLnRyaW0oKSk7XG4gICAgICAgIHRoaXMuaGlkZSgpO1xuICAgICAgfSxcbiAgICB9KSk7XG4gIH1cblxuICBvbkNvbmZpcm0oY2FsbGJhY2spIHtcbiAgICByZXR1cm4gdGhpcy5lbWl0dGVyLm9uKCdvbi1jb25maXJtJywgY2FsbGJhY2spO1xuICB9XG5cbiAgb25DYW5jZWwoY2FsbGJhY2spIHtcbiAgICByZXR1cm4gdGhpcy5lbWl0dGVyLm9uKCdvbi1jYW5jZWwnLCBjYWxsYmFjayk7XG4gIH1cblxuICBmb2N1cygpIHtcbiAgICB0aGlzLmZpbmQoJ2F0b20tdGV4dC1lZGl0b3InKS5mb2N1cygpO1xuICB9XG5cbiAgc2hvdygpIHtcbiAgICB0aGlzLnBhbmVsLnNob3coKTtcbiAgICB0aGlzLmZvY3VzKCk7XG4gIH1cblxuICBoaWRlKCkge1xuICAgIHRoaXMucGFuZWwuaGlkZSgpO1xuICAgIHRoaXMuZGVzdHJveSgpO1xuICB9XG5cbiAgZGVzdHJveSgpIHtcbiAgICBpZiAodGhpcy5zdWJzY3JpcHRpb25zKSB0aGlzLnN1YnNjcmlwdGlvbnMuZGlzcG9zZSgpO1xuICAgIHRoaXMucGFuZWwuZGVzdHJveSgpO1xuICB9XG59XG4iXX0=