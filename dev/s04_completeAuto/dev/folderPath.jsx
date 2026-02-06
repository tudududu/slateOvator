// folderPath
// 240123
// get AE project path in folder structure



var selection = app.project.activeItem;

function cesta(item) {
    
    var objArr = [];
        
    do {
        if(item.parentFolder != app.project.rootFolder) {
            item = item.parentFolder;           
        }
        objArr.push(item.name);
    } while(item.parentFolder != app.project.rootFolder);
    
    return objArr;
}
//alert(selection);
alert(cesta(selection));
var cestaArr = cesta(selection);
var cestaStr = cestaArr.toString();
app.project.items.addFolder(cestaStr);
/*
var myComp = app.project.activeItem;
var myCompName = myComp.name;
var myCompFolder = myComp.parentFolder;
var myCompFolderName = myCompFolder.name;
*/
