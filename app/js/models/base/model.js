define([
  'chaplin',
  'lib/utils'
], function(Chaplin, Utils) {
  'use strict';

  var Model = Chaplin.Model.extend({
    endpoint: Utils.getEndpoint(),

    parse: function(response) {
      return response.data
    }
  })

  return Model
})
