<template>
  <div v-show="!paused && !useractive" class="vui-video__progress-bar">
    <div class="vui-video__progress-bar-progress" :style="{ width: `${percent * 100}%` }"></div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { SCRUBBING } from '../../event'
import { requestAnimationFrame, cancelAnimationFrame } from '@/utils/prefix'

@Component({
  name: 'VuiVideoProgressBar'
})
export default class VComponent extends Vue {
  // 视频总时长
  private duration = this.$options.player!.duration()
  // 直播时当前已解析的视频范围起点、终点位置时间
  private liveSeekableStart = this.$options.player!.liveTracker.seekableStart()
  private liveSeekableEnd = this.$options.player!.liveTracker.seekableEnd()
  // 当前显示时间
  private currentTime = this.$options.player!.currentTime()
  // 是否暂停
  private paused = this.$options.player!.paused()
  // 是否正在交互
  private useractive = this.$options.player!.userActive()
  // 是否正在拖拽快进、快退
  private scrubbing = false
  // 动画帧id
  private animationFrameId!: number

  // 是否直播
  get isLive() {
    return this.duration === Infinity
  }

  get percent() {
    if (this.isLive) {
      const player = this.$options.player!
      // 这里必须引用到currentTime等变量，否则currentTime更新时不会触发该函数执行
      let percent =
        (Math.min(Math.max(this.liveSeekableStart, this.currentTime), this.liveSeekableEnd) - this.liveSeekableStart) /
        (this.liveSeekableEnd - this.liveSeekableStart)

      // 如果定位成实时直播，必须直接返回1，否则liveSeekableEnd>currentTime时就会有问题
      if (!this.scrubbing && player.liveTracker.atLiveEdge()) {
        percent = 1
      }

      return percent
    }

    return Math.min(Math.max(0, this.currentTime), this.duration) / this.duration
  }

  created() {
    const player = this.$options.player!
    const fn = () => {
      if (!this.scrubbing) {
        this.currentTime = player.currentTime()
      }

      if (this.isLive) {
        this.liveSeekableStart = player.liveTracker.seekableStart()
        this.liveSeekableEnd = player.liveTracker.seekableEnd()
      }

      this.animationFrameId = requestAnimationFrame(fn)
    }

    // 用动画帧来更新当前时间，否则进度条动画会不流畅
    this.animationFrameId = requestAnimationFrame(fn)

    player.on('durationchange', () => {
      this.duration = player.duration()
    })

    player.on(['play', 'pause'], event => {
      this.paused = event.type === 'pause'
    })

    player.on(['useractive', 'userinactive'], event => {
      this.useractive = event.type === 'useractive'
    })

    player.on(SCRUBBING, (event, { scrubbing, time }: { scrubbing: boolean; time: number }) => {
      this.scrubbing = scrubbing
      this.currentTime = time
    })
  }

  beforeDestroy() {
    cancelAnimationFrame(this.animationFrameId)
  }
}
</script>
