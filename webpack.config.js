const webpack = require("webpack");
const path = require('path');

module.exports = {
    entry: {
        index: path.join(__dirname, 'src/index.ts')
    },
    output: {
        path: path.join(__dirname, 'dist/js'),
        filename: '[name].js'
    },
    module: {
        rules: [
            {
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
        // minify
        // new webpack.optimize.UglifyJsPlugin()
    ],
    resolve: {
        extensions: ['.ts', '.tsx', '.js'],
    },
};
