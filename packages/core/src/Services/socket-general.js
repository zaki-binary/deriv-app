import { flow } from 'mobx';
import { State, getActivePlatform, getPropertyValue, routes } from '@deriv/shared';
import { localize } from '@deriv/translations';
import ServerTime from '_common/base/server_time';
import BinarySocket from '_common/base/socket_base';
import WS from './ws-methods';

let client_store, common_store, gtm_store;

// TODO: update commented statements to the corresponding functions from app
const BinarySocketGeneral = (() => {
    const onDisconnect = () => {
        common_store.setIsSocketOpened(false);
    };

    const onOpen = is_ready => {
        if (is_ready) {
            if (!client_store.is_valid_login) {
                client_store.logout();
                return;
            }
            WS.subscribeWebsiteStatus(ResponseHandlers.websiteStatus);
            ServerTime.init(() => common_store.setServerTime(ServerTime.get()));
            common_store.setIsSocketOpened(true);
        }
    };

    const onMessage = response => {
        handleError(response);
        // Header.hideNotification('CONNECTION_ERROR');
        switch (response.msg_type) {
            case 'authorize':
                if (response.error) {
                    const is_active_tab = sessionStorage.getItem('active_tab') === '1';
                    if (getPropertyValue(response, ['error', 'code']) === 'SelfExclusion' && is_active_tab) {
                        sessionStorage.removeItem('active_tab');
                        // Dialog.alert({ id: 'authorize_error_alert', message: response.error.message });
                    }
                    client_store.logout();
                } else if (!/authorize/.test(State.get('skip_response'))) {
                    // is_populating_account_list is a check to avoid logout on the first logged-in session
                    // In any other case, if the response loginid does not match the store's loginid, user must be logged out
                    if (
                        response.authorize.loginid !== client_store.loginid &&
                        !client_store.is_populating_account_list &&
                        !client_store.is_switching
                    ) {
                        client_store.logout();
                    } else if (response.authorize.loginid === client_store.loginid) {
                        // All other cases continue with the loginid and authorize the profile
                        authorizeAccount(response);
                    }
                }
                break;
            case 'landing_company':
                // Header.upgradeMessageVisibility();
                break;
            case 'get_self_exclusion':
                // SessionDurationLimit.exclusionResponseHandler(response);
                break;
            case 'get_settings':
                if (response.get_settings) {
                    setResidence(response.get_settings.country_code);
                    client_store.setEmail(response.get_settings.email);
                    client_store.setAccountSettings(response.get_settings);
                    gtm_store.eventHandler(response.get_settings);
                }
                break;
            case 'get_account_status':
                client_store.setAccountStatus(response.get_account_status);
                break;
            case 'payout_currencies':
                client_store.responsePayoutCurrencies(response.payout_currencies);
                break;
            case 'transaction':
                gtm_store.pushTransactionData(response);
                break;
            // no default
        }
    };

    const setResidence = residence => {
        if (residence) {
            client_store.setResidence(residence);
            WS.landingCompany(residence);
        }
    };

    const setBalanceActiveAccount = flow(function* (obj_balance) {
        yield BinarySocket.wait('website_status');
        client_store.setBalanceActiveAccount(obj_balance);
    });

    const setBalanceOtherAccounts = obj_balance => {
        client_store.setBalanceOtherAccounts(obj_balance);
    };

    const handleError = response => {
        const msg_type = response.msg_type;
        const error_code = getPropertyValue(response, ['error', 'code']);
        switch (error_code) {
            case 'WrongResponse':
                // TODO: Remove condition checks below for WrongResponse once mt5 is more reliable
                if (msg_type === 'mt5_login_list') {
                    WS.authorized.mt5LoginList().then(mt5_list_response => {
                        if (!mt5_list_response.error) {
                            client_store.responseMt5LoginList(mt5_list_response);
                            WS.balanceAll().then(balance_response => {
                                if (!balance_response.error)
                                    client_store.setBalanceOtherAccounts(balance_response.balance);
                            });
                        } else {
                            client_store.resetMt5ListPopulatedState();
                        }
                    });
                } else if (msg_type === 'balance') {
                    WS.forgetAll('balance').then(subscribeBalances);
                } else if (msg_type === 'get_account_status') {
                    WS.authorized.getAccountStatus().then(account_status_response => {
                        if (!account_status_response.error) {
                            client_store.setAccountStatus(account_status_response.get_account_status);
                        }
                    });
                } else if (msg_type === 'landing_company') {
                    if (client_store.residence) {
                        WS.authorized.landingCompany(client_store.residence).then(landing_company_response => {
                            if (!landing_company_response.error) {
                                client_store.responseLandingCompany(landing_company_response);
                            }
                        });
                    }
                }
                break;
            case 'InternalServerError':
            case 'OutputValidationFailed': {
                if (msg_type !== 'mt5_login_list') {
                    common_store.setError(true, { message: response.error.message });
                }
                break;
            }
            case 'RateLimit':
                if (msg_type !== 'cashier_password') {
                    common_store.setError(true, {
                        message: localize('You have reached the rate limit of requests per second. Please try later.'),
                    });
                }
                break;
            case 'InvalidAppID':
                common_store.setError(true, { message: response.error.message });
                break;
            case 'DisabledClient':
                common_store.setError(true, { message: response.error.message });
                break;
            case 'InvalidToken':
                if (['cashier', 'paymentagent_withdraw', 'mt5_password_reset'].includes(msg_type)) {
                    return;
                }
                if (!['reset_password', 'new_account_virtual'].includes(msg_type)) {
                    if (window.TrackJS) window.TrackJS.track('Custom InvalidToken error');
                }
                // eslint-disable-next-line no-case-declarations
                const active_platform = getActivePlatform(common_store.app_routing_history);

                // DBot handles this internally. Special case: 'client.invalid_token'
                if (active_platform === 'DBot') return;

                client_store.logout().then(() => {
                    let redirect_to = routes.trade;
                    if (active_platform === 'DMT5') {
                        redirect_to = routes.mt5;
                    }
                    common_store.routeTo(redirect_to);
                });
                break;
            case 'AuthorizationRequired':
                // if msg_type is coming from 'buy', behaviour should be handled in app itself.
                if (msg_type === 'buy') {
                    return;
                }
                client_store.logout();
                break;
            // no default
        }
    };

    const init = store => {
        client_store = store.client;
        common_store = store.common;
        gtm_store = store.gtm;

        return {
            onDisconnect,
            onOpen,
            onMessage,
        };
    };

    const subscribeBalances = () => {
        WS.subscribeBalanceAll(ResponseHandlers.balanceOtherAccounts);
        WS.subscribeBalanceActiveAccount(ResponseHandlers.balanceActiveAccount, client_store.loginid);
    };

    const authorizeAccount = response => {
        client_store.responseAuthorize(response);
        subscribeBalances();
        WS.storage.getSettings();
        WS.getAccountStatus();
        WS.storage.payoutCurrencies();
        if (!client_store.is_virtual) {
            WS.getSelfExclusion();
        }
        BinarySocket.sendBuffered();
        if (/bch/i.test(response.authorize.currency) && !client_store.accounts[client_store.loginid].accepted_bch) {
            // showPopup({
            //     url        : urlFor('user/warning'),
            //     popup_id   : 'warning_popup',
            //     form_id    : '#frm_warning',
            //     content_id : '#warning_content',
            //     validations: [{ selector: '#chk_accept', validations: [['req', { hide_asterisk: true }]] }],
            //     onAccept   : () => { Client.set('accepted_bch', 1); },
            // });
        }
    };

    return {
        init,
        setBalanceActiveAccount,
        setBalanceOtherAccounts,
        authorizeAccount,
    };
})();

