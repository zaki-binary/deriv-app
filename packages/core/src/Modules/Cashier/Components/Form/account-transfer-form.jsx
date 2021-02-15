import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { Field, Formik, Form } from 'formik';
import {
    Button,
    Dropdown,
    Icon,
    Input,
    Money,
    DesktopWrapper,
    MobileWrapper,
    SelectNative,
    Text,
} from '@deriv/components';
import { getDecimalPlaces, getCurrencyDisplayCode, getCurrencyName, validNumber } from '@deriv/shared';
import { localize, Localize } from '@deriv/translations';
import { connect } from 'Stores/connect';
import FormError from '../Error/form-error.jsx';
import Loading from '../../../../templates/_common/components/loading.jsx';

const AccountOption = ({ account, idx }) => {
    return (
        <React.Fragment key={idx}>
            {(account.currency || account.mt_icon) && (
                <div>
                    <Icon
                        icon={
                            account.mt_icon
                                ? `IcMt5-${account.mt_icon}`
                                : `IcCurrency-${account.currency.toLowerCase()}`
                        }
                        className='account-transfer__currency-icon'
                    />
                </div>
            )}

            <div className='account-transfer__currency-wrapper'>
                <Text size='xxs' line_height='xs' styles={{ color: 'inherit', fontWeight: 'inherit' }}>
                    {account.is_mt ? account.mt_icon : getCurrencyName(account.text)}
                </Text>
                <Text size='xxxs' align='left' color='less-prominent'>
                    {account.value}
                </Text>
            </div>

            <span className='account-transfer__balance'>
                <Money amount={account.balance} currency={account.currency} show_currency />
            </span>
        </React.Fragment>
    );
};

const AccountTransferBullet = ({ children }) => (
    <div className='account-transfer__bullet-wrapper'>
        <div className='account-transfer__bullet' />
        <span>{children}</span>
    </div>
);

const AccountTransferNote = ({ currency, transfer_fee, minimum_fee }) => (
    <div className='account-transfer__notes'>
        <DesktopWrapper>
            <div className='cashier__header account-transfer__notes-header'>
                <Localize i18n_default_text='Notes' />
            </div>
        </DesktopWrapper>
        <AccountTransferBullet>
            <Localize
                i18n_default_text='We’ll charge a {{transfer_fee}}% transfer fee, or {{minimum_fee}} {{currency}}, whichever is higher.'
                values={{
                    transfer_fee,
                    minimum_fee,
                    currency: getCurrencyDisplayCode(currency),
                }}
            />
        </AccountTransferBullet>
        <AccountTransferBullet>
            <Localize i18n_default_text='Transfers may be unavailable when the exchange markets are closed, when there is high volatility, or when there are technical issues.' />
        </AccountTransferBullet>
    </div>
);

let remaining_transfers, transfer_to_hint;

let from_accounts = {};
let to_accounts = {};

let accounts_from = [];
let mt_accounts_from = [];
let accounts_to = [];
let mt_accounts_to = [];

