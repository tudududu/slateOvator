// dev slateSearch 
// search for the slate from the very project or its newest instance
// 240401_v06e

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

app.beginUndoGroup('slateSearch');

var selectionIn = app.project.selection; // compositions
var selectedIn = app.project.activeItem;
var regexSlateGlobal = slateRegex();

    if (selectedIn == null) {
        alert("Select a composition");
    } else {
        alert(slateSearch(selectedIn, regexSlateGlobal).name);
        
        //alert(slateSearch1(regexSlateGlobal, selectedIn));
        //alert(theBlueprint(slateSearch1(regexSlateGlobal, selectedIn)));
        
        //alert(theNewestSlateName(slateSearch2(regexSlateGlobal)));    //nejnovejsi slate dle data v nazvu
        //alert(slateRegexNewest(regexSlateGlobal));    //vysledny regex
        //alert(theBlueprint(theNewest(regexSlateGlobal))); //.name
    }

app.endUndoGroup();

//---------------------------------------------------
//---------------------------------------------------

function slateSearch(selectedComp, regexSlateGlobal) {
    var result;
    const slateInPlaceTest = slateSearch1(selectedComp, regexSlateGlobal);
    if(slateInPlaceTest.length > 0) {
        result = theBlueprint(slateInPlaceTest);
    } else {
        result = theBlueprint(theNewest(regexSlateGlobal));
    }
    return result;
}

//---------------------------------------------------
// -------------------- regex
    //zavorky musi byt oznaceny '\', aby byly string, ex: /^slate_\(v240300\)/;
function slateRegex() {
    var slateRegex = /^slate_\(v\d{6}\)/;
    return slateRegex;
}
function slateRegexSimple() {
    var slateRegex = /^slate_/;
    return slateRegex;
}
function slateRegexNewest(regexG) {
    var str = theNewestSlateName(slateSearch2(regexG));
    //var str = "/^" + name + "/";  
    //neni mozne takto vkladat promennou do regexu, je pak string a be objekt
    //pridavame backslash do regexu pred zavorky
        var fixRegex1 = /\(/;
        var fixRegex2 = /\)/;
        var replaceText1 = "\\(";   //  jeden backSlash do regexu a jeden k zavorce v tomto stringu
        var replaceText2 = "\\)";
        var resultHalf = str.replace(fixRegex1, replaceText1);
        var result = resultHalf.replace(fixRegex2, replaceText2);
        //promenna do regexu
    return new RegExp("^" + result);
}
// --------------------

//---------------------------------------------------
// cesta ve strukture slozek
function cesta(projectItem) {
    
    const objArr = [];
        
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

  const oneArr = arr1.concat(arr2);
  
    const newArr = oneArr.myFilter(function(item) {
    return arr1.myIncludes(item) && arr2.myIncludes(item);
    })
  return newArr;
}

//---------------------------------------------------
//  search for the newest instance of the slate or the one from the very project
//---------------------------------------------------
//  1. the slate from the very project
//---------------------------------------------------
function slateSearch1(selectedComp, regex) {
    const slateArr = [];
    var selectedCompPath = cesta(selectedComp);
    var comparePath = [];   //vysledek srovnani obou cest
    //uklada to co je v obou stejne, vse je tedy 2x
    for (var i = 1; i <= app.project.numItems; i++) { // procura do slate(name)
        if (app.project.item(i) instanceof CompItem) {
        var testNameStr = app.project.item(i).name;
        var slateSearch = regex.test(testNameStr);
        
        if (slateSearch) {
        var slate = app.project.item(i);
        var slatePath = cesta(slate);
        comparePath = commonArray(selectedCompPath, slatePath);
        // pokud je v poli shoda alespon v jedne polozce (kazda shoda je 2x)
        if (comparePath.length > 2) {
            slateArr.push(slate);
                }
            }
        }
    }
    return slateArr;
}
//---------------------------------------------------
//  2. search in the whole project for the newest instance of the slate
//---------------------------------------------------
//  1. vyhledame vsechny slaty v proj
function slateSearch2(regexL) {
    const slateArr = [];
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
//---------------------------------------------------
//  2. sort
//pozor funguje i s polem stringu, ale spatne
function sortAlphabetOrder(arr) {
  const arrCopy = arr.slice();
  return arrCopy.sort(function(a, b) {
    return a.name === b.name ? 0 : a.name > b.name ? 1 : -1;
  })
}

function sortReverseOrder(arr) {
  const arrCopy = arr.slice();
  return arrCopy.sort(function(a, b) {
    return a.name === b.name ? 0 : a.name < b.name ? 1 : -1;
  })
}
//---------------------------------------------------
//  3. vybereme nejnovejsi slateName z pole vsech slatu
function theNewestSlateName(slateArr) {
    //var slateArr = slateSearch2(regexSlateGlobal);
    //  abecedni serazeni sestupne
    const slateArrSorted = sortReverseOrder(slateArr);
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

//---------------------------------------------------
//  4. regex pro hledani nejnov
// -------------------- regex


//---------------------------------------------------
//  5. pole nejnovejsich

function theNewest(regexG) {
    const slateArr = slateSearch2(regexSlateGlobal);
    var regexL = slateRegexNewest(regexG);
    const slateArrSorted = sortReverseOrder(slateArr);
    var newestOnly = slateArrSorted.myFilter(function(item) {
        
        return regexL.test(item.name);
    })
    //test
    /*var newestOnlyNames = newestOnly.myMap(function(item) {
        return item.name;
    })*/
    return newestOnly;
}

//  6. cislo 01
function theBlueprint(arr) {
    //var newestSlatesArr = theNewest(regexSlateGlobal);
    const arrSorted = sortAlphabetOrder(arr);
    return arrSorted[0];
}
//---------------------------------------------------
//---------------------------------------------------

//  zvazit jestli nehledat primo (bez 4. a 5.)
//  tj. hledat primo jmeno s cislem 01
//  neni universalni