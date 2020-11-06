<template>
  <div :class="$style.root">
    <div :class="$style.item">
      <vui-tag hue="primary">标签</vui-tag>
      regular
    </div>
    <div :class="$style.item">
      <vui-tag type="gorgeous" hue="primary">标签</vui-tag>
      gorgeous
    </div>
    <div :class="$style.item">
      <vui-tag type="plain" hue="primary">标签</vui-tag>
      plain
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
  static title = '标签类型'
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
