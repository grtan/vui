<template>
  <vui-image :class="$style.root" :src="`${src}2`" :delay="1000" :lazy="true" type="image-demo-fade">
    <template #loading>
      <img :class="$style.loading" :src="`${src}?q=20`" />
    </template>
    <template #error>
      <div :class="$style.error">图片加载失败~</div>
    </template>
  </vui-image>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import VuiImage from '../component'

@Component({
  components: {
    VuiImage
  }
})
export default class VComponent extends Vue {
  static title = '自定义error效果'
  src = 'https://cdn-images-1.medium.com/max/1800/1*sg-uLNm73whmdOgKlrQdZA.jpeg'
}
</script>

<style lang="scss" module>
.root {
  height: 500px;
  width: 100%;
}

.loading {
  display: block;
  filter: blur(10px);
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
</style>
