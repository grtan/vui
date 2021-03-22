<template>
  <div v-show="!paused && !useractive" class="vui-video__progress-bar">
    <div class="vui-video__progress-bar-progress" :style="{ width: `${percent * 100}%` }"></div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component({
  name: 'VuiVideoProgressBar'
})
export default class VComponent extends Vue {
  // 视频总时长
  private duration = 0
  // 当前显示时间
  private currentTime = 0
  // 已暂停
  private paused = true
  // 用户正在交互
  private useractive = false
  // 正在快进、快退
  private scrubbing = false

  get isLive() {
    return this.duration === Infinity
  }

  get percent() {
    const player = this.$options.player!

    if (this.isLive) {
      if (player.liveTracker.atLiveEdge()) {
        return 1
      }

      return Math.min(1, (this.currentTime - player.liveTracker.seekableStart()) / player.liveTracker.liveWindow())
    }

    return Math.min(1, this.currentTime / this.duration)
  }

  created() {
    const player = this.$options.player!

    player.on('durationchange', () => {
      this.duration = player.duration()
    })

    player.on(['timeupdate', 'ended'], () => {
      if (this.scrubbing) {
        return
      }

      this.currentTime = player.currentTime()
    })

    player.on(['play', 'pause'], event => {
      this.paused = event.type === 'pause'
    })

    player.on(['useractive', 'userinactive'], event => {
      this.useractive = event.type === 'useractive'
    })

    player.on('v:scrubbing', (event, { scrubbing, time }: { scrubbing: boolean; time: number }) => {
      this.scrubbing = scrubbing
      this.currentTime = time
    })
  }
}
</script>
