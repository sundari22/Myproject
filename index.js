var OAUTH2_CLIENT_ID = '1030024881954-nto730v1nmhjdouscr90ipnj2dghl4bt.apps.googleusercontent.com';

var OAUTH2_SCOPES = [
  'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/youtube'
];


var googleapi = {
    authorize: function(options) {
        var deferred = $.Deferred();

        //Build the OAuth consent page URL
        var authUrl = 'https://accounts.google.com/o/oauth2/auth?' + $.param({
            client_id: options.client_id,
            redirect_uri: options.redirect_uri,
            response_type: 'code',
            scope: options.scope
        });

        //Open the OAuth consent page in the InAppBrowser
        var authWindow = window.open(authUrl, '_blank', 'location=no,toolbar=no');

        //The recommendation is to use the redirect_uri "urn:ietf:wg:oauth:2.0:oob"
        //which sets the authorization code in the browser's title. However, we can't
        //access the title of the InAppBrowser.
        //
        //Instead, we pass a bogus redirect_uri of "http://localhost", which means the
        //authorization code will get set in the url. We can access the url in the
        //loadstart and loadstop events. So if we bind the loadstart event, we can
        //find the authorization code and close the InAppBrowser after the user
        //has granted us access to their data.
        $(authWindow).on('loadstart', function(e) {
            var url = e.originalEvent.url;
            var code = /\?code=(.+)$/.exec(url);
            var error = /\?error=(.+)$/.exec(url);

            if (code || error) {
                //Always close the browser when match is found
                authWindow.close();
            }

            if (code) {
                //Exchange the authorization code for an access token
                $.post('https://accounts.google.com/o/oauth2/token', {
                    code: code[1],
                    client_id: options.client_id,
                    client_secret: options.client_secret,
                    redirect_uri: options.redirect_uri,
                    grant_type: 'authorization_code'
                }).done(function(data) {
                    deferred.resolve(data);
                }).fail(function(response) {
                    deferred.reject(response.responseJSON);
                });
            } else if (error) {
                //The user denied access to the app
                deferred.reject({
                    error: error[1]
                });
            }
        });

        return deferred.promise();
    }
};

googleApiClientReady = function() {
  gapi.auth.init(function() {
    window.setTimeout(checkAuth, 1);
  });
}
function checkAuth() {
  gapi.auth.authorize({
    client_id: OAUTH2_CLIENT_ID,
    scope: OAUTH2_SCOPES,
    immediate: true
  }, handleAuthResult);
}
// Handle the result of a gapi.auth.authorize() call.
function handleAuthResult(authResult) {
if (authResult && !authResult.error) {
// Authorization was successful. Hide authorization prompts and show
// content that should be visible after authorization succeeds.
    //$('#login-link').hide();
    //getEmail();
    //makeApiCall();
  
  alert("Hello2");
  $('#login-link').hide();
  loadAPIClientInterfaces();
  } 
else {
  
    $('#login-link').click(function() {
    
        googleapi.authorize({
            client_id: '1030024881954-nto730v1nmhjdouscr90ipnj2dghl4bt.apps.googleusercontent.com',
            client_secret: 'iedaZ21p_3vExrcUEGSHX-74',
            redirect_uri: 'http://localhost',
            scope: 'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/youtube'
        }).done(function(data) {
            $('#login-link').hide();
            loadAPIClientInterfaces();
        }).fail(function(data) {
            $('#login-link').show();
        });
    });
}
    function loadAPIClientInterfaces() {
  
  gapi.client.load('youtube', 'v3', function() {
    
    handleAPILoaded();
  });
}
