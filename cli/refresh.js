const { genEntry, genDocManifest, genDemoManifest } = require('./common')

module.exports = function () {
  genEntry()
  genDocManifest()
  genDemoManifest()
  console.log('清单刷新成功')
}
