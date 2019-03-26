<template>
  <div class="vui-load-more" :class="`vui-load-more-${direction}`" @touchstart="touchstart" @touchmove="touchmove"
       @touchend="touchend" @scroll="scroll">
    <div class="vui-load-more-loading" :style="styleObj" v-if="['top','left'].indexOf(direction)!==-1"
         @transitionend.self="transitionend">
      <div ref="box">
        <slot name="loading">
          <div class="vui-load-more-loading" :style="loadingStyle">
                        <span class="vui-load-more-icon" :style="iconStyle"
                              v-show="['init','loading'].indexOf(status)!==-1"></span>
            <span class="vui-load-more-text">{{text}}</span>
          </div>
        </slot>
      </div>
    </div>
    <div class="vui-load-more-content">
      <slot></slot>
    </div>
    <div class="vui-load-more-loading" :style="styleObj" v-if="['bottom','right'].indexOf(direction)!==-1"
         @transitionend.self="transitionend">
      <div ref="box">
        <slot name="loading">
          <div class="vui-load-more-loading" :style="loadingStyle">
                        <span class="vui-load-more-icon" :style="iconStyle"
                              v-show="['init','loading'].indexOf(status)!==-1"></span>
            <span class="vui-load-more-text">{{text}}</span>
          </div>
        </slot>
      </div>
    </div>
  </div>
</template>

<script>
  import loadingPng from './image/loading.png'
  import loadingGif from './image/loading.gif'
  import { raf, caf } from '../../tools/prefix/index'

  const MAX = 99999999

  export default {
    name: 'vui-load-more',
    props: {
      direction: {
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
      work: { // 是否还需要加载
        type: Boolean,
        default: true
      },
      duration: { // 过渡时间
        type: Number,
        default: 400
      },
      pullThreshold: { // pull模式时为拉动的距离，单位px
        type: Number,
        default: 100
      },
      scrollThreshold: { // scroll模式时为滚动到边界还差多少距离
        type: Number,
        default: 0
      },
      rate: { // pull时，loading元素跟着滑动的比例
        type: Number,
        default: 0.35
      },
      angle: { // pull角度，如果direction为垂直方向的话，表示手指初始滑动时与垂直方向的角度要<=45才有效
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
        text: '下拉加载'
      }
    },
    computed: {
      styleObj () {
        return {
          [this.sizeProp]: `${this.size}px`,
          transitionDuration: `${this.speed}ms`
        }
      },
      sizeProp () {
        return ['top', 'bottom'].indexOf(this.direction) !== -1 ? 'height' : 'width'
      },
      loadingStyle () {
        return {
          transform: this.status === 'init' ? `scale(${Math.min(this.progress / 100, 1)})` : '',
          transitionDuration: `${this.status === 'init' ? this.speed : 0}ms`
        }
      },
      iconStyle () {
        return {
          transform: this.status === 'init' ? `rotate(${3.6 * this.progress}deg)` : '',
          backgroundImage: (() => {
            switch (this.status) {
              case 'init':
                return `url(${this.pull ? loadingPng : loadingGif})`
              case 'loading':
                return `url(${loadingGif})`
            }
          })(),
          transitionDuration: `${this.status === 'init' ? this.speed : 0}ms`
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

          switch (this.direction) {
            case 'top':
              if (angle !== undefined) {
                this.disabled = 90 - angle > this.angle
                if (this.disabled) {
                  event.preventDefault()
                  return
                }
              }

              if (this.y > y) {
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

          switch (this.direction) {
            case 'top':
              if ((this.y > y && !this.$el.scrollTop) || (this.y < y && this.size)) {
                isPull = this.y > y
                this.speed = 0
                this.size += this.rate * (this.y - y)
                this.size < 0 && (this.size = 0)
              }
              break
            case 'bottom':
              if ((this.y < y && this.$el.scrollTop === (this.$el.scrollHeight - this.$el.clientHeight)) || (this.y > y && this.size)) {
                isPull = this.y < y
                this.speed = 0
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
                this.speed = 0
                this.size += this.rate * (this.x - x)
                this.size < 0 && (this.size = 0)
              }
              break
            case 'right':
              if ((this.x < x && this.$el.scrollLeft === (this.$el.scrollWidth - this.$el.clientWidth)) || (this.x > x && this.size)) {
                isPull = this.x < x
                this.speed = 0
                this.size += this.rate * (x - this.x)
                this.size < 0 && (this.size = 0)
                setTimeout(() => {
                  this.$el.scrollLeft = MAX
                })
              }
              break
          }

          if (isPull !== undefined) {
            this.progress = this.size * 100 / this.pullThreshold
            this.$emit('change', this.progress)
            if (this.size >= this.pullThreshold) {
              this.text = '松开加载'
            } else {
              switch (this.direction) {
                case 'top':
                  this.text = '下拉加载'
                  break
                case 'bottom':
                  this.text = '上拉加载'
                  break
                case 'left':
                  this.text = '右拉加载'
                  break
                case 'right':
                  this.text = '左拉加载'
                  break
              }
            }
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
            const size = parseFloat(window.getComputedStyle(this.$refs.box)[this.sizeProp])
            const lastSize = this.size

            this.speed = this.duration
            this.transitioning = true

            if (this.size >= this.pullThreshold) {
              this.size = size
              this.progress = 100
            } else {
              this.size = 0
              this.progress = 0
            }

            this.$emit('release', lastSize * 100 / this.pullThreshold) // 松开事件
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
          case this.direction === 'top' && this.scrollTop <= scrollTop && this.scrollTop <= this.scrollThreshold:
          case this.direction === 'bottom' && this.scrollTop >= scrollTop && (this.scrollTop + this.$el.clientHeight + this.scrollThreshold >= this.$el.scrollHeight):
          case this.direction === 'left' && this.scrollLeft <= scrollLeft && !this.scrollLeft <= this.scrollThreshold:
          case this.direction === 'right' && this.scrollLeft >= scrollLeft && (this.scrollLeft + this.$el.clientWidth + this.scrollThreshold >= this.$el.scrollWidth):
            this.size = parseFloat(window.getComputedStyle(this.$refs.box)[this.sizeProp])
            this.speed = this.duration
            this.transitioning = true
            this.progress = 100
            this.text = '正在加载...'
            !this.scrollThreshold && (this.rafId = raf(this.toEnd)) // 非提前预加载就定位到末尾
            this.$emit('appear') // 出现
        }
      },
      toEnd () { // 滚动到末尾
        switch (this.direction) {
          case 'bottom':
            this.$el.scrollTop = MAX
            break
          case 'right':
            this.$el.scrollLeft = MAX
            break
        }
        this.rafId = raf(this.toEnd)
      },
      finish () {
        this.size = 0
        this.progress = 0
        this.status = 'complete'
        this.text = '加载完成'
      },
      transitionend () {
        if (this.size) {
          caf(this.rafId)
          // 触发load事件，并传入finish回调
          this.status = 'loading'
          this.text = '正在加载...'
          this.$emit('load', this.finish)
        } else {
          this.status = 'init'
          this.transitioning = false
        }
      }
    }
  }
</script>