startGame = async () => {

  const form = document.querySelector('form');
  const result = document.querySelector('.result');
  const score = document.querySelector('.score');
  let currentScore = 0;

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    fetch('/question')
      .then((response) => response.json())
      .then((question) => {
        form.question.value = question.question;
        form.answer.value = question.answer;
      });
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const answer = form.answer.value;
    const userAnswer = form.userAnswer.value;
    if (answer === userAnswer) {
      result.textContent = 'The answer is correct';
      currentScore += 1;
      score.textContent = `Your current score is: ${currentScore}`;
      fetch('/update-score', {
        method: 'POST',
        body: JSON.stringify({ username: 'username', score: currentScore }),
        headers: { 'Content-Type': 'application/json' },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.error) {
            console.error(data.error);
          } else {
            console.log(`Score updated for user ${data.username}`);
          }
        })
        .catch((error) => {
          console.error(`Error updating score: ${error}`);
        });
    } else {
      result.textContent = 'Sorry, but it is not correct';
    }
  });
}