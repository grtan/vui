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
import { MUTED_CHANGED } from '../../event'

@Component({
  name: 'VuiVideoVolume'
})
export default class VComponent extends Vue {
  private muted = this.$options.player!.muted()

  created() {
    const player = this.$options.player!

    // 将video元素音量调到最大
    player.volume(1)
    player.on(MUTED_CHANGED, (event, muted: boolean) => {
      this.muted = muted
      player.muted(muted)
    })
  }

  onClick() {
    const player = this.$options.player!

    player.trigger(MUTED_CHANGED, !player.muted())
  }
}
</script>
