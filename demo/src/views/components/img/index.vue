<template>
  <div>
    <p>加载成功</p>
    <v-img
      :class="$style.img"
      :src="src1"
      :loading="loading"
      :error="error"
      :delay="delay"
      :duration="duration"
    ></v-img>
    <p>加载失败</p>
    <v-img
      :class="$style.img"
      :src="src1+'2'"
      :loading="loading"
      :error="error"
      :delay="delay"
      :duration="duration"
    ></v-img>
    <p>自定义loading效果</p>
    <v-img :class="$style.img" :src="src3" :delay="delay" :duration="duration">
      <img :class="$style.myloading" slot="loading" :src="`${src3}?q=20`" />
      <div :class="$style.error" slot="error">图片加载失败~</div>
    </v-img>
    <p>懒加载</p>
    <v-img :class="$style.img" :src="src4" :lazy="true" :duration="duration">
      <div :class="$style.loading" slot="loading">正在加载图片...</div>
      <div :class="$style.error" slot="error">图片加载失败~</div>
    </v-img>
    <v-img :class="$style.img" :src="src5" :lazy="true" :duration="duration">
      <div :class="$style.loading" slot="loading">正在加载图片...</div>
      <div :class="$style.error" slot="error">图片加载失败~</div>
    </v-img>
    <v-img :class="$style.img" :src="src6" :lazy="true" :duration="duration">
      <div :class="$style.loading" slot="loading">正在加载图片...</div>
      <div :class="$style.error" slot="error">图片加载失败~</div>
    </v-img>
    <v-img :class="$style.img" :src="src4" :lazy="true" :duration="duration">
      <div :class="$style.loading" slot="loading">正在加载图片...</div>
      <div :class="$style.error" slot="error">图片加载失败~</div>
    </v-img>
    <v-img :class="$style.img" :src="src5" :lazy="true" :duration="duration">
      <div :class="$style.loading" slot="loading">正在加载图片...</div>
      <div :class="$style.error" slot="error">图片加载失败~</div>
    </v-img>
    <v-img :class="$style.img" :src="src6" :lazy="true" :duration="duration">
      <div :class="$style.loading" slot="loading">正在加载图片...</div>
      <div :class="$style.error" slot="error">图片加载失败~</div>
    </v-img>
    <v-img :class="$style.img" :src="src4" :lazy="true" :duration="duration">
      <div :class="$style.loading" slot="loading">正在加载图片...</div>
      <div :class="$style.error" slot="error">图片加载失败~</div>
    </v-img>
    <v-img :class="$style.img" :src="src5" :lazy="true" :duration="duration">
      <div :class="$style.loading" slot="loading">正在加载图片...</div>
      <div :class="$style.error" slot="error">图片加载失败~</div>
    </v-img>
    <v-img :class="$style.img" :src="src6" :lazy="true" :duration="duration">
      <div :class="$style.loading" slot="loading">正在加载图片...</div>
      <div :class="$style.error" slot="error">图片加载失败~</div>
    </v-img>
  </div>
</template>

<style module>
.img {
  margin: 0.4rem 0;
  width: 100%;
  height: 5rem;
}

.loading,
.error {
  font-size: 0.5rem;
  line-height: 5rem;
  text-align: center;
}

.loading {
  background: rgb(234, 233, 233);
}

.error {
  background: rgb(252, 105, 105);
}

.myloading {
  display: block;
  width: 100%;
  height: 100%;
  filter: blur(50px);
}
</style>

<script>
import { Img } from 'vui'

export default {
  components: {
    VImg: Img
  },
  data() {
    return {
      src1: 'http://img.88tph.com/f0/73/8HMovlq1EemFqwARMiynhQ-0.jpg!/watermark/url/L3BhdGgvbG9nby5wbmc/align/center',
      src3: 'https://cdn-images-1.medium.com/max/1800/1*sg-uLNm73whmdOgKlrQdZA.jpeg',
      src4: 'http://img.mp.itc.cn/upload/20170220/3bde98f642f546be95b2d242994897aa_th.jpg',
      src5: 'http://pic.rmb.bdstatic.com/f54083119edfb83c4cfe9ce2eeebc076.jpeg',
      src6: 'http://pic14.nipic.com/20110529/7570613_004640647181_2.jpg',
      loading: require('./loading.gif'),
      error: require('./error.jpeg'),
      delay: 1500,
      duration: 500
    }
  }
}
</script>
