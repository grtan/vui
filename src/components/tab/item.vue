<template>
  <div :class="$options.name" v-bind="attrs" @click="onClick">
    <div :class="`${$options.name}-fixed`" :style="style">
      <slot></slot>
      <div :class="`${$parent.$options.name}-line`" :style="[$parent.lineStyle,lineStyle]"></div>
    </div>
    <div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
import { libName } from '../../config'

export default {
  name: `${libName}-tab-item`,
  data () {
    return {
      selected: false, // 是否选中
      fixed: '', // 是否固定显示
      width: undefined
    }
  },
  computed: {
    attrs () {
      return {
        [this.$parent.selectedAttr]: this.selected
      }
    },
    style () {
      return {
        display: this.fixed ? 'block' : 'none',
        width: this.width !== undefined ? `${this.width}px` : 'auto',
        ...(this.$parent.vertical ? {
          top: this.fixed === 'left' ? '0' : 'auto',
          bottom: this.fixed === 'right' ? '0' : 'auto'
        } : {
          left: this.fixed === 'left' ? '0' : 'auto',
          right: this.fixed === 'right' ? '0' : 'auto'
        })
      }
    },
    lineStyle () {
      const size = typeof this.$parent.lineSize === 'function' ? `${this.$parent.lineSize(this.getIndex())}px` : `${this.$parent.lineSize * 100}%`

      return {
        display: this.selected ? 'block' : 'none', // 只有当前选中的item才显示线条
        [this.$parent.vertical ? 'height' : 'width']: size
      }
    }
  },
  methods: {
    getIndex () {
      // 根据dom来确定位置
      return [].slice.call(this.$el.parentElement.children).findIndex(child => {
        return child === this.$el
      })
    },
    onClick () {
      this.$parent.onItemClick(this.getIndex())
    },
    select (selected) { // 设置是否选中
      this.selected = selected
    },
    onScroll (scrollerRect) {
      if (this.getIndex() !== this.$parent.stickyIndex) {
        this.fixed = ''

        return
      }

      const rect = this.$el.getBoundingClientRect()
      const leftProp = this.$parent.leftProp
      const rightProp = this.$parent.rightProp

      if (rect[leftProp] < scrollerRect[leftProp]) {
        this.fixed = 'left'
      } else if (rect[rightProp] > scrollerRect[rightProp]) {
        this.fixed = 'right'
      } else {
        this.fixed = ''
      }

      // 固定显示时保持宽度跟父元素一致
      if (this.fixed) {
        this.width = rect.width
      }
    }
  },
  /**
   * 只能检测数目变化，无法检测内容变化
   * https://github.com/vuejs/vue/issues/6133
   */
  created () {
    this.$parent.update()
  },
  beforeDestroy () {
    this.$parent.update()
  }
}
</script>
