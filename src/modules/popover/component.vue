<template>
  <div class="vui-popover">
    <slot></slot>
    <div
      ref="placeholder"
      :class="['vui-popover__placeholder', `vui-popover__placeholder--${placement}`]"
      :style="placeholderStyle"
    >
      <vui-transition v-bind="$attrs">
        <div v-show="show" ref="content" class="vui-popover__content">
          <svg
            class="vui-popover__svg"
            :width="contentWidth + 3 * triangle.height"
            :height="contentHeight + 3 * triangle.height"
            :view-box.camel="`${-1.5 * triangle.height} ${-1.5 * triangle.height} ${
              contentWidth + 3 * triangle.height
            } ${contentHeight + 3 * triangle.height}`"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path class="vui-popover__path" :d="d" fill="url(#vui-popover__background)" />
          </svg>
          <slot name="popover"></slot>
        </div>
      </vui-transition>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import VuiTransition from '../transition/component.vue'
import { getViewportScale, getPageScroll } from '@/utils/index'

// viewport缩放比例
const viewportScale = getViewportScale()

@Component({
  name: 'VuiPopover',
  inheritAttrs: false,
  components: {
    VuiTransition
  }
})
export default class VComponent extends Vue {
  // 弹框尺寸
  private contentWidth = 0
  private contentHeight = 0
  // placeholder元素样式
  private placeholderStyle = {}
  // 是否正在更新弹框尺寸、位置
  private updating!: boolean

  // 是否显示弹框
  @Prop({
    type: Boolean,
    required: true
  })
  readonly show!: boolean

  // 弹框位置
  @Prop({
    type: String,
    default: 'bottom'
  })
  readonly placement!:
    | 'top'
    | 'top-start'
    | 'top-end'
    | 'bottom'
    | 'bottom-start'
    | 'bottom-end'
    | 'left'
    | 'left-start'
    | 'left-end'
    | 'right'
    | 'right-start'
    | 'right-end'

  // viewport sacle=1时的圆角大小
  @Prop({
    type: Number,
    default: 6
  })
  readonly radius!: number

  // 三角形宽
  @Prop({
    type: Number,
    default: 13
  })
  readonly triangleWidth!: number

  // 三角形高
  @Prop({
    type: Number,
    default: 7
  })
  readonly triangleHeight!: number

  // 三角形距离最近圆角的偏移量，只在top/bottom/left/right-start/end场景下才生效
  @Prop({
    type: Number,
    default: 5
  })
  readonly triangleOffset!: number

  // 获取viewport实际缩放比例下的真实圆角大小
  get pathRadius() {
    return this.radius / viewportScale
  }

  // 获取viewport实际缩放比例下的真实尖角信息
  get triangle() {
    return {
      width: this.triangleWidth / viewportScale,
      height: this.triangleHeight / viewportScale,
      offset: this.triangleOffset / viewportScale
    }
  }

  // 弹框边界路径
  get d() {
    // 三角形圆角两侧部分的宽度、高度
    const triangleWidth = this.triangle.width / 2 - 1 / viewportScale
    const triangleHeight = (triangleWidth / (this.triangle.width / 2)) * this.triangle.height

    switch (this.placement) {
      case 'top':
      case 'top-start':
      case 'top-end':
        return `M0 ${this.pathRadius}a${this.pathRadius} ${this.pathRadius} 0 0 1 ${this.pathRadius} ${-this
          .pathRadius}h${this.contentWidth - 2 * this.pathRadius}a${this.pathRadius} ${this.pathRadius} 0 0 1 ${
          this.pathRadius
        } ${this.pathRadius}v${this.contentHeight - 2 * this.pathRadius}a${this.pathRadius} ${
          this.pathRadius
        } 0 0 1 ${-this.pathRadius} ${this.pathRadius}h${
          this.placement === 'top'
            ? this.pathRadius + this.triangle.width / 2 - this.contentWidth / 2
            : this.placement === 'top-start'
            ? 2 * this.pathRadius + this.triangle.offset + this.triangle.width - this.contentWidth
            : -this.triangle.offset
        }l${-triangleWidth} ${triangleHeight}q${triangleWidth - this.triangle.width / 2} ${
          this.triangle.height - triangleHeight
        }, ${2 * (triangleWidth - this.triangle.width / 2)} 0l${-triangleWidth} ${-triangleHeight}h${
          this.placement === 'top'
            ? this.pathRadius + this.triangle.width / 2 - this.contentWidth / 2
            : this.placement === 'top-start'
            ? -this.triangle.offset
            : 2 * this.pathRadius + this.triangle.offset + this.triangle.width - this.contentWidth
        }a${this.pathRadius} ${this.pathRadius} 0 0 1 ${-this.pathRadius} ${-this.pathRadius}Z`
      case 'bottom':
      case 'bottom-start':
      case 'bottom-end':
        return `M0 ${this.pathRadius}a${this.pathRadius} ${this.pathRadius} 0 0 1 ${this.pathRadius} ${-this
          .pathRadius}h${
          this.placement === 'bottom'
            ? this.contentWidth / 2 - this.pathRadius - this.triangle.width / 2
            : this.placement === 'bottom-start'
            ? this.triangle.offset
            : this.contentWidth - 2 * this.pathRadius - this.triangle.offset - this.triangle.width
        }l${triangleWidth} ${-triangleHeight}q${this.triangle.width / 2 - triangleWidth} ${
          triangleHeight - this.triangle.height
        }, ${2 * (this.triangle.width / 2 - triangleWidth)} 0l${triangleWidth} ${triangleHeight}h${
          this.placement === 'bottom'
            ? this.contentWidth / 2 - this.pathRadius - this.triangle.width / 2
            : this.placement === 'bottom-start'
            ? this.contentWidth - 2 * this.pathRadius - this.triangle.offset - this.triangle.width
            : this.triangle.offset
        }a${this.pathRadius} ${this.pathRadius} 0 0 1 ${this.pathRadius} ${this.pathRadius}v${
          this.contentHeight - 2 * this.pathRadius
        }a${this.pathRadius} ${this.pathRadius} 0 0 1 ${-this.pathRadius} ${this.pathRadius}h${
          2 * this.pathRadius - this.contentWidth
        }a${this.pathRadius} ${this.pathRadius} 0 0 1 ${-this.pathRadius} ${-this.pathRadius}Z`
      case 'left':
      case 'left-start':
      case 'left-end':
        return `M0 ${this.pathRadius}a${this.pathRadius} ${this.pathRadius} 0 0 1 ${this.pathRadius} ${-this
          .pathRadius}h${this.contentWidth - 2 * this.pathRadius}a${this.pathRadius} ${this.pathRadius} 0 0 1 ${
          this.pathRadius
        } ${this.pathRadius}v${
          this.placement === 'left'
            ? this.contentHeight / 2 - this.pathRadius - this.triangle.width / 2
            : this.placement === 'left-start'
            ? this.triangle.offset
            : this.contentHeight - 2 * this.pathRadius - this.triangle.offset - this.triangle.width
        }l${triangleHeight} ${triangleWidth}q${this.triangle.height - triangleHeight} ${
          this.triangle.width / 2 - triangleWidth
        }, 0 ${2 * (this.triangle.width / 2 - triangleWidth)}l${-triangleHeight} ${triangleWidth}v${
          this.placement === 'left'
            ? this.contentHeight / 2 - this.pathRadius - this.triangle.width / 2
            : this.placement === 'left-start'
            ? this.contentHeight - 2 * this.pathRadius - this.triangle.offset - this.triangle.width
            : this.triangle.offset
        }a${this.pathRadius} ${this.pathRadius} 0 0 1 ${-this.pathRadius} ${this.pathRadius}h${
          2 * this.pathRadius - this.contentWidth
        }a${this.pathRadius} ${this.pathRadius} 0 0 1 ${-this.pathRadius} ${-this.pathRadius}Z`
      case 'right':
      case 'right-start':
      case 'right-end':
        return `M0 ${this.pathRadius}a${this.pathRadius} ${this.pathRadius} 0 0 1 ${this.pathRadius} ${-this
          .pathRadius}h${this.contentWidth - 2 * this.pathRadius}a${this.pathRadius} ${this.pathRadius} 0 0 1 ${
          this.pathRadius
        } ${this.pathRadius}v${this.contentHeight - 2 * this.pathRadius}a${this.pathRadius} ${
          this.pathRadius
        } 0 0 1 ${-this.pathRadius} ${this.pathRadius}h${2 * this.pathRadius - this.contentWidth}a${this.pathRadius} ${
          this.pathRadius
        } 0 0 1 ${-this.pathRadius} ${-this.pathRadius}v${
          this.placement === 'right'
            ? this.pathRadius + this.triangle.width / 2 - this.contentHeight / 2
            : this.placement === 'right-start'
            ? 2 * this.pathRadius + this.triangle.offset + this.triangle.width - this.contentHeight
            : -this.triangle.offset
        }l${-triangleHeight} ${-triangleWidth}q${triangleHeight - this.triangle.height} ${
          triangleWidth - this.triangle.width / 2
        }, 0 ${2 * (triangleWidth - this.triangle.width / 2)}l${triangleHeight} ${-triangleWidth}Z`
    }
  }

  /**
   * 更新弹框尺寸、位置
   * 主要是为了插槽内容有变化时及时更新界面
   * 如果此时组件受transform影响，且自定义了target，则弹框最终定位可能不准确
   */
  async update() {
    if (this.updating || !this.show) {
      return
    }

    let target = this.$attrs.target as string | Element

    // 标记正在update
    this.updating = true

    // 如果placeholder挂载到其他地方，需要重新定位
    if (target) {
      if (typeof target === 'string') {
        target = document.querySelector(target)!
      }

      const placeholderEl = this.$refs.placeholder as HTMLElement

      // 先还原到this.$el下
      this.$el.appendChild(placeholderEl)
      // 重置placeholder样式并等待渲染
      this.placeholderStyle = {}
      await this.$nextTick()

      /**
       * 获取placeholder位置、尺寸信息
       * 此时popover组件可能受transform影响
       * 这里为了与实际渲染位置、尺寸一致，必须使用getBoundingClientRect来获取
       */
      const { left, top, width, height } = placeholderEl.getBoundingClientRect()
      const pageScroll = getPageScroll()

      // 再挂载到target尾部
      target.appendChild(placeholderEl)

      /**
       * 设置正确的位置
       * 这里默认气泡弹框内容相对于viewport进行定位
       * 所以target及其所有祖先都必须是static定位，否则定位会出错
       */
      if (/top|bottom/.test(this.placement)) {
        this.placeholderStyle = {
          left: `${left + pageScroll.left}px`,
          right: 'auto',
          top: `${top + pageScroll.top}px`,
          bottom: 'auto',
          width: `${width}px`
        }
      } else {
        this.placeholderStyle = {
          left: `${left + pageScroll.left}px`,
          right: 'auto',
          top: `${top + pageScroll.top}px`,
          bottom: 'auto',
          height: `${height}px`
        }
      }
    }

    // 等待渲染
    await this.$nextTick()
    /**
     * 更新弹框尺寸
     * 这里不能使用getBoundingClientRect，因为会受transform缩放影响
     * https://developer.mozilla.org/zh-CN/docs/Web/API/CSS_Object_Model/Determining_the_dimensions_of_elements
     */
    this.contentWidth = (this.$refs.content as HTMLElement).offsetWidth
    this.contentHeight = (this.$refs.content as HTMLElement).offsetHeight

    // 下一个nextTick移除update标记
    await this.$nextTick()
    this.updating = false
  }

  beforeMount() {
    if (document.querySelector('linearGradient#vui-popover__background')) {
      return
    }

    // 设置默认渐变背景色
    document.body.insertAdjacentHTML(
      'afterbegin',
      `
        <svg
          style="position: absolute; width: 0; height: 0"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="vui-popover__background" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stop-color="#ff8b00" />
              <stop offset="100%" stop-color="#ff3700" />
            </linearGradient>
          </defs>
        </svg>
      `
    )
  }

  mounted() {
    this.update()
  }

  updated() {
    this.update()
  }

  beforeDestroy() {
    const placeholderEl = this.$refs.placeholder as Element

    /**
     * 当placeholder挂载到其他位置时，需要手动移除
     * 没有挂载到其他位置时，不手动移除，让其随着祖先组件dom一起移除
     * 防止祖先组件有过渡动效，其dom还未移除时却先移除了placeholder元素，影响视觉效果
     */
    if (this.$attrs.target) {
      placeholderEl.parentElement?.removeChild(placeholderEl)
    }
  }
}
</script>
