/**
 * 开发模式配置文件
 * */
const webpack = require('webpack');
const {merge} = require('webpack-merge');
const paths = require('./webpack.common.paths');
const commonConfig = require('./webpack.common');

const devConfig = {
    // mode: 'development',//  开发模式

    entry: paths.appIndex, // 入口
    output: {
        filename: 'static/js/[name]-bundle-[hash:8].js',
    },
    module: {
        noParse: /node_modules\/dist/,
        rules: [
            {
                test: /\.less$/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            modules: {
                                localIdentName: 'rex-[hash:base64:8]'
                            }
                        },
                    },
                    {
                        loader: 'less-loader',
                        options: {
                            strictMath: true,
                            noIeCompat: true,
                            modules: true,
                        },
                    }],
                include: paths.appFile,
                exclude: /node_modules/,
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'url-loader',
                options: {
                    name: './assets/[name].[ext]',
                    limit: 2048,
                }
            }
        ],
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
    ],
    devServer: {
        historyApiFallback: true,
        disableHostCheck: true,
        inline: true,
        hot: true,
        compress: true,
        proxy: {
            "/api": {
                target: "url",
                changeOrigin: true,
                pathRewrite: {"^/api": ""}
            },
        },
    },
};


module.exports = merge(commonConfig, devConfig);
