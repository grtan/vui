module.exports = {
  plugins: {
    autoprefixer: {
      browsers: [
        'last 100 versions',
        'not ie <= 8'
      ]
    },
    pxtorem: {
      rootValue: 100,
      propList: ['*'],
      minPixelValue: 3,
      selectorBlackList: ['[vui-pc]']   // pc端样式不转换
    },
    url: {
      url: 'inline',
      maxSize: Math.MAX_VALUE,  // 不限制尺寸
      basePath: './'    // 相对引入图片的css文件路径来查找图片
    }
  }
}