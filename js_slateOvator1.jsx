//  slateOvator_part1
//  v04
//  change operator, media, sound field in multiple slates

(function (thisObj) {
    
    newPanel(thisObj);

    function newPanel(thisObj) {
        var win = (thisObj instanceof Panel) ? thisObj 
        : new Window('palette', 'slateOvator', undefined);
        //  win.preferredSize = [350, 300];

        var groupOne = win.add('group');
            groupOne.orientation = 'column';
            groupOne.alignChildren = 'fill';
        var groupTwo = win.add('group');
            groupTwo.orientation = 'column';
            groupTwo.alignChildren = 'fill';
        var groupThree = win.add('group');
            groupThree.orientation = 'column';
            groupThree.alignChildren = 'fill';
        
        //  label
        var labelOne = groupOne.add('statictext', undefined, 'Media: ');
        var labelTwo = groupTwo.add('statictext', undefined, 'SoundLevel: ');
        var labelThree = groupThree.add('statictext', undefined, 'Operator: ');
        //  input text
        var inputMedia = groupOne.add('edittext', undefined, 'TV');
            inputMedia.characters = 10;
        var inputSoundLevel = groupOne.add('edittext', undefined, 'soundLevel');
            inputSoundLevel.characters = 10;
        var inputOperator = groupOne.add('edittext', undefined, 'yourName');
            inputOperator.characters = 10;
        //  apply Button
        var applyBtnOne = groupOne.add('button', undefined, 'Apply');
        var applyBtnTwo = groupOne.add('button', undefined, 'Apply');
        var applyBtnThree = groupOne.add('button', undefined, 'Apply');
        //  applyBtn.size = [50, 25];

        // --- Action ---
        applyBtnOne.onClick = function () {
        slateOvator1('Media', inputMedia.text);
        }
        applyBtnTwo.onClick = function () {
        slateOvator1('SoundLevel', inputSoundLevel.text);
        }
        applyBtnTwo.onClick = function () {
        slateOvator1('Operator', inputOperator.text);
        }

        // --- ACTIONS ---
        win.onResizing = win.onResize = function () {
            this.layout.resize();
        };
        win instanceof Window
            ? (win.center(), win.show()) : (win.layout.layout(true), win.layout.resize());

    }

function slateOvator1(layer, newTextInput) {

app.beginUndoGroup("slateOvator1");
    var selectedComp = app.project.selection; //array

    if (selectedComp.length == 0) {
        alert("Select a composition");
    } else {
        slateOvatorEngine(selectedComp, newText);
    }
    
app.endUndoGroup();
    
    function slateOvatorEngine(comp, layer, newText) {
        for (var j = 0; j < comp.length; j++) {
            var layerArr = comp[j].layers;
            for (var i = 1; i <= layerArr.length; i++) {
                if (layerArr[i].name == layer) {
                    layerArr[i].text.sourceText.setValue(newText);
                }
            }
        }
    }
}

})(this);