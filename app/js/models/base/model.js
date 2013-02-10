define([
  'chaplin',
  'lib/utils',
  'jquery'
], function(Chaplin, Utils, $) {
  'use strict';

  var Model = Chaplin.Model.extend({
    endpoint: Utils.getEndpoint(),

    parse: function(model, response) {
      if (response.xhr.getResponseHeader('Sequelize-Admin')) {
        return JSON.parse(response.xhr.getResponseHeader('Sequelize-Admin')).data
      } else {
        return model.data
      }
    },

    sync: function(method, model, options) {
      var endpoint = (model.endpoints || {})[method.toLowerCase()]

      if (!!endpoint) {
        options = mergeDefaultOptions(model, endpoint, options)
      } else {
        throw new Error('Please define endpoints in your model. Method: ' + method + ', Model: ' + JSON.stringify(model))
      }

      Backbone.sync(method, model, options)
    }
  })

  /////////////
  // private //
  /////////////

  var mergeDefaultOptions = function(model, endpoint, options) {
    if (typeof endpoint === 'string') {
      endpoint = { url: endpoint }
    }

    if (typeof endpoint.url === 'function') {
      endpoint.url = endpoint.url(model)
    }

    var _options = $.extend({
      dataType: 'json'
    }, endpoint, options || {})

    if (typeof endpoint.data !== 'undefined') {
      _options.data = $.param(endpoint.data(model))
    }

    return _options
  }

  return Model
})
