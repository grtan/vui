# vui-intersect 指令

## 简介

[Intersection Observer API](https://developer.mozilla.org/zh-CN/docs/Web/API/Intersection_Observer_API)提供了一种异步检测目标元素与祖先元素或 viewport 相交情况变化的方法。

利用 Intersection Observer API 实现检测组件是否可见的自定义指令 `v-vui-interspect` 。表示元素交差状态发生变化时会触发回调函数，和 `v-vui-appear` 、`v-vui-disappear`相比是更通用的检测交差变化指令，可以自定义行为逻辑。

## 用法

```html
<v-app>
    <v-component v-vui-interspect="onInterspcet"></v-component>
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

当 `v-component` 可视性发生变化时会触发 `onInterspcet`。

* `v-vui-appear` 和 `v-vui-disappear` 事件处理函数没有参数。就纯粹的表示显示和消失的行为。
* `v-vui-interspect` 是通用的只要交差出现变化时就会触发回调，扩展能力更强，所以回调里的参数包括 entries、observer、 isIntersecting。其中 entries 和 observer 是 [Intersection Observer API](https://developer.mozilla.org/zh-CN/docs/Web/API/Intersection_Observer_API) 原生的回调参数，isIntersecting 表示要检测的组件是否有交差（可见）


## API

### 指令的值

| 类型 | 说明 |
| :---: | :-------: |
| `Function | { handler: Function, options?: IntersectionObserverInit }` | 要么直接是一个函数，要么是一个对象，对象包括 handler 和 options 两个参数 |

```html
<v-app>
    <v-component v-vui-interspect="{
        handler:onInterspcet,
        options: {threshold:[0.5]}
    }"></v-component>
</v-app>
```
```js
import Vue from 'vue'

export default Vue.extend({
  name: 'App',
  methods: {
    onInterspcet () {
      console.log('onInterspcet')
      // do your business
    }
  }
})
```

其中 options 会透传给 Intersection Observer API ，用于控制交差检测的条件。譬如上例中 `threshold:[0.5]` 表示当组件在视窗中交叉一半才会触发 `onInterspcet`。
更多说明请参考相应的文档：[Intersection Observer API](https://developer.mozilla.org/zh-CN/docs/Web/API/Intersection_Observer_API)

### 指令的参数


| 名称 | 类型 | 说明 |
| :---: | :---: | :-------: |
| once | `boolean` | 只回调一次 |


```html
  <v-app>
    <v-component v-vui-interspect.once="onInterspcet"></v-component>
  </v-app>
```
```js
import Vue from 'vue'

export default Vue.extend({
  name: 'App',
  methods: {
    onInterspcet () {
      console.log('onInterspcet')
      // do your business。 只会触发一次。
    }
  }
})
```

## 作者

morrain

## 更新日志

- v1.0.0 发布


