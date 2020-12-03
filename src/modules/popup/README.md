# Popup 弹出

> popup 弹层

## 使用方法

```vue
<template>
  <button @click="show = true">popup</button>
  <vui-popup
    v-model="show"
    direction="up"
    :overlayer="true"
    :light="false"
    :push-state="true"
    :close-on-click-overlayer="true"
    :before-close="onBeforeClose"
  >
    popup content
  </vui-popup>
</template>

<script>
import { Popup as VuiPopup } from '@game/vui';

export default {
  components: {
    VuiPopup
  },
  data () {
    return {
      show: false
    }
  }
  methods: {
    onBeforeClose () {
      console.log('do something before close.')
    }
  }
  ...
};
</script>
```

## 属性

|           名称           |                      类型                       | 必填 |            默认值            |                         描述                         |
| :----------------------: | :---------------------------------------------: | :--: | :--------------------------: | :--------------------------------------------------: |
|         v-model          |                    `Boolean`                    | `Y`  |             `-`              |                       是否显示                       |
|        direction         |                       `up                       | down |             left             |                        right`                        | `N` | `up` | 弹出方向 |
|        overlayer         |                    `Boolean`                    | `N`  |             `-`              |                      是否有蒙层                      |
|          light           |                    `Boolean`                    | `N`  |           `false`            |                    是否为浅色蒙层                    |
|        push-state        |                    `Boolean`                    | `N`  |            `true`            | 显示组件时是否新建历史记录，这样可通过返回键关闭蒙层 |
| close-on-click-overlayer |                    `Boolean`                    | `N`  |            `true`            |                点击蒙层时是否自动关闭                |
|       before-close       | `(callback: (close?: boolean) => void) => void` | `N`  | `callback => callback(true)` | 蒙层关闭前的回调方法，`callback(false)`将会阻止关闭  |

## 插槽

| 名称 | 必填 |      说明      |
| :--: | :--: | :------------: |
| 默认 | `N`  | 弹层显示的内容 |

## 作者

weixing <11101493@bbktel.com>

## 更新日志

- v1.0.0 发布
- v1.0.1 修复 xx bug
- v1.1.0 新增 xx 功能
