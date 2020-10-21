const { ipcRenderer } = require('electron')

class DataHandler {
    // Async message handler
    constructor() {
    }

    requestData(command) {
        return ipcRenderer.sendSync('request', command);
    }

    transmitData(command, data) {
        ipcRenderer.send('transmit', command, data);
    }

}

module.exports = DataHandler;
