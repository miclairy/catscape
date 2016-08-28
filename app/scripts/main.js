$('#search').click(getPhotoRequest("kitten"));
    
function getPhotoRequest(input){
    console.log("api call");
    $.ajax({
    url: "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=a912268eed1f9b50f37faf7b243ab7e4&tags=" + input + "%2Ccute&tag_mode=all&sort=relevance&content_type=1&format=json&nojsoncallback=1&auth_token=72157669879953884-976245242135a923&api_sig=7be241c3bbc2c0c80110266b6e3db2a8",
    type: "GET"
    })
    
    .done(function (data){
        if (data.length != 0){
            console.log("photo data search" , data.photos.photo[0]);
  
            $.each(data.photos.photo, function(i, data){
                //owner = data.photos.photo[i].owner;
                //id = data.photos.photo[i].id;
                console.log("i, data in add photo ",i, data.id);
                sizesUrl = "https://api.flickr.com/services/rest/?method=flickr.photos.getSizes&api_key=a912268eed1f9b50f37faf7b243ab7e4&photo_id="+ data.id +"&format=json&nojsoncallback=1"; 
                $.getJSON(sizesUrl, function(size){
                    console.log("grab size", size);
                    $.each(size.sizes.size, function(i, sizeResults){
                        if (sizeResults.label == "Large Square"){
                            $("#photo").append('<p><a href="' + sizeResults.url + '"><img src="' + sizeResults.source + '"/></a></p>');  
                        }
                    })
                })

});

        } else{
            console.log("couldn't get data");
        }
    });

}

function addPhoto(i, data){
    //owner = data.photos.photo[i].owner;
    id = data.photos.photo[i].id;
    console.log("i, data in add photo ",i, data);
    sizesUrl = "https://api.flickr.com/services/rest/?method=flickr.photos.getSizes&api_key=a912268eed1f9b50f37faf7b243ab7e4&photo_id=" + data.id + "&format=json&nojsoncallback=1&auth_token=72157669879953884-976245242135a923&api_sig=e54875c47a3c05c2e81009436f78f312"
    $.getJSON(sizesUrl, function(size){
        console.log("grab size", size.sizes);
        $.each(size.sizes.size, function(i, sizeResults){
            if (sizeResults.label == "Large Square"){
                $("#photo").append('<p><a href="' + sizeResults.url + '"><img src="' + sizeResults.source + '"/></a></p>');  
            }
        });
    });

}
