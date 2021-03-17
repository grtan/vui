# Dialog 对话框

> 这里输入描述

## 使用方法

```js
import { Dialog } from '@game/vui'

// 局部使用
Dialog.dialog({
  content: 'xxx'
})
Dialog.alert({
  content: 'xxx'
})
Dialog.confirm({
  content: 'xxx'
})

// 全局注册
Vue.use(Dialog)
Vue.$vui.dialog({
  content: 'xxx'
})
Vue.$vui.alert({
  content: 'xxx'
})
Vue.$vui.confirm({
  content: 'xxx'
})
// 组件内使用
this.$vui.dialog({
  content: 'xxx'
})
this.$vui.alert({
  content: 'xxx'
})
this.$vui.confirm({
  content: 'xxx'
})
```

```vue
<template>
  <vui-dialog v-model="show" title="标题">
    正文内容
    <template slot="footer">
      <vui-button hue="primary">取消</vui-button>
      <vui-button type="gorgeous" hue="primary">确定</vui-button>
    </template>
  </vui-dialog>
</template>

<script>
import { Dialog, Button } from '@game/vui';

export default {
  components: {
    VuiDialog: Dialog,
    VuiButton: Button
  },
  ...
};
</script>
```

::: run

```vue
<template>
  <div>
    <vui-dialog v-model="show" title="标题">
      正文内容
      <template slot="footer">
        <vui-button hue="primary" @click="onCancel">取消</vui-button>
        <vui-button type="gorgeous" hue="primary" @click="onConfirm">确定</vui-button>
      </template>
    </vui-dialog>
    <vui-button type="gorgeous" hue="primary" @click="show = !show">{{ show ? '隐藏' : '显示' }}</vui-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: false
    }
  },
  methods: {
    onCancel() {
      this.show = false
      this.$vui.toast('取消')
    },
    onConfirm() {
      this.show = false
      this.$vui.toast('确定')
    }
  }
}
</script>

<style>
body {
  min-height: 300px;
}
</style>
```

:::

## api

|     方法名     |   参数    |      描述      |
| :------------: | :-------: | :------------: |
| Dialog.dialog  | `options` |   显示对话框   |
|  Dialog.alert  | `options` | 显示提示对话框 |
| Dialog.confirm | `options` | 显示确认对话框 |

## options

|       名称        |       类型        |   必填   |                        默认值                         |                  描述                  |
| :---------------: | :---------------: | :------: | :---------------------------------------------------: | :------------------------------------: | ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
|     className     |     `String`      |   `N`    |                          `-`                          |               自定义类名               |
|       title       |     `String`      |   `N`    |                          `-`                          |                  标题                  |
|      content      |     `String`      |   `Y`    |                          `-`                          |                正文内容                |
|     allowHtml     |     `Boolean`     |   `N`    |                        `false`                        |           是否允许渲染 html            |
|     showClose     |     `Boolean`     |   `N`    |                        `false`                        |     是否显示关闭按钮（移动端无效）     |
| showCancelButton  |     `Boolean`     |   `N`    |                        `true`                         | 是否显示取消按钮，只对 dialog 方法有效 |
| showConfirmButton |     `Boolean`     |   `N`    |                        `true`                         | 是否显示确定按钮，只对 dialog 方法有效 |
| cancelButtonText  |     `String`      |   `N`    |                        `取消`                         |              取消按钮文本              |
| confirmButtonText |     `String`      |   `N`    |                        `确定`                         |              确定按钮文本              |
|    beforeClose    | `(action: 'other' | 'cancel' | 'confirm', close: (close?: boolean) => void) => void` |                  `N`                   | `(action, close) => close()` | 关闭之前的回调，`action`为 cancel 表示点击了取消按钮，为 confirm 表示点击了确定按钮，other 为其他方式；`close()`回调将会关闭对话框，`close(false)`会阻止关闭 |

`pushState`、`closeOnClickOverlayer`、`target`与[Overlayer](../overlayer/README.md)组件一致

## 属性

|    名称    |   类型    | 必填 | 默认值  |                描述                 |
| :--------: | :-------: | :--: | :-----: | :---------------------------------: |
| show-close | `Boolean` | `N`  | `false` | 是否显示关闭按钮 **（移动端无效）** |
|   title    | `String`  | `N`  |   `-`   |                标题                 |

`v-model`、`light`、`push-state`、`close-on-click-overlayer`、`before-close`属性与[Overlayer](../overlayer/README.md)组件一致。

## 插槽

|  名称   | 必填 |                     说明                     |
| :-----: | :--: | :------------------------------------------: |
| default | `Y`  |                   正文内容                   |
| header  | `N`  | header 内容，未设置 title 时显示 header 内容 |
| footer  | `N`  |                 footer 内容                  |

## 作者

谭新 <xin.tan@vivo.com>

## 更新日志

- v1.0.0 发布
