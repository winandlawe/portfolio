Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.activate = activate;
exports.deactivate = deactivate;
exports.closeScriptViewAndStopRunner = closeScriptViewAndStopRunner;
exports.provideDefaultRuntime = provideDefaultRuntime;
exports.provideBlankRuntime = provideBlankRuntime;
exports.serialize = serialize;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _atom = require("atom");

var _codeContextBuilder = require("./code-context-builder");

var _codeContextBuilder2 = _interopRequireDefault(_codeContextBuilder);

var _grammarUtils = require("./grammar-utils");

var _grammarUtils2 = _interopRequireDefault(_grammarUtils);

var _runner = require("./runner");

var _runner2 = _interopRequireDefault(_runner);

var _runtime = require("./runtime");

var _runtime2 = _interopRequireDefault(_runtime);

var _scriptOptions = require("./script-options");

var _scriptOptions2 = _interopRequireDefault(_scriptOptions);

var _scriptOptionsView = require("./script-options-view");

var _scriptOptionsView2 = _interopRequireDefault(_scriptOptionsView);

var _scriptProfileRunView = require("./script-profile-run-view");

var _scriptProfileRunView2 = _interopRequireDefault(_scriptProfileRunView);

var _scriptView = require("./script-view");

var _scriptView2 = _interopRequireDefault(_scriptView);

var _viewRuntimeObserver = require("./view-runtime-observer");

var _viewRuntimeObserver2 = _interopRequireDefault(_viewRuntimeObserver);

"use babel";

var config = {
  enableExecTime: {
    title: "Output the time it took to execute the script",
    type: "boolean",
    "default": true
  },
  escapeConsoleOutput: {
    title: "HTML escape console output",
    type: "boolean",
    "default": true
  },
  ignoreSelection: {
    title: "Ignore selection (file-based runs only)",
    type: "boolean",
    "default": false
  },
  scrollWithOutput: {
    title: "Scroll with output",
    type: "boolean",
    "default": true
  },
  stopOnRerun: {
    title: "Stop running process on rerun",
    type: "boolean",
    "default": false
  },
  cwdBehavior: {
    title: "Default Current Working Directory (CWD) Behavior",
    description: "If no Run Options are set, this setting decides how to determine the CWD",
    type: "string",
    "default": "First project directory",
    "enum": ["First project directory", "Project directory of the script", "Directory of the script"]
  },
  position: {
    title: "Panel position",
    description: "Position of the panel with script output.\n    (Changes to this value will be applied upon reopening the panel.)",
    type: "string",
    "default": "bottom",
    "enum": ["top", "bottom", "left", "right"]
  }
};

exports.config = config;
// For some reason, the text of these options does not show in package settings view
// default: 'firstProj'
// enum: [
//   {value: 'firstProj', description: 'First project directory (if there is one)'}
//   {value: 'scriptProj', description: 'Project directory of the script (if there is one)'}
//   {value: 'scriptDir', description: 'Directory of the script'}
// ]
var scriptView = null;
var scriptOptionsView = null;
var scriptProfileRunView = null;
var scriptOptions = null;
var scriptProfiles = [];
var runtime = null;
var subscriptions = new _atom.CompositeDisposable();

