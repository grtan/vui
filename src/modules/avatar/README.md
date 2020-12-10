# Avatar 头像

## 使用方法

```vue
<template>
  <div>
    <vui-avatar src="xxx"></vui-avatar>
    <vui-avatar type="circle">user</vui-avatar>
  </div>
</template>

<script>
import { Avatar } from '@game/vui';

export default {
  components: {
    VuiAvatar: Avatar
  },
  ...
};
</script>
```

::: run

```vue
<template>
  <div class="title">
    <vui-avatar
      type="circle"
      src="https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2881847611,2057975433&fm=26&gp=0.jpg"
      >user</vui-avatar
    >
    <vui-avatar
      type="circle"
      size="small"
      src="https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2881847611,2057975433&fm=26&gp=0.jpg"
      >user</vui-avatar
    >
    <vui-avatar size="mini">{{ name }}</vui-avatar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: '李'
    }
  }
}
</script>

<style>
.title {
  color: #3eaf7c;
}
</style>
```

:::

## 属性

| 名称 |                               类型                               | 必填 |  默认值   |                      描述                      |
| :--: | :--------------------------------------------------------------: | :--: | :-------: | :--------------------------------------------: |
| type |                      `square`&#124;`circle`                      | `N`  | `square`  |                    头像形状                    |
| size |          `big`&#124;`regular`&#124;`small`&#124;`mini`           | `N`  | `regular` |                    头像尺寸                    |
| src  |                             `String`                             | `N`  |    `-`    |                  头像图片地址                  |
| fit  | `fill`&#124;`contain`&#124;`cover`&#124;`none`&#124;`scale-down` | `N`  |  `cover`  | 当展示类型为图片的时候，设置图片如何适应容器框 |

## 插槽

|  名称   | 必填 |                   说明                    |
| :-----: | :--: | :---------------------------------------: |
| default | `N`  | 当不设置`src`时，通过该插槽来显示文字内容 |

## 作者

谭新 <xin.tan@vivo.com>

## 更新日志

- v2.0.0 发布
