define([
  'core/js/adapt',
  'core/js/tooltips',
  './tocView'
], function(Adapt, tooltips, TocView) {

  var TocNavigationView = Backbone.View.extend({

    tagName: 'button',

    className: 'btn-icon nav__btn nav__toc-btn js-nav-toc-btn toc-navigation',

    attributes() {
      return {
        'data-tooltip-id': 'toc'
      };
    },

    initialize: function() {
      this.$el.attr('role', 'button');
      this.ariaText = '';

      if (Adapt.course.has('_globals') && Adapt.course.get('_globals')._extensions && Adapt.course.get('_globals')._extensions._toc && Adapt.course.get('_globals')._extensions._toc.navigationToc) {
        this.ariaText = Adapt.course.get('_globals')._extensions._toc.navigationToc;
        this.$el.attr('aria-label', this.ariaText);
      }

      tooltips.register({
        _id: 'toc',
        ...Adapt.course.get('_globals')?._extensions?._toc?._navTooltip || {}
      });

      this.render();
    },

    events: {
      'click': 'onClick'
    },

    render: function() {
      var template = Handlebars.templates.tocNavigation;
      $('.js-nav-back-btn').before(this.$el.html(template()));
      return this;
    },

    onClick: function(event) {
      if(event && event.preventDefault) event.preventDefault();
      var cfg = Adapt.course.get('_toc') || {}
      var position = cfg._drawerPosition || 'auto'
      // here is where you might customise what toc renders if so desired
      Adapt.drawer.triggerCustomView(new TocView({cfg}).$el, false, position);
    }

  });

  return TocNavigationView;

});
