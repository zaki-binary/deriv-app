import React from 'react';
import { Checkbox, RadioGroup, Dialog, Popover } from '@deriv/components';
import { localize, Localize } from '@deriv/translations';
import { connect } from 'Stores/connect';
import { onToggleCancellation, onChangeCancellationDuration } from 'Stores/Modules/Contract/Helpers/multiplier';
import Fieldset from 'App/Components/Form/fieldset.jsx';

const DealCancellationWarning = ({
    disableApp,
    enableApp,
    is_visible,
    onConfirm,
    onCancel,
    should_show_cancellation_warning,
    toggleCancellationWarning,
}) => (
    <Dialog
        className='trade-params__multiplier-deal-cancellation-dialog'
        title={localize('About deal cancellation')}
        confirm_button_text={localize('Got it')}
        cancel_button_text={localize('Cancel')}
        onConfirm={onConfirm}
        onCancel={onCancel}
        is_mobile_full_width={false}
        is_visible={is_visible}
        disableApp={disableApp}
        enableApp={enableApp}
        portal_element_id='modal_root'
    >
        <Localize i18n_default_text='Take profit and/or stop loss are not available while deal cancellation is active.' />
        <Checkbox
            defaultChecked={!should_show_cancellation_warning}
            onChange={() => toggleCancellationWarning()}
            name={'should_show_cancellation_warning'}
            label={localize("Don't show this again")}
        />
    </Dialog>
);

const DealCancellationWarningDialog = connect(({ ui }) => ({
    disableApp: ui.disableApp,
    enableApp: ui.enableApp,
    is_loading: ui.is_loading,
    should_show_cancellation_warning: ui.should_show_cancellation_warning,
    toggleCancellationWarning: ui.toggleCancellationWarning,
}))(DealCancellationWarning);

const CancelDeal = ({
    has_cancellation,
    has_take_profit,
    has_stop_loss,
    onChangeMultiple,
    cancellation_duration,
    cancellation_range_list,
    should_show_cancellation_warning,
}) => {
    const [is_deal_cancel_warning_visible, setDealCancelWarningVisibility] = React.useState(false);

    const canToggleDealCancel = () => {
        const should_show_popover = (has_take_profit || has_stop_loss) && should_show_cancellation_warning;
        if (should_show_popover) setDealCancelWarningVisibility(should_show_popover);
        return !should_show_popover;
    };

    return (
        <React.Fragment>
            <DealCancellationWarningDialog
                is_visible={is_deal_cancel_warning_visible}
                onCancel={() => setDealCancelWarningVisibility(false)}
                onConfirm={() => {
                    setDealCancelWarningVisibility(false);
                    onToggleCancellation({ has_cancellation, onChangeMultiple });
                }}
            />
            <Fieldset className='trade-container__fieldset'>
                <div className='dc-input-wrapper--inline'>
                    <Checkbox
                        id='dt_cancellation-checkbox_input'
                        onChange={() => {
                            if (canToggleDealCancel()) {
                                onToggleCancellation({ has_cancellation, onChangeMultiple });
                            }
                        }}
                        name='has_cancellation'
                        label={localize('Deal cancellation')}
                        defaultChecked={has_cancellation}
                    />
                    <Popover
                        alignment='left'
                        icon='info'
                        id='dt_multiplier-stake__tooltip'
                        classNameBubble='trade-container__deal-cancellation-popover'
                        zIndex={9999}
                        message={localize(
                            'Cancel your trade anytime within a chosen time-frame. Triggered automatically if your trade reaches the stop out level within the chosen time-frame.'
                        )}
                    />
                </div>
                {has_cancellation && (
                    <React.Fragment>
                        <RadioGroup
                            className='trade-params__multiplier-radio-group'
                            name='trade-params__multiplier-radio'
                            items={cancellation_range_list.map(({ text, value }) => ({
                                id: text,
                                label: text,
                                value: value.toString(),
                            }))}
                            selected={cancellation_duration}
                            onToggle={event => onChangeCancellationDuration({ event, onChangeMultiple })}
                        />
                    </React.Fragment>
                )}
            </Fieldset>
        </React.Fragment>
    );
};

export default connect(({ ui, modules }) => ({
    cancellation_range_list: modules.trade.cancellation_range_list,
    should_show_cancellation_warning: ui.should_show_cancellation_warning,
}))(CancelDeal);
