define([
  'chaplin',
  'models/base/model'
], function(Chaplin, Model) {
  'use strict';

  var DaoFactory = Model.extend({
    initialize: function(attributes) {
      this.url = this.endpoint + '/api/' + attributes.tableName + '/' + attributes.id
    }
  })

  return DaoFactory
})
