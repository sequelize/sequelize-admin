module.exports = function(sequelize, options) {
  options = options || {}

  return function(req, res, next) {
    if (req.path.indexOf('/' + (options.endpoint || "admin")) === 0) {

    } else {
      next()
    }
  }
}
