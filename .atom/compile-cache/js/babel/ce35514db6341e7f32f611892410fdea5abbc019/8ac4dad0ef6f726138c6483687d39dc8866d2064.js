Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _atom = require("atom");

"use babel";

var ViewRuntimeObserver = (function () {
  function ViewRuntimeObserver(view) {
    var subscriptions = arguments.length <= 1 || arguments[1] === undefined ? new _atom.CompositeDisposable() : arguments[1];

    _classCallCheck(this, ViewRuntimeObserver);

    this.view = view;
    this.subscriptions = subscriptions;
  }

  _createClass(ViewRuntimeObserver, [{
    key: "observe",
    value: function observe(runtime) {
      var _this = this;

      this.subscriptions.add(runtime.onStart(function () {
        return _this.view.resetView();
      }));
      this.subscriptions.add(runtime.onStarted(function (ev) {
        _this.view.commandContext = ev;
      }));
      this.subscriptions.add(runtime.onStopped(function () {
        return _this.view.stop();
      }));
      this.subscriptions.add(runtime.onDidWriteToStderr(function (ev) {
        return _this.view.display("stderr", ev.message);
      }));
      this.subscriptions.add(runtime.onDidWriteToStdout(function (ev) {
        return _this.view.display("stdout", ev.message);
      }));
      this.subscriptions.add(runtime.onDidExit(function (ev) {
        return _this.view.setHeaderAndShowExecutionTime(ev.returnCode, ev.executionTime);
      }));
      this.subscriptions.add(runtime.onDidNotRun(function (ev) {
        return _this.view.showUnableToRunError(ev.command);
      }));
      this.subscriptions.add(runtime.onDidContextCreate(function (ev) {
        var title = ev.lang + " - " + ev.filename + (ev.lineNumber ? ":" + ev.lineNumber : "");
        _this.view.setHeaderTitle(title);
      }));
      this.subscriptions.add(runtime.onDidNotSpecifyLanguage(function () {
        return _this.view.showNoLanguageSpecified();
      }));
      this.subscriptions.add(runtime.onDidNotSupportLanguage(function (ev) {
        return _this.view.showLanguageNotSupported(ev.lang);
      }));
      this.subscriptions.add(runtime.onDidNotSupportMode(function (ev) {
        return _this.view.createGitHubIssueLink(ev.argType, ev.lang);
      }));
      this.subscriptions.add(runtime.onDidNotBuildArgs(function (ev) {
        return _this.view.handleError(ev.error);
      }));
    }
  }, {
    key: "destroy",
    value: function destroy() {
      if (this.subscriptions) {
        this.subscriptions.dispose();
      }
    }
  }]);

  return ViewRuntimeObserver;
})();

