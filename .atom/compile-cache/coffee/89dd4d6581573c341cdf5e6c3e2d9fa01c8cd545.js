(function() {
  var GrammarUtils;

  GrammarUtils = require('../grammar-utils');

  exports['Bash Automated Test System (Bats)'] = {
    'Selection Based': {
      command: 'bats',
      args: function(context) {
        var code, tmpFile;
        code = context.getCode();
        tmpFile = GrammarUtils.createTempFileWithCode(code);
        return [tmpFile];
      }
    },
    'File Based': {
      command: 'bats',
      args: function(arg) {
        var filepath;
        filepath = arg.filepath;
        return [filepath];
      }
    }
  };

  exports.Bash = {
    'Selection Based': {
      command: process.env.SHELL,
      args: function(context) {
        return ['-c', context.getCode()];
      }
    },
    'File Based': {
      command: process.env.SHELL,
      args: function(arg) {
        var filepath;
        filepath = arg.filepath;
        return [filepath];
      }
    }
  };

  exports['Shell Script'] = exports.Bash;

  exports['Shell Script (Fish)'] = {
    'Selection Based': {
      command: 'fish',
      args: function(context) {
        return ['-c', context.getCode()];
      }
    },
    'File Based': {
      command: 'fish',
      args: function(arg) {
        var filepath;
        filepath = arg.filepath;
        return [filepath];
      }
    }
  };

  exports.Tcl = {
    'Selection Based': {
      command: 'tclsh',
      args: function(context) {
        var code, tmpFile;
        code = context.getCode();
        tmpFile = GrammarUtils.createTempFileWithCode(code);
        return [tmpFile];
      }
    },
    'File Based': {
      command: 'tclsh',
      args: function(arg) {
        var filepath;
        filepath = arg.filepath;
        return [filepath];
      }
    }
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZmlsZTovLy9DOi9Vc2Vycy9ja25qdS8uYXRvbS9wYWNrYWdlcy9zY3JpcHQvbGliL2dyYW1tYXJzL3NoZWxsLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUFBLE1BQUE7O0VBQUEsWUFBQSxHQUFlLE9BQUEsQ0FBUSxrQkFBUjs7RUFFZixPQUFRLENBQUEsbUNBQUEsQ0FBUixHQUNFO0lBQUEsaUJBQUEsRUFDRTtNQUFBLE9BQUEsRUFBUyxNQUFUO01BQ0EsSUFBQSxFQUFNLFNBQUMsT0FBRDtBQUNKLFlBQUE7UUFBQSxJQUFBLEdBQU8sT0FBTyxDQUFDLE9BQVIsQ0FBQTtRQUNQLE9BQUEsR0FBVSxZQUFZLENBQUMsc0JBQWIsQ0FBb0MsSUFBcEM7QUFDVixlQUFPLENBQUMsT0FBRDtNQUhILENBRE47S0FERjtJQU9BLFlBQUEsRUFDRTtNQUFBLE9BQUEsRUFBUyxNQUFUO01BQ0EsSUFBQSxFQUFNLFNBQUMsR0FBRDtBQUFnQixZQUFBO1FBQWQsV0FBRDtlQUFlLENBQUMsUUFBRDtNQUFoQixDQUROO0tBUkY7OztFQVdGLE9BQU8sQ0FBQyxJQUFSLEdBQ0U7SUFBQSxpQkFBQSxFQUNFO01BQUEsT0FBQSxFQUFTLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBckI7TUFDQSxJQUFBLEVBQU0sU0FBQyxPQUFEO2VBQWEsQ0FBQyxJQUFELEVBQU8sT0FBTyxDQUFDLE9BQVIsQ0FBQSxDQUFQO01BQWIsQ0FETjtLQURGO0lBSUEsWUFBQSxFQUNFO01BQUEsT0FBQSxFQUFTLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBckI7TUFDQSxJQUFBLEVBQU0sU0FBQyxHQUFEO0FBQWdCLFlBQUE7UUFBZCxXQUFEO2VBQWUsQ0FBQyxRQUFEO01BQWhCLENBRE47S0FMRjs7O0VBUUYsT0FBUSxDQUFBLGNBQUEsQ0FBUixHQUEwQixPQUFPLENBQUM7O0VBRWxDLE9BQVEsQ0FBQSxxQkFBQSxDQUFSLEdBQ0U7SUFBQSxpQkFBQSxFQUNFO01BQUEsT0FBQSxFQUFTLE1BQVQ7TUFDQSxJQUFBLEVBQU0sU0FBQyxPQUFEO2VBQWEsQ0FBQyxJQUFELEVBQU8sT0FBTyxDQUFDLE9BQVIsQ0FBQSxDQUFQO01BQWIsQ0FETjtLQURGO0lBSUEsWUFBQSxFQUNFO01BQUEsT0FBQSxFQUFTLE1BQVQ7TUFDQSxJQUFBLEVBQU0sU0FBQyxHQUFEO0FBQWdCLFlBQUE7UUFBZCxXQUFEO2VBQWUsQ0FBQyxRQUFEO01BQWhCLENBRE47S0FMRjs7O0VBUUYsT0FBTyxDQUFDLEdBQVIsR0FDRTtJQUFBLGlCQUFBLEVBQ0U7TUFBQSxPQUFBLEVBQVMsT0FBVDtNQUNBLElBQUEsRUFBTSxTQUFDLE9BQUQ7QUFDSixZQUFBO1FBQUEsSUFBQSxHQUFPLE9BQU8sQ0FBQyxPQUFSLENBQUE7UUFDUCxPQUFBLEdBQVUsWUFBWSxDQUFDLHNCQUFiLENBQW9DLElBQXBDO0FBQ1YsZUFBTyxDQUFDLE9BQUQ7TUFISCxDQUROO0tBREY7SUFPQSxZQUFBLEVBQ0U7TUFBQSxPQUFBLEVBQVMsT0FBVDtNQUNBLElBQUEsRUFBTSxTQUFDLEdBQUQ7QUFBZ0IsWUFBQTtRQUFkLFdBQUQ7ZUFBZSxDQUFDLFFBQUQ7TUFBaEIsQ0FETjtLQVJGOztBQW5DRiIsInNvdXJjZXNDb250ZW50IjpbIkdyYW1tYXJVdGlscyA9IHJlcXVpcmUgJy4uL2dyYW1tYXItdXRpbHMnXG5cbmV4cG9ydHNbJ0Jhc2ggQXV0b21hdGVkIFRlc3QgU3lzdGVtIChCYXRzKSddID1cbiAgJ1NlbGVjdGlvbiBCYXNlZCc6XG4gICAgY29tbWFuZDogJ2JhdHMnXG4gICAgYXJnczogKGNvbnRleHQpIC0+XG4gICAgICBjb2RlID0gY29udGV4dC5nZXRDb2RlKClcbiAgICAgIHRtcEZpbGUgPSBHcmFtbWFyVXRpbHMuY3JlYXRlVGVtcEZpbGVXaXRoQ29kZShjb2RlKVxuICAgICAgcmV0dXJuIFt0bXBGaWxlXVxuXG4gICdGaWxlIEJhc2VkJzpcbiAgICBjb21tYW5kOiAnYmF0cydcbiAgICBhcmdzOiAoe2ZpbGVwYXRofSkgLT4gW2ZpbGVwYXRoXVxuXG5leHBvcnRzLkJhc2ggPVxuICAnU2VsZWN0aW9uIEJhc2VkJzpcbiAgICBjb21tYW5kOiBwcm9jZXNzLmVudi5TSEVMTFxuICAgIGFyZ3M6IChjb250ZXh0KSAtPiBbJy1jJywgY29udGV4dC5nZXRDb2RlKCldXG5cbiAgJ0ZpbGUgQmFzZWQnOlxuICAgIGNvbW1hbmQ6IHByb2Nlc3MuZW52LlNIRUxMXG4gICAgYXJnczogKHtmaWxlcGF0aH0pIC0+IFtmaWxlcGF0aF1cblxuZXhwb3J0c1snU2hlbGwgU2NyaXB0J10gPSBleHBvcnRzLkJhc2hcblxuZXhwb3J0c1snU2hlbGwgU2NyaXB0IChGaXNoKSddID1cbiAgJ1NlbGVjdGlvbiBCYXNlZCc6XG4gICAgY29tbWFuZDogJ2Zpc2gnXG4gICAgYXJnczogKGNvbnRleHQpIC0+IFsnLWMnLCBjb250ZXh0LmdldENvZGUoKV1cblxuICAnRmlsZSBCYXNlZCc6XG4gICAgY29tbWFuZDogJ2Zpc2gnXG4gICAgYXJnczogKHtmaWxlcGF0aH0pIC0+IFtmaWxlcGF0aF1cblxuZXhwb3J0cy5UY2wgPVxuICAnU2VsZWN0aW9uIEJhc2VkJzpcbiAgICBjb21tYW5kOiAndGNsc2gnXG4gICAgYXJnczogKGNvbnRleHQpIC0+XG4gICAgICBjb2RlID0gY29udGV4dC5nZXRDb2RlKClcbiAgICAgIHRtcEZpbGUgPSBHcmFtbWFyVXRpbHMuY3JlYXRlVGVtcEZpbGVXaXRoQ29kZShjb2RlKVxuICAgICAgcmV0dXJuIFt0bXBGaWxlXVxuXG4gICdGaWxlIEJhc2VkJzpcbiAgICBjb21tYW5kOiAndGNsc2gnXG4gICAgYXJnczogKHtmaWxlcGF0aH0pIC0+IFtmaWxlcGF0aF1cbiJdfQ==
