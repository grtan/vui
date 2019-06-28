<template>
  <div :class="$options.name" v-bind="attrs">
    <div :class="`${$options.name}-scroller`" ref="scroller">
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
  import { libName } from '../../config'
  import { cubicEaseOut } from '../../tools/easing/index'
  import transit from '../../tools/transit/index'

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
        validator(value) {
          return ['none', 'async', 'sync'].indexOf(value) !== -1
        }
      },
      duration: { // 线条动画时间，单位ms
        type: Number,
        default: 300
      },
      selectedAttr: { // 选中时添加的属性的名称
        type: String,
        default: `${libName}-selected`
      }
    },
    data() {
      return {
        libName,
        linePosStyle: {}
      }
    },
    computed: {
      attrs() { // 为了兼容性，这里不使用v2.6.0+才支持的模版动态属性名功能
        return {
          [`${this.libName}-vertical`]: this.vertical,
          [`${this.libName}-upside`]: this.lineUpside,
          [`${this.libName}-scroll`]: this.scroll
        }
      },
      lineStyle() {
        return {
          visibility: this.showLine ? 'visible' : 'hidden',
          transitionDuration: `${this.lineAnimation === 'none' ? 0 : this.duration}ms`
        }
      },
      leftProp() {
        return !this.vertical ? 'left' : 'top'
      },
      rightProp() {
        return !this.vertical ? 'right' : 'bottom'
      },
      scrollProp() {
        return !this.vertical ? 'scrollLeft' : 'scrollTop'
      }
    },
    watch: {
      value: 'select',
      lineSize: 'select',
      selectedAttr: 'select',
      vertical() {
        // 等render后再选择item
        this.$nextTick(function () {
          this.left = undefined
          this.select()
        })
      }
    },
    methods: {
      select() { // 选择item
        const children = [].slice.call(this.$refs.list.children) // item的dom数组
        const scrollerRect = this.$refs.scroller.getBoundingClientRect()
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
        const right = wrapperRect[this.rightProp] - center - size / 2  // 线条定位right或bottom值
        const scrollLeft = this.$refs.scroller[this.scrollProp]
        const delta = center - (scrollerRect[this.leftProp] + scrollerRect[this.rightProp]) / 2 // 滚动位置变化量

        // 停止当前过渡
        this.transition && this.transition.pause()
        // 每次选中item时，自动滚动让item水平居中
        this.transition = transit(scrollLeft, scrollLeft + delta, (value, complete) => {
          this.$refs.scroller[this.scrollProp] = value

          if (complete) {
            this.transition = null
          }
        }, this.duration, cubicEaseOut).play()
        // 设置线条样式
        this.linePosStyle = {
          [this.leftProp]: `${left}px`,
          [this.rightProp]: `${right}px`,
          transitionDelay: this.getTransitionDelay(left, size)
        }
        // this.$children不保证顺序，所以根据dom来确定vm
        this.$children.forEach(child => {
          child.setState(child.$el === children[this.value], this.selectedAttr)
        })
        // 记录线条位置及长度
        this.left = left
        this.size = size
      },
      getTransitionDelay(left, size) { // 比较当前left、right与上一次的left、right，来获取线条过渡延迟时间
        if (this.lineAnimation !== 'async' || this.left === undefined) {
          return ''
        } else if (left >= this.left && (left + size) <= (this.left + this.size) || left <= this.left && (left + size) >= (this.left + this.size)) {  // 包含关系，线条放大或者缩小
          return ''
        } else if (left > this.left) { // 往右移动
          return `${this.duration / 4}ms,0ms`
        } else { // 往左移动
          return `0ms,${this.duration / 4}ms`
        }
      },
      onItemClick(index) {
        if (this.auto && index !== this.value) {
          this.$emit('input', index)
        }

        this.$emit('click', index)
      },
      update() { // 内容更新了
        this.$nextTick(function () {
          const children = [].slice.call(this.$refs.list.children)
          let index = children.findIndex(el => {
            return el.getAttribute(this.selectedAttr)
          })

          if (index === -1) {  // 原来选中的item的dom已经没了
            index = this.value
          }

          if (index >= children.length) { // 超出了范围
            index = 0
          }

          if (index !== this.value) {
            this.$emit('input', index)
          } else {
            this.select()
          }
        })
      }
    },
    mounted() {
      this.update()
    }
  }
</script>