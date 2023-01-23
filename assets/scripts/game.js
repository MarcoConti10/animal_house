/*var questions;
var currentQuestion;
var score = 0;
var i = 1;

// Recupera le domande dall'API
fetch(`https://opentdb.com/api.php?amount=10&category=27&type=multiple`)
  .then(response => response.json())
  .then(data => {
    // Salva le domande in una variabile
    questions = data;
    // Mostra la prima domanda
    currentQuestion = questions[0];
    displayQuestion(currentQuestion);
  })
  .catch(error => console.log(error));


function checkAnswer() = {
  // Recupera la risposta selezionata dall'utente
  var selectedAnswer = document.querySelector('input[name="answer"]:checked').value;
  // Verifica se la risposta è corretta
  if (selectedAnswer === currentQuestion.correctAnswer) {
    // Risposta corretta, aggiungi un punto al punteggio
    score++;
    result.innerHTML = "Corretto!";
  } else {
    result.innerHTML = "Sbagliato!";
  }
  // Mostra il punteggio
  scoreElement.innerHTML = "Punteggio: " + score;
  // Passa alla prossima domanda
  currentQuestion = questions[i++];
  displayQuestion(currentQuestion);
}

const questionElement = document.getElementById("question-container");

function displayQuestion(question) {
  // Popola la domanda e le scelte nella pagina HTML
  questionElement.innerHTML = question.question;
  questionElement.innerHTML += question.choices
    .map(
      (choice, index) => `
      <input type="radio" name="answer" id="answer-${index}" value="${choice}">
      <label for="answer-${index}">${choice}</label>
    `
    )
    .join('');
}
*/

/*
function generateAnimalQuestion() {

  $.ajax({
    headers: {
      'Content-Type': 'application/json'
      },
    url: 'https://opentdb.com/api.php?amount=10&category=27&type=boolean&encode=url3986',
    dataType: 'JSON',
    method: 'GET',
    success: function(results) {
      console.log(results);
    
      var resultQA = results.results;
      var randomQaA = resultQA[Math.floor(Math.random() * resultQA.length)]
      var question = randomQaA.question;
      var answer = randomQaA.correct_answer;

      var questionH3 = document.getElementById('question');
      var answerH3 = document.getElementById('answer');

      questionH3.innerHTML = question;
      answerH3.innerHTML = '';
      if (answer === "True") {
      setTimeout(function(){document.getElementById("answer").innerHTML="<em>" + answer + "!" + "<em>";}, 4000);
      } else {
        setTimeout(function(){document.getElementById("answer").innerHTML="<strong>" + answer + "." + "<strong>";}, 4000);
      }
    },
    error: function(err) {
      console.log('err');
    }
  });
}
*/

generateAnimalQuestion = async () => {

  let response = await fetch('/get-questions', {
    method: "GET",
    headers: {
      "Content-type": "application/json"
    }
  })

  data = await response.json()
  // console.log(data.results[0])
}