import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { NavLink } from 'react-router-dom';
import TableCell from './table-cell.jsx';
import TableRowInfo from './table-row-info.jsx';

const TableRow = ({
    className,
    columns,
    getActionColumns,
    id,
    is_footer,
    is_header,
    show_preloader = false,
    replace,
    row_obj = {},
    to,
    content_loader,
}) => {
    const action_columns = getActionColumns && getActionColumns({ row_obj, is_header, is_footer });

    const cells = columns.map(({ col_index, renderCellContent, title, key }) => {
        let cell_content = title;
        if (!is_header) {
            const cell_value = row_obj[col_index] || '';
            cell_content = renderCellContent
                ? renderCellContent({ cell_value, col_index, row_obj, is_footer })
                : cell_value;
        }
        return (
            <TableCell col_index={col_index} key={key || col_index}>
                {cell_content}
            </TableCell>
        );
    });

    const row_class_name = classNames(
        'table__row',
        { 'table__row-link': to || replace },
        { [`${className}__row`]: className }
    );
    const ContentLoader = content_loader;
    if (!is_footer && !is_header && show_preloader) {
        return <div className='table__row--preloader'>{content_loader ? <ContentLoader /> : null}</div>;
    }
    return to ? (
        <div className={`${className}__row_wrapper`}>
            <NavLink
                id={`dt_reports_contract_${id}`}
                className={row_class_name}
                to={{
                    pathname: to,
                    state: {
                        from_table_row: true,
                    },
                }}
            >
                {cells}
            </NavLink>
            {action_columns}
        </div>
    ) : (
        <div className={`${className}__row_wrapper`}>
            <TableRowInfo className={row_class_name} cells={cells} replace={replace} is_footer={is_footer} />
            {action_columns}
        </div>
    );
};

TableRow.propTypes = {
    className: PropTypes.string,
    columns: PropTypes.array,
    id: PropTypes.number,
    is_footer: PropTypes.bool,
    is_header: PropTypes.bool,
    replace: PropTypes.shape({
        component: PropTypes.func,
        message: PropTypes.string,
    }),
    row_obj: PropTypes.object,
    to: PropTypes.string,
    content_loader: PropTypes.elementType,
};

export default TableRow;
