// slateOvator_part04
// 240119
// duplicator with path
// duplikat kompozice s apendixem do podslozky v parentFoldru

var myComp = app.project.activeItem;
var myCompName = myComp.name;
var myCompFolder = myComp.parentFolder;
var myCompFolderName = myCompFolder.name;
//myCompMaster.name = "a";
//alert(myCompFolder.name);
//myCompFolder.addFolder('aaa');
/*
var newFolder = app.project.items.addFolder('folderName');
newFolder.parentFolder = myCompFolder;
*/

function makeFolder(folderName, folderParent) {
var newFolder = app.project.items.addFolder(folderName);
 if (!(folderParent == null)) {
        newFolder.parentFolder = folderParent;
    }
return newFolder;
}

makeFolder('a01', myCompFolder);
