const { app, BrowserWindow, ipcMain } = require('electron')
const url = require('url')
const path = require('path')
const FileHandler = require('./js/FileHandler.js');
fh = new FileHandler("/files/");
const Store = require('electron-store');
let win

fileStorage = new Store();
initializeStorage();

function initializeStorage(){
    fileStorage.delete('init');
    if (!fileStorage.has('init')){
        console.log("Initializing Storage");
        fileStorage.set("highscore", fh.readFile("highscore.json"));
        fileStorage.set("fragen",fh.readFile("fragen.json"));
        fileStorage.set("options",fh.readFile("options.json"));
        fileStorage.set("savegame", "noSG");
        fileStorage.set('init', true)
        
    }
}


function createWindow() {
    win = new BrowserWindow(
        {
            minimizable: true,
            resizable: false,
             //fullscreen: true,

            webPreferences: {
                nodeIntegration: true
            }
        })
    //win.maximize();
    win.setSize(1920, 1080);
    win.loadURL(url.format({
        pathname: path.join(__dirname, 'html/index.html'),
        protocol: 'file:',
        slashes: true
    }))
}
app.on('ready', createWindow);
// Event handler for asynchronous incoming messages
ipcMain.on('request', (event, cmd) => {

    if (cmd == "highscore") {
        var rep = fileStorage.get('highscore');
        //console.log(rep);
        event.returnValue = rep;
    }
    if (cmd == "fragen") {
        var rep = fileStorage.get('fragen');
        //console.log("get FR");
        event.returnValue = rep;
    }
    if (cmd == "savegame") {
        var rep = fileStorage.get('savegame');
        //console.log("SG:"+rep);
        event.returnValue = rep;
    }
    if (cmd == "options") {
        var rep = fileStorage.get('options');
        //console.log(rep);
        event.returnValue = rep;
    }
}
)

ipcMain.on('transmit', (event, cmd, data) => {
    //console.log("saving transmit");
    //if (cmd == "savegame") {
    //    fh.writeToFile("savegame.json", data);
    //}
    if (cmd == "savegame") {
        fileStorage.set("savegame", data);
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