define([
  'views/navigation',
  'controllers/base/controller',
  'models/dao_factory',
  'views/dao_factories/index'

], function(Navigation, Controller, DaoFactory, DaoFactoriesIndex) {
  'use strict';

  var DaoFactoriesController = Controller.extend({
    title: 'DAO Factory',

    index: function(params) {
      this.navigation = new Navigation({ daoFactory: params.daoFactory })

      this.navigation.getDaoFactories(function(daoFactories) {
        this.navigation.render(daoFactories)

        // var daoFactory = new DaoFactory({
        //   tableName: daoFactories.filter(function(daoFactory) {
        //     return daoFactory.active
        //   })[0].tableName
        // }).fetch({
        //   success: function(res, daoFactories) {
        //     console.log(arguments)
        //   }.bind(this)
        // })

        // console.log(daoFactory)

        this.view = new DaoFactoriesIndex({
          daoFactory: daoFactories.filter(function(daoFactory) {
            return daoFactory.active
          })[0]
        })
      }.bind(this))
    }
  })

  return DaoFactoriesController;
})
