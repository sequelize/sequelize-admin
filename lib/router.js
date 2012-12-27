var _           = require("lodash")
  , nodeStatic  = require('node-static')
  , fileServer  = new(nodeStatic.Server)(__dirname + '/..')
  , stylus      = require('stylus')
  , jade        = require('jade')
  , fs          = require('fs')
  , ViewHelpers = require('./view-helpers')

var Router = module.exports = function(sequelize, options) {
  this.sequelize = sequelize

  this.options = _.extend({
    endpoint: "/admin"
  }, options || {})
}

Router.prototype.serveAsset = function(req, res) {
  var path = req.path.replace(this.options.endpoint, "")
  fileServer.serveFile(path, 200, {}, req, res)
}

Router.prototype.serveStylus = function(req, res) {
  var path          = null
    , stylusContent = null

  path              = req.path.replace('/css/compiled', '/stylus').replace('.css', '.styl')
  path              = __dirname + '/..' + path.replace(this.options.endpoint, '')
  stylusContent     = fs.readFileSync(path).toString()

  stylus(stylusContent)
    .include(require('nib').path)
    .render(function(err, css) {
      if (err) {
        throw err
      }

      res.type('text/css')
      res.send(css)
      res.send(200)
    })
}

Router.prototype.serveJade = function(req, res) {
  var viewHelpers = new ViewHelpers(this.sequelize, this.options)
    , jadeLocals  = _.extend({}, this.options || {}, viewHelpers["export"]())
    , jadeContent = fs.readFileSync(__dirname + '/../app/index.jade').toString()
    , fn          = jade.compile(jadeContent, { locals: jadeLocals })

  res.send(fn(jadeLocals))
}
