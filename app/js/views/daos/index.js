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
      "click .dao-factory-actions .new": function(e) {
        e.preventDefault()

        require(['controllers/daos_controller'], function(DaosController) {
          var tableName = $(e.target).parent().data('table-name')
          new DaosController()['new']({ tableName: tableName })
        }.bind(this))
      },

      "click .actions .edit": function(e) {
        e.preventDefault()

        require(['controllers/daos_controller'], function(DaosController) {
          new DaosController().edit(this.getRowData(e.target))
        }.bind(this))
      },

      "click .actions .delete": function(e) {
        e.preventDefault()

        require(['controllers/daos_controller'], function(DaosController) {
          new DaosController().destroy(this.getRowData(e.target))
        }.bind(this))
      }
    },

    render: function() {
      this.$el.html(_.template(template)(this.options))
    },

    getRowData: function(dom) {
      var $element  = $(dom)
        , $tr       = $element.parents("tr")
        , id        = $tr.data('id')
        , tableName = $tr.data('table-name')

      return {
        id:        id,
        tableName: tableName
      }
    }
  })
})
