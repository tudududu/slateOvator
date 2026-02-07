//  slateOvator
//  240220_v14
//  v08 zacleneni part3 do part4
//  v09 insert compName via callback
//  v11 uprava prepisovace poli pro slate i comp
//  v12 vypinace tagy
//  v13 prepina se pouze logo bg pouzite ve slatu - id
//  v14 totez pro slate: id misto jmena
//  vXX UI - level closable
//  vXX focus target
//  vXX z callback fci oddelat instanceof pokud nejsou potreba

var vers = '14';
var title = 'slate0vator (v' + vers + ')';


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
        //var treeX = panelTwo.add("treeview", bounds = undefined, items = [1, 2, 3], {node: 1});
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
        var newTextInput = inputMedia.text;
        var fieldLayerName = 'Media';
        slateOvator2(renameField, fieldLayerName, newTextInput);
        }
        function triggerSoundLevel() {
        var newTextInput = inputSoundLevel.text;
        var fieldLayerName = 'SoundLevel';
        slateOvator2(renameField, fieldLayerName, newTextInput);
        }
        function triggerOperator() {
        var newTextInput = inputOperator.text;
        var fieldLayerName = 'Operator';
        slateOvator2(renameField, fieldLayerName, newTextInput);
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


        //  switches

        var panelZero = win.add('panel', undefined, 'Tags');
            panelZero.orientation = 'row';
            panelZero.alignChildren = 'fill';
        var panelZeroGroupOne = panelZero.add('group', undefined, 'panelZeroGroupOne');
            panelZeroGroupOne.orientation = 'column';
            //panelZeroGroupOne.alignChildren = 'left';
        var panelZeroGroupTwo = panelZero.add('group', undefined, 'panelZeroGroupTwo');
            panelZeroGroupTwo.orientation = 'column';
            //panelZeroGroupOne.alignChildren = 'left';

        var checkbox_Media = panelZeroGroupOne.add("checkbox", [undefined,undefined,100,18], ' Media');
        checkbox_Media.value = true;
        var checkbox_Sound = panelZeroGroupOne.add("checkbox", [undefined,undefined,100,18], ' Sound');
        checkbox_Sound.value = true;
        var checkbox_Aspect = panelZeroGroupOne.add("checkbox", [undefined,undefined,100,18], ' Aspect');
        var checkbox_Resolution = panelZeroGroupOne.add("checkbox", [undefined,undefined,100,18], ' Resolution');
        var checkbox_Framerate = panelZeroGroupOne.add("checkbox", [undefined,undefined,100,18], ' Framerate');
        var checkbox_Subtitle = panelZeroGroupTwo.add("checkbox", [undefined,undefined,100,18], ' Subtitle');
        var checkbox_Language = panelZeroGroupTwo.add("checkbox", [undefined,undefined,100,18], ' Language');
        var checkbox_Brand = panelZeroGroupTwo.add("checkbox", [undefined,undefined,100,18], ' Brand');
        checkbox_Brand.value = true;
        var checkbox_Title = panelZeroGroupTwo.add("checkbox", [undefined,undefined,100,18], ' Title');
        checkbox_Title.value = true;
        var checkbox_Logo = panelZeroGroupTwo.add("checkbox", [undefined,undefined,100,18], ' Logo');
        
        // --- Action ---
        
            var switchesLayerName = "controls";
        function checkTagMedia() {
            slateOvator2(tlacitkovatOr, switchesLayerName, checkbox_Media.value, 'media_Switch');
        }
        function checkTagSound() {
            slateOvator2(tlacitkovatOr, switchesLayerName, checkbox_Sound.value, "sound_Switch");
        }
        function checkTagAspect() {
            slateOvator2(tlacitkovatOr, switchesLayerName, checkbox_Aspect.value, "aspect_Switch");
        }
        function checkTagResolution() {
            slateOvator2(tlacitkovatOr, switchesLayerName, checkbox_Resolution.value, "resolution_Switch");
        }
        function checkTagFps() {
            slateOvator2(tlacitkovatOr, switchesLayerName, checkbox_Framerate.value, "framerate_Switch");
        }
        function checkTagSubtit() {
            slateOvator2(tlacitkovatOr, switchesLayerName, checkbox_Subtitle.value, "subtitle_Switch");
        }
        function checkTagLang() {
            slateOvator2(tlacitkovatOr, switchesLayerName, checkbox_Language.value, "language_Switch");
        }
        function checkTagBrand() {
            slateOvator2(tlacitkovatOr, switchesLayerName, checkbox_Brand.value, "brand_switch");
        }
        function checkTagTitle() {
            slateOvator2(tlacitkovatOr, switchesLayerName, checkbox_Title.value, "title_switch");
        }
        function checkLogo2() {
            slateOvator2(logoTlacitkovatOr2, switchesLayerName, checkbox_Logo.value, 'logo_Switch');
        }
        checkbox_Media.onClick = checkTagMedia;
        checkbox_Sound.onClick = checkTagSound;
        checkbox_Aspect.onClick = checkTagAspect;
        checkbox_Resolution.onClick = checkTagResolution;
        checkbox_Framerate.onClick = checkTagFps;
        checkbox_Subtitle.onClick = checkTagSubtit;
        checkbox_Language.onClick = checkTagLang;
        checkbox_Brand.onClick = checkTagBrand;
        checkbox_Title.onClick = checkTagTitle;
        checkbox_Logo.onClick = checkLogo2;

        // --- ACTIONS ---
        win.onResizing = win.onResize = function () {
            this.layout.resize();
        };
        win instanceof Window
            ? (win.center(), win.show()) : (win.layout.layout(true), win.layout.resize());

    }

