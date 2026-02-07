var selected = app.project.selection; // compositions

    if (selected.length == 0) {
        alert("Select a composition");
    } else {
        
        //info(selected);
        run(selected);
        
    }

var layerName = 'controls';
var switchInput = false;
var effectName = 'logo_Switch';

function run(selected) {
    for (var i = 0; i < selected.length; i++) {
        logoTlacitkovatOr2(selected[i], layerName, switchInput, effectName);
        }
    }

    function logoTlacitkovatOr2(compSelection, layerName, switchInput, effectName) {
        //var bgCompName = 'slateBg_DuoLogo';
        var bgCompNameRegex = /slateBg_DuoLogo/;
        //  hledame bgComp ve slatu
        var slateBgLayer = layerInspection(compSelection, bgCompNameRegex);
        //var sbgGUID = getRenderGUID(slateBgLayer[0]);
        //var sbgIx = slateBgLayer[0].index;
        var sbgID = slateBgLayer[0].source.id;
        //alert('sbgID: ' + sbgID);

        var slateBgComp = findSlateCompID(sbgID);
        var layerArr = slateBgComp.layers;
        
        for (var i = 1; i <= layerArr.length; i++) {
            if (layerArr[i].name == layerName) {
                layerArr[i].effect(effectName)("Checkbox").setValue(switchInput);
                }
            }
        }


    function layerInspection(comp, wantedCompName) {
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

    // hledame compItem dle id
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



function info(selected) {
        var report = [selected[0].name, selected[0].id, selected[0].dynamicLinkGUID];
        /*
        alert(selected[0].name);
        alert(selected[0].id);
        alert(selected[0].dynamicLinkGUID);
        */
        alert('selected info: ' + String(report));
    }

    // -------------------- regex
function slateRegex() {
    var slateRegex = /^slate_\(v\d{6}\)/;
    return slateRegex;
}
// --------------------

