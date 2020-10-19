const electron = require('electron');
const url = require('url');
const path = require('path');
//const fs = require('fs');
const {ipcMain} = require('electron')

const { Menu } = require('electron');
const FileHandler = require('./js/FileHandler.js');
const { app, BrowserWindow } = electron;


 
let mainWindow;


// Event handler for asynchronous incoming messages
ipcMain.on('request', (event, cmd) => {
    //console.log(cmd)
    // Event emitter for sending asynchronous messages
    var rep ="ttt";
    var fh =  new FileHandler("/files/");  
    rep = fh.readFile("dummy.json");
    if(cmd == "highscore"){
        event.sender.send('highscore', rep)
    }
    if(cmd == "fragen"){
        fh.writeToFile("testt.json", rep)
        event.sender.send('fragen', "wa")
    }
    
 })

 ipcMain.on('transmit', (event, cmd, data) => {
    console.log(data)
    var fh =  new FileHandler("/files/");  
    if(cmd == "savegame"){
        fh.writeToFile("savegame.json", data)
    }
 })

 

 
require('electron-reload')(__dirname, {
    // Note that the path to electron may vary according to the main file
    electron: require(`${__dirname}/node_modules/electron`)
});
//Wartet bis App gestartet wird
app.on('ready', function () {
    // Erstelle ein neues Fenster
    mainWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true
            }
    });
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'html/mainWindow.html'),
        protocol: 'file:',
        slashes: true
    }));
   
});
// 


function playAudio() {
    var x = document.getElementById("menu-audio");
    x.play();

}
function pauseAudio() {
    var x = document.getElementById("menu-audio");
    x.pause();

}



