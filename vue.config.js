// vue.config.js
const path = require('path')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
function resolve(dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  publicPath: '/',
  outputDir: 'dist', //在build时生成文件的目录
  assetsDir: 'static',
  chainWebpack: config => {
    config.resolve.alias.set('@', resolve('src')).set('~', resolve('src/components'))
  },
  devServer: {
    //代理 支持webpack-dev-server所有选项
    disableHostCheck: true,
    port: 8080, //端口号
    host: '',
    https: false,
    proxy: {
      //配置跨域处理 配置多个代理
      '/api': {
        target: 'http://xxxx.xxxx.com',
        changeOrigin: true,
        logLevel: 'debug',
        pathRewrite: {
          '^/api': '',
        },
      },
    },
  },
  configureWebpack: config => {
    config.entry.app = './src/main.js'
    let plugins = [
      new UglifyJsPlugin({
        uglifyOptions: {
          warnings: false,
          compress: {
            drop_console: true,
            drop_debugger: true,
          },
          output: {
            comments: false,
          },
        },
        sourceMap: false,
        parallel: true,
      }),
    ]
    if (process.env.NODE_ENV === 'production') {
      config.plugins = [...config.plugins, ...plugins]
    }
  },
}
