<template>
  <div class="vui-video__header">
    <div v-if="fullscreen" class="vui-video__header-back" @click="back"></div>
    <div class="vui-video__header-title">{{ title }}</div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component({
  name: 'VuiVideoHeader'
})
export default class VComponent extends Vue {
  private fullscreen = false
  private title = ''

  created() {
    const player = this.$options.player!

    player.on('fullscreenchange', () => {
      this.fullscreen = player.isFullscreen()
    })

    player.on('v:title', (event, title: string) => {
      this.title = title
    })
  }

  back() {
    history.back()
  }
}
</script>
