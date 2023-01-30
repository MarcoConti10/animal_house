const startButton = document.querySelector('#start-button');
const questionContainer = document.querySelector('#question-container');
const questionText = document.querySelector('#question-text');
const trueButton = document.querySelector('#true-button');
const falseButton = document.querySelector('#false-button');
const message = document.querySelector('#message');
const nextButton = document.querySelector('#message-button');
const correctMessage = "Correct answer!";
const incorrectMessage = "Incorrect answer. Try again.";


let questions;

startButton.addEventListener('click', async () => {
  startButton.style.display = 'none';
  questionContainer.style.display = 'block';
  nextButton.style.display = 'none';

  const response = await fetch("/question", {
    method: "GET",
    headers: {
      "Content-type": "application/json"
    }
  });
  let questionIndex = 0;
  questions = await response.json();
  console.log(questions.results[i].question);
  displayQuestion(questions[questionIndex]);


});

trueButton.addEventListener('click', () => {
  const answer = questions[questionIndex].correct_answer;
  if (answer === 'True') {
    showMessage(answer, correctMessage);
  } else {
    showMessage(answer, incorrectMessage);
  } 
});

falseButton.addEventListener('click', () => {
  const answer = questions[questionIndex].correct_answer;
  if (answer === 'False') {
    showMessage(answer, correctMessage);
  } else {
    showMessage(answer, incorrectMessage);
  }
});

function showMessage(_answer, messageText) {
  questionText.innerHTML = messageText;
  trueButton.style.display = 'none';
  falseButton.style.display = 'none';
  message.style.display = 'block';
  nextButton.style.display = 'block';

  nextButton.addEventListener('click', () => {
    message.style.display = 'none';
    nextButton.style.display = 'none';
    trueButton.style.display = 'block';
    falseButton.style.display = 'block';
    questionIndex++;
    if (questionIndex === questions.length) {
      // end of questions
      return;
    }
    displayQuestion(questions[questionIndex]);
  });
}

function displayQuestion(questions) {
  questionText.innerHTML = questions.question;
}


