<template>
  <div>
    <vui-popover
      :show="show"
      placement="top-start"
      :radius="3"
      :triangle-width="6.5"
      :triangle-height="3.5"
      :triangle-offset="2.5"
      target="body"
    >
      <vui-button @click="show = !show">点我</vui-button>
      <template #popover>点击蒙层<br />关闭</template>
    </vui-popover>
    <vui-overlayer v-model="show" :push-state="false"> </vui-overlayer>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import VuiPopover from '../component.vue'
import VuiButton from '../../button/component.vue'
import VuiOverlayer from '../../overlayer/component.vue'

@Component({
  components: {
    VuiPopover,
    VuiButton,
    VuiOverlayer
  }
})
export default class VComponent extends Vue {
  static title = '挂载到body上'
  show = false
}
</script>
