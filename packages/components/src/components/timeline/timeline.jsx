import React from 'react';
import classNames from 'classnames';

const Oval = ({ children }) => {
    return (
        <div className='dc-timeline__oval'>
            <span className='dc-timeline__number'>{children}</span>
        </div>
    );
};

const Timeline = ({ children, ...props }) => {
    return (
        <div {...props}>
            {children.map((child, idx) => (
                <div
                    key={idx}
                    className={classNames('dc-timeline__flex', {
                        'dc-timeline__flex--no-border': children.length === idx + 1,
                    })}
                >
                    <Oval>{idx + 1}</Oval>
                    <div className='dc-timeline__container'>
                        <h2 className='dc-timeline__title'>{child.props.item_title}</h2>
                        <div className='dc-timeline__content'>{child}</div>
                    </div>
                </div>
            ))}
        </div>
    );
};

const Item = ({ children, ...props }) => <div {...props}>{children}</div>;

Timeline.Item = Item;

export default Timeline;
