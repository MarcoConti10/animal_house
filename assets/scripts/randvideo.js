const API_KEY = "AIzaSyCo-NoyfX2PMR-RM8pQW_7-wO-cRunvqaoY";
const searchTerm = 'funny animals';

// Recupera i video dall'API di YouTube
fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${searchTerm}&type=video&key=${API_KEY}`)
  .then(response => response.json())
  .then(data => {
    // Seleziona un video casuale dall'elenco di video restituiti
    const randomVideoIndex = Math.floor(Math.random() * data.items.length);
    const videoId = data.items[randomVideoIndex].id.videoId;
    
    // Inserisci il video nella pagina HTML
    const videoContainer = document.getElementById('video-container');
    videoContainer.innerHTML = `<div id="video-container"></div>`;
  })
  .catch(error => console.log(error));
