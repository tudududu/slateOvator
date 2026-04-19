//  After Effects script UI test - element in color
//  241114
//  v03
//  small red square in the corner of the panel, mouseover effect, 
//  panel size adjusted, added panel title

(function (thisObj) {
    
    newPanel(thisObj);

    function newPanel(thisObj) {
        var testSize = [350, 100]
        var win = (thisObj instanceof Panel) ? thisObj 
        : new Window('palette', 'slateOvator2', undefined);
            win.preferredSize = testSize;

        var groupOne = win.add('group');
            groupOne.orientation = 'column';
            groupOne.alignChildren = 'fill';

        //  --------panel05--------Insert slate into composition--------
        var panel05 = groupOne.add('panel', undefined, "Insert slate");
            panel05.orientation = 'column';
            panel05.alignChildren = 'fill';
            panel05.preferredSize = testSize;
        //  apply Button
        var applyBtn = panel05.add('button', undefined, 'Complete insert');
        
        // --- Variables to track mouse state ---
        var isMouseOver = false;

        // --- Customize Button Highlight Color ---
        applyBtn.onDraw = function () {
            var g = applyBtn.graphics;
            var brush = g.newBrush(g.BrushType.SOLID_COLOR, isMouseOver ? [1, 0, 0, 1] : [0.1, 0.1, 0.1, 1]); // Red on hover, grey otherwise
            // g.rectPath(0, 0, applyBtn.size[0], applyBtn.size[1]);
            g.rectPath(0, 0, 10, 10);
            g.fillPath(brush);

        };

        // --- Mouse event handlers ---
        applyBtn.addEventListener('mouseover', function () {
            isMouseOver = true;
            applyBtn.notify('onDraw');
        });

        applyBtn.addEventListener('mouseout', function () {
            isMouseOver = false;
            applyBtn.notify('onDraw');
        });

        // --- Action ---
            applyBtn.onClick = function () {
            slateOvator2();
        }

        // --- ACTIONS ---
        win.onResizing = win.onResize = function () {
            this.layout.resize();
        };
        win instanceof Window
            ? (win.center(), win.show()) : (win.layout.layout(true), win.layout.resize());

    }

})(this);
