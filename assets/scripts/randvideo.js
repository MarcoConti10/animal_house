getRandomVideo = async () => {

  let response = await fetch("/video", {
    method: "GET",
    headers: {
      "Content-type": "application/json"
    }
  });

  if (response.status === 200) {

    let data = await response.json();
    const videoId = data;

    // The video is available, insert it into the HTML
    const videoContainer = document.getElementById('video-container');
    videoContainer.innerHTML = `<iframe src="https://www.youtube.com/embed/${videoId}" frameborder="0" 
    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;

  } else {
    // The video is not available, show an error message
    const videoContainer = document.getElementById('video-container');
    videoContainer.innerHTML = '<p>Sorry, this video is not available.</p>';
  }

}




