//  After Effects script UI test - element in color
//  241114
//  v01
//  button in color, mouseover effect

(function (thisObj) {
    
    newPanel(thisObj);

    function newPanel(thisObj) {
        var win = (thisObj instanceof Panel) ? thisObj 
        : new Window('palette', 'slateOvator2', undefined);
        //  win.preferredSize = [350, 300];

        var groupOne = win.add('group');
            groupOne.orientation = 'column';
            groupOne.alignChildren = 'fill';
        /*
        //  input text    
        var startTimeInput = groupOne.add('edittext', undefined, 'yourName');
            startTimeInput.characters = 10;
        */
        //  label
        var label = groupOne.add('statictext', undefined, 'Pass the compName to the slate');
        //  apply Button
        var applyBtn = groupOne.add('button', undefined, 'Apply', {name: "ok"});
        
        // --- Customize Button Highlight Color ---
        /* applyBtn.graphics.foregroundColor = applyBtn.graphics.newPen(
            applyBtn.graphics.PenType.SOLID_COLOR, [1, 0, 0, 1], 1); // Red color */
        
        // --- Customize Button Highlight Color ---
        /* applyBtn.onDraw = function () {
            var g = applyBtn.graphics;
            var brush = g.newBrush(g.BrushType.SOLID_COLOR, [1, 0, 0, 1]); // Red color
            g.rectPath(0, 0, applyBtn.size[0], applyBtn.size[1]);
            g.fillPath(brush);
        }; */
        
        // --- Variables to track mouse state ---
        var isMouseOver = false;
        // --- Customize Button Highlight Color ---
        /* applyBtn.onDraw = function () {
            var g = applyBtn.graphics;
            var brush = g.newBrush(g.BrushType.SOLID_COLOR, isMouseOver ? [1, 0, 0, 1] : [0.2, 0.2, 0.2, 1]); // Red on hover, grey otherwise
            g.rectPath(0, 0, applyBtn.size[0]/2, applyBtn.size[1]);
            g.fillPath(brush);
            g.drawString("Apply", g.font, g.newPen(g.PenType.SOLID_COLOR, [0, 0, 0, 1], 1), 10, 10); // Draw the button text
        }; */

        // --- Customize Button Highlight Color ---
        applyBtn.onDraw = function () {
            var g = applyBtn.graphics;
            var brush = g.newBrush(g.BrushType.SOLID_COLOR, isMouseOver ? [1, 0, 0, 1] : [0.1, 0.1, 0.1, 1]); // Red on hover, grey otherwise
            g.rectPath(0, 0, applyBtn.size[0], applyBtn.size[1]);
            g.fillPath(brush);

            // Draw the button frame
            var pen = g.newPen(g.PenType.SOLID_COLOR, [0.9, 0.9, 0.9, 1], 1); // White color
            g.strokePath(pen);

            // Draw the button text
            // g.drawString("Apply", g.font, g.newPen(g.PenType.SOLID_COLOR, [0, 0, 0, 1], 1), 10, 10); // Black text
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

        // // --- Mouse event handlers ---
        // applyBtn.addEventListener('mouseover', function () {
        //     isMouseOver = true;
        //     applyBtn.notify('onDraw');
        // });

        // applyBtn.addEventListener('mouseout', function () {
        //     isMouseOver = false;
        //     applyBtn.notify('onDraw');
        // });

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
