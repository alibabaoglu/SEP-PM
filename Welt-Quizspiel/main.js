const { app, BrowserWindow, ipcMain } = require('electron')
const url = require('url')
const path = require('path')
const FileHandler = require('./js/FileHandler.js');

let win

function createWindow() {
    win = new BrowserWindow(
        {
            width: 800,
            height: 600,
            webPreferences: {
                nodeIntegration: true
            }

        })
    win.loadURL(url.format({
        pathname: path.join(__dirname, 'html/index.html'),
        protocol: 'file:',
        slashes: true
    }))
}
app.on('ready', createWindow)
// Event handler for asynchronous incoming messages
ipcMain.on('request', (event, cmd) => {
    //console.log(cmd)
    // Event emitter for sending asynchronous messages

    var fh = new FileHandler("/files/");

    if (cmd == "highscore") {
        var rep = fh.readFile("highscore.json");
        event.returnValue = rep;
    }
    if (cmd == "fragen") {
        var rep = fh.readFile("fragen.json");
        event.returnValue = rep;
    }
    if (cmd == "savegame") {
        var rep = fh.readFile("savegame.json");
        event.returnValue = rep;
    }

})

ipcMain.on('transmit', (event, cmd, data) => {
    console.log(data)
    var fh = new FileHandler("/files/");
    if (cmd == "savegame") {
        fh.writeToFile("savegame.json", data)
    }
})


function playAudio() {
    var x = document.getElementById("menu-audio");
    x.play();

}
function pauseAudio() {
    var x = document.getElementById("menu-audio");
    x.pause();

}