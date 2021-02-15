import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import P2P from '@deriv/p2p';
import { getLanguage } from '@deriv/translations';
import { WS } from 'Services';
import { connect } from 'Stores/connect';
import ServerTime from '_common/base/server_time';
import { routes } from '@deriv/shared';
import { Loading } from '@deriv/components';

/* P2P will use the same websocket connection as Deriv/Binary, we need to pass it as a prop */
const P2PCashier = ({
    currency,
    history,
    is_dark_mode_on,
    is_logging_in,
    is_mobile,
    is_virtual,
    local_currency_config,
    location,
    loginid,
    residence,
    setNotificationCount,
}) => {
    const [order_id, setOrderId] = React.useState(null);

    React.useEffect(() => {
        const url_params = new URLSearchParams(location.search);
        const passed_order_id = url_params.get('order');

        if (passed_order_id) {
            setQueryOrder(passed_order_id);
        }

        return () => setQueryOrder(null);
    }, [location.search, setQueryOrder]);

    const setQueryOrder = React.useCallback(
        input_order_id => {
            const current_query_params = new URLSearchParams(location.search);

            if (current_query_params.has('order')) {
                current_query_params.delete('order');
            }

            if (input_order_id) {
                current_query_params.append('order', input_order_id);
            }

            if (order_id !== input_order_id) {
                // Changing query params
                history.push({
                    pathname: routes.cashier_p2p,
                    search: current_query_params.toString(),
                    hash: location.hash,
                });

                setOrderId(input_order_id);
            }
        },
        [history, location.hash, location.search, order_id]
    );

    if (is_logging_in) {
        return <Loading is_fullscreen={false} />;
    }

    return (
        <P2P
            client={{ currency, local_currency_config, is_virtual, residence, loginid }}
            is_dark_mode_on={is_dark_mode_on}
            is_mobile={is_mobile}
            lang={getLanguage()}
            modal_root_id='modal_root'
            order_id={order_id}
            poi_url={routes.proof_of_identity}
            server_time={ServerTime}
            setNotificationCount={setNotificationCount}
            setOrderId={setQueryOrder}
            should_show_verification={/verification/.test(location.hash)}
            websocket_api={WS}
        />
    );
};

P2PCashier.propTypes = {
    currency: PropTypes.string,
    history: PropTypes.object,
    is_dark_mode_on: PropTypes.bool,
    is_logging_in: PropTypes.bool,
    is_mobile: PropTypes.bool,
    is_virtual: PropTypes.bool,
    local_currency_config: PropTypes.object,
    location: PropTypes.object,
    loginid: PropTypes.string,
    residence: PropTypes.string,
    setNotificationCount: PropTypes.func,
};

export default withRouter(
    connect(({ client, modules, ui }) => ({
        currency: client.currency,
        local_currency_config: client.local_currency_config,
        loginid: client.loginid,
        is_dark_mode_on: ui.is_dark_mode_on,
        is_logging_in: client.is_logging_in,
        is_virtual: client.is_virtual,
        residence: client.residence,
        setNotificationCount: modules.cashier.setNotificationCount,
        is_mobile: ui.is_mobile,
    }))(P2PCashier)
);
