<template>
  <div :class="$style.root">
    <vui-popover
      v-for="({ show, placement }, index) in list"
      :key="index"
      :show="show"
      :placement="placement"
      :radius="3"
      :triangle-width="6.5"
      :triangle-height="3.5"
      :triangle-offset="2.5"
    >
      <vui-button @mouseenter.native="list[index].show = true" @mouseleave.native="list[index].show = false">{{
        placement
      }}</vui-button>
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
  static title = '弹出位置'

  list = [
    {
      show: false,
      placement: 'top'
    },
    {
      show: false,
      placement: 'top-start'
    },
    {
      show: false,
      placement: 'top-end'
    },
    {
      show: false,
      placement: 'bottom'
    },
    {
      show: false,
      placement: 'bottom-start'
    },
    {
      show: false,
      placement: 'bottom-end'
    },
    {
      show: false,
      placement: 'left'
    },
    {
      show: false,
      placement: 'left-start'
    },
    {
      show: false,
      placement: 'left-end'
    },
    {
      show: false,
      placement: 'right'
    },
    {
      show: false,
      placement: 'right-start'
    },
    {
      show: false,
      placement: 'right-end'
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
