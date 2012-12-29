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
    autoRender: true,

    getModels: function(callback) {
      $.get(Utils.getEndpoint() + '/api').success(function(response) {
        var models = response.data

        models.sort(function(a, b) {
          if (a.name < b.name) { return -1 }
          if (a.name > b.name) { return 1 }

          return 0
        })

        models.forEach(function(model, i) {
          model.path = Utils.getEndpoint() + '/' + model.tableName

          if (i === 0) {
            model.active = true
          }
        })

        callback(models)
      })
    },

    render: function() {
      this.getModels(function(models) {
        var content = Handlebars.compile(template)({
          models:   models,
          endpoint: Utils.getEndpoint()
        })

        this.$el.html(content)
      }.bind(this))

      return this
    }
  });

  return HomeView;
});
