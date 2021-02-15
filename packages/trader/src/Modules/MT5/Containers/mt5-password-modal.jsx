import { Formik } from 'formik';
import PropTypes from 'prop-types';
import React from 'react';
import { withRouter } from 'react-router';
import {
    DesktopWrapper,
    FormSubmitButton,
    Icon,
    MobileWrapper,
    MobileDialog,
    Modal,
    PasswordInput,
    PasswordMeter,
} from '@deriv/components';
import { isMobile, routes, validLength, validPassword, getErrorMessages } from '@deriv/shared';
import { localize, Localize } from '@deriv/translations';
import SuccessDialog from 'App/Containers/Modals/success-dialog.jsx';
import 'Sass/app/modules/mt5/mt5.scss';
import { connect } from 'Stores/connect';

const getSubmitText = (account_title, category) => {
    if (category === 'real') {
        return localize(
            'You have created a DMT5 {{account_title}} account. To start trading, transfer funds from your Deriv account into this account.',
            { account_title }
        );
    }

    return localize('You have created a DMT5 {{account_title}} account.', { account_title });
};

const getIconFromType = type => {
    switch (type) {
        case 'synthetic':
            return <Icon icon='IcMt5SyntheticPlatform' size={128} />;
        case 'financial':
            return <Icon icon='IcMt5FinancialPlatform' size={128} />;
        default:
            return <Icon icon='IcMt5FinancialStpPlatform' size={128} />;
    }
};

const MT5PasswordForm = ({ ...props }) => (
    <Formik
        initialValues={{
            password: '',
        }}
        validate={props.validatePassword}
        onSubmit={(values, actions) => {
            props.submitMt5Password(values.password, actions.setSubmitting);
        }}
    >
        {({
            handleSubmit,
            // setFieldValue,
            setFieldTouched,
            handleChange,
            handleBlur,
            errors,
            values,
            isSubmitting,
            touched,
        }) => (
            <form onSubmit={handleSubmit}>
                <div className='mt5-password-modal__content'>
                    <h2>
                        <Localize
                            i18n_default_text='Choose a password for your DMT5 {{ account_type }} account'
                            values={{
                                account_type: props.account_title,
                            }}
                        />
                    </h2>
                    <div className='dc-modal__container_mt5-password-modal__body'>
                        <div className='input-element'>
                            <PasswordMeter
                                input={values.password}
                                has_error={!!(touched.password && errors.password)}
                                custom_feedback_messages={getErrorMessages().password_warnings}
                            >
                                {({ has_warning }) => (
                                    <PasswordInput
                                        autoComplete='password'
                                        label={localize('Create a password')}
                                        error={touched.password && errors.password}
                                        hint={
                                            !has_warning &&
                                            localize(
                                                'Minimum of eight lower and uppercase English letters with numbers'
                                            )
                                        }
                                        name='password'
                                        value={values.password}
                                        onBlur={handleBlur}
                                        onChange={e => {
                                            setFieldTouched('password', true);
                                            handleChange(e);
                                        }}
                                    />
                                )}
                            </PasswordMeter>
                        </div>
                        {props.is_real_financial_stp && (
                            <div className='dc-modal__container_mt5-password-modal__description'>
                                <Localize i18n_default_text='Your MT5 Financial STP account will be opened through Deriv (FX) Ltd. All trading in this account is subject to the regulations and guidelines of the Labuan Financial Services Authority (LFSA). All other accounts, including your Deriv account, are not subject to the regulations and guidelines of the Labuan Financial Services Authority (LFSA).' />
                            </div>
                        )}
                    </div>
                </div>
                <FormSubmitButton
                    is_disabled={isSubmitting || !values.password || Object.keys(errors).length > 0}
                    has_cancel
                    cancel_label={localize('Cancel')}
                    onCancel={props.closeModal}
                    is_absolute={isMobile()}
                    is_loading={isSubmitting}
                    label={localize('Add account')}
                    form_error={props.form_error}
                />
            </form>
        )}
    </Formik>
);

