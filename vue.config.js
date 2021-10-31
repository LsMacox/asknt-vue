const path = require('path')
const packageJson = require('./package.json')

function resolve (dir) {
  return path.join(__dirname, dir)
}

const name = packageJson.name || 'ASKNT'
const port = process.env.port || process.env.npm_config_port || 9527 // dev port

process.env.VUE_APP_VERSION = packageJson.version
process.env.VUE_APP_NAME = name

module.exports = {
  publicPath: '',
  outputDir: 'dist',
  assetsDir: 'assets',
  lintOnSave: process.env.NODE_ENV === 'development',
  devServer: {
    port: port,
    disableHostCheck: true,
    compress: true,
    historyApiFallback: true,
    noInfo: true,
  },
  configureWebpack: {
    // provide the app's title in webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
    name: name,
    devtool: 'source-map',
    resolve: {
      alias: {
        '@': resolve('src'),
      },
    },
  },
  chainWebpack: (config) => {
    config.plugin('VuetifyLoaderPlugin').tap(() => [
      {
        // https://github.com/vuetifyjs/vuetify-loader
        progressiveImages: false,
      },
    ])
  },
  css: {
    loaderOptions: {
      scss: {
        additionalData: `
          @import "@/styles/_typography.sass";
          @import "@/styles/_mixins.scss";
          @import "@/styles/themes/_variables.sass";
        `,
      },
      sass: {
        additionalData: `
          @import "@/styles/_typography.sass"
          @import "@/styles/_mixins.scss"
          @import "@/styles/themes/_variables.sass"
        `,
      },
    },
  },
  transpileDependencies: ['vuetify'],

  pluginOptions: {
    i18n: {
      locale: 'ru',
      fallbackLocale: 'ru',
      localeDir: 'locales',
      enableInSFC: false,
    },
  },
}
