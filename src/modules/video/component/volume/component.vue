<template>
  <div
    :class="[
      'vui-video__volume',
      {
        'vui-video__volume--muted': muted
      }
    ]"
    @click="onClick"
  ></div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component({
  name: 'VuiVideoVolume'
})
export default class VComponent extends Vue {
  // 静音
  private muted = true

  created() {
    const player = this.$options.player!

    player.muted(this.muted)
    // 将video元素音量调到最大
    player.volume(1)
  }

  onClick() {
    const player = this.$options.player!

    this.muted = !player.muted()
    player.muted(this.muted)
  }
}
</script>
