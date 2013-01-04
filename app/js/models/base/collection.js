define([
  'chaplin',
  'lib/utils'
], function(Chaplin, Utils) {
  'use strict';

  var Collection = Chaplin.Collection.extend({
    endpoint: Utils.getEndpoint(),

    parse: function(response) {
      return response.data.map(function(data) {
        return new this.model(data)
      }.bind(this))
    }
  })

  return Collection
})
