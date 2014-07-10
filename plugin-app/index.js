var path = require('path');
var fs = require('fs');

function PluginApp(project) {
  this.project = project;
}

function unwatchedTree(dir) {
  return {
    read:    function() { return dir; },
    cleanup: function() { }
  };
}

function tryFindTree() {
  var paths = Array.prototype.slice.apply(arguments);

  return paths.reduce(function(tree, path) {
    if(fs.existsSync(path)) {
      return unwatchedTree(path);
    } else {
      return tree;
    }
  }, null);
}

PluginApp.prototype.treeFor = function treeFor(name) {
  var treePath = path.join('node_modules', 'plugin-app', name);
  var appTreePath = path.join('node_modules', 'plugin-app', 'app', name);

  return tryFindTree(treePath, appTreePath);
};

PluginApp.prototype.included = function included(app) {
  this.app = app;

  // var templatePath = path.join('node_modules', 'plugin-app', 'app', 'my-plugin', 'template.hbs');
  // this.app.import(templatePath);

  // use `this.app.import(...)` to pull in additional assets here
};

module.exports = PluginApp;
