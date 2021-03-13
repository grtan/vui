<template>
  <div class="vui-overlayer">
    <vui-transition v-bind="$attrs" @after-enter="onAfterEnter" @after-leave="onAfterLeave">
      <div
        v-show="show"
        :class="[
          'vui-overlayer__layer',
          { 'vui-overlayer__layer--hide': hideLayer, 'vui-overlayer__layer--light': light }
        ]"
        :style="{ zIndex: layerZIndex }"
        @click="onClick"
        @touchmove="$event.preventDefault()"
      ></div>
    </vui-transition>
    <div class="vui-overlayer__content" :style="{ zIndex: contentZIndex }">
      <slot :show="show"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import VuiTransition from '../transition'
import { zIndex, update } from '@/utils/store'

// 当前显示的蒙层组件列表
const layers: any[] = []

@Component({
  name: 'VuiOverlayer',
  inheritAttrs: false,
  components: {
    VuiTransition
  }
})
export default class VComponent extends Vue {
  // 遮罩层z-index
  layerZIndex = zIndex
  // 内容层z-index
  contentZIndex = zIndex
  // 隐藏遮罩层
  hideLayer = true
  // 显示的时间
  showTime = Date.now()
  // 是否按的back键
  back = false

  @Prop({
    type: Boolean,
    default: false
  })
  readonly value!: boolean

  show = this.value

  // 浅色还是深色
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

  @Watch('value')
  async onValueChange() {
    if (!this.value) {
      const close = await new Promise(resolve => {
        this.beforeClose((close = true) => {
          resolve(close)
        })
      })

      if (close) {
        // 允许关闭
        this.show = false
      } else {
        // 如果是按的返回键
        this.back && history.forward()
        this.$emit('input', true)
      }
    } else {
      this.show = true
    }
  }

  @Watch('show', {
    immediate: true
  })
  async onShowChange(value: boolean) {
    // 遮罩层的处理
    if (value) {
      // 应用最新的zIndex
      this.layerZIndex = zIndex
      this.contentZIndex = zIndex
      // 如果下面有蒙层，则隐藏当前蒙层
      this.hideLayer = !!layers.length
      // 增加全局zIndex，这里至少要加2，因为后续显示的蒙层dom可能在当前显示蒙层dom的前面
      update({ zIndex: zIndex + 2 })

      if (layers.length) {
        const preLayer = layers[layers.length - 1]

        // 将顶层蒙层下一层的zIndex加1以遮盖其内容
        preLayer.layerZIndex = preLayer.contentZIndex + 1
        preLayer.hideLayer = false
        // 重置下面的蒙层
        layers.slice(0, -1).forEach(layer => {
          layer.layerZIndex = layer.contentZIndex
          layer.hideLayer = true
        })
      }

      if (!layers.includes(this)) {
        layers.push(this)
      }
    } else {
      // 如果是顶层蒙层
      if (!this.hideLayer) {
        const index = layers.indexOf(this)

        if (index) {
          // 如果下面还有蒙层，则显示下一层蒙层
          const preLayer = layers[index - 1]

          this.hideLayer = true
          preLayer.hideLayer = false
          preLayer.layerZIndex = preLayer.contentZIndex + 1
        } else {
          // 恢复z-index
          this.layerZIndex = this.contentZIndex
        }
      }
    }

    // 历史记录的处理
    if (this.pushState) {
      const stateName = `${this.$options.name}-showTime`

      if (value) {
        // 记录组件显示的时间
        this.showTime = Date.now()
        history.pushState(
          {
            [stateName]: this.showTime
          },
          ''
        )
        window.addEventListener('popstate', this.onPopState)
      } else {
        window.removeEventListener('popstate', this.onPopState)

        if (history.state?.[stateName] === this.showTime) {
          // 当历史记录对应当前组件时才后退，防止影响其他蒙层或者页面历史记录
          history.back()
        }
      }
    }
  }

  onAfterEnter() {
    const index = layers.indexOf(this)

    // 如果是顶层蒙层
    if (index === layers.length - 1) {
      // 显示当前蒙层
      this.hideLayer = false

      // 重置下面的蒙层
      layers.slice(0, -1).forEach(layer => {
        layer.layerZIndex = layer.contentZIndex
        layer.hideLayer = true
      })
    }
  }

  onAfterLeave() {
    const index = layers.indexOf(this)

    // 重置下一层蒙层
    if (index) {
      layers[index - 1].layerZIndex = layers[index - 1].contentZIndex
    }
    // 移除当前组件
    layers.splice(index, 1)
  }

  async onClick() {
    if (!this.closeOnClickOverlayer) {
      return
    }

    this.$emit('input', false)
  }

  async onPopState({ state }: PopStateEvent) {
    const showTime = state?.[`${this.$options.name}-showTime`]

    // 如果当前历史记录是在蒙层组件显示后创建的
    if (showTime && showTime >= this.showTime) {
      return
    }

    // 返回或者新建历史记录
    this.back = true
    this.$emit('input', false)
  }

  mounted() {
    let target = (this.$attrs.target as 'string' | HTMLElement) || 'body'

    if (typeof target === 'string') {
      target = document.querySelector(target) as HTMLElement
    }

    // 将dom根节点移到target下
    target.appendChild(this.$el)
  }

  beforeDestroy() {
    this.show && this.onShowChange(false)
    this.$el.parentNode!.removeChild(this.$el)
  }
}
</script>
