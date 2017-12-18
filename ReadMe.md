# Edit Templates
This packages syncs the templates in the this module to the database

# Commands

### Pull all templates from the DB
Pull all templates from the db. This WILL OVERWRITE any files in this repository
```
node index.js
```

### Save all templates to the DB
This will push all the templates from the files to the database. It creates a new minor version in the DB of all template files.
```
node saveTemplate.js
```

### Create a new template
This creates a new template with a given name for a given resource
```
node template.js -n Name_of_template -r Name_of_resource
```

### Save files as you are working on them
This watches files, and when one is updated it pushes it the DB. Alerting you on the desktop that this has been done.
```
node templateWatcher.js
```

