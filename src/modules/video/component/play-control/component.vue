<template>
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
    <span class="vui-video__play-control-icon" @click="player[paused ? 'play' : 'pause']()"></span>
    <span class="vui-video__play-control-size">40M</span>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component({
  name: 'VuiVideoPlayControl'
})
export default class VComponent extends Vue {
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
    const player = this.$options.player!

    player.on(['play', 'pause'], event => {
      this.paused = event.type === 'pause'
    })

    player.on(['useractive', 'userinactive'], event => {
      this.useractive = event.type === 'useractive'
    })

    player.on('waiting', () => {
      this.waiting = true

      const timeWhenWaiting = player.currentTime()
      const timeUpdateListener = () => {
        if (Math.abs(player.currentTime() - timeWhenWaiting) > 0.1) {
          this.waiting = false
          player.off('timeupdate', timeUpdateListener)
        }
      }

      player.on('timeupdate', timeUpdateListener)
    })

    player.on('v:scrubbing', (event, { scrubbing }: { scrubbing: boolean }) => {
      this.scrubbing = scrubbing
    })
  }
}
</script>
