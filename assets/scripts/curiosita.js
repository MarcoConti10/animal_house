const nextButton = document.getElementById('next-button');
const curiositaContainer = document.getElementById('curiosita-container');

nextButton.addEventListener('click', async () => {
  const response = await fetch('/curiosita');
  const data = await response.json();
  document.getElementById('curiosita').innerText = data.curiosita.content;
});

// Load the random element on the HTML page
nextButton.click();
