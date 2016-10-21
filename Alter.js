window.onload = function () {

  $.getScript("https://sdk.clarifai.com/js/clarifai-2.0.9.js", function () {

    var app = new Clarifai.App(
      '9dblPpA6NOnwF6sUQ697s8lTc6igUs-VPwEPpRXF',
      'dUwFBdQYl_SBrANV1c5TMf-K0X2F25Bdcs0JBRUw'
    );

    var imgWithoutAltList = $('img[alt=""]').map(function () {
      return $(this);
    });
    // console.log('imgWithoutAltList: ', imgWithoutAltList);

    imgWithoutAltList.map(function (i) {
        // console.log(imgWithoutAltList[i].attr("src"));

        // predict the contents of an image by passing in a url
        var tagsList = app.models.predict(Clarifai.GENERAL_MODEL, imgWithoutAltList[i].attr("src")).then(
          function(response) {
            var tagsList = getTags(response.data.outputs[0].data.concepts); // Don't iterate over outputs. Keep it as is.
            addTagsToImgageAlt(imgWithoutAltList[i], tagsList);
          },
          function(err) {
            console.error(err);
          }
        );

    });

  });

};

function getTags(imgObjectList) {
  var tagsList = [];

  tagsList = imgObjectList.map(function (obj) {
    return obj.name;
  })

  return tagsList;
}

function addTagsToImgageAlt(img, tagsList) {
  img.attr('alt', makeStringOfTagsList(tagsList));
}

function makeStringOfTagsList(tags, maxNumberOfWords=5) {
  return tags.slice(0,maxNumberOfWords).join(' ');
}
