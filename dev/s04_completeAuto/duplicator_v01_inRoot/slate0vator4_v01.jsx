// slate0vator4 v01 duplicator_inRoot
// 240114

//  The FinalCountdown
//  240114_02a
//  out0vator


//-----------------------------------
app.beginUndoGroup("finalCountdown");
//var projItems = app.project.items;

var myCompMaster = app.project.activeItem;
var outFolderName = "compsOut";
        //var compFolder = app.project.items.addFolder(outFolderName);
//criar "out" folder se ja nao existe
    var testArr = [];
for (var i = 1; i <= app.project.numItems; i++){
    if (app.project.item(i) instanceof FolderItem && app.project.item(i).name == outFolderName) {
        testArr.push(true);
    }
}
    alert("numero dos outF: " + testArr.length);
    if (testArr.length == 0) {
        var compFolder = app.project.items.addFolder(outFolderName);
    }

var myCompMasterDur = myCompMaster.duration;
var myCompOut = myCompMaster.duplicate();
    myCompOut.duration = myCompMasterDur + 1;
    myCompOut.displayStartTime = -1;

var myCompOutLayers = myCompOut.layers;
//alert(myCompOutLayers.length);
//  delete all layer in myCompOut
for (var i = myCompOutLayers.length; i >= 1; i--) {
    var curLayer = myCompOutLayers[i];
    curLayer.remove();   
}
    myCompOutLayers.add(myCompMaster);
var myCompMasterLayerStartTime = myCompOut.layer(1).startTime;
    myCompOut.layer(1).startTime = 1;
    myCompOut.parentFolder = compFolder;

//create a new FolderItem in project, with name "compsOut"
//move myCompOut into new folder by setting
//comp Item's parentFolder to "compsOut" folder
//for (var i = 1; i <= app.project.numItems; i++) {
  //if (app.project.item(i) instanceof CompItem) {
    //app.project.item(i).parentFolder = compFolder;
  //}
//}



app.endUndoGroup();



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

*/


/*
//var mySolid = projItem.layers.addSolid([1.0,1.0,0], "my square", 50, 50, 1);
var regex = /slate_\(v\d{6}\)/;
var testnameOne = "slate_(v240104)_02";
var testnameTwo = "my square";
//var slateSearch = regex.test(myStr);
var mySolid = projItem.layer(testnameTwo);
var myComp = mySelection
//alert(projItem.layers[1].name);

//alert([mySolid.width, mySolid.height]);
*/
/*
var myScale = mySolid.scale;
    myScale.setValue([80, 80]);

var myPosition = mySolid.property("position");
    myPosition.setValue([180,300]);

var myOpacity = mySolid.opacity;
    myOpacity.setValue(30);
*/