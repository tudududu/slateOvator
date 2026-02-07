// check if selection is subComp
// 231206

var projectItems = app.project.items;
var selected = app.project.selection;
var activeItem = app.project.activeItem;
var usedInList = activeItem.usedIn;
var compNames = [];

for (var i = 0; i < usedInList.length; i++) {
    compNames.push(usedInList[i].name);
    }
//alert(compNames);

if (compNames.length > 1) {
    alert("Slate can only be used once.")
}   else {
    
}