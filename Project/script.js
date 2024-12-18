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

let currentQuestion = 0;
let correctAnswers = 0;

const titleP = document.getElementById("titleP");
const questionP = document.getElementById("questionP");
const buttonsBtns = document.querySelectorAll(".btn");
const correctAnswersP = document.getElementById("correctAnswersP");

function displayQuestion(index) {
    if (index < questions.length) {
        const q = questions[index];
        titleP.textContent = `Question ${index + 1}/${questions.length}`;
        questionP.textContent = q.text;
        buttonsBtns.forEach((btn, i) => {
            btn.textContent = q.options[i];
            btn.dataset.index = i;
        });
    } else {
        questionP.textContent = "Quiz finished! Thanks for playing.";
        titleP.style.display = "none";
        questionP.style.display = "none";
        buttonsBtns.forEach((btn) => {
            btn.style.display = "none";
        })
        correctAnswersP.style.display = "block";
        correctAnswersP.textContent = `You got ${correctAnswers} correct answers`;
    }
}

buttonsBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        const selectedOption = parseInt(e.target.dataset.index);
        const correctAnswer = questions[currentQuestion].answer;

        buttonsBtns.forEach((button, i) => {
            if (i === correctAnswer) {
                button.style.backgroundColor = "green";
            } else {
                button.style.backgroundColor = "red";
            }
        });

        if (selectedOption === correctAnswer) {
            correctAnswers++;
        }

        setTimeout(() => {
            buttonsBtns.forEach((btn) => {
                btn.style.backgroundColor = "";
            });

            currentQuestion++;
            displayQuestion(currentQuestion);
        }, 2000);
    });
});

displayQuestion(currentQuestion);