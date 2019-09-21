<template>
  <div :class="$options.name" :data-vertical="vertical" :data-upside="upside" :data-scroll="scroll">
    <div :class="`${$options.name}-scroller`" ref="scroller" @scroll="onScroll">
      <div :class="`${$options.name}-wrapper`" ref="wrapper">
        <div :class="`${$options.name}-list`" ref="list">
          <slot></slot>
        </div>
        <div :class="`${$options.name}-line`" :style="[lineStyle,linePosStyle]"></div>
      </div>
    </div>
  </div>
</template>

<script>
import ResizeSensor from 'css-element-queries/src/ResizeSensor'
import { libName } from '../../config'
import { cubicEaseOut } from '../../tools/easing/index'
import Transit from '../../tools/transit/index'

export default {
  name: `${libName}-tab`,
  props: {
    value: {
      type: Number,
      default: 0
    },
    vertical: { // 是否是垂直方向
      type: Boolean,
      default: false
    },
    auto: { // 点击时是否自动切换
      type: Boolean,
      default: true
    },
    scroll: { // 当item过多溢出时，用户能否手动滚动
      type: Boolean,
      default: true
    },
    showLine: { // 是否显示线条
      type: Boolean,
      default: true
    },
    lineUpside: { // 线条是在底部、右侧还是顶部、左侧
      type: Boolean,
      default: false
    },
    lineSize: { // 线条长度，Number类型为相对于item长度的比例，Function类型接受一个入参index，返回线条具体px长度
      type: [Number, Function],
      default: 1
    },
    lineAnimation: { // 线条动画类型，none表示没有动画，async表示线条两端异步移动，sync表示线条两端同步移动
      type: String,
      default: 'async',
      validator (value) {
        return ['none', 'async', 'sync'].indexOf(value) !== -1
      }
    },
    duration: { // 线条动画时间，单位ms
      type: Number,
      default: 300
    },
    selectedAttr: { // 选中时添加的属性的名称
      type: String,
      default: 'data-selected'
    },
    stickyIndex: { // 滚动时哪个item应用粘性布局，-1表示不应用
      type: Number,
      default: -1
    }
  },
  data () {
    return {
      linePosStyle: {}
    }
  },
  computed: {
    lineStyle () {
      return {
        visibility: this.showLine ? 'visible' : 'hidden',
        transitionDuration: `${this.lineAnimation === 'none' ? 0 : this.duration}ms`
      }
    },
    leftProp () {
      return !this.vertical ? 'left' : 'top'
    },
    rightProp () {
      return !this.vertical ? 'right' : 'bottom'
    },
    scrollProp () {
      return !this.vertical ? 'scrollLeft' : 'scrollTop'
    }
  },
  watch: {
    value: 'select',
    lineSize: 'setLine',
    stickyIndex: 'onScroll',
    vertical () {
      this.$nextTick(function () {
        this.left = undefined
        this.select()
      })
    }
  },
  methods: {
    select () { // 选择item
      const children = [].slice.call(this.$refs.list.children)
      const itemRect = children[this.value].getBoundingClientRect()
      const center = (itemRect[this.leftProp] + itemRect[this.rightProp]) / 2 // 中心位置
      const scrollLeft = this.$refs.scroller[this.scrollProp]
      const scrollerRect = this.$refs.scroller.getBoundingClientRect()
      const delta = center - (scrollerRect[this.leftProp] + scrollerRect[this.rightProp]) / 2 // 滚动位置变化量

      // 设置线条
      this.setLine()
      // this.$children不保证顺序，所以根据dom来确定vm
      this.$children.forEach(child => {
        child.select(child.$el === children[this.value])
      })
      // 停止当前过渡
      this.transition && this.transition.pause()
      // 确保至少调用一次onScroll
      this.onScroll()

      // 每次选中item时，自动滚动让item水平居中
      if (delta) {
        this.transition = new Transit({
          from: scrollLeft,
          to: scrollLeft + delta,
          duration: this.duration,
          easing: cubicEaseOut,
          callback: (value, complete) => {
            this.$refs.scroller[this.scrollProp] = value
          }
        }).play()
      }
    },
    setLine () {
      const children = [].slice.call(this.$refs.list.children)
      const wrapperRect = this.$refs.wrapper.getBoundingClientRect()
      const itemRect = children[this.value].getBoundingClientRect()
      const center = (itemRect[this.leftProp] + itemRect[this.rightProp]) / 2 // 中心位置
      let size

      if (typeof this.lineSize === 'function') {
        size = this.lineSize(this.value)
      } else {
        size = (itemRect[this.rightProp] - itemRect[this.leftProp]) * this.lineSize
      }

      const left = center - wrapperRect[this.leftProp] - size / 2 // 线条定位left或top值
      const right = wrapperRect[this.rightProp] - center - size / 2 // 线条定位right或bottom值

      // 设置线条样式
      this.linePosStyle = {
        [this.leftProp]: `${left}px`,
        [this.rightProp]: `${right}px`,
        transitionDelay: this.getTransitionDelay(left, size)
      }
      // 记录线条位置及长度
      this.left = left
      this.size = size
    },
    getTransitionDelay (left, size) { // 比较当前left、right与上一次的left、right，来获取线条过渡延迟时间
      if (this.lineAnimation !== 'async' || this.left === undefined) {
        return ''
      } else if ((left >= this.left && (left + size) <= (this.left + this.size)) || (left <= this.left && (left + size) >= (this.left + this.size))) { // 包含关系，线条放大或者缩小
        return ''
      } else if (left > this.left) { // 往右移动
        return `${this.duration / 4}ms,0ms`
      } else { // 往左移动
        return `0ms,${this.duration / 4}ms`
      }
    },
    onItemClick (index) {
      if (this.auto && index !== this.value) {
        this.$emit('input', index)
      }

      this.$emit('click', index)
    },
    update () { // 内容更新了
      if (this.updated) {
        return
      }

      this.updated = true
      this.$nextTick(function () {
        let index = -1
        const child = this.$children.filter(function (child) {
          return child.selected
        })[0]

        if (child) {
          index = child.getIndex()
        }

        if (index === -1) { // 原来选中的item已经没了
          index = this.value
        }

        if (index >= this.$children.length) { // 超出了范围
          index = 0
        }

        if (index !== this.value) {
          this.$emit('input', index)
        } else {
          this.select()
        }

        this.updated = false
      })
    },
    onScroll () {
      const scrollerRect = this.$refs.scroller.getBoundingClientRect()

      // 通知子组件
      this.$children.forEach(function (child) {
        child.onScroll(scrollerRect)
      })
    }
  },
  mounted () {
    // 初始化并监控尺寸变化，因为有可能组件创建时是隐藏的状态
    // eslint-disable-next-line no-new
    new ResizeSensor(this.$el, ({ width, height }) => {
      if ((!this.vertical && this.width !== width) || (this.vertical && this.height !== height)) {
        this.update()
      }

      this.width = width
      this.height = height
    })
  }
}
</script>
