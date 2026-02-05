// slateOvator3 insertSlate
// 231211

app.beginUndoGroup("slate0vator3");

var theComp = app.project.activeItem;

//var slateName = "slate_(v231129)";
var regex = /slate_\(v\d{6}\)$/;

for (var i = 1; i <= app.project.numItems; i++) {
    var myStr = app.project.item(i).name;
    var slateSearch = regex.test(myStr);
    
    //if (app.project.item(i) instanceof CompItem && app.project.item(i).name == slateName) {
    if (app.project.item(i) instanceof CompItem && slateSearch) {

    var slate = app.project.item(i);
    var newSlate = slate.duplicate();
        theComp.layers.add(newSlate);
        theComp.displayStartTime = -1;
        //break;  //  verze s regexem jinak cykli
    }
}

app.endUndoGroup();