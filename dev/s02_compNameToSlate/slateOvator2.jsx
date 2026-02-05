var projectItems = app.project.items;
var selected = app.project.selection;
var activeItem = app.project.activeItem;


app.beginUndoGroup("slateOvator_v02");

    var parentCompName = compNames[0];  //arr to string
    var newExpression = "comp(\"" + parentCompName + "\"" + ").name;";
    var selected = app.project.selection; // compositions

    if (selected.length == 0) {
        alert("Select a composition");
    } else if (compNames.length > 1) {
        alert("Slate can only be used once.");
    }   else {
        slateOvatorEngine(activeItem, newExpression);
    }
    var usedInList = activeItem.usedIn;

app.endUndoGroup();

var compNames = compNamesFx();

function compNamesFx() {
    var arr1 = [];
    for (var i = 0; i < usedInList.length; i++) {
    arr1.push(usedInList[i].name);
    }
    return arr1;
}

function slateOvatorEngine(arr, newText) {
        //for (var j = 0; j < arr.length; j++) {
            var layerArr = activeItem.layers;
            for (var i = 1; i <= layerArr.length; i++) {
                if (layerArr[i].name == "compName") {
                    layerArr[i].text.sourceText.expression = newText;
                }
            }
        }