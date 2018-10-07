const HtmlPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');

module.exports = {
    module: {
        rules: [            
            {
                test: /.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
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
        extensions: ['.js', '.vue', '.json'],
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
    entry: './src/index.js'
};