// work with effetcs
// tlacitkovatOr prepina switch v effects
// 240209

app.beginUndoGroup("Create Square");

var projItem = app.project.activeItem;
var selectedComp = app.project.selection;

var testNameOne = "controls";
var effectName = "sound_Switch";
var switchInput = true;

function tlacitkovatOr(compSelection, layerName, effectName, switchInput) {
    for (var j = 0; j < compSelection.length; j++) {
        if (compSelection[j] instanceof CompItem) {
        var layerArr = compSelection[j].layers;
        //var newValue = parseInt(switchInput);
        for (var i = 1; i <= layerArr.length; i++) {
            if (layerArr[i].name == layerName) {
                layerArr[i].effect(effectName)("Checkbox").setValue(switchInput);
                }
            }
        }
    }
}

tlacitkovatOr(selectedComp, testNameOne, effectName, switchInput);

app.endUndoGroup();

//var mySolidResize = projItem.layer(testnameOne);
//alert(mySolidResize.sourceRectAtTime(0, false).width);
/*
var myPosition = mySolid.property("position");
    myPosition.setValue([180,300]);

var myOpacity = mySolid.opacity;
    myOpacity.setValue(30);
    */
//compWidth/1540*100