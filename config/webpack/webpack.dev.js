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
    devServer: {
        historyApiFallback: true,   // 使用HTML5历史记录API时，index.html很可能必须提供该页面来代替任何404响应。
        disableHostCheck: true,     // 设置true为该选项时，将绕过主机检查。不建议这样做，因为不检查主机的应用容易受到DNS重新绑定攻击的攻击。
        host: 'localhost',          // 指定要使用的主机。如果您希望服务器可从外部访问，请按以下方式指定它：
        port: '8001',               // 端口
        inline: true,               // 在开发服务器的两种不同模式之间切换。默认情况下，将为应用程序启用内联模式。这意味着将在您的包中插入一个脚本以进行实时重新加载，并且构建消息将出现在浏览器控制台中。
        hot: true,                  // 启用webpack的热模块更换功能：
        compress: true              // 对所有服务启用gzip压缩：
        // proxy: {                 // 代理
        //     '/api': {
        //         // 这里改为项目后端 API 接口 Host
        //         target: 'http://backend.api.host',
        //         // 支持跨域调用
        //         changeOrigin: true,
        //     }
        // }
    },
});
