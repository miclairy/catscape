/// <reference path="../../typings/globals/jquery/index.d.ts" />

function getPhotoRequest(input : any) : void{
    console.log("api call", input);
    
    $.ajax({
    url: "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=09bba6751d0e8f198473cd4fc6d8512f&tags=" + input + "%2Ccute&tag_mode=all&sort=relevance&content_type=1&format=json&nojsoncallback=1",
    type: "GET"
    })
    
    .done(function(data: any) : void{
        if (data.stat != "fail" && data.photos.total != 0){
            $(".photo").remove();
            $(".caption").remove();
            $(".hov").remove();
            $('.message').remove();
            console.log("photo data search" , data.photos);
            
            var title:string = "Cute";
            var author:string = "Anon";
            $.each(data.photos.photo, function(i:number, data:any) : void{
                //console.log("i, data in add photo ",i, data.id, photoUrl);             
                var sizesUrl:string = "https://api.flickr.com/services/rest/?method=flickr.photos.getSizes&api_key=09bba6751d0e8f198473cd4fc6d8512f&photo_id="+ data.id +"&format=json&nojsoncallback=1"; 
                $.getJSON(sizesUrl, function(size:any) : void{
                    var id:number = data.id; 
                    var photoUrl:string = "https://www.flickr.com/photos/" + data.owner + "/" + data.id; 
                    var photoInfoUrl:string = "https://api.flickr.com/services/rest/?method=flickr.photos.getInfo&api_key=09bba6751d0e8f198473cd4fc6d8512f&photo_id="+ id +"&format=json&nojsoncallback=1"; 
                    $.getJSON(photoInfoUrl, function(info:any): void{
                        //console.log("info on photo", info.photo.title._content);
                        title = info.photo.title._content;
                        author = info.photo.owner.username;
                        // console.log("grab size", size, photos[i]);
                            $.each(size.sizes.size, function(j:number, sizeResults:any) : void{
                            //console.log(id); 

                                if (sizeResults.label == "Large Square"){              
                                //  if (count%6 == 0){
                                    var originalUrl:string = sizeResults.source;
                                    $.each(size.sizes.size, function(j:number, sizeResults:any) : void{
                                        if (sizeResults.label == "Original"){
                                            originalUrl = sizeResults.source;
                                        } else if (sizeResults.label == "Medium 640"){
                                            originalUrl = sizeResults.source;
                                        } else if (sizeResults.label == "Medium"){
                                            originalUrl = sizeResults.source;
                                        } else if (sizeResults.label == "Medium 800"){
                                            originalUrl = sizeResults.source;
                                        }
                                    });
                               
                                    $("#photos").append('<li class="col-lg-2 col-md-2 col-sm-3 col-xs-4 hov "><div class="caption"><p>"' + title.replace(/^"(.*)"$/, '$1') +' \
                                            "</p></div><img class="photo" original="' + originalUrl + '" src="' + sizeResults.source + '" url="' + photoUrl + '"/></li>');
                                    //console.log(title.replace(/^"(.*)"$/, '$1')) ; 
                                    
            
                                    $('.hov').on('click',function(){
                                        var src:any = $(this).find(".photo");
                                        var title:any = $(this).find("p");
                                        var url:string = src.attr("url");
                                        //id = "0";
                                        
                                        var img:string = '<a href="' + url + '"><img src="'  + src.attr("original") +  '" class="img-responsive"/></a>';
                                        var modal:any = $('#fullSizePhoto')
                                        modal.modal();
                                        //console.log($(this)) ; 
                                        //var id = $(this).attr('id');
                                        $(".modal-body").html(img);
                                        $(".modal-title").html(title.text().replace(/^"(.*)"$/, '$1'));

                                    });

                                    $('.hov').hover(
                                        function(){
                                           // console.log($(this).find('p').text);
                                            $(this).find('.caption').show();
                                        },
                                        function(){
                                            $(this).find('.caption').hide();
                                        }
                                    );
                            }

                    })

                    })

                })      
                                                                        
            });
            

        } else{
            $(".photo").remove();
            $(".caption").remove();
            $(".hov").remove();
            $("#photos").append('<h3 class=message>No cute photos matched :(</h3>');
            console.log("couldn't get data", data);
        }

        

    });

    
}

$(document).ready(function(){
    //console.log($("#searchBox").text());
    getPhotoRequest("kitten");


    $("#search").click(function(event):void{
        event.preventDefault();
        var box:any = document.getElementById("searchBox");
        var input:string = box.value;
        //alert(input); 
        getPhotoRequest(input);
    });

})
   


