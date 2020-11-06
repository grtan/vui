/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')

module.exports = {
  devServer: {
    port: 3003
  },
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          require('postcss-pxtorem')({
            rootValue: 100,
            minPixelValue: 2,
            propList: ['*']
          })
        ]
      }
    }
  },
  chainWebpack: config => {
    // npm包优先从vui/demo/node_modules下查找
    config.resolve.modules.prepend(path.resolve(__dirname, 'node_modules'))
    // @符号指向vui/src目录
    config.resolve.alias.set('@', path.resolve(__dirname, '../src'))
    config.module.rule('eslint').exclude.add(path.resolve(__dirname, '../src'))
  }
}
