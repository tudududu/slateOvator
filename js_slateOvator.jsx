//  slateOvator
//  240205_v10
//  v08 zacleneni part3 do part4
//  v09 insert compName via callback
//  v10 uprava prepisovace poli pro slate i comp

var title = "slate0vator_v10";

(function (thisObj) {
    
    newPanel(thisObj);

    function newPanel(thisObj) {
        var win = (thisObj instanceof Panel) ? thisObj 
        : new Window('palette', title, undefined);
        win.orientation = 'column';
        win.alignChildren = 'fill';
        win.preferredSize = [200, 300];
        var buttonSize = [30, 20];

        /*var groupOne = win.add('group');
            groupOne.orientation = 'column';
            groupOne.alignChildren = 'fill';*/
        
        //  panelFour
        var panelFour = win.add('panel', undefined, 'Insert slate into composition');
            panelFour.orientation = 'column';
            panelFour.alignChildren = 'fill';
        //  label
        //var label = panelFour.add('statictext', undefined, 'Insert slate into composition');
        //  apply Button
        var slateInsertBtn = panelFour.add('button', undefined, 'Apply');

        //  panelThree
        var panelThree = win.add('panel', undefined, 'Pass the compName to the slate');
            panelThree.orientation = 'column';
            panelThree.alignChildren = 'fill';
        //  apply Button
        var compNameBtn = panelThree.add('button', undefined, 'Apply');
        
        //  panelTwo
        var panelTwo = win.add('panel', undefined, 'Make output compositions');
            panelTwo.orientation = 'column';
            panelTwo.alignChildren = 'fill';
        var panelTwoGroupOne = panelTwo.add('group', undefined, 'panelOneGroupOne');
            panelTwoGroupOne.orientation = 'row';
        //  label
        var inputLabel = panelTwoGroupOne.add('statictext', undefined, 'Set the Comps folder level:');
            //panelTwo.add("slider", bounds = undefined, value = 3, minvalue = 1, maxvalue = 3, {name: 'levelSlider'});
        var inputFolderLevel = panelTwoGroupOne.add('edittext', undefined, '3', {enterKeySignalsOnChange: false});
            inputFolderLevel.characters = 6;
        //  apply Button
        var prebalovatorBtn = panelTwo.add('button', undefined, 'Apply');

        //  panelOne Fields
        var panelOne = win.add('panel', undefined, 'Fields');
            panelOne.orientation = 'column';
            panelOne.alignChildren = 'right';
        var panelOneGroupOne = panelOne.add('group', undefined, 'panelOneGroupOne');
            panelOneGroupOne.orientation = 'row';
        var panelOneGroupTwo = panelOne.add('group', undefined, 'panelOneGroupTwo');
            panelOneGroupTwo.orientation = 'row';
        var panelOneGroupThree = panelOne.add('group', undefined, 'panelOneGroupThree');
            panelOneGroupThree.orientation = 'row';

        //  label
        var labelOne = panelOneGroupOne.add('statictext', undefined, 'Media: ');
        var labelTwo = panelOneGroupTwo.add('statictext', undefined, 'SoundLevel: ');
        var labelThree = panelOneGroupThree.add('statictext', undefined, 'Operator: ');
        //  input text
        //var inputMedia = panelOneGroupOne.add('edittext', undefined, 'TV');
        var inputMedia = panelOneGroupOne.add('edittext', undefined, 'TV', {enterKeySignalsOnChange: false});
            inputMedia.characters = 10;
        //var inputSoundLevel = panelOneGroupTwo.add('edittext', undefined, 'soundLevel');
        var inputSoundLevel = panelOneGroupTwo.add('edittext', undefined, 'soundLevel', {enterKeySignalsOnChange: false});
            inputSoundLevel.characters = 10;
        //var inputOperator = panelOneGroupThree.add('edittext', undefined, 'yourName');
        var inputOperator = panelOneGroupThree.add('edittext', undefined, 'yourName', {enterKeySignalsOnChange: false});
            inputOperator.characters = 10;
        
        //  apply Button
        var buttonOne = panelOneGroupOne.add('button', undefined, 'OK');
            buttonOne.size = buttonSize;
        var buttonTwo = panelOneGroupTwo.add('button', undefined, 'OK');
            buttonTwo.size = buttonSize;
        var buttonThree = panelOneGroupThree.add('button', undefined, 'OK');
            buttonThree.size = buttonSize;
        
        // --- Action ---
        function triggerMedia() {
        slateOvator2(renameField, inputMedia.text, 'Media');
        }
        function triggerSoundLevel() {
        slateOvator2(renameField, inputSoundLevel.text, 'SoundLevel');
        }
        function triggerOperator() {
        slateOvator2(renameField, inputOperator.text, 'Operator');
        }
        function triggerCompName() {
        slateOvator2(compNameVkladOvator);
        }
        function triggerSlateInsert() {
            slateOvator3();
        }
        function triggerPrebalovator() {
            slateOvator_part04a(inputFolderLevel.text);
        }
        inputMedia.onChange = triggerMedia;
        inputOperator.onChange = triggerOperator;
        inputSoundLevel.onChange = triggerSoundLevel;
        buttonOne.onClick = triggerMedia;
        buttonTwo.onClick = triggerSoundLevel;
        buttonThree.onClick = triggerOperator;
        compNameBtn.onClick = triggerCompName;
        slateInsertBtn.onClick = triggerSlateInsert;
        prebalovatorBtn.onClick = triggerPrebalovator;

        // --- ACTIONS ---
        win.onResizing = win.onResize = function () {
            this.layout.resize();
        };
        win instanceof Window
            ? (win.center(), win.show()) : (win.layout.layout(true), win.layout.resize());

    }

//  SlateOvator_part_01
//  change field in multiple slates
function slateOvator1(layerName, newTextInput) {

    app.beginUndoGroup("Change field in multiple slates");
        var selectedComp = app.project.selection; //array

        if (selectedComp.length == 0) {
            alert("Select a composition");
        } else {
            slateOvatorEngine(selectedComp, layerName, newTextInput);
        }
        
    app.endUndoGroup();
    
    function slateOvatorEngine(comp, layerName, newTextInput) {
        for (var j = 0; j < comp.length; j++) {
            if (comp[j] instanceof CompItem) {
            var layerArr = comp[j].layers;
            for (var i = 1; i <= layerArr.length; i++) {
                if (layerArr[i].name == layerName) {
                    layerArr[i].text.sourceText.setValue(newTextInput);
                    }
                }
            }
        }
    }
}

// -------------------- regex
function slateRegex() {
    var slateRegex = /slate_\(v\d{6}\)/;
    return slateRegex;
}
// --------------------

    

//  SlateOvator_part_02
//  v03
//  Pass the compName to the slate
//  oznacit lze slate nebo kompozici - na reseni dale pracovat

function slateOvator2(callback, newTextInput, layerName) {

app.beginUndoGroup("Pass the compName to the slate");

var selected = app.project.selection; // compositions

    if (selected.length == 0) {
        alert("Select a composition");
    } else {
        compNamesMultiFnc(selected, callback);
    }

app.endUndoGroup();


//  slate or comp?
//  varianta 1 asks if compName is slate...?
//  varianta 2 asks if layers have slate...?
    function compNamesMultiFnc(selectedComps, callback) {  //  varianta 2
        var regex = slateRegex();
    
        for (var j = 0; j < selectedComps.length; j++) {
                if (selectedComps[j] instanceof CompItem) {
                var layerArr = selectedComps[j].layers; // prohlidka vrstev
    //make func (deduplicate)
                for (var i = 1; i <= layerArr.length; i++) {
                    var layerName = layerArr[i].name;
                    var slateSearch = regex.test(layerName);    //  je vrstva slate?

                    if (slateSearch) {  // pokud je vrstva slate
                                        // jde do slatu a vklada
                        findSlateComp(layerName, callback);
                        break;
                    } else {    //  ne, hledame slate
                        compNamesMultiSlate(selectedComps[j], callback);
                        break;  //
                    }
                }
            }
        }
    }

        //  hledame slateComp (dle jmena)
        function findSlateComp(slateCompName, callback) {
        
        for (var i = 1; i <= app.project.numItems; i++) {
            
            if (app.project.item(i) instanceof CompItem && app.project.item(i).name == slateCompName) {
            
            compNamesMultiSlate(app.project.item(i), callback);
            break;  //  verze s regexem jinak cykli
                }
            }
        }

    //  Spusti vkladac pokud je slate pouzit prave v jedne kompozici
        function compNamesMultiSlate(selectedComp, callback) {
            //  hledame pole parentComp (kde je pouzit)
            if (selectedComp instanceof CompItem) {
                    var parentComp = selectedComp.usedIn; //arr
                // pokud je parentComp jen jedna spusti vkladac
                if (parentComp.length == 1) {
                    var parentCompName = parentComp[0].name;  //arr to string
                    var newExpression = "comp(\"" + parentCompName + "\"" + ").name;"; //newExpression
                    callback(selectedComp, newExpression, layerName);
                    //compNameVkladOvator(selectedComp, newTextInput);
                    //renameField(comp, newTextInput, layerName);
                } else if (parentComp.length > 1) {
                    alert("Slate " + selectedComp.name + " can only be used once.");
                } else if (parentComp.length < 1) {
                    alert("Slate " + selectedComp.name + " not used.");
                }
            }
        }
    
    function renameField(slateComp, newTextInput, layerName) {
        for (var j = 0; j < slateComp.length; j++) {
            if (slateComp[j] instanceof CompItem) {
            var layerArr = slateComp[j].layers;
            for (var i = 1; i <= layerArr.length; i++) {
                if (layerArr[i].name == layerName) {
                    layerArr[i].text.sourceText.setValue(newTextInput);
                    }
                }
            }
        }
    }
    // vkladame parent compName do slatu
    function compNameVkladOvator(slateComp, newTextInput) {
        
        var layerArr = slateComp.layers;
        for (var i = 1; i <= layerArr.length; i++) {
            if (layerArr[i].name == "compName") {
                layerArr[i].text.sourceText.expression = newTextInput;
            }
        }
    }

}

//  slateOvator_part3
//  v09
//  Insert slate into composition
//  Rozdelen na dve pule, aby se engin dal pouzit v casti 4

function slateOvator3() {
    app.beginUndoGroup("Insert slate into composition");
    var selected = app.project.selection;
    var regex = slateRegex();

    if (selected.length == 0) {
        alert("Select a composition");
    } else {
        placeSlateMultiComp(selected, regex);
    }
    app.endUndoGroup();

    //  vyber komopzic
    function placeSlateMultiComp(compSelection, regex) {
        for (var j = 0; j < compSelection.length; j++) {
            if (compSelection[j] instanceof CompItem) {
            slateOvator3engine(compSelection[j], regex);
            }
        }
    }
}

function slateOvator3engine(comp, regex) {
    
    aplikaceDoComp(comp, regex);

        //  zjistuje jestli v kompozici uz neni slate
        function aplikaceDoComp(comp, regex) { // theComp je objekt (polozka z pole)
            
            var layerArr = comp.layers;
            
            if (layerArr.length == 0) {
                placeTheSlate(comp, regex);
            } else if (layerArr.length > 0) {
        //make func
                for (var i = 1; i <= layerArr.length; i++) {
                    var layerName = layerArr[i].name;
                    var slateSearch = regex.test(layerName);

                    if (slateSearch) {  //pokud ano konci
                        break;
                    } else {
                        placeTheSlate(comp, regex);
                        break;
                    }
                }
            }

            for (var i = 1; i <= layerArr.length; i++) {
                var layerName = layerArr[i].name;
                var slateSearch = regex.test(layerName);
                if (slateSearch) {
                    var layerObj = layerArr[i];
                    fitToCompSize(comp, layerObj);
                }
            }
            comp.displayStartTime = -1; //musi to byt tady?
        }

        //  vkladame kopii slatu do kompozice
        function placeTheSlate(theComp, regex) {    // theComp je objekt (polozka z pole)
            
            for (var i = 1; i <= app.project.numItems; i++) { // procura do slate(name)
                var testNameStr = app.project.item(i).name;
                var slateSearch = regex.test(testNameStr);
                
                if (app.project.item(i) instanceof CompItem && slateSearch) {

                var slate = app.project.item(i);
                var newSlate = slate.duplicate();
                    theComp.layers.add(newSlate);
                break;  //  verze s regexem jinak cykli
                }
            }
        }

        function fitToCompSize(myComp, myLayer) {
            
            var myCompSize = [myComp.width, myComp.height];
            var compAspect = (myCompSize[0] / myCompSize[1]).toFixed(2);

            var hd80X = 1920 * 0.81;    // bottomMargin = 80% HDx
            var hd80Y = 1080 * 0.75;

            function scaleCondition(myCompSizeLocal, bottomMargin, topMargin) {

                var scaleResult;
                var scale_00 = 100;
                var scale_01 = myCompSizeLocal / bottomMargin * 100;    // zmensujem od 80% HD
                var scale_02 = myCompSizeLocal / topMargin * 100; // zvetsujem nad 1920

                if (myCompSizeLocal >= bottomMargin && myCompSizeLocal <= topMargin) {
                    scaleResult = scale_00;
                } else if (myCompSizeLocal < bottomMargin) {
                    scaleResult = scale_01;
                } else if (myCompSizeLocal > topMargin) {
                    scaleResult = scale_02;
                }
                return scaleResult;
            }

            var scaleX = scaleCondition(myCompSize[0], hd80X, 1920);
            var scaleY = scaleCondition(myCompSize[1], hd80Y, 1080);
                    
            function scaleAspectCondition(compAspect, scaleX, scaleY) {
                var scaleResultB
                if (compAspect <= 1.78) {
                    scaleResultB = scaleX;
                } else {
                    scaleResultB = scaleY;
                }
                return scaleResultB;
            }
            
            var fitToCompScale = scaleAspectCondition(compAspect, scaleX, scaleY);
            
            function fitToCompScaleAction(myLayer, fitToCompScaleLoc) {
                var myScale = myLayer.scale;
            myScale.setValue([fitToCompScaleLoc, fitToCompScaleLoc]);
            }
            
            function centerCompPosition(myCompSize, myLayer) {
                var myPosition = myLayer.position;
                myPosition.setValue([myCompSize[0]/2, myCompSize[1]/2]);
            }

            fitToCompScaleAction(myLayer, fitToCompScale);
            centerCompPosition(myCompSize, myLayer);
        }
    }


//  slateOvator_part04a
//  duplikat kompozice s apendixem do podslozky v parentFoldru + slate
//  240202_v17
//  compOut jdou do out, mastery zustavaji
//  zruseni zvlastni funkce makeFolder pro 'out' folder:
//  zadanim parentFolder pro 'out' ve funkci folderStructure => promenna folderParentParent
//  pridano vkladani slatu

function slateOvator_part04a(inputFolderLevelL) {

    app.beginUndoGroup("Make output compositions");

        var selected = app.project.selection;
        var outFolderName = "outComps";
        var regex = slateRegex();

        if (selected.length == 0) {
            alert("Select a composition");
        } else {
            copySelection(selected, regex);
        }
    app.endUndoGroup();

    function copySelection(compSelection, regex) {
            for (var j = 0; j < compSelection.length; j++) {
                if (compSelection[j] instanceof CompItem) {
                copy(compSelection[j], regex);
                }
            }
        }

    //  kopirujeme masterComp
    function copy(myCompMaster, regex) {
        var myCompMasterDur = myCompMaster.duration;
        var myCompOut = myCompMaster.duplicate();
            myCompOut.duration = myCompMasterDur + 1;
            myCompOut.displayStartTime = -1;

        naming(myCompMaster, myCompOut);
        deleteLayers(myCompOut);
        prebalovator(myCompMaster, myCompOut, regex);

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
    function prebalovator(compMaster, compOut, regex) {
        var compOutLayers = compOut.layers;
            compOutLayers.add(compMaster);
            compOut.layer(1).startTime = 1;
            slateOvator3engine(compOut, regex);
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
        var compFolderLevel = parseInt(inputFolderLevelL);
        
        for (var i = itemsArr.length - compFolderLevel; i > 1; i--) {
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

})(this);