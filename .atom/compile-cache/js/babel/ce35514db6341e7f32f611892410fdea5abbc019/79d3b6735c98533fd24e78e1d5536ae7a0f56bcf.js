var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _atom = require('atom');

var _helpers = require('../helpers');

var React = undefined;
var ReactDOM = undefined;
var Component = undefined;

// eslint-disable-next-line no-use-before-define
function getPaneContainer(item) {
  var paneContainer = atom.workspace.paneContainerForItem(item);
  // NOTE: This is an internal API access
  // It's necessary because there's no Public API for it yet
  if (paneContainer && typeof paneContainer.state === 'object' && typeof paneContainer.state.size === 'number' && typeof paneContainer.render === 'function') {
    return paneContainer;
  }
  return null;
}

var PanelDock = (function () {
  function PanelDock(delegate) {
    var _this = this;

    _classCallCheck(this, PanelDock);

    this.element = document.createElement('div');
    this.subscriptions = new _atom.CompositeDisposable();

    this.lastSetPaneHeight = null;
    this.subscriptions.add(atom.config.observe('linter-ui-default.panelHeight', function (panelHeight) {
      var changed = typeof _this.panelHeight === 'number';
      _this.panelHeight = panelHeight;
      if (changed) {
        _this.doPanelResize(true);
      }
    }));
    this.subscriptions.add(atom.config.observe('linter-ui-default.alwaysTakeMinimumSpace', function (alwaysTakeMinimumSpace) {
      _this.alwaysTakeMinimumSpace = alwaysTakeMinimumSpace;
    }));
    this.doPanelResize();

    if (!React) {
      React = require('react');
    }
    if (!ReactDOM) {
      ReactDOM = require('react-dom');
    }
    if (!Component) {
      Component = require('./component');
    }

    ReactDOM.render(React.createElement(Component, { delegate: delegate }), this.element);
  }

  // NOTE: Chose a name that won't conflict with Dock APIs

  _createClass(PanelDock, [{
    key: 'doPanelResize',
    value: function doPanelResize() {
      var forConfigHeight = arguments.length <= 0 || arguments[0] === undefined ? false : arguments[0];

      var paneContainer = getPaneContainer(this);
      var minimumHeight = null;
      var paneContainerView = atom.views.getView(paneContainer);
      if (paneContainerView && this.alwaysTakeMinimumSpace) {
        // NOTE: Super horrible hack but the only possible way I could find :((
        var dockNamesElement = paneContainerView.querySelector('.list-inline.tab-bar.inset-panel');
        var dockNamesRects = dockNamesElement ? dockNamesElement.getClientRects()[0] : null;
        var tableElement = this.element.querySelector('table');
        var panelRects = tableElement ? tableElement.getClientRects()[0] : null;
        if (dockNamesRects && panelRects) {
          minimumHeight = dockNamesRects.height + panelRects.height + 1;
        }
      }

      if (paneContainer) {
        var updateConfigHeight = null;
        var heightSet = minimumHeight !== null && !forConfigHeight ? Math.min(minimumHeight, this.panelHeight) : this.panelHeight;

        // Person resized the panel, save new resized value to config
        if (this.lastSetPaneHeight !== null && paneContainer.state.size !== this.lastSetPaneHeight && !forConfigHeight) {
          updateConfigHeight = paneContainer.state.size;
        }

        this.lastSetPaneHeight = heightSet;
        paneContainer.state.size = heightSet;
        paneContainer.render(paneContainer.state);

        if (updateConfigHeight !== null) {
          atom.config.set('linter-ui-default.panelHeight', updateConfigHeight);
        }
      }
    }
  }, {
    key: 'getURI',
    value: function getURI() {
      return _helpers.WORKSPACE_URI;
    }
  }, {
    key: 'getTitle',
    value: function getTitle() {
      return 'Linter';
    }
  }, {
    key: 'getDefaultLocation',
    value: function getDefaultLocation() {
      return _helpers.DOCK_DEFAULT_LOCATION;
    }
  }, {
    key: 'getAllowedLocations',
    value: function getAllowedLocations() {
      return _helpers.DOCK_ALLOWED_LOCATIONS;
    }
  }, {
    key: 'getPreferredHeight',
    value: function getPreferredHeight() {
      return atom.config.get('linter-ui-default.panelHeight');
    }
  }, {
    key: 'dispose',
    value: function dispose() {
      this.subscriptions.dispose();
      var paneContainer = getPaneContainer(this);
      if (paneContainer && !this.alwaysTakeMinimumSpace && paneContainer.state.size !== this.panelHeight) {
        atom.config.set('linter-ui-default.panelHeight', paneContainer.state.size);
        paneContainer.paneForItem(this).destroyItem(this, true);
      }
    }
  }]);

  return PanelDock;
})();

