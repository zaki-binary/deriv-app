import PropTypes from 'prop-types';
import React from 'react';
import { Text } from '@deriv/components';
import { BinaryLink } from '../../Routes';

const MenuLinks = ({ is_logged_in, items }) => (
    <React.Fragment>
        {!!items.length && (
            <div className='header__menu-links'>
                {items.map((item, idx) =>
                    item.login_only && item.login_only !== is_logged_in ? null : (
                        <BinaryLink
                            id={item.id}
                            key={idx}
                            to={item.link_to || undefined}
                            onClick={item.onClick || undefined}
                            href={item.href || undefined}
                            className='header__menu-link'
                            active_class='header__menu-link--active'
                        >
                            <React.Fragment>
                                {item.text && (
                                    <Text title={item.text()} className='header__menu-link-text'>
                                        {item.icon}
                                        {item.text()}
                                        {item.logo}
                                    </Text>
                                )}
                                {item.image && (
                                    <span className='header__menu-link-text'>
                                        {item.image}
                                        {item.logo}
                                    </span>
                                )}
                            </React.Fragment>
                        </BinaryLink>
                    )
                )}
            </div>
        )}
    </React.Fragment>
);

MenuLinks.propTypes = {
    items: PropTypes.arrayOf(
        PropTypes.shape({
            icon: PropTypes.shape({
                className: PropTypes.string,
            }),
            is_logged_in: PropTypes.bool,
            link_to: PropTypes.string,
            text: PropTypes.function,
        })
    ),
};

export { MenuLinks };
