import PropTypes from 'prop-types';
import React from 'react';
import { Button, Modal } from '@deriv/components';
import { localize } from '@deriv/translations';
import { connect } from 'Stores/connect';

import 'Sass/set-currency-modal.scss';

const SetAccountCurrencyModal = ({ is_visible, is_virtual, setCurrency, toggleModal }) => (
    <Modal
        id='dt_set_account_currency_modal'
        has_close_icon={false}
        is_open={is_visible}
        small
        toggleModal={toggleModal}
        title={localize('You have an account that needs action')}
    >
        <Modal.Body>
            {localize('Please set a currency for your existing real account before creating another account.')}
        </Modal.Body>
        <Modal.Footer>
            {!is_virtual ? (
                <>
                    <Button has_effect text={localize('Cancel')} onClick={toggleModal} secondary />
                    <Button
                        has_effect
                        text={localize('Set currency')}
                        onClick={() => {
                            toggleModal();
                            // timeout is to ensure no jumpy animation when modals are overlapping enter/exit transitions
                            setTimeout(function () {
                                setCurrency();
                            }, 250);
                        }}
                        primary
                    />
                </>
            ) : (
                <Button has_effect text={localize('OK')} onClick={toggleModal} primary />
            )}
        </Modal.Footer>
    </Modal>
);

SetAccountCurrencyModal.propTypes = {
    is_virtual: PropTypes.bool,
    is_visible: PropTypes.bool,
    setCurrency: PropTypes.func,
    toggleModal: PropTypes.func,
};

export default connect(({ client, ui }) => ({
    is_virtual: client.is_virtual,
    toggleModal: ui.toggleSetCurrencyModal,
    setCurrency: ui.openRealAccountSignup,
    is_visible: ui.is_set_currency_modal_visible,
}))(SetAccountCurrencyModal);
