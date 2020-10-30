module.exports = {
  root: true,
  env: {
    browser: true
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off'
  },
  overrides: [
    {
      files: ['*.html'],
      extends: ['@vue/standard', 'plugin:prettier/recommended', 'prettier/standard'],
      plugins: ['html'],
      parserOptions: {
        sourceType: 'script',
        ecmaVersion: 5
      }
    },
    {
      files: ['*.{js,jsx,ts,tsx,vue}'],
      extends: [
        'plugin:vue/recommended',
        '@vue/standard',
        '@vue/typescript/recommended',
        'plugin:prettier/recommended',
        'prettier/vue',
        'prettier/standard',
        'prettier/@typescript-eslint'
      ],
      env: {
        node: true,
        es6: true
      },
      parserOptions: {
        sourceType: 'module',
        ecmaVersion: 2020
      },
      rules: {
        '@typescript-eslint/no-explicit-any': 'off'
      }
    }
  ]
}
