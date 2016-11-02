var FlickrView = Backbone.View.extend({
  "use strict";

  initialize: function() {
    this.listenTo(this.collection, "sync", this.render);
    this.listenTo(this.collection, "error", this.error);

    this.collection.fetch();
  },

  render: function() {
    this.collection.each(function(model) {
      console.log(model.get("media").m);
    })
    this.el.innerHTML = "success";
  },

  error: function() {
    this.el.innerHTML = "Fetch Failed";
  }
});

document.addEventListener('DOMContentLoaded', function() {
  new FlickrView({
    el: this.querySelector(".flickr"),
    collection: new FlickrCollection()
  })
});
