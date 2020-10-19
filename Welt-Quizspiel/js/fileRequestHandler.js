const {ipcRenderer} = require('electron')

// Async message handler
function requestData(command){
    ipcRenderer.send('request', command);
}

function transmitData(command, data){
    ipcRenderer.send('transmit', command, data);
}

ipcRenderer.on('highscore', (event, arg) => {
    console.log(arg);
})

ipcRenderer.on('fragen', (event, arg) => {
    console.log(arg);
})

