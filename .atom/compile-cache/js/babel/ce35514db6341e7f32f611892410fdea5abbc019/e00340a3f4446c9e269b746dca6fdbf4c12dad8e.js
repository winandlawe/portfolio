var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _atom = require('atom');

var _delegate = require('./delegate');

var _delegate2 = _interopRequireDefault(_delegate);

var _message = require('./message');

var _message2 = _interopRequireDefault(_message);

var _helpers = require('../helpers');

var TooltipElement = (function () {
  function TooltipElement(messages, position, textEditor) {
    var _this = this;

    _classCallCheck(this, TooltipElement);

    this.emitter = new _atom.Emitter();
    this.element = document.createElement('div');
    this.messages = messages;
    this.subscriptions = new _atom.CompositeDisposable();

    this.subscriptions.add(this.emitter);
    this.marker = textEditor.markBufferRange([position, position]);
    this.marker.onDidDestroy(function () {
      return _this.emitter.emit('did-destroy');
    });

    var delegate = new _delegate2['default']();
    this.element.id = 'linter-tooltip';
    textEditor.decorateMarker(this.marker, {
      type: 'overlay',
      item: this.element
    });
    this.subscriptions.add(delegate);

    var children = [];
    messages.forEach(function (message) {
      if (message.version === 2) {
        children.push(_react2['default'].createElement(_message2['default'], { key: message.key, delegate: delegate, message: message }));
      }
    });
    _reactDom2['default'].render(_react2['default'].createElement(
      'linter-messages',
      null,
      children
    ), this.element);
  }

  _createClass(TooltipElement, [{
    key: 'isValid',
    value: function isValid(position, messages) {
      if (this.messages.length !== 1 || !messages.has(this.messages[0].key)) {
        return false;
      }
      var range = (0, _helpers.$range)(this.messages[0]);
      return Boolean(range && range.containsPoint(position));
    }
  }, {
    key: 'onDidDestroy',
    value: function onDidDestroy(callback) {
      this.emitter.on('did-destroy', callback);
    }
  }, {
    key: 'dispose',
    value: function dispose() {
      this.emitter.emit('did-destroy');
      this.subscriptions.dispose();
    }
  }]);

  return TooltipElement;
})();

