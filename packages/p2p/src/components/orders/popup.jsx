import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { Formik, Field, Form } from 'formik';
import { Button, Checkbox, Modal, Text } from '@deriv/components';
import { observer } from 'mobx-react-lite';
import { useStores } from 'Stores';
import { localize } from '../i18next';
import FormError from '../form/error.jsx';

const FormWithConfirmation = observer(
    ({
        cancel_text,
        className,
        has_cancel,
        message,
        onCancel,
        onClickConfirm,
        order_information,
        setShouldShowPopup,
        should_show_popup,
        title,
        width,
    }) => {
        const { general_store } = useStores();
        const handleSubmit = (values, { setStatus }) => onClickConfirm(setStatus);

        return (
            <Formik initialValues={{ need_confirmation: false }} onSubmit={handleSubmit}>
                {({ isSubmitting, setFieldValue, values, status, submitForm }) => (
                    <Form noValidate>
                        <Modal
                            className={className}
                            is_confirmation_modal
                            is_open={should_show_popup}
                            portalId={general_store.props.modal_root_id}
                            renderTitle={() => (
                                <Text color='prominent' line-height='m' size='s' weight='bold'>
                                    {title}
                                </Text>
                            )}
                            toggleModal={() => setShouldShowPopup(false)}
                            width={width}
                        >
                            <Modal.Body>
                                <div className='orders__popup-content'>
                                    <Text color='prominent' line_height='m' size='xs'>
                                        {message}
                                    </Text>
                                    <div className='orders__popup-field'>
                                        <Field name='need_confirmation'>
                                            {({ field }) => (
                                                <Checkbox
                                                    {...field}
                                                    onChange={() =>
                                                        setFieldValue('need_confirmation', !values.need_confirmation)
                                                    }
                                                    defaultChecked={values.need_confirmation}
                                                    label={localize('I have received {{amount}} {{currency}}.', {
                                                        amount: order_information.price_display,
                                                        currency: order_information.local_currency,
                                                    })}
                                                    classNameLabel='orders__popup-field_text'
                                                />
                                            )}
                                        </Field>
                                    </div>
                                </div>
                            </Modal.Body>
                            <Modal.Footer>
                                {status?.error_message && <FormError message={status.error_message} />}
                                <Button.Group>
                                    {has_cancel && (
                                        <Button onClick={onCancel} secondary large type='button'>
                                            {cancel_text}
                                        </Button>
                                    )}
                                    <Button
                                        onClick={submitForm}
                                        primary
                                        large
                                        type='button'
                                        is_disabled={isSubmitting || !values.need_confirmation}
                                    >
                                        {localize('Release {{amount}} {{currency}}', {
                                            amount: order_information.amount_display,
                                            currency: order_information.account_currency,
                                        })}
                                    </Button>
                                </Button.Group>
                            </Modal.Footer>
                        </Modal>
                    </Form>
                )}
            </Formik>
        );
    }
);

const FormWithoutConfirmation = observer(
    ({
        cancel_text,
        className,
        confirm_text,
        has_cancel,
        message,
        onCancel,
        onClickConfirm,
        order_information,
        setShouldShowPopup,
        should_confirm_payment,
        should_show_popup,
        title,
        width,
    }) => {
        const [should_disable_confirm, setShouldDisableConfirm] = React.useState(true);
        const [api_error_message, setApiErrorMessage] = React.useState(null);
        const { general_store } = useStores();

        React.useEffect(() => {
            setApiErrorMessage(null);
        }, [should_show_popup]);

        return (
            <Modal
                className={className}
                is_confirmation_modal
                is_open={should_show_popup}
                portalId={general_store.props.modal_root_id}
                renderTitle={() => (
                    <Text color='prominent' line-height='m' size='s' weight='bold'>
                        {title}
                    </Text>
                )}
                toggleModal={() => setShouldShowPopup(false)}
                width={width}
            >
                <Modal.Body>
                    <div className='orders__popup-content'>
                        <Text color='prominent' line_height='m' size='xs'>
                            {message}
                        </Text>
                        {should_confirm_payment && (
                            <div className='order-details-card__popup-checkBox'>
                                <Checkbox
                                    onChange={() => setShouldDisableConfirm(!should_disable_confirm)}
                                    defaultChecked={!should_disable_confirm}
                                    label={localize('I have paid {{amount}} {{currency}}.', {
                                        amount: order_information.price_display,
                                        currency: order_information.local_currency,
                                    })}
                                />
                            </div>
                        )}
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    {api_error_message?.error_message && <FormError message={api_error_message.error_message} />}
                    <Button.Group>
                        {has_cancel && (
                            <Button onClick={onCancel} secondary large>
                                {cancel_text}
                            </Button>
                        )}
                        <Button
                            is_disabled={should_confirm_payment && should_disable_confirm}
                            onClick={() => onClickConfirm(setApiErrorMessage)}
                            primary
                            large
                        >
                            {confirm_text}
                        </Button>
                    </Button.Group>
                </Modal.Footer>
            </Modal>
        );
    }
);

const Popup = props => {
    const { className, need_confirmation } = props;
    const updated_props = {
        ...props,
        className: classNames('orders__popup', className),
        width: '440px',
    };

    return need_confirmation ? (
        <FormWithConfirmation {...updated_props} />
    ) : (
        <FormWithoutConfirmation {...updated_props} />
    );
};

Popup.propTypes = {
    cancel_text: PropTypes.string,
    confirm_text: PropTypes.string,
    has_cancel: PropTypes.bool,
    message: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    need_confirmation: PropTypes.bool,
    onCancel: PropTypes.func,
    onClickConfirm: PropTypes.func,
    order: PropTypes.object,
    should_confirm_payment: PropTypes.bool,
    title: PropTypes.string,
};

export default Popup;
