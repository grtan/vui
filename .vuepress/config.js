const manifest = require('./manifest')

module.exports = {
  title: 'vui',
  description: 'vivo游戏事业部前端技术组vue组件库',
  // 过滤掉src/{{name}}目录
  patterns: ['src/**/*.md', 'docs/*.md', '*.md'],
  themeConfig: {
    nav: [
      {
        text: '更新日志',
        link: '/CHANGELOG'
      }
    ],
    sidebar: ['/docs/guide', '/docs/development', ...manifest],
    displayAllHeaders: true,
    sidebarDepth: 0,
    lastUpdated: '最近更新',
    smoothScroll: true,
    repoLabel: 'GitLab',
    repo: 'https://gitlab.vmic.xyz/game-common/vui'
  },
  plugins: [
    '@vuepress/plugin-back-to-top',
    {
      globalUIComponents: ['Demo']
    }
  ]
}
