//  After Effects script UI test - element in color
//  241114
//  v05
//  big red banner above the button on mouseover over the button

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

        // Draw colored element
        var colorElement = panel05.add('panel', undefined);
        colorElement.preferredSize = [100, 100]; // Size of the colored element
        colorElement.graphics.backgroundColor = colorElement.graphics.newBrush(colorElement.graphics.BrushType.SOLID_COLOR, [1, 0, 0, 1]); // Red color
        colorElement.visible = false; // Initially hidden

        // Apply Button
        var applyBtn = panel05.add('button', undefined, 'Complete insert');
        applyBtn.preferredSize = [150, 40]; // Adjust size as needed

        // --- Variables to track mouse state ---
        var isMouseOver = false;

        // Customize Button Highlight Color
        /* applyBtn.onDraw = function () {
            var g = applyBtn.graphics;
            var brush = g.newBrush(g.BrushType.SOLID_COLOR, isMouseOver ? [1, 0, 0, 1] : [0.1, 0.1, 0.1, 1]); // Red on hover, grey otherwise
            g.rectPath(0, 0, applyBtn.size[0], applyBtn.size[1]);
            g.fillPath(brush);
        }; */

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
