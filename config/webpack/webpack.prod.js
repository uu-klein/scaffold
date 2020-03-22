/**
 * 生产环境配置文件
 * */
const merge = require('webpack-merge');                                                 // 合并配置
const {CleanWebpackPlugin} = require('clean-webpack-plugin');                           // 清理上一次打包的文件夹
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');                 // 压缩js
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;   // 分析工具
const paths = require('../commonPaths');                                                // 路径
const commonConfig = require('./webpack.common');                                       // 公共文件
const MiniCssExtractPlugin = require('mini-css-extract-plugin');                        // 分离css
const OptimizeCssPlugin = require('optimize-css-assets-webpack-plugin');                // 导入样式压缩
// const path = require('path');  // path模块提供用于处理文件路径和目录路径的实用工具。
// const glob = require('glob');
// const PurifyCssPlugin = require('purifycss-webpack');                                   // 消除多余css

// 采用多入口 进行拆分打包
module.exports = merge.smart(commonConfig, {
    mode: 'production',
    entry: {
        main: paths.appIndex,
        common: paths.appCommon,
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
            }),
            new OptimizeCssPlugin({cssProcessorOptions: {safe: true}}),
        ],
        splitChunks: {
            chunks: 'all',
            minSize: 0,
        },
    },
    module: {
        noParse: /node_modules\/dist/,
        rules: [
            {
                test: /\.less$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            modules: {
                                localIdentName: 'rex-[hash:base64:8]'
                            }
                        },
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: (loader) => [
                                require('postcss-import')({root: loader.resourcePath}),
                                require('autoprefixer')(), //CSS浏览器兼容
                                require('cssnano')()  //压缩css
                            ]
                        }
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
                loader: 'file-loader',
                options: {
                    name: 'assets/[name].[ext]'
                }
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new BundleAnalyzerPlugin(),
        new MiniCssExtractPlugin({
            filename: 'static/css/[name].css',
            chunkFilename: '[id].css',
            ignoreOrder: false
        }),
        // new PurifyCssPlugin({      并不能去除无用css
        //     // paths: glob.sync(paths.appHtml),
        //     paths: glob.sync(path.join(__dirname, 'src/*')),
        // })
    ],
});
