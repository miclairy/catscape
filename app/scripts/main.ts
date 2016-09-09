/// <reference path="../../typings/globals/jquery/index.d.ts" />
var count:number = 1;
var title:string = "Cute";
var author:string = "Anon"

function getPhotoRequest(input:String) : void{
    console.log("api call", input);
    $.ajax({
    url: "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=09bba6751d0e8f198473cd4fc6d8512f&tags=" + input + "%2Ccute&tag_mode=all&sort=relevance&content_type=1&format=json&nojsoncallback=1",
    type: "GET"
    })
    
    .done(function(data: any) : void{
        if (data.stat != "fail"){
            //$(".picrow").remove();
            //$(".col-sm-2").remove();
            $(".photo").remove();
            $(".caption").remove();
            $(".hov").remove();
            console.log("photo data search" , data);
            var photos:Array<String> = new Array();
            var titles:Array<String> = new Array();
            $.each(data.photos.photo, function(i:number, data:any) : void{
                //owner = data.photos.photo[i].owner;
                //id = data.photos.photo[i].id;
                
                //photos.push(photoUrl);
                //console.log("i, data in add photo ",i, data.id, photoUrl);
               
                var sizesUrl:string = "https://api.flickr.com/services/rest/?method=flickr.photos.getSizes&api_key=09bba6751d0e8f198473cd4fc6d8512f&photo_id="+ data.id +"&format=json&nojsoncallback=1"; 
                $.getJSON(sizesUrl, function(size:any) : void{
                    var id:number = data.id; 
                    var photoUrl:string = "https://www.flickr.com/photos/" + data.owner + "/" + data.id; 
                    var photoInfoUrl:string = "https://api.flickr.com/services/rest/?method=flickr.photos.getInfo&api_key=09bba6751d0e8f198473cd4fc6d8512f&photo_id="+ id +"&format=json&nojsoncallback=1"; 
                    $.getJSON(photoInfoUrl, function(info:any): void{
                        //console.log("info on photo", info.photo.title._content);
                        title = info.photo.title._content;
                        titles.push(title);
                        author = info.photo.owner.username;
                        // console.log("grab size", size, photos[i]);
                            $.each(size.sizes.size, function(j:number, sizeResults:any) : void{
                            console.log(id); 

                                if (sizeResults.label == "Large Square"){
                                    console.log(count, count%6,j, sizeResults.source);                           
                                //  if (count%6 == 0){
                                    var originalUrl:string = sizeResults.source;
                                    $.each(size.sizes.size, function(j:number, sizeResults:any) : void{
                                        if (sizeResults.label == "Original"){
                                            photos.push(sizeResults.source);
                                            originalUrl = sizeResults.source;
                                        } else if (sizeResults.label == "Medium 640"){
                                            photos.push(sizeResults.source);
                                            originalUrl = sizeResults.source;
                                        } else if (sizeResults.label == "Medium"){
                                            photos.push(sizeResults.source);
                                            originalUrl = sizeResults.source;
                                        } else if (sizeResults.label == "Medium 800"){
                                            photos.push(sizeResults.source);
                                            originalUrl = sizeResults.source;
                                        }
                                    });


                                
                                    $("#photos").append('<li class="col-lg-2 col-md-2 col-sm-3 col-xs-4 hov "><div class="caption"><p>"' + title.replace(/^"(.*)"$/, '$1') +' \
                                            "</p></div><img class="photo" original="' + originalUrl + '" src="' + sizeResults.source + '" url="' + photoUrl + '"/></li>');
                                    console.log(title.replace(/^"(.*)"$/, '$1')) ; 
                                    
            
                                    $('.hov').on('click',function(){
                                        var src:any = $(this).find(".photo");
                                        var title:any = $(this).find("p");
                                        var url:string = src.attr("url");
                                        //id = "0";
                                        console.log(title.text());
                                        var img:string = '<a href="' + url + '"><img src="'  + src.attr("original") +  '" class="img-responsive"/></a>';
                                        var modal:any = $('#fullSizePhoto')
                                        modal.modal();
                                        //console.log($(this)) ; 
                                        //var id = $(this).attr('id');
                                        $(".modal-body").html(img);
                                        $(".modal-title").html(title.text().replace(/^"(.*)"$/, '$1'));
                                        // $('#myModal').on('shown.bs.modal', function(){
                                        //     $('#myModal .modal-body').html(img);
                                        // });
                                        // $('#myModal').on('hidden.bs.modal', function(){
                                        //     $('#myModal .modal-body').html('');
                                        // });
                                    });

                                    $('.hov').hover(
                                        function(){
                                            console.log($(this).find('p').text);
                                            $(this).find('.caption').show();
                                        },
                                        function(){
                                            $(this).find('.caption').hide();
                                        }
                                    );

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

                })      
                                                                        
            }); 

        } else{
            $("#photos").append('<h3>No cute photos matched :(</h3>');
            console.log("couldn't get data", data);
        }


   

    });

    
}

$(document).ready(function(){
    //console.log($("#searchBox").text());
    



    getPhotoRequest("kitten");

    var url:String = "https://farm9.staticflickr.com/8188/28622911343_1982a4293b_q.jpg";
var id:number = 1;
var title:string = "cats are cute aye?"
$("#photos").append('<li class="col-lg-2 col-md-2 col-sm-3 col-xs-4 hov photo"><div class="caption"><p>"' + title +'"</p></div><img src="' + url + '" id:"' + 1 + '"/></li>');

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

    $('.hov').hover(
        function(){
            $(this).find('.caption').show();
        },
        function(){
            $(this).find('.caption').hide();
        }
    );
   
    $("img").on('click',function(){
        //alert("you clicked the static photo woop");
        var src = $(this).attr('src');
        var img = '<img src="'+ src +'" class="img-responsive"/>';
        var modal:any = $('#fullSizePhoto')
        modal.modal();
        $("#fill").html(img);
    });



})
   


