<template>
  <div v-if="scrubbing" class="vui-video__scrub-gesture">
    <div
      class="vui-video__scrub-gesture-time"
      :data-target="formatTime(targetTime)"
      :data-total="formatTime(totalTime - targetTime)"
    >
      /
    </div>
    <div class="vui-video__scrub-gesture-progress-bar">
      <div class="vui-video__scrub-gesture-progress" :style="{ width: `${(targetTime / totalTime) * 100}%` }"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import videojs from 'video.js'
import Hammer from 'hammerjs'
import { SEEK } from '../../event'
import { getViewportScale } from '@/utils/index'

const viewportScale = getViewportScale()

@Component({
  name: 'VuiVideoScrubGesture'
})
export default class VComponent extends Vue {
  // 视频总时长
  private duration = this.$options.player!.duration()
  // 直播时当前已解析的视频范围起点、终点位置时间
  private liveSeekableStart = this.$options.player!.liveTracker.seekableStart()
  private liveSeekableEnd = this.$options.player!.liveTracker.seekableEnd()
  // 当前定位时间
  private currentTime = this.$options.player!.currentTime()
  // 是否正在拖拽
  private scrubbing = false
  private prev = Infinity

  get isLive() {
    return this.duration === Infinity
  }

  get targetTime() {
    if (!this.isLive) {
      return this.currentTime
    }

    return Math.min(Math.max(this.liveSeekableStart, this.currentTime), this.liveSeekableEnd) - this.liveSeekableStart
  }

  get totalTime() {
    if (!this.isLive) {
      return this.duration
    }

    return this.liveSeekableEnd - this.liveSeekableStart
  }

  formatTime(seconds: number) {
    return videojs.formatTime(seconds, 600)
  }

  onPlayerEvent() {
    const player = this.$options.player!

    player.on('durationchange', () => {
      this.duration = player.duration()
    })

    player.tech().on('seekablechanged', () => {
      this.liveSeekableStart = player.liveTracker.seekableStart()
      this.liveSeekableEnd = player.liveTracker.seekableEnd()
    })

    // 监听是否在快进、快退
    player.on(SEEK, (event, { scrubbing, time }) => {
      this.scrubbing = scrubbing
      this.currentTime = time

      if (!scrubbing) {
        player.currentTime(time)
      }
    })
  }

  setGesture() {
    const player = this.$options.player!
    const hammerManager = new Hammer.Manager(player.el())

    hammerManager.add(
      new Hammer.Pan({
        /**
         * 当设置成Hammer.DIRECTION_HORIZONTAL时，只有触摸在水平方向上产生移动后才触发panstart事件
         * 如果用户先垂直滑动再水平滑动，可能就会有一些bug
         * 这里不能使用Hammer.DIRECTION_ALL，因为会阻止移动端页面垂直滚动
         */
        direction: Hammer.DIRECTION_HORIZONTAL,
        // 将方向识别阈值设置得比较小，防止触发页面垂直滚动后还能识别成水平滑动
        threshold: 1
      })
    )

    hammerManager.on('panstart', event => {
      this.prev = Infinity

      // 不是在video元素上滑动
      if (event.target.tagName.toLowerCase() !== 'video') {
        return
      }

      /**
       * 如果用户先垂直滑动再水平滑动，则panstart event中的angle是从最初的起始触点到第一次触发水平滑动的点的角度
       * 所以这里仍然需要判断角度，排除掉上述情况
       */
      const isHorizontal =
        ((event.angle > -30 && event.angle < 30) || event.angle > 150 || event.angle < -150) &&
        [Hammer.DIRECTION_LEFT, Hammer.DIRECTION_RIGHT].includes(event.offsetDirection as any)

      if (!isHorizontal) {
        return
      }

      this.prev = event.center.x
      player.trigger(SEEK, {
        scrubbing: true,
        time: player.currentTime()
      })
    })

    hammerManager.on('panmove', event => {
      // 已经判定为无效滑动
      if (this.prev === Infinity) {
        return
      }

      const current = event.center.x
      // 按照viewport scale=1的场景来算，1px距离代表1s
      const delta = (current - this.prev) * viewportScale
      const currentTime = this.currentTime + delta

      this.prev = current
      player.trigger(SEEK, {
        scrubbing: true,
        time: Math.min(
          Math.max(this.isLive ? this.liveSeekableStart : 0, currentTime),
          this.isLive ? this.liveSeekableEnd : this.duration
        )
      })
    })

    hammerManager.on('panend', () => {
      if (this.prev === Infinity) {
        return
      }

      this.prev = Infinity
      player.trigger(SEEK, {
        scrubbing: false,
        // 如果时直播场景，拖拽松开时需要考虑currentTime是否已越界
        time: this.isLive ? Math.max(this.currentTime, this.liveSeekableStart) : this.currentTime
      })
    })
  }

  created() {
    this.onPlayerEvent()
    this.setGesture()
  }
}
</script>
