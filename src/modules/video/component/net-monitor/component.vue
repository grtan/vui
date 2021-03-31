<template>
  <div v-if="show" class="vui-video__net-monitor">
    <div class="vui-video__net-monitor-text">无网络连接，请检查网络后点击重试</div>
    <vui-button class="vui-video__net-monitor-btn" type="gradient" hue="primary" corner="round" @click="retry"
      >重试</vui-button
    >
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator'
import { NETWORK_CHANGED } from '../../event'
import { monitorNetType } from '@/utils/index'
import { NETWORK } from '@/utils/const'
import VuiButton from '../../../button/component.vue'
import toast from '../../../toast/index'

const ALLOW_MOBILE_NETWORK_PLAY = 'vui-video_allow-mobile-network-play'

@Component({
  name: 'VuiVideoNetMonitor',
  components: {
    VuiButton
  }
})
export default class VComponent extends Vue {
  private stopMonitorNetType!: () => any
  // 网络状态 0——未知 1——断网 2——wifi 3——流量
  private netType: typeof NETWORK[keyof typeof NETWORK] = NETWORK.UNKNOWN
  // 正在等待
  private waiting = false
  // 正在重试
  private retrying = false

  /**
   * 断网了并且已经播放完了缓存的视频
   * 即只要是断网后导致等待就显示
   */
  get show() {
    return this.netType === NETWORK.DISCONNECTED && this.waiting
  }

  @Watch('show')
  onShowChange() {
    if (!this.show) {
      return
    }

    this.$options.player!.pause()
  }

  // 重试
  retry() {
    const player = this.$options.player!

    // 重试时先设置为未断网状态
    player.trigger(NETWORK_CHANGED, NETWORK.UNKNOWN)
    player.play()
    this.retrying = true
    setTimeout(() => {
      this.retrying = false
    }, 3000)
  }

  created() {
    const player = this.$options.player!

    // 监控网络
    this.stopMonitorNetType = monitorNetType(type => {
      // 重试时不改变网络类型
      if (this.retrying) {
        return
      }

      // 从其他网络切换成流量播放
      if (this.netType !== NETWORK.MOBILE && type === NETWORK.MOBILE) {
        if (sessionStorage.getItem(ALLOW_MOBILE_NETWORK_PLAY)) {
          // 已经允许过流量播放
          toast('正在使⽤运营商⽹络，请注意流量消耗', {
            className: 'vui-video__net-monitor-4g-prompt',
            target: player.el()
          })
        } else {
          // 还未允许过流量播放时暂停
          player.pause()
        }
      }

      player.trigger(NETWORK_CHANGED, type)
    })

    player.on(NETWORK_CHANGED, (event, netType: VComponent['netType']) => {
      this.netType = netType
    })

    player.on('play', () => {
      if (this.netType !== NETWORK.MOBILE) {
        return
      }

      // 允许流量播放时标记下
      sessionStorage.setItem(ALLOW_MOBILE_NETWORK_PLAY, 'true')
    })

    player.on('waiting', () => {
      if (this.waiting) {
        return
      }

      const timeWhenWaiting = player.currentTime()
      const timeUpdateListener = () => {
        // player.pause()时也会触发timeupdate，且时间不完全相等，所以要进行范围判断
        if (Math.abs(player.currentTime() - timeWhenWaiting) < 0.2) {
          return
        }

        this.waiting = false
        player.off('timeupdate', timeUpdateListener)
      }

      this.waiting = true
      player.on('timeupdate', timeUpdateListener)
    })
  }

  beforeDestroy() {
    this.stopMonitorNetType()
  }
}
</script>
