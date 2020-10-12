/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')

module.exports = {
  chainWebpack: config => {
    config.resolve.alias
      .set('@', path.resolve(__dirname, '../src'))

    config.module
      .rule('eslint')
      // .uses
      // .clear()
      .exclude
      .add(path.resolve(__dirname, '../src'))
  }
}
