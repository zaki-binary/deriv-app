import { connect } from 'Stores/connect';

export const onToggleCancellation = ({ has_cancellation, onChangeMultiple }) => {
    // e.target.checked is not reliable, we have to toggle its previous value
    const new_val = !has_cancellation;
    onChangeMultiple({
        has_cancellation: new_val,
        ...(!new_val
            ? {
                  // reset deal cancellation price
                  cancellation_price: undefined,
              }
            : {
                  // unchecked Stop loss
                  has_stop_loss: false,
                  has_take_profit: false,
              }),
    });
};

export const onChangeCancellationDuration = ({ event, onChangeMultiple }) => {
    const { value } = event.target;
    onChangeMultiple({
        has_cancellation: true,
        has_take_profit: false,
        has_stop_loss: false,
        cancellation_duration: value,
    });
};

// eslint-disable-next-line no-empty-pattern
export const connectWithContractUpdate = connect(({}, { contract = {} }) => {
    return {
        validation_errors: contract.validation_errors,
        contract_update_take_profit: contract.contract_update_take_profit,
        contract_update_stop_loss: contract.contract_update_stop_loss,
        has_contract_update_take_profit: contract.has_contract_update_take_profit,
        has_contract_update_stop_loss: contract.has_contract_update_stop_loss,
    };
});
