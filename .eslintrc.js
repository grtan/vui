module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es6: true
  },
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 2020,
    ecmaFeatures: {
      jsx: true
    },
    // standard-with-typescript使用
    project: './tsconfig.json'
  },
  /**
   * standard-with-typescript中默认开启了eslint-config-standard
   * 同时对针对*.ts *.tsx文件进行typescript特有的校验
   */
  extends: [
    'standard-with-typescript',
    'plugin:prettier/recommended',
    'prettier/standard',
    'prettier/@typescript-eslint'
  ],
  rules: {
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/strict-boolean-expressions': 'off',
    '@typescript-eslint/no-implied-eval': 'off',
    '@typescript-eslint/restrict-template-expressions': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off'
  },
  overrides: [
    {
      files: ['**/*.vue'],
      extends: ['plugin:vue/recommended', 'prettier/vue'],
      parserOptions: {
        /**
         * 利用@typescript-eslint/parser来解析vue文件中的script部分
         * 这里有个问题，当lang="js"时，如果用ts语法也不会报错
         */
        parser: require.resolve('@typescript-eslint/parser'),
        extraFileExtensions: ['.vue']
      }
    }
  ]
}