function activate(state) {
  scriptView = new _scriptView2["default"](state.scriptViewState);
  scriptOptions = new _scriptOptions2["default"]();
  scriptOptionsView = new _scriptOptionsView2["default"](scriptOptions);

  // profiles loading
  scriptProfiles = [];
  if (state.profiles) {
    for (var profile of state.profiles) {
      var so = _scriptOptions2["default"].createFromOptions(profile.name, profile);
      scriptProfiles.push(so);
    }
  }

  scriptProfileRunView = new _scriptProfileRunView2["default"](scriptProfiles);

  var codeContextBuilder = new _codeContextBuilder2["default"]();
  var runner = new _runner2["default"](scriptOptions);

  var observer = new _viewRuntimeObserver2["default"](scriptView);

  runtime = new _runtime2["default"](runner, codeContextBuilder, [observer]);

  subscriptions.add(atom.commands.add("atom-workspace", {
    "core:cancel": function coreCancel() {
      return closeScriptViewAndStopRunner();
    },
    "core:close": function coreClose() {
      return closeScriptViewAndStopRunner();
    },
    "script:close-view": function scriptCloseView() {
      return closeScriptViewAndStopRunner();
    },
    "script:copy-run-results": function scriptCopyRunResults() {
      return scriptView.copyResults();
    },
    "script:kill-process": function scriptKillProcess() {
      return runtime.stop();
    },
    "script:run-by-line-number": function scriptRunByLineNumber() {
      return runtime.execute("Line Number Based");
    },
    "script:run": function scriptRun() {
      return runtime.execute("Selection Based");
    }
  }));

  // profile created
  scriptOptionsView.onProfileSave(function (profileData) {
    // create and fill out profile
    var profile = _scriptOptions2["default"].createFromOptions(profileData.name, profileData.options);

    var codeContext = runtime.codeContextBuilder.buildCodeContext(atom.workspace.getActiveTextEditor(), "Selection Based");
    profile.lang = codeContext.lang;

    // formatting description
    var opts = profile.toObject();
    var desc = "Language: " + codeContext.lang;
    if (opts.cmd) {
      desc += ", Command: " + opts.cmd;
    }
    if (opts.cmdArgs && opts.cmd) {
      desc += " " + opts.cmdArgs.join(" ");
    }

    profile.description = desc;
    scriptProfiles.push(profile);

    scriptOptionsView.hide();
    scriptProfileRunView.show();
    scriptProfileRunView.setProfiles(scriptProfiles);
  });

  // profile deleted
  scriptProfileRunView.onProfileDelete(function (profile) {
    var index = scriptProfiles.indexOf(profile);
    if (index === -1) {
      return;
    }

    if (index !== -1) {
      scriptProfiles.splice(index, 1);
    }
    scriptProfileRunView.setProfiles(scriptProfiles);
  });

  // profile renamed
  scriptProfileRunView.onProfileChange(function (data) {
    var index = scriptProfiles.indexOf(data.profile);
    if (index === -1 || !scriptProfiles[index][data.key]) {
      return;
    }

    scriptProfiles[index][data.key] = data.value;
    scriptProfileRunView.show();
    scriptProfileRunView.setProfiles(scriptProfiles);
  });

  // profile renamed
  return scriptProfileRunView.onProfileRun(function (profile) {
    if (!profile) {
      return;
    }
    runtime.execute("Selection Based", null, profile);
  });
}

function deactivate() {
  runtime.destroy();
  scriptView.removePanel();
  scriptOptionsView.close();
  scriptProfileRunView.close();
  subscriptions.dispose();
  _grammarUtils2["default"].deleteTempFiles();
}

function closeScriptViewAndStopRunner() {
  runtime.stop();
  scriptView.removePanel();
}

// Public
//
// Service method that provides the default runtime that's configurable through Atom editor
// Use this service if you want to directly show the script's output in the Atom editor
//
// **Do not destroy this {Runtime} instance!** By doing so you'll break this plugin!
//
// Also note that the Script package isn't activated until you actually try to use it.
// That's why this service won't be automatically consumed. To be sure you consume it
// you may need to manually activate the package:
//
// atom.packages.loadPackage('script').activateNow() # this code doesn't include error handling!
//
// see https://github.com/s1mplex/Atom-Script-Runtime-Consumer-Sample for a full example

function provideDefaultRuntime() {
  return runtime;
}

// Public
//
// Service method that provides a blank runtime. You are free to configure any aspect of it:
// * Add observer (`runtime.addObserver(observer)`) - see {ViewRuntimeObserver} for an example
// * configure script options (`runtime.scriptOptions`)
//
// In contrast to `provideDefaultRuntime` you should dispose this {Runtime} when
// you no longer need it.
//
// Also note that the Script package isn't activated until you actually try to use it.
// That's why this service won't be automatically consumed. To be sure you consume it
// you may need to manually activate the package:
//
// atom.packages.loadPackage('script').activateNow() # this code doesn't include error handling!
//
// see https://github.com/s1mplex/Atom-Script-Runtime-Consumer-Sample for a full example

function provideBlankRuntime() {
  var runner = new _runner2["default"](new _scriptOptions2["default"]());
  var codeContextBuilder = new _codeContextBuilder2["default"]();

  return new _runtime2["default"](runner, codeContextBuilder, []);
}

