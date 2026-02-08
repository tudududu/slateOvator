//  slateOvator
//  240423_v15e2

// v01 240103 joining parts 1, 2, 3
// v02 slateOvator_part3 v08h Insert slate into composition aplikaceDoComp(), fitToCompSize()
// v03 slateOvator_part3 v08h limited to CompItem
// v05 SlateOvator_part_02: compNamesMultiFnc
// v07_wip fixing broken expressions due to the change of the name (fail)
// v07 slateOvator_part04a duplikat kompozice s apendixem do podslozky v parentFoldru
// v08 zacleneni part3 do part4
// v09 insert compName via callback
// v11 uprava prepisovace poli pro slate i comp
// v12 vypinace tagy
// v13 prepina se pouze logo bg pouzite ve slatu - id
// v14 totez pro slate: id misto jmena
// v14c deleteLayers() odemknuti zamcenych vrstev, aby se odstranily, pokud jsou zamčené
// v15 uprava copy() pro kopiruji masterComp vcetne parametru
// v15c slateSarchAdvanced(regex)  (updated function placeTheSlate)
// v15d layer name vs. layer source name - placeTheSlate(), slateSearchAdvanced()
// v15d v kompozici hleda podle nazvu zdroje a ne vrstvy (layer.source.name instead of layer.name)
// v15d2 hledani nejnovejsiho i v 'master' slozce
// v15d3 osetreno cislovani novych slatu - token search - nameNewSlate()
// v15d4 nwItmSplt rozsiren split(/_| |-/g);
// v15e pridano compNameFromSlate()
// v15e1 uprava compNameFromSlate()
// v15e2 uprava folderStructure()

//  v15x UI - compFolderLevel (ne)funkcnost, closable, (fce folderStructure)
//  vXX vicekrat pouzity slateSarch vyhodit do fce
//  vXX focus target
//  vXX z callback fci oddelat instanceof pokud nejsou potreba

