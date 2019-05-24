<template>
  <div class="vui-load-more" :vui-position="position" :vui-pull="pull" :vui-loading="status==='loading'"
       :vui-complete="['init','loading'].indexOf(status)===-1" @touchstart="touchstart" @touchmove="touchmove"
       @touchend="touchend" @scroll="scroll">
    <div class="vui-load-more-loading" :style="{[this.sizeProp]:`${this.size}px`}"
         v-if="['top','left'].indexOf(position)!==-1">
      <div class="vui-load-more-loading-box" ref="box">
        <slot name="loading">
          <div class="vui-load-more-default">
            <div class="vui-load-more-icon" :style="iconStyle" ref="icon"
                 v-show="['init','loading'].indexOf(status)!==-1"></div>
            <div class="vui-load-more-text" :style="textStyle"
                 v-show="!pull||['success','fail','nomore'].indexOf(status)!==-1">{{text}}</div>
            <div class="vui-load-more-bg" :style="bgStyle"
                 v-show="['success','fail','nomore'].indexOf(status)!==-1||!pull"></div>
          </div>
        </slot>
      </div>
    </div>
    <div class="vui-load-more-content">
      <slot></slot>
    </div>
    <div class="vui-load-more-loading" :style="{[this.sizeProp]:`${this.size}px`}"
         v-if="['bottom','right'].indexOf(position)!==-1">
      <div class="vui-load-more-loading-box" ref="box">
        <slot name="loading">
          <div class="vui-load-more-default">
            <div class="vui-load-more-icon" :style="iconStyle" ref="icon"
                 v-show="['init','loading'].indexOf(status)!==-1"></div>
            <div class="vui-load-more-text" :style="textStyle"
                 v-show="!pull||['success','fail','nomore'].indexOf(status)!==-1">{{text}}</div>
            <div class="vui-load-more-bg" :style="bgStyle"
                 v-show="['success','fail','nomore'].indexOf(status)!==-1||!pull"></div>
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
          return ['top', 'bottom', 'left', 'right'].indexOf(value) !== -1
        }
      },
      pull: { // 是在边界拉动还是只要滚动到边界
        type: Boolean,
        default: true
      },
      work: { // 是否还需要加载，false时不再显示loading区域
        type: Boolean,
        default: true
      },
      duration: { // 过渡时间
        type: Number,
        default: 300
      },
      pullThreshold: { // pull模式时加载需要拉动的距离，相对loading元素区域尺寸的比例
        type: Number,
        default: 1
      },
      scrollThreshold: { // scroll加载时，触发加载动作的阈值，同pullThreshold一致，都是比例
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
      },
      pullLoadingBackground: {  // pull时loading图的背景色
        type: String,
        default: '#FF8A00'
      },
      scrollLoadingColor: { // scroll时loading文字颜色
        type: String,
        default: '#999'
      },
      scrollLoadingBackground: {
        type: String,
        default: '#F6F7F8'
      },
      successColor: { // 加载成功提示文本颜色
        type: String,
        default: '#FF8A00'
      },
      successBackground: { // 背景色
        type: String,
        default: '#FFF6EC'
      },
      failColor: { // 失败或者没有更多数据时的文本颜色
        type: String,
        default: '#AAA'
      },
      failBackground: {
        type: String,
        default: '#F6F7F8'
      }
    },
    data () {
      return {
        size: 0, // loading元素的宽或者高
        speed: this.duration,
        status: 'init', // 状态，有init、loading、success、fail、nomore五种
        scaleRatio: 0, // pull时loading图标的缩放比例
        text: ''
      }
    },
    computed: {
      sizeProp () {
        return ['top', 'bottom'].indexOf(this.position) !== -1 ? 'height' : 'width'
      },
      iconStyle () {
        return {
          transform: this.pull && this.status === 'init' ? `scale(${Math.min(this.scaleRatio / 100, 1)}) rotate(${1.8 * this.scaleRatio}deg)` : '',
          backgroundColor: this.pull ? this.pullLoadingBackground : '',
          backgroundImage: `url(${this.pull ? initIcon : loadingIcon})`,
          borderRadius: this.pull ? '50%' : ''
        }
      },
      textStyle() {
        return {
          color: (() => {
            switch (this.status) {
              case 'success':
                return this.successColor
              case 'fail':
              case 'nomore':
                return this.failColor
              default:
                return this.scrollLoadingColor
            }
          })()
        }
      },
      bgStyle() {
        return {
          background: (() => {
            switch (this.status) {
              case 'success':
                return this.successBackground
              case 'fail':
              case 'nomore':
                return this.failBackground
              default:
                return this.scrollLoadingBackground
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
              progress: this.size * 100 / (this.pullThreshold * this.$refs.box.getBoundingClientRect()[this.sizeProp])
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
            const threshold = this.pullThreshold * size

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

        this.scrollThod = this.scrollThod === undefined ? this.scrollThreshold * this.$refs.box.getBoundingClientRect()[this.sizeProp] : this.scrollThod

        switch (true) {
          case this.position === 'top' && this.scrollTop <= scrollTop && this.scrollTop <= this.scrollThod:
          case this.position === 'bottom' && this.scrollTop >= scrollTop && (this.scrollTop + this.$el.clientHeight + this.scrollThod >= this.$el.scrollHeight):
          case this.position === 'left' && this.scrollLeft <= scrollLeft && this.scrollLeft <= this.scrollThod:
          case this.position === 'right' && this.scrollLeft >= scrollLeft && (this.scrollLeft + this.$el.clientWidth + this.scrollThod >= this.$el.scrollWidth):
            this.transitioning = true
            this.$emit('appear') // 出现
            // 非提前预加载就定位到末尾
            this.buffer(this.size, this.$refs.box.getBoundingClientRect()[this.sizeProp], this.duration, !this.scrollThod)
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
              progress: size * 100 / (this.pullThreshold * this.$refs.box.getBoundingClientRect()[this.sizeProp])
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
              if (!('ontouchend' in document) && !this.pull && ['fail', 'nomore'].indexOf(this.status) !== -1) { // pc端scroll情况下如果请求失败或者没有更多数据时，也保留1px的滚动空间
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
      /**
       * @param status  状态
       * @param text  提示文本
       * @param fold  loading区域是否要收起来（有可能没有更多数据的情况下，不需要收起来）
       */
      finish ({status, text, fold = true}) {
        // 内部监听调用
        this.$emit('finish', status, text)
        fold && setTimeout(() => {
          // 加载成功时，底部、右侧的loading要瞬间消失，否则用户滑动过快时会看到提示文本，体验不好
          this.buffer(this.size, 0, status === 'success' && ['bottom', 'right'].indexOf(this.position) !== -1 ? 0 : this.duration)
        }, status === 'success' && ['bottom', 'right'].indexOf(this.position) !== -1 ? 0 : 800)
      }
    },
    created() {
      // 监听事件，修改默认loading效果
      this.$on('appear', () => {
        this.status = 'init'
        this.text = '正在加载…'
      })
      this.$on('change', ({progress}) => {
        if (this.status === 'init') {
          this.status = 'init'
          this.scaleRatio = progress * this.pullThreshold
        } else if (!progress) {
          this.status = 'init'
        }
      })
      this.$on('load', () => {
        this.status = 'loading'
      })
      this.$on('finish', (status, text) => {
        this.status = status

        if (text) {
          this.text = text
        } else {
          switch (status) {
            case 'success':
              this.text = '加载成功'
              break
            case 'fail':
              this.text = '加载失败'
              break
            default:
              this.text = '没有更多数据了'
          }
        }
      })
    },
    mounted() {
      // 将loading图片尺寸设置成整数，因为页面没缩放的情况下，小数时在chrome下旋转会抖动
      if (!this.pull || !this.$refs.icon) {
        return
      }

      const style = window.getComputedStyle(this.$refs.icon)
      let width = parseInt(style.width)
      let height = parseInt(style.height)
      let backgroundSize = parseInt(width * 0.56)

      // 确保是偶数值，否则会抖动
      width % 2 && width++
      height % 2 && height++
      backgroundSize % 2 && backgroundSize++
      this.$refs.icon.style.width = `${width}px`
      this.$refs.icon.style.height = `${height}px`
      this.$refs.icon.style.backgroundSize = `${backgroundSize}px`
    }
  }
</script>