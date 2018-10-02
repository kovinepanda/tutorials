const path = require('path');
const Merge = require('webpack-merge');
const CommonConfig = require('./common.js');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = Merge(CommonConfig, {
    output: {
        path: path.join(__dirname, '../production'),
        filename: '[chunkhash]-bundle.js'
    },    
    devtool: "source-map",
    plugins: [
        new ExtractTextPlugin('[chunkhash]-style.css')
    ]
});