(function() {
  var GrammarUtils, args, command, path, windows;

  path = require('path');

  command = (GrammarUtils = require('../grammar-utils')).command;

  windows = GrammarUtils.OperatingSystem.isWindows();

  args = function(filepath, jar) {
    var cmd;
    jar = (jar != null ? jar : path.basename(filepath)).replace(/\.kt$/, '.jar');
    cmd = "kotlinc '" + filepath + "' -include-runtime -d " + jar + " && java -jar " + jar;
    return GrammarUtils.formatArgs(cmd);
  };

  module.exports = {
    Java: {
      'File Based': {
        command: command,
        args: function(context) {
          var className, classPackages, sourcePath;
          className = GrammarUtils.Java.getClassName(context);
          classPackages = GrammarUtils.Java.getClassPackage(context);
          sourcePath = GrammarUtils.Java.getProjectPath(context);
          if (windows) {
            return ["/c javac -Xlint " + context.filename + " && java " + className];
          } else {
            return ['-c', "javac -J-Dfile.encoding=UTF-8 -sourcepath '" + sourcePath + "' -d /tmp '" + context.filepath + "' && java -Dfile.encoding=UTF-8 -cp /tmp:%CLASSPATH " + classPackages + className];
          }
        }
      }
    },
    Kotlin: {
      'Selection Based': {
        command: command,
        args: function(context) {
          var code, tmpFile;
          code = context.getCode();
          tmpFile = GrammarUtils.createTempFileWithCode(code, '.kt');
          return args(tmpFile);
        }
      },
      'File Based': {
        command: command,
        args: function(arg) {
          var filename, filepath;
          filepath = arg.filepath, filename = arg.filename;
          return args(filepath, "/tmp/" + filename);
        }
      }
    },
    Processing: {
      'File Based': {
        command: 'processing-java',
        args: function(arg) {
          var filepath;
          filepath = arg.filepath;
          return ["--sketch=" + (path.dirname(filepath)), "--run"];
        }
      }
    }
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZmlsZTovLy9DOi9Vc2Vycy9ja25qdS8uYXRvbS9wYWNrYWdlcy9zY3JpcHQvbGliL2dyYW1tYXJzL2phdmEuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQUEsTUFBQTs7RUFBQSxJQUFBLEdBQU8sT0FBQSxDQUFRLE1BQVI7O0VBQ04sVUFBVyxDQUFBLFlBQUEsR0FBZSxPQUFBLENBQVEsa0JBQVIsQ0FBZjs7RUFFWixPQUFBLEdBQVUsWUFBWSxDQUFDLGVBQWUsQ0FBQyxTQUE3QixDQUFBOztFQUVWLElBQUEsR0FBTyxTQUFDLFFBQUQsRUFBVyxHQUFYO0FBQ0wsUUFBQTtJQUFBLEdBQUEsR0FBTSxlQUFDLE1BQU0sSUFBSSxDQUFDLFFBQUwsQ0FBYyxRQUFkLENBQVAsQ0FBK0IsQ0FBQyxPQUFoQyxDQUF3QyxPQUF4QyxFQUFpRCxNQUFqRDtJQUNOLEdBQUEsR0FBTSxXQUFBLEdBQVksUUFBWixHQUFxQix3QkFBckIsR0FBNkMsR0FBN0MsR0FBaUQsZ0JBQWpELEdBQWlFO0FBQ3ZFLFdBQU8sWUFBWSxDQUFDLFVBQWIsQ0FBd0IsR0FBeEI7RUFIRjs7RUFLUCxNQUFNLENBQUMsT0FBUCxHQUVFO0lBQUEsSUFBQSxFQUNFO01BQUEsWUFBQSxFQUFjO1FBQ1osU0FBQSxPQURZO1FBRVosSUFBQSxFQUFNLFNBQUMsT0FBRDtBQUNKLGNBQUE7VUFBQSxTQUFBLEdBQVksWUFBWSxDQUFDLElBQUksQ0FBQyxZQUFsQixDQUErQixPQUEvQjtVQUNaLGFBQUEsR0FBZ0IsWUFBWSxDQUFDLElBQUksQ0FBQyxlQUFsQixDQUFrQyxPQUFsQztVQUNoQixVQUFBLEdBQWEsWUFBWSxDQUFDLElBQUksQ0FBQyxjQUFsQixDQUFpQyxPQUFqQztVQUNiLElBQUcsT0FBSDtBQUNFLG1CQUFPLENBQUMsa0JBQUEsR0FBbUIsT0FBTyxDQUFDLFFBQTNCLEdBQW9DLFdBQXBDLEdBQStDLFNBQWhELEVBRFQ7V0FBQSxNQUFBO21CQUVLLENBQUMsSUFBRCxFQUFPLDZDQUFBLEdBQThDLFVBQTlDLEdBQXlELGFBQXpELEdBQXNFLE9BQU8sQ0FBQyxRQUE5RSxHQUF1RixzREFBdkYsR0FBNkksYUFBN0ksR0FBNkosU0FBcEssRUFGTDs7UUFKSSxDQUZNO09BQWQ7S0FERjtJQVlBLE1BQUEsRUFDRTtNQUFBLGlCQUFBLEVBQW1CO1FBQ2pCLFNBQUEsT0FEaUI7UUFFakIsSUFBQSxFQUFNLFNBQUMsT0FBRDtBQUNKLGNBQUE7VUFBQSxJQUFBLEdBQU8sT0FBTyxDQUFDLE9BQVIsQ0FBQTtVQUNQLE9BQUEsR0FBVSxZQUFZLENBQUMsc0JBQWIsQ0FBb0MsSUFBcEMsRUFBMEMsS0FBMUM7QUFDVixpQkFBTyxJQUFBLENBQUssT0FBTDtRQUhILENBRlc7T0FBbkI7TUFPQSxZQUFBLEVBQWM7UUFDWixTQUFBLE9BRFk7UUFFWixJQUFBLEVBQU0sU0FBQyxHQUFEO0FBQTBCLGNBQUE7VUFBeEIseUJBQVU7aUJBQWMsSUFBQSxDQUFLLFFBQUwsRUFBZSxPQUFBLEdBQVEsUUFBdkI7UUFBMUIsQ0FGTTtPQVBkO0tBYkY7SUF3QkEsVUFBQSxFQUNFO01BQUEsWUFBQSxFQUNFO1FBQUEsT0FBQSxFQUFTLGlCQUFUO1FBQ0EsSUFBQSxFQUFNLFNBQUMsR0FBRDtBQUFnQixjQUFBO1VBQWQsV0FBRDtpQkFBZSxDQUFDLFdBQUEsR0FBVyxDQUFDLElBQUksQ0FBQyxPQUFMLENBQWEsUUFBYixDQUFELENBQVosRUFBdUMsT0FBdkM7UUFBaEIsQ0FETjtPQURGO0tBekJGOztBQVpGIiwic291cmNlc0NvbnRlbnQiOlsicGF0aCA9IHJlcXVpcmUgJ3BhdGgnXG57Y29tbWFuZH0gPSBHcmFtbWFyVXRpbHMgPSByZXF1aXJlICcuLi9ncmFtbWFyLXV0aWxzJ1xuXG53aW5kb3dzID0gR3JhbW1hclV0aWxzLk9wZXJhdGluZ1N5c3RlbS5pc1dpbmRvd3MoKVxuXG5hcmdzID0gKGZpbGVwYXRoLCBqYXIpIC0+XG4gIGphciA9IChqYXIgPyBwYXRoLmJhc2VuYW1lKGZpbGVwYXRoKSkucmVwbGFjZSAvXFwua3QkLywgJy5qYXInXG4gIGNtZCA9IFwia290bGluYyAnI3tmaWxlcGF0aH0nIC1pbmNsdWRlLXJ1bnRpbWUgLWQgI3tqYXJ9ICYmIGphdmEgLWphciAje2phcn1cIlxuICByZXR1cm4gR3JhbW1hclV0aWxzLmZvcm1hdEFyZ3MoY21kKVxuXG5tb2R1bGUuZXhwb3J0cyA9XG5cbiAgSmF2YTpcbiAgICAnRmlsZSBCYXNlZCc6IHtcbiAgICAgIGNvbW1hbmRcbiAgICAgIGFyZ3M6IChjb250ZXh0KSAtPlxuICAgICAgICBjbGFzc05hbWUgPSBHcmFtbWFyVXRpbHMuSmF2YS5nZXRDbGFzc05hbWUgY29udGV4dFxuICAgICAgICBjbGFzc1BhY2thZ2VzID0gR3JhbW1hclV0aWxzLkphdmEuZ2V0Q2xhc3NQYWNrYWdlIGNvbnRleHRcbiAgICAgICAgc291cmNlUGF0aCA9IEdyYW1tYXJVdGlscy5KYXZhLmdldFByb2plY3RQYXRoIGNvbnRleHRcbiAgICAgICAgaWYgd2luZG93c1xuICAgICAgICAgIHJldHVybiBbXCIvYyBqYXZhYyAtWGxpbnQgI3tjb250ZXh0LmZpbGVuYW1lfSAmJiBqYXZhICN7Y2xhc3NOYW1lfVwiXVxuICAgICAgICBlbHNlIFsnLWMnLCBcImphdmFjIC1KLURmaWxlLmVuY29kaW5nPVVURi04IC1zb3VyY2VwYXRoICcje3NvdXJjZVBhdGh9JyAtZCAvdG1wICcje2NvbnRleHQuZmlsZXBhdGh9JyAmJiBqYXZhIC1EZmlsZS5lbmNvZGluZz1VVEYtOCAtY3AgL3RtcDolQ0xBU1NQQVRIICN7Y2xhc3NQYWNrYWdlc30je2NsYXNzTmFtZX1cIl1cblxuICAgIH1cbiAgS290bGluOlxuICAgICdTZWxlY3Rpb24gQmFzZWQnOiB7XG4gICAgICBjb21tYW5kXG4gICAgICBhcmdzOiAoY29udGV4dCkgLT5cbiAgICAgICAgY29kZSA9IGNvbnRleHQuZ2V0Q29kZSgpXG4gICAgICAgIHRtcEZpbGUgPSBHcmFtbWFyVXRpbHMuY3JlYXRlVGVtcEZpbGVXaXRoQ29kZShjb2RlLCAnLmt0JylcbiAgICAgICAgcmV0dXJuIGFyZ3ModG1wRmlsZSlcbiAgICB9XG4gICAgJ0ZpbGUgQmFzZWQnOiB7XG4gICAgICBjb21tYW5kXG4gICAgICBhcmdzOiAoe2ZpbGVwYXRoLCBmaWxlbmFtZX0pIC0+IGFyZ3MoZmlsZXBhdGgsIFwiL3RtcC8je2ZpbGVuYW1lfVwiKVxuICAgIH1cbiAgUHJvY2Vzc2luZzpcbiAgICAnRmlsZSBCYXNlZCc6XG4gICAgICBjb21tYW5kOiAncHJvY2Vzc2luZy1qYXZhJ1xuICAgICAgYXJnczogKHtmaWxlcGF0aH0pIC0+IFtcIi0tc2tldGNoPSN7cGF0aC5kaXJuYW1lKGZpbGVwYXRoKX1cIiwgXCItLXJ1blwiXVxuIl19
