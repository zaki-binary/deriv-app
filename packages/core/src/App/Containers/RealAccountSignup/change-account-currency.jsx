import { Field, Formik } from 'formik';
import PropTypes from 'prop-types';
import React from 'react';
import { FormSubmitButton } from '@deriv/components';
import { isMobile, reorderCurrencies } from '@deriv/shared';
import { connect } from 'Stores/connect';
import { localize, Localize } from '@deriv/translations';
import { RadioButtonGroup, RadioButton } from './currency-selector.jsx';

const FIAT_CURRENCY_TYPE = 'fiat';

const ChangeAccountCurrency = ({ legal_allowed_currencies, value, onSubmit, form_error, ...props }) => {
    const getReorderedCurrencies = () =>
        reorderCurrencies(legal_allowed_currencies.filter(currency => currency.type === FIAT_CURRENCY_TYPE));

    return (
        <Formik
            initialValues={{
                fiat: value.fiat,
            }}
            onSubmit={(values, actions) => {
                onSubmit(false, values, actions.setSubmitting);
            }}
        >
            {({ handleSubmit, values, errors, touched, isSubmitting }) => (
                <form
                    onSubmit={e => {
                        e.preventDefault();
                        handleSubmit();
                    }}
                >
                    <h1 className='change-currency__title'>
                        <Localize i18n_default_text='Change your currency' />
                    </h1>
                    <h3 className='change-currency__sub-title'>
                        <Localize i18n_default_text='Choose the currency you would like to trade with.' />
                    </h3>
                    <RadioButtonGroup
                        id='fiat'
                        label={localize('Cryptocurrencies')}
                        className='currency-selector__radio-group currency-selector__radio-group--with-margin'
                        value={values.fiat}
                        error={errors.fiat}
                        touched={touched.fiat}
                        is_title_enabled={false}
                        item_count={getReorderedCurrencies().length}
                    >
                        {getReorderedCurrencies().map(currency => (
                            <Field
                                key={currency.value}
                                component={RadioButton}
                                name='fiat'
                                id={currency.value}
                                label={currency.name}
                                selected={currency.value === props.currency}
                            />
                        ))}
                    </RadioButtonGroup>
                    <FormSubmitButton
                        className='change-currency__button'
                        is_disabled={isSubmitting || !values.fiat}
                        label={localize('Change currency')}
                        is_absolute={!isMobile()}
                        form_error={form_error}
                    />
                </form>
            )}
        </Formik>
    );
};

ChangeAccountCurrency.propTypes = {
    form_error: PropTypes.string,
    legal_allowed_currencies: PropTypes.array,
};
export default connect(({ client }) => ({
    legal_allowed_currencies: client.upgradeable_currencies,
    currency: client.currency,
}))(ChangeAccountCurrency);
