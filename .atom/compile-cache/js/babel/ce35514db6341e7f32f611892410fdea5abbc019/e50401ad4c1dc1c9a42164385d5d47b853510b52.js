Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _atomSpacePenViewsPlus = require("atom-space-pen-views-plus");

"use babel";

var HeaderView = (function (_View) {
  _inherits(HeaderView, _View);

  function HeaderView() {
    _classCallCheck(this, HeaderView);

    _get(Object.getPrototypeOf(HeaderView.prototype), "constructor", this).apply(this, arguments);
  }

  _createClass(HeaderView, [{
    key: "setStatus",
    value: function setStatus(status) {
      this.status.removeClass("icon-alert icon-check icon-hourglass icon-stop");
      switch (status) {
        case "start":
          return this.status.addClass("icon-hourglass");
        case "stop":
          return this.status.addClass("icon-check");
        case "kill":
          return this.status.addClass("icon-stop");
        case "err":
          return this.status.addClass("icon-alert");
        default:
          return null;
      }
    }
  }], [{
    key: "content",
    value: function content() {
      var _this = this;

      return this.div({ "class": "header-view" }, function () {
        _this.span({ "class": "heading-title", outlet: "title" });
        return _this.span({ "class": "heading-status", outlet: "status" });
      });
    }
  }]);

  return HeaderView;
})(_atomSpacePenViewsPlus.View);

exports["default"] = HeaderView;
module.exports = exports["default"];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZpbGU6Ly8vQzovVXNlcnMvY2tuanUvLmF0b20vcGFja2FnZXMvc2NyaXB0L2xpYi9oZWFkZXItdmlldy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7cUNBRXFCLDJCQUEyQjs7QUFGaEQsV0FBVyxDQUFBOztJQUlVLFVBQVU7WUFBVixVQUFVOztXQUFWLFVBQVU7MEJBQVYsVUFBVTs7K0JBQVYsVUFBVTs7O2VBQVYsVUFBVTs7V0FRcEIsbUJBQUMsTUFBTSxFQUFFO0FBQ2hCLFVBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLGdEQUFnRCxDQUFDLENBQUE7QUFDekUsY0FBUSxNQUFNO0FBQ1osYUFBSyxPQUFPO0FBQ1YsaUJBQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsQ0FBQTtBQUFBLEFBQy9DLGFBQUssTUFBTTtBQUNULGlCQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxDQUFBO0FBQUEsQUFDM0MsYUFBSyxNQUFNO0FBQ1QsaUJBQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLENBQUE7QUFBQSxBQUMxQyxhQUFLLEtBQUs7QUFDUixpQkFBTyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUMsQ0FBQTtBQUFBLEFBQzNDO0FBQ0UsaUJBQU8sSUFBSSxDQUFBO0FBQUEsT0FDZDtLQUNGOzs7V0FyQmEsbUJBQUc7OztBQUNmLGFBQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLFNBQU8sYUFBYSxFQUFFLEVBQUUsWUFBTTtBQUM5QyxjQUFLLElBQUksQ0FBQyxFQUFFLFNBQU8sZUFBZSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsQ0FBQyxDQUFBO0FBQ3RELGVBQU8sTUFBSyxJQUFJLENBQUMsRUFBRSxTQUFPLGdCQUFnQixFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsQ0FBQyxDQUFBO09BQ2hFLENBQUMsQ0FBQTtLQUNIOzs7U0FOa0IsVUFBVTs7O3FCQUFWLFVBQVUiLCJmaWxlIjoiZmlsZTovLy9DOi9Vc2Vycy9ja25qdS8uYXRvbS9wYWNrYWdlcy9zY3JpcHQvbGliL2hlYWRlci12aWV3LmpzIiwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2UgYmFiZWxcIlxuXG5pbXBvcnQgeyBWaWV3IH0gZnJvbSBcImF0b20tc3BhY2UtcGVuLXZpZXdzLXBsdXNcIlxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBIZWFkZXJWaWV3IGV4dGVuZHMgVmlldyB7XG4gIHN0YXRpYyBjb250ZW50KCkge1xuICAgIHJldHVybiB0aGlzLmRpdih7IGNsYXNzOiBcImhlYWRlci12aWV3XCIgfSwgKCkgPT4ge1xuICAgICAgdGhpcy5zcGFuKHsgY2xhc3M6IFwiaGVhZGluZy10aXRsZVwiLCBvdXRsZXQ6IFwidGl0bGVcIiB9KVxuICAgICAgcmV0dXJuIHRoaXMuc3Bhbih7IGNsYXNzOiBcImhlYWRpbmctc3RhdHVzXCIsIG91dGxldDogXCJzdGF0dXNcIiB9KVxuICAgIH0pXG4gIH1cblxuICBzZXRTdGF0dXMoc3RhdHVzKSB7XG4gICAgdGhpcy5zdGF0dXMucmVtb3ZlQ2xhc3MoXCJpY29uLWFsZXJ0IGljb24tY2hlY2sgaWNvbi1ob3VyZ2xhc3MgaWNvbi1zdG9wXCIpXG4gICAgc3dpdGNoIChzdGF0dXMpIHtcbiAgICAgIGNhc2UgXCJzdGFydFwiOlxuICAgICAgICByZXR1cm4gdGhpcy5zdGF0dXMuYWRkQ2xhc3MoXCJpY29uLWhvdXJnbGFzc1wiKVxuICAgICAgY2FzZSBcInN0b3BcIjpcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RhdHVzLmFkZENsYXNzKFwiaWNvbi1jaGVja1wiKVxuICAgICAgY2FzZSBcImtpbGxcIjpcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RhdHVzLmFkZENsYXNzKFwiaWNvbi1zdG9wXCIpXG4gICAgICBjYXNlIFwiZXJyXCI6XG4gICAgICAgIHJldHVybiB0aGlzLnN0YXR1cy5hZGRDbGFzcyhcImljb24tYWxlcnRcIilcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiBudWxsXG4gICAgfVxuICB9XG59XG4iXX0=