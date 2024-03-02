const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');
const timeText = document.querySelector('#time');

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];
let timerSeconds = 20;
let timerInterval = 1;

let questions = [
    {
        question:'Which operator is used to assign a value to a variable?',
        choice1: '*',
        choice2: '=',
        choice3: '+',
        choice4: '-',
        answer: 2,

    },
    {
        question:'Which function of an Array object calls a function for each element in the array?',
        choice1: 'forEach()',
        choice2: 'every()',
        choice3: 'forEvery()',
        choice4: 'each()',
        answer: 1,

    },
    {
        question:'How do you find the number with the highest value of x and y?',
        choice1: 'Math.ceil(x, y)',
        choice2: 'top(x, y)',
        choice3: 'math.max(x, y)',
        choice4: 'ceil(x, y)',
        answer: 3,

    },
    {
        question:'How do you create a function in JavaScript??',
        choice1: 'function myFunction()',
        choice2: 'function:myFunction()',
        choice3: 'function = myFunction()',
        choice4: 'create myFunction()',
        answer: 1,

    }
]

const SCORE_POINTS = 100;
const MAX_QUESTIONS = 4;

startGame = () => {
    questionCounter = 0,
    score = 0,
    availableQuestions = [...questions]
    startTimer();
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS){
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('end.html')
    }

    questionCounter++
    progressText.innerText = 'Question ' + questionCounter + ' of ' + MAX_QUESTIONS;
    progressBarFull.style.width = (questionCounter / MAX_QUESTIONS) * 100 + '%';


    const questionsIndex = Math.floor(Math.random()* availableQuestions.length);
    currentQuestion = availableQuestions[questionsIndex];
    question.innerText = currentQuestion.question;

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1) 

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e =>{
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectAnswer = selectedChoice.dataset['number']

        let classToApply = selectAnswer == currentQuestion.answer ? 'correct' :
        'incorrect'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }else {
            timerSeconds -= 2;
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()
        }, 1000)
    })
})

incrementScore = num => {
    score +=num
    scoreText.innerText = score
}

function startTimer() {
    timerInterval = setInterval(function () {
      timerSeconds--;
  
      if (timerSeconds <=0 ) {
        endGame();
      } else {
        updateTimerDisplay();
      }
    }, 1000);
  }
  
  function updateTimerDisplay() {
    timeText.innerText = timerSeconds; // Update the time element with the current timer value
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS} - Time: ${timerSeconds}s`;
  }
  
  function endGame() {
    clearInterval(timerInterval);
    localStorage.setItem('mostRecentScore', score);
    window.location.assign('end.html');
  }
startGame()