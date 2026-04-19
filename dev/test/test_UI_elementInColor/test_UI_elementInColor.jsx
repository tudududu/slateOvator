//  After Effects script UI test - element in color
//  241117
//  v08
//  red rectangle on the right of the button, mouseover effect on the button

(function (thisObj) {
    
    newPanel(thisObj);

    function newPanel(thisObj) {
        var testSize = [250, 100];
        var btnSize = [250, 30];
        var win = (thisObj instanceof Panel) ? thisObj : new Window('palette', 'slateOvator2', undefined);
        win.preferredSize = testSize;

        var panel01 = win.add('panel', undefined, undefined);
            panel01.orientation = 'column';
            panel01.alignChildren = 'fill';
        var panel01_g01 = panel01.add("group", undefined, { name: "panel01_g01" });
            panel01_g01.orientation = "row";
            panel01_g01.alignment = "fill";
            panel01_g01.alignChildren = ["fill", "center"];
            panel01_g01.spacing = 10;
            panel01_g01.margins = 0;

        // Apply Button
        var compNameFSBtn = panel01_g01.add('button', undefined, 'Comp name from slate');
        compNameFSBtn.alignChildren = 'fill';
        // compNameFSBtn.preferredSize = [200, 30];

        // Draw colored circle element
        var colorElement = panel01_g01.add('panel', undefined);
        colorElement.preferredSize = [6, 30]; // Size of the colored element
        colorElement.visible = false; // Initially hidden

        // --- Customize Button Highlight Color ---
        colorElement.onDraw = function () {
            var g = colorElement.graphics;
            var brush = g.newBrush(g.BrushType.SOLID_COLOR, [0.7, 0, 0.0, 1]); // color
            g.rectPath(0, 0, 4, 29);
            g.fillPath(brush);
        };
        // --- Variables to track mouse state ---
        var isMouseOver = false;

        // Mouse event handlers
        compNameFSBtn.addEventListener('mouseover', function () {
            isMouseOver = true;
            colorElement.visible = true; // Show colored element on hover
            compNameFSBtn.notify('onDraw');
        });

        compNameFSBtn.addEventListener('mouseout', function () {
            isMouseOver = false;
            colorElement.visible = false; // Hide colored element when not hovering
            compNameFSBtn.notify('onDraw');
        });


        // Resize actions
        win.onResizing = win.onResize = function () {
            this.layout.resize();
        };
        win instanceof Window ? (win.center(), win.show()) : (win.layout.layout(true), win.layout.resize());
    }

})(this);
