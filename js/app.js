(function(){
  var App = {}

  App.init = function () {

    intel.xdk.device.hideSplashScreen();

    document.addEventListener("intel.xdk.camera.picture.add", function (e) {
      console.log("add photo", e.filename);
      App.prependPhoto(e.filename);
    });

    document.addEventListener("intel.xdk.camera.picture.clear", function (e) {
      console.log("clearing photos");
      App.updatePhotos();
      $.ui.toggleLeftSideMenu(false);
    });

    $("body").on("click", ".js-take-photo", function () {
      console.log("take photo");
      intel.xdk.camera.takePicture(10, true, 'jpg');
    });

    $("body").on("click", ".js-clear-photos", function () {
      console.log("clear photos");
      intel.xdk.camera.clearPictures();

    });

    App.updatePhotos();
  }

  App.prependPhoto = function (photoName) {
    var photoSrc = intel.xdk.camera.getPictureURL(photoName);
    var photoEl = $("<li><img src='" + photoSrc + "' /></li>");
    $("#photoList .takephoto").remove();
    $("#photoList").prepend(photoEl);
  }

  App.updatePhotos = function () {
    var photos = intel.xdk.camera.getPictureList();
    var photosEl = $("#photoList");
    console.log("Updating photos");
    photosEl.empty();
    if (photos.length) {
      for (i in photos) {
        var photoSrc = intel.xdk.camera.getPictureURL(photos[i]);
        var photoEl = $("<li><img src='" + photoSrc + "' /></li>");
        photosEl.prepend(photoEl);
      }
    } else {
      var link = $("<li class='takephoto'><a href='#' class='button js-take-photo'>Take a photo</a></li>");
      photosEl.prepend(link);
      link.bind("click", function () {
        intel.xdk.camera.takePicture(10, true, 'jpg');
      });
    }
  }

  var onDeviceReady = function(){
    console.log("init");
    App.init();
  };

  document.addEventListener("intel.xdk.device.ready", onDeviceReady, false);
})();