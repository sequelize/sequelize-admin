// Configure the AMD module loader
requirejs.config({
  // The path where your JavaScripts are located
  baseUrl: './js/',

  // Specify the paths of vendor libraries
  paths: {
    jquery:     'vendor/jquery-1.8.2',
    underscore: 'vendor/underscore-1.4.2',
    backbone:   'vendor/backbone-0.9.2',
    handlebars: 'vendor/handlebars-1.0.rc.1',
    text:       'vendor/require-text-2.0.3',
    chaplin:    'vendor/chaplin-1.0.0-pre-59cac06',
    bootstrap:  'vendor/bootstrap/main'
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

if (document.title !== 'Buster.JS') {
  // Bootstrap the application
  require([ 'bootstrap', 'corporate_portal' ], function(Bootstrap, CorporatePortal) {
    var app = new CorporatePortal()
    app.initialize()
  })
}
