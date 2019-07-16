<style lang="less">
@import '../../assets/style/base';

@name: ~'@{lib-name}-cutover';

.@{name} {
  overflow: hidden;

  > * {
    float: left;
    box-sizing: border-box;
    width: 100%;
    transition-property: none;
    // 任何情况下过渡，transition组件都会将enter元素添加到尾部，这里利用opacity不为1时形成层叠上下文，保证层叠顺序跟元素dom顺序一致
    opacity: 0.99999;

    &:not(:first-child) {
      margin-left: -100%;
    }
  }

  /*fade效果*/
  &-fade {
    &-enter-active,
    &-leave-active {
      /*必须指定property，防止enter大于leave的过渡时间，导致过渡margin-left*/
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

    .@{name}:not([data-back]) &-enter {
      transform: translate3d(100%, 0, 0);
    }

    .@{name}:not([data-back]) &-leave-active {
      opacity: 0.5;
    }

    .@{name}[data-back] &-enter {
      opacity: 0.5;
    }

    .@{name}[data-back] &-leave-active {
      // 返回时，leave元素要盖在上面
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
import { libName } from '../../config'
import { mixin } from '../../mixins/history/index'

export default {
  name: `${libName}-cutover`,
  mixins: [mixin],
  props: {
    type: {
      // 切换类型
      type: String,
      default: 'fade'
    },
    duration: {
      type: Number,
      default: 300
    },
    checkBack: {
      // 当作页面转场动画时，返回时动效是否相反，且此时要配合vue-router使用，其它场景使用时不要设置该属性
      type: Boolean,
      default: false
    },
    disabled: {
      // 是否禁用过渡动画
      type: Boolean,
      default: false
    }
  },
  computed: {
    styleObj() {
      return {
        transitionDuration: `${this.disabled ? 0 : this.duration}ms`
      }
    },
    back() {
      // 是不是返回
      switch (this.action) {
        case 'back':
          return this.checkBack
        default:
          return false
      }
    }
  },
  render() {
    return (
      <div class={this.$options.name} data-back={this.back}>
        <transition
          name={this.disabled ? '' : `${this.$options.name}-${this.type}`}
          {...{
            props: this.$attrs
          }}
        >
          {this.$slots.default &&
            this.$slots.default.map(vnode => {
              vnode.data.staticStyle = vnode.data.staticStyle || {}
              Object.assign(vnode.data.staticStyle, this.styleObj)

              return vnode
            })}
        </transition>
      </div>
    )
  }
}
</script>
