/// <reference path="../../typings/globals/jquery/index.d.ts" />
function getPhotoRequest(input) {
    console.log("api call", input);
    $.ajax({
        url: "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=09bba6751d0e8f198473cd4fc6d8512f&tags=" + input + "%2Ccute&tag_mode=all&sort=relevance&content_type=1&format=json&nojsoncallback=1",
        type: "GET"
    })
        .done(function (data) {
        if (data.stat != "fail" && data.photos.total != 0) {
            $(".photo").remove();
            $(".caption").remove();
            $(".hov").remove();
            $('.message').remove();
            console.log("photo data search", data.photos);
            var title = "Cute";
            var author = "Anon";
            $.each(data.photos.photo, function (i, data) {
                //console.log("i, data in add photo ",i, data.id, photoUrl);             
                var sizesUrl = "https://api.flickr.com/services/rest/?method=flickr.photos.getSizes&api_key=09bba6751d0e8f198473cd4fc6d8512f&photo_id=" + data.id + "&format=json&nojsoncallback=1";
                $.getJSON(sizesUrl, function (size) {
                    var id = data.id;
                    var photoUrl = "https://www.flickr.com/photos/" + data.owner + "/" + data.id;
                    var photoInfoUrl = "https://api.flickr.com/services/rest/?method=flickr.photos.getInfo&api_key=09bba6751d0e8f198473cd4fc6d8512f&photo_id=" + id + "&format=json&nojsoncallback=1";
                    $.getJSON(photoInfoUrl, function (info) {
                        //console.log("info on photo", info.photo.title._content);
                        title = info.photo.title._content;
                        author = info.photo.owner.username;
                        // console.log("grab size", size, photos[i]);
                        $.each(size.sizes.size, function (j, sizeResults) {
                            //console.log(id); 
                            if (sizeResults.label == "Large Square") {
                                //  if (count%6 == 0){
                                var originalUrl = sizeResults.source;
                                $.each(size.sizes.size, function (j, sizeResults) {
                                    if (sizeResults.label == "Original") {
                                        originalUrl = sizeResults.source;
                                    }
                                    else if (sizeResults.label == "Medium 640") {
                                        originalUrl = sizeResults.source;
                                    }
                                    else if (sizeResults.label == "Medium") {
                                        originalUrl = sizeResults.source;
                                    }
                                    else if (sizeResults.label == "Medium 800") {
                                        originalUrl = sizeResults.source;
                                    }
                                });
                                $("#photos").append('<li class="col-lg-2 col-md-2 col-sm-3  hov "><div class="caption"><p>"' + title.replace(/^"(.*)"$/, '$1') + ' \
                                            "</p></div><img class="photo" original="' + originalUrl + '" src="' + sizeResults.source + '" url="' + photoUrl + '"/></li>');
                                //console.log(title.replace(/^"(.*)"$/, '$1')) ; 
                                $('.hov').on('click', function () {
                                    var src = $(this).find(".photo");
                                    var title = $(this).find("p");
                                    var url = src.attr("url");
                                    //id = "0";
                                    var img = '<a href="' + url + '"><img src="' + src.attr("original") + '" class="img-responsive"/></a>';
                                    var modal = $('#fullSizePhoto');
                                    modal.modal();
                                    //console.log($(this)) ; 
                                    //var id = $(this).attr('id');
                                    $(".modal-body").html(img);
                                    $(".modal-title").html(title.text().replace(/^"(.*)"$/, '$1'));
                                });
                                $('.hov').hover(function () {
                                    // console.log($(this).find('p').text);
                                    $(this).find('.caption').show();
                                }, function () {
                                    $(this).find('.caption').hide();
                                });
                            }
                        });
                    });
                });
            });
        }
        else {
            $(".photo").remove();
            $(".caption").remove();
            $(".hov").remove();
            $("#photos").append('<h3 class=message>No cute photos matched :(</h3>');
            console.log("couldn't get data", data);
        }
    });
}
$(document).ready(function () {
    //console.log($("#searchBox").text());
    getPhotoRequest("kitten");
    $("#search").click(function (event) {
        event.preventDefault();
        var box = document.getElementById("searchBox");
        var input = box.value;
        //alert(input); 
        getPhotoRequest(input);
    });
});
