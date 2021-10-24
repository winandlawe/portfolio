(function() {
  var GrammarUtils;

  GrammarUtils = require('../grammar-utils');

  exports.Python = {
    'Selection Based': {
      command: 'python',
      args: function(context) {
        var code, tmpFile;
        code = context.getCode();
        tmpFile = GrammarUtils.createTempFileWithCode(code);
        return ['-u', tmpFile];
      }
    },
    'File Based': {
      command: 'python',
      args: function(arg) {
        var filepath;
        filepath = arg.filepath;
        return ['-u', filepath];
      }
    }
  };

  exports.MagicPython = exports.Python;

  exports.Sage = {
    'Selection Based': {
      command: 'sage',
      args: function(context) {
        var code, tmpFile;
        code = context.getCode();
        tmpFile = GrammarUtils.createTempFileWithCode(code);
        return [tmpFile];
      }
    },
    'File Based': {
      command: 'sage',
      args: function(arg) {
        var filepath;
        filepath = arg.filepath;
        return [filepath];
      }
    }
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZmlsZTovLy9DOi9Vc2Vycy9ja25qdS8uYXRvbS9wYWNrYWdlcy9zY3JpcHQvbGliL2dyYW1tYXJzL3B5dGhvbi5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQSxNQUFBOztFQUFBLFlBQUEsR0FBZSxPQUFBLENBQVEsa0JBQVI7O0VBRWYsT0FBTyxDQUFDLE1BQVIsR0FDRTtJQUFBLGlCQUFBLEVBQ0U7TUFBQSxPQUFBLEVBQVMsUUFBVDtNQUNBLElBQUEsRUFBTSxTQUFDLE9BQUQ7QUFDSixZQUFBO1FBQUEsSUFBQSxHQUFPLE9BQU8sQ0FBQyxPQUFSLENBQUE7UUFDUCxPQUFBLEdBQVUsWUFBWSxDQUFDLHNCQUFiLENBQW9DLElBQXBDO0FBQ1YsZUFBTyxDQUFDLElBQUQsRUFBTyxPQUFQO01BSEgsQ0FETjtLQURGO0lBT0EsWUFBQSxFQUNFO01BQUEsT0FBQSxFQUFTLFFBQVQ7TUFDQSxJQUFBLEVBQU0sU0FBQyxHQUFEO0FBQWdCLFlBQUE7UUFBZCxXQUFEO2VBQWUsQ0FBQyxJQUFELEVBQU8sUUFBUDtNQUFoQixDQUROO0tBUkY7OztFQVdGLE9BQU8sQ0FBQyxXQUFSLEdBQXNCLE9BQU8sQ0FBQzs7RUFFOUIsT0FBTyxDQUFDLElBQVIsR0FDRTtJQUFBLGlCQUFBLEVBQ0U7TUFBQSxPQUFBLEVBQVMsTUFBVDtNQUNBLElBQUEsRUFBTSxTQUFDLE9BQUQ7QUFDSixZQUFBO1FBQUEsSUFBQSxHQUFPLE9BQU8sQ0FBQyxPQUFSLENBQUE7UUFDUCxPQUFBLEdBQVUsWUFBWSxDQUFDLHNCQUFiLENBQW9DLElBQXBDO0FBQ1YsZUFBTyxDQUFDLE9BQUQ7TUFISCxDQUROO0tBREY7SUFPQSxZQUFBLEVBQ0U7TUFBQSxPQUFBLEVBQVMsTUFBVDtNQUNBLElBQUEsRUFBTSxTQUFDLEdBQUQ7QUFBZ0IsWUFBQTtRQUFkLFdBQUQ7ZUFBZSxDQUFDLFFBQUQ7TUFBaEIsQ0FETjtLQVJGOztBQWpCRiIsInNvdXJjZXNDb250ZW50IjpbIkdyYW1tYXJVdGlscyA9IHJlcXVpcmUgJy4uL2dyYW1tYXItdXRpbHMnXG5cbmV4cG9ydHMuUHl0aG9uID1cbiAgJ1NlbGVjdGlvbiBCYXNlZCc6XG4gICAgY29tbWFuZDogJ3B5dGhvbidcbiAgICBhcmdzOiAoY29udGV4dCkgLT5cbiAgICAgIGNvZGUgPSBjb250ZXh0LmdldENvZGUoKVxuICAgICAgdG1wRmlsZSA9IEdyYW1tYXJVdGlscy5jcmVhdGVUZW1wRmlsZVdpdGhDb2RlKGNvZGUpXG4gICAgICByZXR1cm4gWyctdScsIHRtcEZpbGVdXG5cbiAgJ0ZpbGUgQmFzZWQnOlxuICAgIGNvbW1hbmQ6ICdweXRob24nXG4gICAgYXJnczogKHtmaWxlcGF0aH0pIC0+IFsnLXUnLCBmaWxlcGF0aF1cblxuZXhwb3J0cy5NYWdpY1B5dGhvbiA9IGV4cG9ydHMuUHl0aG9uXG5cbmV4cG9ydHMuU2FnZSA9XG4gICdTZWxlY3Rpb24gQmFzZWQnOlxuICAgIGNvbW1hbmQ6ICdzYWdlJ1xuICAgIGFyZ3M6IChjb250ZXh0KSAtPlxuICAgICAgY29kZSA9IGNvbnRleHQuZ2V0Q29kZSgpXG4gICAgICB0bXBGaWxlID0gR3JhbW1hclV0aWxzLmNyZWF0ZVRlbXBGaWxlV2l0aENvZGUoY29kZSlcbiAgICAgIHJldHVybiBbdG1wRmlsZV1cblxuICAnRmlsZSBCYXNlZCc6XG4gICAgY29tbWFuZDogJ3NhZ2UnXG4gICAgYXJnczogKHtmaWxlcGF0aH0pIC0+IFtmaWxlcGF0aF1cbiJdfQ==
