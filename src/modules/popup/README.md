# Popup 弹出

## 使用方法

```vue
<template>
  <div>
    <button @click="show = true">popup</button>
    <vui-popup v-model="show" :before-close="onBeforeClose"> popup content </vui-popup>
  </div>
</template>

<script>
import { Popup } from '@game/vui';

export default {
  components: {
    VuiPopup: Popup
  },
  data () {
    return {
      show: false
    }
  }
  methods: {
    onBeforeClose (close) {
      console.log('do something before close.')
      setTimeout(() => {
        close()
      }, 1000)
    }
  }
  ...
};
</script>
```

::: run

```vue
<template>
  <div>
    <vui-button @click="show = true">{{ show ? '隐藏' : '显示' }}</vui-button>
    <vui-popup v-model="show" position="left" :before-close="onBeforeClose">
      <div class="content">点击蒙层关闭</div>
    </vui-popup>
  </div>
</template>

<script>
export default {
  data: {
    show: false
  },
  methods: {
    onBeforeClose(close) {
      this.$vui.confirm({
        content: '确定关闭弹层？',
        beforeClose(action, callback) {
          callback()
          close(action === 'confirm')
        }
      })
    }
  }
}
</script>

<style>
body {
  min-height: 200px;
}

.content {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background: #fff;
}
</style>
```

:::

## 属性

|      名称      |                        类型                        | 必填 |  默认值  |     描述     |
| :------------: | :------------------------------------------------: | :--: | :------: | :----------: |
|    v-model     |                     `Boolean`                      | `Y`  |   `-`    |   是否显示   |
|    position    | `bottom` &#124; `top` &#124; `left` &#124; `right` | `N`  | `bottom` | 内容弹出位置 |
| show-overlayer |                     `Boolean`                      | `N`  |  `true`  | 是否显示蒙层 |

`light`、`push-state`、`close-on-click-overlayer`、`before-close`、`appear`属性与 [Overlayer 组件](../overlayer/#属性)一致

## 插槽

|  名称   | 必填 |    说明    |
| :-----: | :--: | :--------: |
| default | `N`  | 显示的内容 |

## 作者

weixing <11101493@bbktel.com>

## 更新日志

- v2.1.0 发布