exports["default"] = ViewRuntimeObserver;
module.exports = exports["default"];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZpbGU6Ly8vQzovVXNlcnMvY2tuanUvLmF0b20vcGFja2FnZXMvc2NyaXB0L2xpYi92aWV3LXJ1bnRpbWUtb2JzZXJ2ZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7b0JBRW9DLE1BQU07O0FBRjFDLFdBQVcsQ0FBQTs7SUFJVSxtQkFBbUI7QUFDM0IsV0FEUSxtQkFBbUIsQ0FDMUIsSUFBSSxFQUE2QztRQUEzQyxhQUFhLHlEQUFHLCtCQUF5Qjs7MEJBRHhDLG1CQUFtQjs7QUFFcEMsUUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUE7QUFDaEIsUUFBSSxDQUFDLGFBQWEsR0FBRyxhQUFhLENBQUE7R0FDbkM7O2VBSmtCLG1CQUFtQjs7V0FNL0IsaUJBQUMsT0FBTyxFQUFFOzs7QUFDZixVQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDO2VBQU0sTUFBSyxJQUFJLENBQUMsU0FBUyxFQUFFO09BQUEsQ0FBQyxDQUFDLENBQUE7QUFDcEUsVUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQ3BCLE9BQU8sQ0FBQyxTQUFTLENBQUMsVUFBQyxFQUFFLEVBQUs7QUFDeEIsY0FBSyxJQUFJLENBQUMsY0FBYyxHQUFHLEVBQUUsQ0FBQTtPQUM5QixDQUFDLENBQ0gsQ0FBQTtBQUNELFVBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUM7ZUFBTSxNQUFLLElBQUksQ0FBQyxJQUFJLEVBQUU7T0FBQSxDQUFDLENBQUMsQ0FBQTtBQUNqRSxVQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsa0JBQWtCLENBQUMsVUFBQyxFQUFFO2VBQUssTUFBSyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxFQUFFLENBQUMsT0FBTyxDQUFDO09BQUEsQ0FBQyxDQUFDLENBQUE7QUFDbkcsVUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLGtCQUFrQixDQUFDLFVBQUMsRUFBRTtlQUFLLE1BQUssSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsRUFBRSxDQUFDLE9BQU8sQ0FBQztPQUFBLENBQUMsQ0FBQyxDQUFBO0FBQ25HLFVBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUNwQixPQUFPLENBQUMsU0FBUyxDQUFDLFVBQUMsRUFBRTtlQUFLLE1BQUssSUFBSSxDQUFDLDZCQUE2QixDQUFDLEVBQUUsQ0FBQyxVQUFVLEVBQUUsRUFBRSxDQUFDLGFBQWEsQ0FBQztPQUFBLENBQUMsQ0FDcEcsQ0FBQTtBQUNELFVBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsVUFBQyxFQUFFO2VBQUssTUFBSyxJQUFJLENBQUMsb0JBQW9CLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQztPQUFBLENBQUMsQ0FBQyxDQUFBO0FBQy9GLFVBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUNwQixPQUFPLENBQUMsa0JBQWtCLENBQUMsVUFBQyxFQUFFLEVBQUs7QUFDakMsWUFBTSxLQUFLLEdBQU0sRUFBRSxDQUFDLElBQUksV0FBTSxFQUFFLENBQUMsUUFBUSxJQUFHLEVBQUUsQ0FBQyxVQUFVLFNBQU8sRUFBRSxDQUFDLFVBQVUsR0FBSyxFQUFFLENBQUEsQUFBRSxDQUFBO0FBQ3RGLGNBQUssSUFBSSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsQ0FBQTtPQUNoQyxDQUFDLENBQ0gsQ0FBQTtBQUNELFVBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyx1QkFBdUIsQ0FBQztlQUFNLE1BQUssSUFBSSxDQUFDLHVCQUF1QixFQUFFO09BQUEsQ0FBQyxDQUFDLENBQUE7QUFDbEcsVUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLHVCQUF1QixDQUFDLFVBQUMsRUFBRTtlQUFLLE1BQUssSUFBSSxDQUFDLHdCQUF3QixDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7T0FBQSxDQUFDLENBQUMsQ0FBQTtBQUM1RyxVQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsbUJBQW1CLENBQUMsVUFBQyxFQUFFO2VBQUssTUFBSyxJQUFJLENBQUMscUJBQXFCLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDO09BQUEsQ0FBQyxDQUFDLENBQUE7QUFDakgsVUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLGlCQUFpQixDQUFDLFVBQUMsRUFBRTtlQUFLLE1BQUssSUFBSSxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDO09BQUEsQ0FBQyxDQUFDLENBQUE7S0FDM0Y7OztXQUVNLG1CQUFHO0FBQ1IsVUFBSSxJQUFJLENBQUMsYUFBYSxFQUFFO0FBQ3RCLFlBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxFQUFFLENBQUE7T0FDN0I7S0FDRjs7O1NBcENrQixtQkFBbUI7OztxQkFBbkIsbUJBQW1CIiwiZmlsZSI6ImZpbGU6Ly8vQzovVXNlcnMvY2tuanUvLmF0b20vcGFja2FnZXMvc2NyaXB0L2xpYi92aWV3LXJ1bnRpbWUtb2JzZXJ2ZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBiYWJlbFwiXG5cbmltcG9ydCB7IENvbXBvc2l0ZURpc3Bvc2FibGUgfSBmcm9tIFwiYXRvbVwiXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFZpZXdSdW50aW1lT2JzZXJ2ZXIge1xuICBjb25zdHJ1Y3Rvcih2aWV3LCBzdWJzY3JpcHRpb25zID0gbmV3IENvbXBvc2l0ZURpc3Bvc2FibGUoKSkge1xuICAgIHRoaXMudmlldyA9IHZpZXdcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMgPSBzdWJzY3JpcHRpb25zXG4gIH1cblxuICBvYnNlcnZlKHJ1bnRpbWUpIHtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMuYWRkKHJ1bnRpbWUub25TdGFydCgoKSA9PiB0aGlzLnZpZXcucmVzZXRWaWV3KCkpKVxuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5hZGQoXG4gICAgICBydW50aW1lLm9uU3RhcnRlZCgoZXYpID0+IHtcbiAgICAgICAgdGhpcy52aWV3LmNvbW1hbmRDb250ZXh0ID0gZXZcbiAgICAgIH0pXG4gICAgKVxuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5hZGQocnVudGltZS5vblN0b3BwZWQoKCkgPT4gdGhpcy52aWV3LnN0b3AoKSkpXG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLmFkZChydW50aW1lLm9uRGlkV3JpdGVUb1N0ZGVycigoZXYpID0+IHRoaXMudmlldy5kaXNwbGF5KFwic3RkZXJyXCIsIGV2Lm1lc3NhZ2UpKSlcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMuYWRkKHJ1bnRpbWUub25EaWRXcml0ZVRvU3Rkb3V0KChldikgPT4gdGhpcy52aWV3LmRpc3BsYXkoXCJzdGRvdXRcIiwgZXYubWVzc2FnZSkpKVxuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5hZGQoXG4gICAgICBydW50aW1lLm9uRGlkRXhpdCgoZXYpID0+IHRoaXMudmlldy5zZXRIZWFkZXJBbmRTaG93RXhlY3V0aW9uVGltZShldi5yZXR1cm5Db2RlLCBldi5leGVjdXRpb25UaW1lKSlcbiAgICApXG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLmFkZChydW50aW1lLm9uRGlkTm90UnVuKChldikgPT4gdGhpcy52aWV3LnNob3dVbmFibGVUb1J1bkVycm9yKGV2LmNvbW1hbmQpKSlcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMuYWRkKFxuICAgICAgcnVudGltZS5vbkRpZENvbnRleHRDcmVhdGUoKGV2KSA9PiB7XG4gICAgICAgIGNvbnN0IHRpdGxlID0gYCR7ZXYubGFuZ30gLSAke2V2LmZpbGVuYW1lfSR7ZXYubGluZU51bWJlciA/IGA6JHtldi5saW5lTnVtYmVyfWAgOiBcIlwifWBcbiAgICAgICAgdGhpcy52aWV3LnNldEhlYWRlclRpdGxlKHRpdGxlKVxuICAgICAgfSlcbiAgICApXG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLmFkZChydW50aW1lLm9uRGlkTm90U3BlY2lmeUxhbmd1YWdlKCgpID0+IHRoaXMudmlldy5zaG93Tm9MYW5ndWFnZVNwZWNpZmllZCgpKSlcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMuYWRkKHJ1bnRpbWUub25EaWROb3RTdXBwb3J0TGFuZ3VhZ2UoKGV2KSA9PiB0aGlzLnZpZXcuc2hvd0xhbmd1YWdlTm90U3VwcG9ydGVkKGV2LmxhbmcpKSlcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMuYWRkKHJ1bnRpbWUub25EaWROb3RTdXBwb3J0TW9kZSgoZXYpID0+IHRoaXMudmlldy5jcmVhdGVHaXRIdWJJc3N1ZUxpbmsoZXYuYXJnVHlwZSwgZXYubGFuZykpKVxuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5hZGQocnVudGltZS5vbkRpZE5vdEJ1aWxkQXJncygoZXYpID0+IHRoaXMudmlldy5oYW5kbGVFcnJvcihldi5lcnJvcikpKVxuICB9XG5cbiAgZGVzdHJveSgpIHtcbiAgICBpZiAodGhpcy5zdWJzY3JpcHRpb25zKSB7XG4gICAgICB0aGlzLnN1YnNjcmlwdGlvbnMuZGlzcG9zZSgpXG4gICAgfVxuICB9XG59XG4iXX0=