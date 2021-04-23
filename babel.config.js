module.exports = function (api) {
  api.cache(true)

  return {
    presets: [
      [
        '@babel/preset-env',
        {
          useBuiltIns: 'usage',
          corejs: '3.10'
        }
      ],
      '@vue/babel-preset-jsx'
    ],
    plugins: [
      [
        '@babel/plugin-transform-runtime',
        {
          useESModules: true
        }
      ]
    ]
  }
}
