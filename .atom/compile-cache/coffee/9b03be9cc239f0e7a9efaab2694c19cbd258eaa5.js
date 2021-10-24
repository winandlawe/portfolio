(function() {
  module.exports = {
    statusBar: null,
    activate: function() {},
    deactivate: function() {
      var ref;
      if ((ref = this.statusBarTile) != null) {
        ref.destroy();
      }
      return this.statusBarTile = null;
    },
    providePlatformIOIDETerminal: function() {
      return {
        updateProcessEnv: function(variables) {
          var name, results, value;
          results = [];
          for (name in variables) {
            value = variables[name];
            results.push(process.env[name] = value);
          }
          return results;
        },
        run: (function(_this) {
          return function(commands) {
            return _this.statusBarTile.runCommandInNewTerminal(commands);
          };
        })(this),
        getTerminalViews: (function(_this) {
          return function() {
            return _this.statusBarTile.terminalViews;
          };
        })(this),
        open: (function(_this) {
          return function() {
            return _this.statusBarTile.runNewTerminal();
          };
        })(this)
      };
    },
    provideRunInTerminal: function() {
      return {
        run: (function(_this) {
          return function(commands) {
            return _this.statusBarTile.runCommandInNewTerminal(commands);
          };
        })(this),
        getTerminalViews: (function(_this) {
          return function() {
            return _this.statusBarTile.terminalViews;
          };
        })(this)
      };
    },
    consumeStatusBar: function(statusBarProvider) {
      return this.statusBarTile = new (require('./status-bar'))(statusBarProvider);
    },
    config: {
      toggles: {
        type: 'object',
        order: 1,
        properties: {
          autoClose: {
            title: 'Close Terminal on Exit',
            description: 'Should the terminal close if the shell exits?',
            type: 'boolean',
            "default": false
          },
          cursorBlink: {
            title: 'Cursor Blink',
            description: 'Should the cursor blink when the terminal is active?',
            type: 'boolean',
            "default": true
          },
          runInsertedText: {
            title: 'Run Inserted Text',
            description: 'Run text inserted via `platformio-ide-terminal:insert-text` as a command? **This will append an end-of-line character to input.**',
            type: 'boolean',
            "default": true
          },
          selectToCopy: {
            title: 'Select To Copy',
            description: 'Copies text to clipboard when selection happens.',
            type: 'boolean',
            "default": true
          },
          loginShell: {
            title: 'Login Shell',
            description: 'Use --login on zsh and bash.',
            type: 'boolean',
            "default": true
          },
          showToolbar: {
            title: 'Show Toolbar',
            description: 'Show toolbar above terminal window.',
            type: 'boolean',
            "default": true
          }
        }
      },
      core: {
        type: 'object',
        order: 2,
        properties: {
          autoRunCommand: {
            title: 'Auto Run Command',
            description: 'Command to run on terminal initialization.',
            type: 'string',
            "default": ''
          },
          mapTerminalsTo: {
            title: 'Map Terminals To',
            description: 'Map terminals to each file or folder. Default is no action or mapping at all. **Restart required.**',
            type: 'string',
            "default": 'None',
            "enum": ['None', 'File', 'Folder']
          },
          mapTerminalsToAutoOpen: {
            title: 'Auto Open a New Terminal (For Terminal Mapping)',
            description: 'Should a new terminal be opened for new items? **Note:** This works in conjunction with `Map Terminals To` above.',
            type: 'boolean',
            "default": false
          },
          scrollback: {
            title: 'Scroll Back',
            description: 'How many lines of history should be kept?',
            type: 'integer',
            "default": 1000
          },
          shell: {
            title: 'Shell Override',
            description: 'Override the default shell instance to launch.',
            type: 'string',
            "default": (function() {
              var path;
              if (process.platform === 'win32') {
                path = require('path');
                return path.resolve(process.env.SystemRoot, 'System32', 'WindowsPowerShell', 'v1.0', 'powershell.exe');
              } else {
                return process.env.SHELL || '/bin/bash';
              }
            })()
          },
          shellArguments: {
            title: 'Shell Arguments',
            description: 'Specify some arguments to use when launching the shell.',
            type: 'string',
            "default": ''
          },
          shellEnv: {
            title: 'Shell Environment Variables',
            description: 'Specify some additional environment variables, space separated with the form `VAR=VALUE`',
            type: 'string',
            "default": ''
          },
          workingDirectory: {
            title: 'Working Directory',
            description: 'Which directory should be the present working directory when a new terminal is made?',
            type: 'string',
            "default": 'Project',
            "enum": ['Home', 'Project', 'Active File']
          }
        }
      },
      style: {
        type: 'object',
        order: 3,
        properties: {
          animationSpeed: {
            title: 'Animation Speed',
            description: 'How fast should the window animate?',
            type: 'number',
            "default": '1',
            minimum: '0',
            maximum: '100'
          },
          fontFamily: {
            title: 'Font Family',
            description: 'Override the terminal\'s default font family. **You must use a [monospaced font](https://en.wikipedia.org/wiki/List_of_typefaces#Monospace)!**',
            type: 'string',
            "default": ''
          },
          fontSize: {
            title: 'Font Size',
            description: 'Override the terminal\'s default font size.',
            type: 'string',
            "default": ''
          },
          defaultPanelHeight: {
            title: 'Default Panel Height',
            description: 'Default height of a terminal panel. **You may enter a value in px, em, or %.**',
            type: 'string',
            "default": '300px'
          },
          theme: {
            title: 'Theme',
            description: 'Select a theme for the terminal.',
            type: 'string',
            "default": 'standard',
            "enum": ['standard', 'inverse', 'linux', 'grass', 'homebrew', 'man-page', 'novel', 'ocean', 'pro', 'red', 'red-sands', 'silver-aerogel', 'solarized-dark', 'solid-colors', 'dracula', 'one-dark', 'christmas', 'predawn', 'city-lights', 'solarized-light']
          }
        }
      },
      ansiColors: {
        type: 'object',
        order: 4,
        properties: {
          normal: {
            type: 'object',
            order: 1,
            properties: {
              black: {
                title: 'Black',
                description: 'Black color used for terminal ANSI color set.',
                type: 'color',
                "default": '#000000'
              },
              red: {
                title: 'Red',
                description: 'Red color used for terminal ANSI color set.',
                type: 'color',
                "default": '#CD0000'
              },
              green: {
                title: 'Green',
                description: 'Green color used for terminal ANSI color set.',
                type: 'color',
                "default": '#00CD00'
              },
              yellow: {
                title: 'Yellow',
                description: 'Yellow color used for terminal ANSI color set.',
                type: 'color',
                "default": '#CDCD00'
              },
              blue: {
                title: 'Blue',
                description: 'Blue color used for terminal ANSI color set.',
                type: 'color',
                "default": '#0000CD'
              },
              magenta: {
                title: 'Magenta',
                description: 'Magenta color used for terminal ANSI color set.',
                type: 'color',
                "default": '#CD00CD'
              },
              cyan: {
                title: 'Cyan',
                description: 'Cyan color used for terminal ANSI color set.',
                type: 'color',
                "default": '#00CDCD'
              },
              white: {
                title: 'White',
                description: 'White color used for terminal ANSI color set.',
                type: 'color',
                "default": '#E5E5E5'
              }
            }
          },
          zBright: {
            type: 'object',
            order: 2,
            properties: {
              brightBlack: {
                title: 'Bright Black',
                description: 'Bright black color used for terminal ANSI color set.',
                type: 'color',
                "default": '#7F7F7F'
              },
              brightRed: {
                title: 'Bright Red',
                description: 'Bright red color used for terminal ANSI color set.',
                type: 'color',
                "default": '#FF0000'
              },
              brightGreen: {
                title: 'Bright Green',
                description: 'Bright green color used for terminal ANSI color set.',
                type: 'color',
                "default": '#00FF00'
              },
              brightYellow: {
                title: 'Bright Yellow',
                description: 'Bright yellow color used for terminal ANSI color set.',
                type: 'color',
                "default": '#FFFF00'
              },
              brightBlue: {
                title: 'Bright Blue',
                description: 'Bright blue color used for terminal ANSI color set.',
                type: 'color',
                "default": '#0000FF'
              },
              brightMagenta: {
                title: 'Bright Magenta',
                description: 'Bright magenta color used for terminal ANSI color set.',
                type: 'color',
                "default": '#FF00FF'
              },
              brightCyan: {
                title: 'Bright Cyan',
                description: 'Bright cyan color used for terminal ANSI color set.',
                type: 'color',
                "default": '#00FFFF'
              },
              brightWhite: {
                title: 'Bright White',
                description: 'Bright white color used for terminal ANSI color set.',
                type: 'color',
                "default": '#FFFFFF'
              }
            }
          }
        }
      },
      iconColors: {
        type: 'object',
        order: 5,
        properties: {
          red: {
            title: 'Status Icon Red',
            description: 'Red color used for status icon.',
            type: 'color',
            "default": 'red'
          },
          orange: {
            title: 'Status Icon Orange',
            description: 'Orange color used for status icon.',
            type: 'color',
            "default": 'orange'
          },
          yellow: {
            title: 'Status Icon Yellow',
            description: 'Yellow color used for status icon.',
            type: 'color',
            "default": 'yellow'
          },
          green: {
            title: 'Status Icon Green',
            description: 'Green color used for status icon.',
            type: 'color',
            "default": 'green'
          },
          blue: {
            title: 'Status Icon Blue',
            description: 'Blue color used for status icon.',
            type: 'color',
            "default": 'blue'
          },
          purple: {
            title: 'Status Icon Purple',
            description: 'Purple color used for status icon.',
            type: 'color',
            "default": 'purple'
          },
          pink: {
            title: 'Status Icon Pink',
            description: 'Pink color used for status icon.',
            type: 'color',
            "default": 'hotpink'
          },
          cyan: {
            title: 'Status Icon Cyan',
            description: 'Cyan color used for status icon.',
            type: 'color',
            "default": 'cyan'
          },
          magenta: {
            title: 'Status Icon Magenta',
            description: 'Magenta color used for status icon.',
            type: 'color',
            "default": 'magenta'
          }
        }
      },
      customTexts: {
        type: 'object',
        order: 6,
        properties: {
          customText1: {
            title: 'Custom text 1',
            description: 'Text to paste when calling platformio-ide-terminal:insert-custom-text-1, $S is replaced by selection, $F is replaced by file name, $D is replaced by file directory, $L is replaced by line number of cursor, $$ is replaced by $',
            type: 'string',
            "default": ''
          },
          customText2: {
            title: 'Custom text 2',
            description: 'Text to paste when calling platformio-ide-terminal:insert-custom-text-2',
            type: 'string',
            "default": ''
          },
          customText3: {
            title: 'Custom text 3',
            description: 'Text to paste when calling platformio-ide-terminal:insert-custom-text-3',
            type: 'string',
            "default": ''
          },
          customText4: {
            title: 'Custom text 4',
            description: 'Text to paste when calling platformio-ide-terminal:insert-custom-text-4',
            type: 'string',
            "default": ''
          },
          customText5: {
            title: 'Custom text 5',
            description: 'Text to paste when calling platformio-ide-terminal:insert-custom-text-5',
            type: 'string',
            "default": ''
          },
          customText6: {
            title: 'Custom text 6',
            description: 'Text to paste when calling platformio-ide-terminal:insert-custom-text-6',
            type: 'string',
            "default": ''
          },
          customText7: {
            title: 'Custom text 7',
            description: 'Text to paste when calling platformio-ide-terminal:insert-custom-text-7',
            type: 'string',
            "default": ''
          },
          customText8: {
            title: 'Custom text 8',
            description: 'Text to paste when calling platformio-ide-terminal:insert-custom-text-8',
            type: 'string',
            "default": ''
          }
        }
      }
    }
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZmlsZTovLy9DOi9Vc2Vycy9ja25qdS8uYXRvbS9wYWNrYWdlcy9wbGF0Zm9ybWlvLWlkZS10ZXJtaW5hbC9saWIvcGxhdGZvcm1pby1pZGUtdGVybWluYWwuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQUEsTUFBTSxDQUFDLE9BQVAsR0FDRTtJQUFBLFNBQUEsRUFBVyxJQUFYO0lBRUEsUUFBQSxFQUFVLFNBQUEsR0FBQSxDQUZWO0lBSUEsVUFBQSxFQUFZLFNBQUE7QUFDVixVQUFBOztXQUFjLENBQUUsT0FBaEIsQ0FBQTs7YUFDQSxJQUFDLENBQUEsYUFBRCxHQUFpQjtJQUZQLENBSlo7SUFRQSw0QkFBQSxFQUE4QixTQUFBO2FBQzVCO1FBQUEsZ0JBQUEsRUFBa0IsU0FBQyxTQUFEO0FBQ2hCLGNBQUE7QUFBQTtlQUFBLGlCQUFBOzt5QkFDRSxPQUFPLENBQUMsR0FBSSxDQUFBLElBQUEsQ0FBWixHQUFvQjtBQUR0Qjs7UUFEZ0IsQ0FBbEI7UUFHQSxHQUFBLEVBQUssQ0FBQSxTQUFBLEtBQUE7aUJBQUEsU0FBQyxRQUFEO21CQUNILEtBQUMsQ0FBQSxhQUFhLENBQUMsdUJBQWYsQ0FBdUMsUUFBdkM7VUFERztRQUFBLENBQUEsQ0FBQSxDQUFBLElBQUEsQ0FITDtRQUtBLGdCQUFBLEVBQWtCLENBQUEsU0FBQSxLQUFBO2lCQUFBLFNBQUE7bUJBQ2hCLEtBQUMsQ0FBQSxhQUFhLENBQUM7VUFEQztRQUFBLENBQUEsQ0FBQSxDQUFBLElBQUEsQ0FMbEI7UUFPQSxJQUFBLEVBQU0sQ0FBQSxTQUFBLEtBQUE7aUJBQUEsU0FBQTttQkFDSixLQUFDLENBQUEsYUFBYSxDQUFDLGNBQWYsQ0FBQTtVQURJO1FBQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQVBOOztJQUQ0QixDQVI5QjtJQW1CQSxvQkFBQSxFQUFzQixTQUFBO2FBQ3BCO1FBQUEsR0FBQSxFQUFLLENBQUEsU0FBQSxLQUFB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QUFNLFFBRk47WUFHQSxDQUFBLE9BQUEsQ0FBQSxFQUFTLEVBSFQ7V0FyQkY7VUF5QkEsV0FBQSxFQUNFO1lBQUEsS0FBQSxFQUFPLGVBQVA7WUFDQSxXQUFBLEVBQWEseUVBRGI7WUFFQSxJQUFBLEVBQU0sUUFGTjtZQUdBLENBQUEsT0FBQSxDQUFBLEVBQVMsRUFIVDtXQTFCRjtVQThCQSxXQUFBLEVBQ0U7WUFBQSxLQUFBLEVBQU8sZUFBUDtZQUNBLFdBQUEsRUFBYSx5RUFEYjtZQUVBLElBQUEsRUFBTSxRQUZOO1lBR0EsQ0FBQSxPQUFBLENBQUEsRUFBUyxFQUhUO1dBL0JGO1VBbUNBLFdBQUEsRUFDRTtZQUFBLEtBQUEsRUFBTyxlQUFQO1lBQ0EsV0FBQSxFQUFhLHlFQURiO1lBRUEsSUFBQSxFQUFNLFFBRk47WUFHQSxDQUFBLE9BQUEsQ0FBQSxFQUFTLEVBSFQ7V0FwQ0Y7U0FIRjtPQXhSRjtLQTdCRjs7QUFERiIsInNvdXJjZXNDb250ZW50IjpbIm1vZHVsZS5leHBvcnRzID1cbiAgc3RhdHVzQmFyOiBudWxsXG5cbiAgYWN0aXZhdGU6IC0+XG5cbiAgZGVhY3RpdmF0ZTogLT5cbiAgICBAc3RhdHVzQmFyVGlsZT8uZGVzdHJveSgpXG4gICAgQHN0YXR1c0JhclRpbGUgPSBudWxsXG5cbiAgcHJvdmlkZVBsYXRmb3JtSU9JREVUZXJtaW5hbDogLT5cbiAgICB1cGRhdGVQcm9jZXNzRW52OiAodmFyaWFibGVzKSAtPlxuICAgICAgZm9yIG5hbWUsIHZhbHVlIG9mIHZhcmlhYmxlc1xuICAgICAgICBwcm9jZXNzLmVudltuYW1lXSA9IHZhbHVlXG4gICAgcnVuOiAoY29tbWFuZHMpID0+XG4gICAgICBAc3RhdHVzQmFyVGlsZS5ydW5Db21tYW5kSW5OZXdUZXJtaW5hbCBjb21tYW5kc1xuICAgIGdldFRlcm1pbmFsVmlld3M6ICgpID0+XG4gICAgICBAc3RhdHVzQmFyVGlsZS50ZXJtaW5hbFZpZXdzXG4gICAgb3BlbjogKCkgPT5cbiAgICAgIEBzdGF0dXNCYXJUaWxlLnJ1bk5ld1Rlcm1pbmFsKClcblxuICBwcm92aWRlUnVuSW5UZXJtaW5hbDogLT5cbiAgICBydW46IChjb21tYW5kcykgPT5cbiAgICAgIEBzdGF0dXNCYXJUaWxlLnJ1bkNvbW1hbmRJbk5ld1Rlcm1pbmFsIGNvbW1hbmRzXG4gICAgZ2V0VGVybWluYWxWaWV3czogKCkgPT5cbiAgICAgIEBzdGF0dXNCYXJUaWxlLnRlcm1pbmFsVmlld3NcblxuICBjb25zdW1lU3RhdHVzQmFyOiAoc3RhdHVzQmFyUHJvdmlkZXIpIC0+XG4gICAgQHN0YXR1c0JhclRpbGUgPSBuZXcgKHJlcXVpcmUgJy4vc3RhdHVzLWJhcicpKHN0YXR1c0JhclByb3ZpZGVyKVxuXG4gIGNvbmZpZzpcbiAgICB0b2dnbGVzOlxuICAgICAgdHlwZTogJ29iamVjdCdcbiAgICAgIG9yZGVyOiAxXG4gICAgICBwcm9wZXJ0aWVzOlxuICAgICAgICBhdXRvQ2xvc2U6XG4gICAgICAgICAgdGl0bGU6ICdDbG9zZSBUZXJtaW5hbCBvbiBFeGl0J1xuICAgICAgICAgIGRlc2NyaXB0aW9uOiAnU2hvdWxkIHRoZSB0ZXJtaW5hbCBjbG9zZSBpZiB0aGUgc2hlbGwgZXhpdHM/J1xuICAgICAgICAgIHR5cGU6ICdib29sZWFuJ1xuICAgICAgICAgIGRlZmF1bHQ6IGZhbHNlXG4gICAgICAgIGN1cnNvckJsaW5rOlxuICAgICAgICAgIHRpdGxlOiAnQ3Vyc29yIEJsaW5rJ1xuICAgICAgICAgIGRlc2NyaXB0aW9uOiAnU2hvdWxkIHRoZSBjdXJzb3IgYmxpbmsgd2hlbiB0aGUgdGVybWluYWwgaXMgYWN0aXZlPydcbiAgICAgICAgICB0eXBlOiAnYm9vbGVhbidcbiAgICAgICAgICBkZWZhdWx0OiB0cnVlXG4gICAgICAgIHJ1bkluc2VydGVkVGV4dDpcbiAgICAgICAgICB0aXRsZTogJ1J1biBJbnNlcnRlZCBUZXh0J1xuICAgICAgICAgIGRlc2NyaXB0aW9uOiAnUnVuIHRleHQgaW5zZXJ0ZWQgdmlhIGBwbGF0Zm9ybWlvLWlkZS10ZXJtaW5hbDppbnNlcnQtdGV4dGAgYXMgYSBjb21tYW5kPyAqKlRoaXMgd2lsbCBhcHBlbmQgYW4gZW5kLW9mLWxpbmUgY2hhcmFjdGVyIHRvIGlucHV0LioqJ1xuICAgICAgICAgIHR5cGU6ICdib29sZWFuJ1xuICAgICAgICAgIGRlZmF1bHQ6IHRydWVcbiAgICAgICAgc2VsZWN0VG9Db3B5OlxuICAgICAgICAgIHRpdGxlOiAnU2VsZWN0IFRvIENvcHknXG4gICAgICAgICAgZGVzY3JpcHRpb246ICdDb3BpZXMgdGV4dCB0byBjbGlwYm9hcmQgd2hlbiBzZWxlY3Rpb24gaGFwcGVucy4nXG4gICAgICAgICAgdHlwZTogJ2Jvb2xlYW4nXG4gICAgICAgICAgZGVmYXVsdDogdHJ1ZVxuICAgICAgICBsb2dpblNoZWxsOlxuICAgICAgICAgIHRpdGxlOiAnTG9naW4gU2hlbGwnXG4gICAgICAgICAgZGVzY3JpcHRpb246ICdVc2UgLS1sb2dpbiBvbiB6c2ggYW5kIGJhc2guJ1xuICAgICAgICAgIHR5cGU6ICdib29sZWFuJ1xuICAgICAgICAgIGRlZmF1bHQ6IHRydWVcbiAgICAgICAgc2hvd1Rvb2xiYXI6XG4gICAgICAgICAgdGl0bGU6ICdTaG93IFRvb2xiYXInXG4gICAgICAgICAgZGVzY3JpcHRpb246ICdTaG93IHRvb2xiYXIgYWJvdmUgdGVybWluYWwgd2luZG93LidcbiAgICAgICAgICB0eXBlOiAnYm9vbGVhbidcbiAgICAgICAgICBkZWZhdWx0OiB0cnVlXG4gICAgY29yZTpcbiAgICAgIHR5cGU6ICdvYmplY3QnXG4gICAgICBvcmRlcjogMlxuICAgICAgcHJvcGVydGllczpcbiAgICAgICAgYXV0b1J1bkNvbW1hbmQ6XG4gICAgICAgICAgdGl0bGU6ICdBdXRvIFJ1biBDb21tYW5kJ1xuICAgICAgICAgIGRlc2NyaXB0aW9uOiAnQ29tbWFuZCB0byBydW4gb24gdGVybWluYWwgaW5pdGlhbGl6YXRpb24uJ1xuICAgICAgICAgIHR5cGU6ICdzdHJpbmcnXG4gICAgICAgICAgZGVmYXVsdDogJydcbiAgICAgICAgbWFwVGVybWluYWxzVG86XG4gICAgICAgICAgdGl0bGU6ICdNYXAgVGVybWluYWxzIFRvJ1xuICAgICAgICAgIGRlc2NyaXB0aW9uOiAnTWFwIHRlcm1pbmFscyB0byBlYWNoIGZpbGUgb3IgZm9sZGVyLiBEZWZhdWx0IGlzIG5vIGFjdGlvbiBvciBtYXBwaW5nIGF0IGFsbC4gKipSZXN0YXJ0IHJlcXVpcmVkLioqJ1xuICAgICAgICAgIHR5cGU6ICdzdHJpbmcnXG4gICAgICAgICAgZGVmYXVsdDogJ05vbmUnXG4gICAgICAgICAgZW51bTogWydOb25lJywgJ0ZpbGUnLCAnRm9sZGVyJ11cbiAgICAgICAgbWFwVGVybWluYWxzVG9BdXRvT3BlbjpcbiAgICAgICAgICB0aXRsZTogJ0F1dG8gT3BlbiBhIE5ldyBUZXJtaW5hbCAoRm9yIFRlcm1pbmFsIE1hcHBpbmcpJ1xuICAgICAgICAgIGRlc2NyaXB0aW9uOiAnU2hvdWxkIGEgbmV3IHRlcm1pbmFsIGJlIG9wZW5lZCBmb3IgbmV3IGl0ZW1zPyAqKk5vdGU6KiogVGhpcyB3b3JrcyBpbiBjb25qdW5jdGlvbiB3aXRoIGBNYXAgVGVybWluYWxzIFRvYCBhYm92ZS4nXG4gICAgICAgICAgdHlwZTogJ2Jvb2xlYW4nXG4gICAgICAgICAgZGVmYXVsdDogZmFsc2VcbiAgICAgICAgc2Nyb2xsYmFjazpcbiAgICAgICAgICB0aXRsZTogJ1Njcm9sbCBCYWNrJ1xuICAgICAgICAgIGRlc2NyaXB0aW9uOiAnSG93IG1hbnkgbGluZXMgb2YgaGlzdG9yeSBzaG91bGQgYmUga2VwdD8nXG4gICAgICAgICAgdHlwZTogJ2ludGVnZXInXG4gICAgICAgICAgZGVmYXVsdDogMTAwMFxuICAgICAgICBzaGVsbDpcbiAgICAgICAgICB0aXRsZTogJ1NoZWxsIE92ZXJyaWRlJ1xuICAgICAgICAgIGRlc2NyaXB0aW9uOiAnT3ZlcnJpZGUgdGhlIGRlZmF1bHQgc2hlbGwgaW5zdGFuY2UgdG8gbGF1bmNoLidcbiAgICAgICAgICB0eXBlOiAnc3RyaW5nJ1xuICAgICAgICAgIGRlZmF1bHQ6IGRvIC0+XG4gICAgICAgICAgICBpZiBwcm9jZXNzLnBsYXRmb3JtIGlzICd3aW4zMidcbiAgICAgICAgICAgICAgcGF0aCA9IHJlcXVpcmUgJ3BhdGgnXG4gICAgICAgICAgICAgIHBhdGgucmVzb2x2ZShwcm9jZXNzLmVudi5TeXN0ZW1Sb290LCAnU3lzdGVtMzInLCAnV2luZG93c1Bvd2VyU2hlbGwnLCAndjEuMCcsICdwb3dlcnNoZWxsLmV4ZScpXG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgIHByb2Nlc3MuZW52LlNIRUxMIHx8ICcvYmluL2Jhc2gnXG4gICAgICAgIHNoZWxsQXJndW1lbnRzOlxuICAgICAgICAgIHRpdGxlOiAnU2hlbGwgQXJndW1lbnRzJ1xuICAgICAgICAgIGRlc2NyaXB0aW9uOiAnU3BlY2lmeSBzb21lIGFyZ3VtZW50cyB0byB1c2Ugd2hlbiBsYXVuY2hpbmcgdGhlIHNoZWxsLidcbiAgICAgICAgICB0eXBlOiAnc3RyaW5nJ1xuICAgICAgICAgIGRlZmF1bHQ6ICcnXG4gICAgICAgIHNoZWxsRW52OlxuICAgICAgICAgIHRpdGxlOiAnU2hlbGwgRW52aXJvbm1lbnQgVmFyaWFibGVzJ1xuICAgICAgICAgIGRlc2NyaXB0aW9uOiAnU3BlY2lmeSBzb21lIGFkZGl0aW9uYWwgZW52aXJvbm1lbnQgdmFyaWFibGVzLCBzcGFjZSBzZXBhcmF0ZWQgd2l0aCB0aGUgZm9ybSBgVkFSPVZBTFVFYCdcbiAgICAgICAgICB0eXBlOiAnc3RyaW5nJ1xuICAgICAgICAgIGRlZmF1bHQ6ICcnXG4gICAgICAgIHdvcmtpbmdEaXJlY3Rvcnk6XG4gICAgICAgICAgdGl0bGU6ICdXb3JraW5nIERpcmVjdG9yeSdcbiAgICAgICAgICBkZXNjcmlwdGlvbjogJ1doaWNoIGRpcmVjdG9yeSBzaG91bGQgYmUgdGhlIHByZXNlbnQgd29ya2luZyBkaXJlY3Rvcnkgd2hlbiBhIG5ldyB0ZXJtaW5hbCBpcyBtYWRlPydcbiAgICAgICAgICB0eXBlOiAnc3RyaW5nJ1xuICAgICAgICAgIGRlZmF1bHQ6ICdQcm9qZWN0J1xuICAgICAgICAgIGVudW06IFsnSG9tZScsICdQcm9qZWN0JywgJ0FjdGl2ZSBGaWxlJ11cbiAgICBzdHlsZTpcbiAgICAgIHR5cGU6ICdvYmplY3QnXG4gICAgICBvcmRlcjogM1xuICAgICAgcHJvcGVydGllczpcbiAgICAgICAgYW5pbWF0aW9uU3BlZWQ6XG4gICAgICAgICAgdGl0bGU6ICdBbmltYXRpb24gU3BlZWQnXG4gICAgICAgICAgZGVzY3JpcHRpb246ICdIb3cgZmFzdCBzaG91bGQgdGhlIHdpbmRvdyBhbmltYXRlPydcbiAgICAgICAgICB0eXBlOiAnbnVtYmVyJ1xuICAgICAgICAgIGRlZmF1bHQ6ICcxJ1xuICAgICAgICAgIG1pbmltdW06ICcwJ1xuICAgICAgICAgIG1heGltdW06ICcxMDAnXG4gICAgICAgIGZvbnRGYW1pbHk6XG4gICAgICAgICAgdGl0bGU6ICdGb250IEZhbWlseSdcbiAgICAgICAgICBkZXNjcmlwdGlvbjogJ092ZXJyaWRlIHRoZSB0ZXJtaW5hbFxcJ3MgZGVmYXVsdCBmb250IGZhbWlseS4gKipZb3UgbXVzdCB1c2UgYSBbbW9ub3NwYWNlZCBmb250XShodHRwczovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9MaXN0X29mX3R5cGVmYWNlcyNNb25vc3BhY2UpISoqJ1xuICAgICAgICAgIHR5cGU6ICdzdHJpbmcnXG4gICAgICAgICAgZGVmYXVsdDogJydcbiAgICAgICAgZm9udFNpemU6XG4gICAgICAgICAgdGl0bGU6ICdGb250IFNpemUnXG4gICAgICAgICAgZGVzY3JpcHRpb246ICdPdmVycmlkZSB0aGUgdGVybWluYWxcXCdzIGRlZmF1bHQgZm9udCBzaXplLidcbiAgICAgICAgICB0eXBlOiAnc3RyaW5nJ1xuICAgICAgICAgIGRlZmF1bHQ6ICcnXG4gICAgICAgIGRlZmF1bHRQYW5lbEhlaWdodDpcbiAgICAgICAgICB0aXRsZTogJ0RlZmF1bHQgUGFuZWwgSGVpZ2h0J1xuICAgICAgICAgIGRlc2NyaXB0aW9uOiAnRGVmYXVsdCBoZWlnaHQgb2YgYSB0ZXJtaW5hbCBwYW5lbC4gKipZb3UgbWF5IGVudGVyIGEgdmFsdWUgaW4gcHgsIGVtLCBvciAlLioqJ1xuICAgICAgICAgIHR5cGU6ICdzdHJpbmcnXG4gICAgICAgICAgZGVmYXVsdDogJzMwMHB4J1xuICAgICAgICB0aGVtZTpcbiAgICAgICAgICB0aXRsZTogJ1RoZW1lJ1xuICAgICAgICAgIGRlc2NyaXB0aW9uOiAnU2VsZWN0IGEgdGhlbWUgZm9yIHRoZSB0ZXJtaW5hbC4nXG4gICAgICAgICAgdHlwZTogJ3N0cmluZydcbiAgICAgICAgICBkZWZhdWx0OiAnc3RhbmRhcmQnXG4gICAgICAgICAgZW51bTogW1xuICAgICAgICAgICAgJ3N0YW5kYXJkJyxcbiAgICAgICAgICAgICdpbnZlcnNlJyxcbiAgICAgICAgICAgICdsaW51eCcsXG4gICAgICAgICAgICAnZ3Jhc3MnLFxuICAgICAgICAgICAgJ2hvbWVicmV3JyxcbiAgICAgICAgICAgICdtYW4tcGFnZScsXG4gICAgICAgICAgICAnbm92ZWwnLFxuICAgICAgICAgICAgJ29jZWFuJyxcbiAgICAgICAgICAgICdwcm8nLFxuICAgICAgICAgICAgJ3JlZCcsXG4gICAgICAgICAgICAncmVkLXNhbmRzJyxcbiAgICAgICAgICAgICdzaWx2ZXItYWVyb2dlbCcsXG4gICAgICAgICAgICAnc29sYXJpemVkLWRhcmsnLFxuICAgICAgICAgICAgJ3NvbGlkLWNvbG9ycycsXG4gICAgICAgICAgICAnZHJhY3VsYScsXG4gICAgICAgICAgICAnb25lLWRhcmsnLFxuICAgICAgICAgICAgJ2NocmlzdG1hcycsXG4gICAgICAgICAgICAncHJlZGF3bicsXG4gICAgICAgICAgICAnY2l0eS1saWdodHMnLFxuICAgICAgICAgICAgJ3NvbGFyaXplZC1saWdodCdcbiAgICAgICAgICBdXG4gICAgYW5zaUNvbG9yczpcbiAgICAgIHR5cGU6ICdvYmplY3QnXG4gICAgICBvcmRlcjogNFxuICAgICAgcHJvcGVydGllczpcbiAgICAgICAgbm9ybWFsOlxuICAgICAgICAgIHR5cGU6ICdvYmplY3QnXG4gICAgICAgICAgb3JkZXI6IDFcbiAgICAgICAgICBwcm9wZXJ0aWVzOlxuICAgICAgICAgICAgYmxhY2s6XG4gICAgICAgICAgICAgIHRpdGxlOiAnQmxhY2snXG4gICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiAnQmxhY2sgY29sb3IgdXNlZCBmb3IgdGVybWluYWwgQU5TSSBjb2xvciBzZXQuJ1xuICAgICAgICAgICAgICB0eXBlOiAnY29sb3InXG4gICAgICAgICAgICAgIGRlZmF1bHQ6ICcjMDAwMDAwJ1xuICAgICAgICAgICAgcmVkOlxuICAgICAgICAgICAgICB0aXRsZTogJ1JlZCdcbiAgICAgICAgICAgICAgZGVzY3JpcHRpb246ICdSZWQgY29sb3IgdXNlZCBmb3IgdGVybWluYWwgQU5TSSBjb2xvciBzZXQuJ1xuICAgICAgICAgICAgICB0eXBlOiAnY29sb3InXG4gICAgICAgICAgICAgIGRlZmF1bHQ6ICcjQ0QwMDAwJ1xuICAgICAgICAgICAgZ3JlZW46XG4gICAgICAgICAgICAgIHRpdGxlOiAnR3JlZW4nXG4gICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiAnR3JlZW4gY29sb3IgdXNlZCBmb3IgdGVybWluYWwgQU5TSSBjb2xvciBzZXQuJ1xuICAgICAgICAgICAgICB0eXBlOiAnY29sb3InXG4gICAgICAgICAgICAgIGRlZmF1bHQ6ICcjMDBDRDAwJ1xuICAgICAgICAgICAgeWVsbG93OlxuICAgICAgICAgICAgICB0aXRsZTogJ1llbGxvdydcbiAgICAgICAgICAgICAgZGVzY3JpcHRpb246ICdZZWxsb3cgY29sb3IgdXNlZCBmb3IgdGVybWluYWwgQU5TSSBjb2xvciBzZXQuJ1xuICAgICAgICAgICAgICB0eXBlOiAnY29sb3InXG4gICAgICAgICAgICAgIGRlZmF1bHQ6ICcjQ0RDRDAwJ1xuICAgICAgICAgICAgYmx1ZTpcbiAgICAgICAgICAgICAgdGl0bGU6ICdCbHVlJ1xuICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogJ0JsdWUgY29sb3IgdXNlZCBmb3IgdGVybWluYWwgQU5TSSBjb2xvciBzZXQuJ1xuICAgICAgICAgICAgICB0eXBlOiAnY29sb3InXG4gICAgICAgICAgICAgIGRlZmF1bHQ6ICcjMDAwMENEJ1xuICAgICAgICAgICAgbWFnZW50YTpcbiAgICAgICAgICAgICAgdGl0bGU6ICdNYWdlbnRhJ1xuICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogJ01hZ2VudGEgY29sb3IgdXNlZCBmb3IgdGVybWluYWwgQU5TSSBjb2xvciBzZXQuJ1xuICAgICAgICAgICAgICB0eXBlOiAnY29sb3InXG4gICAgICAgICAgICAgIGRlZmF1bHQ6ICcjQ0QwMENEJ1xuICAgICAgICAgICAgY3lhbjpcbiAgICAgICAgICAgICAgdGl0bGU6ICdDeWFuJ1xuICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogJ0N5YW4gY29sb3IgdXNlZCBmb3IgdGVybWluYWwgQU5TSSBjb2xvciBzZXQuJ1xuICAgICAgICAgICAgICB0eXBlOiAnY29sb3InXG4gICAgICAgICAgICAgIGRlZmF1bHQ6ICcjMDBDRENEJ1xuICAgICAgICAgICAgd2hpdGU6XG4gICAgICAgICAgICAgIHRpdGxlOiAnV2hpdGUnXG4gICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiAnV2hpdGUgY29sb3IgdXNlZCBmb3IgdGVybWluYWwgQU5TSSBjb2xvciBzZXQuJ1xuICAgICAgICAgICAgICB0eXBlOiAnY29sb3InXG4gICAgICAgICAgICAgIGRlZmF1bHQ6ICcjRTVFNUU1J1xuICAgICAgICB6QnJpZ2h0OlxuICAgICAgICAgIHR5cGU6ICdvYmplY3QnXG4gICAgICAgICAgb3JkZXI6IDJcbiAgICAgICAgICBwcm9wZXJ0aWVzOlxuICAgICAgICAgICAgYnJpZ2h0QmxhY2s6XG4gICAgICAgICAgICAgIHRpdGxlOiAnQnJpZ2h0IEJsYWNrJ1xuICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogJ0JyaWdodCBibGFjayBjb2xvciB1c2VkIGZvciB0ZXJtaW5hbCBBTlNJIGNvbG9yIHNldC4nXG4gICAgICAgICAgICAgIHR5cGU6ICdjb2xvcidcbiAgICAgICAgICAgICAgZGVmYXVsdDogJyM3RjdGN0YnXG4gICAgICAgICAgICBicmlnaHRSZWQ6XG4gICAgICAgICAgICAgIHRpdGxlOiAnQnJpZ2h0IFJlZCdcbiAgICAgICAgICAgICAgZGVzY3JpcHRpb246ICdCcmlnaHQgcmVkIGNvbG9yIHVzZWQgZm9yIHRlcm1pbmFsIEFOU0kgY29sb3Igc2V0LidcbiAgICAgICAgICAgICAgdHlwZTogJ2NvbG9yJ1xuICAgICAgICAgICAgICBkZWZhdWx0OiAnI0ZGMDAwMCdcbiAgICAgICAgICAgIGJyaWdodEdyZWVuOlxuICAgICAgICAgICAgICB0aXRsZTogJ0JyaWdodCBHcmVlbidcbiAgICAgICAgICAgICAgZGVzY3JpcHRpb246ICdCcmlnaHQgZ3JlZW4gY29sb3IgdXNlZCBmb3IgdGVybWluYWwgQU5TSSBjb2xvciBzZXQuJ1xuICAgICAgICAgICAgICB0eXBlOiAnY29sb3InXG4gICAgICAgICAgICAgIGRlZmF1bHQ6ICcjMDBGRjAwJ1xuICAgICAgICAgICAgYnJpZ2h0WWVsbG93OlxuICAgICAgICAgICAgICB0aXRsZTogJ0JyaWdodCBZZWxsb3cnXG4gICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiAnQnJpZ2h0IHllbGxvdyBjb2xvciB1c2VkIGZvciB0ZXJtaW5hbCBBTlNJIGNvbG9yIHNldC4nXG4gICAgICAgICAgICAgIHR5cGU6ICdjb2xvcidcbiAgICAgICAgICAgICAgZGVmYXVsdDogJyNGRkZGMDAnXG4gICAgICAgICAgICBicmlnaHRCbHVlOlxuICAgICAgICAgICAgICB0aXRsZTogJ0JyaWdodCBCbHVlJ1xuICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogJ0JyaWdodCBibHVlIGNvbG9yIHVzZWQgZm9yIHRlcm1pbmFsIEFOU0kgY29sb3Igc2V0LidcbiAgICAgICAgICAgICAgdHlwZTogJ2NvbG9yJ1xuICAgICAgICAgICAgICBkZWZhdWx0OiAnIzAwMDBGRidcbiAgICAgICAgICAgIGJyaWdodE1hZ2VudGE6XG4gICAgICAgICAgICAgIHRpdGxlOiAnQnJpZ2h0IE1hZ2VudGEnXG4gICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiAnQnJpZ2h0IG1hZ2VudGEgY29sb3IgdXNlZCBmb3IgdGVybWluYWwgQU5TSSBjb2xvciBzZXQuJ1xuICAgICAgICAgICAgICB0eXBlOiAnY29sb3InXG4gICAgICAgICAgICAgIGRlZmF1bHQ6ICcjRkYwMEZGJ1xuICAgICAgICAgICAgYnJpZ2h0Q3lhbjpcbiAgICAgICAgICAgICAgdGl0bGU6ICdCcmlnaHQgQ3lhbidcbiAgICAgICAgICAgICAgZGVzY3JpcHRpb246ICdCcmlnaHQgY3lhbiBjb2xvciB1c2VkIGZvciB0ZXJtaW5hbCBBTlNJIGNvbG9yIHNldC4nXG4gICAgICAgICAgICAgIHR5cGU6ICdjb2xvcidcbiAgICAgICAgICAgICAgZGVmYXVsdDogJyMwMEZGRkYnXG4gICAgICAgICAgICBicmlnaHRXaGl0ZTpcbiAgICAgICAgICAgICAgdGl0bGU6ICdCcmlnaHQgV2hpdGUnXG4gICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiAnQnJpZ2h0IHdoaXRlIGNvbG9yIHVzZWQgZm9yIHRlcm1pbmFsIEFOU0kgY29sb3Igc2V0LidcbiAgICAgICAgICAgICAgdHlwZTogJ2NvbG9yJ1xuICAgICAgICAgICAgICBkZWZhdWx0OiAnI0ZGRkZGRidcbiAgICBpY29uQ29sb3JzOlxuICAgICAgdHlwZTogJ29iamVjdCdcbiAgICAgIG9yZGVyOiA1XG4gICAgICBwcm9wZXJ0aWVzOlxuICAgICAgICByZWQ6XG4gICAgICAgICAgdGl0bGU6ICdTdGF0dXMgSWNvbiBSZWQnXG4gICAgICAgICAgZGVzY3JpcHRpb246ICdSZWQgY29sb3IgdXNlZCBmb3Igc3RhdHVzIGljb24uJ1xuICAgICAgICAgIHR5cGU6ICdjb2xvcidcbiAgICAgICAgICBkZWZhdWx0OiAncmVkJ1xuICAgICAgICBvcmFuZ2U6XG4gICAgICAgICAgdGl0bGU6ICdTdGF0dXMgSWNvbiBPcmFuZ2UnXG4gICAgICAgICAgZGVzY3JpcHRpb246ICdPcmFuZ2UgY29sb3IgdXNlZCBmb3Igc3RhdHVzIGljb24uJ1xuICAgICAgICAgIHR5cGU6ICdjb2xvcidcbiAgICAgICAgICBkZWZhdWx0OiAnb3JhbmdlJ1xuICAgICAgICB5ZWxsb3c6XG4gICAgICAgICAgdGl0bGU6ICdTdGF0dXMgSWNvbiBZZWxsb3cnXG4gICAgICAgICAgZGVzY3JpcHRpb246ICdZZWxsb3cgY29sb3IgdXNlZCBmb3Igc3RhdHVzIGljb24uJ1xuICAgICAgICAgIHR5cGU6ICdjb2xvcidcbiAgICAgICAgICBkZWZhdWx0OiAneWVsbG93J1xuICAgICAgICBncmVlbjpcbiAgICAgICAgICB0aXRsZTogJ1N0YXR1cyBJY29uIEdyZWVuJ1xuICAgICAgICAgIGRlc2NyaXB0aW9uOiAnR3JlZW4gY29sb3IgdXNlZCBmb3Igc3RhdHVzIGljb24uJ1xuICAgICAgICAgIHR5cGU6ICdjb2xvcidcbiAgICAgICAgICBkZWZhdWx0OiAnZ3JlZW4nXG4gICAgICAgIGJsdWU6XG4gICAgICAgICAgdGl0bGU6ICdTdGF0dXMgSWNvbiBCbHVlJ1xuICAgICAgICAgIGRlc2NyaXB0aW9uOiAnQmx1ZSBjb2xvciB1c2VkIGZvciBzdGF0dXMgaWNvbi4nXG4gICAgICAgICAgdHlwZTogJ2NvbG9yJ1xuICAgICAgICAgIGRlZmF1bHQ6ICdibHVlJ1xuICAgICAgICBwdXJwbGU6XG4gICAgICAgICAgdGl0bGU6ICdTdGF0dXMgSWNvbiBQdXJwbGUnXG4gICAgICAgICAgZGVzY3JpcHRpb246ICdQdXJwbGUgY29sb3IgdXNlZCBmb3Igc3RhdHVzIGljb24uJ1xuICAgICAgICAgIHR5cGU6ICdjb2xvcidcbiAgICAgICAgICBkZWZhdWx0OiAncHVycGxlJ1xuICAgICAgICBwaW5rOlxuICAgICAgICAgIHRpdGxlOiAnU3RhdHVzIEljb24gUGluaydcbiAgICAgICAgICBkZXNjcmlwdGlvbjogJ1BpbmsgY29sb3IgdXNlZCBmb3Igc3RhdHVzIGljb24uJ1xuICAgICAgICAgIHR5cGU6ICdjb2xvcidcbiAgICAgICAgICBkZWZhdWx0OiAnaG90cGluaydcbiAgICAgICAgY3lhbjpcbiAgICAgICAgICB0aXRsZTogJ1N0YXR1cyBJY29uIEN5YW4nXG4gICAgICAgICAgZGVzY3JpcHRpb246ICdDeWFuIGNvbG9yIHVzZWQgZm9yIHN0YXR1cyBpY29uLidcbiAgICAgICAgICB0eXBlOiAnY29sb3InXG4gICAgICAgICAgZGVmYXVsdDogJ2N5YW4nXG4gICAgICAgIG1hZ2VudGE6XG4gICAgICAgICAgdGl0bGU6ICdTdGF0dXMgSWNvbiBNYWdlbnRhJ1xuICAgICAgICAgIGRlc2NyaXB0aW9uOiAnTWFnZW50YSBjb2xvciB1c2VkIGZvciBzdGF0dXMgaWNvbi4nXG4gICAgICAgICAgdHlwZTogJ2NvbG9yJ1xuICAgICAgICAgIGRlZmF1bHQ6ICdtYWdlbnRhJ1xuICAgIGN1c3RvbVRleHRzOlxuICAgICAgdHlwZTogJ29iamVjdCdcbiAgICAgIG9yZGVyOiA2XG4gICAgICBwcm9wZXJ0aWVzOlxuICAgICAgICBjdXN0b21UZXh0MTpcbiAgICAgICAgICB0aXRsZTogJ0N1c3RvbSB0ZXh0IDEnXG4gICAgICAgICAgZGVzY3JpcHRpb246ICdUZXh0IHRvIHBhc3RlIHdoZW4gY2FsbGluZyBwbGF0Zm9ybWlvLWlkZS10ZXJtaW5hbDppbnNlcnQtY3VzdG9tLXRleHQtMSwgJFMgaXMgcmVwbGFjZWQgYnkgc2VsZWN0aW9uLCAkRiBpcyByZXBsYWNlZCBieSBmaWxlIG5hbWUsICREIGlzIHJlcGxhY2VkIGJ5IGZpbGUgZGlyZWN0b3J5LCAkTCBpcyByZXBsYWNlZCBieSBsaW5lIG51bWJlciBvZiBjdXJzb3IsICQkIGlzIHJlcGxhY2VkIGJ5ICQnXG4gICAgICAgICAgdHlwZTogJ3N0cmluZydcbiAgICAgICAgICBkZWZhdWx0OiAnJ1xuICAgICAgICBjdXN0b21UZXh0MjpcbiAgICAgICAgICB0aXRsZTogJ0N1c3RvbSB0ZXh0IDInXG4gICAgICAgICAgZGVzY3JpcHRpb246ICdUZXh0IHRvIHBhc3RlIHdoZW4gY2FsbGluZyBwbGF0Zm9ybWlvLWlkZS10ZXJtaW5hbDppbnNlcnQtY3VzdG9tLXRleHQtMidcbiAgICAgICAgICB0eXBlOiAnc3RyaW5nJ1xuICAgICAgICAgIGRlZmF1bHQ6ICcnXG4gICAgICAgIGN1c3RvbVRleHQzOlxuICAgICAgICAgIHRpdGxlOiAnQ3VzdG9tIHRleHQgMydcbiAgICAgICAgICBkZXNjcmlwdGlvbjogJ1RleHQgdG8gcGFzdGUgd2hlbiBjYWxsaW5nIHBsYXRmb3JtaW8taWRlLXRlcm1pbmFsOmluc2VydC1jdXN0b20tdGV4dC0zJ1xuICAgICAgICAgIHR5cGU6ICdzdHJpbmcnXG4gICAgICAgICAgZGVmYXVsdDogJydcbiAgICAgICAgY3VzdG9tVGV4dDQ6XG4gICAgICAgICAgdGl0bGU6ICdDdXN0b20gdGV4dCA0J1xuICAgICAgICAgIGRlc2NyaXB0aW9uOiAnVGV4dCB0byBwYXN0ZSB3aGVuIGNhbGxpbmcgcGxhdGZvcm1pby1pZGUtdGVybWluYWw6aW5zZXJ0LWN1c3RvbS10ZXh0LTQnXG4gICAgICAgICAgdHlwZTogJ3N0cmluZydcbiAgICAgICAgICBkZWZhdWx0OiAnJ1xuICAgICAgICBjdXN0b21UZXh0NTpcbiAgICAgICAgICB0aXRsZTogJ0N1c3RvbSB0ZXh0IDUnXG4gICAgICAgICAgZGVzY3JpcHRpb246ICdUZXh0IHRvIHBhc3RlIHdoZW4gY2FsbGluZyBwbGF0Zm9ybWlvLWlkZS10ZXJtaW5hbDppbnNlcnQtY3VzdG9tLXRleHQtNSdcbiAgICAgICAgICB0eXBlOiAnc3RyaW5nJ1xuICAgICAgICAgIGRlZmF1bHQ6ICcnXG4gICAgICAgIGN1c3RvbVRleHQ2OlxuICAgICAgICAgIHRpdGxlOiAnQ3VzdG9tIHRleHQgNidcbiAgICAgICAgICBkZXNjcmlwdGlvbjogJ1RleHQgdG8gcGFzdGUgd2hlbiBjYWxsaW5nIHBsYXRmb3JtaW8taWRlLXRlcm1pbmFsOmluc2VydC1jdXN0b20tdGV4dC02J1xuICAgICAgICAgIHR5cGU6ICdzdHJpbmcnXG4gICAgICAgICAgZGVmYXVsdDogJydcbiAgICAgICAgY3VzdG9tVGV4dDc6XG4gICAgICAgICAgdGl0bGU6ICdDdXN0b20gdGV4dCA3J1xuICAgICAgICAgIGRlc2NyaXB0aW9uOiAnVGV4dCB0byBwYXN0ZSB3aGVuIGNhbGxpbmcgcGxhdGZvcm1pby1pZGUtdGVybWluYWw6aW5zZXJ0LWN1c3RvbS10ZXh0LTcnXG4gICAgICAgICAgdHlwZTogJ3N0cmluZydcbiAgICAgICAgICBkZWZhdWx0OiAnJ1xuICAgICAgICBjdXN0b21UZXh0ODpcbiAgICAgICAgICB0aXRsZTogJ0N1c3RvbSB0ZXh0IDgnXG4gICAgICAgICAgZGVzY3JpcHRpb246ICdUZXh0IHRvIHBhc3RlIHdoZW4gY2FsbGluZyBwbGF0Zm9ybWlvLWlkZS10ZXJtaW5hbDppbnNlcnQtY3VzdG9tLXRleHQtOCdcbiAgICAgICAgICB0eXBlOiAnc3RyaW5nJ1xuICAgICAgICAgIGRlZmF1bHQ6ICcnXG4iXX0=
