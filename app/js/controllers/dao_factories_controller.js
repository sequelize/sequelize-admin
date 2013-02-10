define([
  'underscore',
  'controllers/base/controller',
  'models/dao_factory',
  'models/dao_factory_collection',
  'views/dao_factories/index'
], function(
  _,
  Controller,
  DaoFactory,
  DaoFactoryCollection,
  DaoFactoriesIndex
) {
  'use strict';

  var DaoFactoriesController = Controller.extend({
    title: 'DAO Factory',

    index: function(params) {
      new DaoFactoryCollection().fetch({
        success: function(daoFactories) {
          new DaoFactoriesIndex({
            daoFactories: daoFactories,
            tableName: params.daoFactory
          })
        }.bind(this)
      })
    }
  })

  return DaoFactoriesController
})