// -------------------- regex
function slateRegex() {
    var slateRegex = /^slate_\(v\d{6}\)/;
    return slateRegex;
}
// --------------------


        
//======================================callback funkce pro so2

    //  prepis pole 
    //  oproti slate0vatoru1 predelano z pole na objekt
    function renameField(comp, fieldLayerName, newTextInput) {
    //for (var j = 0; j < comp.length; j++) {
        if (comp instanceof CompItem) {
        var layerArr = comp.layers;
        for (var i = 1; i <= layerArr.length; i++) {
            if (layerArr[i].name == fieldLayerName) {
                layerArr[i].text.sourceText.setValue(newTextInput);
                
                }
            }
        }
    }

    // vkladame parent compName do slatu
    function compNameVkladOvator(slateComp, fieldLayerName, newText) {
        
        var layerArr = slateComp.layers;
        for (var i = 1; i <= layerArr.length; i++) {
            if (layerArr[i].name == "compName") {
                layerArr[i].text.sourceText.expression = newText;
            }
        }
    }
    //switches //   sladit argumenty
    function tlacitkovatOr(compSelection, layerName, switchInput, effectName) {
            //for (var j = 0; j < compSelection.length; j++) {
                if (compSelection instanceof CompItem) {
                var layerArr = compSelection.layers;
                
                for (var i = 1; i <= layerArr.length; i++) {
                    if (layerArr[i].name == layerName) {
                        layerArr[i].effect(effectName)("Checkbox").setValue(switchInput);
                        }
                    }
                }
            }

    function logoTlacitkovatOr2(compSelection, layerName, switchInput, effectName) {
        //var bgCompName = 'slateBg_DuoLogo';
        var bgCompNameRegex = /slateBg_DuoLogo/;
        //  hledame bgLayer ve slatu dle jmena
        var slateBgLayer = layerInspection2(compSelection, bgCompNameRegex);
        var sbgID = slateBgLayer[0].source.id;
        //  search bgComp in proj by id
        var slateBgComp = findSlateCompID(sbgID);
        var layerArr = slateBgComp.layers;
        //  search layer in bgComp
        for (var i = 1; i <= layerArr.length; i++) {
            if (layerArr[i].name == layerName) {
                layerArr[i].effect(effectName)("Checkbox").setValue(switchInput);
                }
            }
        }
    //}

    function findSlateCompID(sbgID) {
        
        for (var i = 1; i <= app.project.numItems; i++) {
            
            if (app.project.item(i) instanceof CompItem) {
                if (app.project.item(i).id == sbgID) {
            //  hledane bgComp
                var result = app.project.item(i);
                //break;
                    }
                }
            }
        return result;
        }
