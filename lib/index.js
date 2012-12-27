module.exports = function(sequelize, options) {
  options = options || {}

  return function(req, res, next) {
    console.log('fnord')
  }
}
