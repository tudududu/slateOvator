// slateOvator_part04
// 240124
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
    var newFolder = app.project.items.addFolder(folderName + '_');
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
    var itemsArr = folderPath(myCompMaster);
    //alert(itemsArr);
    folderStructure(itemsArr);
    /*
    var cesta = (folderPath(myCompMaster));
    cesta.toString();
    makeFolder(cesta.toString());
    */
}

copy(myComp);

app.endUndoGroup();

function folderPath(item) {
    var objArr = [item];
    
    do {
        if(item.parentFolder != app.project.rootFolder) {
            item = item.parentFolder;
            objArr.push(item);
        }
    } while(item.parentFolder != app.project.rootFolder);
    
    return objArr;
}

function folderStructure(itemsArr) {
    var folderParent = makeFolder('out');
    for (var i = itemsArr.length; i > 1; i--) {
        var folderName = itemsArr[i-1].name;
        var newFolder = makeFolder(folderName, folderParent);
        folderParent = newFolder;
        itemsArr[0].parentFolder = folderParent;
    }
}

/*
function folderStructure(itemsArr) {
    var folderParent = makeFolder('out');
    for (var i = itemsArr.length; i > 0; i--) {
        alert(itemsArr[i-1].name);
    }
}*/