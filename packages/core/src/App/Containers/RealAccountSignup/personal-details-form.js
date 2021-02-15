import { toMoment, getErrorMessages } from '@deriv/shared';
import { localize } from '@deriv/translations';
import PersonalDetails from 'App/Containers/RealAccountSignup/personal-details.jsx';
import { generateValidationFunction, getDefaultFields } from './form-validations';

const personal_details_config = ({ residence_list, account_settings }) => {
    if (!residence_list || !account_settings) {
        return {};
    }

    const disabled_items = [
        ...Object.keys(account_settings).filter(field_name => field_name !== 'account_opening_reason' && !!field_name),
    ];

    return [
        {
            account_opening_reason: {
                supported_in: ['iom', 'malta', 'maltainvest'],
                default_value: account_settings.account_opening_reason ?? '',
                rules: [['req', localize('Account opening reason is required')]],
            },
            salutation: {
                supported_in: ['iom', 'malta', 'maltainvest'],
                default_value: account_settings.salutation ?? '',
                rules: [['req', localize('Salutation is required')]],
            },
            first_name: {
                supported_in: ['svg', 'iom', 'malta', 'maltainvest'],
                default_value: account_settings.first_name ?? '',
                rules: [
                    ['req', localize('First name is required')],
                    ['letter_symbol', getErrorMessages().letter_symbol()],
                    ['length', localize('First name should be between 2 and 30 characters.'), { min: 2, max: 30 }],
                ],
            },
            last_name: {
                supported_in: ['svg', 'iom', 'malta', 'maltainvest'],
                default_value: account_settings.last_name ?? '',
                rules: [
                    ['req', localize('Last name is required')],
                    ['letter_symbol', getErrorMessages().letter_symbol()],
                    ['length', localize('Last name should be between 2 and 30 characters.'), { min: 2, max: 30 }],
                ],
            },
            date_of_birth: {
                supported_in: ['svg', 'iom', 'malta', 'maltainvest'],
                default_value: account_settings.date_of_birth
                    ? toMoment(account_settings.date_of_birth).format('YYYY-MM-DD')
                    : '',
                rules: [
                    ['req', localize('Date of birth is required')],
                    [
                        v => toMoment(v).isValid() && toMoment(v).isBefore(toMoment().subtract(18, 'years')),
                        localize('You must be 18 years old and above.'),
                    ],
                ],
            },
            place_of_birth: {
                supported_in: ['maltainvest', 'iom', 'malta'],
                default_value: account_settings.place_of_birth
                    ? residence_list.find(item => item.value === account_settings.place_of_birth).text
                    : '',
                rules: [['req', localize('Place of birth is required')]],
            },
            citizen: {
                supported_in: ['iom', 'malta', 'maltainvest'],
                default_value: account_settings.citizen
                    ? residence_list.find(item => item.value === account_settings.citizen).text
                    : '',
                rules: [['req', localize('Citizenship is required')]],
            },
            phone: {
                supported_in: ['svg', 'iom', 'malta', 'maltainvest'],
                default_value: account_settings.phone ?? '',
                rules: [
                    ['req', localize('Phone is required')],
                    ['phone', localize('Phone is not in a proper format.')],
                    ['length', localize('Phone should be between 8 and 35 numbers.'), { min: 9, max: 36 }], // minimum characters required is 9 including (+) sign.
                ],
            },
            tax_residence: {
                default_value: account_settings.tax_residence
                    ? residence_list.find(item => item.value === account_settings.tax_residence)?.text
                    : '',
                supported_in: ['maltainvest'],
                rules: [['req', localize('Tax residence is required')]],
            },
            tax_identification_number: {
                default_value: account_settings.tax_identification_number ?? '',
                supported_in: ['maltainvest'],
                rules: [
                    ['req', localize('Tax Identification Number is required')],
                    [
                        (value, options, { tax_residence }) => {
                            return !!tax_residence;
                        },
                        localize('Please fill in Tax residence'),
                    ],
                    [
                        (value, options, { tax_residence }) => {
                            const from_list = residence_list.filter(
                                res => res.text === tax_residence && res.tin_format
                            );
                            const tax_regex = from_list[0]?.tin_format?.[0];
                            return tax_regex ? new RegExp(tax_regex).test(value) : true;
                        },
                        [
                            'warn',
                            localize(
                                'This Tax Identification Number (TIN) is invalid. You may continue with account creation, but to facilitate future payment processes, valid tax information will be required.'
                            ),
                        ],
                    ],
                ],
            },
            tax_identification_confirm: {
                default_value: false,
                supported_in: ['maltainvest'],
                rules: [['confirm', localize('Please confirm your tax information')]],
            },
        },
        disabled_items,
    ];
};

export const personalDetailsConfig = ({
    upgrade_info,
    real_account_signup_target,
    residence_list,
    account_settings,
}) => {
    const [config, disabled_items] = personal_details_config({ residence_list, account_settings });
    return {
        header: {
            active_title: localize('Complete your personal details'),
            title: localize('Personal details'),
        },
        body: PersonalDetails,
        form_value: getDefaultFields(real_account_signup_target, config),
        props: {
            validate: generateValidationFunction(
                real_account_signup_target,
                transformConfig(config, { real_account_signup_target })
            ),
            is_svg: upgrade_info?.can_upgrade_to === 'svg',
            account_opening_reason_list: [
                {
                    text: localize('Hedging'),
                    value: 'Hedging',
                },
                {
                    text: localize('Income Earning'),
                    value: 'Income Earning',
                },
                {
                    text: localize('Speculative'),
                    value: 'Speculative',
                },
            ],
            salutation_list: [
                {
                    label: localize('Mr'),
                    value: 'Mr',
                },
                {
                    label: localize('Mrs'),
                    value: 'Mrs',
                },
                {
                    label: localize('Ms'),
                    value: 'Ms',
                },
                {
                    label: localize('Miss'),
                    value: 'Miss',
                },
            ],
            disabled_items,
        },
        passthrough: ['residence_list', 'is_fully_authenticated'],
    };
};

const transformConfig = (config, { real_account_signup_target }) => {
    // Remove required rule for malta and iom
    if (['malta', 'iom'].includes(real_account_signup_target)) {
        config.tax_residence.rules.shift();
    }
    return config;
};
