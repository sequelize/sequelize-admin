define([
  'jquery',
  'underscore',
  'views/base/view',
  'text!templates/dao_factories/index.ejs'
], function($, _, View, template) {
  'use strict';

  return View.extend({
    template:   template,
    className:  'dao_factories index',
    autoRender: true,

    events: {
      "click .actions .edit": function(e) {
        var $element = $(e.target)
          , id       = $element.parents("tr").data('id')

        if ($('.modal').length === 0) {
          $('<div>')
            .addClass('modal hide fade')
            .attr('tabindex', '-1')
            .attr('role', 'dialog')
            .attr('aria-labelledby', "dao_factory_edit_label")
            .appendTo($('body'))
        }

        require(['controllers/dao_factories_controller'], function(DaoFactoriesController) {
          new DaoFactoriesController().edit({ id: id })
        })
      },

      "click .actions .delete": function(e) {
        var $element = $(e.target)
          , id       = $element.parents("tr").data('id')
      }
    },

    render:     function() {
      this.$el.html(_.template(template)(this.options))
    }
  })
})
