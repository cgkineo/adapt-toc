define(function(require) {

    var Adapt = require('coreJS/adapt');
    
    require('./helpers');
    require('./drawerViewOverrides');

    var drawerMenuNavigationView = require('extensions/adapt-drawerMenu/js/drawerMenuNavigationView');

    Adapt.on('adapt:start', function() {
        new drawerMenuNavigationView();
    });
});
