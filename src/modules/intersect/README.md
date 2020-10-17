# 交差检测指令

## 简介

[Intersection Observer API](https://developer.mozilla.org/zh-CN/docs/Web/API/Intersection_Observer_API)提供了一种异步检测目标元素与祖先元素或 viewport 相交情况变化的方法。

利用 Intersection Observer API 实现检测组件是否可见的自定义指令。

目前实现的指令有：`v-appear`、`v-disappear`、`v-interspect`。
* **`v-appear` 表示元素可见或者从不可见到可见时会触发回调函数**
* **`v-disappear` 表示元素每次从可见到不可见时会触发回调函数**
* **`v-interspect` 表示元素交差状态发生变化时会触发回调函数，是更通用的检测交差变化指令**

## 用法

```html
  <v-app>
    <v-component v-appear="onAppear"></v-component>
  </v-app>
```
```js
import Vue from 'vue'

export default Vue.extend({
  name: 'App',
  methods: {
    onAppear () {
      console.log('appear')
      // do your business
    }
  }
})
```

当 `v-component` 出现在视窗时（包括不需要滚动本身就会显示在视窗，以及滚动到可见）会触发 `onAppear`。通常用于组件的曝光等业务场景。

## API

### 指令的值

| 类型 | 说明 |
| :---: | :-------: |
| `Function | { handler: Function, options?: IntersectionObserverInit }` | 要么直接是一个函数，要么是一个对象，对象包括 handler 和 options 两个参数 |

```html
<v-app>
    <v-component v-appear="{
        handler:onAppear,
        options: {threshold:[0.5]}
    }"></v-component>
</v-app>
```
```js
import Vue from 'vue'

export default Vue.extend({
  name: 'App',
  methods: {
    onAppear () {
      console.log('appear')
      // do your business
    }
  }
})
```

其中 options 会透传给 Intersection Observer API ，用于控制交差检测的条件。譬如上例中 `threshold:[0.5]` 表示当组件出现在视窗中的一半才会触发 `onAppear`。
更多说明请参考相应的文档：[Intersection Observer API](https://developer.mozilla.org/zh-CN/docs/Web/API/Intersection_Observer_API)

### 指令的参数


| 名称 | 类型 | 说明 |
| :---: | :---: | :-------: |
| once | `boolean` | 只回调一次 |


```html
  <v-app>
    <v-component v-appear.once="onAppear"></v-component>
  </v-app>
```
```js
import Vue from 'vue'

export default Vue.extend({
  name: 'App',
  methods: {
    onAppear () {
      console.log('appear')
      // do your business。 只会触发一次。常用于曝光
    }
  }
})
```

## 回调参数

* `v-appear` 和 `v-disappear` 事件处理函数没有参数。就纯粹的表示显示和消失的行为。
* `v-interspect` 是通用的只要交差出现变化时就会触发回调，扩展能力更强，所以回调里的参数包括 entries、observer、 isIntersecting。其中 entries 和 observer 是 [Intersection Observer API](https://developer.mozilla.org/zh-CN/docs/Web/API/Intersection_Observer_API) 原生的回调参数，isIntersecting 表示要检测的组件是否有交差（可见）


```html
<v-app>
    <v-component v-interspect="onInterspcet"></v-component>
</v-app>
```
```js
import Vue from 'vue'

export default Vue.extend({
  name: 'App',
  methods: {
    onInterspcet (entries, observer, isIntersecting) {
      console.log('onInterspcet')
      // do your business
    }
  }
})
```


