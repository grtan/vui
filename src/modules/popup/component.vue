<template>
  <vui-overlayer
    v-slot="slotProps"
    v-bind="$attrs"
    :class="['vui-popup', { 'vui-popup--nolayer': !showOverlayer }]"
    :value="value"
    v-on="$listeners"
  >
    <vui-transition :type="`popup-${position}`" :class="['vui-popup__content', `vui-popup__content--${position}`]">
      <div v-show="slotProps.show" class="vui-popup__box">
        <slot></slot>
      </div>
    </vui-transition>
  </vui-overlayer>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import VuiOverlayer from '../overlayer/component.vue'
import VuiTransition from '../transition/component.vue'

@Component({
  name: 'VuiPopup',
  inheritAttrs: false,
  components: {
    VuiOverlayer,
    VuiTransition
  }
})
export default class VComponent extends Vue {
  // 是否显示
  @Prop({
    type: Boolean,
    default: false
  })
  readonly value!: boolean

  // 是否显示蒙层
  @Prop({
    type: Boolean,
    default: true
  })
  readonly showOverlayer!: boolean

  // 弹出位置
  @Prop({
    type: String,
    default: 'bottom'
  })
  readonly position!: 'bottom' | 'top' | 'left' | 'right'
}
</script>
