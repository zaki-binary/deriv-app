import React from 'react';
import { Field, Form, Formik } from 'formik';
import { Button, Input, Checkbox } from '@deriv/components';
import { getDebugServiceWorker, getAppId, getSocketURL, PlatformContext } from '@deriv/shared';
// eslint-disable-next-line import/extensions

const InputField = props => {
    return (
        <Field name={props.name}>
            {({ field, form: { errors, touched } }) => (
                <React.Fragment>
                    <Input
                        type='text'
                        autoComplete='off'
                        maxLength='30'
                        error={touched[field.name] && errors[field.name]}
                        {...field}
                        {...props}
                    />
                </React.Fragment>
            )}
        </Field>
    );
};

// doesn't need localization as it's for internal use
const Endpoint = () => {
    const platform_store = React.useContext(PlatformContext);
    return (
        <Formik
            initialValues={{
                app_id: getAppId(),
                server: getSocketURL(),
                is_deriv_crypto_enabled: platform_store.is_deriv_crypto,
                is_debug_service_worker_enabled: getDebugServiceWorker(),
            }}
            validate={values => {
                const errors = {};

                if (!values.app_id) {
                    errors.app_id = 'App ID is required.';
                } else if (!/^\d+$/.test(values.app_id)) {
                    errors.app_id = 'Please enter a valid app ID.';
                }

                if (!values.server) {
                    errors.server = 'Server is required.';
                } else if (!/^[\w|\-|.]+$/.test(values.server)) {
                    errors.server = 'Please enter a valid server.';
                }
                return errors;
            }}
            onSubmit={values => {
                localStorage.setItem('config.app_id', values.app_id);
                localStorage.setItem('config.server_url', values.server);
                localStorage.setItem(platform_store.DERIV_CRYPTO_KEY, values.is_deriv_crypto_enabled);
                localStorage.setItem('debug_service_worker', values.is_debug_service_worker_enabled ? 1 : 0);
                platform_store.setDerivCrypto(values.is_deriv_crypto_enabled);
                location.reload();
            }}
        >
            {({ errors, isSubmitting, touched, values, handleChange, setFieldTouched }) => (
                <Form style={{ width: '30vw', minWidth: '300px', margin: '20vh auto' }}>
                    <h1
                        style={{
                            fontWeight: 'bold',
                            color: 'var(--text-prominent)',
                            marginBottom: '1.6rem',
                            fontSize: 'var(--text-size-s)',
                            lineHeight: 'normal',
                        }}
                    >
                        Change API endpoint
                    </h1>
                    <InputField name='server' label='Server' hint='e.g. frontend.binaryws.com' />
                    <InputField
                        name='app_id'
                        label='OAuth App ID'
                        hint={
                            <React.Fragment>
                                Register an{' '}
                                <a
                                    href='https://developers.binary.com/applications/'
                                    target='_blank'
                                    rel='noopener noreferrer'
                                >
                                    app ID
                                </a>{' '}
                                to use the above server for logging in.
                            </React.Fragment>
                        }
                    />
                    <Field name='is_deriv_crypto_enabled'>
                        {({ field }) => (
                            <div style={{ marginTop: '4.5rem', marginBottom: '1.6rem' }}>
                                <Checkbox
                                    {...field}
                                    label='Enable Deriv Crypto'
                                    value={values.is_deriv_crypto_enabled}
                                    onChange={e => {
                                        handleChange(e);
                                        setFieldTouched('is_deriv_crypto_enabled', true);
                                    }}
                                />
                            </div>
                        )}
                    </Field>
                    <Field name='is_debug_service_worker_enabled'>
                        {({ field }) => (
                            <div style={{ marginTop: '4.5rem', marginBottom: '1.6rem' }}>
                                <Checkbox
                                    {...field}
                                    label='Enable Service Worker registration for this URL'
                                    value={values.is_debug_service_worker_enabled}
                                    onChange={e => {
                                        handleChange(e);
                                        setFieldTouched('is_debug_service_worker_enabled', true);
                                    }}
                                />
                            </div>
                        )}
                    </Field>
                    <Button
                        type='submit'
                        is_disabled={
                            !!(
                                (!touched.server &&
                                    !touched.app_id &&
                                    !touched.is_deriv_crypto_enabled &&
                                    !touched.is_debug_service_worker_enabled) ||
                                !values.server ||
                                !values.app_id ||
                                errors.server ||
                                errors.app_id ||
                                isSubmitting
                            )
                        }
                        text='Submit'
                        primary
                    />
                    <span style={{ marginLeft: '1.6rem' }} />
                    <Button
                        type='button'
                        onClick={() => {
                            localStorage.removeItem('config.app_id');
                            localStorage.removeItem('config.server_url');
                            localStorage.removeItem(platform_store.DERIV_CRYPTO_KEY);
                            location.reload();
                        }}
                        text='Reset to original settings'
                        secondary
                    />
                </Form>
            )}
        </Formik>
    );
};

export default Endpoint;
