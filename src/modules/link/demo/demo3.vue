<template>
  <div :class="$style.root">
    <div :class="$style.item">
      <vui-link vue="primary" href="#" size="big" icon="">大链接</vui-link>
      <vui-link vue="success" href="#" size="big">大链接</vui-link>
      <vui-link vue="fail" href="#" size="big">大链接</vui-link>
      <vui-link vue="regular" href="#" size="big">大链接</vui-link>
    </div>
    <div :class="$style.item">
      <vui-link vue="primary" href="#" size="regular" icon="">正常链接</vui-link>
      <vui-link vue="success" href="#" size="regular">正常链接</vui-link>
      <vui-link vue="fail" href="#" size="regular">正常链接</vui-link>
      <vui-link vue="regular" href="#" size="regular">正常链接</vui-link>
    </div>
    <div :class="$style.item">
      <vui-link vue="primary" href="#" size="small" icon="">小链接</vui-link>
      <vui-link vue="success" href="#" size="small">小链接</vui-link>
      <vui-link vue="fail" href="#" size="small">小链接</vui-link>
      <vui-link vue="regular" href="#" size="small">小链接</vui-link>
    </div>
    <div :class="$style.item">
      <vui-link vue="primary" href="#" size="mini" icon="">超小链接</vui-link>
      <vui-link vue="success" href="#" size="mini">超小链接</vui-link>
      <vui-link vue="fail" href="#" size="mini">超小链接</vui-link>
      <vui-link vue="regular" href="#" size="mini">超小链接</vui-link>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import VuiLink from '../component.vue'

@Component({
  components: {
    VuiLink
  }
})
export default class VComponent extends Vue {
  static title = '链接大小'
}
</script>

<style lang="scss" module>
.root {
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  margin-top: -40px;
}

.item {
  align-items: flex-start;
  display: flex;
  flex: none;
  flex-direction: row;
  margin-top: 40px;
}
</style>
