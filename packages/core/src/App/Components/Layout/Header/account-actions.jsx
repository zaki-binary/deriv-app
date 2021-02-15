import * as PropTypes from 'prop-types';
import React from 'react';
import { Button, DesktopWrapper, Icon, MobileWrapper, Popover } from '@deriv/components';
import { routes, formatMoney, PlatformContext } from '@deriv/shared';
import { localize, Localize } from '@deriv/translations';
import { LoginButton } from './login-button.jsx';
import { SignupButton } from './signup-button.jsx';
import ToggleNotifications from './toggle-notifications.jsx';
import { BinaryLink } from '../../Routes';
import 'Sass/app/_common/components/account-switcher.scss';

const AccountInfo = React.lazy(() =>
    import(/* webpackChunkName: "account-info", webpackPreload: true */ 'App/Components/Layout/Header/account-info.jsx')
);

export class AccountActions extends React.Component {
    static contextType = PlatformContext;
    shouldComponentUpdate(nextProps) {
        return (
            nextProps.is_acc_switcher_disabled !== this.props.is_acc_switcher_disabled ||
            nextProps.balance !== this.props.balance ||
            nextProps.currency !== this.props.currency ||
            nextProps.is_acc_switcher_on !== this.props.is_acc_switcher_on ||
            nextProps.is_notifications_visible !== this.props.is_notifications_visible ||
            nextProps.is_logged_in !== this.props.is_logged_in ||
            nextProps.is_virtual !== this.props.is_virtual ||
            nextProps.loginid !== this.props.loginid ||
            nextProps.notifications_count !== this.props.notifications_count
        );
    }

    render() {
        const {
            acc_switcher_disabled_message,
            balance,
            currency,
            disableApp,
            enableApp,
            is_acc_switcher_on,
            is_acc_switcher_disabled,
            is_logged_in,
            is_notifications_visible,
            is_virtual,
            notifications_count,
            onClickDeposit,
            openRealAccountSignup,
            toggleAccountsDialog,
            toggleNotifications,
        } = this.props;
        if (is_logged_in) {
            return (
                <React.Fragment>
                    <MobileWrapper>
                        <ToggleNotifications
                            count={notifications_count}
                            is_visible={is_notifications_visible}
                            toggleDialog={toggleNotifications}
                        />
                        <React.Suspense fallback={<div />}>
                            <AccountInfo
                                acc_switcher_disabled_message={acc_switcher_disabled_message}
                                balance={
                                    typeof balance === 'undefined' ? balance : formatMoney(currency, balance, true)
                                }
                                is_disabled={is_acc_switcher_disabled}
                                disableApp={disableApp}
                                enableApp={enableApp}
                                is_virtual={is_virtual}
                                currency={currency}
                                is_dialog_on={is_acc_switcher_on}
                                toggleDialog={toggleAccountsDialog}
                            />
                        </React.Suspense>
                    </MobileWrapper>
                    <DesktopWrapper>
                        <ToggleNotifications
                            count={notifications_count}
                            is_visible={is_notifications_visible}
                            toggleDialog={toggleNotifications}
                            tooltip_message={<Localize i18n_default_text='View notifications' />}
                            should_disable_pointer_events
                        />
                        <Popover
                            classNameBubble='account-settings-toggle__tooltip'
                            alignment='bottom'
                            message={<Localize i18n_default_text='Manage account settings' />}
                            should_disable_pointer_events
                            zIndex={9999}
                        >
                            <BinaryLink className='account-settings-toggle' to={routes.personal_details}>
                                <Icon icon='IcUserOutline' />
                            </BinaryLink>
                        </Popover>
                        <React.Suspense fallback={<div />}>
                            <AccountInfo
                                acc_switcher_disabled_message={acc_switcher_disabled_message}
                                balance={
                                    typeof balance === 'undefined' ? balance : formatMoney(currency, balance, true)
                                }
                                is_disabled={is_acc_switcher_disabled}
                                is_virtual={is_virtual}
                                currency={currency}
                                is_dialog_on={is_acc_switcher_on}
                                toggleDialog={toggleAccountsDialog}
                            />
                        </React.Suspense>
                        {!is_virtual && !currency && (
                            <div className='set-currency'>
                                <Button
                                    onClick={openRealAccountSignup}
                                    has_effect
                                    type='button'
                                    text={localize('Set currency')}
                                    primary
                                />
                            </div>
                        )}
                        {currency && (
                            <Button
                                className='acc-info__button'
                                has_effect
                                text={localize('Deposit')}
                                onClick={onClickDeposit}
                                primary
                            />
                        )}
                    </DesktopWrapper>
                </React.Fragment>
            );
        }
        return (
            <React.Fragment>
                <LoginButton className='acc-info__button' />
                <SignupButton is_deriv_crypto={this.context.is_deriv_crypto} className='acc-info__button' />
            </React.Fragment>
        );
    }
}

AccountActions.propTypes = {
    acc_switcher_disabled_message: PropTypes.any,
    balance: PropTypes.any,
    currency: PropTypes.any,
    is_acc_switcher_disabled: PropTypes.any,
    disableApp: PropTypes.any,
    enableApp: PropTypes.any,
    is_acc_switcher_on: PropTypes.any,
    is_logged_in: PropTypes.any,
    is_notifications_visible: PropTypes.any,
    is_virtual: PropTypes.any,
    notifications_count: PropTypes.any,
    onClickDeposit: PropTypes.func,
    openRealAccountSignup: PropTypes.func,
    toggleAccountsDialog: PropTypes.any,
    toggleNotifications: PropTypes.any,
};