(function (thisObj) {
    
    newPanel(thisObj);

    function newPanel(thisObj) {

        var vers = '15e2';
        var title = 'slate0vator (v' + vers + ')';
    
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
        var slateInsertBtn = panelFour.add('button', undefined, 'Insert slate');

        //  panelThree
        var panelThree = win.add('panel', undefined, 'Pass the compName to the slate');
            panelThree.orientation = 'column';
            panelThree.alignChildren = 'fill';
        //  apply Button
        var compNameBtn = panelThree.add('button', undefined, 'Fill the slate');
        
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
        var prebalovatorBtn = panelTwo.add('button', undefined, 'Output comps');

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

        //  panelOneB
        var panelOneB = win.add('panel', undefined, 'CompName from slate to outComp');
            panelOneB.orientation = 'column';
            panelOneB.alignChildren = 'fill';
        //  apply Button
        var compNameBtn2 = panelOneB.add('button', undefined, 'Change outComp name');
        
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
        function triggerCompNameBack() {
        slateOvator2(compNameFromSlate);
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
        compNameBtn2.onClick = triggerCompNameBack;

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
            slateOvator2(logoTlacitkovatOr, switchesLayerName, checkbox_Logo.value, 'logo_Switch');
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

//---------------------------------------------------
//---------------------------------------------------
Array.prototype.myIncludes = function(callback) {
      var result;
      var i = 0;
      do {
        if (this[i] === callback) {
        result = true;
        } else {
        result = false;
        }
        i = i + 1;
      } while (i < this.length && result == false);
      return result;
  }

Array.prototype.myFilter = function(callback) {
  const newArray = [];
  for(var i = 0; i < this.length; i++) {
    if (callback(this[i], i, this)) {
      newArray.push(this[i]);
        }
    }
    return newArray;
}

Array.prototype.myMap = function(callback) {
    var newArray = [];
    for(var i = 0; i < this.length; i++) {
        newArray.push(callback(this[i], i, this));
    }
    return newArray;
}

//---------------------------------------------------
//---------------------------------------------------

// -------------------- regex
function slateRegex() {
    var slateRegex = /^slate_\(v\d{6}\)/;
    return slateRegex;
}
function slateRegexSimple() {
    var slateRegex = /^slate_/;
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
    function compNameVkladOvator(slateComp, layerName, newText) {
        
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

    function logoTlacitkovatOr(compSelection, layerName, switchInput, effectName) {
        //var bgCompName = 'slateBg_DuoLogo';
        var bgCompNameRegex = /slateBg_DuoLogo/;
        //  hledame bgLayer ve slatu dle jmena
        var slateBgLayer = layerInspection(compSelection, bgCompNameRegex);
        // mozna jeste upravit
        var sbgID = slateBgLayer[0].source.id;
        //  search bgComp in proj by id
        var slateBgComp = findCompByID(sbgID);
        var layerArr = slateBgComp.layers;
        //  search layer in bgComp
        for (var i = 1; i <= layerArr.length; i++) {
            if (layerArr[i].name == layerName) {
                layerArr[i].effect(effectName)("Checkbox").setValue(switchInput);
                }
            }
        }
    
    function compNameFromSlate(slateCompL, layerName, parentComp) {
        //  layerName - neni pouzita
        var layerNameRegex = /fileNameDuo/;
        //  hledame layer ve slatu dle jmena
        var targetLayerArr = layerInspection(slateCompL, layerNameRegex);
        
        var targetLayer = targetLayerArr[0];
        var newName0 = targetLayer.text.sourceText.value.text;
        var newName = newName0.replace(/ /g, '_');
        var oldName = parentComp.name;
        parentComp.name = newName;
        app.project.autoFixExpressions(oldName, newName);
        }
    
//======================================helper fnc for so2
    function findCompByID(sbgID) {
        
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

//  hleda jmena slatu v comp - zrusit a vymenit za layerInspection
//  pozor hledame take v function aplikaceDoComp, ale ne pomoci layerInspection
//  predelat a pouzit vsude toto

    function layerInspection(comp, wantedCompName) {
        var regex = wantedCompName;
        var compLayerArr = comp.layers; // prohlidka vrstev
        var foundLayersArr = [];
        for (var j = 1; j <= compLayerArr.length; j++) {
            var layerName = compLayerArr[j].name;
            //alert(layerName);
            var slateSearch = regex.test(layerName);    //  je vrstva slate?
            //alert(slateSearch);

            if (slateSearch) {  // pokud je vrstva slate jdeme ho hledat
                foundLayersArr.push(compLayerArr[j]);
            }
        }
        //alert(foundLayersArr);
        return foundLayersArr;                  
    }



//======================================
//======================================
//  SlateOvator_part_02
//  v14
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
        // ??? k cemu je zde
        var regex = slateRegexSimple();
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
                    alert('Too many or no slates.');
                    //Or if the slate is there its name is not in format \"slate_(vYYMMDD)\".
                    }
                }
            }
        }
    }
        
        //  hledame slateComp (dle jmena)
        function findSlateComp(layer, fieldLayerName, newTextInput, effectName) {
            var layerSourceCompID = layer.source.id;
            
            var slateComp = findCompByID(layerSourceCompID);
            //  nasli jsme comp (slate) =>
            compNamesMultiSlate(slateComp, callback, fieldLayerName, newTextInput, effectName);
            
        }
        

    //  Spusti vkladac pokud je slate pouzit prave v jedne kompozici
        function compNamesMultiSlate(slateCompL, callback, fieldLayerName, newTextInput, effectName) {
            //  hledame pole parentComp (kde je pouzit)
            if (slateCompL instanceof CompItem) {
                    var parentComp = slateCompL.usedIn; //arr
                // pokud je parentComp jen jedna spusti vkladac
                if (parentComp.length == 1) {
                    var parentCompName = parentComp[0].name;  //arr to string
                    var newExpression = "comp(\"" + parentCompName + "\"" + ").name;";
                    
                    if (callback == compNameVkladOvator) {
                        newTextInput = newExpression;
                    } else if (callback == compNameFromSlate) {
                        newTextInput = parentComp[0];
                    }
                    //  newTextInput predelat na newInput
                    //  newTextInput predelat na newInput
                    //  newTextInput predelat na newInput
                    callback(slateCompL, fieldLayerName, newTextInput, effectName);
                    //compNameVkladOvator(slateCompL, newExpression);
                } else if (parentComp.length > 1) {
                    alert("Slate " + slateCompL.name + " can only be used once.");
                } else if (parentComp.length < 1) {
                    alert("Slate " + slateCompL.name + " not used.");
                }
            }
        }

}

//======================================
//======================================
//  slateOvator_part3
//  v09
//  Insert slate into composition
//  Rozdelen na engine a smycku, aby se engin dal pouzit v casti 4

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

    //  opakovani pro vyber komopzic
    function placeSlateMultiComp(compSelection, regex) {
        for (var j = 0; j < compSelection.length; j++) {
            if (compSelection[j] instanceof CompItem) {
                var compMaster = compSelection[j];
                var compOut = compSelection[j];
            insertSlateEngine(compMaster, compOut, regex);
            }
        }
    }
}

