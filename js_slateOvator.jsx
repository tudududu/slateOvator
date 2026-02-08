/* slateOvator
250321_v16a04

v01 240103 joining parts 1, 2, 3
v02 slateOvator_part3 v08h Insert slate into composition aplikaceDoComp(), fitToCompSize()
v03 slateOvator_part3 v08h limited to CompItem
v05 SlateOvator_part_02: compNamesMultiFnc
v07 wip fixing broken expressions due to the change of the name (fail)
v07 slateOvator_part04a duplikat kompozice s apendixem do podslozky v parentFoldru
v08 zacleneni part3 do part4
v09 insert compName via callback
v11 uprava prepisovace poli pro slate i comp
v12 vypinace tagy
v13 prepina se pouze logo bg pouzite ve slatu - id
v14 totez pro slate: id misto jmena
v14c deleteLayers() odemknuti zamcenych vrstev, aby se odstranily, pokud jsou zamčené
v15 uprava copy() pro kopiruji masterComp vcetne parametru
v15c slateSarchAdvanced(regex)  (updated function placeTheSlate)
v15d layer name vs. layer source name - placeTheSlate(), slateSearchAdvanced()
v15d v kompozici hleda podle nazvu zdroje a ne vrstvy (layer.source.name instead of layer.name)
v15d2 hledani nejnovejsiho i v 'master' slozce
v15d3 osetreno cislovani novych slatu - token search - nameNewSlate()
v15d4 nwItmSplt rozsiren split(/_| |-/g);
v15e pridano compNameFromSlate()
v15e1 uprava compNameFromSlate()
v15e2 uprava folderStructure()
v15e3 UI: tab through edittext fields - Preskupeni: misto skupin pole s tlacitkem je skupina poli a skup. tlacitek.
v15e3 UI: compFolderLevel field: (ne)funkcnost (fce folderStructure) - opraveno
v15e4 UI: compFolderLevel field: bud odstranit nebo closable, (fce folderStructure)
      odstraneno, automatizovano - hleda "comps", pokud comps !== 1 out bude v root
v15e5 ucesani automatizace compFolderLevel
v15e6 UI: compFolderLevel field (inputFolderLevel): vraceno
v15e7 UI: output comps pokus o 'justify fill'
15e8  output comps 'justify fill' uspech (viz Variable fonts panel)
15e9  nameNewSlate() - oprava nad 10. Od cisla slatu 10 pojmenovan 010, spatne
      se radi a tim padem je jako posledni vyhodnocen znovu c. 09
      opraveno provizorne tak ze nula se pridava jen k jednocifernym cislum
      oprava layerInspection() nenasel state pokud byl prejmenovany uvnitr comp
15e10 layerInspectToComp() zjednoduseni v pripade slatu
      layerInspectToComp() misto layerInspection():
      misto AVLayer davame rovnou CompItem findSlateComp() tim padem vyrazena
      POZOR layerInspection() je stale pouzit v logoTlacitkovatOr(), compNameFromSlate()
15e11 240914  nameNewSlate() vyreseno hledani posledni kopie slatu (99, 100, 101) 3 reseni
15e12 240914  nameNewSlate() reseni 3 (jistota)
15e13 241107  simple output slate insertion
15f01 uplne prekopani - zjednoduseni zaverecne casti nove kopie slatu
15f02 aplikaceDoComp() misto insertSlateEngine()
15f03 compLengthAdjust()
15f04 compLengthAdjust() - posun vrstev a prodlouzeni kompozice pouze pokud neni slate, jinak se posune pouze zacatek kompozice
15f05 insertSlateEngine() - hledani slatu v kompozici a podle toho se rozhodne, jestli se bude prodlužovat a posouvat, nebo jen posouvat zacatek
15f06 UI: radiobutton pro complete vs simple insert - pouze vlozeni slatu bez prodlouzeni a posunu, pripadne s prodlouzenim a posunem
15f07 insertSlateEngine()
15f08 insertSlateEngine() - osetreno, aby se slate vkladalo pouze jednou, i kdyz je v kompozici více vrstev se slatem (prejmenovanych)
15f01-08    slate lze vlozit primo do kompozice zaroven s posunutim vrstev (slateShift)
15f09 vsechny 3 funkce svedeny do spolecneho "Slate insert" btn, zrusen prebalovator
15f10 win.slateInsertBtn ->  var slateInsertBtn
15f11 insert slate kontrolouje pouze 1. vrstvu jestli neni slate uz v kompozici
      opraveno v insertSlateEngine()
      jeste stale bez layerInspection()
15f12 vlozen layerInspectToComp() do insertSlateEngine()
15f14 UI: barevna kontrolka vlevo u 'Comp name from slate' pouze pri hoveru nad tlacitkem
15f15 UI: barevna kontrolka vpravo u 'Comp name from slate', (comp|comps)
15f16 UI: kompaktnejsi design - zrusen panel04, barevna kontrolka vpravo u 'Comp name from slate'
15f17 UI: barevna kontrolka vpravo u 'Comp name from slate', tlacitko se neroztahuje na celou sirku panelu, pouze do velikosti textu, zrusen align fill, pridano spacing mezi radiobuttony, zrusen panel03, integrace do panel05, zrusen label u panel05, uprava textu radiobuttonu, zrusen panel04 a integrace do panel05, zrusen label u panel04
15f18 UI: btns panel05.preferredSize
15f19 UI: compNameFSBtn s barevnou kontrolkou, neroztahuje se na celou sirku panelu
15f20 UI: compNameFSBtn fixed preferredSize
15f21 UI: compNameFSBtn barevna kontrolka nad
15f14-15f21 UI: pokusy s pridanim barevne kontrolky pro 'compNameFSBtn', idealni cil je mit kontrolku na strane tlacitka, coz koliduje s align fill - tlacitko se neroztahuje nasiru panelu
15f22 Navrat k 15f16, UI: compNameFSBtn barevna kontrolka vypnuta
15g01 slateSearchGlobal() misto slateSearchAdvanced()
16a00 slateSearchAdvanced() misto slateSearchGlobal()
16a01 slateSearchAdvanced()
16a02 slateSearch_v02 - hleda nejnovejsi verzi slatu v celem AE projektu
        prednost ma slate z vlastniho projektu, v pripade ze je i tam
        NEFUNGUJE spravne - najde nejnovejsi, ale pojmenuje ho jmenem starsi verze
16a03 nouzova oprava - popsat
      - dalsi problem 1169 - popsat
      - pri absenci slatu skonci uprostred, bez vysvestleni - hlaska
      - nefunguje vyhledavani slatu (napr. pokud je v importu)
16a04 nastaveny podminky v slateSearchAdvanced() - pokud neni nalezen slate v projektu nebo mimo nebo vubec, proces se nezastavi
      v pripade, ze slate je jen jeden projevi se chyba - opakuje se theNewest() a do vstupniho pole se prida undefined a zastavi se sortReverseOrder()
      ted opravim primo v slateSearchAdvanced(), ale pozdeji se k tomu vratim

vXX vicekrat pouzity slateSarch vyhodit do fce
vXX focus target
vXX z callback fci oddelat instanceof pokud nejsou potreba
*/

