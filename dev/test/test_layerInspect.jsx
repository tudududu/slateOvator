// 241116

function layerInspection(comp, wantedCompName) {
    var regex = wantedCompName;
    var compLayerArr = comp.layers; // prohlidka vrstev
    var foundLayersArr = [];
    for (var j = 1; j <= compLayerArr.length; j++) {
        //  hledame nazev zdroje vrstvy, ale pouze pokud je kompozice
        // if (compLayerArr[j].source instanceof CompItem) {
            var layerName = compLayerArr[j].name;
            //  je vrstva slate?
            var slateSearch = regex.test(layerName);
            //  pokud je vrstva slate jdeme ho hledat
            if (slateSearch) {
                foundLayersArr.push(compLayerArr[j]);
            }
        // }
    }
    return foundLayersArr;                  
}


function layerInspectToComp(comp, wantedCompName) {
    var regex = wantedCompName;
    var compLayerArr = comp.layers; // prohlidka vrstev
    var foundCompsArr = [];
    for (var j = 1; j <= compLayerArr.length; j++) {
        //  hledame nazev zdroje vrstvy, ale pouze pokud je kompozice
        if (compLayerArr[j].source instanceof CompItem) {
            var layerName = compLayerArr[j].source.name;
            //  je vrstva slate?
            var slateSearch = regex.test(layerName);
            //  pokud je vrstva slate jdeme ho hledat
            if (slateSearch) {
                foundCompsArr.push(compLayerArr[j].source);
            }
        }
    }
    return foundCompsArr;                  
}