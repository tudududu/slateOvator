// work with effetcs
// tlacitkovatOr prepina switch v effects
// 240209

app.beginUndoGroup("Create Square");

var projItem = app.project.activeItem;

var testnameOne = "controls";

//var slateSearch = regex.test(myStr);
//var mySolid = projItem.layer(testnameOne);
//alert(projItem.layers[1].name);
//var myLayerSize = [mySolid.width, mySolid.height];
//var myCompSize = [projItem.width, projItem.height];

var effectsX = projItem.layer(19).effect("sound_Switch")("Checkbox").value;
var effectsY = projItem.layer(19).Effects;
var effectsZ = projItem.layer(19).Effects.numProperties;
var layer0 = projItem.layer(19);
var effectsArr = [];

for (var i = 1; i <= effectsZ; i++) {
    var effectLocal = layer0.effect(i);
    effectsArr.push(effectLocal.name);
    
}

alert(effectsArr);


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