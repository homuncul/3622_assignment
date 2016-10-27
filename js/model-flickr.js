
flickr.APIkey = 'api_key=dc140afe3fd3a251c2fdf9dcd835be5c';
flickr.photos = new Array();
flickr.numPhotos = 0;
flickr.sizesReturn = 0;
flickr.displayCallBack;


flickr.getInteresting = function(displayCallBack) {
    flickr.displayCallBack = displayCallBack;
    var interestingURL = 'https://api.flickr.com/services/rest/?method=flickr.interestingness.getList&per_page=20&format=json&nojsoncallback=1' + '&' + flickr.APIkey;
    interestingURL = flickrAuth.signRequest(interestingURL);
    $.get(interestingURL, function(data){
        // console.log(data);
        flickr.fetchLink(data);
    });
};


flickr.fetchLink = function(data){
    flickr.photos = [];
    flickr.numPhotos = data.photos.photo.length;
    flickr.sizesReturn = 0;
    for (var i = 0; i < data.photos.photo.length; i++){
        // console.log(data.photos.photo[i].id);
        var photoObj = {id: data.photos.photo[i].id, description: data.photos.photo[i].title};
        flickr.photos.push(photoObj);
        flickr.getImage(photoObj);
    }
};

flickr.getImage = function(photoObj){
    var noLarge = true;
    var getSizesURL = 'https://api.flickr.com/services/rest/?method=flickr.photos.getSizes&photo_id='+ photoObj.id +'&format=json&nojsoncallback=1' + '&' + flickr.APIkey;
    getSizesURL = flickrAuth.signRequest(getSizesURL);
    $.get(getSizesURL, function(data){
        // console.log(data);
        // photoObj.url = data.sizes.size[0].source;
        for (var i = 0; i < data.sizes.size.length; i++){
            if (data.sizes.size[i].label == 'Small'){
                photoObj.urlThumb = data.sizes.size[i].source;
                // console.log('found Small label: ' + photoObj.url);
            }
            if (data.sizes.size[i].label == 'Large'){
                photoObj.urlLarge = data.sizes.size[i].source;
                noLarge = false;
            }
        }
        if (noLarge){
            photoObj.urlLarge = data.sizes.size[data.sizes.size.length - 1].source;
        }
        // console.log(photoObj.url);
        // console.log(photoObj.description);
        flickr.sizesReturn++;
        if (flickr.sizesReturn == flickr.numPhotos){
            flickr.displayCallBack(flickr.photos);
        }
    });
};

/*
 *  Search
 */

flickr.search = function(){
    var inputStr = $("#searchTxt").val().trim().toLocaleLowerCase();
    var searchURL = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&text=' + inputStr + '&per_page=20&format=json&nojsoncallback=1' + '&' + flickr.APIkey;
    searchURL = flickrAuth.signRequest(searchURL);
    $.get(searchURL, function(data){
        //console.log(data);
        flickr.fetchLink(data);
    });
};

// function search(photoData) {
//     var inputStr = $("#searchTxt").val().trim().toLowerCase();
//     var found = [];
//     for (var i = 0; i < photoData.length; i++){
//         if (photoData[i].description.toLowerCase().indexOf(inputStr) != -1){
//             found.push(photoData[i]);
//         }
//     }
//     console.log(found);
//     displayThumb(found);
// };




