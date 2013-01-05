define([
  'jquery',
  'underscore',
  'views/base/view',
  'text!templates/dao_factories/index.templ'
], function($, _, View, template) {
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
      this.$el.html(_.template(template)({
        daoFactories:      this.options.daoFactories.models,
        selectedTableName: this.options.tableName
      }))

      return this
    }
  })

  return HomeView
})
