describe("Storage", function() {
  var storage;

  beforeEach(function() {
    storage = new Storage();
  });

  it("lets you save an array to localstorage", function() {
    storage.selectedImages = ["test"];
    spyOn(localStorage, 'setItem');
    storage.save();

    expect(localStorage.setItem).toHaveBeenCalledWith('selectedImages', '["test"]');
  });

  it("lets you load an array from localstorage", function() {
    storage.load();

    expect(storage.selectedImages).toEqual([]);
  });

  it("lets you load a previously saved array from localstorage", function() {
    storage.selectedImages = ["test"];
    storage.save();
    storage.selectedImages = [];
    storage.load();

    expect(storage.selectedImages).toEqual(["test"]);
  });
});
