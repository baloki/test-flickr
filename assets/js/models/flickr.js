var Flickr = Backbone.Model.extend({
  initialize: function() {
    this.id = this.generateID();
  },

  generateID: function() {
    return _.chain(this.get("media").m.split(/\.|\//g))
            .initial()
            .last()
            .value();
  }
});
