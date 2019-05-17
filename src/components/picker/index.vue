<template>
  <div class="vui-picker" :vui-3d="enable3d">
    <div class="vui-picker-column" v-for="(column,index) in columns">
      <div class="vui-picker-label" v-if="labels[index]">{{labels[index]}}</div>
      <div class="vui-picker-content" :style="maskStyle" ref="content" @touchmove="touchmove($event,index)"
           @touchend="touchend">
        <div class="vui-picker-list" :style="style[index]">
          <div class="vui-picker-item" :style="itemStyle(pos)" v-for="(item,pos) in column"
               :ref="!index&&!pos?'item':undefined" :vui-visible="itemVisible(index,pos)" :data-value="item"
               @click="location(index,pos)">
          </div>
        </div>
        <!--放大-->
        <div class="vui-picker-zoom">
          <div class="vui-picker-list" :style="style[index]">
            <div class="vui-picker-item" :style="itemStyle(pos)" v-for="(item,pos) in column"
                 :vui-visible="itemVisible(index,pos)" :data-value="item">
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { backEaseOut, cubicEaseOut } from '../../tools/easing/index'
  import { raf, caf } from '../../tools/prefix/index'
  import ResizeSensor from 'css-element-queries/src/ResizeSensor'

  function getBufferAfCount (offset) {  // 根据缓冲距离获取动画桢数，必须返回整数
    return Math.round(90 * Math.pow(4, Math.min(Math.abs(offset) / 30, 1) - 1))
  }

  export default {
    name: 'vui-picker',
    props: {
      data: [Array, Object], // 数据
      selected: Array, // 各列选中的子项
      sync: { // 滑动父列时，是否立即同步更新子列，false表示等父列滑动停下来后再更新子列
        type: Boolean,
        default: false
      },
      enable3d: { // 是否开启3d旋转
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        contentHeight: undefined, // 内容区域的高度
        itemHeight: undefined, // 各列的每个子项的高度
        offsets: [], // 所有列的偏移量，表示当前滑动到第几个子项了，比如0,1,2.5等
        positions: [] // 所有列选择的子项的位置索引，比如0，1
      }
    },
    computed: {
      style () {
        return this.offsets.map(offset => {
          if (this.enable3d) {
            return {
              transform: `translate3d(0,0,${-this.radius}px) rotateX(${offset * this.spacing}deg)`
            }
          }

          return {
            transform: `translate3d(0,${-offset * this.itemHeight}px,0)`
          }
        })
      },
      maskStyle () { // 蒙层样式
        const pos = this.itemHeight * 100 / this.contentHeight

        return {
          'mask-box-image': `linear-gradient(to bottom, rgba(255, 255, 255, 0), #fff ${pos}%, #fff ${100 - pos}%, rgba(255, 255, 255, 0))`
        }
      },
      radius () { // 3d旋转半径
        return this.contentHeight / 1.8
      },
      spacing () { // 3d旋转时每个子项之间的角度间距
        return Math.asin(Math.min(this.contentHeight / 2 / this.radius, 1)) / Math.PI * 180 / this.half
      },
      half () { // 一半区域可见子项的数目
        return (this.contentHeight / this.itemHeight - 1) / (this.enable3d ? 1.5 : 2)
      },
      cascaded () { // 是否级联
        return !(this.data instanceof Array)
      },
      labels () {
        let labels = []

        if (!this.cascaded) {
          this.data.forEach(function (column) {
            column.name && labels.push(column.name)
          })
        } else {
          let column = this.data

          this.positions.forEach(function (pos) {
            column.name && labels.push(column.name)
            column = column.options[pos].children
          })
        }

        return labels
      },
      columns () { // 各列的数据
        if (!this.cascaded) {
          return this.data.map(function (column) {
            return column.options
          })
        } else {
          let columns = []
          let column = this.data

          this.positions.forEach(function (pos) {
            columns.push(column.options.map(function (option) {
              return option.hasOwnProperty('value') ? option.value : option
            }))
            column = column.options[pos].children
          })

          return columns
        }
      }
    },
    watch: {
      data: 'update',
      selected: 'update',
      positions (value) {
        this.$emit('update', value.slice())
      }
    },
    methods: {
      itemVisible (index, pos) { // 3d旋转时item是否可见
        return this.enable3d && Math.abs(pos - this.offsets[index] - 0.5) <= this.half + 0.5
      },
      itemStyle (pos) {
        if (this.enable3d) {
          return {
            transform: `rotateX(${-pos * this.spacing}deg) translate3d(0,0,${this.radius}px)`
          }
        }
      },
      update () {
        this.stop(true)
        // 设置positions
        if (this.selected !== undefined) {
          this.positions = this.selected.slice()
          this.offsets = this.selected.slice()
        } else {
          this.positions = []
          this.offsets = []
          if (!this.cascaded) {
            this.data.forEach(() => {
              this.positions.push(0)
              this.offsets.push(0)
            })
          } else {
            let column = this.data

            while (column) {
              this.positions.push(0)
              this.offsets.push(0)
              column = column.options[0].children
            }
          }
        }
      },
      stop (stop) { // 停止滑动
        if (this.scrollingIndex !== undefined) {
          let pos = Math.round(this.offsets[this.scrollingIndex])
          const length = this.columns[this.scrollingIndex].length

          pos < 0 && (pos = 0)
          pos >= length && (pos = length - 1)
          this.updatePosition(this.scrollingIndex, pos, stop)
          caf(this.rafId) // requestAnimationFrame还未执行时就可能stop了
          this.scrollingIndex = undefined
          this.touchId = undefined
        }
      },
      touchmove (event, index) {
        event.preventDefault()

        if (this.scrollingIndex === undefined) { // 没有列正在滑动
          this.scrollingIndex = index
          this.touchId = event.changedTouches[0].identifier
          this.speed = 0
          this.prevTime = Date.now()
          this.prevY = event.changedTouches[0].clientY
        } else {
          let touch = [].slice.call(event.changedTouches).filter(touch => {
            return touch.identifier === this.touchId
          })[0]

          if (touch) { // 同一个触点移动
            const currentTime = Date.now()

            if (currentTime === this.prevTime) { // 滑得过快时这两个时间可能相等
              return
            }

            const currentY = touch.clientY
            const offset = (this.prevY - currentY) / this.itemHeight
            let des = this.offsets[this.scrollingIndex] + offset

            // 限制不滑出content区域
            if (des > this.columns[this.scrollingIndex].length - (this.enable3d ? 2 : 1) + this.half) {
              des = this.columns[this.scrollingIndex].length - (this.enable3d ? 2 : 1) + this.half
            } else if (des < -this.half + (this.enable3d ? 1 : 0)) {
              des = -this.half + (this.enable3d ? 1 : 0)
            }

            const pos = Math.round(des)
            this.$set(this.offsets, this.scrollingIndex, des)

            // 更新值
            if (this.sync && pos > -1 && pos < this.columns[this.scrollingIndex].length && pos !== this.positions[this.scrollingIndex]) {
              this.updatePosition(this.scrollingIndex, pos)
            }

            this.speed = offset * (1000 / (currentTime - this.prevTime))
            this.prevTime = currentTime
            this.prevY = currentY
          } else if (this.touchId === undefined && index === this.scrollingIndex) {
            // 引起列滑动的触点已经移除了，并且在当前滚动的列上继续滑动
            this.stop() // 停止当前滑动列的滑动
          }
        }
      },
      touchend (event) {
        if ([].slice.call(event.changedTouches).some(touch => {
            return touch.identifier === this.touchId
          })) { // 同一个触点移除了
          const prev = this.offsets[this.scrollingIndex]
          const length = this.columns[this.scrollingIndex].length
          let offset = (this.speed > 0 ? 1 : -1) * Math.pow(Math.abs(this.speed), 0.8) // 缓冲变化量
          const duration = getBufferAfCount(offset) // 缓冲动画有多少帧
          let back // 是否回弹

          // 获取该变量
          switch (true) {
            case prev < 0:
              offset = -prev
              break
            case prev < length - 1:
              if (this.speed < 0 && prev + offset < 0) {
                offset = -prev
                back = true
              } else if (this.speed > 0 && offset + prev > length - 1) {
                offset = length - 1 - prev
                back = true
              } else {
                offset = Math.round(offset + prev) - prev
              }
              break
            default:
              offset = length - 1 - prev
          }

          this.touchId = undefined
          this.buffer(prev, offset, duration, back) // 缓冲
        }
      },
      buffer (b, c, duration, back) {
        /*
         * t: current time（当前时间）；
         * b: beginning value（初始值）；
         * c: change in value（变化量）；
         * d: duration（持续时间）；
         * back: 是否有回弹
         */
        let t = 0
        const scroll = () => {
          const offset = (back ? backEaseOut : cubicEaseOut)(t, b, c, duration)
          const pos = Math.round(offset)

          this.$set(this.offsets, this.scrollingIndex, offset)
          // 更新值
          if ((!this.sync && t === duration) || (this.sync && pos > -1 && pos < this.columns[this.scrollingIndex].length && pos !== this.positions[this.scrollingIndex])) {
            this.updatePosition(this.scrollingIndex, pos)
          }

          t < duration ? this.rafId = raf(scroll) : (this.scrollingIndex = undefined)
          t++
        }

        this.rafId = raf(scroll)
      },
      updatePosition (index, pos, stop) { // 更新列选择的值
        // 如果更新位置时停止滑动
        stop && this.$set(this.offsets, index, pos)

        if (!this.cascaded) {
          this.$set(this.positions, index, pos)
        } else {
          this.positions.splice(index)
          this.positions.push(pos)
          this.offsets.splice(index + 1)
          let column = this.data
          this.positions.forEach(i => {
            column = column.options[i].children
          })
          while (column) {
            this.positions.push(0)
            this.offsets.push(0)
            column = column.options[0].children
          }
        }
      },
      location (index, pos) { // 点击了列的某个子项，进行定位
        if ([undefined, index].indexOf(this.scrollingIndex) !== -1) {
          this.stop()
          this.scrollingIndex = index
          const offset = pos - this.offsets[index]
          this.buffer(this.offsets[index], offset, getBufferAfCount(offset))
        }
      }
    },
    created () {
      // 初始化positions，offsets，并触发update事件
      this.update()
    },
    mounted () {
      // 初始化并监控尺寸变化
      new ResizeSensor(this.$refs.content[0], ({height}) => { // eslint-disable-line no-new
        if (height !== this.contentHeight) {
          // 这里不能使用offsetHeight，因为该属性始终返回四舍五入的整数，不精确，会导致显示错位
          this.itemHeight = this.$refs.item[0].getBoundingClientRect().height
          this.contentHeight = height
        }
      })
    }
  }
</script>