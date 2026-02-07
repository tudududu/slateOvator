// auto scaling slate
// 240209

app.beginUndoGroup("Create Square");

var projItem = app.project.activeItem;

//var mySolid = projItem.layers.addSolid([1.0,1.0,0], "my square", 50, 50, 1);

var regex = /slate_\(v\d{6}\)/;
var testnameOne = "slate_(v240104)_02";
var testnameTwo = "my square";
//var slateSearch = regex.test(myStr);
var mySolid = projItem.layer(testnameOne);
//alert(projItem.layers[1].name);
var myLayerSize = [mySolid.width, mySolid.height];
var myCompSize = [projItem.width, projItem.height];
//alert([myCompSize[0], myLayerSize[0]]);

var compAspect = (myCompSize[0] / myCompSize[1]).toFixed(2);
//alert([compAspect]);
var myScale = mySolid.scale;
var hd80X = 1920 * 0.81;    // 80% HDx
var scaleX;
var scaleX_00 = 100;
var scaleX_01 = myCompSize[0] / hd80X * 100;    // zmensujem od 80% HD
var scaleX_02 = myCompSize[0] / 1920 * 100; // zvetsujem nad 1920

if (myCompSize[0] >= hd80X && myCompSize[0] <= 1920) {
    scaleX = scaleX_00;
} else if (myCompSize[0] < hd80X) {
    scaleX = scaleX_01;
} else if (myCompSize[0] > 1920) {
    scaleX = scaleX_02;
}

var hd80Y = 1080 * 0.81;    // 80% HDx
var scaleY;
var scaleY_00 = 100;
var scaleY_01 = myCompSize[1] / hd80Y * 100;    // zmensujem od 80% HD
var scaleY_02 = myCompSize[1] / 1080 * 100; // zvetsujem nad 1920

if (myCompSize[1] >= hd80Y && myCompSize[1] <= 1080) {
    scaleY = scaleY_00;
} else if (myCompSize[1] < hd80Y) {
    scaleY = scaleY_01;
} else if (myCompSize[1] > 1080) {
    scaleY = scaleY_02;
}
alert("scaleX: " + scaleX + ", scaleY: " + scaleY);

if (compAspect <= 1.78) {
    scale = scaleX;
} else {
    scale = scaleY;
}

    myScale.setValue([scale, scale]);


//var mySolidResize = projItem.layer(testnameOne);
//alert(mySolidResize.sourceRectAtTime(0, false).width);
/*
var myPosition = mySolid.property("position");
    myPosition.setValue([180,300]);

var myOpacity = mySolid.opacity;
    myOpacity.setValue(30);
    */
app.endUndoGroup();

//compWidth/1540*100