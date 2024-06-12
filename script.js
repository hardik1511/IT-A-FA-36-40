const questions = [
    {question: "What is the alphabet of a language?", options: ["A set of symbols", "A set of states", "A transition function", "None of the above"], answer: 0},
    {question: "What is a DFA?", options: ["Deterministic Finite Automaton", "Deterministic Function Automaton", "Definite Finite Automaton", "None of the above"], answer: 0},
    {question: "What is a NFA?", options: ["Non-deterministic Finite Automaton", "Non-deterministic Function Automaton", "Non-finite Automaton", "None of the above"], answer: 0},
    {question: "What is a regular expression?", options: ["A sequence of characters that define a search pattern", "A type of grammar", "A set of rules", "None of the above"], answer: 0},
    {question: "Which language is accepted by a DFA?", options: ["Regular language", "Context-free language", "Recursive language", "None of the above"], answer: 0},
    {question: "What is a Turing Machine?", options: ["An abstract machine that manipulates symbols", "A type of finite automaton", "A grammar", "None of the above"], answer: 0},
    {question: "What is the pumping lemma used for?", options: ["To prove that a language is not regular", "To prove that a language is regular", "To define a context-free language", "None of the above"], answer: 0},
    {question: "What is a context-free grammar?", options: ["A set of production rules", "A finite automaton", "A regular expression", "None of the above"], answer: 0},
    {question: "What is a pushdown automaton?", options: ["A type of automaton that uses a stack", "A type of finite automaton", "A Turing Machine", "None of the above"], answer: 0},
    {question: "What is a language in computation?", options: ["A set of strings", "A set of symbols", "A type of grammar", "None of the above"], answer: 0}
];

let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 60;
let timer;

const quizContainer = document.getElementById('quiz');
const timeDisplay = document.getElementById('time');
const submitButton = document.getElementById('submit');

const selectedQuestions = questions.sort(() => 0.5 - Math.random()).slice(0, 5);

function startTimer() {
    timer = setInterval(() => {
        timeLeft--;
        timeDisplay.textContent = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timer);
            submitAnswer();
        }
    }, 1000);
}

function showQuestion() {
    const question = selectedQuestions[currentQuestionIndex];
    const options = question.options.map((option, index) =>
        `<li><input type="radio" name="option" value="${index}"> ${option}</li>`
    ).join('');
    quizContainer.innerHTML = `<div class="question">${question.question}</div><ul class="options">${options}</ul>`;
}

function submitAnswer() {
    const selectedOption = document.querySelector('input[name="option"]:checked');
    if (selectedOption) {
        const answer = parseInt(selectedOption.value);
        if (answer === selectedQuestions[currentQuestionIndex].answer) {
            score++;
        }
        highlightAnswers(answer);
    } else {
        highlightAnswers(-1);  // No answer selected
    }
}

function highlightAnswers(selectedAnswer) {
    const options = document.querySelectorAll('li');
    options.forEach((option, index) => {
        if (index === selectedQuestions[currentQuestionIndex].answer) {
            option.classList.add('correct');
        } else if (index === selectedAnswer) {
            option.classList.add('incorrect');
        }
    });

    currentQuestionIndex++;
    if (currentQuestionIndex < selectedQuestions.length) {
        setTimeout(() => {
            timeLeft = 60;
            startTimer();
            showQuestion();
        }, 2000);
    } else {
        setTimeout(showScore, 2000);
    }
}

function showScore() {
    quizContainer.innerHTML = `<h2>Your score is ${score}/${selectedQuestions.length}</h2>`;
    submitButton.style.display = 'none';
}

submitButton.addEventListener('click', () => {
    clearInterval(timer);
    submitAnswer();
});

startTimer();
showQuestion();
