function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _grammarUtils = require('../grammar-utils');

var _grammarUtils2 = _interopRequireDefault(_grammarUtils);

'use babel';

var babel = _path2['default'].join(__dirname, '../..', 'node_modules', '.bin', _grammarUtils2['default'].OperatingSystem.isWindows() ? 'babel.cmd' : 'babel');
var babelConfig = _path2['default'].join(__dirname, 'babel.config.js');

var _args = function _args(_ref) {
  var filepath = _ref.filepath;

  var cmd = '\'' + babel + '\' --filename \'' + filepath + '\' --config-file ' + babelConfig + ' < \'' + filepath + '\'| node';
  return _grammarUtils2['default'].formatArgs(cmd);
};
exports.Dart = {
  'Selection Based': {
    command: 'dart',
    args: function args(context) {
      var code = context.getCode();
      var tmpFile = _grammarUtils2['default'].createTempFileWithCode(code, '.dart');
      return [tmpFile];
    }
  },
  'File Based': {
    command: 'dart',
    args: function args(_ref2) {
      var filepath = _ref2.filepath;
      return [filepath];
    }
  }
};
exports.JavaScript = {
  'Selection Based': {
    command: _grammarUtils2['default'].command,
    args: function args(context) {
      var code = context.getCode();
      var filepath = _grammarUtils2['default'].createTempFileWithCode(code, '.js');
      return _args({ filepath: filepath });
    }
  },
  'File Based': { command: _grammarUtils2['default'].command, args: _args }
};
exports['Babel ES6 JavaScript'] = exports.JavaScript;
exports['JavaScript with JSX'] = exports.JavaScript;

