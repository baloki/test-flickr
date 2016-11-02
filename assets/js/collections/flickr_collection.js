var FlickrCollection = Backbone.Collection.extend({
  "use strict";

  model: Flickr,
  url: 'http://api.flickr.com/services/feeds/photos_public.gne?format=json&jsoncallback=cb&tags=London',

  sync: function(method, collection, options) {
    options.dataType = "jsonp";
    options.jsonpCallback = "cb";
    return Backbone.sync(method, collection, options);
  },

  parse: function(response) {
    return response.items;
  }
});
