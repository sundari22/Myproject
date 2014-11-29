
googleApiClientReady = function() {
	
 }

 // Called automatically when YouTube API interface is loaded (see line 9).
function onYouTubeApiLoad() { 
	console.log("x");
   // This API key is intended for use only in this lesson. 
   // See http://goo.gl/PdPA1 to get a key for your own applications.
   gapi.client.setApiKey('AIzaSyCUop_qKqfZHRTy09LGfpSt8cNcHsrmvIY'); 


}


// Search for a specified string.
jQuery.ajaxSetup({async:false});

$(document).on('pageinit',function() {
	
	$("#search").click(function(){
		
  
  q = $('#search').val();
    
  requestUserUploadsPlaylistId();
 
});
});
  


  
function requestUserUploadsPlaylistId() {
	gapi.client.load('youtube', 'v3', onYouTubeApiLoad);
  // See https://developers.google.com/youtube/v3/docs/channels/list
    var request = gapi.client.youtube.search.list({
    q: q,
    part: 'snippet',
    maxResults:10
  });
    
  request.execute(function(response) {
    var playlistId;
var videoarray = [];
    
    if (videoarray.length > 0 ){
      
      videoarray.length=0;
      }       
    var playlistItems = response.result.items;
    if (playlistItems) {
      
      $.each(playlistItems, function(index, item) {
      var entry = {};
      entry.video_id = item.id.videoId;
      //entry.playlistId = item.snippet.playlistId;
      //entry.image_src = item.snippet.thumbnails.medium.url;
      
      videoarray.push(entry); 
      }); 
      if (videoarray.length != 0 ){
      $('.content2').append('<iframe width="460" height="315" src="//www.youtube.com/embed/videoarray[1].video_id?playlist='+ videoarray[0].video_id+', '+videoarray[1].video_id +','+ videoarray[2].video_id +', '+ videoarray[3].video_id +','+ videoarray[4].video_id +', '+ videoarray[5].video_id +', '+ videoarray[6].video_id +','+ videoarray[7].video_id +','+ videoarray[8].video_id +','+ videoarray[9].video_id +'&showinfo=1" frameborder="0" align="center" allowfullscreen></iframe>');
      }  
      } else {

      $('.content2').html('Sorry you have no uploaded videos');
      $('.content2').append('<iframe width="460" height="315" src="//www.youtube.com/embed/4D5rvmw1qUU" frameborder="0" align=center allowfullscreen></iframe>');
    }
  });





}

