// 2. This code loads the IFrame Player API code asynchronously.

      videoID = "";
      

      storedTime = 0;
        
      
      // Linkify youtube URLs which are not already links.
      function linkifyYouTubeURLs(text) {
      var re = /https?:\/\/(?:[0-9A-Z-]+\.)?(?:youtu\.be\/|youtube(?:-nocookie)?\.com\S*?[^\w\s-])([\w-]{11})(?=[^\w-]|$)(?![?=&+%\w.-]*(?:['"][^<>]*>|<\/a>))[?=&+%\w.-]*/ig;
      return text.replace(re,
        '$1');
      }

      function storeTime(){
      player.pauseVideo();
      storedTime = player.getCurrentTime();
      $('#time').html(""+storedTime);
      }
      function goToTime(){
        player.seekTo(storedTime);    
      }

      // 3. This function creates an <iframe> (and YouTube player)
      //    after the API code downloads.
      var player;
      function onYouTubeIframeAPIReady() {
        player = new YT.Player('player', {
          
          height: '390',
          width: '640',
          videoId: videoID,
          frameborder: "0",
          class: 'embed-responsive-item',
          playerVars: {
              modestbranding: 1,
              wmode: 'transparent'
          },
          events: {
            onReady: onPlayerReady()
          }
        });
      }

      // 4. The API will call this function when the video player is ready.
      function onPlayerReady(event) {
        console.log('hey');
        
      }

      // 5. The API calls this function when the player's state changes.
      //    The function indicates that when playing a video (state=1),
      //    the player should play for six seconds and then stop.
      var done = false;
      function onPlayerStateChange(event) {

      }
      function stopVideo() {
        player.stopVideo();
      }
      function framesBackward(frames){
         player.pauseVideo();
         currentTime = player.getCurrentTime();
         framesPerSecond = 25 // worked out by quick profiling of videos using stats for nerd feature of player
         numFramesToAdvance = frames;
         timeToAdvance = (1/framesPerSecond) * numFramesToAdvance;
         newTime = currentTime - timeToAdvance;
         player.seekTo(newTime);
      }
      function framesForward(frames){
         player.pauseVideo();
         currentTime = player.getCurrentTime();
         framesPerSecond = 25 // worked out by quick profiling of videos using stats for nerd feature of player
         numFramesToAdvance = frames;
         timeToAdvance = (1/framesPerSecond) * numFramesToAdvance;
         newTime = currentTime + timeToAdvance;
         player.seekTo(newTime);
      }
      left = 37;
      right = 39;

      $(document).keydown(function(e) {
          switch(e.which) {
              case left:
                  framesBackward(1);
                  break;
              case right:
                  framesForward(1);
                  break;
          }
      });
      $(document).ready(function() {
      $("#idButton").click(function() {

      raw = $("#url").val()
      console.log(raw);
      videoID = linkifyYouTubeURLs(raw);
      console.log(videoID);
      
      var tag = document.createElement('script');

      tag.src = "https://www.youtube.com/iframe_api";
      var firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
      });
      });

      
