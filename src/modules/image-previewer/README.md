# ImagePreviewer 图片预览

> ImagePreviewer 是基于[PhotoSwipe](https://photoswipe.com/)封装的图片预览组件。

## 使用方法

### 无缩略图

```vue
<template>
  <div>
    <vui-button type="gorgeous" hue="primary" @click="index = 0">显示</vui-button>
    <vui-image-previewer v-model="index" :list="list"></vui-image-previewer>
  </div>
</template>

<script>
import { ImagePreviewer, Button } from '@game/vui'

export default {
  components: {
    VuiImagePreviewer: ImagePreviewer,
    VuiButton: Button
  },
  data() {
    return {
      index: -1,
      list: [
        {
          src: 'https://shopstatic.vivo.com.cn/vivoshop/commodity/25/10002225_1608884553180_750x750.png.webp',
          title: '这是一段<strong>描述文本</strong>'
        },
        {
          // msrc: 'https://farm4.staticflickr.com/3894/15008518202_b016d7d289_m.jpg',
          src: 'https://farm4.staticflickr.com/3894/15008518202_c265dfa55f_h.jpg'
          // w: 1600,
          // h: 1600
        },
        {
          // msrc: 'https://farm6.staticflickr.com/5591/15008867125_68a8ed88cc_m.jpg',
          src: 'https://farm6.staticflickr.com/5591/15008867125_b61960af01_h.jpg',
          w: 1600,
          h: 1068
        },
        {
          msrc: 'https://farm6.staticflickr.com/5584/14985868676_4b802b932a_m.jpg',
          src: 'https://farm6.staticflickr.com/5584/14985868676_b51baa4071_h.jpg',
          w: 1600,
          h: 1066
        },
        {
          src: 'https://farm4.staticflickr.com/3920/15008465772_d50c8f0531_h.jpg',
          w: 1600,
          h: 1066
        },
        {
          src: 'https://goss1.cfp.cn/creative/vcg/800/new/VCG211310796397xx.jpeg',
          w: 800,
          h: 540
        }
      ]
    }
  },
  created() {
    // 动态添加图片
    setTimeout(() => {
      this.list.push(
        {
          msrc: 'https://farm3.staticflickr.com/2567/5697107145_3c27ff3cd1_m.jpg',
          sr: 'https://farm3.staticflickr.com/2567/5697107145_a4c2eaa0cd_o.jpg',
          w: 1024,
          h: 1024
        },
        {
          msrc: 'https://farm7.staticflickr.com/6175/6176698785_7dee72237e_m.jpg',
          sr: 'https://farm7.staticflickr.com/6175/6176698785_7dee72237e_b.jpg',
          w: 1024,
          h: 683
        }
      )
    }, 5000)
  }
}
</script>
```

### 有缩略图

::: run

```vue
<template>
  <div class="root">
    <div>点击小图进行预览</div>
    <vui-image-previewer
      v-model="index"
      :list="list"
      :get-thumbnail="getThumbnail"
      :options="{ history: false }"
    ></vui-image-previewer>
    <div class="list">
      <img v-for="(item, i) in list" :key="i" ref="item" class="item" :src="item.msrc" @click="index = i" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      index: -1,
      list: [
        {
          msrc: 'https://farm4.staticflickr.com/3894/15008518202_b016d7d289_m.jpg',
          src: 'https://farm4.staticflickr.com/3894/15008518202_c265dfa55f_h.jpg',
          title: '这是一段<strong>描述文本</strong>'
        },
        {
          msrc: 'https://farm6.staticflickr.com/5591/15008867125_68a8ed88cc_m.jpg',
          src: 'https://farm6.staticflickr.com/5591/15008867125_b61960af01_h.jpg',
          w: 1600,
          h: 1068
        },
        {
          msrc: 'https://farm6.staticflickr.com/5584/14985868676_4b802b932a_m.jpg',
          src: 'https://farm6.staticflickr.com/5584/14985868676_b51baa4071_h.jpg',
          w: 1600,
          h: 1066
        },
        {
          msrc: 'https://farm4.staticflickr.com/3920/15008465772_d50c8f0531_h.jpg',
          src: 'https://farm4.staticflickr.com/3920/15008465772_d50c8f0531_h.jpg',
          w: 1600,
          h: 1066
        },
        {
          msrc: 'https://goss1.cfp.cn/creative/vcg/800/new/VCG211310796397.jpeg',
          src: 'https://goss1.cfp.cn/creative/vcg/800/new/VCG211310796397.jpeg',
          w: 800,
          h: 540
        }
      ]
    }
  },
  methods: {
    getThumbnail(index) {
      return this.$refs.item[index]
    }
  }
}
</script>

<style>
.root {
  height: 400px;
}

.list {
  align-items: center;
  display: flex;
  flex-direction: column;
  margin-top: 20px;
}

.item {
  cursor: zoom-in;
  height: 80px;
  margin: 40px;
  width: 80px;
}
</style>
```

:::

## 属性

|         名称         |               类型               | 必填 | 默认值 |                                                                                                                                描述                                                                                                                                |
| :------------------: | :------------------------------: | :--: | :----: | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
|       v-model        |             `Number`             | `Y`  |  `-`   |                                                                                                                 当前预览图的位置，-1 表示关闭预览                                                                                                                  |
|         list         |             `Array`              | `Y`  |  `-`   |                                                                                                                             预览图列表                                                                                                                             |
|     list[{src}]      |             `String`             | `Y`  |  `-`   |                                                                                                                          预览图 url 地址                                                                                                                           |
|     list[{msrc}]     |             `String`             | `N`  |  `-`   |                                                                                             预览图对应缩略图 url 地址，提供缩略图时可让预览图有渐进式加载、显示的效果                                                                                              |
|      list[{w}]       |             `Number`             | `N`  |  `-`   |                                                                           预览图的宽度，单位为`px`。如果知道图片尺寸，请尽量设置，否则可能影响首次预览速度和缩略图位置跟踪效果，高度同理                                                                           |
|      list[{h}]       |             `Number`             | `N`  |  `-`   |                                                                                                                      预览图的高度，单位为`px`                                                                                                                      |
|    list[{title}]     |             `String`             | `N`  |  `-`   |                                                                                                                    预览图的描述文本，支持 html                                                                                                                     |
|       options        |             `Object`             | `N`  |  `-`   | `PhotoSwipe`的[Options](https://photoswipe.com/documentation/options.html)。不过对其做了一些修改，`showHideOpacity`、`tapToClose`、`history`默认值为`true`；`pinchToClose`、`closeOnVerticalDrag`默认值为`false`；而`index`、`getThumbBoundsFn`、`shareEl`已被废弃 |
|    get-thumbnail     | `(index: number) => HTMLElement` | `N`  |  `-`   |                                                                                     获取预览图对应的缩略图元素。如果设置，打开、关闭图片预览时会有缩略图位置跟踪效果，否则没有                                                                                     |
| target **(v2.6.0+)** |    `String` &#124; `Element`     | `N`  | `body` |                                                                                                            组件根节点挂载的地方，默认会挂载到 body 尾部                                                                                                            |

## 插槽

|  名称   | 必填 |                                                          说明                                                           |
| :-----: | :--: | :---------------------------------------------------------------------------------------------------------------------: |
| default | `N`  | 图片加载失败时的显示内容。如果需要点击某个元素重新加载图片的功能，则必须在该元素上添加类名`vui-image-previewer__reload` |

## 作者

谭新 <xin.tan@vivo.com>

## 更新日志

- v2.6.0 新增`target`属性
- v2.2.0 发布
