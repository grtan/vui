<template>
  <vui-overlayer v-slot="slotProps" class="vui-dialog" :value="value" v-bind="$attrs" v-on="$listeners">
    <vui-transition v-bind="$attrs" type="popup-bottom">
      <div v-show="slotProps.show" class="vui-dialog__wrapper">
        <div v-if="showClose" class="vui-dialog__close" @click="$emit('input', false)">X</div>
        <div v-if="title || $slots.header" :class="['vui-dialog__header', `vui-dialog__header--${headerAlign}`]">
          <slot name="header">
            {{ title }}
          </slot>
        </div>
        <div class="vui-dialog__content">
          <slot></slot>
        </div>
        <div v-if="$slots.footer" :class="['vui-dialog__footer', `vui-dialog__footer--${footerAlign}`]">
          <slot name="footer"></slot>
        </div>
      </div>
    </vui-transition>
  </vui-overlayer>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import VuiTransition from '../transition'
import VuiOverlayer from '../overlayer'

@Component({
  name: 'VuiDialog',
  inheritAttrs: false,
  components: {
    VuiTransition,
    VuiOverlayer
  }
})
export default class VComponent extends Vue {
  @Prop({
    type: Boolean,
    default: false
  })
  value!: boolean

  // 是否显示关闭按钮
  @Prop({
    type: Boolean,
    default: false
  })
  showClose!: boolean

  @Prop({
    type: String,
    default: ''
  })
  title!: string

  @Prop({
    type: String,
    default: 'center'
  })
  headerAlign!: 'left' | 'center' | 'right'

  @Prop({
    type: String,
    default: 'center'
  })
  footerAlign!: 'left' | 'center' | 'right'
}
</script>