export default BinarySocketGeneral;

const ResponseHandlers = (() => {
    const websiteStatus = response => {
        if (response.website_status) {
            const is_available = !BinarySocket.isSiteDown(response.website_status.site_status);
            if (is_available && BinarySocket.getAvailability().is_down) {
                window.location.reload();
                return;
            }
            const is_updating = BinarySocket.isSiteUpdating(response.website_status.site_status);
            if (is_updating && !BinarySocket.getAvailability().is_updating) {
                // the existing connection is alive for one minute while status is updating
                // switch to the new connection somewhere between 1-30 seconds from now
                // to avoid everyone switching to the new connection at the same time
                const rand_timeout = Math.floor(Math.random() * 30) + 1;
                window.setTimeout(() => {
                    BinarySocket.closeAndOpenNewConnection();
                }, rand_timeout * 1000);
            }
            BinarySocket.setAvailability(response.website_status.site_status);
            client_store.setWebsiteStatus(response);
        }
    };

    const balanceActiveAccount = response => {
        if (!response.error) {
            BinarySocketGeneral.setBalanceActiveAccount(response.balance);
        }
    };

    const balanceOtherAccounts = response => {
        if (!response.error) {
            BinarySocketGeneral.setBalanceOtherAccounts(response.balance);
        }
    };

    return {
        websiteStatus,
        balanceActiveAccount,
        balanceOtherAccounts,
    };
})();
