<template>
  <span :class="$options.name">{{value}}</span>
</template>

<script>
import { libName } from '../../config'
import Transit from '../../tools/transit/index'

export default {
  name: `${libName}-timer`,
  props: {
    from: { // 大于0就倒计时，否则正计时
      type: Number,
      default: 0
    },
    pause: { // 是否暂停
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      value: 0
    }
  },
  watch: {
    from: {
      handler: 'init',
      immediate: true
    },
    pause () {
      this.pause ? this.timer.pause() : this.timer.play()
    }
  },
  methods: {
    init () {
      const to = this.from > 0 ? 0 : 100 * 365 * 24 * 3600 // 正计时最大一百年

      this.value = this.getInteger(this.from)
      this.timer && this.timer.pause()
      this.timer = new Transit({
        from: this.from,
        to,
        duration: Math.abs(to - this.from) * 1000,
        callback: (value, complete) => {
          value = this.getInteger(value)
          if (value !== this.value || complete) {
            this.value = value
            this.$emit('change', value, complete)
          }
        }
      })
      this.pause ? this.timer.pause() : this.timer.play()
    },
    getInteger (value) {
      return this.from > 0 ? window.Math.ceil(value) : window.Math.floor(value)
    }
  }
}
</script>
