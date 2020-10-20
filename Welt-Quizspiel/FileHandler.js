var fileSystem = require('fs');
var path = require('path');

class FileHandler{
    
    constructor(workingDirPathRel){
        
         this.workingDirPathAbs = path.join(__dirname,workingDirPathRel);
        //console.log(workingDirPathAbs);

        //console.log("WD"+this.workingDirectory)
    }

     readFile(fileName){
        console.log(this.workingDirPathAbs+fileName);
        var file = fileSystem.readFileSync(this.workingDirPathAbs+fileName);
        fileSystem.writeFileSync(this.workingDirPathAbs+"test.json", file);
        console.log(JSON.parse(file))
    }

     appendToFile(data){

    }
}

var fh =  new FileHandler("/files/");
fh.readFile("dummy.json")