//======================================callback funkce pro sl2
    function layerInspection2(comp, wantedCompName) {
        var regex = wantedCompName;
        var layerArr = comp.layers; // prohlidka vrstev
        var slateArrL = [];
        for (var j = 1; j <= layerArr.length; j++) {
            var layerName = layerArr[j].name;
            //alert(layerName);
            var slateSearch = regex.test(layerName);    //  je vrstva slate?
            //alert(slateSearch);

            if (slateSearch) {  // pokud je vrstva slate jdeme ho hledat
                slateArrL.push(layerArr[j]);
            }
        }
        //alert(slateArrL);
        return slateArrL;                  
    }
//======================================callback funkce pro sl2
//  SlateOvator_part_02
//  v13
var slateOvator2Undo = 'Change something in multiple slates';
//  oznacit lze slate nebo kompozici

function slateOvator2(callback, fieldLayerName, newTextInput, effectName) {

app.beginUndoGroup(slateOvator2Undo);

var selected = app.project.selection; // compositions

    if (selected.length == 0) {
        alert("Select a composition");
    } else {
        compOrSlate(selected, callback, fieldLayerName, newTextInput, effectName);
    }

app.endUndoGroup();

//  slate or comp?
//  varianta 1 asks if compName is slate...?
    function compOrSlate(selectedComps, callback, fieldLayerName, newTextInput, effectName) {
        var regex = slateRegex();
        //  prochazime vyber
        for (var i = 0; i < selectedComps.length; i++) {
            if (selectedComps[i] instanceof CompItem) {
            
                var compName = selectedComps[i].name;
                var slateSearch = regex.test(compName);    //  je comp slate?

                if (slateSearch) {  // pokud je comp slate jdeme dovnitr
                    compNamesMultiSlate(selectedComps[i], callback, fieldLayerName, newTextInput, effectName);
                            //break;
                } else {    //  pokud neni, hledame jestli je uvnitr slate
                // pole jmen slatu v comp
                var slateArr = layerInspection(selectedComps[i], regex);
                if (slateArr.length == 1) {
                    var slateLayer = slateArr[0];
                    findSlateComp(slateLayer, fieldLayerName, newTextInput, effectName);
                } else {
                    alert('Too many or no slates.')
                    }
                }
            }
        }
    }
    //  hleda jmena slatu v comp - zrusit a vymenit za layerInspection2
    function layerInspection(comp, wantedCompName) {
        var regex = wantedCompName;
        var layerArr = comp.layers; // prohlidka vrstev
        var slateLayersArr = [];
        for (var j = 1; j <= layerArr.length; j++) {
            var layerName = layerArr[j].name;
            //alert(layerName);
            var slateSearch = regex.test(layerName);    //  je vrstva slate?
            //alert(slateSearch);

            if (slateSearch) {  // pokud je vrstva slate jdeme ho hledat
                slateLayersArr.push(layerArr[j]);
            }
        }
        //alert(slateNamesArr);
        return slateLayersArr;                  
    }
    
        //  hledame slateComp (dle jmena)
        function findSlateComp(layer, fieldLayerName, newTextInput, effectName) {
            var layerSourceCompID = layer.source.id;
            
            for (var i = 1; i <= app.project.numItems; i++) {
            
            if (app.project.item(i) instanceof CompItem) {
                if (app.project.item(i).id == layerSourceCompID) {
            //  nasli jsme comp (slate) =>
            compNamesMultiSlate(app.project.item(i), callback, fieldLayerName, newTextInput, effectName);
            break;  //  verze s regexem jinak cykli
                    //    }
                    }
                }
            }
        }

    //  Spusti vkladac pokud je slate pouzit prave v jedne kompozici
        function compNamesMultiSlate(selectedComp, callback, fieldLayerName, newTextInput, effectName) {
            //  hledame pole parentComp (kde je pouzit)
            if (selectedComp instanceof CompItem) {
                    var parentComp = selectedComp.usedIn; //arr
                // pokud je parentComp jen jedna spusti vkladac
                if (parentComp.length == 1) {
                    var parentCompName = parentComp[0].name;  //arr to string
                    var newExpression = "comp(\"" + parentCompName + "\"" + ").name;";
                    
                    if (callback == compNameVkladOvator) {
                        newTextInput = newExpression;
                    }
                    
                    callback(selectedComp, fieldLayerName, newTextInput, effectName);
                    //compNameVkladOvator(selectedComp, newExpression);
                } else if (parentComp.length > 1) {
                    alert("Slate " + selectedComp.name + " can only be used once.");
                } else if (parentComp.length < 1) {
                    alert("Slate " + selectedComp.name + " not used.");
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