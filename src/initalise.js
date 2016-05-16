(function() {
  window.cb = function(data) {
    var flickr = new Flickr();
    flickr.data = data;
    flickr.render();
  }

  var tags = 'london';
  var script = document.createElement('script');
  script.src = 'http://api.flickr.com/services/feeds/photos_public.gne?format=json&jsoncallback=cb& tags=' +  tags;
  document.head.appendChild(script);
})();