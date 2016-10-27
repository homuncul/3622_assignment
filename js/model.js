model = {
    APPID: "673899022786702",
    APPURL: "https://dms-3622ict-assignment-v2-s2973695.c9users.io/",
    access_token: '',
    myName: ''
};

model.fbLogIn = function(){
    console.log("fbLogIn started");
    var fbLogInURL = "https://www.facebook.com/dialog/oauth?client_id=" + model.APPID + "&redirect_uri=" + model.APPURL + "&response_type=token" + "&fields=id,name,cover,description";
    window.location.replace(fbLogInURL);
};

model.fbLogOut = function(){
    console.log("fbLogOut started");
    var fbLogOutURL = "https://www.facebook.com/logout.php?access_token="+ model.access_token +"&confirm=1&next=" + model.APPURL;
    window.location.replace(fbLogOutURL);
    model.access_token = "";
};

model.checkAccessToken = function(){
    model.access_token = window.location.href.split('access_token=')[1];
    // console.log("Check access token: " + model.access_token);
    if (model.access_token == null || model.access_token == ''){
        // console.log("I have it not!");
        return false;
    }else{
        model.access_token == ''
        // console.log("I have it!");
        return true;
    }
};

model.getToken = function(){
    if (model.access_token == null || model.access_token == ""){
        model.fbLogIn();
        model.access_token = window.location.href.split('access_token=')[1];
        console.log(model.access_token);
    }
    if (model.access_token != null && model.access_token != ""){
        return true;
    }else{
        model.fbLogIn();
        return false;
    }
};

model.fbGetMyName = function (callback) {
    var getMyNameURL = "https://graph.facebook.com/me?access_token=" + model.access_token;
    $.get(getMyNameURL, function (data) {
        model.myName = data.name;
        callback(data.name);
    });
};

model.fetchDescription = function(){
    var getDescriptionURL = "https://graph.facebook.com/v2.8/815157038515764?fields=description&access_token=" + model.access_token;
    $.get(getDescriptionURL, function(data){
        console.log(data.description);
    });
};