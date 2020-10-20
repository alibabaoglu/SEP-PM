function playAudio() {
    var x = document.getElementById("menu-audio");
    x.play();

}
function pauseAudio() {
    var x = document.getElementById("menu-audio");
    x.pause();

}

window.onbeforeunload = function () {
    sessionStorage.setItem("money", parseInt(money));

}

window.onload = function () {


    if (sessionStorage.getItem('money') != null) {
        money = parseInt(sessionStorage.getItem('money'));
        document.getElementById("Counter").innerHTML = money + " $";
    } else money = 0;
}

regionID = "";
function newRegion(id) {
    regionID = id;
    openQuiz();
}

// Quiz-Popup
function openQuiz() {
    document.getElementById("QuizWindow").style.display = "block";
    playQuiz();
}
solution = 0;
function playQuiz() {
    var allQuestionsID = Object.keys(DATA[regionID]);
    var questionID = allQuestionsID[Math.floor(Math.random() * allQuestionsID.length)];

    document.getElementById('question').innerHTML = DATA[regionID][questionID]["Frage"];
    for (let index = 1; index < 5; index++) {
        document.getElementById(index.toString()).innerHTML = DATA[regionID][questionID]["Antworten"][index - 1];
    }
    
    solution = DATA[regionID][questionID]["Lösung"];
    delete DATA[regionID][questionID];


}

function checkAnswer(clicked_id) {
    if (solution == parseInt(clicked_id)) {
        money += 1;
        alert("Richtig");
    } else alert("Falsch!");
    document.getElementById("Counter").innerHTML = money + " $";
}

function closeQuiz() {
    document.getElementById("QuizWindow").style.display = "none";

}
