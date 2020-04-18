/**
 * 开发模式配置文件
 * */
const webpack = require('webpack');         // 引入webpack
const merge = require('webpack-merge');     // 合并配置插件
const paths = require('../commonPaths');          //  引入路径
const commonConfig = require('./webpack.common');   // 引入公共配置

module.exports = merge.smart(commonConfig, {
    mode: 'development',//  开发模式
    entry: paths.appIndex, // 入口
    output: {
        filename: 'static/js/[name]-bundle-[hash:8].js', // 输出文件
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
                    limit: 25000,
                }
            }
        ],
    },
    // 插件
    plugins: [
        new webpack.HotModuleReplacementPlugin(),   // 热更新
    ],

});
