import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';
import Calendar from '../calendar';
import { useBlockScroll } from '../../hooks';

const DatePickerCalendar = React.forwardRef(
    ({ alignment, is_datepicker_visible, parent_ref, portal_id, style, placement, ...props }, ref) => {
        const css_transition_classnames = {
            enter: classNames('dc-datepicker__picker--enter', {
                [`dc-datepicker__picker--${alignment}-enter`]: alignment,
            }),
            enterDone: classNames('dc-datepicker__picker--enter-done', {
                [`dc-datepicker__picker--${placement || alignment}-enter-done`]: placement || alignment,
            }),
            exit: classNames('dc-datepicker__picker--exit', {
                [`dc-datepicker__picker--${alignment}-exit`]: alignment,
            }),
        };

        const el_calendar = (
            <CSSTransition
                in={is_datepicker_visible}
                timeout={100}
                classNames={css_transition_classnames}
                unmountOnExit
            >
                <div
                    className={classNames('dc-datepicker__picker', {
                        'dc-datepicker__picker--left': alignment === 'left',
                    })}
                    style={
                        portal_id
                            ? {
                                  top: style.top,
                                  bottom: style.bottom,
                                  left: style.left,
                              }
                            : {
                                  top: 0, // we pass 0 to overcome additional margin from calendar enter animation
                              }
                    }
                >
                    <Calendar forward_ref={ref} {...props} />
                </div>
            </CSSTransition>
        );

        useBlockScroll(portal_id && is_datepicker_visible ? parent_ref : false);

        if (portal_id) {
            return ReactDOM.createPortal(el_calendar, document.getElementById(portal_id));
        }

        return el_calendar;
    }
);

DatePickerCalendar.displayName = 'DatePickerCalendar';

DatePickerCalendar.propTypes = {
    alignment: PropTypes.string,
    is_datepicker_visible: PropTypes.bool,
};

export default DatePickerCalendar;
