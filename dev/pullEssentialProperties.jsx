childProp['value']
childProp['essentialPropertySource']
childProp['essentialPropertySource']['value']

function pullAllEssentialProperties_v05(childLayer, groupName) {
    var childEPGroup = childLayer.property("Essential Properties");
    if (!childEPGroup) {
        alert("No Essential Properties group on child layer.");
        return;
    }
    
    var group = groupName ? childEPGroup.property(groupName) : childEPGroup;
    if (!group) {
        alert("No group named '" + groupName + "' in Essential Properties.");
        return;
    }
    
    // Get the source comp directly from the childLayer
    var masterComp = childLayer.source;
    if (!(masterComp instanceof CompItem)) {
        alert("Layer source is not a composition.");
        return;
    }
    
    for (var i = 1; i <= group.numProperties; i++) {
        var childProp = group.property(i);
        var propName = childProp.name;
        
        // Find matching layer by name in the source comp
        var masterLayer = null;
        for (var j = 1; j <= masterComp.numLayers; j++) {
            if (masterComp.layer(j).name === propName) {
                masterLayer = masterComp.layer(j);
                break;
            }
        }
        
        if (masterLayer && masterLayer instanceof TextLayer && 
            childProp.matchName === "ADBE EP Text Document") {
            try {
                childProp.setValue(masterLayer.property("Source Text").value);
            } catch (e) {}
        }
    }
}


    function pullAllEssentialProperties_v04(childLayer, masterComp, groupName) {
        var childEPGroup = childLayer.property("Essential Properties");
        if (!childEPGroup) {
            alert("No Essential Properties group on child layer.");
            return;
        }
        var group = groupName ? childEPGroup.property(groupName) : childEPGroup;
        if (!group) {
            alert("No group named '" + groupName + "' in Essential Properties.");
            return;
        }
        for (var i = 1; i <= group.numProperties; i++) {
            var childProp = group.property(i);
            var propName = childProp.name;
    
            // Find a layer in masterComp with the same name as the property
            var masterLayer = null;
            for (var j = 1; j <= masterComp.numLayers; j++) {
                if (masterComp.layer(j).name === propName) {
                    masterLayer = masterComp.layer(j);
                    break;
                }
            }
            if (!masterLayer) continue;
    
            // For text layers, pull Source Text
            if (masterLayer instanceof TextLayer && childProp.matchName === "ADBE EP Text Document") {
                try {
                    childProp.setValue(masterLayer.property("Source Text").value);
                } catch (e) {}
            } else if (childProp.canSetExpression === false) {
                // For other property types, you may need to expand this logic
                // Example: for sliders, check for effects, etc.
            }
        }
    }



function pullAllEssentialProperties_v03(childLayer, masterLayer, groupName) {
    var childEPGroup = childLayer.property("Essential Properties");
    if (!childEPGroup) {
        alert("No Essential Properties group on child layer.");
        return;
    }
    var group = groupName ? childEPGroup.property(groupName) : childEPGroup;
    if (!group) {
        alert("No group named '" + groupName + "' in Essential Properties.");
        return;
    }
    for (var i = 1; i <= group.numProperties; i++) {
        var childProp = group.property(i);
        var propName = childProp.name;
        // Try to find a matching property in the masterLayer
        var masterProp = masterLayer.property(propName) || masterLayer.property("Source Text");
        if (masterProp && childProp.canSetExpression === false) { // skip groups
            try {
                childProp.setValue(masterProp.value);
            } catch (e) {
                // If property types don't match, skip
            }
        }
    }
}

        /* function pullEssentialProperty_v02(childLayer, masterLayer, propertyName) {
        // Get the Essential Properties group on the AV layer (childLayer)
        var childEPGroup = childLayer.property("Essential Properties");
        if (!childEPGroup) {
            alert("No Essential Properties group on child layer.");
            return;
        }
        // Get the "info" group inside Essential Properties
        var infoGroup = childEPGroup.property("info");
        if (!infoGroup) {
            alert("No 'info' group in Essential Properties.");
            return;
        }
        // Get the "Operator" property inside the "info" group
        var childProp = infoGroup.property(propertyName);
        if (!childProp) {
            alert("No Essential Property named '" + propertyName + "' in 'info' group.");
            return;
        }
        // Get the Source Text property on the masterLayer (text layer in precomp)
        var masterProp = masterLayer.property("Source Text");
        if (!masterProp) {
            alert("No Source Text property on master layer.");
            return;
        }
        // Set the Essential Property value to match the master
        childProp.setValue(masterProp.value);
    } */

    
    // function pullEssentialProperty_v01_bak(childLayer, masterLayer, propertyName) {
    //     var childProp = childLayer.property("Essential Properties").property(propertyName);
    //     var masterProp = masterLayer.property(propertyName);
    //     if (childProp && masterProp) {
    //         childProp.setValue(masterProp.value);
    //     }
// }
    