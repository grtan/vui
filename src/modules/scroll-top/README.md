# vui-scroll-top 指令

## 简介

利用 [EventTarget.addEventListener](https://developer.mozilla.org/zh-CN/docs/Web/API/EventTarget/addEventListener)和 [EventTarget.removeEventListener](https://developer.mozilla.org/zh-CN/docs/Web/API/EventTarget/removeEventListener)，通过监测 `scorll` 事件来实现对滚动行为的监测指令。

元素实现滚动的条件有两个：

1. 包含有子元素
2. 子元素的高度大于当前元素的高度，并且当前元素设置 overflow 为 scorll 或者 auto

**滚动监测是要在当前容器元素上的进行的**

* **`v-vui-scroll-top` 表示滚动触顶**

## 用法

```html
  <v-app>
    <v-father v-vui-scroll-top="onTop">
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
      console.log('scrollTop')
      // do your business
    }
  }
})
```

当 `v-child` 被滚动到顶部时，`onTop` 就会被调用。

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
    <v-father v-vui-scroll-top.once="onTop">
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

## 作者

morrain

## 更新日志

- v1.0.0 发布


