// changing text.sourceText.value of text layer
// 231204

function slateOvator(newTextInput) {
    app.beginUndoGroup("test");
    var newText = newTextInput;
    var selected = app.project.selection; //array

    if (selected.length == 0) {
        alert("Select a composition");
    } else {
        zkracOvatorEngine(selected, startTime);
    }
    app.endUndoGroup();
    
    for (var j = 0; j < selected.length; j++) {
    var layerArr = selected[j].layers;

        for (var i = 1; i <= layerArr.length; i++) {
            if (layerArr[i].name == "Operator") {
                layerArr[i].text.sourceText.setValue("BBBB");
                //alert(layers[i].text.sourceText.value);
            }
        }
    }

app.endUndoGroup();

}