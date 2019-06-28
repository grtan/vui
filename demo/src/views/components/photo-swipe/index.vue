<template>
  <div>
    <img class="demo-img" v-for="(item, index) in items" :key="index" :src="item.src" width="150" @click="show(index)"/>
    <photo-swipe ref="photoSwipe" :options="options" :items="items" @on-close="onClose" @on-index-change="onIndexChange"></photo-swipe>
  </div>
</template>

<script>
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

<style>
</style>
