const questions = [
    { 
        text: "How many planets are in the solar system?", 
        options: ["8", "9", "10"], 
        answer: 0 
    },
    { 
        text: "What is the freezing point of water?", 
        options: ["0", "-5", "-6"], 
        answer: 0 
    },
    { 
        text: "What is the longest river in the world?", 
        options: ["Nile", "Amazon", "Yangtze"], 
        answer: 1 
    },
    { 
        text: "How many chromosomes are in the human genome?", 
        options: ["42", "44", "46"], 
        answer: 2 
    },
    { 
        text: "Which of these characters are friends with Harry Potter?", 
        options: ["Ron Weasley", "Draco Malfoy", "Hermione Granger"], 
        answer: 0 
    },
    { 
        text: "What is the capital of Canada?", 
        options: ["Toronto", "Ottawa", "Vancouver"], 
        answer: 1 
    },
    { 
        text: "What is the Jewish New Year called?", 
        options: ["Hanukkah", "Yom Kippur", "Kwanzaa"], 
        answer: 1 
    }
];

const titleP = document.getElementById("titleP");
const questionP = document.getElementById("questionP");
const answerBtns = document.querySelectorAll(".answer");
const correctAnswersP = document.getElementById("correctAnswersP");
const buttonsDiv = document.getElementById("buttonsDiv");
const nextQuestionDiv = document.getElementById("nextQuestionDiv");
const nextQuestionBtn = document.getElementById("nextQuestionBtn");
const restartQuizBtn = document.getElementById("restartQuizBtn");

let currentQuestion = 0;
let correctAnswers = 0;

nextQuestionBtn.addEventListener("click", () => {
    currentQuestion++;
    displayQuestion(currentQuestion);
});

function displayQuestion(index) {
    if (index < questions.length) {
        const q = questions[index];

        titleP.textContent = `Question ${index + 1}/${questions.length}`;

        questionP.textContent = q.text;
        answerBtns.forEach((btn, i) => {
            btn.textContent = q.options[i];
            btn.dataset.index = i;
        });
    } else {
        restartQuizBtn.style.display = "block";
        correctAnswersP.style.display = "block";
        correctAnswersP.textContent = `You got ${correctAnswers} correct answers.`;
        questionP.textContent = "Quiz finished! Thanks for playing.";

        titleP.style.display = "none";
        buttonsDiv.style.display = "none";
        nextQuestionDiv.style.display = "none";
    }
}

answerBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        const selectedOption = parseInt(e.target.dataset.index);
        const correctAnswer = questions[currentQuestion].answer;

        answerBtns.forEach((button, i) => {
            button.disabled = true;

            if (i === correctAnswer) {
                button.style.backgroundColor = "green";
            } else {
                button.style.backgroundColor = "red";
            }
        });

        if (selectedOption === correctAnswer) {
            correctAnswers++;
        }

        nextQuestionDiv.style.visibility = "hidden";

        setTimeout(() => {
            nextQuestionDiv.style.visibility = "visible";

            answerBtns.forEach((btn) => {
                btn.style.backgroundColor = "";
                btn.disabled = false;
            });

            currentQuestion++;
            displayQuestion(currentQuestion);
        }, 2000);
    });
});

restartQuizBtn.addEventListener("click", () => {
    currentQuestion = 0;
    correctAnswers = 0;

    displayQuestion(currentQuestion);

    titleP.style.display = "block";
    questionP.style.display = "block";
    buttonsDiv.style.display = "flex";
    nextQuestionDiv.style.display = "block";
    correctAnswersP.style.display = "none";
    restartQuizBtn.style.display = "none";
});

displayQuestion(currentQuestion);