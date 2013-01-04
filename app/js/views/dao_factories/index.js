define([
  'handlebars',
  'views/base/view',
  'text!templates/dao_factories/index.hbs'
], function(Handlebars, View, template) {
  'use strict';

  var DaoFactoriesIndexView = View.extend({
    // Save the template string in a prototype property.
    // This is overwritten with the compiled template function.
    // In the end you might want to used precompiled templates.
    template: template,

    className: 'dao_factories index',

    // Automatically render after initialize
    autoRender: true,

    render: function() {
      var content = Handlebars.compile(template)({
        daoFactory: this.options.daoFactory
      })

      this.$el.html(content)

      return this
    }
  })

  return DaoFactoriesIndexView
})
