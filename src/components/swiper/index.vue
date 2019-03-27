<template>
  <div class="vui-swiper" :class="{'vui-swiper-horizontal':!vertical}"
       @touchmove="touchmove" @touchend="touchend">
    <ul :style="style" ref="list">
      <slot></slot>
    </ul>
  </div>
</template>

<style lang="less">
  .vui-swiper {
    overflow: hidden;

    > ul {
      list-style-type: none;
      margin: 0;
      padding: 0;
    }

    &-horizontal > ul {
      white-space: nowrap;

      > li {
        display: inline-block;
        vertical-align: top;
        width: 100%;
        white-space: normal;
      }
    }
  }
</style>

<script>
  import { cubicEaseOut } from '../../tools/easing/index'
  import { raf, caf } from '../../tools/prefix/index'

  export default {
    name: 'vui-swiper',
    props: {
      value: {
        type: Number,
        default: 0
      },
      direction: {
        type: String,
        default: 'left',
        validator (value) {
          return ['up', 'down', 'left', 'right'].indexOf(value) !== -1
        }
      },
      loop: { // 是否循环
        type: Boolean,
        default: true
      },
      interval: { // 轮播间隔时间
        type: Number,
        default: 3000
      },
      duration: { // 动画时间，表示多少帧
        type: Number,
        default: 30
      },
      swipe: { // 是否可以手指滑动
        type: Boolean,
        default: true
      },
      threshold: { // 超过了多少百分比才切换
        type: Number,
        default: 0.2
      }
    },
    data () {
      return {
        index: this.value,
        pos: this.value + this.loop,
        height: undefined
      }
    },
    computed: {
      $style () {
        return this.$options.cssModules
      },
      style () {
        return {
          height: this.height + 'px',
          transform: `translate${this.vertical ? 'Y' : 'X'}(${-this.pos * 100}%)`
        }
      },
      vertical () {
        return ['up', 'down'].indexOf(this.direction) !== -1
      }
    },
    watch: {
      value (value) {
        this.index = value
      },
      index (value) {
        this.preventUpdate()
        this.clear()
        this.$emit('input', value)
        value + this.loop - this.pos && this.buffer(this.pos, value + this.loop - this.pos, Math.round(Math.min(Math.abs(value + this.loop - this.pos), 1) * this.duration) || 1)
      },
      direction: 'preventUpdate',
      interval: 'preventUpdate',
      duration: 'preventUpdate',
      swipe: 'preventUpdate',
      threshold: 'preventUpdate',
      pos: 'preventUpdate',
      height: 'preventUpdate'
    },
    methods: {
      preventUpdate () { // 组件属性变化时阻止触发updated钩子，确保只有slot内容变化才触发
        this.prevent = true
      },
      update () { // 内容有变化
        let first, last, max

        // 获取子项最高的高度
        this.$children.forEach((child, index) => {
          !index && (first = child.$el)
          index === this.$children.length - 1 && (last = child.$el)
          ;(!index || child.$el.offsetHeight > max) && (max = child.$el.offsetHeight)
        })
        // 给每个子项设置成最高高度
        this.$children.forEach(child => {
          child.$el.style.height = max + 'px'
        })
        // 将第一项复制到最后，将最后一项复制到最前
        if (this.first) {
          this.first.parentElement.removeChild(this.first)
          this.first = undefined
        }
        if (this.last) {
          this.last.parentElement.removeChild(this.last)
          this.last = undefined
        }
        if (this.loop) {
          this.first = first.cloneNode(true)
          this.last = last.cloneNode(true)
          this.$refs.list.insertBefore(this.last, first)
          this.$refs.list.appendChild(this.first)
        }
        // 这里必须要用max记录最大值后赋值，因为只要this.height中途变化了，即使最后的结果没变，也会调用render函数，触发updated钩子。但只要最后的结果没变，watch钩子是不会执行的
        this.height = max
        this.check(true)
      },
      check (slotChange) {
        if (slotChange) { // slot内容变化
          this.clear()
          this.pos = Math.round(this.pos)
        }
        // 处理边界情况，slot内容更改后有可能大于
        if (this.loop) {
          if (this.pos >= this.$children.length + 1) {
            this.pos = 1
          } else if (this.pos <= 0) {
            this.pos = this.$children.length
          }
        } else {
          if (this.pos >= this.$children.length) {
            this.pos = this.$children.length - 1
          } else if (this.pos < 0) {
            this.pos = 0
          }
        }
        // 同步index
        this.index = this.pos - this.loop
        this.$nextTick(function () {
          // 触发位置变化事件
          this.$emit('change', this.index)
          this.next()
        })
      },
      next () { // 下一步
        this.interval && (this.intervalId = setTimeout(() => {
          if (['up', 'left'].indexOf(this.direction) !== -1) {
            this.index = this.loop ? this.index + 1 : (this.index + 1) % this.$children.length
          } else {
            this.index = this.loop ? this.index - 1 : (this.index - 1 + this.$children.length) % this.$children.length
          }
        }, this.interval))
      },
      buffer (b, c, d) { // 缓冲
        let t = 0
        const fn = () => {
          t++
          this.pos = cubicEaseOut(t, b, c, d)
          t === d && (this.pos = Math.round(this.pos))
          t < d ? (this.rafId = raf(fn)) : this.check()
        }

        this.rafId = raf(fn)
      },
      clear () {
        caf(this.rafId)
        clearInterval(this.intervalId)
      },
      touchmove (event) {
        if (!this.swipe) {
          return
        }

        if (this.touchId === undefined) {
          this.clear()
          this.touchId = event.changedTouches[0].identifier
          this.prev = this.vertical ? event.changedTouches[0].clientY : event.changedTouches[0].clientX
          this.offset = 0
        } else {
          const touch = [].slice.call(event.changedTouches).filter(touch => {
            return touch.identifier === this.touchId
          })[0]

          if (touch) { // 同一个触点移动
            const current = this.vertical ? touch.clientY : touch.clientX
            this.offset = (this.prev - current) / this.$refs.list[this.vertical ? 'offsetHeight' : 'offsetWidth']
            this.pos += this.offset
            this.prev = current
          }
        }
      },
      touchend (event) {
        if (!this.swipe) {
          return
        }

        if ([].slice.call(event.changedTouches).some(touch => {
          return touch.identifier === this.touchId
        })) { // 同一个触点移除了
          let offset = this.pos - parseInt(this.pos)
          let pos

          // 判断是否超过阈值
          if ((this.offset > 0 && offset >= this.threshold) || (this.offset <= 0 && offset > 1 - this.threshold)) {
            pos = Math.ceil(this.pos)
          } else {
            pos = Math.floor(this.pos)
          }

          this.touchId = undefined
          pos < 0 && (pos = 0)
          pos === this.$children.length + (this.loop ? 2 : 0) && pos--
          this.buffer(this.pos, pos - this.pos, Math.round(Math.abs(pos - this.pos) * this.duration) || 1)
        }
      }
    },
    mounted () {
      this.$nextTick(this.update)
    },
    updated () {
      this.$nextTick(function () {
        if (!this.prevent) { // slot内容更新
          this.update()
        } else {
          this.prevent = false
        }
      })
    },
    beforeDestroy () {
      this.clear()
    }
  }
</script>