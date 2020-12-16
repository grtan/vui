# Link 链接

## 使用方法

```vue
<template>
  <vui-link hue="primary" underline="false" href="#" disabled="false" size="regular">示例链接</vui-link>
</template>

<script>
import { Link } from '@game/vui';

export default {
  components: {
    VuiLink: Link
  },
  ...
};
</script>
```

::: run

```vue
<template>
  <div>
    <vui-link hue="primary" underline="false" href="#">示例链接</vui-link>
    <vui-link hue="success" href="#" disabled="true">示例链接</vui-link>
    <vui-link hue="fail" underline="false" href="#">示例链接</vui-link>
    <vui-link hue="regular" underline="false" href="#">示例链接</vui-link>
  </div>
</template>
```

:::

## 属性

|   名称    |                           类型                            | 必填 |  默认值   |     描述     |
| :-------: | :-------------------------------------------------------: | :--: | :-------: | :----------: |
|    hue    | `primary` &#124; `success` &#124; `fail` &#124; `regular` | `N`  | `regular` |   链接颜色   |
| underline |                         `Boolean`                         | `N`  |  `true`   | 是否有下划线 |
|   size    |    `big` &#124; `regular` &#124; `small` &#124; `mini`    | `N`  | `regular` |   链接尺寸   |
|   href    |                         `String`                          | `N`  |    ' '    |     链接     |
| disabled  |                         `Boolean`                         | `N`  |  `false`  |   是否禁用   |

## 插槽

|  名称   | 必填 |   说明   |
| :-----: | :--: | :------: |
| default | `Y`  | 链接文字 |

## 事件

| 名称  | 参数 |   说明   |
| :---: | :--: | :------: |
| click | `-`  | 点击事件 |

## 作者

魏星 <weixing.wx@vivo.com>

## 更新日志

- v2.1.0 发布（样式有问题，待后续优化）
