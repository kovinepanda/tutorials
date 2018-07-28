const path = require('path');
const Merge = require('webpack-merge');
const CommonConfig = require('./common.js');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = Merge(CommonConfig, {
    output: {
        path: path.join(__dirname, '../dev'),
        filename: 'bundle.js'
    },
    plugins: [
        new ExtractTextPlugin('style.css')
    ]
});