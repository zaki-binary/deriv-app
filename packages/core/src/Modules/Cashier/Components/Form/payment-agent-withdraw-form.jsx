import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { Field, Formik, Form } from 'formik';
import { Button, DesktopWrapper, Dropdown, Input, MobileWrapper, Money, SelectNative } from '@deriv/components';
import { getDecimalPlaces, getCurrencyDisplayCode, validNumber } from '@deriv/shared';
import { localize, Localize } from '@deriv/translations';
import { connect } from 'Stores/connect';
import PaymentAgentWithdrawConfirm from '../Confirm/payment-agent-withdraw-confirm.jsx';
import FormError from '../Error/form-error.jsx';
import PaymentAgentReceipt from '../Receipt/payment-agent-receipt.jsx';
import Loading from '../../../../templates/_common/components/loading.jsx';

const validateWithdrawal = (values, { balance, currency, payment_agent }) => {
    const errors = {};

    if (
        values.payment_method === 'payment_agent' &&
        (!values.payment_agent || !/^[A-Za-z]+[0-9]+$/.test(values.payment_agent))
    ) {
        errors.payment_agent = localize('Please enter a valid payment agent ID.');
    }

    const { is_ok, message } = validNumber(values.amount, {
        type: 'float',
        decimals: getDecimalPlaces(currency),
        ...(payment_agent.min_withdrawal && {
            min: payment_agent.min_withdrawal,
            max: payment_agent.max_withdrawal,
        }),
    });

    if (!values.amount) {
        errors.amount = localize('This field is required.');
    } else if (!is_ok) {
        errors.amount = message;
    } else if (+balance < +values.amount) {
        errors.amount = localize('Insufficient balance.');
    }

    return errors;
};

// TODO: refactor this to use the main radio component for forms too if possible
const Radio = ({ children, field, props }) => (
    <div className='payment-agent__radio-container'>
        <input
            id={props.id}
            className={props.className}
            name={field.name}
            value={props.id}
            checked={field.value === props.id}
            onChange={field.onChange}
            type='radio'
        />
        <label htmlFor={props.id} className='payment-agent__radio-wrapper'>
            <span
                className={classNames('payment-agent__radio-circle', {
                    'payment-agent__radio-circle--selected': field.value === props.id,
                })}
            />
            {children}
        </label>
    </div>
);

const RadioDropDown = ({ field, values, ...props }) => (
    <Radio field={field} props={props}>
        <span className='payment-agent__radio-label cashier__paragraph'>
            <Localize i18n_default_text='By name' />
        </span>
        <Field name='payment_agents'>
            {params => (
                <React.Fragment>
                    <DesktopWrapper>
                        <Dropdown
                            className='cashier__drop-down payment-agent__drop-down'
                            classNameDisplay='cashier__drop-down-display'
                            classNameDisplaySpan='cashier__drop-down-display-span'
                            classNameItems='cashier__drop-down-items'
                            list={props.payment_agent_list}
                            value={values.payment_agents}
                            onChange={e => {
                                params.form.setFieldValue('payment_agents', e.target.value);
                            }}
                        />
                    </DesktopWrapper>
                    <MobileWrapper>
                        <SelectNative
                            placeholder={localize('Please select')}
                            name='payment_methods'
                            list_items={props.payment_agent_list}
                            value={values.payment_agents}
                            label={localize('Choose agent')}
                            onChange={e => params.form.setFieldValue('payment_agents', e.target.value)}
                            use_text={false}
                        />
                    </MobileWrapper>
                </React.Fragment>
            )}
        </Field>
    </Radio>
);

const RadioInput = ({ touched, errors, field, values, ...props }) => (
    <Radio field={field} props={props}>
        <span className='payment-agent__radio-label cashier__paragraph'>
            <Localize i18n_default_text='By payment agent ID' />
        </span>
        <Field>
            {params => (
                <Input
                    name='payment_agent'
                    className='payment-agent__input'
                    classNameError='payment-agent__input-error'
                    type='text'
                    placeholder='CR'
                    error={touched.payment_agent && errors.payment_agent}
                    autoComplete='off'
                    maxLength='20'
                    value={values.payment_agent}
                    onChange={params.field.onChange}
                    onFocus={() => {
                        params.form.setFieldValue('payment_method', props.id);
                    }}
                    onBlur={params.field.onBlur}
                />
            )}
        </Field>
    </Radio>
);

class PaymentAgentWithdrawForm extends React.Component {
    componentDidMount() {
        this.props.onMount();
    }

    componentWillUnmount() {
        this.props.resetPaymentAgent();
    }

    validateWithdrawalPassthrough = values =>
        validateWithdrawal(values, {
            balance: this.props.balance,
            currency: this.props.currency,
            payment_agent:
                values.payment_method === 'payment_agent'
                    ? {}
                    : this.props.payment_agent_list.find(pa => pa.value === values.payment_agents),
        });

    onWithdrawalPassthrough = async (values, actions) => {
        const payment_agent_withdraw = await this.props.requestTryPaymentAgentWithdraw({
            loginid: values[values.payment_method],
            currency: this.props.currency,
            amount: values.amount,
            verification_code: this.props.verification_code,
        });
        if (payment_agent_withdraw.error) {
            actions.setSubmitting(false);
        }
    };

