const path = require('path')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const isProduction = process.env.NODE_ENV === 'production'
const cdn = {
  css: ['https://unpkg.com/element-ui/lib/theme-chalk/index.css'],
  js: [
    'https://cdn.jsdelivr.net/npm/vue@2.6.12/dist/vue.min.js',
    'https://cdn.jsdelivr.net/npm/vue-router@3.4.3/dist/vue-router.min.js',
    'https://cdn.jsdelivr.net/npm/vuex@3.5.1/dist/vuex.min.js',
    'https://cdn.jsdelivr.net/npm/axios@0.20.0/dist/axios.min.js',
    'https://unpkg.com/element-ui/lib/index.js' // 未带@版本号 会临时重定向到对应最新版本
  ]
}
function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  // 基本路径
  publicPath: './',
  // 输出文件目录
  outputDir: 'dist',
  // 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录。
  assetsDir: 'static',
  // 指定生成的 index.html 的输出路径 (相对于 outputDir)。也可以是一个绝对路径
  indexPath: 'index.html',

  // eslint-loader 是否在保存的时候检查
  lintOnSave: false,
  devServer: {
    port: 8888, // 端口
    open: true, // 自动开启浏览器
    compress: false, // 开启压缩
    overlay: {
      warnings: true,
      errors: true
    }
    // proxy: {
    //   [process.env.VUE_APP_API_URL]: {
    //     target: `http://10.95.130.102:8480`,
    //     changeOrigin: true,
    //     pathRewrite: {
    //       ['^' + process.env.VUE_APP_BASE_API]: ''
    //     }
    //   }
    // }
  },
  // webpack配置
  // see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
  chainWebpack: config => {
    config
      .entry('main')
      .add('babel-polyfill')
      .end()
    // 配置别名
    config.resolve.alias.set('@', resolve('src'))
    // 生产环境配置
    if (isProduction) {
      // 删除预加载
      config.plugins.delete('preload')
      config.plugins.delete('prefetch')
      // 压缩代码
      config.optimization.minimize(true)
      // 分割代码
      config.optimization.splitChunks({
        chunks: 'all'
      })
      // 生产环境注入cdn
      config.plugin('html').tap(args => {
        args[0].cdn = cdn
        return args
      })
    } else {
      // 开发环境注入开发也需要的css（ 如 element-ui的css ）
      config.plugin('html').tap(args => {
        args[0].cdn = { css: cdn.css }
        return args
      })
    }
  },
  // css相关配置
  css: {
    // 是否使用css分离插件 ExtractTextPlugin
    extract: true,
    // 开启 CSS source maps?
    sourceMap: false,
    // css预设器配置项
    loaderOptions: {
      // pass options to less-loader
      // less: {
      //     // 引入全局变量样式
      //     data: `
      //         @import "@/style/theme.less;
      //     `
      // }
    }
  },
  configureWebpack: config => {
    if (isProduction) {
      // 用cdn方式引入
      config.externals = {
        vue: 'Vue',
        vuex: 'Vuex',
        'vue-router': 'VueRouter',
        axios: 'axios',
        'element-ui': 'ELEMENT'
      }
      // 为生产环境修改配置...
      config.plugins.push(
        //生产环境自动删除console
        new UglifyJsPlugin({
          uglifyOptions: {
            compress: {
              drop_debugger: true,
              drop_console: true
            }
          },
          sourceMap: false,
          parallel: true
        })
      )
      config.plugins.push(
        new BundleAnalyzerPlugin({
          analyzerMode: 'disabled',
          generateStatsFile: false,
          statsOptions: { source: false }
        })
      )
    } else {
      // 为开发环境修改配置...
    }
  },
  // 生产环境是否生成 sourceMap 文件
  productionSourceMap: false,

  // use thread-loader for babel & TS in production build
  // enabled by default if the machine has more than 1 cores
  parallel: require('os').cpus().length > 1
}
