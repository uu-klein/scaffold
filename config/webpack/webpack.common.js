/**
 * 公共webpack配置文件
 * */

const HtmlWebpackPlugin = require('html-webpack-plugin');   // 创建html的webpack插件

const paths = require('../commonPaths'); //引入路径文件

const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');

module.exports = {
    // 解析
    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.json'],  //自动解析确定的扩展。
        alias: {
            '@': paths.appFile,                       // 设置别名
        },
        modules: [
            paths.appNodeModules,
            paths.appFile
        ],
    },
    // 优化提取
    //resolve: {
    //     extensions: ['.js', '.vue', '.json'],
    //     modules: [
    //       resolve('src'),
    //       resolve('node_modules')
    //     ],
    //     alias: {
    //       'vue$': 'vue/dist/vue.common.js',
    //       'src': resolve('src'),
    //       'assets': resolve('src/assets'),
    //       'components': resolve('src/components'),
    //       // ...
    //       'store': resolve('src/store')
    //     }
    //   },
    devtool: 'source-map',
    // 规则
    module: {
        noParse: /node_modules\/dist/,
        rules: [
            {
                test: /\.(ts|tsx)?$/,
                exclude: /node_modules/,
                include: paths.appFile, // 精确指定要处理的目录
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env", "@babel/preset-react"]
                    }
                },
            },
        ],
    },
    // 配置公共插件
    plugins: [
        new HardSourceWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: '配置页面title',      // 配置页面title
            template: paths.appHtml,    // 模版路径
            inject: false,              // 注入所有的资源到特定的 template 或者 templateContent 中，如果设置为 true 或者 body，所有的 javascript 资源将被放置到 body 元素的底部，'head' 将放置到 head 元素中。
        }),
    ],
};