module.exports = TooltipElement;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZpbGU6Ly8vQzovVXNlcnMvY2tuanUvLmF0b20vcGFja2FnZXMvbGludGVyLXVpLWRlZmF1bHQvbGliL3Rvb2x0aXAvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O3FCQUVrQixPQUFPOzs7O3dCQUNKLFdBQVc7Ozs7b0JBQ2EsTUFBTTs7d0JBRzlCLFlBQVk7Ozs7dUJBQ04sV0FBVzs7Ozt1QkFDZixZQUFZOztJQUc3QixjQUFjO0FBT1AsV0FQUCxjQUFjLENBT04sUUFBOEIsRUFBRSxRQUFlLEVBQUUsVUFBc0IsRUFBRTs7OzBCQVBqRixjQUFjOztBQVFoQixRQUFJLENBQUMsT0FBTyxHQUFHLG1CQUFhLENBQUE7QUFDNUIsUUFBSSxDQUFDLE9BQU8sR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFBO0FBQzVDLFFBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFBO0FBQ3hCLFFBQUksQ0FBQyxhQUFhLEdBQUcsK0JBQXlCLENBQUE7O0FBRTlDLFFBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQTtBQUNwQyxRQUFJLENBQUMsTUFBTSxHQUFHLFVBQVUsQ0FBQyxlQUFlLENBQUMsQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDLENBQUMsQ0FBQTtBQUM5RCxRQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQzthQUFNLE1BQUssT0FBTyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUM7S0FBQSxDQUFDLENBQUE7O0FBRWhFLFFBQU0sUUFBUSxHQUFHLDJCQUFjLENBQUE7QUFDL0IsUUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLEdBQUcsZ0JBQWdCLENBQUE7QUFDbEMsY0FBVSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFO0FBQ3JDLFVBQUksRUFBRSxTQUFTO0FBQ2YsVUFBSSxFQUFFLElBQUksQ0FBQyxPQUFPO0tBQ25CLENBQUMsQ0FBQTtBQUNGLFFBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFBOztBQUVoQyxRQUFNLFFBQVEsR0FBRyxFQUFFLENBQUE7QUFDbkIsWUFBUSxDQUFDLE9BQU8sQ0FBQyxVQUFBLE9BQU8sRUFBSTtBQUMxQixVQUFJLE9BQU8sQ0FBQyxPQUFPLEtBQUssQ0FBQyxFQUFFO0FBQ3pCLGdCQUFRLENBQUMsSUFBSSxDQUFDLHlEQUFnQixHQUFHLEVBQUUsT0FBTyxDQUFDLEdBQUcsQUFBQyxFQUFDLFFBQVEsRUFBRSxRQUFRLEFBQUMsRUFBQyxPQUFPLEVBQUUsT0FBTyxBQUFDLEdBQUcsQ0FBQyxDQUFBO09BQzFGO0tBQ0YsQ0FBQyxDQUFBO0FBQ0YsMEJBQVMsTUFBTSxDQUFDOzs7TUFBa0IsUUFBUTtLQUFtQixFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQTtHQUM3RTs7ZUFoQ0csY0FBYzs7V0FpQ1gsaUJBQUMsUUFBZSxFQUFFLFFBQW9DLEVBQVc7QUFDdEUsVUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sS0FBSyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUU7QUFDckUsZUFBTyxLQUFLLENBQUE7T0FDYjtBQUNELFVBQU0sS0FBSyxHQUFHLHFCQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtBQUN0QyxhQUFPLE9BQU8sQ0FBQyxLQUFLLElBQUksS0FBSyxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFBO0tBQ3ZEOzs7V0FDVyxzQkFBQyxRQUFtQixFQUFjO0FBQzVDLFVBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLGFBQWEsRUFBRSxRQUFRLENBQUMsQ0FBQTtLQUN6Qzs7O1dBQ00sbUJBQUc7QUFDUixVQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQTtBQUNoQyxVQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sRUFBRSxDQUFBO0tBQzdCOzs7U0E5Q0csY0FBYzs7O0FBaURwQixNQUFNLENBQUMsT0FBTyxHQUFHLGNBQWMsQ0FBQSIsImZpbGUiOiJmaWxlOi8vL0M6L1VzZXJzL2Nrbmp1Ly5hdG9tL3BhY2thZ2VzL2xpbnRlci11aS1kZWZhdWx0L2xpYi90b29sdGlwL2luZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogQGZsb3cgKi9cblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0J1xuaW1wb3J0IFJlYWN0RE9NIGZyb20gJ3JlYWN0LWRvbSdcbmltcG9ydCB7IENvbXBvc2l0ZURpc3Bvc2FibGUsIEVtaXR0ZXIgfSBmcm9tICdhdG9tJ1xuaW1wb3J0IHR5cGUgeyBEaXNwb3NhYmxlLCBQb2ludCwgVGV4dEVkaXRvciB9IGZyb20gJ2F0b20nXG5cbmltcG9ydCBEZWxlZ2F0ZSBmcm9tICcuL2RlbGVnYXRlJ1xuaW1wb3J0IE1lc3NhZ2VFbGVtZW50IGZyb20gJy4vbWVzc2FnZSdcbmltcG9ydCB7ICRyYW5nZSB9IGZyb20gJy4uL2hlbHBlcnMnXG5pbXBvcnQgdHlwZSB7IExpbnRlck1lc3NhZ2UgfSBmcm9tICcuLi90eXBlcydcblxuY2xhc3MgVG9vbHRpcEVsZW1lbnQge1xuICBtYXJrZXI6IE9iamVjdFxuICBlbGVtZW50OiBIVE1MRWxlbWVudFxuICBlbWl0dGVyOiBFbWl0dGVyXG4gIG1lc3NhZ2VzOiBBcnJheTxMaW50ZXJNZXNzYWdlPlxuICBzdWJzY3JpcHRpb25zOiBDb21wb3NpdGVEaXNwb3NhYmxlXG5cbiAgY29uc3RydWN0b3IobWVzc2FnZXM6IEFycmF5PExpbnRlck1lc3NhZ2U+LCBwb3NpdGlvbjogUG9pbnQsIHRleHRFZGl0b3I6IFRleHRFZGl0b3IpIHtcbiAgICB0aGlzLmVtaXR0ZXIgPSBuZXcgRW1pdHRlcigpXG4gICAgdGhpcy5lbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICB0aGlzLm1lc3NhZ2VzID0gbWVzc2FnZXNcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMgPSBuZXcgQ29tcG9zaXRlRGlzcG9zYWJsZSgpXG5cbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMuYWRkKHRoaXMuZW1pdHRlcilcbiAgICB0aGlzLm1hcmtlciA9IHRleHRFZGl0b3IubWFya0J1ZmZlclJhbmdlKFtwb3NpdGlvbiwgcG9zaXRpb25dKVxuICAgIHRoaXMubWFya2VyLm9uRGlkRGVzdHJveSgoKSA9PiB0aGlzLmVtaXR0ZXIuZW1pdCgnZGlkLWRlc3Ryb3knKSlcblxuICAgIGNvbnN0IGRlbGVnYXRlID0gbmV3IERlbGVnYXRlKClcbiAgICB0aGlzLmVsZW1lbnQuaWQgPSAnbGludGVyLXRvb2x0aXAnXG4gICAgdGV4dEVkaXRvci5kZWNvcmF0ZU1hcmtlcih0aGlzLm1hcmtlciwge1xuICAgICAgdHlwZTogJ292ZXJsYXknLFxuICAgICAgaXRlbTogdGhpcy5lbGVtZW50LFxuICAgIH0pXG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLmFkZChkZWxlZ2F0ZSlcblxuICAgIGNvbnN0IGNoaWxkcmVuID0gW11cbiAgICBtZXNzYWdlcy5mb3JFYWNoKG1lc3NhZ2UgPT4ge1xuICAgICAgaWYgKG1lc3NhZ2UudmVyc2lvbiA9PT0gMikge1xuICAgICAgICBjaGlsZHJlbi5wdXNoKDxNZXNzYWdlRWxlbWVudCBrZXk9e21lc3NhZ2Uua2V5fSBkZWxlZ2F0ZT17ZGVsZWdhdGV9IG1lc3NhZ2U9e21lc3NhZ2V9IC8+KVxuICAgICAgfVxuICAgIH0pXG4gICAgUmVhY3RET00ucmVuZGVyKDxsaW50ZXItbWVzc2FnZXM+e2NoaWxkcmVufTwvbGludGVyLW1lc3NhZ2VzPiwgdGhpcy5lbGVtZW50KVxuICB9XG4gIGlzVmFsaWQocG9zaXRpb246IFBvaW50LCBtZXNzYWdlczogTWFwPHN0cmluZywgTGludGVyTWVzc2FnZT4pOiBib29sZWFuIHtcbiAgICBpZiAodGhpcy5tZXNzYWdlcy5sZW5ndGggIT09IDEgfHwgIW1lc3NhZ2VzLmhhcyh0aGlzLm1lc3NhZ2VzWzBdLmtleSkpIHtcbiAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cbiAgICBjb25zdCByYW5nZSA9ICRyYW5nZSh0aGlzLm1lc3NhZ2VzWzBdKVxuICAgIHJldHVybiBCb29sZWFuKHJhbmdlICYmIHJhbmdlLmNvbnRhaW5zUG9pbnQocG9zaXRpb24pKVxuICB9XG4gIG9uRGlkRGVzdHJveShjYWxsYmFjazogKCkgPT4gYW55KTogRGlzcG9zYWJsZSB7XG4gICAgdGhpcy5lbWl0dGVyLm9uKCdkaWQtZGVzdHJveScsIGNhbGxiYWNrKVxuICB9XG4gIGRpc3Bvc2UoKSB7XG4gICAgdGhpcy5lbWl0dGVyLmVtaXQoJ2RpZC1kZXN0cm95JylcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMuZGlzcG9zZSgpXG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBUb29sdGlwRWxlbWVudFxuIl19