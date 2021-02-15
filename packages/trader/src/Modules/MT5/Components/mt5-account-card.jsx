import classNames from 'classnames';
import React from 'react';
import { Icon, Money, Button, Text } from '@deriv/components';
import { Localize } from '@deriv/translations';
import { Mt5AccountCopy } from './mt5-account-copy.jsx';
import { getMT5WebTerminalLink } from '../Helpers/constants';

const account_icons = {
    synthetic: 'IcMt5SyntheticPlatform',
    financial: 'IcMt5FinancialPlatform',
    financial_stp: 'IcMt5FinancialStpPlatform',
};

const LoginBadge = ({ display_login }) => (
    <div className='mt5-account-card__login'>
        <Localize
            i18n_default_text='<0>Account login no.</0><1>{{display_login}}</1>'
            values={{
                display_login,
            }}
            components={[<span key={0} />, <strong key={1} />]}
        />
        <Mt5AccountCopy text={display_login} />
    </div>
);

const MT5AccountCardAction = ({
    button_label,
    handleClickSwitchAccount,
    has_real_account,
    is_accounts_switcher_on,
    is_button_primary,
    is_disabled,
    is_virtual,
    onSelectAccount,
    type,
}) => {
    if (
        is_virtual &&
        has_real_account &&
        type.category === 'real' &&
        type.type === 'financial_stp' &&
        typeof handleClickSwitchAccount === 'function'
    ) {
        return (
            <div className='mt5-account-card__action-wrapper'>
                <Localize
                    i18n_default_text='<0>Switch to your real account</0><1> to create a DMT5 Financial STP account.</1>'
                    components={[
                        <a
                            className={classNames('mt5-account-card__action-wrapper__link link link--orange', {
                                'mt5-account-card__action-wrapper__link--disabled': is_accounts_switcher_on,
                            })}
                            key={0}
                            onClick={handleClickSwitchAccount}
                        />,
                        <Text key={1} line_height='s' size='xxs' />,
                    ]}
                />
            </div>
        );
    }
    const lbl_add_account =
        type.category === 'real' ? (
            <Localize i18n_default_text='Add real account' />
        ) : (
            <Localize i18n_default_text='Add demo account' />
        );
    const cta_label = button_label || lbl_add_account;
    return (
        <Button
            className='mt5-account-card__account-selection'
            onClick={onSelectAccount}
            type='button'
            is_disabled={is_disabled}
            primary={is_button_primary}
            secondary={!is_button_primary}
            large
        >
            {cta_label}
        </Button>
    );
};

const MT5AccountCard = ({
    button_label,
    commission_message,
    descriptor,
    existing_data,
    has_mt5_account,
    has_real_account,
    is_accounts_switcher_on,
    is_button_primary,
    is_disabled,
    is_logged_in,
    is_virtual,
    specs,
    title,
    type,
    onSelectAccount,
    onClickFund,
    onPasswordManager,
    toggleAccountsDialog,
    toggleShouldShowRealAccountsList,
}) => {
    const icon = type.type ? <Icon icon={account_icons[type.type]} size={64} /> : null;
    const has_popular_banner = type.type === 'synthetic' && type.category === 'real';
    const has_demo_banner = type.category === 'demo';

    const handleClickSwitchAccount = () => {
        toggleShouldShowRealAccountsList(true);
        toggleAccountsDialog(true);
    };

    return (
        <div className={classNames('mt5-account-card', { 'mt5-account-card__logged-out': !is_logged_in })}>
            {has_popular_banner && (
                <div className='mt5-account-card__banner'>
                    <Localize i18n_default_text='Most popular' />
                </div>
            )}
            {has_demo_banner && (
                <div className='mt5-account-card__banner mt5-account-card__banner--demo'>
                    <Localize i18n_default_text='DEMO' />
                </div>
            )}
            <div
                className={classNames('mt5-account-card__type', {
                    'mt5-account-card__type--has-banner': has_popular_banner || has_demo_banner,
                })}
                id={`mt5_${type.category}_${type.type}`}
            >
                {icon}
                <div className='mt5-account-card__type--description'>
                    <h1 className='mt5-account-card--heading'>{title}</h1>
                    {(!existing_data || !is_logged_in) && <p className='mt5-account-card--paragraph'>{descriptor}</p>}
                    {existing_data && existing_data.display_balance && is_logged_in && (
                        <p className='mt5-account-card--balance'>
                            <Money
                                amount={existing_data.display_balance}
                                currency={existing_data.currency}
                                show_currency
                            />
                        </p>
                    )}
                </div>
            </div>

            <div className='mt5-account-card__cta'>
                <div className='mt5-account-card__specs'>
                    <table className='mt5-account-card__specs-table'>
                        <tbody>
                            {Object.keys(specs).map((spec_attribute, idx) => (
                                <tr key={idx} className='mt5-account-card__specs-table-row'>
                                    <td className='mt5-account-card__specs-table-attribute'>
                                        <p className='mt5-account-card--paragraph'>{spec_attribute}</p>
                                    </td>
                                    <td className='mt5-account-card__specs-table-data'>
                                        <p className='mt5-account-card--paragraph'>{specs[spec_attribute]}</p>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {existing_data?.login && is_logged_in && <LoginBadge display_login={existing_data.display_login} />}

                {((!existing_data && commission_message) || !is_logged_in) && (
                    <p className='mt5-account-card__commission mt5-account-card--paragraph'>{commission_message}</p>
                )}
                {existing_data && is_logged_in && (
                    <div className='mt5-account-card__manage'>
                        <Button onClick={onClickFund} type='button' secondary>
                            {type.category === 'real' && <Localize i18n_default_text='Fund transfer' />}
                            {type.category === 'demo' && <Localize i18n_default_text='Fund top up' />}
                        </Button>
                        <Button
                            onClick={() => {
                                onPasswordManager(existing_data.login, title, type.category, type.type);
                            }}
                            type='button'
                            secondary
                        >
                            <Localize i18n_default_text='Password' />
                        </Button>
                    </div>
                )}

                {!existing_data && has_mt5_account && (
                    <Button className='mt5-account-card__account-selection' onClick={onSelectAccount} type='button'>
                        <Localize i18n_default_text='Select' />
                    </Button>
                )}
                {existing_data && is_logged_in && (
                    <a
                        className='dc-btn mt5-account-card__account-selection mt5-account-card__account-selection--primary'
                        type='button'
                        href={getMT5WebTerminalLink({ category: type.category, loginid: existing_data.display_login })}
                        target='_blank'
                        rel='noopener noreferrer'
                    >
                        <Localize i18n_default_text='Trade on web terminal' />
                    </a>
                )}
                {!existing_data && !has_mt5_account && is_logged_in && (
                    <MT5AccountCardAction
                        button_label={button_label}
                        handleClickSwitchAccount={handleClickSwitchAccount}
                        has_real_account={has_real_account}
                        is_accounts_switcher_on={is_accounts_switcher_on}
                        is_button_primary={is_button_primary}
                        is_disabled={is_disabled}
                        is_virtual={is_virtual}
                        onSelectAccount={onSelectAccount}
                        type={type}
                    />
                )}
            </div>
        </div>
    );
};

export { MT5AccountCard };
