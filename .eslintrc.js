module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true
  },
  // 只启用vue eslint插件必要的规则
  extends: ['plugin:vue/essential', 'standard'],
  plugins: ['vue']
}
