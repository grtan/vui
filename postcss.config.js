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
    }
  }
}