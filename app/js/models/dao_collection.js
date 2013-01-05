define([
  'chaplin',
  'models/base/collection',
  'models/dao'
], function(Chaplin, Collection, Dao) {
  'use strict';

  var DaoCollection = Collection.extend({
    model: Dao,

    initialize: function(attributes) {
      this.url = this.endpoint + '/api/' + attributes.tableName
    }
  })

  return DaoCollection
})
