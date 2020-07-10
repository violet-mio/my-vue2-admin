'use strict'
const path = require('path')
const defaultSettings = require('./src/settings.js')

function resolve(dir) {
  return path.join(__dirname, dir)
}

const name = defaultSettings.title || 'vue Admin Template' // page title

// If your port is set to 80,
// use administrator privileges to execute the command line.
// For example, Mac: sudo npm run
// You can change the port by the following methods:
// port = 9528 npm run dev OR npm run dev --port = 9528
const port = process.env.port || process.env.npm_config_port || 9528 // 开发环境端口

// All configuration item explanations can be find in https://cli.vuejs.org/config/
module.exports = {
  /** 
   * 部署应用时的基本URL，一般使用 '/'
   * 如果你部署在站点的子路径下，需要设置publicPath属性
   * 比如你打算部署项目到站点 https://foo.github.io/test/ ，子路径就是/bar/，需要 publicPath设置为'/test/'
   * 更多参考 https://cli.vuejs.org/config/#publicpath
  */
  // publicPath: '/',
  publicPath: '/',

  // 构建文件的存放目录
  outputDir: 'dist',

  // 编译后，静态资源存放目录
  assetsDir: 'static', 

  // eslint 是否在保存时候进行检查，如果你只想在开发环境时使用，可以用如下配置
  lintOnSave: process.env.NODE_ENV === 'development',

  // 是否在生产环境开启SourceMap，设为false，打包时不生成.map文件
  productionSourceMap: false,
  // webpack-dev-server 相关配置，
  devServer: {
    // 端口地址
    port: port,
    // 是否自动自动打开浏览器
    // open: true,

    // 浏览器同时显示警告和错误
    overlay: {
      warnings: false,
      errors: true
    },
    // 代理设置，可以用于开发阶段处理跨域请求
    // proxy: {}
    
    // 使用mock数据
    // before: require('./mock/mock-server.js')
  },
  configureWebpack: {
    // provide the app's title in webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
    name: name,
    resolve: {
      // 设置一些常用的别名
      alias: {
        '@': resolve('src')
      }
    }
  },
  chainWebpack(config) {
    // 内联要关掉 preload 和 prefetch，否则index.html会引入请求runtimeChunk的preload link
    // 参考issues https://github.com/PanJiaChen/vue-element-admin/issues/2690
    // 移除预加载
    config.plugins.delete('preload')
  
    // 移除 prefetch 插件，减少首屏加载
    config.plugins.delete('prefetch')

    // 设置svg精灵图loader
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()

    // true这意味着编译好的渲染函数会保留所有 HTML 标签之间的空格
    // 如果设置为 false，则标签之间的空格会被忽略。
    // 这能够略微提升一点性能但是可能会影响到内联元素的布局。
    config.module
      .rule('vue')
      .use('vue-loader')
      .loader('vue-loader')
      .tap(options => {
        options.compilerOptions.preserveWhitespace = true
        return options
      })
      .end()

    config
      .when(process.env.NODE_ENV !== 'development',
        config => {
          config
            .plugin('ScriptExtHtmlWebpackPlugin')
            .after('html')
            .use('script-ext-html-webpack-plugin', [{
              // inline 的name 和你 runtimeChunk 的 name保持一致
              // 将runtime内联到index.html中
              inline: /runtime\..*\.js$/
            }])
            .end()
          config
            .optimization.splitChunks({
              chunks: 'all',
              cacheGroups: {
                libs: {
                  name: 'chunk-libs',
                  test: /[\\/]node_modules[\\/]/,
                  priority: 10,
                  // 只打包初始时所依赖的第三方
                  chunks: 'initial'
                },
                elementUI: {
                  // 将elementui拆分到一个单独的包中
                  name: 'chunk-elementUI',
                  // 权重要大于 libs 和 app, 不然会被打包进 libs 或者 app
                  priority: 20, 
                  // 为了适配cnpm
                  test: /[\\/]node_modules[\\/]_?element-ui(.*)/ 
                },
                commons: {
                  name: 'chunk-commons',
                  // 可自定义拓展你的规则
                  test: resolve('src/components'),
                  // 最小共用次数
                  minChunks: 3,
                  priority: 5,
                  reuseExistingChunk: true
                }
              }
            })
          // 将包含chunks 映射关系的 list单独从 app.js里提取出来
          config.optimization.runtimeChunk('single')
        }
      )
  }
}
