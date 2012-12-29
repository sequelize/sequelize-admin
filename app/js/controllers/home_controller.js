define([
  'controllers/base/controller',
  'models/home',
  'views/home/index'
], function(Controller, Home, HomeIndex) {
  'use strict';

  var HelloWorldController = Controller.extend({
    title: 'Home',

    historyURL: function(params) {
      return ''
    },

    index: function(params) {
      this.view   = new HomeIndex();
    }
  });

  return HelloWorldController;
});
