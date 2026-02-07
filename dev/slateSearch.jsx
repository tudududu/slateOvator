// dev slateSearch 
// search for the slate from the very project or its newest instance
// 240423_v06h_xsplittest

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
//---------------------------------------------------


app.beginUndoGroup('slateSearch');

var selectionIn = app.project.selection; // compositions
var selectedIn = app.project.activeItem;
var regexSlateGlobal = slateRegex();

    if (selectedIn == null) {
        alert("Select a composition");
    } else {
        //alert(slateSearchAdvanced(selectedIn, regexSlateGlobal).name);
        var slateComp = slateSearchAdvanced(selectedIn, regexSlateGlobal);
        alert(nameNewSlate(slateComp, regexSlateGlobal));
        //alert(slateSearch1(regexSlateGlobal, selectedIn));
        //alert(theBlueprint(slateSearch1(regexSlateGlobal, selectedIn)));
        
        //alert(theNewestSlateName(searchGlobal(regexSlateGlobal)));    //nejnovejsi slate dle data v nazvu
        //alert(slateRegexNewest(regexSlateGlobal));    //vysledny regex
        //alert(theBlueprint(theNewest(regexSlateGlobal))); //.name
    }

app.endUndoGroup();

//---------------------------------------------------
//  pridano hledani nejnovejsiho i v master slozce
//---------------------------------------------------

function slateSearchAdvanced(selectedComp, regexSlateGlobal) {
    var result;
    const slateInPlaceTest = slateSearch1(selectedComp, regexSlateGlobal);
    const globalSlates = searchGlobal(regexSlateGlobal);
    
    if(slateInPlaceTest.length > 0) {
        result = theBlueprint(theNewest(slateInPlaceTest, regexSlateGlobal));
    } else {
        result = theBlueprint(theNewest(globalSlates, regexSlateGlobal));
    }
    return result;
}
//theNewest(slateArr, regexG) {
    //const slateArr = searchGlobal(regexG);
//---------------------------------------------------
//  search for the newest instance of the slate or the one from the very project
//---------------------------------------------------
//  1. the slate from the very project - tam kde ma byt
//  srovnava cestu k oznacene kompozoci s cestou ke slatu
//  a vybira slaty, ktere maji cast cesty spolecnou: commonPathLength
//  uklada to co je v obou stejne, vse je tedy 2x
//---------------------------------------------------
function slateSearch1(selectedComp, regex) {
    const slateArr = [];
    var commonPathLength = 2;   // 2 = shoda alespon v jedne polozce (kazda shoda je 2x)
    var selectedCompPath = cesta(selectedComp); //  cesta k oznacene kompozici
    var comparePath = [];   //vysledek srovnani obou cest
    
    for (var i = 1; i <= app.project.numItems; i++) { // procura do slate(name)
        if (app.project.item(i) instanceof CompItem) {
        var testNameStr = app.project.item(i).name;
        var slateSearch = regex.test(testNameStr);
        
        if (slateSearch) {
        var slate = app.project.item(i);
        var slatePath = cesta(slate);
        comparePath = commonArray(selectedCompPath, slatePath);
        
        if (comparePath.length > commonPathLength) {
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
//  predelat, tak aby se dalo hledat i ve slozce slate
//  tj. zadavame kde bude hledat
function searchGlobal(regexL) {
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
    //var slateArr = searchGlobal(regexSlateGlobal);
    //  abecedni serazeni sestupne
    const arrRevSorted = sortReverseOrder(slateArr);
    //  test sort fce - jen pro zobrazeni jestli funguje
    /*var testArr = arrRevSorted.myMap(function(item) {
        return item.name;
    });*/
    //  jmeno nejnovejsiho slatu
    var latestSlateName = arrRevSorted[0].name;
    //  date substr 
    var latestSlateNameCrop = latestSlateName.substr(0, 15);
    return latestSlateNameCrop;
}

//---------------------------------------------------
//  4. regex pro hledani nejnov

    //zavorky musi byt oznaceny '\', aby byly string, ex: /^slate_\(v240300\)/;

function slateRegexNewest(arr, regexG) {
    var str = theNewestSlateName(arr);
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
//  5. pole nejnovejsich

function theNewest(slateArr, regexG) {
    //const slateArr = searchGlobal(regexG);
    var regexL = slateRegexNewest(slateArr, regexG);
    const arrRevSorted = sortReverseOrder(slateArr);
    var newestOnly = arrRevSorted.myFilter(function(item) {
        
        return regexL.test(item.name);
    })
    //test
    /*var newestOnlyNames = newestOnly.myMap(function(item) {
        return item.name;
    })*/
    return newestOnly;
}

//  6. nejstarsi z nejnovejsich - cislo 01
function theBlueprint(arr) {
    //var newestSlatesArr = theNewest(regexSlateGlobal);
    const arrSorted = sortAlphabetOrder(arr);
    return arrSorted[0];
}

//---------------------------------------------------
    function searchInFldr(fldrItms, regexL) {
    const arr = [];
    for (var i = 1 ; i <= fldrItms.length; i++){
        var testNameStr = fldrItms[i].name;
        var slateSearch = regexL.test(testNameStr);
        
        if (slateSearch) {
        arr.push(fldrItms[i]);
            }
        }
        return arr;
    }
//---------------------------------------------------
function nameNewSlate(slateComp, regexL) {
 
    //  parentFolder
    var slateParentFldr = slateComp.parentFolder;
    var folderItems = slateParentFldr.items;
    
    //  arr slates of this date/version in pF
    
    const slatesInFolderArr = searchInFldr(folderItems, regexL);
    const arrRevSorted = sortReverseOrder(slatesInFolderArr);
    //const testArr = theNewest(arr, regexL);   // lze pouzit, ale je to zbytecne slozite

    var theNewestItem = arrRevSorted[0].name;
    const nwItmSplt = theNewestItem.split(/_/g);
    alert(nwItmSplt);
    var itemNumberStr = nwItmSplt[2];
    var itemNumber = parseInt(itemNumberStr);
    var newNumber = (itemNumber + 1);
    var newNumberStr = '0' + String(newNumber);
    var newName = nwItmSplt[0] + '_' + nwItmSplt[1] + '_' + newNumberStr;

    return newName;
    }


//---------------------------------------------------
    //  slateSearch scenar
   //  vstup: slate
    //  parentFolder
    //  arr slates of this date/version in pF
    //  sort
    //  last in folder
    //  token 3
    //  t3 + 1
    //  compose name
    //  return

//---------------------------------------------------

    /*
    //  nefunguje  
    for (var item in folderItems) {
        //if (item instanceof CompItem) {
            arr.push(folderItems[item]);
        //}
    }*/




//---------------------------------------------------ukoly
//  2 osetrit layer name vs. layer source name  -- vyreseno
/*
This is why you won’t see the name property on the Layer page, 
but you can still use layer.name in your script; 
name is inherited from PropertyBase.name.

PropertyBase.name¶
app.project.item(index).layer(index).name
app.project.item(index).layer(index).propertySpec.name

Layer.isNameSet¶
app.project.item(index).layer(index).isNameSet

AVLayer.source¶
app.project.item(index).layer(index).source
The source AVItem for this layer. The value is null in a Text layer. 
Use AVLayer.replaceSource() to change the value.

AVLayer.isNameFromSource¶
app.project.item(index).layer(index).isNameFromSource
Description
True if the layer has no expressly set name, 
but contains a named source. In this case, 
layer.name has the same value as layer.source.name. 
False if the layer has an expressly set name, 
or if the layer does not have a source.
Type
Boolean; read-only.
*/
//---------------------------------------------------
