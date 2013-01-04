define([
  'jquery',
  'underscore',
  'views/base/view',
  'text!templates/dao_factories/edit.ejs'
], function($, _, View, template) {
  'use strict';

  return View.extend({
    template:   template,
    className:  'dao_factories index',
    autoRender: true,
    container:  '.modal',
    render:     function() {
      this.$el.html(_.template(template)(this.options))
    }
  })
})
