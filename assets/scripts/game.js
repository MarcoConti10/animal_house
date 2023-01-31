// Gestione della logica del gioco
const game = {
  score: 0,
  questions: [],
  currentQuestionIndex: 0,
  start: function() {
    // Reset del punteggio e delle domande
    this.score = 0;
    this.questions = [];
    this.currentQuestionIndex = 0;
    // Chiamata all'API per ottenere le domande
    fetch('https://opentdb.com/api.php?amount=10&category=27&type=boolean')
      .then(response => response.json())
      .then(data => {
        this.questions = data.results;
        // Avvio del gioco
        this.nextQuestion();
      });
  },
  nextQuestion: function() {
    // Verifica se ci sono ancora domande da mostrare
    if (this.currentQuestionIndex >= this.questions.length) {
      this.endGame();
      return;
    }
    // Mostra la prossima domanda
    const question = this.questions[this.currentQuestionIndex];
    // Aggiorna la UI
    document.getElementById('question').innerHTML = question.question;
    document.getElementById('true').innerHTML = 'Vero';
    document.getElementById('false').innerHTML = 'Falso';
  },
  checkAnswer: function(answer) {
    // Verifica se la risposta è corretta
    const isCorrect = this.questions[this.currentQuestionIndex].correct_answer === answer;
    if (isCorrect) {
      this.score++;
    }
    // Passa alla domanda successiva
    this.currentQuestionIndex++;
    this.nextQuestion();
  },
  endGame: function() {
    // Verifica se il giocatore ha vinto o perso
    const hasWon = this.score >= 5;
    if (hasWon) {
      // Aggiorna il punteggio sul file user.json (non implementato in questo esempio)
      // Mostra messaggio di vittoria
      document.getElementById('result').innerHTML = 'Hai vinto!';
    } else {
      // Mostra messaggio di sconfitta
      document.getElementById('result').innerHTML = 'Hai perso.';
    }
    // Mostra il punteggio finale
    document.getElementById('score').innerHTML = `Il tuo punteggio è: ${this.score}`;
    // Mostra il tasto "Gioca di nuovo"
    document.getElementById('play-again').style.display = 'block';
  }
};

// Gestione degli eventi del tasto "Vero"
document.getElementById('true').addEventListener('click', function() {
  game.checkAnswer('True');
});

// Gestione degli eventi del tasto "Falso"
document.getElementById('false').addEventListener

