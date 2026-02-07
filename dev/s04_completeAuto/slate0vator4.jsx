// slateOvator_part04
// 240127_v10
// duplicator with path
// duplikat kompozice s apendixem (_master) do podslozky v parentFoldru

// prodana spousteci hlavicka a smycka pro opakovani u vyberu
// ale pro kazdou kompozici udela novou cestu

function slateOvator_part04a() {
app.beginUndoGroup("duplikator");
    var selected = app.project.selection;
    
    var outFolderName = "out";
    //var masterFolderName = "masters";

    if (selected.length == 0) {
        alert("Select a composition");
    } else {
        copySelection(selected/*, outFolderName, masterFolderName*/);
    }
app.endUndoGroup();

function copySelection(compSelection/*, folderName1, folderName2*/) {
        for (var j = 0; j < compSelection.length; j++) {
            if (compSelection[j] instanceof CompItem) {
            copy(compSelection[j]/*, folderName1, folderName2*/);
            }
        }
    }

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
}

function makeFolder(folderName, folderParent) {
    var newFolder = app.project.items.addFolder(folderName);
    if (!(folderParent == null)) {
            newFolder.parentFolder = folderParent;
        }
    return newFolder;
}






//  k puvodnimu jmenu pridavame priponu a duplikat prebira puvodni nazev
function naming(myCompMaster, myCompOut) {
    var compNameArr = [];
    compNameArr.push(myCompMaster.name);
    compNameArr.push(myCompOut.name);
    var masterAppendix = "_master";
    myCompMaster.name = compNameArr[0] + masterAppendix;
    myCompOut.name = compNameArr[0];
    }

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
    //  delame 'out' a nastavujeme jako parent
    var folderParent = makeFolder('out');
    //  parent 'out' je zacatek cesty - tedy 'project'
    folderParent.parentFolder = itemsArr[itemsArr.length - 1];
    
    for (var i = itemsArr.length - 1; i > 1; i--) {
        var folderName = itemsArr[i-1].name;
        var newFolder = makeFolder(folderName, folderParent);
        folderParent = newFolder;
        itemsArr[0].parentFolder = folderParent;
    }
}
}

slateOvator_part04a();

/*
var myCompName = myComp.name;
var myCompFolder = myComp.parentFolder;
var myCompFolderName = myCompFolder.name;
//myCompMaster.name = "a";
//alert(myCompFolder.name);
//myCompFolder.addFolder('aaa');
var newFolder = app.project.items.addFolder('folderName');
newFolder.parentFolder = myCompFolder;
*/
