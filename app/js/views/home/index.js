define([
  'views/base/view',
  'text!templates/home/index.hbs'
], function(View, template) {
  'use strict';

  var HomeView = View.extend({

    // Save the template string in a prototype property.
    // This is overwritten with the compiled template function.
    // In the end you might want to used precompiled templates.
    template: template,

    className: 'home index',

    // Automatically render after initialize
    autoRender: true
  });

  return HomeView;
});
