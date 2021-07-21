define([
  'core/js/adapt'
], function(Adapt) {

  var TocView = Backbone.View.extend({

    className: 'toc',

    initialize: function(options) {
      this.cfg = options.cfg;
      this.listenTo(Adapt, 'drawer:closed', this.onDrawerClosed);
      this.listenTo(Adapt, 'remove', this.remove);
      this.render();
      $('.drawer').addClass('has-toc');
    },

    events: {
      'click .toc__item button': 'scrollToPageElement'
    },

    scrollToPageElement: function(event) {
      if (event && event.preventDefault) event.preventDefault();

      var $target = $(event.currentTarget);
      if ($target.is('.is-disabled')) return;

      var selector = '.' + $(event.currentTarget).attr('data-toc-id');
      Adapt.once('drawer:closed', function() {
        Adapt.navigateToElement(selector, { duration:400 });
      });
      Adapt.trigger('drawer:closeDrawer');
    },

    render: function() {
      var data = {
        _grouping:this.getGroups(this.cfg),
        _globals: Adapt.course.get('_globals')
      };
      var template = Handlebars.templates.toc;
      this.$el.html(template(data));
      this.$el.a11y_aria_label(true);
      return this;
    },

    onDrawerClosed: function() {
      Adapt.trigger('drawer:setDrawerDir');
      $('.drawer').removeClass('has-toc');
    },

    remove: function() {
      Adapt.trigger('drawer:setDrawerDir');
      Backbone.View.prototype.remove.apply(this, arguments);
    },

    getGroups: function(config) {
      if (config._grouping) {
        return config._grouping;
      }

      return {
        "_classes": config._classes,
        "_items": [{'_contentObjects': _.difference(Adapt.contentObjects.pluck('_id'), config._excludeContentObjects)}]
      };
    }

  });

  return TocView;

});
