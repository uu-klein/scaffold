/**
 * 公共webpack配置文件
 * */
const HtmlWebpackPlugin = require('html-webpack-plugin');   // 创建html的webpack插件
const paths = require('../commonPaths'); //引入路径文件
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
const HappyPack = require('happypack');    // 多任务   加速构建速度
const os = require('os');
const happyThreadPool = HappyPack.ThreadPool({size: os.cpus().length});

const WorkBoxPlugin = require('workbox-webpack-plugin');

module.exports = {
    // 解析
    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.json'],  //自动解析确定的扩展。
        alias: {
            '@': paths.appFile,                       // 设置别名
            '@assets': paths.appAssets,
        },
        modules: [
            paths.appNodeModules,
            paths.appFile,
            paths.appAssets,
        ],
    },
    devtool: 'source-map',
    // 规则
    module: {
        noParse: /node_modules\/dist/,
        rules: [
            {
                test: /\.(jsx?|tsx?|ts?|js?)$/,
                loader: 'happypack/loader?id=happy-babel-ts',
                exclude: /node_modules/,
                include: paths.appFile, // 精确指定要处理的目录
            },
        ],
    },
    // 配置公共插件
    plugins: [
        new HappyPack({
            id: 'happy-babel-ts',
            loaders: [
                {
                    loader: 'babel-loader',
                    options: {
                        presets: ["@babel/preset-env", "@babel/preset-react"]
                    }
                }
            ],
            threadPool: happyThreadPool,
            verbose: true,
        }),
        new HardSourceWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: '配置页面title',      // 配置页面title
            template: paths.appHtml,    // 模版路径
            inject: false,              // 注入所有的资源到特定的 template 或者 templateContent 中，如果设置为 true 或者 body，所有的 javascript 资源将被放置到 body 元素的底部，'head' 将放置到 head 元素中。
            minify: {
                removeAttributeQuotes: true,//去除属性的双引号
                collapseWhitespace: true, //折叠代码为一行
            },
            hash: true                   //清除缓存
        }),

        new WorkBoxPlugin.GenerateSW({
            // 在预缓存中排除 图片
            exclude: [/\.(?:png|jpg|jpeg|svg)$/],

            //定义运行时缓存（可接受多个json对象）
            runtimeCaching: [
                {
                    urlPattern: /\.(?:png|jpg|jpeg|svg)$/,
                    // 在缓存时使用 StaleWhileRevalidate 策略.
                    handler: "StaleWhileRevalidate",
                    options: {
                        // 定义缓存这些图片的 cache名称
                        cacheName: "images",

                        //配置 expiration
                        expiration: {
                            maxEntries: 10,
                            maxAgeSeconds: 60
                        },

                        // 配置 background sync.
                        backgroundSync: {
                            name: "queue",
                            options: {
                                maxRetentionTime: 60 * 60
                            }
                        },

                        //配置哪些响应被认为是可缓存的
                        cacheableResponse: {
                            statuses: [0, 200],
                            headers: {"x-test": "true"}
                        },

                        //配置广播缓存更新插件。
                        broadcastUpdate: {
                            channelName: "update"
                        },

                        //matchOptions和fetchOptions用于配置handler
                        fetchOptions: {
                            mode: "no-cors"
                        },
                        matchOptions: {
                            ignoreSearch: true
                        }
                    }
                }
            ],

            skipWaiting: false, // service worker是否应该跳过等待生命周期阶段
            clientsClaim: false, //service worker是否应该在任何现有客户端激活后立即开始控制它
            cacheId: "work-webpack-plugin",
            offlineGoogleAnalytics: true
        }),
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
};







