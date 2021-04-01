<template>
  <div class="vui-video__progress-control">
    <div class="vui-video__progress-control-current-time">
      {{
        formatTime(
          isLive
            ? $options.player.liveTracker.atLiveEdge()
              ? liveSeekableEnd - liveSeekableStart
              : Math.min(Math.max(liveSeekableStart, currentTime), liveSeekableEnd) - liveSeekableStart
            : currentTime
        )
      }}
    </div>
    <!-- 这里不设置key的话，$refs.wrapper指向的元素会变化 -->
    <div ref="wrapper" key="wrapper" class="vui-video__progress-control-progress-bar-wrapper">
      <div class="vui-video__progress-control-progress-bar">
        <div class="vui-video__progress-control-progress"></div>
        <div
          class="vui-video__progress-control-progress vui-video__progress-control-progress--played"
          :style="{ width: `${percent * 100}%` }"
        ></div>
      </div>
    </div>
    <div class="vui-video__progress-control-remaining-time">
      {{
        formatTime(
          isLive
            ? $options.player.liveTracker.atLiveEdge()
              ? 0
              : liveSeekableEnd - currentTime
            : duration - currentTime
        )
      }}
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import videojs from 'video.js'
import Hammer from 'hammerjs'
import { SEEK } from '../../event'
import { requestAnimationFrame, cancelAnimationFrame } from '@/utils/prefix'

@Component({
  name: 'VuiVideoProgressBar',
  components: {}
})
export default class VComponent extends Vue {
  // 视频总时长
  private duration = this.$options.player!.duration()
  // 直播时当前已解析的视频范围起点、终点位置时间
  private liveSeekableStart = this.$options.player!.liveTracker.seekableStart()
  private liveSeekableEnd = this.$options.player!.liveTracker.seekableEnd()
  // 当前播放或定位位置的时间
  private currentTime = this.$options.player!.currentTime()
  // 是否正在拖拽定位
  private scrubbing = false
  // 动画帧id
  private animationFrameId!: number

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

  onPlayerEvent() {
    const player = this.$options.player!

    player.on('durationchange', () => {
      this.duration = player.duration()
    })

    // 监听是否正在快进、快退
    player.on(SEEK, (event, { scrubbing, time }: { scrubbing: boolean; time: number }) => {
      this.scrubbing = scrubbing
      this.currentTime = time

      if (!scrubbing) {
        // 直播时如果定位的位置距离seekable边缘在1s内，直接实时直播
        if (this.isLive && Math.abs(this.liveSeekableEnd - time) <= 1) {
          player.liveTracker.seekToLiveEdge()
          return
        }

        player.currentTime(time)
      }
    })
  }

  onHammerEvent() {
    const player = this.$options.player!
    const hammerManager = new Hammer.Manager(this.$refs.wrapper as Element)

    hammerManager.add([
      new Hammer.Tap(),
      new Hammer.Pan({
        /**
         * 当设置成DIRECTION_HORIZONTAL时，只要触摸在水平方向上产生移动后就会触发panstart事件
         * 如果用户先垂直滑动一段距离后再水平滑动，也会触发panstart事件，这应该是个bug
         * 所以这里使用全部方向，自行在panstart中判断方向
         */
        direction: Hammer.DIRECTION_ALL
      })
    ])

    hammerManager.on('tap', event => {
      const { left, width } = (this.$refs.wrapper as Element).getBoundingClientRect()
      const percent = Math.min(Math.max(event.center.x - left, 0), width) / width

      player.trigger(SEEK, {
        scrubbing: false,
        time: this.isLive
          ? percent * (this.liveSeekableEnd - this.liveSeekableStart) + this.liveSeekableStart
          : percent * this.duration
      })
    })

    hammerManager.on('panstart', event => {
      // 非水平方向滑动
      if (![Hammer.DIRECTION_LEFT, Hammer.DIRECTION_RIGHT].includes(event.direction as any)) {
        return
      }

      player.trigger(SEEK, {
        scrubbing: true,
        time: this.currentTime
      })
    })

    hammerManager.on('panmove', event => {
      if (!this.scrubbing) {
        return
      }

      const { left, width } = (this.$refs.wrapper as Element).getBoundingClientRect()
      const percent = Math.min(Math.max(event.center.x - left, 0), width) / width

      player.trigger(SEEK, {
        scrubbing: true,
        time: this.isLive
          ? percent * (this.liveSeekableEnd - this.liveSeekableStart) + this.liveSeekableStart
          : percent * this.duration
      })
    })

    hammerManager.on('panend', () => {
      if (!this.scrubbing) {
        return
      }

      player.trigger(SEEK, {
        scrubbing: false,
        // 如果时直播场景，拖拽松开时需要考虑currentTime是否已越界
        time: this.isLive ? Math.max(this.currentTime, this.liveSeekableStart) : this.currentTime
      })
    })
  }

  formatTime(seconds: number) {
    return videojs.formatTime(seconds, 600)
  }

  mounted() {
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
    this.onPlayerEvent()
    this.onHammerEvent()
  }

  beforeDestroy() {
    cancelAnimationFrame(this.animationFrameId)
  }
}
</script>
