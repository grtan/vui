<template>
  <div class="vui-swiper" :vui-horizontal="!vertical" @touchmove="touchmove" @touchend="touchend">
    <div class="vui-swiper-list" :style="style" ref="list">
      <slot></slot>
    </div>
  </div>
</template>

<style lang="less">
  @import "../../assets/style/base";

  @name: ~"@{lib-name}-swiper";
  @horizontal: ~"@{lib-name}-horizontal";

  .@{name} {
    overflow: hidden;

    &[@{horizontal}] {
      .@{name}-list {
        white-space: nowrap;
      }

      .@{name}-item {
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
  import { raf, caf, afInterval } from '../../tools/prefix/index'

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
      interval: { // 轮播间隔时间，0表示不自动轮播
        type: Number,
        default: 4000
      },
      duration: { // 切换动画时间
        type: Number,
        default: 400
      },
      swipe: { // 是否可以手指滑动
        type: Boolean,
        default: true
      },
      threshold: { // 超过了多少比例才切换
        type: Number,
        default: 0.2
      }
    },
    data () {
      // 记录上一次index
      this.lastIndex = this.value

      return {
        index: this.value,  // 相对用户来说的位置
        pos: this.value + this.loop,  // 实时的实际的位置，反应了当前swiper的偏移
        height: undefined
      }
    },
    computed: {
      style () {
        return {
          height: this.height + 'px',
          transform: `translate${this.vertical ? 'Y' : 'X'}(${-this.pos * 100}%)`
        }
      },
      vertical () {
        return ['up', 'down'].indexOf(this.direction) !== -1
      },
      afCount () {  // 切换动画的帧数
        return Math.round(this.duration / afInterval)
      }
    },
    watch: {
      value (value) {
        this.index = value
      },
      index (value) {
        this.clear()

        // 刚check完不会再移动
        if (value + this.loop - this.pos) {
          this.buffer(this.pos, value + this.loop - this.pos, Math.round(Math.pow(3, (Math.min(Math.abs(value + this.loop - this.pos), 1) - 1)) * this.afCount) || 1)
        }
      },
      loop: 'rerender',
      interval(value, old) {
        // 不自动轮播变为自动轮播
        if (!old && value) {
          this.next()
        }
      }
    },
    methods: {
      rerender () { // slot内容有变化，更新dom
        let first, last, max

        // 获取子项最高的高度
        this.$children.forEach((child, index) => {
          !index && (first = child.$el)
          index === this.$children.length - 1 && (last = child.$el)
          // 这里不能使用offsetHeight，因为该属性始终返回四舍五入的整数，不精确
          ;(!index || child.$el.getBoundingClientRect().height > max) && (max = child.$el.getBoundingClientRect().height)
        })
        // 给每个子项设置成最高高度
        this.$children.forEach(child => {
          child.$el.style.height = max + 'px'
        })

        // 将第一项复制到最后，将最后一项复制到最前
        if (this.first) {
          this.first.parentElement.removeChild(this.first)
          this.first = null
        }

        if (this.last) {
          this.last.parentElement.removeChild(this.last)
          this.last = null
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
      check (slotChange) {  // 在每一次切换后，检查是否要移动位置
        // slot内容变化
        if (slotChange) {
          this.clear()
          this.pos = Math.round(this.pos)
        }

        // 处理边界情况（slot内容更改或者循环的情况下到达了边界）
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

        // index是否变化
        const changed = this.pos - this.loop !== this.lastIndex

        // 同步index
        this.index = this.pos - this.loop
        /**
         * 切换完成后再触发input、change事件
         * 必须在$nextTick中调用next，否则index变化时会执行clear，导致next失效
         */
        this.$nextTick(function () {
          this.next()

          if (changed) {
            this.lastIndex = this.index
            this.$emit('input', this.index)
            this.$emit('change', this.index)
          }
        })
      },
      next () { // 下一步，此时位置都已经移动好了，在循环模式下，不会处在边缘
        if (this.interval) {
          clearTimeout(this.intervalId)
          this.intervalId = setTimeout(() => {
            if (!this.interval) {
              return
            }

            if (['up', 'left'].indexOf(this.direction) !== -1) {
              this.index = this.loop ? this.index + 1 : (this.index + 1) % this.$children.length
            } else {
              this.index = this.loop ? this.index - 1 : (this.index - 1 + this.$children.length) % this.$children.length
            }
          }, this.interval)
        }
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
            let delta = this.prev - current

            // 不循环时，如果在边界继续往边缘方向拉，就给滑动添加阻尼效果
            if (!this.loop && (this.pos <= 0 && delta < 0 || this.pos >= this.$children.length - 1 && delta > 0)) {
              delta *= 0.3
            }

            this.offset = delta / this.$refs.list.getBoundingClientRect()[this.vertical ? 'height' : 'width']
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
          this.buffer(this.pos, pos - this.pos, Math.round(Math.pow(3, (Math.min(Math.abs(pos - this.pos), 1) - 1)) * this.afCount) || 1)
        }
      }
    },
    mounted () {
      this.$nextTick(this.rerender)
    },
    beforeDestroy () {
      this.clear()
    }
  }
</script>