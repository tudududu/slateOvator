// slateOvator3 insertSlate
// 231208

app.beginUndoGroup("slate0vator3");

var theComp = app.project.activeItem;

var newComp = theComp.duplicate();
for (var i = 1; i <= app.project.numItems; i++) {
    if (app.project.item(i).name == "previewComp") {
    var previewComp = app.project.item(i);
        previewComp.layers.add(newComp);
    }
}

app.endUndoGroup();