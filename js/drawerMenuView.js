define(function(require) {

    var Adapt = require('coreJS/adapt');
    var Backbone = require('backbone');

    var DrawerMenuView = Backbone.View.extend({

        className: 'drawer-menu',

        initialize: function(options) {
            this.cfg = options.cfg;
            this.listenTo(Adapt, 'drawer:closed', this.onDrawerClosed);
            this.listenTo(Adapt, 'remove', this.remove);
            this.render();
        },

        events: {
            'click .drawer-menu-item button': 'scrollToPageElement'
        },

        scrollToPageElement: function(event) {
            if(event && event.preventDefault) event.preventDefault();
            var selector = '.' + $(event.currentTarget).attr('data-drawer-menu-id');
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
            var template = Handlebars.templates['drawerMenu'];
            this.$el.html(template(data));
            this.$el.a11y_aria_label(true);
            return this;
        },

        onDrawerClosed: function() {
            Adapt.trigger('drawer:setDrawerDir');
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

    return DrawerMenuView;

});
