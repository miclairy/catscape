/// <reference path="../../typings/globals/jquery/index.d.ts" />
var count = 1;
var title = "Cute";
var author = "Anon";
function getPhotoRequest(input) {
    console.log("api call", input);
    $.ajax({
        url: "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=09bba6751d0e8f198473cd4fc6d8512f&tags=" + input + "%2Ccute&tag_mode=all&sort=relevance&content_type=1&format=json&nojsoncallback=1",
        type: "GET"
    })
        .done(function (data) {
        if (data.stat != "fail") {
            //$(".picrow").remove();
            //$(".col-sm-2").remove();
            $(".photo").remove();
            console.log("photo data search", data);
            var photos = new Array();
            var titles = new Array();
            $.each(data.photos.photo, function (i, data) {
                //owner = data.photos.photo[i].owner;
                //id = data.photos.photo[i].id;
                var photoUrl = "https://www.flickr.com/photos/" + data.owner + "/" + data.id;
                photos.push(photoUrl);
                //console.log("i, data in add photo ",i, data.id, photoUrl);
                var id = data.id;
                var photoInfoUrl = "https://api.flickr.com/services/rest/?method=flickr.photos.getInfo&api_key=09bba6751d0e8f198473cd4fc6d8512f&photo_id=" + id + "&format=json&nojsoncallback=1";
                $.getJSON(photoInfoUrl, function (info) {
                    //console.log("info on photo", info.photo.title._content);
                    title = info.photo.title._content;
                    titles.push(title);
                    author = info.photo.owner.username;
                    var sizesUrl = "https://api.flickr.com/services/rest/?method=flickr.photos.getSizes&api_key=09bba6751d0e8f198473cd4fc6d8512f&photo_id=" + data.id + "&format=json&nojsoncallback=1";
                    $.getJSON(sizesUrl, function (size) {
                        // console.log("grab size", size, photos[i]);
                        $.each(size.sizes.size, function (j, sizeResults) {
                            //console.log(sizeResults.label); 
                            if (sizeResults.label == "Large Square") {
                                console.log(count, count % 6, j, sizeResults.source);
                                //  if (count%6 == 0){
                                $("#photos").append('<li class="col-lg-2 col-md-2 col-sm-3 col-xs-4 hov "><div class="caption"><p>"' + titles[i] + '"</p></div><img class="photo" src="' + sizeResults.source + '" id:"' + i + '"/></li>');
                                console.log($(".photo").attr("id"));
                                $('.hov').on('click', function () {
                                    var src = $(this).attr('src');
                                    var img = '<img src="' + sizeResults.source + '" class="img-responsive"/>';
                                    var modal = $('#myModal');
                                    modal.modal();
                                    console.log($(this));
                                    var id = $(this).attr('class');
                                    $(".modal-body").html(img);
                                    // $('#myModal').on('shown.bs.modal', function(){
                                    //     $('#myModal .modal-body').html(img);
                                    // });
                                    // $('#myModal').on('hidden.bs.modal', function(){
                                    //     $('#myModal .modal-body').html('');
                                    // });
                                });
                                $('.hov').hover(function () {
                                    $(this).find('.caption').show();
                                }, function () {
                                    $(this).find('.caption').hide();
                                });
                                // } else {
                                //     $("#photo").append('<div class="col-sm-2"><p><a href=""><img class=photo src="' + sizeResults.source + '"/></a></p></div>');
                                // }
                                count = count + 1;
                            }
                            // if (sizeResults.label == "Original"){
                            //     console.log(sizeResults.source);
                            // }
                        });
                    });
                });
            });
        }
        else {
            $("#photos").append('<h3>No cute photos matched :(</h3>');
            console.log("couldn't get data", data);
        }
    });
}
$(document).ready(function () {
    //console.log($("#searchBox").text());
    getPhotoRequest("kitten");
    var url = "https://farm9.staticflickr.com/8188/28622911343_1982a4293b_q.jpg";
    var id = 1;
    var title = "cats are cute aye?";
    $("#photos").append('<li class="col-lg-2 col-md-2 col-sm-3 col-xs-4 hov photo"><div class="caption"><p>"' + title + '"</p></div><img src="' + url + '" id:"' + 1 + '"/></li>');
    //$(".photo").remove();
    //alert('done');
    // getPhotoRequest("owl");
    $("#search").click(function (event) {
        event.preventDefault();
        var box = document.getElementById("searchBox");
        var input = box.value;
        //alert(input); 
        getPhotoRequest(input);
    });
    $('.hov').hover(function () {
        $(this).find('.caption').show();
    }, function () {
        $(this).find('.caption').hide();
    });
    $("img").on('click', function () {
        //alert("you clicked the static photo woop");
        var src = $(this).attr('src');
        var img = '<img src="' + src + '" class="img-responsive"/>';
        var modal = $('#fullSizePhoto');
        modal.modal();
        $("#fill").html(img);
    });
    // $('.photo').on('click',function(){
    //     alert("you clicked the photo woop");
    //     var src = $(this).attr('src');
    //     var img = '<img src="https://farm3.staticflickr.com/2854/9972740276_66b3c326f1_q.jpg" class="img-responsive"/>';
    //     var modal:any = $('#myModal')
    //     modal.modal();
    //     $('#myModal').on('shown.bs.modal', function(){
    //         $('#myModal .modal-body').html(img);
    //     });
    //     $('#myModal').on('hidden.bs.modal', function(){
    //         $('#myModal .modal-body').html('');
    //     });
    // });
});
