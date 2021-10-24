Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _atom = require('atom');

'use babel';

var ViewRuntimeObserver = (function () {
  function ViewRuntimeObserver(view) {
    var subscriptions = arguments.length <= 1 || arguments[1] === undefined ? new _atom.CompositeDisposable() : arguments[1];

    _classCallCheck(this, ViewRuntimeObserver);

    this.view = view;
    this.subscriptions = subscriptions;
  }

  _createClass(ViewRuntimeObserver, [{
    key: 'observe',
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
        return _this.view.display('stderr', ev.message);
      }));
      this.subscriptions.add(runtime.onDidWriteToStdout(function (ev) {
        return _this.view.display('stdout', ev.message);
      }));
      this.subscriptions.add(runtime.onDidExit(function (ev) {
        return _this.view.setHeaderAndShowExecutionTime(ev.returnCode, ev.executionTime);
      }));
      this.subscriptions.add(runtime.onDidNotRun(function (ev) {
        return _this.view.showUnableToRunError(ev.command);
      }));
      this.subscriptions.add(runtime.onDidContextCreate(function (ev) {
        var title = ev.lang + ' - ' + ev.filename + (ev.lineNumber ? ':' + ev.lineNumber : '');
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
    key: 'destroy',
    value: function destroy() {
      if (this.subscriptions) this.subscriptions.dispose();
    }
  }]);

  return ViewRuntimeObserver;
})();

