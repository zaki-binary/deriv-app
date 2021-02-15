import classNames from 'classnames';
import React from 'react';
import { MobileDialog, Button, Div100vhContainer } from '@deriv/components';
import { isDeepEqual, pick } from '@deriv/shared';
import { localize } from '@deriv/translations';
import { connect } from 'Stores/connect';
import StopLoss from 'Modules/Trading/Components/Form/TradeParams/Multiplier/stop-loss.jsx';
import TakeProfit from 'Modules/Trading/Components/Form/TradeParams/Multiplier/take-profit.jsx';
import CancelDeal from 'Modules/Trading/Components/Elements/Multiplier/cancel-deal-mobile.jsx';

const RiskManagementDialog = ({
    is_open,
    onClose,
    take_profit,
    stop_loss,
    has_take_profit,
    has_stop_loss,
    has_cancellation,
    cancellation_duration,
    cancellation_range_list,
    onChangeMultiple,
    toggleDialog,
}) => {
    const applied_risk_management_state = {
        take_profit,
        stop_loss,
        has_take_profit,
        has_stop_loss,
        has_cancellation,
        cancellation_duration,
    };
    const [state, setState] = React.useState(applied_risk_management_state);

    const [validation_errors, setValidationErrors] = React.useState({});

    const should_show_deal_cancellation = cancellation_range_list?.length > 0;

    const getStateToCompare = _state => {
        const props_to_pick = [
            'has_take_profit',
            'has_stop_loss',
            'has_cancellation',
            _state.has_take_profit && 'take_profit',
            _state.has_stop_loss && 'stop_loss',
            _state.has_cancellation && 'cancellation_duration',
        ];

        return pick(_state, props_to_pick);
    };

    const isStateUnchanged = () => {
        return isDeepEqual(getStateToCompare(state), getStateToCompare(applied_risk_management_state));
    };

    const validate = new_state => {
        setValidationErrors({
            take_profit:
                new_state.has_take_profit && !new_state.take_profit
                    ? [localize('Please enter a take profit amount.')]
                    : [],
            stop_loss:
                new_state.has_stop_loss && !new_state.stop_loss ? [localize('Please enter a stop loss amount.')] : [],
        });
    };

    const onChange = e => {
        const { name, value } = e.target;
        const new_state = { ...state };
        new_state[name] = value;
        setState(new_state);
        validate(new_state);
    };

    const onChangeMultipleLocal = props => {
        const new_state = { ...state };
        Object.assign(new_state, props);
        setState(new_state);
        validate(new_state);
    };

    const apply = () => {
        onChangeMultiple(state);
        toggleDialog();
    };

    const resetAndClose = (...args) => {
        setState(applied_risk_management_state);
        onClose(...args);
    };

    return (
        <React.Fragment>
            <MobileDialog portal_element_id='modal_root' visible={is_open} has_content_scroll onClose={resetAndClose}>
                <Div100vhContainer
                    className={classNames('trade-params__multiplier-risk-management-dialog', {
                        'trade-params__multiplier-risk-management-dialog--no-cancel': !should_show_deal_cancellation,
                    })}
                    height_offset='60px'
                >
                    <TakeProfit
                        take_profit={state.take_profit}
                        has_take_profit={state.has_take_profit}
                        onChange={onChange}
                        onChangeMultiple={onChangeMultipleLocal}
                        validation_errors={validation_errors}
                    />
                    <StopLoss
                        stop_loss={state.stop_loss}
                        has_stop_loss={state.has_stop_loss}
                        onChange={onChange}
                        onChangeMultiple={onChangeMultipleLocal}
                        validation_errors={validation_errors}
                    />
                    {should_show_deal_cancellation && (
                        <CancelDeal
                            has_take_profit={state.has_take_profit}
                            has_stop_loss={state.has_stop_loss}
                            has_cancellation={state.has_cancellation}
                            cancellation_duration={state.cancellation_duration}
                            onChangeMultiple={onChangeMultipleLocal}
                        />
                    )}
                    <div className='trade-params__multiplier-risk-management-dialog-apply-button'>
                        <Button
                            text={localize('Apply')}
                            onClick={apply}
                            primary
                            is_disabled={
                                validation_errors.take_profit?.length > 0 ||
                                validation_errors.stop_loss?.length > 0 ||
                                isStateUnchanged()
                            }
                        />
                    </div>
                </Div100vhContainer>
            </MobileDialog>
        </React.Fragment>
    );
};

export default connect(({ modules }) => ({
    take_profit: modules.trade.take_profit,
    has_take_profit: modules.trade.has_take_profit,
    stop_loss: modules.trade.stop_loss,
    has_stop_loss: modules.trade.has_stop_loss,
    has_cancellation: modules.trade.has_cancellation,
    cancellation_range_list: modules.trade.cancellation_range_list,
    cancellation_duration: modules.trade.cancellation_duration,
    onChangeMultiple: modules.trade.onChangeMultiple,
}))(RiskManagementDialog);
