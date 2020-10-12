const path = require('path')
const fse = require('fs-extra')
const inquirer = require('inquirer')
const { types, genEntry, genSidebar } = require('./common')

module.exports = async function () {
  let modulePath

  console.log('删除模块')
  await inquirer.prompt([
    {
      name: 'type',
      type: 'list',
      message: '请选择要删除模块的类型',
      choices: Object.keys(types)
    },
    {
      name: 'name',
      message(answer) {
        return `请输入要删除${answer.type}的英文名称`
      },
      validate(input = '', answer) {
        if (!/^(?=[a-z])[0-9a-z-]+$/.test(input)) {
          return '只能输入小写英文字母、数字和中划线，且只能以字母开头，请重新输入'
        }

        modulePath = path.resolve(__dirname, `../src/${types[answer.type]}/${input}`)

        if (!fse.pathExistsSync(modulePath)) {
          return `${answer.type}不存在，请重新输入`
        }

        return true
      }
    }
  ])

  fse.removeSync(modulePath)
  // 生成入口文件
  genEntry()
  // // 生成文档站点侧边栏
  // genSidebar()
  // console.log('删除成功')
}
