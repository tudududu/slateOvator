// test_UI_design type01 nt productions
// 241012
// UI - newPanel() + doMain() structure; 


(function (thisObj) {
    
    newPanel(thisObj);

    function newPanel(thisObj) {
        var win = (thisObj instanceof Panel) ? thisObj 
        : new Window('palette', 'compsChanger', undefined);
        //  win.preferredSize = [250, 300]; //if not on the size is auto

        var groupOne = win.add('group');
            groupOne.orientation = 'column';
            groupOne.alignChildren = 'fill';
        //  input text
        var startTimeInput = groupOne.add('edittext', undefined, 'yourName');
            startTimeInput.characters = 10;
        //  label
        var label = groupOne.add('statictext', undefined, 'Pass the compName to the slate');
        //  apply Button
        var applyBtn = groupOne.add('button', undefined, 'Apply', {name: "ok"});
        
        // --- Action ---
        applyBtn.onClick = function () {
            doMain(this.parent); // Calls doMain with the win object
        }

        // --- ACTIONS ---
        win.onResizing = win.onResize = function () {
            this.layout.resize();
        };
        win instanceof Window
            ? (win.center(), win.show()) : (win.layout.layout(true), win.layout.resize());

    }

    function doMain(theDialog) {
    app.beginUndoGroup("Change Selected Comps");
    
    alert(theDialog.widthT.text);

    app.endUndoGroup();
    }

})(this);

