/**
 * 生产环境配置文件
 * */
const {merge} = require('webpack-merge');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const paths = require('./webpack.common.paths');
const commonConfig = require('./webpack.common');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssPlugin = require('optimize-css-assets-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const chalk = require("chalk");

const prodConfig = {
    // mode: 'production',

    entry: {
        main: paths.appIndex,
    },
    output: {
        path: paths.appBuild,
        filename: 'js/[name]-[hash:8].js',
    },

    module: {
        noParse: /node_modules\/dist/,
        rules: [
            {
                test: /\.(less?|css?|sass?|scss?)$/,
                include: paths.appFile,
                exclude: /node_modules/,
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
                                require('autoprefixer')(),
                                require('cssnano')()
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
                            name: '[name].[ext]',
                            limit: 2048,
                            outputPath: 'img',
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
        // new BundleAnalyzerPlugin(),
        new ProgressBarPlugin({
            format: '  build [:bar] ' + chalk.green.bold(':percent') + ' (:elapsed seconds)'
        }),
        new MiniCssExtractPlugin({
            filename: 'static/css/[name].css',
            chunkFilename: '[id].css',
            ignoreOrder: false
        }),
    ],
};

module.exports = merge(commonConfig, prodConfig);
