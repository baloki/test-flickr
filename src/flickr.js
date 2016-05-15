function Flickr() {
  this.template = function() {
    var source = document.getElementById("image-template").innerHTML;
    return Handlebars.compile(source);
  }
}

Flickr.prototype.render = function(data) {
  var template = this.template();

  data.items.forEach(function(image) {
    var context = {url: image.media.m};
    var html = template(context);
    document.body.insertAdjacentHTML('beforeend', html);
  });
};