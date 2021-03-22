<template>
  <div
    :class="[
      'vui-video__fullscreen',
      {
        'vui-video__fullscreen--full': fullscreen
      }
    ]"
    @click="fullscreen = !fullscreen"
  >
    <vui-overlayer v-model="fullscreen" class="vui-video__fullscreen-overlayer"></vui-overlayer>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator'
import { requestedOrientation } from '@vivo/v-jsbridge'
import VuiOverlayer from '../../../overlayer'

@Component({
  name: 'VuiVideoFullscreen',
  components: {
    VuiOverlayer
  }
})
export default class VComponent extends Vue {
  // 是否全屏
  private fullscreen = this.$options.player!.isFullscreen()
  // 视频原生宽度
  private videoWidth = 0
  // 视频原生高度
  private videoHeight = 0

  // 视频内容是否横向
  get isHorz() {
    return this.videoWidth > this.videoHeight
  }

  @Watch('fullscreen')
  onFullscreenChange() {
    const player = this.$options.player!

    if (this.fullscreen) {
      player.requestFullscreen()
      // 0——横屏 1——竖屏
      requestedOrientation({
        orientation: this.isHorz ? 0 : 1
      })
    } else {
      player.exitFullscreen()
      requestedOrientation({
        orientation: 1
      })
    }
  }

  created() {
    const player = this.$options.player!

    player.on('fullscreenchange', () => {
      this.fullscreen = player.isFullscreen()
    })

    player.on('loadedmetadata', () => {
      this.videoWidth = player.videoWidth()
      this.videoHeight = player.videoHeight()
    })
  }
}
</script>
