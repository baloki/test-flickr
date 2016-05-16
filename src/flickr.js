function Flickr() {
  this.template = function() {
    var source = document.getElementById("image-template").innerHTML;
    return Handlebars.compile(source);
  }
  
  this.data = {};
  
  this.storage = new Storage;
  this.storage.load();
  
  this.selectedImages = this.storage.selectedImages;
};

Flickr.prototype.bindEvents = function() {
  var _self = this;
  var images = document.querySelectorAll(".flickr__image");
  
  for (i = 0; i < images.length; i++) {
    images[i].addEventListener("click", function(event) {
      _self.selectImage(event.srcElement.src);
    }, false);
  };
};

Flickr.prototype.render = function() {
  var html = this.generateHTML();
  document.querySelectorAll(".flickr")[0].innerHTML = html;
  
  this.bindEvents();
};

Flickr.prototype.generateHTML = function() {
  var _self = this;
  var template = this.template();
  var html = "";

  this.data.items.forEach(function(image) {
    var selected = false;
    var imageSrc = image.media.m;
      
    if (_self.selectedImages.indexOf(imageSrc) > -1) {
      selected = true;
    }
    
    var context = {url: imageSrc, selected: selected};
    html += template(context);
  });
  
  return html;
};

Flickr.prototype.selectImage = function(image) {
  var index = this.selectedImages.indexOf(image);
  
  if (index > -1) {
    this.selectedImages.splice(index, 1);
  } else {
    this.selectedImages.push(image);
  };
  
  this.render();
  this.storage.save();
};