function serialize() {
  // TODO: True serialization needs to take the options view into account
  //       and handle deserialization
  var serializedProfiles = [];
  for (var profile of scriptProfiles) {
    serializedProfiles.push(profile.toObject());
  }

  return {
    scriptViewState: scriptView.serialize(),
    scriptOptionsViewState: scriptOptionsView.serialize(),
    profiles: serializedProfiles
  };
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZpbGU6Ly8vQzovVXNlcnMvY2tuanUvLmF0b20vcGFja2FnZXMvc2NyaXB0L2xpYi9zY3JpcHQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O29CQUVvQyxNQUFNOztrQ0FFWCx3QkFBd0I7Ozs7NEJBQzlCLGlCQUFpQjs7OztzQkFDdkIsVUFBVTs7Ozt1QkFDVCxXQUFXOzs7OzZCQUNMLGtCQUFrQjs7OztpQ0FDZCx1QkFBdUI7Ozs7b0NBQ3BCLDJCQUEyQjs7OzswQkFDckMsZUFBZTs7OzttQ0FDTix5QkFBeUI7Ozs7QUFaekQsV0FBVyxDQUFBOztBQWNKLElBQU0sTUFBTSxHQUFHO0FBQ3BCLGdCQUFjLEVBQUU7QUFDZCxTQUFLLEVBQUUsK0NBQStDO0FBQ3RELFFBQUksRUFBRSxTQUFTO0FBQ2YsZUFBUyxJQUFJO0dBQ2Q7QUFDRCxxQkFBbUIsRUFBRTtBQUNuQixTQUFLLEVBQUUsNEJBQTRCO0FBQ25DLFFBQUksRUFBRSxTQUFTO0FBQ2YsZUFBUyxJQUFJO0dBQ2Q7QUFDRCxpQkFBZSxFQUFFO0FBQ2YsU0FBSyxFQUFFLHlDQUF5QztBQUNoRCxRQUFJLEVBQUUsU0FBUztBQUNmLGVBQVMsS0FBSztHQUNmO0FBQ0Qsa0JBQWdCLEVBQUU7QUFDaEIsU0FBSyxFQUFFLG9CQUFvQjtBQUMzQixRQUFJLEVBQUUsU0FBUztBQUNmLGVBQVMsSUFBSTtHQUNkO0FBQ0QsYUFBVyxFQUFFO0FBQ1gsU0FBSyxFQUFFLCtCQUErQjtBQUN0QyxRQUFJLEVBQUUsU0FBUztBQUNmLGVBQVMsS0FBSztHQUNmO0FBQ0QsYUFBVyxFQUFFO0FBQ1gsU0FBSyxFQUFFLGtEQUFrRDtBQUN6RCxlQUFXLEVBQUUsMEVBQTBFO0FBQ3ZGLFFBQUksRUFBRSxRQUFRO0FBQ2QsZUFBUyx5QkFBeUI7QUFDbEMsWUFBTSxDQUFDLHlCQUF5QixFQUFFLGlDQUFpQyxFQUFFLHlCQUF5QixDQUFDO0dBQ2hHO0FBQ0QsVUFBUSxFQUFFO0FBQ1IsU0FBSyxFQUFFLGdC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RU0sU0FBUyxTQUFTLEdBQUc7OztBQUcxQixNQUFNLGtCQUFrQixHQUFHLEVBQUUsQ0FBQTtBQUM3QixPQUFLLElBQU0sT0FBTyxJQUFJLGNBQWMsRUFBRTtBQUNwQyxzQkFBa0IsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUE7R0FDNUM7O0FBRUQsU0FBTztBQUNMLG1CQUFlLEVBQUUsVUFBVSxDQUFDLFNBQVMsRUFBRTtBQUN2QywwQkFBc0IsRUFBRSxpQkFBaUIsQ0FBQyxTQUFTLEVBQUU7QUFDckQsWUFBUSxFQUFFLGtCQUFrQjtHQUM3QixDQUFBO0NBQ0YiLCJmaWxlIjoiZmlsZTovLy9DOi9Vc2Vycy9ja25qdS8uYXRvbS9wYWNrYWdlcy9zY3JpcHQvbGliL3NjcmlwdC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlwidXNlIGJhYmVsXCJcblxuaW1wb3J0IHsgQ29tcG9zaXRlRGlzcG9zYWJsZSB9IGZyb20gXCJhdG9tXCJcblxuaW1wb3J0IENvZGVDb250ZXh0QnVpbGRlciBmcm9tIFwiLi9jb2RlLWNvbnRleHQtYnVpbGRlclwiXG5pbXBvcnQgR3JhbW1hclV0aWxzIGZyb20gXCIuL2dyYW1tYXItdXRpbHNcIlxuaW1wb3J0IFJ1bm5lciBmcm9tIFwiLi9ydW5uZXJcIlxuaW1wb3J0IFJ1bnRpbWUgZnJvbSBcIi4vcnVudGltZVwiXG5pbXBvcnQgU2NyaXB0T3B0aW9ucyBmcm9tIFwiLi9zY3JpcHQtb3B0aW9uc1wiXG5pbXBvcnQgU2NyaXB0T3B0aW9uc1ZpZXcgZnJvbSBcIi4vc2NyaXB0LW9wdGlvbnMtdmlld1wiXG5pbXBvcnQgU2NyaXB0UHJvZmlsZVJ1blZpZXcgZnJvbSBcIi4vc2NyaXB0LXByb2ZpbGUtcnVuLXZpZXdcIlxuaW1wb3J0IFNjcmlwdFZpZXcgZnJvbSBcIi4vc2NyaXB0LXZpZXdcIlxuaW1wb3J0IFZpZXdSdW50aW1lT2JzZXJ2ZXIgZnJvbSBcIi4vdmlldy1ydW50aW1lLW9ic2VydmVyXCJcblxuZXhwb3J0IGNvbnN0IGNvbmZpZyA9IHtcbiAgZW5hYmxlRXhlY1RpbWU6IHtcbiAgICB0aXRsZTogXCJPdXRwdXQgdGhlIHRpbWUgaXQgdG9vayB0byBleGVjdXRlIHRoZSBzY3JpcHRcIixcbiAgICB0eXBlOiBcImJvb2xlYW5cIixcbiAgICBkZWZhdWx0OiB0cnVlLFxuICB9LFxuICBlc2NhcGVDb25zb2xlT3V0cHV0OiB7XG4gICAgdGl0bGU6IFwiSFRNTCBlc2NhcGUgY29uc29sZSBvdXRwdXRcIixcbiAgICB0eXBlOiBcImJvb2xlYW5cIixcbiAgICBkZWZhdWx0OiB0cnVlLFxuICB9LFxuICBpZ25vcmVTZWxlY3Rpb246IHtcbiAgICB0aXRsZTogXCJJZ25vcmUgc2VsZWN0aW9uIChmaWxlLWJhc2VkIHJ1bnMgb25seSlcIixcbiAgICB0eXBlOiBcImJvb2xlYW5cIixcbiAgICBkZWZhdWx0OiBmYWxzZSxcbiAgfSxcbiAgc2Nyb2xsV2l0aE91dHB1dDoge1xuICAgIHRpdGxlOiBcIlNjcm9sbCB3aXRoIG91dHB1dFwiLFxuICAgIHR5cGU6IFwiYm9vbGVhblwiLFxuICAgIGRlZmF1bHQ6IHRydWUsXG4gIH0sXG4gIHN0b3BPblJlcnVuOiB7XG4gICAgdGl0bGU6IFwiU3RvcCBydW5uaW5nIHByb2Nlc3Mgb24gcmVydW5cIixcbiAgICB0eXBlOiBcImJvb2xlYW5cIixcbiAgICBkZWZhdWx0OiBmYWxzZSxcbiAgfSxcbiAgY3dkQmVoYXZpb3I6IHtcbiAgICB0aXRsZTogXCJEZWZhdWx0IEN1cnJlbnQgV29ya2luZyBEaXJlY3RvcnkgKENXRCkgQmVoYXZpb3JcIixcbiAgICBkZXNjcmlwdGlvbjogXCJJZiBubyBSdW4gT3B0aW9ucyBhcmUgc2V0LCB0aGlzIHNldHRpbmcgZGVjaWRlcyBob3cgdG8gZGV0ZXJtaW5lIHRoZSBDV0RcIixcbiAgICB0eXBlOiBcInN0cmluZ1wiLFxuICAgIGRlZmF1bHQ6IFwiRmlyc3QgcHJvamVjdCBkaXJlY3RvcnlcIixcbiAgICBlbnVtOiBbXCJGaXJzdCBwcm9qZWN0IGRpcmVjdG9yeVwiLCBcIlByb2plY3QgZGlyZWN0b3J5IG9mIHRoZSBzY3JpcHRcIiwgXCJEaXJlY3Rvcnkgb2YgdGhlIHNjcmlwdFwiXSxcbiAgfSxcbiAgcG9zaXRpb246IHtcbiAgICB0aXRsZTogXCJQYW5lbCBwb3NpdGlvblwiLFxuICAgIGRlc2NyaXB0aW9uOiBgUG9zaXRpb24gb2YgdGhlIHBhbmVsIHdpdGggc2NyaXB0IG91dHB1dC5cbiAgICAoQ2hhbmdlcyB0byB0aGlzIHZhbHVlIHdpbGwgYmUgYXBwbGllZCB1cG9uIHJlb3BlbmluZyB0aGUgcGFuZWwuKWAsXG4gICAgdHlwZTogXCJzdHJpbmdcIixcbiAgICBkZWZhdWx0OiBcImJvdHRvbVwiLFxuICAgIGVudW06IFtcInRvcFwiLCBcImJvdHRvbVwiLCBcImxlZnRcIiwgXCJyaWdodFwiXSxcbiAgfSxcbn1cblxuLy8gRm9yIHNvbWUgcmVhc29uLCB0aGUgdGV4dCBvZiB0aGVzZSBvcHRpb25zIGRvZXMgbm90IHNob3cgaW4gcGFja2FnZSBzZXR0aW5ncyB2aWV3XG4vLyBkZWZhdWx0OiAnZmlyc3RQcm9qJ1xuLy8gZW51bTogW1xuLy8gICB7dmFsdWU6ICdmaXJzdFByb2onLCBkZXNjcmlwdGlvbjogJ0ZpcnN0IHByb2plY3QgZGlyZWN0b3J5IChpZiB0aGVyZSBpcyBvbmUpJ31cbi8vICAge3ZhbHVlOiAnc2NyaXB0UHJvaicsIGRlc2NyaXB0aW9uOiAnUHJvamVjdCBkaXJlY3Rvcnkgb2YgdGhlIHNjcmlwdCAoaWYgdGhlcmUgaXMgb25lKSd9XG4vLyAgIHt2YWx1ZTogJ3NjcmlwdERpcicsIGRlc2NyaXB0aW9uOiAnRGlyZWN0b3J5IG9mIHRoZSBzY3JpcHQnfVxuLy8gXVxubGV0IHNjcmlwdFZpZXcgPSBudWxsXG5sZXQgc2NyaXB0T3B0aW9uc1ZpZXcgPSBudWxsXG5sZXQgc2NyaXB0UHJvZmlsZVJ1blZpZXcgPSBudWxsXG5sZXQgc2NyaXB0T3B0aW9ucyA9IG51bGxcbmxldCBzY3JpcHRQcm9maWxlcyA9IFtdXG5sZXQgcnVudGltZSA9IG51bGxcbmNvbnN0IHN1YnNjcmlwdGlvbnMgPSBuZXcgQ29tcG9zaXRlRGlzcG9zYWJsZSgpXG5cbmV4cG9ydCBmdW5jdGlvbiBhY3RpdmF0ZShzdGF0ZSkge1xuICBzY3JpcHRWaWV3ID0gbmV3IFNjcmlwdFZpZXcoc3RhdGUuc2NyaXB0Vmlld1N0YXRlKVxuICBzY3JpcHRPcHRpb25zID0gbmV3IFNjcmlwdE9wdGlvbnMoKVxuICBzY3JpcHRPcHRpb25zVmlldyA9IG5ldyBTY3JpcHRPcHRpb25zVmlldyhzY3JpcHRPcHRpb25zKVxuXG4gIC8vIHByb2ZpbGVzIGxvYWRpbmdcbiAgc2NyaXB0UHJvZmlsZXMgPSBbXVxuICBpZiAoc3RhdGUucHJvZmlsZXMpIHtcbiAgICBmb3IgKGNvbnN0IHByb2ZpbGUgb2Ygc3RhdGUucHJvZmlsZXMpIHtcbiAgICAgIGNvbnN0IHNvID0gU2NyaXB0T3B0aW9ucy5jcmVhdGVGcm9tT3B0aW9ucyhwcm9maWxlLm5hbWUsIHByb2ZpbGUpXG4gICAgICBzY3JpcHRQcm9maWxlcy5wdXNoKHNvKVxuICAgIH1cbiAgfVxuXG4gIHNjcmlwdFByb2ZpbGVSdW5WaWV3ID0gbmV3IFNjcmlwdFByb2ZpbGVSdW5WaWV3KHNjcmlwdFByb2ZpbGVzKVxuXG4gIGNvbnN0IGNvZGVDb250ZXh0QnVpbGRlciA9IG5ldyBDb2RlQ29udGV4dEJ1aWxkZXIoKVxuICBjb25zdCBydW5uZXIgPSBuZXcgUnVubmVyKHNjcmlwdE9wdGlvbnMpXG5cbiAgY29uc3Qgb2JzZXJ2ZXIgPSBuZXcgVmlld1J1bnRpbWVPYnNlcnZlcihzY3JpcHRWaWV3KVxuXG4gIHJ1bnRpbWUgPSBuZXcgUnVudGltZShydW5uZXIsIGNvZGVDb250ZXh0QnVpbGRlciwgW29ic2VydmVyXSlcblxuICBzdWJzY3JpcHRpb25zLmFkZChcbiAgICBhdG9tLmNvbW1hbmRzLmFkZChcImF0b20td29ya3NwYWNlXCIsIHtcbiAgICAgIFwiY29yZTpjYW5jZWxcIjogKCkgPT4gY2xvc2VTY3JpcHRWaWV3QW5kU3RvcFJ1bm5lcigpLFxuICAgICAgXCJjb3JlOmNsb3NlXCI6ICgpID0+IGNsb3NlU2NyaXB0Vmlld0FuZFN0b3BSdW5uZXIoKSxcbiAgICAgIFwic2NyaXB0OmNsb3NlLXZpZXdcIjogKCkgPT4gY2xvc2VTY3JpcHRWaWV3QW5kU3RvcFJ1bm5lcigpLFxuICAgICAgXCJzY3JpcHQ6Y29weS1ydW4tcmVzdWx0c1wiOiAoKSA9PiBzY3JpcHRWaWV3LmNvcHlSZXN1bHRzKCksXG4gICAgICBcInNjcmlwdDpraWxsLXByb2Nlc3NcIjogKCkgPT4gcnVudGltZS5zdG9wKCksXG4gICAgICBcInNjcmlwdDpydW4tYnktbGluZS1udW1iZXJcIjogKCkgPT4gcnVudGltZS5leGVjdXRlKFwiTGluZSBOdW1iZXIgQmFzZWRcIiksXG4gICAgICBcInNjcmlwdDpydW5cIjogKCkgPT4gcnVudGltZS5leGVjdXRlKFwiU2VsZWN0aW9uIEJhc2VkXCIpLFxuICAgIH0pXG4gIClcblxuICAvLyBwcm9maWxlIGNyZWF0ZWRcbiAgc2NyaXB0T3B0aW9uc1ZpZXcub25Qcm9maWxlU2F2ZSgocHJvZmlsZURhdGEpID0+IHtcbiAgICAvLyBjcmVhdGUgYW5kIGZpbGwgb3V0IHByb2ZpbGVcbiAgICBjb25zdCBwcm9maWxlID0gU2NyaXB0T3B0aW9ucy5jcmVhdGVGcm9tT3B0aW9ucyhwcm9maWxlRGF0YS5uYW1lLCBwcm9maWxlRGF0YS5vcHRpb25zKVxuXG4gICAgY29uc3QgY29kZUNvbnRleHQgPSBydW50aW1lLmNvZGVDb250ZXh0QnVpbGRlci5idWlsZENvZGVDb250ZXh0KFxuICAgICAgYXRvbS53b3Jrc3BhY2UuZ2V0QWN0aXZlVGV4dEVkaXRvcigpLFxuICAgICAgXCJTZWxlY3Rpb24gQmFzZWRcIlxuICAgIClcbiAgICBwcm9maWxlLmxhbmcgPSBjb2RlQ29udGV4dC5sYW5nXG5cbiAgICAvLyBmb3JtYXR0aW5nIGRlc2NyaXB0aW9uXG4gICAgY29uc3Qgb3B0cyA9IHByb2ZpbGUudG9PYmplY3QoKVxuICAgIGxldCBkZXNjID0gYExhbmd1YWdlOiAke2NvZGVDb250ZXh0Lmxhbmd9YFxuICAgIGlmIChvcHRzLmNtZCkge1xuICAgICAgZGVzYyArPSBgLCBDb21tYW5kOiAke29wdHMuY21kfWBcbiAgICB9XG4gICAgaWYgKG9wdHMuY21kQXJncyAmJiBvcHRzLmNtZCkge1xuICAgICAgZGVzYyArPSBgICR7b3B0cy5jbWRBcmdzLmpvaW4oXCIgXCIpfWBcbiAgICB9XG5cbiAgICBwcm9maWxlLmRlc2NyaXB0aW9uID0gZGVzY1xuICAgIHNjcmlwdFByb2ZpbGVzLnB1c2gocHJvZmlsZSlcblxuICAgIHNjcmlwdE9wdGlvbnNWaWV3LmhpZGUoKVxuICAgIHNjcmlwdFByb2ZpbGVSdW5WaWV3LnNob3coKVxuICAgIHNjcmlwdFByb2ZpbGVSdW5WaWV3LnNldFByb2ZpbGVzKHNjcmlwdFByb2ZpbGVzKVxuICB9KVxuXG4gIC8vIHByb2ZpbGUgZGVsZXRlZFxuICBzY3JpcHRQcm9maWxlUnVuVmlldy5vblByb2ZpbGVEZWxldGUoKHByb2ZpbGUpID0+IHtcbiAgICBjb25zdCBpbmRleCA9IHNjcmlwdFByb2ZpbGVzLmluZGV4T2YocHJvZmlsZSlcbiAgICBpZiAoaW5kZXggPT09IC0xKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICBpZiAoaW5kZXggIT09IC0xKSB7XG4gICAgICBzY3JpcHRQcm9maWxlcy5zcGxpY2UoaW5kZXgsIDEpXG4gICAgfVxuICAgIHNjcmlwdFByb2ZpbGVSdW5WaWV3LnNldFByb2ZpbGVzKHNjcmlwdFByb2ZpbGVzKVxuICB9KVxuXG4gIC8vIHByb2ZpbGUgcmVuYW1lZFxuICBzY3JpcHRQcm9maWxlUnVuVmlldy5vblByb2ZpbGVDaGFuZ2UoKGRhdGEpID0+IHtcbiAgICBjb25zdCBpbmRleCA9IHNjcmlwdFByb2ZpbGVzLmluZGV4T2YoZGF0YS5wcm9maWxlKVxuICAgIGlmIChpbmRleCA9PT0gLTEgfHwgIXNjcmlwdFByb2ZpbGVzW2luZGV4XVtkYXRhLmtleV0pIHtcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIHNjcmlwdFByb2ZpbGVzW2luZGV4XVtkYXRhLmtleV0gPSBkYXRhLnZhbHVlXG4gICAgc2NyaXB0UHJvZmlsZVJ1blZpZXcuc2hvdygpXG4gICAgc2NyaXB0UHJvZmlsZVJ1blZpZXcuc2V0UHJvZmlsZXMoc2NyaXB0UHJvZmlsZXMpXG4gIH0pXG5cbiAgLy8gcHJvZmlsZSByZW5hbWVkXG4gIHJldHVybiBzY3JpcHRQcm9maWxlUnVuVmlldy5vblByb2ZpbGVSdW4oKHByb2ZpbGUpID0+IHtcbiAgICBpZiAoIXByb2ZpbGUpIHtcbiAgICAgIHJldHVyblxuICAgIH1cbiAgICBydW50aW1lLmV4ZWN1dGUoXCJTZWxlY3Rpb24gQmFzZWRcIiwgbnVsbCwgcHJvZmlsZSlcbiAgfSlcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRlYWN0aXZhdGUoKSB7XG4gIHJ1bnRpbWUuZGVzdHJveSgpXG4gIHNjcmlwdFZpZXcucmVtb3ZlUGFuZWwoKVxuICBzY3JpcHRPcHRpb25zVmlldy5jbG9zZSgpXG4gIHNjcmlwdFByb2ZpbGVSdW5WaWV3LmNsb3NlKClcbiAgc3Vic2NyaXB0aW9ucy5kaXNwb3NlKClcbiAgR3JhbW1hclV0aWxzLmRlbGV0ZVRlbXBGaWxlcygpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjbG9zZVNjcmlwdFZpZXdBbmRTdG9wUnVubmVyKCkge1xuICBydW50aW1lLnN0b3AoKVxuICBzY3JpcHRWaWV3LnJlbW92ZVBhbmVsKClcbn1cblxuLy8gUHVibGljXG4vL1xuLy8gU2VydmljZSBtZXRob2QgdGhhdCBwcm92aWRlcyB0aGUgZGVmYXVsdCBydW50aW1lIHRoYXQncyBjb25maWd1cmFibGUgdGhyb3VnaCBBdG9tIGVkaXRvclxuLy8gVXNlIHRoaXMgc2VydmljZSBpZiB5b3Ugd2FudCB0byBkaXJlY3RseSBzaG93IHRoZSBzY3JpcHQncyBvdXRwdXQgaW4gdGhlIEF0b20gZWRpdG9yXG4vL1xuLy8gKipEbyBub3QgZGVzdHJveSB0aGlzIHtSdW50aW1lfSBpbnN0YW5jZSEqKiBCeSBkb2luZyBzbyB5b3UnbGwgYnJlYWsgdGhpcyBwbHVnaW4hXG4vL1xuLy8gQWxzbyBub3RlIHRoYXQgdGhlIFNjcmlwdCBwYWNrYWdlIGlzbid0IGFjdGl2YXRlZCB1bnRpbCB5b3UgYWN0dWFsbHkgdHJ5IHRvIHVzZSBpdC5cbi8vIFRoYXQncyB3aHkgdGhpcyBzZXJ2aWNlIHdvbid0IGJlIGF1dG9tYXRpY2FsbHkgY29uc3VtZWQuIFRvIGJlIHN1cmUgeW91IGNvbnN1bWUgaXRcbi8vIHlvdSBtYXkgbmVlZCB0byBtYW51YWxseSBhY3RpdmF0ZSB0aGUgcGFja2FnZTpcbi8vXG4vLyBhdG9tLnBhY2thZ2VzLmxvYWRQYWNrYWdlKCdzY3JpcHQnKS5hY3RpdmF0ZU5vdygpICMgdGhpcyBjb2RlIGRvZXNuJ3QgaW5jbHVkZSBlcnJvciBoYW5kbGluZyFcbi8vXG4vLyBzZWUgaHR0cHM6Ly9naXRodWIuY29tL3MxbXBsZXgvQXRvbS1TY3JpcHQtUnVudGltZS1Db25zdW1lci1TYW1wbGUgZm9yIGEgZnVsbCBleGFtcGxlXG5leHBvcnQgZnVuY3Rpb24gcHJvdmlkZURlZmF1bHRSdW50aW1lKCkge1xuICByZXR1cm4gcnVudGltZVxufVxuXG4vLyBQdWJsaWNcbi8vXG4vLyBTZXJ2aWNlIG1ldGhvZCB0aGF0IHByb3ZpZGVzIGEgYmxhbmsgcnVudGltZS4gWW91IGFyZSBmcmVlIHRvIGNvbmZpZ3VyZSBhbnkgYXNwZWN0IG9mIGl0OlxuLy8gKiBBZGQgb2JzZXJ2ZXIgKGBydW50aW1lLmFkZE9ic2VydmVyKG9ic2VydmVyKWApIC0gc2VlIHtWaWV3UnVudGltZU9ic2VydmVyfSBmb3IgYW4gZXhhbXBsZVxuLy8gKiBjb25maWd1cmUgc2NyaXB0IG9wdGlvbnMgKGBydW50aW1lLnNjcmlwdE9wdGlvbnNgKVxuLy9cbi8vIEluIGNvbnRyYXN0IHRvIGBwcm92aWRlRGVmYXVsdFJ1bnRpbWVgIHlvdSBzaG91bGQgZGlzcG9zZSB0aGlzIHtSdW50aW1lfSB3aGVuXG4vLyB5b3Ugbm8gbG9uZ2VyIG5lZWQgaXQuXG4vL1xuLy8gQWxzbyBub3RlIHRoYXQgdGhlIFNjcmlwdCBwYWNrYWdlIGlzbid0IGFjdGl2YXRlZCB1bnRpbCB5b3UgYWN0dWFsbHkgdHJ5IHRvIHVzZSBpdC5cbi8vIFRoYXQncyB3aHkgdGhpcyBzZXJ2aWNlIHdvbid0IGJlIGF1dG9tYXRpY2FsbHkgY29uc3VtZWQuIFRvIGJlIHN1cmUgeW91IGNvbnN1bWUgaXRcbi8vIHlvdSBtYXkgbmVlZCB0byBtYW51YWxseSBhY3RpdmF0ZSB0aGUgcGFja2FnZTpcbi8vXG4vLyBhdG9tLnBhY2thZ2VzLmxvYWRQYWNrYWdlKCdzY3JpcHQnKS5hY3RpdmF0ZU5vdygpICMgdGhpcyBjb2RlIGRvZXNuJ3QgaW5jbHVkZSBlcnJvciBoYW5kbGluZyFcbi8vXG4vLyBzZWUgaHR0cHM6Ly9naXRodWIuY29tL3MxbXBsZXgvQXRvbS1TY3JpcHQtUnVudGltZS1Db25zdW1lci1TYW1wbGUgZm9yIGEgZnVsbCBleGFtcGxlXG5leHBvcnQgZnVuY3Rpb24gcHJvdmlkZUJsYW5rUnVudGltZSgpIHtcbiAgY29uc3QgcnVubmVyID0gbmV3IFJ1bm5lcihuZXcgU2NyaXB0T3B0aW9ucygpKVxuICBjb25zdCBjb2RlQ29udGV4dEJ1aWxkZXIgPSBuZXcgQ29kZUNvbnRleHRCdWlsZGVyKClcblxuICByZXR1cm4gbmV3IFJ1bnRpbWUocnVubmVyLCBjb2RlQ29udGV4dEJ1aWxkZXIsIFtdKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gc2VyaWFsaXplKCkge1xuICAvLyBUT0RPOiBUcnVlIHNlcmlhbGl6YXRpb24gbmVlZHMgdG8gdGFrZSB0aGUgb3B0aW9ucyB2aWV3IGludG8gYWNjb3VudFxuICAvLyAgICAgICBhbmQgaGFuZGxlIGRlc2VyaWFsaXphdGlvblxuICBjb25zdCBzZXJpYWxpemVkUHJvZmlsZXMgPSBbXVxuICBmb3IgKGNvbnN0IHByb2ZpbGUgb2Ygc2NyaXB0UHJvZmlsZXMpIHtcbiAgICBzZXJpYWxpemVkUHJvZmlsZXMucHVzaChwcm9maWxlLnRvT2JqZWN0KCkpXG4gIH1cblxuICByZXR1cm4ge1xuICAgIHNjcmlwdFZpZXdTdGF0ZTogc2NyaXB0Vmlldy5zZXJpYWxpemUoKSxcbiAgICBzY3JpcHRPcHRpb25zVmlld1N0YXRlOiBzY3JpcHRPcHRpb25zVmlldy5zZXJpYWxpemUoKSxcbiAgICBwcm9maWxlczogc2VyaWFsaXplZFByb2ZpbGVzLFxuICB9XG59XG4iXX0=