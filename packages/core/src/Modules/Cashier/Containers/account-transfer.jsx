import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'Stores/connect';
import AccountTransferNoAccount from '../Components/Error/account-transfer-no-account.jsx';
import Error from '../Components/Error/error.jsx';
import NoBalance from '../Components/Error/no-balance.jsx';
import Virtual from '../Components/Error/virtual.jsx';
import CashierLocked from '../Components/Error/cashier-locked.jsx';
import TransferLock from '../Components/Error/transfer-locked.jsx';
import AccountTransferForm from '../Components/Form/account-transfer-form.jsx';
import AccountTransferReceipt from '../Components/Receipt/account-transfer-receipt.jsx';
import Loading from '../../../templates/_common/components/loading.jsx';
import AccountTransferConfirm from '../Components/Confirm/account-transfer-confirm.jsx';

const AccountTransfer = ({
    accounts_list,
    container,
    error,
    has_no_account,
    has_no_accounts_balance,
    is_cashier_locked,
    is_loading,
    is_switching,
    is_transfer_confirm,
    is_transfer_lock,
    is_transfer_successful,
    is_virtual,
    onMount,
    setAccountTransferAmount,
    setActiveTab,
    setIsTransferConfirm,
    setSideNotes,
}) => {
    React.useEffect(() => {
        setActiveTab(container);
        onMount();
        return () => {
            setAccountTransferAmount('');
            setIsTransferConfirm(false);
        };
    }, []);

    if (is_virtual) {
        return <Virtual />;
    }
    if (is_loading || is_switching) {
        return <Loading className='cashier__loader' />;
    }
    if (is_cashier_locked) {
        return <CashierLocked />;
    }
    if (is_transfer_lock) {
        return <TransferLock />;
    }
    if (error.is_show_full_page || (error.message && !accounts_list.length)) {
        // for errors with CTA hide the form and show the error,
        // for others show them at the bottom of the form next to submit button
        return <Error error={error} />;
    }
    if (has_no_account) {
        return <AccountTransferNoAccount />;
    }
    if (has_no_accounts_balance) {
        return <NoBalance />;
    }
    if (is_transfer_confirm) {
        if (typeof setSideNotes === 'function') {
            setSideNotes(null);
        }
        return <AccountTransferConfirm />;
    }
    if (is_transfer_successful) {
        if (typeof setSideNotes === 'function') {
            setSideNotes(null);
        }
        return <AccountTransferReceipt />;
    }
    return <AccountTransferForm error={error} setSideNotes={setSideNotes} />;
};

AccountTransfer.propTypes = {
    accounts_list: PropTypes.array,
    container: PropTypes.string,
    error: PropTypes.object,
    has_no_account: PropTypes.bool,
    has_no_accounts_balance: PropTypes.bool,
    is_cashier_locked: PropTypes.bool,
    is_loading: PropTypes.bool,
    is_switching: PropTypes.bool,
    is_transfer_confirm: PropTypes.bool,
    is_transfer_successful: PropTypes.bool,
    is_transfer_lock: PropTypes.bool,
    is_virtual: PropTypes.bool,
    onMount: PropTypes.func,
    setAccountTransferAmount: PropTypes.func,
    setActiveTab: PropTypes.func,
    setIsTransferConfirm: PropTypes.func,
    setSideNotes: PropTypes.func,
};

export default connect(({ client, modules }) => ({
    is_virtual: client.is_virtual,
    is_switching: client.is_switching,
    accounts_list: modules.cashier.config.account_transfer.accounts_list,
    container: modules.cashier.config.account_transfer.container,
    error: modules.cashier.config.account_transfer.error,
    has_no_account: modules.cashier.config.account_transfer.has_no_account,
    has_no_accounts_balance: modules.cashier.config.account_transfer.has_no_accounts_balance,
    is_cashier_locked: modules.cashier.is_cashier_locked,
    is_loading: modules.cashier.is_loading,
    is_transfer_confirm: modules.cashier.config.account_transfer.is_transfer_confirm,
    is_transfer_successful: modules.cashier.config.account_transfer.is_transfer_successful,
    is_transfer_lock: modules.cashier.is_transfer_lock,
    onMount: modules.cashier.onMountAccountTransfer,
    setActiveTab: modules.cashier.setActiveTab,
    setAccountTransferAmount: modules.cashier.setAccountTransferAmount,
    setIsTransferConfirm: modules.cashier.setIsTransferConfirm,
}))(AccountTransfer);
