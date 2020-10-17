# dialog 对话框

> 这里输入描述

## 使用方法

```html
<template>
  <vui-dialog v-model="show" title="标题">
    正文内容
    <template>
      <vui-button hue="primary">取消</vui-button>
      <vui-button type="gorgeous" hue="primary">确定</vui-button>
    </template>
  </vui-dialog>
</template>

<script>
  import { Dialog as VuiDialog, Button as VuiButton } from 'vui';

  export default {
    components: {
      VuiDialog,
      VuiButton
    },
    ...
  };
</script>
```

## 属性

|     名称     |                 类型                  | 必填 |  默认值  |                描述                 |
| :----------: | :-----------------------------------: | :--: | :------: | :---------------------------------: |
|  show-close  |               `Boolean`               | `N`  | `false`  | 是否显示关闭按钮 **（移动端无效）** |
|    title     |               `String`                | `N`  |   `-`    |                标题                 |
| header-align | `left` &#124; `center` &#124; `right` | `N`  | `center` |           header 对齐方式           |
| footer-align | `left` &#124; `center` &#124; `right` | `N`  | `center` |           footer 对齐方式           |

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
