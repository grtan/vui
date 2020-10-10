# 滚动指令

## 简介

利用 [EventTarget.addEventListener](https://developer.mozilla.org/zh-CN/docs/Web/API/EventTarget/addEventListener)和 [EventTarget.removeEventListener](https://developer.mozilla.org/zh-CN/docs/Web/API/EventTarget/removeEventListener)，通过监测 `scorll` 事件来实现对滚动行为的监测指令。

元素实现滚动的条件有两个：

1. 包含有子元素
2. 子元素的高度大于当前元素的高度，并且当前元素设置 overflow 为 scorll或者auto

**滚动监测是要在当前容器元素上的进行的**

目前实现的指令有：`v-top`、`v-bottom`、`v-scroll`。
* **`v-top` 表示滚动触顶**
* **`v-bottom` 表示滚动触底**
* **`v-scroll` 表示只要触发滚动就会回调，由业务方自己处理业务逻辑**

## 用法

```html
  <v-app>
    <v-father v-scroll="onScroll">
        <v-child></child>
    </v-father>
  </v-app>
```
```js
import Vue from 'vue'

export default Vue.extend({
  name: 'App',
  methods: {
    onScroll (e) {
      console.log('scrollTop:',e.target.scrollTop)
      // do your business
    }
  }
})
```

当 `v-child` 被滚动时，`onScroll` 就会被调用。

## API

### 指令的值

| 类型 | 说明 |
| :---: | :-------: |
| `Function` | 回调函数 |


### 指令的参数

| 名称 | 类型 | 说明 |
| :---: | :---: | :-------: |
| once | `boolean` | 只回调一次 |


```html
  <v-app>
    <v-father v-top.once="onTop">
        <v-child></child>
    </v-father>
  </v-app>
```
```js
import Vue from 'vue'

export default Vue.extend({
  name: 'App',
  methods: {
    onTop () {
      // do your business， only called once
    }
  }
})
```

**`once` 参数对 `v-top`、`v-bottom`、`v-scroll`都适用**


## 回调参数

* `v-top` 和 `v-bottom` 事件处理函数没有参数。就纯粹的表示触顶和触底的行为。
* `v-scroll` 是通用的只要滚动时就会触发回调，扩展能力更强，所以回调里的参数包括 e、 rate。其中 e 是[EventTarget.addEventListener](https://developer.mozilla.org/zh-CN/docs/Web/API/EventTarget/addEventListener) 原生的回调参数，rate 表示子元素在容器内滚动的百分比。值为 `[0, 1]`,为0时等价于触顶，为1时等价于触底。


```html
  <v-app>
    <v-father v-scroll="onScroll">
        <v-child></child>
    </v-father>
  </v-app>
```
```js
import Vue from 'vue'

export default Vue.extend({
  name: 'App',
  methods: {
    onScroll (e, rate) {
      console.log('scrollTop:',e.target.scrollTop)
      // do your business
      if(rate > 0.5){
          // do your business .  譬如实现当帖子阅读过半时，出现广告或者提示
      }
    }
  }
})
```


