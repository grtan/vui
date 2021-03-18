/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')
const glob = require('glob')

// 获取所有icon的信息
function getIconList() {
  const icons = []

  glob.sync(path.resolve(__dirname, '../src/modules/icon/image/*.svg')).forEach(pt => {
    icons.push(path.basename(pt, '.svg'))
  })

  return icons
}

module.exports = {
  publicPath: './',
  devServer: {
    port: 3012,
    disableHostCheck: true
  },
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          require('postcss-px-to-viewport')({
            viewportWidth: 1080,
            viewportUnit: 'vmin',
            fontViewportUnit: 'vmin',
            minPixelValue: 2
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
    // 内置svg处理排除icon图标
    config.module.rule('svg').exclude.add(path.resolve(__dirname, '../src/modules/icon/image'))
    // icon图标生成svg sprite
    config.module
      .rule('svg-sprite')
      .test(/\.svg$/)
      .include.add(path.resolve(__dirname, '../src/modules/icon/image'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'vui-icon-[name]',
        // 使用自定义svg sprite挂载处理
        spriteModule: require.resolve('./svg-sprite')
      })
    // 添加ICONS变量
    config.plugin('define').tap(args => {
      args[0].ICONS = JSON.stringify(getIconList())
      return args
    })
  }
}
