
googleApiClientReady = function() {
gapi.client.load('youtube', 'v3', onYouTubeApiLoad);
console.log("loaded");
 }

 // Called automatically when YouTube API interface is loaded (see line 9).
function onYouTubeApiLoad() { 
   // This API key is intended for use only in this lesson. 
   // See http://goo.gl/PdPA1 to get a key for your own applications.
   gapi.client.setApiKey('iedaZ21p_3vExrcUEGSHX-74'); 

$('#search-button').attr('disabled', false);
}

var q, playlistId, k, nextPageToken, prevPageToken;
var videoarray = [];


// Search for a specified string.
jQuery.ajaxSetup({async:false});

$(document).on('pageinit',function() {
	
	$("#search").click(function(){
		
  
  q = $('#search').val();
    
  requestUserUploadsPlaylistId();
 
});
});
  


  
function requestUserUploadsPlaylistId() {
  // See https://developers.google.com/youtube/v3/docs/channels/list
    var request = gapi.client.youtube.search.list({
    q: q,
    part: 'snippet',
    maxResults:10
  });
    
  request.execute(function(response) {
    
    
    console.log(response);
    var playlistItems = response.result.items;
    if (playlistItems) {
      
      $.each(playlistItems, function(index, item) {
      var entry = {};
      entry.video_id = item.id.videoId;
      //entry.playlistId = item.snippet.playlistId;
      //entry.image_src = item.snippet.thumbnails.medium.url;
      
      videoarray.push(entry); 
      });       
      } else {
      alert('Hello');
      $('.content2').html('Sorry you have no uploaded videos');
      $('.content2').append('<iframe width="460" height="315" src="//www.youtube.com/embed/4D5rvmw1qUU" frameborder="0" align=center allowfullscreen></iframe>');
    }
  });


if (videoarray.length != 0 ){

$('.content2').append('<iframe width="460" height="315" src="http://www.youtube.com/embed/videoarray[1].video_id?playlist='+ videoarray[0].video_id+', '+videoarray[1].video_id +','+ videoarray[2].video_id +'&showinfo=1" frameborder="0" align="center" allowfullscreen></iframe>');
}


}

