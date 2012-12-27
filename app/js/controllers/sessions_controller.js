define([
  'controllers/base/controller',
  'models/user',
  'views/sessions/new'
], function(Controller, User, View) {
  'use strict';

  var SessionsController = Controller.extend({
    title: 'Login',

    'new': function() {
      this.model = new User()
      this.view  = new View({ model: this.model })
    }
  })

  return SessionsController
})
