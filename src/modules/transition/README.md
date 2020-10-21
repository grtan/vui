# Transition 过渡

> 这里输入描述

## 使用方法

```html
<template>
  <vui-transition v-model="show" :title="title" @btn-click="onBtnClick"> 内容内容 </vui-transition>
</template>

<script>
  import { Transition as VuiTransition } from 'vui';

  export default {
    components: {
      VuiTransition
    },
    ...
  };
</script>
```

## 属性

| 名称 |   类型    | 必填 | 默认值 | 描述 |
| :--: | :-------: | :--: | :----: | :--: |
|  xx  | `Boolean` | `Y`  |  `-`   |  xx  |

## 插槽

| 名称 | 必填 | 说明 |
| :--: | :--: | :--: |
| 默认 | `Y`  | xxx  |

## 事件

| 名称 |      参数      | 说明 |
| :--: | :------------: | :--: |
| xxx  | `(arg1, arg2)` | xxx  |

## 注意

**这里填写注意事项**

## 作者

谭新<xin.tan@vivo.com>

## 更新日志

- v1.0.0 发布
- v1.0.1 修复 xx bug
- v1.1.0 新增 xx 功能
