define([
  'controllers/base/controller',
  'models/dao_factory_collection'
], function(Controller, DaoFactoryCollection) {
  'use strict';

  return Controller.extend({
    title: 'Home',

    historyURL: function() {
      return ''
    },

    index: function() {
      new DaoFactoryCollection().fetch({
        success: function(collection) {
          document.location.href = this.endpoint + '/' + collection.models[0].get('tableName')
        }.bind(this)
      })
    }
  })
})
