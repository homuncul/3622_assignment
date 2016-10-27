/*
 *  Read the number entered by user, then display the thumbnail that number of times
 */
 
view.displayLogOut = function(myName){
    console.log('displayLogOut started');
    console.log("myName = " + myName);
    var htmlStr = "I see you, " + myName + "<button>Log out</button>";
    // console.log(htmlStr);
    $("#logoutBtn").html(htmlStr);
};
 
// view.displayUser = function(){
//     console.log('displayUser started');
// };
 
view.displayThumb = function(found) {
    console.log('displayThumb started');
    var htmlStr = '';
    if (found.length > 0){
        for (var i = 0; i < found.length; i++){
            htmlStr += '<figure><a href="'+ found[i].urlLarge + '" data-lightbox="gallery" data-title="' + found[i].description + '"><img src="' + found[i].urlThumb + '" alt="' + found[i].description + '"></a><figcaption>' + found[i].description + '</figcaption></figure>';
        }
    }else{
        htmlStr = 'No matching photo';
    }
    
    // console.log(htmlStr);
    $("#thumbnails").html(htmlStr);
    // $("#thumbnails").innerHTML = htmlStr;
    // var thumbs = $("#thumbnails");
    // thumbs.innerHTML = htmlStr;
};

// view.displaySplashScreen = function(){
//     console.log("displaySplashScreen started");
//     var htmlStr = "<br>Hello dear user,<br>You are about to visit a web page of the wonderful travel company!<br>But in order to let you do it we need you to sing in to your facebook account<br>...and give us standart permissions to see your personal data and post out of your name anything we like :)<br><button id='fbLogIn'>FB Log in</button>";
//     $("#splash").html(htmlStr);
// };

// view.displayLogOut = function(){
//     console.log('displayLogOut started');
//     var htmlStr = '';
//     if (model.checkAccessToken()){
//         var myName = model.fbGetMyName();
//         console.log("myName = " + myName);
//         htmlStr = "I see you, " + myName + "<button>Log out</button>";
//         console.log(htmlStr);
//     }
//     $("#logoutBtn").html(htmlStr);
// };



