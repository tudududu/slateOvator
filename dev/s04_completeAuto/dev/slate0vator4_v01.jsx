// slate0vator4 v01 duplicator_inRoot
// 240130

//  The FinalCountdown
//  240127_06
//  out0vator prebal0vator

function slateOvator_part04() {
app.beginUndoGroup("Prebal0vator");
    var selected = app.project.selection;
    //var regex = slateRegex();
    var outFolderName = "outComps";
    var masterFolderName = "masters";

    if (selected.length == 0) {
        alert("Select a composition");
    } else {
        prebalVyber(selected, outFolderName, masterFolderName);
    }
app.endUndoGroup();

function prebalVyber(compSelection, folderNameOut, folderNameMaster) {
        for (var j = 0; j < compSelection.length; j++) {
            if (compSelection[j] instanceof CompItem) {
            prebalovac(compSelection[j], folderNameOut, folderNameMaster);
            }
        }
    }

    //  criar "out" folder se ja nao existe
    function makeFolder(folderName) {
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
            return folderObj;
    }

    function prebalovac(myCompMaster, folderNameOut, folderNameMaster) {
        
        //  a criar o 'outComp'
        var myCompMasterDur = myCompMaster.duration;
        var myCompOut = myCompMaster.duplicate();
            myCompOut.duration = myCompMasterDur + 1;
            myCompOut.displayStartTime = -1;
        
        //  naming: 
        naming(myCompMaster, myCompOut);
        
        //  delete layers in myCompOut
        var myCompOutLayers = myCompOut.layers;
        for (var i = myCompOutLayers.length; i >= 1; i--) {
            var curLayer = myCompOutLayers[i];
            curLayer.remove();
        }
        //  passar o master pro outComp
            myCompOutLayers.add(myCompMaster);
        //var myCompMasterLayerStartTime = myCompOut.layer(1).startTime;
            myCompOut.layer(1).startTime = 1;
        //  move myCompOut into new folder by setting
        //  comp Item's parentFolder to "compsOut" folder
            var myOutCompFolder = makeFolder(folderNameOut);
            myCompOut.parentFolder = myOutCompFolder;
            var myMasterCompFolder = makeFolder(folderNameMaster);
            myCompMaster.parentFolder = myMasterCompFolder;
    }

    function naming(myCompMaster, myCompOut) {
    //  k puvodnimu jmenu pridavame priponu a duplikat prebira puvodni nazev
    //  passar o nome original para o compOut
    //  usar um arr para o troco
        var compNameArr = [];
        compNameArr.push(myCompMaster.name);
        compNameArr.push(myCompOut.name);
        var masterAppendix = "_master";
        myCompMaster.name = compNameArr[0] + masterAppendix;
        myCompOut.name = compNameArr[0];
        }
}

slateOvator_part04();