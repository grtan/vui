<template>
  <div class="vui-video__progress-control">
    <div class="vui-video__current-time">{{ formatTime(currentTime) }}</div>
    <div ref="wrapper" class="vui-video__progress-bar-wrapper">
      <div class="vui-video__progress-bar">
        <div class="vui-video__progress"></div>
        <div
          class="vui-video__progress vui-video__progress--played"
          :style="{ width: `${(currentTime / duration) * 100}%` }"
        ></div>
      </div>
    </div>
    <div class="vui-video__remaining-time">{{ formatTime(duration - currentTime) }}</div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import videojs, { VideoJsPlayer } from 'video.js'
import Hammer from 'hammerjs'

@Component({
  name: 'VuiVideoProgressBar',
  components: {}
})
export default class VComponent extends Vue {
  private player!: VideoJsPlayer
  // private hammerManager!: InstanceType<typeof Hammer>
  private duration = 0
  private currentTime = 0
  // 是否正在拖拽定位
  private scrubbing = false

  created() {
    this.$on('inited', (player: VideoJsPlayer) => {
      this.player = player
      this.onPlayerEvent()
      this.onHammerEvent()
    })
  }

  onPlayerEvent() {
    this.player.on('durationchange', () => {
      this.duration = this.player.duration()
    })

    this.player.on(['timeupdate', 'ended'], () => {
      if (this.scrubbing) {
        return
      }

      this.currentTime = this.player.currentTime()
    })

    this.player.on('progress', () => {})

    // 监听是否正在快进、快退
    this.player.on('v:scrubbing', (event, { scrubbing, time }: { scrubbing: boolean; time: number }) => {
      this.currentTime = time

      // 停止快进、后退
      if (!scrubbing) {
        this.player.currentTime(this.currentTime)
      }
    })
  }

  onHammerEvent() {
    const hammerManager = new Hammer.Manager(this.$refs.wrapper as EventTarget)

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
      const distance = Math.min(Math.max(event.center.x - left, 0), width)

      this.player.trigger('v:scrubbing', {
        scrubbing: false,
        time: (distance / width) * this.duration
      })
    })

    hammerManager.on('panstart', event => {
      console.log(222, event)

      if (![Hammer.DIRECTION_LEFT, Hammer.DIRECTION_RIGHT].includes(event.direction)) {
        return
      }

      this.scrubbing = true
    })

    hammerManager.on('panmove', event => {
      if (!this.scrubbing) {
        return
      }

      const { left, width } = (this.$refs.wrapper as Element).getBoundingClientRect()
      const distance = Math.min(Math.max(event.center.x - left, 0), width)

      // this.currentTime = (distance / width) * this.duration

      this.player.trigger('v:scrubbing', {
        scrubbing: this.scrubbing,
        time: (distance / width) * this.duration
      })
    })

    hammerManager.on('panend', () => {
      if (!this.scrubbing) {
        return
      }

      this.scrubbing = false
      // this.player.currentTime(this.currentTime)

      this.player.trigger('v:scrubbing', {
        scrubbing: this.scrubbing,
        time: this.currentTime
      })
    })
  }

  formatTime(seconds: number) {
    return videojs.formatTime(seconds, 600)
  }
}
</script>
