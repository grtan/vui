<template>
  <div class="vui-video__progress-control">
    <div v-if="!isLive" class="vui-video__progress-control-current-time">{{ formatTime(currentTime) }}</div>
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
    <div v-if="!isLive" class="vui-video__progress-control-remaining-time">
      {{ formatTime(duration - currentTime) }}
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import videojs from 'video.js'
import Hammer from 'hammerjs'

@Component({
  name: 'VuiVideoProgressBar',
  components: {}
})
export default class VComponent extends Vue {
  private duration = 0
  private currentTime = 0
  // 是否正在拖拽定位
  private scrubbing = false

  get isLive() {
    return this.duration === Infinity
  }

  get percent() {
    const player = this.$options.player!

    if (this.isLive) {
      // if (!this.scrubbing && player.liveTracker.atLiveEdge()) {
      //   return 1
      // }

      /**
       * currentTime返回当前播放的时间
       * liveTracker.seekableStart()返回当前可播放的时间范围的起始时间
       * liveTracker.liveWindow()返回当前可播放的时间范围长度
       */
      return Math.min((this.currentTime - player.liveTracker.seekableStart()) / player.liveTracker.liveWindow(), 1)
    }

    return Math.min(this.currentTime / this.duration, 1)
  }

  created() {
    this.onPlayerEvent()
    this.onHammerEvent()
  }

  onPlayerEvent() {
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

    // 监听是否正在快进、快退
    player.on('v:scrubbing', (event, { scrubbing, time }: { scrubbing: boolean; time: number }) => {
      // const total = this.isLive ? player.liveTracker.curr

      this.currentTime = time

      console.log(
        this.currentTime,
        player.liveTracker.seekableStart(),
        player.liveTracker.liveWindow(),
        player.liveTracker.liveCurrentTime()
      )

      // 停止快进、后退
      if (!scrubbing) {
        player.currentTime(
          this.isLive
            ? Math.min(this.currentTime, player.liveTracker.liveCurrentTime())
            : Math.min(this.currentTime, this.duration)
        )
      }
    })

    // 直播时监听其他事件
    // if (this.isLive) {
    // player.liveTracker.on('liveedgechange', () => {
    //   this.duration = player.liveTracker.liveCurrentTime()
    //   console.log('live', this.duration)
    // })
    // }
  }

  onHammerEvent() {
    const player = this.$options.player!
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

      player.trigger('v:scrubbing', {
        scrubbing: false,
        time: this.isLive
          ? (distance / width) * player.liveTracker.liveWindow() + player.liveTracker.seekableStart()
          : (distance / width) * this.duration
      })
    })

    hammerManager.on('panstart', event => {
      if (![Hammer.DIRECTION_LEFT, Hammer.DIRECTION_RIGHT].includes(event.direction as any)) {
        return
      }

      this.scrubbing = true
      player.trigger('v:scrubbing', {
        scrubbing: true,
        time: this.currentTime
      })
    })

    hammerManager.on('panmove', event => {
      if (!this.scrubbing) {
        return
      }

      const { left, width } = (this.$refs.wrapper as Element).getBoundingClientRect()
      const distance = Math.min(Math.max(event.center.x - left, 0), width)

      player.trigger('v:scrubbing', {
        scrubbing: true,
        time: this.isLive
          ? (distance / width) * player.liveTracker.liveWindow() + player.liveTracker.seekableStart()
          : (distance / width) * this.duration
      })
    })

    hammerManager.on('panend', () => {
      if (!this.scrubbing) {
        return
      }

      this.scrubbing = false
      player.trigger('v:scrubbing', {
        scrubbing: false,
        time: this.currentTime
      })
    })
  }

  formatTime(seconds: number) {
    return videojs.formatTime(seconds, 600)
  }
}
</script>
