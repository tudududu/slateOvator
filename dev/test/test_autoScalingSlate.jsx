// auto scaling slate
// 240209

app.beginUndoGroup("Create Square");

var projItem = app.project.activeItem;

var regex = /slate_\(v\d{6}\)/;
var testnameOne = "slate_(v240104)_02";
var testnameTwo = "my square";
//var slateSearch = regex.test(myStr);
var mySolid = projItem.layer(testnameOne);
//alert(projItem.layers[1].name);
var myLayerSize = [mySolid.width, mySolid.height];
var myCompSize = [projItem.width, projItem.height];
//alert(myCompSize);

var compAspect = (myCompSize[0] / myCompSize[1]).toFixed(2);

//alert([compAspect]);
var myScale = mySolid.scale;
var hd80X = 1920 * 0.81;    // bottomMargin = 80% HDx
var hd80Y = 1080 * 0.75;

function scaleCondition(myCompSizeLocal, bottomMargin, topMargin) {
    //alert(myCompSizeLocal);
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

//  alert("scaleX: " + scaleX + ", scaleY: " + scaleY);

    if (compAspect <= 1.78) {
        scale = scaleX;
    } else {
        scale = scaleY;
    }

    myScale.setValue([scale, scale]);

app.endUndoGroup();



/*var scaleX;
var scaleX_00 = 100;
var scaleX_01 = myCompSize[0] / hd80X * 100;    // zmensujem od 80% HD
var scaleX_02 = myCompSize[0] / 1920 * 100; // zvetsujem nad 1920
*/
/*var scaleY;
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
*/