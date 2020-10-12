/**
 * 公共路径文件
 * */
const path = require('path');

const fs = require('fs');

const appDirectory = fs.realpathSync(process.cwd());

const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

module.exports = {
    appBuild: resolveApp('dist'),
    appIndex: resolveApp('src/index.tsx'),
    appHtml: resolveApp('src/template/index.ejs'),
    appFile: resolveApp('src'),
    appAssets: resolveApp('src/assets'),
    appNodeModules: resolveApp('node_modules'),
    appMock: resolveApp('mock'),
    appStore: resolveApp('redux/store'),
};
