const webpack = require("webpack");
const path = require('path');

module.exports = {
    entry: {
        index: path.join(__dirname, 'src/index.ts'),
        vendor: ['moment']
    },
    output: {
        path: path.join(__dirname, 'dist/js'),
        filename: '[name].js'
    },
    module: {
        loaders: [{
                enforce: 'pre',
                test: /\.tsx?$/,
                exclude: /node_modules/,
                loader: 'tslint-loader',
                options: {
                    tsConfigFile: 'tsconfig.json',
                    fix: true,
                }
            },
            {
                exclude: /node_modules/,
                test: /\.tsx?$/,
                loader: 'ts-loader'
            },
        ]
    },
    plugins: [

        // pack common vender files
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: Infinity
        }),

        // exclude locale files in moment
        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),

        // minify
        // new webpack.optimize.UglifyJsPlugin()
    ],
    node: {
        fs: 'empty',
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js'],
        alias: {
            handlebars: 'handlebars/dist/handlebars.min.js',
        },
    },
};
