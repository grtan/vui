const path = require('path')
const glob = require('glob')
const fse = require('fs-extra')
const artTemplate = require('art-template')
const pascalCase = require('change-case').pascalCase
// 哪几种模块类型
const types = {
  组件: 'component',
  指令: 'directive',
  插件: 'plugin'
}

function getModules() {
  return glob.sync(`src/modules/*`).map(pt => {
    const meta = require(`../${pt}/meta.json`)
    const lowerEnName = pt.replace(/^.*\/([^/]*)$/g, '$1')

    return {
      ...meta,
      enName: pascalCase(lowerEnName),
      lowerEnName,
      path: pt
    }
  })
}

// 生成入口文件
function genEntry() {
  const modules = getModules()

  // ts入口文件
  fse.outputFileSync(
    path.resolve(__dirname, '../src/index.ts'),
    artTemplate(path.resolve(__dirname, 'template/entry.art'), {
      modules
    })
  )
  // scss入口文件
  fse.outputFileSync(
    path.resolve(__dirname, '../src/skin/index.scss'),
    artTemplate(path.resolve(__dirname, 'template/style-entry.art'), {
      modules
    })
  )
  // demo manifest.ts
  fse.outputFileSync(
    path.resolve(__dirname, '../demo/src/manifest.ts'),
    `/* eslint-disable */\nexport default ${JSON.stringify(modules, null, '  ')}`
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
