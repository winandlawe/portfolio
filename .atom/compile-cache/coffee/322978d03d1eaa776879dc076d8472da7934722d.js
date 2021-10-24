(function() {
  var GrammarUtils, args, babel, babelConfig, bin, coffee, command, path;

  path = require('path');

  command = (GrammarUtils = require('../grammar-utils')).command;

  bin = path.join(__dirname, '../..', 'node_modules', '.bin');

  coffee = path.join(bin, 'coffee');

  babel = path.join(bin, 'babel');

  babelConfig = path.join(__dirname, 'babel.config.js');

  args = function(arg) {
    var cmd, filepath;
    filepath = arg.filepath;
    cmd = "'" + coffee + "' -p '" + filepath + "'|'" + babel + "' --filename '" + bin + " --config-file " + babelConfig + "'| node";
    return GrammarUtils.formatArgs(cmd);
  };

  exports.CoffeeScript = {
    'Selection Based': {
      command: command,
      args: function(context) {
        var code, filepath, lit, ref, scopeName;
        scopeName = (ref = atom.workspace.getActiveTextEditor()) != null ? ref.getGrammar().scopeName : void 0;
        lit = (scopeName != null ? scopeName.includes('lit') : void 0) ? 'lit' : '';
        code = context.getCode();
        filepath = GrammarUtils.createTempFileWithCode(code, "." + lit + "coffee");
        return args({
          filepath: filepath
        });
      }
    },
    'File Based': {
      command: command,
      args: args
    }
  };

  exports['CoffeeScript (Literate)'] = exports.CoffeeScript;

  exports.IcedCoffeeScript = {
    'Selection Based': {
      command: 'iced',
      args: function(context) {
        return ['-e', context.getCode()];
      }
    },
    'File Based': {
      command: 'iced',
      args: function(arg) {
        var filepath;
        filepath = arg.filepath;
        return [filepath];
      }
    }
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZmlsZTovLy9DOi9Vc2Vycy9ja25qdS8uYXRvbS9wYWNrYWdlcy9zY3JpcHQvbGliL2dyYW1tYXJzL2NvZmZlZXNjcmlwdC5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQSxNQUFBOztFQUFBLElBQUEsR0FBTyxPQUFBLENBQVEsTUFBUjs7RUFDTixVQUFXLENBQUEsWUFBQSxHQUFlLE9BQUEsQ0FBUSxrQkFBUixDQUFmOztFQUVaLEdBQUEsR0FBTSxJQUFJLENBQUMsSUFBTCxDQUFVLFNBQVYsRUFBcUIsT0FBckIsRUFBOEIsY0FBOUIsRUFBOEMsTUFBOUM7O0VBQ04sTUFBQSxHQUFTLElBQUksQ0FBQyxJQUFMLENBQVUsR0FBVixFQUFlLFFBQWY7O0VBQ1QsS0FBQSxHQUFRLElBQUksQ0FBQyxJQUFMLENBQVUsR0FBVixFQUFlLE9BQWY7O0VBQ1IsV0FBQSxHQUFjLElBQUksQ0FBQyxJQUFMLENBQVUsU0FBVixFQUFxQixpQkFBckI7O0VBRWQsSUFBQSxHQUFPLFNBQUMsR0FBRDtBQUNMLFFBQUE7SUFETyxXQUFEO0lBQ04sR0FBQSxHQUFNLEdBQUEsR0FBSSxNQUFKLEdBQVcsUUFBWCxHQUFtQixRQUFuQixHQUE0QixLQUE1QixHQUFpQyxLQUFqQyxHQUF1QyxnQkFBdkMsR0FBdUQsR0FBdkQsR0FBMkQsaUJBQTNELEdBQTRFLFdBQTVFLEdBQXdGO0FBQzlGLFdBQU8sWUFBWSxDQUFDLFVBQWIsQ0FBd0IsR0FBeEI7RUFGRjs7RUFJUCxPQUFPLENBQUMsWUFBUixHQUNFO0lBQUEsaUJBQUEsRUFBbUI7TUFDakIsU0FBQSxPQURpQjtNQUVqQixJQUFBLEVBQU0sU0FBQyxPQUFEO0FBQ0osWUFBQTtRQUFDLHNFQUFpRCxDQUFFLFVBQXRDLENBQUE7UUFDZCxHQUFBLHdCQUFTLFNBQVMsQ0FBRSxRQUFYLENBQW9CLEtBQXBCLFdBQUgsR0FBa0MsS0FBbEMsR0FBNkM7UUFDbkQsSUFBQSxHQUFPLE9BQU8sQ0FBQyxPQUFSLENBQUE7UUFDUCxRQUFBLEdBQVcsWUFBWSxDQUFDLHNCQUFiLENBQW9DLElBQXBDLEVBQTBDLEdBQUEsR0FBSSxHQUFKLEdBQVEsUUFBbEQ7QUFDWCxlQUFPLElBQUEsQ0FBSztVQUFDLFVBQUEsUUFBRDtTQUFMO01BTEgsQ0FGVztLQUFuQjtJQVNBLFlBQUEsRUFBYztNQUFFLFNBQUEsT0FBRjtNQUFXLE1BQUEsSUFBWDtLQVRkOzs7RUFXRixPQUFRLENBQUEseUJBQUEsQ0FBUixHQUFxQyxPQUFPLENBQUM7O0VBRTdDLE9BQU8sQ0FBQyxnQkFBUixHQUNFO0lBQUEsaUJBQUEsRUFDRTtNQUFBLE9BQUEsRUFBUyxNQUFUO01BQ0EsSUFBQSxFQUFNLFNBQUMsT0FBRDtlQUFhLENBQUMsSUFBRCxFQUFPLE9BQU8sQ0FBQyxPQUFSLENBQUEsQ0FBUDtNQUFiLENBRE47S0FERjtJQUlBLFlBQUEsRUFDRTtNQUFBLE9BQUEsRUFBUyxNQUFUO01BQ0EsSUFBQSxFQUFNLFNBQUMsR0FBRDtBQUFnQixZQUFBO1FBQWQsV0FBRDtlQUFlLENBQUMsUUFBRDtNQUFoQixDQUROO0tBTEY7O0FBM0JGIiwic291cmNlc0NvbnRlbnQiOlsicGF0aCA9IHJlcXVpcmUgJ3BhdGgnXG57Y29tbWFuZH0gPSBHcmFtbWFyVXRpbHMgPSByZXF1aXJlICcuLi9ncmFtbWFyLXV0aWxzJ1xuXG5iaW4gPSBwYXRoLmpvaW4gX19kaXJuYW1lLCAnLi4vLi4nLCAnbm9kZV9tb2R1bGVzJywgJy5iaW4nXG5jb2ZmZWUgPSBwYXRoLmpvaW4gYmluLCAnY29mZmVlJ1xuYmFiZWwgPSBwYXRoLmpvaW4gYmluLCAnYmFiZWwnXG5iYWJlbENvbmZpZyA9IHBhdGguam9pbiBfX2Rpcm5hbWUsICdiYWJlbC5jb25maWcuanMnXG5cbmFyZ3MgPSAoe2ZpbGVwYXRofSkgLT5cbiAgY21kID0gXCInI3tjb2ZmZWV9JyAtcCAnI3tmaWxlcGF0aH0nfCcje2JhYmVsfScgLS1maWxlbmFtZSAnI3tiaW59IC0tY29uZmlnLWZpbGUgI3tiYWJlbENvbmZpZ30nfCBub2RlXCJcbiAgcmV0dXJuIEdyYW1tYXJVdGlscy5mb3JtYXRBcmdzKGNtZClcblxuZXhwb3J0cy5Db2ZmZWVTY3JpcHQgPVxuICAnU2VsZWN0aW9uIEJhc2VkJzoge1xuICAgIGNvbW1hbmRcbiAgICBhcmdzOiAoY29udGV4dCkgLT5cbiAgICAgIHtzY29wZU5hbWV9ID0gYXRvbS53b3Jrc3BhY2UuZ2V0QWN0aXZlVGV4dEVkaXRvcigpPy5nZXRHcmFtbWFyKClcbiAgICAgIGxpdCA9IGlmIHNjb3BlTmFtZT8uaW5jbHVkZXMgJ2xpdCcgdGhlbiAnbGl0JyBlbHNlICcnXG4gICAgICBjb2RlID0gY29udGV4dC5nZXRDb2RlKClcbiAgICAgIGZpbGVwYXRoID0gR3JhbW1hclV0aWxzLmNyZWF0ZVRlbXBGaWxlV2l0aENvZGUoY29kZSwgXCIuI3tsaXR9Y29mZmVlXCIpXG4gICAgICByZXR1cm4gYXJncyh7ZmlsZXBhdGh9KVxuICB9XG4gICdGaWxlIEJhc2VkJzogeyBjb21tYW5kLCBhcmdzIH1cblxuZXhwb3J0c1snQ29mZmVlU2NyaXB0IChMaXRlcmF0ZSknXSA9IGV4cG9ydHMuQ29mZmVlU2NyaXB0XG5cbmV4cG9ydHMuSWNlZENvZmZlZVNjcmlwdCA9XG4gICdTZWxlY3Rpb24gQmFzZWQnOlxuICAgIGNvbW1hbmQ6ICdpY2VkJ1xuICAgIGFyZ3M6IChjb250ZXh0KSAtPiBbJy1lJywgY29udGV4dC5nZXRDb2RlKCldXG5cbiAgJ0ZpbGUgQmFzZWQnOlxuICAgIGNvbW1hbmQ6ICdpY2VkJ1xuICAgIGFyZ3M6ICh7ZmlsZXBhdGh9KSAtPiBbZmlsZXBhdGhdXG4iXX0=
