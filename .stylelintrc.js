module.exports = {
  extends: ['stylelint-config-standard', 'stylelint-config-sass-guidelines', 'stylelint-prettier/recommended'],
  rules: {
    // 'prettier/prettier': [true, { singleQuote: false }],
    // 'order/properties-alphabetical-order': null,
    'max-nesting-depth': 2
  }
}
