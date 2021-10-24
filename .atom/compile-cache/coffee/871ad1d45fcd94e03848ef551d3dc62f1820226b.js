(function() {
  var CompositeDisposable, HtmlPreviewView, url;

  url = require('url');

  CompositeDisposable = require('atom').CompositeDisposable;

  HtmlPreviewView = require('./atom-html-preview-view');

  module.exports = {
    config: {
      triggerOnSave: {
        type: 'boolean',
        description: 'Watch will trigger on save.',
        "default": false
      },
      preserveWhiteSpaces: {
        type: 'boolean',
        description: 'Preserve white spaces and line endings.',
        "default": false
      },
      fileEndings: {
        type: 'array',
        title: 'Preserve file endings',
        description: 'File endings to preserve',
        "default": ["c", "h"],
        items: {
          type: 'string'
        }
      },
      scrollToCursor: {
        type: 'boolean',
        description: 'Attempts to scroll the webview to the section of your HTML you are editing based on your cursor\'s position.',
        "default": false
      },
      enableMathJax: {
        type: 'boolean',
        description: 'Enable MathJax inline rendering \\f$ \\pi \\f$',
        "default": false
      }
    },
    htmlPreviewView: null,
    activate: function(state) {
      this.subscriptions = new CompositeDisposable;
      this.subscriptions.add(atom.workspace.observeTextEditors((function(_this) {
        return function(editor) {
          return _this.subscriptions.add(editor.onDidSave(function() {
            if ((typeof htmlPreviewView !== "undefined" && htmlPreviewView !== null) && htmlPreviewView instanceof HtmlPreviewView) {
              return htmlPreviewView.renderHTML();
            }
          }));
        };
      })(this)));
      this.subscriptions.add(atom.commands.add('atom-workspace', {
        'atom-html-preview:toggle': (function(_this) {
          return function() {
            return _this.toggle();
          };
        })(this)
      }));
      return atom.workspace.addOpener(function(uriToOpen) {
        var error, host, pathname, protocol, ref;
        try {
          ref = url.parse(uriToOpen), protocol = ref.protocol, host = ref.host, pathname = ref.pathname;
        } catch (error1) {
          error = error1;
          return;
        }
        if (protocol !== 'html-preview:') {
          return;
        }
        try {
          if (pathname) {
            pathname = decodeURI(pathname);
          }
        } catch (error1) {
          error = error1;
          return;
        }
        if (host === 'editor') {
          this.htmlPreviewView = new HtmlPreviewView({
            editorId: pathname.substring(1)
          });
        } else {
          this.htmlPreviewView = new HtmlPreviewView({
            filePath: pathname
          });
        }
        return htmlPreviewView;
      });
    },
    toggle: function() {
      var editor, previewPane, previousActivePane, uri;
      editor = atom.workspace.getActiveTextEditor();
      if (editor == null) {
        return;
      }
      uri = "html-preview://editor/" + editor.id;
      previewPane = atom.workspace.paneForURI(uri);
      if (previewPane) {
        previewPane.destroyItem(previewPane.itemForURI(uri));
        return;
      }
      previousActivePane = atom.workspace.getActivePane();
      return atom.workspace.open(uri, {
        split: 'right',
        searchAllPanes: true
      }).then(function(htmlPreviewView) {
        if (htmlPreviewView instanceof HtmlPreviewView) {
          htmlPreviewView.renderHTML();
          return previousActivePane.activate();
        }
      });
    },
    deactivate: function() {
      return this.subscriptions.dispose();
    }
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZmlsZTovLy9DOi9Vc2Vycy9ja25qdS8uYXRvbS9wYWNrYWdlcy9hdG9tLWh0bWwtcHJldmlldy9saWIvYXRvbS1odG1sLXByZXZpZXcuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQUEsTUFBQTs7RUFBQSxHQUFBLEdBQXdCLE9BQUEsQ0FBUSxLQUFSOztFQUN2QixzQkFBdUIsT0FBQSxDQUFRLE1BQVI7O0VBRXhCLGVBQUEsR0FBd0IsT0FBQSxDQUFRLDBCQUFSOztFQUV4QixNQUFNLENBQUMsT0FBUCxHQUNFO0lBQUEsTUFBQSxFQUNFO01BQUEsYUFBQSxFQUNFO1FBQUEsSUFBQSxFQUFNLFNBQU47UUFDQSxXQUFBLEVBQWEsNkJBRGI7UUFFQSxDQUFBLE9BQUEsQ0FBQSxFQUFTLEtBRlQ7T0FERjtNQUlBLG1CQUFBLEVBQ0U7UUFBQSxJQUFBLEVBQU0sU0FBTjtRQUNBLFdBQUEsRUFBYSx5Q0FEYjtRQUVBLENBQUEsT0FBQSxDQUFBLEVBQVMsS0FGVDtPQUxGO01BUUEsV0FBQSxFQUNFO1FBQUEsSUFBQSxFQUFNLE9BQU47UUFDQSxLQUFBLEVBQU8sdUJBRFA7UUFFQSxXQUFBLEVBQWEsMEJBRmI7UUFHQSxDQUFBLE9BQUEsQ0FBQSxFQUFTLENBQUMsR0FBRCxFQUFNLEdBQU4sQ0FIVDtRQUlBLEtBQUEsRUFDRTtVQUFBLElBQUEsRUFBTSxRQUFOO1NBTEY7T0FURjtNQWVBLGNBQUEsRUFDRTtRQUFBLElBQUEsRUFBTSxTQUFOO1FBQ0EsV0FBQSxFQUFhLDhHQURiO1FBRUEsQ0FBQSxPQUFBLENBQUEsRUFBUyxLQUZUO09BaEJGO01BbUJBLGFBQUEsRUFDRTtRQUFBLElBQUEsRUFBTSxTQUFOO1FBQ0EsV0FBQSxFQUFhLGdEQURiO1FBRUEsQ0FBQSxPQUFBLENBQUEsRUFBUyxLQUZUO09BcEJGO0tBREY7SUF5QkEsZUFBQSxFQUFpQixJQXpCakI7SUEyQkEsUUFBQSxFQUFVLFNBQUMsS0FBRDtNQUVSLElBQUMsQ0FBQSxhQUFELEdBQWlCLElBQUk7TUFFckIsSUFBQyxDQUFBLGFBQWEsQ0FBQyxHQUFmLENBQW1CLElBQUksQ0FBQyxTQUFTLENBQUMsa0JBQWYsQ0FBa0MsQ0FBQSxTQUFBLEtBQUE7ZUFBQSxTQUFDLE1BQUQ7aUJBQ25ELEtBQUMsQ0FBQSxhQUFhLENBQUMsR0FBZixDQUFtQixNQUFNLENBQUMsU0FBUCxDQUFpQixTQUFBO1lBQ2xDLElBQUcsb0VBQUEsSUFBcUIsZUFBQSxZQUEyQixlQUFuRDtxQkFDRSxlQUFlLENBQUMsVUFBaEIsQ0FBQSxFQURGOztVQURrQyxDQUFqQixDQUFuQjtRQURtRDtNQUFBLENBQUEsQ0FBQSxDQUFBLElBQUEsQ0FBbEMsQ0FBbkI7TUFNQSxJQUFDLENBQUEsYUFBYSxDQUFDLEdBQWYsQ0FBbUIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFkLENBQWtCLGdCQUFsQixFQUFvQztRQUFBLDBCQUFBLEVBQTRCLENBQUEsU0FBQSxLQUFBO2lCQUFBLFNBQUE7bUJBQUcsS0FBQyxDQUFBLE1BQUQsQ0FBQTtVQUFIO1FBQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUE1QjtPQUFwQyxDQUFuQjthQUVBLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBZixDQUF5QixTQUFDLFNBQUQ7QUFDdkIsWUFBQTtBQUFBO1VBQ0UsTUFBNkIsR0FBRyxDQUFDLEtBQUosQ0FBVSxTQUFWLENBQTdCLEVBQUMsdUJBQUQsRUFBVyxlQUFYLEVBQWlCLHdCQURuQjtTQUFBLGNBQUE7VUFFTTtBQUNKLGlCQUhGOztRQUtBLElBQWMsUUFBQSxLQUFZLGVBQTFCO0FBQUEsaUJBQUE7O0FBRUE7VUFDRSxJQUFrQyxRQUFsQztZQUFBLFFBQUEsR0FBVyxTQUFBLENBQVUsUUFBVixFQUFYO1dBREY7U0FBQSxjQUFBO1VBRU07QUFDSixpQkFIRjs7UUFLQSxJQUFHLElBQUEsS0FBUSxRQUFYO1VBQ0UsSUFBQyxDQUFBLGVBQUQsR0FBbUIsSUFBSSxlQUFKLENBQW9CO1lBQUEsUUFBQSxFQUFVLFFBQVEsQ0FBQyxTQUFULENBQW1CLENBQW5CLENBQVY7V0FBcEIsRUFEckI7U0FBQSxNQUFBO1VBR0UsSUFBQyxDQUFBLGVBQUQsR0FBbUIsSUFBSSxlQUFKLENBQW9CO1lBQUEsUUFBQSxFQUFVLFFBQVY7V0FBcEIsRUFIckI7O0FBS0EsZUFBTztNQWxCZ0IsQ0FBekI7SUFaUSxDQTNCVjtJQTJEQSxNQUFBLEVBQVEsU0FBQTtBQUNOLFVBQUE7TUFBQSxNQUFBLEdBQVMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxtQkFBZixDQUFBO01BQ1QsSUFBYyxjQUFkO0FBQUEsZUFBQTs7TUFFQSxHQUFBLEdBQU0sd0JBQUEsR0FBeUIsTUFBTSxDQUFDO01BRXRDLFdBQUEsR0FBYyxJQUFJLENBQUMsU0FBUyxDQUFDLFVBQWYsQ0FBMEIsR0FBMUI7TUFDZCxJQUFHLFdBQUg7UUFDRSxXQUFXLENBQUMsV0FBWixDQUF3QixXQUFXLENBQUMsVUFBWixDQUF1QixHQUF2QixDQUF4QjtBQUNBLGVBRkY7O01BSUEsa0JBQUEsR0FBcUIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxhQUFmLENBQUE7YUFDckIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFmLENBQW9CLEdBQXBCLEVBQXlCO1FBQUEsS0FBQSxFQUFPLE9BQVA7UUFBZ0IsY0FBQSxFQUFnQixJQUFoQztPQUF6QixDQUE4RCxDQUFDLElBQS9ELENBQW9FLFNBQUMsZUFBRDtRQUNsRSxJQUFHLGVBQUEsWUFBMkIsZUFBOUI7VUFDRSxlQUFlLENBQUMsVUFBaEIsQ0FBQTtpQkFDQSxrQkFBa0IsQ0FBQyxRQUFuQixDQUFBLEVBRkY7O01BRGtFLENBQXBFO0lBWk0sQ0EzRFI7SUE0RUEsVUFBQSxFQUFZLFNBQUE7YUFDVixJQUFDLENBQUEsYUFBYSxDQUFDLE9BQWYsQ0FBQTtJQURVLENBNUVaOztBQU5GIiwic291cmNlc0NvbnRlbnQiOlsidXJsICAgICAgICAgICAgICAgICAgID0gcmVxdWlyZSAndXJsJ1xue0NvbXBvc2l0ZURpc3Bvc2FibGV9ID0gcmVxdWlyZSAnYXRvbSdcblxuSHRtbFByZXZpZXdWaWV3ICAgICAgID0gcmVxdWlyZSAnLi9hdG9tLWh0bWwtcHJldmlldy12aWV3J1xuXG5tb2R1bGUuZXhwb3J0cyA9XG4gIGNvbmZpZzpcbiAgICB0cmlnZ2VyT25TYXZlOlxuICAgICAgdHlwZTogJ2Jvb2xlYW4nXG4gICAgICBkZXNjcmlwdGlvbjogJ1dhdGNoIHdpbGwgdHJpZ2dlciBvbiBzYXZlLidcbiAgICAgIGRlZmF1bHQ6IGZhbHNlXG4gICAgcHJlc2VydmVXaGl0ZVNwYWNlczpcbiAgICAgIHR5cGU6ICdib29sZWFuJ1xuICAgICAgZGVzY3JpcHRpb246ICdQcmVzZXJ2ZSB3aGl0ZSBzcGFjZXMgYW5kIGxpbmUgZW5kaW5ncy4nXG4gICAgICBkZWZhdWx0OiBmYWxzZVxuICAgIGZpbGVFbmRpbmdzOlxuICAgICAgdHlwZTogJ2FycmF5J1xuICAgICAgdGl0bGU6ICdQcmVzZXJ2ZSBmaWxlIGVuZGluZ3MnXG4gICAgICBkZXNjcmlwdGlvbjogJ0ZpbGUgZW5kaW5ncyB0byBwcmVzZXJ2ZSdcbiAgICAgIGRlZmF1bHQ6IFtcImNcIiwgXCJoXCJdXG4gICAgICBpdGVtczpcbiAgICAgICAgdHlwZTogJ3N0cmluZydcbiAgICBzY3JvbGxUb0N1cnNvcjpcbiAgICAgIHR5cGU6ICdib29sZWFuJ1xuICAgICAgZGVzY3JpcHRpb246ICdBdHRlbXB0cyB0byBzY3JvbGwgdGhlIHdlYnZpZXcgdG8gdGhlIHNlY3Rpb24gb2YgeW91ciBIVE1MIHlvdSBhcmUgZWRpdGluZyBiYXNlZCBvbiB5b3VyIGN1cnNvclxcJ3MgcG9zaXRpb24uJ1xuICAgICAgZGVmYXVsdDogZmFsc2VcbiAgICBlbmFibGVNYXRoSmF4OlxuICAgICAgdHlwZTogJ2Jvb2xlYW4nXG4gICAgICBkZXNjcmlwdGlvbjogJ0VuYWJsZSBNYXRoSmF4IGlubGluZSByZW5kZXJpbmcgXFxcXGYkIFxcXFxwaSBcXFxcZiQnXG4gICAgICBkZWZhdWx0OiBmYWxzZVxuXG4gIGh0bWxQcmV2aWV3VmlldzogbnVsbFxuXG4gIGFjdGl2YXRlOiAoc3RhdGUpIC0+XG4gICAgIyBFdmVudHMgc3Vic2NyaWJlZCB0byBpbiBhdG9tJ3Mgc3lzdGVtIGNhbiBiZSBlYXNpbHkgY2xlYW5lZCB1cCB3aXRoIGEgQ29tcG9zaXRlRGlzcG9zYWJsZVxuICAgIEBzdWJzY3JpcHRpb25zID0gbmV3IENvbXBvc2l0ZURpc3Bvc2FibGVcblxuICAgIEBzdWJzY3JpcHRpb25zLmFkZCBhdG9tLndvcmtzcGFjZS5vYnNlcnZlVGV4dEVkaXRvcnMgKGVkaXRvcikgPT5cbiAgICAgIEBzdWJzY3JpcHRpb25zLmFkZCBlZGl0b3Iub25EaWRTYXZlID0+XG4gICAgICAgIGlmIGh0bWxQcmV2aWV3Vmlldz8gYW5kIGh0bWxQcmV2aWV3VmlldyBpbnN0YW5jZW9mIEh0bWxQcmV2aWV3Vmlld1xuICAgICAgICAgIGh0bWxQcmV2aWV3Vmlldy5yZW5kZXJIVE1MKClcblxuICAgICMgUmVnaXN0ZXIgY29tbWFuZCB0aGF0IHRvZ2dsZXMgdGhpcyB2aWV3XG4gICAgQHN1YnNjcmlwdGlvbnMuYWRkIGF0b20uY29tbWFuZHMuYWRkICdhdG9tLXdvcmtzcGFjZScsICdhdG9tLWh0bWwtcHJldmlldzp0b2dnbGUnOiA9PiBAdG9nZ2xlKClcblxuICAgIGF0b20ud29ya3NwYWNlLmFkZE9wZW5lciAodXJpVG9PcGVuKSAtPlxuICAgICAgdHJ5XG4gICAgICAgIHtwcm90b2NvbCwgaG9zdCwgcGF0aG5hbWV9ID0gdXJsLnBhcnNlKHVyaVRvT3BlbilcbiAgICAgIGNhdGNoIGVycm9yXG4gICAgICAgIHJldHVyblxuXG4gICAgICByZXR1cm4gdW5sZXNzIHByb3RvY29sIGlzICdodG1sLXByZXZpZXc6J1xuXG4gICAgICB0cnlcbiAgICAgICAgcGF0aG5hbWUgPSBkZWNvZGVVUkkocGF0aG5hbWUpIGlmIHBhdGhuYW1lXG4gICAgICBjYXRjaCBlcnJvclxuICAgICAgICByZXR1cm5cblxuICAgICAgaWYgaG9zdCBpcyAnZWRpdG9yJ1xuICAgICAgICBAaHRtbFByZXZpZXdWaWV3ID0gbmV3IEh0bWxQcmV2aWV3VmlldyhlZGl0b3JJZDogcGF0aG5hbWUuc3Vic3RyaW5nKDEpKVxuICAgICAgZWxzZVxuICAgICAgICBAaHRtbFByZXZpZXdWaWV3ID0gbmV3IEh0bWxQcmV2aWV3VmlldyhmaWxlUGF0aDogcGF0aG5hbWUpXG5cbiAgICAgIHJldHVybiBodG1sUHJldmlld1ZpZXdcblxuICB0b2dnbGU6IC0+XG4gICAgZWRpdG9yID0gYXRvbS53b3Jrc3BhY2UuZ2V0QWN0aXZlVGV4dEVkaXRvcigpXG4gICAgcmV0dXJuIHVubGVzcyBlZGl0b3I/XG5cbiAgICB1cmkgPSBcImh0bWwtcHJldmlldzovL2VkaXRvci8je2VkaXRvci5pZH1cIlxuXG4gICAgcHJldmlld1BhbmUgPSBhdG9tLndvcmtzcGFjZS5wYW5lRm9yVVJJKHVyaSlcbiAgICBpZiBwcmV2aWV3UGFuZVxuICAgICAgcHJldmlld1BhbmUuZGVzdHJveUl0ZW0ocHJldmlld1BhbmUuaXRlbUZvclVSSSh1cmkpKVxuICAgICAgcmV0dXJuXG5cbiAgICBwcmV2aW91c0FjdGl2ZVBhbmUgPSBhdG9tLndvcmtzcGFjZS5nZXRBY3RpdmVQYW5lKClcbiAgICBhdG9tLndvcmtzcGFjZS5vcGVuKHVyaSwgc3BsaXQ6ICdyaWdodCcsIHNlYXJjaEFsbFBhbmVzOiB0cnVlKS50aGVuIChodG1sUHJldmlld1ZpZXcpIC0+XG4gICAgICBpZiBodG1sUHJldmlld1ZpZXcgaW5zdGFuY2VvZiBIdG1sUHJldmlld1ZpZXdcbiAgICAgICAgaHRtbFByZXZpZXdWaWV3LnJlbmRlckhUTUwoKVxuICAgICAgICBwcmV2aW91c0FjdGl2ZVBhbmUuYWN0aXZhdGUoKVxuXG4gIGRlYWN0aXZhdGU6IC0+XG4gICAgQHN1YnNjcmlwdGlvbnMuZGlzcG9zZSgpXG4iXX0=
