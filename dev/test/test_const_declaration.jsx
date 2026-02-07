// test const declaration in AE extend script
// 240325

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
    const newArray = [];
    for(var i = 0; i < this.length; i++) {
        newArray.push(callback(this[i], i, this));
    }
    return newArray;
}

//---------------------------------------------------
//---------------------------------------------------


var undoTitle = 'test_slateSearch';

app.beginUndoGroup(undoTitle);

//----------------------------------

var selected = app.project.selection; // compositions
// var regex = slateRegexSimple();

    if (selected.length == 0) {
        alert("Select a composition");
    } else {
        //slateSearch(regex);
    }
        
    alert(test(selected));
    //alert(slateSelection(slateSearch2(regex, selected[0])));

app.endUndoGroup();

/*
function test(compSelection) {
    return compSelection.myFilter(function(item) {
        return item.name != null;   // vraci vsechny itemy, ktere maji name (vsechny itemy maji name, takze vraci vsechny)
    })
}
*/

function test(compSelection) {
    return compSelection.myMap(function(item) {
        return item.name;   // vraci pole s nazvy vsech itemu
    })
}

