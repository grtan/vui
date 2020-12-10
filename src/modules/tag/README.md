# Tag 标签

## 使用方法

```vue
<template>
  <vui-tag type="gorgeous" hue="primary">标签一</vui-tag>
</template>

<script>
import { Tag } from '@game/vui';

export default {
  components: {
    VuiTag: Tag
  },
  ...
};
</script>
```

::: run

```vue
<template>
  <div>
    <vui-tag type="gorgeous" hue="primary">标签</vui-tag>
    <vui-tag type="plain" hue="primary">标签</vui-tag>
    <vui-tag type="regular" hue="primary">标签</vui-tag>
    <vui-tag type="gorgeous" hue="success">标签</vui-tag>
    <vui-tag type="gorgeous" hue="fail">标签</vui-tag>
    <vui-tag type="gorgeous" hue="regular">标签</vui-tag>
  </div>
</template>
```

:::

## 属性

| 名称 |                           类型                            | 必填 |  默认值   |     描述     |
| :--: | :-------------------------------------------------------: | :--: | :-------: | :----------: |
| type |        `gorgeous` &#124; `plain` &#124; `regular`         | `N`  | `regular` |   标签类型   |
| hue  | `primary` &#124; `success` &#124; `fail` &#124; `regular` | `N`  | `regular` |   标签色调   |
| size |    `big` &#124; `regular` &#124; `small` &#124; `mini`    | `N`  | `regular` | 标签尺寸大小 |

## 作者

谭新 <xin.tan@vivo.com>

## 更新日志

- v2.0.0 发布
