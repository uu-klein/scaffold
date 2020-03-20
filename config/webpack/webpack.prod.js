const merge = require('webpack-merge');                                                 // 合并配置
const {CleanWebpackPlugin} = require('clean-webpack-plugin');                           // 清理上一次打包的文件夹
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');                              // 压缩js
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;   // 分析工具
const paths = require('../commonPaths');                                                // 路径
const commonConfig = require('./webpack.common');                                       // 公共文件

// 采用多入口 进行拆分打包
module.exports = merge.smart(commonConfig, {
    mode: 'production',
    entry: {
        a: paths.appIndex,
        b: paths.appCommon,
    },
    output: {
        path: paths.appBuild,
        filename: 'static/js/[name]-[hash:8].js',
    },
    optimization: {
        removeEmptyChunks: true,
        minimizer: [
            new ParallelUglifyPlugin({
                cacheDir: '.cache/',
                uglifyJS: {
                    output: {
                        comments: false,
                        beautify: false,
                    },
                    compress: {
                        drop_console: true,
                        collapse_vars: true,
                    }
                }
            })
        ],
        splitChunks: {
            chunks: 'all',
            minSize: 0,
        },
    },
    plugins: [
        new CleanWebpackPlugin(),
        new BundleAnalyzerPlugin(),
    ],
});
