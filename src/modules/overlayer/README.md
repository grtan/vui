# Overlayer 遮罩层

> 全局蒙层组件

## 使用方法

```vue
<template>
  <vui-overlayer v-model="show" v-slot="slotProps">
    <div v-show="slotProps.show">xxxx</div>
  </vui-overlayer>
</template>

<script>
import { Overlayer as VuiOverlayer } from '@game/vui';

export default {
  components: {
    VuiOverlayer
  },
  ...
};
</script>
```

## 属性

|           名称           |                      类型                       | 必填 |            默认值            |                         描述                         |
| :----------------------: | :---------------------------------------------: | :--: | :--------------------------: | :--------------------------------------------------: |
|         v-model          |                    `Boolean`                    | `Y`  |             `-`              |                       是否显示                       |
|          light           |                    `Boolean`                    | `N`  |           `false`            |                   是否为浅色遮罩层                   |
|        push-state        |                    `Boolean`                    | `N`  |            `true`            | 显示组件时是否新建历史记录，这样可通过返回键关闭蒙层 |
| close-on-click-overlayer |                    `Boolean`                    | `N`  |            `true`            |                点击蒙层时是否自动关闭                |
|       before-close       | `(callback: (close?: boolean) => void) => void` | `N`  | `callback => callback(true)` | 蒙层关闭前的回调方法，`callback(false)`将会阻止关闭  |

## 插槽

|  名称   | 必填 |    说明    |
| :-----: | :--: | :--------: |
| default | `N`  | 显示的内容 |

## 作者

谭新 <xin.tan@vivo.com>

## 更新日志

- v1.0.0 发布
