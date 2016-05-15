function Flickr() {
  this.template = function() {
    var source = document.getElementById("image-template").innerHTML;
    return Handlebars.compile(source);
  }
}

Flickr.prototype.generateHTML = function(data) {
  var template = this.template();
  var html = "";

  data.items.forEach(function(image) {
    var context = {url: image.media.m};
    console.log(context);
    html += template(context);
  });
  
  return html;
}

Flickr.prototype.render = function(data) {
  var html = this.generateHTML(data);
  document.body.insertAdjacentHTML('beforeend', html);
};