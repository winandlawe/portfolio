(function() {
  var AtomReact, CompositeDisposable, Disposable, autoCompleteTagCloseRegex, autoCompleteTagStartRegex, contentCheckRegex, decreaseIndentForNextLinePattern, defaultDetectReactFilePattern, jsxComplexAttributePattern, jsxTagStartPattern, ref;

  ref = require('atom'), CompositeDisposable = ref.CompositeDisposable, Disposable = ref.Disposable;

  contentCheckRegex = null;

  defaultDetectReactFilePattern = '/((require\\([\'"]react(?:(-native|\\/addons))?[\'"]\\)))|(import\\s+[\\w{},\\s]+\\s+from\\s+[\'"]react(?:(-native|\\/addons))?[\'"])/';

  autoCompleteTagStartRegex = /(<)([a-zA-Z0-9\.:$_]+)/g;

  autoCompleteTagCloseRegex = /(<\/)([^>]+)(>)/g;

  jsxTagStartPattern = '(?x)((^|=|return)\\s*<([^!/?](?!.+?(</.+?>))))';

  jsxComplexAttributePattern = '(?x)\\{ [^}"\']* $|\\( [^)"\']* $';

  decreaseIndentForNextLinePattern = '(?x) />\\s*(,|;)?\\s*$ | ^(?!\\s*\\?)\\s*\\S+.*</[-_\\.A-Za-z0-9]+>$';

  AtomReact = (function() {
    AtomReact.prototype.config = {
      enabledForAllJavascriptFiles: {
        type: 'boolean',
        "default": false,
        description: 'Enable grammar, snippets and other features automatically for all .js files.'
      },
      disableAutoClose: {
        type: 'boolean',
        "default": false,
        description: 'Disabled tag autocompletion'
      },
      skipUndoStackForAutoCloseInsertion: {
        type: 'boolean',
        "default": true,
        description: 'When enabled, auto insert/remove closing tag mutation is skipped from normal undo/redo operation'
      },
      detectReactFilePattern: {
        type: 'string',
        "default": defaultDetectReactFilePattern
      },
      jsxTagStartPattern: {
        type: 'string',
        "default": jsxTagStartPattern
      },
      jsxComplexAttributePattern: {
        type: 'string',
        "default": jsxComplexAttributePattern
      },
      decreaseIndentForNextLinePattern: {
        type: 'string',
        "default": decreaseIndentForNextLinePattern
      }
    };

    function AtomReact() {}

    AtomReact.prototype.patchEditorLangModeAutoDecreaseIndentForBufferRow = function(editor) {
      var fn, self;
      self = this;
      fn = editor.autoDecreaseIndentForBufferRow;
      if (fn.jsxPatch) {
        return;
      }
      return editor.autoDecreaseIndentForBufferRow = function(bufferRow, options) {
        var currentIndentLevel, decreaseIndentRegex, decreaseNextLineIndentRegex, desiredIndentLevel, increaseIndentRegex, line, precedingLine, precedingRow, scopeDescriptor;
        if (editor.getGrammar().scopeName !== "source.js.jsx") {
          return fn.call(editor, bufferRow, options);
        }
        scopeDescriptor = this.scopeDescriptorForBufferPosition([bufferRow, 0]);
        decreaseNextLineIndentRegex = this.tokenizedBuffer.regexForPattern(atom.config.get('react.decreaseIndentForNextLinePattern') || decreaseIndentForNextLinePattern);
        decreaseIndentRegex = this.tokenizedBuffer.decreaseIndentRegexForScopeDescriptor(scopeDescriptor);
        increaseIndentRegex = this.tokenizedBuffer.increaseIndentRegexForScopeDescriptor(scopeDescriptor);
        precedingRow = this.tokenizedBuffer.buffer.previousNonBlankRow(bufferRow);
        if (precedingRow < 0) {
          return;
        }
        precedingLine = this.tokenizedBuffer.buffer.lineForRow(precedingRow);
        line = this.tokenizedBuffer.buffer.lineForRow(bufferRow);
        if (precedingLine && decreaseNextLineIndentRegex.testSync(precedingLine) && !(increaseIndentRegex && increaseIndentRegex.testSync(precedingLine)) && !this.isBufferRowCommented(precedingRow)) {
          currentIndentLevel = this.indentationForBufferRow(precedingRow);
          if (decreaseIndentRegex && decreaseIndentRegex.testSync(line)) {
            currentIndentLevel -= 1;
          }
          desiredIndentLevel = currentIndentLevel - 1;
          if (desiredIndentLevel >= 0 && desiredIndentLevel < currentIndentLevel) {
            return this.setIndentationForBufferRow(bufferRow, desiredIndentLevel);
          }
        } else if (!this.isBufferRowCommented(bufferRow)) {
          return fn.call(editor, bufferRow, options);
        }
      };
    };

    AtomReact.prototype.patchEditorLangModeSuggestedIndentForBufferRow = function(editor) {
      var fn, self;
      self = this;
      fn = editor.suggestedIndentForBufferRow;
      if (fn.jsxPatch) {
        return;
      }
      return editor.suggestedIndentForBufferRow = function(bufferRow, options) {
        var complexAttributeRegex, decreaseIndentRegex, decreaseIndentTest, decreaseNextLineIndentRegex, increaseIndentRegex, indent, precedingLine, precedingRow, scopeDescriptor, tagStartRegex, tagStartTest;
        indent = fn.call(editor, bufferRow, options);
        if (!(editor.getGrammar().scopeName === "source.js.jsx" && bufferRow > 1)) {
          return indent;
        }
        scopeDescriptor = this.scopeDescriptorForBufferPosition([bufferRow, 0]);
        decreaseNextLineIndentRegex = this.tokenizedBuffer.regexForPattern(atom.config.get('react.decreaseIndentForNextLinePattern') || decreaseIndentForNextLinePattern);
        increaseIndentRegex = this.tokenizedBuffer.increaseIndentRegexForScopeDescriptor(scopeDescriptor);
        decreaseIndentRegex = this.tokenizedBuffer.decreaseIndentRegexForScopeDescriptor(scopeDescriptor);
        tagStartRegex = this.tokenizedBuffer.regexForPattern(atom.config.get('react.jsxTagStartPattern') || jsxTagStartPattern);
        complexAttributeRegex = this.tokenizedBuffer.regexForPattern(atom.config.get('react.jsxComplexAttributePattern') || jsxComplexAttributePattern);
        precedingRow = this.tokenizedBuffer.buffer.previousNonBlankRow(bufferRow);
        if (precedingRow < 0) {
          return indent;
        }
        precedingLine = this.tokenizedBuffer.buffer.lineForRow(precedingRow);
        if (precedingLine == null) {
          return indent;
        }
        if (this.isBufferRowCommented(bufferRow) && this.isBufferRowCommented(precedingRow)) {
          return this.indentationForBufferRow(precedingRow);
        }
        tagStartTest = tagStartRegex.testSync(precedingLine);
        decreaseIndentTest = decreaseIndentRegex.testSync(precedingLine);
        if (tagStartTest && complexAttributeRegex.testSync(precedingLine) && !this.isBufferRowCommented(precedingRow)) {
          indent += 1;
        }
        if (precedingLine && !decreaseIndentTest && decreaseNextLineIndentRegex.testSync(precedingLine) && !this.isBufferRowCommented(precedingRow)) {
          indent -= 1;
        }
        return Math.max(indent, 0);
      };
    };

    AtomReact.prototype.patchEditorLangMode = function(editor) {
      var ref1, ref2;
      if ((ref1 = this.patchEditorLangModeSuggestedIndentForBufferRow(editor)) != null) {
        ref1.jsxPatch = true;
      }
      return (ref2 = this.patchEditorLangModeAutoDecreaseIndentForBufferRow(editor)) != null ? ref2.jsxPatch = true : void 0;
    };

    AtomReact.prototype.isReact = function(text) {
      var match;
      if (atom.config.get('react.enabledForAllJavascriptFiles')) {
        return true;
      }
      if (contentCheckRegex == null) {
        match = (atom.config.get('react.detectReactFilePattern') || defaultDetectReactFilePattern).match(new RegExp('^/(.*?)/([gimy]*)$'));
        contentCheckRegex = new RegExp(match[1], match[2]);
      }
      return text.match(contentCheckRegex) != null;
    };

    AtomReact.prototype.isReactEnabledForEditor = function(editor) {
      var ref1;
      return (editor != null) && ((ref1 = editor.getGrammar().scopeName) === "source.js.jsx" || ref1 === "source.coffee.jsx");
    };

    AtomReact.prototype.autoSetGrammar = function(editor) {
      var extName, jsxGrammar, path;
      if (this.isReactEnabledForEditor(editor)) {
        return;
      }
      path = require('path');
      extName = path.extname(editor.getPath() || '');
      if (extName === ".jsx" || ((extName === ".js" || extName === ".es6") && this.isReact(editor.getText()))) {
        jsxGrammar = atom.grammars.grammarForScopeName("source.js.jsx");
        if (jsxGrammar) {
          return editor.setGrammar(jsxGrammar);
        }
      }
    };

    AtomReact.prototype.onHTMLToJSX = function() {
      var HTMLtoJSX, converter, editor, jsxformat, selections;
      jsxformat = require('jsxformat');
      HTMLtoJSX = require('./htmltojsx');
      converter = new HTMLtoJSX({
        createClass: false
      });
      editor = atom.workspace.getActiveTextEditor();
      if (!this.isReactEnabledForEditor(editor)) {
        return;
      }
      selections = editor.getSelections();
      return editor.transact((function(_this) {
        return function() {
          var i, jsxOutput, len, range, results, selection, selectionText;
          results = [];
          for (i = 0, len = selections.length; i < len; i++) {
            selection = selections[i];
            try {
              selectionText = selection.getText();
              jsxOutput = converter.convert(selectionText);
              try {
                jsxformat.setOptions({});
                jsxOutput = jsxformat.format(jsxOutput);
              } catch (error) {}
              selection.insertText(jsxOutput);
              range = selection.getBufferRange();
              results.push(editor.autoIndentBufferRows(range.start.row, range.end.row));
            } catch (error) {}
          }
          return results;
        };
      })(this));
    };

    AtomReact.prototype.onReformat = function() {
      var _, editor, jsxformat, selections;
      jsxformat = require('jsxformat');
      _ = require('lodash');
      editor = atom.workspace.getActiveTextEditor();
      if (!this.isReactEnabledForEditor(editor)) {
        return;
      }
      selections = editor.getSelections();
      return editor.transact((function(_this) {
        return function() {
          var bufEnd, bufStart, err, firstChangedLine, i, lastChangedLine, len, newLineCount, original, originalLineCount, range, result, results, selection, serializedRange;
          results = [];
          for (i = 0, len = selections.length; i < len; i++) {
            selection = selections[i];
            try {
              range = selection.getBufferRange();
              serializedRange = range.serialize();
              bufStart = serializedRange[0];
              bufEnd = serializedRange[1];
              jsxformat.setOptions({});
              result = jsxformat.format(selection.getText());
              originalLineCount = editor.getLineCount();
              selection.insertText(result);
              newLineCount = editor.getLineCount();
              editor.autoIndentBufferRows(bufStart[0], bufEnd[0] + (newLineCount - originalLineCount));
              results.push(editor.setCursorBufferPosition(bufStart));
            } catch (error) {
              err = error;
              range = selection.getBufferRange().serialize();
              range[0][0]++;
              range[1][0]++;
              jsxformat.setOptions({
                range: range
              });
              original = editor.getText();
              try {
                result = jsxformat.format(original);
                selection.clear();
                originalLineCount = editor.getLineCount();
                editor.setText(result);
                newLineCount = editor.getLineCount();
                firstChangedLine = range[0][0] - 1;
                lastChangedLine = range[1][0] - 1 + (newLineCount - originalLineCount);
                editor.autoIndentBufferRows(firstChangedLine, lastChangedLine);
                results.push(editor.setCursorBufferPosition([firstChangedLine, range[0][1]]));
              } catch (error) {}
            }
          }
          return results;
        };
      })(this));
    };

    AtomReact.prototype.autoCloseTag = function(eventObj, editor) {
      var fullLine, lastLine, lastLineSpaces, line, lines, match, options, ref1, ref2, rest, row, serializedEndPoint, tagName, token, tokenizedLine;
      if (atom.config.get('react.disableAutoClose')) {
        return;
      }
      if (!this.isReactEnabledForEditor(editor) || editor !== atom.workspace.getActiveTextEditor()) {
        return;
      }
      if ((eventObj != null ? eventObj.newText : void 0) === '>' && !eventObj.oldText) {
        if (editor.getCursorBufferPositions().length > 1) {
          return;
        }
        tokenizedLine = (ref1 = editor.tokenizedBuffer) != null ? ref1.tokenizedLineForRow(eventObj.newRange.end.row) : void 0;
        if (tokenizedLine == null) {
          return;
        }
        token = tokenizedLine.tokenAtBufferColumn(eventObj.newRange.end.column - 1);
        if ((token == null) || token.scopes.indexOf('tag.open.js') === -1 || token.scopes.indexOf('punctuation.definition.tag.end.js') === -1) {
          return;
        }
        lines = editor.buffer.getLines();
        row = eventObj.newRange.end.row;
        line = lines[row];
        line = line.substr(0, eventObj.newRange.end.column);
        if (line.substr(line.length - 2, 1) === '/') {
          return;
        }
        tagName = null;
        while ((line != null) && (tagName == null)) {
          match = line.match(autoCompleteTagStartRegex);
          if ((match != null) && match.length > 0) {
            tagName = match.pop().substr(1);
          }
          row--;
          line = lines[row];
        }
        if (tagName != null) {
          if (atom.config.get('react.skipUndoStackForAutoCloseInsertion')) {
            options = {
              undo: 'skip'
            };
          } else {
            options = {};
          }
          editor.insertText('</' + tagName + '>', options);
          return editor.setCursorBufferPosition(eventObj.newRange.end);
        }
      } else if ((eventObj != null ? eventObj.oldText : void 0) === '>' && (eventObj != null ? eventObj.newText : void 0) === '') {
        lines = editor.buffer.getLines();
        row = eventObj.newRange.end.row;
        fullLine = lines[row];
        tokenizedLine = (ref2 = editor.tokenizedBuffer) != null ? ref2.tokenizedLineForRow(eventObj.newRange.end.row) : void 0;
        if (tokenizedLine == null) {
          return;
        }
        token = tokenizedLine.tokenAtBufferColumn(eventObj.newRange.end.column - 1);
        if ((token == null) || token.scopes.indexOf('tag.open.js') === -1) {
          return;
        }
        line = fullLine.substr(0, eventObj.newRange.end.column);
        if (line.substr(line.length - 1, 1) === '/') {
          return;
        }
        tagName = null;
        while ((line != null) && (tagName == null)) {
          match = line.match(autoCompleteTagStartRegex);
          if ((match != null) && match.length > 0) {
            tagName = match.pop().substr(1);
          }
          row--;
          line = lines[row];
        }
        if (tagName != null) {
          rest = fullLine.substr(eventObj.newRange.end.column);
          if (rest.indexOf('</' + tagName + '>') === 0) {
            if (atom.config.get('react.skipUndoStackForAutoCloseInsertion')) {
              options = {
                undo: 'skip'
              };
            } else {
              options = {};
            }
            serializedEndPoint = [eventObj.newRange.end.row, eventObj.newRange.end.column];
            return editor.setTextInBufferRange([serializedEndPoint, [serializedEndPoint[0], serializedEndPoint[1] + tagName.length + 3]], '', options);
          }
        }
      } else if ((eventObj != null) && eventObj.newText.match(/\r?\n/)) {
        lines = editor.buffer.getLines();
        row = eventObj.newRange.end.row;
        lastLine = lines[row - 1];
        fullLine = lines[row];
        if (/>$/.test(lastLine) && fullLine.search(autoCompleteTagCloseRegex) === 0) {
          while (lastLine != null) {
            match = lastLine.match(autoCompleteTagStartRegex);
            if ((match != null) && match.length > 0) {
              break;
            }
            row--;
            lastLine = lines[row];
          }
          lastLineSpaces = lastLine.match(/^\s*/);
          lastLineSpaces = lastLineSpaces != null ? lastLineSpaces[0] : '';
          editor.insertText('\n' + lastLineSpaces);
          return editor.setCursorBufferPosition(eventObj.newRange.end);
        }
      }
    };

    AtomReact.prototype.processEditor = function(editor) {
      var disposableBufferEvent;
      this.patchEditorLangMode(editor);
      this.autoSetGrammar(editor);
      disposableBufferEvent = editor.buffer.onDidChange((function(_this) {
        return function(e) {
          return _this.autoCloseTag(e, editor);
        };
      })(this));
      this.disposables.add(editor.onDidDestroy((function(_this) {
        return function() {
          return disposableBufferEvent.dispose();
        };
      })(this)));
      return this.disposables.add(disposableBufferEvent);
    };

    AtomReact.prototype.deactivate = function() {
      return this.disposables.dispose();
    };

    AtomReact.prototype.activate = function() {
      var disposableConfigListener, disposableHTMLTOJSX, disposableProcessEditor, disposableReformat;
      this.disposables = new CompositeDisposable();
      disposableConfigListener = atom.config.observe('react.detectReactFilePattern', function(newValue) {
        return contentCheckRegex = null;
      });
      disposableReformat = atom.commands.add('atom-workspace', 'react:reformat-JSX', (function(_this) {
        return function() {
          return _this.onReformat();
        };
      })(this));
      disposableHTMLTOJSX = atom.commands.add('atom-workspace', 'react:HTML-to-JSX', (function(_this) {
        return function() {
          return _this.onHTMLToJSX();
        };
      })(this));
      disposableProcessEditor = atom.workspace.observeTextEditors(this.processEditor.bind(this));
      this.disposables.add(disposableConfigListener);
      this.disposables.add(disposableReformat);
      this.disposables.add(disposableHTMLTOJSX);
      return this.disposables.add(disposableProcessEditor);
    };

    return AtomReact;

  })();

  module.exports = AtomReact;

}).call(this);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZmlsZTovLy9DOi9Vc2Vycy9ja25qdS8uYXRvbS9wYWNrYWdlcy9yZWFjdC9saWIvYXRvbS1yZWFjdC5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQSxNQUFBOztFQUFBLE1BQW9DLE9BQUEsQ0FBUSxNQUFSLENBQXBDLEVBQUMsNkNBQUQsRUFBc0I7O0VBRXRCLGlCQUFBLEdBQW9COztFQUNwQiw2QkFBQSxHQUFnQzs7RUFDaEMseUJBQUEsR0FBNEI7O0VBQzVCLHlCQUFBLEdBQTRCOztFQUU1QixrQkFBQSxHQUFxQjs7RUFDckIsMEJBQUEsR0FBNkI7O0VBQzdCLGdDQUFBLEdBQW1DOztFQUk3Qjt3QkFDSixNQUFBLEdBQ0U7TUFBQSw0QkFBQSxFQUNFO1FBQUEsSUFBQSxFQUFNLFNBQU47UUFDQSxDQUFBLE9BQUEsQ0FBQSxFQUFTLEtBRFQ7UUFFQSxXQUFBLEVBQWEsOEVBRmI7T0FERjtNQUlBLGdCQUFBLEVBQ0U7UUFBQSxJQUFBLEVBQU0sU0FBTjtRQUNBLENBQUEsT0FBQSxDQUFBLEVBQVMsS0FEVDtRQUVBLFdBQUEsRUFBYSw2QkFGYjtPQUxGO01BUUEsa0NBQUEsRUFDRTtRQUFBLElBQUEsRUFBTSxTQUFOO1FBQ0EsQ0FBQSxPQUFBLENBQUEsRUFBUyxJQURUO1FBRUEsV0FBQSxFQUFhLGtHQUZiO09BVEY7TUFZQSxzQkFBQSxFQUNFO1FBQUEsSUFBQSxFQUFNLFFBQU47UUFDQSxDQUFBLE9BQUEsQ0FBQSxFQUFTLDZCQURUO09BYkY7TUFlQSxrQkFBQSxFQUNFO1FBQUEsSUFBQSxFQUFNLFFBQU47UUFDQSxDQUFBLE9BQUEsQ0FBQSxFQUFTLGtCQURUO09BaEJGO01Ba0JBLDBCQUFBLEVBQ0U7UUFBQSxJQUFBLEVBQU0sUUFBTjtRQUNBLENBQUEsT0FBQSxDQUFBLEVBQVMsMEJBRFQ7T0FuQkY7TUFxQkEsZ0NBQUEsRUFDRTtRQUFBLElBQUEsRUFBTSxRQUFOO1FBQ0Es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QUFDLFFBQVEsQ0FBQyxHQUFkLENBQWtCLGdCQUFsQixFQUFvQyxvQkFBcEMsRUFBMEQsQ0FBQSxTQUFBLEtBQUE7ZUFBQSxTQUFBO2lCQUFHLEtBQUMsQ0FBQSxVQUFELENBQUE7UUFBSDtNQUFBLENBQUEsQ0FBQSxDQUFBLElBQUEsQ0FBMUQ7TUFDckIsbUJBQUEsR0FBc0IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFkLENBQWtCLGdCQUFsQixFQUFvQyxtQkFBcEMsRUFBeUQsQ0FBQSxTQUFBLEtBQUE7ZUFBQSxTQUFBO2lCQUFHLEtBQUMsQ0FBQSxXQUFELENBQUE7UUFBSDtNQUFBLENBQUEsQ0FBQSxDQUFBLElBQUEsQ0FBekQ7TUFDdEIsdUJBQUEsR0FBMEIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxrQkFBZixDQUFrQyxJQUFDLENBQUEsYUFBYSxDQUFDLElBQWYsQ0FBb0IsSUFBcEIsQ0FBbEM7TUFFMUIsSUFBQyxDQUFBLFdBQVcsQ0FBQyxHQUFiLENBQWlCLHdCQUFqQjtNQUNBLElBQUMsQ0FBQSxXQUFXLENBQUMsR0FBYixDQUFpQixrQkFBakI7TUFDQSxJQUFDLENBQUEsV0FBVyxDQUFDLEdBQWIsQ0FBaUIsbUJBQWpCO2FBQ0EsSUFBQyxDQUFBLFdBQVcsQ0FBQyxHQUFiLENBQWlCLHVCQUFqQjtJQWhCUTs7Ozs7O0VBbUJaLE1BQU0sQ0FBQyxPQUFQLEdBQWlCO0FBOVZqQiIsInNvdXJjZXNDb250ZW50IjpbIntDb21wb3NpdGVEaXNwb3NhYmxlLCBEaXNwb3NhYmxlfSA9IHJlcXVpcmUgJ2F0b20nXG5cbmNvbnRlbnRDaGVja1JlZ2V4ID0gbnVsbFxuZGVmYXVsdERldGVjdFJlYWN0RmlsZVBhdHRlcm4gPSAnLygocmVxdWlyZVxcXFwoW1xcJ1wiXXJlYWN0KD86KC1uYXRpdmV8XFxcXC9hZGRvbnMpKT9bXFwnXCJdXFxcXCkpKXwoaW1wb3J0XFxcXHMrW1xcXFx3e30sXFxcXHNdK1xcXFxzK2Zyb21cXFxccytbXFwnXCJdcmVhY3QoPzooLW5hdGl2ZXxcXFxcL2FkZG9ucykpP1tcXCdcIl0pLydcbmF1dG9Db21wbGV0ZVRhZ1N0YXJ0UmVnZXggPSAvKDwpKFthLXpBLVowLTlcXC46JF9dKykvZ1xuYXV0b0NvbXBsZXRlVGFnQ2xvc2VSZWdleCA9IC8oPFxcLykoW14+XSspKD4pL2dcblxuanN4VGFnU3RhcnRQYXR0ZXJuID0gJyg/eCkoKF58PXxyZXR1cm4pXFxcXHMqPChbXiEvP10oPyEuKz8oPC8uKz8+KSkpKSdcbmpzeENvbXBsZXhBdHRyaWJ1dGVQYXR0ZXJuID0gJyg/eClcXFxceyBbXn1cIlxcJ10qICR8XFxcXCggW14pXCJcXCddKiAkJ1xuZGVjcmVhc2VJbmRlbnRGb3JOZXh0TGluZVBhdHRlcm4gPSAnKD94KVxuLz5cXFxccyooLHw7KT9cXFxccyokXG58IF4oPyFcXFxccypcXFxcPylcXFxccypcXFxcUysuKjwvWy1fXFxcXC5BLVphLXowLTldKz4kJ1xuXG5jbGFzcyBBdG9tUmVhY3RcbiAgY29uZmlnOlxuICAgIGVuYWJsZWRGb3JBbGxKYXZhc2NyaXB0RmlsZXM6XG4gICAgICB0eXBlOiAnYm9vbGVhbidcbiAgICAgIGRlZmF1bHQ6IGZhbHNlXG4gICAgICBkZXNjcmlwdGlvbjogJ0VuYWJsZSBncmFtbWFyLCBzbmlwcGV0cyBhbmQgb3RoZXIgZmVhdHVyZXMgYXV0b21hdGljYWxseSBmb3IgYWxsIC5qcyBmaWxlcy4nXG4gICAgZGlzYWJsZUF1dG9DbG9zZTpcbiAgICAgIHR5cGU6ICdib29sZWFuJ1xuICAgICAgZGVmYXVsdDogZmFsc2VcbiAgICAgIGRlc2NyaXB0aW9uOiAnRGlzYWJsZWQgdGFnIGF1dG9jb21wbGV0aW9uJ1xuICAgIHNraXBVbmRvU3RhY2tGb3JBdXRvQ2xvc2VJbnNlcnRpb246XG4gICAgICB0eXBlOiAnYm9vbGVhbidcbiAgICAgIGRlZmF1bHQ6IHRydWVcbiAgICAgIGRlc2NyaXB0aW9uOiAnV2hlbiBlbmFibGVkLCBhdXRvIGluc2VydC9yZW1vdmUgY2xvc2luZyB0YWcgbXV0YXRpb24gaXMgc2tpcHBlZCBmcm9tIG5vcm1hbCB1bmRvL3JlZG8gb3BlcmF0aW9uJ1xuICAgIGRldGVjdFJlYWN0RmlsZVBhdHRlcm46XG4gICAgICB0eXBlOiAnc3RyaW5nJ1xuICAgICAgZGVmYXVsdDogZGVmYXVsdERldGVjdFJlYWN0RmlsZVBhdHRlcm5cbiAgICBqc3hUYWdTdGFydFBhdHRlcm46XG4gICAgICB0eXBlOiAnc3RyaW5nJ1xuICAgICAgZGVmYXVsdDoganN4VGFnU3RhcnRQYXR0ZXJuXG4gICAganN4Q29tcGxleEF0dHJpYnV0ZVBhdHRlcm46XG4gICAgICB0eXBlOiAnc3RyaW5nJ1xuICAgICAgZGVmYXVsdDoganN4Q29tcGxleEF0dHJpYnV0ZVBhdHRlcm5cbiAgICBkZWNyZWFzZUluZGVudEZvck5leHRMaW5lUGF0dGVybjpcbiAgICAgIHR5cGU6ICdzdHJpbmcnXG4gICAgICBkZWZhdWx0OiBkZWNyZWFzZUluZGVudEZvck5leHRMaW5lUGF0dGVyblxuXG4gIGNvbnN0cnVjdG9yOiAtPlxuICBwYXRjaEVkaXRvckxhbmdNb2RlQXV0b0RlY3JlYXNlSW5kZW50Rm9yQnVmZmVyUm93OiAoZWRpdG9yKSAtPlxuICAgIHNlbGYgPSB0aGlzXG4gICAgZm4gPSBlZGl0b3IuYXV0b0RlY3JlYXNlSW5kZW50Rm9yQnVmZmVyUm93XG4gICAgcmV0dXJuIGlmIGZuLmpzeFBhdGNoXG5cbiAgICBlZGl0b3IuYXV0b0RlY3JlYXNlSW5kZW50Rm9yQnVmZmVyUm93ID0gKGJ1ZmZlclJvdywgb3B0aW9ucykgLT5cbiAgICAgIHJldHVybiBmbi5jYWxsKGVkaXRvciwgYnVmZmVyUm93LCBvcHRpb25zKSB1bmxlc3MgZWRpdG9yLmdldEdyYW1tYXIoKS5zY29wZU5hbWUgPT0gXCJzb3VyY2UuanMuanN4XCJcblxuICAgICAgc2NvcGVEZXNjcmlwdG9yID0gQHNjb3BlRGVzY3JpcHRvckZvckJ1ZmZlclBvc2l0aW9uKFtidWZmZXJSb3csIDBdKVxuICAgICAgZGVjcmVhc2VOZXh0TGluZUluZGVudFJlZ2V4ID0gQHRva2VuaXplZEJ1ZmZlci5yZWdleEZvclBhdHRlcm4oYXRvbS5jb25maWcuZ2V0KCdyZWFjdC5kZWNyZWFzZUluZGVudEZvck5leHRMaW5lUGF0dGVybicpIHx8wqBkZWNyZWFzZUluZGVudEZvck5leHRMaW5lUGF0dGVybilcbiAgICAgIGRlY3JlYXNlSW5kZW50UmVnZXggPSBAdG9rZW5pemVkQnVmZmVyLmRlY3JlYXNlSW5kZW50UmVnZXhGb3JTY29wZURlc2NyaXB0b3Ioc2NvcGVEZXNjcmlwdG9yKVxuICAgICAgaW5jcmVhc2VJbmRlbnRSZWdleCA9IEB0b2tlbml6ZWRCdWZmZXIuaW5jcmVhc2VJbmRlbnRSZWdleEZvclNjb3BlRGVzY3JpcHRvcihzY29wZURlc2NyaXB0b3IpXG5cbiAgICAgIHByZWNlZGluZ1JvdyA9IEB0b2tlbml6ZWRCdWZmZXIuYnVmZmVyLnByZXZpb3VzTm9uQmxhbmtSb3coYnVmZmVyUm93KVxuXG4gICAgICByZXR1cm4gaWYgcHJlY2VkaW5nUm93IDwgMFxuXG4gICAgICBwcmVjZWRpbmdMaW5lID0gQHRva2VuaXplZEJ1ZmZlci5idWZmZXIubGluZUZvclJvdyhwcmVjZWRpbmdSb3cpXG4gICAgICBsaW5lID0gQHRva2VuaXplZEJ1ZmZlci5idWZmZXIubGluZUZvclJvdyhidWZmZXJSb3cpXG5cbiAgICAgIGlmIHByZWNlZGluZ0xpbmUgYW5kIGRlY3JlYXNlTmV4dExpbmVJbmRlbnRSZWdleC50ZXN0U3luYyhwcmVjZWRpbmdMaW5lKSBhbmRcbiAgICAgICAgIG5vdCAoaW5jcmVhc2VJbmRlbnRSZWdleCBhbmQgaW5jcmVhc2VJbmRlbnRSZWdleC50ZXN0U3luYyhwcmVjZWRpbmdMaW5lKSkgYW5kXG4gICAgICAgICBub3QgQGlzQnVmZmVyUm93Q29tbWVudGVkKHByZWNlZGluZ1JvdylcbiAgICAgICAgY3VycmVudEluZGVudExldmVsID0gQGluZGVudGF0aW9uRm9yQnVmZmVyUm93KHByZWNlZGluZ1JvdylcbiAgICAgICAgY3VycmVudEluZGVudExldmVsIC09IDEgaWYgZGVjcmVhc2VJbmRlbnRSZWdleCBhbmQgZGVjcmVhc2VJbmRlbnRSZWdleC50ZXN0U3luYyhsaW5lKVxuICAgICAgICBkZXNpcmVkSW5kZW50TGV2ZWwgPSBjdXJyZW50SW5kZW50TGV2ZWwgLSAxXG4gICAgICAgIGlmIGRlc2lyZWRJbmRlbnRMZXZlbCA+PSAwIGFuZCBkZXNpcmVkSW5kZW50TGV2ZWwgPCBjdXJyZW50SW5kZW50TGV2ZWxcbiAgICAgICAgICBAc2V0SW5kZW50YXRpb25Gb3JCdWZmZXJSb3coYnVmZmVyUm93LCBkZXNpcmVkSW5kZW50TGV2ZWwpXG4gICAgICBlbHNlIGlmIG5vdCBAaXNCdWZmZXJSb3dDb21tZW50ZWQoYnVmZmVyUm93KVxuICAgICAgICBmbi5jYWxsKGVkaXRvciwgYnVmZmVyUm93LCBvcHRpb25zKVxuXG4gIHBhdGNoRWRpdG9yTGFuZ01vZGVTdWdnZXN0ZWRJbmRlbnRGb3JCdWZmZXJSb3c6IChlZGl0b3IpIC0+XG4gICAgc2VsZiA9IHRoaXNcbiAgICBmbiA9IGVkaXRvci5zdWdnZXN0ZWRJbmRlbnRGb3JCdWZmZXJSb3dcbiAgICByZXR1cm4gaWYgZm4uanN4UGF0Y2hcblxuICAgIGVkaXRvci5zdWdnZXN0ZWRJbmRlbnRGb3JCdWZmZXJSb3cgPSAoYnVmZmVyUm93LCBvcHRpb25zKSAtPlxuICAgICAgaW5kZW50ID0gZm4uY2FsbChlZGl0b3IsIGJ1ZmZlclJvdywgb3B0aW9ucylcbiAgICAgIHJldHVybiBpbmRlbnQgdW5sZXNzIGVkaXRvci5nZXRHcmFtbWFyKCkuc2NvcGVOYW1lID09IFwic291cmNlLmpzLmpzeFwiIGFuZCBidWZmZXJSb3cgPiAxXG5cbiAgICAgIHNjb3BlRGVzY3JpcHRvciA9IEBzY29wZURlc2NyaXB0b3JGb3JCdWZmZXJQb3NpdGlvbihbYnVmZmVyUm93LCAwXSlcblxuICAgICAgZGVjcmVhc2VOZXh0TGluZUluZGVudFJlZ2V4ID0gQHRva2VuaXplZEJ1ZmZlci5yZWdleEZvclBhdHRlcm4oYXRvbS5jb25maWcuZ2V0KCdyZWFjdC5kZWNyZWFzZUluZGVudEZvck5leHRMaW5lUGF0dGVybicpIHx8wqBkZWNyZWFzZUluZGVudEZvck5leHRMaW5lUGF0dGVybilcbiAgICAgIGluY3JlYXNlSW5kZW50UmVnZXggPSBAdG9rZW5pemVkQnVmZmVyLmluY3JlYXNlSW5kZW50UmVnZXhGb3JTY29wZURlc2NyaXB0b3Ioc2NvcGVEZXNjcmlwdG9yKVxuXG4gICAgICBkZWNyZWFzZUluZGVudFJlZ2V4ID0gQHRva2VuaXplZEJ1ZmZlci5kZWNyZWFzZUluZGVudFJlZ2V4Rm9yU2NvcGVEZXNjcmlwdG9yKHNjb3BlRGVzY3JpcHRvcilcbiAgICAgIHRhZ1N0YXJ0UmVnZXggPSBAdG9rZW5pemVkQnVmZmVyLnJlZ2V4Rm9yUGF0dGVybihhdG9tLmNvbmZpZy5nZXQoJ3JlYWN0LmpzeFRhZ1N0YXJ0UGF0dGVybicpIHx8wqBqc3hUYWdTdGFydFBhdHRlcm4pXG4gICAgICBjb21wbGV4QXR0cmlidXRlUmVnZXggPSBAdG9rZW5pemVkQnVmZmVyLnJlZ2V4Rm9yUGF0dGVybihhdG9tLmNvbmZpZy5nZXQoJ3JlYWN0LmpzeENvbXBsZXhBdHRyaWJ1dGVQYXR0ZXJuJykgfHzCoGpzeENvbXBsZXhBdHRyaWJ1dGVQYXR0ZXJuKVxuXG4gICAgICBwcmVjZWRpbmdSb3cgPSBAdG9rZW5pemVkQnVmZmVyLmJ1ZmZlci5wcmV2aW91c05vbkJsYW5rUm93KGJ1ZmZlclJvdylcblxuICAgICAgcmV0dXJuIGluZGVudCBpZiBwcmVjZWRpbmdSb3cgPCAwXG5cbiAgICAgIHByZWNlZGluZ0xpbmUgPSBAdG9rZW5pemVkQnVmZmVyLmJ1ZmZlci5saW5lRm9yUm93KHByZWNlZGluZ1JvdylcblxuICAgICAgcmV0dXJuIGluZGVudCBpZiBub3QgcHJlY2VkaW5nTGluZT9cblxuICAgICAgaWYgQGlzQnVmZmVyUm93Q29tbWVudGVkKGJ1ZmZlclJvdykgYW5kIEBpc0J1ZmZlclJvd0NvbW1lbnRlZChwcmVjZWRpbmdSb3cpXG4gICAgICAgIHJldHVybiBAaW5kZW50YXRpb25Gb3JCdWZmZXJSb3cocHJlY2VkaW5nUm93KVxuXG4gICAgICB0YWdTdGFydFRlc3QgPSB0YWdTdGFydFJlZ2V4LnRlc3RTeW5jKHByZWNlZGluZ0xpbmUpXG4gICAgICBkZWNyZWFzZUluZGVudFRlc3QgPSBkZWNyZWFzZUluZGVudFJlZ2V4LnRlc3RTeW5jKHByZWNlZGluZ0xpbmUpXG5cbiAgICAgIGluZGVudCArPSAxIGlmIHRhZ1N0YXJ0VGVzdCBhbmQgY29tcGxleEF0dHJpYnV0ZVJlZ2V4LnRlc3RTeW5jKHByZWNlZGluZ0xpbmUpIGFuZCBub3QgQGlzQnVmZmVyUm93Q29tbWVudGVkKHByZWNlZGluZ1JvdylcbiAgICAgIGluZGVudCAtPSAxIGlmIHByZWNlZGluZ0xpbmUgYW5kIG5vdCBkZWNyZWFzZUluZGVudFRlc3QgYW5kIGRlY3JlYXNlTmV4dExpbmVJbmRlbnRSZWdleC50ZXN0U3luYyhwcmVjZWRpbmdMaW5lKSBhbmQgbm90IEBpc0J1ZmZlclJvd0NvbW1lbnRlZChwcmVjZWRpbmdSb3cpXG5cbiAgICAgIHJldHVybiBNYXRoLm1heChpbmRlbnQsIDApXG5cbiAgcGF0Y2hFZGl0b3JMYW5nTW9kZTogKGVkaXRvcikgLT5cbiAgICBAcGF0Y2hFZGl0b3JMYW5nTW9kZVN1Z2dlc3RlZEluZGVudEZvckJ1ZmZlclJvdyhlZGl0b3IpPy5qc3hQYXRjaCA9IHRydWVcbiAgICBAcGF0Y2hFZGl0b3JMYW5nTW9kZUF1dG9EZWNyZWFzZUluZGVudEZvckJ1ZmZlclJvdyhlZGl0b3IpPy5qc3hQYXRjaCA9IHRydWVcblxuICBpc1JlYWN0OiAodGV4dCkgLT5cbiAgICByZXR1cm4gdHJ1ZSBpZiBhdG9tLmNvbmZpZy5nZXQoJ3JlYWN0LmVuYWJsZWRGb3JBbGxKYXZhc2NyaXB0RmlsZXMnKVxuXG5cbiAgICBpZiBub3QgY29udGVudENoZWNrUmVnZXg/XG4gICAgICBtYXRjaCA9IChhdG9tLmNvbmZpZy5nZXQoJ3JlYWN0LmRldGVjdFJlYWN0RmlsZVBhdHRlcm4nKSB8fCBkZWZhdWx0RGV0ZWN0UmVhY3RGaWxlUGF0dGVybikubWF0Y2gobmV3IFJlZ0V4cCgnXi8oLio/KS8oW2dpbXldKikkJykpO1xuICAgICAgY29udGVudENoZWNrUmVnZXggPSBuZXcgUmVnRXhwKG1hdGNoWzFdLCBtYXRjaFsyXSlcbiAgICByZXR1cm4gdGV4dC5tYXRjaChjb250ZW50Q2hlY2tSZWdleCk/XG5cbiAgaXNSZWFjdEVuYWJsZWRGb3JFZGl0b3I6IChlZGl0b3IpIC0+XG4gICAgcmV0dXJuIGVkaXRvcj8gJiYgZWRpdG9yLmdldEdyYW1tYXIoKS5zY29wZU5hbWUgaW4gW1wic291cmNlLmpzLmpzeFwiLCBcInNvdXJjZS5jb2ZmZWUuanN4XCJdXG5cbiAgYXV0b1NldEdyYW1tYXI6IChlZGl0b3IpIC0+XG4gICAgcmV0dXJuIGlmIEBpc1JlYWN0RW5hYmxlZEZvckVkaXRvciBlZGl0b3JcblxuICAgIHBhdGggPSByZXF1aXJlICdwYXRoJ1xuXG4gICAgIyBDaGVjayBpZiBmaWxlIGV4dGVuc2lvbiBpcyAuanN4IG9yIHRoZSBmaWxlIHJlcXVpcmVzIFJlYWN0XG4gICAgZXh0TmFtZSA9IHBhdGguZXh0bmFtZShlZGl0b3IuZ2V0UGF0aCgpIG9yICcnKVxuICAgIGlmIGV4dE5hbWUgaXMgXCIuanN4XCIgb3IgKChleHROYW1lIGlzIFwiLmpzXCIgb3IgZXh0TmFtZSBpcyBcIi5lczZcIikgYW5kIEBpc1JlYWN0KGVkaXRvci5nZXRUZXh0KCkpKVxuICAgICAganN4R3JhbW1hciA9IGF0b20uZ3JhbW1hcnMuZ3JhbW1hckZvclNjb3BlTmFtZShcInNvdXJjZS5qcy5qc3hcIilcbiAgICAgIGVkaXRvci5zZXRHcmFtbWFyIGpzeEdyYW1tYXIgaWYganN4R3JhbW1hclxuXG4gIG9uSFRNTFRvSlNYOiAtPlxuICAgIGpzeGZvcm1hdCA9IHJlcXVpcmUgJ2pzeGZvcm1hdCdcbiAgICBIVE1MdG9KU1ggPSByZXF1aXJlICcuL2h0bWx0b2pzeCdcbiAgICBjb252ZXJ0ZXIgPSBuZXcgSFRNTHRvSlNYKGNyZWF0ZUNsYXNzOiBmYWxzZSlcblxuICAgIGVkaXRvciA9IGF0b20ud29ya3NwYWNlLmdldEFjdGl2ZVRleHRFZGl0b3IoKVxuXG4gICAgcmV0dXJuIGlmIG5vdCBAaXNSZWFjdEVuYWJsZWRGb3JFZGl0b3IgZWRpdG9yXG5cbiAgICBzZWxlY3Rpb25zID0gZWRpdG9yLmdldFNlbGVjdGlvbnMoKVxuXG4gICAgZWRpdG9yLnRyYW5zYWN0ID0+XG4gICAgICBmb3Igc2VsZWN0aW9uIGluIHNlbGVjdGlvbnNcbiAgICAgICAgdHJ5XG4gICAgICAgICAgc2VsZWN0aW9uVGV4dCA9IHNlbGVjdGlvbi5nZXRUZXh0KClcbiAgICAgICAgICBqc3hPdXRwdXQgPSBjb252ZXJ0ZXIuY29udmVydChzZWxlY3Rpb25UZXh0KVxuXG4gICAgICAgICAgdHJ5XG4gICAgICAgICAgICBqc3hmb3JtYXQuc2V0T3B0aW9ucyh7fSk7XG4gICAgICAgICAgICBqc3hPdXRwdXQgPSBqc3hmb3JtYXQuZm9ybWF0KGpzeE91dHB1dClcblxuICAgICAgICAgIHNlbGVjdGlvbi5pbnNlcnRUZXh0KGpzeE91dHB1dCk7XG4gICAgICAgICAgcmFuZ2UgPSBzZWxlY3Rpb24uZ2V0QnVmZmVyUmFuZ2UoKTtcbiAgICAgICAgICBlZGl0b3IuYXV0b0luZGVudEJ1ZmZlclJvd3MocmFuZ2Uuc3RhcnQucm93LCByYW5nZS5lbmQucm93KVxuXG4gIG9uUmVmb3JtYXQ6IC0+XG4gICAganN4Zm9ybWF0ID0gcmVxdWlyZSAnanN4Zm9ybWF0J1xuICAgIF8gPSByZXF1aXJlICdsb2Rhc2gnXG5cbiAgICBlZGl0b3IgPSBhdG9tLndvcmtzcGFjZS5nZXRBY3RpdmVUZXh0RWRpdG9yKClcblxuICAgIHJldHVybiBpZiBub3QgQGlzUmVhY3RFbmFibGVkRm9yRWRpdG9yIGVkaXRvclxuXG4gICAgc2VsZWN0aW9ucyA9IGVkaXRvci5nZXRTZWxlY3Rpb25zKClcbiAgICBlZGl0b3IudHJhbnNhY3QgPT5cbiAgICAgIGZvciBzZWxlY3Rpb24gaW4gc2VsZWN0aW9uc1xuICAgICAgICB0cnlcbiAgICAgICAgICByYW5nZSA9IHNlbGVjdGlvbi5nZXRCdWZmZXJSYW5nZSgpO1xuICAgICAgICAgIHNlcmlhbGl6ZWRSYW5nZSA9IHJhbmdlLnNlcmlhbGl6ZSgpXG4gICAgICAgICAgYnVmU3RhcnQgPSBzZXJpYWxpemVkUmFuZ2VbMF1cbiAgICAgICAgICBidWZFbmQgPSBzZXJpYWxpemVkUmFuZ2VbMV1cblxuICAgICAgICAgIGpzeGZvcm1hdC5zZXRPcHRpb25zKHt9KTtcbiAgICAgICAgICByZXN1bHQgPSBqc3hmb3JtYXQuZm9ybWF0KHNlbGVjdGlvbi5nZXRUZXh0KCkpXG5cbiAgICAgICAgICBvcmlnaW5hbExpbmVDb3VudCA9IGVkaXRvci5nZXRMaW5lQ291bnQoKVxuICAgICAgICAgIHNlbGVjdGlvbi5pbnNlcnRUZXh0KHJlc3VsdClcbiAgICAgICAgICBuZXdMaW5lQ291bnQgPSBlZGl0b3IuZ2V0TGluZUNvdW50KClcblxuICAgICAgICAgIGVkaXRvci5hdXRvSW5kZW50QnVmZmVyUm93cyhidWZTdGFydFswXSwgYnVmRW5kWzBdICsgKG5ld0xpbmVDb3VudCAtIG9yaWdpbmFsTGluZUNvdW50KSlcbiAgICAgICAgICBlZGl0b3Iuc2V0Q3Vyc29yQnVmZmVyUG9zaXRpb24oYnVmU3RhcnQpXG4gICAgICAgIGNhdGNoIGVyclxuICAgICAgICAgICMgUGFyc2luZy9mb3JtYXR0aW5nIHRoZSBzZWxlY3Rpb24gZmFpbGVkIGxldHMgdHJ5IHRvIHBhcnNlIHRoZSB3aG9sZSBmaWxlIGJ1dCBmb3JtYXQgdGhlIHNlbGVjdGlvbiBvbmx5XG4gICAgICAgICAgcmFuZ2UgPSBzZWxlY3Rpb24uZ2V0QnVmZmVyUmFuZ2UoKS5zZXJpYWxpemUoKVxuICAgICAgICAgICMgZXNwcmltYSBhc3QgbGluZSBjb3VudCBzdGFydHMgZm9yIDFcbiAgICAgICAgICByYW5nZVswXVswXSsrXG4gICAgICAgICAgcmFuZ2VbMV1bMF0rK1xuXG4gICAgICAgICAganN4Zm9ybWF0LnNldE9wdGlvbnMoe3JhbmdlOiByYW5nZX0pO1xuXG4gICAgICAgICAgIyBUT0RPOiB1c2UgZm9sZFxuICAgICAgICAgIG9yaWdpbmFsID0gZWRpdG9yLmdldFRleHQoKTtcblxuICAgICAgICAgIHRyeVxuICAgICAgICAgICAgcmVzdWx0ID0ganN4Zm9ybWF0LmZvcm1hdChvcmlnaW5hbClcbiAgICAgICAgICAgIHNlbGVjdGlvbi5jbGVhcigpXG5cbiAgICAgICAgICAgIG9yaWdpbmFsTGluZUNvdW50ID0gZWRpdG9yLmdldExpbmVDb3VudCgpXG4gICAgICAgICAgICBlZGl0b3Iuc2V0VGV4dChyZXN1bHQpXG4gICAgICAgICAgICBuZXdMaW5lQ291bnQgPSBlZGl0b3IuZ2V0TGluZUNvdW50KClcblxuICAgICAgICAgICAgZmlyc3RDaGFuZ2VkTGluZSA9IHJhbmdlWzBdWzBdIC0gMVxuICAgICAgICAgICAgbGFzdENoYW5nZWRMaW5lID0gcmFuZ2VbMV1bMF0gLSAxICsgKG5ld0xpbmVDb3VudCAtIG9yaWdpbmFsTGluZUNvdW50KVxuXG4gICAgICAgICAgICBlZGl0b3IuYXV0b0luZGVudEJ1ZmZlclJvd3MoZmlyc3RDaGFuZ2VkTGluZSwgbGFzdENoYW5nZWRMaW5lKVxuXG4gICAgICAgICAgICAjIHJldHVybiBiYWNrXG4gICAgICAgICAgICBlZGl0b3Iuc2V0Q3Vyc29yQnVmZmVyUG9zaXRpb24oW2ZpcnN0Q2hhbmdlZExpbmUsIHJhbmdlWzBdWzFdXSlcblxuICBhdXRvQ2xvc2VUYWc6IChldmVudE9iaiwgZWRpdG9yKSAtPlxuICAgIHJldHVybiBpZiBhdG9tLmNvbmZpZy5nZXQoJ3JlYWN0LmRpc2FibGVBdXRvQ2xvc2UnKVxuXG4gICAgcmV0dXJuIGlmIG5vdCBAaXNSZWFjdEVuYWJsZWRGb3JFZGl0b3IoZWRpdG9yKSBvciBlZGl0b3IgIT0gYXRvbS53b3Jrc3BhY2UuZ2V0QWN0aXZlVGV4dEVkaXRvcigpXG5cbiAgICBpZiBldmVudE9iaj8ubmV3VGV4dCBpcyAnPicgYW5kICFldmVudE9iai5vbGRUZXh0XG4gICAgICAjIGF1dG8gY2xvc2luZyBtdWx0aXBsZSBjdXJzb3JzIGlzIGEgbGl0dGxlIGJpdCB0cmlja3kgc28gbGV0cyBkaXNhYmxlIGl0IGZvciBub3dcbiAgICAgIHJldHVybiBpZiBlZGl0b3IuZ2V0Q3Vyc29yQnVmZmVyUG9zaXRpb25zKCkubGVuZ3RoID4gMTtcblxuICAgICAgdG9rZW5pemVkTGluZSA9IGVkaXRvci50b2tlbml6ZWRCdWZmZXI/LnRva2VuaXplZExpbmVGb3JSb3coZXZlbnRPYmoubmV3UmFuZ2UuZW5kLnJvdylcbiAgICAgIHJldHVybiBpZiBub3QgdG9rZW5pemVkTGluZT9cblxuICAgICAgdG9rZW4gPSB0b2tlbml6ZWRMaW5lLnRva2VuQXRCdWZmZXJDb2x1bW4oZXZlbnRPYmoubmV3UmFuZ2UuZW5kLmNvbHVtbiAtIDEpXG5cbiAgICAgIGlmIG5vdCB0b2tlbj8gb3IgdG9rZW4uc2NvcGVzLmluZGV4T2YoJ3RhZy5vcGVuLmpzJykgPT0gLTEgb3IgdG9rZW4uc2NvcGVzLmluZGV4T2YoJ3B1bmN0dWF0aW9uLmRlZmluaXRpb24udGFnLmVuZC5qcycpID09IC0xXG4gICAgICAgIHJldHVyblxuXG4gICAgICBsaW5lcyA9IGVkaXRvci5idWZmZXIuZ2V0TGluZXMoKVxuICAgICAgcm93ID0gZXZlbnRPYmoubmV3UmFuZ2UuZW5kLnJvd1xuICAgICAgbGluZSA9IGxpbmVzW3Jvd11cbiAgICAgIGxpbmUgPSBsaW5lLnN1YnN0ciAwLCBldmVudE9iai5uZXdSYW5nZS5lbmQuY29sdW1uXG5cbiAgICAgICMgVGFnIGlzIHNlbGYgY2xvc2luZ1xuICAgICAgcmV0dXJuIGlmIGxpbmUuc3Vic3RyKGxpbmUubGVuZ3RoIC0gMiwgMSkgaXMgJy8nXG5cbiAgICAgIHRhZ05hbWUgPSBudWxsXG5cbiAgICAgIHdoaWxlIGxpbmU/IGFuZCBub3QgdGFnTmFtZT9cbiAgICAgICAgbWF0Y2ggPSBsaW5lLm1hdGNoIGF1dG9Db21wbGV0ZVRhZ1N0YXJ0UmVnZXhcbiAgICAgICAgaWYgbWF0Y2g/ICYmIG1hdGNoLmxlbmd0aCA+IDBcbiAgICAgICAgICB0YWdOYW1lID0gbWF0Y2gucG9wKCkuc3Vic3RyKDEpXG4gICAgICAgIHJvdy0tXG4gICAgICAgIGxpbmUgPSBsaW5lc1tyb3ddXG5cbiAgICAgIGlmIHRhZ05hbWU/XG4gICAgICAgIGlmIGF0b20uY29uZmlnLmdldCgncmVhY3Quc2tpcFVuZG9TdGFja0ZvckF1dG9DbG9zZUluc2VydGlvbicpXG4gICAgICAgICAgb3B0aW9ucyA9IHt1bmRvOiAnc2tpcCd9XG4gICAgICAgIGVsc2VcbiAgICAgICAgICBvcHRpb25zID0ge31cbiAgICAgICAgICBcbiAgICAgICAgZWRpdG9yLmluc2VydFRleHQoJzwvJyArIHRhZ05hbWUgKyAnPicsIG9wdGlvbnMpXG4gICAgICAgIGVkaXRvci5zZXRDdXJzb3JCdWZmZXJQb3NpdGlvbihldmVudE9iai5uZXdSYW5nZS5lbmQpXG5cbiAgICBlbHNlIGlmIGV2ZW50T2JqPy5vbGRUZXh0IGlzICc+JyBhbmQgZXZlbnRPYmo/Lm5ld1RleHQgaXMgJydcblxuICAgICAgbGluZXMgPSBlZGl0b3IuYnVmZmVyLmdldExpbmVzKClcbiAgICAgIHJvdyA9IGV2ZW50T2JqLm5ld1JhbmdlLmVuZC5yb3dcbiAgICAgIGZ1bGxMaW5lID0gbGluZXNbcm93XVxuXG4gICAgICB0b2tlbml6ZWRMaW5lID0gZWRpdG9yLnRva2VuaXplZEJ1ZmZlcj8udG9rZW5pemVkTGluZUZvclJvdyhldmVudE9iai5uZXdSYW5nZS5lbmQucm93KVxuICAgICAgcmV0dXJuIGlmIG5vdCB0b2tlbml6ZWRMaW5lP1xuXG4gICAgICB0b2tlbiA9IHRva2VuaXplZExpbmUudG9rZW5BdEJ1ZmZlckNvbHVtbihldmVudE9iai5uZXdSYW5nZS5lbmQuY29sdW1uIC0gMSlcbiAgICAgIGlmIG5vdCB0b2tlbj8gb3IgdG9rZW4uc2NvcGVzLmluZGV4T2YoJ3RhZy5vcGVuLmpzJykgPT0gLTFcbiAgICAgICAgcmV0dXJuXG4gICAgICBsaW5lID0gZnVsbExpbmUuc3Vic3RyIDAsIGV2ZW50T2JqLm5ld1JhbmdlLmVuZC5jb2x1bW5cblxuICAgICAgIyBUYWcgaXMgc2VsZiBjbG9zaW5nXG4gICAgICByZXR1cm4gaWYgbGluZS5zdWJzdHIobGluZS5sZW5ndGggLSAxLCAxKSBpcyAnLydcblxuICAgICAgdGFnTmFtZSA9IG51bGxcblxuICAgICAgd2hpbGUgbGluZT8gYW5kIG5vdCB0YWdOYW1lP1xuICAgICAgICBtYXRjaCA9IGxpbmUubWF0Y2ggYXV0b0NvbXBsZXRlVGFnU3RhcnRSZWdleFxuICAgICAgICBpZiBtYXRjaD8gJiYgbWF0Y2gubGVuZ3RoID4gMFxuICAgICAgICAgIHRhZ05hbWUgPSBtYXRjaC5wb3AoKS5zdWJzdHIoMSlcbiAgICAgICAgcm93LS1cbiAgICAgICAgbGluZSA9IGxpbmVzW3Jvd11cblxuICAgICAgaWYgdGFnTmFtZT9cbiAgICAgICAgcmVzdCA9IGZ1bGxMaW5lLnN1YnN0cihldmVudE9iai5uZXdSYW5nZS5lbmQuY29sdW1uKVxuICAgICAgICBpZiByZXN0LmluZGV4T2YoJzwvJyArIHRhZ05hbWUgKyAnPicpID09IDBcbiAgICAgICAgICAjIHJlc3QgaXMgY2xvc2luZyB0YWdcbiAgICAgICAgICBpZiBhdG9tLmNvbmZpZy5nZXQoJ3JlYWN0LnNraXBVbmRvU3RhY2tGb3JBdXRvQ2xvc2VJbnNlcnRpb24nKVxuICAgICAgICAgICAgb3B0aW9ucyA9IHt1bmRvOiAnc2tpcCd9XG4gICAgICAgICAgZWxzZVxuICAgICAgICAgICAgb3B0aW9ucyA9IHt9XG4gICAgICAgICAgc2VyaWFsaXplZEVuZFBvaW50ID0gW2V2ZW50T2JqLm5ld1JhbmdlLmVuZC5yb3csIGV2ZW50T2JqLm5ld1JhbmdlLmVuZC5jb2x1bW5dO1xuICAgICAgICAgIGVkaXRvci5zZXRUZXh0SW5CdWZmZXJSYW5nZShcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgc2VyaWFsaXplZEVuZFBvaW50LFxuICAgICAgICAgICAgICBbc2VyaWFsaXplZEVuZFBvaW50WzBdLCBzZXJpYWxpemVkRW5kUG9pbnRbMV0gKyB0YWdOYW1lLmxlbmd0aCArIDNdXG4gICAgICAgICAgICBdXG4gICAgICAgICAgLCAnJywgb3B0aW9ucylcblxuICAgIGVsc2UgaWYgZXZlbnRPYmo/IGFuZCBldmVudE9iai5uZXdUZXh0Lm1hdGNoIC9cXHI/XFxuL1xuICAgICAgbGluZXMgPSBlZGl0b3IuYnVmZmVyLmdldExpbmVzKClcbiAgICAgIHJvdyA9IGV2ZW50T2JqLm5ld1JhbmdlLmVuZC5yb3dcbiAgICAgIGxhc3RMaW5lID0gbGluZXNbcm93IC0gMV1cbiAgICAgIGZ1bGxMaW5lID0gbGluZXNbcm93XVxuXG4gICAgICBpZiAvPiQvLnRlc3QobGFzdExpbmUpIGFuZCBmdWxsTGluZS5zZWFyY2goYXV0b0NvbXBsZXRlVGFnQ2xvc2VSZWdleCkgPT0gMFxuICAgICAgICB3aGlsZSBsYXN0TGluZT9cbiAgICAgICAgICBtYXRjaCA9IGxhc3RMaW5lLm1hdGNoIGF1dG9Db21wbGV0ZVRhZ1N0YXJ0UmVnZXhcbiAgICAgICAgICBpZiBtYXRjaD8gJiYgbWF0Y2gubGVuZ3RoID4gMFxuICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICByb3ctLVxuICAgICAgICAgIGxhc3RMaW5lID0gbGluZXNbcm93XVxuXG4gICAgICAgIGxhc3RMaW5lU3BhY2VzID0gbGFzdExpbmUubWF0Y2goL15cXHMqLylcbiAgICAgICAgbGFzdExpbmVTcGFjZXMgPSBpZiBsYXN0TGluZVNwYWNlcz8gdGhlbiBsYXN0TGluZVNwYWNlc1swXSBlbHNlICcnXG4gICAgICAgIGVkaXRvci5pbnNlcnRUZXh0KCdcXG4nICsgbGFzdExpbmVTcGFjZXMpXG4gICAgICAgIGVkaXRvci5zZXRDdXJzb3JCdWZmZXJQb3NpdGlvbihldmVudE9iai5uZXdSYW5nZS5lbmQpXG5cbiAgcHJvY2Vzc0VkaXRvcjogKGVkaXRvcikgLT5cbiAgICBAcGF0Y2hFZGl0b3JMYW5nTW9kZShlZGl0b3IpXG4gICAgQGF1dG9TZXRHcmFtbWFyKGVkaXRvcilcbiAgICBkaXNwb3NhYmxlQnVmZmVyRXZlbnQgPSBlZGl0b3IuYnVmZmVyLm9uRGlkQ2hhbmdlIChlKSA9PlxuICAgICAgICAgICAgICAgICAgICAgICAgQGF1dG9DbG9zZVRhZyBlLCBlZGl0b3JcblxuICAgIEBkaXNwb3NhYmxlcy5hZGQgZWRpdG9yLm9uRGlkRGVzdHJveSA9PiBkaXNwb3NhYmxlQnVmZmVyRXZlbnQuZGlzcG9zZSgpXG5cbiAgICBAZGlzcG9zYWJsZXMuYWRkKGRpc3Bvc2FibGVCdWZmZXJFdmVudCk7XG5cbiAgZGVhY3RpdmF0ZTogLT5cbiAgICBAZGlzcG9zYWJsZXMuZGlzcG9zZSgpXG4gIGFjdGl2YXRlOiAtPlxuXG4gICAgQGRpc3Bvc2FibGVzID0gbmV3IENvbXBvc2l0ZURpc3Bvc2FibGUoKTtcblxuXG4gICAgIyBCaW5kIGV2ZW50c1xuICAgIGRpc3Bvc2FibGVDb25maWdMaXN0ZW5lciA9IGF0b20uY29uZmlnLm9ic2VydmUgJ3JlYWN0LmRldGVjdFJlYWN0RmlsZVBhdHRlcm4nLCAobmV3VmFsdWUpIC0+XG4gICAgICBjb250ZW50Q2hlY2tSZWdleCA9IG51bGxcblxuICAgIGRpc3Bvc2FibGVSZWZvcm1hdCA9IGF0b20uY29tbWFuZHMuYWRkICdhdG9tLXdvcmtzcGFjZScsICdyZWFjdDpyZWZvcm1hdC1KU1gnLCA9PiBAb25SZWZvcm1hdCgpXG4gICAgZGlzcG9zYWJsZUhUTUxUT0pTWCA9IGF0b20uY29tbWFuZHMuYWRkICdhdG9tLXdvcmtzcGFjZScsICdyZWFjdDpIVE1MLXRvLUpTWCcsID0+IEBvbkhUTUxUb0pTWCgpXG4gICAgZGlzcG9zYWJsZVByb2Nlc3NFZGl0b3IgPSBhdG9tLndvcmtzcGFjZS5vYnNlcnZlVGV4dEVkaXRvcnMgQHByb2Nlc3NFZGl0b3IuYmluZCh0aGlzKVxuXG4gICAgQGRpc3Bvc2FibGVzLmFkZCBkaXNwb3NhYmxlQ29uZmlnTGlzdGVuZXJcbiAgICBAZGlzcG9zYWJsZXMuYWRkIGRpc3Bvc2FibGVSZWZvcm1hdFxuICAgIEBkaXNwb3NhYmxlcy5hZGQgZGlzcG9zYWJsZUhUTUxUT0pTWFxuICAgIEBkaXNwb3NhYmxlcy5hZGQgZGlzcG9zYWJsZVByb2Nlc3NFZGl0b3JcblxuXG5tb2R1bGUuZXhwb3J0cyA9IEF0b21SZWFjdFxuIl19
