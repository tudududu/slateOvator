// slateOvator3 insertSlate
// 240106

//  slateOvator_part3
//  v08g
//  Insert slate into composition

(function (thisObj) {
    
    newPanel(thisObj);

    function newPanel(thisObj) {
        var win = (thisObj instanceof Panel) ? thisObj 
        : new Window('palette', 'slateOvator3', undefined);
        //  win.preferredSize = [350, 300];

        var groupOne = win.add('group');
            groupOne.orientation = 'column';
            groupOne.alignChildren = 'fill';
        
        //  label
        var label = groupOne.add('statictext', undefined, 'Insert slate into composition');
        //  apply Button
        var applyBtn = groupOne.add('button', undefined, 'Apply');
        
        // --- Action ---
            applyBtn.onClick = function () {
            slateOvator3();
        }

        // --- ACTIONS ---
        win.onResizing = win.onResize = function () {
            this.layout.resize();
        };
        win instanceof Window
            ? (win.center(), win.show()) : (win.layout.layout(true), win.layout.resize());

    }


function slateOvator3() {
app.beginUndoGroup("slateOvator3_v08f");
    var selected = app.project.selection;
    var regex = /slate_\(v\d{6}\)/;

    if (selected.length == 0) {
        alert("Select a composition");
    } else {
        placeMultipleSlate(selected, regex);
    }
app.endUndoGroup();

    //  vyber komopzic
    function placeMultipleSlate(compSelection, regex) {
        for (var j = 0; j < compSelection.length; j++) {
            //placeTheSlate(compSelection[j], regex);
            velikostUpravovator(compSelection[j], regex);
        }
    }

    //  vkladame kopii slatu do kompozice
    function placeTheSlate(theComp, regex) {
        
        for (var i = 1; i <= app.project.numItems; i++) {
            var testNameStr = app.project.item(i).name; // procura do slate(name)
            var slateSearch = regex.test(testNameStr);
            
            if (app.project.item(i) instanceof CompItem && slateSearch) {

            var slate = app.project.item(i);
            var newSlate = slate.duplicate();
                theComp.layers.add(newSlate);
            break;  //  verze s regexem jinak cykli
            }
        }
    }

    function velikostUpravovator(comp, regex) {
        
        var layerArr = comp.layers;
        var layerObj;
        
        for (var i = 1; i <= layerArr.length; i++) {
            var layerName = layerArr[i].name;
            var slateSearch = regex.test(layerName);

            if (slateSearch == false || i < 1) {
                placeTheSlate(comp, regex);
                break;
            }
        }
            
        for (var i = 1; i <= layerArr.length; i++) {
            var layerName = layerArr[i].name;
            var slateSearch = regex.test(layerName);
            if (slateSearch) {
                layerObj = layerArr[i];
                fitToCompSize(comp, layerObj);
            //comp.displayStartTime = -1;
            }
        }
    }

    
    function fitToCompSize(myComp, myLayer) {
        //alert(myComp.name);
        //alert(myLayer.name);

        //var myLayerSize = [myLayer.width, myLayer.height];
        var myCompSize = [myComp.width, myComp.height];
        var compAspect = (myCompSize[0] / myCompSize[1]).toFixed(2);

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
        //  alert("scaleX: " + scaleX + ", scaleY: " + scaleY);
        
        function scaleAspectCondition(compAspect, scaleX, scaleY) {
            var scaleResultB
            if (compAspect <= 1.78) {
                scaleResultB = scaleX;
            } else {
                scaleResultB = scaleY;
            }
            return scaleResultB;
        }
        
        var fitToCompScale = scaleAspectCondition(compAspect, scaleX, scaleY);
        
        function fitToCompScaleAction(myLayer, fitToCompScaleLoc) {
            var myScale = myLayer.scale;
        myScale.setValue([fitToCompScaleLoc, fitToCompScaleLoc]);
        }
        
        fitToCompScaleAction(myLayer, fitToCompScale);   
    }
}

})(this);