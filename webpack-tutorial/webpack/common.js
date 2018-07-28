const HtmlPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    module: {
        rules: [
            {
                test: /.css$/,
                use: ExtractTextPlugin.extract({
                    use: {
                        loader: 'css-loader',
                        options: {
                            sourceMap:true
                        }
                    }
                })
            }
        ]
    },
    plugins: [
        new HtmlPlugin({
            template: "./html/index.html"
        })
    ],
    entry: './js/index.js'
};