(function() {
  var $, CompositeDisposable, PlatformIOTerminalView, StatusBar, StatusIcon, View, _, os, path, ref,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  CompositeDisposable = require('atom').CompositeDisposable;

  ref = require('atom-space-pen-views'), $ = ref.$, View = ref.View;

  PlatformIOTerminalView = require('./view');

  StatusIcon = require('./status-icon');

  os = require('os');

  path = require('path');

  _ = require('underscore');

  module.exports = StatusBar = (function(superClass) {
    extend(StatusBar, superClass);

    function StatusBar() {
      this.moveTerminalView = bind(this.moveTerminalView, this);
      this.onDropTabBar = bind(this.onDropTabBar, this);
      this.onDrop = bind(this.onDrop, this);
      this.onDragOver = bind(this.onDragOver, this);
      this.onDragEnd = bind(this.onDragEnd, this);
      this.onDragLeave = bind(this.onDragLeave, this);
      this.onDragStart = bind(this.onDragStart, this);
      this.closeAll = bind(this.closeAll, this);
      return StatusBar.__super__.constructor.apply(this, arguments);
    }

    StatusBar.prototype.terminalViews = [];

    StatusBar.prototype.activeTerminal = null;

    StatusBar.prototype.returnFocus = null;

    StatusBar.content = function() {
      return this.div({
        "class": 'platformio-ide-terminal status-bar',
        tabindex: -1
      }, (function(_this) {
        return function() {
          _this.i({
            "class": "icon icon-plus",
            click: 'newTerminalView',
            outlet: 'plusBtn'
          });
          _this.ul({
            "class": "list-inline status-container",
            tabindex: '-1',
            outlet: 'statusContainer',
            is: 'space-pen-ul'
          });
          return _this.i({
            "class": "icon icon-x",
            click: 'closeAll',
            outlet: 'closeBtn'
          });
        };
      })(this));
    };

    StatusBar.prototype.initialize = function(statusBarProvider) {
      var handleBlur, handleFocus;
      this.statusBarProvider = statusBarProvider;
      this.subscriptions = new CompositeDisposable();
      this.subscriptions.add(atom.commands.add('atom-workspace', {
        'platformio-ide-terminal:focus': (function(_this) {
          return function() {
            return _this.focusTerminal();
          };
        })(this),
        'platformio-ide-terminal:new': (function(_this) {
          return function() {
            return _this.newTerminalView();
          };
        })(this),
        'platformio-ide-terminal:toggle': (function(_this) {
          return function() {
            return _this.toggle();
          };
        })(this),
        'platformio-ide-terminal:next': (function(_this) {
          return function() {
            if (!_this.activeTerminal) {
              return;
            }
            if (_this.activeTerminal.isAnimating()) {
              return;
            }
            if (_this.activeNextTerminalView()) {
              return _this.activeTerminal.open();
            }
          };
        })(this),
        'platformio-ide-terminal:prev': (function(_this) {
          return function() {
            if (!_this.activeTerminal) {
              return;
            }
            if (_this.activeTerminal.isAnimating()) {
              return;
            }
            if (_this.activePrevTerminalView()) {
              return _this.activeTerminal.open();
            }
          };
        })(this),
        'platformio-ide-terminal:clear': (function(_this) {
          return function() {
            return _this.clear();
          };
        })(this),
        'platformio-ide-terminal:close': (function(_this) {
          return function() {
            return _this.destroyActiveTerm();
          };
        })(this),
        'platformio-ide-terminal:close-all': (function(_this) {
          return function() {
            return _this.closeAll();
          };
        })(this),
        'platformio-ide-terminal:rename': (function(_this) {
          return function() {
            return _this.runInActiveView(function(i) {
              return i.rename();
            });
          };
        })(this),
        'platformio-ide-terminal:insert-selected-text': (function(_this) {
          return function() {
            return _this.runInActiveView(function(i) {
              return i.insertSelection('$S');
            });
          };
        })(this),
        'platformio-ide-terminal:insert-text': (function(_this) {
          return function() {
            return _this.runInActiveView(function(i) {
              return i.inputDialog();
            });
          };
        })(this),
        'platformio-ide-terminal:insert-custom-text-1': (function(_this) {
          return function() {
            return _this.runInActiveView(function(i) {
              return i.insertSelection(atom.config.get('platformio-ide-terminal.customTexts.customText1'));
            });
          };
        })(this),
        'platformio-ide-terminal:insert-custom-text-2': (function(_this) {
          return function() {
            return _this.runInActiveView(function(i) {
              return i.insertSelection(atom.config.get('platformio-ide-terminal.customTexts.customText2'));
            });
          };
        })(this),
        'platformio-ide-terminal:insert-custom-text-3': (function(_this) {
          return function() {
            return _this.runInActiveView(function(i) {
              return i.insertSelection(atom.config.get('platformio-ide-terminal.customTexts.customText3'));
            });
          };
        })(this),
        'platformio-ide-terminal:insert-custom-text-4': (function(_this) {
          return function() {
            return _this.runInActiveView(function(i) {
              return i.insertSelection(atom.config.get('platformio-ide-terminal.customTexts.customText4'));
            });
          };
        })(this),
        'platformio-ide-terminal:insert-custom-text-5': (function(_this) {
          return function() {
            return _this.runInActiveView(function(i) {
              return i.insertSelection(atom.config.get('platformio-ide-terminal.customTexts.customText5'));
            });
          };
        })(this),
        'platformio-ide-terminal:insert-custom-text-6': (function(_this) {
          return function() {
            return _this.runInActiveView(function(i) {
              return i.insertSelection(atom.config.get('platformio-ide-terminal.customTexts.customText6'));
            });
          };
        })(this),
        'platformio-ide-terminal:insert-custom-text-7': (function(_this) {
          return function() {
            return _this.runInActiveView(function(i) {
              return i.insertSelection(atom.config.get('platformio-ide-terminal.customTexts.customText7'));
            });
          };
        })(this),
        'platformio-ide-terminal:insert-custom-text-8': (function(_this) {
          return function() {
            return _this.runInActiveView(function(i) {
              return i.insertSelection(atom.config.get('platformio-ide-terminal.customTexts.customText8'));
            });
          };
        })(this),
        'platformio-ide-terminal:fullscreen': (function(_this) {
          return function() {
            return _this.activeTerminal.maximize();
          };
        })(this)
      }));
      this.subscriptions.add(atom.commands.add('.xterm', {
        'platformio-ide-terminal:paste': (function(_this) {
          return function() {
            return _this.runInActiveView(function(i) {
              return i.paste();
            });
          };
        })(this),
        'platformio-ide-terminal:copy': (function(_this) {
          return function() {
            return _this.runInActiveView(function(i) {
              return i.copy();
            });
          };
        })(this)
      }));
      this.subscriptions.add(atom.workspace.onDidChangeActivePaneItem((function(_this) {
        return function(item) {
          var mapping, nextTerminal, prevTerminal;
          if (item == null) {
            return;
          }
          if (item.constructor.name === "PlatformIOTerminalView") {
            return setTimeout(item.focus, 100);
          } else if (item.constructor.name === "TextEditor") {
            mapping = atom.config.get('platformio-ide-terminal.core.mapTerminalsTo');
            if (mapping === 'None') {
              return;
            }
            if (!item.getPath()) {
              return;
            }
            switch (mapping) {
              case 'File':
                nextTerminal = _this.getTerminalById(item.getPath(), function(view) {
                  return view.getId().filePath;
                });
                break;
              case 'Folder':
                nextTerminal = _this.getTerminalById(path.dirname(item.getPath()), function(view) {
                  return view.getId().folderPath;
                });
            }
            prevTerminal = _this.getActiveTerminalView();
            if (prevTerminal !== nextTerminal) {
              if (nextTerminal == null) {
                if (atom.config.get('platformio-ide-terminal.core.mapTerminalsToAutoOpen')) {
                  return nextTerminal = _this.createTerminalView();
                }
              } else {
                _this.setActiveTerminalView(nextTerminal);
                if (prevTerminal != null ? prevTerminal.panel.isVisible() : void 0) {
                  return nextTerminal.toggle();
                }
              }
            }
          }
        };
      })(this)));
      this.registerContextMenu();
      this.subscriptions.add(atom.tooltips.add(this.plusBtn, {
        title: 'New Terminal'
      }));
      this.subscriptions.add(atom.tooltips.add(this.closeBtn, {
        title: 'Close All'
      }));
      this.statusContainer.on('dblclick', (function(_this) {
        return function(event) {
          if (event.target === event.delegateTarget) {
            return _this.newTerminalView();
          }
        };
      })(this));
      this.statusContainer.on('dragstart', '.pio-terminal-status-icon', this.onDragStart);
      this.statusContainer.on('dragend', '.pio-terminal-status-icon', this.onDragEnd);
      this.statusContainer.on('dragleave', this.onDragLeave);
      this.statusContainer.on('dragover', this.onDragOver);
      this.statusContainer.on('drop', this.onDrop);
      handleBlur = (function(_this) {
        return function() {
          var terminal;
          if (terminal = PlatformIOTerminalView.getFocusedTerminal()) {
            _this.returnFocus = _this.terminalViewForTerminal(terminal);
            return terminal.blur();
          }
        };
      })(this);
      handleFocus = (function(_this) {
        return function() {
          if (_this.returnFocus) {
            return setTimeout(function() {
              var ref1;
              if ((ref1 = _this.returnFocus) != null) {
                ref1.focus(true);
              }
              return _this.returnFocus = null;
            }, 100);
          }
        };
      })(this);
      window.addEventListener('blur', handleBlur);
      this.subscriptions.add({
        dispose: function() {
          return window.removeEventListener('blur', handleBlur);
        }
      });
      window.addEventListener('focus', handleFocus);
      this.subscriptions.add({
        dispose: function() {
          return window.removeEventListener('focus', handleFocus);
        }
      });
      return this.attach();
    };

    StatusBar.prototype.registerContextMenu = function() {
      return this.subscriptions.add(atom.commands.add('.platformio-ide-terminal.status-bar', {
        'platformio-ide-terminal:status-red': this.setStatusColor,
        'platformio-ide-terminal:status-orange': this.setStatusColor,
        'platformio-ide-terminal:status-yellow': this.setStatusColor,
        'platformio-ide-terminal:status-green': this.setStatusColor,
        'platformio-ide-terminal:status-blue': this.setStatusColor,
        'platformio-ide-terminal:status-purple': this.setStatusColor,
        'platformio-ide-terminal:status-pink': this.setStatusColor,
        'platformio-ide-terminal:status-cyan': this.setStatusColor,
        'platformio-ide-terminal:status-magenta': this.setStatusColor,
        'platformio-ide-terminal:status-default': this.clearStatusColor,
        'platformio-ide-terminal:context-close': function(event) {
          return $(event.target).closest('.pio-terminal-status-icon')[0].terminalView.destroy();
        },
        'platformio-ide-terminal:context-hide': function(event) {
          var statusIcon;
          statusIcon = $(event.target).closest('.pio-terminal-status-icon')[0];
          if (statusIcon.isActive()) {
            return statusIcon.terminalView.hide();
          }
        },
        'platformio-ide-terminal:context-rename': function(event) {
          return $(event.target).closest('.pio-terminal-status-icon')[0].rename();
        }
      }));
    };

    StatusBar.prototype.registerPaneSubscription = function() {
      return this.subscriptions.add(this.paneSubscription = atom.workspace.observePanes((function(_this) {
        return function(pane) {
          var paneElement, tabBar;
          paneElement = $(atom.views.getView(pane));
          tabBar = paneElement.find('ul');
          tabBar.on('drop', function(event) {
            return _this.onDropTabBar(event, pane);
          });
          tabBar.on('dragstart', function(event) {
            var ref1;
            if (((ref1 = event.target.item) != null ? ref1.constructor.name : void 0) !== 'PlatformIOTerminalView') {
              return;
            }
            return event.originalEvent.dataTransfer.setData('platformio-ide-terminal-tab', 'true');
          });
          return pane.onDidDestroy(function() {
            return tabBar.off('drop', this.onDropTabBar);
          });
        };
      })(this)));
    };

    StatusBar.prototype.createTerminalView = function(autoRun) {
      var args, env, shell, shellArguments, shellEnv;
      shell = atom.config.get('platformio-ide-terminal.core.shell');
      shellArguments = atom.config.get('platformio-ide-terminal.core.shellArguments');
      args = shellArguments.split(/\s+/g).filter(function(arg) {
        return arg;
      });
      shellEnv = atom.config.get('platformio-ide-terminal.core.shellEnv');
      env = {};
      shellEnv.split(' ').forEach((function(_this) {
        return function(element) {
          var configVar, envVar;
          configVar = element.split('=');
          envVar = {};
          envVar[configVar[0]] = configVar[1];
          return env = _.extend(env, envVar);
        };
      })(this));
      return this.createEmptyTerminalView(autoRun, shell, args, env);
    };

    StatusBar.prototype.createEmptyTerminalView = function(autoRun, shell, args, env) {
      var directory, editorFolder, editorPath, home, id, j, len, platformIOTerminalView, projectFolder, pwd, ref1, ref2, statusIcon;
      if (autoRun == null) {
        autoRun = [];
      }
      if (shell == null) {
        shell = null;
      }
      if (args == null) {
        args = [];
      }
      if (env == null) {
        env = {};
      }
      if (this.paneSubscription == null) {
        this.registerPaneSubscription();
      }
      projectFolder = atom.project.getPaths()[0];
      editorPath = (ref1 = atom.workspace.getActiveTextEditor()) != null ? ref1.getPath() : void 0;
      if (editorPath != null) {
        editorFolder = path.dirname(editorPath);
        ref2 = atom.project.getPaths();
        for (j = 0, len = ref2.length; j < len; j++) {
          directory = ref2[j];
          if (editorPath.indexOf(directory) >= 0) {
            projectFolder = directory;
          }
        }
      }
      if ((projectFolder != null ? projectFolder.indexOf('atom://') : void 0) >= 0) {
        projectFolder = void 0;
      }
      home = process.platform === 'win32' ? process.env.HOMEPATH : process.env.HOME;
      switch (atom.config.get('platformio-ide-terminal.core.workingDirectory')) {
        case 'Project':
          pwd = projectFolder || editorFolder || home;
          break;
        case 'Active File':
          pwd = editorFolder || projectFolder || home;
          break;
        default:
          pwd = home;
      }
      id = editorPath || projectFolder || home;
      id = {
        filePath: id,
        folderPath: path.dirname(id)
      };
      statusIcon = new StatusIcon();
      platformIOTerminalView = new PlatformIOTerminalView(id, pwd, statusIcon, this, shell, args, env, autoRun);
      statusIcon.initialize(platformIOTerminalView);
      platformIOTerminalView.attach();
      this.terminalViews.push(platformIOTerminalView);
      this.statusContainer.append(statusIcon);
      return platformIOTerminalView;
    };

    StatusBar.prototype.activeNextTerminalView = function() {
      var index;
      index = this.indexOf(this.activeTerminal);
      if (index < 0) {
        return false;
      }
      return this.activeTerminalView(index + 1);
    };

    StatusBar.prototype.activePrevTerminalView = function() {
      var index;
      index = this.indexOf(this.activeTerminal);
      if (index < 0) {
        return false;
      }
      return this.activeTerminalView(index - 1);
    };

    StatusBar.prototype.indexOf = function(view) {
      return this.terminalViews.indexOf(view);
    };

    StatusBar.prototype.activeTerminalView = function(index) {
      if (this.terminalViews.length < 2) {
        return false;
      }
      if (index >= this.terminalViews.length) {
        index = 0;
      }
      if (index < 0) {
        index = this.terminalViews.length - 1;
      }
      this.activeTerminal = this.terminalViews[index];
      return true;
    };

    StatusBar.prototype.getActiveTerminalView = function() {
      return this.activeTerminal;
    };

    StatusBar.prototype.focusTerminal = function() {
      var terminal;
      if (this.activeTerminal == null) {
        return;
      }
      if (terminal = PlatformIOTerminalView.getFocusedTerminal()) {
        return this.activeTerminal.blur();
      } else {
        return this.activeTerminal.focusTerminal();
      }
    };

    StatusBar.prototype.getTerminalById = function(target, selector) {
      var index, j, ref1, terminal;
      if (selector == null) {
        selector = function(terminal) {
          return terminal.id;
        };
      }
      for (index = j = 0, ref1 = this.terminalViews.length; 0 <= ref1 ? j <= ref1 : j >= ref1; index = 0 <= ref1 ? ++j : --j) {
        terminal = this.terminalViews[index];
        if (terminal != null) {
          if (selector(terminal) === target) {
            return terminal;
          }
        }
      }
      return null;
    };

    StatusBar.prototype.terminalViewForTerminal = function(terminal) {
      var index, j, ref1, terminalView;
      for (index = j = 0, ref1 = this.terminalViews.length; 0 <= ref1 ? j <= ref1 : j >= ref1; index = 0 <= ref1 ? ++j : --j) {
        terminalView = this.terminalViews[index];
        if (terminalView != null) {
          if (terminalView.getTerminal() === terminal) {
            return terminalView;
          }
        }
      }
      return null;
    };

    StatusBar.prototype.runInActiveView = function(callback) {
      var view;
      view = this.getActiveTerminalView();
      if (view != null) {
        return callback(view);
      }
      return null;
    };

    StatusBar.prototype.runNewTerminal = function() {
      this.activeTerminal = this.createEmptyTerminalView();
      this.activeTerminal.toggle();
      return this.activeTerminal;
    };

    StatusBar.prototype.runCommandInNewTerminal = function(commands) {
      this.activeTerminal = this.createTerminalView(commands);
      return this.activeTerminal.toggle();
    };

    StatusBar.prototype.runInOpenView = function(callback) {
      var view;
      view = this.getActiveTerminalView();
      if ((view != null) && view.panel.isVisible()) {
        return callback(view);
      }
      return null;
    };

    StatusBar.prototype.setActiveTerminalView = function(view) {
      return this.activeTerminal = view;
    };

    StatusBar.prototype.removeTerminalView = function(view) {
      var index;
      index = this.indexOf(view);
      if (index < 0) {
        return;
      }
      this.terminalViews.splice(index, 1);
      return this.activateAdjacentTerminal(index);
    };

    StatusBar.prototype.activateAdjacentTerminal = function(index) {
      if (index == null) {
        index = 0;
      }
      if (!(this.terminalViews.length > 0)) {
        return false;
      }
      index = Math.max(0, index - 1);
      this.activeTerminal = this.terminalViews[index];
      return true;
    };

    StatusBar.prototype.newTerminalView = function() {
      var ref1;
      if ((ref1 = this.activeTerminal) != null ? ref1.animating : void 0) {
        return;
      }
      this.activeTerminal = this.createTerminalView();
      return this.activeTerminal.toggle();
    };

    StatusBar.prototype.attach = function() {
      return this.statusBarProvider.addLeftTile({
        item: this,
        priority: -93
      });
    };

    StatusBar.prototype.destroyActiveTerm = function() {
      var index;
      if (this.activeTerminal == null) {
        return;
      }
      index = this.indexOf(this.activeTerminal);
      this.activeTerminal.destroy();
      this.activeTerminal = null;
      return this.activateAdjacentTerminal(index);
    };

    StatusBar.prototype.closeAll = function() {
      var index, j, ref1, view;
      for (index = j = ref1 = this.terminalViews.length; ref1 <= 0 ? j <= 0 : j >= 0; index = ref1 <= 0 ? ++j : --j) {
        view = this.terminalViews[index];
        if (view != null) {
          view.destroy();
        }
      }
      return this.activeTerminal = null;
    };

    StatusBar.prototype.destroy = function() {
      var j, len, ref1, view;
      this.subscriptions.dispose();
      ref1 = this.terminalViews;
      for (j = 0, len = ref1.length; j < len; j++) {
        view = ref1[j];
        view.ptyProcess.terminate();
        view.terminal.destroy();
      }
      return this.detach();
    };

    StatusBar.prototype.toggle = function() {
      if (this.terminalViews.length === 0) {
        this.activeTerminal = this.createTerminalView();
      } else if (this.activeTerminal === null) {
        this.activeTerminal = this.terminalViews[0];
      }
      return this.activeTerminal.toggle();
    };

    StatusBar.prototype.clear = function() {
      this.destroyActiveTerm();
      return this.newTerminalView();
    };

    StatusBar.prototype.setStatusColor = function(event) {
      var color;
      color = event.type.match(/\w+$/)[0];
      color = atom.config.get("platformio-ide-terminal.iconColors." + color).toRGBAString();
      return $(event.target).closest('.pio-terminal-status-icon').css('color', color);
    };

    StatusBar.prototype.clearStatusColor = function(event) {
      return $(event.target).closest('.pio-terminal-status-icon').css('color', '');
    };

    StatusBar.prototype.onDragStart = function(event) {
      var element;
      event.originalEvent.dataTransfer.setData('platformio-ide-terminal-panel', 'true');
      element = $(event.target).closest('.pio-terminal-status-icon');
      element.addClass('is-dragging');
      return event.originalEvent.dataTransfer.setData('from-index', element.index());
    };

    StatusBar.prototype.onDragLeave = function(event) {
      return this.removePlaceholder();
    };

    StatusBar.prototype.onDragEnd = function(event) {
      return this.clearDropTarget();
    };

    StatusBar.prototype.onDragOver = function(event) {
      var element, newDropTargetIndex, statusIcons;
      event.preventDefault();
      event.stopPropagation();
      if (event.originalEvent.dataTransfer.getData('platformio-ide-terminal') !== 'true') {
        return;
      }
      newDropTargetIndex = this.getDropTargetIndex(event);
      if (newDropTargetIndex == null) {
        return;
      }
      this.removeDropTargetClasses();
      statusIcons = this.statusContainer.children('.pio-terminal-status-icon');
      if (newDropTargetIndex < statusIcons.length) {
        element = statusIcons.eq(newDropTargetIndex).addClass('is-drop-target');
        return this.getPlaceholder().insertBefore(element);
      } else {
        element = statusIcons.eq(newDropTargetIndex - 1).addClass('drop-target-is-after');
        return this.getPlaceholder().insertAfter(element);
      }
    };

    StatusBar.prototype.onDrop = function(event) {
      var dataTransfer, fromIndex, pane, paneIndex, panelEvent, tabEvent, toIndex, view;
      dataTransfer = event.originalEvent.dataTransfer;
      panelEvent = dataTransfer.getData('platformio-ide-terminal-panel') === 'true';
      tabEvent = dataTransfer.getData('platformio-ide-terminal-tab') === 'true';
      if (!(panelEvent || tabEvent)) {
        return;
      }
      event.preventDefault();
      event.stopPropagation();
      toIndex = this.getDropTargetIndex(event);
      this.clearDropTarget();
      if (tabEvent) {
        fromIndex = parseInt(dataTransfer.getData('sortable-index'));
        paneIndex = parseInt(dataTransfer.getData('from-pane-index'));
        pane = atom.workspace.getPanes()[paneIndex];
        view = pane.itemAtIndex(fromIndex);
        pane.removeItem(view, false);
        view.show();
        view.toggleTabView();
        this.terminalViews.push(view);
        if (view.statusIcon.isActive()) {
          view.open();
        }
        this.statusContainer.append(view.statusIcon);
        fromIndex = this.terminalViews.length - 1;
      } else {
        fromIndex = parseInt(dataTransfer.getData('from-index'));
      }
      return this.updateOrder(fromIndex, toIndex);
    };

    StatusBar.prototype.onDropTabBar = function(event, pane) {
      var dataTransfer, fromIndex, tabBar, view;
      dataTransfer = event.originalEvent.dataTransfer;
      if (dataTransfer.getData('platformio-ide-terminal-panel') !== 'true') {
        return;
      }
      event.preventDefault();
      event.stopPropagation();
      this.clearDropTarget();
      fromIndex = parseInt(dataTransfer.getData('from-index'));
      view = this.terminalViews[fromIndex];
      view.css("height", "");
      view.terminal.element.style.height = "";
      tabBar = $(event.target).closest('.tab-bar');
      view.toggleTabView();
      this.removeTerminalView(view);
      this.statusContainer.children().eq(fromIndex).detach();
      view.statusIcon.removeTooltip();
      pane.addItem(view, pane.getItems().length);
      pane.activateItem(view);
      return view.focus();
    };

    StatusBar.prototype.clearDropTarget = function() {
      var element;
      element = this.find('.is-dragging');
      element.removeClass('is-dragging');
      this.removeDropTargetClasses();
      return this.removePlaceholder();
    };

    StatusBar.prototype.removeDropTargetClasses = function() {
      this.statusContainer.find('.is-drop-target').removeClass('is-drop-target');
      return this.statusContainer.find('.drop-target-is-after').removeClass('drop-target-is-after');
    };

    StatusBar.prototype.getDropTargetIndex = function(event) {
      var element, elementCenter, statusIcons, target;
      target = $(event.target);
      if (this.isPlaceholder(target)) {
        return;
      }
      statusIcons = this.statusContainer.children('.pio-terminal-status-icon');
      element = target.closest('.pio-terminal-status-icon');
      if (element.length === 0) {
        element = statusIcons.last();
      }
      if (!element.length) {
        return 0;
      }
      elementCenter = element.offset().left + element.width() / 2;
      if (event.originalEvent.pageX < elementCenter) {
        return statusIcons.index(element);
      } else if (element.next('.pio-terminal-status-icon').length > 0) {
        return statusIcons.index(element.next('.pio-terminal-status-icon'));
      } else {
        return statusIcons.index(element) + 1;
      }
    };

    StatusBar.prototype.getPlaceholder = function() {
      return this.placeholderEl != null ? this.placeholderEl : this.placeholderEl = $('<li class="placeholder"></li>');
    };

    StatusBar.prototype.removePlaceholder = function() {
      var ref1;
      if ((ref1 = this.placeholderEl) != null) {
        ref1.remove();
      }
      return this.placeholderEl = null;
    };

    StatusBar.prototype.isPlaceholder = function(element) {
      return element.is('.placeholder');
    };

    StatusBar.prototype.iconAtIndex = function(index) {
      return this.getStatusIcons().eq(index);
    };

    StatusBar.prototype.getStatusIcons = function() {
      return this.statusContainer.children('.pio-terminal-status-icon');
    };

    StatusBar.prototype.moveIconToIndex = function(icon, toIndex) {
      var container, followingIcon;
      followingIcon = this.getStatusIcons()[toIndex];
      container = this.statusContainer[0];
      if (followingIcon != null) {
        return container.insertBefore(icon, followingIcon);
      } else {
        return container.appendChild(icon);
      }
    };

    StatusBar.prototype.moveTerminalView = function(fromIndex, toIndex) {
      var activeTerminal, view;
      activeTerminal = this.getActiveTerminalView();
      view = this.terminalViews.splice(fromIndex, 1)[0];
      this.terminalViews.splice(toIndex, 0, view);
      return this.setActiveTerminalView(activeTerminal);
    };

    StatusBar.prototype.updateOrder = function(fromIndex, toIndex) {
      var icon;
      if (fromIndex === toIndex) {
        return;
      }
      if (fromIndex < toIndex) {
        toIndex--;
      }
      icon = this.getStatusIcons().eq(fromIndex).detach();
      this.moveIconToIndex(icon.get(0), toIndex);
      this.moveTerminalView(fromIndex, toIndex);
      icon.addClass('inserted');
      return icon.one('webkitAnimationEnd', function() {
        return icon.removeClass('inserted');
      });
    };

    return StatusBar;

  })(View);

}).call(this);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZmlsZTovLy9DOi9Vc2Vycy9ja25qdS8uYXRvbS9wYWNrYWdlcy9wbGF0Zm9ybWlvLWlkZS10ZXJtaW5hbC9saWIvc3RhdHVzLWJhci5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQSxNQUFBLDZGQUFBO0lBQUE7Ozs7RUFBQyxzQkFBdUIsT0FBQSxDQUFRLE1BQVI7O0VBQ3hCLE1BQVksT0FBQSxDQUFRLHNCQUFSLENBQVosRUFBQyxTQUFELEVBQUk7O0VBRUosc0JBQUEsR0FBeUIsT0FBQSxDQUFRLFFBQVI7O0VBQ3pCLFVBQUEsR0FBYSxPQUFBLENBQVEsZUFBUjs7RUFFYixFQUFBLEdBQUssT0FBQSxDQUFRLElBQVI7O0VBQ0wsSUFBQSxHQUFPLE9BQUEsQ0FBUSxNQUFSOztFQUNQLENBQUEsR0FBSSxPQUFBLENBQVEsWUFBUjs7RUFFSixNQUFNLENBQUMsT0FBUCxHQUNNOzs7Ozs7Ozs7Ozs7Ozs7d0JBQ0osYUFBQSxHQUFlOzt3QkFDZixjQUFBLEdBQWdCOzt3QkFDaEIsV0FBQSxHQUFhOztJQUViLFNBQUMsQ0FBQSxPQUFELEdBQVUsU0FBQTthQUNSLElBQUMsQ0FBQSxHQUFELENBQUs7UUFBQSxDQUFBLEtBQUEsQ0FBQSxFQUFPLG9DQUFQO1FBQTZDLFFBQUEsRUFBVSxDQUFDLENBQXhEO09BQUwsRUFBZ0UsQ0FBQSxTQUFBLEtBQUE7ZUFBQSxTQUFBO1VBQzlELEtBQUMsQ0FBQSxDQUFELENBQUc7WUFBQSxDQUFBLEtBQUEsQ0FBQSxFQUFPLGdCQUFQO1lBQXlCLEtBQUEsRUFBTyxpQkFBaEM7WUFBbUQsTUFBQSxFQUFRLFNBQTNEO1dBQUg7VUFDQSxLQUFDLENBQUEsRUFBRCxDQUFJO1lBQUEsQ0FBQSxLQUFBLENBQUEsRUFBTyw4QkFBUDtZQUF1QyxRQUFBLEVBQVUsSUFBakQ7WUFBdUQsTUFBQSxFQUFRLGlCQUEvRDtZQUFrRixFQUFBLEVBQUksY0FBdEY7V0FBSjtp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QUFJLENBQUMsUUFBTCxDQUFjLFVBQWQ7YUFDQSxJQUFJLENBQUMsR0FBTCxDQUFTLG9CQUFULEVBQStCLFNBQUE7ZUFBRyxJQUFJLENBQUMsV0FBTCxDQUFpQixVQUFqQjtNQUFILENBQS9CO0lBUlc7Ozs7S0F4ZFM7QUFYeEIiLCJzb3VyY2VzQ29udGVudCI6WyJ7Q29tcG9zaXRlRGlzcG9zYWJsZX0gPSByZXF1aXJlICdhdG9tJ1xueyQsIFZpZXd9ID0gcmVxdWlyZSAnYXRvbS1zcGFjZS1wZW4tdmlld3MnXG5cblBsYXRmb3JtSU9UZXJtaW5hbFZpZXcgPSByZXF1aXJlICcuL3ZpZXcnXG5TdGF0dXNJY29uID0gcmVxdWlyZSAnLi9zdGF0dXMtaWNvbidcblxub3MgPSByZXF1aXJlICdvcydcbnBhdGggPSByZXF1aXJlICdwYXRoJ1xuXyA9IHJlcXVpcmUgJ3VuZGVyc2NvcmUnXG5cbm1vZHVsZS5leHBvcnRzID1cbmNsYXNzIFN0YXR1c0JhciBleHRlbmRzIFZpZXdcbiAgdGVybWluYWxWaWV3czogW11cbiAgYWN0aXZlVGVybWluYWw6IG51bGxcbiAgcmV0dXJuRm9jdXM6IG51bGxcblxuICBAY29udGVudDogLT5cbiAgICBAZGl2IGNsYXNzOiAncGxhdGZvcm1pby1pZGUtdGVybWluYWwgc3RhdHVzLWJhcicsIHRhYmluZGV4OiAtMSwgPT5cbiAgICAgIEBpIGNsYXNzOiBcImljb24gaWNvbi1wbHVzXCIsIGNsaWNrOiAnbmV3VGVybWluYWxWaWV3Jywgb3V0bGV0OiAncGx1c0J0bidcbiAgICAgIEB1bCBjbGFzczogXCJsaXN0LWlubGluZSBzdGF0dXMtY29udGFpbmVyXCIsIHRhYmluZGV4OiAnLTEnLCBvdXRsZXQ6ICdzdGF0dXNDb250YWluZXInLCBpczogJ3NwYWNlLXBlbi11bCdcbiAgICAgIEBpIGNsYXNzOiBcImljb24gaWNvbi14XCIsIGNsaWNrOiAnY2xvc2VBbGwnLCBvdXRsZXQ6ICdjbG9zZUJ0bidcblxuICBpbml0aWFsaXplOiAoQHN0YXR1c0JhclByb3ZpZGVyKSAtPlxuICAgIEBzdWJzY3JpcHRpb25zID0gbmV3IENvbXBvc2l0ZURpc3Bvc2FibGUoKVxuXG4gICAgQHN1YnNjcmlwdGlvbnMuYWRkIGF0b20uY29tbWFuZHMuYWRkICdhdG9tLXdvcmtzcGFjZScsXG4gICAgICAncGxhdGZvcm1pby1pZGUtdGVybWluYWw6Zm9jdXMnOiA9PiBAZm9jdXNUZXJtaW5hbCgpXG4gICAgICAncGxhdGZvcm1pby1pZGUtdGVybWluYWw6bmV3JzogPT4gQG5ld1Rlcm1pbmFsVmlldygpXG4gICAgICAncGxhdGZvcm1pby1pZGUtdGVybWluYWw6dG9nZ2xlJzogPT4gQHRvZ2dsZSgpXG4gICAgICAncGxhdGZvcm1pby1pZGUtdGVybWluYWw6bmV4dCc6ID0+XG4gICAgICAgIHJldHVybiB1bmxlc3MgQGFjdGl2ZVRlcm1pbmFsXG4gICAgICAgIHJldHVybiBpZiBAYWN0aXZlVGVybWluYWwuaXNBbmltYXRpbmcoKVxuICAgICAgICBAYWN0aXZlVGVybWluYWwub3BlbigpIGlmIEBhY3RpdmVOZXh0VGVybWluYWxWaWV3KClcbiAgICAgICdwbGF0Zm9ybWlvLWlkZS10ZXJtaW5hbDpwcmV2JzogPT5cbiAgICAgICAgcmV0dXJuIHVubGVzcyBAYWN0aXZlVGVybWluYWxcbiAgICAgICAgcmV0dXJuIGlmIEBhY3RpdmVUZXJtaW5hbC5pc0FuaW1hdGluZygpXG4gICAgICAgIEBhY3RpdmVUZXJtaW5hbC5vcGVuKCkgaWYgQGFjdGl2ZVByZXZUZXJtaW5hbFZpZXcoKVxuICAgICAgJ3BsYXRmb3JtaW8taWRlLXRlcm1pbmFsOmNsZWFyJzogPT4gQGNsZWFyKClcbiAgICAgICdwbGF0Zm9ybWlvLWlkZS10ZXJtaW5hbDpjbG9zZSc6ID0+IEBkZXN0cm95QWN0aXZlVGVybSgpXG4gICAgICAncGxhdGZvcm1pby1pZGUtdGVybWluYWw6Y2xvc2UtYWxsJzogPT4gQGNsb3NlQWxsKClcbiAgICAgICdwbGF0Zm9ybWlvLWlkZS10ZXJtaW5hbDpyZW5hbWUnOiA9PiBAcnVuSW5BY3RpdmVWaWV3IChpKSAtPiBpLnJlbmFtZSgpXG4gICAgICAncGxhdGZvcm1pby1pZGUtdGVybWluYWw6aW5zZXJ0LXNlbGVjdGVkLXRleHQnOiA9PiBAcnVuSW5BY3RpdmVWaWV3IChpKSAtPiBpLmluc2VydFNlbGVjdGlvbignJFMnKVxuICAgICAgJ3BsYXRmb3JtaW8taWRlLXRlcm1pbmFsOmluc2VydC10ZXh0JzogPT4gQHJ1bkluQWN0aXZlVmlldyAoaSkgLT4gaS5pbnB1dERpYWxvZygpXG4gICAgICAncGxhdGZvcm1pby1pZGUtdGVybWluYWw6aW5zZXJ0LWN1c3RvbS10ZXh0LTEnOiA9PiBAcnVuSW5BY3RpdmVWaWV3IChpKSAtPiBpLmluc2VydFNlbGVjdGlvbihhdG9tLmNvbmZpZy5nZXQoJ3BsYXRmb3JtaW8taWRlLXRlcm1pbmFsLmN1c3RvbVRleHRzLmN1c3RvbVRleHQxJykpXG4gICAgICAncGxhdGZvcm1pby1pZGUtdGVybWluYWw6aW5zZXJ0LWN1c3RvbS10ZXh0LTInOiA9PiBAcnVuSW5BY3RpdmVWaWV3IChpKSAtPiBpLmluc2VydFNlbGVjdGlvbihhdG9tLmNvbmZpZy5nZXQoJ3BsYXRmb3JtaW8taWRlLXRlcm1pbmFsLmN1c3RvbVRleHRzLmN1c3RvbVRleHQyJykpXG4gICAgICAncGxhdGZvcm1pby1pZGUtdGVybWluYWw6aW5zZXJ0LWN1c3RvbS10ZXh0LTMnOiA9PiBAcnVuSW5BY3RpdmVWaWV3IChpKSAtPiBpLmluc2VydFNlbGVjdGlvbihhdG9tLmNvbmZpZy5nZXQoJ3BsYXRmb3JtaW8taWRlLXRlcm1pbmFsLmN1c3RvbVRleHRzLmN1c3RvbVRleHQzJykpXG4gICAgICAncGxhdGZvcm1pby1pZGUtdGVybWluYWw6aW5zZXJ0LWN1c3RvbS10ZXh0LTQnOiA9PiBAcnVuSW5BY3RpdmVWaWV3IChpKSAtPiBpLmluc2VydFNlbGVjdGlvbihhdG9tLmNvbmZpZy5nZXQoJ3BsYXRmb3JtaW8taWRlLXRlcm1pbmFsLmN1c3RvbVRleHRzLmN1c3RvbVRleHQ0JykpXG4gICAgICAncGxhdGZvcm1pby1pZGUtdGVybWluYWw6aW5zZXJ0LWN1c3RvbS10ZXh0LTUnOiA9PiBAcnVuSW5BY3RpdmVWaWV3IChpKSAtPiBpLmluc2VydFNlbGVjdGlvbihhdG9tLmNvbmZpZy5nZXQoJ3BsYXRmb3JtaW8taWRlLXRlcm1pbmFsLmN1c3RvbVRleHRzLmN1c3RvbVRleHQ1JykpXG4gICAgICAncGxhdGZvcm1pby1pZGUtdGVybWluYWw6aW5zZXJ0LWN1c3RvbS10ZXh0LTYnOiA9PiBAcnVuSW5BY3RpdmVWaWV3IChpKSAtPiBpLmluc2VydFNlbGVjdGlvbihhdG9tLmNvbmZpZy5nZXQoJ3BsYXRmb3JtaW8taWRlLXRlcm1pbmFsLmN1c3RvbVRleHRzLmN1c3RvbVRleHQ2JykpXG4gICAgICAncGxhdGZvcm1pby1pZGUtdGVybWluYWw6aW5zZXJ0LWN1c3RvbS10ZXh0LTcnOiA9PiBAcnVuSW5BY3RpdmVWaWV3IChpKSAtPiBpLmluc2VydFNlbGVjdGlvbihhdG9tLmNvbmZpZy5nZXQoJ3BsYXRmb3JtaW8taWRlLXRlcm1pbmFsLmN1c3RvbVRleHRzLmN1c3RvbVRleHQ3JykpXG4gICAgICAncGxhdGZvcm1pby1pZGUtdGVybWluYWw6aW5zZXJ0LWN1c3RvbS10ZXh0LTgnOiA9PiBAcnVuSW5BY3RpdmVWaWV3IChpKSAtPiBpLmluc2VydFNlbGVjdGlvbihhdG9tLmNvbmZpZy5nZXQoJ3BsYXRmb3JtaW8taWRlLXRlcm1pbmFsLmN1c3RvbVRleHRzLmN1c3RvbVRleHQ4JykpXG4gICAgICAncGxhdGZvcm1pby1pZGUtdGVybWluYWw6ZnVsbHNjcmVlbic6ID0+IEBhY3RpdmVUZXJtaW5hbC5tYXhpbWl6ZSgpXG5cbiAgICBAc3Vic2NyaXB0aW9ucy5hZGQgYXRvbS5jb21tYW5kcy5hZGQgJy54dGVybScsXG4gICAgICAncGxhdGZvcm1pby1pZGUtdGVybWluYWw6cGFzdGUnOiA9PiBAcnVuSW5BY3RpdmVWaWV3IChpKSAtPiBpLnBhc3RlKClcbiAgICAgICdwbGF0Zm9ybWlvLWlkZS10ZXJtaW5hbDpjb3B5JzogPT4gQHJ1bkluQWN0aXZlVmlldyAoaSkgLT4gaS5jb3B5KClcblxuICAgIEBzdWJzY3JpcHRpb25zLmFkZCBhdG9tLndvcmtzcGFjZS5vbkRpZENoYW5nZUFjdGl2ZVBhbmVJdGVtIChpdGVtKSA9PlxuICAgICAgcmV0dXJuIHVubGVzcyBpdGVtP1xuXG4gICAgICBpZiBpdGVtLmNvbnN0cnVjdG9yLm5hbWUgaXMgXCJQbGF0Zm9ybUlPVGVybWluYWxWaWV3XCJcbiAgICAgICAgc2V0VGltZW91dCBpdGVtLmZvY3VzLCAxMDBcbiAgICAgIGVsc2UgaWYgaXRlbS5jb25zdHJ1Y3Rvci5uYW1lIGlzIFwiVGV4dEVkaXRvclwiXG4gICAgICAgIG1hcHBpbmcgPSBhdG9tLmNvbmZpZy5nZXQoJ3BsYXRmb3JtaW8taWRlLXRlcm1pbmFsLmNvcmUubWFwVGVybWluYWxzVG8nKVxuICAgICAgICByZXR1cm4gaWYgbWFwcGluZyBpcyAnTm9uZSdcbiAgICAgICAgcmV0dXJuIHVubGVzcyBpdGVtLmdldFBhdGgoKVxuXG4gICAgICAgIHN3aXRjaCBtYXBwaW5nXG4gICAgICAgICAgd2hlbiAnRmlsZSdcbiAgICAgICAgICAgIG5leHRUZXJtaW5hbCA9IEBnZXRUZXJtaW5hbEJ5SWQgaXRlbS5nZXRQYXRoKCksICh2aWV3KSAtPiB2aWV3LmdldElkKCkuZmlsZVBhdGhcbiAgICAgICAgICB3aGVuICdGb2xkZXInXG4gICAgICAgICAgICBuZXh0VGVybWluYWwgPSBAZ2V0VGVybWluYWxCeUlkIHBhdGguZGlybmFtZShpdGVtLmdldFBhdGgoKSksICh2aWV3KSAtPiB2aWV3LmdldElkKCkuZm9sZGVyUGF0aFxuXG4gICAgICAgIHByZXZUZXJtaW5hbCA9IEBnZXRBY3RpdmVUZXJtaW5hbFZpZXcoKVxuICAgICAgICBpZiBwcmV2VGVybWluYWwgIT0gbmV4dFRlcm1pbmFsXG4gICAgICAgICAgaWYgbm90IG5leHRUZXJtaW5hbD9cbiAgICAgICAgICAgIGlmIGF0b20uY29uZmlnLmdldCgncGxhdGZvcm1pby1pZGUtdGVybWluYWwuY29yZS5tYXBUZXJtaW5hbHNUb0F1dG9PcGVuJylcbiAgICAgICAgICAgICAgbmV4dFRlcm1pbmFsID0gQGNyZWF0ZVRlcm1pbmFsVmlldygpXG4gICAgICAgICAgZWxzZVxuICAgICAgICAgICAgQHNldEFjdGl2ZVRlcm1pbmFsVmlldyhuZXh0VGVybWluYWwpXG4gICAgICAgICAgICBuZXh0VGVybWluYWwudG9nZ2xlKCkgaWYgcHJldlRlcm1pbmFsPy5wYW5lbC5pc1Zpc2libGUoKVxuXG4gICAgQHJlZ2lzdGVyQ29udGV4dE1lbnUoKVxuXG4gICAgQHN1YnNjcmlwdGlvbnMuYWRkIGF0b20udG9vbHRpcHMuYWRkIEBwbHVzQnRuLCB0aXRsZTogJ05ldyBUZXJtaW5hbCdcbiAgICBAc3Vic2NyaXB0aW9ucy5hZGQgYXRvbS50b29sdGlwcy5hZGQgQGNsb3NlQnRuLCB0aXRsZTogJ0Nsb3NlIEFsbCdcblxuICAgIEBzdGF0dXNDb250YWluZXIub24gJ2RibGNsaWNrJywgKGV2ZW50KSA9PlxuICAgICAgQG5ld1Rlcm1pbmFsVmlldygpIHVubGVzcyBldmVudC50YXJnZXQgIT0gZXZlbnQuZGVsZWdhdGVUYXJnZXRcblxuICAgIEBzdGF0dXNDb250YWluZXIub24gJ2RyYWdzdGFydCcsICcucGlvLXRlcm1pbmFsLXN0YXR1cy1pY29uJywgQG9uRHJhZ1N0YXJ0XG4gICAgQHN0YXR1c0NvbnRhaW5lci5vbiAnZHJhZ2VuZCcsICcucGlvLXRlcm1pbmFsLXN0YXR1cy1pY29uJywgQG9uRHJhZ0VuZFxuICAgIEBzdGF0dXNDb250YWluZXIub24gJ2RyYWdsZWF2ZScsIEBvbkRyYWdMZWF2ZVxuICAgIEBzdGF0dXNDb250YWluZXIub24gJ2RyYWdvdmVyJywgQG9uRHJhZ092ZXJcbiAgICBAc3RhdHVzQ29udGFpbmVyLm9uICdkcm9wJywgQG9uRHJvcFxuXG4gICAgaGFuZGxlQmx1ciA9ID0+XG4gICAgICBpZiB0ZXJtaW5hbCA9IFBsYXRmb3JtSU9UZXJtaW5hbFZpZXcuZ2V0Rm9jdXNlZFRlcm1pbmFsKClcbiAgICAgICAgQHJldHVybkZvY3VzID0gQHRlcm1pbmFsVmlld0ZvclRlcm1pbmFsKHRlcm1pbmFsKVxuICAgICAgICB0ZXJtaW5hbC5ibHVyKClcblxuICAgIGhhbmRsZUZvY3VzID0gPT5cbiAgICAgIGlmIEByZXR1cm5Gb2N1c1xuICAgICAgICBzZXRUaW1lb3V0ID0+XG4gICAgICAgICAgQHJldHVybkZvY3VzPy5mb2N1cyh0cnVlKVxuICAgICAgICAgIEByZXR1cm5Gb2N1cyA9IG51bGxcbiAgICAgICAgLCAxMDBcblxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyICdibHVyJywgaGFuZGxlQmx1clxuICAgIEBzdWJzY3JpcHRpb25zLmFkZCBkaXNwb3NlOiAtPlxuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIgJ2JsdXInLCBoYW5kbGVCbHVyXG5cbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lciAnZm9jdXMnLCBoYW5kbGVGb2N1c1xuICAgIEBzdWJzY3JpcHRpb25zLmFkZCBkaXNwb3NlOiAtPlxuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIgJ2ZvY3VzJywgaGFuZGxlRm9jdXNcblxuICAgIEBhdHRhY2goKVxuXG4gIHJlZ2lzdGVyQ29udGV4dE1lbnU6IC0+XG4gICAgQHN1YnNjcmlwdGlvbnMuYWRkIGF0b20uY29tbWFuZHMuYWRkICcucGxhdGZvcm1pby1pZGUtdGVybWluYWwuc3RhdHVzLWJhcicsXG4gICAgICAncGxhdGZvcm1pby1pZGUtdGVybWluYWw6c3RhdHVzLXJlZCc6IEBzZXRTdGF0dXNDb2xvclxuICAgICAgJ3BsYXRmb3JtaW8taWRlLXRlcm1pbmFsOnN0YXR1cy1vcmFuZ2UnOiBAc2V0U3RhdHVzQ29sb3JcbiAgICAgICdwbGF0Zm9ybWlvLWlkZS10ZXJtaW5hbDpzdGF0dXMteWVsbG93JzogQHNldFN0YXR1c0NvbG9yXG4gICAgICAncGxhdGZvcm1pby1pZGUtdGVybWluYWw6c3RhdHVzLWdyZWVuJzogQHNldFN0YXR1c0NvbG9yXG4gICAgICAncGxhdGZvcm1pby1pZGUtdGVybWluYWw6c3RhdHVzLWJsdWUnOiBAc2V0U3RhdHVzQ29sb3JcbiAgICAgICdwbGF0Zm9ybWlvLWlkZS10ZXJtaW5hbDpzdGF0dXMtcHVycGxlJzogQHNldFN0YXR1c0NvbG9yXG4gICAgICAncGxhdGZvcm1pby1pZGUtdGVybWluYWw6c3RhdHVzLXBpbmsnOiBAc2V0U3RhdHVzQ29sb3JcbiAgICAgICdwbGF0Zm9ybWlvLWlkZS10ZXJtaW5hbDpzdGF0dXMtY3lhbic6IEBzZXRTdGF0dXNDb2xvclxuICAgICAgJ3BsYXRmb3JtaW8taWRlLXRlcm1pbmFsOnN0YXR1cy1tYWdlbnRhJzogQHNldFN0YXR1c0NvbG9yXG4gICAgICAncGxhdGZvcm1pby1pZGUtdGVybWluYWw6c3RhdHVzLWRlZmF1bHQnOiBAY2xlYXJTdGF0dXNDb2xvclxuICAgICAgJ3BsYXRmb3JtaW8taWRlLXRlcm1pbmFsOmNvbnRleHQtY2xvc2UnOiAoZXZlbnQpIC0+XG4gICAgICAgICQoZXZlbnQudGFyZ2V0KS5jbG9zZXN0KCcucGlvLXRlcm1pbmFsLXN0YXR1cy1pY29uJylbMF0udGVybWluYWxWaWV3LmRlc3Ryb3koKVxuICAgICAgJ3BsYXRmb3JtaW8taWRlLXRlcm1pbmFsOmNvbnRleHQtaGlkZSc6IChldmVudCkgLT5cbiAgICAgICAgc3RhdHVzSWNvbiA9ICQoZXZlbnQudGFyZ2V0KS5jbG9zZXN0KCcucGlvLXRlcm1pbmFsLXN0YXR1cy1pY29uJylbMF1cbiAgICAgICAgc3RhdHVzSWNvbi50ZXJtaW5hbFZpZXcuaGlkZSgpIGlmIHN0YXR1c0ljb24uaXNBY3RpdmUoKVxuICAgICAgJ3BsYXRmb3JtaW8taWRlLXRlcm1pbmFsOmNvbnRleHQtcmVuYW1lJzogKGV2ZW50KSAtPlxuICAgICAgICAkKGV2ZW50LnRhcmdldCkuY2xvc2VzdCgnLnBpby10ZXJtaW5hbC1zdGF0dXMtaWNvbicpWzBdLnJlbmFtZSgpXG5cbiAgcmVnaXN0ZXJQYW5lU3Vic2NyaXB0aW9uOiAtPlxuICAgIEBzdWJzY3JpcHRpb25zLmFkZCBAcGFuZVN1YnNjcmlwdGlvbiA9IGF0b20ud29ya3NwYWNlLm9ic2VydmVQYW5lcyAocGFuZSkgPT5cbiAgICAgIHBhbmVFbGVtZW50ID0gJChhdG9tLnZpZXdzLmdldFZpZXcocGFuZSkpXG4gICAgICB0YWJCYXIgPSBwYW5lRWxlbWVudC5maW5kKCd1bCcpXG5cbiAgICAgIHRhYkJhci5vbiAnZHJvcCcsIChldmVudCkgPT4gQG9uRHJvcFRhYkJhcihldmVudCwgcGFuZSlcbiAgICAgIHRhYkJhci5vbiAnZHJhZ3N0YXJ0JywgKGV2ZW50KSAtPlxuICAgICAgICByZXR1cm4gdW5sZXNzIGV2ZW50LnRhcmdldC5pdGVtPy5jb25zdHJ1Y3Rvci5uYW1lIGlzICdQbGF0Zm9ybUlPVGVybWluYWxWaWV3J1xuICAgICAgICBldmVudC5vcmlnaW5hbEV2ZW50LmRhdGFUcmFuc2Zlci5zZXREYXRhICdwbGF0Zm9ybWlvLWlkZS10ZXJtaW5hbC10YWInLCAndHJ1ZSdcbiAgICAgIHBhbmUub25EaWREZXN0cm95IC0+IHRhYkJhci5vZmYgJ2Ryb3AnLCBAb25Ecm9wVGFiQmFyXG5cbiAgY3JlYXRlVGVybWluYWxWaWV3OiAoYXV0b1J1bikgLT5cbiAgICBzaGVsbCA9IGF0b20uY29uZmlnLmdldCAncGxhdGZvcm1pby1pZGUtdGVybWluYWwuY29yZS5zaGVsbCdcbiAgICBzaGVsbEFyZ3VtZW50cyA9IGF0b20uY29uZmlnLmdldCAncGxhdGZvcm1pby1pZGUtdGVybWluYWwuY29yZS5zaGVsbEFyZ3VtZW50cydcbiAgICBhcmdzID0gc2hlbGxBcmd1bWVudHMuc3BsaXQoL1xccysvZykuZmlsdGVyIChhcmcpIC0+IGFyZ1xuICAgIHNoZWxsRW52ID0gYXRvbS5jb25maWcuZ2V0ICdwbGF0Zm9ybWlvLWlkZS10ZXJtaW5hbC5jb3JlLnNoZWxsRW52J1xuICAgIGVudiA9IHt9XG4gICAgc2hlbGxFbnYuc3BsaXQoJyAnKS5mb3JFYWNoKChlbGVtZW50KSA9PlxuICAgICAgY29uZmlnVmFyID0gZWxlbWVudC5zcGxpdCgnPScpXG4gICAgICBlbnZWYXIgPSB7fVxuICAgICAgZW52VmFyW2NvbmZpZ1ZhclswXV0gPSBjb25maWdWYXJbMV1cbiAgICAgIGVudiA9IF8uZXh0ZW5kKGVudiwgZW52VmFyKVxuICAgIClcbiAgICBAY3JlYXRlRW1wdHlUZXJtaW5hbFZpZXcgYXV0b1J1biwgc2hlbGwsIGFyZ3MsIGVudlxuXG4gIGNyZWF0ZUVtcHR5VGVybWluYWxWaWV3OiAoYXV0b1J1bj1bXSwgc2hlbGwgPSBudWxsLCBhcmdzID0gW10sIGVudj0ge30pIC0+XG4gICAgQHJlZ2lzdGVyUGFuZVN1YnNjcmlwdGlvbigpIHVubGVzcyBAcGFuZVN1YnNjcmlwdGlvbj9cblxuICAgIHByb2plY3RGb2xkZXIgPSBhdG9tLnByb2plY3QuZ2V0UGF0aHMoKVswXVxuICAgIGVkaXRvclBhdGggPSBhdG9tLndvcmtzcGFjZS5nZXRBY3RpdmVUZXh0RWRpdG9yKCk/LmdldFBhdGgoKVxuXG4gICAgaWYgZWRpdG9yUGF0aD9cbiAgICAgIGVkaXRvckZvbGRlciA9IHBhdGguZGlybmFtZShlZGl0b3JQYXRoKVxuICAgICAgZm9yIGRpcmVjdG9yeSBpbiBhdG9tLnByb2plY3QuZ2V0UGF0aHMoKVxuICAgICAgICBpZiBlZGl0b3JQYXRoLmluZGV4T2YoZGlyZWN0b3J5KSA+PSAwXG4gICAgICAgICAgcHJvamVjdEZvbGRlciA9IGRpcmVjdG9yeVxuXG4gICAgcHJvamVjdEZvbGRlciA9IHVuZGVmaW5lZCBpZiBwcm9qZWN0Rm9sZGVyPy5pbmRleE9mKCdhdG9tOi8vJykgPj0gMFxuXG4gICAgaG9tZSA9IGlmIHByb2Nlc3MucGxhdGZvcm0gaXMgJ3dpbjMyJyB0aGVuIHByb2Nlc3MuZW52LkhPTUVQQVRIIGVsc2UgcHJvY2Vzcy5lbnYuSE9NRVxuXG4gICAgc3dpdGNoIGF0b20uY29uZmlnLmdldCgncGxhdGZvcm1pby1pZGUtdGVybWluYWwuY29yZS53b3JraW5nRGlyZWN0b3J5JylcbiAgICAgIHdoZW4gJ1Byb2plY3QnIHRoZW4gcHdkID0gcHJvamVjdEZvbGRlciBvciBlZGl0b3JGb2xkZXIgb3IgaG9tZVxuICAgICAgd2hlbiAnQWN0aXZlIEZpbGUnIHRoZW4gcHdkID0gZWRpdG9yRm9sZGVyIG9yIHByb2plY3RGb2xkZXIgb3IgaG9tZVxuICAgICAgZWxzZSBwd2QgPSBob21lXG5cbiAgICBpZCA9IGVkaXRvclBhdGggb3IgcHJvamVjdEZvbGRlciBvciBob21lXG4gICAgaWQgPSBmaWxlUGF0aDogaWQsIGZvbGRlclBhdGg6IHBhdGguZGlybmFtZShpZClcblxuICAgIHN0YXR1c0ljb24gPSBuZXcgU3RhdHVzSWNvbigpXG4gICAgcGxhdGZvcm1JT1Rlcm1pbmFsVmlldyA9IG5ldyBQbGF0Zm9ybUlPVGVybWluYWxWaWV3KGlkLCBwd2QsIHN0YXR1c0ljb24sIHRoaXMsIHNoZWxsLCBhcmdzLCBlbnYsIGF1dG9SdW4pXG4gICAgc3RhdHVzSWNvbi5pbml0aWFsaXplKHBsYXRmb3JtSU9UZXJtaW5hbFZpZXcpXG5cbiAgICBwbGF0Zm9ybUlPVGVybWluYWxWaWV3LmF0dGFjaCgpXG5cbiAgICBAdGVybWluYWxWaWV3cy5wdXNoIHBsYXRmb3JtSU9UZXJtaW5hbFZpZXdcbiAgICBAc3RhdHVzQ29udGFpbmVyLmFwcGVuZCBzdGF0dXNJY29uXG4gICAgcmV0dXJuIHBsYXRmb3JtSU9UZXJtaW5hbFZpZXdcblxuICBhY3RpdmVOZXh0VGVybWluYWxWaWV3OiAtPlxuICAgIGluZGV4ID0gQGluZGV4T2YoQGFjdGl2ZVRlcm1pbmFsKVxuICAgIHJldHVybiBmYWxzZSBpZiBpbmRleCA8IDBcbiAgICBAYWN0aXZlVGVybWluYWxWaWV3IGluZGV4ICsgMVxuXG4gIGFjdGl2ZVByZXZUZXJtaW5hbFZpZXc6IC0+XG4gICAgaW5kZXggPSBAaW5kZXhPZihAYWN0aXZlVGVybWluYWwpXG4gICAgcmV0dXJuIGZhbHNlIGlmIGluZGV4IDwgMFxuICAgIEBhY3RpdmVUZXJtaW5hbFZpZXcgaW5kZXggLSAxXG5cbiAgaW5kZXhPZjogKHZpZXcpIC0+XG4gICAgQHRlcm1pbmFsVmlld3MuaW5kZXhPZih2aWV3KVxuXG4gIGFjdGl2ZVRlcm1pbmFsVmlldzogKGluZGV4KSAtPlxuICAgIHJldHVybiBmYWxzZSBpZiBAdGVybWluYWxWaWV3cy5sZW5ndGggPCAyXG5cbiAgICBpZiBpbmRleCA+PSBAdGVybWluYWxWaWV3cy5sZW5ndGhcbiAgICAgIGluZGV4ID0gMFxuICAgIGlmIGluZGV4IDwgMFxuICAgICAgaW5kZXggPSBAdGVybWluYWxWaWV3cy5sZW5ndGggLSAxXG5cbiAgICBAYWN0aXZlVGVybWluYWwgPSBAdGVybWluYWxWaWV3c1tpbmRleF1cbiAgICByZXR1cm4gdHJ1ZVxuXG4gIGdldEFjdGl2ZVRlcm1pbmFsVmlldzogLT5cbiAgICByZXR1cm4gQGFjdGl2ZVRlcm1pbmFsXG5cbiAgZm9jdXNUZXJtaW5hbDogLT5cbiAgICByZXR1cm4gdW5sZXNzIEBhY3RpdmVUZXJtaW5hbD9cblxuICAgIGlmIHRlcm1pbmFsID0gUGxhdGZvcm1JT1Rlcm1pbmFsVmlldy5nZXRGb2N1c2VkVGVybWluYWwoKVxuICAgICAgICBAYWN0aXZlVGVybWluYWwuYmx1cigpXG4gICAgZWxzZVxuICAgICAgICBAYWN0aXZlVGVybWluYWwuZm9jdXNUZXJtaW5hbCgpXG5cbiAgZ2V0VGVybWluYWxCeUlkOiAodGFyZ2V0LCBzZWxlY3RvcikgLT5cbiAgICBzZWxlY3RvciA/PSAodGVybWluYWwpIC0+IHRlcm1pbmFsLmlkXG5cbiAgICBmb3IgaW5kZXggaW4gWzAgLi4gQHRlcm1pbmFsVmlld3MubGVuZ3RoXVxuICAgICAgdGVybWluYWwgPSBAdGVybWluYWxWaWV3c1tpbmRleF1cbiAgICAgIGlmIHRlcm1pbmFsP1xuICAgICAgICByZXR1cm4gdGVybWluYWwgaWYgc2VsZWN0b3IodGVybWluYWwpID09IHRhcmdldFxuXG4gICAgcmV0dXJuIG51bGxcblxuICB0ZXJtaW5hbFZpZXdGb3JUZXJtaW5hbDogKHRlcm1pbmFsKSAtPlxuICAgIGZvciBpbmRleCBpbiBbMCAuLiBAdGVybWluYWxWaWV3cy5sZW5ndGhdXG4gICAgICB0ZXJtaW5hbFZpZXcgPSBAdGVybWluYWxWaWV3c1tpbmRleF1cbiAgICAgIGlmIHRlcm1pbmFsVmlldz9cbiAgICAgICAgcmV0dXJuIHRlcm1pbmFsVmlldyBpZiB0ZXJtaW5hbFZpZXcuZ2V0VGVybWluYWwoKSA9PSB0ZXJtaW5hbFxuXG4gICAgcmV0dXJuIG51bGxcblxuICBydW5JbkFjdGl2ZVZpZXc6IChjYWxsYmFjaykgLT5cbiAgICB2aWV3ID0gQGdldEFjdGl2ZVRlcm1pbmFsVmlldygpXG4gICAgaWYgdmlldz9cbiAgICAgIHJldHVybiBjYWxsYmFjayh2aWV3KVxuICAgIHJldHVybiBudWxsXG5cbiAgcnVuTmV3VGVybWluYWw6ICgpIC0+XG4gICAgQGFjdGl2ZVRlcm1pbmFsID0gQGNyZWF0ZUVtcHR5VGVybWluYWxWaWV3KClcbiAgICBAYWN0aXZlVGVybWluYWwudG9nZ2xlKClcbiAgICByZXR1cm4gQGFjdGl2ZVRlcm1pbmFsXG5cbiAgcnVuQ29tbWFuZEluTmV3VGVybWluYWw6IChjb21tYW5kcykgLT5cbiAgICBAYWN0aXZlVGVybWluYWwgPSBAY3JlYXRlVGVybWluYWxWaWV3KGNvbW1hbmRzKVxuICAgIEBhY3RpdmVUZXJtaW5hbC50b2dnbGUoKVxuXG4gIHJ1bkluT3BlblZpZXc6IChjYWxsYmFjaykgLT5cbiAgICB2aWV3ID0gQGdldEFjdGl2ZVRlcm1pbmFsVmlldygpXG4gICAgaWYgdmlldz8gYW5kIHZpZXcucGFuZWwuaXNWaXNpYmxlKClcbiAgICAgIHJldHVybiBjYWxsYmFjayh2aWV3KVxuICAgIHJldHVybiBudWxsXG5cbiAgc2V0QWN0aXZlVGVybWluYWxWaWV3OiAodmlldykgLT5cbiAgICBAYWN0aXZlVGVybWluYWwgPSB2aWV3XG5cbiAgcmVtb3ZlVGVybWluYWxWaWV3OiAodmlldykgLT5cbiAgICBpbmRleCA9IEBpbmRleE9mIHZpZXdcbiAgICByZXR1cm4gaWYgaW5kZXggPCAwXG4gICAgQHRlcm1pbmFsVmlld3Muc3BsaWNlIGluZGV4LCAxXG5cbiAgICBAYWN0aXZhdGVBZGphY2VudFRlcm1pbmFsIGluZGV4XG5cbiAgYWN0aXZhdGVBZGphY2VudFRlcm1pbmFsOiAoaW5kZXg9MCkgLT5cbiAgICByZXR1cm4gZmFsc2UgdW5sZXNzIEB0ZXJtaW5hbFZpZXdzLmxlbmd0aCA+IDBcblxuICAgIGluZGV4ID0gTWF0aC5tYXgoMCwgaW5kZXggLSAxKVxuICAgIEBhY3RpdmVUZXJtaW5hbCA9IEB0ZXJtaW5hbFZpZXdzW2luZGV4XVxuXG4gICAgcmV0dXJuIHRydWVcblxuICBuZXdUZXJtaW5hbFZpZXc6IC0+XG4gICAgcmV0dXJuIGlmIEBhY3RpdmVUZXJtaW5hbD8uYW5pbWF0aW5nXG5cbiAgICBAYWN0aXZlVGVybWluYWwgPSBAY3JlYXRlVGVybWluYWxWaWV3KClcbiAgICBAYWN0aXZlVGVybWluYWwudG9nZ2xlKClcblxuICBhdHRhY2g6IC0+XG4gICAgQHN0YXR1c0JhclByb3ZpZGVyLmFkZExlZnRUaWxlKGl0ZW06IHRoaXMsIHByaW9yaXR5OiAtOTMpXG5cbiAgZGVzdHJveUFjdGl2ZVRlcm06IC0+XG4gICAgcmV0dXJuIHVubGVzcyBAYWN0aXZlVGVybWluYWw/XG5cbiAgICBpbmRleCA9IEBpbmRleE9mKEBhY3RpdmVUZXJtaW5hbClcbiAgICBAYWN0aXZlVGVybWluYWwuZGVzdHJveSgpXG4gICAgQGFjdGl2ZVRlcm1pbmFsID0gbnVsbFxuXG4gICAgQGFjdGl2YXRlQWRqYWNlbnRUZXJtaW5hbCBpbmRleFxuXG4gIGNsb3NlQWxsOiA9PlxuICAgIGZvciBpbmRleCBpbiBbQHRlcm1pbmFsVmlld3MubGVuZ3RoIC4uIDBdXG4gICAgICB2aWV3ID0gQHRlcm1pbmFsVmlld3NbaW5kZXhdXG4gICAgICBpZiB2aWV3P1xuICAgICAgICB2aWV3LmRlc3Ryb3koKVxuICAgIEBhY3RpdmVUZXJtaW5hbCA9IG51bGxcblxuICBkZXN0cm95OiAtPlxuICAgIEBzdWJzY3JpcHRpb25zLmRpc3Bvc2UoKVxuICAgIGZvciB2aWV3IGluIEB0ZXJtaW5hbFZpZXdzXG4gICAgICB2aWV3LnB0eVByb2Nlc3MudGVybWluYXRlKClcbiAgICAgIHZpZXcudGVybWluYWwuZGVzdHJveSgpXG4gICAgQGRldGFjaCgpXG5cbiAgdG9nZ2xlOiAtPlxuICAgIGlmIEB0ZXJtaW5hbFZpZXdzLmxlbmd0aCA9PSAwXG4gICAgICBAYWN0aXZlVGVybWluYWwgPSBAY3JlYXRlVGVybWluYWxWaWV3KClcbiAgICBlbHNlIGlmIEBhY3RpdmVUZXJtaW5hbCA9PSBudWxsXG4gICAgICBAYWN0aXZlVGVybWluYWwgPSBAdGVybWluYWxWaWV3c1swXVxuICAgIEBhY3RpdmVUZXJtaW5hbC50b2dnbGUoKVxuXG4gIGNsZWFyOiAtPlxuICAgIEBkZXN0cm95QWN0aXZlVGVybSgpXG4gICAgQG5ld1Rlcm1pbmFsVmlldygpXG5cbiAgc2V0U3RhdHVzQ29sb3I6IChldmVudCkgLT5cbiAgICBjb2xvciA9IGV2ZW50LnR5cGUubWF0Y2goL1xcdyskLylbMF1cbiAgICBjb2xvciA9IGF0b20uY29uZmlnLmdldChcInBsYXRmb3JtaW8taWRlLXRlcm1pbmFsLmljb25Db2xvcnMuI3tjb2xvcn1cIikudG9SR0JBU3RyaW5nKClcbiAgICAkKGV2ZW50LnRhcmdldCkuY2xvc2VzdCgnLnBpby10ZXJtaW5hbC1zdGF0dXMtaWNvbicpLmNzcyAnY29sb3InLCBjb2xvclxuXG4gIGNsZWFyU3RhdHVzQ29sb3I6IChldmVudCkgLT5cbiAgICAkKGV2ZW50LnRhcmdldCkuY2xvc2VzdCgnLnBpby10ZXJtaW5hbC1zdGF0dXMtaWNvbicpLmNzcyAnY29sb3InLCAnJ1xuXG4gIG9uRHJhZ1N0YXJ0OiAoZXZlbnQpID0+XG4gICAgZXZlbnQub3JpZ2luYWxFdmVudC5kYXRhVHJhbnNmZXIuc2V0RGF0YSAncGxhdGZvcm1pby1pZGUtdGVybWluYWwtcGFuZWwnLCAndHJ1ZSdcblxuICAgIGVsZW1lbnQgPSAkKGV2ZW50LnRhcmdldCkuY2xvc2VzdCgnLnBpby10ZXJtaW5hbC1zdGF0dXMtaWNvbicpXG4gICAgZWxlbWVudC5hZGRDbGFzcyAnaXMtZHJhZ2dpbmcnXG4gICAgZXZlbnQub3JpZ2luYWxFdmVudC5kYXRhVHJhbnNmZXIuc2V0RGF0YSAnZnJvbS1pbmRleCcsIGVsZW1lbnQuaW5kZXgoKVxuXG4gIG9uRHJhZ0xlYXZlOiAoZXZlbnQpID0+XG4gICAgQHJlbW92ZVBsYWNlaG9sZGVyKClcblxuICBvbkRyYWdFbmQ6IChldmVudCkgPT5cbiAgICBAY2xlYXJEcm9wVGFyZ2V0KClcblxuICBvbkRyYWdPdmVyOiAoZXZlbnQpID0+XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKVxuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpXG4gICAgdW5sZXNzIGV2ZW50Lm9yaWdpbmFsRXZlbnQuZGF0YVRyYW5zZmVyLmdldERhdGEoJ3BsYXRmb3JtaW8taWRlLXRlcm1pbmFsJykgaXMgJ3RydWUnXG4gICAgICByZXR1cm5cblxuICAgIG5ld0Ryb3BUYXJnZXRJbmRleCA9IEBnZXREcm9wVGFyZ2V0SW5kZXgoZXZlbnQpXG4gICAgcmV0dXJuIHVubGVzcyBuZXdEcm9wVGFyZ2V0SW5kZXg/XG4gICAgQHJlbW92ZURyb3BUYXJnZXRDbGFzc2VzKClcbiAgICBzdGF0dXNJY29ucyA9IEBzdGF0dXNDb250YWluZXIuY2hpbGRyZW4gJy5waW8tdGVybWluYWwtc3RhdHVzLWljb24nXG5cbiAgICBpZiBuZXdEcm9wVGFyZ2V0SW5kZXggPCBzdGF0dXNJY29ucy5sZW5ndGhcbiAgICAgIGVsZW1lbnQgPSBzdGF0dXNJY29ucy5lcShuZXdEcm9wVGFyZ2V0SW5kZXgpLmFkZENsYXNzICdpcy1kcm9wLXRhcmdldCdcbiAgICAgIEBnZXRQbGFjZWhvbGRlcigpLmluc2VydEJlZm9yZShlbGVtZW50KVxuICAgIGVsc2VcbiAgICAgIGVsZW1lbnQgPSBzdGF0dXNJY29ucy5lcShuZXdEcm9wVGFyZ2V0SW5kZXggLSAxKS5hZGRDbGFzcyAnZHJvcC10YXJnZXQtaXMtYWZ0ZXInXG4gICAgICBAZ2V0UGxhY2Vob2xkZXIoKS5pbnNlcnRBZnRlcihlbGVtZW50KVxuXG4gIG9uRHJvcDogKGV2ZW50KSA9PlxuICAgIHtkYXRhVHJhbnNmZXJ9ID0gZXZlbnQub3JpZ2luYWxFdmVudFxuICAgIHBhbmVsRXZlbnQgPSBkYXRhVHJhbnNmZXIuZ2V0RGF0YSgncGxhdGZvcm1pby1pZGUtdGVybWluYWwtcGFuZWwnKSBpcyAndHJ1ZSdcbiAgICB0YWJFdmVudCA9IGRhdGFUcmFuc2Zlci5nZXREYXRhKCdwbGF0Zm9ybWlvLWlkZS10ZXJtaW5hbC10YWInKSBpcyAndHJ1ZSdcbiAgICByZXR1cm4gdW5sZXNzIHBhbmVsRXZlbnQgb3IgdGFiRXZlbnRcblxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KClcbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKVxuXG4gICAgdG9JbmRleCA9IEBnZXREcm9wVGFyZ2V0SW5kZXgoZXZlbnQpXG4gICAgQGNsZWFyRHJvcFRhcmdldCgpXG5cbiAgICBpZiB0YWJFdmVudFxuICAgICAgZnJvbUluZGV4ID0gcGFyc2VJbnQoZGF0YVRyYW5zZmVyLmdldERhdGEoJ3NvcnRhYmxlLWluZGV4JykpXG4gICAgICBwYW5lSW5kZXggPSBwYXJzZUludChkYXRhVHJhbnNmZXIuZ2V0RGF0YSgnZnJvbS1wYW5lLWluZGV4JykpXG4gICAgICBwYW5lID0gYXRvbS53b3Jrc3BhY2UuZ2V0UGFuZXMoKVtwYW5lSW5kZXhdXG4gICAgICB2aWV3ID0gcGFuZS5pdGVtQXRJbmRleChmcm9tSW5kZXgpXG4gICAgICBwYW5lLnJlbW92ZUl0ZW0odmlldywgZmFsc2UpXG4gICAgICB2aWV3LnNob3coKVxuXG4gICAgICB2aWV3LnRvZ2dsZVRhYlZpZXcoKVxuICAgICAgQHRlcm1pbmFsVmlld3MucHVzaCB2aWV3XG4gICAgICB2aWV3Lm9wZW4oKSBpZiB2aWV3LnN0YXR1c0ljb24uaXNBY3RpdmUoKVxuICAgICAgQHN0YXR1c0NvbnRhaW5lci5hcHBlbmQgdmlldy5zdGF0dXNJY29uXG4gICAgICBmcm9tSW5kZXggPSBAdGVybWluYWxWaWV3cy5sZW5ndGggLSAxXG4gICAgZWxzZVxuICAgICAgZnJvbUluZGV4ID0gcGFyc2VJbnQoZGF0YVRyYW5zZmVyLmdldERhdGEoJ2Zyb20taW5kZXgnKSlcbiAgICBAdXBkYXRlT3JkZXIoZnJvbUluZGV4LCB0b0luZGV4KVxuXG4gIG9uRHJvcFRhYkJhcjogKGV2ZW50LCBwYW5lKSA9PlxuICAgIHtkYXRhVHJhbnNmZXJ9ID0gZXZlbnQub3JpZ2luYWxFdmVudFxuICAgIHJldHVybiB1bmxlc3MgZGF0YVRyYW5zZmVyLmdldERhdGEoJ3BsYXRmb3JtaW8taWRlLXRlcm1pbmFsLXBhbmVsJykgaXMgJ3RydWUnXG5cbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpXG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKClcbiAgICBAY2xlYXJEcm9wVGFyZ2V0KClcblxuICAgIGZyb21JbmRleCA9IHBhcnNlSW50KGRhdGFUcmFuc2Zlci5nZXREYXRhKCdmcm9tLWluZGV4JykpXG4gICAgdmlldyA9IEB0ZXJtaW5hbFZpZXdzW2Zyb21JbmRleF1cbiAgICB2aWV3LmNzcyBcImhlaWdodFwiLCBcIlwiXG4gICAgdmlldy50ZXJtaW5hbC5lbGVtZW50LnN0eWxlLmhlaWdodCA9IFwiXCJcbiAgICB0YWJCYXIgPSAkKGV2ZW50LnRhcmdldCkuY2xvc2VzdCgnLnRhYi1iYXInKVxuXG4gICAgdmlldy50b2dnbGVUYWJWaWV3KClcbiAgICBAcmVtb3ZlVGVybWluYWxWaWV3IHZpZXdcbiAgICBAc3RhdHVzQ29udGFpbmVyLmNoaWxkcmVuKCkuZXEoZnJvbUluZGV4KS5kZXRhY2goKVxuICAgIHZpZXcuc3RhdHVzSWNvbi5yZW1vdmVUb29sdGlwKClcblxuICAgIHBhbmUuYWRkSXRlbSB2aWV3LCBwYW5lLmdldEl0ZW1zKCkubGVuZ3RoXG4gICAgcGFuZS5hY3RpdmF0ZUl0ZW0gdmlld1xuXG4gICAgdmlldy5mb2N1cygpXG5cbiAgY2xlYXJEcm9wVGFyZ2V0OiAtPlxuICAgIGVsZW1lbnQgPSBAZmluZCgnLmlzLWRyYWdnaW5nJylcbiAgICBlbGVtZW50LnJlbW92ZUNsYXNzICdpcy1kcmFnZ2luZydcbiAgICBAcmVtb3ZlRHJvcFRhcmdldENsYXNzZXMoKVxuICAgIEByZW1vdmVQbGFjZWhvbGRlcigpXG5cbiAgcmVtb3ZlRHJvcFRhcmdldENsYXNzZXM6IC0+XG4gICAgQHN0YXR1c0NvbnRhaW5lci5maW5kKCcuaXMtZHJvcC10YXJnZXQnKS5yZW1vdmVDbGFzcyAnaXMtZHJvcC10YXJnZXQnXG4gICAgQHN0YXR1c0NvbnRhaW5lci5maW5kKCcuZHJvcC10YXJnZXQtaXMtYWZ0ZXInKS5yZW1vdmVDbGFzcyAnZHJvcC10YXJnZXQtaXMtYWZ0ZXInXG5cbiAgZ2V0RHJvcFRhcmdldEluZGV4OiAoZXZlbnQpIC0+XG4gICAgdGFyZ2V0ID0gJChldmVudC50YXJnZXQpXG4gICAgcmV0dXJuIGlmIEBpc1BsYWNlaG9sZGVyKHRhcmdldClcblxuICAgIHN0YXR1c0ljb25zID0gQHN0YXR1c0NvbnRhaW5lci5jaGlsZHJlbignLnBpby10ZXJtaW5hbC1zdGF0dXMtaWNvbicpXG4gICAgZWxlbWVudCA9IHRhcmdldC5jbG9zZXN0KCcucGlvLXRlcm1pbmFsLXN0YXR1cy1pY29uJylcbiAgICBlbGVtZW50ID0gc3RhdHVzSWNvbnMubGFzdCgpIGlmIGVsZW1lbnQubGVuZ3RoIGlzIDBcblxuICAgIHJldHVybiAwIHVubGVzcyBlbGVtZW50Lmxlbmd0aFxuXG4gICAgZWxlbWVudENlbnRlciA9IGVsZW1lbnQub2Zmc2V0KCkubGVmdCArIGVsZW1lbnQud2lkdGgoKSAvIDJcblxuICAgIGlmIGV2ZW50Lm9yaWdpbmFsRXZlbnQucGFnZVggPCBlbGVtZW50Q2VudGVyXG4gICAgICBzdGF0dXNJY29ucy5pbmRleChlbGVtZW50KVxuICAgIGVsc2UgaWYgZWxlbWVudC5uZXh0KCcucGlvLXRlcm1pbmFsLXN0YXR1cy1pY29uJykubGVuZ3RoID4gMFxuICAgICAgc3RhdHVzSWNvbnMuaW5kZXgoZWxlbWVudC5uZXh0KCcucGlvLXRlcm1pbmFsLXN0YXR1cy1pY29uJykpXG4gICAgZWxzZVxuICAgICAgc3RhdHVzSWNvbnMuaW5kZXgoZWxlbWVudCkgKyAxXG5cbiAgZ2V0UGxhY2Vob2xkZXI6IC0+XG4gICAgQHBsYWNlaG9sZGVyRWwgPz0gJCgnPGxpIGNsYXNzPVwicGxhY2Vob2xkZXJcIj48L2xpPicpXG5cbiAgcmVtb3ZlUGxhY2Vob2xkZXI6IC0+XG4gICAgQHBsYWNlaG9sZGVyRWw/LnJlbW92ZSgpXG4gICAgQHBsYWNlaG9sZGVyRWwgPSBudWxsXG5cbiAgaXNQbGFjZWhvbGRlcjogKGVsZW1lbnQpIC0+XG4gICAgZWxlbWVudC5pcygnLnBsYWNlaG9sZGVyJylcblxuICBpY29uQXRJbmRleDogKGluZGV4KSAtPlxuICAgIEBnZXRTdGF0dXNJY29ucygpLmVxKGluZGV4KVxuXG4gIGdldFN0YXR1c0ljb25zOiAtPlxuICAgIEBzdGF0dXNDb250YWluZXIuY2hpbGRyZW4oJy5waW8tdGVybWluYWwtc3RhdHVzLWljb24nKVxuXG4gIG1vdmVJY29uVG9JbmRleDogKGljb24sIHRvSW5kZXgpIC0+XG4gICAgZm9sbG93aW5nSWNvbiA9IEBnZXRTdGF0dXNJY29ucygpW3RvSW5kZXhdXG4gICAgY29udGFpbmVyID0gQHN0YXR1c0NvbnRhaW5lclswXVxuICAgIGlmIGZvbGxvd2luZ0ljb24/XG4gICAgICBjb250YWluZXIuaW5zZXJ0QmVmb3JlKGljb24sIGZvbGxvd2luZ0ljb24pXG4gICAgZWxzZVxuICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGljb24pXG5cbiAgbW92ZVRlcm1pbmFsVmlldzogKGZyb21JbmRleCwgdG9JbmRleCkgPT5cbiAgICBhY3RpdmVUZXJtaW5hbCA9IEBnZXRBY3RpdmVUZXJtaW5hbFZpZXcoKVxuICAgIHZpZXcgPSBAdGVybWluYWxWaWV3cy5zcGxpY2UoZnJvbUluZGV4LCAxKVswXVxuICAgIEB0ZXJtaW5hbFZpZXdzLnNwbGljZSB0b0luZGV4LCAwLCB2aWV3XG4gICAgQHNldEFjdGl2ZVRlcm1pbmFsVmlldyBhY3RpdmVUZXJtaW5hbFxuXG4gIHVwZGF0ZU9yZGVyOiAoZnJvbUluZGV4LCB0b0luZGV4KSAtPlxuICAgIHJldHVybiBpZiBmcm9tSW5kZXggaXMgdG9JbmRleFxuICAgIHRvSW5kZXgtLSBpZiBmcm9tSW5kZXggPCB0b0luZGV4XG5cbiAgICBpY29uID0gQGdldFN0YXR1c0ljb25zKCkuZXEoZnJvbUluZGV4KS5kZXRhY2goKVxuICAgIEBtb3ZlSWNvblRvSW5kZXggaWNvbi5nZXQoMCksIHRvSW5kZXhcbiAgICBAbW92ZVRlcm1pbmFsVmlldyBmcm9tSW5kZXgsIHRvSW5kZXhcbiAgICBpY29uLmFkZENsYXNzICdpbnNlcnRlZCdcbiAgICBpY29uLm9uZSAnd2Via2l0QW5pbWF0aW9uRW5kJywgLT4gaWNvbi5yZW1vdmVDbGFzcygnaW5zZXJ0ZWQnKVxuIl19
