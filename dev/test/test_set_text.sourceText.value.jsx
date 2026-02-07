// changing text.sourceText.value of text layer
// 231204

app.beginUndoGroup("test");
var selected = app.project.selection; //array
//var comp = app.project.activeItem;
var layers = comp.selectedLayers;
//alert(selected[0].name);
alert(layers[1].name);
app.endUndoGroup();
