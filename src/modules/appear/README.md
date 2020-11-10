# vui-appear 指令

## 简介

[Intersection Observer API](https://developer.mozilla.org/zh-CN/docs/Web/API/Intersection_Observer_API)提供了一种异步检测目标元素与祖先元素或 viewport 相交情况变化的方法。

利用 Intersection Observer API 实现检测组件是否可见的自定义指令 `v-vui-appear`。

## 使用方法

```html
  <v-app>
    <v-component v-vui-appear="onAppear"></v-component>
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

其中 options 会透传给 Intersection Observer API ，用于控制交差检测的条件。譬如下例中 `threshold:[0.5]` 表示当组件出现在视窗中的一半才会触发 `onAppear`。
更多说明请参考相应的文档：[Intersection Observer API](https://developer.mozilla.org/zh-CN/docs/Web/API/Intersection_Observer_API)

```html
<v-app>
    <v-component v-vui-appear="{
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

### 指令的参数


| 名称 | 类型 | 说明 |
| :---: | :---: | :-------: |
| once | `boolean` | 只回调一次 |


```html
  <v-app>
    <v-component v-vui-appear.once="onAppear"></v-component>
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

## 作者

morrain

## 更新日志

- v1.0.0 发布


