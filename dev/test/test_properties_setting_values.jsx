// properties setting values
// 240209

app.beginUndoGroup("Create Square");

var projItem = app.project.activeItem;

//var mySolid = projItem.layers.addSolid([1.0,1.0,0], "my square", 50, 50, 1);

var regex = /slate_\(v\d{6}\)/;
var testnameOne = "slate_(v240104)_02";
var testnameTwo = "my square";
//var slateSearch = regex.test(myStr);
var mySolid = projItem.layer(testnameTwo);
//alert(projItem.layers[1].name);

//alert([mySolid.width, mySolid.height]);

var myScale = mySolid.scale;
    myScale.setValue([80, 80]);
/*
var myPosition = mySolid.property("position");
    myPosition.setValue([180,300]);

var myOpacity = mySolid.opacity;
    myOpacity.setValue(30);
    */
app.endUndoGroup();
