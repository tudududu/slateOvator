// dev slateSearch 
// search for the slate from the very project or its newest instance
// 240427

var undoTitle = 'slateSearch';

app.beginUndoGroup(undoTitle);

var selected = app.project.selection; // compositions
var regex = slateRegexSimple();

    if (selected.length == 0) {
        alert("Select a composition");
    } else {
        //slateSearch(regex);
    }
        
        alert(slateSearch(regex, selected[0]));

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
// search for the slate from the very project
//  1. pokus - natvrdo
        function slateSearch(regex, selectedComp) {
            var slateArr = [];
            var selectedCompP1 = selectedComp.parentFolder;
            var selectedCompP2 = selectedCompP1.parentFolder;
            //alert(selectedCompParent);
            for (var i = 1; i <= app.project.numItems; i++) { // procura do slate(name)
                var testNameStr = app.project.item(i).name;
                var slateSearch = regex.test(testNameStr);
                
                if (app.project.item(i) instanceof CompItem && slateSearch) {
                var slate = app.project.item(i);
                var slateName = slate.name;
                var slateParent = slate.parentFolder;
                var slateParenParent = slateParent.parentFolder;
                var slateP3 = slateParenParent.parentFolder;

                    if (selectedCompP2 == slateP3) {
                slateArr.push(slateName);
                    }
                }
            }
            return slateArr;
        }
//---------------------------------------------------
//---------------------------------------------------//  slateOvator
