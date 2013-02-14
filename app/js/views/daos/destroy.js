define([
  'jquery',
  'underscore',
  'views/base/view',
  'text!templates/daos/destroy.html',
  'datepicker' // no result, just load the file
], function($, _, View, template) {
  'use strict';

  return View.extend({
    template:   template,
    className:  'daos destroy',
    autoRender: true,

    events: {
      'click .btn-primary': function(e) {
        e.preventDefault()

        require([ 'controllers/daos_controller' ], function(DaosController) {
          new DaosController().destroy({
            confirmed: true,
            id:        this.model.get('id'),
            tableName: this.model.get('daoFactory').get('tableName')
          })
        }.bind(this))
      }
    },

    render: function() {
      if ($('.modal').length !== 0) {
        $('.modal, .modal-backdrop').remove()
      }

      this.setElement(
        $('<div>')
          .addClass('modal')
          .attr('tabindex', '-1')
          .attr('role', 'dialog')
          .appendTo($('body'))
          .css({
            'width':       '400px',
            'margin-left': '-200px'
          })
      )
      this.$el
        .html(_.template(template)({ dao: this.model }))
        .modal({ keyboard: true })
        .on('hidden', function() { $('.modal').remove() })
    }
  })
})
