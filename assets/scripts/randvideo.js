const API_KEY = "AIzaSyCo-NoyfX2PMR-RM8pQW_7-wO-cRunvqao";
const searchTerm = 'funny animals';

// Recupera i video dall'API di YouTube
fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${searchTerm}&type=video&key=${API_KEY}`)
  .then(response => response.json())
  .then(data => {
    // Seleziona un video casuale dall'elenco di video restituiti
  const items = data.items;
  const randomVideoIndex = Math.floor(Math.random() * items.length);
  const videoId = items[randomVideoIndex].id.videoId;
    
    // Inserisci il video nella pagina HTML
    const videoContainer = document.getElementById('video-container');
    videoContainer.innerHTML = `<iframe src="https://www.youtube.com/embed/${videoId}" frameborder="0" 
    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
  })
  .catch(error => console.log(error));
