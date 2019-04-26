<template>
  <cutover class="vui-layer" :class="{'vui-layer-global':global}" v-bind="$attrs">
    <div :style="{backgroundColor:background}" v-show="value" @click.self="onclick" @touchmove.self="onTouchMove">
      <slot></slot>
    </div>
  </cutover>
</template>

<style lang="less">
  .vui-layer {
    > div {
      position: absolute;
      /*非全局遮罩z-index统一为99*/
      z-index: 99;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
    }
    &-global > div {
      position: fixed;
      /*全局遮罩z-index统一为999*/
      z-index: 999;
    }
  }
</style>

<script>
  import Cutover from '../cutover/index.vue'

  export default {
    name: 'vui-layer',
    components: {
      Cutover
    },
    props: {
      value: {
        type: Boolean,
        default: false
      },
      background: {
        type: String,
        default: 'rgba(0,0,0,0.6)'
      },
      global: { // 全局的蒙层还是某个元素的蒙层
        type: Boolean,
        default: true
      },
      clickClose: { // 点击蒙层是否自动关闭
        type: Boolean,
        default: true
      },
      backClose: { // back关闭，页面不后退
        type: Boolean,
        default: true
      },
      preventClose: { // 阻止点击或者back关闭
        type: Boolean,
        default: false
      }
    },
    watch: {
      value: {
        handler () {
          if (this.backClose) {
            if (this.value) {
              window.history.pushState({
                vuiLayer: true
              }, '')
              window.addEventListener('popstate', this.onpopstate)
            } else if (window.history.state && window.history.state.vuiLayer) {
              window.history.back()
            }
          }
        },
        immediate: true
      },
      global (value) {
        if (!value) {
          // 非全局layer就将父元素设置成相对定位
          this.$el.parentElement.style.position = 'relative'
        }
      }
    },
    methods: {
      onclick () {
        if (this.clickClose && !this.preventClose) {
          if (this.backClose) {
            this.clicked = true
            window.history.back()
          } else {
            this.$emit('input', false)
          }
        }

        // 确保history.forward()真正执行完成
        setTimeout(() => {
          this.$emit('click', this.preventClose)
        }, 50)
      },
      onpopstate ({state}) {
        if (!state || !state.vuiLayer) {
          // 外部主动关闭或者不阻止内部关闭
          if (!this.value || !this.preventClose) {
            window.removeEventListener('popstate', this.onpopstate)
            this.$emit('input', false)
          } else {
            window.history.forward()
          }
          // 非外部主动关闭且非click关闭
          this.value && !this.clicked && setTimeout(() => {
            // 确保history.forward()真正执行完成
            this.$emit('back', this.preventClose)
          }, 50)
          this.clicked = false
        }
      },
      onTouchMove (event) {
        this.global && event.preventDefault()
      }
    },
    mounted () {
      if (!this.global) {
        // 非全局layer就将父元素设置成相对定位
        this.$el.parentElement.style.position = 'relative'
      }
    }
  }
</script>