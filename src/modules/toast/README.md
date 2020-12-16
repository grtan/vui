# Toast 轻提示

## 使用方法

```js
import { Toast } from '@game/vui'

Toast('xxx', options)

// 全局使用
Vue.use(Toast)

Vue.$vui.toast('xxx', options)
// 或者在组件内调用
this.$vui.toast('xxx', options)
```

::: run

```vue
<template>
  <div>
    <vui-button @click="showToast1">toast 1</vui-button>
    <vui-button @click="showToast2">toast 2</vui-button>
  </div>
</template>

<script>
export default {
  methods: {
    showToast1() {
      this.$vui.toast('<em>toast 1</em>')
    },
    showToast2() {
      this.$vui.toast('<em>toast 2</em>', {
        allowHtml: true
        // duration: 3000000
      })
    }
  }
}
</script>

<style>
body {
  min-height: 150px;
}
</style>
```

:::

## options

|   名称    |   类型    | 必填 | 默认值  |       描述        |
| :-------: | :-------: | :--: | :-----: | :---------------: |
| duration  | `Number`  | `N`  | `3000`  | 显示时长，单位 ms |
| allowHtml | `Boolean` | `N`  | `false` | 是否允许渲染 html |
| className | `String`  | `N`  |   `-`   |    自定义类名     |

## 作者

谭新 <xin.tan@vivo.com>

## 更新日志

- v1.0.0 发布
