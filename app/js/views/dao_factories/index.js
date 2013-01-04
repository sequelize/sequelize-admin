define([
  'underscore',
  'views/base/view',
  'text!templates/dao_factories/index.ejs'
], function(_, View, template) {
  'use strict';

  return View.extend({
    template:   template,
    className:  'dao_factories index',
    autoRender: true,
    events: {

    },
    render:     function() {
      this.$el.html(_.template(template)(this.options))
    }
  })
})
