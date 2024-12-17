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

const title = document.getElementById("title");
const question = document.getElementById("question");
const buttons = document.querySelectorAll(".btn");

function displayQuestion(index) {
    if (index < questions.length) {
        const q = questions[index];
        title.textContent = `Question ${index + 1}/${questions.length}`;
        question.textContent = q.text;
        buttons.forEach((btn, i) => {
            btn.textContent = q.options[i];
            btn.dataset.index = i;
        });
    } else {
        question.textContent = "Quiz finished! Thanks for playing.";
        document.getElementById("buttons").style.display = "none";
    }
}

buttons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        const selectedOption = parseInt(e.target.dataset.index);
        const correctAnswer = questions[currentQuestion].answer;

        if (selectedOption === correctAnswer) {
            alert("Correct!");
        } else {
            alert("Wrong!");
        }

        currentQuestion++;
        displayQuestion(currentQuestion);
    });
});

displayQuestion(currentQuestion);