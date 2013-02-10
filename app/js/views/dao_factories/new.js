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
      'keydown .modal-body form input': function(e) {
        if (event.keyCode === 13) {
          this.submitForm(e)
        }
      },
      'submit .modal-body form': 'submitForm'
    },

    submitForm: function(e) {
      e.preventDefault()

      var params = this.$el.find('form').serializeJSON()

      require(['controllers/daos_controller'], function(DaosController) {
        new DaosController().create(params)
      }.bind(this))
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
            this.$el.find('input[type != "hidden"]')[0].focus()
          }.bind(this), 100)
        }.bind(this))
        .on('hidden', function() { $('.modal').remove() })
        .trigger('shown') // dunno why this isn't trigger automatically
    }
  })
})
