define([
  'chaplin',
  'models/base/model',
  'models/dao_factory'
], function(Chaplin, Model, DaoFactory) {
  'use strict';

  var Dao = Model.extend({
    endpoints: {
      read: {
        url: function(dao) {
          return dao.endpoint + '/api/' + dao.daoFactory.get('tableName') + '/' + dao.get('id')
        }
      },

      create: {
        type: 'post',

        url: function(dao) {
          return dao.endpoint + '/api/' + dao.daoFactory.get('tableName')
        },

        data: function(dao) {
          var key = Object.keys(dao.attributes).filter(function(a) { return a !== 'tableName'})[0]
          return dao.get(key)
        }
      }
    },

    fetch: function(options) {
      var args = arguments
      if (this.daoFactory) {
        Model.prototype.fetch.apply(this, arguments)
      } else {
        new DaoFactory({ tableName: this.get('tableName') }).fetch({
          success: function(daoFactory) {
            this.daoFactory = daoFactory
            delete this.attributes.tableName
            Model.prototype.fetch.apply(this, args)
          }.bind(this)
        })
      }
    },

    getSortedAttributes: function() {
      return _.keys(this.attributes).sort(function(a, b) {
        var idRegExp        = /id$/
          , timestampRegExp = /(createdAt|created_at|updated_at|updatedAt|deleted_at|deletedAt)/

        a = a.toLowerCase()
        b = b.toLowerCase()

        if (a.match(idRegExp) || a.match(timestampRegExp)) {
          return -1
        } else if (b.match(idRegExp) || b.match(timestampRegExp)) {
          return 1
        } else {
          return 0
        }
      })
    }
  })

  return Dao
})