function insertSlateEngine(compMaster, compOut, regex) {
    
    aplikaceDoComp(compMaster, compOut, regex);

        //  zjistuje jestli v kompozici uz neni slate
        function aplikaceDoComp(compMaster, compOut, regex) { // theComp je objekt (polozka z pole)
            
            var layerArr = compOut.layers;
            
            if (layerArr.length == 0) {
                placeTheSlate(compMaster, compOut, regex);
            } else if (layerArr.length > 0) {
        //make func // pozor - function layerInspection
                for (var i = 1; i <= layerArr.length; i++) {
                    var layerName = layerArr[i].source.name;
                    var slateSearch = regex.test(layerName);

                    if (slateSearch) {  //pokud ano konci
                        alert('Slate alredy present.');
                        //  nedame ho tam take?
                        break;
                    } else {
                        placeTheSlate(compMaster, compOut, regex);
                        break;
                    }
                }
            }

            for (var i = 1; i <= layerArr.length; i++) {
                var layerName = layerArr[i].name;
                var slateSearch = regex.test(layerName);
                if (slateSearch) {
                    var layerObj = layerArr[i];
                    fitToCompSize(compOut, layerObj);
                }
            }
            compOut.displayStartTime = -1; //musi to byt tady?
        }

//---------------------------------------------------
//---------------------------------------------------
        //  vkladame kopii slatu do kompozice
        //  compMaster kvuli vyhledavani v zavoslosti na umisteni masteru
        function placeTheSlate(compMaster, compOut, regex) {    // theComp je objekt (polozka z pole)

            var slateMaster = slateSearchAdvanced(compMaster, regex);
            //alert(slate.name);
            var newName = nameNewSlate(slateMaster, regex);
            var newSlate = slateMaster.duplicate();
                newSlate.name = newName;
                compOut.layers.add(newSlate);
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
        var outFolderName = "out";
        //var masterAppendix    //presunout sem
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
        var mDuration = myCompMaster.duration;
        var outDuration = mDuration + 1;
        var mName = myCompMaster.name;
        var mWidth = myCompMaster.width;
        var mHeight = myCompMaster.height;
        var mPixelAspect = myCompMaster.pixelAspect;
        var mFrameRate = myCompMaster.frameRate;
        
        //var myCompOut = myCompMaster.duplicate();
        var myCompOut = app.project.items.addComp(mDuration, mWidth, mHeight, mPixelAspect, outDuration, mFrameRate);
            myCompOut.displayStartTime = -1;

        naming(myCompMaster, myCompOut);
        //deleteLayers(myCompOut);
        prebalovator(myCompMaster, myCompOut, regex);
//  lepe popsat pochopit, doresit 'out' uroven aby fungovala
        var pathItemsArr = folderPath(myCompMaster);
        //  parent folder pro outComp s celou cestou az k 'out'
        //  ?? folderStructure vraci prvni slozku v rade za selectedComp
        var myCompOutFolderParent = folderStructure(pathItemsArr);
        //  setting FP for outComp
        myCompOut.parentFolder = myCompOutFolderParent;
    }

    //  delete layers in myCompOut
    function deleteLayers(comp) {         
        var compLayers = comp.layers;
        for (var i = compLayers.length; i >= 1; i--) {
            var curLayer = compLayers[i];
            curLayer.locked = false;
            curLayer.remove();
        }
    }

    //  passar o master pro outComp
    function prebalovator(compMaster, compOut, regex) {
        var compOutLayers = compOut.layers;
            compOutLayers.add(compMaster);
            compOut.layer(1).startTime = 1;
            insertSlateEngine(compMaster, compOut, regex);
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
        var compFolderLevel = parseInt(inputFolderLevelL);
        var outFolderIndex = (compFolderLevel - 2);
        //  parent pro 'out'
        
        if (outFolderIndex > 0 && outFolderIndex <= compFolderLevel) {
            var outFolderParent = itemsArr[itemsArr.length - outFolderIndex];
            } else {
                outFolderParent = app.project.rootFolder;
            }
        
        //  delame 'out' a nastavujeme jako parent pro 1. slozku
        var folderParent = makeFolder(outFolderName, outFolderParent);

        //  prochazime cestu delame slozky
        //  zacatek za selectedComp (i > 1)
        //  konec (path.length - x) obsah 'comp', x = compFolderLevel
        
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

//---------------------------------------------------
//  slateSearch
//---------------------------------------------------

function slateSearchAdvanced(selectedComp, regexSlateGlobal) {
    var result;
    const slateInPlaceTest = slateSearch1(selectedComp, regexSlateGlobal);
    const globalSlates = searchGlobal(regexSlateGlobal);
    
    if(slateInPlaceTest.length > 0) {
        result = theBlueprint(theNewest(slateInPlaceTest, regexSlateGlobal));
    } else {
        result = theBlueprint(theNewest(globalSlates, regexSlateGlobal));
    }
    return result;
}
//theNewest(slateArr, regexG) {
    //const slateArr = searchGlobal(regexG);
//---------------------------------------------------
//  search for the newest instance of the slate or the one from the very project
//---------------------------------------------------
//  1. the slate from the very project - tam kde ma byt
//  srovnava cestu k oznacene kompozoci s cestou ke slatu
//  a vybira slaty, ktere maji cast cesty spolecnou: commonPathLength
//  uklada to co je v obou stejne, vse je tedy 2x
//---------------------------------------------------
function slateSearch1(selectedComp, regex) {
    const slateArr = [];
    var commonPathLength = 2;   // 2 = shoda alespon v jedne polozce (kazda shoda je 2x)
    var selectedCompPath = cesta(selectedComp); //  cesta k oznacene kompozici
    var comparePath = [];   //vysledek srovnani obou cest
    
    for (var i = 1; i <= app.project.numItems; i++) { // procura do slate(name)
        if (app.project.item(i) instanceof CompItem) {
        var testNameStr = app.project.item(i).name;
        var slateSearch = regex.test(testNameStr);
        
        if (slateSearch) {
        var slate = app.project.item(i);
        var slatePath = cesta(slate);
        comparePath = commonArray(selectedCompPath, slatePath);
        
        if (comparePath.length > commonPathLength) {
            slateArr.push(slate);
                }
            }
        }
    }
    return slateArr;
}
//---------------------------------------------------
//  2. search in the whole project for the newest instance of the slate
//---------------------------------------------------
//  1. vyhledame vsechny slaty v proj
//  predelat, tak aby se dalo hledat i ve slozce slate
//  tj. zadavame kde bude hledat
function searchGlobal(regexL) {
    const slateArr = [];
    for (var i = 1; i <= app.project.numItems; i++) { // procura do slate(name)
    if (app.project.item(i) instanceof CompItem) {
        var testNameStr = app.project.item(i).name;
        var slateSearch = regexL.test(testNameStr);
        
        if (slateSearch) {
        var slate = app.project.item(i);
        //var slateName = slate.name;
        slateArr.push(slate);
            }
        }
    }
    return slateArr;
}

//---------------------------------------------------
// cesta ve strukture slozek
function cesta(projectItem) {
    
    const objArr = [];
        
    do {
        if(projectItem.parentFolder != app.project.rootFolder) {
            projectItem = projectItem.parentFolder;           
        }
        objArr.push(projectItem.id);  //projectItem.name - pokud bychom potrebovali jmena
    } while(projectItem.parentFolder != app.project.rootFolder);
    
    return objArr;
}
//---------------------------------------------------
//  v obou stejne
function commonArray(arr1, arr2) {

  const oneArr = arr1.concat(arr2);
  
    const newArr = oneArr.myFilter(function(item) {
    return arr1.myIncludes(item) && arr2.myIncludes(item);
    })
  return newArr;
}
//---------------------------------------------------
//  2. sort
//pozor funguje i s polem stringu, ale spatne
function sortAlphabetOrder(arr) {
  const arrCopy = arr.slice();
  return arrCopy.sort(function(a, b) {
    return a.name === b.name ? 0 : a.name > b.name ? 1 : -1;
  })
}

function sortReverseOrder(arr) {
  const arrCopy = arr.slice();
  return arrCopy.sort(function(a, b) {
    return a.name === b.name ? 0 : a.name < b.name ? 1 : -1;
  })
}
//---------------------------------------------------
//  3. vybereme nejnovejsi slateName z pole vsech slatu
function theNewestSlateName(slateArr) {
    //var slateArr = searchGlobal(regexSlateGlobal);
    //  abecedni serazeni sestupne
    const arrRevSorted = sortReverseOrder(slateArr);
    //  test sort fce - jen pro zobrazeni jestli funguje
    /*var testArr = arrRevSorted.myMap(function(item) {
        return item.name;
    });*/
    //  jmeno nejnovejsiho slatu
    var latestSlateName = arrRevSorted[0].name;
    //  date substr 
    var latestSlateNameCrop = latestSlateName.substr(0, 15);
    return latestSlateNameCrop;
}

//---------------------------------------------------
//  4. regex pro hledani nejnov

    //zavorky musi byt oznaceny '\', aby byly string, ex: /^slate_\(v240300\)/;

function slateRegexNewest(arr, regexG) {
    var str = theNewestSlateName(arr);
    //var str = "/^" + name + "/";  
    //neni mozne takto vkladat promennou do regexu, je pak string a be objekt
    //pridavame backslash do regexu pred zavorky
        var fixRegex1 = /\(/;
        var fixRegex2 = /\)/;
        var replaceText1 = "\\(";   //  jeden backSlash do regexu a jeden k zavorce v tomto stringu
        var replaceText2 = "\\)";
        var resultHalf = str.replace(fixRegex1, replaceText1);
        var result = resultHalf.replace(fixRegex2, replaceText2);
        //promenna do regexu
    return new RegExp("^" + result);
}
// --------------------


//---------------------------------------------------
//  5. pole nejnovejsich

function theNewest(slateArr, regexG) {
    //const slateArr = searchGlobal(regexG);
    var regexL = slateRegexNewest(slateArr, regexG);
    const arrRevSorted = sortReverseOrder(slateArr);
    var newestOnly = arrRevSorted.myFilter(function(item) {
        
        return regexL.test(item.name);
    })
    //test
    /*var newestOnlyNames = newestOnly.myMap(function(item) {
        return item.name;
    })*/
    return newestOnly;
}

//  6. nejstarsi z nejnovejsich - cislo 01
function theBlueprint(arr) {
    //var newestSlatesArr = theNewest(regexSlateGlobal);
    const arrSorted = sortAlphabetOrder(arr);
    return arrSorted[0];
}

//---------------------------------------------------
    function searchInFldr(fldrItms, regexL) {
    const arr = [];
    for (var i = 1 ; i <= fldrItms.length; i++){
        var testNameStr = fldrItms[i].name;
        var slateSearch = regexL.test(testNameStr);
        
        if (slateSearch) {
        arr.push(fldrItms[i]);
            }
        }
        return arr;
    }
//---------------------------------------------------
function nameNewSlate(slateComp, regexL) {
 
    //  parentFolder
    var slateParentFldr = slateComp.parentFolder;
    var folderItems = slateParentFldr.items;
    
    //  arr slates of this date/version in pF
    
    const slatesInFolderArr = searchInFldr(folderItems, regexL);
    const arrRevSorted = sortReverseOrder(slatesInFolderArr);
    //const testArr = theNewest(arr, regexL);   // lze pouzit, ale je to zbytecne slozite

    var theNewestItem = arrRevSorted[0].name;
    const nwItmSplt = theNewestItem.split(/_| |-/g);
    var itemNumberStr = nwItmSplt[2];
    var itemNumber = parseInt(itemNumberStr);
    var newNumber = (itemNumber + 1);
    var newNumberStr = '0' + String(newNumber);
    var newName = nwItmSplt[0] + '_' + nwItmSplt[1] + '_' + newNumberStr;

    return newName;
    }



//---------------------------------------------------
//  slateSearch scenar
//---------------------------------------------------
   //  vstup: slate
    //  parentFolder
    //  arr slates of this date/version in pF
    //  sort
    //  last in folder
    //  token 3
    //  t3 + 1
    //  compose name
    //  return
    
//---------------------------------------------------


})(this);