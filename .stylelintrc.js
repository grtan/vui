module.exports = {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-css-modules',
    'stylelint-config-sass-guidelines',
    'stylelint-prettier/recommended'
  ],
  plugins: ['stylelint-order'],
  rules: {
    // 不支持浏览器前缀，自行使用autoprefixer添加
    'at-rule-no-vendor-prefix': true,
    'media-feature-name-no-vendor-prefix': true,
    'property-no-vendor-prefix': true,
    'selector-no-vendor-prefix': true,
    'value-no-vendor-prefix': true,
    // 多行规则前总是有空行
    'rule-empty-line-before': [
      'always-multi-line',
      {
        except: ['first-nested'],
        ignore: ['after-comment']
      }
    ],
    // 最大嵌套深度
    'max-nesting-depth': [
      5,
      {
        ignoreAtRules: ['media', 'each', 'supports', 'include']
      }
    ],
    // 匹配规则中不限制选择器的个数
    'selector-max-compound-selectors': null,
    // 匹配规则中最多只能出现一个id选择器
    'selector-max-id': 1,
    // 禁止用元素选择器来修饰某个选择器
    'selector-no-qualifying-type': [
      true,
      {
        ignore: ['attribute', 'class']
      }
    ],
    // 类选择器模式，类名只能由小写字母、数字和连字符组成
    'selector-class-pattern': [
      '^[a-z0-9\\-_]+$',
      {
        message: '类名只能由小写字母、数字、中划线和下划线组成'
      }
    ],
    // 禁止未知的伪元素
    'selector-pseudo-element-no-unknown': [
      true,
      {
        // 兼容vue深度作用选择器
        ignorePseudoElements: ['v-deep']
      }
    ],
    // 禁止颜色名称
    'color-named': 'never',
    // url()中地址必须使用引号
    'function-url-quotes': 'always',
    // 能简写的属性尽量简写，禁止冗余的值
    'shorthand-property-no-redundant-values': true,
    // 规则集大括号里的内容排序方式
    'order/order': [
      [
        'custom-properties',
        'dollar-variables',
        {
          type: 'at-rule',
          name: 'extend'
        },
        {
          type: 'at-rule',
          name: 'include',
          hasBlock: false
        },
        'declarations',
        {
          type: 'at-rule',
          name: 'include',
          hasBlock: true
        },
        'rules'
      ]
    ],
    // 声明按属性按字母排序
    'order/properties-alphabetical-order': true
  }
}
