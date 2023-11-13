// QUESTIONS
const questions = [
    {
        category: "Science: Computers",
        type: "multiple",
        difficulty: "easy",
        question: "What does CPU stand for?",
        correct_answer: "Central Processing Unit",
        incorrect_answers: [
            "Central Process Unit",
            "Computer Personal Unit",
            "Central Processor Unit",
        ],
    },
    {
        category: "Science: Computers",
        type: "multiple",
        difficulty: "easy",
        question:
            "In the programming language Java, which of these keywords would you put on a variable to make sure it doesn&#39;t get modified?",
        correct_answer: "Final",
        incorrect_answers: ["Static", "Private", "Public"],
    },
    {
        category: "Science: Computers",
        type: "boolean",
        difficulty: "easy",
        question: "The logo for Snapchat is a Bell.",
        correct_answer: "False",
        incorrect_answers: ["True"],
    },
    {
        category: "Science: Computers",
        type: "boolean",
        difficulty: "easy",
        question:
            "Pointers were not used in the original C programming language; they were added later on in C++.",
        correct_answer: "False",
        incorrect_answers: ["True"],
    },
    {
        category: "Science: Computers",
        type: "multiple",
        difficulty: "easy",
        question:
            "What is the most preferred image format used for logos in the Wikimedia database?",
        correct_answer: ".svg",
        incorrect_answers: [".png", ".jpeg", ".gif"],
    },
    {
        category: "Science: Computers",
        type: "multiple",
        difficulty: "easy",
        question: "In web design, what does CSS stand for?",
        correct_answer: "Cascading Style Sheet",
        incorrect_answers: [
            "Counter Strike: Source",
            "Corrective Style Sheet",
            "Computer Style Sheet",
        ],
    },
    {
        category: "Science: Computers",
        type: "multiple",
        difficulty: "easy",
        question:
            "What is the code name for the mobile operating system Android 7.0?",
        correct_answer: "Nougat",
        incorrect_answers: [
            "Ice Cream Sandwich",
            "Jelly Bean",
            "Marshmallow",
        ],
    },
    {
        category: "Science: Computers",
        type: "multiple",
        difficulty: "easy",
        question: "On Twitter, what is the character limit for a Tweet?",
        correct_answer: "140",
        incorrect_answers: ["120", "160", "100"],
    },
    {
        category: "Science: Computers",
        type: "boolean",
        difficulty: "easy",
        question: "Linux was first created as an alternative to Windows XP.",
        correct_answer: "False",
        incorrect_answers: ["True"],
    },
    {
        category: "Science: Computers",
        type: "multiple",
        difficulty: "easy",
        question:
            "Which programming language shares its name with an island in Indonesia?",
        correct_answer: "Java",
        incorrect_answers: ["Python", "C", "Jakarta"],
    },
];
// document.addEventListener('DOMContentLoaded', (event) => {
document.addEventListener('DOMContentLoaded', (event) => {
    let questionNumber = 0;
    let score = 0;
    let timer;
    const questionEl = document.getElementById("question");
    const answerListEl = document.getElementById("answer-list");
    const timerEl = document.getElementById("timer");
    const nextButtonEl = document.getElementById("next-button");
    // Funzione per avviare il timer

    // Imposta il dashoffset iniziale a pieno, per poi diminuirlo
    function startTimer() {
        let timeLeft = 60;
        const totalDuration = timeLeft;
        const timerTextEl = document.getElementById('timer-text');
        const timerCircleEl = document.getElementById('timer-circle');
        const circumference = 2 * Math.PI * 45;
        timerCircleEl.style.strokeDasharray = circumference;
        timerCircleEl.style.strokeDashoffset = circumference; // Inizia con il cerchio pieno

        timerTextEl.innerText = timeLeft;

        timer = setInterval(() => {
            timeLeft--;
            timerTextEl.innerText = timeLeft;

            // Calcola il nuovo offset
            let dashoffset = circumference - ((timeLeft / totalDuration) * circumference);
            timerCircleEl.style.strokeDashoffset = dashoffset.toFixed(2);

            if (timeLeft <= 0) {
                clearInterval(timer);
                goToNextQuestion();
            }
        }, 1000);
    }



    // Funzione per mostrare la domanda
    function renderQuestion() {
        if (questionNumber >= questions.length) {
            endQuiz();
            return;
        }
        const question = questions[questionNumber];
        questionEl.innerHTML = question.question;
        answerListEl.innerHTML = '';

        // randomizzazione ordine risposte
        const allAnswers = [...question.incorrect_answers, question.correct_answer].sort(() => Math.random() - 0.5);

        // creo un div per ogni gruppo di risposte
        for (let i = 0; i < allAnswers.length; i += 2) {
            const answerGroup = document.createElement('div');
            answerGroup.className = 'answer-group';

            // Aggiungi due risposte per gruppo
            for (let j = i; j < i + 2 && j < allAnswers.length; j++) {
                const answer = allAnswers[j];
                const inputR = document.createElement('input');

                inputR.type = 'radio';
                inputR.id = 'answer_' + j;
                inputR.name = 'answer';
                inputR.value = answer;
                const label = document.createElement('label');
                label.htmlFor = inputR.id;
                label.textContent = answer;
                label.className = 'radio';
                answerGroup.appendChild(inputR);
                answerGroup.appendChild(label);
                label.addEventListener('click', () => selectAnswer(answer));
            };
            answerListEl.appendChild(answerGroup);
        }
        clearInterval(timer);
        startTimer();
    }
    // Funzione per gestire la selezione delle risposte
    function selectAnswer(answer) {
        if (answer === questions[questionNumber].correct_answer) {
            score++;
        }
        highlightSelectedAnswer(answer);
    }
    // Funzione per evidenziare la risposta selezionata
    function highlightSelectedAnswer(selectedAnswer) {
        const answerListItems = document.querySelectorAll('#answer-list label');
        answerListItems.forEach(label => {
            if (label.textContent === selectedAnswer) {
                label.classList.add('selected');
            }
        });
    }
    // Funzione per passare alla prossima domanda
    function goToNextQuestion() {
        questionNumber++;
        renderQuestion();
    }
    // Funzione per terminare il quiz
    function endQuiz() {
        document.getElementById('quiz-container').style.display = 'none';
        const result = document.getElementById('result');
        const finalScore = score / questions.length >= 0.6 ? 'Quiz Superato!' : 'Quiz Fallito.';
        result.innerText = `Punteggio: ${score}/${questions.length} - ${finalScore}`;
    }
    nextButtonEl.addEventListener('click', goToNextQuestion);
    // Inizia il quiz
    renderQuestion();
});