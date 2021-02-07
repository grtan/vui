module.exports = {
  env: {
    browser: true,
    node: true,
    es2021: true
  },
  parserOptions: {
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  overrides: [
    {
      files: ['*.js', '*.jsx'],
      extends: ['standard', 'plugin:prettier/recommended', 'prettier/standard']
    },
    {
      files: ['*.ts', '*.tsx'],
      parserOptions: {
        // @typescript-eslint/parser使用
        project: './tsconfig.json'
      },
      extends: [
        /**
         * standard-with-typescript中默认开启了eslint-config-standard
         * 同时会对*.ts *.tsx文件进行ts特有的校验，但不会对vue进行ts校验
         */
        'standard-with-typescript',
        'plugin:prettier/recommended',
        'prettier/standard',
        'prettier/@typescript-eslint'
      ]
    },
    {
      files: ['*.vue'],
      parserOptions: {
        /**
         * 利用@typescript-eslint/parser来解析vue文件中的script部分
         * 这里有个问题，当lang="js"时，如果用ts语法也不会报错
         */
        parser: require.resolve('@typescript-eslint/parser'),
        extraFileExtensions: ['.vue'],
        // @typescript-eslint/parser使用
        project: './tsconfig.json'
      },
      extends: [
        'standard',
        /**
         * 因为standard-with-typescript只对*.ts *.tsx进行ts校验
         * 所以这里要使用@typescript-eslint/recommended进行ts校验
         * @typescript-eslint/recommended必须要放在vue/recommended前
         */
        'plugin:@typescript-eslint/recommended',
        'plugin:vue/recommended',
        'plugin:prettier/recommended',
        'prettier/standard',
        'prettier/@typescript-eslint',
        'prettier/vue'
      ]
    }
  ]
}
