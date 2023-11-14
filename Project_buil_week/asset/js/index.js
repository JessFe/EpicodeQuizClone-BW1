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
document.addEventListener('DOMContentLoaded', (event) => {
    let questionNumber = 0;
    let score = 0;
    let timer;
    const questionEl = document.getElementById("question");
    const answerListEl = document.getElementById("answer-list");
    const timerEl = document.getElementById("timer");
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

        const countAnswers = document.createElement('span');
        countAnswers.className = 'countAnswers';
        const questionText = document.createElement('span');
        questionText.innerText = `QUESTION ${questionNumber + 1}`;
        const totalQuestionsText = document.createElement('span');
        totalQuestionsText.style.color = '#af0087';
        totalQuestionsText.innerText = `/${questions.length}`;

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

                inputR.addEventListener('change', () => {
                    selectAnswer(answer);
                    setTimeout(() => {
                        goToNextQuestion();
                    }, 500); // Ritardo di un secondo (1000 millisecondi)
                });

                answerGroup.appendChild(inputR);
                answerGroup.appendChild(label);
            }

            answerListEl.appendChild(answerGroup);
            clearInterval(timer);
            startTimer();
        }
        countAnswers.appendChild(questionText);
        countAnswers.appendChild(totalQuestionsText);
        answerListEl.appendChild(countAnswers);
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
        const totalQuestions = questions.length;
        const percentCorrect = (score / totalQuestions) * 100;
        const percentIncorrect = 100 - percentCorrect;

        // calcolo circonferenze per i risultati
        const radius = 90; // Raggio del cerchio nel tuo SVG
        const circumference = 2 * Math.PI * radius;
        const correctLength = (percentCorrect / 100) * circumference;
        const incorrectLength = (percentIncorrect / 100) * circumference;
        const correctDashoffset = -circumference / 4;
        const incorrectDashoffset = -circumference * 0.75 + correctLength;
        const correctColor = "#00ffff"; // Azzurro per le risposte corrette
        const incorrectColor = "#d20094"; // Rosa per le risposte sbagliate

        // Nascondi il quiz container e mostra i risultati
        document.getElementById('quiz-container').style.display = 'none';
        document.getElementById('timer-container').style.display = 'none';
        const resultsScreen = document.getElementById('results-screen');
        resultsScreen.style.display = 'flex';
        resultsScreen.innerHTML = `
        <h1>Results</h1>
        <h2>The summary of your answers:</h2>
        <div id="details-container" class="details-container">
            <div class="result correct">
                <h3>Correct</h3>
                <p class='correctP'>${percentCorrect.toFixed(1)}%</p>
                <p class='correctP'>${score}/${totalQuestions} questions</p>
            </div>
            <svg width="200" height="200" viewBox="0 0 200 200">
            <!-- Cerchio per le risposte giuste -->
            <circle r="${radius}" cx="100" cy="100" fill="transparent" stroke="${correctColor}" stroke-width="20"
                stroke-dasharray="${correctLength} ${circumference}"
                stroke-dashoffset="${correctDashoffset}"
                transform="rotate(-90 100 100)" />
            <!-- Cerchio per le risposte sbagliate -->
            <circle r="${radius}" cx="100" cy="100" fill="transparent" stroke="${incorrectColor}" stroke-width="20"
                stroke-dasharray="${incorrectLength} ${circumference}"
                stroke-dashoffset="${incorrectDashoffset}"
                transform="rotate(-90 100 100)" />
            </svg>
                <div class="result wrong">
                    <h3>Wrong</h3>
                    <p class='incorrectP'>${percentIncorrect.toFixed(1)}%</p>
                    <p class='incorrectP'>${totalQuestions - score}/${totalQuestions} questions</p>
                </div>
        </div>
        <form action="/rating.html">
            <button class="cursore" id="proceed" type="submit">PROCEED</button>
        </form>
    `;
    }

    // Funzione per riavviare il quiz (da implementare)
    function restartQuiz() {
        // Reimposta lo stato del quiz e mostra il contenitore del quiz
        questionNumber = 0;
        score = 0;
        document.getElementById('quiz-container').style.display = 'block';
        resultsScreen.style.display = 'none';
        // renderQuestion();
    }
    // Inizia il quiz
    renderQuestion();
});