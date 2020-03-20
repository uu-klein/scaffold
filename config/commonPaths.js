/**
 * 路径文件
 * */
const path = require('path');  // path模块提供用于处理文件路径和目录路径的实用工具。

const fs = require('fs');      // 文件系统

const appDirectory = fs.realpathSync(process.cwd());       // 同步的realPath()，返回解析的路径。 cwd方法返回进程的当前目录（绝对路径）

const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

module.exports = {
    appBuild: resolveApp('dist'),             // 打包出来的文件夹
    appPublic: resolveApp('public'),          // 公共文件夹
    appIndex: resolveApp('src/index.tsx'),    // 入口页面
    appCommon: resolveApp('src/common/common.ts'), //公共js文件
    appHtml: resolveApp('public/index.html'), // 模版页面
    appFile: resolveApp('src'),               // src文件夹
    appNodeModules: resolveApp('node_modules'),// node_modules
//    modules: [path.resolve(__dirname, 'node_modules')],
};



