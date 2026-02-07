// dev slateSearch 
// search for the slate from the very project or its newest instance
// 240427_v05

var undoTitle = 'slateSearch';

app.beginUndoGroup(undoTitle);

var selected = app.project.selection; // compositions
var regex = slateRegexSimple();
/*
    if (selected.length == 0) {
        alert("Select a composition");
    } else {
        //slateSearch(regex);
    }
*/     
    //alert(slateSearch2(regex, selected[0]));
    alert(slateSelection(slateSearch2(regex, selected[0])));

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
// cesta ve strukture slozek
function cesta(item) {
    
    var objArr = [];
        
    do {
        if(item.parentFolder != app.project.rootFolder) {
            item = item.parentFolder;           
        }
        objArr.push(item.id);  //item.name - pokud bychom potrebovali jmena
    } while(item.parentFolder != app.project.rootFolder);
    
    return objArr;
}
//---------------------------------------------------
Array.prototype.myIncludes = function(callback) {
      var result;
      var i = 0;
      do {
        if (this[i] === callback) {
        result = true;
        } else {
        result = false;
        }
        i = i + 1;
      } while (i < this.length && result == false);
      return result;
  }

Array.prototype.myFilter = function(callback) {
  var newArray = [];
  for(var i = 0; i < this.length; i++) {
    if (callback(this[i], i, this)) {
      newArray.push(this[i]);
        }
    }
    return newArray;
}

Array.prototype.myMap = function(callback) {
    var newArray = [];
    for(var i = 0; i < this.length; i++) {
        newArray.push(callback(this[i], i, this));
    }
    return newArray;
}

function diffArray(arr1, arr2) {

  var oneArr = arr1.concat(arr2);
  
    var newArr = oneArr.myFilter(function(item) {
    return arr1.myIncludes(item) && arr2.myIncludes(item);
    })
  return newArr;
}

//---------------------------------------------------
//  search for the newest instance of the slate or the one from the very project
//---------------------------------------------------
//  1. the slate from the very project
//---------------------------------------------------
function slateSearch1(regex, selectedComp) {
    var slateArr = [];
    var selectedCompPath = cesta(selectedComp);
    var comparePath = [];
    
    for (var i = 1; i <= app.project.numItems; i++) { // procura do slate(name)
        var testNameStr = app.project.item(i).name;
        var slateSearch = regex.test(testNameStr);
        
        if (slateSearch && app.project.item(i) instanceof CompItem) {
        var slate = app.project.item(i);
        var slateName = slate.name;
        var slatePath = cesta(slate);
        comparePath = diffArray(selectedCompPath, slatePath);
        //alert(slateName);
        //alert(comparePath);
        
            if (comparePath.length > 2) {
        slateArr.push(slateName);
            }
        }
    }
    return slateArr;
}
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

/*
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
*/