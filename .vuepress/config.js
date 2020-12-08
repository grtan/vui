const manifest = require('./manifest')

module.exports = {
  title: 'Vui 2',
  description: 'vivo游戏事业部前端技术组vue组件库',
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
  extraWatchFiles: ['dist/vui.css', 'dist/vui.js'],
  plugins: [
    '@vuepress/back-to-top',
    {
      globalUIComponents: ['Demo']
    },
    [
      'run',
      {
        reverse: true,
        cssLabs: ['http://localhost:8001/vui.css'],
        jsLabs: ['http://localhost:8001/vui.js'],
        js: [
          'document.documentElement.classList.add("vuipc")',
          `Vue.use(VUI.default, {
            HistoryAction: {
              replace: function(){},
              afterEach: function(){}
            }
          })`
        ]
      }
    ]
  ]
}
