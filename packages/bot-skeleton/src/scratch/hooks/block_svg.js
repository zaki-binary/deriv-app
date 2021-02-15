import { localize } from '@deriv/translations';
import DBotStore from '../dbot-store';
import { save, isDarkRgbColour } from '../utils';

/**
 * Select this block.  Highlight it visually.
 */
Blockly.BlockSvg.prototype.addSelect = function () {
    if (!this.isInFlyout) {
        const { flyout } = DBotStore.instance;
        if (flyout) {
            flyout.setVisibility(false);
        }
        Blockly.utils.addClass(/** @type {!Element} */ (this.svgGroup_), 'blocklySelected');
    }
};

/**
 * Set whether the block is disabled or not.
 * @param {boolean} disabled True if disabled.
 * @deriv/bot: Call updateDisabled() when setDisabled is called.
 */
Blockly.BlockSvg.prototype.setDisabled = function (disabled) {
    if (this.disabled !== disabled) {
        Blockly.BlockSvg.superClass_.setDisabled.call(this, disabled);

        if (this.rendered) {
            this.updateDisabled();
        }
    }
};

/**
 * Enable or disable a block.
 * @deriv/bot: Update fill path if it doesn't match the disabledPatternId.
 */
Blockly.BlockSvg.prototype.updateDisabled = function () {
    if (this.disabled || this.getInheritedDisabled()) {
        Blockly.utils.addClass(this.svgGroup_, 'blocklyDisabled');

        const fill = `url(#${this.workspace.options.disabledPatternId})`;
        if (this.svgPath_.getAttribute('fill') !== fill) {
            this.svgPath_.setAttribute('fill', fill);
        }
    } else {
        const removed = Blockly.utils.removeClass(this.svgGroup_, 'blocklyDisabled');
        if (removed) {
            this.updateColour();
        }
    }

    const children = this.getChildren(false);
    children.forEach(child => child.updateDisabled());
};

/**
 * Show the context menu for this block.
 * @param {!Event} e Mouse event.
 * @private
 * @deriv/bot: Restore contextMenu options from Blockly unavailable in Scratch
 */
Blockly.BlockSvg.prototype.showContextMenu_ = function (e) {
    if (this.workspace.options.readOnly || !this.contextMenu) {
        return;
    }

    // Save the current block in a variable for use in closures.
    const block = this;
    const menu_options = [];

    if (this.isDeletable() && this.isMovable() && !block.isInFlyout) {
        menu_options.push(Blockly.ContextMenu.blockDuplicateOption(block, e));

        if (this.isEditable() && this.workspace.options.comments) {
            menu_options.push(Blockly.ContextMenu.blockCommentOption(block));
        }

        menu_options.push(Blockly.ContextMenu.blockDeleteOption(block));
    } else if (this.parentBlock_ && this.isShadow_) {
        this.parentBlock_.showContextMenu_(e);
        return;
    }

    // Option to collapse/expand block.
    if (this.workspace.options.collapse) {
        if (this.collapsed_) {
            const expand_option = { enabled: true };
            expand_option.text = localize('Expand Block');
            expand_option.callback = () => block.setCollapsed(false);
            menu_options.push(expand_option);
        } else {
            const collapse_option = { enabled: true };
            collapse_option.text = localize('Collapse Block');
            collapse_option.callback = () => block.setCollapsed(true);
            menu_options.push(collapse_option);
        }
    }

    // Option to disable/enable block.
    if (this.workspace.options.disable) {
        const restricted_parents = block.restricted_parents || [];
        const disable_option = {
            text: this.disabled ? localize('Enable Block') : localize('Disable Block'),
            enabled:
                !this.disabled ||
                restricted_parents.length === 0 ||
                restricted_parents.some(restricted_parent => block.isDescendantOf(restricted_parent)),
            callback: () => {
                const group = Blockly.Events.getGroup();
                if (!group) {
                    Blockly.Events.setGroup(true);
                }

                block.setDisabled(!block.disabled);

                if (!group) {
                    Blockly.Events.setGroup(false);
                }
            },
        };
        menu_options.push(disable_option);
    }

    // Option to download block.
    if (this.isMovable()) {
        const has_next_block = block.nextConnection && block.nextConnection.isConnected();
        const downloadBlock = should_delete_next => {
            const xml = Blockly.Xml.textToDom('<xml/>');
            const block_xml = Blockly.Xml.blockToDom(block);
            const file_name = should_delete_next ? block.type : `${block.type}_${localize('stack')}`;

            if (should_delete_next) {
                Blockly.Xml.deleteNext(block_xml);
            }

            xml.appendChild(block_xml);
            save(file_name, /* collection */ true, xml);
        };

        menu_options.push({
            text: localize('Download block'),
            enabled: true,
            callback: () => downloadBlock(true),
        });

        if (has_next_block) {
            menu_options.push({
                text: localize('Download stack'),
                enabled: true,
                callback: () => downloadBlock(false),
            });
        }
    }
    // Allow the block to add or modify menu_options.
    if (this.customContextMenu) {
        this.customContextMenu(menu_options);
    }

    Blockly.ContextMenu.show(e, menu_options, this.RTL);
    Blockly.ContextMenu.currentBlock = this;
};

