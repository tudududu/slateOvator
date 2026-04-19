// test_UI_panel_design_crg
// 241011
// start() + buildUI() + doMain() structure; 

(function (thisObj) {
    //globals: ////
    var vers = "x.x";
    
var win = (thisObj instanceof Panel) ? thisObj 
        : new Window('palette', 'compsChanger (v' + vers + ')', undefined);
var w = buildUI(thisObj);
var probStr = "";
/////////////

start();

function start() {
    if (app.project != null) {
        if (w != null) {
            w.show();
        } else {
            alert("w == null")
        }
    } else {
        alert("app.project == null")
    }
}

function buildUI(thisObj) {
    if (win != null) {

    win.widthLabel = win.add('statictext', undefined, 'Width:');
    win.widthT = win.add('edittext', [89,177,166,199], '');
    
    win.okBtn = win.add('button', [89,177,166,199], 'OK', {name:'ok'});
    
    win.okBtn.onClick = function () { 
        doMain(this.parent); // Calls doMain with the win object
        //this.parent.close(1); // Closes the win window
        };
    }
    return win;
}
function doMain(theDialog) {
    app.beginUndoGroup("Change Selected Comps");
    
    if (theDialog.widthT.text != "") {
        if (isNaN(parseFloat(theDialog.widthT.text))) {
            probStr = (probStr + "Not a number value for Width\r");
            theDialog.widthT.text = "";//empty field if it is bad so we don't try anymore
        } else {
        //    oldWidth = item.width;
        //    newWidth = Math.floor(parseFloat(theDialog.widthT.text));
        //    if ( (newWidth > 30000) || (newWidth < 4) ) {
        //        probStr = (probStr + "Value out of range for Width\r");
            probStr = (probStr + "Value is OK\r");
            theDialog.widthT.text = "";//empty field if it is bad so we don't try anymore
            }
        }
    app.endUndoGroup();
    }

})(this);