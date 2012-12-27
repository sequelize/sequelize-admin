$(function() {
  var endpoint = $('[data-endpoint]').data('endpoint')

  // Configure the AMD module loader
  requirejs.config({
    // The path where your JavaScripts are located
    baseUrl: endpoint + '/assets/js/',

    // Specify the paths of vendor libraries
    paths: {
      backbone:   'backbone-0.9.2',
      chaplin:    'chaplin-1.0.0-pre-59cac06',
      handlebars: 'handlebars-1.0.rc.1',
      jquery:     'jquery-1.8.2',
      text:       'require-text-2.0.3',
      underscore: 'underscore-1.4.2',
      bootstrap:  'bootstrap/main'
    },

    // Underscore and Backbone are not AMD-capable per default,
    // so we need to use the AMD wrapping of RequireJS
    shim: {
      underscore: {
        exports: '_'
      },
      backbone: {
        deps: ['underscore', 'jquery'],
        exports: 'Backbone'
      },
      handlebars: {
        exports: 'Handlebars'
      }
    }

    // For easier development, disable browser caching
    // Of course, this should be removed in a production environment
    , urlArgs: 'bust=' +  (new Date()).getTime()
  })

  // if (document.title !== 'Buster.JS') {
  //   // Bootstrap the application
  //   require([ 'bootstrap', 'corporate_portal' ], function(Bootstrap, CorporatePortal) {
  //     var app = new CorporatePortal()
  //     app.initialize()
  //   })
  // }
})
