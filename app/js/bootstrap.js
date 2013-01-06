$(function() {
  var endpoint = $('[data-endpoint]').data('endpoint')

  // Configure the AMD module loader
  requirejs.config({
    // The path where your JavaScripts are located
    baseUrl: endpoint + '/app/js/',

    // Specify the paths of vendor libraries
    paths: {
      backbone:   'vendor/backbone-0.9.2',
      chaplin:    'vendor/chaplin-1.0.0-pre-59cac06',
      handlebars: 'vendor/handlebars-1.0.rc.1',
      jquery:     'vendor/jquery-1.8.2',
      text:       'vendor/require-text-2.0.3',
      underscore: 'vendor/underscore-1.4.2',
      bootstrap:  'vendor/bootstrap/main',
      datepicker: 'vendor/bootstrap-datepicker',
      moment:     'vendor/moment.min'
    },

    // Underscore and Backbone are not AMD-capable per default,
    // so we need to use the AMD wrapping of RequireJS
    shim: {
      underscore: {
        exports: '_'
      },
      backbone: {
        deps:    ['underscore', 'jquery'],
        exports: 'Backbone'
      },
      handlebars: {
        exports: 'Handlebars'
      },

      datepicker: {
        deps:    ['jquery', 'bootstrap', 'moment'],
        exports: '$.fn.datepicker'
      }
    }

    // For easier development, disable browser caching
    // Of course, this should be removed in a production environment
    , urlArgs: 'bust=' +  (new Date()).getTime()
  })

  require([ 'bootstrap', 'sequelize_admin' ], function(Bootstrap, SequelizeAdmin) {
    var app = new SequelizeAdmin({ title: 'fnord' })
    app.initialize()
  })
})
