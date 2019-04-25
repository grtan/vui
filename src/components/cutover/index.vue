<template>
  <div class="vui-cutover" :vui-back="back">
    <transition :name="`vui-cutover-${type}`" v-bind="$attrs">
      <slot :style-obj="styleObj"></slot>
    </transition>
  </div>
</template>

<style lang="less">
  @import "../../assets/style/base";

  @name: ~"@{lib-name}-cutover";
  @back: ~"@{lib-name}-back";

  .@{name} {
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
    &-fade {
      &-enter-active,
      &-leave-active {
        /*必须指定property，防止过渡margin-left*/
        transition-property: opacity;
      }

      &-enter,
      &-leave-active {
        opacity: 0;
      }
    }

    /*cover效果*/
    &-cover {
      &-enter-active,
      &-leave-active {
        transition-property: opacity, transform;
      }

      .@{name}:not([@{back}]) &-enter {
        transform: translate3d(100%, 0, 0);
      }

      .@{name}:not([@{back}]) &-leave-active {
        opacity: .5;
      }

      .@{name}[@{back}] &-enter {
        opacity: .5;
      }

      .@{name}[@{back}] &-leave-active {
        position: relative;
        z-index: 1;
        transform: translate3d(100%, 0, 0);
      }
    }

    /*popup效果*/
    &-popup {
      &-up-enter-active,
      &-up-leave-active,
      &-down-enter-active,
      &-down-leave-active,
      &-left-enter-active,
      &-left-leave-active,
      &-right-enter-active,
      &-right-leave-active {
        transition-property: transform;
      }

      &-up {
        &-enter,
        &-leave-active {
          transform: translateY(100%);
        }
      }

      &-down {
        &-enter,
        &-leave-active {
          transform: translateY(-100%);
        }
      }

      &-left {
        &-enter,
        &-leave-active {
          transform: translateX(100%);
        }
      }

      &-right {
        &-enter,
        &-leave-active {
          transform: translateX(-100%);
        }
      }
    }
  }
</style>

<script>
  import { mixin } from '../../mixins/history/index'

  export default {
    name: 'vui-cutover',
    mixins: [mixin],
    props: {
      type: { // 切换类型
        type: String,
        default: 'fade'
      },
      duration: {
        type: Number,
        default: 300
      },
      checkBack: { // 当作页面转场动画时，返回时动效是否相反，且此时要配合vue-router使用，其它场景使用时不要设置该属性
        type: Boolean,
        default: false
      }
    },
    computed: {
      styleObj () {
        return {
          transitionDuration: `${this.duration}ms`
        }
      },
      back() {  // 是不是返回
        switch (this.action) {
          case 'back':
            return this.checkBack
          default:
            return false
        }
      }
    }
  }
</script>
