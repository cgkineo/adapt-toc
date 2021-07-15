define(function(require) {

  var Adapt = require('coreJS/adapt');

  require('./helpers');
  require('./drawerViewOverrides');

  var tocNavigationView = require('./tocNavigationView');

  Adapt.on('adapt:start', function() {
    new tocNavigationView();
  });

});
