# Image 图片

> img 是一个图片组件，支持自定义 loading 和加载失败效果，支持懒加载。还可以结合[image-thumbnail-loader](https://gitlab.vmic.xyz/game-common/image-thumbnail-loader)来制作更复杂的加载效果，如渐进式加载、点击后加载 gif 图等。

## 使用方法

```vue
<template>
  <vui-image :src="src" :loading="loading" :error="error" type="custom-transition-type"></vui-image>
</template>

<script>
import { Image } from '@game/vui';

export default {
  components: {
    VuiImage: Image
  },
  data() {
    return {
      src: 'http://xxx/xxx.png',
      loading: 'data:image/png;base64,xxxxx',
      error: 'data:image/png;base64,xxxxx'
    }
  },
  ...
};
</script>
```

::: run

```vue
<template>
  <div class="root">
    <vui-image
      v-for="n in 10"
      :src="src + (n % 2 ? '' : 'xx')"
      :delay="1000"
      :timeout="n === 1 ? 300 : Infinity"
      :lazy="true"
      type="image-fade"
    >
      <template #loading>
        <img class="loading" :src="`${src}?q=5`" />
      </template>
      <template #error>
        <div class="error">图片加载失败~</div>
      </template>
    </vui-image>
  </div>
</template>

<script>
export default {
  data() {
    return {
      src: 'https://cdn-images-1.medium.com/max/1800/1*sg-uLNm73whmdOgKlrQdZA.jpeg'
    }
  }
}
</script>

<style>
body {
  height: 500px;
}

.root {
  margin: auto;
  width: 400px;
}

.root > .vui-image {
  margin: 50px 0;
  height: 200px;
  width: 100%;
  vertical-align: top;
}

.loading {
  display: block;
  filter: blur(5px);
  height: 100%;
  width: 100%;
}

.error {
  align-items: center;
  background: rgb(252, 105, 105);
  display: flex;
  height: 100%;
  justify-content: center;
}

.image-fade-enter-active {
  opacity: 0.999;
  position: relative;
  transition: opacity 300ms;
  z-index: -1;
}

.image-fade-leave-active {
  transition: opacity 300ms;
}

.image-fade-leave-to {
  opacity: 0;
}
</style>
```

:::

## 属性

|  名称   |          类型           | 必填 |   默认值   |                                                                                  描述                                                                                  |
| :-----: | :---------------------: | :--: | :--------: | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
|   src   |        `string`         | `N`  |    `-`     |                                          要加载图片的 src。当图片为 gif 时，可以当用户点击后再设置该属性，从而实现点击后加载                                           |
| loading |        `string`         | `N`  |    `-`     |                              loading 效果图的 src（通常使用 base64 内嵌图片），如不设置该属性，也可通过`loading`插槽来自定义 loading 效果                              |
|  error  |        `string`         | `N`  |    `-`     |                                加载失败效果图的 src（通常使用 base64 内嵌图片），如不设置该属性，也可通过`error`插槽来自定义 error 效果                                |
|  delay  |        `number`         | `N`  |    `0`     |                                                              图片加载结束后延迟多久反馈加载结果，单位 ms                                                               |
| timeout |        `number`         | `N`  | `Infinity` |                                                           图片加载超时时间（包含`delay`），超时默认加载失败                                                            |
|  lazy   | `boolean`&#124;`object` | `N`  |  `false`   | 是否懒加载图片，`false`表示不懒加载图片，`true`表示懒加载图片，还可以设置成[intersect](../intersect/)指令值的[options](../intersect/#指令的值)属性那样来自定义曝光行为 |

还支持`type`、`appear`、`mode`属性，与 [Transition 组件](../transition/#属性)一致。

## 插槽

|  名称   | 必填 |                           说明                           |
| :-----: | :--: | :------------------------------------------------------: |
| loading | `N`  | 自定义 loading 效果，会覆盖`loading`属性指定的加载效果图 |
|  error  | `N`  |  自定义加载失败效果，会覆盖`error`属性指定的失败效果图   |

## 事件

|   名称   |                      参数                      |                                         说明                                         |
| :------: | :--------------------------------------------: | :----------------------------------------------------------------------------------: |
| loading  |                      `-`                       |                                  图片开始加载时触发                                  |
| finished | (status: `success`&#124;`fail`&#124;`timeout`) | 图片加载结束时触发，`success`表示加载成功，`fail`表示加载失败，`timeout`表示加载超时 |

## 作者

谭新 <xin.tan@vivo.com>

## 更新日志

- v2.7.0 发布
