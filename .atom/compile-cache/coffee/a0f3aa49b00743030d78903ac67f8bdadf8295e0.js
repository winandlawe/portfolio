(function() {
  var JquerySnippetsView, View,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  View = require('atom-space-pen-views').View;

  module.exports = JquerySnippetsView = (function(superClass) {
    extend(JquerySnippetsView, superClass);

    function JquerySnippetsView() {
      return JquerySnippetsView.__super__.constructor.apply(this, arguments);
    }

    JquerySnippetsView.content = function() {
      return this.div({
        "class": 'jquery-snippets overlay from-top'
      }, (function(_this) {
        return function() {
          return _this.div("The JquerySnippets package is Alive! It's ALIVE!", {
            "class": "message"
          });
        };
      })(this));
    };

    JquerySnippetsView.prototype.initialize = function(serializeState) {
      return atom.commands.add('atom-workspace', 'jquery-snippets:toggle', (function(_this) {
        return function() {
          return _this.toggle();
        };
      })(this));
    };

    JquerySnippetsView.prototype.serialize = function() {};

    JquerySnippetsView.prototype.destroy = function() {
      return this.detach();
    };

    return JquerySnippetsView;

  })(View);

}).call(this);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZmlsZTovLy9DOi9Vc2Vycy9ja25qdS8uYXRvbS9wYWNrYWdlcy9qcXVlcnktc25pcHBldHMvbGliL2pxdWVyeS1zbmlwcGV0cy12aWV3LmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUFBLE1BQUEsd0JBQUE7SUFBQTs7O0VBQUMsT0FBUSxPQUFBLENBQVEsc0JBQVI7O0VBRVQsTUFBTSxDQUFDLE9BQVAsR0FDTTs7Ozs7OztJQUNKLGtCQUFDLENBQUEsT0FBRCxHQUFVLFNBQUE7YUFDUixJQUFDLENBQUEsR0FBRCxDQUFLO1FBQUEsQ0FBQSxLQUFBLENBQUEsRUFBTyxrQ0FBUDtPQUFMLEVBQWdELENBQUEsU0FBQSxLQUFBO2VBQUEsU0FBQTtpQkFDOUMsS0FBQyxDQUFBLEdBQUQsQ0FBSyxrREFBTCxFQUF5RDtZQUFBLENBQUEsS0FBQSxDQUFBLEVBQU8sU0FBUDtXQUF6RDtRQUQ4QztNQUFBLENBQUEsQ0FBQSxDQUFBLElBQUEsQ0FBaEQ7SUFEUTs7aUNBSVYsVUFBQSxHQUFZLFNBQUMsY0FBRDthQUNWLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBZCxDQUFrQixnQkFBbEIsRUFBb0Msd0JBQXBDLEVBQThELENBQUEsU0FBQSxLQUFBO2VBQUEsU0FBQTtpQkFBRyxLQUFDLENBQUEsTUFBRCxDQUFBO1FBQUg7TUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBQTlEO0lBRFU7O2lDQUlaLFNBQUEsR0FBVyxTQUFBLEdBQUE7O2lDQUdYLE9BQUEsR0FBUyxTQUFBO2FBQ1AsSUFBQyxDQUFBLE1BQUQsQ0FBQTtJQURPOzs7O0tBWnNCO0FBSGpDIiwic291cmNlc0NvbnRlbnQiOlsie1ZpZXd9ID0gcmVxdWlyZSAnYXRvbS1zcGFjZS1wZW4tdmlld3MnXG5cbm1vZHVsZS5leHBvcnRzID1cbmNsYXNzIEpxdWVyeVNuaXBwZXRzVmlldyBleHRlbmRzIFZpZXdcbiAgQGNvbnRlbnQ6IC0+XG4gICAgQGRpdiBjbGFzczogJ2pxdWVyeS1zbmlwcGV0cyBvdmVybGF5IGZyb20tdG9wJywgPT5cbiAgICAgIEBkaXYgXCJUaGUgSnF1ZXJ5U25pcHBldHMgcGFja2FnZSBpcyBBbGl2ZSEgSXQncyBBTElWRSFcIiwgY2xhc3M6IFwibWVzc2FnZVwiXG5cbiAgaW5pdGlhbGl6ZTogKHNlcmlhbGl6ZVN0YXRlKSAtPlxuICAgIGF0b20uY29tbWFuZHMuYWRkICdhdG9tLXdvcmtzcGFjZScsICdqcXVlcnktc25pcHBldHM6dG9nZ2xlJywgPT4gQHRvZ2dsZSgpXG5cbiAgIyBSZXR1cm5zIGFuIG9iamVjdCB0aGF0IGNhbiBiZSByZXRyaWV2ZWQgd2hlbiBwYWNrYWdlIGlzIGFjdGl2YXRlZFxuICBzZXJpYWxpemU6IC0+XG5cbiAgIyBUZWFyIGRvd24gYW55IHN0YXRlIGFuZCBkZXRhY2hcbiAgZGVzdHJveTogLT5cbiAgICBAZGV0YWNoKClcbiJdfQ==
