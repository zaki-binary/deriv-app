import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import Field from '../field';
import Loading from '../loading';

const PasswordMeter = ({ children, has_error, input, custom_feedback_messages }) => {
    const zxcvbn = React.useRef();

    const [is_loading, setLoading] = React.useState(true);
    const [score, setScore] = React.useState();
    const [feedback, setFeedback] = React.useState();

    React.useEffect(() => {
        async function loadLibrary() {
            const lib = await import('@contentpass/zxcvbn');
            zxcvbn.current = lib.default;
            setLoading(false);
        }

        loadLibrary();
    }, []);

    React.useEffect(() => {
        if (typeof zxcvbn.current === 'function') {
            // 0 - 4 Score for password strength
            if (input?.length > 0) {
                const { score: updated_score, feedback: updated_feedback } = zxcvbn.current(input, {
                    feedback_messages: custom_feedback_messages,
                });
                setScore(updated_score);
                setFeedback(updated_feedback);
            }
        }
    }, [custom_feedback_messages, has_error, input]);

    if (is_loading) return <Loading is_fullscreen={false} />;

    const width_scale = has_error && input.length ? 0.25 : 0.25 * (input.length && score < 1 ? 1 : score);

    return (
        <React.Fragment>
            <div className='dc-password-meter__container'>
                {/* if child input field has hint, they should not show the hint while warning is shown */}
                {typeof children === 'function' ? children({ has_warning: !!feedback?.warning }) : children}
                <div className='dc-password-meter__bg' />
                <div
                    className={classNames('dc-password-meter', {
                        'dc-password-meter--weak': has_error || (input.length && score < 3),
                        'dc-password-meter--strong': !has_error && input.length && score >= 3,
                    })}
                    style={{ transform: `scale(${width_scale || 0}, 1)` }}
                />
                {feedback?.warning && !has_error && (
                    <Field
                        className='dc-password-meter__warning'
                        message={`${custom_feedback_messages ? feedback.warning() : feedback.warning}.`}
                        type='error'
                    />
                )}
            </div>
        </React.Fragment>
    );
};

PasswordMeter.propTypes = {
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node, PropTypes.func]),
    has_error: PropTypes.bool,
    input: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default PasswordMeter;
