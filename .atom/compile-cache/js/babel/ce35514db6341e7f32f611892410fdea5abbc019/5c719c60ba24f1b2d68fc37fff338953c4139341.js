var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _sbReactTable = require('sb-react-table');

var _sbReactTable2 = _interopRequireDefault(_sbReactTable);

var _helpers = require('../helpers');

var PanelComponent = (function (_React$Component) {
  _inherits(PanelComponent, _React$Component);

  _createClass(PanelComponent, null, [{
    key: 'renderRowColumn',
    value: function renderRowColumn(row, column) {
      var range = (0, _helpers.$range)(row);

      switch (column) {
        case 'file':
          return (0, _helpers.getPathOfMessage)(row);
        case 'line':
          return range ? range.start.row + 1 + ':' + (range.start.column + 1) : '';
        case 'excerpt':
          return row.excerpt;
        case 'severity':
          return _helpers.severityNames[row.severity];
        default:
          return row[column];
      }
    }
  }]);

  function PanelComponent(props, context) {
    _classCallCheck(this, PanelComponent);

    _get(Object.getPrototypeOf(PanelComponent.prototype), 'constructor', this).call(this, props, context);

    this.onClick = function (e, row) {
      if (e.target.tagName === 'A') {
        return;
      }
      if (process.platform === 'darwin' ? e.metaKey : e.ctrlKey) {
        if (e.shiftKey) {
          (0, _helpers.openExternally)(row);
        } else {
          (0, _helpers.visitMessage)(row, true);
        }
      } else {
        (0, _helpers.visitMessage)(row);
      }
    };

    this.state = {
      messages: this.props.delegate.filteredMessages
    };
  }

  _createClass(PanelComponent, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this = this;

      this.props.delegate.onDidChangeMessages(function (messages) {
        _this.setState({ messages: messages });
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var delegate = this.props.delegate;

      var columns = [{ key: 'severity', label: 'Severity', sortable: true }, { key: 'linterName', label: 'Provider', sortable: true }, { key: 'excerpt', label: 'Description', onClick: this.onClick }, { key: 'line', label: 'Line', sortable: true, onClick: this.onClick }];
      if (delegate.panelRepresents === 'Entire Project') {
        columns.push({
          key: 'file',
          label: 'File',
          sortable: true,
          onClick: this.onClick
        });
      }

      var customStyle = { overflowY: 'scroll', height: '100%' };

      return _react2['default'].createElement(
        'div',
        { id: 'linter-panel', tabIndex: '-1', style: customStyle },
        _react2['default'].createElement(_sbReactTable2['default'], {
          rows: this.state.messages,
          columns: columns,
          initialSort: [{ column: 'severity', type: 'desc' }, { column: 'file', type: 'asc' }, { column: 'line', type: 'asc' }],
          sort: _helpers.sortMessages,
          rowKey: function (i) {
            return i.key;
          },
          renderHeaderColumn: function (i) {
            return i.label;
          },
          renderBodyColumn: PanelComponent.renderRowColumn,
          style: { width: '100%' },
          className: 'linter'
        })
      );
    }
  }]);

  return PanelComponent;
})(_react2['default'].Component);