(function (thisObj) {
    
    newPanel(thisObj);

    function newPanel(thisObj) {

        var vers = '16a04';
        var title = 'slate0vator (v' + vers + ')';
    
        var win = (thisObj instanceof Panel) ? thisObj 
        : new Window('palette', title, undefined);
        win.orientation = 'column';
        win.alignChildren = 'fill';
        win.preferredSize = [200, 300];
        var buttonSize = [30, 23];
 
        function doTextChange(target, newText) {
            target.text = newText;
        }
        //  --------panel05--------Insert slate into composition--------
        var panel05 = win.add('panel', undefined, undefined);
            panel05.orientation = 'column';
            panel05.alignChildren = 'fill';
        var panel05_g01 = panel05.add("group", undefined, { name: "panel05_g01" });
            panel05_g01.orientation = "row";
            panel05_g01.alignment = "fill";
            panel05_g01.alignChildren = ["fill", "center"];
            panel05_g01.spacing = 10;
            panel05_g01.margins = 0;
        //  label
        //var label = panel05.add('statictext', undefined, 'Insert slate into composition');
        //  apply Button
        var slateInsertBtn = panel05.add('button', undefined, 'Complete insert');
    
            // win.repRad = win.panel05.add('radiobutton', [14,13,174,35], 'Search and Replace');
        var comRad = panel05_g01.add('radiobutton', undefined, 'Complete');
            comRad.alignChildren = 'fill';
            comRad.value = true;
            comRad.onClick = function () {
                doTextChange(slateInsertBtn, 'Complete insert');
            };
        var insRad = panel05_g01.add('radiobutton', undefined, 'Simple');
            insRad.alignChildren = 'fill';
            insRad.onClick = function () {
                doTextChange(slateInsertBtn, 'Simple insert');
            };
        var outRad = panel05_g01.add('radiobutton', undefined, 'Out');
            outRad.alignChildren = 'fill';
            outRad.onClick = function () {
                doTextChange(slateInsertBtn, 'Out comps');
            };

        //  --------panel04--------Fill the slate--------
        // var panel04 = win.add('panel', undefined, undefined);
        //     panel04.orientation = 'column';
        //     panel04.alignChildren = 'fill';
        //var label = panel05.add('statictext', undefined, "Pass comp name into the slate");
        //  apply Button
        var fillSlateBtn = panel05.add('button', undefined, 'Fill the slate');
        
        //  --------panel03--------Output comps--------
        //  integrovano do panel05 Insert
        // var panel03 = win.add('panel', undefined, 'Make output compositions');
        //     panel03.orientation = 'column';
        //     panel03.alignChildren = 'fill';
        // var panel03_g01 = panel03.add("group", undefined, { name: "panel03_g01" });
        //     panel03_g01.orientation = "row";
        //     panel03_g01.alignment = "fill";
        //     panel03_g01.alignChildren = ["fill", "center"];
        //     panel03_g01.spacing = 10;
        //     panel03_g01.margins = 0;
        //  folder level field + popisek
        /* var panel03_groupOne = panel03.add('group', undefined, 'panel03_groupOne');
            panel03_groupOne.orientation = 'row';
            panel03_groupOne.preferredSize = [200, 30];
            panel03_groupOne.alignChildren = 'fill'; */
        
        //  apply Button
        // var prebalovatorBtn = panel03_g01.add('button', undefined, 'Output comps');
        //     prebalovatorBtn.alignChildren = 'fill';
        //     prebalovatorBtn.preferredSize = [200, 30];
        //var inputLabel = panel03_groupOne.add('statictext', undefined, 'Set the Comps folder level:');
        /* var inputFolderLevel = panel03_g01.add('edittext', undefined, '3', {enterKeySignalsOnChange: false});
            inputFolderLevel.characters = 4;
            inputFolderLevel.expanded = false; // co to je? */
        // tentei a fazer isto a poder esconder, mas ficou para depois...

        //  --------panel02--------fields--------
        var panel02 = win.add('panel', undefined, 'Fields');
            panel02.orientation = 'row';
            panel02.alignChildren = 'right';
        var panel02_groupA = panel02.add('group', undefined, 'panel02_groupA');
            panel02_groupA.orientation = 'column';
            panel02_groupA.alignChildren = 'right';
        var panel02_groupB = panel02.add('group', undefined, 'panel02_groupB');
            panel02_groupB.orientation = 'row';
        var panel02_group_1 = panel02_groupA.add('group', undefined, 'panel02_group_1');
            panel02_group_1.orientation = 'row';
        var panel02_group_2 = panel02_groupA.add('group', undefined, 'panel02_group_2');
            panel02_group_2.orientation = 'row';
        var panel02_group_3 = panel02_groupA.add('group', undefined, 'panel02_group_3');
            panel02_group_3.orientation = 'row';
        var panel02_group_4 = panel02_groupB.add('group', undefined, 'panel02_group_4');
            panel02_group_4.orientation = 'column';

        //  label
        var labelOne = panel02_group_1.add('statictext', undefined, 'Media: ');
        var labelTwo = panel02_group_2.add('statictext', undefined, 'SoundLevel: ');
        var labelThree = panel02_group_3.add('statictext', undefined, 'Operator: ');
        //  input text
        //var inputMedia = panel02_group_1.add('edittext', undefined, 'TV');
        var inputMedia = panel02_group_1.add('edittext', undefined, 'TV', {enterKeySignalsOnChange: false});
            inputMedia.characters = 10;
        //var inputSoundLevel = panel02_group_2.add('edittext', undefined, 'soundLevel');
        var inputSoundLevel = panel02_group_2.add('edittext', undefined, 'soundLevel', {enterKeySignalsOnChange: false});
            inputSoundLevel.characters = 10;
        //var inputOperator = panel02_group_3.add('edittext', undefined, 'yourName');
        var inputOperator = panel02_group_3.add('edittext', undefined, 'yourName', {enterKeySignalsOnChange: false});
            inputOperator.characters = 10;
        
        //  apply Button
        var btn01_media = panel02_group_4.add('button', undefined, 'OK');
            btn01_media.size = buttonSize;
        var btn02_sndLvl = panel02_group_4.add('button', undefined, 'OK');
            btn02_sndLvl.size = buttonSize;
        var btn03_Operator = panel02_group_4.add('button', undefined, 'OK');
            btn03_Operator.size = buttonSize;
        
        //  --------panel01--------Comp name from slate--------
        var panel01 = win.add('panel', undefined, undefined, {borderStyle: "sunken"});
            panel01.orientation = 'column';
            panel01.alignChildren = 'fill';
        // var panel01_g01 = panel01.add("group", undefined, { name: "panel01_g01" });
        //     panel01_g01.orientation = "row";
        //     panel01_g01.alignment = "fill";
        //     panel01_g01.alignChildren = ["fill", "center"];
        //     panel01_g01.spacing = 10;
        //     panel01_g01.margins = 0;

        // Apply Button
        var compNameFSBtn = panel01.add('button', undefined, 'Comp name from slate');
        // compNameFSBtn.alignChildren = 'fill';
        // compNameFSBtn.preferredSize = [200, 30];

        // // Draw colored circle element
        // var colorElement = panel01_g01.add('panel', undefined);
        // colorElement.preferredSize = [6, 30]; // Size of the colored element
        // colorElement.visible = false; // Initially hidden

        // // --- Customize Button Highlight Color ---
        // colorElement.onDraw = function () {
        //     var g = colorElement.graphics;
        //     var brush = g.newBrush(g.BrushType.SOLID_COLOR, [0.7, 0, 0.0, 1]); // color
        //     g.rectPath(0, 0, 4, 29);
        //     g.fillPath(brush);
        // };
        // // --- Variables to track mouse state ---
        // var isMouseOver = false;

        // // Mouse event handlers
        // compNameFSBtn.addEventListener('mouseover', function () {
        //     isMouseOver = true;
        //     colorElement.visible = true; // Show colored element on hover
        //     compNameFSBtn.notify('onDraw');
        // });

        // compNameFSBtn.addEventListener('mouseout', function () {
        //     isMouseOver = false;
        //     colorElement.visible = false; // Hide colored element when not hovering
        //     compNameFSBtn.notify('onDraw');
        // });

        // // Action on button click
        // compNameFSBtn.onClick = function () {
        //     slateOvator2();
        // };
        // // --- Customize Button Highlight Color --- end

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
            var switch_slateShift = true;
            if (comRad.value) {
                switch_slateShift = true;
                slateOvator3(switch_slateShift);
            } else if (insRad.value) {
                switch_slateShift = false;
                slateOvator3(switch_slateShift);
            } else if (outRad) {
                // function triggerPrebalovator()
                slateOvator4(/*inputFolderLevel.text */);
                }
        }

        inputMedia.onChange = triggerMedia;
        inputOperator.onChange = triggerOperator;
        inputSoundLevel.onChange = triggerSoundLevel;

        btn01_media.onClick = triggerMedia;
        btn02_sndLvl.onClick = triggerSoundLevel;
        btn03_Operator.onClick = triggerOperator;
    
        fillSlateBtn.onClick = triggerCompName;
        slateInsertBtn.onClick = triggerSlateInsert;
        compNameFSBtn.onClick = triggerCompNameBack;

        //  --------panel00--------switches--------
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

    //  prepis hodnoty pole ve slatu
    //  oproti slate0vatoru1 predelano z pole na objekt
    //  tj. kompzici vkladame jako objekt a ne jako pole
    function renameField(comp, fieldLayerName, newTextInput) {
    
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
        //  slateCompL - slate ze ktereho bereme jmeno
        //  layerName - neni pouzita, protoze regex je zadan natvrdo zde uvnitr // zvazit upravu
        //  parentComp - jmeno kompozice, kterou zmenime jmeno
        var regex = /fileNameDuo/;
        //  hledame layer ve slatu dle jmena (vyhledavac nemuze byt omezen na CompItem)
        var targetLayerArr = layerInspection(slateCompL, regex);
        var targetLayer = targetLayerArr[0];
        var newName0 = targetLayer.text.sourceText.value.text;
        var newName = newName0.replace(/ /g, '_');
        var oldName = parentComp.name;
        parentComp.name = newName;
        app.project.autoFixExpressions(oldName, newName);
        }
    
//======================================helper fnc
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

    //  hleda v comp vrstvu dle jmena a vraci pole >> nalezenych vrstev <<
    //  hledame objekt AV layer
    //  nehleda tedy zdroje, ale pouze nazvy vrstev v comp
    //  regex = wantedCompName - musi byt zadan regex !!!
    function layerInspection(comp, regex) {
        
        var compLayerArr = comp.layers; // prohlidka vrstev
        var foundLayersArr = [];
        for (var j = 1; j <= compLayerArr.length; j++) {
            var layerName = compLayerArr[j].name;
            var slateSearch = regex.test(layerName);
            if (slateSearch) {
                foundLayersArr.push(compLayerArr[j]);
            }
        }
        return foundLayersArr;                  
    }
    
    //  hleda v comp vrstvu dle jmena 
    //  a vraci pole >> zdroju nalezenych vrstev <<
    //  zjenousuje proces oproti layerInspectToComp(), ktera vracela objekt vrstvy
    //  regex = wantedCompName
    function layerInspectToComp(comp, regex) {
        
        var compLayerArr = comp.layers; // prohlidka vrstev
        var foundCompsArr = [];
        for (var j = 1; j <= compLayerArr.length; j++) {
            //  hledame nazev zdroje vrstvy, pokud je kompozice
            if (compLayerArr[j].source instanceof CompItem) {
                var layerName = compLayerArr[j].source.name;
                var slateSearch = regex.test(layerName);
                if (slateSearch) {
                    foundCompsArr.push(compLayerArr[j].source);
                }
            }
        }
        return foundCompsArr;                  
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
                //  je comp slate?
                var compName = selectedComps[i].name;
                var slateSearch = regex.test(compName);
                    // pokud je comp slate jdeme dovnitr
                if (slateSearch) {
                    compNamesMultiSlate(selectedComps[i], callback, fieldLayerName, newTextInput, effectName);
                    //  pokud neni, hledame jestli je uvnitr slate
                } else {    
                    // pole jmen slatu v comp
                    var slateArr = layerInspectToComp(selectedComps[i], regex);
                    if (slateArr.length == 1) {
                    //  layerInspectToComp - misto AVLayer davame rovnou CompItem
                    //  findSlateComp() tim padem vyrazena
                    var slateLayer = slateArr[0];
                    compNamesMultiSlate(slateLayer, callback, fieldLayerName, newTextInput, effectName);
                    //findSlateComp(slateLayer, fieldLayerName, newTextInput, effectName);
                } else {
                    alert('Too many or no slates.');
                    //Or if the slate is there its name is not in format \"slate_(vYYMMDD)\".
                    }
                }
            }
        }
    }
        
        //  hledame slateComp (dle id zdroje)
        //  najdeme zdrojovou comp rovnou spustime akci
        //  presunuto v ramci zjednoduseni primo do compOrSlate() (15e10 240910)
        
        /* function findSlateComp(layer, fieldLayerName, newTextInput, effectName) {
            var layerSourceCompID = layer.source.id;
            var slateComp = findCompByID(layerSourceCompID);
            //  nasli jsme comp (slate) =>
            compNamesMultiSlate(slateComp, callback, fieldLayerName, newTextInput, effectName);  
        } */
        
    //  "Fill the slate" - vkladame nazev kompozice do slatu
    //  Spusti vkladac pokud je slate pouzit prave v jedne kompozici
    function compNamesMultiSlate(slateCompL, callback, fieldLayerName, input, effectName) {
        
        if (slateCompL instanceof CompItem) {
                var parentComp = slateCompL.usedIn; // arr parentComp (kde je pouzit)
            // pokud je parentComp jen jedna spusti vkladac
            if (parentComp.length == 1) {
                var parentCompName = parentComp[0].name;  //arr to string
                var newExpression = "comp(\"" + parentCompName + "\"" + ").name;";
                
                if (callback == compNameVkladOvator) {
                    input = newExpression;
                } else if (callback == compNameFromSlate) {
                    input = parentComp[0];
                }
                callback(slateCompL, fieldLayerName, input, effectName);
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
//  to do:
//  Rozdelit na insert a insert s prodlouzenim a posunutim

function slateOvator3(switch_slateShift) {
    app.beginUndoGroup("Insert slate into composition");
    var selected = app.project.selection;
    var regex = slateRegex();

    if (selected.length == 0) {
        alert("Select a composition");
    } else {
        placeSlateMultiComp(selected, regex, switch_slateShift);
    }
    app.endUndoGroup();

    //  opakovani pro vyber komopzic
    function placeSlateMultiComp(compSelection, regex, switch_slateShift) {
        for (var j = 0; j < compSelection.length; j++) {
            if (compSelection[j] instanceof CompItem) {
                var compMaster = compSelection[j];
                var compOut = compSelection[j];
                insertSlateEngine(compMaster, compOut, regex, switch_slateShift);
            }
        }
    }
}
//  1. extend the comp by slateLength
//  2. shift layers by slateLength
function slateShift(theComp/* , slateDur */)
{
        var compDur = theComp.duration;
        var slateDur = 1;
        theComp.duration = compDur + slateDur;
    for (var i = 1; i <= theComp.numLayers; i++) {
        var curLayer = theComp.layer(i);
        // if (curLayer) {nevime proc?, vyhodit}
        if (curLayer) {
                lockedOne = false;
                if (curLayer.locked) {lockedOne = true; curLayer.locked = false;}
                curLayer.startTime += slateDur;
                if (lockedOne) {curLayer.locked = true;}
                lockedOne = false;
            
        }
    }
}

    //---------------------------------------------------
            //  compOut - protoze slate je vzdy v compOut
            //  compMaster - pokud prebalujeme
    function insertSlateEngine(compMaster, compOut, regex, switch_slateShift) {
        
        var layerArr = compOut.layers;
        //nahradit strucnejsim:
        // for (var i = 1; i <= theComp.numLayers; i++) {
        // var curLayer = theComp.layer(i);
        
        //  nejdrive zjistuje jestli v kompozici uz neni slate
        if (layerArr.length == 0) { // prazdna - vkladame
            if (switch_slateShift) {
                slateShift(compOut/* , slateDur */);
            }
            placeTheSlate(compMaster, compOut, regex);
        } else if (layerArr.length > 0) {
            //  prohledame comp jestli nema slate, vratime pole pripadnych slatu
            var slatesInComp = layerInspectToComp(compOut, regex);

            if (slatesInComp.length > 0) {  //pokud ano
                alert('Slate alredy present.');
            } else {
                if (switch_slateShift) {
                    slateShift(compOut/* , slateDur */);
                    }
                placeTheSlate(compMaster, compOut, regex);  // nema slate - vkladame
                }
            }

        //  vlozeny slate - fitToCompSize
        for (var i = 1; i <= layerArr.length; i++) {
            var layerName = layerArr[i].name;
            var slateSearch = regex.test(layerName);
            if (slateSearch) {
                var layerObj = layerArr[i];
                fitToCompSize(compOut, layerObj);
            }
        }
        // a nastavime zacatek na -01s
        compOut.displayStartTime = -1;
    }
    //---------------------------------------------------
    //  vkladame kopii slatu do kompozice
    //  compMaster kvuli vyhledavani v zavislosti na umisteni masteru
    function placeTheSlate(compMaster, compOut, regex) {    // compMaster je objekt (polozka z pole)

        var slateMaster = slateSearchAdvanced(compMaster, regex);
        // var slateMaster = slateSearchGlobal(compMaster, regex);
        //alert(slate.name);
        var newName = nameNewSlate(slateMaster, regex);
        var newSlate = slateMaster.duplicate();
            // newSlate.name = newName;
            compOut.layers.add(newSlate);
        }
    //---------------------------------------------------
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


//======================================
//======================================

//  slateOvator4
//  240202_v17
//  240920_v18

//  duplikat kompozice s apendixem do podslozky v parentFoldru + slate - zruseno? - smazat?
//  compOut jdou do out, mastery zustavaji
//  zruseni zvlastni funkce makeFolder pro 'out' folder:
//  zadanim parentFolder pro 'out' ve funkci folderStructure => promenna folderParentParent
//  pridano vkladani slatu

function slateOvator4(/*inputFolderLevelL */) {

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

    //  "kopirujeme" masterComp
    //  puvodne kopie, nyni
    //  ve skutecnosti delame novou a kopirujeme parametry
    
    //  => prejmenovat na neco prilehavejsiho

    //  0. cteme parametry masterComp, 1. nova comp, 
    //  2. naming, 3. passar o master pro outComp, 
    //  4. cteme cesu k masterComp
    //  5. kopie casti cesty do 'out'
    //  6. nastaveni parentFolderu v out
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
        prebalovator(myCompMaster, myCompOut, regex);
        //  cteme cesu k masterComp
        var pathItemsArr = folderPath(myCompMaster);
        //  parent folder pro outComp s celou cestou az k 'out'
        //  folderStructure vraci prvni slozku v rade za selectedComp
        var myCompOutFolderParent = folderStructure(pathItemsArr);
        //  setting FP for outComp
        myCompOut.parentFolder = myCompOutFolderParent;
    }

    //  1. passar o master pro outComp
    //  2. set the start time of the master to 1
    //  3. insert slate ! with insertSlateEngine()
    function prebalovator(compMaster, compOut, regex) {
        var compOutLayers = compOut.layers;
            compOutLayers.add(compMaster);
            compOut.layer(1).startTime = 1;
            insertSlateEngine(compMaster, compOut, regex, switch_slateShift = false);
    }
    //
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
    //  kopirovani struktury slozek
    //  dosazujeme cestu ke kopirovane kompozici (vyrabi fce folderPath())
    function folderStructure(itemsArr) {
               
        //  parent pro 'out'
        //----------------------folderLevel automation
        function reverseArr(arr) {  //dosadit itemsArr
            var itemsArrRev = [];
            //var itemsArrNamesRev = [];
            for (var i = arr.length - 1; i >= 0; i--) {
                itemsArrRev.push(arr[i]);
            //    itemsArrNamesRev.push(arr[i].name);    //pomocne
            //alert(itemsArrNamesRev);
            }
            return itemsArrRev;
        }
        
        //  uroven slozky 'comps' podle nazvu
        //  v15e4 UI - compFolderLevel, bud odstranit nebo closable, (fce folderStructure)
        //  ostraneno, automatizovano - hleda "comps", pokud comps !== 1 out bude v root
        function compsLevelIndex(arrRev) { //dosadit itemsArrRev
        var itemCompsLevel = [];
        for (var j = 0; j < arrRev.length; j++) {
            // if (arrRev[j].name == "comps") {
            if (/comp|comps/.test(arrRev[j].name)) {
                itemCompsLevel.push(j);
                }
            }
            return itemCompsLevel;
        }
        
        var itemsArrRev = reverseArr(itemsArr);
        var itemCompsLevel = compsLevelIndex(itemsArrRev);
        //alert(itemCompsLevel);
        
        //  pokud comps !== 1 out bude v root
        if (itemCompsLevel.length === 1) {
            compFolderLevel = itemCompsLevel[0] + 1;
        }   else {
            compFolderLevel = 2;    //  vysledek bude root, protoze se jeste odectou 2
            //parseInt(inputFolderLevelL);
            //zruseno - vstup z UI
        }
        //alert(compFolderLevel);

        var outFolderIndex = (compFolderLevel - 2);
        //----------------------folderLevel automation

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
//---------------------------------------------------scenar
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
//---------------------------------------------------

//---------------------------------------------------    
//  slateSearch_v01
//  search for the newest instance of the slate
//  or the one from the very project
//---------------------------------------------------
//  slateSearch_v02
//  hledame nejnovejsi z celeho projektu,
//  prednost ma projekt (pokud je nejnovejsi v projektu i mimo)

//---------------------------------------------------

//---------------------------------------------------

function slateSearchAdvanced(selectedComp, regexSlateGlobal) {
    var result, resultProject, resultGlobal;
    const slatesProject = searchLocal(selectedComp, regexSlateGlobal);
    const slatesGlobal = searchGlobal(regexSlateGlobal);
    // nejnovejsi
    if (slatesProject.length == 0 && slatesGlobal.length == 0) {
        result = alert("No slates found.");
    }
    if (slatesProject.length != 0) {
        if (slatesProject.length > 1) {
            resultProject = theBlueprint(theNewest(slatesProject, regexSlateGlobal));
            // resultProject = sortAlphabetOrder(slatesProject); // zkusit zjednusit
        } else if (slatesProject.length == 1) {
            resultProject = slatesProject[0];
        }
        result = resultProject;
    }
    if (slatesGlobal.length != 0) {
        if (slatesGlobal.length > 1) {
            resultGlobal = theBlueprint(theNewest(slatesGlobal, regexSlateGlobal));
            // resultGlobal = sortAlphabetOrder(slatesGlobal); // zkusit
        } else if (slatesGlobal.length == 1) {
            resultGlobal = slatesGlobal[0];
        }
        result = resultGlobal;
    }
    // porovname kde je nejnovejsi, pokud najde 2 znamena to ze je v obou
    if (slatesProject.length != 0 && slatesGlobal.length != 0) {
        const resultArr = [resultProject, resultGlobal];
        var test = theNewest(resultArr, regexSlateGlobal);
        //  pokud v obou bereme z projektu
        if (test.length > 1) {
            result = resultProject;
        } else {
            result = resultGlobal;
        }
        // !! jeste osetrit pokud je to potreba !!
    }
    return result;
}

//---------------------------------------------------
//  1. the slate from the very project - tam kde ma byt
//  srovnava cestu k oznacene kompozoci s cestou ke slatu
//  a vybira slaty, ktere maji cast cesty spolecnou: commonPathLength
//  uklada to co je v obou stejne, vse je tedy 2x
//---------------------------------------------------
function searchLocal(selectedComp, regex) {
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
//  vyhledame vsechny slaty v proj
//  predelat, tak aby se dalo hledat i ve slozce slate
//  tj. zadavame kde bude hledat
//  - nao sei o que pensei  mas seria bom usalo tambem no No.1
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
//  overujeme zda slate patri ke stejnemu projektu jako oznacena kompozice
//  sronavame cestu kompozice a cestu slatu
//  hledame stejne slozky v ceste
function commonArray(arr1, arr2) {

  const oneArr = arr1.concat(arr2);
  
    const newArr = oneArr.myFilter(function(item) {
    return arr1.myIncludes(item) && arr2.myIncludes(item);
    })
  return newArr;
}
//---------------------------------------------------
//  2. sort
//  pozor funguje i s polem stringu, ale spatne
function sortAlphabetOrder(arr) {
    if (arr.length == 1) {
        return arr;
    }
    const arrCopy = arr.slice();
    return arrCopy.sort(function(a, b) {
        return a.name === b.name ? 0 : a.name > b.name ? 1 : -1;
    })
}

function sortReverseOrder(arr) {
    if (arr.length == 1) {
        return arr;
    }
    const arrCopy = arr.slice();
    return arrCopy.sort(function(a, b) {
        return a.name === b.name ? 0 : a.name < b.name ? 1 : -1;
    })
}
//test
    // function testSort(arr) {
    //         const itemNames = arr.myMap(function(item) {
    //         return item.name;
    //     })
    //     return itemNames;
    // }
//---------------------------------------------------
//  3. vybereme nejnovejsi verzi z pole vsech slatu 
//  vraci string 
//  nazev bez cisla ("slate_(vYYMMDD)")

//  tady opravit aby vracela opravdu latest i cislo

function theNewestSlateName(slateArr) {
    //  abecedni serazeni sestupne
    const arrRevSorted = sortReverseOrder(slateArr);
    $.writeln(arrRevSorted[0].name);
    //  jmeno nejnovejsiho slatu
    var latestSlateName = arrRevSorted[0].name;
    //  date substr 
    var latestSlateNameCrop = latestSlateName.substr(0, 15);
    return latestSlateNameCrop; //string
}

//---------------------------------------------------
//  4. regex pro hledani nejnovejsiho

//  vyrabime regex abychom mohli hledat slate, 
//  ktery jsme prave nasli a vyhodnotili jako nejnovesi
//  neni to zbytecne?

//  zavorky musi byt oznaceny '\', aby byly string, ex: /^slate_\(v240300\)/;

function slateRegexNewest(arr, regexG) {
    var str = theNewestSlateName(arr);
    $.writeln(str);
    //var str = "/^" + name + "/";  
    //neni mozne takto vkladat promennou do regexu, je pak string a ne objekt
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
//  5. filtrujeme jen posledni verzi
//  vstup: pole kompozic (jiz nalezenych slatu)
//  vystup: pole slatu nejvyssi verze

function theNewest(slateArr, regexG) {
    //  regex pro posledni verzi slatu
    var regexL = slateRegexNewest(slateArr, regexG);

    var newestOnly = slateArr.myFilter(function(item) {
        return regexL.test(item.name);
    })
    return newestOnly;
}

//  6. nejstarsi z nejnovejsich - cislo 01
//  finalni vyber originalu pro novou kopii slatu
function theBlueprint(arr) {
    const arrSorted = sortAlphabetOrder(arr);
    return arrSorted[0];
}

//---------------------------------------------------
//  7. hleda dle polozky ve slozce dle regexu
//  pouzit v nameNewSlate()
//  potrebujem to?
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
//  8. vyrabime jmeno noveho slatu,
//  nejspis kvuli tomu, ze se nove cislo tvorilo spatne tj. jednociferne
//  240912 si jiz tvori dobre tj. dvociferne
//  zvazit zruseni
function nameNewSlate(slateComp, regexL) {
     //  parentFolder
    var slateParentFldr = slateComp.parentFolder;
    var folderItems = slateParentFldr.items;

    //reseni_3
    const slatesInFolder = searchInFldr(folderItems, regexL);
    const splitSlateNamesArr = slatesInFolder.myMap(function(item) {
        return item.name.split(/_| |-/g);
    })
    function sortReverseSpec(arr) {
        const arrCopy = arr.slice();
        return arrCopy.sort(function(a, b) {
            return parseInt(a[2]) === parseInt(b[2]) ? 0 : parseInt(a[2]) < parseInt(b[2]) ? 1 : -1;
        })
    }
    const nwItmSplt = sortReverseSpec(splitSlateNamesArr)[0];
    //test
    //const testSortNames = testSort(slatesInFolder);

    // cislo = treti clen
    var itemNumberStr = nwItmSplt[2];
    var itemNumber = parseInt(itemNumberStr);
    var newNumber = (itemNumber + 1);
    if (String(newNumber).length < 2) {
        var newNumberStr = '0' + String(newNumber);
    } else {
        var newNumberStr = String(newNumber);
    }
    var newName = nwItmSplt[0] + '_' + nwItmSplt[1] + '_' + newNumberStr;

    return newName;
    }

})(this);
