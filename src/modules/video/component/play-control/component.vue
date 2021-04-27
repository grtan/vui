<template>
  <div
    v-show="(paused || useractive) && !waiting && !scrubbing"
    :class="[
      'vui-video__play-control',
      {
        'vui-video__play-control--playing': !paused,
        'vui-video__play-control--size': showSize
      }
    ]"
    @click="$options.player[paused ? 'play' : 'pause']()"
  >
    <span class="vui-video__play-control-icon"></span>
    <span class="vui-video__play-control-size">{{ sizeText }}</span>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { SEEK, NETWORK_CHANGED, SOURCE_SWITCHED } from '../../event'
import { formatFileSize } from '@/utils/index'
import { NETWORK } from '@/utils/const'

@Component({
  name: 'VuiVideoPlayControl'
})
export default class VComponent extends Vue {
  // 视频时长
  private duration = this.$options.player!.duration()
  // 是否暂停
  private paused = this.$options.player!.paused()
  // 是否正在交互
  private useractive = this.$options.player!.userActive()
  // 是否正在快进、快退
  private scrubbing = false
  // 是否正在加载等待
  private waiting = false
  // 网络状态 0——未知 1——断网 2——wifi 3——流量
  private netType: typeof NETWORK[keyof typeof NETWORK] = NETWORK.UNKNOWN
  // 视频总尺寸
  private size = 0
  // 已加载视频的末尾位置
  private bufferedTime = Math.min(
    Math.max(this.$options.player!.bufferedEnd(), this.$options.player!.currentTime()),
    this.duration
  )

  // 是否直播
  get isLive() {
    return this.duration === Infinity
  }

  // 是否显示消耗流量提示
  get showSize() {
    return this.paused && this.netType === NETWORK.MOBILE && this.size && !this.isLive
  }

  get sizeText() {
    const size = ((this.duration - this.bufferedTime) / this.duration) * this.size

    return formatFileSize(size)
  }

  created() {
    const player = this.$options.player!

    player.on('durationchange', () => {
      // 切换源时会短暂的成为0
      if (!player.duration()) {
        return
      }

      this.duration = player.duration()
    })

    player.on(['play', 'pause'], event => {
      this.paused = event.type === 'pause'

      // 暂停时才更新已缓冲时间
      if (this.paused) {
        this.bufferedTime = Math.min(Math.max(player.bufferedEnd(), player.currentTime()), this.duration)
      }
    })

    player.on(['useractive', 'userinactive'], event => {
      this.useractive = event.type === 'useractive'
    })

    player.on('waiting', () => {
      this.waiting = true

      const timeWhenWaiting = player.currentTime()
      const timeUpdateListener = () => {
        if (Math.abs(player.currentTime() - timeWhenWaiting) > 0.3) {
          this.waiting = false
          player.off('timeupdate', timeUpdateListener)
        }
      }

      player.on('timeupdate', timeUpdateListener)
    })

    player.on(SEEK, (event, { scrubbing, time }: { scrubbing: boolean; time: number }) => {
      this.scrubbing = scrubbing

      if (this.paused) {
        this.bufferedTime = Math.min(Math.max(player.bufferedEnd(), time), this.duration)
      }
    })

    player.on(NETWORK_CHANGED, (event, netType: VComponent['netType']) => {
      this.netType = netType
    })

    // 切换视频源时更新size，source中不一定有size字段
    player.on(SOURCE_SWITCHED, (event, source) => {
      this.size = source?.size ?? 0
    })

    // 暂停状态切换源时会触发timeupdate
    player.on('timeupdate', () => {
      // 切换源时会短暂的成为0
      if (!this.paused || !player.currentTime()) {
        return
      }

      this.bufferedTime = Math.min(Math.max(player.bufferedEnd(), player.currentTime()), this.duration)
    })
  }
}
</script>
