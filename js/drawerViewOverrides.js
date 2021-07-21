define([
  'core/js/adapt',
  'core/js/views/drawerView'
], function(Adapt, DrawerView) {

  var setupEventListeners = DrawerView.prototype.setupEventListeners;
  var showDrawer = DrawerView.prototype.showDrawer;

  // override initialize fully
  DrawerView.prototype.initialize = function() {
    this.disableAnimation = Adapt.config.has('_disableAnimation') ? Adapt.config.get('_disableAnimation') : false;
    this._isVisible = false;
    this.setDrawerDir();
    this.setupEventListeners();
    this.render();
    this.drawerDuration = Adapt.config.get('_drawer')._duration;
    this.drawerDuration = (this.drawerDuration) ? this.drawerDuration : 400;
    // Setup cached selectors
    this.$wrapper = $('#wrapper');
  };

  // add listener and call setupEventListeners normally
  DrawerView.prototype.setupEventListeners = function() {
    var ret = setupEventListeners.apply(this, arguments);
    this.listenTo(Adapt, 'drawer:setDrawerDir', this.setDrawerDir);
    return ret;
  };

  // add new method
  DrawerView.prototype.setDrawerDir = function(dir) {
    if (dir) {
      this.drawerDir = dir;
    } else {
      this.drawerDir = 'right';
      if(Adapt.config.get('_defaultDirection')=='rtl'){//on RTL drawer on the left
        this.drawerDir = 'left';
      }
    }

    var direction={left:'inherit', right:'inherit'};
    direction[this.drawerDir]=-this.$el.width();
    this.$el.css(direction);
  };

  // we need to add some behaviour to one branch of an if statement in this method
  // rather than override the whole method we can shift this code to the head without side effects
  DrawerView.prototype.showDrawer = function(options) {
    this.$el.removeClass('u-display-none');
    var drawerWidth = this.$el.width();
    var direction={};
    direction[this.drawerDir]=-drawerWidth;
    this.$el.css(direction);

    return showDrawer.apply(this, arguments);
  };

});
