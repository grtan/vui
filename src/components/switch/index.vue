<template>
  <div
    v-if="type==='default'"
    :class="$options.name"
    :style="defaultStyle"
    :data-type="type"
    :data-checked="value"
    :data-disabled="disabled"
    @click="click"
  >
    <div :style="defaultMaskStyle"></div>
    <div :style="defaultCircleStyle"></div>
  </div>
  <svg
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 42 22"
    v-else
    :class="$options.name"
    :data-type="type"
    :data-checked="value"
    :data-disabled="disabled"
    @click="click"
  >
    <path :d="funtouch9.path" :style="funtouch9PathStyle" />
    <rect
      x="1"
      y="1"
      :width="funtouch9.circleWidth"
      height="20"
      rx="10"
      ry="10"
      :fill="circleColor"
      :transform="`translate(${funtouch9.circleTranslate})`"
    />
  </svg>
</template>

<script>
import { libName } from '../../config'
import anime from 'animejs'

const funtouch9 = {
  circleWidth: 20,
  off: {
    path: 'M12.1035194,0.0512813436 L33.9398377,2.16328243 C38.5116343,2.60546499 42,6.44750255 42,11.0406332 C42,11.0406332 42,11.0406332 42,11.0406332 C42,15.6337638 38.5116343,19.4758013 33.9398377,19.9179839 C33.9398377,19.9179839 33.9398377,19.9179839 33.9398377,19.9179839 L12.1035194,22.029985 C6.03426802,22.6170009 0.638297223,18.1727709 0.0512813436,12.1035194 C0.0171136535,11.7502542 0,11.3955469 0,11.0406332 C0,4.94305984 4.94305984,0 11.0406332,0 C11.3955469,0 11.7502542,0.0171136535 12.1035194,0.0512813436 Z',
    circleTranslate: 0
  },
  on: {
    path: 'M8.06799252,2.15774474 L29.8944853,0.0497688961 C35.9655885,-0.536570789 41.3625123,3.90970855 41.948852,9.98081175 C41.9829309,10.333673 42,10.6879706 42,11.0424737 C42,17.1418251 37.0554987,22.0863264 30.9561472,22.0863264 C30.6016441,22.0863264 30.2473466,22.0692573 29.8944853,22.0351784 L8.06799252,19.9272026 C3.49192123,19.4852512 0,15.639837 0,11.0424737 C0,11.0424737 0,11.0424737 0,11.0424737 C0,6.44511035 3.49192123,2.59969608 8.06799252,2.15774474 C8.06799252,2.15774474 8.06799252,2.15774474 8.06799252,2.15774474 Z',
    circleTranslate: 20
  }
}

export default {
  name: `${libName}-switch`,
  props: {
    type: {
      type: String,
      default: 'default',
      validator (value) {
        return ['default', 'funtouch9'].includes(value)
      }
    },
    value: {
      type: Boolean,
      default: false
    },
    borderColor: { // off状态的边框颜色，只对default样式生效
      type: String,
      default: '#dfdfdf'
    },
    backgroundColors: { // 背景色
      type: Array,
      default () {
        // 第一个为off状态背景色，第二个为on状态背景色
        return ['#f0f0f0', '#456fff']
      }
    },
    circleColor: { // 圆圈颜色
      type: String,
      default: '#fff'
    },
    duration: {
      type: Number,
      default: 300
    },
    disabled: {
      type: Boolean,
      default: false
    },
    prevent: { // 是否阻止自动切换
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      funtouch9: {
        path: '',
        circleWidth: 0,
        circleTranslate: 0
      }
    }
  },
  computed: {
    defaultStyle () {
      return {
        backgroundColor: this.value ? this.backgroundColors[1] : this.borderColor,
        transitionDuration: `${this.duration}ms`
      }
    },
    defaultMaskStyle () {
      return {
        backgroundColor: this.backgroundColors[0],
        transitionDuration: `${this.duration}ms`
      }
    },
    defaultCircleStyle () {
      return {
        backgroundColor: this.circleColor,
        transitionDuration: `${this.duration}ms`
      }
    },
    funtouch9PathStyle () {
      return {
        fill: this.backgroundColors[this.value ? 1 : 0],
        // chrome可以过渡path的d属性，但firefox，safari，ie不行，所以这里指定只过渡fill
        transition: `fill ${this.duration}ms`
      }
    }
  },
  watch: {
    value (value) {
      this.$emit('change', value)

      if (this.type === 'funtouch9') {
        // 第一次切换时不反转
        this.animationPlayed && this.animation.reverse()
        this.animation.play()
        this.animationPlayed = true
      }
    },
    type: {
      immediate: true,
      handler (value) {
        if (value !== 'funtouch9') {
          this.animation && this.animation.pause()

          return
        }

        this.funtouch9Reset()
      }
    },
    duration () {
      this.type === 'funtouch9' && this.funtouch9Reset()
    }
  },
  methods: {
    click () {
      if (!this.disabled) {
        this.$emit('click', this.value)
        !this.prevent && this.$emit('input', !this.value)
      }
    },
    funtouch9Reset () {
      const state = {
        path: this.value ? funtouch9.on.path : funtouch9.off.path,
        circleWidth: funtouch9.circleWidth,
        circleTranslate: this.value ? funtouch9.on.circleTranslate : funtouch9.off.circleTranslate
      }

      this.funtouch9.path = state.path
      this.funtouch9.circleWidth = state.circleWidth
      this.funtouch9.circleTranslate = state.circleTranslate
      this.animationPlayed = false
      this.animation && this.animation.pause()
      this.animation = anime({
        targets: state,
        path: state.path === funtouch9.off.path ? funtouch9.on.path : funtouch9.off.path,
        circleTranslate: state.circleTranslate === funtouch9.off.circleTranslate ? funtouch9.on.circleTranslate : funtouch9.off.circleTranslate,
        keyframes: [{
          circleWidth: state.circleWidth * 1.2
        }, {
          circleWidth: state.circleWidth
        }],
        autoplay: false,
        duration: this.duration,
        easing: 'easeInOutSine',
        update: anime => {
          anime.animations.forEach(({ property, currentValue }) => {
            switch (property) {
              case 'path':
                this.funtouch9.path = currentValue
                break
              case 'circleWidth':
                this.funtouch9.circleWidth = currentValue
                break
              case 'circleTranslate':
                this.funtouch9.circleTranslate = currentValue
                break
            }
          })
        }
      })
    }
  }
}
</script>
