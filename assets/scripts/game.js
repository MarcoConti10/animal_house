gamePlay = async () => {
  // Take quesrtions from API
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

  // Show the current question
  function displayQuestion() {
    document.getElementById("question").innerHTML = questions.results[currentQuestion].question;
  }

  // Handeling true and false events
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

  // Showing final result, with score
  function showFinalScreen() {
    let resultMessage = '';
    if (score >= 6) {
      resultMessage = 'Nice job! You win.';
    } else {
      resultMessage = 'Sorry, try again.';
    }
    document.getElementById("questionContainer").innerHTML = `
      <p>${resultMessage}</p>
      <p>Punteggio: ${score}/10</p>
      <button onclick="restart()">Play again</button>
    `;
  }
  // Show the first question
  displayQuestion();
}  
// Restart the game
  function restart() {
    document.location.href="http://localhost:3000/game.html";
  }
