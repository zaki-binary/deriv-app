import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'Stores/connect';
import { PlatformContext } from '@deriv/shared';
import { findRouteByPath, normalizePath } from './helpers';
import getRoutesConfig from '../../Constants/routes-config';

// TODO: solve circular dependency problem
// when binary link is imported into components present in routes config
// or into their descendants
const BinaryLink = ({ active_class, to, children, href, has_error, setError, ...props }) => {
    const { is_deriv_crypto } = React.useContext(PlatformContext);
    const path = normalizePath(to);
    const route = findRouteByPath(path, getRoutesConfig({ is_deriv_crypto }));

    if (!route) {
        throw new Error(`Route not found: ${to}`);
    }

    return to && !href ? (
        <span
            className={classNames({
                [`${active_class}__link-wrapper`]: !!active_class,
            })}
            onClick={() => {
                if (has_error) setError(false, null);
            }}
        >
            <NavLink to={path} activeClassName={active_class || 'active'} exact={route.exact} {...props}>
                {children}
            </NavLink>
        </span>
    ) : (
        <a {...props}>{children}</a>
    );
};

BinaryLink.propTypes = {
    active_class: PropTypes.string,
    children: PropTypes.oneOfType([PropTypes.object, PropTypes.array, PropTypes.string]),
    to: PropTypes.string,
};

export default connect(({ common }) => ({
    has_error: common.has_error,
    setError: common.setError,
}))(BinaryLink);
