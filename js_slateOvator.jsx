//  slateOvator
//  240103_v01


(function (thisObj) {
    
    newPanel(thisObj);

    function newPanel(thisObj) {
        var win = (thisObj instanceof Panel) ? thisObj 
        : new Window('palette', 'slateOvator', undefined);
        win.orientation = 'column';
        win.alignChildren = 'fill';
        win.preferredSize = [200, 300];
        var buttonSize = [30, 20];

        /*var groupOne = win.add('group');
            groupOne.orientation = 'column';
            groupOne.alignChildren = 'fill';*/
        
        //  panelThree
        var panelThree = win.add('panel', undefined, 'Insert slate into composition');
            panelThree.orientation = 'column';
            panelThree.alignChildren = 'fill';
        //  label
        //var label = panelThree.add('statictext', undefined, 'Insert slate into composition');
        //  apply Button
        var slateInsertBtn = panelThree.add('button', undefined, 'Apply');

        //  panelTwo
        var panelTwo = win.add('panel', undefined, 'Pass the compName to the slate');
            panelTwo.orientation = 'column';
            panelTwo.alignChildren = 'fill';
        //  label
        //var label = panelTwo.add('statictext', undefined, 'Pass the compName to the slate');
        //  apply Button
        var compNameBtn = panelTwo.add('button', undefined, 'Apply');
        
        //  panelOne
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
        slateOvator1('Media', inputMedia.text);
        }
        function triggerSoundLevel() {
        slateOvator1('SoundLevel', inputSoundLevel.text);
        }
        function triggerOperator() {
        slateOvator1('Operator', inputOperator.text);
        }
        function triggerCompName() {
        slateOvator2();
        }
        function triggerSlateInsert() {
        slateOvator3();
        }
        inputMedia.onChange = triggerMedia;
        inputOperator.onChange = triggerOperator;
        inputSoundLevel.onChange = triggerSoundLevel;
        buttonOne.onClick = triggerMedia;
        buttonTwo.onClick = triggerSoundLevel;
        buttonThree.onClick = triggerOperator;
        compNameBtn.onClick = triggerCompName;
        slateInsertBtn.onClick = triggerSlateInsert;

        // --- ACTIONS ---
        win.onResizing = win.onResize = function () {
            this.layout.resize();
        };
        win instanceof Window
            ? (win.center(), win.show()) : (win.layout.layout(true), win.layout.resize());

    }

//  SlateOvator_part_01
//  change operator field in multiple slates
function slateOvator1(layerName, newTextInput) {

app.beginUndoGroup("slateOvator1");
    var selectedComp = app.project.selection; //array

    if (selectedComp.length == 0) {
        alert("Select a composition");
    } else {
        slateOvatorEngine(selectedComp, layerName, newTextInput);
    }
    
app.endUndoGroup();
    
    function slateOvatorEngine(comp, layerName, newTextInput) {
        for (var j = 0; j < comp.length; j++) {
            var layerArr = comp[j].layers;
            for (var i = 1; i <= layerArr.length; i++) {
                if (layerArr[i].name == layerName) {
                    layerArr[i].text.sourceText.setValue(newTextInput);
                }
            }
        }
    }
}

//  SlateOvator_part_02
//  v03
//  Pass the compName to the slate
function slateOvator2() {

app.beginUndoGroup("slateOvator2");

var selected = app.project.selection; // compositions

    if (selected.length == 0) {
        alert("Select a composition");
    } else {
        compNamesMultiFx(selected);
    }

app.endUndoGroup();

    //  Pro vybrane slaty spusti vkladac,
    function compNamesMultiFx(selectedArr) {
        //  ktery vrati pole parentComp
        for (var j = 0; j < selectedArr.length; j++) {
                var parentComp = selectedArr[j].usedIn;
            // a pokud je parentComp jen jedna spusti vkladac
            if (parentComp.length == 1) {
                var parentCompName = parentComp[0].name;  //arr to string
                var newExpression = "comp(\"" + parentCompName + "\"" + ").name;";
                slateOvatorEngine(selectedArr[j], newExpression);
            } else {
                alert("Slate can only be used once.");
            }
        }
    }

    // vkladame parent compName do slatu
    function slateOvatorEngine(slateComp, newText) {
        
        var layerArr = slateComp.layers;
        for (var i = 1; i <= layerArr.length; i++) {
            if (layerArr[i].name == "compName") {
                layerArr[i].text.sourceText.expression = newText;
            }
        }
    }

}

//  slateOvator_part3
//  v06
//  Insert slate into composition
function slateOvator3() {
app.beginUndoGroup("slateOvator3_v06c");
var selected = app.project.selection;

    if (selected.length == 0) {
        alert("Select a composition");
    } else {
        placeMultipleSlate(selected);
    }
app.endUndoGroup();

    function placeMultipleSlate(compSelection) {
        for (var j = 0; j < compSelection.length; j++) {
            placeTheSlate(compSelection[j]);
        }
    }

    //  vkladame kopii slatu do kompozice
    function placeTheSlate(theComp) {
        
        var regex = /slate_\(v\d{6}\)/;
        //var projItem = app.project.item;    // tudo em proj

        for (var i = 1; i <= app.project.numItems; i++) {   // procuramos o slate e inserimono
            var myStr = app.project.item(i).name;   // nao e possivel usar a var projItem
            var slateSearch = regex.test(myStr);
            
            if (app.project.item(i) instanceof CompItem && slateSearch) {

            var slate = app.project.item(i);
            var newSlate = slate.duplicate();
                theComp.layers.add(newSlate);
                
                theComp.displayStartTime = -1;
                break;  //  verze s regexem jinak cykli
            }
        }
    }
}

})(this);