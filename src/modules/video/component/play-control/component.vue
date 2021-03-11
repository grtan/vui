<template>
  <!-- <vui-transition> -->
  <div
    v-show="(paused || useractive) && !waiting && !scrubbing"
    :class="[
      'vui-video__play-control',
      {
        'vui-video__play-control--playing': !paused,
        'vui-video__play-control--paused': paused,
        'vui-video__play-control--4g': is4G
      }
    ]"
  >
    <span class="vui-video__icon" @click="player[paused ? 'play' : 'pause']()"></span>
    <span class="vui-video__size">40M</span>
  </div>
  <!-- </vui-transition> -->
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { VideoJsPlayer } from 'video.js'
import VuiTransition from '../../../transition'

@Component({
  name: 'VuiVideoPlayControl',
  components: {
    VuiTransition
  }
})
export default class VComponent extends Vue {
  private player!: VideoJsPlayer
  // 已暂停
  private paused = true
  // 用户正在交互
  private useractive = true
  // 正在快进、快退
  private scrubbing = false
  // 正在加载等待
  private waiting = false
  // 移动网络
  private is4G = true

  created() {
    this.$on('inited', (player: VideoJsPlayer) => {
      this.player = player
      this.onPlayerEvent()
    })
  }

  onPlayerEvent() {
    this.player.on(['play', 'pause'], event => {
      this.paused = event.type === 'pause'
    })

    this.player.on(['useractive', 'userinactive'], event => {
      this.useractive = event.type === 'useractive'
    })

    this.player.on('waiting', () => {
      this.waiting = true

      const timeWhenWaiting = this.player.currentTime()
      const timeUpdateListener = () => {
        if (timeWhenWaiting !== this.player.currentTime()) {
          this.waiting = false
          this.player.off('timeupdate', timeUpdateListener)
        }
      }

      this.player.on('timeupdate', timeUpdateListener)
    })

    this.player.on('v:scrubbing', (event, { scrubbing }: { scrubbing: boolean }) => {
      this.scrubbing = scrubbing
    })
  }
}
</script>
