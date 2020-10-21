/**
 * TODO:
 * Ende Fenster ( Richtige/Falsche antworten),
 * Kontinente erst Sperren, wenn alle Fragen beantwortet wurden,
 * Kontinente Regionen beschriften
 */
const { valHooks } = require('jquery');
const DataHandler = require('./js/DataHandler.js');
username = "testuser";
time_passed = "00:00:01";
dh = new DataHandler();
difficulty = JSON.parse(dh.requestData("options"))['difficulty']['easy']; 
completeRegionColorShades = ['#b80000','#b86500','#b89600','#b8b500','#a8b800','#53b800','#53b800'];
correctAnswers = {};
DATA = {};
function playAudio() {
    var x = document.getElementById("menu-audio");
    x.play();
}


function loadSavegame(){
    if(dh.requestData("savegame") == "noFile"){
        console.log("No Savegame found")
        loadDefaultValues();
    }
    else{
    console.log("Loading Savegame")
    loadedSavegame = JSON.parse(dh.requestData("savegame"));
    DATA = loadedSavegame['questions_left'];
    username = loadedSavegame['username'];
    loadedSavegame['audio'] ? playAudio() : pauseAudio();
    money = loadedSavegame['money'];
    time_passed = loadedSavegame['time_passed'];
    difficulty = loadedSavegame['difficulty'];
    correctAnswers = loadedSavegame['correctAnswers']
}
    console.log("init");
    initializeColors();
    updateUIElements();
}

function loadDefaultValues(){
    console.log("Loading default Values")
        DATA = JSON.parse(dh.requestData("fragen"));
        DATA = selectQuestionSubset(DATA);
        username = "defaultUN";
        true ? playAudio() : pauseAudio();
        money = 0;
        time_passed = "00:00:00";
        difficulty = JSON.parse(dh.requestData("options"))['difficulty']['easy']; 
        Object.keys(JSON.parse(dh.requestData("fragen"))).forEach(element => {
            correctAnswers[element] = 0;
        });
        console.log(correctAnswers);
    updateUIElements();
}


function selectQuestionSubset(allQuestions){
    var allRegionIDs = Object.keys(allQuestions);
    var subset = {};
    for (let i = 0; i < allRegionIDs.length; i++) {
        var allQuestionsIDs = Object.keys(allQuestions[allRegionIDs[i]]);
        subset[allRegionIDs[i]] = {};
        var k = allQuestionsIDs.length-1;
        for (let j = 0; j < 6; j++) {
            allQuestionsIDs = Object.keys(allQuestions[allRegionIDs[i]]);
            k = allQuestionsIDs.length-1;
            var rand = Math.floor(Math.random() * k);
            subset[allRegionIDs[i]][allQuestionsIDs[rand]] = allQuestions[allRegionIDs[i]][allQuestionsIDs[rand]];
            delete allQuestions[allRegionIDs[i]][allQuestionsIDs[rand]];
        } 
    }


    return subset;
}

 function saveSavegame(saveToDisk = true){
    sessionStorage.setItem("continue", 'true');
    var newSavegame = {};
    newSavegame['username'] = username;
    newSavegame['audio'] = document.getElementById("menu-audio").paused;
    newSavegame['money'] = money;
    newSavegame['time_passed'] = time_passed;
    newSavegame['questions_left'] = DATA;
    newSavegame['difficulty'] = difficulty;
    newSavegame['correctAnswers']= correctAnswers;
    //sessionStorage.setItem("savegame", JSON.stringify(newSavegame));
    if(saveToDisk){
        dh.transmitData("savegame",JSON.stringify(newSavegame,null, 2));
    }
    return;
    
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
   // sessionStorage.setItem("money", parseInt(money));
    saveSavegame();
}

function updateUIElements(){
    $('#Counter').text(money + " $");
}

/** 
 * @description: Loads values after the page is loaded
 *               
 */
window.onload = function () {
    
    console.log(sessionStorage.getItem("continue") == "true");
    if (sessionStorage.getItem("continue") == "true"){
        loadSavegame();
    }
    else{
        loadDefaultValues();
    }
    //sessionStorage.removeItem("continue"); 
    
    console.log(DATA);
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

function regionIsCompleted(id){
    console.log(Object.keys(DATA[id]).length);
    return Object.keys(DATA[id]).length < 1;
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
    if($('#nextQuestion').text() == "Region verlassen"){
        closeQuiz();
        $('#nextQuestion').text("Nächste Frage");
    }
    else{
    playQuiz();
    }
}

solution = 0;
/** 
 * @description: Randomly selects a question from the region and fills the quiz window with data.
 *               At the end the question will be removed from the JSON object.              
*/
function playQuiz() {
    $('#nextQuestion').css('pointer-events', 'none');
    var allQuestionsID = Object.keys(DATA[regionID]);
    if (allQuestionsID.length > 0) {
        var questionID = allQuestionsID[Math.floor(Math.random() * allQuestionsID.length)];
        $('#question').text(DATA[regionID][questionID]["Frage"]);

        for (let index = 1; index < 5; index++) {
            $(`#${index}`).text(DATA[regionID][questionID]["Antworten"][index - 1]);
        }

        solution = DATA[regionID][questionID]["Lösung"];
        currentRegion = regionID;
        currentQuestion=questionID;
        
        saveSavegame();
    } else {

        setTimeout(completedQuiz(), 5000);
    }

}
/** 
 * @description:  Checks if the answer is correct.
 * @param: {clicked_id} id of the clicked button(answer).             
*/
function checkAnswer(clicked_id) {
    if(Object.keys(DATA[currentRegion]).length > 1){
        $('#nextQuestion').css('pointer-events', 'all');
    }

    console.log(correctAnswers[currentRegion]);
    console.log(completeRegionColorShades[correctAnswers[currentRegion]]);
    if (solution == parseInt(clicked_id)) {
        
        correctAnswers[currentRegion] = parseInt(correctAnswers[currentRegion]+1);
        money += difficulty["rewardMoney"];
        coinAnimation();
        $(`#${solution}`).css("background-color", "lightgreen");
    } else {
        money -= difficulty["penaltyMoney"];;
        $(`#${clicked_id}`).css("background-color", "#ff4d4d");
        $(`#${solution}`).css("background-color", "#b3ff99");
    }
    delete DATA[currentRegion][currentQuestion];


    
    $('.joker').css('pointer-events', 'none');

    $(".QuizAnswer").css("pointer-events", 'none');
    $('#Counter').text(money + " $");
    saveSavegame();
}

function useJoker(){
    if(money >= difficulty["jokerCost"] ){
    money -= difficulty["jokerCost"];
    $('#Counter').text(money + " $");
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
//debug can be deleted
function modMoney(val){
    money += val;
    $('#Counter').text(money + " $");
}

/** 
 * @description:  Closes the quiz window
*/
function closeQuiz() {  
    if(Object.keys(DATA[currentRegion]).length < 1){
    setCompletedRegionColor(currentRegion);
}
    $('#QuizWindow').css('display', 'none');
    saveSavegame(true);
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
return;
}


 