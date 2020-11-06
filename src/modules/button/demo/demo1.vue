<template>
  <div :class="$style.root">
    <div :class="$style.item">
      <vui-button type="gorgeous">确定</vui-button>
      regular
    </div>
    <div :class="$style.item">
      <vui-button type="gorgeous" hue="primary">确定</vui-button>
      primary
    </div>
    <div :class="$style.item">
      <vui-button type="gorgeous" hue="success">确定</vui-button>
      success
    </div>
    <div :class="$style.item">
      <vui-button type="gorgeous" hue="fail">确定</vui-button>
      fail
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
  static title = '按钮色调'
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
