define([
  'underscore',
  'chaplin',
  'backbone',
  'models/base/model'
], function(_, Chaplin, Backbone, Model) {
  // 'use strict';

  var DaoFactory = Model.extend({
    initialize: function(attributes) {
      this.url = this.endpoint + '/api/' + attributes.tableName
    },

    getPath: function() {
      return this.endpoint + '/' + this.get('tableName')
    },

    isActive: function(selectedTableName) {
      return this.get('tableName') === selectedTableName
    },

    sync: function(method, model, options) {
      options.type = 'HEAD'
      return Backbone.sync(method, model, options)
    }
  })

  return DaoFactory
})
