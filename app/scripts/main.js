
function getPhotoRequest(input){
    console.log("api call", input);
    $.ajax({
    url: "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=a912268eed1f9b50f37faf7b243ab7e4&tags=" + input + "%2Ccute&tag_mode=all&sort=relevance&content_type=1&format=json&nojsoncallback=1",
    type: "GET"
    })
    
    .done(function (data){
        if (data.stat != "fail"){
            console.log("photo data search" , data);
            var photos = new Array();
            $.each(data.photos.photo, function(i, data){
                //owner = data.photos.photo[i].owner;
                //id = data.photos.photo[i].id;
                photoUrl = "https://www.flickr.com/photos/" + data.owner + "/" + data.id
                photos.push(photoUrl);
                console.log("i, data in add photo ",i, data.id, photoUrl);
                sizesUrl = "https://api.flickr.com/services/rest/?method=flickr.photos.getSizes&api_key=a912268eed1f9b50f37faf7b243ab7e4&photo_id="+ data.id +"&format=json&nojsoncallback=1"; 
                $.getJSON(sizesUrl, function(size){
                    console.log("grab size", size, photos[i]);
                    $.each(size.sizes.size, function(j, sizeResults){
                        if (sizeResults.label == "Large Square"){
                            $("#photo").append('<p><a href="' + photos[i] + '"><img class=photo src="' + sizeResults.source + '"/></a></p>');  
                        }
                    })
                })
            });

        } else{
            $("#photo").append('<h3>No cute photos matched :(</h3>');
            console.log("couldn't get data");
        }
    });

}

$(document).ready(function(){
    //console.log($("#searchBox").text());
    getPhotoRequest("kitten");
    input = document.getElementById("searchBox").value;
    alert(input);
    getPhotoRequest(input);
    $("#search").click(getPhotoRequest());
   
}); 

