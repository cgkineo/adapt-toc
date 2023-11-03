define([
  'core/js/adapt',
  './helpers',
  './tocNavigationView'
], function(Adapt, Helpers, tocNavigationView) {

  Adapt.on('adapt:start', function() {
    new tocNavigationView();
  });

});
