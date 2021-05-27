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
          require('postcss-pxtorem')({
            rootValue: 100,
            minPixelValue: 2,
            propList: ['*'],
            selectorBlackList: [/^html\.vuipc(\s|$)/]
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

    /**
     * 常规图片缩略图
     * 先抽取缩略图再使用后续loader进行处理
     */
    config.module
      .rule('image-thumb')
      .test(/\.(png|jpe?g|webp)$/)
      .resourceQuery(/thumb/)
      .use('@vivo/image-thumbnail-loader')
      .loader('@vivo/image-thumbnail-loader')
      .options({
        percentage: 10
      })

    // gif缩略图
    config.module
      .rule('gif-thumb')
      .test(/\.gif$/)
      .resourceQuery(/thumb/)
      .use('@vivo/image-thumbnail-loader')
      .loader('@vivo/image-thumbnail-loader')
      .options({
        percentage: 100
      })

    // 重置图片loader
    const oldUrlLoader = config.module.rule('images').use('url-loader')

    config.module
      .rule('images')
      // 内联图片
      .oneOf('inline')
      .resourceQuery(/inline/)
      .use('url-loader')
      .loader(oldUrlLoader.get('loader'))
      .options({
        limit: Number.MAX_VALUE
      })
      .end()
      .end()
      // 外置图片
      .oneOf('external')
      .resourceQuery(/external/)
      .use('file-loader')
      .loader(oldUrlLoader.get('options').fallback.loader)
      .options(oldUrlLoader.get('options').fallback.options)
      .end()
      .end()
      // 生成图片并获取相关信息
      .oneOf('info')
      .resourceQuery(/info/)
      .use('sizeof-loader')
      .loader('sizeof-loader')
      .options({
        useFileLoader: true,
        name: oldUrlLoader.get('options').fallback.options.name
      })
      .end()
      .end()
      // 常规处理
      .oneOf('default')
      .use('url-loader')
      .loader(oldUrlLoader.get('loader'))
      .options(oldUrlLoader.get('options'))
      .end()
      .end()
      .uses.clear()
  }
}
