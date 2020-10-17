module.exports = function (api) {
  api.cache(true)

  return {
    presets: ['@babel/preset-env', '@vue/babel-preset-jsx'],
    plugins: [
      [
        '@babel/plugin-transform-runtime',
        {
          corejs: 3,
          useESModules: true
        }
      ]
    ]
  }
}
