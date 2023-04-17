const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const webpackConfigBase = require('./webpack.base.conf');
const env = require('./env-config');
console.log('env:', env);
console.log('开发环境');
const webpackConfigDev = {
  mode: 'development', // 通过 mode 声明开发环境
  devtool: 'cheap-module-eval-source-map',
  output: {
    path: path.resolve(__dirname, '../dist'),
    // 打包多出口文件
    filename: 'js/[name].bundle.js'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.BASE_URL': JSON.stringify(process.env.BASE_URL),
      'process.env.APP_MODE': JSON.stringify(env.HOST_CONF.envName)
    })
  ],
  devServer: {
    contentBase: path.join(__dirname, '../src/pages/index'),
    publicPath: '/',
    host: '0.0.0.0',
    port: '8090',
    compress: true,
    overlay: true, // 浏览器页面上显示错误
    open: true, // 开启浏览器
    // stats: "errors-only", //stats: "errors-only"表示只打印错误：
    //服务器代理配置项
    disableHostCheck: true,
    proxy: {
      '/api': {
        target: 'https://linshengcong.cn', // 测试
        // target: 'http://10.50.42.104:8081', // 开发
        changeOrigin: true,
        secure: true
      }
    }
  }
};
module.exports = merge(webpackConfigBase, webpackConfigDev);
