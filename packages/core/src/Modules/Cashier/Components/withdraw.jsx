import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'Stores/connect';
import CashierContainer from './cashier-container.jsx';

const Withdraw = ({ container, iframe_height, iframe_url, is_loading, onMount, setActiveTab, verification_code }) => {
    React.useEffect(() => {
        setActiveTab(container);
        if (verification_code) onMount(verification_code);
    }, [container, onMount, setActiveTab, verification_code]);

    return <CashierContainer iframe_height={iframe_height} iframe_url={iframe_url} is_loading={is_loading} />;
};

Withdraw.propTypes = {
    container: PropTypes.string,
    iframe_height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    iframe_url: PropTypes.string,
    is_loading: PropTypes.bool,
    onMount: PropTypes.func,
    setActiveTab: PropTypes.func,
    verification_code: PropTypes.string,
};

export default connect(({ client, modules }) => ({
    container: modules.cashier.config.withdraw.container,
    iframe_height: modules.cashier.config.withdraw.iframe_height,
    iframe_url: modules.cashier.config.withdraw.iframe_url,
    is_loading: modules.cashier.is_loading,
    onMount: modules.cashier.onMount,
    setActiveTab: modules.cashier.setActiveTab,
    verification_code: client.verification_code.payment_withdraw,
}))(Withdraw);
