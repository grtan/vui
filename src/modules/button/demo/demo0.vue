<template>
  <div :class="$style.root">
    <div :class="$style.item">
      <vui-button hue="primary">确定</vui-button>
      regular
    </div>
    <div :class="$style.item">
      <vui-button type="gorgeous" hue="primary">确定</vui-button>
      gorgeous
    </div>
    <div :class="$style.item">
      <vui-button type="plain" hue="primary">确定</vui-button>
      plain
    </div>
    <div :class="$style.item">
      <vui-button type="gradient" hue="primary">确定</vui-button>
      gradient
    </div>
    <div :class="$style.item">
      <vui-button type="text" hue="primary">确定</vui-button>
      text
    </div>
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
  static title = '按钮类型'
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
