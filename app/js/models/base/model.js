define([
  'chaplin',
  'lib/utils'
], function(Chaplin, Utils) {
  'use strict';

  var Model = Chaplin.Model.extend({
    endpoint: Utils.getEndpoint(),

    parse: function(response, xhr) {
      if (xhr.getResponseHeader('Sequelize-Admin')) {
        return JSON.parse(xhr.getResponseHeader('Sequelize-Admin')).data
      } else {
        return response.data
      }
    }
  })

  return Model
})
