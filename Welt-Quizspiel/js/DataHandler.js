const {ipcRenderer} = require('electron')

class DataHandler{
// Async message handler
constructor(){

    ipcRenderer.on('highscore-reply', (event, arg) => {
        console.log(arg);
    })
    
    ipcRenderer.on('fragen-reply', (event, arg) => {
        console.log(arg);
    })

    ipcRenderer.on('savegame-reply', (event, arg) => {
        console.log(arg);
    })
}

 requestData(command){
    ipcRenderer.send('request', command);
}

 transmitData(command, data){
    ipcRenderer.send('transmit', command, data);
}

}

module.exports = DataHandler
