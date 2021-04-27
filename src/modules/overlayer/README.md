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
import { Overlayer } from '@game/vui';

export default {
  components: {
    VuiOverlayer: Overlayer
  },
  ...
};
</script>
```

::: run

```vue
<template>
  <div>
    <vui-overlayer v-model="show" v-slot="slotProps">
      <vui-transition class="content" type="zoom">
        <div v-show="slotProps.show">点击蒙层关闭</div>
      </vui-transition>
    </vui-overlayer>
    <vui-button @click="show = !show">{{ show ? '隐藏' : '显示' }}</vui-button>
  </div>
</template>

<script>
export default {
  data: {
    show: false
  }
}
</script>

<style>
body {
  min-height: 150px;
}

.content {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  color: #fff;
}
</style>
```

:::

## 属性

|           名称           |                      类型                       | 必填 |            默认值            |                         描述                         |
| :----------------------: | :---------------------------------------------: | :--: | :--------------------------: | :--------------------------------------------------: |
|         v-model          |                    `Boolean`                    | `Y`  |             `-`              |                       是否显示                       |
|          light           |                    `Boolean`                    | `N`  |           `false`            |                   是否为浅色遮罩层                   |
|        push-state        |                    `Boolean`                    | `N`  |            `true`            | 显示组件时是否新建历史记录，这样可通过返回键关闭蒙层 |
| close-on-click-overlayer |                    `Boolean`                    | `N`  |            `true`            |                点击蒙层时是否自动关闭                |
|       before-close       | `(callback: (close?: boolean) => void) => void` | `N`  | `callback => callback(true)` | 蒙层关闭前的回调方法，`callback(false)`将会阻止关闭  |
|   target **(v2.4.0+)**   |            `String` &#124; `Element`            | `N`  |            `body`            |      组件节点挂载的地方，默认会挂载到 body 尾部      |

`appear`属性与 vue 原生 transition 组件的[appear 属性](https://cn.vuejs.org/v2/guide/transitions.html#%E5%88%9D%E5%A7%8B%E6%B8%B2%E6%9F%93%E7%9A%84%E8%BF%87%E6%B8%A1)一致

## 插槽

|  名称   | 必填 |    说明    |
| :-----: | :--: | :--------: |
| default | `N`  | 显示的内容 |

## 作者

谭新 <xin.tan@vivo.com>

## 更新日志

- v2.4.0 新增`target`属性
- v2.0.0 发布
