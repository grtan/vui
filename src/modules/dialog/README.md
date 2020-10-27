# dialog 对话框

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

```html
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
  import { Dialog as VuiDialog, Button as VuiButton } from '@game/vui';

  export default {
    components: {
      VuiDialog,
      VuiButton
    },
    ...
  };
</script>
```

## api

|     方法名     |   参数    |      描述      |
| :------------: | :-------: | :------------: |
| Dialog.dialog  | `options` |   显示对话框   |
|  Dialog.alert  | `options` | 显示提示对话框 |
| Dialog.confirm | `options` | 显示确认对话框 |

## options

|       名称        |    类型    | 必填 | 默认值  |              描述              |
| :---------------: | :--------: | :--: | :-----: | :----------------------------: |
|     className     |  `String`  | `N`  |   `-`   |           自定义类名           |
|       title       |  `String`  | `N`  |   `-`   |              标题              |
|      content      |  `String`  | `Y`  |   `-`   |            正文内容            |
|     allowHtml     | `Boolean`  | `N`  | `false` |       是否允许渲染 html        |
|     showClose     | `Boolean`  | `N`  | `false` | 是否显示关闭按钮（移动端无效） |
| showCancelButton  | `Boolean`  | `N`  |   `-`   |        是否显示取消按钮        |
| showConfirmButton | `Boolean`  | `N`  |   `-`   |        是否显示确定按钮        |
| cancelButtonText  |  `String`  | `N`  |   `-`   |          取消按钮文本          |
| confirmButtonText |  `String`  | `N`  |   `-`   |          确定按钮文本          |
|    beforeClose    | `Function` | `N`  |   `-`   |         关闭之前的回调         |

`pushState`、`closeOnClickOverlayer`与[overlayer 组件](../overlayer/README.md)一致

## 属性

|    名称    |   类型    | 必填 | 默认值  |                描述                 |
| :--------: | :-------: | :--: | :-----: | :---------------------------------: |
| show-close | `Boolean` | `N`  | `false` | 是否显示关闭按钮 **（移动端无效）** |
|   title    | `String`  | `N`  |   `-`   |                标题                 |

`v-model`、`light`、`push-state`、`close-on-click-overlayer`、`before-close`属性与[overlayer](../button/README.md)组件一致。

## 插槽

|  名称  | 必填 |    说明     |
| :----: | :--: | :---------: |
|  默认  | `Y`  |  正文内容   |
| header | `N`  | header 内容 |
| footer | `N`  | footer 内容 |

## 作者

tanxin

## 更新日志

- v1.0.0 发布
