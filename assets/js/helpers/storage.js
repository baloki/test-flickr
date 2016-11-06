function Storage() {
  this.selectedImages = [];
}

Storage.prototype.save = function() {
  if(typeof(Storage) !== "undefined" && this.selectedImages) {
    localStorage.setItem("selectedImages", JSON.stringify(this.selectedImages));
  }
};

Storage.prototype.load = function() {
  if(typeof(Storage) !== "undefined") {
    this.selectedImages = JSON.parse(localStorage.getItem("selectedImages")) || [];
  }
};
