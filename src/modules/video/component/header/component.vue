<template>
  <div v-if="fullscreen" class="vui-video__header">
    <div class="vui-video__header-back" @click="back"></div>
    <div class="vui-video__header-title">{{ title }}</div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { TITLE_CHANGED } from '../../event'

@Component({
  name: 'VuiVideoHeader'
})
export default class VComponent extends Vue {
  private fullscreen = this.$options.player!.isFullscreen()
  private title = ''

  created() {
    const player = this.$options.player!

    player.on('fullscreenchange', () => {
      this.fullscreen = player.isFullscreen()
    })

    player.on(TITLE_CHANGED, (event, title: string) => {
      this.title = title
    })
  }

  back() {
    const player = this.$options.player!

    player.exitFullscreen()
  }
}
</script>
