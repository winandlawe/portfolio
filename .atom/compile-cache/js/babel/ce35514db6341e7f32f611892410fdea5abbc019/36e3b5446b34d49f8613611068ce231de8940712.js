Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _atom = require("atom");

var _atomSpacePenViewsPlus = require("atom-space-pen-views-plus");

"use babel";

var ScriptInputView = (function (_View) {
  _inherits(ScriptInputView, _View);

  function ScriptInputView() {
    _classCallCheck(this, ScriptInputView);

    _get(Object.getPrototypeOf(ScriptInputView.prototype), "constructor", this).apply(this, arguments);
  }

  _createClass(ScriptInputView, [{
    key: "initialize",
    value: function initialize(options) {
      var _this = this;

      this.options = options;
      this.emitter = new _atom.Emitter();

      this.panel = atom.workspace.addModalPanel({ item: this });
      this.panel.hide();

      this.editor = this.find("atom-text-editor").get(0).getModel();

      // set default text
      if (this.options["default"]) {
        this.editor.setText(this.options["default"]);
        this.editor.selectAll();
      }

      // caption text
      if (this.options.caption) {
        this.find(".caption").text(this.options.caption);
      }

      this.find("atom-text-editor").on("keydown", function (e) {
        if (e.keyCode === 27) {
          e.stopPropagation();
          _this.emitter.emit("on-cancel");
          _this.hide();
        }
      });

      this.subscriptions = new _atom.CompositeDisposable();
      this.subscriptions.add(atom.commands.add("atom-workspace", {
        "core:confirm": function coreConfirm() {
          _this.emitter.emit("on-confirm", _this.editor.getText().trim());
          _this.hide();
        }
      }));
    }
  }, {
    key: "onConfirm",
    value: function onConfirm(callback) {
      return this.emitter.on("on-confirm", callback);
    }
  }, {
    key: "onCancel",
    value: function onCancel(callback) {
      return this.emitter.on("on-cancel", callback);
    }
  }, {
    key: "focus",
    value: function focus() {
      this.find("atom-text-editor").focus();
    }
  }, {
    key: "show",
    value: function show() {
      this.panel.show();
      this.focus();
    }
  }, {
    key: "hide",
    value: function hide() {
      this.panel.hide();
      this.destroy();
    }
  }, {
    key: "destroy",
    value: function destroy() {
      if (this.subscriptions) {
        this.subscriptions.dispose();
      }
      this.panel.destroy();
    }
  }], [{
    key: "content",
    value: function content() {
      var _this2 = this;

      this.div({ "class": "script-input-view" }, function () {
        _this2.div({ "class": "caption" }, "");
        _this2.tag("atom-text-editor", { mini: "", "class": "editor mini" });
      });
    }
  }]);

  return ScriptInputView;
})(_atomSpacePenViewsPlus.View);

