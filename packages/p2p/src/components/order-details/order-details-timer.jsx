import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react-lite';
import { localize } from 'Components/i18next';
import { secondsToTimer } from 'Utils/date-time';
import ServerTime from 'Utils/server-time';
import { useStores } from 'Stores';

const OrderDetailsTimer = observer(() => {
    const { general_store } = useStores();
    const [remaining_time, setRemainingTime] = React.useState();
    const { should_show_order_timer } = general_store.order_information;
    const interval = React.useRef(null);

    const countDownTimer = () => {
        const distance = ServerTime.getDistanceToServerTime(general_store.order_information.order_expiry_milliseconds);
        const timer = secondsToTimer(distance);
        if (distance < 0) {
            setRemainingTime(localize('expired'));
            clearInterval(interval.current);
        } else {
            setRemainingTime(timer);
        }
    };

    React.useEffect(() => {
        countDownTimer();
        interval.current = setInterval(countDownTimer, 1000);
        return () => clearInterval(interval.current);
    }, []);

    if (should_show_order_timer) {
        return (
            <div className='order-details-card__header-timer'>
                <div>{localize('Time left')}</div>
                <div className='order-details-card__header-timer-counter'>{remaining_time}</div>
            </div>
        );
    }

    clearInterval(interval.current);
    return null;
});

OrderDetailsTimer.propTypes = {
    order_information: PropTypes.object,
};

export default OrderDetailsTimer;
