const start = document.querySelector(".start");
const quiz = document.querySelector(".quiz");
const question = document.querySelector(".question");
const allAnswerChoices = document.querySelectorAll(".choice");
const answerChoiceA = document.querySelector("#A");
const answerChoiceB = document.querySelector("#B");
const answerChoiceC = document.querySelector("#C");
const answerChoiceD = document.querySelector("#D");
const counter = document.querySelector(".counter");
const timeGauge = document.querySelector(".time-gauge");
const progressContainer = document.querySelector(".progress-container");
const ScoreContainer = document.querySelector(".score-container");


//questions
let questions = [
{
    question: "Em que ano foi lançado o episódio piloto e o último da série?",
    choiceA: '2008/2009',
    choiceB: '2007/2002',
    choiceC: '2009/2010',
    choiceD: '2010/2011',
    correctAnswer: '2009/2010',

},
{
    question: "Qual o nome da cadela dos Prichett?",
    choiceA: 'Lilly',
    choiceB: 'Shay',
    choiceC: 'Hany',
    choiceD: 'Stela',
    correctAnswer: 'Stela',

},
{
    question: "Qual o segundo nome de Glória?",
    choiceA: 'Ramirez',
    choiceB: 'Delgado',
    choiceC: 'Santana',
    choiceD: 'Prichett',
    correctAnswer: 'Delgado',

},
{
    question: "Qual o nome dos gemêos de Haley e Dylan?",
    choiceA: 'Poppie e George',
    choiceB: 'Audrey e Henry',
    choiceC: 'Claire e Adam',
    choiceAD: 'Jay e Anie',
    correctAnswer: 'Poppie e George',

},
{
    question: "Quantos anos Haley fez na sexta temporada?",
    choiceA: '18',
    choiceB: '21',
    choiceC: '24',
    choiceD: '19',
    correctAnswer: '21',

},
{
    question: "O que Glória se recusava a usar por vaidade?",
    choiceA: 'Tênis',
    choiceB: 'Short',
    choiceC: 'Óculos',
    choiceD: 'Bolsas',
    correctAnswer: 'Óculos',

},
{
    question: "Quais são os nomes dos personagens que Phil e Clair fazem no dia dos namorados?",
    choiceA: 'Logan e Keatlin',
    choiceB: 'Clive e Juliana',
    choiceC: 'James e Lauren',
    choiceD: 'Clay e Laurel',
    correctAnswer: 'Clive e Juliana',

},


]


//var

const lastQuestion = questions.length -1;
let activeQuestion = 0;
let count = 0;
const questionTime = 10;
const gaugeWidth = 800;
const gaugeUnit = gaugeWidth / questionTime
let TIMER;
let score = 0;


start.addEventListener("click", startQuiz);

// Answer choices Event Listeners
allAnswerChoices.forEach(function (clickAnswer) {
  clickAnswer.addEventListener("click", function (e) {
    let userAnswer = e.target.innerText;
    checkAnswer(userAnswer);
  });
});

//na pagina
function renderQuestion() {
    let q = questions[activeQuestion];
    question.innerHTML = "<p>" + q.question + "</p>";
    answerChoiceA.innerHTML = q.choiceA;
    answerChoiceB.innerHTML = q.choiceB;
    answerChoiceC.innerHTML = q.choiceC;
    answerChoiceD.innerHTML = q.choiceD;
}

function startQuiz() {
    start.style.display = "none";
    renderQuestion();
    quiz.style.visibility = "visible";
    renderProgress();
    renderCounter();
    TIMER = setInterval(renderCounter, 1000);
  }

  // renderProgress Function
function renderProgress() {
    for (let questionIndex = 0; questionIndex <= lastQuestion; questionIndex++) {
      progressContainer.innerHTML +=
        "<div class='progress-box' id=" + questionIndex + "></div>";
    }
  }
  
  // renderCounter Function
  function renderCounter() {
    if (count <= questionTime) {
      counter.innerHTML = count;
      timeGauge.style.width = count * gaugeUnit + "px";
      count++;
    } else {
      answerIsIncorrect();
      nextQuestion();
    }
  }
  
  // checkAnswer Function
  function checkAnswer(answer) {
    if (answer === questions[activeQuestion].correctAnswer) {
      score++;
      answerIsCorrect();
    } else {
      answerIsIncorrect();
    }
    nextQuestion();
  }
  
  // answerIsCorrect Function
  function answerIsCorrect() {
    document.getElementById(activeQuestion).style.backgroundColor = "green";
  }
  
  // answerIsIncorrect Function
  function answerIsIncorrect() {
    document.getElementById(activeQuestion).style.backgroundColor = "red";
  }
  
  // nextQuestion Function
  function nextQuestion() {
    count = 0;
    if (activeQuestion < lastQuestion) {
      activeQuestion++;
      renderQuestion();
    } else {
      clearInterval(TIMER);
      renderScore();
    }
  }
  
  // renderScore Function
  function renderScore() {
    ScoreContainer.style.visibility = "visible";
  
    let scorePercentage = Math.round((100 * score) / questions.length);
    ScoreContainer.innerHTML = `<h2>Porcentagem de respostas corretas: ${scorePercentage}</h2>`;
    ScoreContainer.innerHTML += `<h2>Número de respostas corretas: ${score}</h2>`;
  }
  