<template>
  <div :class="$style.root">
    <div :class="$style.item">
      <vui-avatar :src="require('./demo.jpeg')"></vui-avatar>
      图像
    </div>
    <div :class="$style.item">
      <vui-avatar :src="require('./demo.jpeg')" type="circle"></vui-avatar>
      图像
    </div>
    <div :class="$style.item">
      <vui-avatar>何</vui-avatar>
      文字
    </div>
    <div :class="$style.item">
      <vui-avatar type="circle">何</vui-avatar>
      文字
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import VuiAvatar from '../component.vue'

@Component({
  components: {
    VuiAvatar
  }
})
export default class VComponent extends Vue {
  static title = '基础用法'
}
</script>

<style lang="scss" module>
.root {
  align-items: flex-end;
  display: flex;
  flex-wrap: wrap;
}

.item {
  align-items: center;
  display: flex;
  flex: none;
  flex-direction: column;

  &:not(:first-child) {
    margin-left: 50px;
  }
}
</style>
