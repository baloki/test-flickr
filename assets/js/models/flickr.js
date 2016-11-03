var Flickr = Backbone.Model.extend({
  initialize: function() {
    this.image = document.createElement("img");
    this.image.src = this.get("media").m;
    this.image.className = "flickr__image";
    this.image.alt = this.get("title");
  },

  render: function() {
    return this.image;
  }
});
