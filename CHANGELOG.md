# [1.9.0](http://gitlab.vmic.xyz/game-fed/vui/compare/v1.8.0...v1.9.0) (2019-08-08)


### Features

* 新增clock日期时钟；tab组件新增stickyIndex属性；track插件新增callback选项；解决swiper组件滑动不顺畅的问题 ([ae415c8](http://gitlab.vmic.xyz/game-fed/vui/commit/ae415c8))



# [1.8.0](http://gitlab.vmic.xyz/game-fed/vui/compare/v1.7.0...v1.8.0) (2019-08-02)


### Features

* 新增timer计时器工具，废弃原来的timer组件，修复transit页面退到后台时过渡停止的问题 ([3fa9cdb](http://gitlab.vmic.xyz/game-fed/vui/commit/3fa9cdb))
* **swiper:** swiper组件新增angle属性 ([75ccb94](http://gitlab.vmic.xyz/game-fed/vui/commit/75ccb94))



# [1.7.0](http://gitlab.vmic.xyz/game-fed/vui/compare/v1.6.0...v1.7.0) (2019-07-25)


### Features

* **track,img:** track插件埋点类型为expose时新增track_expose事件，img组件增加懒加载功能 ([38c4af6](http://gitlab.vmic.xyz/game-fed/vui/commit/38c4af6))



# [1.6.0](http://gitlab.vmic.xyz/game-fed/vui/compare/v1.5.1...v1.6.0) (2019-07-16)


### Features

* **img:** 新增img组件 ([993aafb](http://gitlab.vmic.xyz/game-fed/vui/commit/993aafb))



## [1.5.1](http://gitlab.vmic.xyz/game-fed/vui/compare/v1.5.0...v1.5.1) (2019-07-16)


### Bug Fixes

* **cutover:** 修复过渡时偶现 margin-left 被过渡的问题 ([9e5dd4e](http://gitlab.vmic.xyz/game-fed/vui/commit/9e5dd4e))
* **loadComponent:** 给加载的组件限制只添加一次beforeCreate钩子 ([0e75923](http://gitlab.vmic.xyz/game-fed/vui/commit/0e75923))



# [1.5.0](http://gitlab.vmic.xyz/game-fed/vui/compare/v1.4.0...v1.5.0) (2019-07-09)


### Features

* **loadComponent:** 新增loadComponent工具方法 ([29b4a04](http://gitlab.vmic.xyz/game-fed/vui/commit/29b4a04))



# [1.4.0](http://gitlab.vmic.xyz/game-fed/vui/compare/v1.3.3...v1.4.0) (2019-07-06)


### Features

* **track:** 新增track插件 ([3bf402d](http://gitlab.vmic.xyz/game-fed/vui/commit/3bf402d))



## [1.3.3](http://gitlab.vmic.xyz/game-fed/vui/compare/v1.3.2...v1.3.3) (2019-07-02)


### Bug Fixes

* 解决picker组件滚动时列宽变化的问题（设置每列宽度始终相等）；解决3d样式时当容器尺寸变化时选项过于密集的问题；解决构建出来的css文件里包含模板字符串的问题 ([6c32296](http://gitlab.vmic.xyz/game-fed/vui/commit/6c32296))



## [1.3.2](http://gitlab.vmic.xyz/game-fed/vui/compare/v1.3.1...v1.3.2) (2019-06-26)


### Bug Fixes

* **pagination:** 修复页码输入框为空时，enter键还有效的问题 ([f450931](http://gitlab.vmic.xyz/game-fed/vui/commit/f450931))



## [1.3.1](http://gitlab.vmic.xyz/game-fed/vui/compare/v1.1.0...v1.3.1) (2019-06-26)


### Bug Fixes

* **cache:** 添加recordScrollPosition属性来修复缓存页面没法恢复滚动位置的问题 ([7b96ceb](http://gitlab.vmic.xyz/game-fed/vui/commit/7b96ceb))



# [1.3.0](http://gitlab.vmic.xyz/game-fed/vui/compare/v1.1.0...v1.3.0) (2019-06-25)


### Features

* **tab,tab-item:** 新增tab组件 ([95848ad](http://gitlab.vmic.xyz/game-fed/vui/commit/95848ad))



# [1.2.0](http://gitlab.vmic.xyz/game-fed/vui/compare/v1.1.0...v1.2.0) (2019-06-22)


### Features

* **marquee:** 新增marquee组件 ([7d11f41](http://gitlab.vmic.xyz/game-fed/vui/commit/7d11f41))



# [1.1.0](http://gitlab.vmic.xyz/game-fed/vui/compare/v1.0.1...v1.1.0) (2019-06-18)


### Features

* **cutover:** cutover组件新增disabled属性 ([0d7abd2](http://gitlab.vmic.xyz/game-fed/vui/commit/0d7abd2))



## [1.0.1](http://gitlab.vmic.xyz/game-fed/vui/compare/v1.0.0...v1.0.1) (2019-06-18)


### Bug Fixes

* **cache:** cache组件render时区分是路由变化还是其他原因引起的，解决缓存复用错乱的问题 ([fc28fe9](http://gitlab.vmic.xyz/game-fed/vui/commit/fc28fe9))



# 1.0.0 (2019-05-24)


### Features

* 初始化 ([75d64c3](https://gitlab.vmic.xyz/game-fed/vui/commit/75d64c3))