module.exports = PanelComponent;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZpbGU6Ly8vQzovVXNlcnMvY2tuanUvLmF0b20vcGFja2FnZXMvbGludGVyLXVpLWRlZmF1bHQvbGliL3BhbmVsL2NvbXBvbmVudC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O3FCQUVrQixPQUFPOzs7OzRCQUNGLGdCQUFnQjs7Ozt1QkFDNkQsWUFBWTs7SUFZMUcsY0FBYztZQUFkLGNBQWM7O2VBQWQsY0FBYzs7V0FDSSx5QkFBQyxHQUFrQixFQUFFLE1BQWMsRUFBbUI7QUFDMUUsVUFBTSxLQUFLLEdBQUcscUJBQU8sR0FBRyxDQUFDLENBQUE7O0FBRXpCLGNBQVEsTUFBTTtBQUNaLGFBQUssTUFBTTtBQUNULGlCQUFPLCtCQUFpQixHQUFHLENBQUMsQ0FBQTtBQUFBLEFBQzlCLGFBQUssTUFBTTtBQUNULGlCQUFPLEtBQUssR0FBTSxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsR0FBRyxDQUFDLFVBQUksS0FBSyxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFBLEdBQUssRUFBRSxDQUFBO0FBQUEsQUFDeEUsYUFBSyxTQUFTO0FBQ1osaUJBQU8sR0FBRyxDQUFDLE9BQU8sQ0FBQTtBQUFBLEFBQ3BCLGFBQUssVUFBVTtBQUNiLGlCQUFPLHVCQUFjLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQTtBQUFBLEFBQ3BDO0FBQ0UsaUJBQU8sR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFBO0FBQUEsT0FDckI7S0FDRjs7O0FBRVUsV0FsQlAsY0FBYyxDQWtCTixLQUFhLEVBQUUsT0FBZ0IsRUFBRTswQkFsQnpDLGNBQWM7O0FBbUJoQiwrQkFuQkUsY0FBYyw2Q0FtQlYsS0FBSyxFQUFFLE9BQU8sRUFBQzs7U0FhdkIsT0FBTyxHQUFHLFVBQUMsQ0FBQyxFQUFjLEdBQUcsRUFBb0I7QUFDL0MsVUFBSSxDQUFDLENBQUMsTUFBTSxDQUFDLE9BQU8sS0FBSyxHQUFHLEVBQUU7QUFDNUIsZUFBTTtPQUNQO0FBQ0QsVUFBSSxPQUFP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RyxjQUFjLENBQUEiLCJmaWxlIjoiZmlsZTovLy9DOi9Vc2Vycy9ja25qdS8uYXRvbS9wYWNrYWdlcy9saW50ZXItdWktZGVmYXVsdC9saWIvcGFuZWwvY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogQGZsb3cgKi9cblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0J1xuaW1wb3J0IFJlYWN0VGFibGUgZnJvbSAnc2ItcmVhY3QtdGFibGUnXG5pbXBvcnQgeyAkcmFuZ2UsIHNldmVyaXR5TmFtZXMsIHNvcnRNZXNzYWdlcywgdmlzaXRNZXNzYWdlLCBvcGVuRXh0ZXJuYWxseSwgZ2V0UGF0aE9mTWVzc2FnZSB9IGZyb20gJy4uL2hlbHBlcnMnXG5pbXBvcnQgdHlwZSBEZWxlZ2F0ZSBmcm9tICcuL2RlbGVnYXRlJ1xuaW1wb3J0IHR5cGUgeyBMaW50ZXJNZXNzYWdlIH0gZnJvbSAnLi4vdHlwZXMnXG5cbnR5cGUgUHJvcHMgPSB7XG4gIGRlbGVnYXRlOiBEZWxlZ2F0ZSxcbn1cblxudHlwZSBTdGF0ZSA9IHtcbiAgbWVzc2FnZXM6IEFycmF5PExpbnRlck1lc3NhZ2U+LFxufVxuXG5jbGFzcyBQYW5lbENvbXBvbmVudCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudDxQcm9wcywgU3RhdGU+IHtcbiAgc3RhdGljIHJlbmRlclJvd0NvbHVtbihyb3c6IExpbnRlck1lc3NhZ2UsIGNvbHVtbjogc3RyaW5nKTogc3RyaW5nIHwgT2JqZWN0IHtcbiAgICBjb25zdCByYW5nZSA9ICRyYW5nZShyb3cpXG5cbiAgICBzd2l0Y2ggKGNvbHVtbikge1xuICAgICAgY2FzZSAnZmlsZSc6XG4gICAgICAgIHJldHVybiBnZXRQYXRoT2ZNZXNzYWdlKHJvdylcbiAgICAgIGNhc2UgJ2xpbmUnOlxuICAgICAgICByZXR1cm4gcmFuZ2UgPyBgJHtyYW5nZS5zdGFydC5yb3cgKyAxfToke3JhbmdlLnN0YXJ0LmNvbHVtbiArIDF9YCA6ICcnXG4gICAgICBjYXNlICdleGNlcnB0JzpcbiAgICAgICAgcmV0dXJuIHJvdy5leGNlcnB0XG4gICAgICBjYXNlICdzZXZlcml0eSc6XG4gICAgICAgIHJldHVybiBzZXZlcml0eU5hbWVzW3Jvdy5zZXZlcml0eV1cbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiByb3dbY29sdW1uXVxuICAgIH1cbiAgfVxuXG4gIGNvbnN0cnVjdG9yKHByb3BzOiBPYmplY3QsIGNvbnRleHQ6ID9PYmplY3QpIHtcbiAgICBzdXBlcihwcm9wcywgY29udGV4dClcbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgbWVzc2FnZXM6IHRoaXMucHJvcHMuZGVsZWdhdGUuZmlsdGVyZWRNZXNzYWdlcyxcbiAgICB9XG4gIH1cbiAgc3RhdGU6IFN0YXRlXG5cbiAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgdGhpcy5wcm9wcy5kZWxlZ2F0ZS5vbkRpZENoYW5nZU1lc3NhZ2VzKG1lc3NhZ2VzID0+IHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoeyBtZXNzYWdlcyB9KVxuICAgIH0pXG4gIH1cblxuICBvbkNsaWNrID0gKGU6IE1vdXNlRXZlbnQsIHJvdzogTGludGVyTWVzc2FnZSkgPT4ge1xuICAgIGlmIChlLnRhcmdldC50YWdOYW1lID09PSAnQScpIHtcbiAgICAgIHJldHVyblxuICAgIH1cbiAgICBpZiAocHJvY2Vzcy5wbGF0Zm9ybSA9PT0gJ2RhcndpbicgPyBlLm1ldGFLZXkgOiBlLmN0cmxLZXkpIHtcbiAgICAgIGlmIChlLnNoaWZ0S2V5KSB7XG4gICAgICAgIG9wZW5FeHRlcm5hbGx5KHJvdylcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZpc2l0TWVzc2FnZShyb3csIHRydWUpXG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHZpc2l0TWVzc2FnZShyb3cpXG4gICAgfVxuICB9XG5cbiAgcHJvcHM6IFByb3BzXG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHsgZGVsZWdhdGUgfSA9IHRoaXMucHJvcHNcbiAgICBjb25zdCBjb2x1bW5zID0gW1xuICAgICAgeyBrZXk6ICdzZXZlcml0eScsIGxhYmVsOiAnU2V2ZXJpdHknLCBzb3J0YWJsZTogdHJ1ZSB9LFxuICAgICAgeyBrZXk6ICdsaW50ZXJOYW1lJywgbGFiZWw6ICdQcm92aWRlcicsIHNvcnRhYmxlOiB0cnVlIH0sXG4gICAgICB7IGtleTogJ2V4Y2VycHQnLCBsYWJlbDogJ0Rlc2NyaXB0aW9uJywgb25DbGljazogdGhpcy5vbkNsaWNrIH0sXG4gICAgICB7IGtleTogJ2xpbmUnLCBsYWJlbDogJ0xpbmUnLCBzb3J0YWJsZTogdHJ1ZSwgb25DbGljazogdGhpcy5vbkNsaWNrIH0sXG4gICAgXVxuICAgIGlmIChkZWxlZ2F0ZS5wYW5lbFJlcHJlc2VudHMgPT09ICdFbnRpcmUgUHJvamVjdCcpIHtcbiAgICAgIGNvbHVtbnMucHVzaCh7XG4gICAgICAgIGtleTogJ2ZpbGUnLFxuICAgICAgICBsYWJlbDogJ0ZpbGUnLFxuICAgICAgICBzb3J0YWJsZTogdHJ1ZSxcbiAgICAgICAgb25DbGljazogdGhpcy5vbkNsaWNrLFxuICAgICAgfSlcbiAgICB9XG5cbiAgICBjb25zdCBjdXN0b21TdHlsZTogT2JqZWN0ID0geyBvdmVyZmxvd1k6ICdzY3JvbGwnLCBoZWlnaHQ6ICcxMDAlJyB9XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBpZD1cImxpbnRlci1wYW5lbFwiIHRhYkluZGV4PVwiLTFcIiBzdHlsZT17Y3VzdG9tU3R5bGV9PlxuICAgICAgICA8UmVhY3RUYWJsZVxuICAgICAgICAgIHJvd3M9e3RoaXMuc3RhdGUubWVzc2FnZXN9XG4gICAgICAgICAgY29sdW1ucz17Y29sdW1uc31cbiAgICAgICAgICBpbml0aWFsU29ydD17W1xuICAgICAgICAgICAgeyBjb2x1bW46ICdzZXZlcml0eScsIHR5cGU6ICdkZXNjJyB9LFxuICAgICAgICAgICAgeyBjb2x1bW46ICdmaWxlJywgdHlwZTogJ2FzYycgfSxcbiAgICAgICAgICAgIHsgY29sdW1uOiAnbGluZScsIHR5cGU6ICdhc2MnIH0sXG4gICAgICAgICAgXX1cbiAgICAgICAgICBzb3J0PXtzb3J0TWVzc2FnZXN9XG4gICAgICAgICAgcm93S2V5PXtpID0+IGkua2V5fVxuICAgICAgICAgIHJlbmRlckhlYWRlckNvbHVtbj17aSA9PiBpLmxhYmVsfVxuICAgICAgICAgIHJlbmRlckJvZHlDb2x1bW49e1BhbmVsQ29tcG9uZW50LnJlbmRlclJvd0NvbHVtbn1cbiAgICAgICAgICBzdHlsZT17eyB3aWR0aDogJzEwMCUnIH19XG4gICAgICAgICAgY2xhc3NOYW1lPVwibGludGVyXCJcbiAgICAgICAgLz5cbiAgICAgIDwvZGl2PlxuICAgIClcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFBhbmVsQ29tcG9uZW50XG4iXX0=