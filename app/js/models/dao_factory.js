define([
  'chaplin',
  'models/base/model'
], function(Chaplin, Model) {
  'use strict';

  var DaoFactory = Model.extend({
    initialize: function(attributes) {
      this.url = this.endpoint + '/api/' + attributes.tableName
    },

    getPath: function() {
      return this.endpoint + '/' + this.get('tableName')
    },

    isActive: function(selectedTableName) {
      return this.get('tableName') === selectedTableName
    }
  })

  return DaoFactory
})
