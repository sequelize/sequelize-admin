var _          = require("lodash")
  , nodeStatic = require('node-static')
  , fileServer = new(nodeStatic.Server)(__dirname + '/..')
  , stylus     = require('stylus')
  , jade       = require('jade')
  , fs         = require('fs')

module.exports = function(sequelize, options) {
  options = _.extend({
    endpoint: "/admin"
  }, options || {})

  return function(req, res, next) {
    var path = null

    if (req.path.indexOf(options.endpoint + "/assets/css/generated") === 0) {
      // a generated asset was requested. compile it and serve it afterwards

      path = req.path.replace('/css/generated', '/stylus').replace('.css', '.styl')
      path = __dirname + '/..' + path.replace(options.endpoint, '')

      var stylusContent = fs.readFileSync(path).toString()

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
    } else if (req.path.indexOf(options.endpoint + "/assets") === 0) {
      // an asset request. just serve the file via static server.

      path = req.path.replace(options.endpoint, "")
      fileServer.serveFile(path, 200, {}, req, res)
    } else if (req.path.indexOf(options.endpoint) === 0) {
      // a normal admin page was requested. let's render the jade view.

      var jadeLocals = _.extend({}, options || {
      })

      var jadeContent = fs.readFileSync(__dirname + '/../views/index.jade').toString()
        , fn          = jade.compile(jadeContent, { locals: jadeLocals })

      res.type('text/html')
      res.send(fn(jadeLocals))
      res.send(200)
    } else {
      next()
    }
  }
}
