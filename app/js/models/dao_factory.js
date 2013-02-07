define([
  'underscore',
  'chaplin',
  'backbone',
  'models/base/model'
], function(_, Chaplin, Backbone, Model) {
  // 'use strict';

  var DaoFactory = Model.extend({
    endpoints: {
      'read': {
        type: 'head',
        url:  function(daoFactory) {
          return daoFactory.endpoint + '/api/' + daoFactory.get('tableName')
        }
      }
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
