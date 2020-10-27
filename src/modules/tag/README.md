# Tag 标签

## 使用方法

```html
<template>
  <vui-tag type="gorgeous" hue="primary">标签一</vui-tag>
</template>

<script>
  import { Tag as VuiTag } from 'vui';

  export default {
    components: {
      VuiTag
    },
    ...
  };
</script>
```

## 属性

|   名称   |                           类型                            | 必填 |  默认值   |     描述     |
| :------: | :-------------------------------------------------------: | :--: | :-------: | :----------: |
|   type   |        `gorgeous` &#124; `plain` &#124; `regular`         | `N`  | `regular` |   标签类型   |
|   hue    | `primary` &#124; `success` &#124; `fail` &#124; `regular` | `N`  | `regular` |   标签色调   |
|   size   |    `big` &#124; `regular` &#124; `small` &#124; `mini`    | `N`  | `regular` | 标签尺寸大小 |
| closable |                         `Boolean`                         | `N`  |  `false`  |  是否可关闭  |

## 事件

| 名称  | 参数 |      说明      |
| :---: | :--: | :------------: |
| close | `-`  | 标签关闭时触发 |

## 作者

谭新<xin.tan@vivo.com>

## 更新日志

- v1.0.0 发布
