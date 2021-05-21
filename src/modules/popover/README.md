# Popover 弹出框

> Popover 是一个通用的气泡弹出框，能支持自定义气泡弹出位置、轮廓样式以及背景颜色等。

## 使用方法

```vue
<template>
  <vui-popover :show="show">
    <div @mouseenter="show = true" @mouseleave="show = false">主体内容</div>
    <template #popover>弹框内容</template>
  </vui-popover>
</template>

<script>
import { Popover } from '@game/vui';

export default {
  components: {
    VuiPopover: Popover
  },
  ...
};
</script>
```

::: run

```vue
<template>
  <div>
    <!-- 自定义背景 -->
    <svg style="height: 0; position: absolute; width: 0" version="1.1" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="popover-background" cx="50%" cy="50%" r="50%">
          <stop offset="0%" style="stop-color: #f00; stop-opacity: 0.5" />
          <stop offset="100%" style="stop-color: #00f; stop-opacity: 1" />
        </radialGradient>
      </defs>
    </svg>
    <vui-popover :show="show" type="zoom">
      <vui-button @mouseenter.native="show = true" @mouseleave.native="show = false">鼠标移上来</vui-button>
      <template #popover>这是自定义的<br />弹框内容</template>
    </vui-popover>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: false
    }
  }
}
</script>

<style>
.vui-popover {
  margin: 100px 200px;
}

.vui-popover__content {
  transform-origin: center top;
}

/* 应用自定义背景 */
.vui-popover__path {
  fill: url('#popover-background');
}
</style>
```

:::

## 属性

|      名称       |                                                                                           类型                                                                                           | 必填 |  默认值  |                                                                                                                                            描述                                                                                                                                             |
| :-------------: | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :--: | :------: | :-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
|      show       |                                                                                        `boolean`                                                                                         | `Y`  |   `-`    |                                                                                                                                        是否显示弹框                                                                                                                                         |
|    placement    | `top`&#124;`top-start`&#124;`top-end`&#124;`bottom`&#124;`bottom-start`&#124;`bottom-end`&#124;`left`&#124;`left-start`&#124;`left-end`&#124;`right`&#124;`right-start`&#124;`right-end` | `N`  | `bottom` |                                                                                                                                        弹框显示位置                                                                                                                                         |
|     radius      |                                                                                         `number`                                                                                         | `N`  |   `6`    |                                                                                 弹框圆角大小，单位 px。**如果是移动端应用场景，该值是 viewport scale=1 时的大小，组件会自动转换成实际缩放比例时对应的大小**                                                                                 |
| triangle-width  |                                                                                         `number`                                                                                         | `N`  |   `13`   |                                                                                三角形尖角的宽，单位 px。**如果是移动端应用场景，该值是 viewport scale=1 时的大小，组件会自动转换成实际缩放比例时对应的大小**                                                                                |
| triangle-height |                                                                                         `number`                                                                                         | `N`  |   `7`    |                                                                                三角形尖角的高，单位 px。**如果是移动端应用场景，该值是 viewport scale=1 时的大小，组件会自动转换成实际缩放比例时对应的大小**                                                                                |
| triangle-offset |                                                                                         `number`                                                                                         | `N`  |   `5`    |                                                三角形距离最近圆角的偏移量，单位 px，只在 top/bottom/left/right-start/end 场景下才生效。**如果是移动端应用场景，该值是 viewport scale=1 时的大小，组件会自动转换成实际缩放比例时对应的大小**                                                 |
|     target      |                                                                                 `string`&#124;`Element`                                                                                  | `N`  |   `-`    | 弹框元素挂载的位置，`string` 类型表示合法 css 选择器，默认挂载在组件根结点下。**只有当弹框的层叠顺序不满足需求时才需要自定义 target，且此时弹框相对于视图窗口进行定位，要求自定义 target 及其所有祖先都必须是 static 定位，且 popover 组件最好不要受到 transform 影响，否则定位可能会出错** |

还支持`type`、`appear`属性，与 [Transition 组件](../transition/#属性)一致。

## 插槽

|  名称   | 必填 |   说明   |
| :-----: | :--: | :------: |
| default | `Y`  | 主体内容 |
| popover | `Y`  | 弹框内容 |

## 作者

谭新 <xin.tan@vivo.com>

## 更新日志

- v2.6.0 发布
