<template>
  <div :class="$style.root">
    <div :class="$style.item">
      <vui-tag type="gorgeous" hue="primary" size="big" closable="true">大型标签</vui-tag>
      big
    </div>
    <div :class="$style.item">
      <vui-tag type="gorgeous" hue="primary" closable="true">常规标签</vui-tag>
      regular
    </div>
    <div :class="$style.item">
      <vui-tag type="gorgeous" hue="primary" size="small" closable="true">小型标签</vui-tag>
      small
    </div>
    <div :class="$style.item">
      <vui-tag type="gorgeous" hue="primary" size="mini" closable="true">超小标签</vui-tag>
      mini
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import VuiTag from '../component.vue'

@Component({
  components: {
    VuiTag
  }
})
export default class VComponent extends Vue {
  static title = '标签尺寸'
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
  align-items: center;
  display: flex;
  flex: none;
  flex-direction: column;
  margin-top: 40px;

  &:not(:first-child) {
    margin-left: 50px;
  }
}
</style>
