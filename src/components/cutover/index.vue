<template>
  <div :class="['vui-cutover',{'vui-cutover-back':back}]">
    <transition :name="`vui-cutover-${type}`" v-bind="$attrs">
      <slot :style-obj="styleObj"></slot>
    </transition>
  </div>
</template>

<style lang="less">
  .vui-cutover {
    overflow: hidden;

    > * {
      float: left;
      box-sizing: border-box;
      width: 100%;
    }

    > :not(:first-child) {
      margin-left: -100%;
    }

    /*这个延迟必须加上，否则enter元素因为margin-left:-100%突然去掉，还会过渡margin-left*/
    > :last-child:not(:first-child) {
      transition-delay: 20ms;
    }

    /*fade效果*/
    &-fade-enter-active,
    &-fade-leave-active {
      /*必须指定property，防止过渡margin-left*/
      transition-property: opacity;
    }

    &-fade-enter,
    &-fade-leave-active {
      opacity: 0;
    }

    /*cover效果*/
    &-cover-enter-active,
    &-cover-leave-active {
      transition-property: opacity, transform;
    }

    &:not(&-back) &-cover-enter {
      transform: translate3d(100%, 0, 0);
    }

    &:not(&-back) &-cover-leave-active {
      opacity: .5;
    }

    &-back &-cover-enter {
      opacity: .5;
    }

    &-back &-cover-leave-active {
      position: relative;
      z-index: 1;
      transform: translate3d(100%, 0, 0);
    }

    /*popup效果*/
    &-popup-up-enter-active,
    &-popup-up-leave-active,
    &-popup-down-enter-active,
    &-popup-down-leave-active,
    &-popup-left-enter-active,
    &-popup-left-leave-active,
    &-popup-right-enter-active,
    &-popup-right-leave-active {
      transition-property: transform;
    }

    &-popup-up-enter,
    &-popup-up-leave-active {
      transform: translateY(100%);
    }

    &-popup-down-enter,
    &-popup-down-leave-active {
      transform: translateY(-100%);
    }

    &-popup-left-enter,
    &-popup-left-leave-active {
      transform: translateX(100%);
    }

    &-popup-right-enter,
    &-popup-right-leave-active {
      transform: translateX(-100%);
    }
  }
</style>

<script>
  export default {
    name: 'vui-cutover',
    props: {
      type: { // 切换类型
        type: String,
        default: 'fade'
      },
      duration: {
        type: Number,
        default: 400
      },
      checkBack: { // 当作页面转场动画时，返回时动效是否相反，且此时要配合vue-router使用，其它场景使用时不要设置该属性
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        back: false // 是不是返回
      }
    },
    computed: {
      styleObj () {
        return {
          transitionDuration: `${this.duration}ms`
        }
      }
    },
    watch: {
      $route () {
        if (!window.history.state || !window.history.state.vuiCutoverTime) { // 新建历史记录，前进
          window.history.replaceState(Object.assign({}, window.history.state || {}, {
            vuiCutoverTime: Date.now()
          }), '')
          this.back = false
        } else if (!this.time || window.history.state.vuiCutoverTime === this.time) { // 刷新或者replace
          this.back = false
        } else if (window.history.state.vuiCutoverTime < this.time) { // 后退
          this.back = this.checkBack
        } else { // 前进
          this.back = false
        }

        this.time = window.history.state.vuiCutoverTime
      }
    }
  }
</script>
