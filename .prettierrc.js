module.exports = {
  // 句尾不加分号
  semi: false,
  // 单引号
  singleQuote: true,
  // 对象/数组最后一个元素不添加逗号
  trailingComma: 'none',
  // 单行最大字节宽度，英文字符占一个字节，中文通常占2个字节
  printWidth: 120,
  // 箭头函数只有一个参数时不使用括号
  arrowParens: 'avoid',
  overrides: [
    {
      files: ['**/*.css', '**/*.scss', '**/*.less'],
      options: {
        singleQuote: false
      }
    }
  ]
}
