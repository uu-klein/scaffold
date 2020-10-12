/**
 * 公共webpack配置文件
 * */
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const paths = require('./webpack.common.paths');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
const HappyPack = require('happypack');
const os = require('os');
const happyThreadPool = HappyPack.ThreadPool({size: os.cpus().length});
const WorkBoxPlugin = require('workbox-webpack-plugin');
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');
const OptimizeCssPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
    mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
    performance: {
        hints: false,
        maxEntrypointSize: 512000,
        maxAssetSize: 512000
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.json'],
        alias: {
            '@': paths.appFile,
            '@assets': paths.appAssets,
            '@mock': paths.appMock,
            '@store': paths.appStore,
        },
        modules: [
            paths.appNodeModules,
            paths.appFile,
            paths.appAssets,
        ],
    },
    devtool: 'source-map',
    optimization: {
        removeEmptyChunks: true,
        minimizer: [
            new ParallelUglifyPlugin({
                cacheDir: '.cache/',
                uglifyJS: {
                    output: {
                        comments: false,
                    },
                    warnings: true,
                    compress: {
                        drop_console: true,
                        collapse_vars: true,
                        reduce_vars: true,
                    }
                },
            }),
            new OptimizeCssPlugin({cssProcessorOptions: {safe: true}}),
        ],
        splitChunks: {
            chunks: 'all',
            minSize: 0,
            cacheGroups: {
                commons: {
                    chunks: "initial",
                    minChunks: 2,
                    name: "commons",
                    maxInitialRequests: 5,
                    minSize: 0,
                },
                reactBase: {
                    test: (module) => {
                        return /react|redux|prop-types/.test(module.context);
                    },
                    chunks: "initial",
                    name: "reactBase",
                    priority: 10,
                },
            }
        },
    },
    module: {
        noParse: /node_modules\/dist/,
        rules: [
            {
                test: /\.(jsx?|tsx?|ts?|js?)$/,
                loader: 'happypack/loader?id=happy-babel-ts',
                exclude: /node_modules/,
                include: paths.appFile,
            },
        ],
    },
    plugins: [
        new HappyPack({
            id: 'happy-babel-ts',
            loaders: [
                {
                    loader: 'babel-loader',
                    options: {
                        presets: ["@babel/preset-env", "@babel/preset-react"]
                        // presets: [
                        //     ['@babel/preset-env', {
                        //         useBuiltIns: 'usage', //不能是“entry”
                        //         corejs: 3
                        //     }],
                        //     '@babel/preset-react'
                        // ]
                    }
                }
            ],
            threadPool: happyThreadPool,
            verbose: true,
        }),
        new HardSourceWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: '网页title',
            template: paths.appHtml,
            // inject: false,
            inject: 'body',
            minify: {
                removeAttributeQuotes: true,
                collapseWhitespace: true,
            },
            hash: true
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV),
            }
        }),
        // new WorkBoxPlugin.GenerateSW({
        //     exclude: [/\.(?:png|jpg|jpeg|svg)$/],
        //     maximumFileSizeToCacheInBytes: 5000000,
        //     runtimeCaching: [
        //         {
        //             urlPattern: /\.(?:png|jpg|jpeg|svg)$/,
        //             handler: "StaleWhileRevalidate",
        //             options: {
        //                 cacheName: "images",
        //
        //                 expiration: {
        //                     maxEntries: 10,
        //                     maxAgeSeconds: 60
        //                 },
        //
        //                 backgroundSync: {
        //                     name: "queue",
        //                     options: {
        //                         maxRetentionTime: 60 * 60
        //                     }
        //                 },
        //
        //                 cacheableResponse: {
        //                     statuses: [0, 200],
        //                     headers: {"x-test": "true"}
        //                 },
        //
        //                 broadcastUpdate: {
        //                     channelName: "update"
        //                 },
        //
        //                 fetchOptions: {
        //                     mode: "no-cors"
        //                 },
        //                 matchOptions: {
        //                     ignoreSearch: true
        //                 },
        //             },
        //         }
        //     ],
        //     skipWaiting: false,
        //     clientsClaim: false,
        //     cacheId: "work-webpack-plugin",
        //     offlineGoogleAnalytics: true
        // }),
    ],
};

