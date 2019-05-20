<template>
  <div class="vui-load-more" :vui-position="position" @touchstart="touchstart" @touchmove="touchmove"
       @touchend="touchend" @scroll="scroll">
    <div class="vui-load-more-loading" :style="{[this.sizeProp]:`${this.size}px`}"
         v-if="['top','left'].includes(position)">
      <div class="vui-load-more-loading-box" ref="box">
        <slot name="loading">
          <div class="vui-load-more-default">
            <div class="vui-load-more-icon" :style="iconStyle" v-if="['init','loading'].indexOf(status)!==-1"></div>
            <div class="vui-load-more-text" v-else>{{text}}</div>
          </div>
        </slot>
      </div>
    </div>
    <div class="vui-load-more-content">
      <slot></slot>
    </div>
    <div class="vui-load-more-loading" :style="{[this.sizeProp]:`${this.size}px`}"
         v-if="['bottom','right'].includes(position)">
      <div class="vui-load-more-loading-box" ref="box">
        <slot name="loading">
          <div class="vui-load-more-default">
            <div class="vui-load-more-icon" :style="iconStyle" v-if="['init','loading'].indexOf(status)!==-1"></div>
            <div class="vui-load-more-text" v-else>{{text}}</div>
          </div>
        </slot>
      </div>
    </div>
  </div>
</template>

