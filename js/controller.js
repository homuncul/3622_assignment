var controller = {};
// var flickr = {};
// var flickrAuth = {};
var view = {};
var model = {};


$(document).ready(function(){
    
    $('#splash').hide();
    $('#content').hide();
    
    /* 
    *  If logged into FaceBook, don't show the Splash Screen
    */
    
    
    
    
    if(model.checkAccessToken()){
        console.log("I knew access token = " + model.access_token);
        model.fbGetMyName(view.displayLogOut, function (name) {
            
            console.log('here');
            $('#splash').hide();
            $('#content').show();
            
            view.displayLogOut(name);
            console.log("displayLogOut finished?");
            
        });
        // $('#thumbView').slideDown();
        // model.fetchDescription();
    }else{
        console.log("Access Token is unknown ");
        // $('#thumbView').hide();
        // view.displaySplashScreen();
        $('#content').hide();
        $('#splash').slideDown();
        // $.ajax({
        //     url: "view/splashScrn.html",
        //     cache: false,
        //     success: function(html){
        //         $("#splashScrn").append(html);
        //     }
        // });
    }
    
        
    $('#fbLogIn').click(function(){
        console.log("fbLogIn has been pressed");
        model.getToken();
        $('#splash').slideUp();
        // $('#content').slideDown();
        // $('#thumbView').slideDown(1000);
    });

    $('#logoutBtn').click(function(){
        
        model.fbLogOut();
    });
    
    $('#backBtn').click(function(){
        // $('#thumbView').fadeOut(1000);
        $('#splash').slideDown(500);
    });
    
    // /* 
    // *  Download FB SDK and use it only inside this getScript method
    // */
    // $.ajaxSetup({ cache: true });
    // $.getScript('//connect.facebook.net/en_US/sdk.js', function(){
    //     FB.init({
    //       appId: model.APPID,
    //       version: 'v2.7' // or v2.1, v2.2, v2.3, ...
    //     });     
    //     $('#loginbutton,#feedbutton').removeAttr('disabled');
    //     FB.getLoginStatus(updateStatusCallback);
    //     console.log("FB SDK is here");
    // });
    
    // // flickr.getInteresting(controller.displayCallBack);
    // flickrAuth.getFrob();
    // flickr.getInteresting(view.displayThumb);
    
    // $('#thumbView').hide();

    // $('#goBtn').click(function(){
    //     $('#splash').slideUp();
    //     $('#thumbView').slideDown(1000);
    // });
    
    // $('#loginBtn').click(function(){
        
    //     // flickrAuth.login();
    //     flickrAuth.getToken();
    // });
    

    
    // $('#loginBtn').click(function(){
    //     alert("This feature is not available yet");
    // });
    
    // $('#searchBtn').click(function(){
    //     console.log('SearchBtn works');
    //     flickr.search();
    // });
    
    
    /* 
    *   Search starts after every letter
    */
    // $('#searchBar').on( "keyup", function(event) {
    //         event.preventDefault();
    //         console.log('Enter works');
    //         searchFlickr();
    // });
    
    /* 
    *   Search starts after Enter key
    */
    // $('#searchBar').on( "keypress", function(event) {
    //     if (event.which == 13 && !event.shiftKey) {
    //         event.preventDefault();
    //         console.log('Enter works');
    //         flickr.search();
    //     }
    // });
});

// controller.displayCallBack = function(photos){
//     view.displayThumb(photos);
// };

controller.displayLogOutCallBack = function(someName){
    view.displayLogOut(someName);
};