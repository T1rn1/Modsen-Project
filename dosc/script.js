import { questions, quizSelectors } from './constants.js';

let currentQuestion = 4;
let correctAnswers = 0;
let timerTime = 10;
let timerInterval;
let answer_btns;
let answers_arr;

const {
    swap_theme_btn,
    timer,
    quiz_title,
    quiz_question,
    results_message,
    answers_wrapper,
    next_question_wrapper,
    submit_btn,
    next_question_btn,
    restart_quiz_btn,
} = quizSelectors;

swap_theme_btn.addEventListener("click", toggleDarkTheme);

function toggleDarkTheme() {
    const root = document.documentElement;
    root.classList.toggle('dark-theme');
    answer_btns.forEach((btn) => {
        if(!answers_arr.includes(btn.textContent)) setButtonBackgroundColor(btn)
    })
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
        if (timerTime >= 0) {
            timer.textContent = timerTime;
            timerTime--;
        } else {
            clearInterval(timerInterval);
            currentQuestion++;
            displayQuestion();
        }
    }, 1000);
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
        setButtonBackgroundColor(newBtn);
        answers_wrapper.appendChild(newBtn);
    });

    answer_btns = document.querySelectorAll('.answer-btn');
    addAnswerButtonListeners(question.answer);
}

function addAnswerButtonListeners(correctAnswer) {
    if(Array.isArray(correctAnswer)){
        alert("There may be several answers to this question.");
        answers_arr = [];
        answer_btns.forEach((btn) => {
            btn.addEventListener('click', (e) => {
                
                const selected_btn = e.target;

                if(answers_arr.includes(selected_btn.textContent)){
                    answers_arr = answers_arr.filter(item => item !== selected_btn.textContent);
                    setButtonBackgroundColor(selected_btn);
                }else{
                    answers_arr.push(selected_btn.textContent)
                    selected_btn.style.background = 'gray';
                }

                if(answers_arr.length > 0){
                    submit_btn.style.visibility = "visible";
                }else{
                    submit_btn.style.visibility = "hidden";
                }

                next_question_wrapper.style.visibility = 'hidden';
            });
        });
    } else {
        answer_btns.forEach((btn) => {
            btn.addEventListener('click', (e) => {
                const selectedOption = e.target.textContent;

                answer_btns.forEach(button => button.disabled = true);

                if (selectedOption === correctAnswer) {
                    correctAnswers++;
                    e.target.style.background = 'green';
                } else {
                    e.target.style.background = 'red';
                    
                    answer_btns.forEach(button => {
                        if (button.textContent === correctAnswer) {
                            button.style.background = 'green';
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
}

function setButtonBackgroundColor(button) {
    let buttonBgColor = getComputedStyle(document.documentElement).getPropertyValue('--btn-bg-color');
    button.style.backgroundColor = buttonBgColor;
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
            if (rigthAnswers.includes(btn.textContent)) btn.style.background = 'green';
            else if (answers_arr.includes(btn.textContent) && !rigthAnswers.includes(btn.textContent)) btn.style.background = 'red';
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