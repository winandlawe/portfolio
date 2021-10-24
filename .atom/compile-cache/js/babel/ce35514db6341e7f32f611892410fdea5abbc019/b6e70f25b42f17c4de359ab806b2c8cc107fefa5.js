Object.defineProperty(exports, "__esModule", {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS205: Consider reworking code to avoid use of IIFEs
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
// Maps Atom Grammar names to the command used by that language
// As well as any special setup for arguments.

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _grammarUtils = require("../grammar-utils");

var _grammarUtils2 = _interopRequireDefault(_grammarUtils);

"use babel";var OperatingSystem = _grammarUtils2["default"].OperatingSystem;
var command = _grammarUtils2["default"].command;

var os = OperatingSystem.platform();
var arch = OperatingSystem.architecture();
var windows = OperatingSystem.isWindows();

var OtherGrammars = {
  "1C (BSL)": {
    "File Based": {
      command: "oscript",
      args: function args(_ref) {
        var filepath = _ref.filepath;

        return ["-encoding=utf-8", filepath];
      }
    }
  },

  Ansible: {
    "File Based": {
      command: "ansible-playbook",
      args: function args(_ref2) {
        var filepath = _ref2.filepath;

        return [filepath];
      }
    }
  },

  Clojure: {
    "Selection Based": {
      command: "lein",
      args: function args(context) {
        return ["exec", "-e", context.getCode()];
      }
    },
    "File Based": {
      command: "lein",
      args: function args(_ref3) {
        var filepath = _ref3.filepath;

        return ["exec", filepath];
      }
    }
  },

  Crystal: {
    "Selection Based": {
      command: "crystal",
      args: function args(context) {
        return ["eval", context.getCode()];
      }
    },
    "File Based": {
      command: "crystal",
      args: function args(_ref4) {
        var filepath = _ref4.filepath;

        return [filepath];
      }
    }
  },

  D: {
    "Selection Based": {
      command: "rdmd",
      args: function args(context) {
        var code = context.getCode();
        var tmpFile = _grammarUtils2["default"].D.createTempFileWithCode(code);
        return [tmpFile];
      }
    },
    "File Based": {
      command: "rdmd",
      args: function args(_ref5) {
        var filepath = _ref5.filepath;

        return [filepath];
      }
    }
  },

  Elixir: {
    "Selection Based": {
      command: "elixir",
      args: function args(context) {
        return ["-e", context.getCode()];
      }
    },
    "File Based": {
      command: "elixir",
      args: function args(_ref6) {
        var filepath = _ref6.filepath;

        return ["-r", filepath];
      }
    }
  },

  Erlang: {
    "Selection Based": {
      command: "erl",
      args: function args(context) {
        return ["-noshell", "-eval", context.getCode() + ", init:stop()."];
      }
    }
  },

  "F*": {
    "File Based": {
      command: "fstar",
      args: function args(_ref7) {
        var filepath = _ref7.filepath;

        return [filepath];
      }
    }
  },

  "F#": {
    "File Based": {
      command: windows ? "fsi" : "fsharpi",
      args: function args(_ref8) {
        var filepath = _ref8.filepath;

        return ["--exec", filepath];
      }
    }
  },

  Forth: {
    "File Based": {
      command: "gforth",
      args: function args(_ref9) {
        var filepath = _ref9.filepath;

        return [filepath];
      }
    }
  },

  Gherkin: {
    "File Based": {
      command: "cucumber",
      args: function args(_ref10) {
        var filepath = _ref10.filepath;

        return ["--color", filepath];
      }
    },
    "Line Number Based": {
      command: "cucumber",
      args: function args(context) {
        return ["--color", context.fileColonLine()];
      }
    }
  },

  Go: {
    "File Based": {
      command: "go",
      workingDirectory: _grammarUtils2["default"].workingDirectory(),
      args: function args(_ref11) {
        var filepath = _ref11.filepath;

        if (filepath.match(/_test.go/)) {
          return ["test", ""];
        } else {
          return ["run", filepath];
        }
      }
    }
  },

  Groovy: {
    "Selection Based": {
      command: "groovy",
      args: function args(context) {
        return ["-e", context.getCode()];
      }
    },
    "File Based": {
      command: "groovy",
      args: function args(_ref12) {
        var filepath = _ref12.filepath;

        return [filepath];
      }
    }
  },

  Hy: {
    "Selection Based": {
      command: "hy",
      args: function args(context) {
        var code = context.getCode();
        var tmpFile = _grammarUtils2["default"].createTempFileWithCode(code, ".hy");
        return [tmpFile];
      }
    },
    "File Based": {
      command: "hy",
      args: function args(_ref13) {
        var filepath = _ref13.filepath;

        return [filepath];
      }
    }
  },

  Idris: {
    "File Based": {
      command: "idris",
      args: function args(_ref14) {
        var filepath = _ref14.filepath;

        return [filepath, "-o", _path2["default"].basename(filepath, _path2["default"].extname(filepath))];
      }
    }
  },

  InnoSetup: {
    "File Based": {
      command: "ISCC.exe",
      args: function args(_ref15) {
        var filepath = _ref15.filepath;

        return ["/Q", filepath];
      }
    }
  },

  ioLanguage: {
    "Selection Based": {
      command: "io",
      args: function args(context) {
        return [context.getCode()];
      }
    },
    "File Based": {
      command: "io",
      args: function args(_ref16) {
        var filepath = _ref16.filepath;

        return ["-e", filepath];
      }
    }
  },

  Jolie: {
    "File Based": {
      command: "jolie",
      args: function args(_ref17) {
        var filepath = _ref17.filepath;

        return [filepath];
      }
    }
  },

  Julia: {
    "Selection Based": {
      command: "julia",
      args: function args(context) {
        return ["-e", context.getCode()];
      }
    },
    "File Based": {
      command: "julia",
      args: function args(_ref18) {
        var filepath = _ref18.filepath;

        return [filepath];
      }
    }
  },

  LAMMPS: ["darwin", "linux"].includes(os) ? {
    "File Based": {
      command: "lammps",
      args: function args(_ref19) {
        var filepath = _ref19.filepath;

        return ["-log", "none", "-in", filepath];
      }
    }
  } : undefined,

  LilyPond: {
    "File Based": {
      command: "lilypond",
      args: function args(_ref20) {
        var filepath = _ref20.filepath;

        return [filepath];
      }
    }
  },

  LiveScript: {
    "Selection Based": {
      command: "lsc",
      args: function args(context) {
        return ["-e", context.getCode()];
      }
    },
    "File Based": {
      command: "lsc",
      args: function args(_ref21) {
        var filepath = _ref21.filepath;

        return [filepath];
      }
    }
  },

  Makefile: {
    "Selection Based": {
      command: "bash",
      args: function args(context) {
        return ["-c", context.getCode()];
      }
    },

    "File Based": {
      command: "make",
      args: function args(_ref22) {
        var filepath = _ref22.filepath;

        return ["-f", filepath];
      }
    }
  },

  MATLAB: {
    "Selection Based": {
      command: "matlab",
      args: function args(context) {
        var code = context.getCode();
        var tmpFile = _grammarUtils2["default"].MATLAB.createTempFileWithCode(code);
        return ["-nodesktop", "-nosplash", "-r", "try, run('" + tmpFile + "'); while ~isempty(get(0,'Children')); pause(0.5); end; catch ME; disp(ME.message); exit(1); end; exit(0);"];
      }
    },
    "File Based": {
      command: "matlab",
      args: function args(_ref23) {
        var filepath = _ref23.filepath;

        return ["-nodesktop", "-nosplash", "-r", "try run('" + filepath + "'); while ~isempty(get(0,'Children')); pause(0.5); end; catch ME; disp(ME.message); exit(1); end; exit(0);"];
      }
    }
  },

  "MIPS Assembler": {
    "File Based": {
      command: "spim",
      args: function args(_ref24) {
        var filepath = _ref24.filepath;

        return ["-f", filepath];
      }
    }
  },

  NCL: {
    "Selection Based": {
      command: "ncl",
      args: function args(context) {
        var code = context.getCode() + "\n\nexit";
        var tmpFile = _grammarUtils2["default"].createTempFileWithCode(code);
        return [tmpFile];
      }
    },
    "File Based": {
      command: "ncl",
      args: function args(_ref25) {
        var filepath = _ref25.filepath;

        return [filepath];
      }
    }
  },

  Nim: {
    "File Based": {
      command: command,
      args: function args(_ref26) {
        var filepath = _ref26.filepath;

        var file = _grammarUtils2["default"].Nim.findNimProjectFile(filepath);
        var dir = _grammarUtils2["default"].Nim.projectDir(filepath);
        var commands = "cd '" + dir + "' && nim c --hints:off --parallelBuild:1 -r '" + file + "' 2>&1";
        return _grammarUtils2["default"].formatArgs(commands);
      }
    }
  },
  NSIS: {
    "Selection Based": {
      command: "makensis",
      args: function args(context) {
        var code = context.getCode();
        var tmpFile = _grammarUtils2["default"].createTempFileWithCode(code);
        return [tmpFile];
      }
    },
    "File Based": {
      command: "makensis",
      args: function args(_ref27) {
        var filepath = _ref27.filepath;

        return [filepath];
      }
    }
  },

  Octave: {
    "Selection Based": {
      command: "octave",
      args: function args(context) {
        var dir = _path2["default"].dirname(context.filepath);
        return ["-p", _path2["default"].dirname(context.filepath), "--eval", context.getCode()];
      }
    },
    "File Based": {
      command: "octave",
      args: function args(_ref28) {
        var filepath = _ref28.filepath;

        return ["-p", _path2["default"].dirname(filepath), filepath];
      }
    }
  },

  Oz: {
    "Selection Based": {
      command: "ozc",
      args: function args(context) {
        var code = context.getCode();
        var tmpFile = _grammarUtils2["default"].createTempFileWithCode(code);
        return ["-c", tmpFile];
      }
    },
    "File Based": {
      command: "ozc",
      args: function args(_ref29) {
        var filepath = _ref29.filepath;

        return ["-c", filepath];
      }
    }
  },

  Pascal: {
    "Selection Based": {
      command: "fpc",
      args: function args(context) {
        var code = context.getCode();
        var tmpFile = _grammarUtils2["default"].createTempFileWithCode(code);
        return [tmpFile];
      }
    },
    "File Based": {
      command: "fpc",
      args: function args(_ref30) {
        var filepath = _ref30.filepath;

        return [filepath];
      }
    }
  },

  Povray: {
    "File Based": {
      command: command,
      args: function args(_ref31) {
        var filepath = _ref31.filepath;

        var commands = windows ? "pvengine /EXIT /RENDER " : "povray ";
        return _grammarUtils2["default"].formatArgs(commands + filepath);
      }
    }
  },

  Prolog: {
    "File Based": {
      command: command,
      args: function args(_ref32) {
        var filepath = _ref32.filepath;

        var dir = _path2["default"].dirname(filepath);
        var commands = "cd '" + dir + "'; swipl -f '" + filepath + "' -t main --quiet";
        return _grammarUtils2["default"].formatArgs(commands);
      }
    }
  },
  PureScript: {
    "File Based": {
      command: command,
      args: function args(_ref33) {
        var filepath = _ref33.filepath;

        var dir = _path2["default"].dirname(filepath);
        return _grammarUtils2["default"].formatArgs("cd '" + dir + "' && pulp run");
      }
    }
  },
  R: {
    "Selection Based": {
      command: "Rscript",
      args: function args(context) {
        var code = context.getCode();
        var tmpFile = _grammarUtils2["default"].R.createTempFileWithCode(code);
        return [tmpFile];
      }
    },
    "File Based": {
      command: "Rscript",
      args: function args(_ref34) {
        var filepath = _ref34.filepath;

        return [filepath];
      }
    }
  },

  Racket: {
    "Selection Based": {
      command: "racket",
      args: function args(context) {
        return ["-e", context.getCode()];
      }
    },
    "File Based": {
      command: "racket",
      args: function args(_ref35) {
        var filepath = _ref35.filepath;

        return [filepath];
      }
    }
  },

  "Ren'Py": {
    "File Based": {
      command: "renpy",
      args: function args(_ref36) {
        var filepath = _ref36.filepath;

        return [filepath.substr(0, filepath.lastIndexOf("/game"))];
      }
    }
  },

  "Robot Framework": {
    "File Based": {
      command: "robot",
      args: function args(_ref37) {
        var filepath = _ref37.filepath;

        return [filepath];
      }
    }
  },

  Rust: {
    "File Based": {
      command: command,
      args: function args(_ref38) {
        var filepath = _ref38.filepath;
        var filename = _ref38.filename;

        if (windows) {
          return ["/c rustc " + filepath + " && " + filename.slice(0, Number(-4) + 1 || undefined) + ".exe"];
        } else {
          var tempOutFile = _grammarUtils2["default"].createTempPath("rs-", ".out");
          return ["-c", "rustc '" + filepath + "' -o " + tempOutFile + " && " + tempOutFile];
        }
      }
    }
  },
  Scala: {
    "Selection Based": {
      command: "scala",
      args: function args(context) {
        return ["-e", context.getCode()];
      }
    },
    "File Based": {
      command: "scala",
      args: function args(_ref39) {
        var filepath = _ref39.filepath;

        return [filepath];
      }
    }
  },

  Stata: {
    "Selection Based": {
      command: "stata",
      args: function args(context) {
        return ["do", context.getCode()];
      }
    },
    "File Based": {
      command: "stata",
      args: function args(_ref40) {
        var filepath = _ref40.filepath;

        return ["do", filepath];
      }
    }
  },

  Turing: {
    "File Based": {
      command: "turing",
      args: function args(_ref41) {
        var filepath = _ref41.filepath;

        return ["-run", filepath];
      }
    }
  },

  "x86 and x86_64 Assembly": {
    "File Based": {
      command: "bash",
      args: function args(_ref42) {
        var filepath = _ref42.filepath;

        var tempOutOFile = _grammarUtils2["default"].createTempPath("asm-", ".out.o");
        var tempOutFile = _grammarUtils2["default"].createTempPath("asm-", ".out");
        var cmadArgs = "";
        switch (arch) {
          case "x32":
            cmadArgs = "nasm -f elf '" + filepath + "' -o " + tempOutOFile + " && ld -m elf_i386 " + tempOutOFile + " -o " + tempOutFile + " && " + tempOutFile;
            break;
          case "x64":
            cmadArgs = "nasm -f elf64 '" + filepath + "' -o " + tempOutOFile + " && ld " + tempOutOFile + " -o " + tempOutFile + " && " + tempOutFile;
            break;
          default:
            {
              atom.notifications.addError("Not supported on " + arch);
            }
        }
        return ["-c", cmadArgs];
      }
    },

    "Selection Based": {
      command: "bash",
      args: function args(context) {
        var code = context.getCode();
        var tmpFile = _grammarUtils2["default"].createTempFileWithCode(code, ".asm");
        var tempOutOFile = _grammarUtils2["default"].createTempPath("asm-", ".out.o");
        var tempOutFile = _grammarUtils2["default"].createTempPath("asm-", ".out");
        var cmdArgs = "";
        switch (arch) {
          case "x32":
            cmdArgs = "nasm -f elf '" + tmpFile + "' -o " + tempOutOFile + " && ld -m elf_i386 " + tempOutOFile + " -o " + tempOutFile + " && " + tempOutFile;
            break;
          case "x64":
            cmdArgs = "nasm -f elf64 '" + tmpFile + "' -o " + tempOutOFile + " && ld " + tempOutOFile + " -o " + tempOutFile + " && " + tempOutFile;
            break;
          default:
            {
              atom.notifications.addError("Not supported on " + arch);
            }
        }
        return ["-c", cmdArgs];
      }
    }
  }
};
exports["default"] = OtherGrammars;
module.exports = exports["default"];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZpbGU6Ly8vQzovVXNlcnMvY2tuanUvLmF0b20vcGFja2FnZXMvc2NyaXB0L2xpYi9ncmFtbWFycy9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7b0JBV2lCLE1BQU07Ozs7NEJBQ0Usa0JBQWtCOzs7O0FBWjNDLFdBQVcsQ0FBQSxJQWFILGVBQWUsNkJBQWYsZUFBZTtJQUFFLE9BQU8sNkJBQVAsT0FBTzs7QUFFaEMsSUFBTSxFQUFFLEdBQUcsZUFBZSxDQUFDLFFBQVEsRUFBRSxDQUFBO0FBQ3JDLElBQU0sSUFBSSxHQUFHLGVBQWUsQ0FBQyxZQUFZLEVBQUUsQ0FBQTtBQUMzQyxJQUFNLE9BQU8sR0FBRyxlQUFlLENBQUMsU0FBUyxFQUFFLENBQUE7O0FBRTNDLElBQU0sYUFBYSxHQUFHO0FBQ3BCLFlBQVUsRUFBRTtBQUNWLGdCQUFZLEVBQUU7QUFDWixhQUFPLEVBQUUsU0FBUztBQUNsQixVQUFJLEVBQUEsY0FBQyxJQUFZLEVBQUU7WUFBWixRQUFRLEdBQVYsSUFBWSxDQUFWLFFBQVE7O0FBQ2IsZUFBTyxDQUFDLGlCQUFpQixFQUFFLFFBQVEsQ0FBQyxDQUFBO09BQ3JDO0tBQ0Y7R0FDRjs7QUFFRCxTQUFPLEVBQUU7QUFDUCxnQkFBWSxFQUFFO0FBQ1osYUFBTyxFQUFFLGtCQUFrQjtBQUMzQixVQUFJLEVBQUEsY0FBQyxLQUFZLEVBQUU7WUFBWixRQUFRLEdBQVYsS0FBWSxDQUFWLFFBQVE7O0FBQ2IsZUFBTyxDQUFDLFFBQVEsQ0FBQyxDQUFBO09BQ2xCO0tBQ0Y7R0FDRjs7QUFFRCxTQUFPLEVBQUU7QUFDUCxxQkFBaUIsRUFBRTtBQUNqQixhQUFPLEVBQUUsTUFBTTtBQUNmLFVBQUksRUFBQSxjQUFDLE9BQU8sRUFBRTtBQUNaLGVBQU8sQ0FBQyxNQUFNLEVBQUUsSUFBSSxFQUFFLE9BQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFBO09BQ3pDO0tBQ0Y7QUFDRCxnQkFBWSxFQUFFO0FBQ1osYUFB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Q3hEO0FBQUEsU0FDRjtBQUNELGVBQU8sQ0FBQyxJQUFJLEVBQUUsUUFBUSxDQUFDLENBQUE7T0FDeEI7S0FDRjs7QUFFRCxxQkFBaUIsRUFBRTtBQUNqQixhQUFPLEVBQUUsTUFBTTtBQUNmLFVBQUksRUFBQSxjQUFDLE9BQU8sRUFBRTtBQUNaLFlBQU0sSUFBSSxHQUFHLE9BQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQTtBQUM5QixZQUFNLE9BQU8sR0FBRywwQkFBYSxzQkFBc0IsQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUE7QUFDakUsWUFBTSxZQUFZLEdBQUcsMEJBQWEsY0FBYyxDQUFDLE1BQU0sRUFBRSxRQUFRLENBQUMsQ0FBQTtBQUNsRSxZQUFNLFdBQVcsR0FBRywwQkFBYSxjQUFjLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQyxDQUFBO0FBQy9ELFlBQUksT0FBTyxHQUFHLEVBQUUsQ0FBQTtBQUNoQixnQkFBUSxJQUFJO0FBQ1YsZUFBSyxLQUFLO0FBQ1IsbUJBQU8scUJBQW1CLE9BQU8sYUFBUSxZQUFZLDJCQUFzQixZQUFZLFlBQU8sV0FBVyxZQUFPLFdBQVcsQUFBRSxDQUFBO0FBQzdILGtCQUFLO0FBQUEsQUFDUCxlQUFLLEtBQUs7QUFDUixtQkFBTyx1QkFBcUIsT0FBTyxhQUFRLFlBQVksZUFBVSxZQUFZLFlBQU8sV0FBVyxZQUFPLFdBQVcsQUFBRSxDQUFBO0FBQ25ILGtCQUFLO0FBQUEsQUFDUDtBQUFTO0FBQ1Asa0JBQUksQ0FBQyxhQUFhLENBQUMsUUFBUSx1QkFBcUIsSUFBSSxDQUFHLENBQUE7YUFDeEQ7QUFBQSxTQUNGO0FBQ0QsZUFBTyxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQTtPQUN2QjtLQUNGO0dBQ0Y7Q0FDRixDQUFBO3FCQUNjLGFBQWEiLCJmaWxlIjoiZmlsZTovLy9DOi9Vc2Vycy9ja25qdS8uYXRvbS9wYWNrYWdlcy9zY3JpcHQvbGliL2dyYW1tYXJzL2luZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2UgYmFiZWxcIlxuXG4vKlxuICogZGVjYWZmZWluYXRlIHN1Z2dlc3Rpb25zOlxuICogRFMxMDI6IFJlbW92ZSB1bm5lY2Vzc2FyeSBjb2RlIGNyZWF0ZWQgYmVjYXVzZSBvZiBpbXBsaWNpdCByZXR1cm5zXG4gKiBEUzIwNTogQ29uc2lkZXIgcmV3b3JraW5nIGNvZGUgdG8gYXZvaWQgdXNlIG9mIElJRkVzXG4gKiBGdWxsIGRvY3M6IGh0dHBzOi8vZ2l0aHViLmNvbS9kZWNhZmZlaW5hdGUvZGVjYWZmZWluYXRlL2Jsb2IvbWFzdGVyL2RvY3Mvc3VnZ2VzdGlvbnMubWRcbiAqL1xuLy8gTWFwcyBBdG9tIEdyYW1tYXIgbmFtZXMgdG8gdGhlIGNvbW1hbmQgdXNlZCBieSB0aGF0IGxhbmd1YWdlXG4vLyBBcyB3ZWxsIGFzIGFueSBzcGVjaWFsIHNldHVwIGZvciBhcmd1bWVudHMuXG5cbmltcG9ydCBwYXRoIGZyb20gXCJwYXRoXCJcbmltcG9ydCBHcmFtbWFyVXRpbHMgZnJvbSBcIi4uL2dyYW1tYXItdXRpbHNcIlxuY29uc3QgeyBPcGVyYXRpbmdTeXN0ZW0sIGNvbW1hbmQgfSA9IEdyYW1tYXJVdGlsc1xuXG5jb25zdCBvcyA9IE9wZXJhdGluZ1N5c3RlbS5wbGF0Zm9ybSgpXG5jb25zdCBhcmNoID0gT3BlcmF0aW5nU3lzdGVtLmFyY2hpdGVjdHVyZSgpXG5jb25zdCB3aW5kb3dzID0gT3BlcmF0aW5nU3lzdGVtLmlzV2luZG93cygpXG5cbmNvbnN0IE90aGVyR3JhbW1hcnMgPSB7XG4gIFwiMUMgKEJTTClcIjoge1xuICAgIFwiRmlsZSBCYXNlZFwiOiB7XG4gICAgICBjb21tYW5kOiBcIm9zY3JpcHRcIixcbiAgICAgIGFyZ3MoeyBmaWxlcGF0aCB9KSB7XG4gICAgICAgIHJldHVybiBbXCItZW5jb2Rpbmc9dXRmLThcIiwgZmlsZXBhdGhdXG4gICAgICB9LFxuICAgIH0sXG4gIH0sXG5cbiAgQW5zaWJsZToge1xuICAgIFwiRmlsZSBCYXNlZFwiOiB7XG4gICAgICBjb21tYW5kOiBcImFuc2libGUtcGxheWJvb2tcIixcbiAgICAgIGFyZ3MoeyBmaWxlcGF0aCB9KSB7XG4gICAgICAgIHJldHVybiBbZmlsZXBhdGhdXG4gICAgICB9LFxuICAgIH0sXG4gIH0sXG5cbiAgQ2xvanVyZToge1xuICAgIFwiU2VsZWN0aW9uIEJhc2VkXCI6IHtcbiAgICAgIGNvbW1hbmQ6IFwibGVpblwiLFxuICAgICAgYXJncyhjb250ZXh0KSB7XG4gICAgICAgIHJldHVybiBbXCJleGVjXCIsIFwiLWVcIiwgY29udGV4dC5nZXRDb2RlKCldXG4gICAgICB9LFxuICAgIH0sXG4gICAgXCJGaWxlIEJhc2VkXCI6IHtcbiAgICAgIGNvbW1hbmQ6IFwibGVpblwiLFxuICAgICAgYXJncyh7IGZpbGVwYXRoIH0pIHtcbiAgICAgICAgcmV0dXJuIFtcImV4ZWNcIiwgZmlsZXBhdGhdXG4gICAgICB9LFxuICAgIH0sXG4gIH0sXG5cbiAgQ3J5c3RhbDoge1xuICAgIFwiU2VsZWN0aW9uIEJhc2VkXCI6IHtcbiAgICAgIGNvbW1hbmQ6IFwiY3J5c3RhbFwiLFxuICAgICAgYXJncyhjb250ZXh0KSB7XG4gICAgICAgIHJldHVybiBbXCJldmFsXCIsIGNvbnRleHQuZ2V0Q29kZSgpXVxuICAgICAgfSxcbiAgICB9LFxuICAgIFwiRmlsZSBCYXNlZFwiOiB7XG4gICAgICBjb21tYW5kOiBcImNyeXN0YWxcIixcbiAgICAgIGFyZ3MoeyBmaWxlcGF0aCB9KSB7XG4gICAgICAgIHJldHVybiBbZmlsZXBhdGhdXG4gICAgICB9LFxuICAgIH0sXG4gIH0sXG5cbiAgRDoge1xuICAgIFwiU2VsZWN0aW9uIEJhc2VkXCI6IHtcbiAgICAgIGNvbW1hbmQ6IFwicmRtZFwiLFxuICAgICAgYXJncyhjb250ZXh0KSB7XG4gICAgICAgIGNvbnN0IGNvZGUgPSBjb250ZXh0LmdldENvZGUoKVxuICAgICAgICBjb25zdCB0bXBGaWxlID0gR3JhbW1hclV0aWxzLkQuY3JlYXRlVGVtcEZpbGVXaXRoQ29kZShjb2RlKVxuICAgICAgICByZXR1cm4gW3RtcEZpbGVdXG4gICAgICB9LFxuICAgIH0sXG4gICAgXCJGaWxlIEJhc2VkXCI6IHtcbiAgICAgIGNvbW1hbmQ6IFwicmRtZFwiLFxuICAgICAgYXJncyh7IGZpbGVwYXRoIH0pIHtcbiAgICAgICAgcmV0dXJuIFtmaWxlcGF0aF1cbiAgICAgIH0sXG4gICAgfSxcbiAgfSxcblxuICBFbGl4aXI6IHtcbiAgICBcIlNlbGVjdGlvbiBCYXNlZFwiOiB7XG4gICAgICBjb21tYW5kOiBcImVsaXhpclwiLFxuICAgICAgYXJncyhjb250ZXh0KSB7XG4gICAgICAgIHJldHVybiBbXCItZVwiLCBjb250ZXh0LmdldENvZGUoKV1cbiAgICAgIH0sXG4gICAgfSxcbiAgICBcIkZpbGUgQmFzZWRcIjoge1xuICAgICAgY29tbWFuZDogXCJlbGl4aXJcIixcbiAgICAgIGFyZ3MoeyBmaWxlcGF0aCB9KSB7XG4gICAgICAgIHJldHVybiBbXCItclwiLCBmaWxlcGF0aF1cbiAgICAgIH0sXG4gICAgfSxcbiAgfSxcblxuICBFcmxhbmc6IHtcbiAgICBcIlNlbGVjdGlvbiBCYXNlZFwiOiB7XG4gICAgICBjb21tYW5kOiBcImVybFwiLFxuICAgICAgYXJncyhjb250ZXh0KSB7XG4gICAgICAgIHJldHVybiBbXCItbm9zaGVsbFwiLCBcIi1ldmFsXCIsIGAke2NvbnRleHQuZ2V0Q29kZSgpfSwgaW5pdDpzdG9wKCkuYF1cbiAgICAgIH0sXG4gICAgfSxcbiAgfSxcblxuICBcIkYqXCI6IHtcbiAgICBcIkZpbGUgQmFzZWRcIjoge1xuICAgICAgY29tbWFuZDogXCJmc3RhclwiLFxuICAgICAgYXJncyh7IGZpbGVwYXRoIH0pIHtcbiAgICAgICAgcmV0dXJuIFtmaWxlcGF0aF1cbiAgICAgIH0sXG4gICAgfSxcbiAgfSxcblxuICBcIkYjXCI6IHtcbiAgICBcIkZpbGUgQmFzZWRcIjoge1xuICAgICAgY29tbWFuZDogd2luZG93cyA/IFwiZnNpXCIgOiBcImZzaGFycGlcIixcbiAgICAgIGFyZ3MoeyBmaWxlcGF0aCB9KSB7XG4gICAgICAgIHJldHVybiBbXCItLWV4ZWNcIiwgZmlsZXBhdGhdXG4gICAgICB9LFxuICAgIH0sXG4gIH0sXG5cbiAgRm9ydGg6IHtcbiAgICBcIkZpbGUgQmFzZWRcIjoge1xuICAgICAgY29tbWFuZDogXCJnZm9ydGhcIixcbiAgICAgIGFyZ3MoeyBmaWxlcGF0aCB9KSB7XG4gICAgICAgIHJldHVybiBbZmlsZXBhdGhdXG4gICAgICB9LFxuICAgIH0sXG4gIH0sXG5cbiAgR2hlcmtpbjoge1xuICAgIFwiRmlsZSBCYXNlZFwiOiB7XG4gICAgICBjb21tYW5kOiBcImN1Y3VtYmVyXCIsXG4gICAgICBhcmdzKHsgZmlsZXBhdGggfSkge1xuICAgICAgICByZXR1cm4gW1wiLS1jb2xvclwiLCBmaWxlcGF0aF1cbiAgICAgIH0sXG4gICAgfSxcbiAgICBcIkxpbmUgTnVtYmVyIEJhc2VkXCI6IHtcbiAgICAgIGNvbW1hbmQ6IFwiY3VjdW1iZXJcIixcbiAgICAgIGFyZ3MoY29udGV4dCkge1xuICAgICAgICByZXR1cm4gW1wiLS1jb2xvclwiLCBjb250ZXh0LmZpbGVDb2xvbkxpbmUoKV1cbiAgICAgIH0sXG4gICAgfSxcbiAgfSxcblxuICBHbzoge1xuICAgIFwiRmlsZSBCYXNlZFwiOiB7XG4gICAgICBjb21tYW5kOiBcImdvXCIsXG4gICAgICB3b3JraW5nRGlyZWN0b3J5OiBHcmFtbWFyVXRpbHMud29ya2luZ0RpcmVjdG9yeSgpLFxuICAgICAgYXJncyh7IGZpbGVwYXRoIH0pIHtcbiAgICAgICAgaWYgKGZpbGVwYXRoLm1hdGNoKC9fdGVzdC5nby8pKSB7XG4gICAgICAgICAgcmV0dXJuIFtcInRlc3RcIiwgXCJcIl1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gW1wicnVuXCIsIGZpbGVwYXRoXVxuICAgICAgICB9XG4gICAgICB9LFxuICAgIH0sXG4gIH0sXG5cbiAgR3Jvb3Z5OiB7XG4gICAgXCJTZWxlY3Rpb24gQmFzZWRcIjoge1xuICAgICAgY29tbWFuZDogXCJncm9vdnlcIixcbiAgICAgIGFyZ3MoY29udGV4dCkge1xuICAgICAgICByZXR1cm4gW1wiLWVcIiwgY29udGV4dC5nZXRDb2RlKCldXG4gICAgICB9LFxuICAgIH0sXG4gICAgXCJGaWxlIEJhc2VkXCI6IHtcbiAgICAgIGNvbW1hbmQ6IFwiZ3Jvb3Z5XCIsXG4gICAgICBhcmdzKHsgZmlsZXBhdGggfSkge1xuICAgICAgICByZXR1cm4gW2ZpbGVwYXRoXVxuICAgICAgfSxcbiAgICB9LFxuICB9LFxuXG4gIEh5OiB7XG4gICAgXCJTZWxlY3Rpb24gQmFzZWRcIjoge1xuICAgICAgY29tbWFuZDogXCJoeVwiLFxuICAgICAgYXJncyhjb250ZXh0KSB7XG4gICAgICAgIGNvbnN0IGNvZGUgPSBjb250ZXh0LmdldENvZGUoKVxuICAgICAgICBjb25zdCB0bXBGaWxlID0gR3JhbW1hclV0aWxzLmNyZWF0ZVRlbXBGaWxlV2l0aENvZGUoY29kZSwgXCIuaHlcIilcbiAgICAgICAgcmV0dXJuIFt0bXBGaWxlXVxuICAgICAgfSxcbiAgICB9LFxuICAgIFwiRmlsZSBCYXNlZFwiOiB7XG4gICAgICBjb21tYW5kOiBcImh5XCIsXG4gICAgICBhcmdzKHsgZmlsZXBhdGggfSkge1xuICAgICAgICByZXR1cm4gW2ZpbGVwYXRoXVxuICAgICAgfSxcbiAgICB9LFxuICB9LFxuXG4gIElkcmlzOiB7XG4gICAgXCJGaWxlIEJhc2VkXCI6IHtcbiAgICAgIGNvbW1hbmQ6IFwiaWRyaXNcIixcbiAgICAgIGFyZ3MoeyBmaWxlcGF0aCB9KSB7XG4gICAgICAgIHJldHVybiBbZmlsZXBhdGgsIFwiLW9cIiwgcGF0aC5iYXNlbmFtZShmaWxlcGF0aCwgcGF0aC5leHRuYW1lKGZpbGVwYXRoKSldXG4gICAgICB9LFxuICAgIH0sXG4gIH0sXG5cbiAgSW5ub1NldHVwOiB7XG4gICAgXCJGaWxlIEJhc2VkXCI6IHtcbiAgICAgIGNvbW1hbmQ6IFwiSVNDQy5leGVcIixcbiAgICAgIGFyZ3MoeyBmaWxlcGF0aCB9KSB7XG4gICAgICAgIHJldHVybiBbXCIvUVwiLCBmaWxlcGF0aF1cbiAgICAgIH0sXG4gICAgfSxcbiAgfSxcblxuICBpb0xhbmd1YWdlOiB7XG4gICAgXCJTZWxlY3Rpb24gQmFzZWRcIjoge1xuICAgICAgY29tbWFuZDogXCJpb1wiLFxuICAgICAgYXJncyhjb250ZXh0KSB7XG4gICAgICAgIHJldHVybiBbY29udGV4dC5nZXRDb2RlKCldXG4gICAgICB9LFxuICAgIH0sXG4gICAgXCJGaWxlIEJhc2VkXCI6IHtcbiAgICAgIGNvbW1hbmQ6IFwiaW9cIixcbiAgICAgIGFyZ3MoeyBmaWxlcGF0aCB9KSB7XG4gICAgICAgIHJldHVybiBbXCItZVwiLCBmaWxlcGF0aF1cbiAgICAgIH0sXG4gICAgfSxcbiAgfSxcblxuICBKb2xpZToge1xuICAgIFwiRmlsZSBCYXNlZFwiOiB7XG4gICAgICBjb21tYW5kOiBcImpvbGllXCIsXG4gICAgICBhcmdzKHsgZmlsZXBhdGggfSkge1xuICAgICAgICByZXR1cm4gW2ZpbGVwYXRoXVxuICAgICAgfSxcbiAgICB9LFxuICB9LFxuXG4gIEp1bGlhOiB7XG4gICAgXCJTZWxlY3Rpb24gQmFzZWRcIjoge1xuICAgICAgY29tbWFuZDogXCJqdWxpYVwiLFxuICAgICAgYXJncyhjb250ZXh0KSB7XG4gICAgICAgIHJldHVybiBbXCItZVwiLCBjb250ZXh0LmdldENvZGUoKV1cbiAgICAgIH0sXG4gICAgfSxcbiAgICBcIkZpbGUgQmFzZWRcIjoge1xuICAgICAgY29tbWFuZDogXCJqdWxpYVwiLFxuICAgICAgYXJncyh7IGZpbGVwYXRoIH0pIHtcbiAgICAgICAgcmV0dXJuIFtmaWxlcGF0aF1cbiAgICAgIH0sXG4gICAgfSxcbiAgfSxcblxuICBMQU1NUFM6IFtcImRhcndpblwiLCBcImxpbnV4XCJdLmluY2x1ZGVzKG9zKVxuICAgID8ge1xuICAgICAgICBcIkZpbGUgQmFzZWRcIjoge1xuICAgICAgICAgIGNvbW1hbmQ6IFwibGFtbXBzXCIsXG4gICAgICAgICAgYXJncyh7IGZpbGVwYXRoIH0pIHtcbiAgICAgICAgICAgIHJldHVybiBbXCItbG9nXCIsIFwibm9uZVwiLCBcIi1pblwiLCBmaWxlcGF0aF1cbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgfVxuICAgIDogdW5kZWZpbmVkLFxuXG4gIExpbHlQb25kOiB7XG4gICAgXCJGaWxlIEJhc2VkXCI6IHtcbiAgICAgIGNvbW1hbmQ6IFwibGlseXBvbmRcIixcbiAgICAgIGFyZ3MoeyBmaWxlcGF0aCB9KSB7XG4gICAgICAgIHJldHVybiBbZmlsZXBhdGhdXG4gICAgICB9LFxuICAgIH0sXG4gIH0sXG5cbiAgTGl2ZVNjcmlwdDoge1xuICAgIFwiU2VsZWN0aW9uIEJhc2VkXCI6IHtcbiAgICAgIGNvbW1hbmQ6IFwibHNjXCIsXG4gICAgICBhcmdzKGNvbnRleHQpIHtcbiAgICAgICAgcmV0dXJuIFtcIi1lXCIsIGNvbnRleHQuZ2V0Q29kZSgpXVxuICAgICAgfSxcbiAgICB9LFxuICAgIFwiRmlsZSBCYXNlZFwiOiB7XG4gICAgICBjb21tYW5kOiBcImxzY1wiLFxuICAgICAgYXJncyh7IGZpbGVwYXRoIH0pIHtcbiAgICAgICAgcmV0dXJuIFtmaWxlcGF0aF1cbiAgICAgIH0sXG4gICAgfSxcbiAgfSxcblxuICBNYWtlZmlsZToge1xuICAgIFwiU2VsZWN0aW9uIEJhc2VkXCI6IHtcbiAgICAgIGNvbW1hbmQ6IFwiYmFzaFwiLFxuICAgICAgYXJncyhjb250ZXh0KSB7XG4gICAgICAgIHJldHVybiBbXCItY1wiLCBjb250ZXh0LmdldENvZGUoKV1cbiAgICAgIH0sXG4gICAgfSxcblxuICAgIFwiRmlsZSBCYXNlZFwiOiB7XG4gICAgICBjb21tYW5kOiBcIm1ha2VcIixcbiAgICAgIGFyZ3MoeyBmaWxlcGF0aCB9KSB7XG4gICAgICAgIHJldHVybiBbXCItZlwiLCBmaWxlcGF0aF1cbiAgICAgIH0sXG4gICAgfSxcbiAgfSxcblxuICBNQVRMQUI6IHtcbiAgICBcIlNlbGVjdGlvbiBCYXNlZFwiOiB7XG4gICAgICBjb21tYW5kOiBcIm1hdGxhYlwiLFxuICAgICAgYXJncyhjb250ZXh0KSB7XG4gICAgICAgIGNvbnN0IGNvZGUgPSBjb250ZXh0LmdldENvZGUoKVxuICAgICAgICBjb25zdCB0bXBGaWxlID0gR3JhbW1hclV0aWxzLk1BVExBQi5jcmVhdGVUZW1wRmlsZVdpdGhDb2RlKGNvZGUpXG4gICAgICAgIHJldHVybiBbXG4gICAgICAgICAgXCItbm9kZXNrdG9wXCIsXG4gICAgICAgICAgXCItbm9zcGxhc2hcIixcbiAgICAgICAgICBcIi1yXCIsXG4gICAgICAgICAgYHRyeSwgcnVuKCcke3RtcEZpbGV9Jyk7IHdoaWxlIH5pc2VtcHR5KGdldCgwLCdDaGlsZHJlbicpKTsgcGF1c2UoMC41KTsgZW5kOyBjYXRjaCBNRTsgZGlzcChNRS5tZXNzYWdlKTsgZXhpdCgxKTsgZW5kOyBleGl0KDApO2AsXG4gICAgICAgIF1cbiAgICAgIH0sXG4gICAgfSxcbiAgICBcIkZpbGUgQmFzZWRcIjoge1xuICAgICAgY29tbWFuZDogXCJtYXRsYWJcIixcbiAgICAgIGFyZ3MoeyBmaWxlcGF0aCB9KSB7XG4gICAgICAgIHJldHVybiBbXG4gICAgICAgICAgXCItbm9kZXNrdG9wXCIsXG4gICAgICAgICAgXCItbm9zcGxhc2hcIixcbiAgICAgICAgICBcIi1yXCIsXG4gICAgICAgICAgYHRyeSBydW4oJyR7ZmlsZXBhdGh9Jyk7IHdoaWxlIH5pc2VtcHR5KGdldCgwLCdDaGlsZHJlbicpKTsgcGF1c2UoMC41KTsgZW5kOyBjYXRjaCBNRTsgZGlzcChNRS5tZXNzYWdlKTsgZXhpdCgxKTsgZW5kOyBleGl0KDApO2AsXG4gICAgICAgIF1cbiAgICAgIH0sXG4gICAgfSxcbiAgfSxcblxuICBcIk1JUFMgQXNzZW1ibGVyXCI6IHtcbiAgICBcIkZpbGUgQmFzZWRcIjoge1xuICAgICAgY29tbWFuZDogXCJzcGltXCIsXG4gICAgICBhcmdzKHsgZmlsZXBhdGggfSkge1xuICAgICAgICByZXR1cm4gW1wiLWZcIiwgZmlsZXBhdGhdXG4gICAgICB9LFxuICAgIH0sXG4gIH0sXG5cbiAgTkNMOiB7XG4gICAgXCJTZWxlY3Rpb24gQmFzZWRcIjoge1xuICAgICAgY29tbWFuZDogXCJuY2xcIixcbiAgICAgIGFyZ3MoY29udGV4dCkge1xuICAgICAgICBjb25zdCBjb2RlID0gYCR7Y29udGV4dC5nZXRDb2RlKCl9XFxuXFxuZXhpdGBcbiAgICAgICAgY29uc3QgdG1wRmlsZSA9IEdyYW1tYXJVdGlscy5jcmVhdGVUZW1wRmlsZVdpdGhDb2RlKGNvZGUpXG4gICAgICAgIHJldHVybiBbdG1wRmlsZV1cbiAgICAgIH0sXG4gICAgfSxcbiAgICBcIkZpbGUgQmFzZWRcIjoge1xuICAgICAgY29tbWFuZDogXCJuY2xcIixcbiAgICAgIGFyZ3MoeyBmaWxlcGF0aCB9KSB7XG4gICAgICAgIHJldHVybiBbZmlsZXBhdGhdXG4gICAgICB9LFxuICAgIH0sXG4gIH0sXG5cbiAgTmltOiB7XG4gICAgXCJGaWxlIEJhc2VkXCI6IHtcbiAgICAgIGNvbW1hbmQsXG4gICAgICBhcmdzKHsgZmlsZXBhdGggfSkge1xuICAgICAgICBjb25zdCBmaWxlID0gR3JhbW1hclV0aWxzLk5pbS5maW5kTmltUHJvamVjdEZpbGUoZmlsZXBhdGgpXG4gICAgICAgIGNvbnN0IGRpciA9IEdyYW1tYXJVdGlscy5OaW0ucHJvamVjdERpcihmaWxlcGF0aClcbiAgICAgICAgY29uc3QgY29tbWFuZHMgPSBgY2QgJyR7ZGlyfScgJiYgbmltIGMgLS1oaW50czpvZmYgLS1wYXJhbGxlbEJ1aWxkOjEgLXIgJyR7ZmlsZX0nIDI+JjFgXG4gICAgICAgIHJldHVybiBHcmFtbWFyVXRpbHMuZm9ybWF0QXJncyhjb21tYW5kcylcbiAgICAgIH0sXG4gICAgfSxcbiAgfSxcbiAgTlNJUzoge1xuICAgIFwiU2VsZWN0aW9uIEJhc2VkXCI6IHtcbiAgICAgIGNvbW1hbmQ6IFwibWFrZW5zaXNcIixcbiAgICAgIGFyZ3MoY29udGV4dCkge1xuICAgICAgICBjb25zdCBjb2RlID0gY29udGV4dC5nZXRDb2RlKClcbiAgICAgICAgY29uc3QgdG1wRmlsZSA9IEdyYW1tYXJVdGlscy5jcmVhdGVUZW1wRmlsZVdpdGhDb2RlKGNvZGUpXG4gICAgICAgIHJldHVybiBbdG1wRmlsZV1cbiAgICAgIH0sXG4gICAgfSxcbiAgICBcIkZpbGUgQmFzZWRcIjoge1xuICAgICAgY29tbWFuZDogXCJtYWtlbnNpc1wiLFxuICAgICAgYXJncyh7IGZpbGVwYXRoIH0pIHtcbiAgICAgICAgcmV0dXJuIFtmaWxlcGF0aF1cbiAgICAgIH0sXG4gICAgfSxcbiAgfSxcblxuICBPY3RhdmU6IHtcbiAgICBcIlNlbGVjdGlvbiBCYXNlZFwiOiB7XG4gICAgICBjb21tYW5kOiBcIm9jdGF2ZVwiLFxuICAgICAgYXJncyhjb250ZXh0KSB7XG4gICAgICAgIGNvbnN0IGRpciA9IHBhdGguZGlybmFtZShjb250ZXh0LmZpbGVwYXRoKVxuICAgICAgICByZXR1cm4gW1wiLXBcIiwgcGF0aC5kaXJuYW1lKGNvbnRleHQuZmlsZXBhdGgpLCBcIi0tZXZhbFwiLCBjb250ZXh0LmdldENvZGUoKV1cbiAgICAgIH0sXG4gICAgfSxcbiAgICBcIkZpbGUgQmFzZWRcIjoge1xuICAgICAgY29tbWFuZDogXCJvY3RhdmVcIixcbiAgICAgIGFyZ3MoeyBmaWxlcGF0aCB9KSB7XG4gICAgICAgIHJldHVybiBbXCItcFwiLCBwYXRoLmRpcm5hbWUoZmlsZXBhdGgpLCBmaWxlcGF0aF1cbiAgICAgIH0sXG4gICAgfSxcbiAgfSxcblxuICBPejoge1xuICAgIFwiU2VsZWN0aW9uIEJhc2VkXCI6IHtcbiAgICAgIGNvbW1hbmQ6IFwib3pjXCIsXG4gICAgICBhcmdzKGNvbnRleHQpIHtcbiAgICAgICAgY29uc3QgY29kZSA9IGNvbnRleHQuZ2V0Q29kZSgpXG4gICAgICAgIGNvbnN0IHRtcEZpbGUgPSBHcmFtbWFyVXRpbHMuY3JlYXRlVGVtcEZpbGVXaXRoQ29kZShjb2RlKVxuICAgICAgICByZXR1cm4gW1wiLWNcIiwgdG1wRmlsZV1cbiAgICAgIH0sXG4gICAgfSxcbiAgICBcIkZpbGUgQmFzZWRcIjoge1xuICAgICAgY29tbWFuZDogXCJvemNcIixcbiAgICAgIGFyZ3MoeyBmaWxlcGF0aCB9KSB7XG4gICAgICAgIHJldHVybiBbXCItY1wiLCBmaWxlcGF0aF1cbiAgICAgIH0sXG4gICAgfSxcbiAgfSxcblxuICBQYXNjYWw6IHtcbiAgICBcIlNlbGVjdGlvbiBCYXNlZFwiOiB7XG4gICAgICBjb21tYW5kOiBcImZwY1wiLFxuICAgICAgYXJncyhjb250ZXh0KSB7XG4gICAgICAgIGNvbnN0IGNvZGUgPSBjb250ZXh0LmdldENvZGUoKVxuICAgICAgICBjb25zdCB0bXBGaWxlID0gR3JhbW1hclV0aWxzLmNyZWF0ZVRlbXBGaWxlV2l0aENvZGUoY29kZSlcbiAgICAgICAgcmV0dXJuIFt0bXBGaWxlXVxuICAgICAgfSxcbiAgICB9LFxuICAgIFwiRmlsZSBCYXNlZFwiOiB7XG4gICAgICBjb21tYW5kOiBcImZwY1wiLFxuICAgICAgYXJncyh7IGZpbGVwYXRoIH0pIHtcbiAgICAgICAgcmV0dXJuIFtmaWxlcGF0aF1cbiAgICAgIH0sXG4gICAgfSxcbiAgfSxcblxuICBQb3ZyYXk6IHtcbiAgICBcIkZpbGUgQmFzZWRcIjoge1xuICAgICAgY29tbWFuZCxcbiAgICAgIGFyZ3MoeyBmaWxlcGF0aCB9KSB7XG4gICAgICAgIGNvbnN0IGNvbW1hbmRzID0gd2luZG93cyA/IFwicHZlbmdpbmUgL0VYSVQgL1JFTkRFUiBcIiA6IFwicG92cmF5IFwiXG4gICAgICAgIHJldHVybiBHcmFtbWFyVXRpbHMuZm9ybWF0QXJncyhjb21tYW5kcyArIGZpbGVwYXRoKVxuICAgICAgfSxcbiAgICB9LFxuICB9LFxuXG4gIFByb2xvZzoge1xuICAgIFwiRmlsZSBCYXNlZFwiOiB7XG4gICAgICBjb21tYW5kLFxuICAgICAgYXJncyh7IGZpbGVwYXRoIH0pIHtcbiAgICAgICAgY29uc3QgZGlyID0gcGF0aC5kaXJuYW1lKGZpbGVwYXRoKVxuICAgICAgICBjb25zdCBjb21tYW5kcyA9IGBjZCAnJHtkaXJ9Jzsgc3dpcGwgLWYgJyR7ZmlsZXBhdGh9JyAtdCBtYWluIC0tcXVpZXRgXG4gICAgICAgIHJldHVybiBHcmFtbWFyVXRpbHMuZm9ybWF0QXJncyhjb21tYW5kcylcbiAgICAgIH0sXG4gICAgfSxcbiAgfSxcbiAgUHVyZVNjcmlwdDoge1xuICAgIFwiRmlsZSBCYXNlZFwiOiB7XG4gICAgICBjb21tYW5kLFxuICAgICAgYXJncyh7IGZpbGVwYXRoIH0pIHtcbiAgICAgICAgY29uc3QgZGlyID0gcGF0aC5kaXJuYW1lKGZpbGVwYXRoKVxuICAgICAgICByZXR1cm4gR3JhbW1hclV0aWxzLmZvcm1hdEFyZ3MoYGNkICcke2Rpcn0nICYmIHB1bHAgcnVuYClcbiAgICAgIH0sXG4gICAgfSxcbiAgfSxcbiAgUjoge1xuICAgIFwiU2VsZWN0aW9uIEJhc2VkXCI6IHtcbiAgICAgIGNvbW1hbmQ6IFwiUnNjcmlwdFwiLFxuICAgICAgYXJncyhjb250ZXh0KSB7XG4gICAgICAgIGNvbnN0IGNvZGUgPSBjb250ZXh0LmdldENvZGUoKVxuICAgICAgICBjb25zdCB0bXBGaWxlID0gR3JhbW1hclV0aWxzLlIuY3JlYXRlVGVtcEZpbGVXaXRoQ29kZShjb2RlKVxuICAgICAgICByZXR1cm4gW3RtcEZpbGVdXG4gICAgICB9LFxuICAgIH0sXG4gICAgXCJGaWxlIEJhc2VkXCI6IHtcbiAgICAgIGNvbW1hbmQ6IFwiUnNjcmlwdFwiLFxuICAgICAgYXJncyh7IGZpbGVwYXRoIH0pIHtcbiAgICAgICAgcmV0dXJuIFtmaWxlcGF0aF1cbiAgICAgIH0sXG4gICAgfSxcbiAgfSxcblxuICBSYWNrZXQ6IHtcbiAgICBcIlNlbGVjdGlvbiBCYXNlZFwiOiB7XG4gICAgICBjb21tYW5kOiBcInJhY2tldFwiLFxuICAgICAgYXJncyhjb250ZXh0KSB7XG4gICAgICAgIHJldHVybiBbXCItZVwiLCBjb250ZXh0LmdldENvZGUoKV1cbiAgICAgIH0sXG4gICAgfSxcbiAgICBcIkZpbGUgQmFzZWRcIjoge1xuICAgICAgY29tbWFuZDogXCJyYWNrZXRcIixcbiAgICAgIGFyZ3MoeyBmaWxlcGF0aCB9KSB7XG4gICAgICAgIHJldHVybiBbZmlsZXBhdGhdXG4gICAgICB9LFxuICAgIH0sXG4gIH0sXG5cbiAgXCJSZW4nUHlcIjoge1xuICAgIFwiRmlsZSBCYXNlZFwiOiB7XG4gICAgICBjb21tYW5kOiBcInJlbnB5XCIsXG4gICAgICBhcmdzKHsgZmlsZXBhdGggfSkge1xuICAgICAgICByZXR1cm4gW2ZpbGVwYXRoLnN1YnN0cigwLCBmaWxlcGF0aC5sYXN0SW5kZXhPZihcIi9nYW1lXCIpKV1cbiAgICAgIH0sXG4gICAgfSxcbiAgfSxcblxuICBcIlJvYm90IEZyYW1ld29ya1wiOiB7XG4gICAgXCJGaWxlIEJhc2VkXCI6IHtcbiAgICAgIGNvbW1hbmQ6IFwicm9ib3RcIixcbiAgICAgIGFyZ3MoeyBmaWxlcGF0aCB9KSB7XG4gICAgICAgIHJldHVybiBbZmlsZXBhdGhdXG4gICAgICB9LFxuICAgIH0sXG4gIH0sXG5cbiAgUnVzdDoge1xuICAgIFwiRmlsZSBCYXNlZFwiOiB7XG4gICAgICBjb21tYW5kLFxuICAgICAgYXJncyh7IGZpbGVwYXRoLCBmaWxlbmFtZSB9KSB7XG4gICAgICAgIGlmICh3aW5kb3dzKSB7XG4gICAgICAgICAgcmV0dXJuIFtgL2MgcnVzdGMgJHtmaWxlcGF0aH0gJiYgJHtmaWxlbmFtZS5zbGljZSgwLCBOdW1iZXIoLTQpICsgMSB8fCB1bmRlZmluZWQpfS5leGVgXVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbnN0IHRlbXBPdXRGaWxlID0gR3JhbW1hclV0aWxzLmNyZWF0ZVRlbXBQYXRoKFwicnMtXCIsIFwiLm91dFwiKVxuICAgICAgICAgIHJldHVybiBbXCItY1wiLCBgcnVzdGMgJyR7ZmlsZXBhdGh9JyAtbyAke3RlbXBPdXRGaWxlfSAmJiAke3RlbXBPdXRGaWxlfWBdXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgfSxcbiAgfSxcbiAgU2NhbGE6IHtcbiAgICBcIlNlbGVjdGlvbiBCYXNlZFwiOiB7XG4gICAgICBjb21tYW5kOiBcInNjYWxhXCIsXG4gICAgICBhcmdzKGNvbnRleHQpIHtcbiAgICAgICAgcmV0dXJuIFtcIi1lXCIsIGNvbnRleHQuZ2V0Q29kZSgpXVxuICAgICAgfSxcbiAgICB9LFxuICAgIFwiRmlsZSBCYXNlZFwiOiB7XG4gICAgICBjb21tYW5kOiBcInNjYWxhXCIsXG4gICAgICBhcmdzKHsgZmlsZXBhdGggfSkge1xuICAgICAgICByZXR1cm4gW2ZpbGVwYXRoXVxuICAgICAgfSxcbiAgICB9LFxuICB9LFxuXG4gIFN0YXRhOiB7XG4gICAgXCJTZWxlY3Rpb24gQmFzZWRcIjoge1xuICAgICAgY29tbWFuZDogXCJzdGF0YVwiLFxuICAgICAgYXJncyhjb250ZXh0KSB7XG4gICAgICAgIHJldHVybiBbXCJkb1wiLCBjb250ZXh0LmdldENvZGUoKV1cbiAgICAgIH0sXG4gICAgfSxcbiAgICBcIkZpbGUgQmFzZWRcIjoge1xuICAgICAgY29tbWFuZDogXCJzdGF0YVwiLFxuICAgICAgYXJncyh7IGZpbGVwYXRoIH0pIHtcbiAgICAgICAgcmV0dXJuIFtcImRvXCIsIGZpbGVwYXRoXVxuICAgICAgfSxcbiAgICB9LFxuICB9LFxuXG4gIFR1cmluZzoge1xuICAgIFwiRmlsZSBCYXNlZFwiOiB7XG4gICAgICBjb21tYW5kOiBcInR1cmluZ1wiLFxuICAgICAgYXJncyh7IGZpbGVwYXRoIH0pIHtcbiAgICAgICAgcmV0dXJuIFtcIi1ydW5cIiwgZmlsZXBhdGhdXG4gICAgICB9LFxuICAgIH0sXG4gIH0sXG5cbiAgXCJ4ODYgYW5kIHg4Nl82NCBBc3NlbWJseVwiOiB7XG4gICAgXCJGaWxlIEJhc2VkXCI6IHtcbiAgICAgIGNvbW1hbmQ6IFwiYmFzaFwiLFxuICAgICAgYXJncyh7IGZpbGVwYXRoIH0pIHtcbiAgICAgICAgY29uc3QgdGVtcE91dE9GaWxlID0gR3JhbW1hclV0aWxzLmNyZWF0ZVRlbXBQYXRoKFwiYXNtLVwiLCBcIi5vdXQub1wiKVxuICAgICAgICBjb25zdCB0ZW1wT3V0RmlsZSA9IEdyYW1tYXJVdGlscy5jcmVhdGVUZW1wUGF0aChcImFzbS1cIiwgXCIub3V0XCIpXG4gICAgICAgIGxldCBjbWFkQXJncyA9IFwiXCJcbiAgICAgICAgc3dpdGNoIChhcmNoKSB7XG4gICAgICAgICAgY2FzZSBcIngzMlwiOlxuICAgICAgICAgICAgY21hZEFyZ3MgPSBgbmFzbSAtZiBlbGYgJyR7ZmlsZXBhdGh9JyAtbyAke3RlbXBPdXRPRmlsZX0gJiYgbGQgLW0gZWxmX2kzODYgJHt0ZW1wT3V0T0ZpbGV9IC1vICR7dGVtcE91dEZpbGV9ICYmICR7dGVtcE91dEZpbGV9YFxuICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICBjYXNlIFwieDY0XCI6XG4gICAgICAgICAgICBjbWFkQXJncyA9IGBuYXNtIC1mIGVsZjY0ICcke2ZpbGVwYXRofScgLW8gJHt0ZW1wT3V0T0ZpbGV9ICYmIGxkICR7dGVtcE91dE9GaWxlfSAtbyAke3RlbXBPdXRGaWxlfSAmJiAke3RlbXBPdXRGaWxlfWBcbiAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgZGVmYXVsdDoge1xuICAgICAgICAgICAgYXRvbS5ub3RpZmljYXRpb25zLmFkZEVycm9yKGBOb3Qgc3VwcG9ydGVkIG9uICR7YXJjaH1gKVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gW1wiLWNcIiwgY21hZEFyZ3NdXG4gICAgICB9LFxuICAgIH0sXG5cbiAgICBcIlNlbGVjdGlvbiBCYXNlZFwiOiB7XG4gICAgICBjb21tYW5kOiBcImJhc2hcIixcbiAgICAgIGFyZ3MoY29udGV4dCkge1xuICAgICAgICBjb25zdCBjb2RlID0gY29udGV4dC5nZXRDb2RlKClcbiAgICAgICAgY29uc3QgdG1wRmlsZSA9IEdyYW1tYXJVdGlscy5jcmVhdGVUZW1wRmlsZVdpdGhDb2RlKGNvZGUsIFwiLmFzbVwiKVxuICAgICAgICBjb25zdCB0ZW1wT3V0T0ZpbGUgPSBHcmFtbWFyVXRpbHMuY3JlYXRlVGVtcFBhdGgoXCJhc20tXCIsIFwiLm91dC5vXCIpXG4gICAgICAgIGNvbnN0IHRlbXBPdXRGaWxlID0gR3JhbW1hclV0aWxzLmNyZWF0ZVRlbXBQYXRoKFwiYXNtLVwiLCBcIi5vdXRcIilcbiAgICAgICAgbGV0IGNtZEFyZ3MgPSBcIlwiXG4gICAgICAgIHN3aXRjaCAoYXJjaCkge1xuICAgICAgICAgIGNhc2UgXCJ4MzJcIjpcbiAgICAgICAgICAgIGNtZEFyZ3MgPSBgbmFzbSAtZiBlbGYgJyR7dG1wRmlsZX0nIC1vICR7dGVtcE91dE9GaWxlfSAmJiBsZCAtbSBlbGZfaTM4NiAke3RlbXBPdXRPRmlsZX0gLW8gJHt0ZW1wT3V0RmlsZX0gJiYgJHt0ZW1wT3V0RmlsZX1gXG4gICAgICAgICAgICBicmVha1xuICAgICAgICAgIGNhc2UgXCJ4NjRcIjpcbiAgICAgICAgICAgIGNtZEFyZ3MgPSBgbmFzbSAtZiBlbGY2NCAnJHt0bXBGaWxlfScgLW8gJHt0ZW1wT3V0T0ZpbGV9ICYmIGxkICR7dGVtcE91dE9GaWxlfSAtbyAke3RlbXBPdXRGaWxlfSAmJiAke3RlbXBPdXRGaWxlfWBcbiAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgZGVmYXVsdDoge1xuICAgICAgICAgICAgYXRvbS5ub3RpZmljYXRpb25zLmFkZEVycm9yKGBOb3Qgc3VwcG9ydGVkIG9uICR7YXJjaH1gKVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gW1wiLWNcIiwgY21kQXJnc11cbiAgICAgIH0sXG4gICAgfSxcbiAgfSxcbn1cbmV4cG9ydCBkZWZhdWx0IE90aGVyR3JhbW1hcnNcbiJdfQ==