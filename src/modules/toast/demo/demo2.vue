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
  static title = '显示5s'

  showToast() {
    Toast('这是一个显示5s的toast', {
      duration: 5000
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
