define([
  'core/js/adapt',
  './helpers',
  './drawerViewOverrides',
  './tocNavigationView'
], function(Adapt, Helpers, drawerViewOverrides, tocNavigationView) {

  Adapt.on('adapt:start', function() {
    new tocNavigationView();
  });

});
