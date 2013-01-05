define([
  'underscore',
  'controllers/base/controller',
  'controllers/dao_factories_controller',
  'models/dao',
  'models/dao_collection',
  'views/daos/index'
], function(_, Controller, DaoFactoriesController, Dao, DaoCollection, IndexView) {
  'use strict';

  var DaosController = Controller.extend({
    title: 'DAOs',

    index: function(params) {
      new DaoFactoriesController().index(params);
      new DaoCollection({
        tableName: params.daoFactory
      }).fetch({
        success: function(daoCollection) {
          this.view = new IndexView({
            tableName:      daoCollection.tableName,
            attributeNames: daoCollection.models[0].getSortedAttributes(),
            daos:           daoCollection.models
          })
        }.bind(this)
      })
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
