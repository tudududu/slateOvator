//  After Effects script UI test - element in color
//  241116
//  v07
//  red rectangle on the left of the button, mouseover effect on the button

(function (thisObj) {
    
    newPanel(thisObj);

    function newPanel(thisObj) {
        var testSize = [250, 100];
        var btnSize = [250, 30];
        var win = (thisObj instanceof Panel) ? thisObj : new Window('palette', 'slateOvator2', undefined);
        win.preferredSize = testSize;

        var groupOne = win.add('group');
        groupOne.orientation = 'column';
        groupOne.alignChildren = 'fill';

        // Panel for inserting slate
        var panel01 = groupOne.add('panel', undefined, "Insert slate");
        panel01.orientation = 'row';
        panel01.preferredSize = btnSize;
        panel01.alignChildren = 'fill';
            
        // Draw colored circle element
        var colorElement = panel01.add('panel', undefined);
        colorElement.preferredSize = [6, 30]; // Size of the colored element
        // colorElement.graphics.backgroundColor = colorElement.graphics.newBrush(colorElement.graphics.BrushType.SOLID_COLOR, [1, 0, 0, 1]); // Red color
        
        colorElement.visible = false; // Initially hidden

        // --- Customize Button Highlight Color ---
        colorElement.onDraw = function () {
            var g = colorElement.graphics;
            // g.clear(); // Clear previous drawings (v7)
            // var brush = g.newBrush(g.BrushType.SOLID_COLOR, isMouseOver ? [1, 0, 0, 1] : [0.1, 0.1, 0.1, 1]); // Red on hover, grey otherwise
            var brush = g.newBrush(g.BrushType.SOLID_COLOR, [0.7, 0, 0.0, 1]); // color
            g.rectPath(0, 0, 4, 29);
            // g.fillBrush(brush); //(v7)
            g.fillPath(brush);
        };

        // Apply Button
        var applyBtn = panel01.add('button', undefined, 'Complete insert');
        // applyBtn.preferredSize = [150, 40]; // Adjust size as needed
        applyBtn.preferredSize = btnSize;
        applyBtn.alignChildren = 'fill';

        // --- Variables to track mouse state ---
        var isMouseOver = false;

        // Mouse event handlers
        applyBtn.addEventListener('mouseover', function () {
            isMouseOver = true;
            colorElement.visible = true; // Show colored element on hover
            applyBtn.notify('onDraw');
        });

        applyBtn.addEventListener('mouseout', function () {
            isMouseOver = false;
            colorElement.visible = false; // Hide colored element when not hovering
            applyBtn.notify('onDraw');
        });

        // Action on button click
        applyBtn.onClick = function () {
            slateOvator2();
        };

        // Resize actions
        win.onResizing = win.onResize = function () {
            this.layout.resize();
        };
        win instanceof Window ? (win.center(), win.show()) : (win.layout.layout(true), win.layout.resize());
    }

})(this);
