# 配置自己的脚手架
# React 框架 
# yarn add react react-dom

# React 类型库 (帮助 Typescript 识别 React 库中定义的类型)
# yarn add --dev @types/react @types/react-dom

# 安装 babel 转换器 
# yarn add @babel/core
# yarn add @babel/plugin-proposal-class-properties
# yarn add @babel/plugin-proposal-object-rest-spread
# yarn add @@babel/preset-env
# yarn add @babel/core
# yarn add @babel/preset-typescript
# yarn add babel-loader
# yarn add @babel/preset-react

# 安装 Webpack
# webpack
# webpack-cli            
# webpack-dev-server       小型的Node.js Express服务器
# webpack-merge            合并配置
# yarn add --dev webpack webpack-cli webpack-dev-server webpack-merge

# webpack 插件
# source-map-loader        错误代码具体在哪个文件哪行
# html-webpack-plugin      创建一个html文件
# clean-webpack-plugin     在下一次打包时清除之前打包的文件  注意 const CleanWebpackPlugin = require('clean-webpack-plugin'); 会报错,正确写法 const {CleanWebpackPlugin} = require('clean-webpack-plugin');
# webpack-parallel-uglify-plugin  压缩JS     
# yarn add --dev source-map-loader html-webpack-plugin clean-webpack-plugin  webpack-parallel-uglify-plugin

# 优化构建速度
# HardSourceWebpackPlugin 
# happypack 多任务
# yarn add --dev HardSourceWebpackPlugin  happypack

# css部分   loader 
# less less-loader css-loader style-loader
# yarn add --dev less less-loader css-loader style-loader

# 分离css
# mini-css-extract-plugin
# yarn add --dev mini-css-extract-plugin

# 压缩css
# optimize-css-assets-webpack-plugin
# yarn add --dev optimize-css-assets-webpack-plugin

# 添加css前缀
# postcss-loader 
# autoprefixer 
# cssnano 
# postcss-import
# yarn add --dev postcss-loader autoprefixer cssnano postcss-import

# 显示打包时间
# progress-bar-webpack-plugin
# yarn add progress-bar-webpack-plugin

# 图片部分
# url-loader   开发模式引用路径
# file-loader  生产模式打包路径
# image-webpack-loader 压缩图片
# yarn add --dev  url-loader file-loader 
