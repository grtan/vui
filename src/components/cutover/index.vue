<style lang="less">
@import "../../assets/style/base";

@name: ~"@{lib-name}-cutover";

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

  // slide效果
  &-slide-hz {
    &-enter-active,
    &-leave-active {
      transition-property: width;
      overflow: hidden;
    }

    &-enter {
      transition-duration: 0ms !important;
    }

    &-leave-to {
      width: 0 !important;
    }
  }

  &-slide-vt {
    &-enter-active,
    &-leave-active {
      transition-property: height;
      overflow: hidden;
    }

    &-enter {
      transition-duration: 0ms !important;
    }

    &-leave-to {
      height: 0 !important;
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
import { raf, caf } from '../../tools/prefix/index'

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
    },
    multiple: { // 是否同时存在多个元素
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      size: undefined // 宽或高
    }
  },
  computed: {
    sizeProp () {
      return this.type === 'slide-hz' ? 'width' : 'height'
    },
    style () {
      return {
        transitionDuration: `${this.disabled ? 0 : this.duration}ms`,
        ...(this.size === undefined ? {} : {
          [this.sizeProp]: `${this.size}px`
        })
      }
    },
    back () {
      // 是不是返回
      switch (this.action) {
        case 'back':
          return this.checkBack
        default:
          return false
      }
    }
  },
  render () {
    const data = {
      props: Object.assign({}, this.$attrs, {
        name: this.disabled ? '' : `${this.$options.name}-${this.type}`
      }),
      on: {
        // 哪怕没设置appear属性，只设置了apper钩子，也会引起初始渲染。所以未设置appear属性时不能添加钩子
        ...(!this.$attrs.appear && this.$attrs.appear !== '' ? {} : {
          beforeAppear: this.onBeforeEnter,
          appear: this.onEnter,
          afterAppear: this.onAfterEnter,
          appearCancelled: this.onEnterCancelled
        }),
        beforeEnter: this.onBeforeEnter,
        enter: this.onEnter,
        afterEnter: this.onAfterEnter,
        enterCancelled: this.onEnterCancelled,
        beforeLeave: this.onBeforeLeave,
        leave: this.onLeave,
        afterLeave: this.onAfterLeave,
        leaveCancelled: this.onLeaveCancelled
      }
    }
    const slot = this.$slots.default && this.$slots.default.map(vnode => {
      /**
       * https://github.com/vuejs/vue/issues/5986#issuecomment-311518789
       * dom diff时，vnode及其一些属性需要是不同的对象才会进行patch
       * 我们只需要对slot根元素应用样式，所以不需要深拷贝，浅拷贝就够了
       */
      const cloned = Object.create(Object.getPrototypeOf(vnode))

      Object.assign(cloned, vnode)
      cloned.data = Object.assign({}, cloned.data)
      cloned.data.staticStyle = Object.assign({}, cloned.data.staticStyle, this.style)

      return cloned
    })

    if (!this.multiple) {
      return (
        <div class={this.$options.name} data-back={this.back}>
          <transition {...data}>{slot}</transition>
        </div >
      )
    }

    return (
      <transition-group tag="div" class={this.$options.name} data-back={this.back} {...data}>{slot}</transition-group>
    )
  },
  methods: {
    /**
     * vue过渡enter顺序
     * 执行beforeEnter钩子->添加enter,enter-active类并显示元素->执行enter钩子->下一帧去掉enter类并添加enter-to类
     * 执行beforeEnter钩子->添加enter,enter-active类并显示元素->执行enter钩子  是在同一个事件循环中同步执行的
     *
     * vue过渡leave顺序
     * 执行beforeLeave钩子->添加leave,leave-active类->执行leave钩子->下一帧去掉leave类并添加leave-to类
     */
    onBeforeEnter (el) {
      this.$emit('before-enter', el)
    },
    onEnter (el) {
      this.$emit('enter', el)

      if (['slide-hz', 'slide-vt'].includes(this.type)) {
        this.initSize = this.size === undefined ? el.getBoundingClientRect()[this.sizeProp] : this.initSize // 初始高度
        this.size = 0
        // 这里必须确保在下下次重绘时修改，否则由于浏览器渲染机制可能会导致突变而不是过渡
        this.rafId = raf(() => {
          this.rafId = raf(() => {
            this.size = this.initSize
          })
        })
      }
    },
    onAfterEnter (el) {
      this.$emit('after-enter', el)

      if (['slide-hz', 'slide-vt'].includes(this.type)) {
        this.size = undefined
      }
    },
    onEnterCancelled (el) {
      this.$emit('enter-cancelled', el)
    },
    onBeforeLeave (el) {
      this.$emit('before-leave', el)
    },
    onLeave (el) {
      this.$emit('leave', el)

      if (['slide-hz', 'slide-vt'].includes(this.type)) {
        // enter未完成就leave
        if (this.size !== undefined) {
          return caf(this.rafId)
        }

        this.size = el.getBoundingClientRect()[this.sizeProp]
      }
    },
    onAfterLeave (el) {
      this.$emit('after-leave', el)

      if (['slide-hz', 'slide-vt'].includes(this.type)) {
        this.size = undefined
      }
    },
    onLeaveCancelled (el) {
      this.$emit('leave-cancelled', el)
    }
  }
}
</script>
