<template>
  <div :class="$style.root">
    <vui-button type="gorgeous" hue="primary" @click="showToast">显示</vui-button>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import Toast from '../'
import VuiButton from '../../button/component.vue'

@Component({
  components: {
    VuiButton
  }
})
export default class VComponent extends Vue {
  static title = '内联html'

  showToast() {
    Toast('<i>这是一个toast</i>', {
      allowHtml: true
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
