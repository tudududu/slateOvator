// slateOvator2 compNameToSlate 231207

//var projectItems = app.project.items;
//var activeItem = app.project.activeItem;


app.beginUndoGroup("slateOvator_v02");

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
            //  alert(parentCompName);
            slateOvatorEngine(selectedArr[j], newExpression);
        } else {
            alert("Slate can only be used once.");
        }
    }
    
}

function slateOvatorEngine(slateComp, newText) {
        //for (var j = 0; j < arr.length; j++) {
            var layerArr = slateComp.layers;
            for (var i = 1; i <= layerArr.length; i++) {
                if (layerArr[i].name == "compName") {
                    layerArr[i].text.sourceText.expression = newText;
                }
            }
        }
