define([
  'controllers/base/controller',
  'models/home',
  'views/home_view'
], function(Controller, Home, HomeView) {
  'use strict'

  var HelloWorldController = Controller.extend({
    title: 'Home',

    historyURL: function(params) {
      return ''
    },

    show: function(params) {
      this.model = new Home()
      this.view = new HomeView({ model: this.model });
    }
  });

  return HelloWorldController;
});
