define([ 'text!config/api.json' ], function( apiConfig ) {
  return {
    api: $.extend(JSON.parse(apiConfig), {
      endpoint: apiConfig.baseUrl + '/v' + apiConfig.version
    })
  }
})
