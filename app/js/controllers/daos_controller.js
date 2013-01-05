define([
  'underscore',
  'controllers/base/controller',
  'controllers/dao_factories_controller',
  'models/dao',
  'models/dao_factory'
], function(_, Controller, DaoFactoriesController, Dao, DaoFactory) {
  'use strict';

  var DaosController = Controller.extend({
    title: 'DAOs',

    index: function(params) {
      new DaoFactoriesController().index(params)
    },

    edit: function(params) {
      new DaoFactory({ tableName: params.tableName }).fetch({
        success: function(daoFactory) {
          new Dao({ id: params.id, tableName: daoFactory.tableName }).fetch({
            success: function(dao) {
              console.log(daoFactory, dao)
            }.bind(this)
          })
        }.bind(this)
      })
    }
  })

  return DaosController
})
