<template>
  <div :class="$style.root">
    <div :class="$style.item">
      <vui-button size="big" type="gorgeous" hue="primary">确定</vui-button>
      big
    </div>
    <div :class="$style.item">
      <vui-button type="gorgeous" hue="primary">确定</vui-button>
      regular
    </div>
    <div :class="$style.item">
      <vui-button size="small" type="gorgeous" hue="primary">确定</vui-button>
      small
    </div>
    <div :class="$style.item">
      <vui-button size="mini" type="gorgeous" hue="primary">确定</vui-button>
      mini
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
  static title = '按钮尺寸'
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
