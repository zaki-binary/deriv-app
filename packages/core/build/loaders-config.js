const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

const js_loaders = [
    '@deriv/shared/src/loaders/react-import-loader.js',
    '@deriv/shared/src/loaders/deriv-account-loader.js',
    {
        loader: 'babel-loader',
        options: {
            rootMode: 'upward',
        },
    },
];

const html_loaders = [
    {
        loader: 'html-loader',
    },
];

const file_loaders = [
    {
        loader: 'file-loader',
        options: {
            name: '[path][name].[ext]',
        },
    },
];

const svg_file_loaders = [
    {
        loader: 'file-loader',
        options: {
            name: '[path][name].[ext]',
        },
    },
];

const svg_loaders = [
    {
        loader: 'babel-loader',
        options: {
            rootMode: 'upward',
        },
    },
    {
        loader: 'react-svg-loader',
        options: {
            jsx: true,
            svgo: {
                plugins: [
                    { removeTitle: false },
                    { removeUselessStrokeAndFill: false },
                    { removeUknownsAndDefaults: false },
                ],
                floatPrecision: 2,
            },
        },
    },
];

const css_loaders = [
    {
        loader: MiniCssExtractPlugin.loader,
        options: {
            sourceMap: true,
        },
    },
    {
        loader: 'css-loader',
        options: {
            sourceMap: true,
        },
    },
    {
        loader: 'postcss-loader',
        options: {
            sourceMap: true,
            config: {
                path: path.resolve(__dirname),
            },
        },
    },
    {
        loader: 'resolve-url-loader',
        options: {
            sourceMap: true,
            keepQuery: true,
        },
    },
    {
        loader: 'sass-loader',
        options: {
            sourceMap: true,
        },
    },
    {
        loader: 'sass-resources-loader',
        options: {
            resources: require('@deriv/shared/src/styles/index.js'),
        },
    },
];

module.exports = {
    js_loaders,
    html_loaders,
    file_loaders,
    svg_loaders,
    svg_file_loaders,
    css_loaders,
};
