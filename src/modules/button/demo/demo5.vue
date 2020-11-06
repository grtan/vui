<template>
  <div :class="$style.root">
    <vui-button :disabled="true" type="gorgeous">确定</vui-button>
    <vui-button :disabled="true" type="gorgeous" hue="primary">确定</vui-button>
    <vui-button :disabled="true" type="gorgeous" hue="success">确定</vui-button>
    <vui-button :disabled="true" type="gorgeous" hue="fail">确定</vui-button>
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
  static title = '禁用按钮'
}
</script>

<style lang="scss" module>
.root {
  align-items: flex-end;
  display: flex;
  flex-wrap: wrap;
  margin-top: -40px;
}
</style>
