var FlickrCollection = Backbone.Collection.extend({
  model: Flickr,
  url: 'http://api.flickr.com/services/feeds/photos_public.gne?format=json&jsoncallback=cb&tags=London',

  sync: function(method, collection, options) {
    options.dataType = "jsonp";
    options.jsonpCallback = "cb";
    return Backbone.sync(method, collection, options);
  },

  initialize: function() {
    this.localStorage = new Storage();
    this.localStorage.load();

    this.listenTo(this, "change", this.localStorage.save.bind(this.localStorage));
  },

  parse: function(response) {
    return response.items;
  }
});
