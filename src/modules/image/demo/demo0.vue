<template>
  <vui-image
    :class="$style.root"
    :src="src"
    :loading="loading"
    :error="error"
    :delay="1000"
    type="image-demo-fade"
  ></vui-image>
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
  static title = '加载成功'
  src = 'http://img.88tph.com/f0/73/8HMovlq1EemFqwARMiynhQ-0.jpg!/watermark/url/L3BhdGgvbG9nby5wbmc/align/center'
  loading = loading
  error = error
}
</script>

<style lang="scss" module>
.root {
  height: 500px;
  width: 100%;
}
</style>
