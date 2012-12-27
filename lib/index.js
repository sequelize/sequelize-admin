var Router = require('./router')

module.exports = function(sequelize, options) {
  var router = new Router(sequelize, options)

  return function(req, res, next) {
    if (req.path.indexOf(router.options.endpoint + "/assets/css/generated") === 0) {
      // a generated asset was requested. compile it and serve it afterwards
      router.serveStylus(req, res, next)
    } else if (req.path.indexOf(router.options.endpoint + "/assets") === 0) {
      // an asset request. just serve the file via static server.
      router.serveAsset(req, res, next)
    } else if (req.path.indexOf(router.options.endpoint) === 0) {
      // a normal admin page was requested. let's render the jade view.
      router.serveJade(req, res, next)
    } else {
      next()
    }
  }
}
