//  After Effects script UI test - element in color
//  241115
//  v06_0
//  small red square in the corner of the panel, mouseover effect on the button

(function (thisObj) {
    
    newPanel(thisObj);

    function newPanel(thisObj) {
        var testSize = [350, 100];
        var win = (thisObj instanceof Panel) ? thisObj : new Window('palette', 'slateOvator2', undefined);
        win.preferredSize = testSize;

        var groupOne = win.add('group');
        groupOne.orientation = 'column';
        groupOne.alignChildren = 'fill';

        // Panel for inserting slate
        var panel05 = groupOne.add('panel', undefined, "Insert slate");
        panel05.orientation = 'column';
        panel05.alignChildren = 'fill';
        panel05.preferredSize = testSize;

        // Draw colored circle element
        var colorElement = panel05.add('panel', undefined);
        colorElement.preferredSize = [10, 10]; // Size of the colored element
        // colorElement.graphics.backgroundColor = colorElement.graphics.newBrush(colorElement.graphics.BrushType.SOLID_COLOR, [1, 0, 0, 1]); // Red color
        
        colorElement.visible = false; // Initially hidden

        // --- Customize Button Highlight Color ---
        colorElement.onDraw = function () {
            var g = colorElement.graphics;
            // g.clear(); // Clear previous drawings (v7)
            // var brush = g.newBrush(g.BrushType.SOLID_COLOR, isMouseOver ? [1, 0, 0, 1] : [0.1, 0.1, 0.1, 1]); // Red on hover, grey otherwise
            var brush = g.newBrush(g.BrushType.SOLID_COLOR, [1, 0, 0, 1]); // Red color (v7)
            g.rectPath(0, 0, 10, 10);
            // g.fillBrush(brush); //(v7)
            g.fillPath(brush);
        };

        // Apply Button
        var applyBtn = panel05.add('button', undefined, 'Complete insert');
        applyBtn.preferredSize = [150, 40]; // Adjust size as needed

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
