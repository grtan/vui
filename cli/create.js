const path = require('path')
const glob = require('glob')
const fse = require('fs-extra')
const inquirer = require('inquirer')
const paramCase = require('change-case').paramCase
const artTemplate = require('art-template')
const gitConfig = require('git-config')
const { types, categories, genEntry, genDocManifest, genDemoManifest } = require('./common')

module.exports = async function () {
  console.log('创建模块')

  const { type, category, enName, zhName } = await inquirer.prompt([
    {
      name: 'type',
      type: 'list',
      message: '请选择要创建模块的类型',
      choices: types.map(({ zhName }) => zhName)
    },
    {
      name: 'category',
      type: 'list',
      choices: categories,
      message: '请选择组件的类型',
      when(answer) {
        return answer.type === '组件'
      }
    },
    {
      name: 'enName',
      message() {
        return `请输入模块的英文名称`
      },
      validate(input = '') {
        if (!/^(?=[A-Z])[0-9a-zA-Z]+$/.test(input)) {
          return '只支持帕斯卡命名法，如MyAge'
        }

        if (fse.pathExistsSync(path.resolve(__dirname, `../src/modules/${paramCase(input)}`))) {
          return `该模块已存在，请重新输入`
        }

        return true
      }
    },
    {
      name: 'zhName',
      message() {
        return `请输入模块的中文名称`
      },
      validate(input) {
        return !!input || '请输入中文名称'
      }
    }
  ])
  const templatePath = path.resolve(__dirname, `./template/${types.find(({ zhName }) => zhName === type).enName}`)
  const modulePath = path.resolve(__dirname, `../src/modules/${paramCase(enName)}`)
  const config = gitConfig.sync()

  // 复制模板
  fse.copySync(templatePath, modulePath)

  // 修改模板文件内容
  glob.sync(`${modulePath}/**/*.art`).map(pt => {
    fse.outputFileSync(
      pt,
      artTemplate(pt, {
        enName,
        lowerEnName: paramCase(enName),
        zhName,
        type,
        category,
        author: config.user
      })
    )
  })

  // 修改文件名
  fse.moveSync(`${modulePath}/demo/index.art`, `${modulePath}/demo/index.vue`)
  fse.moveSync(`${modulePath}/style/index.art`, `${modulePath}/style/index.scss`)
  fse.moveSync(`${modulePath}/index.art`, `${modulePath}/index.ts`)
  fse.moveSync(`${modulePath}/meta.art`, `${modulePath}/meta.json`)
  fse.moveSync(`${modulePath}/README.art`, `${modulePath}/README.md`)

  if (type === '组件') {
    fse.moveSync(`${modulePath}/component.art`, `${modulePath}/component.vue`)
  }

  genEntry()
  genDocManifest()
  genDemoManifest()
  console.log('创建成功')
}
