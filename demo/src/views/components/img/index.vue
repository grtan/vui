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
    <p>自定义渐进式加载效果</p>
    <v-img :class="[$style.img,$style.thumb]" :src="thumbSrc" :delay="delay" :duration="duration">
      <img :class="$style.loading" slot="loading" src="./image/test.jpg?thumb" />
      <div :class="$style.error" slot="error">图片加载失败~</div>
    </v-img>
    <p>点击后加载gif图</p>
    <v-img :class="[$style.img,$style.gif]" :src="gifSrc" :delay="delay" :duration="duration">
      <div :class="$style.loading" slot="loading" @click="loadGif">
        <div :class="$style.size">{{gifSize}}</div>
        <div :class="$style.text" v-if="!gifLoading">GIF</div>
        <vue-loading v-else type="spin" color="#fff"></vue-loading>
        <img :class="$style.image" :src="gifThumb" />
      </div>
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

.thumb .loading {
  display: block;
  width: 100%;
  height: 100%;
  filter: blur(50px);
}

.gif .loading {
  position: relative;
  width: 100%;
  height: 100%;
  color: #fff;
  line-height: normal;
}

.gif .text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-sizing: content-box;
  width: 3em;
  font-weight: bolder;
  line-height: 3em;
  border: 5px solid #fff;
  border-radius: 50%;
}

.gif .size {
  position: absolute;
  right: 0;
  top: 0;
  padding: 0 0.5em;
  font-size: 0.4rem;
  line-height: 2;
  background: rgba(50, 50, 50, 0.7);
}

.gif :global(.vue-loading) {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 1rem !important;
  height: 1rem !important;
}

.gif .image {
  display: block;
  width: 100%;
  height: 100%;
}
</style>

<script>
import { VueLoading } from 'vue-loading-template'
import { Img } from 'vui'
import Gif from './image/test.gif?gif'

export default {
  components: {
    VImg: Img,
    VueLoading
  },
  data() {
    return {
      src1: 'http://img.88tph.com/f0/73/8HMovlq1EemFqwARMiynhQ-0.jpg!/watermark/url/L3BhdGgvbG9nby5wbmc/align/center',
      src3: 'https://cdn-images-1.medium.com/max/1800/1*sg-uLNm73whmdOgKlrQdZA.jpeg',
      src4: 'http://img.mp.itc.cn/upload/20170220/3bde98f642f546be95b2d242994897aa_th.jpg',
      src5: 'http://pic.rmb.bdstatic.com/f54083119edfb83c4cfe9ce2eeebc076.jpeg',
      src6: 'http://pic14.nipic.com/20110529/7570613_004640647181_2.jpg',
      thumbSrc: require('./image/test.jpg'),
      gifSrc: '',
      gifThumb: require('./image/test.gif?thumb'),
      gifSize: `${(Gif.bytes / 1024).toFixed(2)}kb`,
      gifLoading: false,
      loading: require('./image/loading.gif'),
      error: require('./image/error.jpeg'),
      delay: 1500,
      duration: 500
    }
  },
  methods: {
    loadGif() {
      this.gifLoading = true
      setTimeout(() => {
        this.gifSrc = Gif.src
      }, 1500)
    }
  }
}
</script>
