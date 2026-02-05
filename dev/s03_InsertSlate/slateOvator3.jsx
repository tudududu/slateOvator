// slateOvator3 insertSlate
// 231210

app.beginUndoGroup("slate0vator3");

var theComp = app.project.activeItem;
var regex = /v\d{3}/;

for (var i = 1; i <= app.project.numItems; i++) {
    if (app.project.item(i) instanceof CompItem && app.project.item(i).name == "slate_(v231129)") {
    var slate = app.project.item(i);
    var newSlate = slate.duplicate();
        theComp.layers.add(newSlate);
        theComp.displayStartTime = -1;
    }
}

app.endUndoGroup();