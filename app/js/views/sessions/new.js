define([
  'views/base/view',
  'text!templates/sessions/new.hbs'
], function(View, template) {
  'use strict';

  var SessionsNewView = View.extend({
    template:  template,
    className: 'sessions new',
    // initialize: function() {
    //   console.log(this.container)
    //   this.delegate('click', function(a,b,c) {
    //     console.log(a,b,c)
    //   })
    // }
    events: {
      'click *': function() {
        alert(1)
      }
    }
  })

  return SessionsNewView
})
