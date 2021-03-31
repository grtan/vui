<template>
  <div v-show="show" class="vui-video__loading"></div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { SCRUBBING, NETWORK_CHANGED } from '../../event'
import { NETWORK } from '@/utils/const'

@Component({
  name: 'VuiVideoLoading'
})
export default class VComponent extends Vue {
  // 正在加载等待
  private waiting = false
  // 正在拖拽快进、快退
  private scrubbing = false
  // 网络状态
  private netType: typeof NETWORK[keyof typeof NETWORK] = NETWORK.UNKNOWN

  get show() {
    return this.waiting && !this.scrubbing && this.netType !== NETWORK.DISCONNECTED
  }

  created() {
    const player = this.$options.player!

    player.on('waiting', () => {
      this.waiting = true

      const timeWhenWaiting = player.currentTime()
      const timeUpdateListener = () => {
        if (Math.abs(player.currentTime() - timeWhenWaiting) < 0.2) {
          return
        }

        this.waiting = false
        player.off('timeupdate', timeUpdateListener)
      }

      player.on('timeupdate', timeUpdateListener)
    })

    player.on(SCRUBBING, (event, { scrubbing }: { scrubbing: boolean }) => {
      this.scrubbing = scrubbing
    })

    player.on(NETWORK_CHANGED, (event, netType: VComponent['netType']) => {
      this.netType = netType
    })
  }
}
</script>
