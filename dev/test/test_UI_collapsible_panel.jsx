// test_UI_collapsible_panel
// v04
// arrow button to collapse/expand panel;

(function (thisObj) {
    
    newPanel(thisObj);

    function newPanel(thisObj) {
        var testSize = [250, 100];
        var win = (thisObj instanceof Panel) ? thisObj : new Window('palette', 'slateOvator2', undefined);
        win.preferredSize = testSize;

        var groupOne = win.add('group');
        groupOne.orientation = 'column';
        groupOne.alignChildren = 'fill';

        // Collapsible Insert slate block:
        // native-looking header panel on top + body panel below.
        var panel05Wrap = groupOne.add('group');
        panel05Wrap.orientation = 'column';
        panel05Wrap.alignChildren = 'fill';
        panel05Wrap.spacing = 0;
        panel05Wrap.margins = 0;

        var panel05Header = panel05Wrap.add('panel', undefined, '\u25BC Insert slate');
        panel05Header.alignment = ['fill', 'top'];
        panel05Header.minimumSize.height = 24;
        panel05Header.maximumSize.height = 24;

        // Keep the collapsed header wide enough so the title never gets truncated.
        var panel05HeaderMinText = '\u25BC Insert slate';
        var panel05HeaderMinWidth = panel05Header.graphics.measureString(panel05HeaderMinText)[0] + 28;
        panel05Header.minimumSize.width = panel05HeaderMinWidth;
        panel05Wrap.minimumSize.width = panel05HeaderMinWidth;

        var panel05Content = panel05Wrap.add('panel', undefined, '');
        panel05Content.orientation = 'column';
        panel05Content.alignChildren = 'fill';
        panel05Content.margins = [10, 12, 10, 10];
    
        // Label (fixed width) + DropDownList in a row; returns the DropDownList
        function mkLabeledDropdown(parent, labelText, items, labelWidth) {
            var row = mkRow(parent);
            var lbl = row.add("statictext", undefined, labelText);
            lbl.preferredSize.width = labelWidth || 145;
            var dd = row.add("dropdownlist", undefined, items);
            dd.selection = 0;
            return dd;
        }

        // Label (fixed width) + EditText in a row; returns the EditText
        function mkLabeledField(parent, labelText, defaultVal, fieldWidth, labelWidth) {
            var row = mkRow(parent);
            var lbl = row.add("statictext", undefined, labelText);
            lbl.preferredSize.width = labelWidth || 145;
            var fld = row.add("edittext", undefined, String(defaultVal !== undefined ? defaultVal : ""));
            fld.preferredSize.width = fieldWidth || 80;
            return fld;
        }

        function mkRow(parent) {
            var row = parent.add("group");
            row.orientation = "row";
            row.alignChildren = ["left", "center"];
            row.spacing = 4;
            return row;
        }

        // Apply Button
        var applyBtn = panel05Content.add('button', undefined, 'Complete insert');
        // applyBtn.preferredSize = [150, 40]; // Adjust size as needed
        var cbRunLinkData          = panel05Content.add("checkbox", undefined, "RUN_link_data");
        var cbRunSaveAsISO         = panel05Content.add("checkbox", undefined, "RUN_save_as_iso");
        var cbRunCreateComps       = panel05Content.add("checkbox", undefined, "RUN_create_compositions");
        var cbRunInsertRelink      = panel05Content.add("checkbox", undefined, "RUN_insert_and_relink_footage");
        var cbRunAddLayers         = panel05Content.add("checkbox", undefined, "RUN_add_layers_to_comp");
        var cbRunPackOutputComps   = panel05Content.add("checkbox", undefined, "RUN_pack_output_comps");
        var cbRunSetAMEPaths       = panel05Content.add("checkbox", undefined, "RUN_set_ame_output_paths");

        var cbEnableModuleTokens = panel05Content.add("checkbox", undefined, "ENABLE_MODULE_TOKENS");
        var fldTokenOrder        = mkLabeledField(panel05Content, "TOKEN_ORDER:", "A, B, C, D", 120);
        var ddModulePosition     = mkLabeledDropdown(panel05Content, "MODULE_POSITION:", ["BEFORE_DURATION", "AFTER_DURATION"]);

        var panel05Expanded = true;
        function setPanel05Collapsed(collapsed) {
            panel05Expanded = !collapsed;
            panel05Content.visible = panel05Expanded;
            panel05Header.text = (panel05Expanded ? '\u25BC' : '\u25B6') + ' Insert slate';

            // Collapse to the header-only top edge.
            panel05Content.maximumSize.height = panel05Expanded ? 10000 : 0;
            panel05Wrap.maximumSize.height = panel05Expanded ? 10000 : 24;
            panel05Wrap.minimumSize.height = panel05Expanded ? 0 : 24;

            groupOne.layout.layout(true);
            win.layout.layout(true);
            win.layout.resize();
        }

        panel05Header.addEventListener('click', function () {
            setPanel05Collapsed(panel05Expanded);
        });
    
        // Action on button click
        applyBtn.onClick = function () {
            dummyFunction();
        };

        // Resize actions
        win.onResizing = win.onResize = function () {
            this.layout.resize();
        };
        win instanceof Window ? (win.center(), win.show()) : (win.layout.layout(true), win.layout.resize());
    }

})(this);
