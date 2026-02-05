//  slateOvator_part1
//  v03
//  change operator field in multiple slates

(function (thisObj) {
    
    newPanel(thisObj);

    function newPanel(thisObj) {
        var win = (thisObj instanceof Panel) ? thisObj 
        : new Window('palette', 'slateOvator', undefined);
        //  win.preferredSize = [350, 300];

        var groupOne = win.add('group');
            groupOne.orientation = 'row';
            groupOne.alignChildren = 'fill';
        
        //  label
        var label = groupOne.add('statictext', undefined, 'Operator: ');
        //  input text
        var startTimeInput = groupOne.add('edittext', undefined, 'yourName');
            startTimeInput.characters = 10;
        //  apply Button
        var applyBtn = groupOne.add('button', undefined, 'Apply');
            //  applyBtn.size = [50, 25];

        // --- Action ---
            applyBtn.onClick = function () {
            slateOvator1(startTimeInput.text);
            //startTimeInput.active = true; // ---pokus o Enter minsto button click
        }

        // --- ACTIONS ---
        win.onResizing = win.onResize = function () {
            this.layout.resize();
        };
        win instanceof Window
            ? (win.center(), win.show()) : (win.layout.layout(true), win.layout.resize());

    }

function slateOvator1(newTextInput) {

app.beginUndoGroup("slateOvator1");
    var newText = newTextInput;
    var selected = app.project.selection; //array

    if (selected.length == 0) {
        alert("Select a composition");
    } else {
        slateOvatorEngine(selected, newText);
    }
    
app.endUndoGroup();
    
    function slateOvatorEngine(arr, newText) {
        for (var j = 0; j < arr.length; j++) {
            var layerArr = arr[j].layers;
            for (var i = 1; i <= layerArr.length; i++) {
                if (layerArr[i].name == "Operator") {
                    layerArr[i].text.sourceText.setValue(newText);
                }
            }
        }
    }
}


})(this);