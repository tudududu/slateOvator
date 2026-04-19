// test_UI_design type01 nt productions
// 241015
// UI - newPanel() + doMain() structure; 
// compChanger implementation test; input field + button; alert input value on button click; input validation for number and range;

(function (thisObj) {
    var message = "";

    newPanel(thisObj);

    function newPanel(thisObj) {
        var win = (thisObj instanceof Panel) ? thisObj 
        : new Window('palette', 'compsChanger', undefined);
        //  win.preferredSize = [250, 300]; //if not on the size is auto

        var groupOne = win.add('group');
            groupOne.orientation = 'column';
            groupOne.alignChildren = 'fill';
        //  input text
        groupOne.inDimensionX = groupOne.add('edittext', undefined, undefined);
        groupOne.inDimensionX.characters = 10;
        
        //  apply Button
        groupOne.okBtn = groupOne.add('button', undefined, 'Apply', {name: "ok"});
        
        // --- Action ---
        groupOne.okBtn.onClick = function () {
            doMain(this.parent); // Calls doMain with the win object
        }

        // --- ACTIONS ---
        win.onResizing = win.onResize = function () {
            this.layout.resize();
        };
        win instanceof Window
            ? (win.center(), win.show()) : (win.layout.layout(true), win.layout.resize());
    }

    //---------------------------------

    function width(comp, theDialog) {
    if (theDialog.inDimensionX.text != "") {
        if (isNaN(parseInt(theDialog.inDimensionX.text))) {
            message = (message + "Not a number value for Width\r");
            theDialog.inDimensionX.text = ""; //empty field if it is bad so we don't try anymore
        } else {
            var oldWidth = comp.width;
            var newWidth = (parseInt(theDialog.inDimensionX.text));
            if ( (newWidth > 30000) || (newWidth < 4) ) {
                message = (message + "Value out of range for Width\r");
                theDialog.inDimensionX.text = ""; //empty field if it is bad so we don't try anymore
            } else {
                if (oldWidth != newWidth) {
                    comp.width = newWidth;
                    message = (message + "Value is OK\r");
                    }
                }
            alert(message);
            theDialog.inDimensionX.text = "";//empty field if it is bad so we don't try anymore
            }
        }
    }

    function doMain(theDialog) {
    app.beginUndoGroup("Change Selected Comps");
        var selection = app.project.selection; // compositions

        alert(theDialog.inDimensionX.text);
        width(selection[0], theDialog);


    app.endUndoGroup();
    }

})(this);