const AccountTransferForm = ({
    account_transfer_amount,
    onMount,
    transfer_limit,
    account_limits,
    selected_from,
    selected_to,
    accounts_list,
    setAccountTransferAmount,
    setSideNotes,
    transfer_fee,
    minimum_fee,
    onChangeTransferFrom,
    onChangeTransferTo,
    setErrorMessage,
    setIsTransferConfirm,
    error,
}) => {
    const validateAmount = amount => {
        if (!amount) return localize('This field is required.');

        const { is_ok, message } = validNumber(amount, {
            type: 'float',
            decimals: getDecimalPlaces(selected_from.currency),
            min: transfer_limit.min,
            max: transfer_limit.max,
        });
        if (!is_ok) return message;

        if (+selected_from.balance < +amount) return localize('Insufficient balance.');

        return undefined;
    };

    React.useEffect(() => {
        onMount();
    }, []);

    React.useEffect(() => {
        accounts_from = [];
        mt_accounts_from = [];
        accounts_to = [];
        mt_accounts_to = [];

        accounts_list.forEach((account, idx) => {
            const text = <AccountOption idx={idx} account={account} />;
            const value = account.value;
            (account.is_mt ? mt_accounts_from : accounts_from).push({
                text,
                value,
                nativepicker_text: `${account.is_mt ? account.mt_icon : getCurrencyName(account.currency)} (${
                    account.balance
                } ${account.is_mt ? account.currency : account.text})`,
            });
            const is_selected_from = account.value === selected_from.value;
            // account from and to cannot be the same
            if (!is_selected_from) {
                const is_selected_from_mt = selected_from.is_mt && account.is_mt;
                const is_selected_from_crypto = selected_from.is_crypto && account.is_crypto;
                // cannot transfer to MT account from MT
                // cannot transfer to crypto account from crypto
                const is_disabled = is_selected_from_mt || is_selected_from_crypto;
                (account.is_mt ? mt_accounts_to : accounts_to).push({
                    text,
                    value,
                    disabled: is_disabled,
                    nativepicker_text: `${account.is_mt ? account.mt_icon : getCurrencyName(account.currency)} (${
                        account.balance
                    } ${account.is_mt ? account.currency : account.text})`,
                });
            }
        });

        from_accounts = {
            ...(mt_accounts_from.length && { [localize('DMT5 accounts')]: mt_accounts_from }),
            ...(accounts_from.length && { [localize('Deriv accounts')]: accounts_from }),
        };

        to_accounts = {
            ...(mt_accounts_to.length && { [localize('DMT5 accounts')]: mt_accounts_to }),
            ...(accounts_to.length && { [localize('Deriv accounts')]: accounts_to }),
        };
    }, [accounts_list, selected_to, selected_from]);

    React.useEffect(() => {
        if (Object.keys(from_accounts).length && typeof setSideNotes === 'function') {
            setSideNotes([
                <AccountTransferNote
                    transfer_fee={transfer_fee}
                    currency={selected_from.currency}
                    minimum_fee={minimum_fee}
                    key={0}
                />,
            ]);
        }
    }, [transfer_fee, selected_from, minimum_fee]);

    React.useEffect(() => {
        const { daily_transfers } = account_limits;
        const mt5_remaining_transfers = daily_transfers?.mt5?.available;
        const internal_remaining_transfers = daily_transfers?.internal?.available;

        const is_mt_transfer = selected_to.is_mt || selected_from.is_mt;
        remaining_transfers = is_mt_transfer ? mt5_remaining_transfers : internal_remaining_transfers;

        transfer_to_hint =
            +remaining_transfers === 1
                ? localize('You have {{number}} transfer remaining for today.', { number: remaining_transfers })
                : localize('You have {{number}} transfers remaining for today.', { number: remaining_transfers });
    }, [selected_to, selected_from, account_limits]);

    return (
        <div className='cashier__wrapper account-transfer__wrapper'>
            <h2 className='cashier__header cashier__content-header'>
                {localize('Transfer between your accounts in Deriv')}
            </h2>
            <Formik
                initialValues={{
                    amount: account_transfer_amount,
                }}
                onSubmit={() => {
                    setIsTransferConfirm(true);
                }}
            >
                {({
                    errors,
                    isSubmitting,
                    isValid,
                    touched,
                    validateField,
                    setFieldValue,
                    setFieldTouched,
                    setFieldError,
                    handleChange,
                }) => (
                    <React.Fragment>
                        {isSubmitting ? (
                            <div className='cashier__loader-wrapper'>
                                <Loading className='cashier__loader' />
                            </div>
                        ) : (
                            <Form>
                                <div className='cashier__drop-down-wrapper account-transfer__drop-down-wrapper'>
                                    <DesktopWrapper>
                                        <Dropdown
                                            id='transfer_from'
                                            className='cashier__drop-down account-transfer__drop-down'
                                            classNameDisplay='cashier__drop-down-display'
                                            classNameDisplaySpan='cashier__drop-down-display-span'
                                            classNameItems='cashier__drop-down-items'
                                            classNameLabel='cashier__drop-down-label'
                                            is_large
                                            label={localize('From')}
                                            list={from_accounts}
                                            list_height='404'
                                            name='transfer_from'
                                            value={selected_from.value}
                                            onChange={e => {
                                                onChangeTransferFrom(e);
                                                handleChange(e);
                                                validateField('amount');
                                                setFieldValue('amount', '');
                                                setFieldError('amount', '');
                                                setFieldTouched('amount', false);
                                            }}
                                            error={selected_from.error}
                                        />
                                    </DesktopWrapper>
                                    <MobileWrapper>
                                        <SelectNative
                                            placeholder={localize('Please select')}
                                            className='account-transfer__transfer-from'
                                            classNameDisplay='cashier__drop-down-display'
                                            name='transfer_from'
                                            label={localize('From')}
                                            value={selected_from.value}
                                            list_items={from_accounts}
                                            onChange={e => {
                                                onChangeTransferFrom(e);
                                                handleChange(e);
                                                validateField('amount');
                                                setFieldValue('amount', '');
                                                setFieldError('amount', '');
                                                setFieldTouched('amount', false);
                                            }}
                                            error={selected_from.error}
                                        />
                                    </MobileWrapper>
                                    <DesktopWrapper>
                                        <Dropdown
                                            id='transfer_to'
                                            className='cashier__drop-down account-transfer__drop-down account-transfer__drop-down--to-dropdown'
                                            classNameDisplay='cashier__drop-down-display'
                                            classNameDisplaySpan='cashier__drop-down-display-span'
                                            classNameItems='cashier__drop-down-items'
                                            classNameLabel='cashier__drop-down-label'
                                            is_large
                                            label={localize('To')}
                                            list={to_accounts}
                                            list_height='404'
                                            name='transfer_to'
                                            value={selected_to.value}
                                            onChange={onChangeTransferTo}
                                            hint={transfer_to_hint}
                                            error={selected_to.error}
                                        />
                                    </DesktopWrapper>
                                    <MobileWrapper>
                                        <SelectNative
                                            placeholder={localize('Please select')}
                                            className='account-transfer__transfer-to'
                                            classNameDisplay='cashier__drop-down-display'
                                            label={localize('To')}
                                            name='transfer_to'
                                            value={selected_to.value}
                                            list_items={to_accounts}
                                            onChange={onChangeTransferTo}
                                            hint={transfer_to_hint}
                                            error={selected_to.error}
                                        />
                                    </MobileWrapper>
                                </div>
                                <Field name='amount' validate={validateAmount}>
                                    {({ field }) => (
                                        <Input
                                            {...field}
                                            onChange={e => {
                                                setErrorMessage('');
                                                setFieldTouched('amount', true);
                                                handleChange(e);
                                                setAccountTransferAmount(e.target.value);
                                            }}
                                            className='cashier__input dc-input--no-placeholder account-transfer__input'
                                            type='text'
                                            label={localize('Amount')}
                                            error={touched.amount && errors.amount}
                                            required
                                            trailing_icon={
                                                selected_from.currency ? (
                                                    <span
                                                        className={classNames(
                                                            'symbols',
                                                            `symbols--${selected_from.currency.toLowerCase()}`
                                                        )}
                                                    >
                                                        {getCurrencyDisplayCode(selected_from.currency)}
                                                    </span>
                                                ) : undefined
                                            }
                                            autoComplete='off'
                                            maxLength='30'
                                            hint={
                                                transfer_limit.max && (
                                                    <Localize
                                                        i18n_default_text='Transfer limits: <0 /> - <1 />'
                                                        components={[
                                                            <Money
                                                                key={0}
                                                                amount={transfer_limit.min}
                                                                currency={selected_from.currency}
                                                                show_currency
                                                            />,
                                                            <Money
                                                                key={1}
                                                                amount={transfer_limit.max}
                                                                currency={selected_from.currency}
                                                                show_currency
                                                            />,
                                                        ]}
                                                    />
                                                )
                                            }
                                        />
                                    )}
                                </Field>
                                <div className='cashier__form-submit cashier__form-submit--align-end account-transfer__form-submit'>
                                    <Button
                                        className='cashier__form-submit-button'
                                        type='submit'
                                        is_disabled={
                                            !isValid ||
                                            isSubmitting ||
                                            !+remaining_transfers ||
                                            !!selected_from.error ||
                                            !!selected_to.error
                                        }
                                        primary
                                        large
                                    >
                                        <Localize i18n_default_text='Transfer' />
                                    </Button>
                                </div>
                                <MobileWrapper>
                                    <AccountTransferNote
                                        transfer_fee={transfer_fee}
                                        currency={selected_from.currency}
                                        minimum_fee={minimum_fee}
                                    />
                                </MobileWrapper>
                                <FormError error={error} />
                            </Form>
                        )}
                    </React.Fragment>
                )}
            </Formik>
        </div>
    );
};

