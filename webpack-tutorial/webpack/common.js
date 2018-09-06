const HtmlPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');

module.exports = {
    module: {
        rules: [
            {
                enforce: 'pre',
                test: /\.ts$/,
                loader: 'tslint-loader',
                exclude: /(node_modules)/,
                options: {
                    configFile: 'tslint.json'
                }
            },
            {
                test: /\.ts?$/,
                exclude: /node_modules/,
                use: [{
                    loader: 'ts-loader',
                    options: {
                        appendTsSuffixTo: [/\.vue$/],
                    }
                }]
            },
            {
                test: /\.vue?$/,
                use: 'vue-loader',
            },
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
    resolve: {
        extensions: ['.ts', '.js', '.vue', '.json'],
        modules: ['node_modules'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
        }
    },
    plugins: [
        new HtmlPlugin({
            template: "./html/index.html"
        }),
        new VueLoaderPlugin()
    ],
    entry: './src/index.ts'
};