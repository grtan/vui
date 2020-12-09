/* eslint-disable prettier/prettier */
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
        js: [
          /**
           * 初始化js代码，函数体中不能包含单引号，否则vuepress-plugin-run拼接时会出错
           * `<vuepress-run v-bind='${JSON.stringify(attrs)}' code="${encodeURIComponent(htmlStr)}">`
           */
          `(${(function () {
            /**
             * 这里不能用document.createElement来动态添加script，因为是异步执行的，执行顺序不确定，而document.write是同步的
             * script结束标签必须要转义下，否则浏览器解析时标签会匹配错
             */
            document.write("<link rel=\"stylesheet\" href=\"//" + location.hostname + ":3010/vui.css\" />")
            // eslint-disable-next-line no-useless-escape
            document.write("<script src=\"//" + location.hostname + ":3010/vui.js\"><\/script>")
            document.write("<script>(" + (function () {
              // 设置vui为pc端样式
              document.documentElement.classList.add("vuipc")
              window.Vue.use(window.VUI.default, {
                HistoryAction: {
                  replace: function () {},
                  afterEach: function () {}
                }
              })
            // eslint-disable-next-line no-useless-escape
            }).toString() + ")()<\/script>")
          }).toString()})()`
        ]
      }
    ]
  ]
}
