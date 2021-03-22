<template>
  <div v-show="scrubbing" class="vui-video__scrub-gesture">
    <div class="vui-video__scrub-gesture-time" :data-target="formatTime(value)" :data-total="formatTime(duration)">
      /
    </div>
    <div class="vui-video__scrub-gesture-progress-bar">
      <div class="vui-video__scrub-gesture-progress" :style="{ width: `${(value / duration) * 100}%` }"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import videojs from 'video.js'
import Hammer from 'hammerjs'

@Component({
  name: 'VuiVideoScrubGesture'
})
export default class VComponent extends Vue {
  private duration = 0
  private value = 0
  private prev = Infinity
  private scrubbing = false

  created() {
    this.duration = this.$options.player!.duration()
    this.onPlayerEvent()
    this.setGesture()
  }

  formatTime(seconds: number) {
    return videojs.formatTime(seconds, 600)
  }

  onPlayerEvent() {
    const player = this.$options.player!

    player.on('durationchange', () => {
      this.duration = player.duration()
    })

    // 监听是否在快进、快退
    player.on('v:scrubbing', (event, { scrubbing, time }) => {
      this.scrubbing = scrubbing
      this.value = time

      if (!scrubbing) {
        player.currentTime(this.value)
      }
    })
  }

  setGesture() {
    const player = this.$options.player!
    const videoEl = player.$('video')
    const hammerManager = new Hammer.Manager(videoEl)

    hammerManager.add(
      new Hammer.Pan({
        /**
         * 当设置成DIRECTION_VERTICAL时，只有触摸在垂直方向上产生移动后才触发panstart事件
         * 如果用户先水平滑动再垂直滑动，可能就会有一些bug
         * 所以这里使用全部方向，自行在panstart中判断方向
         */
        direction: Hammer.DIRECTION_ALL
      })
    )

    hammerManager.on('panstart', event => {
      const isHorizontal = (event.angle > -30 && event.angle < 30) || event.angle > 150 || event.angle < -150

      this.prev = Infinity

      if (!isHorizontal) {
        return
      }

      this.prev = event.center.x
      player.trigger('v:scrubbing', {
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
      const delta = current - this.prev
      const currentValue = this.value + delta

      this.prev = current
      player.trigger('v:scrubbing', {
        scrubbing: true,
        time: Math.min(Math.max(0, currentValue), this.duration)
      })
    })

    hammerManager.on('panend', () => {
      this.prev = Infinity
      player.trigger('v:scrubbing', {
        scrubbing: false,
        time: this.value
      })
    })
  }
}
</script>
