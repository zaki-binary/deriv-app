import { Formik, Field } from 'formik';
import React from 'react';
import { FormSubHeader } from '@deriv/account';
import {
    Modal,
    Autocomplete,
    AutoHeightWrapper,
    Checkbox,
    Dropdown,
    DesktopWrapper,
    MobileWrapper,
    DateOfBirthPicker,
    Div100vhContainer,
    FormSubmitButton,
    Input,
    Popover,
    RadioGroup,
    SelectNative,
    ThemedScrollbars,
} from '@deriv/components';
import { localize, Localize } from '@deriv/translations';
import { isDesktop, isMobile, toMoment } from '@deriv/shared';
import { splitValidationResultTypes } from 'App/Containers/RealAccountSignup/helpers/utils';
import 'Sass/details-form.scss';

const DateOfBirthField = props => (
    <Field name={props.name}>
        {({ field: { value }, form: { setFieldValue, errors, touched, setTouched } }) => (
            <DateOfBirthPicker
                error={touched.date_of_birth && errors.date_of_birth}
                onBlur={() => setTouched({ date_of_birth: true })}
                onChange={({ target }) =>
                    setFieldValue(
                        'date_of_birth',
                        target?.value ? toMoment(target.value).format('YYYY-MM-DD') : '',
                        true
                    )
                }
                value={value}
                portal_id='modal_root'
                {...props}
            />
        )}
    </Field>
);

const FormInputField = ({ name, optional = false, warn, ...props }) => (
    <Field name={name}>
        {({ field, form: { errors, touched } }) => (
            <Input
                type='text'
                required={!optional}
                name={name}
                autoComplete='off'
                maxLength={props.maxLength || '30'}
                error={touched[field.name] && errors[field.name]}
                warn={warn}
                {...field}
                {...props}
            />
        )}
    </Field>
);

