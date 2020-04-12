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
const ProgressBarPlugin = require('progress-bar-webpack-plugin');                       // 显示打包时间
const chalk = require("chalk");
// const HappyPack = require('happypack');    // 多任务   加速构建速度
// const os = require('os');
// const happyThreadPool = HappyPack.ThreadPool({size: os.cpus().length});
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
            cacheGroups: {
                commons: {
                    chunks: 'initial',
                    minChunks: 2,
                    maxInitialRequests: 5, // The default limit is too small to showcase the effect
                    minSize: 0, // This is example is too small to create commons chunks
                    name: 'common'
                }
            }
        },
    },
    module: {
        noParse: /node_modules\/dist/,
        rules: [
            {
                test: /\.(less?|css?|sass?|scss?)$/,
                include: paths.appFile,
                exclude: /node_modules/,
                // loaders: [
                //     MiniCssExtractPlugin.loader,
                //     'happypack/loader?id=happy-babel-less',
                // ]
                // loader: 'happypack/loader?id=happy-babel-less',
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
                    }
                ],
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'assets/[name].[ext]'
                        }
                    },
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            bypassOnDebug: true
                        }
                    }
                ],

            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new BundleAnalyzerPlugin(),
        // new HappyPack({
        //     id: 'happy-babel-less',
        //     threadPool: happyThreadPool,
        //     verbose: true,
        //     loaders: [
        //         // MiniCssExtractPlugin.loader,
        //         {
        //             loader: 'css-loader',
        //             options: {
        //                 // cacheDirectory: true,
        //                 importLoaders: 2,
        //                 modules: {
        //                     localIdentName: 'rex-[hash:base64:8]'
        //                 }
        //             },
        //         },
        //         {
        //             loader: 'postcss-loader',
        //             options: {
        //                 cacheDirectory: true,
        //                 plugins: (loader) => [
        //                     require('postcss-import')({root: loader.resourcePath}),
        //                     require('autoprefixer')(), //CSS浏览器兼容
        //                     require('cssnano')()  //压缩css
        //                 ]
        //             }
        //         },
        //         {
        //             loader: 'less-loader',
        //             options: {
        //                 cacheDirectory: true,
        //                 strictMath: true,
        //                 noIeCompat: true,
        //                 modules: true,
        //             },
        //         }
        //     ]
        // }),
        // new HappyPack({
        //     id: 'happypack/loader?id=happy-babel-cssloader',
        //     loaders: [
        //         {
        //             loader: 'css-loader',
        //             options: {
        //                 cacheDirectory: true,
        //                 modules: {
        //                     localIdentName: 'rex-[hash:base64:8]'
        //                 }
        //             }
        //         }
        //     ]
        // }),
        // new HappyPack({
        //     id: 'happypack/loader?id=happy-babel-postcssloader',
        //     loaders: [
        //         {
        //             loader: 'postcss-loader',
        //             options: {
        //                 cacheDirectory: true,
        //                 plugins: (loader) => [
        //                     require('postcss-import')({root: loader.resourcePath}),
        //                     require('autoprefixer')(), //CSS浏览器兼容
        //                     require('cssnano')()  //压缩css
        //                 ]
        //             }
        //         }
        //     ]
        // }),
        // new HappyPack({
        //     id: 'happypack/loader?id=happy-babel-lessloader',
        //     loaders: [
        //         {
        //             loader: 'less-loader',
        //             options: {
        //                 cacheDirectory: true,
        //                 strictMath: true,
        //                 noIeCompat: true,
        //                 modules: true,
        //             }
        //         }
        //     ]
        // }),

        new ProgressBarPlugin({
            format: '  build [:bar] ' + chalk.green.bold(':percent') + ' (:elapsed seconds)'
        }),
        new MiniCssExtractPlugin({
            filename: 'static/css/[name].css',
            chunkFilename: '[id].css',
            ignoreOrder: false
        }),
    ],
});
