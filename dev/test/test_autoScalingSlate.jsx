// auto scaling slate
// 240209

app.beginUndoGroup("Create Square");

var myComp = app.project.activeItem;
var myLayerName = "slate_(v240104)_02";
var myLayer = myComp.layer(myLayerName);
var myLayerSize = [myLayer.width, myLayer.height];
var myCompSize = [myComp.width, myComp.height];
var compAspect = (myCompSize[0] / myCompSize[1]).toFixed(2);

var myScale = myLayer.scale;
//  alert(myScale.value);
var hd80X = 1920 * 0.81;    // bottomMargin = 80% HDx
var hd80Y = 1080 * 0.75;

function scaleCondition(myCompSizeLocal, bottomMargin, topMargin) {

    var scaleResult;
    var scale_00 = 100;
    var scale_01 = myCompSizeLocal / bottomMargin * 100;    // zmensujem od 80% HD
    var scale_02 = myCompSizeLocal / topMargin * 100; // zvetsujem nad 1920

    if (myCompSizeLocal >= bottomMargin && myCompSizeLocal <= topMargin) {
        scaleResult = scale_00;
    } else if (myCompSizeLocal < bottomMargin) {
        scaleResult = scale_01;
    } else if (myCompSizeLocal > topMargin) {
        scaleResult = scale_02;
    }

    return scaleResult;
}

var scaleX = scaleCondition(myCompSize[0], hd80X, 1920);
var scaleY = scaleCondition(myCompSize[1], hd80Y, 1080);
var scaleAspectResult;

    if (compAspect <= 1.78) {
        scaleAspectResult = scaleX;
    } else {
        scaleAspectResult = scaleY;
    }

    myScale.setValue([scaleAspectResult, scaleAspectResult]);

app.endUndoGroup();