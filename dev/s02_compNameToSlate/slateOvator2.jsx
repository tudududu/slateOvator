// slateOvator2 compNameToSlate 231207

//var projectItems = app.project.items;
//var activeItem = app.project.activeItem;
var selected = app.project.selection; // compositions
    //var parentCompName = compNames[0];  //arr to string
    //var newExpression = "comp(\"" + parentCompName + "\"" + ").name;";


app.beginUndoGroup("slateOvator_v02");

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

/*var usedInList = compNamesMultiFx(selected);
alert(usedInList);

var compNames = compNamesFx(usedInList);
alert(compNames);

function compNamesFx(arr) {
    var compNamesArr = [];
    for (var i = 0; i < usedInList.length; i++) {
    compNamesArr.push(arr[i][0].name);
    }
    return compNamesArr;
}
*/