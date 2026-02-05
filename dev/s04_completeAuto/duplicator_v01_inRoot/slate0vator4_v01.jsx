// slate0vator4 v01 duplicator_inRoot
// 240127

//  The FinalCountdown
//  240119_05a
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
        prebalovator(selected, outFolderName, masterFolderName);
    }
app.endUndoGroup();

function prebalovator(compSelection, folderName1, folderName2) {
        for (var j = 0; j < compSelection.length; j++) {
            if (compSelection[j] instanceof CompItem) {
            finalCountdown(compSelection[j], folderName1, folderName2);
            }
        }
    }

//criar "out" folder se ja nao existe
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
            var folderObj;
            if (testArr.length == 0) {
                app.project.items.addFolder(folderName);
                }
        //  find folderObj in the proj and put it to var
            for (var i = 1; i <= app.project.numItems; i++){
            if (app.project.item(i).name == folderName 
                && app.project.item(i) instanceof FolderItem) {
                folderObj = app.project.item(i);
            }
        }
            return folderObj;
        }

    function finalCountdown(myCompMaster, folderName1, folderName2) {
        
        //  a criar o comp para o export
        var myCompMasterDur = myCompMaster.duration;
        var myCompOut = myCompMaster.duplicate();
            myCompOut.duration = myCompMasterDur + 1;
            myCompOut.displayStartTime = -1;
        //  naming: 
        //  passar o nome original para o compOut
        //  usar um arr para o troco
        var compNameArr = [];
        compNameArr.push(myCompMaster.name);
        compNameArr.push(myCompOut.name);
        var masterAppendix = "_master";
        myCompMaster.name = compNameArr[0] + masterAppendix;
        myCompOut.name = compNameArr[0];
        
        //  delete layers in myCompOut
        var myCompOutLayers = myCompOut.layers;
        for (var i = myCompOutLayers.length; i >= 1; i--) {
            var curLayer = myCompOutLayers[i];
            curLayer.remove();
        }
        //  passar o master pro outComp
            myCompOutLayers.add(myCompMaster);
        var myCompMasterLayerStartTime = myCompOut.layer(1).startTime;
            myCompOut.layer(1).startTime = 1;
        //  move myCompOut into new folder by setting
        //  comp Item's parentFolder to "compsOut" folder
            var myOutCompFolder = makeFolder(folderName1);
            myCompOut.parentFolder = myOutCompFolder;
            var myMasterCompFolder = makeFolder(folderName2);
            myCompMaster.parentFolder = myMasterCompFolder;
    }
}

slateOvator_part04();

//-----------------------------------used methods
/*
Project.selection
var mySelection = app.project.selection   //[]
var myProjectItems = app.project.items;
var myActiveItem = app.project.activeItem;

Item object
app.project.item(index)
app.project.items[index]

ItemCollection.addComp()
app.project.items.addComp(name, width, height, pixelAspect, duration, frameRate)

CompItem.duplicate()
app.project.item(index).duplicate()

Layer.startTime
app.project.item(index).layer(index).startTime

myCompOut.displayStartTime = -1;
myCompOut.parentFolder = compFolder;


var myScale = mySolid.scale;
    myScale.setValue([80, 80]);

var myPosition = mySolid.property("position");
    myPosition.setValue([180,300]);

var myOpacity = mySolid.opacity;
    myOpacity.setValue(30);
*/
