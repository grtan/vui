<template>
  <div :class="$style.root">
    <vui-popover
      v-for="({ show, radius }, index) in list"
      :key="index"
      :show="show"
      :radius="radius"
      :triangle-width="6.5"
      :triangle-height="3.5"
      :triangle-offset="2.5"
    >
      <vui-button @mouseenter.native="list[index].show = true" @mouseleave.native="list[index].show = false"
        >弹框{{ index + 1 }}</vui-button
      >
      <template #popover>这是自定义的<br />气泡内容</template>
    </vui-popover>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import VuiPopover from '../component.vue'
import VuiButton from '../../button/component.vue'

@Component({
  components: {
    VuiPopover,
    VuiButton
  }
})
export default class VComponent extends Vue {
  static title = '自定义圆角大小'

  list = [
    {
      show: false,
      radius: 2
    },
    {
      show: false,
      radius: 4
    },
    {
      show: false,
      radius: 8
    }
  ]
}
</script>

<style lang="scss" module>
.root {
  display: flex;
  flex-wrap: wrap;

  > :global(.vui-popover) {
    margin: 0.5em;
  }
}
</style>
