<template>
  <vui-overlayer v-slot="slotProps" class="vui-dialog" :value="value" v-bind="$attrs" v-on="$listeners">
    <transition name="vui-slide-bottom" :appear="$attrs.appear">
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
    </transition>
  </vui-overlayer>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import VuiOverlayer from '../overlayer'
import VuiButton from '../button'

@Component({
  name: 'VuiDialog',
  inheritAttrs: false,
  components: {
    VuiOverlayer,
    VuiButton
  }
})
export default class VComponent extends Vue {
  @Prop({
    default: false
  })
  value!: boolean

  // 是否显示关闭按钮
  @Prop({
    default: false
  })
  showClose!: boolean

  @Prop({
    default: ''
  })
  title!: string

  @Prop({
    default: 'center'
  })
  headerAlign!: 'left' | 'center' | 'right'

  @Prop({
    default: 'center'
  })
  footerAlign!: 'left' | 'center' | 'right'
}
</script>
