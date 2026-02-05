//  slateOvator_part1
//  v05
//  change media, sound, operator field in multiple slates

(function (thisObj) {
    
    newPanel(thisObj);

    function newPanel(thisObj) {
        var win = (thisObj instanceof Panel) ? thisObj 
        : new Window('palette', 'slateOvator', undefined);
        win.orientation = 'column';
        //  win.preferredSize = [350, 300];
        var buttonSize = [50, 25];

        var groupOne = win.add('group');
            groupOne.orientation = 'column';
            groupOne.alignChildren = 'fill';
        var panelOne = groupOne.add('panel', undefined, 'Fields');
            panelOne.orientation = 'column';
            panelOne.alignChildren = 'right';
        var panelOneGroupOne = panelOne.add('group', undefined, 'panelOneGroupOne');
            panelOneGroupOne.orientation = 'row';
        var panelOneGroupTwo = panelOne.add('group', undefined, 'panelOneGroupTwo');
            panelOneGroupTwo.orientation = 'row';
        var panelOneGroupThree = panelOne.add('group', undefined, 'panelOneGroupThree');
            panelOneGroupThree.orientation = 'row';
        
        var groupTwo = win.add('group');
            groupTwo.orientation = 'column';
            groupTwo.alignChildren = 'fill';
        var groupThree = win.add('group');
            groupThree.orientation = 'column';
            groupThree.alignChildren = 'fill';
        
        //  label
        var labelOne = panelOneGroupOne.add('statictext', undefined, 'Media: ');
        var labelTwo = panelOneGroupTwo.add('statictext', undefined, 'SoundLevel: ');
        var labelThree = panelOneGroupThree.add('statictext', undefined, 'Operator: ');
        //  input text
        var inputMedia = panelOneGroupOne.add('edittext', undefined, 'TV');
            inputMedia.characters = 10;
        var inputSoundLevel = panelOneGroupTwo.add('edittext', undefined, 'soundLevel');
            inputSoundLevel.characters = 10;
        var inputOperator = panelOneGroupThree.add('edittext', undefined, 'yourName');
            inputOperator.characters = 10;
        //  apply Button
        var buttonOne = panelOneGroupOne.add('button', undefined, 'OK');
            //buttonOne.size = buttonSize;
        var buttonTwo = panelOneGroupTwo.add('button', undefined, 'OK');
        var buttonThree = panelOneGroupThree.add('button', undefined, 'OK');
        

        // --- Action ---
        buttonOne.onClick = function () {
        slateOvator1('Media', inputMedia.text);
        }
        buttonTwo.onClick = function () {
        slateOvator1('SoundLevel', inputSoundLevel.text);
        }
        buttonThree.onClick = function () {
        slateOvator1('Operator', inputOperator.text);
        }

        // --- ACTIONS ---
        win.onResizing = win.onResize = function () {
            this.layout.resize();
        };
        win instanceof Window
            ? (win.center(), win.show()) : (win.layout.layout(true), win.layout.resize());

    }

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

})(this);