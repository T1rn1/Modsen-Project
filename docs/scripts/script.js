import { questions } from './constants.js';

let currentQuestion = 0;
let correctAnswers = 0;
let timerTime = 10;
let timerInterval;
let answer_btns;
let answers_arr;

const body = document.body;
const swap_theme_btn = document.getElementById("swap-theme-btn");
const timer = document.getElementById("timer");
const quiz_title = document.getElementById("quiz-title");
const quiz_question = document.getElementById("quiz-question");
const results_message = document.getElementById("results-message");
const answers_wrapper = document.getElementById("answers-wrapper");
const next_question_wrapper = document.getElementById("next-question-wrapper");
const submit_btn = document.getElementById("submit-question-btn");
const next_question_btn = document.getElementById("next-question-btn");
const restart_quiz_btn = document.getElementById("restart-quiz-btn");

swap_theme_btn.addEventListener("click", toggleTheme);

let isLightTheme = true;

function toggleTheme() {
    const body = document.body;

    if (isLightTheme) {
        body.classList.remove("light-theme");
        body.classList.add("dark-theme");
    } else {
        body.classList.remove("dark-theme");
        body.classList.add("light-theme");
    }

    isLightTheme = !isLightTheme;
}

function displayQuestion() {
    clearAnswers();
    if (currentQuestion < questions.length) {
        restartTimer();
        updateQuestion();
        createAnswerButtons();
    } else {
        displayResults();
    }
}

function startTimer() {
    timerInterval = setInterval(() => {
        if (timerTime > 0) {
            timerTime--;
            timer.textContent = timerTime;
            
        } else {
            clearInterval(timerInterval);
            highlightCorrectAnswers();
            setTimeout(() => {
                currentQuestion++;
                displayQuestion();
            }, 2000);
        }
    }, 1000);
}

function highlightCorrectAnswers() {
    const correctAnswer = questions[currentQuestion].answer;
    
    if (Array.isArray(correctAnswer)) {
        answer_btns.forEach((btn) => {
            if (correctAnswer.includes(btn.textContent)) {
                btn.style.background = 'green';
            }
        });
    } else {
        answer_btns.forEach((btn) => {
            if (btn.textContent === correctAnswer) {
                btn.style.background = 'green';
            }
        });
    }
    answer_btns.forEach((btn) => btn.disabled = true);
}

function restartTimer() {
    clearInterval(timerInterval);
    timerTime = 10;
    timer.textContent = timerTime;
    startTimer();
}

function updateQuestion() {
    quiz_title.textContent = `Question ${currentQuestion + 1} / ${questions.length}`;
    quiz_question.textContent = questions[currentQuestion].text;
    next_question_wrapper.style.visibility = 'visible';
}

function createAnswerButtons() {
    const question = questions[currentQuestion];
    question.options.forEach((option) => {
        const newBtn = document.createElement('button');
        newBtn.className = 'btn answer-btn';
        newBtn.textContent = option;
        answers_wrapper.appendChild(newBtn);
    });

    answer_btns = document.querySelectorAll('.answer-btn');
    addAnswerButtonListeners(question.answer);
}

function addAnswerButtonListeners(correctAnswer) {
    if(Array.isArray(correctAnswer)){
        multipleAnswerHandler();
    } else {
        singleAnswerHandler(correctAnswer);
    }
}

function multipleAnswerHandler() {
    addWarning();
    answers_arr = [];
    answer_btns.forEach((btn) => {
        btn.addEventListener('click', (e) => {
            const selected_btn = e.target;

            if (answers_arr.includes(selected_btn.textContent)) {
                answers_arr = answers_arr.filter(item => item !== selected_btn.textContent);
                selected_btn.classList.remove('selected');
            } else {
                answers_arr.push(selected_btn.textContent);
                selected_btn.classList.add('selected');
            }

            submit_btn.style.visibility = answers_arr.length > 0 ? "visible" : "hidden";
            next_question_wrapper.style.visibility = 'hidden';
        });
    });
}

function addWarning(){
    const thinText = document.createElement('span');
    thinText.textContent = "There may be several answers.";
    thinText.style.fontWeight = 'lighter';
    quiz_question.appendChild(document.createElement('br')); 
    quiz_question.appendChild(thinText);
}

function singleAnswerHandler(correctAnswer) {
    answer_btns.forEach((btn) => {
        btn.addEventListener('click', (e) => {
            const selectedOption = e.target.textContent;

            answer_btns.forEach(button => button.classList.add('disabled'));

            if (selectedOption === correctAnswer) {
                correctAnswers++;
                e.target.classList.add('correct');
            } else {
                e.target.classList.add('incorrect');

                answer_btns.forEach(button => {
                    if (button.textContent === correctAnswer) {
                        button.classList.add('correct');
                    }
                });
            }

            next_question_wrapper.style.visibility = 'hidden';

            setTimeout(() => {
                currentQuestion++;
                displayQuestion();
            }, 1000);
        });
    });
}

function clearAnswers() {
    if(submit_btn.style.visibility === 'visible') submit_btn.style.visibility = 'hidden';
    answers_wrapper.innerHTML = '';
}

function checkArrays(arr1, arr2) {
    if (arr1.length !== arr2.length) return false; 

    const sortedArr1 = [...arr1].sort();
    const sortedArr2 = [...arr2].sort();

    for(let i = 0; i < sortedArr1.length; i++){
        if (sortedArr1[i] !== sortedArr2[i]){
            return false;
        }
    }

  return true;
}

function submitBtnClick(){
    const rigthAnswers = questions[currentQuestion].answer;
    if (checkArrays(answers_arr, rigthAnswers)) correctAnswers++;
    else {
        answer_btns.forEach((btn) => {
            btn.classList.remove('selected');
            if (rigthAnswers.includes(btn.textContent))  btn.classList.add('correct');
            else if (answers_arr.includes(btn.textContent) && !rigthAnswers.includes(btn.textContent)) btn.classList.add('incorrect');
        })
    }

    setTimeout(() => {
        currentQuestion++;
        displayQuestion();
    }, 2000);
}

submit_btn.addEventListener("click", submitBtnClick);

function displayResults() {
    clearInterval(timerInterval);
    timer.style.visibility = 'hidden';
    quiz_title.style.display = 'none';
    quiz_question.textContent = 'Quiz finished! Thanks for playing.';
    answers_wrapper.style.display = 'none';
    next_question_wrapper.style.display = 'none';
    results_message.style.display = 'block';
    results_message.textContent = `You got ${correctAnswers} correct answers.`;
    restart_quiz_btn.style.display = 'block';
}

function restartQuiz() {
    currentQuestion = 0;
    correctAnswers = 0;

    timer.style.visibility = 'visible';
    quiz_title.style.display = 'block';
    answers_wrapper.style.display = 'flex';
    next_question_wrapper.style.display = 'flex';
    results_message.style.display = 'none';
    restart_quiz_btn.style.display = 'none';

    displayQuestion();
}

next_question_btn.addEventListener('click', () => {
    currentQuestion++;
    displayQuestion();
});

restart_quiz_btn.addEventListener('click', restartQuiz);

displayQuestion();