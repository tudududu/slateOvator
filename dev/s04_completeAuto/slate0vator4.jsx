// slateOvator_part04
// 240130_v17
// duplicator with path
// duplikat kompozice s apendixem (_master) do podslozky v parentFoldru

// spousteci hlavicka 
// smycka pro opakovani u vyberu
// compOut jdou do out, mastery zustavaji
// zruseni zvlastni funkce makeFolder pro 'out' folder:
// zadanim parentFolder pro 'out' ve funkci folderStructure => promenna folderParentParent

function slateOvator_part04a() {

    app.beginUndoGroup("Make output compositions");

        var selected = app.project.selection;
        var outFolderName = "outComps";

        if (selected.length == 0) {
            alert("Select a composition");
        } else {
            copySelection(selected);
        }
    app.endUndoGroup();

    function copySelection(compSelection) {
            for (var j = 0; j < compSelection.length; j++) {
                if (compSelection[j] instanceof CompItem) {
                copy(compSelection[j]);
                }
            }
        }

    //  kopirujeme masterComp
    function copy(myCompMaster) {
        var myCompMasterDur = myCompMaster.duration;
        var myCompOut = myCompMaster.duplicate();
            myCompOut.duration = myCompMasterDur + 1;
            myCompOut.displayStartTime = -1;

        naming(myCompMaster, myCompOut);
        deleteLayers(myCompOut);
        prebalovator(myCompMaster, myCompOut);

        var pathItemsArr = folderPath(myCompMaster);
        //  folderStructure vraci prvni slozku v rade za selectedComp
        var myCompOutFolderParent = folderStructure(pathItemsArr);
        //  setting FP for outComp
        myCompOut.parentFolder = myCompOutFolderParent;
    }

    //  delete layers in myCompOut
    function deleteLayers(comp) {         
        var compLayers = comp.layers;
        for (var i = compLayers.length; i >= 1; i--) {
            var curLayer = compLayers[i];
            curLayer.remove();
        }
    }

    //  passar o master pro outComp
    function prebalovator(compMaster, compOut) {
        var compOutLayers = compOut.layers;
            compOutLayers.add(compMaster);
            compOut.layer(1).startTime = 1;
    }


    function makeFolder(folderName, folderParent) {
        //  scan proj if folder exist
        //  pushes 'true' into testArr in case the folder exists
        var testArr = [];
        for (var i = 1; i <= app.project.numItems; i++){
            if (app.project.item(i).name == folderName 
                && app.project.item(i).parentFolder == folderParent
                && app.project.item(i) instanceof FolderItem) {
                testArr.push(true);
            }
        }
    
        //  caso a pasta nao existir
        //  create a new FolderItem in project and pass it in the 'folderObj'
            var folderObj;
            if (testArr.length == 0) {
                folderObj = app.project.items.addFolder(folderName);
        //  caso a pasta existir e estar no 'out' folder, so passar ela no 'folderObj'
            } else if (testArr.length > 0) {
                for (var i = 1; i <= app.project.numItems; i++) {
                if (app.project.item(i).name == folderName 
                && app.project.item(i).parentFolder == folderParent
                && app.project.item(i) instanceof FolderItem) {
                folderObj = app.project.item(i);
                    }
                }
            }

        if (folderParent !== null) {
            folderObj.parentFolder = folderParent;
            }
        return folderObj;
    }

    function folderStructure(itemsArr) {
        //  parent pro 'out' je konec cesty - tedy 'project'
        var folderParentParent = itemsArr[itemsArr.length - 1];
        
        //  delame 'out' a nastavujeme jako parent pro 1. slozku
        var folderParent = makeFolder(outFolderName, folderParentParent);

        //  prochazime cestu delame slozky
        //  zacatek za selectedComp (i > 1)
        //  konec (path.length-3) obsah 'comp'
        for (var i = itemsArr.length - 3; i > 1; i--) {
            var folderName = itemsArr[i-1].name;
            var newFolder = makeFolder(folderName, folderParent);
            folderParent = newFolder;
        }
        return folderParent;
    }

    //  path to selected item
    function folderPath(item) {
        var objArr = [item];
        
        do {
            if(item.parentFolder != app.project.rootFolder) {
                item = item.parentFolder;
                objArr.push(item);
            }
        } while(item.parentFolder != app.project.rootFolder);
        
        return objArr;
    }

    //  k puvodnimu jmenu pridavame priponu a duplikat prebira puvodni nazev
    function naming(myCompMaster, myCompOut) {
        var compNameArr = [];
        compNameArr.push(myCompMaster.name);

        var masterAppendix = "_master";
        myCompMaster.name = compNameArr[0] + masterAppendix;
        myCompOut.name = compNameArr[0];
        }

}

slateOvator_part04a();