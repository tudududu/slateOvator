// changing text.sourceText.value of text layer
// 231204

app.beginUndoGroup("test");
var selected = app.project.selection; //array
//var comp = app.project.activeItem;
var layers = selected[0].layers;
//alert(selected[0].name);
alert(layers[1].name);
/*
var layerName;

for (var i = 0; i < layers.legth; i++) {
    if (layers[i].name == "Operator") {
        //layers[i].SourceText = "Honza";
        alert(layers[i].name);
    }
}

alert(layerName);
*/
app.endUndoGroup();
