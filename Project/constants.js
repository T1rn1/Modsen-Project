export const questions = [
    { 
        text: "How many planets are in the solar system?", 
        options: ["8", "9", "10"], 
        answer: "8"
    },
    { 
        text: "What is the freezing point of water?", 
        options: ["0", "-5", "-6"], 
        answer: "0"
    },
    { 
        text: "What is the longest river in the world?", 
        options: ["Nile", "Amazon", "Yangtze"], 
        answer: "Amazon"
    },
    { 
        text: "How many chromosomes are in the human genome?", 
        options: ["42", "44", "46"], 
        answer: "46"
    },
    { 
        text: "Which of these characters are friends with Harry Potter?", 
        options: ["Ron Weasley", "Draco Malfoy", "Hermione Granger"], 
        answer: ["Ron Weasley", "Hermione Granger"]
    },
    { 
        text: "What is the capital of Canada?", 
        options: ["Toronto", "Ottawa", "Vancouver"], 
        answer: "Ottawa" 
    },
    { 
        text: "What is the Jewish New Year called?", 
        options: ["Hanukkah", "Yom Kippur", "Kwanzaa"], 
        answer: "Yom Kippur"
    }
];

export const quizSelectors = {
    swap_theme_btn: document.getElementById("swap-theme-btn"),
    timer: document.getElementById("timer"),
    quiz_title: document.getElementById("quiz-title"),
    quiz_question: document.getElementById("quiz-question"),
    results_message: document.getElementById("results-message"),
    answers_wrapper: document.getElementById("answers-wrapper"),
    next_question_wrapper: document.getElementById("next-question-wrapper"),
    submit_btn: document.getElementById("submit-question-btn"),
    next_question_btn: document.getElementById("next-question-btn"),
    restart_quiz_btn: document.getElementById("restart-quiz-btn"),
};