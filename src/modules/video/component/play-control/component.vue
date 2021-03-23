<template>
  <div
    v-show="(paused || useractive) && !waiting && !scrubbing"
    :class="[
      'vui-video__play-control',
      {
        'vui-video__play-control--playing': !paused,
        'vui-video__play-control--size': paused && netType === 3 && size && !isLive
      }
    ]"
    @click="$options.player[paused ? 'play' : 'pause']()"
  >
    <span class="vui-video__play-control-icon"></span>
    <span class="vui-video__play-control-size">{{ size }} bytes</span>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component({
  name: 'VuiVideoPlayControl'
})
export default class VComponent extends Vue {
  // 视频时长
  private duration = 0
  // 是否暂停
  private paused = true
  // 是否正在交互
  private useractive = true
  // 是否正在快进、快退
  private scrubbing = false
  // 是否正在加载等待
  private waiting = false
  // 网络状态 0——未知 1——断网 2——wifi 3——流量
  private netType = 0
  // 视频尺寸
  private size = 0

  // 是否直播
  get isLive() {
    return this.duration === Infinity
  }

  created() {
    const player = this.$options.player!

    player.on('durationchange', () => {
      this.duration = player.duration()
    })

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

    player!.on('v:nettype', (event, netType: number) => {
      this.netType = netType
    })
  }
}
</script>
