import classNames from 'classnames';
import React from 'react';
import { toMoment } from '@deriv/shared';
import Icon from '../icon';

const Native = ({
    id,
    disabled,
    display_format,
    name,
    error,
    label,
    max_date,
    min_date,
    placeholder,
    onBlur,
    onFocus,
    onSelect,
    value,
}) => {
    const [is_focused, setIsFocused] = React.useState(0);
    const input_ref = React.useRef();

    React.useEffect(() => {
        if (input_ref.current) input_ref.current.value = value;
    }, [value]);

    const handleFocus = e => {
        setIsFocused(true);
        if (typeof onFocus === 'function') {
            onFocus(e);
        }
    };

    const handleBlur = e => {
        setIsFocused(false);
        if (typeof onBlur === 'function') {
            onBlur(e);
        }
    };

    return (
        <div
            className={classNames('dc-input', {
                'dc-input--error': error,
            })}
        >
            <div className='dc-datepicker__display'>
                {value && <span className='dc-datepicker__display-text'>{toMoment(value).format(display_format)}</span>}
            </div>
            <label
                className={classNames('dc-datepicker__placeholder', {
                    'dc-datepicker__placeholder--has-value': !!value,
                    'dc-datepicker__placeholder--has-error': error,
                    'dc-datepicker__placeholder--is-focused': is_focused,
                })}
                htmlFor={id}
            >
                {label || (!value && placeholder)}
            </label>
            <Icon icon='IcCalendar' className='dc-datepicker__calendar-icon' />
            <input
                ref={input_ref}
                id={id}
                name={name}
                className='dc-datepicker__native'
                type='date'
                max={max_date && toMoment(max_date).format('YYYY-MM-DD')}
                min={min_date && toMoment(min_date).format('YYYY-MM-DD')}
                error={error}
                required
                onBlur={handleBlur}
                onFocus={handleFocus}
                disabled={disabled}
                onChange={e => {
                    onSelect(e.target.value);
                }}
            />
            {error && <span className='dc-datepicker__error'>{error}</span>}
        </div>
    );
};

export default Native;