exports['JavaScript for Automation (JXA)'] = {
  'Selection Based': {
    command: 'osascript',
    args: function args(context) {
      return ['-l', 'JavaScript', '-e', context.getCode()];
    }
  },
  'File Based': {
    command: 'osascript',
    args: function args(_ref3) {
      var filepath = _ref3.filepath;
      return ['-l', 'JavaScript', filepath];
    }
  }
};
exports.TypeScript = {
  'Selection Based': {
    command: 'ts-node',
    args: function args(context) {
      return ['-e', context.getCode()];
    }
  },
  'File Based': {
    command: 'ts-node',
    args: function args(_ref4) {
      var filepath = _ref4.filepath;
      return [filepath];
    }
  }
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZpbGU6Ly8vQzovVXNlcnMvY2tuanUvLmF0b20vcGFja2FnZXMvc2NyaXB0L2xpYi9ncmFtbWFycy9qYXZhc2NyaXB0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O29CQUVpQixNQUFNOzs7OzRCQUNFLGtCQUFrQjs7OztBQUgzQyxXQUFXLENBQUM7O0FBS1osSUFBTSxLQUFLLEdBQUcsa0JBQUssSUFBSSxDQUFDLFNBQVMsRUFBRSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sRUFBRSwwQkFBYSxlQUFlLENBQUMsU0FBUyxFQUFFLEdBQUcsV0FBVyxHQUFHLE9BQU8sQ0FBQyxDQUFDO0FBQ3RJLElBQU0sV0FBVyxHQUFHLGtCQUFLLElBQUksQ0FBQyxTQUFTLEVBQUUsaUJBQWlCLENBQUMsQ0FBQzs7QUFFNUQsSUFBTSxLQUFJLEdBQUcsU0FBUCxLQUFJLENBQUksSUFBWSxFQUFLO01BQWYsUUFBUSxHQUFWLElBQVksQ0FBVixRQUFROztBQUN0QixNQUFNLEdBQUcsVUFBTyxLQUFLLHdCQUFpQixRQUFRLHlCQUFtQixXQUFXLGFBQU8sUUFBUSxhQUFTLENBQUM7QUFDckcsU0FBTywwQkFBYSxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUM7Q0FDckMsQ0FBQztBQUNGLE9BQU8sQ0FBQyxJQUFJLEdBQUc7QUFDYixtQkFBaUIsRUFBRTtBQUNqQixXQUFPLEVBQUUsTUFBTTtBQUNmLFFBQUksRUFBRSxjQUFDLE9BQU8sRUFBSztBQUNqQixVQUFNLElBQUksR0FBRyxPQUFPLENBQUMsT0FBTyxFQUFFLENBQUM7QUFDL0IsVUFBTSxPQUFPLEdBQUcsMEJBQWEsc0JBQXNCLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0FBQ25FLGFBQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztLQUNsQjtHQUNGO0FBQ0QsY0FBWSxFQUFFO0FBQ1osV0FBTyxFQUFFLE1BQU07QUFDZixRQUFJLEVBQUUsY0FBQyxLQUFZO1VBQVYsUUFBUSxHQUFWLEtBQVksQ0FBVixRQUFRO2FBQU8sQ0FBQyxRQUFRLENBQUM7S0FBQTtHQUNuQztDQUNGLENBQUM7QUFDRixPQUFPLENBQUMsVUFBVSxHQUFHO0FBQ25CLG1CQUFpQixFQUFFO0FBQ2pCLFdBQU8sRUFBRSwwQkFBYSxPQUFPO0FBQzdCLFFBQUksRUFBRSxjQUFDLE9BQU8sRUFBSztBQUNqQixVQUFNLElBQUksR0FBRyxPQUFPLENBQUMsT0FBTyxFQUFFLENBQUM7QUFDL0IsVUFBTSxRQUFRLEdBQUcsMEJBQWEsc0JBQXNCLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDO0FBQ2xFLGFBQU8sS0FBSSxDQUFDLEVBQUUsUUFBUSxFQUFSLFFBQVEsRUFBRSxDQUFDLENBQUM7S0FDM0I7R0FDRjtBQUNELGNBQVksRUFBRSxFQUFFLE9BQU8sRUFBRSwwQkFBYSxPQUFPLEVBQUUsSUFBSSxFQUFKLEtBQUksRUFBRTtDQUN0RCxDQUFDO0FBQ0YsT0FBTyxDQUFDLHNCQUFzQixDQUFDLEdBQUcsT0FBTyxDQUFDLFVBQVUsQ0FBQztBQUNyRCxPQUFPLENBQUMscUJBQXFCLENBQUMsR0FBRyxPQUFPLENBQUMsVUFBVSxDQUFDOztBQUVwRCxPQUFPLENBQUMsaUNBQWlDLENBQUMsR0FBRztBQUMzQyxtQkFBaUIsRUFBRTtBQUNqQixXQUFPLEVBQUUsV0FBVztBQUNwQixRQUFJLEVBQUUsY0FBQyxPQUFPO2FBQUssQ0FBQyxJQUFJLEVBQUUsWUFBWSxFQUFFLElBQUksRUFBRSxPQUFPLENBQUMsT0FBTyxFQUFFLENBQUM7S0FBQTtHQUNqRTtBQUNELGNBQVksRUFBRTtBQUNaLFdBQU8sRUFBRSxXQUFXO0FBQ3BCLFFBQUksRUFBRSxjQUFDLEtBQVk7VUFBVixRQUFRLEdBQVYsS0FBWSxDQUFWLFFBQVE7YUFBTyxDQUFDLElBQUksRUFBRSxZQUFZLEVBQUUsUUFBUSxDQUFDO0tBQUE7R0FDdkQ7Q0FDRixDQUFDO0FBQ0YsT0FBTyxDQUFDLFVBQVUsR0FBRztBQUNuQixtQkFBaUIsRUFBRTtBQUNqQixXQUFPLEVBQUUsU0FBUztBQUNsQixRQUFJLEVBQUUsY0FBQyxPQUFPO2FBQUssQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLE9BQU8sRUFBRSxDQUFDO0tBQUE7R0FDN0M7QUFDRCxjQUFZLEVBQUU7QUFDWixXQUFPLEVBQUUsU0FBUztBQUNsQixRQUFJLEVBQUUsY0FBQyxLQUFZO1VBQVYsUUFBUSxHQUFWLEtBQVksQ0FBVixRQUFRO2FBQU8sQ0FBQyxRQUFRLENBQUM7S0FBQTtHQUNuQztDQUNGLENBQUMiLCJmaWxlIjoiZmlsZTovLy9DOi9Vc2Vycy9ja25qdS8uYXRvbS9wYWNrYWdlcy9zY3JpcHQvbGliL2dyYW1tYXJzL2phdmFzY3JpcHQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIGJhYmVsJztcblxuaW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XG5pbXBvcnQgR3JhbW1hclV0aWxzIGZyb20gJy4uL2dyYW1tYXItdXRpbHMnO1xuXG5jb25zdCBiYWJlbCA9IHBhdGguam9pbihfX2Rpcm5hbWUsICcuLi8uLicsICdub2RlX21vZHVsZXMnLCAnLmJpbicsIEdyYW1tYXJVdGlscy5PcGVyYXRpbmdTeXN0ZW0uaXNXaW5kb3dzKCkgPyAnYmFiZWwuY21kJyA6ICdiYWJlbCcpO1xuY29uc3QgYmFiZWxDb25maWcgPSBwYXRoLmpvaW4oX19kaXJuYW1lLCAnYmFiZWwuY29uZmlnLmpzJyk7XG5cbmNvbnN0IGFyZ3MgPSAoeyBmaWxlcGF0aCB9KSA9PiB7XG4gIGNvbnN0IGNtZCA9IGAnJHtiYWJlbH0nIC0tZmlsZW5hbWUgJyR7ZmlsZXBhdGh9JyAtLWNvbmZpZy1maWxlICR7YmFiZWxDb25maWd9IDwgJyR7ZmlsZXBhdGh9J3wgbm9kZWA7XG4gIHJldHVybiBHcmFtbWFyVXRpbHMuZm9ybWF0QXJncyhjbWQpO1xufTtcbmV4cG9ydHMuRGFydCA9IHtcbiAgJ1NlbGVjdGlvbiBCYXNlZCc6IHtcbiAgICBjb21tYW5kOiAnZGFydCcsXG4gICAgYXJnczogKGNvbnRleHQpID0+IHtcbiAgICAgIGNvbnN0IGNvZGUgPSBjb250ZXh0LmdldENvZGUoKTtcbiAgICAgIGNvbnN0IHRtcEZpbGUgPSBHcmFtbWFyVXRpbHMuY3JlYXRlVGVtcEZpbGVXaXRoQ29kZShjb2RlLCAnLmRhcnQnKTtcbiAgICAgIHJldHVybiBbdG1wRmlsZV07XG4gICAgfSxcbiAgfSxcbiAgJ0ZpbGUgQmFzZWQnOiB7XG4gICAgY29tbWFuZDogJ2RhcnQnLFxuICAgIGFyZ3M6ICh7IGZpbGVwYXRoIH0pID0+IFtmaWxlcGF0aF0sXG4gIH0sXG59O1xuZXhwb3J0cy5KYXZhU2NyaXB0ID0ge1xuICAnU2VsZWN0aW9uIEJhc2VkJzoge1xuICAgIGNvbW1hbmQ6IEdyYW1tYXJVdGlscy5jb21tYW5kLFxuICAgIGFyZ3M6IChjb250ZXh0KSA9PiB7XG4gICAgICBjb25zdCBjb2RlID0gY29udGV4dC5nZXRDb2RlKCk7XG4gICAgICBjb25zdCBmaWxlcGF0aCA9IEdyYW1tYXJVdGlscy5jcmVhdGVUZW1wRmlsZVdpdGhDb2RlKGNvZGUsICcuanMnKTtcbiAgICAgIHJldHVybiBhcmdzKHsgZmlsZXBhdGggfSk7XG4gICAgfSxcbiAgfSxcbiAgJ0ZpbGUgQmFzZWQnOiB7IGNvbW1hbmQ6IEdyYW1tYXJVdGlscy5jb21tYW5kLCBhcmdzIH0sXG59O1xuZXhwb3J0c1snQmFiZWwgRVM2IEphdmFTY3JpcHQnXSA9IGV4cG9ydHMuSmF2YVNjcmlwdDtcbmV4cG9ydHNbJ0phdmFTY3JpcHQgd2l0aCBKU1gnXSA9IGV4cG9ydHMuSmF2YVNjcmlwdDtcblxuZXhwb3J0c1snSmF2YVNjcmlwdCBmb3IgQXV0b21hdGlvbiAoSlhBKSddID0ge1xuICAnU2VsZWN0aW9uIEJhc2VkJzoge1xuICAgIGNvbW1hbmQ6ICdvc2FzY3JpcHQnLFxuICAgIGFyZ3M6IChjb250ZXh0KSA9PiBbJy1sJywgJ0phdmFTY3JpcHQnLCAnLWUnLCBjb250ZXh0LmdldENvZGUoKV0sXG4gIH0sXG4gICdGaWxlIEJhc2VkJzoge1xuICAgIGNvbW1hbmQ6ICdvc2FzY3JpcHQnLFxuICAgIGFyZ3M6ICh7IGZpbGVwYXRoIH0pID0+IFsnLWwnLCAnSmF2YVNjcmlwdCcsIGZpbGVwYXRoXSxcbiAgfSxcbn07XG5leHBvcnRzLlR5cGVTY3JpcHQgPSB7XG4gICdTZWxlY3Rpb24gQmFzZWQnOiB7XG4gICAgY29tbWFuZDogJ3RzLW5vZGUnLFxuICAgIGFyZ3M6IChjb250ZXh0KSA9PiBbJy1lJywgY29udGV4dC5nZXRDb2RlKCldLFxuICB9LFxuICAnRmlsZSBCYXNlZCc6IHtcbiAgICBjb21tYW5kOiAndHMtbm9kZScsXG4gICAgYXJnczogKHsgZmlsZXBhdGggfSkgPT4gW2ZpbGVwYXRoXSxcbiAgfSxcbn07XG4iXX0=