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
      var image = document.createElement("img");
      image.src = model.get("media").m;
      image.className = "flickr__image";
      image.alt = model.get("title");
      image.id = model.id;
      image.setAttribute("data-selected", model.get("selected") || "false");
      html.appendChild(image);
    });

    this.el.appendChild(html);
  },

  toggleImage: function(event) {
    var elementId = event.target.id;

    _.each(this.collection.where({ selected: true }), function(model) {
      model.set({ selected: false });
    });

    _.each(document.querySelectorAll(".flickr__image"), function(element) {
      element.setAttribute("data-selected", "false");
    });

    if (event.target.dataset.selected === "false") {
      this.collection.get(elementId).set({ selected: true });
      event.target.setAttribute("data-selected", "true");
    }
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
