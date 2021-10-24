(function() {
  var AskStackView;

  AskStackView = require('./ask-stack-view');

  module.exports = {
    config: {
      autoDetectLanguage: true
    },
    askStackView: null,
    activate: function(state) {
      return this.askStackView = new AskStackView(state.askStackViewState);
    },
    deactivate: function() {
      return this.askStackView.destroy();
    },
    serialize: function() {
      return {
        askStackViewState: this.askStackView.serialize()
      };
    }
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZmlsZTovLy9DOi9Vc2Vycy9ja25qdS8uYXRvbS9wYWNrYWdlcy9hc2stc3RhY2svbGliL2Fzay1zdGFjay5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQSxNQUFBOztFQUFBLFlBQUEsR0FBZSxPQUFBLENBQVEsa0JBQVI7O0VBRWYsTUFBTSxDQUFDLE9BQVAsR0FDRTtJQUFBLE1BQUEsRUFDRTtNQUFBLGtCQUFBLEVBQW9CLElBQXBCO0tBREY7SUFFQSxZQUFBLEVBQWMsSUFGZDtJQUlBLFFBQUEsRUFBVSxTQUFDLEtBQUQ7YUFDUixJQUFDLENBQUEsWUFBRCxHQUFnQixJQUFJLFlBQUosQ0FBaUIsS0FBSyxDQUFDLGlCQUF2QjtJQURSLENBSlY7SUFPQSxVQUFBLEVBQVksU0FBQTthQUNWLElBQUMsQ0FBQSxZQUFZLENBQUMsT0FBZCxDQUFBO0lBRFUsQ0FQWjtJQVVBLFNBQUEsRUFBVyxTQUFBO2FBQ1Q7UUFBQSxpQkFBQSxFQUFtQixJQUFDLENBQUEsWUFBWSxDQUFDLFNBQWQsQ0FBQSxDQUFuQjs7SUFEUyxDQVZYOztBQUhGIiwic291cmNlc0NvbnRlbnQiOlsiQXNrU3RhY2tWaWV3ID0gcmVxdWlyZSAnLi9hc2stc3RhY2stdmlldydcblxubW9kdWxlLmV4cG9ydHMgPVxuICBjb25maWc6XG4gICAgYXV0b0RldGVjdExhbmd1YWdlOiB0cnVlXG4gIGFza1N0YWNrVmlldzogbnVsbFxuXG4gIGFjdGl2YXRlOiAoc3RhdGUpIC0+XG4gICAgQGFza1N0YWNrVmlldyA9IG5ldyBBc2tTdGFja1ZpZXcoc3RhdGUuYXNrU3RhY2tWaWV3U3RhdGUpXG5cbiAgZGVhY3RpdmF0ZTogLT5cbiAgICBAYXNrU3RhY2tWaWV3LmRlc3Ryb3koKVxuXG4gIHNlcmlhbGl6ZTogLT5cbiAgICBhc2tTdGFja1ZpZXdTdGF0ZTogQGFza1N0YWNrVmlldy5zZXJpYWxpemUoKVxuIl19
