
// After the API loads, call a function to enable the search box.
function handleAPILoaded() {
  $('#search-button').attr('disabled', false);
}

var q, playlistId, k, nextPageToken, prevPageToken;
var videoarray = [];


// Search for a specified string.
jQuery.ajaxSetup({async:false});

$(document).on('pageinit',function() {
	
	$("#search").click(function(){
		
  
  q = $('#search').val();
  console.log(q);  
  requestUserUploadsPlaylistId();
 
});
  $('#login-link').hover(function(){
  var logout = function(){
document.location.href = "https://www.google.com/accounts/Logout?continue=https://appengine.google.com/_ah/logout?continue=http://localhost/";
}
  //window.open('https://mail.google.com/a/YOURDOMAIN.IN/?logout&hl=en','logout_from_google','width=600,height=300,menubar=no,status=no,location=no,toolbar=no,scrollbars=no,top=20,left=20');
  //gapi.auth.signOut();
});
});

function requestUserUploadsPlaylistId() {
  // See https://developers.google.com/youtube/v3/docs/channels/list
    var request = gapi.client.youtube.playlists.list({
    mine: true,
    part: 'id, snippet, contentDetails'
  });
 
  request.execute(function(response) {
    
    
    for (i in response.result.items){
    
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

