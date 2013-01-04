define([
  'jquery',
  'handlebars',
  'views/base/view',
  'lib/utils',
  'text!templates/navigation.hbs'
], function($, Handlebars, View, Utils, template) {
  'use strict';

  var HomeView = View.extend({

    // Save the template string in a prototype property.
    // This is overwritten with the compiled template function.
    // In the end you might want to used precompiled templates.
    template: template,

    className: '',

    // Automatically append to the DOM on render
    container: '.sidebar-nav',

    // Automatically render after initialize
    autoRender: false,

    getDaoFactories: function(callback) {
      $.get(Utils.getEndpoint() + '/api').success(function(response) {
        var models = response.data

        models.sort(function(a, b) {
          if (a.name < b.name) { return -1 }
          if (a.name > b.name) { return 1 }

          return 0
        })

        this.options.daoFactory = this.options.daoFactory || models[0].tableName

        models.forEach(function(model) {
          model.path = Utils.getEndpoint() + '/' + model.tableName

          if (model.tableName === this.options.daoFactory) {
            model.active = true
          }
        }.bind(this))

        callback(models)
      }.bind(this))
    },

    render: function(models) {
      var render = function(models) {
        var content = Handlebars.compile(template)({
          models:   models,
          endpoint: Utils.getEndpoint()
        })

        this.$el.html(content)
      }.bind(this)

      if (!!models) {
        render(models)
      } else {
        this.getDaoFactories(render)
      }

      return this
    }
  })

  return HomeView
})
