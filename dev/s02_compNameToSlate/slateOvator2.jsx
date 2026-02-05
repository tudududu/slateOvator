// slateOvator2 compNameToSlate 231211

//  slateOvator2_v25
//  change the compName in slate

(function (thisObj) {
    
    newPanel(thisObj);

    function newPanel(thisObj) {
        var win = (thisObj instanceof Panel) ? thisObj 
        : new Window('palette', 'slateOvator2', undefined);
        //  win.preferredSize = [350, 300];

        var groupOne = win.add('group');
            groupOne.orientation = 'column';
            groupOne.alignChildren = 'fill';
        /*
        //  input text    
        var startTimeInput = groupOne.add('edittext', undefined, 'yourName');
            startTimeInput.characters = 10;
        */
        //  label
        var label = groupOne.add('statictext', undefined, 'pass the compName to the slate');
        //  apply Button
        var applyBtn = groupOne.add('button', undefined, 'Apply', {name: "ok"});
        
        // --- Action ---
            applyBtn.onClick = function () {
            slateOvator2();
            //startTimeInput.active = true; // ---pokus o Enter minsto button click
        }

        // --- ACTIONS ---
        win.onResizing = win.onResize = function () {
            this.layout.resize();
        };
        win instanceof Window
            ? (win.center(), win.show()) : (win.layout.layout(true), win.layout.resize());

    }

function slateOvator2() {
app.beginUndoGroup("slateOvator2");

var selected = app.project.selection; // compositions

    if (selected.length == 0) {
        alert("Select a composition");
    } else {
        compNamesMultiFx(selected);
    }

app.endUndoGroup();

function compNamesMultiFx(selectedArr) {
    
    for (var j = 0; j < selectedArr.length; j++) {
            var parentComp = selectedArr[j].usedIn;
        
        if (parentComp.length == 1) {
            var parentCompName = parentComp[0].name;  //arr to string
            var newExpression = "comp(\"" + parentCompName + "\"" + ").name;";
            slateOvatorEngine(selectedArr[j], newExpression);
        } else {
            alert("Slate can only be used once.");
        }
    }
    
}

function slateOvatorEngine(slateComp, newText) {
    
        var layerArr = slateComp.layers;
        for (var i = 1; i <= layerArr.length; i++) {
            if (layerArr[i].name == "compName") {
                layerArr[i].text.sourceText.expression = newText;
            }
        }
    }
}

})(this);

