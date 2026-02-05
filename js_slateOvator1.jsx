//  slateOvator_part1
//  240213_v092
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
            panelTwo.orientation = 'row';
            panelTwo.alignChildren = 'left';
        var panelTwoGroupOne = panelTwo.add('group', undefined, 'panelTwoGroupOne');
            panelTwoGroupOne.orientation = 'column';
            //panelTwoGroupOne.alignChildren = 'left';
        var panelTwoGroupTwo = panelTwo.add('group', undefined, 'panelTwoGroupTwo');
            panelTwoGroupTwo.orientation = 'column';
            //panelTwoGroupOne.alignChildren = 'left';

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
        var checkbox_Media = panelTwoGroupOne.add("checkbox", [undefined,undefined,100,18], ' Media');
        var checkbox_Sound = panelTwoGroupOne.add("checkbox", [undefined,undefined,100,18], ' Sound');
        var checkbox_Aspect = panelTwoGroupOne.add("checkbox", [undefined,undefined,100,18], ' Aspect');
        var checkbox_Resolution = panelTwoGroupOne.add("checkbox", [undefined,undefined,100,18], ' Resolution');
        var checkbox_Framerate = panelTwoGroupOne.add("checkbox", [undefined,undefined,100,18], ' Framerate');
        var checkbox_Subtitle = panelTwoGroupTwo.add("checkbox", [undefined,undefined,100,18], ' Subtitle');
        var checkbox_Language = panelTwoGroupTwo.add("checkbox", [undefined,undefined,100,18], ' Language');
        var checkbox_Brand = panelTwoGroupTwo.add("checkbox", [undefined,undefined,100,18], ' Brand');
        var checkbox_Title = panelTwoGroupTwo.add("checkbox", [undefined,undefined,100,18], ' Title');
        var checkbox_Title = panelTwoGroupTwo.add("checkbox", [undefined,undefined,100,18], ' Logo');
        // --- Action ---
        
        /*function checkTagFnc(tlacitkovatOr, chkbx, effectName) {
            var layerName = "controls";
            //chkbx.value
            slateOvator1(tlacitkovatOr, layerName, chkbx.value, effectName);
        }
        function checkTagMedia() {checkTagFnc(tlacitkovatOr, checkbox_Media, 'media_Switch');}
        checkbox_Media.onClick = checkTagMedia;
        */
            var switchesLayerName = "controls";
        function checkTagMedia() {
            slateOvator1(tlacitkovatOr, switcheslayerName, checkbox_Media.value, 'media_Switch');
        }
        function checkTagSound() {
            slateOvator1(tlacitkovatOr, switcheslayerName, checkbox_Sound.value, "sound_Switch");
        }
        function checkTagAspect() {
            slateOvator1(tlacitkovatOr, switcheslayerName, checkbox_Aspect.value, "aspect_Switch");
        }
        function checkTagResolution() {
            slateOvator1(tlacitkovatOr, switcheslayerName, checkbox_Resolution.value, "resolution_Switch");
        }
        function checkTagFps() {
            slateOvator1(tlacitkovatOr, switcheslayerName, checkbox_Framerate.value, "framerate_Switch");
        }
        function checkTagSubtit() {
            slateOvator1(tlacitkovatOr, switcheslayerName, checkbox_Subtitle.value, "subtitle_Switch");
        }
        function checkTagLang() {
            slateOvator1(tlacitkovatOr, switcheslayerName, checkbox_Language.value, "language_Switch");
        }
        function checkTagBrand() {
            slateOvator1(tlacitkovatOr, switcheslayerName, checkbox_Brand.value, "brand_switch");
        }
        function checkTagTitle() {
            slateOvator1(tlacitkovatOr, switcheslayerName, checkbox_Title.value, "title_switch");
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