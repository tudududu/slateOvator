//  slateOvator_part1
//  240111_v09
//  change field in multiple slates
//  switch tags

(function (thisObj) {
    
    newPanel(thisObj);

    function newPanel(thisObj) {
        var win = (thisObj instanceof Panel) ? thisObj 
        : new Window('palette', 'slateOvator', undefined);
        win.orientation = 'column';
        win.preferredSize = [200, 300];
        var buttonSize = [30, 20];

        /*var groupOne = win.add('group');
            groupOne.orientation = 'column';
            groupOne.alignChildren = 'fill';*/
        var panelOne = win.add('panel', undefined, 'Fields');
            panelOne.orientation = 'column';
            panelOne.alignChildren = 'right';
        var panelOneGroupOne = panelOne.add('group', undefined, 'panelOneGroupOne');
            panelOneGroupOne.orientation = 'row';
        var panelOneGroupTwo = panelOne.add('group', undefined, 'panelOneGroupTwo');
            panelOneGroupTwo.orientation = 'row';
        var panelOneGroupThree = panelOne.add('group', undefined, 'panelOneGroupThree');
            panelOneGroupThree.orientation = 'row';

        var panelTwo = win.add('panel', undefined, 'Tags');
            panelTwo.orientation = 'column';
            panelTwo.alignChildren = 'right';
        var panelTwoGroupOne = panelTwo.add('group', undefined, 'panelTwoGroupOne');
            panelTwoGroupOne.orientation = 'row';

        //  label
        var labelOne = panelOneGroupOne.add('statictext', undefined, 'Media: ');
        var labelTwo = panelOneGroupTwo.add('statictext', undefined, 'SoundLevel: ');
        var labelThree = panelOneGroupThree.add('statictext', undefined, 'Operator: ');
        
        //var labelTags = panelTwo.add('statictext', undefined, 'Tags: ');
        //var labelSwitch = panelTwoGroupOne.add('statictext', undefined, 'Media:');

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

        //  switches
        var checkbox_Media = panelTwoGroupOne.add("checkbox", undefined, ' Media:');
        var checkbox_Sound = panelTwoGroupOne.add("checkbox", undefined, ' Sound:');
/*resolution_Switch
aspect_Switch
framerate_Switch
subtitle_Switch
language_Switch
brand_switch
title_switch*/
        // --- Action ---
        function checkTagFnc(chkbx, effectName) {
            var layerName = "controls";
            slateOvator1(tlacitkovatOr, layerName, chkbx.value, effectName);
        }
        var checkTagMedia = checkTagFnc(checkbox_Media, 'media_Switch');
        
        /*function checkTagMedia() {
            var layerName = "controls";
            var effectName = "media_Switch";
            slateOvator1(tlacitkovatOr, layerName, checkbox_Media.value, effectName);
        }*/
        checkbox_Media.onClick = checkTagMedia;

        
        function triggerMedia() {
            slateOvator1(fieldRenamer, 'Media', inputMedia.text);
        }
        function triggerSoundLevel() {
            slateOvator1(fieldRenamer, 'SoundLevel', inputSoundLevel.text);
        }
        function triggerOperator() {
            slateOvator1(fieldRenamer, 'Operator', inputOperator.text);
        }
        
        inputMedia.onChange = triggerMedia;
        inputOperator.onChange = triggerOperator;
        inputSoundLevel.onChange = triggerSoundLevel;
        buttonOne.onClick = triggerMedia;
        buttonTwo.onClick = triggerSoundLevel;
        buttonThree.onClick = triggerOperator;

        // --- ACTIONS ---
        win.onResizing = win.onResize = function () {
            this.layout.resize();
        };
        win instanceof Window
            ? (win.center(), win.show()) : (win.layout.layout(true), win.layout.resize());

    }

function slateOvator1(callback, layerName, input, effect) {

app.beginUndoGroup("Change field in multiple slates");
    var selectedComp = app.project.selection; //array

    if (selectedComp.length == 0) {
        alert("Select a composition");
    } else {
        callback(selectedComp, layerName, input, effect);
    }
    
app.endUndoGroup();
    
}
    
    function tlacitkovatOr(compSelection, layerName, switchInput, effectName) {
        for (var j = 0; j < compSelection.length; j++) {
            if (compSelection[j] instanceof CompItem) {
            var layerArr = compSelection[j].layers;
            
            for (var i = 1; i <= layerArr.length; i++) {
                if (layerArr[i].name == layerName) {
                    layerArr[i].effect(effectName)("Checkbox").setValue(switchInput);
                    }
                }
            }
        }
    }

    function fieldRenamer(compSelection, layerName, newTextInput) {
            for (var j = 0; j < compSelection.length; j++) {
                if (compSelection[j] instanceof CompItem) {
                var layerArr = compSelection[j].layers;
                for (var i = 1; i <= layerArr.length; i++) {
                    if (layerArr[i].name == layerName) {
                        layerArr[i].text.sourceText.setValue(newTextInput);
                        }
                    }
                }
            }
        }

})(this);

//thisComp.layer("controls").effect("sound_Switch")("Checkbox").value;
//var effectsX = projItem.layer(19).effect("sound_Switch")("Checkbox").value;