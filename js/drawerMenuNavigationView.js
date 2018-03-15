define(function(require) {

    var Adapt = require('coreJS/adapt');
    var Backbone = require('backbone');

    var DrawerMenuView = require('extensions/adapt-drawerMenu/js/DrawerMenuView');

    var DrawerMenuNavigationView = Backbone.View.extend({

        tagName: 'button',

        className: 'base icon icon-home drawer-menu-navigation',

        initialize: function() {
            this.$el.attr('role', 'button');
            this.ariaText = '';
            
            if (Adapt.course.has('_globals') && Adapt.course.get('_globals')._extensions && Adapt.course.get('_globals')._extensions._drawerMenu && Adapt.course.get('_globals')._extensions._drawerMenu.navigationDrawerMenu) {
                this.ariaText = Adapt.course.get('_globals')._extensions._drawerMenu.navigationDrawerMenu;
                this.$el.attr('aria-label', this.ariaText);
            }
            
            this.render();
        },

        events: {
            'click': 'onDrawerMenuClicked'
        },

        render: function() {
            var template = Handlebars.templates['drawerMenuNavigation'];
            $('.navigation-drawer-toggle-button').after(this.$el.html(template()));
            return this;
        },

        onDrawerMenuClicked: function(event) {
            if(event && event.preventDefault) event.preventDefault();
            // put the drawer on the left
            Adapt.trigger('drawer:setDrawerDir', 'left');
            // here is where you might customise what drawer menu renders if so desired
            Adapt.drawer.triggerCustomView(new DrawerMenuView({cfg: Adapt.course.get('_drawerMenu') || {}}).$el, false);
        }

    });

    return DrawerMenuNavigationView;

});
