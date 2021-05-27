<template>
  <vui-image :class="$style.root" :src="src" :delay="1000" type="image-demo-fade">
    <template #loading>
      <img :class="$style.loading" src="./image/test.jpg?thumb" />
    </template>
    <template #error>
      <div :class="$style.error">图片加载失败~</div>
    </template>
  </vui-image>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import VuiImage from '../component'
import image from './image/test.jpg?external'

@Component({
  components: {
    VuiImage
  }
})
export default class VComponent extends Vue {
  static title = '自定义loading效果'
  src = image
}
</script>

<style lang="scss" module>
.root {
  height: 500px;
  width: 100%;
}

.loading {
  display: block;
  filter: blur(5px);
  height: 100%;
  width: 100%;
}

.error {
  background: rgb(252, 105, 105);
}
</style>
