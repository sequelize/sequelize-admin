define([
  'chaplin',
  'models/base/collection',
  'models/dao',
  'jquery'
], function(Chaplin, Collection, Dao, $) {
  'use strict';

  var DaoCollection = Collection.extend({
    model: Dao,

    initialize: function(attributes) {
      if (!attributes.hasOwnProperty('daoFactory')) {
        throw new Error('Please provide the respective DaoFactory for this Dao!')
      }

      this.daoFactory = attributes.daoFactory
      this.url        = this.endpoint + '/api/' + attributes.daoFactory.get('tableName')
    },

    parse: function(response) {
      return response.data.map(function(data) {
        return new this.model($.extend({
          daoFactory: this.daoFactory
        }, data))
      }.bind(this))
    }
  })

  return DaoCollection
})
