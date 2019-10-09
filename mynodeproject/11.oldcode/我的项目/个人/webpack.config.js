const webpack = require('webpack');
const path = require('path');


module.exports = {
    entry: __dirname + '/main.js',
    output: {
        path: path.resolve(__dirname, "dist"),
        publicPath: "/assets/",
        filename: "bundle.js"
    },
    mode: "none",
    devtool: "source-map",
    module: {
        rules: [{
                test: /\.js$/,
                loader: 'babel-loader',
                options: {
                    presets: [
                        "env", "react"
                    ]
                }
            },
            {
                test: /\.css$/,
                use: [{
                    loader: "style-loader"
                }, {
                    loader: "css-loader"
                }]
            },
            {
                test: /\.(eot|woff|woff2|svg|ttf)([\?]?.*)$/,
                loader: "file-loader"
            }
        ]
    }
}