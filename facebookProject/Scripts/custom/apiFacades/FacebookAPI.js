// This is called with the results from from FB.getLoginStatus().
document.addEventListener('DOMContentLoaded', init, false);
function init() {
    function statusChangeCallback(response) {
        // console.log('statusChangeCallback');
        //console.log(response);
        // The response object is returned with a status field that lets the
        // app know the current login status of the person.
        // Full docs on the response object can be found in the documentation
        // for FB.getLoginStatus().
        if (response.status === 'connected') {
            //getMe();
            addStatus();

            getNewsFeed();

            // Logged into your app and Facebook.
        } else if (response.status === 'not_authorized') {
            // The person is logged into Facebook, but not your app.
            document.getElementById('status').innerHTML = 'Please log ' +
              'into this app.';
        } else {
            // The person is not logged into Facebook, so we're not sure if
            // they are logged into this app or not.
            FB.login(function (response) {
                addStatus();

                getNewsFeed();
                //addStatus();
                //console.log(response.authResponse.accessToken);
            }, { scope: 'public_profile,email,user_friends,publish_actions,user_events,user_photos,user_status,user_videos,read_stream' });
        }
    }

    // This function is called when someone finishes with the Login
    // Button.  See the onlogin handler attached to it in the sample
    // code below.
    function checkLoginState() {
        FB.getLoginStatus(function (response) {
            statusChangeCallback(response);
        });
    }

    window.fbAsyncInit = function () {
        FB.init({
            appId: '457596417728680',
            cookie: true,  // enable cookies to allow the server to access 
            // the session
            xfbml: true,  // parse social plugins on this page
            version: 'v2.2' // use version 2.2
        });

        // Now that we've initialized the JavaScript SDK, we call 
        // FB.getLoginStatus().  This function gets the state of the
        // person visiting this page and can return one of three states to
        // the callback you provide.  They can be:
        //
        // 1. Logged into your app ('connected')
        // 2. Logged into Facebook, but not your app ('not_authorized')
        // 3. Not logged into Facebook and can't tell if they are logged into
        //    your app or not.
        //
        // These three cases are handled in the callback function.

        FB.getLoginStatus(function (response) {
            statusChangeCallback(response);
        });

    };

    // Load the SDK asynchronously
    (function (d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s); js.id = id;
        js.src = "//connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));

    function getMe(retn) {
        FB.api('/me', function (response) {
            //console.log(JSON.stringify(response));
            retn(response);
        });
    }

    function publishToFacebook(body) {
        //ev.preventDefault();
        FB.api('/me/feed', 'post', { message: body }, function (response) {

        });
        return false;
    }

    function addStatus() {

        var t = document.createElement("label");

        t.setAttribute('value', "Test");
        t.value = "Update Status"

        var i = document.createElement("input"); //input element, text
        i.setAttribute('type', "text");
        i.setAttribute('name', "username");
        var s = document.createElement("input"); //input element, Submit button
        s.setAttribute('type', "submit");
        s.setAttribute('value', "Publish");
        s.addEventListener('click', function () {
            publishToFacebook(i.value);
            i.value = "";
        }, true);

        document.getElementById("facebook").appendChild(t);
        document.getElementById("facebook").appendChild(i);
        document.getElementById("facebook").appendChild(s);


    }

    function getNewsFeed() {
        /* make the API call */
        FB.api(
            "/me/home",
            function (response) {
                console.log(response);
                if (response && !response.error) {
                    //var status = new Status(response.to, response.from, response.message);
                    for (var i = 0; i < response['data'].length; i++) {
                        var obj = response['data'][i];
                        if (obj.from != undefined) {
                            addNewsItem(obj.from, obj.message);
                        }
                        else if (obj.message != undefined) {
                            addStatusFeed(obj.message);
                        }

                    }

                }
            }
        );
    }

    function getUser(userID, retn) {
        var call = "/" + userID + "/picture";
        FB.api(
            call,
            function (response) {
                if (response && !response.error) {
                    retn(response.data.url);
                }
            }
        );
    }

    function addStatusFeed(message) {
        var fromBreak = document.createElement("BR");
        var fromLabel = document.createElement("FROM");
        var fromUserLabel = document.createTextNode("Me");
        var from = document.createTextNode("From: ");
        fromLabel.appendChild(from);
        fromLabel.appendChild(fromUserLabel);

        var messBreak = document.createElement("BR");
        var messLabel = document.createElement("MESSAGE");
        var mess = document.createTextNode("Message: ");
        var messageLabel = document.createTextNode(message);
        messLabel.appendChild(mess);
        messLabel.appendChild(messageLabel);

        var endBreak = document.createElement("BR");

        document.getElementById("newsfeed").appendChild(fromBreak);
        document.getElementById("newsfeed").appendChild(fromLabel);
        document.getElementById("newsfeed").appendChild(messBreak);
        document.getElementById("newsfeed").appendChild(messLabel);
        document.getElementById("newsfeed").appendChild(endBreak);
    }

    function addNewsItem(user, message) {
        var endBreak = document.createElement("BR");
        var fromBreak = document.createElement("BR");
        var fromLabel = document.createElement("FROM");

        var imgUrl = "";
        getUser(user.id, function (url) {
            var startBreak = document.createElement("BR");
            var img = document.createElement("img");
            img.src = url;

            document.getElementById("newsfeed").appendChild(startBreak);
            document.getElementById("newsfeed").appendChild(img);

            var fromUserLabel = document.createTextNode(user.name);
            fromLabel.appendChild(fromUserLabel);

            var messBreak = document.createElement("BR");
            var messLabel = document.createElement("MESSAGE");
            var mess = document.createTextNode("Message: ");
            var messageLabel = document.createTextNode(message);
            messLabel.appendChild(mess);
            messLabel.appendChild(messageLabel);

            document.getElementById("newsfeed").appendChild(fromBreak);
            document.getElementById("newsfeed").appendChild(fromLabel);
            document.getElementById("newsfeed").appendChild(messBreak);
            document.getElementById("newsfeed").appendChild(messLabel);
            document.getElementById("newsfeed").appendChild(endBreak);
        });
        
        
        

    }



}
