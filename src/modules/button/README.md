# button 按钮

## 使用方法

```html
<template>
  <vui-button type="gradient" hue="primary">渐变按钮</vui-button>
</template>

<script>
  import {Button as VuiButton} from '@game/vui';

  export default {
    components: {
      VuiButton
    },
    ...
  };
</script>
```

## 属性

|   名称   |                                    类型                                    | 必填 |  默认值   |                                                          描述                                                          |
| :------: | :------------------------------------------------------------------------: | :--: | :-------: | :--------------------------------------------------------------------------------------------------------------------: |
|   type   | `gorgeous` &#124; `plain` &#124; `gradient` &#124; `text` &#124; `regular` | `N`  | `regular` | 按钮类型，`gorgeous`为实心按钮，`plain`为朴素按钮，`gradient`为实心渐变按钮，`text`为文字按钮，`regular`为常规线框按钮 |
|   hue    |         `primary` &#124; `success` &#124; `fail` &#124; `regular`          | `N`  | `regular` |                                                        按钮颜色                                                        |
|   size   |            `big` &#124; `regular` &#124; `small` &#124; `mini`             | `N`  | `regular` |                                                        按钮尺寸                                                        |
|  corner  |                  `regular` &#124; `round` &#124; `circle`                  | `N`  | `regular` |              按钮圆角，`regular`为方形按钮，`round`为圆角按钮，`circle`为圆形按钮，通常用在单个图标按钮上              |
|  block   |                                 `Boolean`                                  | `N`  |  `false`  |                                                     是否为块级按钮                                                     |
| disabled |                                 `Boolean`                                  | `N`  |  `false`  |                                                        是否禁用                                                        |

## 插槽

| 名称 | 必填 |   说明   |
| :--: | :--: | :------: |
| 默认 | `Y`  | 按钮内容 |

## 事件

| 名称  | 参数 |   说明   |
| :---: | :--: | :------: |
| click | `-`  | 点击事件 |

## 作者

tanxin

## 更新日志

- v1.0.0 发布
