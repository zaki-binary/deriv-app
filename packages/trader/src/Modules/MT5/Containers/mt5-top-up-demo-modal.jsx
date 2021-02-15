import PropTypes from 'prop-types';
import React from 'react';
import SuccessDialog from 'App/Containers/Modals/success-dialog.jsx';
import { Icon, Modal, Button, Money } from '@deriv/components';
import { localize, Localize } from '@deriv/translations';
import { connect } from 'Stores/connect';
import { getTopUpConfig } from '../Helpers/constants';

const Mt5TopUpDemoModal = ({
    mt5_companies,
    current_account,
    closeSuccessTopUpModal,
    closeTopUpModal,
    is_top_up_virtual_open,
    is_top_up_virtual_in_progress,
    is_top_up_virtual_success,
    topUpVirtual,
}) => {
    const getAccountTitle = React.useCallback(() => {
        if (!mt5_companies || !current_account) return '';
        return mt5_companies[current_account.category][current_account.type].title;
    }, [mt5_companies, current_account]);

    const onCloseSuccess = () => {
        closeSuccessTopUpModal();
    };

    if (!mt5_companies || !current_account) return null;

    const { currency, minimum_amount, additional_amount } = getTopUpConfig();

    return (
        <React.Fragment>
            <Modal
                toggleModal={closeTopUpModal}
                is_open={is_top_up_virtual_open}
                className='top-up-virtual'
                title={localize('Fund top up')}
                width='384px'
            >
                <div className='dc-modal__container_top-up-virtual__body'>
                    <p className='dc-modal__container_top-up-virtual__description'>
                        <Localize
                            i18n_default_text='You can top up your demo account with an additional <0></0> if your balance is <1></1> or less.'
                            components={[
                                <Money key={0} amount={additional_amount} currency={currency} show_currency />,
                                <Money key={1} amount={minimum_amount} currency={currency} show_currency />,
                            ]}
                        />
                    </p>
                    <h4 className='dc-modal__container_top-up-virtual--h4'>
                        <Localize
                            i18n_default_text='DMT5 {{ account_title }} account'
                            values={{ account_title: getAccountTitle() }}
                        />
                    </h4>
                    <div>
                        <p className='dc-modal__container_top-up-virtual--balance-descriptor'>
                            <Localize i18n_default_text='Current balance' />
                        </p>
                        <div className='dc-modal__container_top-up-virtual--balance'>
                            <Money amount={current_account.display_balance} currency={current_account.currency} />
                        </div>
                    </div>
                    <div className='dc-modal__container_top-up-virtual--button'>
                        <Button
                            is_disabled={current_account.balance > 1000 || is_top_up_virtual_in_progress}
                            type='button'
                            is_loading={is_top_up_virtual_in_progress}
                            onClick={topUpVirtual}
                            primary
                            large
                        >
                            {!is_top_up_virtual_in_progress && (
                                <Localize
                                    i18n_default_text='Top up &nbsp;<0></0>'
                                    components={[
                                        <Money key={0} amount={additional_amount} currency={currency} show_currency />,
                                    ]}
                                />
                            )}
                        </Button>
                    </div>
                </div>
            </Modal>
            <SuccessDialog
                is_open={is_top_up_virtual_success}
                toggleModal={onCloseSuccess}
                has_close_icon
                title={localize('Fund top up')}
                icon={<Icon icon='IcCashierWallet' size={128} />}
                heading={
                    <h3 className='mt5-success-topup__heading'>
                        <Localize
                            i18n_default_text='<0></0> has been credited into your DMT5 {{title}} account.'
                            values={{ title: getAccountTitle() }}
                            components={[
                                <Money key={0} amount={additional_amount} currency={currency} show_currency />,
                            ]}
                        />
                    </h3>
                }
                message={
                    <div className='mt5-success-topup__description'>
                        <p>
                            <Localize i18n_default_text='New current balance' />
                        </p>
                        <div className='dc-modal__container_top-up-virtual--balance'>
                            <Money amount={current_account.balance} currency={current_account.currency} />
                        </div>
                    </div>
                }
                icon_size='large'
                has_cancel={false}
                has_submit={false}
                width='384px'
            />
        </React.Fragment>
    );
};

Mt5TopUpDemoModal.propTypes = {
    account_title: PropTypes.string,
    closeSuccessTopUpModal: PropTypes.func,
    closeTopUpVirtual: PropTypes.func,
    currency: PropTypes.string,
    display_balance: PropTypes.string,
    is_top_up_virtual_open: PropTypes.bool,
    is_top_up_virtual_in_progress: PropTypes.bool,
    is_top_up_virtual_success: PropTypes.bool,
    topUpVirtual: PropTypes.func,
};

export default connect(({ ui, modules }) => ({
    is_top_up_virtual_open: ui.is_top_up_virtual_open,
    is_top_up_virtual_in_progress: ui.is_top_up_virtual_in_progress,
    is_top_up_virtual_success: ui.is_top_up_virtual_success,
    closeTopUpModal: ui.closeTopUpModal,
    closeSuccessTopUpModal: ui.closeSuccessTopUpModal,
    current_account: modules.mt5.current_account,
    mt5_companies: modules.mt5.mt5_companies,
    topUpVirtual: modules.mt5.topUpVirtual,
}))(Mt5TopUpDemoModal);
