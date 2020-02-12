//select all elements
const start  = document.getElementById("start");  
const quiz = document.getElementById("quiz");
const question = document.getElementById("question");
const qImg = document.getElementById("qImg");
const choiceA = document.getElementById("A");
const choiceB = document.getElementById("B");
const choiceC = document.getElementById("C");
const counter = document.getElementById("counter");
const timeGauge = document.getElementById("timeGauge");
const progress = document.getElementById("progress");
const scoreDiv = document.getElementById("scoreContainer");

//create our questions
let questions = [
    {
        question : "India’s first-ever national police museum will be established in which city?",
        imgSrc : "img/11.png",
        choiceA : "Delhi",
        choiceB : " Chennai",
        choiceC : "Kolkata",
        correct : "A",

    },
    {
        question : "Which Minister is responsible for the Ministry of Corporate Affairs?",
        imgSrc : "img/22.png",
        choiceA : "Shripad Naik",
        choiceB : "Piyush Goyal",
        choiceC : "Nirmala Sitharaman",
        correct : "C",

    },
    {
        question : "Which Ministry is to launch Spice+ form to increase the ease of doing business?",
        imgSrc : "img/33.png",
        choiceA : "Ministry of Home Affairs",
        choiceB : " Ministry of Corporate Affairs",
        choiceC : "Securities and Exchange Board of India",
        correct : "B",

    },
    {
        question : "Where is Bidar airport located?",
        imgSrc : "img/44.png",
        choiceA : "Karnataka",
        choiceB : " Telangana",
        choiceC : "Kolkata",
        correct : "A",

    },
    {
        question : "With which country did India sign an agreement to partner on developing jet engine technology?",
        imgSrc : "img/55.png",
        choiceA : "UK",
        choiceB : "US",
        choiceC : "Japan",
        correct : "A",

    },
    {
        question : "When was the Inter-Governmental Agreement (IGA) on the Joint manufacturing of spares in India that was signed at Vladivostok, Russia?",
        imgSrc : "img/66.png",
        choiceA : "2016",
        choiceB : " 2018",
        choiceC : "2019",
        correct : "C",

    },
    {
        question : "Where was the fifth round of the India-Russia Military Industrial Conference (IRMIC) held?",
        imgSrc : "img/77.png",
        choiceA : "New Delhi",
        choiceB : " Mumbai",
        choiceC : "Lucknow",
        correct : "C",

    },
    {
        question : "Which country to develop 200-km range tactical ballistic missile?",
        imgSrc : "img/88.png",
        choiceA : "Indonesia",
        choiceB : "India",
        choiceC : "Iraq",
        correct : "B",


    },
    {
        question : "Which state emerged as Defence Manufacturing Hub?",
        imgSrc : "img/99.png",
        choiceA : "Kerala",
        choiceB : "Andhra Pradesh",
        choiceC : "Uttar Pradesh",
        correct : "C",
    },
    {
        question : "When was the Atal Bhujal Yojana launched?",
        imgSrc : "img/110.png",
        choiceA : "2018",
        choiceB : "2019",
        choiceC : "2017",
        correct : "B",
    },
];

//create some variables
const lastQuestion = questions.length - 1;
let runningQuestion = 0;
let count = 0;
const questionTime = 15; //10 seconds for each question
const gaugeWidth = 150; //150 px
const gaugeUnit = gaugeWidth / questionTime;
let TIMER;
let score = 0;

//render a question 
function renderQuestion(){
    let q = questions[runningQuestion];

    question.innerHTML = "<p>"+ q.question + "</p>";
    qImg.innerHTML = "<img src="+ q.imgSrc + ">";
    choiceA.innerHTML = q.choiceA;
    choiceB.innerHTML = q.choiceB;
    choiceC.innerHTML = q.choiceC;
}
//adding event listner
start.addEventListener("click", startQuiz);

//start quiz
function startQuiz(){
    start.style.display = "none";
    renderQuestion();
    quiz.style.display = "block";
    renderProgress();
    renderCounter();
    TIMER = setInterval(renderCounter, 1000); // calling renderCounter after every ten second
}



//render progress
function renderProgress(){
    for (let qIndex = 0; qIndex <= lastQuestion; qIndex++){
        progress.innerHTML += "<div class='prog' id=" + qIndex + "></div>";  //creating new divies 
    }
}

//render counter

function renderCounter(){
    if(count <= questionTime){
        counter.innerHTML = count; 
        timeGauge.style.width = count * gaugeUnit + "px"; 
        count++
    }
    else{
        count = 0;
         //change progress color to red
        answerIsWrong();
        if(runningQuestion < lastQuestion){
            runningQuestion++;
            renderQuestion();
        }
        else{
            //end the quiz and show the score
            clearInterval(TIMER);
            scoreRender();
        }
    }
};

//checkAnswer

function checkAnswer(answer){
    if(answer == questions[runningQuestion].correct){
        //answer is correct 
        score++
        //change progress color to green 
        answerIsCorrect();
    }
    else{
        //answer is wrong
        //change progress color to red
        answerIsWrong();
    }
    count = 0;
    if(runningQuestion < lastQuestion){
        runningQuestion++;
        renderQuestion();
    }
    else{
        //end the quiz and show the score
        clearInterval(TIMER);
        scoreRender();
    }
}

//answer is correct 
function answerIsCorrect(){
    document.getElementById(runningQuestion).style.backgroundColor = "#0f0";
}
//answer is wrong
function answerIsWrong(){
    document.getElementById(runningQuestion).style.backgroundColor = "#f00";
}

//score render 
function scoreRender(){
    scoreDiv.style.display = "block";
    //calculate the amount of user question percent answered by the user
    const scorePerCent = Math.round(100 * score / questions.length);


    //choose the image based on the scorePerCent
    //we are using here ternary operator
    let img = (scorePerCent >= 80) ? "img/5.png":(scorePerCent >= 60) ? "img/4.png":(scorePerCent >= 40) ? "img/3.png":(scorePerCent >= 20) ? "img/2.png": "img/1.png";

    scoreDiv.innerHTML = "<img src=" + img +">";
    scoreDiv.innerHTML += "<p>" + scorePerCent +"%</p>";
}

//changing background of correct answer to green
