# loadComponent 组件加载

> loadComponent是一个加载组件的工具方法，返回封装好的vue组件，通常用来加载组件时显示loading效果（或者骨架屏等），加载失败时显示error效果等，同时还支持过渡动画

## 使用方法

比如为页面显示骨架屏时配合webpack使用如下

```
import VueRouter from 'vue-router'
import { loadComponent } from 'vui'

// 全局配置，这里用require而不用import()是为了将Loading、Error组件打包到app.js里，避免异步加载
loadComponent.Loading = require('@/page/loading/index.vue')
loadComponent.Error = require('@/page/error/index.vue')
loadComponent.delay = 50
loadComponent.duration = 500
loadComponent.timeout = 10000
// v1.14.0+
loadComponent.transitionType = 'fade'
loadComponent.transitionDuration = 500
loadComponent.transitionAppear = false
// v1.15.0+已删除
loadComponent.transitionMode = 'out-in'

const router = new VueRouter({
  routes: [{
    name: 'home',
    path: '/',
    component: loadComponent({
      Component: () => import(/* webpackChunkName: "home" */ '@/page/home/index.vue'),
      // 针对单个路由设置
      Loading: require('@/page/loading2/index.vue'),
      Error: require('@/page/error2/index.vue'),
    })
  }, {
    name: 'list',
    path: '/list',
    component: loadComponent({
      Component: () => import(/* webpackChunkName: "list" */ '@/page/list/index.vue')
    })
  }]
})
```

## 参数

接受的参数是个对象，属性如下

|                            名称                            |   类型    | 必填  |   默认值   |                                                                                                                                 描述                                                                                                                                  |
| :--------------------------------------------------------: | :-------: | :---: | :--------: | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
|                         Component                          | `Object`  |  `Y`  |    `-`     |                                       需要加载的vue组件，支持vue组件的各种写法，除了[处理加载状态](https://cn.vuejs.org/v2/guide/components-dynamic-async.html#%E5%A4%84%E7%90%86%E5%8A%A0%E8%BD%BD%E7%8A%B6%E6%80%81)这种写法                                        |
|                          Loading                           | `Object`  |  `N`  |    `-`     |                                                                                                            loading组件，支持vue组件的各种写法，可全局配置                                                                                                             |
|                           Error                            | `Object`  |  `N`  |    `-`     |                                                                                                             error组件，支持vue组件的各种写法，可全局配置                                                                                                              |
|                           delay                            | `Number`  |  `N`  |   `100`    |                                                                                                   组件加载的时间超过`deley`时才显示loading组件，单位ms，可全局配置                                                                                                    |
|                          duration                          | `Number`  |  `N`  |   `500`    |                                                                                                              loading组件至少显示多久，单位ms，可全局配置                                                                                                              |
|                          timeout                           | `Number`  |  `N`  | `Infinity` |                                                                                                     组件加载的时间超过`timeout`时认为加载失败，单位ms，可全局配置                                                                                                     |
|                         customLoad                         | `Boolean` |  `N`  |  `false`   | 默认是以组件文件加载成功与否来判断加载是否成功的，如果组件需要异步请求数据来显示内容时，用户可以将该项设置为`true`，然后等异步数据请求完成后再通过组件`$emit('custom-load', status)`来触发加载完成事件，`status`为`true`表示加载成功，`false`表示加载失败。可全局配置 |
|               transitionType **(v1.14.0+)**                | `String`  |  `N`  |   `fade`   |                                                                                        过渡类型，与`cutover`组件的[type](/src/components/cutover/?id=属性)属性一致，支持自定义                                                                                        |
|             transitionDuration **(v1.14.0+)**              | `Number`  |  `N`  |   `300`    |                                                                                           过渡时间，与`cutover`组件的[duration](/src/components/cutover/?id=属性)属性一致。                                                                                           |
|              transitionAppear **(v1.14.0+)**               | `Boolean` |  `N`  |  `false`   |                                                                                         初始渲染是否过渡，与`cutover`组件的[appear](/src/components/cutover/?id=属性)属性一致                                                                                         |
| transitionMode **(v1.14.0+，v1.15.0已删除，默认同时生效)** | `String`  |  `N`  |    `-`     |                                                                                              过渡顺序，与`cutover`组件的[mode](/src/components/cutover/?id=属性)属性一致                                                                                              |

## 更新日志

* v1.15.2 修复组件容器高度塌陷的问题
* v1.15.0 修复`Component`组件会被创建两次的问题；删除`transitionMode`属性
* v1.14.0 新增过渡支持，修复`Component`组件加载失败后不再请求加载的问题
* v1.5.0 发布
