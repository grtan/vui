<template>
  <div :class="$style.root">
    <vui-button type="gorgeous" hue="primary" @click="onShow">显示</vui-button>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import VuiDialog from '../'
import VuiToast from '../../toast'
import VuiButton from '../../button/component.vue'

@Component({
  components: {
    VuiButton
  }
})
export default class VComponent extends Vue {
  static title = 'confirm方法'

  onShow() {
    VuiDialog.confirm({
      title: '冰川隧道',
      content:
        '深入冰川内部，探秘内部冰川景观。冰川隧道位于朗格冰川，虽然由人工修凿，但非常稳定，弥补了夏季不能去蓝冰洞的不足，也比冰川徒步更加休闲。',
      beforeClose(action, close) {
        close()
        VuiToast(action)
      }
    })
  }
}
</script>

<style lang="scss" module>
.root {
  align-items: center;
  display: flex;
  flex-direction: column;
}
</style>
