const nextButton = document.getElementById('next-button');
const infoContainer = document.getElementById('info-container');

nextButton.addEventListener('click', async () => {
  const response = await fetch('/info-legali');
  const data = await response.json();
  document.getElementById('info').innerText = data.info.content;
});

// Load the random element on the HTML page
nextButton.click();
