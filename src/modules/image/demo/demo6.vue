<template>
  <div :class="$style.root">
    <vui-image
      v-for="(src, index) in list"
      :key="index"
      :src="src"
      :loading="loading"
      :error="error"
      :delay="1000"
      :lazy="true"
      type="image-demo-fade"
    >
    </vui-image>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import VuiImage from '../component'
import loading from './image/loading.gif?inline'
import error from './image/error.jpeg?inline'

@Component({
  components: {
    VuiImage
  }
})
export default class VComponent extends Vue {
  static title = '懒加载'
  loading = loading
  error = error
  list = [
    'http://img.88tph.com/f0/73/8HMovlq1EemFqwARMiynhQ-0.jpg!/watermark/url/L3BhdGgvbG9nby5wbmc/align/center',
    'https://cdn-images-1.medium.com/max/1800/1*sg-uLNm73whmdOgKlrQdZA.jpeg',
    'http://img.mp.itc.cn/upload/20170220/3bde98f642f546be95b2d242994897aa_th.jpg',
    'http://pic.rmb.bdstatic.com/f54083119edfb83c4cfe9ce2eeebc076.jpeg',
    'http://pic.rmb.bdstatic.com/f54083119edfb83c4cfe9ce2eeebc076.jpeg2',
    'http://pic14.nipic.com/20110529/7570613_004640647181_2.jpg'
  ]
}
</script>

<style lang="scss" module>
.root {
  > :global(.vui-image) {
    height: 500px;
    margin: 15px 0;
    width: 100%;
  }
}
</style>
