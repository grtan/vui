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
      files: ['*.html'],
      extends: ['standard', 'plugin:prettier/recommended', 'prettier/standard'],
      // 利用eslint-plugin-html解析script标签内容
      plugins: ['html'],
      env: {
        // 禁止node、es2021全局变量
        node: false,
        es2021: false
      },
      parserOptions: {
        /**
         * 非模块类型，这样script中的变量会解析为全局变量
         * 如果为<script type="module">，则需要设置成sourceType: 'module'
         */
        sourceType: 'script',
        // 只允许es5语法
        ecmaVersion: 5,
        ecmaFeatures: {
          jsx: false
        }
      }
    },
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
