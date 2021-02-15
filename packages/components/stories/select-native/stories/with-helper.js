import React from 'react';
import { boolean } from '@storybook/addon-knobs';
import SelectNative from 'Components/select-native';
import items from '../items';
import Wrapper from '../wrapper';

const WithHelper = () => {
    const [default_value, setDefaultValue] = React.useState('');

    return (
        <Wrapper is_dark={boolean('Dark Theme', false)}>
            <SelectNative
                placeholder='Please select'
                name='dropdown'
                label='Dropdown Label'
                list_items={items}
                value={default_value}
                onChange={e => setDefaultValue(e.target.value)}
                hint='Helper message'
            />
        </Wrapper>
    );
};

export default WithHelper;
