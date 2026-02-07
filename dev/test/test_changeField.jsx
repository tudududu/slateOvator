//  test changeField
//  test multi item selection w folders
//  copyright Jan Svatuska 2023
//  240108

(function (thisObj) {
    
    newPanel(thisObj);

    function newPanel(thisObj) {
        var win = (thisObj instanceof Panel) 
        ? 
        thisObj 
        : 
        new Window('palette', 'test', undefined);
        
        win.preferredSize = [350, 300];

        var groupOne = win.add('group');
            groupOne.orientation = 'row';
            groupOne.alignChildren = 'fill';
        
        //  label
        var label = groupOne.add('statictext', undefined, 'Operator: ');
        //  input text
        var inputText = groupOne.add('edittext', undefined, 'yourName');
            inputText.characters = 10;
        //  apply Button
        var applyBtn = groupOne.add('button', undefined, 'Apply');
        
        // --- Action ---
        applyBtn.onClick = function () {
            testFnc('Operator', inputText.text);
        }

        // --- ACTIONS ---
        win.onResizing = win.onResize = function () {
            this.layout.resize();
        };
        win instanceof Window
            ? (win.center(), win.show()) : (win.layout.layout(true), win.layout.resize());
    }

    function testFnc(layerName, newTextInput) {
        
        app.beginUndoGroup("Test");
            var selected = app.project.selection; //array
            
            if (selected.length == 0) {
                alert("Select a composition");
            } else {
                testFncEngine(selected, layerName, newTextInput);
            }
        app.endUndoGroup();
        
        function testFncEngine(compSelection, layerName, newTextInput) {
        for (var j = 0; j < compSelection.length; j++) {
            var layerArr = compSelection[j].layers;
        if (compSelection[j] instanceof CompItem) {
            for (var i = 1; i <= layerArr.length; i++) {
                if (layerArr[i].name == layerName) {
                    layerArr[i].text.sourceText.setValue(newTextInput);
                    }
                }
            }
        }
    }
    }

})(this);