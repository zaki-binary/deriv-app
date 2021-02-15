const glob = require('glob');
const path = require('path');
const DOMParser = require('xmldom').DOMParser;

const getRegexPattern = () => /(i18n_default_text={?|localize\()\s*(['"])\s*(.*?)(?<!\\)\2\s*/gs;

const getStringsFromInput = (input, i18n_marker = getRegexPattern()) => {
    const messages = [];

    while ((result = i18n_marker.exec(input)) !== null) {
        const extracted = result[3];
        // Replace escape characters.
        messages.push(extracted.replace(/\\/g, ''));
    }

    return messages;
}

const getStringsFromXmlFile = (input) => {
    const messages = [];
    const parsed_xml = new DOMParser().parseFromString(input, 'application/xml');
    const el_categories = parsed_xml.getElementsByTagName('category');

    Array.from(el_categories).forEach(el_category => {
        const name = el_category.getAttribute('name');
        const description = el_category.getAttribute('description');
        
        if (name) messages.push(name)
        if (description) messages.push(description);
    });

    return messages;
};

const getTranslatableFiles = () => {
    const packages_with_translations = ['bot-skeleton', 'bot-web-ui', 'trader', 'core', 'account'];
    const globs = ['**/*.js', '**/*.jsx', '**/xml/*.xml'];
    const file_paths = [];

    for (let i = 0; i < packages_with_translations.length; i++) {
        for (let j = 0; j < globs.length; j++) {
            let files_found = glob.sync(`/${packages_with_translations[i]}/src/${globs[j]}`, {
                root: path.resolve(__dirname, '../..'), // deriv-app/packages/
            });
            files_found = files_found.filter(file_path => file_path.indexOf('__tests__') === -1);
            file_paths.push(...files_found);
        }
    }

    return file_paths;
}

module.exports = {
    getStringsFromInput,
    getTranslatableFiles,
    getStringsFromXmlFile,
};
