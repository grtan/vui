<template>
  <div v-show="waiting && !scrubbing && netType !== 1" class="vui-video__loading"></div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component({
  name: 'VuiVideoLoading'
})
export default class VComponent extends Vue {
  // 正在加载等待
  private waiting = false
  // 正在快进、快退
  private scrubbing = false
  // 网络状态
  private netType = 0

  created() {
    const player = this.$options.player!

    player.on('waiting', () => {
      this.waiting = true

      const timeWhenWaiting = player.currentTime()
      const timeUpdateListener = () => {
        if (Math.abs(player.currentTime() - timeWhenWaiting) < 0.1) {
          return
        }

        this.waiting = false
        player.off('timeupdate', timeUpdateListener)
      }

      player.on('timeupdate', timeUpdateListener)
    })

    player.on('v:scrubbing', (event, { scrubbing }: { scrubbing: boolean }) => {
      this.scrubbing = scrubbing
    })

    player.on('v:nettype', (event, netType: number) => {
      this.netType = netType
    })
  }
}
</script>
