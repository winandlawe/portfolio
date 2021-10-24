(function() {
  var GrammarUtils, base, ref, ref1, ref2, shell;

  shell = require('electron').shell;

  GrammarUtils = require('../grammar-utils');

  exports.DOT = {
    'Selection Based': {
      command: 'dot',
      args: function(context) {
        var code, tmpFile;
        code = context.getCode();
        tmpFile = GrammarUtils.createTempFileWithCode(code, '.dot');
        return ['-Tpng', tmpFile, '-o', tmpFile + '.png'];
      }
    },
    'File Based': {
      command: 'dot',
      args: function(arg) {
        var filepath;
        filepath = arg.filepath;
        return ['-Tpng', filepath, '-o', filepath + '.png'];
      }
    }
  };

  exports.gnuplot = {
    'File Based': {
      command: 'gnuplot',
      workingDirectory: (ref = atom.workspace.getActivePaneItem()) != null ? (ref1 = ref.buffer) != null ? (ref2 = ref1.file) != null ? typeof ref2.getParent === "function" ? typeof (base = ref2.getParent()).getPath === "function" ? base.getPath() : void 0 : void 0 : void 0 : void 0 : void 0,
      args: function(arg) {
        var filepath;
        filepath = arg.filepath;
        return ['-p', filepath];
      }
    }
  };

  exports['Graphviz (DOT)'] = {
    'Selection Based': {
      command: 'dot',
      args: function(context) {
        var code, tmpFile;
        code = context.getCode();
        tmpFile = GrammarUtils.createTempFileWithCode(code, '.dot');
        return ['-Tpng', tmpFile, '-o', tmpFile + '.png'];
      }
    },
    'File Based': {
      command: 'dot',
      args: function(arg) {
        var filepath;
        filepath = arg.filepath;
        return ['-Tpng', filepath, '-o', filepath + '.png'];
      }
    }
  };

  exports.HTML = {
    'File Based': {
      command: 'echo',
      args: function(arg) {
        var filepath, uri;
        filepath = arg.filepath;
        uri = 'file://' + filepath;
        shell.openExternal(uri);
        return ['HTML file opened at:', uri];
      }
    }
  };

  exports.LaTeX = {
    'File Based': {
      command: 'latexmk',
      args: function(arg) {
        var filepath;
        filepath = arg.filepath;
        return ['-cd', '-quiet', '-pdf', '-pv', '-shell-escape', filepath];
      }
    }
  };

  exports.ConTeXt = {
    'File Based': {
      command: 'context',
      args: function(arg) {
        var filepath;
        filepath = arg.filepath;
        return ['--autopdf', '--nonstopmode', '--synctex', '--noconsole', filepath];
      }
    }
  };

  exports['LaTeX Beamer'] = exports.LaTeX;

  exports['Pandoc Markdown'] = {
    'File Based': {
      command: 'panzer',
      args: function(arg) {
        var filepath;
        filepath = arg.filepath;
        return [filepath, "--output='" + filepath + ".pdf'"];
      }
    }
  };

  exports.Sass = {
    'File Based': {
      command: 'sass',
      args: function(arg) {
        var filepath;
        filepath = arg.filepath;
        return [filepath];
      }
    }
  };

  exports.SCSS = exports.Sass;

}).call(this);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZmlsZTovLy9DOi9Vc2Vycy9ja25qdS8uYXRvbS9wYWNrYWdlcy9zY3JpcHQvbGliL2dyYW1tYXJzL2RvYy5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQSxNQUFBOztFQUFDLFFBQVMsT0FBQSxDQUFRLFVBQVI7O0VBQ1YsWUFBQSxHQUFlLE9BQUEsQ0FBUSxrQkFBUjs7RUFFZixPQUFPLENBQUMsR0FBUixHQUNFO0lBQUEsaUJBQUEsRUFDRTtNQUFBLE9BQUEsRUFBUyxLQUFUO01BQ0EsSUFBQSxFQUFNLFNBQUMsT0FBRDtBQUNKLFlBQUE7UUFBQSxJQUFBLEdBQU8sT0FBTyxDQUFDLE9BQVIsQ0FBQTtRQUNQLE9BQUEsR0FBVSxZQUFZLENBQUMsc0JBQWIsQ0FBb0MsSUFBcEMsRUFBMEMsTUFBMUM7ZUFDVixDQUFDLE9BQUQsRUFBVSxPQUFWLEVBQW1CLElBQW5CLEVBQXlCLE9BQUEsR0FBVSxNQUFuQztNQUhJLENBRE47S0FERjtJQU9BLFlBQUEsRUFDRTtNQUFBLE9BQUEsRUFBUyxLQUFUO01BQ0EsSUFBQSxFQUFNLFNBQUMsR0FBRDtBQUFnQixZQUFBO1FBQWQsV0FBRDtlQUFlLENBQUMsT0FBRCxFQUFVLFFBQVYsRUFBb0IsSUFBcEIsRUFBMEIsUUFBQSxHQUFXLE1BQXJDO01BQWhCLENBRE47S0FSRjs7O0VBV0YsT0FBTyxDQUFDLE9BQVIsR0FDRTtJQUFBLFlBQUEsRUFDRTtNQUFBLE9BQUEsRUFBUyxTQUFUO01BQ0EsZ0JBQUEsdU5BQWdGLENBQUMsc0RBRGpGO01BRUEsSUFBQSxFQUFNLFNBQUMsR0FBRDtBQUFnQixZQUFBO1FBQWQsV0FBRDtlQUFlLENBQUMsSUFBRCxFQUFPLFFBQVA7TUFBaEIsQ0FGTjtLQURGOzs7RUFLRixPQUFRLENBQUEsZ0JBQUEsQ0FBUixHQUVFO0lBQUEsaUJBQUEsRUFDRTtNQUFBLE9BQUEsRUFBUyxLQUFUO01BQ0EsSUFBQSxFQUFNLFNBQUMsT0FBRDtBQUNKLFlBQUE7UUFBQSxJQUFBLEdBQU8sT0FBTyxDQUFDLE9BQVIsQ0FBQTtRQUNQLE9BQUEsR0FBVSxZQUFZLENBQUMsc0JBQWIsQ0FBb0MsSUFBcEMsRUFBMEMsTUFBMUM7QUFDVixlQUFPLENBQUMsT0FBRCxFQUFVLE9BQVYsRUFBbUIsSUFBbkIsRUFBeUIsT0FBQSxHQUFVLE1BQW5DO01BSEgsQ0FETjtLQURGO0lBT0EsWUFBQSxFQUNFO01BQUEsT0FBQSxFQUFTLEtBQVQ7TUFDQSxJQUFBLEVBQU0sU0FBQyxHQUFEO0FBQWdCLFlBQUE7UUFBZCxXQUFEO2VBQWUsQ0FBQyxPQUFELEVBQVUsUUFBVixFQUFvQixJQUFwQixFQUEwQixRQUFBLEdBQVcsTUFBckM7TUFBaEIsQ0FETjtLQVJGOzs7RUFXRixPQUFPLENBQUMsSUFBUixHQUNFO0lBQUEsWUFBQSxFQUNFO01BQUEsT0FBQSxFQUFTLE1BQVQ7TUFDQSxJQUFBLEVBQU0sU0FBQyxHQUFEO0FBQ0osWUFBQTtRQURNLFdBQUQ7UUFDTCxHQUFBLEdBQU0sU0FBQSxHQUFZO1FBQ2xCLEtBQUssQ0FBQyxZQUFOLENBQW1CLEdBQW5CO0FBQ0EsZUFBTyxDQUFDLHNCQUFELEVBQXlCLEdBQXpCO01BSEgsQ0FETjtLQURGOzs7RUFPRixPQUFPLENBQUMsS0FBUixHQUNFO0lBQUEsWUFBQSxFQUNFO01BQUEsT0FBQSxFQUFTLFNBQVQ7TUFDQSxJQUFBLEVBQU0sU0FBQyxHQUFEO0FBQWdCLFlBQUE7UUFBZCxXQUFEO2VBQWUsQ0FBQyxLQUFELEVBQVEsUUFBUixFQUFrQixNQUFsQixFQUEwQixLQUExQixFQUFpQyxlQUFqQyxFQUFrRCxRQUFsRDtNQUFoQixDQUROO0tBREY7OztFQUlGLE9BQU8sQ0FBQyxPQUFSLEdBQ0U7SUFBQSxZQUFBLEVBQ0U7TUFBQSxPQUFBLEVBQVMsU0FBVDtNQUNBLElBQUEsRUFBTSxTQUFDLEdBQUQ7QUFBZ0IsWUFBQTtRQUFkLFdBQUQ7ZUFBZSxDQUFDLFdBQUQsRUFBYSxlQUFiLEVBQThCLFdBQTlCLEVBQTBDLGFBQTFDLEVBQXdELFFBQXhEO01BQWhCLENBRE47S0FERjs7O0VBSUYsT0FBUSxDQUFBLGNBQUEsQ0FBUixHQUEwQixPQUFPLENBQUM7O0VBRWxDLE9BQVEsQ0FBQSxpQkFBQSxDQUFSLEdBQ0U7SUFBQSxZQUFBLEVBQ0U7TUFBQSxPQUFBLEVBQVMsUUFBVDtNQUNBLElBQUEsRUFBTSxTQUFDLEdBQUQ7QUFBZ0IsWUFBQTtRQUFkLFdBQUQ7ZUFBZSxDQUFDLFFBQUQsRUFBVyxZQUFBLEdBQWEsUUFBYixHQUFzQixPQUFqQztNQUFoQixDQUROO0tBREY7OztFQUlGLE9BQU8sQ0FBQyxJQUFSLEdBQ0U7SUFBQSxZQUFBLEVBQ0U7TUFBQSxPQUFBLEVBQVMsTUFBVDtNQUNBLElBQUEsRUFBTSxTQUFDLEdBQUQ7QUFBZ0IsWUFBQTtRQUFkLFdBQUQ7ZUFBZSxDQUFDLFFBQUQ7TUFBaEIsQ0FETjtLQURGOzs7RUFJRixPQUFPLENBQUMsSUFBUixHQUFlLE9BQU8sQ0FBQztBQWhFdkIiLCJzb3VyY2VzQ29udGVudCI6WyJ7c2hlbGx9ID0gcmVxdWlyZSAnZWxlY3Ryb24nXG5HcmFtbWFyVXRpbHMgPSByZXF1aXJlICcuLi9ncmFtbWFyLXV0aWxzJ1xuXG5leHBvcnRzLkRPVCA9XG4gICdTZWxlY3Rpb24gQmFzZWQnOlxuICAgIGNvbW1hbmQ6ICdkb3QnXG4gICAgYXJnczogKGNvbnRleHQpIC0+XG4gICAgICBjb2RlID0gY29udGV4dC5nZXRDb2RlKClcbiAgICAgIHRtcEZpbGUgPSBHcmFtbWFyVXRpbHMuY3JlYXRlVGVtcEZpbGVXaXRoQ29kZShjb2RlLCAnLmRvdCcpXG4gICAgICBbJy1UcG5nJywgdG1wRmlsZSwgJy1vJywgdG1wRmlsZSArICcucG5nJ11cblxuICAnRmlsZSBCYXNlZCc6XG4gICAgY29tbWFuZDogJ2RvdCdcbiAgICBhcmdzOiAoe2ZpbGVwYXRofSkgLT4gWyctVHBuZycsIGZpbGVwYXRoLCAnLW8nLCBmaWxlcGF0aCArICcucG5nJ11cblxuZXhwb3J0cy5nbnVwbG90ID1cbiAgJ0ZpbGUgQmFzZWQnOlxuICAgIGNvbW1hbmQ6ICdnbnVwbG90J1xuICAgIHdvcmtpbmdEaXJlY3Rvcnk6IGF0b20ud29ya3NwYWNlLmdldEFjdGl2ZVBhbmVJdGVtKCk/LmJ1ZmZlcj8uZmlsZT8uZ2V0UGFyZW50PygpLmdldFBhdGg/KClcbiAgICBhcmdzOiAoe2ZpbGVwYXRofSkgLT4gWyctcCcsIGZpbGVwYXRoXVxuXG5leHBvcnRzWydHcmFwaHZpeiAoRE9UKSddID1cblxuICAnU2VsZWN0aW9uIEJhc2VkJzpcbiAgICBjb21tYW5kOiAnZG90J1xuICAgIGFyZ3M6IChjb250ZXh0KSAtPlxuICAgICAgY29kZSA9IGNvbnRleHQuZ2V0Q29kZSgpXG4gICAgICB0bXBGaWxlID0gR3JhbW1hclV0aWxzLmNyZWF0ZVRlbXBGaWxlV2l0aENvZGUoY29kZSwgJy5kb3QnKVxuICAgICAgcmV0dXJuIFsnLVRwbmcnLCB0bXBGaWxlLCAnLW8nLCB0bXBGaWxlICsgJy5wbmcnXVxuXG4gICdGaWxlIEJhc2VkJzpcbiAgICBjb21tYW5kOiAnZG90J1xuICAgIGFyZ3M6ICh7ZmlsZXBhdGh9KSAtPiBbJy1UcG5nJywgZmlsZXBhdGgsICctbycsIGZpbGVwYXRoICsgJy5wbmcnXVxuXG5leHBvcnRzLkhUTUwgPVxuICAnRmlsZSBCYXNlZCc6XG4gICAgY29tbWFuZDogJ2VjaG8nXG4gICAgYXJnczogKHtmaWxlcGF0aH0pIC0+XG4gICAgICB1cmkgPSAnZmlsZTovLycgKyBmaWxlcGF0aFxuICAgICAgc2hlbGwub3BlbkV4dGVybmFsKHVyaSlcbiAgICAgIHJldHVybiBbJ0hUTUwgZmlsZSBvcGVuZWQgYXQ6JywgdXJpXVxuXG5leHBvcnRzLkxhVGVYID1cbiAgJ0ZpbGUgQmFzZWQnOlxuICAgIGNvbW1hbmQ6ICdsYXRleG1rJ1xuICAgIGFyZ3M6ICh7ZmlsZXBhdGh9KSAtPiBbJy1jZCcsICctcXVpZXQnLCAnLXBkZicsICctcHYnLCAnLXNoZWxsLWVzY2FwZScsIGZpbGVwYXRoXVxuICAgIFxuZXhwb3J0cy5Db25UZVh0ID1cbiAgJ0ZpbGUgQmFzZWQnOlxuICAgIGNvbW1hbmQ6ICdjb250ZXh0J1xuICAgIGFyZ3M6ICh7ZmlsZXBhdGh9KSAtPiBbJy0tYXV0b3BkZicsJy0tbm9uc3RvcG1vZGUnLCAnLS1zeW5jdGV4JywnLS1ub2NvbnNvbGUnLGZpbGVwYXRoXVxuXG5leHBvcnRzWydMYVRlWCBCZWFtZXInXSA9IGV4cG9ydHMuTGFUZVhcblxuZXhwb3J0c1snUGFuZG9jIE1hcmtkb3duJ10gPVxuICAnRmlsZSBCYXNlZCc6XG4gICAgY29tbWFuZDogJ3BhbnplcidcbiAgICBhcmdzOiAoe2ZpbGVwYXRofSkgLT4gW2ZpbGVwYXRoLCBcIi0tb3V0cHV0PScje2ZpbGVwYXRofS5wZGYnXCJdXG5cbmV4cG9ydHMuU2FzcyA9XG4gICdGaWxlIEJhc2VkJzpcbiAgICBjb21tYW5kOiAnc2FzcydcbiAgICBhcmdzOiAoe2ZpbGVwYXRofSkgLT4gW2ZpbGVwYXRoXVxuXG5leHBvcnRzLlNDU1MgPSBleHBvcnRzLlNhc3NcbiJdfQ==
