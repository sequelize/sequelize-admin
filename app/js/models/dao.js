define([
  'chaplin',
  'models/base/model',
  'models/dao_factory',
  'moment'
], function(Chaplin, Model, DaoFactory, moment) {
  'use strict';

  var Dao = Model.extend({
    endpoints: {
      read: {
        url: function(dao) {
          return dao.endpoint + '/api/' + dao.get('daoFactory').get('tableName') + '/' + dao.get('id')
        }
      },

      create: {
        type: 'post',
        url: function(dao) {
          return dao.endpoint + '/api/' + dao.get('daoFactory').get('tableName')
        },
        data: function(dao) {
          var result = {}

          for (var attribute in dao.get('daoFactory').get('attributes')) {
            if (dao.get('daoFactory').get('attributes').hasOwnProperty(attribute) && dao.attributes.hasOwnProperty(attribute)) {
              result[attribute] = dao.get(attribute)
            }
          }

          return result
        }
      },

      'delete': {
        type: 'delete',
        url: function(dao) {
          return dao.endpoint + '/api/' + dao.get('daoFactory').get('tableName') + '/' + dao.get('id')
        }
      },

      update: {
        type: 'put',
        url:  function(dao) {
          return dao.endpoint + '/api/' + dao.get('daoFactory').get('tableName') + '/' + dao.get('id')
        },
        data: function(dao) {
          var result = {}

          for (var attribute in dao.get('daoFactory').get('attributes')) {
            if (dao.get('daoFactory').get('attributes').hasOwnProperty(attribute) && dao.attributes.hasOwnProperty(attribute)) {
              result[attribute] = dao.get(attribute)
            }
          }

          return result
        }
      }
    },

    fetch: function() {
      var args = arguments

      this.loadDaoFactory(function() {
        Model.prototype.fetch.apply(this, args)
      }.bind(this))
    },

    save: function() {
      var args = arguments

      this.loadDaoFactory(function() {
        var attributes = this.get('daoFactory').get('attributes')
          , attribute  = null

        for (attribute in attributes) {
          if (attributes.hasOwnProperty(attribute)) {
            var spec                = (typeof attributes[attribute] === 'object') ? attributes[attribute] : { type: attributes[attribute] }
              , isDate              = (spec.type.toLowerCase().indexOf('datetime') !== -1)
              , needsTransformation = (typeof this.get(attribute) === 'object')

            if (isDate && needsTransformation) {
              var dateAsString = [
                this.get(attribute).date,
                [
                  this.get(attribute).hour,
                  this.get(attribute).minutes,
                  this.get(attribute).seconds
                ].join(":")
              ].join(" ")

              this.set(attribute, moment(dateAsString).format('YYYY-DD-MM HH:mm:ss'))
            }
          }
        }

        for (attribute in this.attributes) {
          if (this.attributes.hasOwnProperty(attribute)) {
            if (this.attributes[attribute] === '') {
              this.unset(attribute)

              if (attribute === 'id') {
               delete this.id
              }
            }
          }
        }

        Model.prototype.save.apply(this, args)
      }.bind(this))
    },

    loadDaoFactory: function(callback) {
      if (this.get('daoFactory') instanceof DaoFactory) {
        callback()
      } else {
        new DaoFactory(this.get('daoFactory')).fetch({
          success: function(daoFactory) {
            this.set('daoFactory', daoFactory)
            callback()
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
