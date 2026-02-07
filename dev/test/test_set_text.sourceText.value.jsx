// changing text.sourceText.value of text layer
// 231204

slateOvator('CCCCC');



function slateOvator(newTextInput) {
    app.beginUndoGroup("test");
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