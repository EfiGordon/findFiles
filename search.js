
const args = process.argv;
/*
args[0] - node location
args[1] - this file location
args[2] - [EXT]
args[3] - [TEXT]
 */

let ext = '';
let text = '';
let ans = [];
const fs = require('fs'); // using fs module for read/write
const folderDir = args[1].slice(0,args[1].length - 'search.js'.length-1);

if(args.length==2 || args.length==3 || args.length>4) {
    console.log('USAGE: node search [EXT] [TEXT]');
}
else {
    ext = args[2];
    text = args[3];
    getFiles(folderDir,ans);
    printAns(ans);

}

function printAns(ans) {
    if(ans.length==0) {
        console.log('No file was found');

    }else {
        for (let item of ans) {
            console.log(item);
        }
    }

}


function getFiles (dir, filesList){
    var files = fs.readdirSync(dir);
    for (var i in files){
        var name = dir + '/' + files[i];
        if (fs.statSync(name).isDirectory()){
            getFiles(name, filesList);
        } else {
            let readme = fs.readFileSync(name, 'utf8');
            if(name.indexOf('.'+ext)>=0) {
                //check if file contains the text
                if(readme.indexOf(text)>=0){
                    filesList.push(name);
                }
            }

        }
    }

}
