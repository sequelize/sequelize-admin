define([
  'chaplin',
  'lib/utils'
], function(Chaplin, Utils) {
  'use strict';

  var Controller = Chaplin.Controller.extend({
    endpoint: Utils.getEndpoint()
  })

  return Controller
})
