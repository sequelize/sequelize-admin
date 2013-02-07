define([
  'chaplin',
  'models/base/collection',
  'models/dao_factory'
], function(Chaplin, Collection, DaoFactory) {
  'use strict';

  var DaoFactoryCollection = Collection.extend({
    model: DaoFactory,

    initialize: function(attributes) {
      this.url = this.endpoint + '/api'
    },

    parse: function(response) {
      return response.data.map(function(data) {
        return new this.model(data)
      }.bind(this))
    }
  })

  return DaoFactoryCollection
})
