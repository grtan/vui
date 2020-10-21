# Avatar 头像

## 使用方法

```html
<template>
  <div>
    <vui-avatar src="xxx"></vui-avatar>
    <vui-avatar type="circle">user</vui-avatar>
  </div>
</template>

<script>
  import { Avatar as VuiAvatar } from 'vui';

  export default {
    components: {
      VuiAvatar
    },
    ...
  };
</script>
```

## 属性

| 名称 |                              类型                               | 必填 |  默认值   |                      描述                      |
| :--: | :-------------------------------------------------------------: | :--: | :-------: | :--------------------------------------------: |
| type |                     `square`&#124;`circle`                      | `N`  | `square`  |                    头像形状                    |
| size |          `big`&#124;`regular`&#124;`small`&#124;`mini`          | `N`  | `regular` |                    头像尺寸                    |
| src  |                            `String`                             | `N`  |    `-`    |                  头像图片地址                  |
| fit  | `fit`&#124;`contain`&#124;`cover`&#124;`none`&#124;`scale-down` | `N`  |  `cover`  | 当展示类型为图片的时候，设置图片如何适应容器框 |

## 插槽

|  名称   | 必填 |                   说明                    |
| :-----: | :--: | :---------------------------------------: |
| default | `N`  | 当不设置`src`时，通过该插槽来显示头像内容 |

## 作者

谭新<xin.tan@vivo.com>

## 更新日志

- v1.0.0 发布
