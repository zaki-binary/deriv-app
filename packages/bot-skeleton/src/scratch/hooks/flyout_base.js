import { config } from '../../constants/config';

/**
 * Create a copy of this block on the workspace.
 * @param {!Blockly.BlockSvg} original_block The block to copy from the flyout.
 * @return {Blockly.BlockSvg} The newly created block, or null if something
 *     went wrong with deserialization.
 * @package
 */
Blockly.Flyout.prototype.createBlock = function (event, original_block) {
    Blockly.Events.disable();

    const main_workspace = this.targetWorkspace_;
    const variables_before_creation = main_workspace.getAllVariables();

    main_workspace.setResizesEnabled(false);

    let new_block = null;

    try {
        new_block = this.placeNewBlock_(event, original_block);
        // Close the flyout.
        Blockly.hideChaff();
    } finally {
        Blockly.Events.enable();
    }

    const new_variables = Blockly.Variables.getAddedVariables(main_workspace, variables_before_creation);

    if (Blockly.Events.isEnabled()) {
        Blockly.Events.setGroup(true);

        // Delete blocks of which we can only have a single instance. Dispose emits a BlockDelete
        // event that respects the current Blockly.Events group, this is required to maintain
        // a working undo/redo stack.
        if (config.single_instance_blocks.includes(new_block.type)) {
            main_workspace.getAllBlocks().forEach(ws_block => {
                if (ws_block.type === new_block.type && ws_block.id !== new_block.id) {
                    ws_block.dispose();
                }
            });
        }

        // Fire a VarCreate event for each (if any) new variable created.
        new_variables.forEach(new_variable => {
            Blockly.Events.fire(new Blockly.Events.VarCreate(new_variable));
        });

        Blockly.Events.fire(new Blockly.Events.Create(new_block));
    }

    if (this.autoClose) {
        this.hide();
    }

    main_workspace.getToolbox().clearSelection();
    new_block.isInFlyout = false;
    return new_block;
};

/**
 * Copy a block from the flyout to the workspace and position it correctly.
 * @param {MouseEvent} event MouseEvent with coordinates to position block. DBot only.
 * @param {!Blockly.Block} old_block The flyout block to copy.
 * @return {!Blockly.Block} The new block in the main workspace.
 * @private
 */
Blockly.Flyout.prototype.placeNewBlock_ = function (event, old_block) {
    const main_workspace = this.targetWorkspace_;
    const svg_root_old = old_block.getSvgRoot();

    if (!svg_root_old) {
        throw new Error('old_block is not rendered.');
    }

    // Create the new block by cloning the block in the flyout (via XML).
    const xml = Blockly.Xml.blockToDom(old_block, true);

    // The target workspace would normally resize during domToBlock, which will
    // lead to weird jumps.  Save it for terminateDrag.
    main_workspace.setResizesEnabled(false);

    // Using domToBlock instead of domToWorkspace means that the new block will be
    // placed at position (0, 0) in main workspace units.
    const block = Blockly.Xml.domToBlock(xml, main_workspace);
    const svg_root_new = block.getSvgRoot();

    if (!svg_root_new) {
        throw new Error('block is not rendered.');
    }

    // event may be null i.e. when originating from flyout add button.
    if (event) {
        // The offset in pixels between the main workspace's origin and the upper left corner of the injection div.
        const main_offset_pixels = main_workspace.getOriginOffsetInPixels();

        // The position of the old block in pixels relative to the flyout workspace's origin.
        const toolbar_height = 56;
        const header_height = 48;
        const old_block_pos_pixels = new goog.math.Coordinate(
            event.clientX,
            event.clientY - toolbar_height - header_height
        );

        // The position of the old block in pixels relative to the origin of the main workspace.
        const final_offset_pixels = goog.math.Coordinate.difference(old_block_pos_pixels, main_offset_pixels);

        // The position of the old block in main workspace coordinates.
        const final_offset_main_ws = final_offset_pixels.scale(1 / main_workspace.scale);

        block.moveBy(final_offset_main_ws.x, final_offset_main_ws.y);
    }

    return block;
};