    render() {
        if (this.props.is_loading || !this.props.payment_agent_list.length) {
            return <Loading className='cashier__loader' />;
        }
        if (this.props.is_try_withdraw_successful) {
            return <PaymentAgentWithdrawConfirm verification_code={this.props.verification_code} />;
        }
        if (this.props.is_withdraw_successful) {
            return <PaymentAgentReceipt />;
        }
        const should_fill_id = !this.props.payment_agent_name && this.props.payment_agent_id;
        return (
            <div className='cashier__wrapper--align-left payment-agent__withdrawal'>
                <h2 className='cashier__header'>
                    <Localize i18n_default_text='Payment agent withdrawal' />
                </h2>
                <Formik
                    initialValues={{
                        // in case coming back from confirmation screen, populate the recent data to be edited
                        amount: this.props.amount || '',
                        payment_agent: should_fill_id ? this.props.payment_agent_id : '',
                        payment_agents:
                            should_fill_id || !this.props.payment_agent_name
                                ? this.props.payment_agent_list[0]?.value
                                : this.props.payment_agent_list.find(pa => pa.text === this.props.payment_agent_name)
                                      ?.value,
                        payment_method: should_fill_id ? 'payment_agent' : 'payment_agents',
                    }}
                    validate={this.validateWithdrawalPassthrough}
                    onSubmit={this.onWithdrawalPassthrough}
                >
                    {({ errors, isSubmitting, isValid, values, touched }) => (
                        <Form>
                            <div className='payment-agent__radio-group'>
                                <Field
                                    id='payment_agents'
                                    component={RadioDropDown}
                                    payment_agent_list={this.props.payment_agent_list}
                                    className='payment-agent__radio'
                                    name='payment_method'
                                    values={values}
                                />
                                <Field
                                    id='payment_agent'
                                    component={RadioInput}
                                    touched={touched}
                                    errors={errors}
                                    values={values}
                                    className='payment-agent__radio'
                                    name='payment_method'
                                />
                            </div>
                            <Field name='amount'>
                                {({ field }) => (
                                    <Input
                                        {...field}
                                        className='cashier__input cashier__input--short dc-input--no-placeholder'
                                        type='text'
                                        label={localize('Amount')}
                                        error={touched.amount && errors.amount}
                                        required
                                        leading_icon={
                                            <span
                                                className={classNames(
                                                    'symbols',
                                                    `symbols--${this.props.currency.toLowerCase()}`
                                                )}
                                            >
                                                {getCurrencyDisplayCode(this.props.currency)}
                                            </span>
                                        }
                                        autoComplete='off'
                                        maxLength='30'
                                        hint={
                                            values.payment_method === 'payment_agents' &&
                                            this.props.payment_agent_list.find(
                                                pa => pa.value === values.payment_agents
                                            ) && (
                                                <Localize
                                                    i18n_default_text='Withdrawal limits: <0 />-<1 />'
                                                    components={[
                                                        <Money
                                                            key={0}
                                                            amount={
                                                                this.props.payment_agent_list.find(
                                                                    pa => pa.value === values.payment_agents
                                                                ).min_withdrawal
                                                            }
                                                            currency={this.props.currency}
                                                        />,
                                                        <Money
                                                            key={1}
                                                            amount={
                                                                this.props.payment_agent_list.find(
                                                                    pa => pa.value === values.payment_agents
                                                                ).max_withdrawal
                                                            }
                                                            currency={this.props.currency}
                                                        />,
                                                    ]}
                                                />
                                            )
                                        }
                                    />
                                )}
                            </Field>
                            <div className='cashier__form-submit'>
                                <Button
                                    className='cashier__form-submit-button'
                                    type='submit'
                                    is_disabled={!isValid || isSubmitting}
                                    primary
                                    large
                                >
                                    <Localize i18n_default_text='Withdraw' />
                                </Button>
                            </div>
                            <FormError error={this.props.error} />
                        </Form>
                    )}
                </Formik>
            </div>
        );
    }
}

PaymentAgentWithdrawForm.propTypes = {
    amount: PropTypes.string,
    balance: PropTypes.string,
    currency: PropTypes.string,
    error_message_withdraw: PropTypes.string,
    is_loading: PropTypes.bool,
    is_try_withdraw_successful: PropTypes.bool,
    is_withdraw_successful: PropTypes.bool,
    onMount: PropTypes.func,
    payment_agent_id: PropTypes.string,
    payment_agent_list: PropTypes.array,
    payment_agent_name: PropTypes.string,
    requestTryPaymentAgentWithdraw: PropTypes.func,
    resetPaymentAgent: PropTypes.func,
    verification_code: PropTypes.string,
};

export default connect(({ client, modules }) => ({
    amount: modules.cashier.config.payment_agent.confirm.amount,
    balance: client.balance,
    currency: client.currency,
    error: modules.cashier.config.payment_agent.error,
    is_loading: modules.cashier.is_loading,
    is_try_withdraw_successful: modules.cashier.config.payment_agent.is_try_withdraw_successful,
    is_withdraw_successful: modules.cashier.config.payment_agent.is_withdraw_successful,
    onMount: modules.cashier.onMountPaymentAgentWithdraw,
    payment_agent_id: modules.cashier.config.payment_agent.confirm.loginid,
    payment_agent_list: modules.cashier.config.payment_agent.agents,
    payment_agent_name: modules.cashier.config.payment_agent.confirm.payment_agent_name,
    requestTryPaymentAgentWithdraw: modules.cashier.requestTryPaymentAgentWithdraw,
    resetPaymentAgent: modules.cashier.resetPaymentAgent,
}))(PaymentAgentWithdrawForm);
