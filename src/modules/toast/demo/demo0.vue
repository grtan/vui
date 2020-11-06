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
  static title = '默认形式'

  showToast() {
    Toast('这是一个toast')
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
