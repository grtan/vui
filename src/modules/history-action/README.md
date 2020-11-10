# HistoryAction 历史动作

> 判断页面的浏览动作是新建历史记录、前进、后退、刷新还是 replace 的插件，可以用在页面转场动画等场景中，通过判断页面是前进还是后退，应用不同的转场动效。

## 使用方法

```js
import Vue from 'vue'
import VueRouter from 'vue-router'
import { HistoryAction } from '@game/vui'

const router = new VueRouter({
  routes: []
})

Vue.use(HistoryAction, router)

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

在应用内如果需要使用 replace 来切换内部页面，请使用 vue-router 的 replace 功能，而不要使用 location.replace 或者 history.replaceState，以便能正确区分是 new 还是 replace 动作。

## 作者

谭新 <xin.tan@vivo.com>

## 更新日志

- v1.0.0 发布
