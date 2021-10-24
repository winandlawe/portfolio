(function() {
  var GrammarUtils, OperatingSystem, arch, base, command, os, path, ref, ref1, ref2, ref3, windows;

  path = require('path');

  ref = GrammarUtils = require('../grammar-utils'), OperatingSystem = ref.OperatingSystem, command = ref.command;

  os = OperatingSystem.platform();

  arch = OperatingSystem.architecture();

  windows = OperatingSystem.isWindows();

  module.exports = {
    '1C (BSL)': {
      'File Based': {
        command: 'oscript',
        args: function(arg) {
          var filepath;
          filepath = arg.filepath;
          return ['-encoding=utf-8', filepath];
        }
      }
    },
    Ansible: {
      'File Based': {
        command: 'ansible-playbook',
        args: function(arg) {
          var filepath;
          filepath = arg.filepath;
          return [filepath];
        }
      }
    },
    Clojure: {
      'Selection Based': {
        command: 'lein',
        args: function(context) {
          return ['exec', '-e', context.getCode()];
        }
      },
      'File Based': {
        command: 'lein',
        args: function(arg) {
          var filepath;
          filepath = arg.filepath;
          return ['exec', filepath];
        }
      }
    },
    Crystal: {
      'Selection Based': {
        command: 'crystal',
        args: function(context) {
          return ['eval', context.getCode()];
        }
      },
      'File Based': {
        command: 'crystal',
        args: function(arg) {
          var filepath;
          filepath = arg.filepath;
          return [filepath];
        }
      }
    },
    D: {
      'Selection Based': {
        command: 'rdmd',
        args: function(context) {
          var code, tmpFile;
          code = context.getCode();
          tmpFile = GrammarUtils.D.createTempFileWithCode(code);
          return [tmpFile];
        }
      },
      'File Based': {
        command: 'rdmd',
        args: function(arg) {
          var filepath;
          filepath = arg.filepath;
          return [filepath];
        }
      }
    },
    Elixir: {
      'Selection Based': {
        command: 'elixir',
        args: function(context) {
          return ['-e', context.getCode()];
        }
      },
      'File Based': {
        command: 'elixir',
        args: function(arg) {
          var filepath;
          filepath = arg.filepath;
          return ['-r', filepath];
        }
      }
    },
    Erlang: {
      'Selection Based': {
        command: 'erl',
        args: function(context) {
          return ['-noshell', '-eval', (context.getCode()) + ", init:stop()."];
        }
      }
    },
    'F*': {
      'File Based': {
        command: 'fstar',
        args: function(arg) {
          var filepath;
          filepath = arg.filepath;
          return [filepath];
        }
      }
    },
    'F#': {
      'File Based': {
        command: windows ? 'fsi' : 'fsharpi',
        args: function(arg) {
          var filepath;
          filepath = arg.filepath;
          return ['--exec', filepath];
        }
      }
    },
    Forth: {
      'File Based': {
        command: 'gforth',
        args: function(arg) {
          var filepath;
          filepath = arg.filepath;
          return [filepath];
        }
      }
    },
    Gherkin: {
      'File Based': {
        command: 'cucumber',
        args: function(arg) {
          var filepath;
          filepath = arg.filepath;
          return ['--color', filepath];
        }
      },
      'Line Number Based': {
        command: 'cucumber',
        args: function(context) {
          return ['--color', context.fileColonLine()];
        }
      }
    },
    Go: {
      'File Based': {
        command: 'go',
        workingDirectory: (ref1 = atom.workspace.getActivePaneItem()) != null ? (ref2 = ref1.buffer) != null ? (ref3 = ref2.file) != null ? typeof ref3.getParent === "function" ? typeof (base = ref3.getParent()).getPath === "function" ? base.getPath() : void 0 : void 0 : void 0 : void 0 : void 0,
        args: function(arg) {
          var filepath;
          filepath = arg.filepath;
          if (filepath.match(/_test.go/)) {
            return ['test', ''];
          } else {
            return ['run', filepath];
          }
        }
      }
    },
    Groovy: {
      'Selection Based': {
        command: 'groovy',
        args: function(context) {
          return ['-e', context.getCode()];
        }
      },
      'File Based': {
        command: 'groovy',
        args: function(arg) {
          var filepath;
          filepath = arg.filepath;
          return [filepath];
        }
      }
    },
    Hy: {
      'Selection Based': {
        command: 'hy',
        args: function(context) {
          var code, tmpFile;
          code = context.getCode();
          tmpFile = GrammarUtils.createTempFileWithCode(code, '.hy');
          return [tmpFile];
        }
      },
      'File Based': {
        command: 'hy',
        args: function(arg) {
          var filepath;
          filepath = arg.filepath;
          return [filepath];
        }
      }
    },
    Idris: {
      'File Based': {
        command: 'idris',
        args: function(arg) {
          var filepath;
          filepath = arg.filepath;
          return [filepath, '-o', path.basename(filepath, path.extname(filepath))];
        }
      }
    },
    InnoSetup: {
      'File Based': {
        command: 'ISCC.exe',
        args: function(arg) {
          var filepath;
          filepath = arg.filepath;
          return ['/Q', filepath];
        }
      }
    },
    ioLanguage: {
      'Selection Based': {
        command: 'io',
        args: function(context) {
          return [context.getCode()];
        }
      },
      'File Based': {
        command: 'io',
        args: function(arg) {
          var filepath;
          filepath = arg.filepath;
          return ['-e', filepath];
        }
      }
    },
    Jolie: {
      'File Based': {
        command: 'jolie',
        args: function(arg) {
          var filepath;
          filepath = arg.filepath;
          return [filepath];
        }
      }
    },
    Julia: {
      'Selection Based': {
        command: 'julia',
        args: function(context) {
          return ['-e', context.getCode()];
        }
      },
      'File Based': {
        command: 'julia',
        args: function(arg) {
          var filepath;
          filepath = arg.filepath;
          return [filepath];
        }
      }
    },
    LAMMPS: os === 'darwin' || os === 'linux' ? {
      'File Based': {
        command: 'lammps',
        args: function(arg) {
          var filepath;
          filepath = arg.filepath;
          return ['-log', 'none', '-in', filepath];
        }
      }
    } : void 0,
    LilyPond: {
      'File Based': {
        command: 'lilypond',
        args: function(arg) {
          var filepath;
          filepath = arg.filepath;
          return [filepath];
        }
      }
    },
    LiveScript: {
      'Selection Based': {
        command: 'lsc',
        args: function(context) {
          return ['-e', context.getCode()];
        }
      },
      'File Based': {
        command: 'lsc',
        args: function(arg) {
          var filepath;
          filepath = arg.filepath;
          return [filepath];
        }
      }
    },
    Makefile: {
      'Selection Based': {
        command: 'bash',
        args: function(context) {
          return ['-c', context.getCode()];
        }
      },
      'File Based': {
        command: 'make',
        args: function(arg) {
          var filepath;
          filepath = arg.filepath;
          return ['-f', filepath];
        }
      }
    },
    MATLAB: {
      'Selection Based': {
        command: 'matlab',
        args: function(context) {
          var code, tmpFile;
          code = context.getCode();
          tmpFile = GrammarUtils.MATLAB.createTempFileWithCode(code);
          return ['-nodesktop', '-nosplash', '-r', "try, run('" + tmpFile + "'); while ~isempty(get(0,'Children')); pause(0.5); end; catch ME; disp(ME.message); exit(1); end; exit(0);"];
        }
      },
      'File Based': {
        command: 'matlab',
        args: function(arg) {
          var filepath;
          filepath = arg.filepath;
          return ['-nodesktop', '-nosplash', '-r', "try run('" + filepath + "'); while ~isempty(get(0,'Children')); pause(0.5); end; catch ME; disp(ME.message); exit(1); end; exit(0);"];
        }
      }
    },
    'MIPS Assembler': {
      'File Based': {
        command: 'spim',
        args: function(arg) {
          var filepath;
          filepath = arg.filepath;
          return ['-f', filepath];
        }
      }
    },
    NCL: {
      'Selection Based': {
        command: 'ncl',
        args: function(context) {
          var code, tmpFile;
          code = context.getCode() + '\n\nexit';
          tmpFile = GrammarUtils.createTempFileWithCode(code);
          return [tmpFile];
        }
      },
      'File Based': {
        command: 'ncl',
        args: function(arg) {
          var filepath;
          filepath = arg.filepath;
          return [filepath];
        }
      }
    },
    Nim: {
      'File Based': {
        command: command,
        args: function(arg) {
          var commands, dir, file, filepath;
          filepath = arg.filepath;
          file = GrammarUtils.Nim.findNimProjectFile(filepath);
          dir = GrammarUtils.Nim.projectDir(filepath);
          commands = "cd '" + dir + "' && nim c --hints:off --parallelBuild:1 -r '" + file + "' 2>&1";
          return GrammarUtils.formatArgs(commands);
        }
      }
    },
    NSIS: {
      'Selection Based': {
        command: 'makensis',
        args: function(context) {
          var code, tmpFile;
          code = context.getCode();
          tmpFile = GrammarUtils.createTempFileWithCode(code);
          return [tmpFile];
        }
      },
      'File Based': {
        command: 'makensis',
        args: function(arg) {
          var filepath;
          filepath = arg.filepath;
          return [filepath];
        }
      }
    },
    Octave: {
      'Selection Based': {
        command: 'octave',
        args: function(context) {
          var dir;
          dir = path.dirname(context.filepath);
          return ['-p', path.dirname(context.filepath), '--eval', context.getCode()];
        }
      },
      'File Based': {
        command: 'octave',
        args: function(arg) {
          var filepath;
          filepath = arg.filepath;
          return ['-p', path.dirname(filepath), filepath];
        }
      }
    },
    Oz: {
      'Selection Based': {
        command: 'ozc',
        args: function(context) {
          var code, tmpFile;
          code = context.getCode();
          tmpFile = GrammarUtils.createTempFileWithCode(code);
          return ['-c', tmpFile];
        }
      },
      'File Based': {
        command: 'ozc',
        args: function(arg) {
          var filepath;
          filepath = arg.filepath;
          return ['-c', filepath];
        }
      }
    },
    Pascal: {
      'Selection Based': {
        command: 'fpc',
        args: function(context) {
          var code, tmpFile;
          code = context.getCode();
          tmpFile = GrammarUtils.createTempFileWithCode(code);
          return [tmpFile];
        }
      },
      'File Based': {
        command: 'fpc',
        args: function(arg) {
          var filepath;
          filepath = arg.filepath;
          return [filepath];
        }
      }
    },
    Povray: {
      'File Based': {
        command: command,
        args: function(arg) {
          var commands, filepath;
          filepath = arg.filepath;
          commands = windows ? 'pvengine /EXIT /RENDER ' : 'povray ';
          return GrammarUtils.formatArgs(commands + filepath);
        }
      }
    },
    Prolog: {
      'File Based': {
        command: command,
        args: function(arg) {
          var commands, dir, filepath;
          filepath = arg.filepath;
          dir = path.dirname(filepath);
          commands = "cd '" + dir + "'; swipl -f '" + filepath + "' -t main --quiet";
          return GrammarUtils.formatArgs(commands);
        }
      }
    },
    PureScript: {
      'File Based': {
        command: command,
        args: function(arg) {
          var dir, filepath;
          filepath = arg.filepath;
          dir = path.dirname(filepath);
          return GrammarUtils.formatArgs("cd '" + dir + "' && pulp run");
        }
      }
    },
    R: {
      'Selection Based': {
        command: 'Rscript',
        args: function(context) {
          var code, tmpFile;
          code = context.getCode();
          tmpFile = GrammarUtils.R.createTempFileWithCode(code);
          return [tmpFile];
        }
      },
      'File Based': {
        command: 'Rscript',
        args: function(arg) {
          var filepath;
          filepath = arg.filepath;
          return [filepath];
        }
      }
    },
    Racket: {
      'Selection Based': {
        command: 'racket',
        args: function(context) {
          return ['-e', context.getCode()];
        }
      },
      'File Based': {
        command: 'racket',
        args: function(arg) {
          var filepath;
          filepath = arg.filepath;
          return [filepath];
        }
      }
    },
    "Ren'Py": {
      'File Based': {
        command: 'renpy',
        args: function(arg) {
          var filepath;
          filepath = arg.filepath;
          return [filepath.substr(0, filepath.lastIndexOf('/game'))];
        }
      }
    },
    'Robot Framework': {
      'File Based': {
        command: 'robot',
        args: function(arg) {
          var filepath;
          filepath = arg.filepath;
          return [filepath];
        }
      }
    },
    Rust: {
      'File Based': {
        command: command,
        args: function(arg) {
          var filename, filepath;
          filepath = arg.filepath, filename = arg.filename;
          if (windows) {
            return ["/c rustc " + filepath + " && " + filename.slice(0, -3) + ".exe"];
          } else {
            return ['-c', "rustc '" + filepath + "' -o /tmp/rs.out && /tmp/rs.out"];
          }
        }
      }
    },
    Scala: {
      'Selection Based': {
        command: 'scala',
        args: function(context) {
          return ['-e', context.getCode()];
        }
      },
      'File Based': {
        command: 'scala',
        args: function(arg) {
          var filepath;
          filepath = arg.filepath;
          return [filepath];
        }
      }
    },
    Stata: {
      'Selection Based': {
        command: 'stata',
        args: function(context) {
          return ['do', context.getCode()];
        }
      },
      'File Based': {
        command: 'stata',
        args: function(arg) {
          var filepath;
          filepath = arg.filepath;
          return ['do', filepath];
        }
      }
    },
    Turing: {
      'File Based': {
        command: 'turing',
        args: function(arg) {
          var filepath;
          filepath = arg.filepath;
          return ['-run', filepath];
        }
      }
    },
    "x86 and x86_64 Assembly": {
      'File Based': {
        command: 'bash',
        args: function(arg) {
          var args, filepath;
          filepath = arg.filepath;
          args = (function() {
            switch (arch) {
              case 'x32':
                return "nasm -f elf '" + filepath + "' -o /tmp/asm.out.o && ld -m elf_i386 /tmp/asm.out.o -o /tmp/asm.out && /tmp/asm.out";
              case 'x64':
                return "nasm -f elf64 '" + filepath + "' -o /tmp/asm.out.o && ld /tmp/asm.out.o -o /tmp/asm.out && /tmp/asm.out";
            }
          })();
          return ['-c', args];
        }
      },
      'Selection Based': {
        command: 'bash',
        args: function(context) {
          var args, code, tmpFile;
          code = context.getCode();
          tmpFile = GrammarUtils.createTempFileWithCode(code, '.asm');
          args = (function() {
            switch (arch) {
              case 'x32':
                return "nasm -f elf '" + tmpFile + "' -o /tmp/asm.out.o && ld -m elf_i386 /tmp/asm.out.o -o /tmp/asm.out && /tmp/asm.out";
              case 'x64':
                return "nasm -f elf64 '" + tmpFile + "' -o /tmp/asm.out.o && ld /tmp/asm.out.o -o /tmp/asm.out && /tmp/asm.out";
            }
          })();
          return ['-c', args];
        }
      }
    }
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZmlsZTovLy9DOi9Vc2Vycy9ja25qdS8uYXRvbS9wYWNrYWdlcy9zY3JpcHQvbGliL2dyYW1tYXJzL2luZGV4LmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFHQTtBQUFBLE1BQUE7O0VBQUEsSUFBQSxHQUFPLE9BQUEsQ0FBUSxNQUFSOztFQUNQLE1BQTZCLFlBQUEsR0FBZSxPQUFBLENBQVEsa0JBQVIsQ0FBNUMsRUFBQyxxQ0FBRCxFQUFrQjs7RUFFbEIsRUFBQSxHQUFLLGVBQWUsQ0FBQyxRQUFoQixDQUFBOztFQUNMLElBQUEsR0FBTyxlQUFlLENBQUMsWUFBaEIsQ0FBQTs7RUFDUCxPQUFBLEdBQVUsZUFBZSxDQUFDLFNBQWhCLENBQUE7O0VBRVYsTUFBTSxDQUFDLE9BQVAsR0FDRTtJQUFBLFVBQUEsRUFDRTtNQUFBLFlBQUEsRUFDRTtRQUFBLE9BQUEsRUFBUyxTQUFUO1FBQ0EsSUFBQSxFQUFNLFNBQUMsR0FBRDtBQUFnQixjQUFBO1VBQWQsV0FBRDtpQkFBZSxDQUFDLGlCQUFELEVBQW9CLFFBQXBCO1FBQWhCLENBRE47T0FERjtLQURGO0lBS0EsT0FBQSxFQUNFO01BQUEsWUFBQSxFQUNFO1FBQUEsT0FBQSxFQUFTLGtCQUFUO1FBQ0EsSUFBQSxFQUFNLFNBQUMsR0FBRDtBQUFnQixjQUFBO1VBQWQsV0FBRDtpQkFBZSxDQUFDLFFBQUQ7UUFBaEIsQ0FETjtPQURGO0tBTkY7SUFVQSxPQUFBLEVBQ0U7TUFBQSxpQkFBQSxFQUNFO1FBQUEsT0FBQSxFQUFTLE1BQVQ7UUFDQSxJQUFBLEVBQU0sU0FBQyxPQUFEO2lCQUFhLENBQUMsTUFBRCxFQUFTLElBQVQsRUFBZSxPQUFPLENBQUMsT0FBUixDQUFBLENBQWY7UUFBYixDQUROO09BREY7TUFHQSxZQUFBLEVBQ0U7UUFBQSxPQUFBLEVBQVMsTUFBVDtRQUNBLElBQUEsRUFBTSxTQUFDLEdBQUQ7QUFBZ0IsY0FBQTtVQUFkLFdBQUQ7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a0IsUUFBbEIsR0FBMkI7QUFKeEI7O0FBS1AsaUJBQU8sQ0FBQyxJQUFELEVBQU8sSUFBUDtRQU5ILENBRE47T0FERjtNQVVBLGlCQUFBLEVBQ0U7UUFBQSxPQUFBLEVBQVMsTUFBVDtRQUNBLElBQUEsRUFBTSxTQUFDLE9BQUQ7QUFDSixjQUFBO1VBQUEsSUFBQSxHQUFPLE9BQU8sQ0FBQyxPQUFSLENBQUE7VUFDUCxPQUFBLEdBQVUsWUFBWSxDQUFDLHNCQUFiLENBQW9DLElBQXBDLEVBQTBDLE1BQTFDO1VBQ1YsSUFBQTtBQUFPLG9CQUFPLElBQVA7QUFBQSxtQkFDQSxLQURBO3VCQUVILGVBQUEsR0FBZ0IsT0FBaEIsR0FBd0I7QUFGckIsbUJBR0EsS0FIQTt1QkFJSCxpQkFBQSxHQUFrQixPQUFsQixHQUEwQjtBQUp2Qjs7QUFLUCxpQkFBTyxDQUFDLElBQUQsRUFBTyxJQUFQO1FBUkgsQ0FETjtPQVhGO0tBaFVGOztBQVJGIiwic291cmNlc0NvbnRlbnQiOlsiIyBNYXBzIEF0b20gR3JhbW1hciBuYW1lcyB0byB0aGUgY29tbWFuZCB1c2VkIGJ5IHRoYXQgbGFuZ3VhZ2VcbiMgQXMgd2VsbCBhcyBhbnkgc3BlY2lhbCBzZXR1cCBmb3IgYXJndW1lbnRzLlxuXG5wYXRoID0gcmVxdWlyZSAncGF0aCdcbntPcGVyYXRpbmdTeXN0ZW0sIGNvbW1hbmR9ID0gR3JhbW1hclV0aWxzID0gcmVxdWlyZSAnLi4vZ3JhbW1hci11dGlscydcblxub3MgPSBPcGVyYXRpbmdTeXN0ZW0ucGxhdGZvcm0oKVxuYXJjaCA9IE9wZXJhdGluZ1N5c3RlbS5hcmNoaXRlY3R1cmUoKVxud2luZG93cyA9IE9wZXJhdGluZ1N5c3RlbS5pc1dpbmRvd3MoKVxuXG5tb2R1bGUuZXhwb3J0cyA9XG4gICcxQyAoQlNMKSc6XG4gICAgJ0ZpbGUgQmFzZWQnOlxuICAgICAgY29tbWFuZDogJ29zY3JpcHQnXG4gICAgICBhcmdzOiAoe2ZpbGVwYXRofSkgLT4gWyctZW5jb2Rpbmc9dXRmLTgnLCBmaWxlcGF0aF1cblxuICBBbnNpYmxlOlxuICAgICdGaWxlIEJhc2VkJzpcbiAgICAgIGNvbW1hbmQ6ICdhbnNpYmxlLXBsYXlib29rJ1xuICAgICAgYXJnczogKHtmaWxlcGF0aH0pIC0+IFtmaWxlcGF0aF1cblxuICBDbG9qdXJlOlxuICAgICdTZWxlY3Rpb24gQmFzZWQnOlxuICAgICAgY29tbWFuZDogJ2xlaW4nXG4gICAgICBhcmdzOiAoY29udGV4dCkgLT4gWydleGVjJywgJy1lJywgY29udGV4dC5nZXRDb2RlKCldXG4gICAgJ0ZpbGUgQmFzZWQnOlxuICAgICAgY29tbWFuZDogJ2xlaW4nXG4gICAgICBhcmdzOiAoe2ZpbGVwYXRofSkgLT4gWydleGVjJywgZmlsZXBhdGhdXG5cbiAgQ3J5c3RhbDpcbiAgICAnU2VsZWN0aW9uIEJhc2VkJzpcbiAgICAgIGNvbW1hbmQ6ICdjcnlzdGFsJ1xuICAgICAgYXJnczogKGNvbnRleHQpIC0+IFsnZXZhbCcsIGNvbnRleHQuZ2V0Q29kZSgpXVxuICAgICdGaWxlIEJhc2VkJzpcbiAgICAgIGNvbW1hbmQ6ICdjcnlzdGFsJ1xuICAgICAgYXJnczogKHtmaWxlcGF0aH0pIC0+IFtmaWxlcGF0aF1cblxuICBEOlxuICAgICdTZWxlY3Rpb24gQmFzZWQnOlxuICAgICAgY29tbWFuZDogJ3JkbWQnXG4gICAgICBhcmdzOiAoY29udGV4dCkgLT5cbiAgICAgICAgY29kZSA9IGNvbnRleHQuZ2V0Q29kZSgpXG4gICAgICAgIHRtcEZpbGUgPSBHcmFtbWFyVXRpbHMuRC5jcmVhdGVUZW1wRmlsZVdpdGhDb2RlKGNvZGUpXG4gICAgICAgIHJldHVybiBbdG1wRmlsZV1cbiAgICAnRmlsZSBCYXNlZCc6XG4gICAgICBjb21tYW5kOiAncmRtZCdcbiAgICAgIGFyZ3M6ICh7ZmlsZXBhdGh9KSAtPiBbZmlsZXBhdGhdXG5cbiAgRWxpeGlyOlxuICAgICdTZWxlY3Rpb24gQmFzZWQnOlxuICAgICAgY29tbWFuZDogJ2VsaXhpcidcbiAgICAgIGFyZ3M6IChjb250ZXh0KSAtPiBbJy1lJywgY29udGV4dC5nZXRDb2RlKCldXG4gICAgJ0ZpbGUgQmFzZWQnOlxuICAgICAgY29tbWFuZDogJ2VsaXhpcidcbiAgICAgIGFyZ3M6ICh7ZmlsZXBhdGh9KSAtPiBbJy1yJywgZmlsZXBhdGhdXG5cbiAgRXJsYW5nOlxuICAgICdTZWxlY3Rpb24gQmFzZWQnOlxuICAgICAgY29tbWFuZDogJ2VybCdcbiAgICAgIGFyZ3M6IChjb250ZXh0KSAtPiBbJy1ub3NoZWxsJywgJy1ldmFsJywgXCIje2NvbnRleHQuZ2V0Q29kZSgpfSwgaW5pdDpzdG9wKCkuXCJdXG5cbiAgJ0YqJzpcbiAgICAnRmlsZSBCYXNlZCc6XG4gICAgICBjb21tYW5kOiAnZnN0YXInXG4gICAgICBhcmdzOiAoe2ZpbGVwYXRofSkgLT4gW2ZpbGVwYXRoXVxuXG4gICdGIyc6XG4gICAgJ0ZpbGUgQmFzZWQnOlxuICAgICAgY29tbWFuZDogaWYgd2luZG93cyB0aGVuICdmc2knIGVsc2UgJ2ZzaGFycGknXG4gICAgICBhcmdzOiAoe2ZpbGVwYXRofSkgLT4gWyctLWV4ZWMnLCBmaWxlcGF0aF1cblxuICBGb3J0aDpcbiAgICAnRmlsZSBCYXNlZCc6XG4gICAgICBjb21tYW5kOiAnZ2ZvcnRoJ1xuICAgICAgYXJnczogKHtmaWxlcGF0aH0pIC0+IFtmaWxlcGF0aF1cblxuICBHaGVya2luOlxuICAgICdGaWxlIEJhc2VkJzpcbiAgICAgIGNvbW1hbmQ6ICdjdWN1bWJlcidcbiAgICAgIGFyZ3M6ICh7ZmlsZXBhdGh9KSAtPiBbJy0tY29sb3InLCBmaWxlcGF0aF1cbiAgICAnTGluZSBOdW1iZXIgQmFzZWQnOlxuICAgICAgY29tbWFuZDogJ2N1Y3VtYmVyJ1xuICAgICAgYXJnczogKGNvbnRleHQpIC0+IFsnLS1jb2xvcicsIGNvbnRleHQuZmlsZUNvbG9uTGluZSgpXVxuXG4gIEdvOlxuICAgICdGaWxlIEJhc2VkJzpcbiAgICAgIGNvbW1hbmQ6ICdnbydcbiAgICAgIHdvcmtpbmdEaXJlY3Rvcnk6IGF0b20ud29ya3NwYWNlLmdldEFjdGl2ZVBhbmVJdGVtKCk/LmJ1ZmZlcj8uZmlsZT8uZ2V0UGFyZW50PygpLmdldFBhdGg/KClcbiAgICAgIGFyZ3M6ICh7ZmlsZXBhdGh9KSAtPlxuICAgICAgICBpZiBmaWxlcGF0aC5tYXRjaCgvX3Rlc3QuZ28vKSB0aGVuIFsndGVzdCcsICcnXVxuICAgICAgICBlbHNlIFsncnVuJywgZmlsZXBhdGhdXG5cbiAgR3Jvb3Z5OlxuICAgICdTZWxlY3Rpb24gQmFzZWQnOlxuICAgICAgY29tbWFuZDogJ2dyb292eSdcbiAgICAgIGFyZ3M6IChjb250ZXh0KSAtPiBbJy1lJywgY29udGV4dC5nZXRDb2RlKCldXG4gICAgJ0ZpbGUgQmFzZWQnOlxuICAgICAgY29tbWFuZDogJ2dyb292eSdcbiAgICAgIGFyZ3M6ICh7ZmlsZXBhdGh9KSAtPiBbZmlsZXBhdGhdXG5cbiAgSHk6XG4gICAgJ1NlbGVjdGlvbiBCYXNlZCc6XG4gICAgICBjb21tYW5kOiAnaHknXG4gICAgICBhcmdzOiAoY29udGV4dCkgLT5cbiAgICAgICAgY29kZSA9IGNvbnRleHQuZ2V0Q29kZSgpXG4gICAgICAgIHRtcEZpbGUgPSBHcmFtbWFyVXRpbHMuY3JlYXRlVGVtcEZpbGVXaXRoQ29kZShjb2RlLCAnLmh5JylcbiAgICAgICAgcmV0dXJuIFt0bXBGaWxlXVxuICAgICdGaWxlIEJhc2VkJzpcbiAgICAgIGNvbW1hbmQ6ICdoeSdcbiAgICAgIGFyZ3M6ICh7ZmlsZXBhdGh9KSAtPiBbZmlsZXBhdGhdXG5cbiAgSWRyaXM6XG4gICAgJ0ZpbGUgQmFzZWQnOlxuICAgICAgY29tbWFuZDogJ2lkcmlzJ1xuICAgICAgYXJnczogKHtmaWxlcGF0aH0pIC0+IFtmaWxlcGF0aCwgJy1vJywgcGF0aC5iYXNlbmFtZShmaWxlcGF0aCwgcGF0aC5leHRuYW1lKGZpbGVwYXRoKSldXG5cbiAgSW5ub1NldHVwOlxuICAgICdGaWxlIEJhc2VkJzpcbiAgICAgIGNvbW1hbmQ6ICdJU0NDLmV4ZSdcbiAgICAgIGFyZ3M6ICh7ZmlsZXBhdGh9KSAtPiBbJy9RJywgZmlsZXBhdGhdXG5cbiAgaW9MYW5ndWFnZTpcbiAgICAnU2VsZWN0aW9uIEJhc2VkJzpcbiAgICAgIGNvbW1hbmQ6ICdpbydcbiAgICAgIGFyZ3M6IChjb250ZXh0KSAtPiBbY29udGV4dC5nZXRDb2RlKCldXG4gICAgJ0ZpbGUgQmFzZWQnOlxuICAgICAgY29tbWFuZDogJ2lvJ1xuICAgICAgYXJnczogKHtmaWxlcGF0aH0pIC0+IFsnLWUnLCBmaWxlcGF0aF1cblxuICBKb2xpZTpcbiAgICAnRmlsZSBCYXNlZCc6XG4gICAgICBjb21tYW5kOiAnam9saWUnXG4gICAgICBhcmdzOiAoe2ZpbGVwYXRofSkgLT4gW2ZpbGVwYXRoXVxuXG4gIEp1bGlhOlxuICAgICdTZWxlY3Rpb24gQmFzZWQnOlxuICAgICAgY29tbWFuZDogJ2p1bGlhJ1xuICAgICAgYXJnczogKGNvbnRleHQpIC0+IFsnLWUnLCBjb250ZXh0LmdldENvZGUoKV1cbiAgICAnRmlsZSBCYXNlZCc6XG4gICAgICBjb21tYW5kOiAnanVsaWEnXG4gICAgICBhcmdzOiAoe2ZpbGVwYXRofSkgLT4gW2ZpbGVwYXRoXVxuXG4gIExBTU1QUzpcbiAgICBpZiBvcyBpbiBbJ2RhcndpbicsICdsaW51eCddXG4gICAgICAnRmlsZSBCYXNlZCc6XG4gICAgICAgIGNvbW1hbmQ6ICdsYW1tcHMnXG4gICAgICAgIGFyZ3M6ICh7ZmlsZXBhdGh9KSAtPiBbJy1sb2cnLCAnbm9uZScsICctaW4nLCBmaWxlcGF0aF1cblxuICBMaWx5UG9uZDpcbiAgICAnRmlsZSBCYXNlZCc6XG4gICAgICBjb21tYW5kOiAnbGlseXBvbmQnXG4gICAgICBhcmdzOiAoe2ZpbGVwYXRofSkgLT4gW2ZpbGVwYXRoXVxuXG4gIExpdmVTY3JpcHQ6XG4gICAgJ1NlbGVjdGlvbiBCYXNlZCc6XG4gICAgICBjb21tYW5kOiAnbHNjJ1xuICAgICAgYXJnczogKGNvbnRleHQpIC0+IFsnLWUnLCBjb250ZXh0LmdldENvZGUoKV1cbiAgICAnRmlsZSBCYXNlZCc6XG4gICAgICBjb21tYW5kOiAnbHNjJ1xuICAgICAgYXJnczogKHtmaWxlcGF0aH0pIC0+IFtmaWxlcGF0aF1cblxuICBNYWtlZmlsZTpcbiAgICAnU2VsZWN0aW9uIEJhc2VkJzpcbiAgICAgIGNvbW1hbmQ6ICdiYXNoJ1xuICAgICAgYXJnczogKGNvbnRleHQpIC0+IFsnLWMnLCBjb250ZXh0LmdldENvZGUoKV1cblxuICAgICdGaWxlIEJhc2VkJzpcbiAgICAgIGNvbW1hbmQ6ICdtYWtlJ1xuICAgICAgYXJnczogKHtmaWxlcGF0aH0pIC0+IFsnLWYnLCBmaWxlcGF0aF1cblxuICBNQVRMQUI6XG4gICAgJ1NlbGVjdGlvbiBCYXNlZCc6XG4gICAgICBjb21tYW5kOiAnbWF0bGFiJ1xuICAgICAgYXJnczogKGNvbnRleHQpIC0+XG4gICAgICAgIGNvZGUgPSBjb250ZXh0LmdldENvZGUoKVxuICAgICAgICB0bXBGaWxlID0gR3JhbW1hclV0aWxzLk1BVExBQi5jcmVhdGVUZW1wRmlsZVdpdGhDb2RlKGNvZGUpXG4gICAgICAgIHJldHVybiBbJy1ub2Rlc2t0b3AnLCAnLW5vc3BsYXNoJywgJy1yJywgXCJ0cnksIHJ1bignI3t0bXBGaWxlfScpOyB3aGlsZSB+aXNlbXB0eShnZXQoMCwnQ2hpbGRyZW4nKSk7IHBhdXNlKDAuNSk7IGVuZDsgY2F0Y2ggTUU7IGRpc3AoTUUubWVzc2FnZSk7IGV4aXQoMSk7IGVuZDsgZXhpdCgwKTtcIl1cbiAgICAnRmlsZSBCYXNlZCc6XG4gICAgICBjb21tYW5kOiAnbWF0bGFiJ1xuICAgICAgYXJnczogKHtmaWxlcGF0aH0pIC0+IFsnLW5vZGVza3RvcCcsICctbm9zcGxhc2gnLCAnLXInLCBcInRyeSBydW4oJyN7ZmlsZXBhdGh9Jyk7IHdoaWxlIH5pc2VtcHR5KGdldCgwLCdDaGlsZHJlbicpKTsgcGF1c2UoMC41KTsgZW5kOyBjYXRjaCBNRTsgZGlzcChNRS5tZXNzYWdlKTsgZXhpdCgxKTsgZW5kOyBleGl0KDApO1wiXVxuXG4gICdNSVBTIEFzc2VtYmxlcic6XG4gICAgJ0ZpbGUgQmFzZWQnOlxuICAgICAgY29tbWFuZDogJ3NwaW0nXG4gICAgICBhcmdzOiAoe2ZpbGVwYXRofSkgLT4gWyctZicsIGZpbGVwYXRoXVxuXG4gIE5DTDpcbiAgICAnU2VsZWN0aW9uIEJhc2VkJzpcbiAgICAgIGNvbW1hbmQ6ICduY2wnXG4gICAgICBhcmdzOiAoY29udGV4dCkgLT5cbiAgICAgICAgY29kZSA9IGNvbnRleHQuZ2V0Q29kZSgpICsgJ1xcblxcbmV4aXQnXG4gICAgICAgIHRtcEZpbGUgPSBHcmFtbWFyVXRpbHMuY3JlYXRlVGVtcEZpbGVXaXRoQ29kZShjb2RlKVxuICAgICAgICByZXR1cm4gW3RtcEZpbGVdXG4gICAgJ0ZpbGUgQmFzZWQnOlxuICAgICAgY29tbWFuZDogJ25jbCdcbiAgICAgIGFyZ3M6ICh7ZmlsZXBhdGh9KSAtPiBbZmlsZXBhdGhdXG5cbiAgTmltOlxuICAgICdGaWxlIEJhc2VkJzoge1xuICAgICAgY29tbWFuZFxuICAgICAgYXJnczogKHtmaWxlcGF0aH0pIC0+XG4gICAgICAgIGZpbGUgPSBHcmFtbWFyVXRpbHMuTmltLmZpbmROaW1Qcm9qZWN0RmlsZShmaWxlcGF0aClcbiAgICAgICAgZGlyID0gR3JhbW1hclV0aWxzLk5pbS5wcm9qZWN0RGlyKGZpbGVwYXRoKVxuICAgICAgICBjb21tYW5kcyA9IFwiY2QgJyN7ZGlyfScgJiYgbmltIGMgLS1oaW50czpvZmYgLS1wYXJhbGxlbEJ1aWxkOjEgLXIgJyN7ZmlsZX0nIDI+JjFcIlxuICAgICAgICByZXR1cm4gR3JhbW1hclV0aWxzLmZvcm1hdEFyZ3MoY29tbWFuZHMpXG4gICAgfVxuICBOU0lTOlxuICAgICdTZWxlY3Rpb24gQmFzZWQnOlxuICAgICAgY29tbWFuZDogJ21ha2Vuc2lzJ1xuICAgICAgYXJnczogKGNvbnRleHQpIC0+XG4gICAgICAgIGNvZGUgPSBjb250ZXh0LmdldENvZGUoKVxuICAgICAgICB0bXBGaWxlID0gR3JhbW1hclV0aWxzLmNyZWF0ZVRlbXBGaWxlV2l0aENvZGUoY29kZSlcbiAgICAgICAgcmV0dXJuIFt0bXBGaWxlXVxuICAgICdGaWxlIEJhc2VkJzpcbiAgICAgIGNvbW1hbmQ6ICdtYWtlbnNpcydcbiAgICAgIGFyZ3M6ICh7ZmlsZXBhdGh9KSAtPiBbZmlsZXBhdGhdXG5cbiAgT2N0YXZlOlxuICAgICdTZWxlY3Rpb24gQmFzZWQnOlxuICAgICAgY29tbWFuZDogJ29jdGF2ZSdcbiAgICAgIGFyZ3M6IChjb250ZXh0KSAtPlxuICAgICAgICBkaXIgPSBwYXRoLmRpcm5hbWUoY29udGV4dC5maWxlcGF0aClcbiAgICAgICAgcmV0dXJuIFsnLXAnLCBwYXRoLmRpcm5hbWUoY29udGV4dC5maWxlcGF0aCksICctLWV2YWwnLCBjb250ZXh0LmdldENvZGUoKV1cbiAgICAnRmlsZSBCYXNlZCc6XG4gICAgICBjb21tYW5kOiAnb2N0YXZlJ1xuICAgICAgYXJnczogKHtmaWxlcGF0aH0pIC0+IFsnLXAnLCBwYXRoLmRpcm5hbWUoZmlsZXBhdGgpLCBmaWxlcGF0aF1cblxuICBPejpcbiAgICAnU2VsZWN0aW9uIEJhc2VkJzpcbiAgICAgIGNvbW1hbmQ6ICdvemMnXG4gICAgICBhcmdzOiAoY29udGV4dCkgLT5cbiAgICAgICAgY29kZSA9IGNvbnRleHQuZ2V0Q29kZSgpXG4gICAgICAgIHRtcEZpbGUgPSBHcmFtbWFyVXRpbHMuY3JlYXRlVGVtcEZpbGVXaXRoQ29kZShjb2RlKVxuICAgICAgICByZXR1cm4gWyctYycsIHRtcEZpbGVdXG4gICAgJ0ZpbGUgQmFzZWQnOlxuICAgICAgY29tbWFuZDogJ296YydcbiAgICAgIGFyZ3M6ICh7ZmlsZXBhdGh9KSAtPiBbJy1jJywgZmlsZXBhdGhdXG5cbiAgUGFzY2FsOlxuICAgICdTZWxlY3Rpb24gQmFzZWQnOlxuICAgICAgY29tbWFuZDogJ2ZwYydcbiAgICAgIGFyZ3M6IChjb250ZXh0KSAtPlxuICAgICAgICBjb2RlID0gY29udGV4dC5nZXRDb2RlKClcbiAgICAgICAgdG1wRmlsZSA9IEdyYW1tYXJVdGlscy5jcmVhdGVUZW1wRmlsZVdpdGhDb2RlKGNvZGUpXG4gICAgICAgIHJldHVybiBbdG1wRmlsZV1cbiAgICAnRmlsZSBCYXNlZCc6XG4gICAgICBjb21tYW5kOiAnZnBjJ1xuICAgICAgYXJnczogKHtmaWxlcGF0aH0pIC0+IFtmaWxlcGF0aF1cblxuICBQb3ZyYXk6XG4gICAgJ0ZpbGUgQmFzZWQnOiB7XG4gICAgICBjb21tYW5kXG4gICAgICBhcmdzOiAoe2ZpbGVwYXRofSkgLT5cbiAgICAgICAgY29tbWFuZHMgPSBpZiB3aW5kb3dzIHRoZW4gJ3B2ZW5naW5lIC9FWElUIC9SRU5ERVIgJyBlbHNlICdwb3ZyYXkgJ1xuICAgICAgICByZXR1cm4gR3JhbW1hclV0aWxzLmZvcm1hdEFyZ3MoY29tbWFuZHMrZmlsZXBhdGgpXG4gICAgfVxuXG4gIFByb2xvZzpcbiAgICAnRmlsZSBCYXNlZCc6IHtcbiAgICAgIGNvbW1hbmRcbiAgICAgIGFyZ3M6ICh7ZmlsZXBhdGh9KSAtPlxuICAgICAgICBkaXIgPSBwYXRoLmRpcm5hbWUoZmlsZXBhdGgpXG4gICAgICAgIGNvbW1hbmRzID0gXCJjZCAnI3tkaXJ9Jzsgc3dpcGwgLWYgJyN7ZmlsZXBhdGh9JyAtdCBtYWluIC0tcXVpZXRcIlxuICAgICAgICByZXR1cm4gR3JhbW1hclV0aWxzLmZvcm1hdEFyZ3MoY29tbWFuZHMpXG4gICAgfVxuICBQdXJlU2NyaXB0OlxuICAgICdGaWxlIEJhc2VkJzoge1xuICAgICAgY29tbWFuZFxuICAgICAgYXJnczogKHtmaWxlcGF0aH0pIC0+XG4gICAgICAgIGRpciA9IHBhdGguZGlybmFtZShmaWxlcGF0aClcbiAgICAgICAgcmV0dXJuIEdyYW1tYXJVdGlscy5mb3JtYXRBcmdzKFwiY2QgJyN7ZGlyfScgJiYgcHVscCBydW5cIilcbiAgICB9XG4gIFI6XG4gICAgJ1NlbGVjdGlvbiBCYXNlZCc6XG4gICAgICBjb21tYW5kOiAnUnNjcmlwdCdcbiAgICAgIGFyZ3M6IChjb250ZXh0KSAtPlxuICAgICAgICBjb2RlID0gY29udGV4dC5nZXRDb2RlKClcbiAgICAgICAgdG1wRmlsZSA9IEdyYW1tYXJVdGlscy5SLmNyZWF0ZVRlbXBGaWxlV2l0aENvZGUoY29kZSlcbiAgICAgICAgcmV0dXJuIFt0bXBGaWxlXVxuICAgICdGaWxlIEJhc2VkJzpcbiAgICAgIGNvbW1hbmQ6ICdSc2NyaXB0J1xuICAgICAgYXJnczogKHtmaWxlcGF0aH0pIC0+IFtmaWxlcGF0aF1cblxuICBSYWNrZXQ6XG4gICAgJ1NlbGVjdGlvbiBCYXNlZCc6XG4gICAgICBjb21tYW5kOiAncmFja2V0J1xuICAgICAgYXJnczogKGNvbnRleHQpIC0+IFsnLWUnLCBjb250ZXh0LmdldENvZGUoKV1cbiAgICAnRmlsZSBCYXNlZCc6XG4gICAgICBjb21tYW5kOiAncmFja2V0J1xuICAgICAgYXJnczogKHtmaWxlcGF0aH0pIC0+IFtmaWxlcGF0aF1cblxuICBcIlJlbidQeVwiOlxuICAgICdGaWxlIEJhc2VkJzpcbiAgICAgIGNvbW1hbmQ6ICdyZW5weSdcbiAgICAgIGFyZ3M6ICh7ZmlsZXBhdGh9KSAtPiBbZmlsZXBhdGguc3Vic3RyKDAsIGZpbGVwYXRoLmxhc3RJbmRleE9mKCcvZ2FtZScpKV1cblxuICAnUm9ib3QgRnJhbWV3b3JrJzpcbiAgICAnRmlsZSBCYXNlZCc6XG4gICAgICBjb21tYW5kOiAncm9ib3QnXG4gICAgICBhcmdzOiAoe2ZpbGVwYXRofSkgLT4gW2ZpbGVwYXRoXVxuXG4gIFJ1c3Q6XG4gICAgJ0ZpbGUgQmFzZWQnOiB7XG4gICAgICBjb21tYW5kXG4gICAgICBhcmdzOiAoe2ZpbGVwYXRoLCBmaWxlbmFtZX0pIC0+XG4gICAgICAgIGlmIHdpbmRvd3NcbiAgICAgICAgICByZXR1cm4gW1wiL2MgcnVzdGMgI3tmaWxlcGF0aH0gJiYgI3tmaWxlbmFtZVsuLi00XX0uZXhlXCJdXG4gICAgICAgIGVsc2UgWyctYycsIFwicnVzdGMgJyN7ZmlsZXBhdGh9JyAtbyAvdG1wL3JzLm91dCAmJiAvdG1wL3JzLm91dFwiXVxuICAgIH1cbiAgU2NhbGE6XG4gICAgJ1NlbGVjdGlvbiBCYXNlZCc6XG4gICAgICBjb21tYW5kOiAnc2NhbGEnXG4gICAgICBhcmdzOiAoY29udGV4dCkgLT4gWyctZScsIGNvbnRleHQuZ2V0Q29kZSgpXVxuICAgICdGaWxlIEJhc2VkJzpcbiAgICAgIGNvbW1hbmQ6ICdzY2FsYSdcbiAgICAgIGFyZ3M6ICh7ZmlsZXBhdGh9KSAtPiBbZmlsZXBhdGhdXG5cbiAgU3RhdGE6XG4gICAgJ1NlbGVjdGlvbiBCYXNlZCc6XG4gICAgICBjb21tYW5kOiAnc3RhdGEnXG4gICAgICBhcmdzOiAoY29udGV4dCkgLT4gWydkbycsIGNvbnRleHQuZ2V0Q29kZSgpXVxuICAgICdGaWxlIEJhc2VkJzpcbiAgICAgIGNvbW1hbmQ6ICdzdGF0YSdcbiAgICAgIGFyZ3M6ICh7ZmlsZXBhdGh9KSAtPiBbJ2RvJywgZmlsZXBhdGhdXG5cbiAgVHVyaW5nOlxuICAgICdGaWxlIEJhc2VkJzpcbiAgICAgIGNvbW1hbmQ6ICd0dXJpbmcnXG4gICAgICBhcmdzOiAoe2ZpbGVwYXRofSkgLT4gWyctcnVuJywgZmlsZXBhdGhdXG5cbiAgXCJ4ODYgYW5kIHg4Nl82NCBBc3NlbWJseVwiOlxuICAgICdGaWxlIEJhc2VkJzpcbiAgICAgIGNvbW1hbmQ6ICdiYXNoJ1xuICAgICAgYXJnczogKHtmaWxlcGF0aH0pIC0+XG4gICAgICAgIGFyZ3MgPSBzd2l0Y2ggYXJjaFxuICAgICAgICAgIHdoZW4gJ3gzMidcbiAgICAgICAgICAgIFwibmFzbSAtZiBlbGYgJyN7ZmlsZXBhdGh9JyAtbyAvdG1wL2FzbS5vdXQubyAmJiBsZCAtbSBlbGZfaTM4NiAvdG1wL2FzbS5vdXQubyAtbyAvdG1wL2FzbS5vdXQgJiYgL3RtcC9hc20ub3V0XCJcbiAgICAgICAgICB3aGVuICd4NjQnXG4gICAgICAgICAgICBcIm5hc20gLWYgZWxmNjQgJyN7ZmlsZXBhdGh9JyAtbyAvdG1wL2FzbS5vdXQubyAmJiBsZCAvdG1wL2FzbS5vdXQubyAtbyAvdG1wL2FzbS5vdXQgJiYgL3RtcC9hc20ub3V0XCJcbiAgICAgICAgcmV0dXJuIFsnLWMnLCBhcmdzXVxuXG4gICAgJ1NlbGVjdGlvbiBCYXNlZCc6XG4gICAgICBjb21tYW5kOiAnYmFzaCdcbiAgICAgIGFyZ3M6IChjb250ZXh0KSAtPlxuICAgICAgICBjb2RlID0gY29udGV4dC5nZXRDb2RlKClcbiAgICAgICAgdG1wRmlsZSA9IEdyYW1tYXJVdGlscy5jcmVhdGVUZW1wRmlsZVdpdGhDb2RlKGNvZGUsICcuYXNtJylcbiAgICAgICAgYXJncyA9IHN3aXRjaCBhcmNoXG4gICAgICAgICAgd2hlbiAneDMyJ1xuICAgICAgICAgICAgXCJuYXNtIC1mIGVsZiAnI3t0bXBGaWxlfScgLW8gL3RtcC9hc20ub3V0Lm8gJiYgbGQgLW0gZWxmX2kzODYgL3RtcC9hc20ub3V0Lm8gLW8gL3RtcC9hc20ub3V0ICYmIC90bXAvYXNtLm91dFwiXG4gICAgICAgICAgd2hlbiAneDY0J1xuICAgICAgICAgICAgXCJuYXNtIC1mIGVsZjY0ICcje3RtcEZpbGV9JyAtbyAvdG1wL2FzbS5vdXQubyAmJiBsZCAvdG1wL2FzbS5vdXQubyAtbyAvdG1wL2FzbS5vdXQgJiYgL3RtcC9hc20ub3V0XCJcbiAgICAgICAgcmV0dXJuIFsnLWMnLCBhcmdzXVxuIl19
