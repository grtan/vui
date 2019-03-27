module.exports = {
  plugins: {
    autoprefixer: {},
    'postcss-vivo-px2rem': {
      rootValue: 100,
      unitPrecision: 8,
      propWhiteList: [],
      replace: true,
      mediaQuery: false,
      minPixelValue: 2,
      exclude: ['vivo-ui']
    }
  }
}