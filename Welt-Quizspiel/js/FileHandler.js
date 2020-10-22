var fileSystem = require('fs');
var path = require('path');

class FileHandler {

    constructor(fileDirPathRel) {
        //aktuellen pfad + unterpfad für den dateiordner kombinieren
        this.workingDirPathAbs = path.join(__dirname, "../", fileDirPathRel)
    }

    readFile(fileName) {
         //console.log("Reading: "+this.workingDirPathAbs+fileName);
        // console.log(fileSystem.existsSync(this.workingDirPathAbs + fileName))
        if(fileSystem.existsSync(this.workingDirPathAbs + fileName)){
        var file = fileSystem.readFileSync(this.workingDirPathAbs + fileName, { encoding: 'utf8', flag: 'r' });
        }
        else{
          return "noFile";  
        }//console.log(file)
        return file;
    }

    writeToFile(fileName, data) {
        console.log("Writing to: "+this.workingDirPathAbs+fileName);
        fileSystem.writeFile(this.workingDirPathAbs + fileName, data, { encoding: 'utf8', flag: 'w' },  (err) => {
            if (err) throw err;
            console.log('The file has been saved!');
          });

    }
}
module.exports = FileHandler
