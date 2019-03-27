const path = require('path')

module.exports = {
  presets: [
    '@vue/app'
  ],
  sourceType: 'unambiguous',
  plugins: [
    ['import', require('@vivo/vivo-ui/babel.import')],
    ['lib-import', {
      name: 'vui',
      path: path.join(__dirname, '../')
    }]
  ]
}
