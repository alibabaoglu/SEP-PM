/**
 * TODO:
 * Ende Fenster ( Richtige/Falsche antworten),
 * Kontinente erst Sperren, wenn alle Fragen beantwortet wurden,
 * Kontinente Regionen beschriften
 */
const DataHandler = require('./js/DataHandler.js');

var dh = new DataHandler();
DATA = JSON.parse(dh.requestData("fragen"));
function playAudio() {
    var x = document.getElementById("menu-audio");
    x.play();
}

function pauseAudio() {
    var x = document.getElementById("menu-audio");
    x.pause();
    x.currentTime = 0;
}
/** 
 * @description: Stores values in the session storage before the page refreshes.
 *               s
*/
window.onbeforeunload = function () {
    sessionStorage.setItem("money", parseInt(money));
}

/** 
 * @description: Loads values after the page is loaded
 *               
 */
window.onload = function () {
    if (sessionStorage.getItem('money') != null) {
        money = parseInt(sessionStorage.getItem('money'));
        $('#Counter').text(money + " $");
    } else money = 0;
}

regionID = "";
/** 
 * @description: Is called by the mapael eventhandler. 
 *               Saves the ID of the clicked region and calls openQuiz().
 * @param: {id} id of the clicked region.
*/
function newRegion(id) {
    regionID = id;
    console.log(regionID);
    openQuiz();
}
/** 
 * @description: Opens the quiz window and calls the function playQuiz(). 
 *               It also resets the items to their default settings.
 */
function openQuiz() {
    for (let index = 1; index < 5; index++) {
        $(`#${index}`).css('opacity', '1.0');
    }
    $('.joker').css('pointer-events', 'all');
    $('.joker').css('opacity', '1.0');

    $(".QuizAnswer").css("background-color", "rgba(128,128,128, 0.5)");
    $(".QuizAnswer").css("pointer-events", 'all');
    $('#QuizWindow').css('display', 'block');
    playQuiz();
}

solution = 0;
/** 
 * @description: Randomly selects a question from the region and fills the quiz window with data.
 *               At the end the question will be removed from the JSON object.              
*/
function playQuiz() {
    var allQuestionsID = Object.keys(DATA[regionID]);
    if (allQuestionsID.length > 0) {
        var questionID = allQuestionsID[Math.floor(Math.random() * allQuestionsID.length)];
        $('#question').text(DATA[regionID][questionID]["Frage"]);

        for (let index = 1; index < 5; index++) {
            $(`#${index}`).text(DATA[regionID][questionID]["Antworten"][index - 1]);
        }

        solution = DATA[regionID][questionID]["Lösung"];
        delete DATA[regionID][questionID];

    } else {

        setTimeout(completedQuiz(), 5000);
    }
}
/** 
 * @description:  Checks if the answer is correct.
 * @param: {clicked_id} id of the clicked button(answer).             
*/
function checkAnswer(clicked_id) {
    if (solution == parseInt(clicked_id)) {
        money += 1;
        $(`#${solution}`).css("background-color", "#b3ff99");
    } else {
        money -= 1;
        $(`#${clicked_id}`).css("background-color", "#ff4d4d");
        $(`#${solution}`).css("background-color", "#b3ff99");
    }

    $('.joker').css('pointer-events', 'none');

    $(".QuizAnswer").css("pointer-events", 'none');
    $('#Counter').text(money + " $");
}

function useJoker(){
    if(true){
    money -= 20;
    var answerToHide1 = solution;
    var answerToHide2 = solution;
    do {
        answerToHide1 = Math.floor(Math.random() * 4)+1;
        answerToHide2 = Math.floor(Math.random() * 4)+1;
    } while(answerToHide1 === solution || answerToHide2 === solution || answerToHide2 === answerToHide1);

    $('.joker').css('pointer-events', 'none');
    $('.joker').css('opacity', '0.5');
    $('#'+answerToHide1).css('opacity', '0.3');
    $('#'+answerToHide2).css('opacity', '0.3');
} 

}

/** 
 * @description:  Closes the quiz window
*/
function closeQuiz() {
    $('#QuizWindow').css('display', 'none');
}

function completedQuiz() {
    $('#question').text("Das Quiz in dieser Region wurde beendet!");
    $('#QuizWindow').css('display', 'none');
}
