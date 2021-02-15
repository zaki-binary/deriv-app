import PropTypes from 'prop-types';
import React from 'react';
import { Loading, Table, Text, ThemedScrollbars } from '@deriv/components';
import Bowser from 'bowser';
import { convertDateFormat, isMobile } from '@deriv/shared';
import { localize } from '@deriv/translations';
import { connect } from 'Stores/connect';
import { WS } from 'Services/ws-methods';
import LoadErrorMessage from 'Components/load-error-message';

const API_FETCH_LIMIT = 50;

const getFormattedData = login_history => {
    const data = [];
    const fetch_limit = Math.min(API_FETCH_LIMIT, login_history.length);
    for (let i = 0; i < fetch_limit; i++) {
        data[i] = {};
        const environment = login_history[i].environment;
        const environment_split = environment.split(' ');
        const date = environment_split[0];
        const time = environment_split[1].replace('GMT', '');
        const date_time = convertDateFormat(`${date} ${time}`, 'D-MMMM-YY hh:mm:ss', 'YYYY-MM-DD hh:mm:ss');
        data[i].date = `${date_time} GMT`;
        data[i].action = login_history[i].action;
        const user_agent = environment.substring(environment.indexOf('User_AGENT'), environment.indexOf('LANG'));
        const ua = Bowser.getParser(user_agent)?.getBrowser();
        data[i].browser = ua ? `${ua.name} v${ua.version}` : localize('Unknown');
        data[i].ip = environment_split[2].split('=')[1];
        data[i].status = login_history[i].status === 1 ? localize('Successful') : localize('Failed');
        data[i].id = i;
    }
    return data;
};

const getFields = () => ({
    date: localize('Date and time'),
    action: localize('Action'),
    browser: localize('Browser'),
    ip: localize('IP address'),
    status: localize('Status'),
});

const LoginHistoryContent = ({ data }) => {
    if (isMobile()) {
        return renderList(getFields(), data);
    }
    return renderTable(getFields(), data);
};

const renderTable = (fields, login_history) => (
    <Table className='login-history__table'>
        <Table.Header>
            <Table.Row className='login-history__table__header'>
                <Table.Head>{fields.date}</Table.Head>
                <Table.Head>{fields.action}</Table.Head>
                <Table.Head>{fields.browser}</Table.Head>
                <Table.Head>{fields.ip}</Table.Head>
                <Table.Head>{fields.status}</Table.Head>
            </Table.Row>
        </Table.Header>
        <Table.Body>
            {login_history.map(item => (
                <Table.Row className='login-history__table__row' key={item.id}>
                    <Table.Cell>
                        <Text line_height='xs' size='xs'>
                            {item.date}
                        </Text>
                    </Table.Cell>
                    <Table.Cell className='login-history__table__row__cell login-history__table__row__cell--action'>
                        {item.action}
                    </Table.Cell>
                    <Table.Cell>{item.browser}</Table.Cell>
                    <Table.Cell>{item.ip}</Table.Cell>
                    <Table.Cell>{item.status}</Table.Cell>
                </Table.Row>
            ))}
        </Table.Body>
    </Table>
);

const renderList = (fields, login_history) => (
    <Table className='login-history__list'>
        <Table.Body>
            {login_history.map(item => (
                <div className='login-history__list__wrapper' key={item.id}>
                    <Table.Row className='login-history__list__row login-history__list__row--with-margin'>
                        <Table.Cell className='login-history__list__row__cell'>
                            <ListCell title={fields.date} text={item.date} />
                        </Table.Cell>
                    </Table.Row>
                    <Table.Row className='login-history__list__row login-history__list__row--with-margin'>
                        <Table.Cell className='login-history__list__row__cell'>
                            <ListCell
                                className='login-history__list__row__cell--browser'
                                title={fields.browser}
                                text={item.browser}
                            />
                        </Table.Cell>
                        <Table.Cell className='login-history__list__row__cell'>
                            <ListCell
                                className='login-history__list__row__cell--action'
                                title={fields.action}
                                text={item.action}
                            />
                        </Table.Cell>
                    </Table.Row>
                    <Table.Row className='login-history__list__row'>
                        <Table.Cell className='login-history__list__row__cell'>
                            <ListCell
                                className='login-history__list__row__cell--ip-value'
                                title={fields.ip}
                                text={item.ip}
                            />
                        </Table.Cell>
                        <Table.Cell className='login-history__list__row__cell'>
                            <ListCell title={fields.status} text={item.status} />
                        </Table.Cell>
                    </Table.Row>
                </div>
            ))}
        </Table.Body>
    </Table>
);

const ListCell = ({ title, text, className }) => (
    <React.Fragment>
        <h3 className='login-history__list__row__cell--title'>{title}</h3>
        <Text className={className} line_height='xs' size='xs'>
            {text}
        </Text>
    </React.Fragment>
);

const LoginHistory = ({ is_switching }) => {
    const [is_loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState('');
    const [data, setData] = React.useState([]);

    React.useEffect(() => {
        const fetchData = async () => {
            const api_res = await WS.authorized.fetchLoginHistory(API_FETCH_LIMIT);
            setLoading(false);

            if (api_res.error) {
                setError(api_res.error.message);
            } else {
                const formatted_data = getFormattedData(api_res.login_history);
                setData(formatted_data);
            }
        };

        fetchData();
    }, []);

    if (is_switching) return <Loading />;
    if (is_loading) return <Loading is_fullscreen={false} className='account__initial-loader' />;
    if (error) return <LoadErrorMessage error_message={error} />;

    return (
        <ThemedScrollbars is_bypassed={isMobile()} className='login-history'>
            {data.length ? <LoginHistoryContent data={data} /> : null}
        </ThemedScrollbars>
    );
};

LoginHistory.propTypes = {
    is_switching: PropTypes.bool,
};

export default connect(({ client }) => ({
    is_switching: client.is_switching,
}))(LoginHistory);
