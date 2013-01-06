define([
  'jquery',
  'underscore',
  'views/base/view',
  'text!templates/daos/edit.ejs'
], function($, _, View, template) {
  'use strict';

  return View.extend({
    template:   template,
    className:  'daos edit',
    autoRender: true,
    container:  '.modal',

    render:     function() {
      if ($('.modal').length === 0) {
        $('<div>')
          .addClass('modal')
          .attr('tabindex', '-1')
          .attr('role', 'dialog')
          .attr('aria-labelledby', "dao_factory_edit_label")
          .appendTo($('body'))
      }

      this.$el.html(_.template(template)(this.options)).modal({
        keyboard: true
      })
    }
  })
})
