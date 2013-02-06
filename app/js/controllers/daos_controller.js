define([
  'underscore',
  'controllers/base/controller',
  'controllers/dao_factories_controller',
  'models/dao',
  'models/dao_collection',
  'models/dao_factory',
  'views/daos/index',
  'views/daos/edit'
], function(
  _,
  Controller, DaoFactoriesController,
  Dao, DaoCollection, DaoFactory,
  IndexView, EditView
) {
  'use strict';

  var DaosController = Controller.extend({
    title: 'DAOs',

    index: function(params) {
      new DaoFactoriesController().index(params)

      new DaoCollection({ tableName: params.daoFactory }).fetch({
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
          new Dao({ id: params.id, tableName: daoFactory.get('tableName') }).fetch({
            success: function(dao) {
              this.view = new EditView({
                daoFactory:     daoFactory,
                dao:            dao,
                attributeNames: dao.getSortedAttributes()
              })
            }.bind(this)
          })
        }.bind(this)
      })
    },

    create: function(params) {
      new Dao(params).save({
        success: function() {
          console.log(arguments)
        }.bind(this),

        error: function() {
          console.log(arguments)
        }.bind(this)
      })
    },

    destroy: function(params) {
      new DaoFactory({ tableName: params.tableName }).fetch({
        success: function(daoFactory) {
          new Dao({ id: params.id, tableName: daoFactory.get('tableName') }).fetch({
            success: function(dao) {
              this.view = new EditView({
                daoFactory:     daoFactory,
                dao:            dao,
                attributeNames: dao.getSortedAttributes()
              })
            }.bind(this)
          })
        }.bind(this)
      })
    }
  })

  return DaosController
})
