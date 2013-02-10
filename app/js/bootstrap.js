(function() {
  var endpoint = null
    , scripts = document.querySelectorAll("body script")

  for (var i = 0; i < scripts.length; i++) {
    var script = scripts[i]

    if (script.src.indexOf('app/js/bootstrap.js') !== -1) {
      endpoint = script.getAttribute('data-endpoint')
    }
  }

  // Configure the AMD module loader
  requirejs.config({
    // The path where your JavaScripts are located
    baseUrl: endpoint + '/app/js/',

    // Specify the paths of vendor libraries
    paths: {
      backbone:   'components/backbone/backbone-min',
      chaplin:    'components/chaplin/amd/chaplin.min',
      handlebars: 'components/handlebars.js/dist/handlebars',
      jquery:     'components/jquery/jquery.min',
      text:       'components/requirejs-text/text',
      underscore: 'components/lodash/lodash.underscore.min',
      bootstrap:  'components/bootstrap/amd/main',
      datepicker: 'components/bootstrap-datepicker/js/bootstrap-datepicker',
      moment:     'components/moment/min/moment.min'
    },

    // Underscore and Backbone are not AMD-capable per default,
    // so we need to use the AMD wrapping of RequireJS
    shim: {
      underscore: {
        exports: '_'
      },
      backbone: {
        deps:    [
          'underscore',
          'jquery',
          'components/jquery-serialize-object/jquery.serialize-object'
        ],
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
    new SequelizeAdmin({ title: 'fnord' }).initialize()
    // app.initialize()
  })
})()
