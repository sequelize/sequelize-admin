define([
  'underscore',
  'controllers/base/controller',
  'models/dao_factory',
  'models/dao_factory_collection',
  'views/dao_factories/index',
  'views/dao_factories/new'
], function(
  _,
  Controller,
  DaoFactory,
  DaoFactoryCollection,
  DaoFactoriesIndex,
  DaoFactoriesNew
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
    },

    'new': function(params) {
      new DaoFactory(params).fetch({
        success: function(daoFactory) {
          new DaoFactoriesNew({
            model: daoFactory
          })
        }.bind(this),

        error: function() {

        }.bind(this)
      })
    }
  })

  return DaoFactoriesController
})