AccountTransferForm.propTypes = {
    account_limits: PropTypes.object,
    accounts_list: PropTypes.array,
    error: PropTypes.object,
    minimum_fee: PropTypes.string,
    onChangeTransferFrom: PropTypes.func,
    onChangeTransferTo: PropTypes.func,
    onMount: PropTypes.func,
    requestTransferBetweenAccounts: PropTypes.func,
    selected_from: PropTypes.object,
    selected_to: PropTypes.object,
    setErrorMessage: PropTypes.func,
    setSideNotes: PropTypes.func,
    transfer_fee: PropTypes.number,
    transfer_limit: PropTypes.object,
};

export default connect(({ client, modules }) => ({
    account_limits: client.account_limits,
    onMount: client.getLimits,
    account_transfer_amount: modules.cashier.config.account_transfer.account_transfer_amount,
    accounts_list: modules.cashier.config.account_transfer.accounts_list,
    minimum_fee: modules.cashier.config.account_transfer.minimum_fee,
    onChangeTransferFrom: modules.cashier.onChangeTransferFrom,
    onChangeTransferTo: modules.cashier.onChangeTransferTo,
    requestTransferBetweenAccounts: modules.cashier.requestTransferBetweenAccounts,
    selected_from: modules.cashier.config.account_transfer.selected_from,
    selected_to: modules.cashier.config.account_transfer.selected_to,
    setErrorMessage: modules.cashier.setErrorMessage,
    setIsTransferConfirm: modules.cashier.setIsTransferConfirm,
    setAccountTransferAmount: modules.cashier.setAccountTransferAmount,
    transfer_fee: modules.cashier.config.account_transfer.transfer_fee,
    transfer_limit: modules.cashier.config.account_transfer.transfer_limit,
}))(AccountTransferForm);
