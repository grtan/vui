<style lang="less">
@import "../../assets/style/base";

@name: ~"@{lib-name}-swiper";

.@{name} {
  overflow: hidden;

  .@{name}-list {
    display: flex;
    box-sizing: border-box;
    height: 100%;
  }

  &-item {
    box-sizing: border-box;
    width: 100%;
    flex-shrink: 0;
  }

  &[data-vertical] {
    .@{name}-list {
      flex-direction: column;
    }

    .@{name}-item {
      height: 100%;
    }
  }
}
</style>

<script>
import { libName } from '../../config'
import { cubicEaseOut } from '../../tools/easing/index'
import Transit from '../../tools/transit/index'

export default {
  name: `${libName}-swiper`,
  render () {
    return (
      <div class={this.$options.name} style={this.rootStyle} data-vertical={this.vertical}
        {...{
          on: {
            touchstart: this.touchstart,
            touchmove: this.touchmove,
            touchend: this.touchend
          }
        }}
      >
        <div class={`${this.$options.name}-list`} style={this.listStyle} ref="list">
          {
            (() => {
              if (!this.$slots.default) {
                return
              }

              let vnodes = this.$slots.default.slice()

              // 循环时拷贝首尾节点
              if (this.loop) {
                let clonedIndex = 0
                let i = 0
                const head = []
                const end = []

                // 拷贝头部节点
                while (i < vnodes.length) {
                  const cloned = Object.create(Object.getPrototypeOf(vnodes[i]))

                  Object.assign(cloned, vnodes[i])
                  cloned.key += `-cloned-${clonedIndex++}`
                  end.push(cloned)
                  i++

                  if (i === vnodes.length) {
                    i = 0
                  }

                  if (end.length === this.cloneNumber) {
                    i = vnodes.length - 1
                    break
                  }
                }

                // 拷贝尾部节点
                while (i >= 0) {
                  const cloned = Object.create(Object.getPrototypeOf(vnodes[i]))

                  Object.assign(cloned, vnodes[i])
                  cloned.key += `-cloned-${clonedIndex++}`
                  head.unshift(cloned)
                  i--

                  if (i < 0) {
                    i = vnodes.length - 1
                  }

                  if (head.length === this.cloneNumber) {
                    break
                  }
                }

                vnodes = vnodes.concat(end)
                vnodes = head.concat(vnodes)
              }

              return vnodes.map((vnode, index) => {
                if (!vnode.data.scopedSlots) {
                  return vnode
                }

                /**
                 * https://github.com/vuejs/vue/issues/5986#issuecomment-311518789
                 * dom diff时，vnode及其一些属性需要是不同的对象才会进行patch
                 * 我们只需要修改slot根元素，所以不需要深拷贝，浅拷贝就够了
                 */
                const cloned = Object.create(Object.getPrototypeOf(vnode))
                const defaultFn = vnode.data.scopedSlots.default

                Object.assign(cloned, vnode)
                cloned.data = Object.assign({}, cloned.data)
                // 设置item的index，因为循环模式下，外部无法设置拷贝节点的index
                cloned.data.scopedSlots = Object.assign({}, cloned.data.scopedSlots, {
                  default () {
                    return defaultFn({ index })
                  }
                })

                return cloned
              })
            })()
          }
        </div>
      </div >
    )
  },
  props: {
    value: {
      type: Number,
      default: 0
    },
    direction: { // 轮播方向
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
      default: 3000
    },
    duration: { // 切换动画时间
      type: Number,
      default: 300
    },
    swipe: { // 是否可以手指滑动
      type: Boolean,
      default: true
    },
    threshold: { // 超过了多少比例才切换
      type: Number,
      default: 0.2
    },
    angle: { // 角度，如果direction为垂直方向的话，表示手指初始滑动时与垂直方向的角度要<=45才有效
      type: Number,
      default: 45
    },
    cloneNumber: { // 循环模式时，首尾复制节点的数目
      type: Number,
      default: 2
    },
    slideSpeed: { // 滑动速度
      type: Number,
      default: 1
    }
  },
  data () {
    // 记录上一次index
    this.lastIndex = this.value

    return {
      index: this.value, // 相对用户来说的位置
      pos: this.value + (this.loop ? this.cloneNumber : 0), // 实时的实际的位置，反应了当前swiper的偏移
      height: undefined
    }
  },
  computed: {
    clonedCount () { // 实际拷贝的节点数目
      return this.loop ? this.cloneNumber : 0
    },
    rootStyle () {
      if (this.height === undefined) {
        return {}
      }

      return {
        height: `${this.height}px`
      }
    },
    listStyle () {
      const translate = `${-this.pos * 100}%`

      return {
        // 这里使用3d变换来加速，不然滑动时界面会抖动
        transform: `translate3d(${this.vertical ? 0 : translate},${this.vertical ? translate : 0},0)`
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
      // 已经滑动好了就不再滑动，比如手指滑动导致index变化
      if (value + this.clonedCount - this.pos) {
        this.buffer(this.pos, value + this.clonedCount, Math.pow(3, (Math.min(Math.abs(value + this.clonedCount - this.pos), 1) - 1)) * this.duration)
      }
    },
    loop: 'rerender',
    interval: 'rerender',
    cloneNumber: 'rerender',
    pos: {
      handler (value) {
        this.$emit('pos-change', value)
      },
      immediate: true
    }
  },
  methods: {
    rerender () { // slot内容有变化，更新dom
      this.height = undefined // 重置高度
      this.$nextTick(function () {
        let max

        // 获取子项最高的高度
        this.$children.forEach((child, index) => {
          // 这里要使用offsetHeight，因为该属性不受transform影响
          if (!index || child.$el.offsetHeight > max) {
            max = child.$el.offsetHeight
          }
        })
        // 这里必须要用max记录最大值后赋值，因为只要this.height中途变化了，即使最后的结果没变，也会调用render函数，触发updated钩子。但只要最后的结果没变，watch钩子是不会执行的
        this.height = max
        this.pos = Math.round(this.pos)
        this.check()
      })
    },
    check () { // 在每一次切换后，检查是否要移动位置
      // 处理边界情况（slot内容更改或者循环的情况下到达了边界）
      if (this.loop) {
        if (this.pos > this.$children.length - this.clonedCount - 1) {
          this.pos = this.clonedCount + (this.pos - (this.$children.length - this.clonedCount)) % (this.$children.length - 2 * this.clonedCount)
        } else if (this.pos < this.clonedCount) {
          this.pos = this.$children.length - this.clonedCount - 1 - (this.clonedCount - 1 - this.pos) % (this.$children.length - 2 * this.clonedCount)
        }
      } else {
        if (this.pos > this.$children.length - 1) {
          this.pos = this.$children.length - 1
        } else if (this.pos < 0) {
          this.pos = 0
        }
      }

      // index是否变化
      const changed = this.pos - this.clonedCount !== this.lastIndex

      // 同步index
      this.index = this.pos - this.clonedCount
      this.next()

      if (changed) {
        this.lastIndex = this.index
        this.$emit('input', this.index)
        this.$emit('change', this.index)
      }
    },
    next () { // 开始等待，此时位置都已经移动好了，在循环模式下，不会处在边缘
      this.clear()

      if (!this.interval) { // 不自动轮播
        return
      }

      // 更新进度
      this.waitTransit = new Transit({
        from: 0,
        to: 100,
        duration: this.interval,
        callback: (progress, complete) => {
          this.$emit('wait', {
            index: this.index, // 必须携带当前index，否则用户主动切换时不知道progress到底是哪个item的
            progress,
            complete
          })

          if (complete && this.interval) {
            if (['up', 'left'].indexOf(this.direction) !== -1) {
              this.index = this.loop ? this.index + 1 : (this.index + 1) % this.$children.length
            } else {
              this.index = this.loop ? this.index - 1 : (this.index - 1 + this.$children.length) % this.$children.length
            }
          }
        }
      }).play()
    },
    buffer (from, to, duration) { // 开始切换动画
      this.clear()
      this.bufferTransit = new Transit({
        from,
        to,
        duration,
        easing: cubicEaseOut,
        callback: (pos, complete) => {
          this.pos = pos
          complete && this.check()
        }
      }).play()
    },
    clear () { // 清除计时器
      this.waitTransit && this.waitTransit.pause()
      this.bufferTransit && this.bufferTransit.pause()
    },
    touchstart (event) {
      if (!this.swipe || this.touchId !== undefined) {
        return
      }

      this.clear()
      this.offset = 0
      this.touchId = event.changedTouches[0].identifier
      this.prev = this.vertical ? event.changedTouches[0].clientY : event.changedTouches[0].clientX
      this.x = event.changedTouches[0].clientX
      this.y = event.changedTouches[0].clientY
    },
    touchmove (event) {
      if (!this.swipe) {
        return
      }

      const touch = [].slice.call(event.changedTouches).filter(touch => {
        return touch.identifier === this.touchId
      })[0]

      if (!touch) { // 非同一个触点移动
        // 当前组件滑动生效时，其它手指滑动无效
        if (this.disabled === false) {
          // 防止冒泡到祖先swiper等
          event.stopPropagation()
          // 阻止原生行为，如双指缩放等
          event.preventDefault()
        }

        return
      }

      if (this.disabled === undefined) { // 初次移动，还未判断方向
        const deltaY = Math.abs(touch.clientY - this.y)
        const deltaX = Math.abs(touch.clientX - this.x)

        if (!deltaY && !deltaX) {
          return
        }

        const angle = Math.atan(deltaY / deltaX) / Math.PI * 180 // 与水平方向的夹角

        switch (this.direction) {
          case 'up':
          case 'down':
            this.disabled = 90 - angle > this.angle

            break
          case 'left':
          case 'right':
            this.disabled = angle > this.angle

            break
        }
      }

      if (this.disabled) { // 滑动方向不对
        return
      }

      const current = this.vertical ? touch.clientY : touch.clientX
      let delta = (this.prev - current) * this.slideSpeed

      // 防止冒泡到祖先swiper等
      event.stopPropagation()
      // 阻止浏览器度原生行为，如页面滚动等
      event.preventDefault()

      // 不循环时，如果在边界继续往边缘方向拉，就给滑动添加阻尼效果
      if (!this.loop && ((this.pos <= 0 && delta < 0) || (this.pos >= this.$children.length - 1 && delta > 0))) {
        delta *= 0.4
      }

      // delta为0的情况经常发生，为避免误判滑动方向，直接忽略为0的场景
      if (delta) {
        this.offset = delta / this.$refs.list[this.vertical ? 'offsetHeight' : 'offsetWidth']
        this.pos += this.offset
        this.prev = current
      }
    },
    touchend (event) {
      if (!this.swipe || ![].slice.call(event.changedTouches).some(touch => {
        return touch.identifier === this.touchId
      })) { // 非同一个触点移除
        return
      }

      const offset = this.pos - parseInt(this.pos)
      let pos

      // 判断是否超过阈值
      if ((this.offset > 0 && offset >= this.threshold) || (this.offset <= 0 && offset > 1 - this.threshold)) {
        pos = Math.ceil(this.pos)
      } else {
        pos = Math.floor(this.pos)
      }

      this.touchId = undefined
      this.disabled = undefined
      pos < 0 && (pos = 0)
      pos > this.$children.length - 1 && (pos = this.$children.length - 1)
      this.buffer(this.pos, pos, Math.pow(3, (Math.min(Math.abs(pos - this.pos), 1) - 1)) * this.duration)
    }
  },
  mounted () {
    this.rerender()
  },
  beforeDestroy () {
    this.clear()
  }
}
</script>
