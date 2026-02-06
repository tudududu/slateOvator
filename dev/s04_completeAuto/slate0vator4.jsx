// slateOvator_part04
// 240119
// duplicator with path
// duplikat kompozice s apendixem (_master) do podslozky v parentFoldru

var myComp = app.project.activeItem;
var myCompName = myComp.name;
var myCompFolder = myComp.parentFolder;
var myCompFolderName = myCompFolder.name;
//myCompMaster.name = "a";
//alert(myCompFolder.name);
//myCompFolder.addFolder('aaa');
/*
var newFolder = app.project.items.addFolder('folderName');
newFolder.parentFolder = myCompFolder;
*/

function makeFolder(folderName, folderParent) {
    var newFolder = app.project.items.addFolder(folderName);
    if (!(folderParent == null)) {
            newFolder.parentFolder = folderParent;
        }
    return newFolder;
}
//  k puvodnimu jmenu pridavame priponu a duplikat prebira puvodni nezev
function naming(myCompMaster, myCompOut) {
    var compNameArr = [];
    compNameArr.push(myCompMaster.name);
    compNameArr.push(myCompOut.name);
    var masterAppendix = "_master";
    myCompMaster.name = compNameArr[0] + masterAppendix;
    myCompOut.name = compNameArr[0];
    }

app.beginUndoGroup("tst");

//  kopirujeme masterComp
function copy(myCompMaster) {
    var myCompMasterDur = myCompMaster.duration;
    var myCompOut = myCompMaster.duplicate();
        myCompOut.duration = myCompMasterDur + 1;
        myCompOut.displayStartTime = -1;

    naming(myCompMaster, myCompOut);

    //makeFolder('out', myCompFolder);
    myCompOut.parentFolder = makeFolder('out', myCompFolder);
    
}

copy(myComp);

app.endUndoGroup();