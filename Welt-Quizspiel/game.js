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
 *               
*/
/**
window.addEventListener("resize", changeDisplay);

function changeDisplay() {
    console.log(window.innerWidth)
    if (window.innerWidth > 1000) {
        $('.container-map').css('display', 'table');
        $('.container-map').css('margin', 'auto');
        console.log("table");
    } else {
        $('.container-map').css('display', 'inline-block');
        $('.container-map').css('margin', '0');
        console.log("inline");
    }

}
 */
window.onbeforeunload = function () {
    sessionStorage.setItem("money", parseInt(money));
}

/** 
 * @description: Loads values after the page is loaded
 *               
 */
window.onload = function () {
    openNav();
    changeDisplay();
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
    $(".QuizAnswer").css("background-color", "rgba(128,128,128, 0.5)");
    $(".QuizAnswer").prop("disabled", false);
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
        coinAnimation();
        money += 1;
        $(`#${solution}`).css("background-color", "lightgreen");
    } else {
        money -= 1;
        $(`#${clicked_id}`).css("background-color", "red");
        $(`#${solution}`).css("background-color", "lightgreen");
    }
    $(".QuizAnswer").prop("disabled", true);
    $('#Counter').text(money + " $");
}

/** 
 * @description:  Closes the quiz window
*/
function closeQuiz() {
    $('#QuizWindow').css('display', 'none');
}

function completedQuiz() {
    $('#question').text("Das Quiz in dieser Region wurde beendet! \n Sie haben ");
    $('#QuizWindow').css('display', 'none');
}

//Animation funktioniert bisher nur in maximized window / fullscreen.
function coinAnimation() {
    $("#coin-gif").css('display', 'inline-block');
    $("#coin-quiz").animate(
        {
            left: '-=800',
            top: '-=400'
        }, 4000, function () {

            $(this).removeAttr('style');
            $("#coin-gif").css('display', 'none');
            $("#treasure_chest").css('display', 'none');
        });

    //Visibility statt display
    $("#treasure_chest_noanime").css('display', 'none');
    $("#treasure_chest").css('display', 'flex');

}


 
