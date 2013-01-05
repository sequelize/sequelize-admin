define([
  'jquery',
  'underscore',
  'views/base/view',
  'text!templates/daos/index.html'
], function($, _, View, template) {
  'use strict';

  return View.extend({
    template:   template,
    className:  'daos index',
    autoRender: true,

    events: {
      "click .actions .edit": function(e) {
        var $element  = $(e.target)
          , $tr       = $element.parents("tr")
          , id        = $tr.data('id')
          , tableName = $tr.data('table-name')

        require(['controllers/daos_controller'], function(DaosController) {
          new DaosController().edit({ id: id, tableName: tableName })
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
