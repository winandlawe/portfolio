(function() {
  var $, $$$, AtomHtmlPreviewView, CompositeDisposable, Disposable, ScrollView, fs, os, path, ref, ref1, scrollInjectScript,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty,
    indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  fs = require('fs');

  ref = require('atom'), CompositeDisposable = ref.CompositeDisposable, Disposable = ref.Disposable;

  ref1 = require('atom-space-pen-views'), $ = ref1.$, $$$ = ref1.$$$, ScrollView = ref1.ScrollView;

  path = require('path');

  os = require('os');

  scrollInjectScript = "<script>\n(function () {\n  var scriptTag = document.scripts[document.scripts.length - 1];\n  document.addEventListener('DOMContentLoaded',()=>{\n    var elem = document.createElement(\"span\")\n    try {\n      // Scroll to this current script tag\n      elem.style.width = 100\n      // Center the scrollY\n      elem.style.height = \"20vh\"\n      elem.style.marginTop = \"-20vh\"\n      elem.style.marginLeft = -100\n      elem.style.display = \"block\"\n      var par = scriptTag.parentNode\n      par.insertBefore(elem, scriptTag)\n      elem.scrollIntoView()\n    } catch (error) {}\n    try { elem.remove() } catch (error) {}\n    try { scriptTag.remove() } catch (error) {}\n  }, false)\n})();\n</script>";

  module.exports = AtomHtmlPreviewView = (function(superClass) {
    extend(AtomHtmlPreviewView, superClass);

    atom.deserializers.add(AtomHtmlPreviewView);

    AtomHtmlPreviewView.prototype.editorSub = null;

    AtomHtmlPreviewView.prototype.onDidChangeTitle = function() {
      return new Disposable();
    };

    AtomHtmlPreviewView.prototype.onDidChangeModified = function() {
      return new Disposable();
    };

    AtomHtmlPreviewView.prototype.webviewElementLoaded = false;

    AtomHtmlPreviewView.prototype.renderLater = true;

    AtomHtmlPreviewView.deserialize = function(state) {
      return new AtomHtmlPreviewView(state);
    };

    AtomHtmlPreviewView.content = function() {
      return this.div({
        "class": 'atom-html-preview native-key-bindings',
        tabindex: -1
      }, (function(_this) {
        return function() {
          var style;
          style = 'z-index: 2; padding: 2em;';
          _this.div({
            "class": 'show-error',
            style: style
          });
          return _this.tag('webview', {
            src: path.resolve(__dirname, '../html/loading.html'),
            outlet: 'htmlview',
            disablewebsecurity: 'on',
            allowfileaccessfromfiles: 'on',
            allowPointerLock: 'on'
          });
        };
      })(this));
    };

    function AtomHtmlPreviewView(arg) {
      var filePath, handles;
      this.editorId = arg.editorId, filePath = arg.filePath;
      this.handleEvents = bind(this.handleEvents, this);
      AtomHtmlPreviewView.__super__.constructor.apply(this, arguments);
      if (this.editorId != null) {
        this.resolveEditor(this.editorId);
        this.tmpPath = this.getPath();
      } else {
        if (atom.workspace != null) {
          this.subscribeToFilePath(filePath);
        } else {
          atom.packages.onDidActivatePackage((function(_this) {
            return function() {
              return _this.subscribeToFilePath(filePath);
            };
          })(this));
        }
      }
      handles = $("atom-pane-resize-handle");
      handles.on('mousedown', (function(_this) {
        return function() {
          return _this.onStartedResize();
        };
      })(this));
      this.find('.show-error').hide();
      this.webview = this.htmlview[0];
      this.webview.addEventListener('dom-ready', (function(_this) {
        return function() {
          _this.webviewElementLoaded = true;
          if (_this.renderLater) {
            _this.renderLater = false;
            return _this.renderHTMLCode();
          }
        };
      })(this));
    }

    AtomHtmlPreviewView.prototype.onStartedResize = function() {
      this.css({
        'pointer-events': 'none'
      });
      return document.addEventListener('mouseup', this.onStoppedResizing.bind(this));
    };

    AtomHtmlPreviewView.prototype.onStoppedResizing = function() {
      this.css({
        'pointer-events': 'all'
      });
      return document.removeEventListener('mouseup', this.onStoppedResizing);
    };

    AtomHtmlPreviewView.prototype.serialize = function() {
      return {
        deserializer: 'AtomHtmlPreviewView',
        filePath: this.getPath(),
        editorId: this.editorId
      };
    };

    AtomHtmlPreviewView.prototype.destroy = function() {
      if (this.editorSub != null) {
        return this.editorSub.dispose();
      }
    };

    AtomHtmlPreviewView.prototype.subscribeToFilePath = function(filePath) {
      this.trigger('title-changed');
      this.handleEvents();
      return this.renderHTML();
    };

    AtomHtmlPreviewView.prototype.resolveEditor = function(editorId) {
      var resolve;
      resolve = (function(_this) {
        return function() {
          var ref2, ref3;
          _this.editor = _this.editorForId(editorId);
          if (_this.editor != null) {
            if (_this.editor != null) {
              _this.trigger('title-changed');
            }
            return _this.handleEvents();
          } else {
            return (ref2 = atom.workspace) != null ? (ref3 = ref2.paneForItem(_this)) != null ? ref3.destroyItem(_this) : void 0 : void 0;
          }
        };
      })(this);
      if (atom.workspace != null) {
        return resolve();
      } else {
        return atom.packages.onDidActivatePackage((function(_this) {
          return function() {
            resolve();
            return _this.renderHTML();
          };
        })(this));
      }
    };

    AtomHtmlPreviewView.prototype.editorForId = function(editorId) {
      var editor, i, len, ref2, ref3;
      ref2 = atom.workspace.getTextEditors();
      for (i = 0, len = ref2.length; i < len; i++) {
        editor = ref2[i];
        if (((ref3 = editor.id) != null ? ref3.toString() : void 0) === editorId.toString()) {
          return editor;
        }
      }
      return null;
    };

    AtomHtmlPreviewView.prototype.handleEvents = function() {
      var changeHandler, contextMenuClientX, contextMenuClientY;
      contextMenuClientX = 0;
      contextMenuClientY = 0;
      this.on('contextmenu', function(event) {
        contextMenuClientY = event.clientY;
        return contextMenuClientX = event.clientX;
      });
      atom.commands.add(this.element, {
        'atom-html-preview:open-devtools': (function(_this) {
          return function() {
            return _this.webview.openDevTools();
          };
        })(this),
        'atom-html-preview:inspect': (function(_this) {
          return function() {
            return _this.webview.inspectElement(contextMenuClientX, contextMenuClientY);
          };
        })(this),
        'atom-html-preview:print': (function(_this) {
          return function() {
            return _this.webview.print();
          };
        })(this)
      });
      changeHandler = (function(_this) {
        return function() {
          var pane;
          _this.renderHTML();
          pane = atom.workspace.paneForURI(_this.getURI());
          if ((pane != null) && pane !== atom.workspace.getActivePane()) {
            return pane.activateItem(_this);
          }
        };
      })(this);
      this.editorSub = new CompositeDisposable;
      if (this.editor != null) {
        if (atom.config.get("atom-html-preview.triggerOnSave")) {
          this.editorSub.add(this.editor.onDidSave(changeHandler));
        } else {
          this.editorSub.add(this.editor.onDidStopChanging(changeHandler));
        }
        return this.editorSub.add(this.editor.onDidChangePath((function(_this) {
          return function() {
            return _this.trigger('title-changed');
          };
        })(this)));
      }
    };

    AtomHtmlPreviewView.prototype.renderHTML = function() {
      if (this.editor != null) {
        if (!atom.config.get("atom-html-preview.triggerOnSave") && (this.editor.getPath() != null)) {
          return this.save(this.renderHTMLCode);
        } else {
          return this.renderHTMLCode();
        }
      }
    };

    AtomHtmlPreviewView.prototype.save = function(callback) {
      var after, afterHeadPos, baseText, before, column, editorText, error, fileEnding, findTagBefore, firstSelection, lastTagRE, matchedHead, offset, out, outPath, ref2, row, tagIndex, tagRE;
      outPath = path.resolve(path.join(os.tmpdir(), this.editor.getTitle() + ".html"));
      out = "";
      fileEnding = this.editor.getTitle().split(".").pop();
      if (atom.config.get("atom-html-preview.enableMathJax")) {
        out += "<script type=\"text/x-mathjax-config\">\nMathJax.Hub.Config({\ntex2jax: {inlineMath: [['\\\\f$','\\\\f$']]},\nmenuSettings: {zoom: 'Click'}\n});\n</script>\n<script type=\"text/javascript\"\nsrc=\"http://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML\">\n</script>";
      }
      if (atom.config.get("atom-html-preview.preserveWhiteSpaces") && indexOf.call(atom.config.get("atom-html-preview.fileEndings"), fileEnding) >= 0) {
        out += "<style type=\"text/css\">\nbody { white-space: pre; }\n</style>";
      }
      editorText = this.editor.getText();
      if (atom.config.get("atom-html-preview.scrollToCursor")) {
        firstSelection = this.editor.getSelections()[0];
        ref2 = firstSelection.getBufferRange().start, row = ref2.row, column = ref2.column;
        try {
          offset = this._getOffset(editorText, row, column);
          tagRE = /<((\/[\$\w\-])|br|input|link)\/?>/.source;
          lastTagRE = RegExp(tagRE + "(?![\\s\\S]*" + tagRE + ")", "i");
          findTagBefore = function(beforeIndex) {
            var matchedClosingTag;
            matchedClosingTag = editorText.slice(0, beforeIndex).match(lastTagRE);
            if (matchedClosingTag) {
              return matchedClosingTag.index + matchedClosingTag[0].length;
            } else {
              return -1;
            }
          };
          tagIndex = findTagBefore(offset);
          if (tagIndex > -1) {
            editorText = (editorText.slice(0, tagIndex)) + "\n" + scrollInjectScript + "\n" + (editorText.slice(tagIndex));
          }
        } catch (error1) {
          error = error1;
          return -1;
        }
      }
      baseText = "<base href=\"" + this.getPath() + "\">";
      matchedHead = /<head[^>]*>/i.exec(editorText);
      if (matchedHead) {
        afterHeadPos = matchedHead.index + matchedHead[0].length;
        before = editorText.slice(0, afterHeadPos);
        after = editorText.slice(afterHeadPos);
        editorText = before + "\n" + baseText + "\n" + after;
      } else {
        out += baseText;
      }
      out += editorText;
      this.tmpPath = outPath;
      return fs.writeFile(outPath, out, (function(_this) {
        return function() {
          try {
            return _this.renderHTMLCode();
          } catch (error1) {
            error = error1;
            return _this.showError(error);
          }
        };
      })(this));
    };

    AtomHtmlPreviewView.prototype.renderHTMLCode = function() {
      this.find('.show-error').hide();
      this.htmlview.show();
      if (this.webviewElementLoaded) {
        this.webview.loadURL("file://" + this.tmpPath);
        return atom.commands.dispatch('atom-html-preview', 'html-changed');
      } else {
        return this.renderLater = true;
      }
    };

    AtomHtmlPreviewView.prototype._getOffset = function(text, row, column) {
      var line_re, match, match_index, offset;
      if (column == null) {
        column = 0;
      }
      line_re = /\n/g;
      match_index = null;
      while (row--) {
        if (match = line_re.exec(text)) {
          match_index = match.index;
        } else {
          return -1;
        }
      }
      offset = match_index + column;
      if (offset < text.length) {
        return offset;
      } else {
        return -1;
      }
    };

    AtomHtmlPreviewView.prototype.getTitle = function() {
      if (this.editor != null) {
        return (this.editor.getTitle()) + " Preview";
      } else {
        return "HTML Preview";
      }
    };

    AtomHtmlPreviewView.prototype.getURI = function() {
      return "html-preview://editor/" + this.editorId;
    };

    AtomHtmlPreviewView.prototype.getPath = function() {
      if (this.editor != null) {
        return this.editor.getPath();
      }
    };

    AtomHtmlPreviewView.prototype.showError = function(result) {
      var failureMessage;
      failureMessage = result != null ? result.message : void 0;
      this.htmlview.hide();
      return this.find('.show-error').html($$$(function() {
        this.h2('Previewing HTML Failed');
        if (failureMessage != null) {
          return this.h3(failureMessage);
        }
      })).show();
    };

    return AtomHtmlPreviewView;

  })(ScrollView);

}).call(this);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZmlsZTovLy9DOi9Vc2Vycy9ja25qdS8uYXRvbS9wYWNrYWdlcy9hdG9tLWh0bWwtcHJldmlldy9saWIvYXRvbS1odG1sLXByZXZpZXctdmlldy5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQSxNQUFBLHFIQUFBO0lBQUE7Ozs7O0VBQUEsRUFBQSxHQUF3QixPQUFBLENBQVEsSUFBUjs7RUFDeEIsTUFBb0MsT0FBQSxDQUFRLE1BQVIsQ0FBcEMsRUFBQyw2Q0FBRCxFQUFzQjs7RUFDdEIsT0FBd0IsT0FBQSxDQUFRLHNCQUFSLENBQXhCLEVBQUMsVUFBRCxFQUFJLGNBQUosRUFBUzs7RUFDVCxJQUFBLEdBQXdCLE9BQUEsQ0FBUSxNQUFSOztFQUN4QixFQUFBLEdBQXdCLE9BQUEsQ0FBUSxJQUFSOztFQUV4QixrQkFBQSxHQUFxQjs7RUF5QnJCLE1BQU0sQ0FBQyxPQUFQLEdBQ007OztJQUNKLElBQUksQ0FBQyxhQUFhLENBQUMsR0FBbkIsQ0FBdUIsbUJBQXZCOztrQ0FFQSxTQUFBLEdBQXNCOztrQ0FDdEIsZ0JBQUEsR0FBc0IsU0FBQTthQUFHLElBQUksVUFBSixDQUFBO0lBQUg7O2tDQUN0QixtQkFBQSxHQUFzQixTQUFBO2FBQUcsSUFBSSxVQUFKLENBQUE7SUFBSDs7a0NBRXRCLG9CQUFBLEdBQXVCOztrQ0FDdkIsV0FBQSxHQUFjOztJQUVkLG1CQUFDLENBQUEsV0FBRCxHQUFjLFNBQUMsS0FBRDthQUNaLElBQUksbUJBQUosQ0FBd0IsS0FBeEI7SUFEWTs7SUFHZCxtQkFBQyxDQUFBLE9BQUQsR0FBVSxTQUFBO2FBQ1IsSUFBQyxDQUFBLEdBQUQsQ0FBSztRQUFBLENBQUEsS0FBQSxDQUFBLEVBQU8sdUNBQVA7UUFBZ0QsUUFBQSxFQUFVLENBQUMsQ0FBM0Q7T0FBTCxFQUFtRSxDQUFBLFNBQUEsS0FBQTtlQUFBLFNBQUE7QUFDakUsY0FBQTtVQUFBLEtBQUEsR0FBUTtV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QSxJQUFzQixzQkFBdEI7aUJBQUEsSUFBQyxDQUFBLEVBQUQsQ0FBSSxjQUFKLEVBQUE7O01BRlEsQ0FBSixDQUROLENBSUEsQ0FBQyxJQUpELENBQUE7SUFKUzs7OztLQWpRcUI7QUFoQ2xDIiwic291cmNlc0NvbnRlbnQiOlsiZnMgICAgICAgICAgICAgICAgICAgID0gcmVxdWlyZSAnZnMnXG57Q29tcG9zaXRlRGlzcG9zYWJsZSwgRGlzcG9zYWJsZX0gPSByZXF1aXJlICdhdG9tJ1xueyQsICQkJCwgU2Nyb2xsVmlld30gID0gcmVxdWlyZSAnYXRvbS1zcGFjZS1wZW4tdmlld3MnXG5wYXRoICAgICAgICAgICAgICAgICAgPSByZXF1aXJlICdwYXRoJ1xub3MgICAgICAgICAgICAgICAgICAgID0gcmVxdWlyZSAnb3MnXG5cbnNjcm9sbEluamVjdFNjcmlwdCA9IFwiXCJcIlxuPHNjcmlwdD5cbihmdW5jdGlvbiAoKSB7XG4gIHZhciBzY3JpcHRUYWcgPSBkb2N1bWVudC5zY3JpcHRzW2RvY3VtZW50LnNjcmlwdHMubGVuZ3RoIC0gMV07XG4gIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCgpPT57XG4gICAgdmFyIGVsZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKVxuICAgIHRyeSB7XG4gICAgICAvLyBTY3JvbGwgdG8gdGhpcyBjdXJyZW50IHNjcmlwdCB0YWdcbiAgICAgIGVsZW0uc3R5bGUud2lkdGggPSAxMDBcbiAgICAgIC8vIENlbnRlciB0aGUgc2Nyb2xsWVxuICAgICAgZWxlbS5zdHlsZS5oZWlnaHQgPSBcIjIwdmhcIlxuICAgICAgZWxlbS5zdHlsZS5tYXJnaW5Ub3AgPSBcIi0yMHZoXCJcbiAgICAgIGVsZW0uc3R5bGUubWFyZ2luTGVmdCA9IC0xMDBcbiAgICAgIGVsZW0uc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIlxuICAgICAgdmFyIHBhciA9IHNjcmlwdFRhZy5wYXJlbnROb2RlXG4gICAgICBwYXIuaW5zZXJ0QmVmb3JlKGVsZW0sIHNjcmlwdFRhZylcbiAgICAgIGVsZW0uc2Nyb2xsSW50b1ZpZXcoKVxuICAgIH0gY2F0Y2ggKGVycm9yKSB7fVxuICAgIHRyeSB7IGVsZW0ucmVtb3ZlKCkgfSBjYXRjaCAoZXJyb3IpIHt9XG4gICAgdHJ5IHsgc2NyaXB0VGFnLnJlbW92ZSgpIH0gY2F0Y2ggKGVycm9yKSB7fVxuICB9LCBmYWxzZSlcbn0pKCk7XG48L3NjcmlwdD5cblwiXCJcIlxuXG5tb2R1bGUuZXhwb3J0cyA9XG5jbGFzcyBBdG9tSHRtbFByZXZpZXdWaWV3IGV4dGVuZHMgU2Nyb2xsVmlld1xuICBhdG9tLmRlc2VyaWFsaXplcnMuYWRkKHRoaXMpXG5cbiAgZWRpdG9yU3ViICAgICAgICAgICA6IG51bGxcbiAgb25EaWRDaGFuZ2VUaXRsZSAgICA6IC0+IG5ldyBEaXNwb3NhYmxlKClcbiAgb25EaWRDaGFuZ2VNb2RpZmllZCA6IC0+IG5ldyBEaXNwb3NhYmxlKClcblxuICB3ZWJ2aWV3RWxlbWVudExvYWRlZCA6IGZhbHNlXG4gIHJlbmRlckxhdGVyIDogdHJ1ZVxuXG4gIEBkZXNlcmlhbGl6ZTogKHN0YXRlKSAtPlxuICAgIG5ldyBBdG9tSHRtbFByZXZpZXdWaWV3KHN0YXRlKVxuXG4gIEBjb250ZW50OiAtPlxuICAgIEBkaXYgY2xhc3M6ICdhdG9tLWh0bWwtcHJldmlldyBuYXRpdmUta2V5LWJpbmRpbmdzJywgdGFiaW5kZXg6IC0xLCA9PlxuICAgICAgc3R5bGUgPSAnei1pbmRleDogMjsgcGFkZGluZzogMmVtOydcbiAgICAgIEBkaXYgY2xhc3M6ICdzaG93LWVycm9yJywgc3R5bGU6IHN0eWxlXG4gICAgICBAdGFnICd3ZWJ2aWV3Jywgc3JjOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnLi4vaHRtbC9sb2FkaW5nLmh0bWwnKSwgb3V0bGV0OiAnaHRtbHZpZXcnLCBkaXNhYmxld2Vic2VjdXJpdHk6J29uJywgYWxsb3dmaWxlYWNjZXNzZnJvbWZpbGVzOidvbicsIGFsbG93UG9pbnRlckxvY2s6J29uJ1xuXG4gIGNvbnN0cnVjdG9yOiAoe0BlZGl0b3JJZCwgZmlsZVBhdGh9KSAtPlxuICAgIHN1cGVyXG5cbiAgICBpZiBAZWRpdG9ySWQ/XG4gICAgICBAcmVzb2x2ZUVkaXRvcihAZWRpdG9ySWQpXG4gICAgICBAdG1wUGF0aCA9IEBnZXRQYXRoKCkgIyBhZnRlciByZXNvbHZlRWRpdG9yXG4gICAgZWxzZVxuICAgICAgaWYgYXRvbS53b3Jrc3BhY2U/XG4gICAgICAgIEBzdWJzY3JpYmVUb0ZpbGVQYXRoKGZpbGVQYXRoKVxuICAgICAgZWxzZVxuICAgICAgICAjIEBzdWJzY3JpYmUgYXRvbS5wYWNrYWdlcy5vbmNlICdhY3RpdmF0ZWQnLCA9PlxuICAgICAgICBhdG9tLnBhY2thZ2VzLm9uRGlkQWN0aXZhdGVQYWNrYWdlID0+XG4gICAgICAgICAgQHN1YnNjcmliZVRvRmlsZVBhdGgoZmlsZVBhdGgpXG5cbiAgICAjIERpc2FibGUgcG9pbnRlci1ldmVudHMgd2hpbGUgcmVzaXppbmdcbiAgICBoYW5kbGVzID0gJChcImF0b20tcGFuZS1yZXNpemUtaGFuZGxlXCIpXG4gICAgaGFuZGxlcy5vbiAnbW91c2Vkb3duJywgPT4gQG9uU3RhcnRlZFJlc2l6ZSgpXG5cbiAgICBAZmluZCgnLnNob3ctZXJyb3InKS5oaWRlKClcbiAgICBAd2VidmlldyA9IEBodG1sdmlld1swXVxuXG4gICAgQHdlYnZpZXcuYWRkRXZlbnRMaXN0ZW5lciAnZG9tLXJlYWR5JywgPT5cbiAgICAgIEB3ZWJ2aWV3RWxlbWVudExvYWRlZCA9IHRydWVcbiAgICAgIGlmIEByZW5kZXJMYXRlclxuICAgICAgICBAcmVuZGVyTGF0ZXIgPSBmYWxzZVxuICAgICAgICBAcmVuZGVySFRNTENvZGUoKVxuXG5cbiAgb25TdGFydGVkUmVzaXplOiAtPlxuICAgIEBjc3MgJ3BvaW50ZXItZXZlbnRzJzogJ25vbmUnXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lciAnbW91c2V1cCcsIEBvblN0b3BwZWRSZXNpemluZy5iaW5kIHRoaXNcblxuICBvblN0b3BwZWRSZXNpemluZzogLT5cbiAgICBAY3NzICdwb2ludGVyLWV2ZW50cyc6ICdhbGwnXG4gICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lciAnbW91c2V1cCcsIEBvblN0b3BwZWRSZXNpemluZ1xuXG4gIHNlcmlhbGl6ZTogLT5cbiAgICBkZXNlcmlhbGl6ZXIgOiAnQXRvbUh0bWxQcmV2aWV3VmlldydcbiAgICBmaWxlUGF0aCAgICAgOiBAZ2V0UGF0aCgpXG4gICAgZWRpdG9ySWQgICAgIDogQGVkaXRvcklkXG5cbiAgZGVzdHJveTogLT5cbiAgICBpZiBAZWRpdG9yU3ViP1xuICAgICAgQGVkaXRvclN1Yi5kaXNwb3NlKClcblxuICBzdWJzY3JpYmVUb0ZpbGVQYXRoOiAoZmlsZVBhdGgpIC0+XG4gICAgQHRyaWdnZXIgJ3RpdGxlLWNoYW5nZWQnXG4gICAgQGhhbmRsZUV2ZW50cygpXG4gICAgQHJlbmRlckhUTUwoKVxuXG4gIHJlc29sdmVFZGl0b3I6IChlZGl0b3JJZCkgLT5cbiAgICByZXNvbHZlID0gPT5cbiAgICAgIEBlZGl0b3IgPSBAZWRpdG9yRm9ySWQoZWRpdG9ySWQpXG5cbiAgICAgIGlmIEBlZGl0b3I/XG4gICAgICAgIEB0cmlnZ2VyICd0aXRsZS1jaGFuZ2VkJyBpZiBAZWRpdG9yP1xuICAgICAgICBAaGFuZGxlRXZlbnRzKClcbiAgICAgIGVsc2VcbiAgICAgICAgIyBUaGUgZWRpdG9yIHRoaXMgcHJldmlldyB3YXMgY3JlYXRlZCBmb3IgaGFzIGJlZW4gY2xvc2VkIHNvIGNsb3NlXG4gICAgICAgICMgdGhpcyBwcmV2aWV3IHNpbmNlIGEgcHJldmlldyBjYW5ub3QgYmUgcmVuZGVyZWQgd2l0aG91dCBhbiBlZGl0b3JcbiAgICAgICAgYXRvbS53b3Jrc3BhY2U/LnBhbmVGb3JJdGVtKHRoaXMpPy5kZXN0cm95SXRlbSh0aGlzKVxuXG4gICAgaWYgYXRvbS53b3Jrc3BhY2U/XG4gICAgICByZXNvbHZlKClcbiAgICBlbHNlXG4gICAgICAjIEBzdWJzY3JpYmUgYXRvbS5wYWNrYWdlcy5vbmNlICdhY3RpdmF0ZWQnLCA9PlxuICAgICAgYXRvbS5wYWNrYWdlcy5vbkRpZEFjdGl2YXRlUGFja2FnZSA9PlxuICAgICAgICByZXNvbHZlKClcbiAgICAgICAgQHJlbmRlckhUTUwoKVxuXG4gIGVkaXRvckZvcklkOiAoZWRpdG9ySWQpIC0+XG4gICAgZm9yIGVkaXRvciBpbiBhdG9tLndvcmtzcGFjZS5nZXRUZXh0RWRpdG9ycygpXG4gICAgICByZXR1cm4gZWRpdG9yIGlmIGVkaXRvci5pZD8udG9TdHJpbmcoKSBpcyBlZGl0b3JJZC50b1N0cmluZygpXG4gICAgbnVsbFxuXG4gIGhhbmRsZUV2ZW50czogPT5cbiAgICBjb250ZXh0TWVudUNsaWVudFggPSAwXG4gICAgY29udGV4dE1lbnVDbGllbnRZID0gMFxuXG4gICAgQG9uICdjb250ZXh0bWVudScsIChldmVudCkgLT5cbiAgICAgIGNvbnRleHRNZW51Q2xpZW50WSA9IGV2ZW50LmNsaWVudFlcbiAgICAgIGNvbnRleHRNZW51Q2xpZW50WCA9IGV2ZW50LmNsaWVudFhcblxuICAgIGF0b20uY29tbWFuZHMuYWRkIEBlbGVtZW50LFxuICAgICAgJ2F0b20taHRtbC1wcmV2aWV3Om9wZW4tZGV2dG9vbHMnOiA9PlxuICAgICAgICBAd2Vidmlldy5vcGVuRGV2VG9vbHMoKVxuICAgICAgJ2F0b20taHRtbC1wcmV2aWV3Omluc3BlY3QnOiA9PlxuICAgICAgICBAd2Vidmlldy5pbnNwZWN0RWxlbWVudChjb250ZXh0TWVudUNsaWVudFgsIGNvbnRleHRNZW51Q2xpZW50WSlcbiAgICAgICdhdG9tLWh0bWwtcHJldmlldzpwcmludCc6ID0+XG4gICAgICAgIEB3ZWJ2aWV3LnByaW50KClcblxuXG4gICAgY2hhbmdlSGFuZGxlciA9ID0+XG4gICAgICBAcmVuZGVySFRNTCgpXG4gICAgICBwYW5lID0gYXRvbS53b3Jrc3BhY2UucGFuZUZvclVSSShAZ2V0VVJJKCkpXG4gICAgICBpZiBwYW5lPyBhbmQgcGFuZSBpc250IGF0b20ud29ya3NwYWNlLmdldEFjdGl2ZVBhbmUoKVxuICAgICAgICBwYW5lLmFjdGl2YXRlSXRlbSh0aGlzKVxuXG4gICAgQGVkaXRvclN1YiA9IG5ldyBDb21wb3NpdGVEaXNwb3NhYmxlXG5cbiAgICBpZiBAZWRpdG9yP1xuICAgICAgaWYgYXRvbS5jb25maWcuZ2V0KFwiYXRvbS1odG1sLXByZXZpZXcudHJpZ2dlck9uU2F2ZVwiKVxuICAgICAgICBAZWRpdG9yU3ViLmFkZCBAZWRpdG9yLm9uRGlkU2F2ZSBjaGFuZ2VIYW5kbGVyXG4gICAgICBlbHNlXG4gICAgICAgIEBlZGl0b3JTdWIuYWRkIEBlZGl0b3Iub25EaWRTdG9wQ2hhbmdpbmcgY2hhbmdlSGFuZGxlclxuICAgICAgQGVkaXRvclN1Yi5hZGQgQGVkaXRvci5vbkRpZENoYW5nZVBhdGggPT4gQHRyaWdnZXIgJ3RpdGxlLWNoYW5nZWQnXG5cbiAgcmVuZGVySFRNTDogLT5cbiAgICBpZiBAZWRpdG9yP1xuICAgICAgaWYgbm90IGF0b20uY29uZmlnLmdldChcImF0b20taHRtbC1wcmV2aWV3LnRyaWdnZXJPblNhdmVcIikgJiYgQGVkaXRvci5nZXRQYXRoKCk/XG4gICAgICAgIEBzYXZlKEByZW5kZXJIVE1MQ29kZSlcbiAgICAgIGVsc2VcbiAgICAgICAgQHJlbmRlckhUTUxDb2RlKClcblxuICBzYXZlOiAoY2FsbGJhY2spIC0+XG4gICAgIyBUZW1wIGZpbGUgcGF0aFxuICAgIG91dFBhdGggPSBwYXRoLnJlc29sdmUgcGF0aC5qb2luKG9zLnRtcGRpcigpLCBAZWRpdG9yLmdldFRpdGxlKCkgKyBcIi5odG1sXCIpXG4gICAgb3V0ID0gXCJcIlxuICAgIGZpbGVFbmRpbmcgPSBAZWRpdG9yLmdldFRpdGxlKCkuc3BsaXQoXCIuXCIpLnBvcCgpXG5cbiAgICBpZiBhdG9tLmNvbmZpZy5nZXQoXCJhdG9tLWh0bWwtcHJldmlldy5lbmFibGVNYXRoSmF4XCIpXG4gICAgICBvdXQgKz0gXCJcIlwiXG4gICAgICA8c2NyaXB0IHR5cGU9XCJ0ZXh0L3gtbWF0aGpheC1jb25maWdcIj5cbiAgICAgIE1hdGhKYXguSHViLkNvbmZpZyh7XG4gICAgICB0ZXgyamF4OiB7aW5saW5lTWF0aDogW1snXFxcXFxcXFxmJCcsJ1xcXFxcXFxcZiQnXV19LFxuICAgICAgbWVudVNldHRpbmdzOiB7em9vbTogJ0NsaWNrJ31cbiAgICAgIH0pO1xuICAgICAgPC9zY3JpcHQ+XG4gICAgICA8c2NyaXB0IHR5cGU9XCJ0ZXh0L2phdmFzY3JpcHRcIlxuICAgICAgc3JjPVwiaHR0cDovL2Nkbi5tYXRoamF4Lm9yZy9tYXRoamF4L2xhdGVzdC9NYXRoSmF4LmpzP2NvbmZpZz1UZVgtQU1TLU1NTF9IVE1Mb3JNTUxcIj5cbiAgICAgIDwvc2NyaXB0PlxuICAgICAgXCJcIlwiXG5cbiAgICBpZiBhdG9tLmNvbmZpZy5nZXQoXCJhdG9tLWh0bWwtcHJldmlldy5wcmVzZXJ2ZVdoaXRlU3BhY2VzXCIpIGFuZCBmaWxlRW5kaW5nIGluIGF0b20uY29uZmlnLmdldChcImF0b20taHRtbC1wcmV2aWV3LmZpbGVFbmRpbmdzXCIpXG4gICAgICAjIEVuY2xvc2UgaW4gPHByZT4gc3RhdGVtZW50IHRvIHByZXNlcnZlIHdoaXRlc3BhY2VzXG4gICAgICBvdXQgKz0gXCJcIlwiXG4gICAgICA8c3R5bGUgdHlwZT1cInRleHQvY3NzXCI+XG4gICAgICBib2R5IHsgd2hpdGUtc3BhY2U6IHByZTsgfVxuICAgICAgPC9zdHlsZT5cbiAgICAgIFwiXCJcIlxuXG4gICAgZWRpdG9yVGV4dCA9IEBlZGl0b3IuZ2V0VGV4dCgpXG5cbiAgICAjIFNjcm9sbCBpbnRvIHZpZXdcblxuICAgIGlmIGF0b20uY29uZmlnLmdldChcImF0b20taHRtbC1wcmV2aWV3LnNjcm9sbFRvQ3Vyc29yXCIpXG4gICAgICBmaXJzdFNlbGVjdGlvbiA9IHRoaXMuZWRpdG9yLmdldFNlbGVjdGlvbnMoKVswXVxuICAgICAgeyByb3csIGNvbHVtbiB9ID0gZmlyc3RTZWxlY3Rpb24uZ2V0QnVmZmVyUmFuZ2UoKS5zdGFydFxuXG4gICAgICB0cnlcbiAgICAgICAgb2Zmc2V0ID0gQF9nZXRPZmZzZXQoZWRpdG9yVGV4dCwgcm93LCBjb2x1bW4pXG5cbiAgICAgICAgdGFnUkUgPSAvPCgoXFwvW1xcJFxcd1xcLV0pfGJyfGlucHV0fGxpbmspXFwvPz4vLnNvdXJjZVxuICAgICAgICBsYXN0VGFnUkU9IC8vLyN7dGFnUkV9KD8hW1xcc1xcU10qI3t0YWdSRX0pLy8vaVxuICAgICAgICBmaW5kVGFnQmVmb3JlID0gKGJlZm9yZUluZGV4KSAtPlxuICAgICAgICAgICNzYW1wbGUgPSBlZGl0b3JUZXh0LnNsaWNlKHN0YXJ0SW5kZXgsIHN0YXJ0SW5kZXggKyAzMDApXG4gICAgICAgICAgbWF0Y2hlZENsb3NpbmdUYWcgPSBlZGl0b3JUZXh0LnNsaWNlKDAsIGJlZm9yZUluZGV4KS5tYXRjaChsYXN0VGFnUkUpXG4gICAgICAgICAgaWYgbWF0Y2hlZENsb3NpbmdUYWdcbiAgICAgICAgICAgIHJldHVybiBtYXRjaGVkQ2xvc2luZ1RhZy5pbmRleCArIG1hdGNoZWRDbG9zaW5nVGFnWzBdLmxlbmd0aFxuICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgIHJldHVybiAtMVxuXG4gICAgICAgIHRhZ0luZGV4ID0gZmluZFRhZ0JlZm9yZShvZmZzZXQpXG4gICAgICAgIGlmIHRhZ0luZGV4ID4gLTFcbiAgICAgICAgICBlZGl0b3JUZXh0ID0gXCJcIlwiXG4gICAgICAgICAgI3tlZGl0b3JUZXh0LnNsaWNlKDAsIHRhZ0luZGV4KX1cbiAgICAgICAgICAje3Njcm9sbEluamVjdFNjcmlwdH1cbiAgICAgICAgICAje2VkaXRvclRleHQuc2xpY2UodGFnSW5kZXgpfVxuICAgICAgICAgIFwiXCJcIlxuXG4gICAgICBjYXRjaCBlcnJvclxuICAgICAgICByZXR1cm4gLTFcblxuICAgICMgQWRkIGJhc2UgdGFnOyBhbGxvdyByZWxhdGl2ZSBsaW5rcyB0byB3b3JrIGRlc3BpdGUgYmVpbmcgbG9hZGVkXG4gICAgIyBhcyB0aGUgc3JjIG9mIGFuIHdlYnZpZXdcblxuICAgIGJhc2VUZXh0ID0gXCI8YmFzZSBocmVmPVxcXCJcIiArIEBnZXRQYXRoKCkgKyBcIlxcXCI+XCJcblxuICAgIG1hdGNoZWRIZWFkID0gLzxoZWFkW14+XSo+L2kuZXhlYyhlZGl0b3JUZXh0KVxuXG4gICAgaWYgbWF0Y2hlZEhlYWRcbiAgICAgIGFmdGVySGVhZFBvcyA9IG1hdGNoZWRIZWFkLmluZGV4ICsgbWF0Y2hlZEhlYWRbMF0ubGVuZ3RoXG4gICAgICBiZWZvcmUgPSBlZGl0b3JUZXh0LnNsaWNlKDAsIGFmdGVySGVhZFBvcylcbiAgICAgIGFmdGVyID0gZWRpdG9yVGV4dC5zbGljZShhZnRlckhlYWRQb3MpXG4gICAgICBlZGl0b3JUZXh0ID0gXCJcIlwiXG4gICAgICAgICN7YmVmb3JlfVxuICAgICAgICAje2Jhc2VUZXh0fVxuICAgICAgICAje2FmdGVyfVxuICAgICAgICBcIlwiXCJcbiAgICBlbHNlXG4gICAgICBvdXQgKz0gYmFzZVRleHRcblxuICAgIG91dCArPSBlZGl0b3JUZXh0XG5cbiAgICBAdG1wUGF0aCA9IG91dFBhdGhcbiAgICBmcy53cml0ZUZpbGUgb3V0UGF0aCwgb3V0LCA9PlxuICAgICAgdHJ5XG4gICAgICAgIEByZW5kZXJIVE1MQ29kZSgpXG4gICAgICBjYXRjaCBlcnJvclxuICAgICAgICBAc2hvd0Vycm9yIGVycm9yXG5cbiAgcmVuZGVySFRNTENvZGU6ICgpIC0+XG4gICAgQGZpbmQoJy5zaG93LWVycm9yJykuaGlkZSgpXG4gICAgQGh0bWx2aWV3LnNob3coKVxuXG4gICAgaWYgQHdlYnZpZXdFbGVtZW50TG9hZGVkXG4gICAgICBAd2Vidmlldy5sb2FkVVJMKFwiZmlsZTovL1wiICsgQHRtcFBhdGgpXG5cbiAgICAgIGF0b20uY29tbWFuZHMuZGlzcGF0Y2ggJ2F0b20taHRtbC1wcmV2aWV3JywgJ2h0bWwtY2hhbmdlZCdcbiAgICBlbHNlXG4gICAgICBAcmVuZGVyTGF0ZXIgPSB0cnVlXG5cbiAgIyBHZXQgdGhlIG9mZnNldCBvZiBhIGZpbGUgYXQgYSBzcGVjaWZpYyBQb2ludCBpbiB0aGUgZmlsZVxuICBfZ2V0T2Zmc2V0OiAodGV4dCwgcm93LCBjb2x1bW49MCkgLT5cbiAgICBsaW5lX3JlID0gL1xcbi9nXG4gICAgbWF0Y2hfaW5kZXggPSBudWxsXG4gICAgd2hpbGUgcm93LS1cbiAgICAgIGlmIG1hdGNoID0gbGluZV9yZS5leGVjKHRleHQpXG4gICAgICAgIG1hdGNoX2luZGV4ID0gbWF0Y2guaW5kZXhcbiAgICAgIGVsc2VcbiAgICAgICAgcmV0dXJuIC0xXG4gICAgb2Zmc2V0ID0gbWF0Y2hfaW5kZXggKyBjb2x1bW5cbiAgICByZXR1cm4gaWYgb2Zmc2V0IDwgdGV4dC5sZW5ndGggdGhlbiBvZmZzZXQgZWxzZSAtMVxuXG5cbiAgZ2V0VGl0bGU6IC0+XG4gICAgaWYgQGVkaXRvcj9cbiAgICAgIFwiI3tAZWRpdG9yLmdldFRpdGxlKCl9IFByZXZpZXdcIlxuICAgIGVsc2VcbiAgICAgIFwiSFRNTCBQcmV2aWV3XCJcblxuICBnZXRVUkk6IC0+XG4gICAgXCJodG1sLXByZXZpZXc6Ly9lZGl0b3IvI3tAZWRpdG9ySWR9XCJcblxuICBnZXRQYXRoOiAtPlxuICAgIGlmIEBlZGl0b3I/XG4gICAgICBAZWRpdG9yLmdldFBhdGgoKVxuXG4gIHNob3dFcnJvcjogKHJlc3VsdCkgLT5cbiAgICBmYWlsdXJlTWVzc2FnZSA9IHJlc3VsdD8ubWVzc2FnZVxuXG4gICAgQGh0bWx2aWV3LmhpZGUoKVxuICAgIEBmaW5kKCcuc2hvdy1lcnJvcicpXG4gICAgLmh0bWwgJCQkIC0+XG4gICAgICBAaDIgJ1ByZXZpZXdpbmcgSFRNTCBGYWlsZWQnXG4gICAgICBAaDMgZmFpbHVyZU1lc3NhZ2UgaWYgZmFpbHVyZU1lc3NhZ2U/XG4gICAgLnNob3coKVxuIl19
