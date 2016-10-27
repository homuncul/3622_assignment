flickrAuth.SECRET = "faf000ccf1b60ffa";
flickrAuth.frob = "";
flickrAuth.frobCallBack;
flickrAuth.name = "";

/* 
 *  Takes an URL and returnes a signed URL
*/

flickrAuth.signRequest = function(url){
    var urlBits = url.split('?');
    // console.log(urlBits);
    var params = urlBits[1].split('&');
    // console.log(params);
    params.sort();
    for(var i = 0; i < params.length; i++){
        params[i] = params[i].replace('=','');
    }
    var stringToSign = flickrAuth.SECRET + params.join('');
    // console.log(stringToSign);
    var digest = CryptoJS.MD5(stringToSign);
    // console.log(digest);
    var signedURL = url + "&api_sig=" + digest;
    // console.log(signedURL);
    return signedURL;
};

flickrAuth.login = function(){
    var getFrobURL = "https://api.flickr.com/services/rest/?method=flickr.auth.getFrob&format=json&nojsoncallback=1" + "&" + flickr.APIkey;
    getFrobURL = flickrAuth.signRequest(getFrobURL);
    $.get(getFrobURL, function(data){
        flickrAuth.frob = data.frob._content;
        // console.log(flickrAuth.frob);
        var authLink = "http://flickr.com/services/auth/?" + flickr.APIkey + "&perms=write&frob=" + flickrAuth.frob;
        authLink = flickrAuth.signRequest(authLink);
        window.open(authLink);
        alert('Click OK you have signed into Flickr.com');
        console.log('User have signed it');
    });
};

flickrAuth.getFrob = function(frobCallBack){
    flickrAuth.frobCallBack = frobCallBack;
    var getFrobURL = "https://api.flickr.com/services/rest/?method=flickr.auth.getFrob&format=json&nojsoncallback=1&" + flickr.APIkey;
    getFrobURL = flickrAuth.signRequest(getFrobURL);
    console.log(getFrobURL);
    $.get(getFrobURL, function(data){
        flickrAuth.frob = "frob=" + data.frob._content;
        console.log("flickrAuth.getFrob(): "+flickrAuth.frob);
    });
};

flickrAuth.getToken = function(){
    // flickrAuth.getFrob();
    console.log("flickrAuth.getToken(): " + flickrAuth.frob);
    
    var getTokenURL = "https://api.flickr.com/services/rest/?method=flickr.auth.getToken&" + flickr.APIkey + "&" + flickrAuth.frob +"&format=json&nojsoncallback=1";
    getTokenURL = flickrAuth.signRequest(getTokenURL);
    console.log("ToketURL: " + getTokenURL);
    
    $.get(getTokenURL,function(data){
		console.log("data from TokenURL: ");
		console.log(data);
		
// 		flickrAuth.name = data.auth.username.fullname;
// 		console.log("name: " + flickrAuth.name);
	
	});
    
    // $.get(getTokenURL, function(data){
    //     console.log(data);
    // });
};