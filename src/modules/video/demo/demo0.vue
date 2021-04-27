<template>
  <vui-video
    v-if="src"
    :src="src"
    :autoplay="autoplay"
    :loop="loop"
    :muted="muted"
    :poster="poster"
    :preload="preload"
    :controls="controls"
    :title="title"
  ></vui-video>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import VuiVideo from '../component.vue'

@Component({
  components: {
    VuiVideo
  }
})
export default class VComponent extends Vue {
  static title = '样例1'
  src = ''
  autoplay = false
  loop = false
  muted = false
  poster = 'https://tva1.sinaimg.cn/large/006tNbRwgy1gah4zxc779j314w0u07bg.jpg'
  preload = 'auto'
  controls = true
  title = '视频标题'

  created() {
    setTimeout(() => {
      this.loop = true
    }, 3000)

    // this.player.src([
    //   // {
    //   //   src: 'https://d2zihajmogu5jn.cloudfront.net/bipbop-advanced/bipbop_16x9_variant.m3u8'
    //   // }
    //   {
    //     src: 'https://d2zihajmogu5jn.cloudfront.net/sintel/rendition/rendition.m3u8',
    //     label: '720P'
    //   },
    //   {
    //     src: 'https://test-bj-ws.vivo.com.cn/OsKFHoFL2MR7QsdJ/gfandroid/2020091117371717000001.mp4',
    //     label: '1080P'
    //   }
    // ])

    // this.src = [
    //   {
    //     src: 'https://d2zihajmogu5jn.cloudfront.net/bipbop-advanced/bipbop_16x9_variant.m3u8'
    //   },
    //   {
    //     src: 'https://d2zihajmogu5jn.cloudfront.net/sintel/rendition/rendition.m3u8',
    //     label: '720P'
    //   },
    //   {
    //     src: 'https://test-bj-ws.vivo.com.cn/OsKFHoFL2MR7QsdJ/gfandroid/2020091117371717000001.mp4',
    //     label: '1080P'
    //   }
    // ]
    // this.src = 'https://test-bj-ws.vivo.com.cn/OsKFHoFL2MR7QsdJ/gfandroid/2020091117371717000001.mp4'
    this.src = 'http://220.161.87.62:8800/hls/0/index.m3u8'
    // this.src = 'https://vjs.zencdn.net/v/oceans.mp4'
    // this.src = 'https://d2zihajmogu5jn.cloudfront.net/sintel/rendition/rendition.m3u8'

    setTimeout(() => {
      // this.src = 'https://vjs.zencdn.net/v/oceans.mp4'
      // this.controls = false

      this.poster =
        'https://user-gold-cdn.xitu.io/2020/5/10/171fba8f0c6f8a7f?imageView2/1/w/1304/h/734/q/85/format/webp/interlace/1'
    }, 3000)
  }
}
</script>
