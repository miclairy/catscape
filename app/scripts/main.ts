/// <reference path="../../typings/globals/jquery/index.d.ts" />
var count:number = 1;
function getPhotoRequest(input:String) : void{
    console.log("api call", input);
    $.ajax({
    url: "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=09bba6751d0e8f198473cd4fc6d8512f&tags=" + input + "%2Ccute&tag_mode=all&sort=relevance&content_type=1&format=json&nojsoncallback=1",
    type: "GET"
    })
    
    .done(function(data: any) : void{
        if (data.stat != "fail"){
            //$(".picrow").remove();
            $(".col-sm-2").remove();
            $(".photo").remove();
            console.log("photo data search" , data);
            var photos:Array<String> = new Array();
            $.each(data.photos.photo, function(i:number, data:any) : void{
                //owner = data.photos.photo[i].owner;
                //id = data.photos.photo[i].id;
                var photoUrl:string = "https://www.flickr.com/photos/" + data.owner + "/" + data.id
                photos.push(photoUrl);
                console.log("i, data in add photo ",i, data.id, photoUrl);
                var sizesUrl:string = "https://api.flickr.com/services/rest/?method=flickr.photos.getSizes&api_key=09bba6751d0e8f198473cd4fc6d8512f&photo_id="+ data.id +"&format=json&nojsoncallback=1"; 
                
                $.getJSON(sizesUrl, function(size:any) : void{
                   // console.log("grab size", size, photos[i]);
                    $.each(size.sizes.size, function(j:number, sizeResults:any) : void{
                       //console.log(sizeResults.label); 
                       if (sizeResults.label == "Large Square"){
                           
                            console.log(count, count%6,j, sizeResults.source);                           
                          //  if (count%6 == 0){
                                $("#photo").append('<li class="col-lg-2 col-md-2 col-sm-3 col-xs-4"><img src="' + sizeResults.source + '"/></li>');
                            // } else {
                            //     $("#photo").append('<div class="col-sm-2"><p><a href=""><img class=photo src="' + sizeResults.source + '"/></a></p></div>');
                            // }
                            count = count + 1;
                        }
                        // if (sizeResults.label == "Original"){
                        //     console.log(sizeResults.source);
                        // }
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
    $("#search").click(function(event):void{
        event.preventDefault();
        var box:any = document.getElementById("searchBox");
        var input:string = box.value;
        //alert(input); 
        getPhotoRequest(input);
    });
        $('body').waitForImages().done(function() {
            // All descendant images have loaded, now slide up.
            alert("loaded");
        });
   
        $('li img').on('click',function(){
            var src = $(this).attr('src');
            var img = '<img src="' + src + '" class="img-responsive"/>';
            $('#myModal').modal();
            $('#myModal').on('shown.bs.modal', function(){
                $('#myModal .modal-body').html(img);
            });
            $('#myModal').on('hidden.bs.modal', function(){
                $('#myModal .modal-body').html('');
            });
        });




})
   


