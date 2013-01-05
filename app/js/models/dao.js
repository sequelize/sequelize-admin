define([
  'chaplin',
  'models/base/model'
], function(Chaplin, Model) {
  'use strict';

  var Dao = Model.extend({
    initialize: function(attributes) {
      this.url = this.endpoint + '/api/' + attributes.tableName + '/' + attributes.id
    }
  })

  return Dao
})
