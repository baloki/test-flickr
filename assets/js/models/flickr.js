var Flickr = Backbone.Model.extend({
  initialize: function() {
    this.set("uniqueId", this.generateID());

    var initialState = this.collection.localStorage.selectedImages.indexOf(this.id);
    if (initialState !== -1) {
      this.set("selected", true);
    }

    this.listenTo(this, "change", this.updateStorage);
  },

  idAttribute: 'uniqueId',

  generateID: function() {
    return _.chain(this.get("media").m.split(/\.|\//g))
            .initial()
            .last()
            .value();
  },

  updateStorage: function() {
    if (this.get("selected")) {
      this.collection.localStorage.selectedImages.push(this.id);
    } else {
      var index = this.collection.localStorage.selectedImages.indexOf(this.id);
      this.collection.localStorage.selectedImages.splice(index, 1);
    }
  }
});
