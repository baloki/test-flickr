describe("Flickr", function() {
  var render;

  beforeEach(function() {
    flickr = new Flickr();
    data = {
                "title": "Recent Uploads tagged london",
                "link": "http://www.flickr.com/photos/tags/london/",
                "description": "",
                "modified": "2016-05-15T09:22:45Z",
                "generator": "http://www.flickr.com/",
                "items": [
                 {
                      "title": "Tweed Run Portrait",
                      "link": "http://www.flickr.com/photos/98826483@N07/26750179080/",
                      "media": {"m":"http://farm8.staticflickr.com/7770/26750179080_30b01582c8_m.jpg"},
                      "date_taken": "2016-05-14T16:40:31-08:00",
                      "description": " <p><a href=\"http://www.flickr.com/people/98826483@N07/\">Carlos Eduardo 012<\/a> posted a photo:<\/p> <p><a href=\"http://www.flickr.com/photos/98826483@N07/26750179080/\" title=\"Tweed Run Portrait\"><img src=\"http://farm8.staticflickr.com/7770/26750179080_30b01582c8_m.jpg\" width=\"240\" height=\"185\" alt=\"Tweed Run Portrait\" /><\/a><\/p> ",
                      "published": "2016-05-15T09:22:45Z",
                      "author": "nobody@flickr.com (Carlos Eduardo 012)",
                      "author_id": "98826483@N07",
                      "tags": "london run tweedrun"
                 }
                ]
              };

    flickr.template = jasmine.createSpy("template spy").and.callFake(function() {
      return Handlebars.compile("<div><img src='{{url}}' /></div>");
    });
  });

  it("should render an image when passed data", function() {
    expect(flickr.generateHTML(data)).toEqual("<div><img src='http://farm8.staticflickr.com/7770/26750179080_30b01582c8_m.jpg' /></div>");
  });
});