define([
  'jquery',
  'views/base/view',
  'lib/utils',
  'text!templates/navigation.hbs'
], function($, View, Utils, template) {
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

    render: function() {
      $.get(Utils.getEndpoint() + '/api').success(function(response) {
        this.$el.html(Handlebars.compile(template)({ models: response.data }))
      }.bind(this))

      return this
    }
  });

  return HomeView;
});
