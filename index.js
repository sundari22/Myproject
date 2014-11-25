var OAUTH2_CLIENT_ID = '1030024881954-nto730v1nmhjdouscr90ipnj2dghl4bt.apps.googleusercontent.com';

var OAUTH2_SCOPES = [
  'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/youtube'
];
var q, playlistId, k, nextPageToken, prevPageToken;
var videoarray = [];

function oauth2_login() {
        $.oauth2({
        auth_url: 'https://accounts.google.com/o/oauth2/auth',           // required
        response_type: 'code',      // required - "code"/"token"
        token_url: 'https://accounts.google.com/o/oauth2/token',          // required if response_type = 'code'
        logout_url: 'https://accounts.google.com/logout',         // recommended if available
        client_id: '1030024881954-nto730v1nmhjdouscr90ipnj2dghl4bt.apps.googleusercontent.com',          // required
        client_secret: 'iedaZ21p_3vExrcUEGSHX-74',      // required if response_type = 'code'
        redirect_uri: 'http://localhost/TRIAL1/oauth2callback',       // required - some dummy url
        other_params: {scope:'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/youtube'}// optional params object for scope, state, display...
        }, function(token, response){
        // do something with token or response
        //$("#logs").append("<p class='success'><b>access_token: </b>"+token+"</p>");
        //$("#logs").append("<p class='success'><b>response: </b>"+JSON.stringify(response)+"</p>");
        //$('#login-link').hide();
        $('#login-link').append("<p class='success'><b>response: </b>"+JSON.stringify(response)+"</p>");
        loadAPIClientInterfaces(response);
        }, function(error, response){
        // do something with error object
        //$("#logs").append("<p class='error'><b>error: </b>"+JSON.stringify(error)+"</p>");
        //$("#logs").append("<p class='error'><b>response: </b>"+JSON.stringify(response)+"</p>");
        $('#login-link').append("<p class='error'><b>response: </b>"+JSON.stringify(response)+"</p>")
        }); 
        }

googleApiClientReady = function() {
 $('#login-link').click(function() {
    
        oauth2_login(); 
});
}


  
  
    function loadAPIClientInterfaces(response) {
  console.log(response);
  gapi.client.load('youtube', 'v3', function() {
    
  // See https://developers.google.com/youtube/v3/docs/channels/list
    var request = gapi.client.youtube.playlists.list({
    mine: true,
    part: 'id, snippet, contentDetails'
  });
 
  request.execute(function(response) {
    
    console.log(response);
    for (i in response.result.items){
    q=child;   
    var re =new RegExp(q, "gi")

    playlistId = response.result.items[i].snippet.title;
    if (playlistId.match(re)) { 
    playlistId = response.result.items[i].id;
    requestVideoPlaylist(playlistId);
   // Retrieve the list of videos in the specified playlist.
    function requestVideoPlaylist(playlistId, pageToken) {
   $('#video-container').html('');
   var requestOptions = {
    playlistId: playlistId,
    part: 'snippet',
    maxResults: 10
    };
    if (pageToken) {
    requestOptions.pageToken = pageToken;
    }
    var request = gapi.client.youtube.playlistItems.list(requestOptions);
    request.execute(function(response) {
    
    var playlistItems = response.result.items;
    if (playlistItems) {
      
      $.each(playlistItems, function(index, item) {
      var entry = {};
      entry.video_id = item.snippet.resourceId.videoId;
      entry.playlistId = item.snippet.playlistId;
      entry.image_src = item.snippet.thumbnails.medium.url;
      
      videoarray.push(entry); 
      });       
      } else {
      alert('Hello');
      $('.content2').html('Sorry you have no uploaded videos');
      $('.content2').append('<iframe width="460" height="315" src="//www.youtube.com/embed/4D5rvmw1qUU" frameborder="0" align=center allowfullscreen></iframe>');
    }
  });
}
}
}

if (videoarray.length != 0 ){

$('.content2').append('<iframe width="460" height="315" src="//www.youtube.com/embed/videoarray[1].video_id?playlist='+ videoarray[0].video_id+', '+videoarray[1].video_id +','+ videoarray[2].video_id +'&showinfo=1" frameborder="0" align="center" allowfullscreen></iframe>');
}

});
}

    
    
  });
}
