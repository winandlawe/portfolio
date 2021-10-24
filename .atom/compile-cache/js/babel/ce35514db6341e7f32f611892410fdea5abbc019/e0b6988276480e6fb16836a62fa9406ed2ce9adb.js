"use babel";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var message = "SQL requires setting 'Script: Run Options' directly. See https://github.com/atom-ide-community/atom-script/tree/master/examples/hello.sql for further information.";

var DataBaseGrammars = {
  "mongoDB (JavaScript)": {
    "Selection Based": {
      command: "mongo",
      args: function args(context) {
        return ["--eval", context.getCode()];
      }
    },

    "File Based": {
      command: "mongo",
      args: function args(_ref) {
        var filepath = _ref.filepath;

        return [filepath];
      }
    }
  },

  SQL: {
    "Selection Based": {
      command: "echo",
      args: function args() {
        return [message];
      }
    },

    "File Based": {
      command: "echo",
      args: function args() {
        return [message];
      }
    }
  },

  "SQL (PostgreSQL)": {
    "Selection Based": {
      command: "psql",
      args: function args(context) {
        return ["-c", context.getCode()];
      }
    },

    "File Based": {
      command: "psql",
      args: function args(_ref2) {
        var filepath = _ref2.filepath;

        return ["-f", filepath];
      }
    }
  }
};
exports["default"] = DataBaseGrammars;
module.exports = exports["default"];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZpbGU6Ly8vQzovVXNlcnMvY2tuanUvLmF0b20vcGFja2FnZXMvc2NyaXB0L2xpYi9ncmFtbWFycy9kYXRhYmFzZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxXQUFXLENBQUE7Ozs7O0FBRVgsSUFBTSxPQUFPLEdBQ1gsb0tBQW9LLENBQUE7O0FBRXRLLElBQU0sZ0JBQWdCLEdBQUc7QUFDdkIsd0JBQXNCLEVBQUU7QUFDdEIscUJBQWlCLEVBQUU7QUFDakIsYUFBTyxFQUFFLE9BQU87QUFDaEIsVUFBSSxFQUFBLGNBQUMsT0FBTyxFQUFFO0FBQ1osZUFBTyxDQUFDLFFBQVEsRUFBRSxPQUFPLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQTtPQUNyQztLQUNGOztBQUVELGdCQUFZLEVBQUU7QUFDWixhQUFPLEVBQUUsT0FBTztBQUNoQixVQUFJLEVBQUEsY0FBQyxJQUFZLEVBQUU7WUFBWixRQUFRLEdBQVYsSUFBWSxDQUFWLFFBQVE7O0FBQ2IsZUFBTyxDQUFDLFFBQVEsQ0FBQyxDQUFBO09BQ2xCO0tBQ0Y7R0FDRjs7QUFFRCxLQUFHLEVBQUU7QUFDSCxxQkFBaUIsRUFBRTtBQUNqQixhQUFPLEVBQUUsTUFBTTtBQUNmLFVBQUksRUFBQSxnQkFBRztBQUNMLGVBQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQTtPQUNqQjtLQUNGOztBQUVELGdCQUFZLEVBQUU7QUFDWixhQUFPLEVBQUUsTUFBTTtBQUNmLFVBQUksRUFBQSxnQkFBRztBQUNMLGVBQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQTtPQUNqQjtLQUNGO0dBQ0Y7O0FBRUQsb0JBQWtCLEVBQUU7QUFDbEIscUJBQWlCLEVBQUU7QUFDakIsYUFBTyxFQUFFLE1BQU07QUFDZixVQUFJLEVBQUEsY0FBQyxPQUFPLEVBQUU7QUFDWixlQUFPLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFBO09BQ2pDO0tBQ0Y7O0FBRUQsZ0JBQVksRUFBRTtBQUNaLGFBQU8sRUFBRSxNQUFNO0FBQ2YsVUFBSSxFQUFBLGNBQUMsS0FBWSxFQUFFO1lBQVosUUFBUSxHQUFWLEtBQVksQ0FBVixRQUFROztBQUNiLGVBQU8sQ0FBQyxJQUFJLEVBQUUsUUFBUSxDQUFDLENBQUE7T0FDeEI7S0FDRjtHQUNGO0NBQ0YsQ0FBQTtxQkFDYyxnQkFBZ0IiLCJmaWxlIjoiZmlsZTovLy9DOi9Vc2Vycy9ja25qdS8uYXRvbS9wYWNrYWdlcy9zY3JpcHQvbGliL2dyYW1tYXJzL2RhdGFiYXNlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2UgYmFiZWxcIlxuXG5jb25zdCBtZXNzYWdlID1cbiAgXCJTUUwgcmVxdWlyZXMgc2V0dGluZyAnU2NyaXB0OiBSdW4gT3B0aW9ucycgZGlyZWN0bHkuIFNlZSBodHRwczovL2dpdGh1Yi5jb20vYXRvbS1pZGUtY29tbXVuaXR5L2F0b20tc2NyaXB0L3RyZWUvbWFzdGVyL2V4YW1wbGVzL2hlbGxvLnNxbCBmb3IgZnVydGhlciBpbmZvcm1hdGlvbi5cIlxuXG5jb25zdCBEYXRhQmFzZUdyYW1tYXJzID0ge1xuICBcIm1vbmdvREIgKEphdmFTY3JpcHQpXCI6IHtcbiAgICBcIlNlbGVjdGlvbiBCYXNlZFwiOiB7XG4gICAgICBjb21tYW5kOiBcIm1vbmdvXCIsXG4gICAgICBhcmdzKGNvbnRleHQpIHtcbiAgICAgICAgcmV0dXJuIFtcIi0tZXZhbFwiLCBjb250ZXh0LmdldENvZGUoKV1cbiAgICAgIH0sXG4gICAgfSxcblxuICAgIFwiRmlsZSBCYXNlZFwiOiB7XG4gICAgICBjb21tYW5kOiBcIm1vbmdvXCIsXG4gICAgICBhcmdzKHsgZmlsZXBhdGggfSkge1xuICAgICAgICByZXR1cm4gW2ZpbGVwYXRoXVxuICAgICAgfSxcbiAgICB9LFxuICB9LFxuXG4gIFNRTDoge1xuICAgIFwiU2VsZWN0aW9uIEJhc2VkXCI6IHtcbiAgICAgIGNvbW1hbmQ6IFwiZWNob1wiLFxuICAgICAgYXJncygpIHtcbiAgICAgICAgcmV0dXJuIFttZXNzYWdlXVxuICAgICAgfSxcbiAgICB9LFxuXG4gICAgXCJGaWxlIEJhc2VkXCI6IHtcbiAgICAgIGNvbW1hbmQ6IFwiZWNob1wiLFxuICAgICAgYXJncygpIHtcbiAgICAgICAgcmV0dXJuIFttZXNzYWdlXVxuICAgICAgfSxcbiAgICB9LFxuICB9LFxuXG4gIFwiU1FMIChQb3N0Z3JlU1FMKVwiOiB7XG4gICAgXCJTZWxlY3Rpb24gQmFzZWRcIjoge1xuICAgICAgY29tbWFuZDogXCJwc3FsXCIsXG4gICAgICBhcmdzKGNvbnRleHQpIHtcbiAgICAgICAgcmV0dXJuIFtcIi1jXCIsIGNvbnRleHQuZ2V0Q29kZSgpXVxuICAgICAgfSxcbiAgICB9LFxuXG4gICAgXCJGaWxlIEJhc2VkXCI6IHtcbiAgICAgIGNvbW1hbmQ6IFwicHNxbFwiLFxuICAgICAgYXJncyh7IGZpbGVwYXRoIH0pIHtcbiAgICAgICAgcmV0dXJuIFtcIi1mXCIsIGZpbGVwYXRoXVxuICAgICAgfSxcbiAgICB9LFxuICB9LFxufVxuZXhwb3J0IGRlZmF1bHQgRGF0YUJhc2VHcmFtbWFyc1xuIl19