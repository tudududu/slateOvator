// dev slateSearch 
// search for the slate from the very project or the newest instance of the slate
// 240427

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
        alert(slateSearch(regex));

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
//  search for the slate from the very project
//  jen vsechny slaty
        function slateSearch(regex) {
            var slateArr = [];
            for (var i = 1; i <= app.project.numItems; i++) { // procura do slate(name)
                var testNameStr = app.project.item(i).name;
                var slateSearch = regex.test(testNameStr);
                
                if (app.project.item(i) instanceof CompItem && slateSearch) {

                //var slate = app.project.item(i);
                slateArr.push(app.project.item(i).name);
                }
            }
            return slateArr;
        }
//---------------------------------------------------
//---------------------------------------------------//  slateOvator
