// folderPath
// 240122
// pokus dostat cestu ve strukture slozek

/*
var myComp = app.project.activeItem;
var myCompName = myComp.name;
var myCompFolder = myComp.parentFolder;
var myCompFolderName = myCompFolder.name;
*/

var myFolder = app.project.activeItem;
var myFolderParentL1 = myFolder.parentFolder;
var mFPL1 = folderNameFNC(myFolderParentL1);

var myFolderParentL2 = myFolderParentL1.parentFolder;
var mFPL2 = folderNameFNC(myFolderParentL2);

var myFolderParentL3 = myFolderParentL2.parentFolder;
var mFPL3 = folderNameFNC(myFolderParentL3);

var myFolderParentL4 = myFolderParentL3.parentFolder;
var mFPL4 = folderNameFNC(myFolderParentL4);

var myFolderParentL5 = myFolderParentL4.parentFolder;
var mFPL5 = folderNameFNC(myFolderParentL5);

function folderNameFNC(item) {
    var folderParent;
    if (item instanceof FolderItem) {
        folderParent = item.parentFolder;
    }
    return folderParent;
}

function cesta(item) {
    while (item.parentFolder !== )
}
/*
var pathArr = [mFPL1, mFPL2, mFPL3, mFPL4, mFPL5];
var nullArr = [mFPL5];
alert(pathArr);
*/
alert(myFolderParentL5);