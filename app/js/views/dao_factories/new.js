define([
  'jquery',
  'underscore',
  'views/base/view',
  'text!templates/dao_factories/new.html',
  'datepicker' // no result, just load the file
], function($, _, View, template) {
  'use strict';

  return View.extend({
    template:   template,
    className:  'dao_factories new',
    autoRender: true,
    container:  '.modal',

    events: {
      'click .modal-footer .btn-primary': function(e) {
        e.preventDefault()

        var params = this.$el.find('form').serializeJSON()

        require(['controllers/daos_controller'], function(DaosController) {
          new DaosController().create($.extend({
            tableName: this.model.get('tableName')
          }, params))
        }.bind(this))
      }
    },

    render: function() {
      if ($('.modal').length === 0) {
        $('<div>')
          .addClass('modal')
          .attr('tabindex', '-1')
          .attr('role', 'dialog')
          .attr('aria-labelledby', "dao_factories_new_label")
          .appendTo($('body'))
      }

      this.$el
        .html(_.template(template)(this))
        .modal({ keyboard: true })
        .on('shown', function() {
          $('.date').datepicker()

          setTimeout(function() {
            this.$el.find('input')[0].focus()
          }.bind(this), 100)
        }.bind(this))
        .on('hidden', function() { $('.modal').remove() })
        .trigger('shown') // dunno why this isn't trigger automatically
    }
  })
})
