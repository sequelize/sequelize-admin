define([
  'underscore',
  'jquery',
  'chaplin'
], function(_, $, Chaplin) {
  'use strict'

  // Application-specific utilities
  // ------------------------------

  // Delegate to Chaplin’s utils module
  var utils = Chaplin.utils.beget(Chaplin.utils);

  // Add additional application-specific properties and methods

  // _(utils).extend({
  //   someProperty: 'foo',
  //   someMethod: function() {}
  // });

  _(utils).extend({
    getEndpoint: function() {
      return $('[data-endpoint]').data('endpoint')
    }
  })

  return utils;
});