const MT5PasswordModal = ({
    account_title,
    account_type,
    disableMt5PasswordModal,
    email,
    // error_message,
    form_error,
    history,
    has_mt5_error,
    is_mt5_password_modal_enabled,
    is_mt5_success_dialog_enabled,
    setMt5SuccessDialog,
    setMt5Error,
    submitMt5Password,
}) => {
    const validatePassword = values => {
        const errors = {};

        if (
            !validLength(values.password, {
                min: 8,
                max: 25,
            })
        ) {
            errors.password = localize('You should enter {{min_number}}-{{max_number}} characters.', {
                min_number: 8,
                max_number: 25,
            });
        } else if (!validPassword(values.password)) {
            errors.password = getErrorMessages().password();
        }
        if (values.password.toLowerCase() === email.toLowerCase()) {
            errors.password = localize('Your password cannot be the same as your email address.');
        }

        return errors;
    };

    const closeDialogs = () => {
        setMt5SuccessDialog(false);
        setMt5Error(false);
    };

    const closeModal = () => {
        closeDialogs();
        disableMt5PasswordModal();
    };

    const closeOpenSuccess = () => {
        disableMt5PasswordModal();
        closeDialogs();
        if (account_type.category === 'real') {
            history.push(routes.cashier_acc_transfer);
        }
    };

    const IconType = () => getIconFromType(account_type.type);
    const should_show_password = is_mt5_password_modal_enabled && !has_mt5_error && !is_mt5_success_dialog_enabled;
    const should_show_success = !has_mt5_error && is_mt5_success_dialog_enabled;
    const is_real_financial_stp = [account_type.category, account_type.type].join('_') === 'real_financial_stp';

    return (
        <React.Fragment>
            <DesktopWrapper>
                <Modal
                    className='mt5-password-modal'
                    is_open={should_show_password}
                    toggleModal={closeModal}
                    has_close_icon
                >
                    <MT5PasswordForm
                        account_title={account_title}
                        closeModal={closeModal}
                        form_error={form_error}
                        submitMt5Password={submitMt5Password}
                        is_real_financial_stp={is_real_financial_stp}
                        validatePassword={validatePassword}
                    />
                </Modal>
            </DesktopWrapper>
            <MobileWrapper>
                <MobileDialog
                    has_full_height
                    portal_element_id='modal_root'
                    visible={should_show_password}
                    onClose={closeModal}
                    wrapper_classname='mt5-password-modal'
                >
                    <MT5PasswordForm
                        account_title={account_title}
                        closeModal={closeModal}
                        form_error={form_error}
                        is_real_financial_stp={is_real_financial_stp}
                        submitMt5Password={submitMt5Password}
                        validatePassword={validatePassword}
                    />
                </MobileDialog>
            </MobileWrapper>
            <SuccessDialog
                is_open={should_show_success}
                toggleModal={closeModal}
                onCancel={closeModal}
                onSubmit={closeOpenSuccess}
                classNameMessage='mt5-password-modal__message'
                message={getSubmitText(account_title, account_type.category)}
                // message={error_message}
                icon={<IconType />}
                icon_size='xlarge'
                text_submit={account_type.category === 'real' ? localize('Transfer now') : localize('OK')}
                has_cancel={account_type.category === 'real'}
            />
        </React.Fragment>
    );
};

MT5PasswordModal.propTypes = {
    account_title: PropTypes.string,
    account_type: PropTypes.object,
    disableMt5PasswordModal: PropTypes.func,
    email: PropTypes.string,
    error_message: PropTypes.string,
    has_mt5_error: PropTypes.bool,
    is_mt5_password_modal_enabled: PropTypes.bool,
    is_mt5_success_dialog_enabled: PropTypes.bool,
    setMt5Error: PropTypes.func,
    setMt5SuccessDialog: PropTypes.func,
    submitMt5Password: PropTypes.func,
};

export default connect(({ client, modules }) => ({
    email: client.email,
    account_title: modules.mt5.account_title,
    account_type: modules.mt5.account_type,
    disableMt5PasswordModal: modules.mt5.disableMt5PasswordModal,
    error_message: modules.mt5.error_message,
    has_mt5_error: modules.mt5.has_mt5_error,
    is_mt5_success_dialog_enabled: modules.mt5.is_mt5_success_dialog_enabled,
    is_mt5_password_modal_enabled: modules.mt5.is_mt5_password_modal_enabled,
    setMt5Error: modules.mt5.setError,
    setMt5SuccessDialog: modules.mt5.setMt5SuccessDialog,
    submitMt5Password: modules.mt5.submitMt5Password,
}))(withRouter(MT5PasswordModal));
