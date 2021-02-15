import PropTypes from 'prop-types';
import React from 'react';
import { Checkbox, Dropdown, Popover, PopoverMessageCheckbox } from '@deriv/components';
import { localize } from '@deriv/translations';
import Fieldset from 'App/Components/Form/fieldset.jsx';
import { connect } from 'Stores/connect';
import { onToggleCancellation, onChangeCancellationDuration } from 'Stores/Modules/Contract/Helpers/multiplier';

const CancelDeal = ({
    cancellation_range_list,
    cancellation_duration,
    has_cancellation,
    has_take_profit,
    has_stop_loss,
    onChangeMultiple,
    should_show_cancellation_warning,
    toggleCancellationWarning,
}) => {
    const should_show_popover = (has_take_profit || has_stop_loss) && should_show_cancellation_warning;
    const [is_do_not_show_selected, setDoNotShowSelected] = React.useState(!should_show_cancellation_warning);

    const onPopoverClose = () => {
        if (is_do_not_show_selected) {
            toggleCancellationWarning();
        }
    };

    const onPopoverCheckboxChange = React.useCallback(() => {
        setDoNotShowSelected(prev_state => !prev_state);
    }, []);

    const input = (
        <Checkbox
            id='dt_cancellation-checkbox_input'
            onChange={() => onToggleCancellation({ has_cancellation, onChangeMultiple })}
            name='has_cancellation'
            label={localize('Deal cancellation')}
            defaultChecked={has_cancellation}
        />
    );

    return (
        <Fieldset className='trade-container__fieldset'>
            <div className='dc-input-wrapper--inline'>
                {should_show_popover ? (
                    <Popover
                        alignment='left'
                        classNameBubble='trade-container__popover'
                        is_bubble_hover_enabled
                        margin={2}
                        message={
                            <PopoverMessageCheckbox
                                defaultChecked={is_do_not_show_selected}
                                checkboxLabel={localize("Don't show this again")}
                                message={localize(
                                    'Take profit and/or stop loss are not available while deal cancellation is active.'
                                )}
                                name='should_show_cancellation_warning'
                                onChange={onPopoverCheckboxChange}
                            />
                        }
                        onBubbleClose={onPopoverClose}
                        relative_render
                    >
                        {input}
                    </Popover>
                ) : (
                    <React.Fragment>{input}</React.Fragment>
                )}
                <Popover
                    alignment='left'
                    icon='info'
                    id='dt_cancellation-checkbox__tooltip'
                    message={localize(
                        'Cancel your trade anytime within a chosen time-frame. Triggered automatically if your trade reaches the stop out level within the chosen time-frame.'
                    )}
                    classNameBubble='trade-container__deal-cancellation-popover'
                    margin={210}
                    relative_render
                />
            </div>
            {has_cancellation && (
                <Dropdown
                    id='dt_cancellation_range'
                    className='trade-container__multiplier-dropdown'
                    is_alignment_left
                    is_nativepicker={false}
                    list={cancellation_range_list}
                    name='cancellation_duration'
                    no_border={true}
                    value={cancellation_duration}
                    onChange={event => onChangeCancellationDuration({ event, onChangeMultiple })}
                />
            )}
        </Fieldset>
    );
};

CancelDeal.propTypes = {
    cancellation_range_list: PropTypes.array,
    cancellation_duration: PropTypes.string,
    has_cancellation: PropTypes.bool,
    has_stop_loss: PropTypes.bool,
    has_take_profit: PropTypes.bool,
    onChangeMultiple: PropTypes.func,
    should_show_cancellation_warning: PropTypes.bool,
    toggleCancellationWarning: PropTypes.func,
};

export default connect(({ modules, ui }) => ({
    cancellation_range_list: modules.trade.cancellation_range_list,
    cancellation_duration: modules.trade.cancellation_duration,
    has_cancellation: modules.trade.has_cancellation,
    has_stop_loss: modules.trade.has_stop_loss,
    has_take_profit: modules.trade.has_take_profit,
    onChangeMultiple: modules.trade.onChangeMultiple,
    should_show_cancellation_warning: ui.should_show_cancellation_warning,
    toggleCancellationWarning: ui.toggleCancellationWarning,
}))(CancelDeal);
