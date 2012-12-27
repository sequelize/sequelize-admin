var ViewHelpers = module.exports = function(sequelize, options) {
  this.options   = options
  this.sequelize = sequelize
}

ViewHelpers.prototype.export = function() {
  var helpers = {}

  helpers.getModelNames = function() {
    var daos = this.sequelize.daoFactoryManager.daos
    return daos.map(function(dao) { return dao.name }).sort()
  }.bind(this)

  return helpers
}