const PersonalDetails = ({
    getCurrentStep,
    onSave,
    onCancel,
    onSubmit,
    goToPreviousStep,
    goToNextStep,
    validate,
    salutation_list,
    disabled_items,
    is_svg,
    residence_list,
    is_fully_authenticated,
    account_opening_reason_list,
    ...props
}) => {
    const [is_tax_residence_popover_open, setIsTaxResidencePopoverOpen] = React.useState(false);
    const [is_tin_popover_open, setIsTinPopoverOpen] = React.useState(false);
    const [warning_items, setWarningItems] = React.useState({});

    const handleCancel = values => {
        const current_step = getCurrentStep() - 1;
        onSave(current_step, values);
        onCancel(current_step, goToPreviousStep);
    };

    const handleValidate = values => {
        const { errors, warnings } = splitValidationResultTypes(validate(values));
        setWarningItems(warnings);
        return errors;
    };

    const closeTooltipOnScroll = () => {
        // Close any open tooltip
        if (!is_tax_residence_popover_open || !is_tin_popover_open) {
            setIsTaxResidencePopoverOpen(false);
            setIsTinPopoverOpen(false);
        }
    };

    const handleClickOutside = () => {
        if (is_tax_residence_popover_open) {
            setIsTaxResidencePopoverOpen(false);
        }
        if (is_tin_popover_open) {
            setIsTinPopoverOpen(false);
        }
    };

    return (
        <Formik
            initialValues={{ ...props.value }}
            validate={handleValidate}
            validateOnMount
            onSubmit={(values, actions) => {
                onSubmit(getCurrentStep() - 1, values, actions.setSubmitting, goToNextStep);
            }}
        >
            {({ handleSubmit, isSubmitting, errors, setFieldValue, touched, values, handleChange, handleBlur }) => (
                <AutoHeightWrapper default_height={380} height_offset={isDesktop() ? 81 : null}>
                    {({ setRef, height }) => (
                        <form ref={setRef} onSubmit={handleSubmit} autoComplete='off' onClick={handleClickOutside}>
                            <Div100vhContainer className='details-form' height_offset='110px' is_disabled={isDesktop()}>
                                <ThemedScrollbars height={height} onScroll={closeTooltipOnScroll}>
                                    <div
                                        className='details-form__elements'
                                        style={{ paddingBottom: isDesktop() ? 'unset' : null }}
                                    >
                                        <FormSubHeader title={localize('Title and name')} />
                                        {'salutation' in props.value && ( // TODO: [deriv-eu] Remove salutation once api is optional
                                            <RadioGroup
                                                className='dc-radio__input'
                                                name='salutation'
                                                items={salutation_list.map(item => {
                                                    if (disabled_items.includes('salutation')) {
                                                        item.disabled = true;
                                                    }
                                                    return item;
                                                })}
                                                selected={values.salutation}
                                                onToggle={e => {
                                                    e.persist();
                                                    setFieldValue('salutation', e.target.value);
                                                }}
                                                required
                                            />
                                        )}
                                        {'first_name' in props.value && (
                                            <FormInputField
                                                name='first_name'
                                                required={is_svg}
                                                label={is_svg ? localize('First name*') : localize('First name')}
                                                disabled={disabled_items.includes('first_name')}
                                                placeholder={localize('John')}
                                            />
                                        )}
                                        {'last_name' in props.value && (
                                            <FormInputField
                                                name='last_name'
                                                required={is_svg}
                                                label={is_svg ? localize('Last name*') : localize('Last name')}
                                                disabled={disabled_items.includes('last_name')}
                                                placeholder={localize('Doe')}
                                            />
                                        )}
                                        <FormSubHeader title={localize('Other details')} />
                                        {'date_of_birth' in props.value && (
                                            <DateOfBirthField
                                                name='date_of_birth'
                                                required={is_svg}
                                                label={is_svg ? localize('Date of birth*') : localize('Date of birth')}
                                                disabled={disabled_items.includes('date_of_birth')}
                                                placeholder={localize('01-07-1999')}
                                            />
                                        )}
                                        {'place_of_birth' in props.value && (
                                            <Field name='place_of_birth'>
                                                {({ field }) => (
                                                    <React.Fragment>
                                                        <DesktopWrapper>
                                                            <Autocomplete
                                                                {...field}
                                                                disabled={disabled_items.includes('place_of_birth')}
                                                                data-lpignore='true'
                                                                autoComplete='off' // prevent chrome autocomplete
                                                                type='text'
                                                                label={localize('Place of birth')}
                                                                error={touched.place_of_birth && errors.place_of_birth}
                                                                list_items={residence_list}
                                                                onItemSelection={({ value, text }) =>
                                                                    setFieldValue(
                                                                        'place_of_birth',
                                                                        value ? text : '',
                                                                        true
                                                                    )
                                                                }
                                                                required
                                                            />
                                                        </DesktopWrapper>
                                                        <MobileWrapper>
                                                            <SelectNative
                                                                placeholder={localize('Place of birth')}
                                                                name={field.name}
                                                                disabled={disabled_items.includes('place_of_birth')}
                                                                label={localize('Place of birth')}
                                                                list_items={residence_list}
                                                                value={values.place_of_birth}
                                                                use_text={true}
                                                                error={touched.place_of_birth && errors.place_of_birth}
                                                                onChange={e => {
                                                                    handleChange(e);
                                                                    setFieldValue(
                                                                        'place_of_birth',
                                                                        e.target.value,
                                                                        true
                                                                    );
                                                                }}
                                                                {...field}
                                                                list_portal_id='modal_root'
                                                                required
                                                            />
                                                        </MobileWrapper>
                                                    </React.Fragment>
                                                )}
                                            </Field>
                                        )}
                                        {'citizen' in props.value && (
                                            <Field name='citizen'>
                                                {({ field }) => (
                                                    <React.Fragment>
                                                        <DesktopWrapper>
                                                            <Autocomplete
                                                                {...field}
                                                                data-lpignore='true'
                                                                autoComplete='off' // prevent chrome autocomplete
                                                                type='text'
                                                                label={localize('Citizenship')}
                                                                error={touched.citizen && errors.citizen}
                                                                disabled={
                                                                    (props.value.citizen && is_fully_authenticated) ||
                                                                    disabled_items.includes('citizen')
                                                                }
                                                                list_items={residence_list}
                                                                onItemSelection={({ value, text }) =>
                                                                    setFieldValue('citizen', value ? text : '', true)
                                                                }
                                                                list_portal_id='modal_root'
                                                                required
                                                            />
                                                        </DesktopWrapper>
                                                        <MobileWrapper>
                                                            <SelectNative
                                                                placeholder={localize('Citizenship')}
                                                                name={field.name}
                                                                disabled={
                                                                    (props.value.citizen && is_fully_authenticated) ||
                                                                    disabled_items.includes('citizen')
                                                                }
                                                                label={localize('Citizenship')}
                                                                list_items={residence_list}
                                                                value={values.citizen}
                                                                use_text={true}
                                                                error={touched.citizen && errors.citizen}
                                                                onChange={e => {
                                                                    handleChange(e);
                                                                    setFieldValue('citizen', e.target.value, true);
                                                                }}
                                                                {...field}
                                                                required
                                                            />
                                                        </MobileWrapper>
                                                    </React.Fragment>
                                                )}
                                            </Field>
                                        )}
                                        {'phone' in props.value && (
                                            <FormInputField
                                                name='phone'
                                                label={is_svg ? localize('Phone number*') : localize('Phone number')}
                                                placeholder={
                                                    is_svg ? localize('Phone number*') : localize('Phone number')
                                                }
                                                maxLength={50}
                                            />
                                        )}
                                        {('tax_residence' in props.value ||
                                            'tax_identification_number' in props.value) && (
                                            <React.Fragment>
                                                <FormSubHeader title={localize('Tax information')} />
                                                {'tax_residence' in props.value && (
                                                    <Field name='tax_residence'>
                                                        {({ field }) => (
                                                            <div className='details-form__tax'>
                                                                <DesktopWrapper>
                                                                    <Autocomplete
                                                                        {...field}
                                                                        data-lpignore='true'
                                                                        autoComplete='off' // prevent chrome autocomplete
                                                                        type='text'
                                                                        label={localize('Tax residence')}
                                                                        error={
                                                                            touched.tax_residence &&
                                                                            errors.tax_residence
                                                                        }
                                                                        list_items={residence_list}
                                                                        onItemSelection={({ value, text }) =>
                                                                            setFieldValue(
                                                                                'tax_residence',
                                                                                value ? text : '',
                                                                                true
                                                                            )
                                                                        }
                                                                        list_portal_id='modal_root'
                                                                    />
                                                                </DesktopWrapper>
                                                                <MobileWrapper>
                                                                    <SelectNative
                                                                        placeholder={localize('Tax residence')}
                                                                        name={field.name}
                                                                        label={localize('Tax residence')}
                                                                        list_items={residence_list}
                                                                        value={values.tax_residence}
                                                                        use_text={true}
                                                                        error={
                                                                            touched.tax_residence &&
                                                                            errors.tax_residence
                                                                        }
                                                                        onChange={e => {
                                                                            handleChange(e);
                                                                            setFieldValue(
                                                                                'tax_residence',
                                                                                e.target.value,
                                                                                true
                                                                            );
                                                                        }}
                                                                        {...field}
                                                                        required
                                                                    />
                                                                </MobileWrapper>
                                                                <div
                                                                    onClick={e => {
                                                                        setIsTaxResidencePopoverOpen(true);
                                                                        setIsTinPopoverOpen(false);
                                                                        e.stopPropagation();
                                                                    }}
                                                                >
                                                                    <Popover
                                                                        alignment={isDesktop() ? 'right' : 'left'}
                                                                        icon='info'
                                                                        message={localize(
                                                                            'The country in which you meet the criteria for paying taxes. Usually the country in which you physically reside.'
                                                                        )}
                                                                        zIndex={9998}
                                                                        disable_message_icon
                                                                        is_open={is_tax_residence_popover_open}
                                                                    />
                                                                </div>
                                                            </div>
                                                        )}
                                                    </Field>
                                                )}
                                                {'tax_identification_number' in props.value && (
                                                    <div className='details-form__tax'>
                                                        <FormInputField
                                                            name='tax_identification_number'
                                                            label={localize('Tax Identification Number')}
                                                            placeholder={localize('Tax Identification Number')}
                                                            warn={warning_items?.tax_identification_number}
                                                        />
                                                        <div
                                                            onClick={e => {
                                                                setIsTaxResidencePopoverOpen(false);
                                                                setIsTinPopoverOpen(true);
                                                                e.stopPropagation();
                                                            }}
                                                        >
                                                            <Popover
                                                                alignment={isDesktop() ? 'right' : 'left'}
                                                                icon='info'
                                                                is_open={is_tin_popover_open}
                                                                message={
                                                                    <Localize
                                                                        i18n_default_text={
                                                                            "Don't know your tax identification number? Click <0>here</0> to learn more."
                                                                        }
                                                                        components={[
                                                                            <a
                                                                                key={0}
                                                                                className='link link--red'
                                                                                rel='noopener noreferrer'
                                                                                target='_blank'
                                                                                href='https://www.oecd.org/tax/automatic-exchange/crs-implementation-and-assistance/tax-identification-numbers/'
                                                                            />,
                                                                        ]}
                                                                    />
                                                                }
                                                                zIndex={9998}
                                                                disable_message_icon
                                                            />
                                                        </div>
                                                    </div>
                                                )}
                                                {warning_items?.tax_identification_number && (
                                                    <div className='details-form__tin-warn-divider' />
                                                )}
                                                {'tax_identification_confirm' in props.value && (
                                                    <Checkbox
                                                        name='tax_identification_confirm'
                                                        className='details-form__tin-confirm'
                                                        data-lpignore
                                                        onChange={() =>
                                                            setFieldValue(
                                                                'tax_identification_confirm',
                                                                !values.tax_identification_confirm,
                                                                true
                                                            )
                                                        }
                                                        value={values.tax_identification_confirm}
                                                        label={localize(
                                                            'I hereby confirm that the tax information I provided is true and complete. I will also inform Deriv Investments (Europe) Limited about any changes to this information.'
                                                        )}
                                                        withTabIndex='0'
                                                    />
                                                )}
                                            </React.Fragment>
                                        )}
                                        {'account_opening_reason' in props.value && ( // TODO: [deriv-eu] Remove account opening reason once api is optional
                                            <React.Fragment>
                                                <FormSubHeader title={localize('Account opening reason')} />
                                                <Field name='account_opening_reason'>
                                                    {({ field }) => (
                                                        <React.Fragment>
                                                            <DesktopWrapper>
                                                                <Dropdown
                                                                    placeholder={localize('Account opening reason')}
                                                                    name={field.name}
                                                                    disabled={disabled_items.includes(
                                                                        'account_opening_reason'
                                                                    )}
                                                                    is_align_text_left
                                                                    list={account_opening_reason_list}
                                                                    value={values.account_opening_reason}
                                                                    onChange={handleChange}
                                                                    handleBlur={handleBlur}
                                                                    error={
                                                                        touched.account_opening_reason &&
                                                                        errors.account_opening_reason
                                                                    }
                                                                    {...field}
                                                                    list_portal_id='modal_root'
                                                                    required
                                                                />
                                                            </DesktopWrapper>
                                                            <MobileWrapper>
                                                                <SelectNative
                                                                    placeholder={localize('Please select')}
                                                                    name={field.name}
                                                                    label={localize('Account opening reason')}
                                                                    list_items={account_opening_reason_list}
                                                                    value={values.account_opening_reason}
                                                                    use_text={true}
                                                                    error={
                                                                        touched.account_opening_reason &&
                                                                        errors.account_opening_reason
                                                                    }
                                                                    onChange={e => {
                                                                        handleChange(e);
                                                                        setFieldValue(
                                                                            'account_opening_reason',
                                                                            e.target.value,
                                                                            true
                                                                        );
                                                                    }}
                                                                    {...field}
                                                                    required
                                                                />
                                                            </MobileWrapper>
                                                        </React.Fragment>
                                                    )}
                                                </Field>
                                            </React.Fragment>
                                        )}
                                    </div>
                                </ThemedScrollbars>
                            </Div100vhContainer>
                            <Modal.Footer has_separator is_bypassed={isMobile()}>
                                <FormSubmitButton
                                    cancel_label={localize('Previous')}
                                    has_cancel
                                    is_disabled={isSubmitting || Object.keys(errors).length > 0}
                                    is_absolute={isMobile()}
                                    label={localize('Next')}
                                    onCancel={() => handleCancel(values)}
                                />
                            </Modal.Footer>
                        </form>
                    )}
                </AutoHeightWrapper>
            )}
        </Formik>
    );
};

export default PersonalDetails;
