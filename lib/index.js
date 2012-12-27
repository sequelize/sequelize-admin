var _          = require("lodash")
  , nodeStatic = require('node-static')
  , fileServer = new(nodeStatic.Server)(__dirname + '/..')

module.exports = function(sequelize, options) {
  options = _.extend({
    endpoint: "/admin"
  }, options || {})

  return function(req, res, next) {
    if (req.path.indexOf(options.endpoint + "/assets") === 0) {
      var path = req.path.replace(options.endpoint, "")
      fileServer.serveFile(path, 200, {}, req, res)
    } else if (req.path.indexOf(options.endpoint) === 0) {
      console.log('dynamic')
    } else {
      next()
    }
  }
}
