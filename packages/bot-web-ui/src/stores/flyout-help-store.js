import { observable, action, runInAction } from 'mobx';
import { config } from '@deriv/bot-skeleton';

export default class FlyoutHelpStore {
    constructor(root_store) {
        this.root_store = root_store;
    }

    options = {
        css: false,
        media: `${__webpack_public_path__}media/`,
        move: { scrollbars: false, drag: true, wheel: false },
        zoom: { startScale: config.workspaces.flyoutWorkspacesStartScale },
        sounds: false,
    };

    @observable block_node = null;
    @observable block_type = '';
    @observable help_string = {};
    @observable title = '';
    @observable should_next_disable = false;
    @observable should_previous_disable = false;
    @observable active_helper = '';

    @action.bound
    setHelpContent = async block_node => {
        const block_hw = Blockly.Block.getDimensions(block_node);
        const block_type = block_node.getAttribute('type');
        const title = Blockly.Blocks[block_type].meta().display_name;
        if (block_type !== '') {
            this.active_helper = block_type;
        }
        const help_string_obj = await import(/* webpackChunkName: `[request]` */ '@deriv/bot-skeleton');
        const start_scale = config.workspaces.flyoutWorkspacesStartScale;
        block_node.setAttribute('width', block_hw.width * start_scale);
        block_node.setAttribute('height', block_hw.height * start_scale);

        const { flyout } = this.root_store;
        runInAction(() => {
            flyout.is_help_content = true;
            this.block_node = block_node;
            this.block_type = block_type;
            this.title = title;
            this.help_string = help_string_obj[block_type];
        });

        if (!flyout.is_search_flyout) {
            this.updateSequenceButtons();
        }
    };

    getHelpContent = async block_node => {
        let block_content;

        const help_string_obj = await import(/* webpackChunkName: `[request]` */ '@deriv/bot-skeleton');

        if (block_node) {
            const target_blocks = this.xml_list_group[block_node];
            const block_type = target_blocks[0].getAttribute('type');
            block_content = help_string_obj[block_type];
        }
        return block_content;
    };

    getFilledBlocksIndex = async blocks_type => {
        const blocks_content = await Promise.all(blocks_type.map(block => this.getHelpContent(block)));
        return blocks_content.map((key, index) => (key ? index : null)).filter(value => value !== null);
    };

    getNextHelpContentIndex = async is_last => {
        const filled_blocks_index = await this.getFilledBlocksIndex(Object.keys(this.xml_list_group));
        return is_last ? filled_blocks_index[filled_blocks_index.length - 1] : filled_blocks_index[0];
    };

    @action.bound
    setActiveHelper(active_helper) {
        this.active_helper = active_helper;
    }

    @action.bound
    onBackClick() {
        // eslint-disable-next-line no-underscore-dangle
        const toolbox = Blockly.derivWorkspace.toolbox_;
        const { toolbar, flyout } = this.root_store;

        if (flyout.is_search_flyout) {
            const search = document.getElementsByName('search')[0].value;

            toolbar.onSearch({ search });
        } else {
            toolbox.refreshCategory();
        }
    }

    @action.bound
    async onSequenceClick(should_go_next) {
        const current_block = this.xml_list.find(xml => xml.getAttribute('type') === this.block_type);

        let current_block_index;

        Object.keys(this.xml_list_group).forEach((key, index) => {
            if (current_block.getAttribute('type') === key) {
                current_block_index = index;
            }
        });

        const getNextBlock = async (xml, current_index, is_next) => {
            const next_index = current_index + (is_next ? 1 : -1);
            const next_blocks_type = Object.keys(xml).filter((key, index) =>
                is_next ? next_index <= index : next_index >= index
            );
            const next_filled_block = await this.getFilledBlocksIndex(next_blocks_type);

            const next_filled_block_index = is_next
                ? next_filled_block[0]
                : next_filled_block[next_filled_block.length - 1];
            const next_block_type = next_blocks_type[next_filled_block_index];

            if (!next_block_type) {
                return false;
            }

            try {
                await import(/* webpackChunkName: `[request]` */ '@deriv/bot-skeleton');
                return next_block_type;
            } catch (e) {
                return getNextBlock(xml, next_index, is_next);
            }
        };

        const block_type = await getNextBlock(this.xml_list_group, current_block_index, should_go_next);
        if (block_type) {
            const target_blocks = this.xml_list_group[block_type];
            this.setHelpContent(target_blocks[0]);
        }
    }

    @action.bound
    initialiseFlyoutHelp(block_node) {
        const toolbox = Blockly.derivWorkspace.getToolbox();
        const selected_category = toolbox.getSelectedItem();
        this.xml_list = toolbox.getCategoryContents(selected_category);
        this.xml_list_group = this.groupBy(this.xml_list, true);

        this.setHelpContent(block_node);
    }

    @action.bound
    async updateSequenceButtons() {
        const current_block = this.xml_list.find(xml => xml.getAttribute('type') === this.block_type);
        const current_index = Object.keys(this.xml_list_group).findIndex(
            key => current_block.getAttribute('type') === key
        );

        const last_filled_content_index = await this.getNextHelpContentIndex(true);
        const first_filled_content_index = await this.getNextHelpContentIndex(false);

        runInAction(() => {
            this.should_previous_disable = current_index === 0 || current_index === first_filled_content_index;
            this.should_next_disable =
                current_index === Object.keys(this.xml_list_group).length - 1 ||
                current_index === last_filled_content_index;
        });
    }

    // eslint-disable-next-line
    groupBy(nodes, should_include_block_only = false) {
        return nodes.reduce(function (block_group, node) {
            const type = node.getAttribute('type');

            if (should_include_block_only && type === null) {
                return block_group;
            }

            if (!block_group[type]) {
                block_group[type] = [];
            }

            if (!should_include_block_only || (should_include_block_only && type !== null)) {
                block_group[type].push(node);
            }

            return block_group;
        }, {});
    }
}
