let questions = [
    {
    "question": "Wie groß ist der Durchmesser der Mars?",
    "answer_1": "6.779 km",
    "answer_2": "12.459 km",
    "answer_3": "24.560 km",
    "answer_4": "10.469 km",
    "right_answer": 1
    },
    {
    "question": "Wer ist als erste auf dem Mt Everest gestiegen?",
    "answer_1": "Kylie Minogue",
    "answer_2": "Eddie Murphy",
    "answer_3": "Sir Edmund Hillary",
    "answer_4": "Buggs Bunny",
    "right_answer": 3
    },
    {
    "question": "Welche Farbe hat die Zunge einer Giraffe?",
    "answer_1": "Rot",
    "answer_2": "Blau",
    "answer_3": "Pink",
    "answer_4": "Orange",
    "right_answer": 2
    },
    {
    "question": "Wie weit kann ein laubfrosch springen?",
    "answer_1": "10m",
    "answer_2": "30cm",
    "answer_3": "50cm",
    "answer_4": "1m",
    "right_answer": 2
    },
    {
    "question": "Welche Farben sind die primär Farben?",
    "answer_1": "blau rot gelb",
    "answer_2": "pink Lila rot",
    "answer_3": "rot blau schartz",
    "answer_4": "grün rot blau",
    "right_answer": 1
    },
    {
    "question": "Wie groß ist der Durchmesser der Erde?",
    "answer_1": "1010 km",
    "answer_2": "5054 km",
    "answer_3": "10567 km",
    "answer_4": "12742 km",
    "right_answer": 4
    },
    {
    "question": "Wie weit ist es von der Erde bis zum Mond",
    "answer_1": "200.345 km",
    "answer_2": "320.560 km",
    "answer_3": "384.400 km",
    "answer_4": "100.2349 km",
    "right_answer": 3
    }
];

let correctAnswers = 0;
let currentQuestion = 0;
let AUDIO_SUCCESS = new Audio('audio/success.mp3');
let AUDIO_WRONG = new Audio('audio/wrong.mp3');


function init() {
    /* for (let i = 0; i < questions.length; i++) {
        const element = questions[index]; */
        document.getElementById('q_number').innerHTML = questions.length; 
        showCurrentQuestion();
}


function showCurrentQuestion() {

    if(gameIsOver()) {
        showEndScreen()
    } else {  //show question
        updateProgressBar();
        updateToNextQuestion();
    }
}


function gameIsOver() {
    return currentQuestion >= questions.length;
}


function answer(selection) {   //parameter übergeben von onclick von Button in html zB answer_1, 2, 3 oder 4
    let question = questions[currentQuestion];  // Aktuelle Frage wird gewählt von global variable "currentQuestion"
    let selectedQuestionNumber = selection.slice(-1); //von parameter wird letze Buchstabe ausgewählt.

    let idofRightAnswer = `answer_` + question['right_answer'];
    // oder Junas's Lösung:  let idofRightAnswer = `answer_${question['right_answer']}`;
    //console.log('var', idofRightAnswer)

    if(rightAnswerSelected(selectedQuestionNumber, question)) { 
        document.getElementById(selection).parentNode.classList.add('bg-success');
        AUDIO_SUCCESS.play();
        correctAnswers++;
    } else {
        document.getElementById(selection).parentNode.classList.add('bg-danger');
        document.getElementById(idofRightAnswer).parentNode.classList.add('bg-success');
        AUDIO_WRONG.play();
    }
    //console.log('richtig_antwort__', question['right_answer']);
    document.getElementById('next_button').disabled = false;
}


function rightAnswerSelected(selectedQuestionNumber, question) {
    //Auswahl mit richtige Antwort verglichen.
    return selectedQuestionNumber == question['right_answer'];
}


function nextQuestion() {
    currentQuestion++;  // zB von 0 auf 1 
    document.getElementById('current_q_number').innerHTML = currentQuestion + 1;
    resetAnswerButtons()
    showCurrentQuestion();  
}


function resetAnswerButtons() {
    document.getElementById('next_button').disabled = true;
    document.getElementById('answer_1').parentNode.classList.remove('bg-success','bg-danger');
    document.getElementById('answer_2').parentNode.classList.remove('bg-success','bg-danger');
    document.getElementById('answer_3').parentNode.classList.remove('bg-success','bg-danger');
    document.getElementById('answer_4').parentNode.classList.remove('bg-success','bg-danger');  
}


function restartGame() {
    document.getElementById('header_image').src='./img/quiz_img.png'
    document.getElementById('endScreen').style = 'display: none'; //Endscreen ausblenden
        document.getElementById('questionBody').style = '';  // questionBody wieder anzeigen
    correctAnswers = 0;
    currentQuestion = 0;
    init();
}


function showEndScreen() {
    document.getElementById('endScreen').style = '';
    document.getElementById('questionBody').style = 'display: none';  
    //renders the number of correctly answered questions in the finish screen
    document.getElementById('correctAnswers').innerHTML = correctAnswers; 
    //renders the total number of questions in the finish screen
    document.getElementById('NumberOfQuest').innerHTML = questions.length;
    document.getElementById('header_image').src='./img/end.png'
}


function updateToNextQuestion() {
    
    let question = questions[currentQuestion];

    document.getElementById('question_text').innerHTML = question['question'];
    document.getElementById('answer_1').innerHTML = question['answer_1'];
    document.getElementById('answer_2').innerHTML = question['answer_2'];
    document.getElementById('answer_3').innerHTML = question['answer_3'];
    document.getElementById('answer_4').innerHTML = question['answer_4']; 
} 


function updateProgressBar() {
    let percent = (currentQuestion + 1) / questions.length;
    percent = Math.round(percent * 100);
    document.getElementById('progress_bar').innerHTML = `${percent} %`;
    document.getElementById('progress_bar').style.width = `${percent}%`;
}