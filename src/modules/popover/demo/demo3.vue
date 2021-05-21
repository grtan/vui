<template>
  <div>
    <vui-popover
      :class="$style.popover"
      :show="show"
      placement="right"
      :radius="3"
      :triangle-width="6.5"
      :triangle-height="3.5"
      :triangle-offset="2.5"
    >
      <vui-button @mouseenter.native="show = true" @mouseleave.native="show = false">自定义背景</vui-button>
      <template #popover>点击蒙层<br />关闭</template>
    </vui-popover>
    <svg style="height: 0; position: absolute; width: 0" version="1.1" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="popover-background" cx="50%" cy="50%" r="50%">
          <stop offset="0%" style="stop-color: #f00; stop-opacity: 0.5" />
          <stop offset="100%" style="stop-color: #00f; stop-opacity: 1" />
        </radialGradient>
      </defs>
    </svg>
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
  static title = '自定义背景'
  show = false
}
</script>

<style lang="scss" module>
.popover {
  :global(.vui-popover__path) {
    fill: url('#popover-background');
  }
}
</style>
