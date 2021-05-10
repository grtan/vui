<template>
  <div :class="$style.root">
    <vui-popover
      v-for="({ show, triangleWidth, triangleHeight, triangleOffset }, index) in list"
      :key="index"
      :show="show"
      placement="bottom-start"
      :radius="4"
      :triangle-width="triangleWidth"
      :triangle-height="triangleHeight"
      :triangle-offset="triangleOffset"
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
  static title = '自定义三角形大小、位置'

  list = [
    {
      show: false,
      triangleWidth: 4,
      triangleHeight: 3,
      triangleOffset: 2
    },
    {
      show: false,
      triangleWidth: 7,
      triangleHeight: 9,
      triangleOffset: 7
    },
    {
      show: false,
      triangleWidth: 10,
      triangleHeight: 8,
      triangleOffset: 10
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

    &:nth-child(2) {
      :global(.vui-transition) {
        margin-top: 55px;
      }
    }

    // stylelint-disable-next-line no-descending-specificity
    &:nth-child(3) {
      :global(.vui-transition) {
        margin-top: 55px;
      }
    }
  }
}
</style>
