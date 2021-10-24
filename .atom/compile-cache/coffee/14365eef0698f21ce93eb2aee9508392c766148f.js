(function() {
  var GrammarUtils, command, windows;

  command = (GrammarUtils = require('../grammar-utils')).command;

  windows = GrammarUtils.OperatingSystem.isWindows();

  module.exports = {
    BuckleScript: {
      'Selection Based': {
        command: 'bsc',
        args: function(context) {
          var code, tmpFile;
          code = context.getCode();
          tmpFile = GrammarUtils.createTempFileWithCode(code);
          return ['-c', tmpFile];
        }
      },
      'File Based': {
        command: 'bsc',
        args: function(arg) {
          var filepath;
          filepath = arg.filepath;
          return ['-c', filepath];
        }
      }
    },
    OCaml: {
      'File Based': {
        command: 'ocaml',
        args: function(arg) {
          var filepath;
          filepath = arg.filepath;
          return [filepath];
        }
      }
    },
    Reason: {
      'File Based': {
        command: command,
        args: function(arg) {
          var file, filename;
          filename = arg.filename;
          file = filename.replace(/\.re$/, '.native');
          return GrammarUtils.formatArgs("rebuild '" + file + "' && '" + file + "'");
        }
      }
    },
    'Standard ML': {
      'File Based': {
        command: 'sml',
        args: function(arg) {
          var filename;
          filename = arg.filename;
          return [filename];
        }
      },
      'Selection Based': {
        command: 'sml',
        args: function(context) {
          var code, tmpFile;
          code = context.getCode();
          tmpFile = GrammarUtils.createTempFileWithCode(code, '.sml');
          return [tmpFile];
        }
      }
    }
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZmlsZTovLy9DOi9Vc2Vycy9ja25qdS8uYXRvbS9wYWNrYWdlcy9zY3JpcHQvbGliL2dyYW1tYXJzL21sLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUFBLE1BQUE7O0VBQUMsVUFBVyxDQUFBLFlBQUEsR0FBZSxPQUFBLENBQVEsa0JBQVIsQ0FBZjs7RUFFWixPQUFBLEdBQVUsWUFBWSxDQUFDLGVBQWUsQ0FBQyxTQUE3QixDQUFBOztFQUVWLE1BQU0sQ0FBQyxPQUFQLEdBRUU7SUFBQSxZQUFBLEVBQ0U7TUFBQSxpQkFBQSxFQUNFO1FBQUEsT0FBQSxFQUFTLEtBQVQ7UUFDQSxJQUFBLEVBQU0sU0FBQyxPQUFEO0FBQ0osY0FBQTtVQUFBLElBQUEsR0FBTyxPQUFPLENBQUMsT0FBUixDQUFBO1VBQ1AsT0FBQSxHQUFVLFlBQVksQ0FBQyxzQkFBYixDQUFvQyxJQUFwQztBQUNWLGlCQUFPLENBQUMsSUFBRCxFQUFPLE9BQVA7UUFISCxDQUROO09BREY7TUFPQSxZQUFBLEVBQ0U7UUFBQSxPQUFBLEVBQVMsS0FBVDtRQUNBLElBQUEsRUFBTSxTQUFDLEdBQUQ7QUFBZ0IsY0FBQTtVQUFkLFdBQUQ7aUJBQWUsQ0FBQyxJQUFELEVBQU8sUUFBUDtRQUFoQixDQUROO09BUkY7S0FERjtJQVlBLEtBQUEsRUFDRTtNQUFBLFlBQUEsRUFDRTtRQUFBLE9BQUEsRUFBUyxPQUFUO1FBQ0EsSUFBQSxFQUFNLFNBQUMsR0FBRDtBQUFnQixjQUFBO1VBQWQsV0FBRDtpQkFBZSxDQUFDLFFBQUQ7UUFBaEIsQ0FETjtPQURGO0tBYkY7SUFpQkEsTUFBQSxFQUNFO01BQUEsWUFBQSxFQUFjO1FBQ1osU0FBQSxPQURZO1FBRVosSUFBQSxFQUFNLFNBQUMsR0FBRDtBQUNKLGNBQUE7VUFETSxXQUFEO1VBQ0wsSUFBQSxHQUFPLFFBQVEsQ0FBQyxPQUFULENBQWlCLE9BQWpCLEVBQTBCLFNBQTFCO2lCQUNQLFlBQVksQ0FBQyxVQUFiLENBQXdCLFdBQUEsR0FBWSxJQUFaLEdBQWlCLFFBQWpCLEdBQXlCLElBQXpCLEdBQThCLEdBQXREO1FBRkksQ0FGTTtPQUFkO0tBbEJGO0lBeUJBLGFBQUEsRUFDRTtNQUFBLFlBQUEsRUFBYztRQUNaLE9BQUEsRUFBUyxLQURHO1FBRVosSUFBQSxFQUFNLFNBQUMsR0FBRDtBQUFnQixjQUFBO1VBQWQsV0FBRDtBQUFlLGlCQUFPLENBQUMsUUFBRDtRQUF2QixDQUZNO09BQWQ7TUFLQSxpQkFBQSxFQUFtQjtRQUNqQixPQUFBLEVBQVMsS0FEUTtRQUVqQixJQUFBLEVBQU0sU0FBQyxPQUFEO0FBQ0osY0FBQTtVQUFBLElBQUEsR0FBTyxPQUFPLENBQUMsT0FBUixDQUFBO1VBQ1AsT0FBQSxHQUFVLFlBQVksQ0FBQyxzQkFBYixDQUFvQyxJQUFwQyxFQUEwQyxNQUExQztBQUNWLGlCQUFPLENBQUMsT0FBRDtRQUhILENBRlc7T0FMbkI7S0ExQkY7O0FBTkYiLCJzb3VyY2VzQ29udGVudCI6WyJ7Y29tbWFuZH0gPSBHcmFtbWFyVXRpbHMgPSByZXF1aXJlICcuLi9ncmFtbWFyLXV0aWxzJ1xuXG53aW5kb3dzID0gR3JhbW1hclV0aWxzLk9wZXJhdGluZ1N5c3RlbS5pc1dpbmRvd3MoKVxuXG5tb2R1bGUuZXhwb3J0cyA9XG5cbiAgQnVja2xlU2NyaXB0OlxuICAgICdTZWxlY3Rpb24gQmFzZWQnOlxuICAgICAgY29tbWFuZDogJ2JzYydcbiAgICAgIGFyZ3M6IChjb250ZXh0KSAtPlxuICAgICAgICBjb2RlID0gY29udGV4dC5nZXRDb2RlKClcbiAgICAgICAgdG1wRmlsZSA9IEdyYW1tYXJVdGlscy5jcmVhdGVUZW1wRmlsZVdpdGhDb2RlKGNvZGUpXG4gICAgICAgIHJldHVybiBbJy1jJywgdG1wRmlsZV1cblxuICAgICdGaWxlIEJhc2VkJzpcbiAgICAgIGNvbW1hbmQ6ICdic2MnXG4gICAgICBhcmdzOiAoe2ZpbGVwYXRofSkgLT4gWyctYycsIGZpbGVwYXRoXVxuXG4gIE9DYW1sOlxuICAgICdGaWxlIEJhc2VkJzpcbiAgICAgIGNvbW1hbmQ6ICdvY2FtbCdcbiAgICAgIGFyZ3M6ICh7ZmlsZXBhdGh9KSAtPiBbZmlsZXBhdGhdXG5cbiAgUmVhc29uOlxuICAgICdGaWxlIEJhc2VkJzoge1xuICAgICAgY29tbWFuZFxuICAgICAgYXJnczogKHtmaWxlbmFtZX0pIC0+XG4gICAgICAgIGZpbGUgPSBmaWxlbmFtZS5yZXBsYWNlIC9cXC5yZSQvLCAnLm5hdGl2ZSdcbiAgICAgICAgR3JhbW1hclV0aWxzLmZvcm1hdEFyZ3MoXCJyZWJ1aWxkICcje2ZpbGV9JyAmJiAnI3tmaWxlfSdcIilcbiAgICB9XG5cbiAgJ1N0YW5kYXJkIE1MJzpcbiAgICAnRmlsZSBCYXNlZCc6IHtcbiAgICAgIGNvbW1hbmQ6ICdzbWwnXG4gICAgICBhcmdzOiAoe2ZpbGVuYW1lfSkgLT4gcmV0dXJuIFtmaWxlbmFtZV07XG4gICAgfVxuXG4gICAgJ1NlbGVjdGlvbiBCYXNlZCc6IHtcbiAgICAgIGNvbW1hbmQ6ICdzbWwnXG4gICAgICBhcmdzOiAoY29udGV4dCkgLT5cbiAgICAgICAgY29kZSA9IGNvbnRleHQuZ2V0Q29kZSgpXG4gICAgICAgIHRtcEZpbGUgPSBHcmFtbWFyVXRpbHMuY3JlYXRlVGVtcEZpbGVXaXRoQ29kZShjb2RlLCAnLnNtbCcpXG4gICAgICAgIHJldHVybiBbdG1wRmlsZV1cbiAgICB9XG4iXX0=