exports['default'] = ViewRuntimeObserver;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZpbGU6Ly8vQzovVXNlcnMvY2tuanUvLmF0b20vcGFja2FnZXMvc2NyaXB0L2xpYi92aWV3LXJ1bnRpbWUtb2JzZXJ2ZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7b0JBRW9DLE1BQU07O0FBRjFDLFdBQVcsQ0FBQzs7SUFJUyxtQkFBbUI7QUFDM0IsV0FEUSxtQkFBbUIsQ0FDMUIsSUFBSSxFQUE2QztRQUEzQyxhQUFhLHlEQUFHLCtCQUF5Qjs7MEJBRHhDLG1CQUFtQjs7QUFFcEMsUUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7QUFDakIsUUFBSSxDQUFDLGFBQWEsR0FBRyxhQUFhLENBQUM7R0FDcEM7O2VBSmtCLG1CQUFtQjs7V0FNL0IsaUJBQUMsT0FBTyxFQUFFOzs7QUFDZixVQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDO2VBQU0sTUFBSyxJQUFJLENBQUMsU0FBUyxFQUFFO09BQUEsQ0FBQyxDQUFDLENBQUM7QUFDckUsVUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxVQUFDLEVBQUUsRUFBSztBQUFFLGNBQUssSUFBSSxDQUFDLGNBQWMsR0FBRyxFQUFFLENBQUM7T0FBRSxDQUFDLENBQUMsQ0FBQztBQUN0RixVQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDO2VBQU0sTUFBSyxJQUFJLENBQUMsSUFBSSxFQUFFO09BQUEsQ0FBQyxDQUFDLENBQUM7QUFDbEUsVUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLGtCQUFrQixDQUFDLFVBQUMsRUFBRTtlQUFLLE1BQUssSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsRUFBRSxDQUFDLE9BQU8sQ0FBQztPQUFBLENBQUMsQ0FBQyxDQUFDO0FBQ3BHLFVBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxrQkFBa0IsQ0FBQyxVQUFDLEVBQUU7ZUFBSyxNQUFLLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLEVBQUUsQ0FBQyxPQUFPLENBQUM7T0FBQSxDQUFDLENBQUMsQ0FBQztBQUNwRyxVQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLFVBQUMsRUFBRTtlQUFLLE1BQUssSUFBSSxDQUFDLDZCQUE2QixDQUFDLEVBQUUsQ0FBQyxVQUFVLEVBQUUsRUFBRSxDQUFDLGFBQWEsQ0FBQztPQUFBLENBQUMsQ0FBQyxDQUFDO0FBQzVILFVBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsVUFBQyxFQUFFO2VBQUssTUFBSyxJQUFJLENBQUMsb0JBQW9CLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQztPQUFBLENBQUMsQ0FBQyxDQUFDO0FBQ2hHLFVBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxrQkFBa0IsQ0FBQyxVQUFDLEVBQUUsRUFBSztBQUN4RCxZQUFNLEtBQUssR0FBTSxFQUFFLENBQUMsSUFBSSxXQUFNLEVBQUUsQ0FBQyxRQUFRLElBQUcsRUFBRSxDQUFDLFVBQVUsU0FBTyxFQUFFLENBQUMsVUFBVSxHQUFLLEVBQUUsQ0FBQSxBQUFFLENBQUM7QUFDdkYsY0FBSyxJQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxDQUFDO09BQ2pDLENBQUMsQ0FBQyxDQUFDO0FBQ0osVUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLHVCQUF1QixDQUFDO2VBQU0sTUFBSyxJQUFJLENBQUMsdUJBQXVCLEVBQUU7T0FBQSxDQUFDLENBQUMsQ0FBQztBQUNuRyxVQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsdUJBQXVCLENBQUMsVUFBQyxFQUFFO2VBQUssTUFBSyxJQUFJLENBQUMsd0JBQXdCLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQztPQUFBLENBQUMsQ0FBQyxDQUFDO0FBQzdHLFVBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxtQkFBbUIsQ0FBQyxVQUFDLEVBQUU7ZUFBSyxNQUFLLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUM7T0FBQSxDQUFDLENBQUMsQ0FBQztBQUNsSCxVQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsaUJBQWlCLENBQUMsVUFBQyxFQUFFO2VBQUssTUFBSyxJQUFJLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7T0FBQSxDQUFDLENBQUMsQ0FBQztLQUM1Rjs7O1dBRU0sbUJBQUc7QUFDUixVQUFJLElBQUksQ0FBQyxhQUFhLEVBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLEVBQUUsQ0FBQztLQUN0RDs7O1NBMUJrQixtQkFBbUI7OztxQkFBbkIsbUJBQW1CIiwiZmlsZSI6ImZpbGU6Ly8vQzovVXNlcnMvY2tuanUvLmF0b20vcGFja2FnZXMvc2NyaXB0L2xpYi92aWV3LXJ1bnRpbWUtb2JzZXJ2ZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIGJhYmVsJztcblxuaW1wb3J0IHsgQ29tcG9zaXRlRGlzcG9zYWJsZSB9IGZyb20gJ2F0b20nO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBWaWV3UnVudGltZU9ic2VydmVyIHtcbiAgY29uc3RydWN0b3Iodmlldywgc3Vic2NyaXB0aW9ucyA9IG5ldyBDb21wb3NpdGVEaXNwb3NhYmxlKCkpIHtcbiAgICB0aGlzLnZpZXcgPSB2aWV3O1xuICAgIHRoaXMuc3Vic2NyaXB0aW9ucyA9IHN1YnNjcmlwdGlvbnM7XG4gIH1cblxuICBvYnNlcnZlKHJ1bnRpbWUpIHtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMuYWRkKHJ1bnRpbWUub25TdGFydCgoKSA9PiB0aGlzLnZpZXcucmVzZXRWaWV3KCkpKTtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMuYWRkKHJ1bnRpbWUub25TdGFydGVkKChldikgPT4geyB0aGlzLnZpZXcuY29tbWFuZENvbnRleHQgPSBldjsgfSkpO1xuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5hZGQocnVudGltZS5vblN0b3BwZWQoKCkgPT4gdGhpcy52aWV3LnN0b3AoKSkpO1xuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5hZGQocnVudGltZS5vbkRpZFdyaXRlVG9TdGRlcnIoKGV2KSA9PiB0aGlzLnZpZXcuZGlzcGxheSgnc3RkZXJyJywgZXYubWVzc2FnZSkpKTtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMuYWRkKHJ1bnRpbWUub25EaWRXcml0ZVRvU3Rkb3V0KChldikgPT4gdGhpcy52aWV3LmRpc3BsYXkoJ3N0ZG91dCcsIGV2Lm1lc3NhZ2UpKSk7XG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLmFkZChydW50aW1lLm9uRGlkRXhpdCgoZXYpID0+IHRoaXMudmlldy5zZXRIZWFkZXJBbmRTaG93RXhlY3V0aW9uVGltZShldi5yZXR1cm5Db2RlLCBldi5leGVjdXRpb25UaW1lKSkpO1xuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5hZGQocnVudGltZS5vbkRpZE5vdFJ1bigoZXYpID0+IHRoaXMudmlldy5zaG93VW5hYmxlVG9SdW5FcnJvcihldi5jb21tYW5kKSkpO1xuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5hZGQocnVudGltZS5vbkRpZENvbnRleHRDcmVhdGUoKGV2KSA9PiB7XG4gICAgICBjb25zdCB0aXRsZSA9IGAke2V2Lmxhbmd9IC0gJHtldi5maWxlbmFtZX0ke2V2LmxpbmVOdW1iZXIgPyBgOiR7ZXYubGluZU51bWJlcn1gIDogJyd9YDtcbiAgICAgIHRoaXMudmlldy5zZXRIZWFkZXJUaXRsZSh0aXRsZSk7XG4gICAgfSkpO1xuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5hZGQocnVudGltZS5vbkRpZE5vdFNwZWNpZnlMYW5ndWFnZSgoKSA9PiB0aGlzLnZpZXcuc2hvd05vTGFuZ3VhZ2VTcGVjaWZpZWQoKSkpO1xuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5hZGQocnVudGltZS5vbkRpZE5vdFN1cHBvcnRMYW5ndWFnZSgoZXYpID0+IHRoaXMudmlldy5zaG93TGFuZ3VhZ2VOb3RTdXBwb3J0ZWQoZXYubGFuZykpKTtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMuYWRkKHJ1bnRpbWUub25EaWROb3RTdXBwb3J0TW9kZSgoZXYpID0+IHRoaXMudmlldy5jcmVhdGVHaXRIdWJJc3N1ZUxpbmsoZXYuYXJnVHlwZSwgZXYubGFuZykpKTtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMuYWRkKHJ1bnRpbWUub25EaWROb3RCdWlsZEFyZ3MoKGV2KSA9PiB0aGlzLnZpZXcuaGFuZGxlRXJyb3IoZXYuZXJyb3IpKSk7XG4gIH1cblxuICBkZXN0cm95KCkge1xuICAgIGlmICh0aGlzLnN1YnNjcmlwdGlvbnMpIHRoaXMuc3Vic2NyaXB0aW9ucy5kaXNwb3NlKCk7XG4gIH1cbn1cbiJdfQ==