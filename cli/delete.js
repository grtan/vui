const path = require('path')
const fse = require('fs-extra')
const inquirer = require('inquirer')
const paramCase = require('change-case').paramCase
const { genEntry, genSidebar } = require('./common')

module.exports = async function () {
  let modulePath

  console.log('删除模块')
  await inquirer.prompt([
    {
      name: 'name',
      message: '请输入要删除模块的英文名称',
      validate(input = '') {
        if (!/^(?=[A-Z])[0-9a-zA-Z]+$/.test(input)) {
          return '只支持帕斯卡命名法，如MyAge'
        }

        modulePath = path.resolve(__dirname, `../src/modules/${paramCase(input)}`)

        if (!fse.pathExistsSync(modulePath)) {
          return '模块不存在，请重新输入'
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
