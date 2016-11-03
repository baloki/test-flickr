var FlickrView = Backbone.View.extend({
  initialize: function() {
    this.listenTo(this.collection, "sync", this.render);
    this.listenTo(this.collection, "error", this.error);

    this.collection.fetch();
  },

  events: {
    "click .flickr__image": "toggleImage"
  },

  render: function() {
    var html = document.createDocumentFragment();

    this.collection.each(function(model) {
      html.appendChild(model.render());
    });

    this.el.appendChild(html);
  },

  toggleImage: function() {
    alert("Test");
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
