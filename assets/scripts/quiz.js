
var questions;
var currentQuestion;
var score = 0;
var i = 1;

// Recupera le domande dall'API
fetch('https://opentdb.com/api.php?amount=10&category=27&type=multiple')
  .then(response => response.json())
  .then(data => {
    // Salva le domande in una variabile
    questions = data;
    // Mostra la prima domanda
    currentQuestion = questions[0];
    displayQuestion(currentQuestion);
  })
  .catch(error => console.log(error));

function checkAnswer() {
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

function displayQuestion(question) {
  // Popola la domanda e le scelte nella pagina HTML
  questionElement.innerHTML = question.question;
  choicesElement.innerHTML = question.choices
    .map(
      (choice, index) => `
      <input type="radio" name="answer" id="answer-${index}" value="${choice}">
      <label for="answer-${index}">${choice}</label>
    `
    )
    .join('');
}
