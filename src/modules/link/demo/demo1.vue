<template>
  <div :class="$style.root">
    <div :class="$style.item">
      <vui-link vue="primary" href="#" :underline="false">无下划线</vui-link>
      <vui-link vue="success" href="#" :underline="false">无下划线</vui-link>
      <vui-link vue="fail" href="#">有下划线</vui-link>
      <vui-link vue="regular" href="#">有下划线</vui-link>
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
  static title = '链接下划线'
}
</script>

<style lang="scss" module>
.root {
  align-items: flex-end;
  display: flex;
  flex-wrap: wrap;
  margin-top: -40px;
}

.item {
  align-items: flex-start;
  display: flex;
  flex: none;
  flex-direction: row;
  margin-top: 40px;

  &:not(:first-child) {
    margin-left: 50px;
  }
}
</style>
