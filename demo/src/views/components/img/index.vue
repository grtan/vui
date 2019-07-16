<template>
  <div>
    <p>加载成功</p>
    <v-img :class="$style.img" :src="src" :loading="loading" :error="error" :delay="2000"></v-img>
    <p>加载失败</p>
    <v-img :class="$style.img" :src="src+'2'" :loading="loading" :error="error" :delay="2000"></v-img>
    <p>自定义loading效果</p>
    <v-img :class="$style.img" :src="src" :delay="2000" type="cover">
      <div :class="$style.loading" slot="loading">正在加载图片...</div>
      <div :class="$style.error" slot="error">图片加载失败~</div>
    </v-img>
  </div>
</template>

<style module>
.img {
  margin: 0.2rem 0;
  width: 100%;
  height: 4rem;
}

.loading,
.error {
  font-size: 0.5rem;
  line-height: 4rem;
  text-align: center;
}

.loading {
  background: rgb(234, 233, 233);
}

.error {
  background: rgb(252, 105, 105);
}
</style>

<script>
import { Img } from 'vui'
import { setTimeout } from 'timers'

export default {
  components: {
    VImg: Img
  },
  data() {
    return {
      src: 'http://img.88tph.com/f0/73/8HMovlq1EemFqwARMiynhQ-0.jpg!/watermark/url/L3BhdGgvbG9nby5wbmc/align/center',
      loading: require('./loading.gif'),
      error: require('./error.jpeg')
    }
  },
  methods: {}
}
</script>
