gamePlay = async () => {
  // Recupero le domande dall'API
  let response = await fetch("/question", {
    method: "GET",
    headers: {
      "Content-type": "application/json"
    }
  });

  let questions = await response.json();
  console.log(questions);
  
  let currentQuestion = 0;
  let score = 0;

  // Mostra la domanda corrente
  function displayQuestion() {
    document.getElementById("question").innerHTML = questions.results[currentQuestion].question;
  }

  // Aggiungo gli eventi ai pulsanti true e false
  document.getElementById("true-button").addEventListener("click", function() {
    if (questions.results[currentQuestion].correct_answer === 'True') {
      score++;
    }
    currentQuestion++;
    if (currentQuestion >= questions.results.length) {
      showFinalScreen();
    } else {
      displayQuestion();
    }
  });

  document.getElementById("false-button").addEventListener("click", function() {
    if (questions.results[currentQuestion].correct_answer === 'False') {
      score++;
    }
    currentQuestion++;
    if (currentQuestion >= questions.results.length) {
      showFinalScreen();
    } else {
      displayQuestion();
    }
  });

  // Mostra la schermata finale con il punteggio
  function showFinalScreen() {
    let resultMessage = '';
    if (score >= 6) {
      resultMessage = 'Congratulazioni! Hai ottenuto un punteggio positivo.';
    } else {
      resultMessage = 'Mi dispiace, il tuo punteggio è negativo.';
    }
    document.getElementById("questionContainer").innerHTML = `
      <p>${resultMessage}</p>
      <p>Punteggio: ${score}/10</p>
      <button onclick="restart()">Ricomincia</button>
    `;
  }
  // Mostra la prima domanda
  displayQuestion();
}  
// Riavvia il gioco
  function restart() {
    document.location.href="http://localhost:3000/game.html";
  }
