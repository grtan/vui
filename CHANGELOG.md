# [1.16.0](http://gitlab.vmic.xyz/game-fed/vui/compare/v1.15.2...v1.16.0) (2019-11-29)


### Features

* **upload:** 新增upload组件 ([fabf61a](http://gitlab.vmic.xyz/game-fed/vui/commit/fabf61a))



## [1.15.2](http://gitlab.vmic.xyz/game-fed/vui/compare/v1.15.1...v1.15.2) (2019-11-15)


### Bug Fixes

* **cutover,loadComponent:** 修复cutover第一个过渡元素高度为`0`时样式错乱、`duration`为`0`时依然应用过渡效果导致闪烁的问题；修复loadComponent中组件容器高度塌陷的问题 ([c540b18](http://gitlab.vmic.xyz/game-fed/vui/commit/c540b18))



## [1.15.1](http://gitlab.vmic.xyz/game-fed/vui/compare/v1.15.0...v1.15.1) (2019-09-24)


### Bug Fixes

* 修复swiper、tab组件销毁时由于调用update方法而报错的问题 ([2cc9135](http://gitlab.vmic.xyz/game-fed/vui/commit/2cc9135))



# [1.15.0](http://gitlab.vmic.xyz/game-fed/vui/compare/v1.14.0...v1.15.0) (2019-09-21)


### Features

* 新增国际化功能；switch组件新增funtouch os 9的风格；修复load-component会创建组件两次的问题；修复tab、swiper组件初始化时如果为隐藏状态，位置尺寸获取错误的问题 ([7680c8e](http://gitlab.vmic.xyz/game-fed/vui/commit/7680c8e))



# [1.14.0](http://gitlab.vmic.xyz/game-fed/vui/compare/v1.13.1...v1.14.0) (2019-08-29)


### Features

* swiper组件新增slideSpeed属性；load-component新增过渡支持，且修复`Component`组件加载失败后不再请求加载的问题；cutover组件暴露过渡的js钩子事件 ([5abdc31](http://gitlab.vmic.xyz/game-fed/vui/commit/5abdc31))



## [1.13.1](http://gitlab.vmic.xyz/game-fed/vui/compare/v1.13.0...v1.13.1) (2019-08-28)


### Bug Fixes

* **swiper:** 解决swiper组件循环模式下只有单个swiper-item时key冲突的问题，同时swiper新增cloneNumber属性 ([60a99b4](http://gitlab.vmic.xyz/game-fed/vui/commit/60a99b4))



# [1.13.0](http://gitlab.vmic.xyz/game-fed/vui/compare/v1.12.0...v1.13.0) (2019-08-27)


### Features

* **swiper:** swiper组件新增pos-change事件，swiper-item组件新增作用域插槽 ([d1537a8](http://gitlab.vmic.xyz/game-fed/vui/commit/d1537a8))



# [1.12.0](http://gitlab.vmic.xyz/game-fed/vui/compare/v1.11.0...v1.12.0) (2019-08-21)


### Features

* **icon:** icon组件改用svg图标方案，并去掉unicode属性 ([4cd5032](http://gitlab.vmic.xyz/game-fed/vui/commit/4cd5032))



# [1.11.0](http://gitlab.vmic.xyz/game-fed/vui/compare/v1.10.0...v1.11.0) (2019-08-14)


### Features

* **img:** img组件新增complete事件，且将src属性改为非必填 ([c9c8bcc](http://gitlab.vmic.xyz/game-fed/vui/commit/c9c8bcc))



# [1.10.0](http://gitlab.vmic.xyz/game-fed/vui/compare/v1.9.0...v1.10.0) (2019-08-12)


### Features

* **cutover:** cutover组件type属性新增slide-hz和slide-vt类型 ([5f5716e](http://gitlab.vmic.xyz/game-fed/vui/commit/5f5716e))



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
