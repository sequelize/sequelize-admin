# sequelize-admin

A connect module for managing database entries of registered sequelize models.

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
