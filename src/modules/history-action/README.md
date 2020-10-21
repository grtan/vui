# HistoryAction 历史动作

> 判断页面的浏览动作是新建历史记录、前进、后退、刷新还是 replace 的插件。

## 使用方法

```js
import { HistoryAction } from 'vui'

Vue.use(HistoryAction)
// 全局使用
console.log(Vue.$vui.historyAction)
// 组件中使用
console.log(this.$vui.historyAction)
```

## historyAction

|   值    |                            描述                             |
| :-----: | :---------------------------------------------------------: |
|   new   |  表示浏览当前路由页面时新建了历史记录（如`$router.push`）   |
| forward | 表示浏览当前路由页面时历史记录前进了（如`$router.forward`） |
|  back   |  表示浏览当前路由页面时历史记录后退了（如`$router.back`）   |
| refresh |           表示刷新浏览当前路由页面（如刷新页面）            |
| replace |     表示 replace 到当前路由页面（如`$router.replace`）      |

## 注意

在应用内如果需要使用 replace 来切换内部页面，请使用 vue-router 的 replace 功能，而不要使用 location.replace 或者 history.replaceState。

## 作者

谭新<xin.tan@vivo.com>

## 更新日志

- v1.0.0 发布
