import React from 'react';
import { Button, Icon, ExpansionPanel } from '@deriv/components';
import '../assets/sass/notify-item.scss';

const getIcon = type => {
    switch (type) {
        case 'error':
            return 'IcAlertDanger';
        case 'warn':
            return 'IcAlertWarning';
        case 'info':
            return 'IcAlertInfo';
        default:
            return 'IcAlertWarning';
    }
};

export const messageWithButton = ({ unique_id, type, message, btn_text, onClick }) => (
    <>
        <div key={`${unique_id}_message`} className='notify__item-container'>
            <Icon key={`${unique_id}_icon`} icon={getIcon(type)} size='22' />
            <div key={`${unique_id}_text`} className='notify__item-message'>
                {message}
            </div>
        </div>
        <Button
            key={`${unique_id}_btn`}
            className='notify__item-button'
            text={btn_text}
            onClick={onClick}
            has_effect
            secondary
        />
    </>
);

export const messageWithImage = (message, image) => (
    <>
        <div className='notify__item-message'>{message}</div>
        <img src={image} style={{ width: '100%' }} />
    </>
);

export const arrayAsMessage = parsedArray => <ExpansionPanel message={parsedArray} />;
