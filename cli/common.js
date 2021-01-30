const path = require('path')
const glob = require('glob')
const fse = require('fs-extra')
const artTemplate = require('art-template')
const pascalCase = require('change-case').pascalCase
const version = require('../package.json').version

// 模块分类展示顺序
const types = [
  {
    zhName: '组件',
    enName: 'component'
  },
  {
    zhName: '指令',
    enName: 'directive'
  },
  {
    zhName: '插件',
    enName: 'plugin'
  },
  {
    zhName: '工具方法',
    enName: 'util'
  }
]

// 组件分类展示顺序
const categories = ['基础', '导航', '反馈', '数据输入', '数据展示', '过渡', '其他']

function getModules() {
  return glob
    .sync('src/modules/*', {
      ignore: ['src/modules/index.ts', 'src/modules/style']
    })
    .map(pt => {
      const meta = require(`../${pt}/meta.json`)
      const lowerEnName = pt.replace(/^.*\/([^/]*)$/g, '$1')

      return {
        ...meta,
        enName: pascalCase(lowerEnName),
        lowerEnName
      }
    })
}

// 生成入口文件
function genEntry() {
  const modules = getModules()

  // ts入口文件
  fse.outputFileSync(
    path.resolve(__dirname, '../src/modules/index.ts'),
    artTemplate(path.resolve(__dirname, 'template/entry.art'), {
      modules,
      version
    })
  )
  // scss入口文件
  fse.outputFileSync(
    path.resolve(__dirname, '../src/modules/style/index.scss'),
    artTemplate(path.resolve(__dirname, 'template/style-entry.art'), {
      modules
    })
  )
}

// 生成文档站点侧边栏列表
function genDocManifest() {
  const modules = []

  getModules().forEach(({ type, category, lowerEnName }) => {
    let typeObj = modules.find(({ title }) => title === type)

    if (!typeObj) {
      typeObj = {
        title: type,
        collapsable: false,
        children: []
      }
      modules.push(typeObj)
    }

    if (type !== '组件') {
      typeObj.children.push(`/src/modules/${lowerEnName}/`)
    } else {
      let categoryObj = typeObj.children.find(({ title }) => title === (category || '其他'))

      if (!categoryObj) {
        categoryObj = {
          title: category || '其他',
          collapsable: false,
          children: []
        }
        typeObj.children.push(categoryObj)
      }

      categoryObj.children.push(`/src/modules/${lowerEnName}/`)
    }
  })

  // 模块类别排序
  modules.sort((a, b) => {
    const list = types.map(({ zhName }) => zhName)

    return list.indexOf(a.title) - list.indexOf(b.title)
  })

  // 组件类别排序
  modules.forEach(({ title, children }) => {
    if (title !== '组件') {
      return
    }

    children.sort((a, b) => {
      return categories.indexOf(a.title) - categories.indexOf(b.title)
    })
  })

  fse.outputFileSync(
    path.resolve(__dirname, '../.vuepress/manifest.js'),
    `/* eslint-disable */\nmodule.exports = ${JSON.stringify(modules, null, '  ')}\n`
  )
}

// 生成demo模块列表
function genDemoManifest() {
  const modules = []

  getModules().forEach(item => {
    let typeObj = modules.find(({ type }) => type === item.type)

    if (!typeObj) {
      typeObj = {
        type: item.type,
        list: []
      }
      modules.push(typeObj)
    }

    if (item.type !== '组件') {
      typeObj.list.push({ ...item })
    } else {
      let categoryObj = typeObj.list.find(({ category }) => category === (item.category || '其他'))

      if (!categoryObj) {
        categoryObj = {
          category: item.category || '其他',
          list: []
        }
        typeObj.list.push(categoryObj)
      }

      categoryObj.list.push({ ...item })
    }
  })

  // 模块类别排序
  modules.sort((a, b) => {
    const list = types.map(({ zhName }) => zhName)

    return list.indexOf(a.type) - list.indexOf(b.type)
  })

  // 组件类别排序
  modules.forEach(({ type, list }) => {
    if (type !== '组件') {
      return
    }

    list.sort((a, b) => {
      return categories.indexOf(a.category) - categories.indexOf(b.category)
    })
  })

  fse.outputFileSync(
    path.resolve(__dirname, '../demo/src/manifest.ts'),
    `/* eslint-disable */\nexport default ${JSON.stringify(modules, null, '  ')}\n`
  )
}

module.exports = {
  types,
  categories,
  genEntry,
  genDocManifest,
  genDemoManifest
}