/**
 * Set whether the block is error highlighted or not.
 * @param {boolean} highlighted True if highlighted for error.
 */
Blockly.BlockSvg.prototype.setErrorHighlighted = function (
    should_be_error_highlighted,
    error_message = localize(
        'The block(s) highlighted in red are missing input values. Please update them and click "Run bot".'
    )
) {
    if (this.is_error_highlighted === should_be_error_highlighted) {
        return;
    }

    const highlight_class = 'block--error-highlighted';

    if (should_be_error_highlighted) {
        // Below function does its own checks to check if class already exists.
        Blockly.utils.addClass(this.svgGroup_, highlight_class);
    } else {
        Blockly.utils.removeClass(this.svgGroup_, highlight_class);
    }

    this.is_error_highlighted = should_be_error_highlighted;
    this.error_message = error_message;
};

// Highlight the block that is being executed
Blockly.BlockSvg.prototype.highlightExecutedBlock = function () {
    const highlight_block_class = 'block--execution-highlighted';

    if (!Blockly.utils.hasClass(this.svgGroup_, highlight_block_class)) {
        Blockly.utils.addClass(this.svgGroup_, highlight_block_class);
        setTimeout(() => {
            if (this.svgGroup_) {
                Blockly.utils.removeClass(this.svgGroup_, highlight_block_class);
            }
        }, 1505);
    }
};

/**
 * Set block animation (Blink)
 */

Blockly.BlockSvg.prototype.blink = function () {
    const blink_class = 'block--blink';
    Blockly.utils.addClass(this.svgGroup_, blink_class);

    setTimeout(() => {
        Blockly.utils.removeClass(this.svgGroup_, blink_class);
    }, 2000);
};

/**
 * Set whether the block is collapsed or not.
 * @param {boolean} collapsed True if collapsed.
 */
Blockly.BlockSvg.prototype.setCollapsed = function (collapsed) {
    if (this.collapsed_ === collapsed) {
        return;
    }

    const render_list = [];
    const COLLAPSED_INPUT_NAME = '_TEMP_COLLAPSED_INPUT';

    // Show/hide the inputs.
    this.inputList.forEach(input => render_list.push(...input.setVisible(!collapsed)));

    if (collapsed) {
        this.getIcons()
            // Never hide ScratchBlockComments!
            .filter(icon => !(icon instanceof Blockly.ScratchBlockComment))
            .forEach(icon => icon.setVisible(false));

        const text = this.toString(Blockly.COLLAPSE_CHARS);

        // Ensure class persists through collapse. Falls back to first
        // field that has a class. Doesn't work when multiple
        // field_labels on a block have different classes. So far we
        // don't have a situation like that, so it works. 👍
        let field_class = null;

        this.inputList.some(input =>
            input.fieldRow.some(field => {
                if (field.class_) {
                    field_class = field.class_;
                    return true;
                }
                return false;
            })
        );

        const dropdown_path =
            this.workspace.options.pathToMedia +
            (isDarkRgbColour(this.getColour()) ? 'dropdown-arrow.svg' : 'dropdown-arrow-dark.svg');
        const field_label = new Blockly.FieldLabel(text, field_class);
        const field_expand_icon = new Blockly.FieldImage(dropdown_path, 16, 16, localize('Expand'), () =>
            this.setCollapsed(false)
        );

        this.appendDummyInput(COLLAPSED_INPUT_NAME).appendField(field_label).appendField(field_expand_icon).init();
    } else {
        this.removeInput(COLLAPSED_INPUT_NAME);
        this.setWarningText(null); // Clear any warnings inherited from enclosed blocks.
    }

    Blockly.BlockSvg.superClass_.setCollapsed.call(this, collapsed);

    if (!render_list.length) {
        render_list.push(this); // No child blocks, just render this block.
    }

    if (this.rendered) {
        render_list.forEach(block => block.render());
        // Don't bump neighbours.
        // Although bumping neighbours would make sense, users often collapse
        // all their functions and store them next to each other.  Expanding and
        // bumping causes all their definitions to go out of alignment.
    }

    // Check whether the collapsed block needs to be highlighted.
    this.setErrorHighlighted(collapsed && this.hasErrorHighlightedDescendant());
};
