// slateOvator2 compNameToSlate 231207

//var projectItems = app.project.items;
var selected = app.project.selection;
//var activeItem = app.project.activeItem;

/*
app.beginUndoGroup("slateOvator_v02");

    //var parentCompName = compNames[0];  //arr to string
    //var newExpression = "comp(\"" + parentCompName + "\"" + ").name;";
    var selected = app.project.selection; // compositions

    if (selected.length == 0) {
        alert("Select a composition");
    } else {
        slateOvatorEngine(selected);
    }

app.endUndoGroup();
*/
function compNamesMultiFx(selectedArr) {
    var usedInListArr = [];
    for (var j = 0; j < selectedArr.length; j++) {
    var oneCompUsedIn = selectedArr[j].usedIn;
        if (oneCompUsedIn.length == 1) {
            usedInListArr.push(oneCompUsedIn[0].name);
        } else {
            alert("Slate can only be used once.");
        }
    }
    return usedInListArr;
}
var usedInList = compNamesMultiFx(selected);
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
/*
function slateOvatorEngine(arr, newText) {
        //for (var j = 0; j < arr.length; j++) {
            var layerArr = activeItem.layers;
            for (var i = 1; i <= layerArr.length; i++) {
                if (layerArr[i].name == "compName") {
                    layerArr[i].text.sourceText.expression = newText;
                }
            }
        }
*/