<script>
  import initIcon from './image/init.png'
  import loadingIcon from './image/loading.svg'
  import { raf, caf } from '../../tools/prefix/index'
  import { cubicEaseOut } from '../../tools/easing/index'
  import transit from '../../tools/transit/index'

  const MAX = 99999999

  export default {
    name: 'vui-load-more',
    props: {
      position: { // loading元素位置
        type: String,
        default: 'top',
        validator (value) {
          return ['top', 'bottom', 'left', 'right'].includes(value)
        }
      },
      pull: { // 是在边界拉动还是只要滚动到边界
        type: Boolean,
        default: true
      },
      work: { // 是否还需要加载
        type: Boolean,
        default: true
      },
      duration: { // 过渡时间
        type: Number,
        default: 300
      },
      pullThreshold: { // pull模式时为拉动的距离，单位px
        type: Number,
        default: 0
      },
      scrollThreshold: { // scroll模式时为滚动到边界还差多少距离
        type: Number,
        default: 0
      },
      rate: { // pull时，loading元素跟着滑动的比例
        type: Number,
        default: 0.35
      },
      angle: { // pull角度，如果position为垂直方向的话，表示手指初始滑动时与垂直方向的角度要<=45才有效
        type: Number,
        default: 45
      }
    },
    data () {
      return {
        size: 0, // loading元素的宽或者高
        speed: this.duration,
        status: 'init', // 状态，有init、loading、complete三种
        progress: 0, // pull距离相对threshold的百分比
        text: ''
      }
    },
    computed: {
      sizeProp () {
        return ['top', 'bottom'].includes(this.position) ? 'height' : 'width'
      },
      iconStyle () {
        return {
          transform: this.status === 'init' ? `scale(${Math.min(this.progress / 100, 1)}) rotate(${3.6 * this.progress}deg)` : '',
          backgroundImage: (() => {
            switch (this.status) {
              case 'init':
                return `url(${this.pull ? initIcon : loadingIcon})`
              case 'loading':
                return `url(${loadingIcon})`
            }
          })()
        }
      }
    },
    methods: {
      touchstart (event) {
        if (!this.work || this.transitioning || this.touchId !== undefined) {
          return
        }

        this.touchId = event.changedTouches[0].identifier
        this.x = event.changedTouches[0].clientX
        this.y = event.changedTouches[0].clientY
      },
      touchmove (event) {
        let touch = [].slice.call(event.changedTouches).filter(touch => {
          return touch.identifier === this.touchId
        })[0]

        if (touch) { // 同一个触点滑动
          const x = this.x
          const y = this.y
          let angle

          this.x = touch.clientX
          this.y = touch.clientY

          if (this.disabled === undefined) { // 初次移动，还未判断方向
            angle = Math.atan(Math.abs((this.y - y) / (this.x - x))) / Math.PI * 180 // 与水平方向的夹角
          } else if (this.disabled) { // 滑动方向不对
            event.preventDefault()
            return
          } else {
            // 停止传播，因为有可能该组件会互相包含，或者有可能该组件包含在swiper内
            event.stopPropagation()
          }

          switch (this.position) {
            case 'top':
              if (angle !== undefined) {
                this.disabled = 90 - angle > this.angle
                if (this.disabled) {
                  event.preventDefault()
                  return
                }
              }

              if (this.y > y) {
                // 阻止默认行为，比如chrome的下拉刷新
                !this.$el.scrollTop && event.preventDefault()
                this.scroll() // 如果是滚动且一开始就在边界
              }
              break
            case 'bottom':
              if (angle !== undefined) {
                this.disabled = 90 - angle > this.angle
                if (this.disabled) {
                  event.preventDefault()
                  return
                }
              }

              if (this.y < y) {
                this.$el.scrollTop === (this.$el.scrollHeight - this.$el.clientHeight) && event.preventDefault()
                this.scroll()
              }
              break
            case 'left':
              if (angle !== undefined) {
                this.disabled = angle > this.angle
                if (this.disabled) {
                  event.preventDefault()
                  return
                }
              }

              if (this.x > x) {
                !this.$el.scrollLeft && event.preventDefault()
                this.scroll()
              }
              break
            case 'right':
              if (angle !== undefined) {
                this.disabled = angle > this.angle
                if (this.disabled) {
                  event.preventDefault()
                  return
                }
              }

              if (this.x < x) {
                this.$el.scrollLeft === (this.$el.scrollWidth - this.$el.clientWidth) && event.preventDefault()
                this.scroll()
              }
              break
          }

          if (!this.pull) {
            return
          }

          let isPull // 拉还是松

          switch (this.position) {
            case 'top':
              if ((this.y > y && !this.$el.scrollTop) || (this.y < y && this.size)) {
                isPull = this.y > y
                this.size += this.rate * (this.y - y)
                this.size < 0 && (this.size = 0)
              }
              break
            case 'bottom':
              if ((this.y < y && this.$el.scrollTop === (this.$el.scrollHeight - this.$el.clientHeight)) || (this.y > y && this.size)) {
                isPull = this.y < y
                this.size += this.rate * (y - this.y)
                this.size < 0 && (this.size = 0)
                // 必须要异步滚动到底部，否则无效
                setTimeout(() => {
                  this.$el.scrollTop = MAX
                })
              }
              break
            case 'left':
              if ((this.x > x && !this.$el.scrollLeft) || (this.x < x && this.size)) {
                isPull = this.x > x
                this.size += this.rate * (this.x - x)
                this.size < 0 && (this.size = 0)
              }
              break
            case 'right':
              if ((this.x < x && this.$el.scrollLeft === (this.$el.scrollWidth - this.$el.clientWidth)) || (this.x > x && this.size)) {
                isPull = this.x < x
                this.size += this.rate * (x - this.x)
                this.size < 0 && (this.size = 0)
                setTimeout(() => {
                  this.$el.scrollLeft = MAX
                })
              }
              break
          }

          if (isPull !== undefined) {
            this.$emit('change', {
              touch: true,
              progress: this.size * 100 / (this.pullThreshold || 2 * this.$refs.box.getBoundingClientRect()[this.sizeProp])
            })
          }
        } else if (this.disabled === false) {
          // 当前组件滑动生效时，其它手指滑动无效
          event.stopPropagation()
          event.preventDefault()
        }
      },
      touchend (event) {
        if ([].slice.call(event.changedTouches).some(touch => {
            return touch.identifier === this.touchId
          })) { // 最开始引起滑动的那个触点移除了
          this.touchId = undefined
          this.disabled = undefined

          if (this.pull && this.size > 0) {
            const size = this.$refs.box.getBoundingClientRect()[this.sizeProp]
            const threshold = this.pullThreshold || 2 * size

            this.transitioning = true
            this.$emit('release', this.size * 100 / threshold) // 松开事件
            this.buffer(this.size, this.size >= threshold ? size : 0, this.duration)
          }
        }
      },
      scroll () {
        const scrollTop = this.scrollTop
        const scrollLeft = this.scrollLeft

        this.scrollTop = this.$el.scrollTop
        this.scrollLeft = this.$el.scrollLeft

        if (!this.work || this.pull || this.transitioning) {
          return
        }

        switch (true) {
          case this.position === 'top' && this.scrollTop <= scrollTop && this.scrollTop <= this.scrollThreshold:
          case this.position === 'bottom' && this.scrollTop >= scrollTop && (this.scrollTop + this.$el.clientHeight + this.scrollThreshold >= this.$el.scrollHeight):
          case this.position === 'left' && this.scrollLeft <= scrollLeft && this.scrollLeft <= this.scrollThreshold:
          case this.position === 'right' && this.scrollLeft >= scrollLeft && (this.scrollLeft + this.$el.clientWidth + this.scrollThreshold >= this.$el.scrollWidth):
            this.transitioning = true
            this.$emit('appear') // 出现
            // 非提前预加载就定位到末尾
            this.buffer(this.size, this.$refs.box.getBoundingClientRect()[this.sizeProp], this.duration, !this.scrollThreshold)
        }
      },
      /**
       * @param scrollToEnd 每一帧滚动到末尾
       */
      buffer (from, to, duration, scrollToEnd) {
        transit(from, to, (size, complete) => {
          this.size = size

          if (this.pull) {
            this.$emit('change', {
              touch: false,
              progress: size * 100 / (this.pullThreshold || 2 * this.$refs.box.getBoundingClientRect()[this.sizeProp])
            })
          }

          if (scrollToEnd) {
            switch (this.position) {
              case 'bottom':
                this.$el.scrollTop = MAX
                break
              case 'right':
                this.$el.scrollLeft = MAX
                break
            }
          }

          if (complete) {
            if (this.size) {
              // 触发load事件，并传入finish回调
              this.$emit('load', this.finish)
            } else {
              if (!this.pull && !('ontouchend' in document)) { // pc端scroll情况下如果请求失败了，也保留1px的滚动空间
                switch (this.position) {
                  case 'top':
                    this.$el.scrollTop++
                    break
                  case 'bottom':
                    this.$el.scrollTop--
                    break
                  case 'left':
                    this.$el.scrollLeft++
                    break
                  case 'right':
                    this.$el.scrollLeft--
                    break
                }
              }

              this.transitioning = false
            }
          }
        }, duration, cubicEaseOut).play()
      },
      finish (success) {
        // 内部监听调用
        this.$emit('finish', success)
        setTimeout(() => {
          this.buffer(this.size, 0, this.duration)
        }, 500)
      }
    },
    created() {
      // 监听事件，修改默认loading效果
      this.$on('appear', () => {
        this.status = 'init'
      })
      this.$on('change', ({progress}) => {
        if (this.status === 'complete' && progress) {
          return
        }

        this.status = 'init'
        this.progress = progress
      })
      this.$on('load', () => {
        this.status = 'loading'
      })
      this.$on('finish', (success) => {
        this.status = 'complete'
        this.text = success ? '加载成功' : '没有更多数据了'
      })
    }
  }
</script>