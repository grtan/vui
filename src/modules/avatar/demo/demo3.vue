<template>
  <div :class="$style.root">
    <div :class="$style.item">
      <vui-avatar
        src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
        fit="fill"
        size="big"
      ></vui-avatar>
      fill
    </div>
    <div :class="$style.item">
      <vui-avatar src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg" size="big"></vui-avatar>
      cover
    </div>
    <div :class="$style.item">
      <vui-avatar
        src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
        fit="contain"
        size="big"
      ></vui-avatar>
      contain
    </div>
    <div :class="$style.item">
      <vui-avatar
        src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
        fit="none"
        size="big"
      ></vui-avatar>
      none
    </div>
    <div :class="$style.item">
      <vui-avatar
        src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
        fit="scale-down"
        size="big"
      ></vui-avatar>
      scale-down
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
  static title = '填充模式'
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
