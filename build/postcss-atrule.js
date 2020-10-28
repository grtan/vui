// opts = {
//   modifier(name,path) {
//     return {
//       name: 'xxx',
//       path: 'xxx'
//     }
//   }
// }

module.exports = (opts = {}) => {
  return {
    postcssPlugin: 'my-postcss-plugin',
    AtRule: {
      /**
       * 替换@规则的名称、路径
       * 目前只支持@import和@use，且支持@use的别名写法
       */
      '*': async atRule => {
        if (!['import', 'use'].includes(atRule.name)) {
          return
        }

        // 引入的模块路径
        const modulePath = atRule.params.replace(/\s+as\s+[^'"]+$/, '').replace(/^('|")|('|")$/g, '')
        // 别名部分
        const alias = atRule.params.replace(/^.*?(\s+as\s+[^'"]+)?$/, '$1')
        const { name, path } = (await opts.modifier(atRule.name, modulePath)) || {}

        atRule.name = name || atRule.name
        // @import不支持as别名
        atRule.params = `"${path || modulePath}"${atRule.name === 'import' ? '' : alias}`
      }
    }
  }
}

module.exports.postcss = true
