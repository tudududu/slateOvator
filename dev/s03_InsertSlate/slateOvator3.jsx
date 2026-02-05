// slateOvator3 insertSlate
// slateOvator_part3_slateDistribution
// v05
// 231212


app.beginUndoGroup("slate0vator3");

slateOvator3();

app.endUndoGroup();

function slateOvator3() {

var selected = app.project.selection;

    if (selected.length == 0) {
        alert("Select a composition");
    } else {
        placeMultipleSlate(selected);
    }
}
//  menime ve vyberu
function placeMultipleSlate(compSelection) {
    for (var j = 0; j < compSelection.length; j++) {
        placeTheSlate(compSelection[j]);
    }
}
//  vkladame kopii slatu do kompozice
function placeTheSlate(theComp) {
    
    var regex = /slate_\(v\d{6}\)$/;
    var projItem = app.project.item;

    for (var i = 1; i <= app.project.numItems; i++) {
        var myStr = app.project.item(i).name;
        var slateSearch = regex.test(myStr);
        
        if (app.project.item(i) instanceof CompItem && slateSearch) {

        var slate = app.project.item(i);
        var newSlate = slate.duplicate();
            theComp.layers.add(newSlate);
            theComp.displayStartTime = -1;
            //break;  //  verze s regexem jinak cykli
        }
    }
}