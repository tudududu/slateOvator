// slateOvator3 insertSlate
// 240104

//  slateOvator_part3
//  v06
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
app.beginUndoGroup("slateOvator3_v06c");
var selected = app.project.selection;

    if (selected.length == 0) {
        alert("Select a composition");
    } else {
        placeMultipleSlate(selected);
    }
app.endUndoGroup();

    //  vyber
    function placeMultipleSlate(compSelection) {
        for (var j = 0; j < compSelection.length; j++) {
            placeTheSlate(compSelection[j]);
        }
    }

    //  vkladame kopii slatu do kompozice
    function placeTheSlate(theComp) {
        
        var regex = /slate_\(v\d{6}\)/;
        //var projItem = app.project.item;

        for (var i = 1; i <= app.project.numItems; i++) {
            var myStr = app.project.item(i).name;
            var slateSearch = regex.test(myStr);
            
            if (app.project.item(i) instanceof CompItem && slateSearch) {

            var slate = app.project.item(i);
            var newSlate = slate.duplicate();
                theComp.layers.add(newSlate);
                theComp.displayStartTime = -1;
                break;  //  verze s regexem jinak cykli
            }
        }
    }
}


})(this);