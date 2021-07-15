define(function(require) {

  var Adapt = require('coreJS/adapt');
  var Backbone = require('backbone');

  var TocView = require('./tocView');

  var TocNavigationView = Backbone.View.extend({

    tagName: 'button',

    className: 'base icon icon-home toc-navigation',

    initialize: function() {
      this.$el.attr('role', 'button');
      this.ariaText = '';

      if (Adapt.course.has('_globals') && Adapt.course.get('_globals')._extensions && Adapt.course.get('_globals')._extensions._toc && Adapt.course.get('_globals')._extensions._toc.navigationToc) {
        this.ariaText = Adapt.course.get('_globals')._extensions._toc.navigationToc;
        this.$el.attr('aria-label', this.ariaText);
      }

      this.render();
    },

    events: {
      'click': 'onClick'
    },

    render: function() {
      var template = Handlebars.templates.tocNavigation;
      $('.js-nav-back-btn').after(this.$el.html(template()));
      return this;
    },

    onClick: function(event) {
      if(event && event.preventDefault) event.preventDefault();
      // put the drawer on the left
      Adapt.trigger('drawer:setDrawerDir', Adapt.config.get('_defaultDirection') == 'rtl' ? 'right' : 'left');
      // here is where you might customise what toc renders if so desired
      Adapt.drawer.triggerCustomView(new TocView({cfg: Adapt.course.get('_toc') || {}}).$el, false);
    }

  });

  return TocNavigationView;

});
