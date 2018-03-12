define(function(require) {

    var Adapt = require('coreJS/adapt');
    var Backbone = require('backbone');
    var helpers = require('./helpers');

    var drawerMenuNavigationView = require('extensions/adapt-drawerMenu/js/drawerMenuNavigationView');

    Adapt.on('adapt:start', function() {
        new drawerMenuNavigationView();
    });
});
