// dev slateSearch 
// search for the slate from the very project or its newest instance
// 240430_v06a

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
          alert(theNewestSlateName(slateSearch2(regex)));
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
function slateSearch2(regexL) {
    var slateArr = [];
    for (var i = 1; i <= app.project.numItems; i++) { // procura do slate(name)
    if (app.project.item(i) instanceof CompItem) {
        var testNameStr = app.project.item(i).name;
        var slateSearch = regexL.test(testNameStr);
        
        if (slateSearch) {
        var slate = app.project.item(i);
        //var slateName = slate.name;
        slateArr.push(slate);
        
            }
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
function theNewestSlateName(slateArr) {
    //var slateArr = slateSearch2(regex, selected[0]);
    //  abecedni serazeni sestupne
    var slateArrSorted = sortReverseOrder(slateArr);
    //  test sort fce - jen pro zobrazeni jestli funguje
    /*var testArr = slateArrSorted.myMap(function(item) {
        return item.name;
    });*/
    //  jmeno nejnovejsiho slatu
    var latestSlateName = slateArrSorted[0].name;
    //  date substr 
    var latestSlateNameCrop = latestSlateName.substr(0, 15);
    return latestSlateNameCrop;
}


//  4. regex pro hledani nejnov
    var latestSlateNameG = theNewestSlateName(slateSearch2(regex));
// -------------------- regex
function slateRegexNewest(name) {
    ///var str = "/^" + name + "/";
    var str = name;
        var fixRegex = /\(/;
        var fixRegex2 = /\)/;
        var replaceText = "\\(";
        var replaceText2 = "\\)";
        var result = str.replace(fixRegex, replaceText);
        //var result2 = str.match(fixRegex);
        var result3 = result.replace(fixRegex2, replaceText2);
    return result3;
}
var regexN = slateRegexNewest(latestSlateNameG);
alert(slateRegexNewest(latestSlateNameG));

/*function slateRegex2() {
    var slateRegex = /^slate_\(v240300\)/;
    //var slateRegex = /^slate_(v240300)/;  //zavorky musi byt oznaceny '\'
    return slateRegex;
var regexN = slateRegex2();
}*/

var regexObj = new RegExp(regexN);
alert(regexObj);

//  5. pole nejnovejsich
/*
function theNewest(arr, testNameStrL) {
    //var testNameStrL = app.project.item(i).name;
    //var slateSearch = regex.test(testNameStr);
    var regex2 = slateRegexNewest(testNameStrL);
    var slateArrSorted = sortReverseOrder(arr);
    var newestOnly = slateArrSorted.myFilter(function(item) {
        var itemName = item.name;
        var nameTest = regex2.test(itemName);
        return nameTest;
    })
    return newestOnly;
}
*/
    
function theNewest(arr, regex2) {
    var newArray = [];
    
    for(var i = 0; i < arr.length; i++) {
        var itemName = arr[i].name;
        var nameTest = regex2.test(itemName);
        if (nameTest) {
        newArray.push(arr[i]);
            }
        }
        return newArray;
    
    var arrSorted = sortAlphabetOrder(newArray);
    
    return arrSorted;
}
alert(theNewest(slateSearch2(regex), regexObj));
//  6. cislo 01

//  zvazit jestli nehledat primo (bez 4. a 5.)
