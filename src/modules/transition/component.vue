<template>
  <div v-if="!multiple" class="vui-transition">
    <transition
      :name="disabled ? 'vui_notransition' : `vui-transition-${type}`"
      :appear="$attrs.appear"
      v-on="listeners"
    >
      <slot></slot>
    </transition>
  </div>
  <transition-group
    v-else
    :name="disabled ? 'vui_notransition' : `vui-transition-${type}`"
    :appear="$attrs.appear"
    tag="div"
    class="vui-transition"
    v-on="listeners"
  >
    <slot></slot>
  </transition-group>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component({
  name: 'VuiTransition',
  inheritAttrs: false
})
export default class VComponent extends Vue {
  // 过渡元素初始style属性
  originalStyle?: {
    priority: string
    value: string
  }

  // 动画类型
  @Prop({
    type: String,
    default: 'fade'
  })
  type!: 'fade' | 'zoom' | 'popup-left' | 'popup-right' | 'popup-top' | 'popup-bottom' | 'slide-vt' | 'slide-hz'

  // 是否禁用动画
  @Prop({
    type: Boolean,
    default: false
  })
  disabled!: boolean

  // 是否同时存在多个元素
  @Prop({
    type: Boolean,
    default: false
  })
  multiple!: boolean

  get sizeProp() {
    return this.type === 'slide-hz' ? 'width' : 'height'
  }

  get listeners() {
    return {
      ...this.$listeners,
      ...(this.$listeners.appear && {
        appear: (...args: any[]) => {
          if (this.$listeners.appear instanceof Array) {
            this.$listeners.appear.forEach(fn => fn(...args))
          } else if (this.$listeners.appear) {
            this.$listeners.appear(...args)
          }

          this.onEnter(args[0])
        }
      }),
      ...(this.$listeners['after-appear'] && {
        'after-appear': (...args: any[]) => {
          if (this.$listeners['after-appear'] instanceof Array) {
            this.$listeners['after-appear'].forEach(fn => fn(...args))
          } else if (this.$listeners['after-appear']) {
            this.$listeners['after-appear'](...args)
          }

          this.onAfterEnter(args[0])
        }
      }),
      ...{
        enter: (...args: any[]) => {
          if (this.$listeners.enter instanceof Array) {
            this.$listeners.enter.forEach(fn => fn(...args))
          } else if (this.$listeners.enter) {
            this.$listeners.enter(...args)
          }

          this.onEnter(args[0])
        },
        'after-enter': (...args: any[]) => {
          if (this.$listeners['after-enter'] instanceof Array) {
            this.$listeners['after-enter'].forEach(fn => fn(...args))
          } else if (this.$listeners['after-enter']) {
            this.$listeners['after-enter'](...args)
          }

          this.onAfterEnter(args[0])
        },
        leave: (...args: any[]) => {
          if (this.$listeners.leave instanceof Array) {
            this.$listeners.leave.forEach(fn => fn(...args))
          } else if (this.$listeners.leave) {
            this.$listeners.leave(...args)
          }
          this.onLeave(args[0])
        },
        'after-leave': (...args: any[]) => {
          if (this.$listeners['after-leave'] instanceof Array) {
            this.$listeners['after-leave'].forEach(fn => fn(...args))
          } else if (this.$listeners['after-leave']) {
            this.$listeners['after-leave'](...args)
          }

          this.onAfterLeave(args[0])
        }
      }
    }
  }

  /**
   * vue过渡enter顺序
   * 执行beforeEnter钩子->添加enter,enter-active类并显示元素->执行enter钩子->下一帧去掉enter类并添加enter-to类
   * 执行beforeEnter钩子->添加enter,enter-active类并显示元素->执行enter钩子  是在同一个事件循环中同步执行的
   *
   * vue过渡leave顺序
   * 执行beforeLeave钩子->添加leave,leave-active类->执行leave钩子->下一帧去掉leave类并添加leave-to类
   */
  onEnter(el: HTMLElement) {
    if (!['slide-hz', 'slide-vt'].includes(this.type) || this.originalStyle) {
      return
    }

    this.originalStyle = {
      priority: el.style.getPropertyPriority(this.sizeProp),
      value: el.style.getPropertyValue(this.sizeProp)
    }
    el.classList.remove(`vui-transition-${this.type}-enter`)
    el.style.setProperty(this.sizeProp, `${el.getBoundingClientRect()[this.sizeProp]}px`)
    el.classList.add(`vui-transition-${this.type}-enter`)
  }

  onAfterEnter(el: HTMLElement) {
    if (!['slide-hz', 'slide-vt'].includes(this.type)) {
      return
    }

    el.style.setProperty(this.sizeProp, this.originalStyle!.value, this.originalStyle!.priority)
    this.originalStyle = undefined
  }

  onLeave(el: HTMLElement) {
    if (!['slide-hz', 'slide-vt'].includes(this.type) || this.originalStyle) {
      return
    }

    this.originalStyle = {
      priority: el.style.getPropertyPriority(this.sizeProp),
      value: el.style.getPropertyValue(this.sizeProp)
    }
    el.style.setProperty(this.sizeProp, `${el.getBoundingClientRect()[this.sizeProp]}px`)
  }

  onAfterLeave(el: HTMLElement) {
    if (!['slide-hz', 'slide-vt'].includes(this.type)) {
      return
    }

    el.style.setProperty(this.sizeProp, this.originalStyle!.value, this.originalStyle!.priority)
    this.originalStyle = undefined
  }
}
</script>
