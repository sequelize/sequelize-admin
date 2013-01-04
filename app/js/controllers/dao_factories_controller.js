define([
  'underscore',
  'views/navigation',
  'controllers/base/controller',
  'models/dao_factory',
  'models/dao_factory_collection',
  'views/dao_factories/index'
], function(
  _,

  // the navigation accessor
  Navigation,

  // the basic controller
  Controller,

  // the dao factory model
  DaoFactory,

  // the dao factory collection
  DaoFactoryCollection,

  // the views
  DaoFactoriesIndex
) {
  'use strict';

  var DaoFactoriesController = Controller.extend({
    title: 'DAO Factory',

    index: function(params) {
      this.navigation = new Navigation({ daoFactory: params.daoFactory })

      this.navigation.getDaoFactories(function(daoFactories) {
        this.navigation.render(daoFactories)

        var daoFactory = daoFactories.filter(function(daoFactory) {
          return daoFactory.active
        })[0]

        new DaoFactoryCollection({
          tableName: daoFactory.tableName
        }).fetch({
          success: function(res) {
            this.view = new DaoFactoriesIndex({
              tableName:      daoFactory.tableName,
              attributeNames: sortAttributes(_.keys(res.models[0].attributes)),
              daos:           res.models
            })
          }.bind(this)
        })
      }.bind(this))
    }
  })

  var sortAttributes = function(attributes) {
    return attributes.sort(function(a, b) {
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

  return DaoFactoriesController
})
