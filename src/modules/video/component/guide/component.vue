<template>
  <div
    v-if="unshownGuides.length"
    :class="[
      'vui-video__guide',
      {
        [`vui-video__guide--${unshownGuides[0]}`]: unshownGuides.length
      }
    ]"
    @click="showNextGuide"
  >
    <div class="vui-video__guide-step">
      <div class="vui-video__guide-gesture"></div>
      <div class="vui-video__guide-text">{{ guideText }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { VideoJsPlayer } from 'video.js'

@Component({
  name: 'VuiVideoGuide'
})
export default class VComponent extends Vue {
  // 已经显示过的引导
  private shownGuides = ['brightness', 'volume', 'seek', 'play']
  // 待显示的引导
  private unshownGuides: string[] = []

  get guideText() {
    switch (this.unshownGuides[0]) {
      case 'brightness':
        return '左侧上下\n滑动调节音量'
      case 'volume':
        return '右侧上下\n滑动调节亮度'
      case 'seek':
        return '左右滑动\n快速前进或后退'
      case 'play':
        return '双击暂停或继续播放'
      default:
        return ''
    }
  }

  created() {
    this.$on('inited', (player: VideoJsPlayer) => {
      player.on('fullscreenchange', () => {
        if (player.isFullscreen()) {
          if (!localStorage.getItem('vui-video-guide')) {
            this.shownGuides = []
            this.unshownGuides = ['brightness', 'volume', 'seek', 'play']
          }
        } else {
          // 退出全屏时需要关闭引导
          this.unshownGuides = []
        }
      })
    })
  }

  showNextGuide() {
    this.shownGuides.push(this.unshownGuides.shift()!)

    // 引导显示完后标记下
    if (!this.unshownGuides.length) {
      localStorage.setItem('vui-video-guide', 'true')
    }
  }
}
</script>
