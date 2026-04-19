// test_UI_panel_design type02 crg
// 241012
// start() + buildUI() + doMain() structure;

(function (thisObj) {

var win = (thisObj instanceof Panel) ? thisObj 
        : new Window('palette', 'compsChanger' , undefined);
var ui = buildUI(thisObj);

start();

function start() {
    if (app.project != null) {
        if (ui != null) {
            ui.show();
        }
    }
    return win;
}

function buildUI(thisObj) {
    if (win != null) {
        
    win.widthLabel = win.add('statictext', undefined, 'Width:');
    win.widthT = win.add('edittext', undefined, '');
    
    win.okBtn = win.add('button', undefined, 'OK', {name:'ok'});
    
    win.okBtn.onClick = function () { 
        doMain(this.parent); // Calls doMain with the win object
        //this.parent.close(1); // Closes the win window
    };

    }
    return win;
}

function doMain(theDialog) {
    app.beginUndoGroup("Change Selected Comps");
    
    alert(theDialog.widthT.text);

    app.endUndoGroup();
    }

})(this);