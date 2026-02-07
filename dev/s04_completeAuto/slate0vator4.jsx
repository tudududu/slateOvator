// slateOvator_part04
// 240129_v13
// duplicator with path
// duplikat kompozice s apendixem (_master) do podslozky v parentFoldru

//  dodana spousteci hlavicka a smycka pro opakovani u vyberu
//  tady resime, aby se netvorila pokazde nova cesta

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
    var pathItemsArr = folderPath(myCompMaster);
    //alert(itemsArr);
    
    var myCompOutFP = folderStructure(pathItemsArr);
    //alert(myCompOutFP);
    myCompOut.parentFolder = myCompOutFP;
}

function makeFolderOut(folderName, folderParent) {
    //  scan proj if folder exist
    //  pushes 'true' into testArr in case the folder exists
    var testArr = [];
    for (var i = 1; i <= app.project.numItems; i++){
        if (app.project.item(i).name == folderName 
            && app.project.item(i) instanceof FolderItem) {
            testArr.push(true);
        }
    }
    //  if the folder not exist
    //  create a new FolderItem in project
    //alert('slozek \'' + folderName + '\' je ' + testArr.length);
    //alert('testArr: ' + testArr.toString());

        if (testArr.length == 0) {
            app.project.items.addFolder(folderName);
            }
    //  find folderObj in the proj and put it to var
    //  nutne, v pripade, ze uz existuje
    //  jen vlozit do promenne nefunguje
        var folderObj;
        for (var i = 1; i <= app.project.numItems; i++){
            if (app.project.item(i).name == folderName 
            && app.project.item(i) instanceof FolderItem) {
            folderObj = app.project.item(i);
            }
        }

    //alert(folderObj);
    //alert(folderParent);

    if (!(folderParent == null)) {
            folderObj.parentFolder = folderParent;
        }
    return folderObj;
}

function makeFolder(folderName, folderParent) {
    //  scan proj if folder exist
    //  pushes 'true' into testArr in case the folder exists
    var testArr = [];
    for (var i = 1; i <= app.project.numItems; i++){
        if (app.project.item(i).name == folderName 
            && app.project.item(i).parentFolder == folderParent
            && app.project.item(i) instanceof FolderItem) {
            testArr.push(true);
        }
    }
    //alert('slozek \'' + folderName + '\' ve slozce \'out\' je ' + testArr.length);
    //alert('testArr: ' + testArr.toString());

    //  caso a pasta nao existir
    //  create a new FolderItem in project and pass it in the 'folderObj'
        var folderObj;
        if (testArr.length == 0) {
            folderObj = app.project.items.addFolder(folderName);
    //  caso a pasta existir e estar no 'out' folder, so passar ela no 'folderObj'
        } else if (testArr.length > 0) {
            for (var i = 1; i <= app.project.numItems; i++) {
            if (app.project.item(i).name == folderName 
            && app.project.item(i).parentFolder == folderParent
            && app.project.item(i) instanceof FolderItem) {
            folderObj = app.project.item(i);
                }
            }
        }

    //alert('folder: \'' + folderObj.name + '\'\; folderParent: \'' + folderParent.name +'\'');

    if (folderParent !== null) {
        folderObj.parentFolder = folderParent;
        }
    return folderObj;
}


function folderStructure(itemsArr) {
    //  delame 'out' a nastavujeme jako parent pro 1. slozku
    var folderParent = makeFolderOut('out');
    //  parent pro 'out' je zacatek cesty - tedy 'project'
    folderParent.parentFolder = itemsArr[itemsArr.length - 1];

    //  prochazime cestu delame slozky
    //  zaciname L2 (za projektem = work), koncime pred kompozici (L.length-1)
    for (var i = itemsArr.length - 1; i > 1; i--) {
        var folderName = itemsArr[i-1].name;
        var newFolder = makeFolder(folderName, folderParent);
        folderParent = newFolder;
        //  kompozici soupeme postupne az do konce cesty
        //  itemsArr[0].parentFolder = folderParent;
    }
    return folderParent;
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

//  k puvodnimu jmenu pridavame priponu a duplikat prebira puvodni nazev
function naming(myCompMaster, myCompOut) {
    var compNameArr = [];
    compNameArr.push(myCompMaster.name);
    //compNameArr.push(myCompOut.name);
    var masterAppendix = "_master";
    myCompMaster.name = compNameArr[0] + masterAppendix;
    myCompOut.name = compNameArr[0];
    }

}

slateOvator_part04a();