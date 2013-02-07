define([
  'chaplin',
  'models/base/model'
], function(Chaplin, Model) {
  'use strict';

  var Dao = Model.extend({
    endpoints: {
      'read': {
        url: function(dao) {
          return dao.endpoint + '/api/' + dao.get('tableName') + '/' + dao.get('id')
        }
      },

      create: {
        type: 'post',
        url: function(dao) {
          return dao.endpoint + '/api/' + dao.get('tableName')
        },
        data: function(dao) {
          var key = Object.keys(dao.attributes).filter(function(a) { return a !== 'tableName'})[0]
          return dao.get(dataKey)
        }
      }
    },

    initialize: function(attributes) {
      if (!attributes.hasOwnProperty('daoFactory')) {
        throw new Error('Please provide the respective DaoFactory for this Dao!')
      }

      this.daoFactory = attributes.daoFactory
      delete attributes.daoFactory
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
