define([
  'underscore',
  'controllers/base/controller',
  'controllers/dao_factories_controller',
  'models/dao',
  'models/dao_collection',
  'models/dao_factory',
  'views/daos/index',
  'views/daos/new',
  'views/daos/edit',
  'jquery'
], function(
  _,
  Controller,
  DaoFactoriesController,
  Dao,
  DaoCollection,
  DaoFactory,
  IndexView,
  NewView,
  EditView,
  $
) {
  'use strict';

  var DaosController = Controller.extend({
    title: 'DAOs',

    index: function(params) {
      new DaoFactoriesController().index(params);

      new DaoFactory({ tableName: params.daoFactory }).fetch({
        success: function(daoFactory) {
          new DaoCollection({ daoFactory: daoFactory }).fetch({
            success: function(daoCollection) {
              this.view = new IndexView({
                tableName:      daoFactory.get('tableName'),
                attributeNames: daoCollection.models[0].getSortedAttributes(),
                daos:           daoCollection.models
              })
            }.bind(this)
          })
        }.bind(this)
      })
    },

    edit: function(params) {
      new Dao({ id: params.id, daoFactory: { tableName: params.tableName } }).fetch({
        success: function(dao) {
          this.view = new EditView({ model: dao })
        }.bind(this)
      })
    },

    update: function(params) {
      var dao = new Dao({ id: params.id, daoFactory: { tableName: params.tableName } })

      delete params.id
      delete params.daoFactory

      dao.save(params, {
        success: function() {
          $('.modal, .modal-backdrop').remove()
          document.location.reload()
        }.bind(this),

        error: function() {
          alert('something is broken!')
          console.log(arguments)
        }.bind(this)
      })
    },

    'new': function(params) {
      new DaoFactory(params).fetch({
        success: function(daoFactory) {
          var dao = new Dao({ daoFactory: daoFactory })
          new NewView({ model: dao })
        }.bind(this),

        error: function() {

        }.bind(this)
      })
    },

    create: function(params) {
      new Dao(params).save({}, {
        success: function() {
          $('.modal, .modal-backdrop').remove()
          document.location.reload()
        }.bind(this),

        error: function() {
          alert('something is broken!')
          console.log(arguments)
        }.bind(this)
      })
    },

    destroy: function(params) {
      new Dao({ id: params.id, daoFactory: { tableName: params.tableName } }).fetch({
        success: function(dao) {
          if (params.confirmed) {
            dao.destroy({
              success: function() {
                $('.modal').modal('hide')
                document.location.reload()
              }.bind(this),

              error: function() {
                alert('something is broken!')
                $('.modal').modal('hide')
              }.bind(this)
            })
          } else {
            require([ 'views/daos/destroy' ], function(DestroyView) {
              new DestroyView({ model: dao })
            })
          }
        }.bind(this),

        error: function() {
          alert('something is broken!')
          console.log(arguments)
        }.bind(this)
      })
    }
  })

  return DaosController
})
