# photo-swipe 图片查看

> photo-swipe 是图片查看组件

## 使用方法

```html
<div>
  <img class="demo-img" v-for="(item, index) in items" :key="index" :src="item.src" width="150" @click="show(index)" />
  <photo-swipe ref="photoSwipe" :options="options" :items="items" @on-close="onClose" @on-index-change="onIndexChange"></photo-swipe>
</div>
```

```js
import { PhotoSwipe } from 'vui'
export default {
  components: {
    PhotoSwipe
  },
  data() {
    return {
      items: [
        {
          msrc: 'https://shopstatic.vivo.com.cn/vivoshop/commodity/42/10001242_1561098071267_750x750.png',
          src: 'https://shopstatic.vivo.com.cn/vivoshop/commodity/42/10001242_1561098071267_750x750.png',
          title:"这是一个标题"
        },
        {
          msrc: 'https://shopstatic.vivo.com.cn/vivoshop/commodity/67/10000467_1561340337877_750x750.png',
          src: 'https://shopstatic.vivo.com.cn/vivoshop/commodity/67/10000467_1561340337877_750x750.png'
        }
      ],
      options: {
        getThumbBoundsFn: function(index) {
          let thumbnail = document.querySelectorAll('.demo-img')[index],
            pageYScroll = window.pageYOffset || document.documentElement.scrollTop,
            rect = thumbnail.getBoundingClientRect()
          return { x: rect.left, y: rect.top + pageYScroll, w: rect.width }
        }
      }
    }
  },
  methods: {
    onClose() {
      console.log('关闭了')
    },
    getCurrentIndex() {
      console.log(this.$refs.photoSwipe.getCurrentIndex())
    },
    onIndexChange({ currentIndex }) {
      console.log(currentIndex)
    },
    show(index) {
      this.$refs.photoSwipe.openPhotoSwipe(index)
    }
  }
}
</script>
```

## 属性

|  名称   |  类型  | 必填 | 默认值 |                                                           描述                                                           |
| :-----: | :----: | :--: | :----: | :----------------------------------------------------------------------------------------------------------------------: |
|  items  | Array  | `Y`  |  `-`   |                                                    展示的图片列表信息                                                    |
| options | Object | `N`  |  `-`   | [photoswipe 的配置信息](https://photoswipe.com/documentation/options.html) {showTopBar:true //是否展示 topbar，默认显示} |

#### items 属性

| 名称  |  类型  | 必填 | 默认值 |    描述    |
| :---: | :----: | :--: | :----: | :--------: |
| msrc  | String | `N`  |  `-`   | 缩略图 url |
|  src  | String | `Y`  |  `-`   |  主图 url  |
|   w   | Number | `N`  |  `-`   | 图片的宽度 |
|   h   | Number | `N`  |  `-`   | 图片的高度 |
| title | String | `Y`  |  `-`   |    标题    |

## 事件

|       名称       |       参数       |            说明             |
| :--------------: | :--------------: | :-------------------------: |
|    @on-closes    |       `-`        |         关闭时调用          |
| @on-index-change | `{currentIndex}` | currentIndex 为当前的索引值 |

## 方法

|      名称       |   参数    |      说明      |
| :-------------: | :-------: | :------------: |
| openPhotoSwipe  | `(index)` |  打开的索引值  |
| getCurrentIndex |    `-`    |  当前的索引值  |
|      close      |    `-`    |      关闭      |
|      goTo       | `(index)` | 跳转到特定图片 |
|      prev       |    `-`    |  跳转到上一张  |
|      next       |    `-`    |  跳转到下一张  |
