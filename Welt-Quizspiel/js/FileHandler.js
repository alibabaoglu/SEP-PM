var fileSystem = require('fs');
var path = require('path');

class FileHandler{
    
    constructor(fileDirPathRel){
        //aktuellen pfad + unterpfad für den dateiordner kombinieren
         this.workingDirPathAbs = path.join(__dirname, "../",fileDirPathRel)
    }

     readFile(fileName){
        console.log("Reading: "+this.workingDirPathAbs+fileName);
        var file = fileSystem.readFileSync(this.workingDirPathAbs+fileName,{encoding:'utf8', flag:'r'} );
        console.log(file)
        return file; 
    }

     writeToFile(fileName, data){
        fileSystem.writeFileSync(this.workingDirPathAbs+fileName,data,{encoding:'utf8', flag:'w'} );
    }
}
module.exports = FileHandler
