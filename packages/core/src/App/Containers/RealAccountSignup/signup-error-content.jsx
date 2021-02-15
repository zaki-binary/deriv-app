import PropTypes from 'prop-types';
import React from 'react';
import { Button, Icon, StaticUrl, Text } from '@deriv/components';
import { localize, Localize } from '@deriv/translations';

const Heading = ({ code }) => {
    switch (code) {
        case 'InvalidPhone':
            return (
                <h1>
                    <Localize i18n_default_text='Let’s try that again' />
                </h1>
            );
        case 'DuplicateAccount':
            return (
                <h1>
                    <Localize i18n_default_text='Already signed up?' />
                </h1>
            );
        default:
            return (
                <h1>
                    <Localize i18n_default_text='Something’s not right' />
                </h1>
            );
    }
};

const Message = ({ code, message }) => {
    switch (code) {
        case 'DuplicateAccount':
            return (
                <p>
                    <Localize i18n_default_text='An account with your details already exists.' />
                    <br />
                    <Localize
                        i18n_default_text="If you're having trouble signing in, let us know via <0>chat</0>"
                        components={[
                            <span className='chat-inline' key={0} onClick={() => window.LC_API.open_chat_window()} />,
                        ]}
                    />
                </p>
            );
        default:
            return <p>{message}</p>;
    }
};

const TryAgain = ({ text, onConfirm }) => (
    <Button primary onClick={onConfirm} large>
        {text}
    </Button>
);

const ErrorCTA = ({ code, onConfirm }) => {
    switch (code) {
        case 'CurrencyTypeNotAllowed':
            return <TryAgain text={localize('Try a different currency')} onConfirm={onConfirm} />;
        case 'InvalidPhone':
            return <TryAgain text={localize('Try a different phone number')} onConfirm={onConfirm} />;
        case 'DuplicateAccount':
            return null;
        default:
            return (
                <StaticUrl href='help-centre' type='button' className='dc-btn dc-btn--primary'>
                    <Text size='xxs'>
                        <Localize i18n_default_text='OK' />
                    </Text>
                </StaticUrl>
            );
    }
};

const SignupErrorContent = ({ message, code, onConfirm }) => {
    return (
        <div className='account-wizard--error'>
            <Icon icon='IcAccountError' size={115} />
            <Heading code={code} />
            <Message code={code} message={message} />
            <ErrorCTA code={code} onConfirm={onConfirm} />
        </div>
    );
};

SignupErrorContent.propTypes = {
    code: PropTypes.string,
    message: PropTypes.string,
    onConfirm: PropTypes.func,
};

export default SignupErrorContent;
