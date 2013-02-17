# sequelize-admin

A connect module for managing database entries of registered sequelize models.

## Look & Feel

The initial view will show you all the available models + it's instances:

[![Build Status](https://secure.travis-ci.org/sequelize/sequelize-authentication.png)](http://travis-ci.org/sequelize/sequelize-authentication)

## Getting started

The idea behind sequelize-admin is to have a drop-in, easy-to-use CMS-like admin panel, which allows the creation, deletion and modification of
database entries. The application needs to be based on [connect](https://github.com/senchalabs/connect) or [express](https://github.com/visionmedia/express)
and should use [sequelize](https://github.com/sdepold/sequelize).
To add the module to your existing application, you just have to add the following line:

	app.use(admin(sequelize))

This will make the admin area available under `http://your.app/admin`. sequelize-admin is depending on the module [sequelize-restful](https://github.com/sequelize/sequelize-restful), which transforms a sequelize instance into a RESTful interface. If your are already using `sequelize-restful`, you need to tell `sequelize-admin` where it can find the REST API. If you don't define that option, the admin panel will create it's own instance of the REST interface.

	// default of restful: true
	app.use(admin(sequelize, { restful: '/my/path/to/the/rest/api' }))

In addition to that, you might need to protect your API against external request. This is where [sequelize-authentication](https://github.com/sequelize/sequelize-authentication) comes into play. The module will take parameters of a request to authenticate against your database. If you want to use that, you have to give `sequelize-admin` a small hint:

	// default of authentication: false
	
	// passing true will assume, that no param options is used 
	// and that the credentials are passed via params mode.
	app.use(admin(sequelize, { authentication: true }))
	
	// define the relevant options of authentication
	app.use(admin(sequelize, { 
		authentication: {
			param: 'credentials',
			via:   'headers'
		}
	}))

In total, you will end up with something like this:

	var app            = express()
	  , authentication = require('sequelize-authentication')
	  , restful        = require('sequelize-restful)
	  , admin          = require('sequelize-admin')
	  , Sequelize      = require('sequelize')
	  , sequelize      = new Sequelize('database', 'user', 'password')
	
	app.configure(function() {
		app.use(authenticate(sequelize, { 
			via: 'headers', 
			scope: '/admin/api', 
			param: 'credentials' 
		}))
	  
		app.use(restful(sequelize, { endpoint: '/admin/api' }))

		app.use(admin(sequelize, {
			endpoint: '/admin',
			restful:  '/admin/api',
			authentication: {
				via: 'headers', 
				param: 'credentials' 
			}
		}))
	})

If you just skip all the options and only use `admin(sequelize)`, you will get an admin panel which is located under `http://your.app/admin`, with a RESTful API under `http://your.app/admin/api` and without any protection of that API.


## Develompent notes

### Updating dependencies

Dependencies are managed with [bower](https://github.com/twitter/bower).
Check the documentation to get details about updating components. The respective
`component.json` is located under `app/js/component.json`. In order to update a
new component, you have to do this:

```console
cd app/js
bower install <component>
```

After updating bootstrap you need to run the following command:

```console
npm run amdify-bootstrap
```
