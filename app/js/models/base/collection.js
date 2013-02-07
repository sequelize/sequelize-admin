define([
  'chaplin',
  'lib/utils'
], function(Chaplin, Utils) {
  'use strict';

  var Collection = Chaplin.Collection.extend({
    endpoint: Utils.getEndpoint()
  })

  return Collection
})
