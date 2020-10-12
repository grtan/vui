const path = require('path')
const glob = require('glob')
const fse = require('fs-extra')
const artTemplate = require('art-template')
const pascalcase = require('pascalcase')
// 哪几种模块类型
const types = {
  组件: 'component',
  插件: 'plugin'
}

function getModules(type) {
  return glob.sync(`src/${type}/!(_template)*`).map(pt => {
    return {
      name: pascalcase(pt.replace(/^.*\/([^/]*)$/g, '$1')),
      path: pt
    }
  })
}

// 生成入口文件
function genEntry() {
  const components = getModules('component')
  const directives = getModules('directive')
  const plugins = getModules('plugin')
  const packages = [...components, ...directives, ...plugins]

  const list = glob.sync(`src/{component,directive,plugin}/!(_template)*`).map(pt => {
    return require(path.resolve(__dirname, `../${pt}/meta.json`))
  })

  // ts入口文件
  fse.outputFileSync(
    path.resolve(__dirname, '../src/index.ts'),
    artTemplate(path.resolve(__dirname, 'template/entry.art'), {
      packages: packages.map(({ name, path: pt }) => {
        return {
          name,
          path: './' + path.relative('src', pt)
        }
      }),
      components,
      directives
    })
  )
  // scss入口文件
  fse.outputFileSync(
    path.resolve(__dirname, '../src/skin/index.scss'),
    artTemplate(path.resolve(__dirname, 'template/style-entry.art'), {
      list: components.map(({ path: pt }) => {
        return path.relative('src/skin', pt)
      })
    })
  )
  // demo manifest.ts
  fse.outputFileSync(
    path.resolve(__dirname, '../demo/src/manifest.ts'),
    `/* eslint-disable */\nexport default ${JSON.stringify(list, null, '  ')}`
  )
}

// 生成文档站点侧边栏列表
function genSidebar() {
  fse.outputFileSync(
    path.resolve(__dirname, '../.vuepress/modules.js'),
    `module.exports = [\n  ${getModules()
      .map(({ path: pt }) => {
        return `'/src/${path.basename(pt)}/'`
      })
      .join(',\n  ')}\n]\n`
  )
}

module.exports = {
  types,
  genEntry,
  genSidebar
}
