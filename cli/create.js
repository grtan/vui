const path = require('path')
const glob = require('glob')
const fse = require('fs-extra')
const inquirer = require('inquirer')
const render = require('json-templater/string')
const pascalcase = require('pascalcase')
const gitConfig = require('git-config')
const { types, genEntry, genSidebar } = require('./common')

module.exports = async function () {
  console.log('创建模块')

  const { type, enName, zhName } = await inquirer.prompt([
    {
      name: 'type',
      type: 'list',
      message: '请选择要创建模块的类型',
      choices: Object.keys(types)
    },
    {
      name: 'enName',
      message(answer) {
        return `请输入${answer.type}英文名称`
      },
      validate(input = '', answer) {
        if (!/^(?!\d)[0-9a-zA-Z]+$/.test(input)) {
          return '只能输入英文字母和数字，且不能以数字开头，请重新输入'
        }

        if (fse.pathExistsSync(path.resolve(__dirname, `../src/${types[answer.type]}/${input}`))) {
          return `该${answer.type}已存在，请重新输入`
        }

        return true
      }
    },
    {
      name: 'zhName',
      message(answer) {
        return `请输入${answer.type}中文名称`
      },
      validate(input) {
        return !!input || '请输入中国名称'
      }
    }
  ])
  const templatePath = path.resolve(__dirname, `./template/${types[type]}`)
  // const modulePath = templatePath.replace(/_template$/, enName)
  const modulePath = path.resolve(__dirname, `../src/${types[type]}/${enName}`)
  const config = gitConfig.sync()

  // 复制模板
  fse.copySync(templatePath, modulePath)
  // 修改文件名
  fse.moveSync(`${modulePath}/index.art`, `${modulePath}/index.ts`)
  fse.moveSync(`${modulePath}/README.art`, `${modulePath}/README.md`)

  if (type === '组件') {
    fse.moveSync(`${modulePath}/component.art`, `${modulePath}/component.vue`)
    fse.moveSync(`${modulePath}/meta.art`, `${modulePath}/meta.json`)
    fse.moveSync(`${modulePath}/demo/index.art`, `${modulePath}/demo/index.vue`)
    fse.moveSync(`${modulePath}/style/index.art`, `${modulePath}/style/index.scss`)
  }

  // 修改模板文件内容
  glob.sync(`${modulePath}/**/*.{ts,vue,scss,json,md}`).map(pt => {
    fse.outputFileSync(
      pt,
      render(fse.readFileSync(pt, 'utf8'), {
        user: config.user,
        enName,
        zhName,
        moduleName: pascalcase(enName),
        componentName: pascalcase(`vui-${enName}`),
        directiveName: `vui-${enName}`,
        type,
        author: config.user
      })
    )
  })

  // 生成入口文件
  genEntry()
  // // 生成文档站点侧边栏
  // genSidebar()
  // console.log('创建成功')
}
