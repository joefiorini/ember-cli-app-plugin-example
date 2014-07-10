import Ember from 'ember';

var Router = Ember.Router.extend({
  location: HostAppENV.locationType
});

Router.map(function() {
  this.route('my-plugin', {path: '/plugin'});
});

export default Router;
