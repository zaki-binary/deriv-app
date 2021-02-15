import { Field } from 'formik';
import PropTypes from 'prop-types';
import React from 'react';
import { Autocomplete, DesktopWrapper, MobileWrapper, SelectNative } from '@deriv/components';
import { localize } from '@deriv/translations';

const SetResidenceForm = ({
    class_prefix = 'set-residence',
    children,
    header_text,
    errors,
    touched,
    setFieldTouched,
    setFieldValue,
    residence_list,
}) => (
    <div className={`${class_prefix}__residence-selection`}>
        {!!header_text && <p className={`${class_prefix}__heading`}>{header_text}</p>}
        <p className={`${class_prefix}__${header_text ? 'text' : 'heading'}`}>{localize('Where do you live?')}</p>
        <Field name='residence'>
            {({ field }) => (
                <React.Fragment>
                    <DesktopWrapper>
                        <Autocomplete
                            {...field}
                            autoComplete='off'
                            className={`${class_prefix}__residence-field`}
                            type='text'
                            label={localize('Choose country')}
                            error={touched.residence && errors.residence}
                            required
                            list_items={residence_list}
                            onItemSelection={({ value, text }) => setFieldValue('residence', value ? text : '', true)}
                        />
                    </DesktopWrapper>
                    <MobileWrapper>
                        <SelectNative
                            placeholder={localize('Please select')}
                            label={localize('Choose country')}
                            value={field.value}
                            list_items={residence_list}
                            error={touched.residence && errors.residence}
                            required
                            use_text
                            onChange={e => {
                                setFieldTouched('residence', true);
                                setFieldValue('residence', e.target.value, true);
                            }}
                        />
                    </MobileWrapper>
                </React.Fragment>
            )}
        </Field>
        {children}
    </div>
);

SetResidenceForm.propTypes = {
    children: PropTypes.node,
    class_prefix: PropTypes.string,
    header_text: PropTypes.string,
    residence_list: PropTypes.arrayOf(PropTypes.object),
};

export default SetResidenceForm;