module.exports = PanelDock;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZpbGU6Ly8vQzovVXNlcnMvY2tuanUvLmF0b20vcGFja2FnZXMvbGludGVyLXVpLWRlZmF1bHQvbGliL3BhbmVsL2RvY2suanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztvQkFFb0MsTUFBTTs7dUJBQ21DLFlBQVk7O0FBRXpGLElBQUksS0FBSyxZQUFBLENBQUE7QUFDVCxJQUFJLFFBQVEsWUFBQSxDQUFBO0FBQ1osSUFBSSxTQUFTLFlBQUEsQ0FBQTs7O0FBR2IsU0FBUyxnQkFBZ0IsQ0FBQyxJQUFlLEVBQUU7QUFDekMsTUFBTSxhQUFhLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsQ0FBQTs7O0FBRy9ELE1BQ0UsYUFBYSxJQUNiLE9BQU8sYUFBYSxDQUFDLEtBQUssS0FBSyxRQUFRLElBQ3ZDLE9BQU8sYUFBYSxDQUFDLEtBQUssQ0FBQyxJQUFJLEtBQUssUUFBUSxJQUM1QyxPQUFPLGFBQWEsQ0FBQyxNQUFNLEtBQUssVUFBVSxFQUMxQztBQUNBLFdBQU8sYUFBYSxDQUFBO0dBQ3JCO0FBQ0QsU0FBTyxJQUFJLENBQUE7Q0FDWjs7SUFFSyxTQUFTO0FBT0YsV0FQUCxTQUFTLENBT0QsUUFBZ0IsRUFBRTs7OzBCQVAxQixTQUFTOztBQVFYLFFBQUksQ0FBQyxPQUFPLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQTtBQUM1QyxRQUFJLENBQUMsYUFBYSxHQUFHLCtCQUF5QixDQUFBOztBQUU5QyxRQUFJLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxDQUFBO0FBQzdCLFFBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUNwQixJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQywrQkFBK0IsRUFBRSxVQUFBLFdBQVcsRUFBSTtBQUNsRSxVQUFNLE9BQU8sR0FBRyxPQUFPLE1BQUssV0FBVyxLQUFLLFFBQVEsQ0FBQTtBQUNwRCxZQUFLLFdBQVcsR0FBRyxXQUFXLENBQUE7QUFDOUIs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LENBQUMsQ0FBQTtTQUNyRTtPQUNGO0tBQ0Y7OztXQUNLLGtCQUFHO0FBQ1Asb0NBQW9CO0tBQ3JCOzs7V0FDTyxvQkFBRztBQUNULGFBQU8sUUFBUSxDQUFBO0tBQ2hCOzs7V0FDaUIsOEJBQUc7QUFDbkIsNENBQTRCO0tBQzdCOzs7V0FDa0IsK0JBQUc7QUFDcEIsNkNBQTZCO0tBQzlCOzs7V0FDaUIsOEJBQUc7QUFDbkIsYUFBTyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQywrQkFBK0IsQ0FBQyxDQUFBO0tBQ3hEOzs7V0FDTSxtQkFBRztBQUNSLFVBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxFQUFFLENBQUE7QUFDNUIsVUFBTSxhQUFhLEdBQUcsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLENBQUE7QUFDNUMsVUFBSSxhQUFhLElBQUksQ0FBQyxJQUFJLENBQUMsc0JBQXNCLElBQUksYUFBYSxDQUFDLEtBQUssQ0FBQyxJQUFJLEtBQUssSUFBSSxDQUFDLFdBQVcsRUFBRTtBQUNsRyxZQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQywrQkFBK0IsRUFBRSxhQUFhLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFBO0FBQzFFLHFCQUFhLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUE7T0FDeEQ7S0FDRjs7O1NBakdHLFNBQVM7OztBQW9HZixNQUFNLENBQUMsT0FBTyxHQUFHLFNBQVMsQ0FBQSIsImZpbGUiOiJmaWxlOi8vL0M6L1VzZXJzL2Nrbmp1Ly5hdG9tL3BhY2thZ2VzL2xpbnRlci11aS1kZWZhdWx0L2xpYi9wYW5lbC9kb2NrLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogQGZsb3cgKi9cblxuaW1wb3J0IHsgQ29tcG9zaXRlRGlzcG9zYWJsZSB9IGZyb20gJ2F0b20nXG5pbXBvcnQgeyBXT1JLU1BBQ0VfVVJJLCBET0NLX0FMTE9XRURfTE9DQVRJT05TLCBET0NLX0RFRkFVTFRfTE9DQVRJT04gfSBmcm9tICcuLi9oZWxwZXJzJ1xuXG5sZXQgUmVhY3RcbmxldCBSZWFjdERPTVxubGV0IENvbXBvbmVudFxuXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdXNlLWJlZm9yZS1kZWZpbmVcbmZ1bmN0aW9uIGdldFBhbmVDb250YWluZXIoaXRlbTogUGFuZWxEb2NrKSB7XG4gIGNvbnN0IHBhbmVDb250YWluZXIgPSBhdG9tLndvcmtzcGFjZS5wYW5lQ29udGFpbmVyRm9ySXRlbShpdGVtKVxuICAvLyBOT1RFOiBUaGlzIGlzIGFuIGludGVybmFsIEFQSSBhY2Nlc3NcbiAgLy8gSXQncyBuZWNlc3NhcnkgYmVjYXVzZSB0aGVyZSdzIG5vIFB1YmxpYyBBUEkgZm9yIGl0IHlldFxuICBpZiAoXG4gICAgcGFuZUNvbnRhaW5lciAmJlxuICAgIHR5cGVvZiBwYW5lQ29udGFpbmVyLnN0YXRlID09PSAnb2JqZWN0JyAmJlxuICAgIHR5cGVvZiBwYW5lQ29udGFpbmVyLnN0YXRlLnNpemUgPT09ICdudW1iZXInICYmXG4gICAgdHlwZW9mIHBhbmVDb250YWluZXIucmVuZGVyID09PSAnZnVuY3Rpb24nXG4gICkge1xuICAgIHJldHVybiBwYW5lQ29udGFpbmVyXG4gIH1cbiAgcmV0dXJuIG51bGxcbn1cblxuY2xhc3MgUGFuZWxEb2NrIHtcbiAgZWxlbWVudDogSFRNTEVsZW1lbnRcbiAgc3Vic2NyaXB0aW9uczogQ29tcG9zaXRlRGlzcG9zYWJsZVxuICBwYW5lbEhlaWdodDogbnVtYmVyXG4gIGFsd2F5c1Rha2VNaW5pbXVtU3BhY2U6IGJvb2xlYW5cbiAgbGFzdFNldFBhbmVIZWlnaHQ6IG51bWJlciB8IG51bGxcblxuICBjb25zdHJ1Y3RvcihkZWxlZ2F0ZTogT2JqZWN0KSB7XG4gICAgdGhpcy5lbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMgPSBuZXcgQ29tcG9zaXRlRGlzcG9zYWJsZSgpXG5cbiAgICB0aGlzLmxhc3RTZXRQYW5lSGVpZ2h0ID0gbnVsbFxuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5hZGQoXG4gICAgICBhdG9tLmNvbmZpZy5vYnNlcnZlKCdsaW50ZXItdWktZGVmYXVsdC5wYW5lbEhlaWdodCcsIHBhbmVsSGVpZ2h0ID0+IHtcbiAgICAgICAgY29uc3QgY2hhbmdlZCA9IHR5cGVvZiB0aGlzLnBhbmVsSGVpZ2h0ID09PSAnbnVtYmVyJ1xuICAgICAgICB0aGlzLnBhbmVsSGVpZ2h0ID0gcGFuZWxIZWlnaHRcbiAgICAgICAgaWYgKGNoYW5nZWQpIHtcbiAgICAgICAgICB0aGlzLmRvUGFuZWxSZXNpemUodHJ1ZSlcbiAgICAgICAgfVxuICAgICAgfSksXG4gICAgKVxuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5hZGQoXG4gICAgICBhdG9tLmNvbmZpZy5vYnNlcnZlKCdsaW50ZXItdWktZGVmYXVsdC5hbHdheXNUYWtlTWluaW11bVNwYWNlJywgYWx3YXlzVGFrZU1pbmltdW1TcGFjZSA9PiB7XG4gICAgICAgIHRoaXMuYWx3YXlzVGFrZU1pbmltdW1TcGFjZSA9IGFsd2F5c1Rha2VNaW5pbXVtU3BhY2VcbiAgICAgIH0pLFxuICAgIClcbiAgICB0aGlzLmRvUGFuZWxSZXNpemUoKVxuXG4gICAgaWYgKCFSZWFjdCkge1xuICAgICAgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpXG4gICAgfVxuICAgIGlmICghUmVhY3RET00pIHtcbiAgICAgIFJlYWN0RE9NID0gcmVxdWlyZSgncmVhY3QtZG9tJylcbiAgICB9XG4gICAgaWYgKCFDb21wb25lbnQpIHtcbiAgICAgIENvbXBvbmVudCA9IHJlcXVpcmUoJy4vY29tcG9uZW50JylcbiAgICB9XG5cbiAgICBSZWFjdERPTS5yZW5kZXIoPENvbXBvbmVudCBkZWxlZ2F0ZT17ZGVsZWdhdGV9IC8+LCB0aGlzLmVsZW1lbnQpXG4gIH1cbiAgLy8gTk9URTogQ2hvc2UgYSBuYW1lIHRoYXQgd29uJ3QgY29uZmxpY3Qgd2l0aCBEb2NrIEFQSXNcbiAgZG9QYW5lbFJlc2l6ZShmb3JDb25maWdIZWlnaHQ6IGJvb2xlYW4gPSBmYWxzZSkge1xuICAgIGNvbnN0IHBhbmVDb250YWluZXIgPSBnZXRQYW5lQ29udGFpbmVyKHRoaXMpXG4gICAgbGV0IG1pbmltdW1IZWlnaHQ6IG51bWJlciB8IG51bGwgPSBudWxsXG4gICAgY29uc3QgcGFuZUNvbnRhaW5lclZpZXcgPSBhdG9tLnZpZXdzLmdldFZpZXcocGFuZUNvbnRhaW5lcilcbiAgICBpZiAocGFuZUNvbnRhaW5lclZpZXcgJiYgdGhpcy5hbHdheXNUYWtlTWluaW11bVNwYWNlKSB7XG4gICAgICAvLyBOT1RFOiBTdXBlciBob3JyaWJsZSBoYWNrIGJ1dCB0aGUgb25seSBwb3NzaWJsZSB3YXkgSSBjb3VsZCBmaW5kIDooKFxuICAgICAgY29uc3QgZG9ja05hbWVzRWxlbWVudCA9IHBhbmVDb250YWluZXJWaWV3LnF1ZXJ5U2VsZWN0b3IoJy5saXN0LWlubGluZS50YWItYmFyLmluc2V0LXBhbmVsJylcbiAgICAgIGNvbnN0IGRvY2tOYW1lc1JlY3RzID0gZG9ja05hbWVzRWxlbWVudCA/IGRvY2tOYW1lc0VsZW1lbnQuZ2V0Q2xpZW50UmVjdHMoKVswXSA6IG51bGxcbiAgICAgIGNvbnN0IHRhYmxlRWxlbWVudCA9IHRoaXMuZWxlbWVudC5xdWVyeVNlbGVjdG9yKCd0YWJsZScpXG4gICAgICBjb25zdCBwYW5lbFJlY3RzID0gdGFibGVFbGVtZW50ID8gdGFibGVFbGVtZW50LmdldENsaWVudFJlY3RzKClbMF0gOiBudWxsXG4gICAgICBpZiAoZG9ja05hbWVzUmVjdHMgJiYgcGFuZWxSZWN0cykge1xuICAgICAgICBtaW5pbXVtSGVpZ2h0ID0gZG9ja05hbWVzUmVjdHMuaGVpZ2h0ICsgcGFuZWxSZWN0cy5oZWlnaHQgKyAxXG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHBhbmVDb250YWluZXIpIHtcbiAgICAgIGxldCB1cGRhdGVDb25maWdIZWlnaHQ6IG51bWJlciB8IG51bGwgPSBudWxsXG4gICAgICBjb25zdCBoZWlnaHRTZXQgPVxuICAgICAgICBtaW5pbXVtSGVpZ2h0ICE9PSBudWxsICYmICFmb3JDb25maWdIZWlnaHQgPyBNYXRoLm1pbihtaW5pbXVtSGVpZ2h0LCB0aGlzLnBhbmVsSGVpZ2h0KSA6IHRoaXMucGFuZWxIZWlnaHRcblxuICAgICAgLy8gUGVyc29uIHJlc2l6ZWQgdGhlIHBhbmVsLCBzYXZlIG5ldyByZXNpemVkIHZhbHVlIHRvIGNvbmZpZ1xuICAgICAgaWYgKHRoaXMubGFzdFNldFBhbmVIZWlnaHQgIT09IG51bGwgJiYgcGFuZUNvbnRhaW5lci5zdGF0ZS5zaXplICE9PSB0aGlzLmxhc3RTZXRQYW5lSGVpZ2h0ICYmICFmb3JDb25maWdIZWlnaHQpIHtcbiAgICAgICAgdXBkYXRlQ29uZmlnSGVpZ2h0ID0gcGFuZUNvbnRhaW5lci5zdGF0ZS5zaXplXG4gICAgICB9XG5cbiAgICAgIHRoaXMubGFzdFNldFBhbmVIZWlnaHQgPSBoZWlnaHRTZXRcbiAgICAgIHBhbmVDb250YWluZXIuc3RhdGUuc2l6ZSA9IGhlaWdodFNldFxuICAgICAgcGFuZUNvbnRhaW5lci5yZW5kZXIocGFuZUNvbnRhaW5lci5zdGF0ZSlcblxuICAgICAgaWYgKHVwZGF0ZUNvbmZpZ0hlaWdodCAhPT0gbnVsbCkge1xuICAgICAgICBhdG9tLmNvbmZpZy5zZXQoJ2xpbnRlci11aS1kZWZhdWx0LnBhbmVsSGVpZ2h0JywgdXBkYXRlQ29uZmlnSGVpZ2h0KVxuICAgICAgfVxuICAgIH1cbiAgfVxuICBnZXRVUkkoKSB7XG4gICAgcmV0dXJuIFdPUktTUEFDRV9VUklcbiAgfVxuICBnZXRUaXRsZSgpIHtcbiAgICByZXR1cm4gJ0xpbnRlcidcbiAgfVxuICBnZXREZWZhdWx0TG9jYXRpb24oKSB7XG4gICAgcmV0dXJuIERPQ0tfREVGQVVMVF9MT0NBVElPTlxuICB9XG4gIGdldEFsbG93ZWRMb2NhdGlvbnMoKSB7XG4gICAgcmV0dXJuIERPQ0tfQUxMT1dFRF9MT0NBVElPTlNcbiAgfVxuICBnZXRQcmVmZXJyZWRIZWlnaHQoKSB7XG4gICAgcmV0dXJuIGF0b20uY29uZmlnLmdldCgnbGludGVyLXVpLWRlZmF1bHQucGFuZWxIZWlnaHQnKVxuICB9XG4gIGRpc3Bvc2UoKSB7XG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLmRpc3Bvc2UoKVxuICAgIGNvbnN0IHBhbmVDb250YWluZXIgPSBnZXRQYW5lQ29udGFpbmVyKHRoaXMpXG4gICAgaWYgKHBhbmVDb250YWluZXIgJiYgIXRoaXMuYWx3YXlzVGFrZU1pbmltdW1TcGFjZSAmJiBwYW5lQ29udGFpbmVyLnN0YXRlLnNpemUgIT09IHRoaXMucGFuZWxIZWlnaHQpIHtcbiAgICAgIGF0b20uY29uZmlnLnNldCgnbGludGVyLXVpLWRlZmF1bHQucGFuZWxIZWlnaHQnLCBwYW5lQ29udGFpbmVyLnN0YXRlLnNpemUpXG4gICAgICBwYW5lQ29udGFpbmVyLnBhbmVGb3JJdGVtKHRoaXMpLmRlc3Ryb3lJdGVtKHRoaXMsIHRydWUpXG4gICAgfVxuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gUGFuZWxEb2NrXG4iXX0=