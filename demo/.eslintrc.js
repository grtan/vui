module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  globals: {
    //设置CONFIG全局变量，并且是不可更改的
    'CONFIG': false
  },
  rules: {
    //不要求使用 === 和 !==
    'eqeqeq': 0,
    //警告在return、throw、continue 和 break 语句之后出现不可达代码
    'no-unreachable': 1,
    // 不要求箭头函数的参数使用圆括号 
    'arrow-parens': 0,
    //不要求文件末尾空行
    'eol-last': 0,
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}