exports["default"] = ScriptInputView;
module.exports = exports["default"];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZpbGU6Ly8vQzovVXNlcnMvY2tuanUvLmF0b20vcGFja2FnZXMvc2NyaXB0L2xpYi9zY3JpcHQtaW5wdXQtdmlldy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7b0JBRTZDLE1BQU07O3FDQUM5QiwyQkFBMkI7O0FBSGhELFdBQVcsQ0FBQTs7SUFLVSxlQUFlO1lBQWYsZUFBZTs7V0FBZixlQUFlOzBCQUFmLGVBQWU7OytCQUFmLGVBQWU7OztlQUFmLGVBQWU7O1dBUXhCLG9CQUFDLE9BQU8sRUFBRTs7O0FBQ2xCLFVBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFBO0FBQ3RCLFVBQUksQ0FBQyxPQUFPLEdBQUcsbUJBQWEsQ0FBQTs7QUFFNUIsVUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLGFBQWEsQ0FBQyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFBO0FBQ3pELFVBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUE7O0FBRWpCLFVBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQTs7O0FBRzdELFVBQUksSUFBSSxDQUFDLE9BQU8sV0FBUSxFQUFFO0FBQ3hCLFlBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxPQUFPLFdBQVEsQ0FBQyxDQUFBO0FBQ3pDLFlBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxFQUFFLENBQUE7T0FDeEI7OztBQUdELFVBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUU7QUFDeEIsWUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQTtPQUNqRDs7QUFFRCxVQUFJLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUMsRUFBRSxDQUFDLFNBQVMsRUFBRSxVQUFDLENBQUMsRUFBSztBQUNqRCxZQUFJLENBQUMsQ0FBQyxPQUFPLEtBQUssRUFBRSxFQUFFO0FBQ3BCLFdBQUMsQ0FBQyxlQUFlLEVBQUUsQ0FBQTtBQUNuQixnQkFBSyxPQUFPLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFBO0FBQzlCLGdCQUFLLElBQUksRUFBRSxDQUFBO1NBQ1o7T0FDRixDQUFDLENBQUE7O0FBRUYsVUFBSSxDQUFDLGFBQWEsR0FBRywrQkFBeUIsQ0FBQTtBQUM5QyxVQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FDcEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLEVBQUU7QUFDbEMsc0JBQWMsRUFBRSx1QkFBTTtBQUNwQixnQkFBSyxPQUFPLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxNQUFLLE1BQU0sQ0FBQyxPQUFPLEVBQUUsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFBO0FBQzdELGdCQUFLLElBQUksRUFBRSxDQUFBO1NBQ1o7T0FDRixDQUFDLENBQ0gsQ0FBQTtLQUNGOzs7V0FFUSxtQkFBQyxRQUFRLEVBQUU7QUFDbEIsYUFBTyxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsUUFBUSxDQUFDLENBQUE7S0FDL0M7OztXQUVPLGtCQUFDLFFBQVEsRUFBRTtBQUNqQixhQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLFdBQVcsRUFBRSxRQUFRLENBQUMsQ0FBQTtLQUM5Qzs7O1dBRUksaUJBQUc7QUFDTixVQUFJLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUMsS0FBSyxFQUFFLENBQUE7S0FDdEM7OztXQUVHLGdCQUFHO0FBQ0wsVUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQTtBQUNqQixVQUFJLENBQUMsS0FBSyxFQUFFLENBQUE7S0FDYjs7O1dBRUcsZ0JBQUc7QUFDTCxVQUFJLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFBO0FBQ2pCLFVBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQTtLQUNmOzs7V0FFTSxtQkFBRztBQUNSLFVBQUksSUFBSSxDQUFDLGFBQWEsRUFBRTtBQUN0QixZQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sRUFBRSxDQUFBO09BQzdCO0FBQ0QsVUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsQ0FBQTtLQUNyQjs7O1dBekVhLG1CQUFHOzs7QUFDZixVQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsU0FBTyxtQkFBbUIsRUFBRSxFQUFFLFlBQU07QUFDN0MsZUFBSyxHQUFHLENBQUMsRUFBRSxTQUFPLFNBQVMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFBO0FBQ2xDLGVBQUssR0FBRyxDQUFDLGtCQUFrQixFQUFFLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRSxTQUFPLGFBQWEsRUFBRSxDQUFDLENBQUE7T0FDakUsQ0FBQyxDQUFBO0tBQ0g7OztTQU5rQixlQUFlOzs7cUJBQWYsZUFBZSIsImZpbGUiOiJmaWxlOi8vL0M6L1VzZXJzL2Nrbmp1Ly5hdG9tL3BhY2thZ2VzL3NjcmlwdC9saWIvc2NyaXB0LWlucHV0LXZpZXcuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBiYWJlbFwiXG5cbmltcG9ydCB7IEVtaXR0ZXIsIENvbXBvc2l0ZURpc3Bvc2FibGUgfSBmcm9tIFwiYXRvbVwiXG5pbXBvcnQgeyBWaWV3IH0gZnJvbSBcImF0b20tc3BhY2UtcGVuLXZpZXdzLXBsdXNcIlxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTY3JpcHRJbnB1dFZpZXcgZXh0ZW5kcyBWaWV3IHtcbiAgc3RhdGljIGNvbnRlbnQoKSB7XG4gICAgdGhpcy5kaXYoeyBjbGFzczogXCJzY3JpcHQtaW5wdXQtdmlld1wiIH0sICgpID0+IHtcbiAgICAgIHRoaXMuZGl2KHsgY2xhc3M6IFwiY2FwdGlvblwiIH0sIFwiXCIpXG4gICAgICB0aGlzLnRhZyhcImF0b20tdGV4dC1lZGl0b3JcIiwgeyBtaW5pOiBcIlwiLCBjbGFzczogXCJlZGl0b3IgbWluaVwiIH0pXG4gICAgfSlcbiAgfVxuXG4gIGluaXRpYWxpemUob3B0aW9ucykge1xuICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnNcbiAgICB0aGlzLmVtaXR0ZXIgPSBuZXcgRW1pdHRlcigpXG5cbiAgICB0aGlzLnBhbmVsID0gYXRvbS53b3Jrc3BhY2UuYWRkTW9kYWxQYW5lbCh7IGl0ZW06IHRoaXMgfSlcbiAgICB0aGlzLnBhbmVsLmhpZGUoKVxuXG4gICAgdGhpcy5lZGl0b3IgPSB0aGlzLmZpbmQoXCJhdG9tLXRleHQtZWRpdG9yXCIpLmdldCgwKS5nZXRNb2RlbCgpXG5cbiAgICAvLyBzZXQgZGVmYXVsdCB0ZXh0XG4gICAgaWYgKHRoaXMub3B0aW9ucy5kZWZhdWx0KSB7XG4gICAgICB0aGlzLmVkaXRvci5zZXRUZXh0KHRoaXMub3B0aW9ucy5kZWZhdWx0KVxuICAgICAgdGhpcy5lZGl0b3Iuc2VsZWN0QWxsKClcbiAgICB9XG5cbiAgICAvLyBjYXB0aW9uIHRleHRcbiAgICBpZiAodGhpcy5vcHRpb25zLmNhcHRpb24pIHtcbiAgICAgIHRoaXMuZmluZChcIi5jYXB0aW9uXCIpLnRleHQodGhpcy5vcHRpb25zLmNhcHRpb24pXG4gICAgfVxuXG4gICAgdGhpcy5maW5kKFwiYXRvbS10ZXh0LWVkaXRvclwiKS5vbihcImtleWRvd25cIiwgKGUpID0+IHtcbiAgICAgIGlmIChlLmtleUNvZGUgPT09IDI3KSB7XG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKClcbiAgICAgICAgdGhpcy5lbWl0dGVyLmVtaXQoXCJvbi1jYW5jZWxcIilcbiAgICAgICAgdGhpcy5oaWRlKClcbiAgICAgIH1cbiAgICB9KVxuXG4gICAgdGhpcy5zdWJzY3JpcHRpb25zID0gbmV3IENvbXBvc2l0ZURpc3Bvc2FibGUoKVxuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5hZGQoXG4gICAgICBhdG9tLmNvbW1hbmRzLmFkZChcImF0b20td29ya3NwYWNlXCIsIHtcbiAgICAgICAgXCJjb3JlOmNvbmZpcm1cIjogKCkgPT4ge1xuICAgICAgICAgIHRoaXMuZW1pdHRlci5lbWl0KFwib24tY29uZmlybVwiLCB0aGlzLmVkaXRvci5nZXRUZXh0KCkudHJpbSgpKVxuICAgICAgICAgIHRoaXMuaGlkZSgpXG4gICAgICAgIH0sXG4gICAgICB9KVxuICAgIClcbiAgfVxuXG4gIG9uQ29uZmlybShjYWxsYmFjaykge1xuICAgIHJldHVybiB0aGlzLmVtaXR0ZXIub24oXCJvbi1jb25maXJtXCIsIGNhbGxiYWNrKVxuICB9XG5cbiAgb25DYW5jZWwoY2FsbGJhY2spIHtcbiAgICByZXR1cm4gdGhpcy5lbWl0dGVyLm9uKFwib24tY2FuY2VsXCIsIGNhbGxiYWNrKVxuICB9XG5cbiAgZm9jdXMoKSB7XG4gICAgdGhpcy5maW5kKFwiYXRvbS10ZXh0LWVkaXRvclwiKS5mb2N1cygpXG4gIH1cblxuICBzaG93KCkge1xuICAgIHRoaXMucGFuZWwuc2hvdygpXG4gICAgdGhpcy5mb2N1cygpXG4gIH1cblxuICBoaWRlKCkge1xuICAgIHRoaXMucGFuZWwuaGlkZSgpXG4gICAgdGhpcy5kZXN0cm95KClcbiAgfVxuXG4gIGRlc3Ryb3koKSB7XG4gICAgaWYgKHRoaXMuc3Vic2NyaXB0aW9ucykge1xuICAgICAgdGhpcy5zdWJzY3JpcHRpb25zLmRpc3Bvc2UoKVxuICAgIH1cbiAgICB0aGlzLnBhbmVsLmRlc3Ryb3koKVxuICB9XG59XG4iXX0=