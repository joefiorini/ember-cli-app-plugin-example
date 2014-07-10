# Ember CLI App as Plugin

This repo shows an example of installing an ember-cli app as a plugin within another ember-cli app.

Thanks to @rondale-sc for starting this work in https://github.com/rondale-sc/ember-cli-super-number.

## Prerequisite Reading

First off, if you aren't familiar with how ember-cli addons work, make sure you read [DockYard's post on the topic](https://github.com/rondale-sc/ember-cli-super-number).

## Structure

`host-app`

This is the primary app that pulls in code from the plugin.

`plugin-app`

This is the app that contains extracted code. Using the pod layout, we can safely namespace routes, controllers & views inside our plugin. Templates don't work in the pod structure yet because ember-cli insists on putting them under a `templates` folder, thus making the final module path `host-app/templates/my-plugin/template`, while the resolver's pod support is looking for `host-app/my-plugin/template`. Is this filed as an issue on ember-cli yet?

## Relevant Files

`plugin-app/index.js`

This is the file that ember-cli runs when it sees the addon. It will call `treeFor` with various folder names.

`plugin-app/app/my-plugin/route.js`

The pod structure giving us nice namespacing within our plugin. Of course, we can have more than one pod in here and ember-cli will include them all.

`plugin-app/app/templates/my-plugin.hbs`

The template for the aforementioned pod. Normally this would be in `my-plugin/template.hbs` instead, but see the above note on the ember-cli bug forcing us to do this.

`host-app/app/router.js`

Note the inclusion of the route:

```
this.route('my-plugin', {path: 'plugin'});
```

This will include the route from the plugin, but still allow us to customize the path.
