
function getPhotoRequest(input){
    console.log("api call", input);
    $.ajax({
    url: "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=09bba6751d0e8f198473cd4fc6d8512f&tags=" + input + "%2Ccute&tag_mode=all&sort=relevance&content_type=1&format=json&nojsoncallback=1",
    type: "GET"
    })
    
    .done(function (data){
        if (data.stat != "fail"){
            $(".picrow").remove();
            $(".col-sm-2").remove();
            $(".photo").remove();
            console.log("photo data search" , data);
            var photos = new Array();
            $.each(data.photos.photo, function(i, data){
                //owner = data.photos.photo[i].owner;
                //id = data.photos.photo[i].id;
                photoUrl = "https://www.flickr.com/photos/" + data.owner + "/" + data.id
                photos.push(photoUrl);
                console.log("i, data in add photo ",i, data.id, photoUrl);
                sizesUrl = "https://api.flickr.com/services/rest/?method=flickr.photos.getSizes&api_key=09bba6751d0e8f198473cd4fc6d8512f&photo_id="+ data.id +"&format=json&nojsoncallback=1"; 
                count = 1;
                $.getJSON(sizesUrl, function(size){
                    console.log("grab size", size, photos[i]);
                    $.each(size.sizes.size, function(j, sizeResults){
                        
                       if (sizeResults.label == "Large Square"){
                            console.log(count, count%10);
                            
                            if (count%6 == 0){
                                $("#photo").append('</div><div class="row picrow"><div class="col-sm-2"><p><a href="' + photos[i] + '"><img class=photo src="' + sizeResults.source + '"/></a></p></div>');
                            } else {
                                $("#photo").append('<div class="col-sm-2"><p><a href="' + photos[i] + '"><img class=photo src="' + sizeResults.source + '"/></a></p></div>');
                            }
                            count++;
                        }
                   })
                 })
            }); 

        } else{
            $("#photo").append('<h3>No cute photos matched :(</h3>');
            console.log("couldn't get data", data);
        }
    });
    
}

$(document).ready(function(){
    //console.log($("#searchBox").text());
    getPhotoRequest("kitten");

    //$(".photo").remove();
    //alert('done');
   // getPhotoRequest("owl");
    $("#search").click(function(event){
        event.preventDefault();
        input = document.getElementById("searchBox").value;
        //alert(input); 
        getPhotoRequest(input);
    });
   
}); 

