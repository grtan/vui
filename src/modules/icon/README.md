# Icon 图标

> 利用 svg symbol 实现的图标组件。目前只支持单色图标，如有必要，后续都可实现多色图标。**注意，目前的图标是随意设置的，并非 UI 官方指定，后续会进行调整，请不要用在生产环境中**

## 使用方法

```vue
<template>
  <vui-icon name="back" class="my-icon"></vui-icon>
</template>

<script>
import { Icon } from '@game/vui';

export default {
  components: {
    VuiIcon: Icon
  },
  ...
};
</script>

<style>
.my-icon {
  /* 图标颜色 */
  color: #f00;
  /* 图标大小 */
  font-size: 20px;
}
</style>
```

::: run

```vue
<template>
  <div class="root">
    <div class="back"><vui-icon name="back"></vui-icon>back</div>
    <div class="download"><vui-icon name="download"></vui-icon>download</div>
    <div class="delete"><vui-icon name="delete"></vui-icon>delete</div>
    <div class="lock"><vui-icon name="lock"></vui-icon>lock</div>
    <div class="unlock"><vui-icon name="unlock"></vui-icon>unlock</div>
  </div>
</template>

<style>
.root {
  font-size: 20px;
}

.root > div {
  margin: 10px;
}

.download {
  color: red;
}

.lock {
  color: green;
  font-size: 40px;
}

.unlock {
  color: blue;
  font-size: 15px;
}
</style>
```

:::

## 属性

| 名称 |   类型   | 必填 | 默认值 |   描述   |
| :--: | :------: | :--: | :----: | :------: |
| name | `String` | `Y`  |  `-`   | 图标名称 |

## 作者

谭新 <xin.tan@vivo.com>

## 更新日志

- v2.3.0 发布
