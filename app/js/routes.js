define(function() {
  'use strict';

  return function(match) {
    match('',      'home#show')
    match('login', 'sessions#new')
  }
})
