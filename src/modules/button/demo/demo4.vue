<template>
  <div :class="$style.root">
    <vui-button :block="true" type="gorgeous">确定</vui-button>
    <vui-button :block="true" type="gorgeous" hue="primary">确定</vui-button>
    <vui-button :block="true" type="gorgeous" hue="success">确定</vui-button>
    <vui-button :block="true" type="gorgeous" hue="fail">确定</vui-button>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import VuiButton from '../component.vue'

@Component({
  components: {
    VuiButton
  }
})
export default class VComponent extends Vue {
  static title = '块级按钮'
}
</script>

<style lang="scss" module>
.root {
  :global(.vui-button) {
    margin: 30px 0 0 !important;
  }
}
</style>
