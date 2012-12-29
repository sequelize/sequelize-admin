var Router  = require('./router')
  , Restful = require('/Users/sdepold/Projects/sequelize-restful')

module.exports = function(sequelize, options) {
  var router  = new Router(sequelize, options)
    , restful = new Restful(sequelize, { endpoint: router.options.endpoint + '/api' })

  return function(req, res, next) {
    restful(req, res, function() {
      if (req.path.indexOf(router.options.endpoint + "/app/css/compiled") === 0) {
        // a generated asset was requested. compile it and serve it afterwards
        router.serveStylus(req, res, next)
      } else if (req.path.indexOf(router.options.endpoint + "/app") === 0) {
        // an asset request. just serve the file via static server.
        router.serveAsset(req, res, next)
      } else if (req.path.indexOf(router.options.endpoint) === 0) {
        // a normal admin page was requested. let's render the jade view.
        router.serveJade(req, res, next)
      } else {
        next()
      }
    })
  }
}
