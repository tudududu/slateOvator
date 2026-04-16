// test_UI_collapsible_panel
// not collapsible yet

(function (thisObj) {
    
    newPanel(thisObj);

    function newPanel(thisObj) {
        var testSize = [250, 100];
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
        var applyBtn = panel05.add('button', undefined, 'Complete insert');
        // applyBtn.preferredSize = [150, 40]; // Adjust size as needed
        var cbRunLinkData          = panel05.add("checkbox", undefined, "RUN_link_data");
        var cbRunSaveAsISO         = panel05.add("checkbox", undefined, "RUN_save_as_iso");
        var cbRunCreateComps       = panel05.add("checkbox", undefined, "RUN_create_compositions");
        var cbRunInsertRelink      = panel05.add("checkbox", undefined, "RUN_insert_and_relink_footage");
        var cbRunAddLayers         = panel05.add("checkbox", undefined, "RUN_add_layers_to_comp");
        var cbRunPackOutputComps   = panel05.add("checkbox", undefined, "RUN_pack_output_comps");
        var cbRunSetAMEPaths       = panel05.add("checkbox", undefined, "RUN_set_ame_output_paths");

        var cbEnableModuleTokens = panel05.add("checkbox", undefined, "ENABLE_MODULE_TOKENS");
        var fldTokenOrder        = mkLabeledField(panel05, "TOKEN_ORDER:", "A, B, C, D", 120);
        var ddModulePosition     = mkLabeledDropdown(panel05, "MODULE_POSITION:", ["BEFORE_DURATION", "AFTER_DURATION"]);
    
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
