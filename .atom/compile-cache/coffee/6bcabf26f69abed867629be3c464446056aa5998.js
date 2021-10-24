(function() {
  var JquerySnippetsView;

  JquerySnippetsView = require('./jquery-snippets-view');

  module.exports = {
    jquerySnippetsView: null,
    activate: function(state) {
      return this.jquerySnippetsView = new JquerySnippetsView(state.jquerySnippetsViewState);
    },
    deactivate: function() {
      return this.jquerySnippetsView.destroy();
    },
    serialize: function() {
      return {
        jquerySnippetsViewState: this.jquerySnippetsView.serialize()
      };
    }
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZmlsZTovLy9DOi9Vc2Vycy9ja25qdS8uYXRvbS9wYWNrYWdlcy9qcXVlcnktc25pcHBldHMvbGliL2pxdWVyeS1zbmlwcGV0cy5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQSxNQUFBOztFQUFBLGtCQUFBLEdBQXFCLE9BQUEsQ0FBUSx3QkFBUjs7RUFFckIsTUFBTSxDQUFDLE9BQVAsR0FDRTtJQUFBLGtCQUFBLEVBQW9CLElBQXBCO0lBRUEsUUFBQSxFQUFVLFNBQUMsS0FBRDthQUNSLElBQUMsQ0FBQSxrQkFBRCxHQUFzQixJQUFJLGtCQUFKLENBQXVCLEtBQUssQ0FBQyx1QkFBN0I7SUFEZCxDQUZWO0lBS0EsVUFBQSxFQUFZLFNBQUE7YUFDVixJQUFDLENBQUEsa0JBQWtCLENBQUMsT0FBcEIsQ0FBQTtJQURVLENBTFo7SUFRQSxTQUFBLEVBQVcsU0FBQTthQUNUO1FBQUEsdUJBQUEsRUFBeUIsSUFBQyxDQUFBLGtCQUFrQixDQUFDLFNBQXBCLENBQUEsQ0FBekI7O0lBRFMsQ0FSWDs7QUFIRiIsInNvdXJjZXNDb250ZW50IjpbIkpxdWVyeVNuaXBwZXRzVmlldyA9IHJlcXVpcmUgJy4vanF1ZXJ5LXNuaXBwZXRzLXZpZXcnXG5cbm1vZHVsZS5leHBvcnRzID1cbiAganF1ZXJ5U25pcHBldHNWaWV3OiBudWxsXG5cbiAgYWN0aXZhdGU6IChzdGF0ZSkgLT5cbiAgICBAanF1ZXJ5U25pcHBldHNWaWV3ID0gbmV3IEpxdWVyeVNuaXBwZXRzVmlldyhzdGF0ZS5qcXVlcnlTbmlwcGV0c1ZpZXdTdGF0ZSlcblxuICBkZWFjdGl2YXRlOiAtPlxuICAgIEBqcXVlcnlTbmlwcGV0c1ZpZXcuZGVzdHJveSgpXG5cbiAgc2VyaWFsaXplOiAtPlxuICAgIGpxdWVyeVNuaXBwZXRzVmlld1N0YXRlOiBAanF1ZXJ5U25pcHBldHNWaWV3LnNlcmlhbGl6ZSgpXG4iXX0=
