gamePlay = async () => {
  // Take questions from API
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

    // check if user is authenticated by checking the url params
    // if it's not empty, and if score is >= 6, add 1 point (addScore())

    // restartAuth() is launched if the user is authenticated, either if he wins or loses

    const urlSearchParams = new URLSearchParams(window.location.search)
    const params = Object.fromEntries(urlSearchParams.entries())

    if ((params.id)) {

      if (score >= 6)
        addScore()

      document.getElementById("questionContainer").innerHTML = `
        <p>${resultMessage}</p>
        <p>Punteggio: ${score}/10</p>
        <button onclick="restartAuth()">Play again</button>
      `
    } else {

      document.getElementById("questionContainer").innerHTML = `
      <p>${resultMessage}</p>
      <p>Punteggio: ${score}/10</p>
      <button onclick="restart()">Play again</button>
    `
    };
  }
  // Show the first question
  displayQuestion();
}  

// Restart the game
  function restart() {
    document.location.href="http://localhost:3000/game.html"
  }

// Restart the game with authentication
function restartAuth() {

  const urlSearchParams = new URLSearchParams(window.location.search)
  const params = Object.fromEntries(urlSearchParams.entries())
  
  document.location.href = "game.html?id=" + params.id
}


// front office - auth game 

// add one point if the user wins the game
addScore = async () => {

  // Get the :id params in the url section
  const urlSearchParams = new URLSearchParams(window.location.search)
  const params = Object.fromEntries(urlSearchParams.entries())

  var response = await fetch("/add-score", {
    method: "POST",
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify(
      {
        // Pass the :id in the url to the server for simple retrieving of information
        user_email: params.id
      }
    )
  })
} 
