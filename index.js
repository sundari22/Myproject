function oauth2_login() {
        $.oauth2({
        auth_url: 'https://accounts.google.com/o/oauth2/auth',           // required
        response_type: 'code',      // required - "code"/"token"
        token_url: 'https://accounts.google.com/o/oauth2/token',          // required if response_type = 'code'
        logout_url: 'https://accounts.google.com/logout',         // recommended if available
        client_id: '1030024881954-nto730v1nmhjdouscr90ipnj2dghl4bt.apps.googleusercontent.com',          // required
        client_secret: 'iedaZ21p_3vExrcUEGSHX-74',      // required if response_type = 'code'
        redirect_uri: 'urn:ietf:wg:oauth:2.0:oob',       // required - some dummy url
        other_params: {scope:'https://www.googleapis.com/auth/userinfo.profile'}// optional params object for scope, state, display...
        }, function(token, response){
        // do something with token or response
        $("#logs").append("<p class='success'><b>access_token: </b>"+token+"</p>");
        $("#logs").append("<p class='success'><b>response: </b>"+JSON.stringify(response)+"</p>");
        }, function(error, response){
        // do something with error object
        $("#logs").append("<p class='error'><b>error: </b>"+JSON.stringify(error)+"</p>");
        $("#logs").append("<p class='error'><b>response: </b>"+JSON.stringify(response)+"</p>");
    
        }); 
        }
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
    function loadAPIClientInterfaces() {
  
  gapi.client.load('youtube', 'v3', function() {
    
    handleAPILoaded();
  });
}
