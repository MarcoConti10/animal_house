async function getRandomVideo() {
  const API_KEY = "AIzaSyCo-NoyfX2PMR-RM8pQW_7-wO-cRunvqao";
  const searchTerm = 'funny animals';

  // Get the video fram Youtube API
  const response = await fetch(`https://www.googleapis.com/youtube/v3/video?part=snippet&q=${searchTerm}&key=${API_KEY}`);
  const data = await response.json();

  // Select random video from the API
  const items = data.items;
  const randomVideoIndex = Math.floor(Math.random() * items.length);
  const videoId = items[randomVideoIndex].id.videoId;
  
    // Check the video status using the YouTube Videos API
    const videoResponse = await fetch(`https://www.googleapis.com/youtube/v3/videos?id=${videoId}&part=status&key=${API_KEY}`);
    const videoData = await videoResponse.json();
    const videoStatus = videoData.items[0].status.uploadStatus;
    if (videoStatus === 'processed') {
      
      // Insert video in the HTML page
      const videoContainer = document.getElementById('video-container');
      videoContainer.innerHTML = `<iframe src="https://www.youtube.com/embed/${videoId}" frameborder="0" 
      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
    } else {
      console.log(`Video ${videoId} is not processed yet, reload the page!`);
    }
}

getRandomVideo();
