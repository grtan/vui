const { program } = require('commander')
const create = require('./create')
const del = require('./delete')

program.command('create').description('创建模块').action(create)
program.command('delete').description('删除模块').action(del)
program.parse(process.argv)
