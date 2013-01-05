define([
  'chaplin',
  'models/base/model'
], function(Chaplin, Model) {
  'use strict';

  var Dao = Model.extend({
    initialize: function(attributes) {
      this.url = this.endpoint + '/api/' + attributes.tableName + '/' + attributes.id
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
