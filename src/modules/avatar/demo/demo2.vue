<template>
  <div :class="$style.root">
    <div :class="$style.item">
      <vui-avatar :src="require('./demo.jpeg')" size="big"></vui-avatar>
      big
    </div>
    <div :class="$style.item">
      <vui-avatar :src="require('./demo.jpeg')"></vui-avatar>
      regular
    </div>
    <div :class="$style.item">
      <vui-avatar :src="require('./demo.jpeg')" size="small"></vui-avatar>
      small
    </div>
    <div :class="$style.item">
      <vui-avatar :src="require('./demo.jpeg')" size="mini"></vui-avatar>
      mini
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
  static title = '头像大小'
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
