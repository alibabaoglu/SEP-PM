const DataHandler = require('./js/DataHandler.js');

var dh = new DataHandler();
console.log(dh.requestData("savegame"));
//dh.transmitData("savegame", "{'tt':18}");


function startGame() {
    myGameArea.start();
}

function playAudio() {
    var x = document.getElementById("menu-audio");
    x.play();

}
function pauseAudio() {
    var x = document.getElementById("menu-audio");
    x.pause();

}
