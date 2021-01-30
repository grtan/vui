// opts = {
//   modifier(name,importee,importer) {
//     return {
//       name: 'xxx',
//       path: 'xxx'
//     }
//   }
// }

module.exports = (opts = {}) => {
  return {
    postcssPlugin: 'postcss-at-rule',
    AtRule: {
      /**
       * 替换@规则的名称、路径
       * 目前只支持@import、@use、@forward，且支持@use "xxx" as xxx with ($xxx: xxx)写法
       */
      '*': async atRule => {
        if (!['import', 'use', 'forward'].includes(atRule.name)) {
          return
        }

        // 引入的模块路径，这里需要考虑有with时参数换行的情况
        const modulePath = atRule.params.replace(/^('|")([\s\S]*?)\1[\s\S]*$/g, '$2')
        // 别名部分
        const others = atRule.params.replace(/^('|")[\s\S]*?\1([\s\S]*)$/g, '$2')
        const { name, path } = (await opts.modifier(atRule.name, modulePath, atRule.source.input.file)) || {}

        atRule.name = name || atRule.name
        // @import不支持as别名
        atRule.params = `"${path || modulePath}"${atRule.name === 'import' ? '' : others}`
      }
    }
  }
}

module.exports.postcss = true
