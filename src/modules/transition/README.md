# Transition 过渡

## 使用方法

```vue
<template>
  <div>
    <!--单个元素-->
    <vui-transition type="zoom">
      <div v-show="show">元素内容</div>
    </vui-transition>

    <!--多个元素-->
    <vui-transition type="popup-bottom">
      <div key="1" v-if="value === 1">元素内容</div>
      <div key="2" v-else-if="value === 2">元素内容</div>
      <div key="3" v-else>元素内容</div>
    </vui-transition>

    <!--自定义过渡-->
    <vui-transition type="custom">
      <div v-show="show">custom</div>
    </vui-transition>
  </div>
</template>

<script>
import { Transition } from '@game/vui';

export default {
  components: {
    VuiTransition: Transition
  },
  ...
};
</script>

<style lang="scss">
.custom-enter,
.custom-leave-to {
  transform: rotate(90deg);
}

.custom-enter-active,
.custom-leave-active {
  transform-origin: left bottom;
  transition: transform 300ms;
}
</style>
```

::: run

```vue
<template>
  <div>
    <vui-button @click="el = 1">元素1</vui-button>
    <vui-button @click="el = 2">元素2</vui-button>
    <vui-button @click="el = 3">元素3</vui-button>
    <vui-transition class="box" type="custom">
      <div class="el1" key="1" v-if="el === 1">元素1</div>
      <div class="el2" key="2" v-else-if="el === 2">元素2</div>
      <div class="el3" key="3" v-else>元素3</div>
    </vui-transition>
  </div>
</template>

<script>
export default {
  data: {
    el: 1
  }
}
</script>

<style>
.box {
  margin: 30px;
}

.el1,
.el2,
.el3 {
  height: 100px;
}

.el1 {
  background: grey;
}

.el2 {
  background: green;
}

.el3 {
  background: red;
}

.custom-enter,
.custom-leave-to {
  transform: rotate(90deg);
  opacity: 0;
}

.custom-enter-active,
.custom-leave-active {
  transform-origin: left bottom;
  transition: transform 300ms, opacity 300ms;
}
</style>
```

:::

## 属性

|   名称   |                                                                                       类型                                                                                        | 必填 | 默认值  |       描述       |
| :------: | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :--: | :-----: | :--------------: |
|   type   | `String`**(自定义值，v2.1.0+)** &#124; `fade` &#124; `zoom` &#124; `popup-bottom` &#124; `popup-top` &#124; `popup-left` &#124; `popup-right` &#124; `slide-hz` &#124; `slide-vt` | `N`  | `fade`  |     动画类型     |
| disabled |                                                                                     `Boolean`                                                                                     | `N`  | `false` | 是否禁用过渡动画 |

其他`appear`、`mode`等属性支持跟 vue 内置 [transition](https://cn.vuejs.org/v2/api/#transition) 组件一致。

## 插槽

|  名称   | 必填 |             说明             |
| :-----: | :--: | :--------------------------: |
| default | `Y`  | 过渡的元素，同时只能存在一个 |

## 事件

跟 vue 内置 [transition](https://cn.vuejs.org/v2/api/#transition) 组件事件一致。

## 作者

谭新 <xin.tan@vivo.com>

## 更新日志

- v2.1.0 `type`属性支持自定义值
- v2.0.0 发布
