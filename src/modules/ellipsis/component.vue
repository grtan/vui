<template>
  <div class="vui-ellipsis" :style="style">
    <div v-show="showEllipsis" ref="ellipsis" class="vui-ellipsis__ellipsis" :style="ellipsisStyle">
      <slot name="ellipsis">...</slot>
    </div>
    <div ref="contentWrapper" class="vui-ellipsis__content-wrapper" :style="contentWrapperStyle">
      <!-- 内容必须用inline元素包裹，否则getClientRects无法获取每行文本的矩形框 -->
      <span ref="content" class="vui-ellipsis__content"><slot></slot></span>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import ResizeSensor from 'css-element-queries/src/ResizeSensor'

@Component({
  name: 'VuiEllipsis'
})
export default class VComponent extends Vue {
  // 是否正在重置
  resetting!: boolean
  width!: number
  showEllipsis = false
  style = {}
  ellipsisStyle = {}
  contentWrapperStyle = {}

  // 最多显示行数
  @Prop({
    type: Number,
    default: 1
  })
  maxLine!: number

  // 是否折叠
  @Prop({
    type: Boolean,
    default: true
  })
  collapse!: boolean

  /**
   * 展开时是否仍显示ellipsis
   * 比如ui上存在 全部/收起 之类的按钮，此时全部展开时也应该展示 收起 按钮
   */
  @Prop({
    type: Boolean,
    default: true
  })
  showEllipsisWhenUncollapsed!: boolean

  // 是否监听容器宽度变化
  @Prop({
    type: Boolean,
    default: false
  })
  monitorResize!: boolean

  // 重新计算
  async reset() {
    if (this.resetting) {
      return
    }

    // 标记为正在重新计算
    this.resetting = true
    // 重置dom和样式
    this.showEllipsis = false
    this.style = {}
    this.ellipsisStyle = {}
    this.contentWrapperStyle = {}

    // 展开状态且不需要显示ellipsis
    if (!this.collapse && !this.showEllipsisWhenUncollapsed) {
      // 渲染完后重置resetting
      await this.$nextTick()
      this.resetting = false
      return
    }

    /**
     * 等待渲染
     * 这里之所以不用$forceUpdate是因为其也是异步渲染的，仍要在$nextTick后才能获取更新后的dom
     */
    await this.$nextTick()

    /**
     * chrome/firefox每行只会返回一个rect
     * 如果一行中有空白或者多个标签，safari在该行会返回多个rect（chrome/firefox不会）
     * 但不管该行中多个标签实际高度（getBoundingClientRect().height）是否一致，其top/bottom/height都是一致的
     * 为了兼容，需要对top进行去重
     *
     * 每行rect的top相减，得到的是对应行的行高
     *
     * 注意：getClientRects获取的DOMRect是行内元素内容区的尺寸，不包括行间距。即DOMRect.height!==line-height
     */
    // 记录已排序的每行最右侧的rect
    const lineRightRects = (() => {
      const map: Record<string, DOMRect> = {}

      ;([] as DOMRect[]).slice.call((this.$refs.content as Element).getClientRects()).forEach(rect => {
        if (!map[rect.top] || map[rect.top].right < rect.right) {
          map[rect.top] = rect
        }
      })

      return Object.keys(map)
        .sort((a, b) => {
          return Number(a) - Number(b)
        })
        .map(top => map[top])
    })()

    // 未超过最大行数
    if (lineRightRects.length <= this.maxLine) {
      await this.$nextTick()
      this.resetting = false
      return
    }

    const contentWrapperBoundingRect = (this.$refs.contentWrapper as Element).getBoundingClientRect()
    const lineIndex = (this.collapse ? this.maxLine : lineRightRects.length) - 1
    /**
     * lineIndex为第一行时，paddingTop设置为0
     * 否则，需要将lineIndex之前的行往上移出contentWrapper，这样浮动的ellipsis元素才不会挤开他们的文本
     * 注意：这里要考虑精度问题，需要往上取整
     */
    const paddingTop = lineIndex ? lineRightRects[lineIndex].top - contentWrapperBoundingRect.top : 0
    // 内容元素原始的完整高度
    const totalHeight = contentWrapperBoundingRect.height

    this.showEllipsis = true
    this.style = {
      paddingTop: `${paddingTop}px`,
      /**
       * 展开状态显示ellipsis时，不需要设置高度，由最后一行内容和ellipsis共同撑开
       * 而折叠状态时，高度只能设置成最后显示的那行的bottom-top
       * 而不能设置成lineRightRects[this.maxLine].top - lineRightRects[this.maxLine - 1].top
       * 防止高度过高时，显示了下一行的内容。
       * 但这也有个小瑕疵，最后一行的inline-block元素如果vertical-align:top，且高度比文字大一些时，有可能被盖住一部分
       */
      height: this.collapse ? `${lineRightRects[lineIndex].bottom - lineRightRects[lineIndex].top}px` : undefined
    }
    this.contentWrapperStyle = {
      marginTop: `${-paddingTop}px`
    }

    // 等待渲染
    await this.$nextTick()

    // 记录最新的已排序的每行最右侧的rect
    const newLineRightRects = (() => {
      const map: Record<string, DOMRect> = {}

      ;([] as DOMRect[]).slice.call((this.$refs.content as Element).getClientRects()).forEach(rect => {
        if (!map[rect.top] || map[rect.top].right < rect.right) {
          map[rect.top] = rect
        }
      })

      return Object.keys(map)
        .sort((a, b) => {
          return Number(a) - Number(b)
        })
        .map(top => map[top])
    })()

    // 展开时需要考虑在末尾显示ellipsis后是否将内容挤到下一行了
    if (!this.collapse) {
      if (newLineRightRects.length > lineRightRects.length) {
        this.style = {
          paddingTop: `${totalHeight}px`
        }
        this.contentWrapperStyle = {
          marginTop: `${-totalHeight}px`
        }
      }

      await this.$nextTick()
      this.resetting = false
      return
    }

    // 折叠时需要消除ellipsis与最后一行文本间的间隙
    const ellipsisBoundingRect = (this.$refs.ellipsis as Element).getBoundingClientRect()
    const gap = ellipsisBoundingRect.left - newLineRightRects[lineIndex].right

    this.ellipsisStyle = {
      width: `${ellipsisBoundingRect.width + gap}px`
    }
    await this.$nextTick()
    this.resetting = false
  }

  mounted() {
    if (this.monitorResize) {
      // eslint-disable-next-line no-new
      new ResizeSensor(this.$el, ({ width }) => {
        if (width === this.width) {
          return
        }

        this.width = width
        this.reset()
      })
    } else {
      this.reset()
    }
  }

  // 当插槽内容或者props变化时更新
  updated() {
    this.reset()
  }
}
</script>
