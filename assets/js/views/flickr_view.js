var FlickrView = Backbone.View.extend({
  initialize: function() {
    this.listenTo(this.collection, "sync", this.render);
    this.listenTo(this.collection, "error", this.error);

    this.collection.fetch();
  },

  render: function() {
    var html = document.createDocumentFragment();

    this.collection.each(function(model) {
      var image = document.createElement("img");
      image.src = model.get("media").m;
      image.className = "flickr__image";
      image.alt = model.get("title");
      html.appendChild(image);
    });

    this.el.appendChild(html);
  },

  error: function() {
    this.el.innerHTML = "Fetch Failed";
  }
});

document.addEventListener('DOMContentLoaded', function() {
  new FlickrView({
    el: this.querySelector(".flickr"),
    collection: new FlickrCollection()
  });
});
