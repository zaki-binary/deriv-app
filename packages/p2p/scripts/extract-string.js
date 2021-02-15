const glob = require('glob');

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

const getTranslatableFiles = () => {
    const globs = ['**/*.js', '**/*.jsx'];
    const file_paths = [];

    for (let j = 0; j < globs.length; j++) {
        let files_found = glob.sync(`../src/${globs[j]}`);
        files_found = files_found.filter(file_path => file_path.indexOf('__tests__') === -1);
        file_paths.push(...files_found);
    }

    return file_paths;
}

module.exports = {
    getStringsFromInput,
    getTranslatableFiles,
};
