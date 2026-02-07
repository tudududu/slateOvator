// test_slateSearch_nameSearch
// 240428

// search for the newest instance of the slate or the one from the very project
// 2. search for the newest instance of the slate

Array.prototype.myMap = function(callback) {
    var newArray = [];
    for(var i = 0; i < this.length; i++) {
        newArray.push(callback(this[i], i, this));
    }
    return newArray;
}
//---------------------------------------------------
//---------------------------------------------------

app.beginUndoGroup('slateSearch');

var selected = app.project.selection; // compositions
var regex = slateRegexSimple();

    if (selected.length == 0) {
        alert("Select a composition");
    } else {
        //alert(cesta(selected[0]));
        //alert(filter(cesta(selected[0])));
        //alert(slateSearch2(regex, selected[0]));
        alert(slateSelection(slateSearch2(regex, selected[0])));
    }
        
app.endUndoGroup();

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


//---------------------------------------------------
//  2. search for the newest instance of the slate
//---------------------------------------------------

function slateSearch2(regex, selectedComp) {
    var slateArr = [];

    for (var i = 1; i <= app.project.numItems; i++) { // procura do slate(name)
        var testNameStr = app.project.item(i).name;
        var slateSearch = regex.test(testNameStr);
        
        if (slateSearch && app.project.item(i) instanceof CompItem) {
        var slate = app.project.item(i);
        var slateName = slate.name;
        
        slateArr.push(slate);
        
        }
    }
    return slateArr;
}

function alphabeticalOrder(arr) {
  var arrCopy = arr.slice();
  return arrCopy.sort(function(a, b) {
    return a.name === b.name ? 0 : a.name < b.name ? 1 : -1;
  })
}

function slateSelection(slateArr) {
    //var slateArr = slateSearch2(regex, selected[0]);
    
    var slateArrSorted = alphabeticalOrder(slateArr);
    var testArr = slateArrSorted.myMap(function(item) {
        return item;
    });
    var latestSlateName = testArr[0].name;
    var latestSlateDate = latestSlateName.substr(8, 6);
    return latestSlateDate;
}
