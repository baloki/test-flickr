var Flickr = Backbone.Model.extend({
  initialize: function() {
    this.set("uniqueId", this.generateID());
  },

  idAttribute: 'uniqueId',

  generateID: function() {
    return _.chain(this.get("media").m.split(/\.|\//g))
            .initial()
            .last()
            .value();
  }
});
