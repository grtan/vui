<template>
  <vui-overlayer v-slot="slotProps" :class="['vui-popup', { 'vui-popup--nolayer': !overlayer }]" :value="value" @input="$listeners.input" :push-state="pushState" :light="light" :close-on-click-overlayer="closeOnClickOverlayer" :before-close="beforeClose">
    <vui-transition :type="`popup-${popupDir}`" :class="['vui-popup__content', `vui-popup__content--${direction}`]">
      <div v-show="slotProps.show" class="vui-popup__box">
        <slot></slot>
      </div>
    </vui-transition>
  </vui-overlayer>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import VuiOverlayer from '../overlayer'
import VuiTransition from '../transition'

@Component({
  name: 'VuiPopup',
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

  // 是否有蒙层
  @Prop({
    type: Boolean,
    default: true
  })
  readonly overlayer!: boolean

  // 蒙层颜色是否为浅色
  @Prop({
    type: Boolean,
    default: false
  })
  readonly light!: boolean

   // 打开蒙层时是否pushState，如果是的话返回时关闭蒙层而不是页面后退
  @Prop({
    type: Boolean,
    default: true
  })
  readonly pushState!: boolean

// 点击蒙层是否自动关闭
  @Prop({
    type: Boolean,
    default: true
  })
  readonly closeOnClickOverlayer!: boolean

  // 关闭前勾子
  @Prop({
    type: Function,
    default(close: () => void) {
      close()
    }
  })
  readonly beforeClose!: (callback: (close?: boolean) => void) => void

  // 弹出方向
  @Prop({
    type: String,
    default: 'up'
  })
  readonly direction!: 'up' | 'down' | 'left' | 'right'

  // 转化popup与transition的弹出方向，符合弹出逻辑
  popupDir: string =
    this.direction === 'up'
      ? 'bottom'
      : this.direction === 'down'
      ? 'top'
      : this.direction === 'left'
      ? 'right'
      : 'left'
}
</script>
