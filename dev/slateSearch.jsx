// dev slateSearch 
// search for the slate from the very project or its newest instance
// 240429_v06

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

//---------------------------------------------------
//---------------------------------------------------

var undoTitle = 'slateSearch';

app.beginUndoGroup(undoTitle);

var selected = app.project.selection; // compositions
var regex = slateRegexSimple();

    if (selected.length == 0) {
        alert("Select a composition");
    } else {
        //alert(slateSearch1(regex, selected[0]));
          alert(slateSelection(slateSearch2(regex)));
    }

app.endUndoGroup();
//---------------------------------------------------
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
function cesta(projectItem) {
    
    var objArr = [];
        
    do {
        if(projectItem.parentFolder != app.project.rootFolder) {
            projectItem = projectItem.parentFolder;           
        }
        objArr.push(projectItem.id);  //projectItem.name - pokud bychom potrebovali jmena
    } while(projectItem.parentFolder != app.project.rootFolder);
    
    return objArr;
}
//---------------------------------------------------
//  v obou stejne
function commonArray(arr1, arr2) {

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
    var comparePath = [];   //vysledek srovnani obou cest
    //uklada to co je v obou stejne, vse je tedy 2x
    for (var i = 1; i <= app.project.numItems; i++) { // procura do slate(name)
        var testNameStr = app.project.item(i).name;
        var slateSearch = regex.test(testNameStr);
        
        if (slateSearch && app.project.item(i) instanceof CompItem) {
        var slate = app.project.item(i);
        var slateName = slate.name;
        var slatePath = cesta(slate);
        comparePath = commonArray(selectedCompPath, slatePath);
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
//  1. vyhledame vsechny slaty v proj
function slateSearch2(regex, selectedComp) {
    var slateArr = [];

    for (var i = 1; i <= app.project.numItems; i++) { // procura do slate(name)
        var testNameStr = app.project.item(i).name;
        var slateSearch = regex.test(testNameStr);
        
        if (slateSearch && app.project.item(i) instanceof CompItem) {
        var slate = app.project.item(i);
        //var slateName = slate.name;
        slateArr.push(slate);
        
        }
    }
    return slateArr;

}
function sortAlphabetOrder(arr) {
  var arrCopy = arr.slice();
  return arrCopy.sort(function(a, b) {
    return a.name === b.name ? 0 : a.name > b.name ? 1 : -1;
  })
}

function sortReverseOrder(arr) {
  var arrCopy = arr.slice();
  return arrCopy.sort(function(a, b) {
    return a.name === b.name ? 0 : a.name < b.name ? 1 : -1;
  })
}
//  3. vybereme nejnovejsi slateName z pole vsech slatu
function slateSelection(slateArr) {
    //var slateArr = slateSearch2(regex, selected[0]);
    //  abecedni serazeni sestupne
    var slateArrSorted = sortReverseOrder(slateArr);
    //  test sort fce - jen pro zobrazeni jestli funguje
    var testArr = slateArrSorted.myMap(function(item) {
        return item.name;
    });
    //  jmeno nejnovejsiho slatu
    var latestSlateName = slateArrSorted[0].name;
    //  date substr 
    var latestSlateNameCrop = latestSlateName.substr(0, 15);
    return latestSlateNameCrop;
}

var latestSlateNameG = slateSelection(slateSearch2(regex));

//  4. regex pro hledani nejnov
// -------------------- regex
function slateRegex2(name) {
    var slateRegex = "/^" + latestSlateNameG + "/";
    return slateRegex;
}
//alert(slateRegex2(latestSlateNameG));

//  5. pole nejnovejsich
var theNewestSlates = null;
function theNewest(arr) {
    var 
    var slateArrSorted = sortAlphabetOrder(arr);
}
//  6. cislo 01

//  zvazit jestli nehledat primo (bez 4. a 5.)
